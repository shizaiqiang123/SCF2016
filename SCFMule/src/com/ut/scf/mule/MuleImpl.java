package com.ut.scf.mule;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.WebApplicationContext;

import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.esb.ESBServicePara;
import com.ut.comm.xml.esb.ESBServicesPara;
import com.ut.scf.core.esb.IESBFactory;
import com.ut.scf.core.esb.IESBRunner;
import com.ut.scf.core.esb.IESBService;
import com.ut.scf.core.esb.IESBServiceEntity;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.services.IServiceAdapterFactory;
import com.ut.scf.core.services.ServiceAdapterFactoryImpl;
import com.ut.scf.mule.control.entity.MuleServiceEntity;

public class MuleImpl implements IESBFactory, ServletContextListener, IESBRunner {

	private static Map<String, IESBServiceEntity> serviceProviderMap = new ConcurrentHashMap<String, IESBServiceEntity>();

	protected Logger getLogger() {
		return APLogUtil.getServiceLogger("");
	}

	@Override
	public void register(IESBService serviceProvider) {
		if (serviceProviderMap.containsKey(serviceProvider.getServiceId())) {
			return;
		}
		IESBServiceEntity serviceEntity = null;
		if (serviceProvider instanceof IESBServiceEntity) {
			serviceEntity = (IESBServiceEntity) serviceProvider;
			serviceEntity.setStatus(IESBServiceEntity.ESB_STATUS_INITIALIZED);
			serviceProviderMap.put(serviceProvider.getServiceId(), serviceEntity);
		} else {
			serviceEntity = new MuleServiceEntity();
			serviceEntity.setServicePostAdapter(serviceProvider.getServicePostAdapter());
			serviceEntity.setServiceId(serviceProvider.getServiceId());
			serviceEntity.setUser(serviceProvider.getUser());
			serviceEntity.setPwd(serviceProvider.getPwd());
			serviceEntity.setServiceProtocol(serviceProvider.getServiceProtocol());
			serviceEntity.setServiceType(serviceProvider.getServiceType());
			serviceEntity.setStatus(IESBServiceEntity.ESB_STATUS_INITIALIZED);
			serviceProviderMap.put(serviceProvider.getServiceId(), serviceEntity);
		}
		try {
			initializeService(serviceEntity);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void unRegister(IESBService serviceProvider) {
		try {
			destroyService(getServiceProvider(serviceProvider.getServiceId()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		serviceProviderMap.remove(serviceProvider.getServiceId());
	}

	public IESBServiceEntity getServiceProvider(String serviceId) {
		return serviceProviderMap.get(serviceId);
	}

	public Map<String, IESBServiceEntity> getAllEsbServices() {
		return serviceProviderMap;
	}

	@Override
	public void contextDestroyed(ServletContextEvent event) {
		if (!serviceProviderMap.isEmpty()) {
			for (String key : serviceProviderMap.keySet()) {
				unRegister(serviceProviderMap.get(key));
			}
			serviceProviderMap.clear();
		}
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		ServletContext context = event.getServletContext();
		final ApplicationContext parentContext = (ApplicationContext) context
				.getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);

		ESBServicesPara allServices = XMLParaParseHelper.parseESBSvicesPara();
		if (allServices != null && allServices.size() > 0) {
			for (int i = 0; i < allServices.size(); i++) {
				ESBServicePara servicepara = allServices.getEsbservice(i);
				XMLParaParseHelper.parseESBSvicePara(servicepara);
				IESBService serviceBean;
				try {
					serviceBean = generateRequestEntity(parentContext, servicepara);
					if (serviceBean != null)
						register(serviceBean);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	public IESBServiceEntity generateRequestEntity(ApplicationContext application, ESBServicePara service)
			throws Exception {
		IESBServiceEntity entity = (IESBServiceEntity) application.getBean("esbEntity");
		entity.setServiceId(service.getType());//调用服务时按type调用  发布服务的type不能一样
		entity.setServiceType(service.getType());
		entity.setServiceProtocol(service.getProtocol());
		entity.setServicePostAdapter(service.getPostadapter());
		entity.setServiceQueryAdapter(service.getQueryadapter());
		entity.setAddress(service.getAddress());
		entity.setInorout(service.getInorout());
		entity.setMethod(service.getMethod());
		entity.setPort(service.getPort());
		entity.setProtocoltp(service.getProtocoltp());
		entity.setTimeout(service.getTimeout());
		entity.setCharacterset(service.getCharacterset());
		entity.setReceiveMapping(service.getRecvmapping());
		entity.setBu(service.getBu());
		entity.setUser(service.getUser());
		entity.setPwd(service.getPwd());
		entity.setHomeDir(service.getHomeDir());
		entity.setPasssivePort(service.getPasssivePort());
		entity.setInterfaceName(service.getInterfaceName());
		entity.setClassName(service.getClassName());
		entity.setWsServiceName(service.getWsServiceName());
		entity.setWsInterceptorClass(service.getWsInterceptorClass());
		entity.setWsPwd(service.getWsPwd());
		entity.setWsUser(service.getWsUser());
		return entity;
	}

	@Override
	public IESBServiceResponse runService(IESBServiceRequest request) {
		String requestId = request.getRequestId();
		getLogger().debug("Receive a service request id :" + requestId);

		getLogger().debug(String.format("Service request[%s]: Source name:%s", requestId,
				request.getRequestSource().getServiceId()));

		getLogger().debug(String.format("Service request[%s]: Target name:%s", requestId,
				request.getRequestTarget().getServiceId()));

		getLogger().debug(String.format("Service request[%s]: Target type:%s", requestId,
				request.getRequestTarget().getServiceType()));

		IESBServiceResponse response = null;

		try {
			IESBServiceEntity targetService = routerService(request);

			checkServiceStatus(targetService);

			reformatRequest(request);

			response = invokeService(request, targetService);

		} catch (Exception e) {
			response = new ServiceResponseImpl();
			e.printStackTrace();
			response.setResponseResult(IESBServiceResponse.ESB_SERVICE_RESULT_ERROR);
			response.setResponseData(e.toString());
			return response;
		}

		getLogger().debug(String.format("Process Service GAPI[%s]: GAPI :%s", requestId,
				request.getRequestTarget().getServiceType()));

		return response;
	}

	private void checkServiceStatus(IESBServiceEntity targetService) throws Exception {
		String status = targetService.getStatus();
		getLogger().debug(
				String.format("Service request[%s]: Target service status:%s", targetService.getServiceId(), status));
		if (!IESBServiceEntity.ESB_STATUS_START.equalsIgnoreCase(status)
				&& !IESBServiceEntity.ESB_STATUS_INITIALIZED.equalsIgnoreCase(status)) {
			throw new Exception(String.format("Service request[%s]: Target service not started but :%s",
					targetService.getServiceId(), status));
		}
	}

	private IESBServiceResponse invokeService(IESBServiceRequest request, IESBService service) throws Exception {
		IESBProtocolFactory factory = new ESBProtocolFactoryImpl();
		request.setRequestTarget((IESBServiceEntity) service);
		return (IESBServiceResponse) factory.getProtocolImpl(service).runService(request);
	}

	private void initializeService(IESBServiceEntity service) throws Exception {
		IESBProtocolFactory factory = new ESBProtocolFactoryImpl();

		factory.getProtocolImpl(service).initlizeService(service);
	}

	private void destroyService(IESBServiceEntity service) throws Exception {
		IESBProtocolFactory factory = new ESBProtocolFactoryImpl();

		factory.getProtocolImpl(service).destoryService(service);
	}

	private IESBServiceEntity routerService(IESBServiceRequest request) {
		IESBServiceEntity serviceInstance = getServiceProvider(request.getRequestTarget().getServiceType());
		request.setRequestTarget(serviceInstance);
		return serviceInstance;
	}

	private void reformatRequest(IESBServiceRequest request) throws Exception {
		IServiceAdapterFactory adapterFactory = new ServiceAdapterFactoryImpl();
		if (adapterFactory.getAdapter(request).needFormattor(request.getRequestTarget())) {
			adapterFactory.getAdapter(request).createFormattor(request.getRequestTarget()).formatRequest(request);
		}

		getLogger().debug(String.format("Service request[%s]: Reformat Response", request.getRequestId()));
	}

}

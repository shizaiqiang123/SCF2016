package com.ut.dtc.component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.dtc.impl.DTCMsgBuilder;
import com.ut.dtc.intf.IMessageBody;
import com.ut.dtc.intf.IMessageHeader;
import com.ut.dtc.intf.IMessageProcess;
import com.ut.dtc.intf.IMetadata;
import com.ut.dtc.intf.IValidate;
import com.ut.dtc.intf.data.ApplicationDefine;
import com.ut.dtc.util.DBUtil;
import com.ut.dtc.util.DTCApplicationContext;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.logic.ILogicFactory;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.component.service.IServiceFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoHelper;

@Component("dtcProcessManager") 
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class DTCProcessManager implements IMainComponent {
	protected FuncDataObj logicDataObj;

	protected Logger getLogger() {
		return APLogUtil.getESBLogger();
	}

	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Resource(name = "logicFactory")
	ILogicFactory logicFactory;

	@Resource(name = "gapiManager")
	IGAPIProcessManager gapiManager;

	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;

	@Resource(name = "serviceFactory")
	IServiceFactory serviceFactory;

	protected PagePara pagePara;

	protected JSONObject trxData;
	
	IMessageProcess messageProcess;

	@Override
	public Object queryData(Object paraDom) throws Exception {
		return null;
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return null;
	}

	@Override
	public Object submitData(Object paraDom) throws Exception {
		 paraDom = new String(paraDom.toString().getBytes("iso-8859-1"),"utf-8");//解决乱码问题
		JSONObject trxData =JSONObject.fromObject(paraDom);
		JSONObject trxDom = JsonHelper.getTrxObject(trxData);
		
		logicDataObj = new FuncDataObj();
		logicDataObj.setReqData(trxData);
		
		//请求中必须指定的参数
		String content = trxDom.containsKey("content")?trxDom.getString("content"):"";
		
		String channel = trxDom.containsKey("channel")?trxDom.getString("channel"):"";
		
		if(StringUtil.isTrimEmpty(content)){
			getLogger().warn("can not find content from request.");
			logicDataObj.setRetInfo("No data find.");
			logicDataObj.setRetStatus(FuncDataObj.FAILED);
			Object response = logicDataObj.buildReturnRespose("Ajax");
			return response;
		}
		
		if(StringUtil.isTrimEmpty(channel)){
			getLogger().warn("can not find channel from request.");
			logicDataObj.setRetInfo("No channel find.");
			logicDataObj.setRetStatus(FuncDataObj.FAILED);
			Object response = logicDataObj.buildReturnRespose("Ajax");
			return response;
		}
		getLogger().debug("find content from request : "+content);
		
		//获取接口元定义
		IMetadata metadata = DTCMsgBuilder.getInstence(channel).buildMetadata();
		
		messageProcess = ClassLoadHelper.getComponentClass(metadata.getProcessor());
		
		messageProcess.buildMetadata(metadata,content);
		
		//完成用户授权验证，用户对当前接口权限验证
		messageProcess.doAuthorizeCheck(content,metadata);
		
		processMsgDefineByCust(metadata);
		
		//元数据处理，处理body数据
		messageProcess.processMetadata(content,metadata);
		
		//标准化输入
		content = messageProcess.formatInput(content,metadata);
		
		//数据存储
		messageProcess.storeData(content,metadata);
		
		//数据路由,找到服务提供方并且返回对应的接口定义
		ApplicationDefine out = DTCApplicationContext.routeRequest(metadata);
		
		//输出格式化
		content = messageProcess.formatOutput(content,out);
		
		//执行目标逻辑
		Object responseData =callApplication(content,out);
		
		responseData = messageProcess.formatResponse(responseData,out);
		
		logicDataObj.buildRespose(responseData);

		Object response = logicDataObj.buildReturnRespose("Ajax");
		return response;	
	}

	private void processMsgDefineByCust(IMetadata metadata) {
		String custId = metadata.getMsgHeader().getCustId();
		String msgTp = metadata.getMsgTp();
		
		String sql = "select formator,mapping,busi_unit from trx.DTC_CUST_INTF where cust_Id = ? and intf_tp = ? and is_config = ?";
		List<Object> parms = new ArrayList<Object>();
		parms.add(custId);
		parms.add(msgTp);
		parms.add("0");
	
		List<Object[]> queryResult = DBUtil.queryData(sql, parms);
		
		for (Object[] objects : queryResult) {
			metadata.getMsgBody().setFormator( objects[0].toString());
			metadata.getMsgBody().setMapping( objects[1].toString());
			metadata.setCustBu(objects[2]==null?"":objects[2].toString());
			break;
		}
	}
	
	public Object callApplication(String serviceData,ApplicationDefine out) throws Exception{
		ServicePara servicePara = new ServicePara();
		String serviceId = out.getMsgDefine().getEsbService();
		servicePara.setId(serviceId);
		servicePara = XMLParaParseHelper.parseFuncService(serviceId, out.getAppBu());
		
		IESBServiceRequest request = new ServiceRequestImpl();
		request.setRequestData(JsonUtil.getJSON(serviceData));
		request.setRequestPara(servicePara);
		request.setRequestType(IESBServiceRequest.REQUEST_TYPE_POST);
		request.setMethodName(servicePara.getMethodname());
		request.setRequestTarget(ESBServiceUtil.generateRequestEntity(servicePara));
		request.setRequestSource(ESBServiceUtil.generateApRequestEntity());
		
		IESBServiceResponse processResult = serviceFactory.getProcessor(servicePara).runService(request);
		
		if (IESBServiceResponse.ESB_SERVICE_RESULT_SUCCESS == processResult.getResponseResult()) {
			return processResult.getResponseData();
		}else{
			return null;
		}
	}
}

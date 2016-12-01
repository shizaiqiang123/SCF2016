package com.ut.scf.core.services.accounting.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ut.scf.core.esb.IESBService;

@Service("accountingService")
@Deprecated
public class AccountingContext implements IESBService{
	
	private Logger logger = LoggerFactory.getLogger(getClass());
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String serviceId = "Accounting";
	
	private String serviceStatus ;
	
	@Resource(name="accountingManager")
	IAccountingManager manager;
	
	@Override
	public String getServiceId() {
		return serviceId;
	}

	@Override
	public void setServiceId(String serviceId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getServiceType() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setServiceType(String serviceType) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getServiceProtocol() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setServiceProtocol(String serviceProtocol) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getServicePostAdapter() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setServicePostAdapter(String serviceAdapter) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getServiceQueryAdapter() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setServiceQueryAdapter(String serviceAdapter) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getProtocoltp() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setProtocoltp(String protocoltp) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getAddress() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setAddress(String address) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getPort() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setPort(String port) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getMethod() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setMethod(String method) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getInorout() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setInorout(String inorout) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getTimeout() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setTimeout(String timeout) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getCharacterset() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setCharacterset(String characterset) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getReceiveMapping() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setReceiveMapping(String gapimsgId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getBu() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setBu(String bu) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getUser() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setUser(String ftpUser) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getPwd() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setPwd(String ftpPwd) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getHomeDir() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setHomeDir(String homeDir) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getPasssivePort() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setPasssivePort(String passsivePort) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getInterfaceName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setInterfaceName(String interfaceName) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getClassName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setClassName(String className) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getWsServiceName() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setWsServiceName(String wsServiceName) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getWsUser() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setWsUser(String wsUser) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getWsPwd() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setWsPwd(String wsPwd) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getWsInterceptorClass() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setWsInterceptorClass(String wsInterceptorClass) {
		// TODO Auto-generated method stub
		
	}

}

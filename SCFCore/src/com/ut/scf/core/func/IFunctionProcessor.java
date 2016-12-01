package com.ut.scf.core.func;

import net.sf.json.JSONObject;

import org.slf4j.Logger;

import com.ut.comm.xml.func.FunctionPara;
import com.ut.scf.core.data.IApResponse;

public interface IFunctionProcessor{
	public void setRequestDom(JSONObject reqData);
	
	public void setRequestDom(JSONObject reqData,boolean clone);
	
	public void setRequestPara(FunctionPara para);
	
	public void setThreadModule(boolean newThread);
	
	public void setTransactionModule(boolean autoCommit);
	
	public void setLogger(Logger logger);
	
	public IApResponse run();
	
	public IApResponse runAndWaitResponse();
}

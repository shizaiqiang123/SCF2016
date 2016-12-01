package com.ut.scf.core.func;

import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

import org.slf4j.Logger;

import net.sf.json.JSONObject;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ClassLoadHelper;

public class FunctionProcessor implements IFunctionProcessor{
	private JSONObject object;
	
	private FunctionPara funcPara;
	
	private boolean singleThreadFlag = true;
	
	private boolean autoCommit = true;
	
	private Logger logger;

	@Override
	public void setRequestDom(JSONObject reqData) {
		setRequestDom(reqData,false);
	}

	@Override
	public void setRequestPara(FunctionPara para) {
		this.funcPara = para;
	}

	@Override
	public void setThreadModule(boolean newThread) {
		this.singleThreadFlag = newThread;
	}

	@Override
	public void setRequestDom(JSONObject reqData, boolean clone) {
		if(clone){
			this.object = JsonUtil.clone(reqData);
		}else{
			this.object = reqData;
		}
		JsonHelper.mark2StpFunc(this.object, true);
	}

	@Override
	public void setTransactionModule(boolean autoCommit) {
		this.autoCommit = autoCommit;
	}

	@Override
	public void setLogger(Logger logger) {
		this.logger = logger;
	}
	
	public Logger getLogger(){
		if(this.logger!=null)
			return this.logger;
		return getDefaultLogger();
	}

	private Logger getDefaultLogger() {
		return APLogUtil.getBuSystemLogger();
	}
	
	class InnerFunctionProcessor implements Callable<IApResponse> {

		@Override
		public IApResponse call() throws Exception {
			IApResponse retObj = new ApResponse();
			try {
				IAPProcessor functionProcessor= ClassLoadHelper.getComponentClass("aPSubmitProcessor");
				retObj = (IApResponse) functionProcessor.run(object.toString());
				if(retObj.isSuccess()){
					getLogger().debug("Stp function success...");
				}else{
					getLogger().debug("Stp function failed...,process cancel now...");
					IAPProcessor cancelProcessor= ClassLoadHelper.getComponentClass("cancelProcessor");
					cancelProcessor.run(object.toString());
					getLogger().debug("Stp function cancel success now...");
				}
			} catch (Exception e) {
//				retObj.setErrorCode(errorCode);
				retObj.setMessage(e.toString());
				retObj.setSuccess(false);
				getLogger().error(e.toString());
				getLogger().error(ErrorUtil.getErrorStackTrace(e));
			}
			return retObj;
		}
	}

	@Override
	public IApResponse run() {
		Callable<IApResponse> runner = new InnerFunctionProcessor();
		IApResponse retObj = new ApResponse();
		FutureTask<IApResponse> task = new FutureTask<IApResponse>(runner);//为了以后接收接口状态
		Thread newThread = new Thread(task);
		if(singleThreadFlag){
			try {
				newThread.start();
//				while(!task.isDone()){
//					Thread.sleep(1000);
//				}
//				return task.get();
			} catch (Exception e) {
				retObj.setMessage(e.toString());
				retObj.setSuccess(false);
				getLogger().error(e.toString());
				getLogger().error(ErrorUtil.getErrorStackTrace(e));
			}
		}else{
			try {
				newThread.run();
				retObj.setSuccess(true);
			} catch (Exception e) {
				retObj.setMessage(e.toString());
				retObj.setSuccess(false);
				getLogger().error(e.toString());
				getLogger().error(ErrorUtil.getErrorStackTrace(e));
			}
		}
		return retObj;
	}

	@Override
	public IApResponse runAndWaitResponse() {
		Callable<IApResponse> runner = new InnerFunctionProcessor();
		IApResponse retObj = new ApResponse();
		FutureTask<IApResponse> task = new FutureTask<IApResponse>(runner);//为了以后接收接口状态
		Thread newThread = new Thread(task);//外围使用，在本类中，没有任何意义
		try {
			newThread.start();
			while(!task.isDone()){
				Thread.sleep(1000);
			}
			return task.get();
		} catch (Exception e) {
			retObj.setMessage(e.toString());
			retObj.setSuccess(false);
			getLogger().error(e.toString());
			getLogger().error(ErrorUtil.getErrorStackTrace(e));
		}
		return retObj;
	}	

}

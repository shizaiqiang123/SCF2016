package com.ut.scf.core.component.batch;

import java.io.File;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.task.TaskPara;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.utils.ClassLoadHelper;

//@Component("paraImportProcessor")
public class ParameterImportor extends AbsRunableTask{
	
	private String userdir = ASPathConst.getUserDirPath();
	
	@Resource(name = "cancelProcessor")
	IAPProcessor cancelProcessor;
	private String paraPath;
	private String targetBu;
	private String paraTp;

	@Override
	public void execute() {
		TaskPara taskPara = (TaskPara) currentTask.getParam();
		
		File f = new File(userdir+File.separator+paraPath);
		if(f.exists()&&f.isDirectory()){
			
		}

		FunctionProcessor process = new FunctionProcessor();
		process.setParaPath(paraPath);
		process.setParaTp(paraTp);
		process.setTargetBu(targetBu);
		FutureTask<IApResponse> task = new FutureTask<IApResponse>(process);
		Thread oneThread = new Thread(task);
		oneThread.start();
	}
	
	class FunctionProcessor implements Callable<IApResponse>{
		
		private String paraPath;
		private String targetBu;
		private String paraTp;

		@Override
		public IApResponse call() throws Exception {
			IApResponse retObj = new ApResponse();
			
			JSONObject object = JsonHelper.createReqJson();
			JsonHelper.mark2StpFunc(object, true);
			TaskPara taskPara = (TaskPara) currentTask.getParam();
			object = (JSONObject) runTaskJsEnginee(taskPara,object);
			try {
				IAPProcessor functionProcessor= ClassLoadHelper.getComponentClass("aPSubmitProcessor");
				retObj = (ApResponse) functionProcessor.run(object.toString());
			} catch (Exception e) {
				cancelProcessor.run(object.toString());
				getLogger().error(e.toString());
				getLogger().error(ErrorUtil.getErrorStackTrace(e));
			}
			return retObj;
		}

		public String getParaPath() {
			return paraPath;
		}

		public void setParaPath(String paraPath) {
			this.paraPath = paraPath;
		}

		public String getTargetBu() {
			return targetBu;
		}

		public void setTargetBu(String targetBu) {
			this.targetBu = targetBu;
		}

		public String getParaTp() {
			return paraTp;
		}

		public void setParaTp(String paraTp) {
			this.paraTp = paraTp;
		}
	}

}

package com.ut.scf.core.workflow;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;



import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.sunyard.sunflow.client.ISunflowClient;
import com.sunyard.sunflow.client.SunflowClient;
import com.sunyard.sunflow.engine.workflowexception.WorkflowException;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.sys.SysPara;
import com.ut.scf.core.component.logic.LogicFactoryImpl;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;

@Component("queryWorkItem")
@Scope("prototype")
public class WolkFlowQueryEntry implements IQueryComponent{

	@Resource(name="apWorkFlow")
	private WorkFlowCtrol workFlowControl;
	
	@Resource(name = "logicFactory")
	LogicFactoryImpl logicFactory;
	private ISunflowClient workFlowClient;
	
	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		JSONObject reqData = logicObj.getReqData();
		JSONObject userData = JsonHelper.getUserObject(reqData);
		ApSessionContext context = ApSessionUtil.getContext();
		WorkFlowConnectorEntity entity = new WorkFlowConnectorEntity();
		SysPara sysPara = XMLParaParseHelper.parseSysPara(context.getSysBusiUnit());
		//entity.setEnable(sysPara.getWorkflowflag());
		entity.setEnable("true".equalsIgnoreCase(sysPara.getWorkflowflag()));
		entity.setPassword(sysPara.getWorkflowpassword());
		entity.setPort(Integer.parseInt(sysPara.getWorkflowport()));
		entity.setUrl(sysPara.getWorkflowengine());
		if(!entity.isEnable()){
			FuncDataObj retData = new FuncDataObj();
			retData.buildRespose(0);
			retData.setRetInfo("Workflow Engine is turn off.");
			return retData;
		}
		
		String userName = userData.getString(WorkFlowConst.PROPERTY_USER_ID);
		entity.setUserName(userName );
		try{
			if (workFlowClient == null) {
				workFlowClient = new SunflowClient(entity.getUrl(),
						entity.getPort());
			}
			workFlowControl.connect(entity);
			JSONObject trxObj = JsonHelper.getTrxObject(reqData);
			String queryContent = trxObj.containsKey("queryCon")?trxObj.getString("queryCon"):"";
			if("workitem".equalsIgnoreCase(queryContent)){
				String queryType = trxObj.containsKey("queryType")?trxObj.getString("queryType"):"";
				
				if("queryCount".equalsIgnoreCase(queryType)){
					long count  = workFlowControl.getWorkItemsCount(reqData);
					FuncDataObj retData = new FuncDataObj();
					retData.buildRespose(count);
					return retData;
				}
//				else if("checkOut".equalsIgnoreCase(queryType)){
//					workFlowControl.checkOut(Long.parseLong(trxObj.getString("itemId")));
//					FuncDataObj retData = new FuncDataObj();
//					retData.buildRespose(0);
//					retData.setRetInfo("Workflow  is checkOut....");
//					return retData;
//				}
				else{
					List<WorkItem> retList = workFlowControl.getAllWorkItems(reqData);
					FuncDataObj retData = new FuncDataObj();
					retData.buildRespose(retList);
 					return retData;
				}
			}else if("onpassageitem".equalsIgnoreCase(queryContent)){
				String queryType = trxObj.containsKey("queryType")?trxObj.getString("queryType"):"";
				
				if("queryCount".equalsIgnoreCase(queryType)){
					FuncDataObj retData = new FuncDataObj();           
					long count  = workFlowControl.getOnPassageItemCount(reqData);
					retData.buildRespose(count);
					return retData;
				}else{
//					List<WorkItem> retList = workFlowControl.getAllOnPassageItems(reqData);
					List<Procinstance> retList = workFlowControl.getAllPassageItems(reqData);
					FuncDataObj retData = new FuncDataObj();
					retData.buildRespose(retList);
					return retData;
				}
			}else if("detailWitem".equalsIgnoreCase(queryContent)){
				List<WorkItem> retList = workFlowControl.getDetailWorkItems(reqData);
				FuncDataObj retData = new FuncDataObj();
				retData.buildRespose(retList);
				return retData;
			}else{
			}
			
			String queryType = trxObj.containsKey("queryType")?trxObj.getString("queryType"):"";
			
			if("queryCount".equalsIgnoreCase(queryType)){
				long count  = workFlowControl.getWorkItemsCount(reqData);
				FuncDataObj retData = new FuncDataObj();
				retData.buildRespose(count);
				return retData;
			}else{
				List<WorkItem> retList = workFlowControl.getAllWorkItems(reqData);
				FuncDataObj retData = new FuncDataObj();
				retData.buildRespose(retList);
				return retData;
			}
			
		}catch(Exception e){
//			throw e;
			if(e instanceof WorkflowException){
				//工作流引擎没有启动异常处理
				FuncDataObj retData = new FuncDataObj();
				retData.buildRespose(0);
				retData.setRetInfo("Workflow Engine is shutdown.");
				return retData;
			}else{
				//其他情况，返回空值
				return null;
			}
			//return null;
		}finally{
			try {
				workFlowControl.disconnect();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}


}

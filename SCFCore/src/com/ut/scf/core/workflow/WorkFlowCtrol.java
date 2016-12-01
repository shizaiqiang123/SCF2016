package com.ut.scf.core.workflow;

import java.util.List;

import com.comm.pojo.Page;
import com.ut.comm.xml.workflow.WorkFlowPara;

import net.sf.json.JSONObject;

public interface WorkFlowCtrol {
	public void connect(WorkFlowConnectorEntity entity) throws Exception;
	
	public void disconnect() throws Exception;
	
	public void create(WorkFlowPara para, JSONObject instanceData);
	
//	public void checkOut(WorkFlowPara para, JSONObject instanceData) throws Exception;
	public void checkOut(JSONObject instanceData) throws Exception;
	
//	public void checkOut(long itemId) throws Exception;
	
//	public void checkIn(WorkFlowPara para, JSONObject instanceData);
	public void checkIn(JSONObject instanceData);
		
//	public void callProcess(WorkFlowPara para,JSONObject workItemData);
	
	public void terminate(WorkFlowPara para,JSONObject workItemData) throws Exception;
	
//	public void cancel(WorkFlowPara para, JSONObject workItemData) throws Exception;
	public void cancel(JSONObject workItemData) throws Exception;
	
	public List<WorkItem> getAllWorkItems(int itemState,Page p);
	
	public List<WorkItem> getAllWorkItems(JSONObject reqData);
	
	public List<WorkItem> getDetailWorkItems(JSONObject reqData);
	
	public long getWorkItemsCount(JSONObject reqData) throws Exception;

//	public List<WorkItem> getAllOnPassageItems(JSONObject reqData) throws Exception;
	public List<Procinstance> getAllPassageItems(JSONObject reqData) throws Exception;
	
	public long getOnPassageItemCount(JSONObject reqData) throws Exception;

	public void deleteFlowM(JSONObject reqData, int parseInt) throws Exception;
	
}

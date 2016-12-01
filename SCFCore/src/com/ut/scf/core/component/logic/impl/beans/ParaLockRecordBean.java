package com.ut.scf.core.component.logic.impl.beans;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.scf.core.component.AbsParaLogicManager;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.dao.IDaoHelper;

@Component("paraLockRecordBean")
/**
 * @ 数据库中维护一套表：1 记录每个文件的状态（锁） 2 记录修改记录（Event） 3 。。。
 * @author PanHao
 *
 */
public class ParaLockRecordBean extends AbsParaLogicManager{
	
	@Resource(name="trxLockRecordProcessor")
	ILogicComponent editRecord;
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	
	private String tableName = "std.PARA_DEFINE_M";

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		return null;
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		FuncDataObj dataObj = (FuncDataObj) logicObj.clone(); 
		JSONObject reqData = dataObj.getReqData();
		
		if(!reqData.containsKey("paraId")){
			APLogUtil.getUserLogger().warn("No parameter id finded from request.");
			return null;
		}
		
		processMapping(reqData);
		
		LogicNode reqLogic =(LogicNode) dataObj.getReqParaObj();
		
		reqData.put("paraPath", reqLogic.getTablename());
		
		LogicNode mainLogic = new LogicNode();
		
		mainLogic.setTablename(getTableName());

		dataObj.setReqParaObj(mainLogic);
		
		dataObj = editRecord.postData(dataObj);
		
		daoHelper.execUpdate(dataObj);
		
		return null;
	}

	public String getTableName() {
		if(StringUtil.isTrimEmpty(tableName))
			return "std.PARA_DEFINE_M";
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	protected void processMapping(JSONObject reqData){
//		reqData.put("sysRefNo", getMappingValue(reqData,"id"));
//		reqData.put("paraId", getMappingValue(reqData,"id"));
//		reqData.put("paraName", getMappingValue(reqData,"name"));
//		reqData.put("paraDesc", getMappingValue(reqData,"desc"));
//		reqData.put("paraBu", getMappingValue(reqData,"bu"));
//		reqData.put("paraTp", getMappingValue(reqData,"paraTp"));
//		reqData.put("paraPath", getMappingValue(reqData,"id"));
	}
	
	protected String getMappingValue(JSONObject dom, String mappingName){
		if(dom==null||!dom.containsKey(mappingName)){
			return "";
		}
		return dom.getString(mappingName);
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}

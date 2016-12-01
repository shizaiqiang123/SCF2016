package com.ut.scf.core.component.logic.impl.beans;

import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.component.AbsLogicCompManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.data.FuncDataObj;

@Service("trxCatalogProcessor")
@Scope("prototype")
public class ASETrxCatalogRecordBean extends AbsLogicCompManager {

	@Override
	protected void parseParameters(FuncDataObj logicObj){
		super.parseParameters(logicObj);
		String functType = this.currentDataObj.getFuncType();
		String trxTableFlag = "";
		if(ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(functType)){
			trxTableFlag = "M";
		}else if(ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(functType)){
			trxTableFlag = "M";
		}else if(ComponentConst.COMP_FUNC_TYPE_EC.equalsIgnoreCase(functType)){
			trxTableFlag = "M";
		}else if(ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(functType)){
			trxTableFlag = "E";
		}else if(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(functType)){
			trxTableFlag = "E";
		}else if(ComponentConst.COMP_FUNC_TYPE_AJAX.equalsIgnoreCase(functType)){
			trxTableFlag = "M";
		}else if(ComponentConst.COMP_FUNC_TYPE_VIEW_HISTORY.equalsIgnoreCase(functType)){
			trxTableFlag = "E";
		}else{
			trxTableFlag = "M";
		}
		if("E".equalsIgnoreCase(trxTableFlag)){
			this.strTableName = getEventTableName();
		}
		
	}
	
	@Override
	protected void addFilterBeforeInqData(Map<String, Object> crMap) {
		String functType =  this.currentDataObj.getFuncType();
		String trxStatus = "";
		if(ComponentConst.COMP_FUNC_TYPE_MASTER.equalsIgnoreCase(functType)){
			trxStatus = "M";
		}else if(ComponentConst.COMP_FUNC_TYPE_PENDING.equalsIgnoreCase(functType)){
			trxStatus = "M";
		}else if(ComponentConst.COMP_FUNC_TYPE_EC.equalsIgnoreCase(functType)){
			trxStatus = "M";
		}else if(ComponentConst.COMP_FUNC_TYPE_RELEASE.equalsIgnoreCase(functType)){
			trxStatus = "P";
		}else if(ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(functType)){
			trxStatus = "P";
		}else if(ComponentConst.COMP_FUNC_TYPE_AJAX.equalsIgnoreCase(functType)){
			trxStatus = "M";
		}else if(ComponentConst.COMP_FUNC_TYPE_VIEW_HISTORY.equalsIgnoreCase(functType)){
			trxStatus = "";
		}else{
			trxStatus = "M";
		}
		if(StringUtil.isTrimNotEmpty(trxStatus))
			crMap.put(getHibernateName("sysTrxSts"), trxStatus);
	}
	
	@Override
	protected void addFieldsBeforeInqData(List<String> filedList) {
		filedList.add("sysFuncId");
		filedList.add("sysEventTimes");
	}
	
	@Override
	protected void appendOrders(List<String> orders) {
		
	}
	
	@Override
	protected void appendPostFields(List<String> updateList) {
		
	}
	
	@Override
	protected FuncDataObj afterPostData() throws Exception {
		return null;
	}

	@Override
	protected void resetEventTimes() {
		
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}

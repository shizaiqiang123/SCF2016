package com.ut.scf.core.component.logic.impl.beans;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.scf.core.component.AbsTrxDoLogicManager;
import com.ut.scf.core.data.FuncDataObj;

@Service("trxDeleteDoProcessor")
@Scope("prototype")
public class ASETrxDeleteDoRecordBean extends AbsTrxDoLogicManager {

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		super.parseParameters(logicObj);
		super.parsePostParamenter();
		
		FuncDataObj processResult = new FuncDataObj();
		

		this.strSchema = getSchema(currrentLogicObj.getTablename());
		
		String tableName_M = currrentLogicObj.getTablename();
		
		
		String cascade =currrentLogicObj==null?currrentQueryObj.getCascadeevent():currrentLogicObj.getCascadeevent();
		if("Y".equalsIgnoreCase(cascade)){
			
			
			String tableName_E = getEventTableName();
			tableName_E = this.strSchema+"."+tableName_E;
			
			this.strTableName = getTableNameWithoutSchema(tableName_E);
			processResult.mergeResponse(updateOrgiDoData("D",tableName_E));
		}
		
		processResult.mergeResponse(updateOrgiDoData("D",tableName_M));
		
		
//		processResult.mergeResponse(addNewDoData("P"));
		
		return processResult;
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		super.parseParameters(logicObj);
		super.parsePostParamenter();
		
		FuncDataObj processResult = new FuncDataObj();
		
		
		this.strSchema = getSchema(currrentLogicObj.getTablename());
		
		String tableName_M = currrentLogicObj.getTablename();
		
		
		String cascade =currrentLogicObj==null?currrentQueryObj.getCascadeevent():currrentLogicObj.getCascadeevent();
		if("Y".equalsIgnoreCase(cascade)){
			String tableName_E = getEventTableName();
			tableName_E = this.strSchema+"."+tableName_E;
			processResult.mergeResponse(deleteOrgiDoData("D",tableName_E));
		}
		
		processResult.mergeResponse(deleteOrgiDoData("D",tableName_M));
		
//		processResult.mergeResponse(updateNewDoData());
		
		return processResult;
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		super.parseParameters(logicObj);
		super.parsePostParamenter();
		
		FuncDataObj processResult = new FuncDataObj();
		
		this.strSchema = getSchema(currrentLogicObj.getTablename());
		
		String tableName_M = currrentLogicObj.getTablename();
		
		
		String cascade =currrentLogicObj==null?currrentQueryObj.getCascadeevent():currrentLogicObj.getCascadeevent();
		if("Y".equalsIgnoreCase(cascade)){
			String tableName_E = getEventTableName();
			tableName_E = this.strSchema+"."+tableName_E;
			processResult.mergeResponse(deleteOrgiDoData("D",tableName_E));
		}
		
		processResult.mergeResponse(deleteOrgiDoData("D",tableName_M));
		
		
//		processResult.mergeResponse(addNewDoData("M"));
		
		return processResult;
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj)
			throws Exception {
		super.parseParameters(logicObj);
		super.parsePostParamenter();
		
		FuncDataObj processResult = new FuncDataObj();
		
		this.strSchema = getSchema(currrentLogicObj.getTablename());
		
		String tableName_M = currrentLogicObj.getTablename();
		
		
		String cascade =currrentLogicObj==null?currrentQueryObj.getCascadeevent():currrentLogicObj.getCascadeevent();
		if("Y".equalsIgnoreCase(cascade)){
			
			
			String tableName_E = getEventTableName();
			tableName_E = this.strSchema+"."+tableName_E;
			
			this.strTableName = getTableNameWithoutSchema(tableName_E);
			processResult.mergeResponse(updateOrgiDoData("D",tableName_E));
		}
		
		processResult.mergeResponse(updateOrgiDoData("D",tableName_M));
		
		
		return processResult;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	
}

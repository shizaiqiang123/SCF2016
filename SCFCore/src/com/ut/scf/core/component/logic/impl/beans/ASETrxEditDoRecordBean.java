package com.ut.scf.core.component.logic.impl.beans;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.scf.core.component.AbsTrxDoLogicManager;
import com.ut.scf.core.component.ComponentConst;
import com.ut.scf.core.data.AbsDataObject;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;

import net.sf.json.JSONObject;

@Service("trxEditDoProcessor")
@Scope("prototype")
public class ASETrxEditDoRecordBean extends AbsTrxDoLogicManager {

	@Override
	public FuncDataObj releaseData(FuncDataObj logicObj) throws Exception {
		return postReleaseData(logicObj);
	}

	@Override
	public FuncDataObj postPendingData(FuncDataObj logicObj) throws Exception {
		String strTrxType = logicObj.getFuncType();
		FuncDataObj processResult = new FuncDataObj();
		if (ComponentConst.COMP_FUNC_TYPE_FIX_PENDING.equalsIgnoreCase(strTrxType)) {
			processResult.mergeResponse(postFixPendingData(logicObj));
		} else {
			super.parseParameters(logicObj);
			super.parsePostParamenter();

			JSONObject trxData = currentTrxData;
			boolean isMult = isMultipleRecord(trxData);
			if (isMult) {
				int totalRecords = getRecordCount(trxData);
				if (totalRecords > 0) {

					this.strSchema = getSchema(currrentLogicObj.getTablename());

					String tableName_M = currrentLogicObj.getTablename();

					String cascade = currrentLogicObj == null ? currrentQueryObj.getCascadeevent()
							: currrentLogicObj.getCascadeevent();
					if ("Y".equalsIgnoreCase(cascade)) {

						String tableName_E = getEventTableName();
						tableName_E = this.strSchema + "." + tableName_E;

						this.strTableName = getTableNameWithoutSchema(tableName_E);
						processResult.mergeResponse(updateOrgiDoData("D", tableName_E));
						processResult.mergeResponse(addNewDoData("P"));
					}

					this.strTableName = getTableNameWithoutSchema(tableName_M);

					processResult.mergeResponse(updateOrgiDoData("D", tableName_M));

					processResult.mergeResponse(addNewDoData("P"));

					return processResult;
				}else if(totalRecords==0&&"EDIT".equalsIgnoreCase(logicObj.getMainPageType())){//主交易是EDIT
					trxData = JsonHelper.getTrxObject(logicObj.getReqData());//得到所有数据
//					String tableName = currrentLogicObj.getTablename();
					this.strSchema = getSchema(currrentLogicObj.getTablename());
					String tableName_M = currrentLogicObj.getTablename();
					String cascade = currrentLogicObj == null ? currrentQueryObj.getCascadeevent()
							: currrentLogicObj.getCascadeevent();
					if ("Y".equalsIgnoreCase(cascade)) {

						String tableName_E = getEventTableName();
						tableName_E = this.strSchema + "." + tableName_E;
						processResult.mergeResponse(updateOrgiDoData("D", tableName_E));
					}
					processResult.mergeResponse(updateOrgiDoData("D", tableName_M));
				}
			}
			return processResult;
		}
		return processResult;

	}
	

	/**
	 * fixPending交易
	 * @param logicObj
	 * @return
	 * @throws Exception
	 */
	public FuncDataObj postFixPendingData(FuncDataObj logicObj) throws Exception {

		super.parseParameters(logicObj);
		super.parsePostParamenter();

		FuncDataObj processResult = new FuncDataObj();
		JSONObject trxData = currentTrxData;
		boolean isMult = isMultipleRecord(trxData);
		if (isMult) {
			int totalRecords = getRecordCount(trxData);
			if (totalRecords > 0) {

				this.strSchema = getSchema(currrentLogicObj.getTablename());

				String tableName_M = currrentLogicObj.getTablename();

				String cascade = currrentLogicObj == null ? currrentQueryObj.getCascadeevent()
						: currrentLogicObj.getCascadeevent();
				if ("Y".equalsIgnoreCase(cascade)) {

					String tableName_E = getEventTableName();
					tableName_E = this.strSchema + "." + tableName_E;

					this.strTableName = getTableNameWithoutSchema(tableName_E);
					processResult.mergeResponse(updateOrgiDoData("D", tableName_E));
					processResult.mergeResponse(addNewDoData("P"));
				}

				this.strTableName = getTableNameWithoutSchema(tableName_M);

				processResult.mergeResponse(updateOrgiDoData("D", tableName_M));

				processResult.mergeResponse(addNewDoData("P"));

				return processResult;
			}else if(totalRecords==0){
				trxData = JsonHelper.getTrxObject(logicObj.getReqData());//得到所有数据
//				String tableName = currrentLogicObj.getTablename();
				this.strSchema = getSchema(currrentLogicObj.getTablename());
				String tableName_M = currrentLogicObj.getTablename();
				String cascade = currrentLogicObj == null ? currrentQueryObj.getCascadeevent()
						: currrentLogicObj.getCascadeevent();
				if ("Y".equalsIgnoreCase(cascade)) {

					String tableName_E = getEventTableName();
					tableName_E = this.strSchema + "." + tableName_E;
					processResult.mergeResponse(deleteData(trxData,tableName_E));
				}
				processResult.mergeResponse(deleteData(trxData,tableName_M));
			}
		}
		return processResult;
	}
	
	//fixPending的时候如果表格数据为空，会删除之前申请的数据
	public FuncDataObj deleteData(JSONObject trxData,String tableName){
		
		String fpPatam = currrentLogicObj.getFpParam();
		
		FuncDataObj obj = new FuncDataObj();	
		
	
		List<Object> valueList = new ArrayList<Object>();
		StringBuffer condition = new StringBuffer(" where ");
		condition.append("sysLockFlag").append(" = ? and ")
		.append("sysLockBy").append(" = ? and ").append(" sysTrxSts = ? ");
		valueList.add("T");
		valueList.add(trxData.containsKey(fpPatam)?trxData.getString(fpPatam):"");
		valueList.add("P");
		
		StringBuffer sqlBuff = new StringBuffer();
		sqlBuff.append("delete from ").append( ClassLoadHelper.getOrmName(tableName)).append(condition);
		IDaoEntity daoEntity = new ExecDaoEntity();	
		daoEntity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		daoEntity.setHql(sqlBuff.toString());
		daoEntity.setParaList(valueList);
		daoEntity.setTableName( ClassLoadHelper.getOrmName(tableName));
		daoEntity.setOperateName(IDaoEntity.OPERATE_NAME_DELETE);
		obj.addExcuteEntity(daoEntity);	
		return obj;
	}

	@Override
	public FuncDataObj postReleaseData(FuncDataObj logicObj) throws Exception {
		super.parseParameters(logicObj);
		super.parsePostParamenter();

		FuncDataObj processResult = new FuncDataObj();

		JSONObject trxData = currentTrxData;
		boolean isMult = isMultipleRecord(trxData);
		if (isMult) {
			int totalRecords = getRecordCount(trxData);
			if (totalRecords > 0) {
				this.strSchema = getSchema(currrentLogicObj.getTablename());

				String tableName_M = currrentLogicObj.getTablename();

				String cascade = currrentLogicObj == null ? currrentQueryObj.getCascadeevent()
						: currrentLogicObj.getCascadeevent();
				if ("Y".equalsIgnoreCase(cascade)) {
					String tableName_E = getEventTableName();
					tableName_E = this.strSchema + "." + tableName_E;
					 processResult.mergeResponse(deleteOrgiDoData("D",tableName_E));
					this.strTableName = getTableNameWithoutSchema(tableName_E);
					processResult.mergeResponse(updateNewDoData());
				}

				processResult.mergeResponse(deleteOrgiDoData("D", tableName_M));

				this.strTableName = getTableNameWithoutSchema(tableName_M);

				processResult.mergeResponse(updateNewDoData());
			}else if(totalRecords==0&&"EDIT".equalsIgnoreCase(logicObj.getMainPageType())){//主交易是EDIT
				trxData = JsonHelper.getTrxObject(logicObj.getReqData());//得到所有数据
				this.strSchema = getSchema(currrentLogicObj.getTablename());
				String tableName_M = currrentLogicObj.getTablename();
				String cascade = currrentLogicObj == null ? currrentQueryObj.getCascadeevent()
						: currrentLogicObj.getCascadeevent();
				if ("Y".equalsIgnoreCase(cascade)) {

					String tableName_E = getEventTableName();
					tableName_E = this.strSchema + "." + tableName_E;
					 processResult.mergeResponse(deleteOrgiDoData("D",tableName_E));
				}
				processResult.mergeResponse(deleteOrgiDoData("D", tableName_M));
			}
		}

		return processResult;
	}

	@Override
	public FuncDataObj postMasterData(FuncDataObj logicObj) throws Exception {
		super.parseParameters(logicObj);
		super.parsePostParamenter();

		FuncDataObj processResult = new FuncDataObj();

		JSONObject trxData = currentTrxData;
		boolean isMult = isMultipleRecord(trxData);
		if (isMult) {
			int totalRecords = getRecordCount(trxData);
			if (totalRecords > 0) {
				this.strSchema = getSchema(currrentLogicObj.getTablename());

				String tableName_M = currrentLogicObj.getTablename();

				String cascade = currrentLogicObj == null ? currrentQueryObj.getCascadeevent()
						: currrentLogicObj.getCascadeevent();
				if ("Y".equalsIgnoreCase(cascade)) {

					String tableName_E = getEventTableName();
					tableName_E = this.strSchema + "." + tableName_E;
					processResult.mergeResponse(deleteOrgiDoData("M", tableName_E));
					this.strTableName = getTableNameWithoutSchema(tableName_E);
					processResult.mergeResponse(addNewDoData("M"));
				}

				processResult.mergeResponse(deleteOrgiDoData("M", tableName_M));

				this.strTableName = getTableNameWithoutSchema(tableName_M);
				processResult.mergeResponse(addNewDoData("M"));
			}
		}
		return processResult;
	}

	@Override
	public FuncDataObj postDeletePendingData(FuncDataObj logicObj) throws Exception {
		super.parseParameters(logicObj);
		super.parsePostParamenter();

		FuncDataObj processResult = new FuncDataObj();
		JSONObject trxData = currentTrxData;
		boolean isMult = isMultipleRecord(trxData);
		if (isMult) {
			int totalRecords = getRecordCount(trxData);
			if (totalRecords > 0) {
				this.strSchema = getSchema(currrentLogicObj.getTablename());

				String tableName_M = currrentLogicObj.getTablename();

				String cascade = currrentLogicObj == null ? currrentQueryObj.getCascadeevent()
						: currrentLogicObj.getCascadeevent();
				if ("Y".equalsIgnoreCase(cascade)) {
					String tableName_E = getEventTableName();
					tableName_E = this.strSchema + "." + tableName_E;
					processResult.mergeResponse(deleteOrgiDoData("P", tableName_E));
					processResult.mergeResponse(updateOrgiDoData("M", tableName_E));
				}
				processResult.mergeResponse(deleteOrgiDoData("P", tableName_M));

				processResult.mergeResponse(updateOrgiDoData("M", tableName_M));
			}
		}
		return processResult;
	}

	@Override
	public FuncDataObj rollbackData(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}

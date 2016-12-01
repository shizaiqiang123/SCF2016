package com.ut.scf.core.gapi;

import java.io.File;

import javax.annotation.Resource;

import net.sf.json.JSONObject;



import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.js.ServerSideJsImpl;
import com.ut.scf.dao.IDaoHelper;

@Service("gapiJsEngine")
public class GapiJsEngine extends ServerSideJsImpl{
	
	private AbsObject logicPara;
	
	@Resource(name = "queryFactory")
	private IQueryFactory queryFactory;
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoExecHelper;
	@Override
	public void initTrxPara(Object trxPara) {
		super.trxPara = (AbsObject) trxPara;
	}

	@Override
	public void executeJsFile(String fileName) throws Exception {
		if (StringUtil.isTrimEmpty(fileName))
			return;
		File scriptFile = new File(getJsFilePath("gapi", fileName));
		super.executeJsFile(scriptFile.getPath());
	}
	public Object getParaId(){
		GapiMsgPara gapiMsgPara=(GapiMsgPara)trxPara;
		String gapi=gapiMsgPara.getGapi();
		return gapi;
	}

	public JSONObject queryTable(String tableName, String params, String[] values) throws Exception {
		FuncDataObj logicObj = new FuncDataObj();
		logicObj.setReqData(JsonUtil.clone((JSONObject) this.trxData));
		QueryNode qn = new QueryNode();
		if (logicPara instanceof LogicNode) {
			LogicNode ld = (LogicNode) logicPara;
			qn.setTablename(ld.getTablename());
			StringBuffer hql = new StringBuffer();
			String sql = "from " + tableName;
			hql.append(sql);
			if (StringUtil.isNotEmpty(params) && values != null) {
				String[] queryParams = params.split(",");
				hql.append(" where ");
				for (int i = 0; i < queryParams.length; i++) {
					hql.append(queryParams[i] + " =? and ");
				}
				if (hql.toString().endsWith(" and ")) {
					hql.delete(hql.length() - " and ".length(), hql.length());
				}

				String queryValues = values[0];
				for (int i = 1; i < values.length; i++) {
					queryValues = queryValues + "," + values[i];
				}
				qn.setParams(queryValues);
			}

			qn.setSql(hql.toString());
			qn.setType("S");
			qn.setCascadeevent("N");
		}
		logicObj.setReqParaObj(qn);
		FuncDataObj retData;
		try {
			retData = queryFactory.getProcessor(qn).queryData(logicObj);
			this.daoExecHelper.execQuery(retData);
			if (FuncDataObj.SUCCESS.equalsIgnoreCase(retData.getRetStatus())) {
				return JsonUtil.getJSON(retData.getData());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public void addVerifyResult(Boolean result){
		boolean verifyResult=result;
		((JSONObject)trxData).put("verifyResult", result);
//		return jsonDate;
	}

}

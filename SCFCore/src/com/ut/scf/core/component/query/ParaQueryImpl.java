package com.ut.scf.core.component.query;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.para.ParaQueryFactory;

/**
 * 
 * @author PanHao
 * @see parameters 统一查询实现类
 */
@Component("paraQuery")
public class ParaQueryImpl implements IQueryComponent{

	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		JSONObject reqData = logicObj.getReqData();
		QueryNode queryPara = (QueryNode) logicObj.getReqParaObj();
		String strParaId= getXmlFileName(reqData);
		String strParaPath = queryPara.getTablename();
		
		if(StringUtil.isTrimEmpty(strParaId)){
			logicObj.buildRespose();
			return logicObj;
		}
		//NIO 锁机制优化
		try {
			Object obj  = ParaQueryFactory.getParaQueryImpl(strParaPath).getParaDefine(strParaId, strParaPath, "");
			JSONObject trxData = JsonHelper.getTrxObject(reqData);
			trxData.putAll(JsonUtil.getJSON(obj));
			logicObj.buildRespose(trxData.toString());
		} catch (Exception e) {
			e.printStackTrace();
			logicObj.setRetStatus(FuncDataObj.EXCEPTION);
			logicObj.setRetInfo("File format exception, id:"+strParaId);
		}
		return logicObj;
	}

	private String getXmlFileName(JSONObject reqData) {
		
		return reqData.containsKey("paraId")?reqData.getString("paraId"):"";
	}

}

package com.ut.scf.core.gapi;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.scf.core.component.logic.LogicFactoryImpl;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.orm.std.GapiMsg;

@Service("gapiMsgManager")
public class GAPIMsgManager implements IGAPIMsgManager{
	@Resource(name="gapiDemerge")
	private IGAPIMsgDemerge demerger;
	
	@Resource(name="gapiProcessor")
	private IGAPIMsgMerge generator;
	
	@Resource(name = "logicFactory")
	LogicFactoryImpl logicFactory;
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Override
	public List<Object> demerge(GapiMsgPara para, Object gapiMsg) throws Exception {
		return demerger.demerge(para, gapiMsg);
	}

	@Override
	public Object mergeMsg(GapiMsgPara para, Object reqDom) throws Exception {
		return generator.mergeMsg(para, reqDom);
	}

	@Override
	public Object storeMsg(GapiMsgPara para, Object reqDom, boolean autoCommit)
			throws Exception {
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject gapiObj=new JSONObject();
		if(reqDom instanceof GapiMsg){
			gapiObj=JsonUtil.getJSON(reqDom);
		}else{
			throw new Exception("Object is not a GAPIMsg.");
		}
		dataObj.setReqData(gapiObj);
		LogicNode logicNode=new LogicNode();
		logicNode.setTablename("STD.GAPI_MSG");
		logicNode.setType("E");
		dataObj.setReqParaObj(logicNode);
		dataObj=logicFactory.getProcessor(logicNode).postData(dataObj);
		daoHelper.execUpdate(dataObj);
		return dataObj;
	}

	@Override
	public Object resendMsg(GapiMsgPara para, Object reqDom, boolean autoCommit)
			throws Exception {
		return null;
	}

	@Override
	public Object deleteMsg(GapiMsgPara para, String msgId, boolean autoCommit)
			throws Exception {
		return null;
	}

}

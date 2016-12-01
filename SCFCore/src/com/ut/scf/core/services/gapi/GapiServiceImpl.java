package com.ut.scf.core.services.gapi;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.comm.xml.gapi.GapiPara;
import com.ut.comm.xml.service.ServicePara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.services.AbsESBServiceImpl;

@Service("gapiServiceImpl")
public class GapiServiceImpl extends AbsESBServiceImpl{
	/**
	 * 
	 */

	@Override
	public void initialize() {
		super.getLogger().debug("initialize service start...");
		super.getLogger().debug("initialize service id:"+getServiceId());
		super.getLogger().debug("initialize service start success.");
	}

	@Override
	public void destroy() {
		super.getLogger().debug("destroy service start...");
		super.getLogger().debug("destroy service id:"+getServiceId());
		super.getLogger().debug("destroy service success.");
	}

	@Override
	public String getServiceId() {
		return "GAPI";
	}

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void queryServiceList(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void queryServiceCount(FuncDataObj logicObj) throws Exception {
		
	}

	@Override
	public void postPendingData(FuncDataObj dataObj) throws Exception {
		
	}

	@Override
	public void postMasterData(FuncDataObj dataObj) throws Exception {
		//读取当前的参数，追加到请求数据中
		ServicePara servicePara=(ServicePara) dataObj.getReqParaObj();
		String gapiMsg=servicePara.getGapiid();		
		GapiMsgPara gapiMsgPara=XMLParaParseHelper.parseGapiMsgPara(gapiMsg, servicePara.getBu());
		if(gapiMsgPara.getGapi()!=null){
			String gapi=gapiMsgPara.getGapi();
			GapiPara gapiPara=XMLParaParseHelper.parseGapiPara(gapi, "");
			JSONObject returnjson = JsonUtil.createJson("trxDom");
			returnjson.putAll(gapiPara.getProterties());
			dataObj.buildRespose(returnjson);
		}
	}

	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		postMasterData(dataObj);
	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		
	}
}

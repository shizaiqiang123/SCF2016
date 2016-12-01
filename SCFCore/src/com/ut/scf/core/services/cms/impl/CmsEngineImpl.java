package com.ut.scf.core.services.cms.impl;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.verify.VerifyPara;
import com.ut.scf.core.data.FuncDataObj;

@Service("cmsEngine")
public class CmsEngineImpl implements ICmsService {

	VerifyPara para;

	@Override
	public Object getCustNo(FuncDataObj data) {
		JSONObject jsonData = data.getReqData();
		JSONObject trxData = JsonHelper.getTrxObject(jsonData);
		para=(VerifyPara) data.getReqParaObj();
		// 从前台取输入的验证码
		String inputCode =trxData.containsKey("inputCode")?trxData.getString("inputCode"):"";
		String keyName = para.getKeyname();
		String keyValue=trxData.containsKey(keyName)?trxData.getString(keyName):"";
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("CMS_CODE", "CMS000001");
		data.buildRespose(map);
		return data;
	}

}

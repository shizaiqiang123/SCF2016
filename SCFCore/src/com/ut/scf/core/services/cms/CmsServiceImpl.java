package com.ut.scf.core.services.cms;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.verify.VerifyPara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.services.AbsESBServiceImpl;
import com.ut.scf.core.services.cms.impl.ICmsService;
/*
 * @author yhy
 */
@Service("cmsService")
public class CmsServiceImpl extends AbsESBServiceImpl{
	
	@Resource(name="cmsEngine")
	ICmsService service ;

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {

	}
	

	private VerifyPara getVerifyDefine(JSONObject jsonObject) {
		return null;
	}

	@Override
	public void perViewServiceData(FuncDataObj logicObj) throws Exception {
		
		viewServiceData(logicObj);
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
		List<String> reportRules = super.getRules();
		if(reportRules.size()>1){
			dataObj.setRetStatus("");
			dataObj.setRetInfo("No Service defined in current request.");
			return;
		}
		String verifyId = reportRules.get(0);//默认最多一个验证码
		VerifyPara verifyPara = new VerifyPara();
		verifyPara.setId(verifyId);
		XMLParaParseHelper.parseApPara(verifyPara, "verify", currentBu);
		dataObj.setReqParaObj(verifyPara);	
		service.getCustNo(dataObj);
	}


	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		
	}

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
	
}

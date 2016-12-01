package com.ut.scf.core.services.verification;

import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.verify.VerifyPara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.services.AbsESBServiceImpl;
import com.ut.scf.core.services.verification.impl.IVerifcationCodeService;
import com.ut.scf.core.services.verification.impl.VerificationCodeStore;
/*
 * @author yhy
 */
@Service("verificationCodeService")
public class VerificationCodeServiceImpl extends AbsESBServiceImpl{
	
	@Resource(name="verificationCodeEngine")
	IVerifcationCodeService service ;

	@Override
	public void viewServiceData(FuncDataObj logicObj) throws Exception {
		List<String> reportRules = super.getRules();
		if(reportRules.size()>1){
			logicObj.setRetStatus("");
			logicObj.setRetInfo("No Service defined in current request.");
			return;
		}
		String verifyId = reportRules.get(0);//默认最多一个验证码
		VerifyPara verifyPara = new VerifyPara();
		verifyPara.setId(verifyId);
		XMLParaParseHelper.parseApPara(verifyPara, "verify", currentBu);
		logicObj.setReqParaObj(verifyPara);	
		service.generateCode(logicObj);
		Object data=logicObj.getData().get("data");
		 
		logicObj.buildRespose(data);
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
		service.verifyCode(dataObj);
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
		service.verifyCode(dataObj);
	}


	@Override
	public void postReleaseData(FuncDataObj dataObj) throws Exception {
		service.verifyCode(dataObj);
	}

	@Override
	public void rollback(FuncDataObj dataObj) {
		
	}

	@Override
	public void initialize() {
		super.getLogger().debug("initialize service start...");
		super.getLogger().debug("initialize service id:"+getServiceId());
		VerificationCodeStore.initlize();
		super.getLogger().debug("initialize service start success.");
	}

	@Override
	public void destroy() {
		super.getLogger().debug("destroy service start...");
		super.getLogger().debug("destroy service id:"+getServiceId());
		VerificationCodeStore.destory();
		super.getLogger().debug("destroy service success.");
	}
	
}

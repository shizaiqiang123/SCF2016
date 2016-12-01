package com.ut.scf.core.services.verification.impl;

import java.lang.reflect.InvocationTargetException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.lang.text.FormatFactory;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.verify.VerifyPara;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.services.verification.FormatVerifyFactory;

@Service("verificationCodeEngine")
public class VerificationCodeEngineImpl implements IVerifcationCodeService {

	/*
	 * 0验证码验证成功
	 * 1验证码验证失败
	 * 2验证码验证次数超过最大次数
	 */
	public static final int RESULT_SUCCESS=0;
	public static final int RESULT_FAILED=1;
	public static final int RESULT_ERROR_TIMES_OVERSTEP=2;
	VerifyPara para;
	@Override
	public Object generateCode(FuncDataObj data) throws Exception {
		para = (VerifyPara) data.getReqParaObj();
		Map<String, Object> obj=new HashMap<String, Object>();
		if("1".equalsIgnoreCase(para.getSendtp())){
			obj=verIfyNum(data);
		}else if("2".equalsIgnoreCase(para.getSendtp())){
			JSONObject jsonData = data.getReqData();
			JSONObject trxDom=(JSONObject) jsonData.get("trxDom");
			String telphone=trxDom.containsKey("mobPhone")?trxDom.getString("mobPhone"):"";
			if("".equalsIgnoreCase(telphone)){
				telphone=trxDom.containsKey("telphone")?trxDom.getString("telphone"):"";
				if("".equalsIgnoreCase(telphone)){
					throw new Exception("电话号码为空");
				}
				
			}
			String message=trxDom.containsKey("message")?trxDom.getString("message"):"";
			obj.put("telphone", telphone);
			obj.put("message", message);
		}
		data.buildRespose(obj);
		return null;
	}
	public Map<String, Object> verIfyNum(FuncDataObj data) throws Exception{
		JSONObject jsonData = data.getReqData();
		VerifyPara para = (VerifyPara) data.getReqParaObj();
		JSONObject trxDom=(JSONObject) jsonData.get("trxDom");
//		String telphone=trxDom.containsKey("mobPhone")?trxDom.getString("mobPhone"):"";
//		if("".equalsIgnoreCase(telphone)){
//			throw new Exception("电话号码为空");
//		}
		String sendTp = para.getSendtp();
		String validTimes = para.getValidtime();
		String codeLen = para.getCodelen();
		String keyName = para.getKeyname();
		JSONObject trxData = JsonHelper.getTrxObject(jsonData);
		String keyVlaue = trxData.containsKey(keyName) ? trxData.getString(keyName) : "";
		String verify=VerificationCodeStore.getCode(keyVlaue);
		/*
		 * 验证码重复修改
		 */
//		if(verify!=null){
//			Map<String, Object> obj=new HashMap<>();
//			obj.put("code", verify);
//			obj.put("telphone", telphone);
//			data.buildRespose(obj);
//			return obj;
//			VerificationCodeStore.destory();
//		}
		// if keyvalue === null throw exception
		if ("".equalsIgnoreCase(keyVlaue)) {
			throw new Exception("keyvalue is null.");
		}
		// 随机数
//		String code = "";
//		String radix = "abcdefghijklmnopqrstuvwxyz";
//		if ("2".equalsIgnoreCase(para.getCodeTp())) {
//			for (int i = 0; i < Integer.parseInt(codeLen); i++) {
//				char codeSize = (char) (Math.random() * 26 + 97);
//				code += codeSize;
//			}
//		} else if ("3".equalsIgnoreCase(para.getCodeTp())) {
//			for (int i = 0; i < Integer.parseInt(codeLen); i++) {
//				int codeSize = (int) (Math.random() * 36);
//				if (codeSize < 10) {
//					code += codeSize;
//				} else {
//					char mapping = (char) (codeSize + 87);
//					code += mapping;
//				}
//			}
//		} else {
//			for (int i = 0; i < Integer.parseInt(codeLen); i++) {
//				int codeSize = (int) (Math.random() * 9);
//				code += String.valueOf(codeSize);
//			}
//		}
		String code=FormatVerifyFactory.getRandomCode(para.getCodeTp(),Integer.parseInt(codeLen)).toString();
		VerificationCode codeEntity = new VerificationCode();
		codeEntity.setCode(code);
		Timestamp createTime = new Timestamp(new Date().getTime());
		codeEntity.setCreateTime(createTime);
		codeEntity.setKey(keyVlaue);
		codeEntity.setTime(validTimes);
		codeEntity.setInputErrorTms(0);
		VerificationCodeStore.storeCode(codeEntity);
		Map<String, Object> obj=new HashMap<String, Object>();
		obj.put("code", code);
//		obj.put("telphone", telphone);
		return obj;
	}

	@Override
	public Object verifyCode(FuncDataObj data) {
		JSONObject jsonData = data.getReqData();
		JSONObject trxData = JsonHelper.getTrxObject(jsonData);
		para=(VerifyPara) data.getReqParaObj();
		// 从前台取输入的验证码
		String inputCode =trxData.containsKey("inputCode")?trxData.getString("inputCode"):"";
		String keyName = para.getKeyname();
		String keyValue=trxData.containsKey(keyName)?trxData.getString(keyName):"";
		String storeCode = VerificationCodeStore.getCode(keyValue);
		int result = inputCode.equalsIgnoreCase(storeCode)?RESULT_SUCCESS:RESULT_FAILED;
		if(result==RESULT_SUCCESS){
			VerificationCodeStore.invalidCode(VerificationCodeStore.getCodeMap(keyValue));
		}else{
			VerificationCode codeEntity = VerificationCodeStore.getCodeMap(keyValue);
			if(codeEntity!=null){
				int times = codeEntity.getInputErrorTms();
				if(times>=Integer.valueOf(para.getErrorTimes())){
					VerificationCodeStore.invalidCode(VerificationCodeStore.getCodeMap(keyValue));
					result=RESULT_ERROR_TIMES_OVERSTEP;
				}else{
					codeEntity.setInputErrorTms(times+1);
					VerificationCodeStore.storeCode(codeEntity);}
			}else{
				result=RESULT_ERROR_TIMES_OVERSTEP;
			}
			
		}
		data.buildRespose(result);
		return data;
	}

}

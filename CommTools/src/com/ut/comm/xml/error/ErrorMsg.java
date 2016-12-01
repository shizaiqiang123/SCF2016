package com.ut.comm.xml.error;

import java.util.ArrayList;
import java.util.List;

import org.springframework.util.Assert;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaHelper;

public class ErrorMsg extends AbsObject{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public String getNodeName() {
		return XMLParaHelper.NOTE_NAME_ERROR_MSG;
	}
	private String lang;
	private String msg;

	public String getLang() {
		return lang;
	}
	public void setLang(String lang) {
		this.lang = lang;
	}
	public String getMsg(List<Object> paras) {
		if(StringUtil.isTrimEmpty(msg)){
			return "No error message configed.";
		}
		
		if(paras==null){
			paras = new ArrayList<Object>();
		}
		
		int realParaSize = msg.split("%s").length-1;
		int inputSize = paras.size();
		Assert.isTrue(realParaSize ==inputSize , String.format("Wrong input parameters form error message, config size is %s, but input size is %s",realParaSize,inputSize));
		
		msg = String.format(msg, paras.toArray(new Object[paras.size()]));
		return msg;
	}
	public String getMsg() {
		return getMsg(new ArrayList<Object>());
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}

}

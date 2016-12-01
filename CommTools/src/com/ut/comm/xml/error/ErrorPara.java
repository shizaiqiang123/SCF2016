package com.ut.comm.xml.error;

import java.util.ArrayList;
import java.util.List;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaHelper;

public class ErrorPara extends AbsObject{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ErrorPara(){
		XMLParaHelper.registeObjectBean(XMLParaHelper.NOTE_NAME_ERROR_MSG, ErrorMsg.class);
	}

	@Override
	public String getNodeName() {
		return XMLParaHelper.NOTE_NAME_ERROR_CODE;
	}
	
	private String name;
	private String desc;
	private String type;
	private String code;
	private String defaultLang;
	private List<ErrorMsg> errMsgList;

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDefaultLang() {
		return defaultLang;
	}
	public void setDefaultLang(String defaultLang) {
		this.defaultLang = defaultLang;
	}
	public List<ErrorMsg> getErrMsgList() {
		return errMsgList;
	}
	public void setErrMsgList(List<ErrorMsg> errMsgList) {
		this.errMsgList = errMsgList;
	}

	public ErrorMsg getErrmsg(int index) {
		if(errMsgList==null ||errMsgList.isEmpty()||index>errMsgList.size()-1){
			return null;
		}
		return errMsgList.get(index);
	}
	
	public ErrorMsg getErrmsg(String cnty) {
		if(errMsgList==null ||errMsgList.isEmpty()){
			return null;
		}
		if(StringUtil.isTrimEmpty(cnty)){
			return getErrmsg(this.getDefaultLang());
		}
		for (ErrorMsg errorMsg : errMsgList) {
			if(cnty.equalsIgnoreCase(errorMsg.getLang())){
				return errorMsg;
			}
		}
		return getErrmsg(this.getDefaultLang());
	}
	
	public void setErrmsg(ErrorMsg errMsg) {
		if(errMsgList==null){
			errMsgList = new ArrayList<ErrorMsg>();
		}
		errMsgList.add(errMsg);
	}
	public void setErrmsg(ErrorMsg errMsg,int index) {
		if(errMsgList==null){
			errMsgList = new ArrayList<ErrorMsg>();
		}
		if(index>this.errMsgList.size())
			this.errMsgList.add(errMsg);
	}
	
	public int getErrmsgSize(){
		return this.errMsgList==null?0:this.errMsgList.size();
	}
}

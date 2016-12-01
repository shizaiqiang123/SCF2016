package com.ut.comm.xml.method;

import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaHelper;

public class MethodDefinePara extends AbsObject {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5769205066575779170L;

	@Override
	public String getNodeName() {
		return XMLParaHelper.NOTE_NAME_METHOD_DEFINE;
	}
	
	private String name;
	
	private String desc;
	
	private String esbServiceId;
	
	/**
	 * 映射到GAPI MSG定义
	 */
	private String gapimsg;
	
	private String type;
	
	private String busiTp;
	
	private String formator;

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

	public String getGapimsg() {
		return gapimsg;
	}

	public void setGapimsg(String gapimsg) {
		this.gapimsg = gapimsg;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getEsbServiceId() {
		return esbServiceId;
	}

	public void setEsbServiceId(String esbServiceId) {
		this.esbServiceId = esbServiceId;
	}

	public String getBusiTp() {
		return busiTp;
	}

	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}

	public String getFormator() {
		return formator;
	}

	public void setFormator(String formator) {
		this.formator = formator;
	}

	
}

package com.ut.dtc.intf.data;

/**
 * @see 消息类型的定义
 * dtc_0001 客户信息
 * dtc_0002 发票信息
 * dtc_0003 付款信息
 * @author 潘浩
 *
 */
public class MsgTypeDefine {
	/**
	 * 消息类型
	 */
	
	private String msgTp;
	
	/**
	 * 元数据解析映射
	 */
	private String metaMapping;
	
	/**
	 * 验证规则器
	 */
	private String validator;
	
	/**
	 * 消息体
	 */
	private String bodyMapping;
	
	/**
	 * 消息定义的bu，映射一个企业定制化逻辑
	 */
	private String custBu;
	
	/**
	 * 消息定义的机构号，对应一个银行分支机构号
	 */
	private String branch;
	
	/**
	 * 消息处理器，用于扩展消息生成机制
	 */
	private String processor;
	
	/**
	 * 产品嘛 
	 * 5 表示融易达
	 */
	private String busiTp;
	private String esbService;
	
	public String getMsgTp() {
		return msgTp;
	}
	public void setMsgTp(String msgTp) {
		this.msgTp = msgTp;
	}
	public String getValidator() {
		return validator;
	}
	public void setValidator(String validator) {
		this.validator = validator;
	}
	public String getMetaMapping() {
		return metaMapping;
	}
	public void setMetaMapping(String metaMapping) {
		this.metaMapping = metaMapping;
	}
	public String getBodyMapping() {
		return bodyMapping;
	}
	public void setBodyMapping(String bodyMapping) {
		this.bodyMapping = bodyMapping;
	}
	
	public String getCustBu() {
		return custBu;
	}
	public void setCustBu(String custBu) {
		this.custBu = custBu;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getProcessor() {
		return processor;
	}
	public void setProcessor(String processor) {
		this.processor = processor;
	}
	public String getBusiTp() {
		return busiTp;
	}
	public void setBusiTp(String busiTp) {
		this.busiTp = busiTp;
	}
	public String getEsbService() {
		return esbService;
	}
	public void setEsbService(String esbService) {
		this.esbService = esbService;
	}
}

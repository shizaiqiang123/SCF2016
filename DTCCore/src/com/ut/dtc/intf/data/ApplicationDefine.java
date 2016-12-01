package com.ut.dtc.intf.data;

import java.util.ArrayList;
import java.util.List;

public class ApplicationDefine {
	private String appId;
	private String appNm;
	private String routeId;
	private String appSts;
	private String appBu;
	
	private MsgTypeDefine msgDefine;
	
	private List<MsgTypeDefine> msgDefines;
	
	
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getAppNm() {
		return appNm;
	}
	public void setAppNm(String appNm) {
		this.appNm = appNm;
	}
	public String getRouteId() {
		return routeId;
	}
	public void setRouteId(String routeId) {
		this.routeId = routeId;
	}
	public String getAppSts() {
		return appSts;
	}
	public void setAppSts(String appSts) {
		this.appSts = appSts;
	}
	public MsgTypeDefine getMsgDefine(String msgTp) {
		if(msgDefines==null){
			msgDefines = new ArrayList<MsgTypeDefine>();
			return null;
		}
		for (MsgTypeDefine msgTypeDefine : msgDefines) {
			if(msgTypeDefine.getMsgTp().equalsIgnoreCase(msgTp)){
				msgDefine = msgTypeDefine;
				return msgTypeDefine;
			}
		}
		return null;
	}
	public void setMsgDefine(MsgTypeDefine msgDefine) {
		if(msgDefines==null){
			msgDefines = new ArrayList<MsgTypeDefine>();
		}
		msgDefines.add(msgDefine);
	}
	public String getAppBu() {
		return appBu;
	}
	public void setAppBu(String appBu) {
		this.appBu = appBu;
	}
	public List<MsgTypeDefine> getMsgDefines() {
		return msgDefines;
	}
	public void setMsgDefines(List<MsgTypeDefine> msgDefines) {
		this.msgDefines = msgDefines;
	}
	public MsgTypeDefine getMsgDefine() {
		return msgDefine;
	}
}

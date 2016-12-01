package com.ut.dtc.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.app.AppPara;
import com.ut.comm.xml.method.MethodDefinePara;
import com.ut.dtc.intf.IMetadata;
import com.ut.dtc.intf.data.ApplicationDefine;
import com.ut.dtc.intf.data.MsgTypeDefine;
import com.ut.scf.core.conf.IConfig;

@Service("dtcApplicationContext")
public class DTCApplicationContext implements IConfig{
	
	private static ApplicationContext context;// 声明一个静态变量保存
	
	private static Map<String, MsgTypeDefine> registedMsg = new HashMap<String, MsgTypeDefine>();
	
	private static Map<String, ApplicationDefine> registedApplication = new HashMap<String, ApplicationDefine>();
	
	private static List<String> appIds = new ArrayList<String>();
	
	static{
		appIds.add("APP0000019.xml");
//		appIds.add("APP0000020.xml");
//		appIds.add("APP0000021.xml");
	}

//	@Override
//	public void destroy() throws Exception {
//		registedMsg.clear();
//		registedApplication.clear();
//	}
//	@Override
//	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
//		DTCApplicationContext.context = applicationContext;
//		
//		registeDefinededMsg(registedMsg);
//		
//		registeApplication(registedApplication);
//	}
	
	private synchronized void registeDefinededMsg(Map<String, MsgTypeDefine> registedMsg2) {
		List<Map> definedMsg = getDefinedMsg();
		
		if(null != definedMsg &&!definedMsg.isEmpty()){
			for (Map map : definedMsg) {
				MsgTypeDefine define = new MsgTypeDefine();
				BeanUtils.setBeanProperty(define, map);
				registedMsg2.put(map.get("intf_Tp").toString(), define);
			}
		}
	}
	
	private synchronized void registeApplication(Map<String, ApplicationDefine> registedMsg2) {
		List<Map> definedMsg = getDefinedMsg();
		
		for (String string : appIds) {
			string= string.substring(0,string.indexOf("."));
			AppPara appPara  = XMLParaParseHelper.parseAppPara(string, "");
			ApplicationDefine app = new ApplicationDefine();
			app.setAppId(appPara.getId());
			app.setAppNm(appPara.getName());
			app.setAppSts("0");
			app.setRouteId(appPara.getId());
			
			for (int i = 0; i < appPara.getMethoddefineSize(); i++) {
				MethodDefinePara methodDefinePara = appPara.getMethoddefine(i);
				
				MsgTypeDefine mDefine = new MsgTypeDefine();
				mDefine.setBodyMapping(methodDefinePara.getGapimsg());
				mDefine.setBusiTp(methodDefinePara.getBusiTp());
				mDefine.setCustBu(methodDefinePara.getBu());
				mDefine.setEsbService(methodDefinePara.getEsbServiceId());
				mDefine.setMsgTp(methodDefinePara.getType());
				mDefine.setValidator(methodDefinePara.getFormator());
				
				app.setMsgDefine(mDefine);
				
				if(null != definedMsg &&!definedMsg.isEmpty()){
					for (Map map : definedMsg) {
						registedMsg2.put(map.get("intf_Tp").toString(), app);
					}
				}
			}
		}
	}
	
	private List<Map> getDefinedMsg() {
		String sql = "select intf_Tp , meta_Mapping from TRX.DTC_INTF_DEFINE_M where intf_Sts = ?";
		List<Object> parms = new ArrayList<Object>();
		parms.add("0");
	
		List<Object[]> queryResult =  DBUtil.queryData(sql, parms);
		List<Map> retList = new ArrayList<Map>();
		for (Object[] objects : queryResult) {
			Map<String, Object> record = new HashMap<String, Object>();
			record.put("intf_Tp", objects[0]);
			record.put("meta_Mapping", objects[1]);
			retList.add(record);
		}
		
		return retList;
	}
	
	private List<Map> getDefinedApp() {
		String sql = "select app_Tp , app_id from TRX.DTC_APP_DEFINE_M where app_Sts = ?";
		List<Object> parms = new ArrayList<Object>();
		parms.add("0");
	
		List<Object[]> queryResult = DBUtil.queryData(sql, parms);
		
		List<Map> retList = new ArrayList<Map>();
		for (Object[] objects : queryResult) {
			Map<String, Object> record = new HashMap<String, Object>();
			record.put("app_Tp", objects[0]);
			record.put("app_id", objects[1]);
		}
		
		return retList;
	}
	
	
	public static ApplicationContext getContext(){
		return context;
	}

	public static MsgTypeDefine getMetaDefine(String msgTp){
		if (registedMsg.containsKey(msgTp)) {
			return registedMsg.get(msgTp);
		}
		return new MsgTypeDefine();
	}
	
	public static ApplicationDefine getRegistedApp(String msgTp){
		if (registedApplication.containsKey(msgTp)) {
			return registedApplication.get(msgTp);
		}
		return new ApplicationDefine();
	}
	
	//支持发布订阅模式,返回ApplicationDefine【】
	public static ApplicationDefine routeRequest(IMetadata data){
		ApplicationDefine app = registedApplication.get(data.getMsgTp());
		if(app==null){
			return null;
		}
		
		MsgTypeDefine msg =app.getMsgDefine(data.getMsgTp());
		
		if(msg==null){
			return null;
		}
		
		app.setMsgDefine(msg);
		
		return app;
	}
	@Override
	public void initilize() {
		registeDefinededMsg(registedMsg);
		
		registeApplication(registedApplication);
	}
	@Override
	public void destory() {
		registedMsg.clear();
		registedApplication.clear();
	}
}

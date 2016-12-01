package com.ut.scf.web.actions;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.IAPProcessor;
import com.ut.scf.orm.std.UserInfoM;
import com.ut.scf.web.servlet.AbsServletRequestAware;
import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.session.UserSessionObj;
import com.ut.scf.web.utils.WebUtils;

public class LoginAction extends AbsServletRequestAware{
	
	private static final long serialVersionUID = 1L;
	
	private Logger logger = LoggerFactory.getLogger(LoginAction.class);
	
	@Resource(name="aPQueryProcessor")  
	IAPProcessor process;
	
	private String reqOpType;
	
	protected void beforeAction(){
		reqOpType = request.getParameter("reqPageType");
		reqOpType = StringUtil.isTrimNotEmpty(reqOpType)?reqOpType:"next";
		logger.debug("Request page type is:"+reqOpType);
		String sessionFunctionId = request.getParameter("sysFuncId");
		SessionManager.clearFunctionSession(request);
		SessionManager.setPageIndexToSession(request, -1);
		SessionManager.setFunctionIdToSession(request, sessionFunctionId);		
	}
	
	
	@Override
	protected String executeAction() {		
		JsonUtil.getChildJson(dataDom, "trxDom").put("reqType", "webLoginManager");
		JsonUtil.getChildJson(dataDom, "trxDom").put("logType", "login");
		String ipAddress = getIpAddr();
		JsonUtil.getChildJson(dataDom, "trxDom").put("userIP", ipAddress);
		//验证码
		Object reCode = SessionManager.getSessionAttribute(request, "reCode");//request.getParameter("reCode");
		if(reCode!=null)
			JsonUtil.getChildJson(dataDom, "trxDom").put("reCode", reCode);
		
		processResult = process.run(dataDom.toString());
		super.dataMap = getRetMap(processResult);
		return SUCCESS;
	}
	protected String getIpAddr(){
		HttpServletRequest request=ServletActionContext.getRequest();
		String ip=request.getHeader("x-forwarded-for");
		if(ip==null||ip.length()==0||"unknown".equalsIgnoreCase(ip)){
			ip=request.getHeader("Proxy-Client-IP");
		}
		if(ip==null||ip.length()==0||"unknown".equalsIgnoreCase(ip)){
			ip=request.getHeader("WL-Proxy-Client-IP");
		}
		if(ip==null||ip.length()==0||"unknown".equalsIgnoreCase(ip)){
			ip=request.getRemoteAddr();
		}
		return ip;
		
	}
	
	protected void afterAction() {
		if(!"false".equals(dataMap.get("success").toString())){
		if(dataMap.get("obj")!=null){
			UserInfoM user = new UserInfoM();
			BeanUtils.setBeanProperty(user, (Map) dataMap.get("obj"));
			UserSessionObj sessObj = new UserSessionObj();
			sessObj.setOwnerBrId(user.getOwnerBrId());
			//系统日期需要重新获取，不能直接获取当前时间
			sessObj.setSysDate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
			sessObj.setUserId(user.getUserId());
			sessObj.setUserName(user.getUserNm());
			sessObj.setSysBusiUnit(user.getBusiUnit());
			sessObj.setUserTp(user.getUserTp());
			sessObj.setUserRefNo(user.getSysRefNo());
			sessObj.setUserRole(user.getRoleId());
			sessObj.setUserOwnerId(user.getUserOwnerid());
			sessObj.setCustId(user.getCustId());
			sessObj.setUserGrade(user.getUserGrade());
			sessObj.setSysOrgId(user.getSysOrgId());
			SessionManager.setUserInfoToSession(request, sessObj);
			
			logger.info("用户：["+user.getUserNm()+"] 于  ["+new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date())+"] 登入系统。");
		}
		String firstLanding = (String) ((Map)dataMap.get("obj")).get("firstLanding");
		if(!"true".equals(firstLanding)){
			SessionManager.clearFunctionSession(request);
			super.dataMap.put("funcObj", null);
		}
		}
	}
	
	public String Exit()throws Exception{
        HttpSession session = request.getSession();
        dataDom = WebUtils.generateDomByRequest(request);
		JsonUtil.getChildJson(dataDom, "trxDom").put("reqType", "webLoginManager");
		JsonUtil.getChildJson(dataDom, "trxDom").put("logType", "logoff");
        processResult = process.run(dataDom.toString());
        logger.info("登出系统");
  
        session.invalidate();
        super.dataMap.put("success", true);
        super.dataMap.put("msg", "");
        
        strResult = JsonUtil.getJSONString(dataMap);
		
        return SUCCESS;
	}

	@Override
	protected String getReqType() {
		return "login";
	}	
}
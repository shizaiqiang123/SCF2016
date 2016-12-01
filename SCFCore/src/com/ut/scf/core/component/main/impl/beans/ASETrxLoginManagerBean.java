package com.ut.scf.core.component.main.impl.beans;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.comm.pojo.FunctionInfo;
import com.comm.pojo.PageInfo;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.EncryptUtil;
import com.ut.comm.tool.consts.SessionObjVariable;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.func.FunctionPara;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.page.PagePara;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.sys.SysPara;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.logic.LogicFactoryImpl;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.dao.ExecDaoEntity;
import com.ut.scf.dao.IDaoEntity;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.dao.IDaoReformat;

/**
 * 
 * 用户登录验证
 * 
 * @author hyy
 * @version [V1.00, 2014年12月12日]
 * @see [相关类/方法]
 * @since V1.00
 */
@Service("aSETrxLoginManagerBean")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ASETrxLoginManagerBean implements IMainComponent {

	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;

	private Logger logger = LoggerFactory
			.getLogger(ASETrxLoginManagerBean.class);
	private JSONObject trxDom;

	@Override
	public Object submitData(Object paraDom) throws Exception {
		JSONObject dataDom = (JSONObject) paraDom;
		JSONObject trxDom = JsonHelper.getTrxObject(dataDom);
		this.trxDom = trxDom;

		String strLogType = trxDom.getString("logType");
		String reqPageType = trxDom.containsKey("reqPageType") ? trxDom
				.getString("reqPageType") : "";
		if ("login".equalsIgnoreCase(strLogType)
				&& "login".equalsIgnoreCase(reqPageType)) {
			return doLogin(dataDom);
		} else {
			return saveLogOffInfo(dataDom);
		}

	}

	private FuncDataObj checkUserInfo(String sysRefNo, JSONObject trxData)
			throws Exception {
		FuncDataObj dataObj = new FuncDataObj();
		LogicNode mainLogic = new LogicNode();
		StringBuffer buff = new StringBuffer();
		buff.append("sysRefNo=").append(sysRefNo);
		mainLogic.setTablename("std.USER_INFO_M");
		mainLogic.setType("E");
		mainLogic.setCondition(buff.toString());
		String updateList = "pwdDueDt";
		mainLogic.setFields(updateList);
		dataObj.setReqParaObj(mainLogic);
		trxData.put(
				"pwdDueDt",
				DateTimeUtil.dateAddDays(
						DateTimeUtil.getDate(DateTimeUtil.getSysTime()), 30)
						.toString());
		trxData.put("sysEventTimes", 1);
		dataObj.setReqData(trxData);
		dataObj = logicFactory.getProcessor(mainLogic).postData(dataObj);
		return dataObj;
	}

	private FuncDataObj checkUserPwd(String sysRefNo, JSONObject trxData)
			throws Exception {
		FuncDataObj dataObj = new FuncDataObj();
		String password = trxData.getString("password");
		LogicNode mainLogicPwd = new LogicNode();
		StringBuffer buffPwd = new StringBuffer();
		buffPwd.append("sysRefNo=").append(sysRefNo);
		mainLogicPwd.setTablename("std.USER_PWD");
		mainLogicPwd.setType("E");
		mainLogicPwd.setCondition(buffPwd.toString());
		String updateListPwd = "password";
		mainLogicPwd.setFields(updateListPwd);
		dataObj.setReqParaObj(mainLogicPwd);
		trxData.put("password", password);
		trxData.put("sysEventTimes", 1);
		dataObj.setReqData(trxData);
		dataObj = logicFactory.getProcessor(mainLogicPwd).postData(dataObj);
		return dataObj;
	}

	private Object doLogin(JSONObject requestDom) {
		ApSessionContext context = ApSessionUtil.getContext();
		try {

			// checkUserBusiUnit(requestDom);

			checkUserHasLogin(requestDom);

			checkValidCode(requestDom);

			Map map = checkUserPassword(requestDom);

			JsonHelper.getTrxObject(requestDom).putAll(map);

			IApResponse obj = checkUserFirstLanding(requestDom, context, map);
			String firstLanding = ((HashMap) obj.getObj())
					.containsKey("firstLanding") ? ((HashMap) obj.getObj())
					.get("firstLanding").toString() : "";
			clearLoginEventTimes(requestDom, firstLanding);
			saveLogInfo(requestDom, firstLanding);
			return obj;
		} catch (Exception e) {
			// e.printStackTrace();
			logger.error(e.getMessage());
			IApResponse obj = new ApResponse();
			obj.setTotal(1);
			obj.setPageInfo(null);
			obj.setFuncObj(null);
			obj.setMessage(e.getMessage());
			obj.setSuccess(false);
			return obj;
		}
	}

	private void clearLoginEventTimes(JSONObject trxDom, String firstLanding) {
		if (! "true".equalsIgnoreCase(firstLanding)) {
			JSONObject trxData = JsonHelper.getTrxObject(trxDom);
			String userId = trxData.containsKey("userId") ? trxData
					.getString("userId") : "";
			IDaoEntity entity = new ExecDaoEntity();
			StringBuffer stringBuffer = new StringBuffer();
			List<Object> updateParams = new ArrayList<Object>();

			stringBuffer.append("update ").append(" UserInfoM ")
					.append(" set loginEventTimes = ? where userId = ?");
			updateParams.add(0);
			entity.setHql(stringBuffer.toString());
			updateParams.add(userId);
			entity.setParaList(updateParams);
			entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
			FuncDataObj funcDataObj = new FuncDataObj();
			funcDataObj.addExcuteEntity(entity);
			daoHelper.execUpdate(funcDataObj);
		}
	}

	private void checkValidCode(JSONObject requestDom) throws Exception {
		String inCode = trxDom.getString("code");
		String reCode = trxDom.getString("reCode");
		if (!StringUtil.isEmpty(inCode) && !inCode.equalsIgnoreCase(reCode)) {
			throw new Exception("验证码不正确！");
		}
	}

	private IApResponse checkUserFirstLanding(JSONObject trxDom,
			ApSessionContext context, Map map) throws Exception {
		JSONObject userDom = JsonHelper.getTrxObject(trxDom);
		IApResponse obj = new ApResponse();
		Timestamp currentTime = new Timestamp(new Date().getTime());
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String pwdDuDt = getMapValue(map, "pwdDueDt");
		String firstLanding = "false";
		// UserInfoM user = new UserInfoM();
		// user.setPwdDueDt(pwdDueDt);
		if (pwdDuDt == null) {
			map.put("pwdDueDt", currentTime);
			firstLanding = "true";
			// map.put("firstLanding", "true");
		} else {
			Timestamp pwdDueDt = new Timestamp(dateFormat.parse(pwdDuDt)
					.getTime());
			map.put("pwdDueDt", pwdDueDt);
			if (currentTime.after(pwdDueDt)) {
				// user.setFirstLanding("true");
				// map.put("firstLanding", "true");
				firstLanding = "true";
			}
		}
		map.put("firstLanding", firstLanding);
		String sysFuncId = userDom.getString("sysFuncId");
		FunctionPara funcObj = XMLParaParseHelper.parseFuncPara("F_S_login",
				context.getSysBusiUnit());

		FunctionInfo functionInfo = getFunctionInfo(funcObj, context);
		PageInfo info = getPageInfo(funcObj, context);
		obj.setTotal(1);
		obj.setPageInfo(info);
		obj.setFuncObj(functionInfo);
		obj.setObj(map);
		return obj;
	}

	private Map checkUserPassword(JSONObject trxDom) throws Exception {
		JSONObject userDomInfo = (JSONObject) trxDom.get("trxDom");
		// String roleId = userDomInfo.getString("roleId");
		// String busiUnit = userDomInfo.getString("busiUnit");
		String userId = userDomInfo.getString("userId");
		String password = userDomInfo.getString("password");
		String linkTableName = "STD.USER_PWD";
		String userGrade = userDomInfo.getString("userGrade");
		StringBuffer buff = new StringBuffer();
		// String sysbusiUnit =
		// userDomInfo.containsKey("busiUnit")?userDomInfo.getString("busiUnit"):"";
		buff.append(" userId = ").append(userId).append(" and password = ")
				.append(password);
		List<Map> map = linkUserInfo(linkTableName, buff.toString(), "", userId);
		if (map != null && map.size() == 1) {
			// if(!"1".equalsIgnoreCase(map.get(0).get("userStatus").toString())){
			// throw new Exception("该用户待复核。");
			// }
			if ("T".equalsIgnoreCase(map.get(0).get("sysLockFlag").toString())) {
				if (!map.get(0)
						.get("sysRefNo")
						.toString()
						.equalsIgnoreCase(
								map.get(0).get("sysLockBy").toString())) {
					throw new Exception("该用户已被锁定。");
				} else {
					updateLockFlag("UserPwd", userId);
				}
			}

			StringBuffer buffInfo = new StringBuffer();
			map = linkUserInfo("STD.USER_INFO_M", buffInfo.append("sysRefNo=")
					.append(map.get(0).get("sysRefNo")).toString(), "", userId);
			if(map.get(0).get("userGrade")!=null){
				if("1".equals(userGrade)){
					
					if(!userGrade.equalsIgnoreCase(map.get(0).get("userGrade").toString())){
						throw new Exception("您没有内网权限。");
					}
				}else{
					String[] gradeList  = new String[]{"2","3"};
					List<String> userGradeList = Arrays.asList(gradeList);
					if(!userGradeList.contains(map.get(0).get("userGrade").toString())){
						throw new Exception("您没有外网权限。");
					}
					
				}
			}
			if ("1".equalsIgnoreCase(map.get(0).get("userStatus").toString())) {
				throw new Exception("该用户待复核。");
			}
			if ("T".equalsIgnoreCase(map.get(0).get("sysLockFlag").toString())) {
				if (map.get(0).get("sysLockBy") != null) {
					String sysLockBy = map.get(0).containsKey("sysLockBy") ? map
							.get(0).get("sysLockBy").toString()
							: "";
					if (!map.get(0).get("sysRefNo").toString()
							.equalsIgnoreCase(sysLockBy)) {
						throw new Exception("该用户已被锁定。");
					} else {
						updateLockFlag("UserInfoM", userId);
					}
				} else {
					throw new Exception("该用户已被锁定。");
				}
			}
			int maxRoleType = queryUserMaxRoleInfo(map.get(0));
			map.get(0).put("roleId", maxRoleType);
			return map.get(0);
		} else {
			int times = updateLoginEventTimes(userId);
			if (times <= 1) {
				throw new Exception("用户名或密码错误。");
			} else if (times > 1 && times <= 4) {
				throw new Exception("用户名或密码错误。您当天还有：" + (5 - times) + "次机会。");
			} else {
				throw new Exception("该用户已被锁定。");
			}
		}

	}

	private void updateLockFlag(String tableName, String userId) {
		IDaoEntity entity = new ExecDaoEntity();
		StringBuffer stringBuffer = new StringBuffer();
		stringBuffer
				.append("update ")
				.append(tableName)
				.append(" set sysLockFlag = 'F',sysLockBy = null where userId = ?");
		entity.setHql(stringBuffer.toString());
		List<Object> updateParams = new ArrayList<Object>();
		updateParams.add(userId);
		entity.setParaList(updateParams);
		entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		FuncDataObj funcDataObj = new FuncDataObj();
		funcDataObj.addExcuteEntity(entity);
		daoHelper.execUpdate(funcDataObj);
	}

	private void checkUserBusiUnit(JSONObject trxDom) throws Exception {
		JSONObject userDomInfo = (JSONObject) trxDom.get("trxDom");
		String roleId = userDomInfo.getString("roleId");
		Integer intRole = Integer.parseInt(roleId);// 0:super_admin,1:平台用户,2:保理商,3：保理商客户，4：监管方
		if (intRole > 1) {
			String sysbusiUnit = userDomInfo.getString("busiUnit");
			if (StringUtil.isTrimEmpty(sysbusiUnit)) {
				throw new Exception("组织机构号不能为空");
			} else {
				String linkTableName = "TRX.CUST_M";
				StringBuffer buff = new StringBuffer();
				buff.append("busiUnit=").append(sysbusiUnit);
				List<Map> map = linkUserInfo(linkTableName, buff.toString(),
						"", "");
				if (map == null || map.isEmpty()) {
					throw new Exception("组织机构号不正确");
				}
			}
		}
	}

	private void checkUserHasLogin(JSONObject trxDom) throws Exception {
		JSONObject userDomInfo = (JSONObject) trxDom.get("trxDom");
		String singleSignOn = "";
		SysPara para = XMLParaParseHelper.parseSysPara(singleSignOn);
		// boolean singleLogin = para.getSingleSignOn();
		boolean singleLogin = "true".equalsIgnoreCase(para.getSingleSignOn());
		// Object userId = "";
		if (singleLogin == true) {
			String linkTableName = "STD.USER_LOG_INFO";
			StringBuffer buff = new StringBuffer();
			String userId = userDomInfo.getString("userId");
			buff.append("userId=").append(userId);
			List<Map> sobj = linkUserInfo(linkTableName, buff.toString(),
					"userLoginTime", userId);
			if (sobj != null && sobj.size() != 0) {
				if (getMapValue(sobj.get(0), "logType").equals("logoff")) {
					return;
				} else if (getMapValue(sobj.get(0), "logType").equals("login")) {
					String errorMsg = "该用户已登录。";
					throw new Exception(errorMsg);
				}
			} else if (sobj == null) {
				throw new Exception("第一次登陆");
			}
		} else if (singleLogin == false) {
			return;
		}
	}

	private FunctionInfo getFunctionInfo(FunctionPara funcObj,
			ApSessionContext context) {
		FunctionInfo functionInfo = new FunctionInfo();
		functionInfo.setFuncType(funcObj.getFunctype());
		functionInfo.setModule(funcObj.getModule());
		functionInfo.setSysFuncId(funcObj.getId());
		functionInfo.setSysFuncName(funcObj.getName());
		functionInfo.setSysEventTimes(context.getSysEventTimes());
		functionInfo.setSysOrgnFuncId(context.getSysOrgnFuncId());
		functionInfo.setSysRefNo(context.getSysRefNo());
		return functionInfo;
	}

	private PageInfo getPageInfo(FunctionPara funcObj, ApSessionContext context) {
		int strPageIndex = 0;
		int totalPage = context.getSysTotalPage();
		totalPage = funcObj.getPagesSize();
		context.setAttribute(
				SessionObjVariable.AP_ATTRIBUTE_NAME_FUNCTION_OBJECT, funcObj);
		context.setSysTotalPage(totalPage);
		PagePara currentPage = funcObj.getPage(strPageIndex);
		PageInfo info = new PageInfo();
		info.setIndex(strPageIndex);
		info.setName(currentPage.getName());
		info.setTotal(totalPage);
		info.setUrl(currentPage.getJspfile());
		info.setFunctionId(funcObj.getId());
		info.setPageType(currentPage.getPagetype());
		info.setDoname(currentPage.getDoname());
		return info;
	}

	private List<Map> linkUserInfo(String linkTableName, String buff,
			String orderByRef, String userId) throws Exception {
		QueryNode node = new QueryNode();
		node.setTablename(linkTableName);
		// .append(" and password = ").append(password);
		node.setCondition(buff);
		node.setType("E");
		if (orderByRef != null && orderByRef != "") {
			node.setOrderby(orderByRef);
		}
		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(trxDom);
		dataObj.setReqParaObj(node);
		IQueryComponent process = queryFactory.getProcessor(node);
		FuncDataObj processResult = process.queryData(dataObj);
		daoHelper.execQuery(processResult);
		List<Map> obj = (List<Map>) (processResult.getData().get("data"));
		if (obj != null) {
			return obj;
		} else {
			int times = updateLoginEventTimes(userId);
			if (times <= 1) {
				throw new Exception("用户名或密码错误。");
			} else if (times > 1 && times <= 4) {
				throw new Exception("用户名或密码错误。您当天还有：" + (5 - times) + "次机会。");
			} else {
				throw new Exception("该用户已被锁定。");
			}
		}
	}

	private Integer updateLoginEventTimes(String userId) throws Exception {
		List<Map> obj = linkUserInfo("STD.USER_INFO_M", "userId = " + userId,
				"", userId);
		int times = 0;
		if (obj != null && obj.size() == 1) {
			if (obj.get(0).get("loginEventTimes") != null) {
				String loginEventTimes = obj.get(0).containsKey(
						"loginEventTimes") ? obj.get(0).get("loginEventTimes")
						.toString() : "0";
				times = Integer.parseInt(loginEventTimes);
			}
		}
		times++;
		IDaoEntity entity = new ExecDaoEntity();
		StringBuffer stringBuffer = new StringBuffer();
		List<Object> updateParams = new ArrayList<Object>();
		if (times <= 4) {
			stringBuffer.append("update ").append(" UserInfoM ")
					.append(" set loginEventTimes = ? where userId = ?");
			updateParams.add(times);
		} else {
			stringBuffer
					.append("update ")
					.append(" UserInfoM ")
					.append(" set sysLockFlag = 'T',sysLockBy = 'System',loginEventTimes=0 where userId = ? ");
		}
		entity.setHql(stringBuffer.toString());
		updateParams.add(userId);
		entity.setParaList(updateParams);
		entity.setType(IDaoEntity.ENTITY_TYPE_HQL);
		FuncDataObj funcDataObj = new FuncDataObj();
		funcDataObj.addExcuteEntity(entity);
		daoHelper.execUpdate(funcDataObj);
		return times;
	}

	private int queryUserMaxRoleInfo(Map trxDom) throws Exception {
		QueryNode node = new QueryNode();
		String tableName = "std.user_role_info";
		node.setTablename(tableName);
		String sql = "select Max(roleType) from StdRoleInfo where roleId in(select roleId from UserRoleInfo where userId = ?)";
		node.setSql(sql);
		node.setType("S");
		String userId = (String) trxDom.get("sysRefNo");
		node.setParams(userId);

		FuncDataObj dataObj = new FuncDataObj();
		dataObj.setReqData(JsonUtil.getJSON(trxDom));
		dataObj.setReqParaObj(node);

		FuncDataObj maxRecord = queryFactory.getProcessor(node).queryData(
				dataObj);
		List<IDaoEntity> entityList = maxRecord.getEntityList(maxRecord
				.getDoName());
		for (IDaoEntity entity : entityList) {
			entity.setReformat(new IDaoReformat() {

				@Override
				public Object reformat(Object recordData) {
					List<Object> recordList = (List<Object>) recordData;
					if (recordList.isEmpty())
						return 0;
					else {
						Object maxId = recordList.get(0);
						if (maxId == null
								|| StringUtil.isNull(maxId.toString())) {
							return 0;
						}
						return Integer.parseInt(maxId.toString());
					}
				}
			});
		}
		int maxType = -1;
		maxRecord = (FuncDataObj) this.daoHelper.execQuery(maxRecord);
		maxType = (Integer) maxRecord.get(maxRecord.getDoName());
		return maxType;
	}

	private String encriptePSW(String pwd) {
		String scritStr = EncryptUtil.encryptString(pwd);
		return scritStr;
	}

	@Resource(name = "logicFactory")
	LogicFactoryImpl logicFactory;

	public void saveLogInfo(JSONObject trxDom, String firstLanding)
			throws Exception {
		if (firstLanding != "true") {
			FuncDataObj dataObj = new FuncDataObj();
			JSONObject userData = JsonHelper.getUserObject(trxDom);
			JSONObject trxData = JsonHelper.getTrxObject(trxDom);
			String sysBusiUnit = trxData.containsKey("sysBusiUnit") ? trxData
					.getString("sysBusiUnit") : "";
			String userTp = trxData.containsKey("userTp") ? trxData
					.getString("userTp") : "";
			String sessionId = userData.containsKey("sessId") ? userData
					.getString("sessId") : "";
			String userIP = trxData.containsKey("userIP") ? trxData
					.getString("userIP") : "";
			String userId = trxData.containsKey("userId") ? trxData
					.getString("userId") : "";
			String userNm = trxData.containsKey("userNm") ? trxData
					.getString("userNm") : "";
			LogicNode mainLogic = new LogicNode();
			mainLogic.setTablename("std.USER_LOG_INFO");
			mainLogic.setType("E");
			dataObj.setReqParaObj(mainLogic);
			JSONObject jsonObj = new JSONObject();
			jsonObj.put("sysRefNo", sessionId);
			jsonObj.put("logType", "login");
			jsonObj.put("userIp", userIP);
			jsonObj.put("userLoginTime", new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss").format(new Date()));
			jsonObj.put("userName", userNm);
			jsonObj.put("userId", userId);
			jsonObj.put("sysEventTimes", 1);
			jsonObj.put("userTp", userTp);
			//
			jsonObj.put("sysOpTm", DateTimeUtil.getSysTime());
			// jsonObj.put("sysOpTm",new
			// SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
			dataObj.setReqData(jsonObj);

			dataObj = logicFactory.getProcessor(mainLogic).postData(dataObj);
			daoHelper.execUpdate(dataObj);
		}
		// linkUserInfo("STD_USER_INFO_M", buff, orderByRef, userId)

	}

	private Object saveLogOffInfo(JSONObject trxDom) throws Exception {
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject logicData = trxDom;
		JSONObject userData = JsonHelper.getUserObject(trxDom);
		String sessionId = userData.getString("sessId");
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("std.USER_LOG_INFO");
		mainLogic.setType("E");
		mainLogic.setFields("logType,userLogoutTime,sysEventTimes");
		dataObj.setReqParaObj(mainLogic);
		logicData.put("sysRefNo", sessionId);
		logicData.put("logType", "logoff");
		logicData.put("userLogoutTime", new SimpleDateFormat(
				"yyyy-MM-dd HH:mm:ss").format(new Date()));
		logicData.put("sysEventTimes", 2);
		logicData.put("sysOpTm",
				new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		dataObj.setReqData(logicData);

		dataObj = logicFactory.getProcessor(mainLogic).postData(dataObj);
		daoHelper.execUpdate(dataObj);
		
		IApResponse obj = new ApResponse();
		obj.setTotal(1);
		obj.setPageInfo(null);
		obj.setFuncObj(null);
		obj.setMessage("");
		obj.setSuccess(true);
		return obj;
	}

	private String getMapValue(Map map, String key) {
		if (map.containsKey(key)) {
			return map.get("" + key + "") != null ? map.get("" + key + "")
					.toString() : null;
		}
		return null;
	}

	@Override
	public Object queryData(Object paraDom) throws Exception {
		return submitData(paraDom);
	}

	@Override
	public Object cancelData(Object paraDom) throws Exception {
		return null;
	}
}

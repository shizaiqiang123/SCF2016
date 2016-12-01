package com.ut.scf.core.js;

import java.io.File;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.nio.file.Files;
import java.security.Timestamp;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.EncryptUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.ref.RefPara;
import com.ut.comm.xml.sys.SysPara;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.logic.LogicFactoryImpl;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.services.verification.FormatVerifyFactory;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoHelper;
@Scope("prototype")
public abstract class AbsServerSideJs implements IServerSideJs {
	// protected Logger logger = getLogger(getClass());

	protected ScriptManager scriptMgr = null;

	protected Object trxData;

	protected JSONObject orgnData;//当前交易数据（未克隆）
	
	protected JSONObject orgnAllData;//全量数据（4层结构数据,未克隆）

	protected final String DEFAULT_AMT_FORMAT = ",";

	protected final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

	private String dateformat;

	private String ccy;

	private String amtformat;

	protected AbsObject trxPara;
	
	protected ApSessionContext context;
	
	@Resource(name = "logicFactory")
	LogicFactoryImpl logicFactory;
	
	@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;

	@Resource(name = "refNoManager")
	IReferenceNo refNoManager;
	
	@Resource(name = "queryFactory")
	private IQueryFactory queryFactory;
	@Override
	public void initTrxPara(Object trxPara) {

	}
	
	public Object getAllReqData(){
		return orgnAllData;
	}

	// protected Logger getLogger(Class<? extends AbsServerSideJs> class1) {
	// return LoggerFactory.getLogger(class1);
	// }

	@Override
	public Object getTrxPara() {
		return trxPara;
	}

	public boolean isNull(Object objValue) {
		if (objValue == null)
			return true;
		else if (objValue instanceof JSONArray) {
			JSONArray valueArray = (JSONArray) objValue;
			if (valueArray.size() == 0) {
				return true;
			}
			return false;
		} else {
			String value = objValue.toString();
			return StringUtil.isNull(value);
		}
	}

	public void updateContextSysBusiUnit(){
		SysPara para = XMLParaParseHelper.parseSysPara("");
		String busiUnit=para.getBusiUnit();
		ApSessionUtil.getContext().setSysBusiUnit(busiUnit);
	}
	public void updateContextSysEventTimes(int sysEventTimes){
		 ApSessionUtil.getContext().setSysEventTimes(sysEventTimes);;
	}
	public void updateContextSysTrxSts(String sysTrxSts){
		ApSessionUtil.getContext().setStrTrxStatus(sysTrxSts);
	}
	
	public void updateContextSysFuncId(String sysFuncId){
		 ApSessionUtil.getContext().setSysFuncId(sysFuncId);
	}
	public String getSysFuncName(){
		return ApSessionUtil.getContext().getSysFuncName();
	}
	public boolean isContainsValue(Object obj, String propertyName) {
		try {
			checkProperty(obj, propertyName);
			JSONObject jsonObj = (JSONObject) obj;
			return jsonObj.containsKey(propertyName);
		} catch (Exception e) {
			print("getValue wring, canot find property from parent object.");
		}
		return false;
	}

	public String getDateValueString(Object obj, String propertyName) {
		try {
			if (isContainsValue(obj, propertyName)) {
				JSONObject jsonObj = (JSONObject) obj;
				String value ="";
				if( jsonObj.containsKey(propertyName)){
					SimpleDateFormat dataFormat = new SimpleDateFormat("yyyy-MM-dd");
					String dateS =  jsonObj.get(propertyName).toString();
					Date dateD = dataFormat.parse(dateS);
					value = dataFormat.format(dateD);
				}
				return value;
			}
		} catch (Exception e) {
			printError(ErrorUtil.getErrorStackTrace(e));
		}
		return "";
	}
	
	public String getStringValue(Object obj, String propertyName) {
		try {
			if (isContainsValue(obj, propertyName)) {
				JSONObject jsonObj = (JSONObject) obj;
				return jsonObj.containsKey(propertyName)?jsonObj.getString(propertyName):"";
			}
		} catch (Exception e) {
			printError(ErrorUtil.getErrorStackTrace(e));
		}
		return "";
	}

	public boolean getBooleanValue(Object obj, String propertyName) {
		try {
			if (isContainsValue(obj, propertyName)) {
				JSONObject jsonObj = (JSONObject) obj;
				return jsonObj.getBoolean(propertyName);
			}
		} catch (Exception e) {
			printError(ErrorUtil.getErrorStackTrace(e));
		}
		return false;
	}

	public Integer getIntegerValue(Object obj, String propertyName) {
		try {
			if (isContainsValue(obj, propertyName)) {
				JSONObject jsonObj = (JSONObject) obj;
				return jsonObj.getInt(propertyName);
			}
		} catch (Exception e) {
			printError(ErrorUtil.getErrorStackTrace(e));
		}
		return 0;
	}
	
	public JSONObject getTrxGridData(String jsonName,JSONObject jsonObject){
		System.out.println(jsonObject);
		JSONObject root=new JSONObject();
		if(jsonObject.containsKey(jsonName)){
			for(int i=0;i<((JSONArray)jsonObject.get(jsonName)).size();i++){
				root.put("rows"+i, ((JSONArray)jsonObject.get(jsonName)).get(i));
			}
			root.put("_total_rows",((JSONArray)jsonObject.get(jsonName)).size() );
			return root;
		}
		else{
			return null;
		}
	}

	public BigDecimal getAmtValue(Object obj, String propertyName) {
		try {
			if (isContainsValue(obj, propertyName)) {
				JSONObject jsonObj = (JSONObject) obj;
				String amtObj = jsonObj.get(propertyName).toString();
				if (StringUtils.isNotEmpty(amtObj)) {
					BigDecimal bc = new BigDecimal(amtObj.trim());
					return bc;
				} else {
					return BigDecimal.ZERO;
				}
			} else {
				return BigDecimal.ZERO;
			}
		} catch (Exception e) {
			printError(ErrorUtil.getErrorStackTrace(e));
		}
		return BigDecimal.ZERO;
	}

	public Object getObject(Object obj, String propertyName) {
		try {
			if (isContainsValue(obj, propertyName)) {
				JSONObject jsonObj = (JSONObject) obj;
				return jsonObj.get(propertyName);
//				return jsonObj.getJSONObject(propertyName);
			}
		} catch (Exception e) {
			printError(ErrorUtil.getErrorStackTrace(e));
		}
		return null;
	}

	public Object createObject(String objName) {
		JSONObject childObj = new JSONObject();
		return childObj;
	}

	public Object createList(String objName) {
		JSONArray childObj = new JSONArray();
		return childObj;
	}

	public void updateTrxProperty(String propertyName, Object propertyValue)
			throws Exception {
		updateProperty(this.trxData, propertyName, propertyValue);
	}

	public void appendList(Object listObj, Object childObj) throws Exception {
		JSONArray parentObj = (JSONArray) listObj;
		parentObj.add(childObj);
	}

	public Object getRandomCode(String randomType, int codeLen) {
		String code = FormatVerifyFactory.getRandomCode(randomType, codeLen)
				.toString();
		// System.out.println(code);
		return code;
	}

	public void updateProperty(Object obj, String propertyName,
			Object propertyValue) throws Exception {
		if (obj == null)
			obj = this.trxData;
		JSONObject jsonObj = (JSONObject) obj;
		if (StringUtil.isTrimEmpty(propertyName)) {
			throw new Exception(
					"updateProperty error, the property name is null or empty.");
		}
		jsonObj.put(propertyName, propertyValue);
	}
	public void deleteProperty(Object obj, String propertyName) throws Exception {
		if (obj == null)
			obj = this.trxData;
		JSONObject jsonObj = (JSONObject) obj;
		if (StringUtil.isTrimEmpty(propertyName)) {
			throw new Exception(
					"updateProperty error, the property name is null or empty.");
		}
		jsonObj.remove(propertyName);
	}

	public void print(String input) {
		System.out.println("js output:" + input);
		getLogger().debug("JS output:" + input);
	}

	protected Logger getLogger() {
		return LoggerFactory.getLogger(this.getClass());
	}

	public void printError(String input) {
		getLogger().error("JS output:" + input);
	}

	public void throwException(String errorMsg) throws Exception {
		throw new Exception(errorMsg);
	}

	public void checkProperty(Object obj, String propertyName) throws Exception {
		if (obj == null) {
			printError("getValue error, parent object is null or empty.");
			throw new Exception(
					"getValue error, parent object is null or empty.");
		}
		if (!JSONObject.class.isAssignableFrom(obj.getClass())) {
			printError("Currenttly doesn't support others data type but [JSONObject].");
			throw new Exception(
					"Currenttly doesn't support others data type but [JSONObject].");
		}
		if (StringUtil.isTrimEmpty(propertyName)) {
			printError("getValue error, property name is null or empty.");
			throw new Exception(
					"getValue error, property name is null or empty.");
		}
	}

	public BigDecimal integerToBigDecimal(Integer value){
		return new BigDecimal(value);
	}
	/**
	 * 格式化金额栏位，小数位数通过CCY判别，默认使用四舍五入的规则
	 * 
	 * @param amt
	 *            被格式化的金额
	 * @return
	 */
	public BigDecimal amtFormat(BigDecimal amt) {
		return amt.round(new MathContext(2, RoundingMode.HALF_UP));
	}

	public BigDecimal amtFormatByObj(Object amt) {
		if (amt == null) {
			return BigDecimal.ZERO;
		}
		return new BigDecimal(amt.toString());
	}

	public Date dateFormat(String date) throws Exception {
		return DateTimeUtil.getDate(date, this.getDateformat());
	}

	public Date getSystemDate() throws Exception {
		return DateTimeUtil.getSysDate();
	}

	public Date getCurrentTime() throws Exception{
		String time = DateTimeUtil.getSysTime();
		return DateTimeUtil.getDateTime(time);
	}
	
	public Integer addInteger(Integer obj1, Object obj2) {
		Integer iniValue = 0;
		if (obj1 != null) {
			iniValue = obj1;
		}
		if (obj2 == null) {
			return iniValue;
		} else {
			iniValue = obj1 + Integer.parseInt(obj2.toString());
		}
		return iniValue;
	}

	public BigDecimal addAmt(BigDecimal obj1, Object obj2) {
		BigDecimal iniValue = BigDecimal.ZERO;
		if (obj1 != null) {
			iniValue = iniValue.add(obj1);
		}
		if (obj2 == null) {
			return iniValue;
		} else {
			iniValue = iniValue.add(new BigDecimal(obj2.toString()));
		}
		return iniValue;
	}

	public BigDecimal subAmt(BigDecimal obj1, Object obj2) {
		BigDecimal iniValue = BigDecimal.ZERO;
		if (obj1 != null) {
			iniValue = iniValue.add(obj1);
		}
		if (obj2 == null) {
			return iniValue;
		} else {
			iniValue = iniValue.subtract(new BigDecimal(obj2.toString()));
		}
		return iniValue;
	}

	public BigDecimal multAmt(BigDecimal obj1, Object obj2) {
		BigDecimal iniValue = BigDecimal.ZERO;
		if (obj1 != null) {
			iniValue = obj1;
		}
		if (obj2 == null) {
			return iniValue;
		} else {
			iniValue = iniValue.multiply(new BigDecimal(obj2.toString()));
		}
		return iniValue;
	}
	/**
	 * 计算m的n次方
	 * 
	 * @param scale
	 *            表示需要精确到小数点以后几位
	 * @return
	 * @throws Exception
	 */
	public BigDecimal powAmt(BigDecimal m, int n) {
		BigDecimal iniValue = BigDecimal.ZERO;
		if (m != null) {
			iniValue = m;
		}
		iniValue = m.pow(n);
		return iniValue;
	}

	/**
	 * ]
	 * 
	 * @param obj1
	 *            被除数
	 * @param obj2
	 *            除数
	 * @param scale
	 *            表示需要精确到小数点以后几位
	 * @return
	 * @throws Exception
	 */
	public BigDecimal divAmt(BigDecimal obj1, Object obj2, int scale)
			throws Exception {
		if (scale < 0) {
			throwException("The scale must be a positive integer or zero!");
		}
		BigDecimal iniValue = BigDecimal.ZERO;
		if (obj1 != null) {
			iniValue = obj1;
		}
		if (obj2 == null || "0".equals(obj2.toString().trim())) {
			return iniValue;
		} else {
			iniValue = iniValue.divide(new BigDecimal(obj2.toString()), scale,
					BigDecimal.ROUND_HALF_UP);
		}
		return iniValue;
	}

	/**
	 * 四舍五入
	 * 
	 * @param obj1
	 * @param scale
	 * @return
	 * @throws Exception
	 */
	public BigDecimal round(BigDecimal obj1, int scale) throws Exception {
		if (scale < 0) {
			throwException("The scale must be a positive integer or zero!");
		}
		BigDecimal iniValue = BigDecimal.ZERO;
		if (obj1 != null) {
			iniValue = obj1;
		} else {
			iniValue = iniValue.divide(new BigDecimal("1"), scale,
					BigDecimal.ROUND_HALF_UP);
		}
		return iniValue;
	}

	public String getCcy() {
		return ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	public String getDateformat() {
		return StringUtil.isTrimEmpty(dateformat) ? DEFAULT_DATE_FORMAT
				: dateformat;
	}

	public void setDateformat(String dateformat) {
		this.dateformat = dateformat;
	}

	public String getAmtformat() {
		return StringUtil.isTrimEmpty(amtformat) ? DEFAULT_AMT_FORMAT
				: amtformat;
	}

	public void setAmtformat(String amtformat) {
		this.amtformat = amtformat;
	}

	public String getJsFilePath(String type, String jsName) {
		ApSessionContext context = ApSessionUtil.getContext();
		String path = XMLParaLoadHelper.getApParaDeinePath("js",
				context.getSysBusiUnit());
		path = path + type + File.separator + jsName;
		if (!path.endsWith(".js")) {
			path += ".js";
		}
		return path;
	}

	public String getFuncType() {
		ApSessionContext context = ApSessionUtil.getContext();
		return context.getSysFuncType();
	}

	public JSONObject getTrxGridData(List<Map<String, Object>> receivers) {
		JSONObject root = new JSONObject();
		for (int i = 0; i < receivers.size(); i++) {
			root.put("rows" + i, JsonUtil.getJSONString(receivers.get(i)));
		}
		root.put("_total_rows", receivers.size());
		return root;
	}

	public JSONObject createTrxGridData(String array[],String key) {
		JSONObject root = new JSONObject();
		int length = array.length;
		for (int i = 0; i < length; i++) {
			JSONObject obj = new JSONObject();
			obj.put(key, array[i]);
			root.put("rows" + i, obj);
		}
		root.put("_total_rows",length);
		return root;
	}
	
	public String passwordMd5(String password) {
		return EncryptUtil.getMD5Code(password);
	}

	public JSONObject getOrgnData() {
		return this.orgnData;
	}

	public void updateOrgnData(String propertyName, Object propertyValue) {
		
		orgnData.put(propertyName, propertyValue);
	}
	
	public void updateOrgnData(JSONObject parentObject , String propertyName, Object propertyValue) {
		
		parentObject.put(propertyName, propertyValue);
	}

	@Override
	public void initReqData(Object trxData) {
		this.orgnData = (JSONObject) trxData;
	}
	
	public void updateTable(String type,String cascadeevent,String tableName, String fields, String[] values) throws Exception {
		FuncDataObj dataObj = new FuncDataObj();
		LogicNode mainLogic = new LogicNode();
		JSONObject reqData = JsonHelper.createReqJson();
		JSONObject trxData = JsonHelper.getTrxObject(reqData);
		String[] fileArray = null;
		if (StringUtil.isNotEmpty(fields) && values != null) {
			fileArray = fields.split(",");
		}else{
			return;
		}
		for(int i=0,l=fileArray.length;i<l;i++){
			trxData.put(fileArray[i], values[i]);
		}
		StringBuffer newFileds=new StringBuffer("");
		for(String filed:fileArray){
			if("sysRefNo".equals(filed))
				continue;
			newFileds.append(filed).append(",");
		}
		if (newFileds.length() > 0) {
			newFileds.deleteCharAt(newFileds.length() - 1);
		}
		mainLogic.setTablename(tableName);
		mainLogic.setType(type);
		mainLogic.setCascadeevent(cascadeevent);
		mainLogic.setFields(newFileds.toString());
		dataObj.setReqParaObj(mainLogic);
		dataObj.setReqData(trxData);
		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor("trxEditRecord");
		dataObj.mergeResponse(t.postData(dataObj));
		daoHelper.execUpdate(dataObj);
	}
	
	public Date stringToDate (String date,String formater)  throws Exception {
		if( formater.isEmpty())
			formater = "yyyy-MM-dd";
		SimpleDateFormat dataFormat = new SimpleDateFormat(formater);
		return dataFormat.parse(date);
	}
	public String dateToString (Date date,String formater)  throws Exception {
		if( formater.isEmpty())
			formater = "yyyy-MM-dd";
		SimpleDateFormat dataFormat = new SimpleDateFormat(formater);
		return dataFormat.format(date);
	}
	public int getDays(String fromDate, String toDate) throws Exception {
		Date fDate = DateTimeUtil.getDate(fromDate);
		Date tDate = DateTimeUtil.getDate(toDate);
		return DateTimeUtil.getDays(fDate, tDate);
	}
	
	public String getDTD(Object value){
		Date date= (Date) JsonUtil.getDTO(value.toString(), Date.class);
		return DateTimeUtil.parseDate(date);
	}
	
	public Date dateAddDays(Date sDate, int days){
		return DateTimeUtil.dateAddDays(sDate, days);
	}
	
	public String getUUID() {
		return UUIdGenerator.getUUId();
	}
	
	public String getSysRefNo(String refName) throws Exception {
		String refField = "sysRefNo";
		// 协议表中的 sys_ref_no为invc_m表的CNTRCT_NO
		RefPara refPara = new RefPara();
		refPara.setRefname(refName);
		refPara.setReffield(refField);
		
		FuncDataObj funObj = new FuncDataObj();
		JSONObject reqData = JsonHelper.createReqJson();
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		funObj.setReqParaObj(refPara);
		funObj.setReqData((JSONObject) trxDom);
		FuncDataObj retData = null;
		try {
			retData = (FuncDataObj) refNoManager.generateNo(funObj);
		} catch (Exception e) {
			e.printStackTrace();
		}
		List listRef = (List) retData.getData().get(retData.getDoName());
		String sysRefNo = (String) ((Map) listRef.get(0)).get(refField);
		return sysRefNo;
	}
	public String getSysRefNo(String refName, String refField) throws Exception {
		// 协议表中的 sys_ref_no为invc_m表的CNTRCT_NO
		RefPara refPara = new RefPara();
		refPara.setRefname(refName);
		refPara.setReffield(refField);

		FuncDataObj funObj = new FuncDataObj();
		JSONObject reqData = JsonHelper.createReqJson();
		JSONObject trxDom = JsonHelper.getTrxObject(reqData);
		funObj.setReqParaObj(refPara);
		funObj.setReqData((JSONObject) trxDom);
		FuncDataObj retData = null;
		try {
			retData = (FuncDataObj) refNoManager.generateNo(funObj);
		} catch (Exception e) {
			e.printStackTrace();
		}
		List listRef = (List) retData.getData().get(retData.getDoName());
		String sysRefNo = (String) ((Map) listRef.get(0)).get(refField);
		return sysRefNo;
	}
	
	public JSONObject queryProfitData(String paraPath, String inqType, String target) throws Exception {
		if ("PA".equalsIgnoreCase(inqType)) {
			FuncDataObj logicDataObj = new FuncDataObj();
			JSONObject reqData = JsonHelper.createReqJson();
			JSONObject trxData = JsonHelper.getTrxObject(reqData);
			logicDataObj.setReqData((JSONObject) trxData);
			JSONObject reqJson = logicDataObj.getReqData();
			reqJson.put("paraId", target);
			QueryNode queryPara = new QueryNode();
			queryPara.setTablename(paraPath);
			queryPara.setComponent("paraQuery");
			queryPara.setType("C");
			logicDataObj.setReqParaObj(queryPara);
			FuncDataObj retData;
			retData = queryFactory.getProcessor(queryPara).queryData(logicDataObj);
			return retData.getReqData();
		}else
			return null;
	}
	
	
	public boolean isSTPFunc(){
		return JsonHelper.isStpFuncReq(orgnAllData);
	}
	
	@Override
	public void initAllReqData(Object tallData) {
		orgnAllData = (JSONObject) tallData;
	}

	public int getRecordCount(Object trxObj){
		JSONObject jsonObj=(JSONObject)trxObj;
		if(jsonObj!=null&&jsonObj.containsKey("_total_rows")){
			return jsonObj.getInt("_total_rows");
		}
		return 0;
	}
	
	public JSONObject getRecordData(Object rows,int recodIndex){
		JSONObject jsonObj=(JSONObject)rows;
		String key = "rows"+recodIndex;
		if(jsonObj.containsKey(key)){
			return jsonObj.getJSONObject(key);
		}
		return null;
	}

	public JSONObject getOrgnAllData() {
		return orgnAllData;
	}
	
	public JSONObject getTrxDomData() {
		return JsonHelper.getTrxObject(orgnAllData);
	}
	
	
}

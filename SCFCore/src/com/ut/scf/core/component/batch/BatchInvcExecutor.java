package com.ut.scf.core.component.batch;

import java.io.File;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Predicate;
import org.apache.commons.lang.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.comm.xml.query.QueryNode;
import com.ut.comm.xml.ref.RefPara;
import com.ut.comm.xml.task.TaskPara;
import com.ut.comm.xml.template.TemplatePara;
import com.ut.comm.xml.trx.TrxDataPara;
import com.ut.scf.core.batch.AbsRunableTask;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.component.query.IQueryFactory;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.doc.DocumentFactoryImpl;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.utils.ApSessionUtil;
import com.ut.scf.core.utils.ClassLoadHelper;


/**
 * 应收账款转让调整
 * @author develop
 *
 */
@Component("batchInvcExecutor")
@Scope("prototype")
public class BatchInvcExecutor  extends AbsRunableTask{
	
	protected ApSessionContext context;// 当前交易基本信息
	
	@Resource(name = "documentFactory")
	DocumentFactoryImpl documentFactory ;
	@Resource(name = "refNoManager")
	IReferenceNo refNoManager;
	@Resource(name = "trxCatalogManager")
	IMainComponent catalogProcessor;
	@Resource(name = "queryFactory")
	IQueryFactory queryFactory;
	@Override
	public void execute() {
		this.context = ApSessionUtil.getContext();	
//		context.setSysBusiUnit("");
		context.setStrTrxStatus("M");
		try {
			processInvc();
		} catch (Exception e) {
			e.printStackTrace();
			APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
		}finally{
			ApSessionUtil.close();
		}
	}

	/**
	 * 
	 */
	private void processInvc() throws Exception {
		TaskPara taskPara = (TaskPara) currentTask.getParam();
		TrxDataPara trxDataPara = taskPara.getTrxdatapara();
		String filePath = (String)trxDataPara.getProterties().get("filePath");//获取文件路径
		String fileBakPath =  (String) trxDataPara.getProterties().get("fileBakPath"); //文件备份路径
		final String fileExtensions = (String)trxDataPara.getProterties().get("fileExtensions");//获取文件后缀名
		
		File[] files = new File(filePath).listFiles();
		if(files==null || files.length==0){
			APLogUtil.getUserLogger().info("当前目录"+filePath+"下没有文件。");
			return;
		}
		
		List<File> fileList = Arrays.asList(files);
		
		//过滤文件
		@SuppressWarnings("unchecked")
		List<File> resultList = (List<File>) CollectionUtils.select(fileList,
				new Predicate(){
					public boolean evaluate(Object o) {
						File f =(File) o;
						String[] fileExtension = fileExtensions.split(",");
						for (String fileExt : fileExtension) {
							if(f.getName().endsWith(fileExt)){
								return true;
							}
						}
						return false;
					}			
		});
		
		if(resultList.size() == 0){
			APLogUtil.getUserLogger().info("当前目录"+filePath+"下没有发票文件。");
			return;
		}
		
		
		for(File file:resultList){
			try {
				JSONObject reqData = JsonHelper.createReqJson();
				JSONObject trxData = JsonHelper.getTrxObject(reqData);
				trxData.put("filePath", file.getAbsolutePath());
				int pos=file.getName().lastIndexOf(".");
			    trxData.put("fileExtensions",file.getName().substring(pos));
			    JsonHelper.setTrxObject(reqData, trxData);	    
				FuncDataObj logicObj = new FuncDataObj();
			    logicObj.setReqData(reqData);	    
			    
			    String templateId =  (String) trxDataPara.getProterties().get("templateId");//配置文件id
				TemplatePara  templatePara = XMLParaParseHelper.parseFuncTemplatePara(
						templateId,context.getSysBusiUnit());//配置文件信息	    
			    logicObj.setReqParaObj(templatePara);
			    
			    //处理文件
			    importInvcFromFile(logicObj);
			 
			    File fileBak = new File(fileBakPath); 
			    if (!fileBak.exists()) {
					fileBak.mkdirs();
				}
			    //备份文件
			    bakInvcFile(file.getAbsolutePath(), fileBakPath+File.separator+file.getName());			    
			    
				
			} catch (Exception e) {
				e.printStackTrace();
				APLogUtil.getUserLogger().error("BatchInvcExecutor: 批处理应收账款逻辑流出错。");
				APLogUtil.getUserErrorLogger().error(ErrorUtil.getErrorStackTrace(e));
			}
		}	   
	}

	private void importInvcFromFile(FuncDataObj logicObj) throws Exception {		
		 //解析上传文件内容,数据写入logicObj中的data中。	   
    	TemplatePara  templatePara = (TemplatePara) logicObj.getReqParaObj();    	
		documentFactory.getProcessor(templatePara).importDoc(logicObj);			
	    reformat(logicObj);	    	
	}
	
	public void reformat(FuncDataObj logicObj) throws Exception {		
			APLogUtil
					.getUserLogger()
					.info("==================BatchInvcExecutor  start==========================");
			List list = (List) logicObj.getData().get(logicObj.getDoName());
			JSONObject reqData = logicObj.getReqData();
			JSONObject trxData = JsonHelper.getTrxObject(reqData);	
			// 校验数据
			list = checkData(logicObj, list);

			list = getSysRefNo(logicObj, list);// 获取发票流水加入list中。			
			BigDecimal invAmts = new BigDecimal(0);
			FuncDataObj dataObj = new FuncDataObj();
			String invSts = ""; //出入池状态
			String licenceNo = "";
			String buyerId = "";
			String oldLicenceNo = "";
			String oldInvSts = ""; //出入池状态
			String oldSysRefNo = ""; 
			String oldBuyerId = ""; 
			for (int i = 0; i < list.size(); i++) {
				Map map = (Map) list.get(i);
				Map invcMap= queryInvcMInvNo(logicObj.getReqData(), map);
				trxData.put("invSts", invSts);
				trxData.put("poolSts", "0");
				invSts=(String)map.get("invSts");
				licenceNo=(String)map.get("licenceNo");
				buyerId=(String)map.get("buyerId");
				oldLicenceNo =(String) invcMap.get("licenceNo");
				oldInvSts =(String) invcMap.get("invSts");
				oldSysRefNo =(String) invcMap.get("sysRefNo");
				oldBuyerId=(String) invcMap.get("buyerId");
				if( buyerId.isEmpty() || licenceNo.isEmpty() || invSts.isEmpty() || "1".equals(oldInvSts) )
					continue;
				else if( "1".equals(invSts) && ( !(buyerId.equals(oldBuyerId)) || !(oldLicenceNo.equals(licenceNo)) ) )
						continue;
				else if("0".equals(oldInvSts) && "0".equals(invSts))
					continue;
				else if(oldInvSts.isEmpty() && "1".equals(invSts))
					continue;
				else if("0".equals(oldInvSts) && "1".equals(invSts) ){
					map.put("sysRefNo", oldSysRefNo);
					dataObj.mergeResponse(saveInvcMOut(logicObj.getReqData(), map)); //统一事务
//					String invAmt = map.get("invAmt").toString();
//					invAmts = invAmts.add(new BigDecimal(invAmt));
				}
				else{
					dataObj.mergeResponse(saveInvcInfo(logicObj.getReqData(), map)); //统一事务
					String invAmt = map.get("invAmt").toString();
					invAmts = invAmts.add(new BigDecimal(invAmt));
				}
					
			}
			trxData.put("invAmts", invAmts);
			if(!trxData.containsKey("buyerId")){
				Map map = (Map) list.get(0);
				trxData.put("buyerId", map.get("buyerId"));
			}
			if(!trxData.containsKey("licenceNo")){
				Map map = (Map) list.get(0);
				trxData.put("licenceNo", map.get("licenceNo"));
			}
			JsonHelper.setTrxObject(reqData, trxData);
			FuncDataObj data = updateCntrctM(logicObj.getReqData());
			dataObj.mergeResponse(data); //统一事务
			
			daoHelper.execUpdate(dataObj);
			
			APLogUtil.getUserLogger().info("==================BatchInvcExecutor  end==========================");		
	}

	private Map<String, String> queryInvcMInvNo(JSONObject trxDom, Map map)throws Exception {
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);
		QueryNode node = new QueryNode();
		dataObj.setReqData(trxData);
		String invNo= map.get("invNo").toString(); 
		String sql = "";
		sql = "select invc  from  TRX.InvcM  invc  where invc.invNo = ?";
		node.setParams( invNo+":typejava.lang.String");
		node.setSql(sql);
		node.setType(LogicNode.LOGIC_TYPE_SQL);

		IQueryComponent process = queryFactory.getProcessor(node);
		dataObj.setReqParaObj(node);
		FuncDataObj processResult = process.queryData(dataObj);

		daoHelper.execQuery(processResult);
		Map<String,String> invcMap=new HashMap<String,String>();
		if (processResult.hasRecord()) {
			String sysRefNo=processResult.getString("sysRefNo");
			String invSts=processResult.getString("invSts");
			String licenceNo=processResult.getString("licenceNo");
			String buyerId=processResult.getString("buyerId");
			invcMap.put("sysRefNo", sysRefNo);
			invcMap.put("invSts", invSts);
			invcMap.put("licenceNo", licenceNo);
			invcMap.put("buyerId", buyerId);
			return  invcMap;
		} else {
			invcMap.put("sysRefNo", "");
			invcMap.put("invSts", "");
			invcMap.put("licenceNo", "");
			invcMap.put("buyerId", "");
			return invcMap;
		}
	}
	private List checkData(FuncDataObj logicObj, List list) throws Exception {		
		List reqList = new ArrayList<Object>();
		try {
			//JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
			for (int i = 0; i < list.size(); i++) {
				Map map = (Map) list.get(i);
				if(map.get("invNo")!=null &&StringUtils.isNotEmpty(map.get("invNo").toString().trim())){
					reqList.add(map);
				}
			}
			return reqList;
		} catch (Exception e) {
			e.printStackTrace();
			APLogUtil.getUserLogger().error(e.getMessage());			
		} 
		return list;
	}

	/**
	 * 判断是否有list重复元素
	 * 
	 * @param datas
	 * @return
	 * @see [类、类#方法、类#成员]
	 */
	private boolean singleElement(List<?> datas) {
		List newDatas = new ArrayList();
		boolean flag = false;
		for (Iterator it = datas.iterator(); it.hasNext();) {
			Object obj = it.next();
			if (newDatas.contains(obj)) {
				flag = true;
				break;
			} else {
				newDatas.add(obj);
			}
		}
		return flag;
	}

	/**
	 * 获取每张发票的流水，并将发票余额、协议号和批次号写入list
	 * 
	 * @param logicObj
	 * @param list
	 * @return
	 * @throws Exception
	 * @see [类、类#方法、类#成员]
	 */
	private List getSysRefNo(FuncDataObj logicObj, List list) throws Exception {
		List refList = new ArrayList();

		JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
		// 协议表中的 sys_ref_no为invc_m表的CNTRCT_NO
		RefPara refPara = new RefPara();
		refPara.setRefname("InvcRef");
		refPara.setReffield("invRefNo");

		FuncDataObj funObj = new FuncDataObj();
		funObj.setReqParaObj(refPara);
		funObj.setReqData(logicObj.getReqData());
		for (int i = 0; i < list.size(); i++) {
			FuncDataObj retData = null;
			try {
				retData = (FuncDataObj) refNoManager.generateNo(funObj);
			} catch (Exception e) {
				e.printStackTrace();
			}
			List listRef = (List) retData.getData().get(retData.getDoName());
			String invRefNo = (String) ((Map) listRef.get(0)).get("invRefNo");
			Map map = (Map) list.get(i);			
			map.put("invBal", map.get("invAmt"));
			map.put("sysRefNo", invRefNo);
			refList.add(map);
		}
		APLogUtil.getUserLogger().info(list.toString());
		return refList;
	}
	
	

	public FuncDataObj saveInvcInfo(JSONObject trxDom, Map map)
			throws Exception {
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);
		if (trxData.containsKey("sysBusiUnit")) {
			String sysBusiUnit = trxData.getString("sysBusiUnit");
			trxData.put("sysBusiUnit", sysBusiUnit);
		}
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("TRX.INVC_M");
		mainLogic.setType("C");	
		mainLogic.setCascadeevent("Y");
		dataObj.setReqParaObj(mainLogic);
		trxData.putAll(map);
		trxData.put("busiTp", "0");
		trxData.put("sysEventTimes", 1);
		trxData.put("sysOpTm", DateTimeUtil.getTimestamp());
		dataObj.setReqData(trxData);

		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor("trxAddRecord");
		dataObj = t.postData(dataObj);
		return dataObj;
	}
	private FuncDataObj saveInvcMOut(JSONObject trxDom, Map map)throws Exception {
		
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);
		if (trxData.containsKey("sysBusiUnit")) {
			String sysBusiUnit = trxData.getString("sysBusiUnit");
			trxData.put("sysBusiUnit", sysBusiUnit);
		}
		LogicNode mainLogic = new LogicNode();
		mainLogic.setTablename("TRX.INVC_M");
		mainLogic.setType("C");	
		mainLogic.setCascadeevent("Y");
		dataObj.setReqParaObj(mainLogic);
//		trxData.putAll(map);
		trxData.put("sysRefNo", map.get("sysRefNo"));
		trxData.put("invSts", map.get("invSts"));
		trxData.put("poolSts", "0");
//		trxData.put("sysOpTm", DateTimeUtil.getTimestamp());
		mainLogic.setFields("invSts,poolSts");
		dataObj.setReqData(trxData);

		ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor("trxEditRecord");
		dataObj = t.postData(dataObj);
		return dataObj;
		
	}

	private List<Map> checkCntrct(JSONObject trxDom){
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);
		if (trxData.containsKey("sysBusiUnit")) {
			String sysBusiUnit = trxData.getString("sysBusiUnit");
			trxData.put("sysBusiUnit", sysBusiUnit);
		}
		String buyerId = trxData.getString("buyerId");
		String selId = getSelId(trxDom);
		QueryNode queryNode = new QueryNode();
		queryNode.setSql("select c from TRX.CntrctM c where  c.buyerId=? and c.selId=? and c.approvalSts<>'2'");
		queryNode.setType(LogicNode.LOGIC_TYPE_SQL);
		String paras = new StringBuffer()
		.append(buyerId).append(",").append(selId).toString();
		queryNode.setParams(paras);
		dataObj.setReqParaObj(queryNode);
		dataObj.setReqData(trxData);		
		dataObj = queryFactory.getProcessor(queryNode).queryData(dataObj);
		daoHelper.execQuery(dataObj);
		List<Map> obj = (List<Map>) dataObj.get(dataObj.getDoName());
		context.setSysBusiUnit(dataObj.getString("sysBusiUnit"));
		return obj;
	}
	
	
	private String getSelId(JSONObject trxDom) {
		String selId = null;
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);
		if (trxData.containsKey("sysBusiUnit")) {
			String sysBusiUnit = trxData.getString("sysBusiUnit");
			trxData.put("sysBusiUnit", sysBusiUnit);
		}
		String licenceNo = trxData.getString("licenceNo");		
		QueryNode queryNode = new QueryNode();
		queryNode.setSql("select c from TRX.CustM c where  c.licenceNo=?");
		queryNode.setType(LogicNode.LOGIC_TYPE_SQL);
		queryNode.setParams(licenceNo);		
		dataObj.setReqParaObj(queryNode);
		dataObj.setReqData(trxData);		
		dataObj = queryFactory.getProcessor(queryNode).queryData(dataObj);
		daoHelper.execQuery(dataObj);
		List<Map> obj = (List<Map>) dataObj.get(dataObj.getDoName());  
		if (!obj.isEmpty()) {
			selId = ((Map) obj.get(0)).get("sysRefNo").toString();
		}
		return selId;
	}

//	判断发票是否已经存表
/*	private void judgeInvNo(JSONObject trxDom) {
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);
		if (trxData.containsKey("sysBusiUnit")) {
			String sysBusiUnit = trxData.getString("sysBusiUnit");
			trxData.put("sysBusiUnit", sysBusiUnit);
		}
		String licenceNo = trxData.getString("licenceNo");		
		QueryNode queryNode = new QueryNode();
		queryNode.setSql("select c from TRX.CustM c where  c.licenceNo=?");
		queryNode.setType(LogicNode.LOGIC_TYPE_SQL);
		queryNode.setParams(licenceNo);		
		dataObj.setReqParaObj(queryNode);
		dataObj.setReqData(trxData);		
		dataObj = queryFactory.getProcessor(queryNode).queryData(dataObj);
		daoHelper.execQuery(dataObj);
		List<String> invNoList = new ArrayList<String>();
	}*/
	
	/**
	 * @throws Exception
	 * 
	 */
	private FuncDataObj updateCntrctM(JSONObject trxDom)
			throws Exception {
		FuncDataObj dataObj = new FuncDataObj();
		JSONObject trxData = JsonHelper.getTrxObject(trxDom);		
		List<Map> obj = checkCntrct(trxDom);		
		if (!obj.isEmpty()) {
			for (Map per : obj) {
				LogicNode mainLogic = new LogicNode();				
				mainLogic.setTablename("TRX.CNTRCT_M");
				mainLogic.setType("C");
				mainLogic.setCascadeevent("Y");
				mainLogic.setFields("arBal,arAvalLoan,sysOpTm");
				dataObj.setReqParaObj(mainLogic);
				trxData.putAll(per);
				countCntrctM(trxData,per);
				trxData.put("sysOpTm", DateTimeUtil.getTimestamp());
				dataObj.setReqData(trxData);
				ILogicComponent t = ClassLoadHelper.getBusiComponetProcessor("trxEditRecord");
				dataObj = t.postData(dataObj);
				return dataObj;
			}
		}
		return null;

	}
	
	
	/**
	 * (入池、出池计算): <br>
	 * 应收账款余额 = 原应收账款余额+(-)累计发票金额;   <br>
	 * 应收账款可融资余额 = 原应收账款可融资余额+(-)（累计发票金额*融资比例 ）+ 信用额度余额.
	 * @param trxData  交易数据
	 * @param per   协议表原始数据 
	 */
	private void countCntrctM(JSONObject trxData, Map per) {
		String invSts = trxData.getString("invSts");
		BigDecimal invAmts = new BigDecimal(trxData.getString("invAmts"));
		BigDecimal arBal = new BigDecimal(0);// 应收账款余额
		BigDecimal arAvalLoan = new BigDecimal(0);// 应收账款可融资余额
		BigDecimal lmtBal = new BigDecimal(0); // 信用额度余额
		BigDecimal loanPerc = new BigDecimal(0);// 融资比例
		if(per.get("arBal")!=null){
			arBal = new BigDecimal(per.get("arBal").toString()); // 应收账款余额
		}
		if(per.get("arAvalLoan")!=null){
			arAvalLoan = new BigDecimal(per.get("arAvalLoan").toString()); // 应收账款可融资余额
		}
		if(per.get("lmtBal")!=null){
			lmtBal = new BigDecimal(per.get("lmtBal").toString()); // 信用额度余额
		}
		if(per.get("loanPerc")!=null){
			loanPerc = new BigDecimal(per.get("loanPerc").toString()).divide(new BigDecimal(100));// 融资比例
		}
		if("0".equals(invSts)){ //入池
			// 应收账款余额 = 原应收账款余额+累计发票金额
			trxData.put("arBal", arBal.add(invAmts));
			// 应收账款可融资余额 = 原应收账款可融资余额+（累计发票金额*融资比例 ）+ 信用额度余额
			arAvalLoan = arAvalLoan.add(loanPerc.multiply(invAmts)).add(lmtBal);
		}
		if("1".equals(invSts)){ //出池
			// 应收账款余额 = 原应收账款余额-累计发票金额
			trxData.put("arBal", arBal.subtract(invAmts));
			// 应收账款可融资余额 = 原应收账款可融资余额-（累计发票金额*融资比例 ）+ 信用额度余额
			arAvalLoan = arAvalLoan.subtract(loanPerc.multiply(invAmts)).add(lmtBal);
		}

		trxData.put("arAvalLoan", arAvalLoan);
	}

	/**
	 * 备份文件
	 * @param oldPath  旧文件完整路径
	 * @param newPath  新文件完整路径
	 */
	private void bakInvcFile(String oldPath,String newPath) throws Exception{
		APLogUtil.getUserLogger().info("-----开始备份文件--"+oldPath);
		SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmss");		
		String timeTrail = sf.format(new Date());
		File old = new File(oldPath);
		File newFile = new File(newPath+timeTrail);
		boolean s = old.renameTo(newFile);
		if(s){
			APLogUtil.getUserLogger().info("备份成功："+s+":"+newPath+timeTrail);
		}else{
			APLogUtil.getUserLogger().info("备份失败："+s+":"+newPath+timeTrail);
		}
	}
}

package com.ut.scf.pro.component.logic;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.ref.RefPara;
import com.ut.scf.core.component.ITemplateReformat;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoHelper;

@Component("invImport")
public class InvImport implements ITemplateReformat {
	
	@Resource(name="refNoManager")  
	IReferenceNo refNoManager;	
	protected IDaoHelper daoHelper;
	private static Logger logger = LoggerFactory.getLogger(InvImport.class);
	@Override
	public void reformat(FuncDataObj logicObj)
		throws Exception {
		logger.info("==================InvImport.reformat  start==========================");			
		List list = (List) logicObj.getData().get(logicObj.getDoName());
		
		checkData(logicObj,list);//校验数据
		
		list = getSysRefNo(logicObj,list);//获取发票流水加入list中。
		
		logicObj.buildRespose(list);		
		logger.info("==================InvImport.reformat  end==========================");		
	}
	
	private void checkData(FuncDataObj logicObj,List list) throws Exception {
		List<String> invList = new ArrayList<String>();
		StringBuilder sb = new StringBuilder();	
		try {
			JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
			JSONObject reqData=	logicObj.getReqData();
			String funcType ="";
			if(null!=reqData){
			JSONObject funcInfo=reqData.getJSONObject("funcInfo");
			funcType =funcInfo.getString("funcType");   
			}
			String trxSelName = trxData.getString("custNm");//卖方名称
			String invNoListStr = trxData.getString("invNoList");
			List invNoList = Arrays.asList(invNoListStr.split(","));
			//String cntrctNo = trxData.getString("cntrctNo");
			//String selId = trxData.getString("selId");
			//String busiTp = trxData.getString("busiTp");
			String selName = "";
			String buyerName ="";
			String buyerId = "";
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			String nowDate = formatter.format(new Date());
			for (int i = 0; i < list.size(); i++) {
				Map map = (Map)list.get(i);
				invList.add((String)map.get("invNo"));
				if(!("FP".equals(funcType))  && invNoList.contains((String)map.get("invNo"))){
					sb.append("应收账款编号为：【"+map.get("invNo")+"】的应收账款在表格或数据库中已存在。\r\n");
				};
				String invDueDt=(String) map.get("invDueDt");
				java.util.Date dueDtFormat = formatter.parse(invDueDt);
	            java.util.Date nowDtFormat = formatter.parse(nowDate);
	            if (dueDtFormat.getTime() < nowDtFormat.getTime()){
	            	sb.append("应收账款编号为：【"+map.get("invNo")+"】的应收账款已过期。\r\n");
	            }
				selName = (String)map.get("selNm");		
				buyerName = (String)map.get("buyerNm");
				buyerId = (String)map.get("buyerId"); 
				Date invDt = DateTimeUtil.getDate((String)map.get("invDt"));
				Date invValDt = DateTimeUtil.getDate((String)map.get("invValDt"));
				Date invDueDate = DateTimeUtil.getDate((String)map.get("invDueDt"));
				
				if(invValDt.getTime()<nowDtFormat.getTime()){
					sb.append("应收账款编号为：【"+map.get("invNo")+"的起算日期不能早于当前日期，请检查！ \r\n");
				}
				if(invValDt.before(invDt)){
					sb.append("应收账款编号为：【"+map.get("invNo")+"】的应收账款，应收账款起算日不能晚于应收账款开立日期。 \r\n");
				}
				
				/*if("3".equals(busiTp)){ //信保项下账期判定
					 //Integer sbrPeriod =  queryCntrctSbrM(cntrctNo,buyerId);//额度关联表账期
					 int acctPeriod =  DateTimeUtil.getDays(invValDt,invDueDate);
					 if(acctPeriod>sbrPeriod){
						 sb.append("应收账款编号为：【"+map.get("invNo")+"】的应收账款，发票账期不能大于信保项下的账期。 \r\n");	 
					 }
				}*/
			}		
			
			if(StringUtils.isEmpty(selName)){
				sb.append("授信客户名称不能为空。\r\n");
			}	
			if(!trxSelName.equals(selName)){
				sb.append("上传的卖方名称：【"+selName+"】,与协议中的卖方名称：【"+trxSelName+"】不一致。\r\n");
			}
			if(StringUtils.isEmpty(buyerName)){
				sb.append("间接客户名称不能为空。 \r\n");
			}	
			//String checkBuyer = queryCntrctSbrM(cntrctNo,selId,buyerId,buyerName); //验证买方编号与买方名称
			/*if("2".equals(checkBuyer)){
				sb.append("上传的间接客户编号【"+buyerId+"】不正确，请检查！ \r\n");
			}else if("3".equals(checkBuyer)){
				sb.append("上传的间接客户名称【"+buyerName+"】不正确,请检查! \r\n");
			}*/
			if (singleElement(invList)) {
				sb.append("文件中存在重复的应收账款编号! \r\n");
			}			
		}
		catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			sb.append(e.getMessage());
		}finally{
			if(StringUtils.isNotEmpty(sb.toString())){
				throw new Exception(sb.toString());
			}
		}		
	}
	
	/**
	 * 判断是否有list重复元素	 
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
	
	
	public static void main(String[] args) {
		
		
	}
	
	
	/**
	 * 获取每张发票的流水，并将发票余额、协议号和批次号写入list 
	 * @param logicObj
	 * @param list
	 * @return
	 * @throws Exception 
	 * @see [类、类#方法、类#成员]
	 */
	private List getSysRefNo(FuncDataObj logicObj,List list) throws Exception { 
		List refList = new ArrayList();
		
		JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());	
		//String cntrctNo = trxData.getString("cntrctNo");	
		String btNo = trxData.getString("sysRefNo");
		RefPara refPara = new RefPara();
		refPara.setRefname("invcRef");
		refPara.setReffield("sysRefNo");
		
		FuncDataObj funObj = new FuncDataObj();
		funObj.setReqParaObj(refPara);
		funObj.setReqData(logicObj.getReqData());
		for (int i = 0; i < list.size(); i++) {			
			FuncDataObj retData = null;
			try {
				retData = (FuncDataObj)refNoManager.generateNo(funObj);
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			List listRef = (List)retData.getData().get(retData.getDoName());
			String sysRefNo = (String)((Map)listRef.get(0)).get("sysRefNo");
			Map map = (Map)list.get(i);
			Date invValDt = DateTimeUtil.getDate((String)map.get("invValDt"));
			Date invDueDt = DateTimeUtil.getDate((String)map.get("invDueDt"));
			int acctPeriod = DateTimeUtil.getDays(invValDt,invDueDt);
			//int days = Integer.parseInt((String)map.get("acctPeriod"));
			//Date trxDueValDt =DateTimeUtil.dateAddDays(invValDt, days);
			//map.put("invDueDt", trxDueValDt);
			double invAmt =  (Double) map.get("invAmt");
			double acctAmt = (Double) map.get("acctAmt");
			map.put("acctPeriod", acctPeriod);//账期
			map.put("invBal",invAmt-acctAmt );//应收账款净额
			//map.put("cntrctNo", cntrctNo);
			map.put("sysRefNo", sysRefNo);	//流水号
			//map.put("batchNo",btNo);
		    refList.add(map);
		}			
		logger.info(list.toString());
		return refList;
	}
	
	/**
	 * 查询额度关联表中的买方信息
	 * @param cntrctNO
	 * @param selId
	 * @return
	 * @throws Exception 
	 * @see [类、类#方法、类#成员]
	 */
	public String   queryCntrctSbrM(String cntrctNo,String selId,String buyerId,String buyerNm){
	    try {
				if(null == daoHelper) {
					daoHelper    = ClassLoadHelper.getComponentClass("daoHelper");
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
	    String cols = "BUYER_ID,BUYER_NM"; 
		List<Map<String, Object>> obj = daoHelper.executeOrentSql(" SELECT " + cols + " FROM TRX.CNTRCT_SBR_M WHERE CNTRCT_NO = '"+ cntrctNo+"' AND SEL_ID ='"+selId+"'", cols.split(","));
	    if(!obj.isEmpty()){
	    	for(int i=0;i<obj.size();i++){
	    		if(buyerId.equals(obj.get(i).get("BUYER_ID"))){
	    			if(!buyerNm.equals(obj.get(i).get("BUYER_NM"))){
	    				return "3";//买方名称不正确
	    			}
	    		}else{
	    			return "2";//买方编号不正确
	    		}
	    	}
	    }
		return "";
	}
	
	/*查询信保项下的账期
	 * 
	 */
	
	public Integer queryCntrctSbrM(String cntrctNo,String buyerId){
try {
			
			if(null == daoHelper) {
				daoHelper    = ClassLoadHelper.getComponentClass("daoHelper");
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		String cols = "ACCT_PERIOD"; 
		List<Map<String, Object>> obj = daoHelper.executeOrentSql(" SELECT ACCT_PERIOD  FROM TRX.CNTRCT_SBR_M  WHERE  CNTRCT_NO = '"+cntrctNo+"' AND BUYER_ID = '"+buyerId+"'", cols.split(","));
		Integer acctPeriod = 0;
		if(obj.size()>0){
			acctPeriod = ((BigDecimal)obj.get(0).get("ACCT_PERIOD")).intValue();
		}
		
		return acctPeriod;
	}
}







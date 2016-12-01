package com.ut.scf.pro.component.logic;




import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONObject;
import oracle.sql.TIMESTAMP;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.sun.msv.datatype.xsd.datetime.BigDateTimeValueType;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.ref.RefPara;
import com.ut.scf.core.component.ITemplateReformat;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.ref.IReferenceNo;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoHelper;
import com.ut.scf.orm.trx.CrtfM;


@Component("qualTemplateReformatImpl")
public class QualTemplateReformatImpl implements ITemplateReformat{
	@Resource(name="refNoManager")  
	IReferenceNo refNoManager;	
	//@Resource(name = "daoHelper")
	protected IDaoHelper daoHelper;
	private static Logger logger = LoggerFactory.getLogger(QualTemplateReformatImpl.class);
	@Override
	public void reformat(FuncDataObj logicObj) throws Exception {
		// TODO Auto-generated method stub
       List list = (List) logicObj.getData().get(logicObj.getDoName());
		
		checkData(logicObj,list);//校验数据
		
		list = getSysRefNo(logicObj,list);//获取发票流水加入list中。
		
		logicObj.buildRespose(list);	
	}

	public void checkData(FuncDataObj logicObj,List list) throws Exception{
		List<String> qualList = new ArrayList<String>();
		StringBuilder sb = new StringBuilder();		
		try {
				JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
				String qualiNoListStr = trxData.getString("qualiNoList").trim();
				String loanId = trxData.getString("loanId");
				List qualiNoList = Arrays.asList(qualiNoListStr.split(","));
				int crtfNum=0; //导入合格证数量与列表已存在合格证总和
				if(!qualiNoListStr.isEmpty()){
					crtfNum = qualiNoList.size()+list.size();
				}else{
					 crtfNum = list.size();
				}
				if(!queryCrtfCount(loanId,crtfNum,list,qualiNoList)){
					sb.append("导入合格证记录超过融资编号为:【"+loanId+"】下的合格证数量，请检查!\r\n");
				}
				for (int i = 0; i < list.size(); i++) {
					Map map = (Map)list.get(i);
					String crtfNo = (String)map.get("crtfNo");
					qualList.add(crtfNo);
					String billNo = (String)map.get("billNo");
					List<Map<String,Object>> bList = queryBill(billNo,loanId);
					List<Map<String,Object>> cList = queryRefNo(crtfNo); //查询合格对应的订单号
					if(!cList.isEmpty()){
						String cBillNo = (String)cList.get(0).get("BILL_NO");
						if(!cBillNo.equals(billNo)){  //验证合格唯一性,同一个合格证是否对应同一个票据
							sb.append("【"+crtfNo+"】已存在票号为：【"+cBillNo +"】中。\r\n");
						}
					}
					if(bList.isEmpty()){
						sb.append("汇票票号为：【"+billNo+"】不存在融资编号为：【"+loanId+"】中。\r\n");
					}
					if (singleElement(qualList)) {
						sb.append("文件中存在重复的合格证编号! \r\n");
				    }	
					//导入数据与列表数据对比
					/*for(int k=0;k<qualiNoList.size();k++){
						if(qualiNoList.get(i))
					}*/
					
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
	
	private List getSysRefNo(FuncDataObj logicObj, List list) throws Exception {
		List refList = new ArrayList();
		JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());	
		String loanId = trxData.getString("loanId");
		RefPara refPara = new RefPara();
		refPara.setRefname("qualRef");
		refPara.setReffield("sysRefNo");
		FuncDataObj funObj = new FuncDataObj();
		funObj.setReqParaObj(refPara);
		funObj.setReqData(logicObj.getReqData());
		StringBuffer sb = new StringBuffer();
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
			String crtyNo = (String) map.get("crtfNo");
			List<Map<String, Object>>  qList = queryRefNo(crtyNo); //重复合格证处理
			if(qList.isEmpty()){
				map.put("sysRefNo",sysRefNo );
			}else{
				String crtfSysRefNo = (String) qList.get(0).get("SYS_REF_NO");
				map.put("sysRefNo",crtfSysRefNo );
			}
			//票据开立日期，到期日，金额赋值
			String billNo = (String) map.get("billNo");
			List<Map<String,Object>> bList = queryBill(billNo,loanId);
			if(!bList.isEmpty()){
			    TIMESTAMP billDueDt = (TIMESTAMP)bList.get(0).get("BILL_DUE_DT");
			    TIMESTAMP billValDt = (TIMESTAMP)bList.get(0).get("BILL_VAL_DT");
				map.put("billAmt",bList.get(0).get("BILL_AMT"));
				if(null != billDueDt && !"".equals(billDueDt))
					map.put("billDueDt",new java.util.Date(billDueDt.timestampValue().getTime()));
				if(null != billValDt && !"".equals(billValDt))
					map.put("billValDt",new java.util.Date(billValDt.timestampValue().getTime()));
			}
			//重复数据存在复核数据不导入
			if(!qList.isEmpty() && !("M").equals(qList.get(0).get("SYS_TRX_STS")))
				sb.append("【"+crtyNo+"】");
			else
				refList.add(map);
		}
		if(StringUtils.isNotEmpty(sb.toString())){
			Map map = new HashMap();
			String str = "合格证编号为："+sb+"在途，";
			map.put("info",str );
			refList.add(map);
		}
		logger.info(list.toString());
		return refList;
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
	
	//查询合格编号对应的流水号并查询出订单号验证合格证的唯一性
	public List<Map<String, Object>>   queryRefNo (String crtfNo){
		try {
			
			if(null == daoHelper) {
				daoHelper    = ClassLoadHelper.getComponentClass("daoHelper");
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		String cols = "SYS_REF_NO,SYS_TRX_STS,BILL_NO"; 
		List<Map<String, Object>> obj = daoHelper.executeOrentSql(" SELECT " + cols + " FROM TRX.CRTF_M WHERE CRTF_NO = '"+ crtfNo+"'", cols.split(","));
		return obj;
	}
	
	//查询融资下的所有订单
	public List<Map<String, Object>>   queryBill (String billNo,String loanId){
			try {
				
				if(null == daoHelper) {
					daoHelper    = ClassLoadHelper.getComponentClass("daoHelper");
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
			String cols = "BILL_NO,BILL_AMT,BILL_VAL_DT,BILL_DUE_DT"; 
			List<Map<String, Object>> obj ;
			if(loanId==null){
				obj = daoHelper.executeOrentSql(" SELECT " + cols + " FROM TRX.BILL_M WHERE BILL_NO = '"+ billNo+"'", cols.split(","));
			}else{
				obj = daoHelper.executeOrentSql(" SELECT " + cols + " FROM TRX.BILL_M WHERE BILL_NO = '"+ billNo+"'  and LOAN_ID = '"+loanId+"'", cols.split(","));
			}
			return obj;
	}
		
	//查询一笔融资下的订单中所有的合格证总数与已存在的合格证比较
	public boolean  queryCrtfCount(String loanId,int crtfNum,List list,List qualiNoList){
     try {
			if(null == daoHelper) {
				daoHelper    = ClassLoadHelper.getComponentClass("daoHelper");
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		String cols = "PO_NUM"; 
		String cols1 = "CRTF_NO"; 
		List<Map<String, Object>> obj = daoHelper.executeOrentSql(" SELECT " + cols + " FROM TRX.PO_M M JOIN TRX.INVC_LOAN_M N ON M.SYS_REF_NO = N.INV_REF WHERE N.INVC_LOAN_ID = '"+loanId+"'", cols.split(","));
		List<Map<String, Object>> objAlr = daoHelper.executeOrentSql(" SELECT " + cols1 + " FROM TRX.CRTF_M  WHERE LOAN_ID = '"+loanId+"'", cols1.split(","));
		int sumPoNum = 0; //订单下总合格证
		int sumCftfNo =0; //已存在的合格证
		if(!obj.isEmpty()){
			for(int i=0;i<obj.size();i++){
				sumPoNum += ((BigDecimal)obj.get(i).get("PO_NUM")).intValue();
			}
		}
		int lCount =0 ; 
		if(!objAlr.isEmpty()){
			for(int i=0;i<objAlr.size();i++){
				for(int j=0;j<list.size();j++){
					Map map = (Map)list.get(j);
					if(((String)map.get("crtfNo")).equals(objAlr.get(i).get("CRTF_NO"))){ //导入合格证与数据库相同
						crtfNum--;
					}
				}
				for(int k =0 ;k<qualiNoList.size();k++){
					if(objAlr.get(i).get("CRTF_NO").equals(qualiNoList.get(k))){//列表的合格证与数据库一致的数据
						lCount++;
					}
				}
			}
				sumCftfNo = objAlr.size();
			
		}
		if(sumPoNum-sumCftfNo>=crtfNum-lCount){ //已有合格证数量大于表单合格证数量
			return true;
		}else{
			return false;
		}
	}
}

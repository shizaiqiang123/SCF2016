package com.ut.scf.pro.component.logic;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
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

@Component("collTemplateReformatImpl")

public class CollTemplateReformatImpl implements ITemplateReformat {
	
	@Resource(name="refNoManager")  
	IReferenceNo refNoManager;	
	protected IDaoHelper daoHelper;
	private static Logger logger = LoggerFactory.getLogger(CollTemplateReformatImpl.class);
	@Override
	public void reformat(FuncDataObj logicObj)
		throws Exception {
		logger.info("==================InvTemplateReformatImpl.reformat  start==========================");			
		List list = (List) logicObj.getData().get(logicObj.getDoName());
		
		checkData(logicObj,list);//校验数据
		
		list = getSysRefNo(logicObj,list);//获取商品流水加入list中。
		
		logicObj.buildRespose(list);		
		logger.info("==================InvTemplateReformatImpl.reformat  end==========================");		
	}
	
	private void checkData(FuncDataObj logicObj,List list) throws Exception {
		List<String> collList = new ArrayList<String>();
		StringBuilder sb = new StringBuilder();		
		try {
			JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
			String trxCntrctNo = trxData.getString("cntrctNo");//协议编号
			String trxPoNo = trxData.getString("poNo");//订单编号
//			String trxPollatCcy = trxData.getString("collatCcy");//币别
//			String trxPoAmt = trxData.getString("poAmt");//金额
			String invNoListStr = trxData.getString("invNoList");
			List invNoList = Arrays.asList(invNoListStr.split(","));
			String cntrctNo = "";
			String poNo ="";			
			String collatCcy ="";			
			String poAmt ="";		
			List goodsList = new ArrayList();
			goodsList = queryGoodsList();
			List<String> goods_list = new ArrayList();
			for (int i=0;i<goodsList.size();i++){  
				Map  map=(Map)goodsList.get(i); 
				Iterator iterator = map.keySet().iterator(); 
				while (iterator.hasNext()){          
					String key = (String) iterator.next();
					goods_list.add((String)map.get(key));
				}
			}
			for (int i = 0; i < list.size(); i++) {
				Map map = (Map)list.get(i);
				
				if(!goods_list.contains((String)map.get("goodsId"))){
					sb.append("商品编号：【"+map.get("goodsId").toString()+"】,在商品信息系统中不存在！ \r\n");
				}
				
				collList.add((String)map.get("goodsId"));
				
				if(invNoList.contains((String)map.get("goodsId"))){
					sb.append("商品编号为：【"+map.get("goodsId")+"】的商品在表格中已存在。\r\n");
				};
				cntrctNo = (String)map.get("cntrctNo");		
				poNo = (String)map.get("poNo");
				collatCcy = (String)map.get("poCcy");
				poAmt = (String)map.get("poAmt");
			}			
			if(StringUtils.isEmpty(cntrctNo)){
				sb.append("协议编号不能为空。\r\n");
			}	
			if(!trxCntrctNo.equals(cntrctNo)){
				sb.append("上传的协议编号：【"+cntrctNo+"】,与协议中的协议编号：【"+trxCntrctNo+"】不一致。\r\n");
			}
			if(StringUtils.isEmpty(poNo)){
				sb.append("订单编号不能为空。 \r\n");
			}	
			if(!trxPoNo.equals(poNo)){
				sb.append("上传的订单编号：【"+poNo+"】,与协议中的订单编号：【"+trxPoNo+"】不一致。\r\n");
			}
			if(StringUtils.isEmpty(collatCcy)){
				sb.append("币别不能为空!\r\n");
			}	
			if(StringUtils.isEmpty(poAmt)){
				sb.append("金额不能为空!\r\n");
			}	
			if (singleElement(collList)) {
				sb.append("文件中存在重复的商品编号! \r\n");
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
	 * @see [类、类#方法、类#成员]
	 */
	private List getSysRefNo(FuncDataObj logicObj,List list) {
		List refList = new ArrayList();
		
		JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());	
		//协议表中的 sys_ref_no为invc_m表的CNTRCT_NO
		//String cntrctNo = trxData.getString("cntrctNo");	
		
		RefPara refPara = new RefPara();
		refPara.setRefname("CollatRef");
		refPara.setReffield("sysRefNo");
		
		FuncDataObj funObj = new FuncDataObj();
		funObj.setReqParaObj(refPara);
		funObj.setReqData(logicObj.getReqData());;
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
			map.put("sysRefNo", sysRefNo);	
		    refList.add(map);
		}			
		logger.info(list.toString());
		return refList;
	}
	public List queryGoodsList(){
		try {
			if(null == daoHelper) {
				daoHelper    = ClassLoadHelper.getComponentClass("daoHelper");
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		String cols = "GOODS_ID"; 
		 List<Map<String, Object>> obj = daoHelper.executeOrentSql("SELECT GOODS_ID  FROM STD.STD_GOODS_CATA", cols.split(","));
		
		return obj;
	}
	
}

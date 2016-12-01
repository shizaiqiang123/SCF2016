package com.ut.scf.pro.component.logic;

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

@Component("blackListTemplateReformatImpl")
public class BlackListTemplateReformatImpl implements ITemplateReformat {
	
	@Resource(name="refNoManager")  
	IReferenceNo refNoManager;	
	
	private static Logger logger = LoggerFactory.getLogger(BlackListTemplateReformatImpl.class);
	@Override
	public void reformat(FuncDataObj logicObj)
		throws Exception {
		logger.info("==================BlackListTemplateReformatImpl.reformat  start==========================");			
		List list = (List) logicObj.getData().get(logicObj.getDoName());
		
		//checkData(logicObj,list);//校验数据
		
		list = getSysRefNo(logicObj,list);//获取发票流水加入list中。
		
		logicObj.buildRespose(list);		
		logger.info("==================InvTemplateReformatImpl.reformat  end==========================");		
	}
	
	private void checkData(FuncDataObj logicObj,List list) throws Exception {
		List<String> invList = new ArrayList<String>();
		StringBuilder sb = new StringBuilder();		
		try {
			JSONObject trxData = JsonHelper.getTrxObject(logicObj.getReqData());
			String invNoListStr = trxData.getString("invNoList");
			List invNoList = Arrays.asList(invNoListStr.split(","));
			String selName = "";
			String buyerName ="";	
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			String nowDate = formatter.format(new Date());
			for (int i = 0; i < list.size(); i++) {
				Map map = (Map)list.get(i);
				invList.add((String)map.get("invNo"));
				if(invNoList.contains((String)map.get("invNo"))){
					sb.append("应收账款编号为：【"+map.get("invNo")+"】的发票在表格或数据库中已存在。\r\n");
				};			
			}			
			
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

		String bussType = trxData.getString("bussType");//业务类型
		
		//获取系统流水号
		RefPara refPara = new RefPara();
		refPara.setRefname("BlackRef");
		refPara.setReffield("sysRefNo");
		FuncDataObj funObj = new FuncDataObj();
		funObj.setReqParaObj(refPara);
		funObj.setReqData(logicObj.getReqData());
		
		String batchNo = String.valueOf(System.currentTimeMillis());
		
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
			map.put("batchNo", batchNo);
			map.put("bussType", bussType);
			map.put("impNum", list.size());
			map.put("impDate", DateTimeUtil.getSysDate());
			
			if("2".equals(bussType)){
				map.put("cretType","1");
			}
			
		    refList.add(map);
		}			
		logger.info(list.toString());
		return refList;
	}
	
}

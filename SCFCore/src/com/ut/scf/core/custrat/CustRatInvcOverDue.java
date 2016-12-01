package com.ut.scf.core.custrat;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.dao.IDaoHelper;

/**
 * 客户评级中对于应收账款逾期的评分计算
 * 查询该个授信客户下逾期的应收账款条数。
 * 每条扣减5分。
 * @author JJH on 2016-09-19
 *
 */
public class CustRatInvcOverDue {
	protected IDaoHelper daoHelper;

	public int getScore(String selId){
		try {
			daoHelper  = ClassLoadHelper.getComponentClass("daoHelper");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		String cols = "SYS_OP_ID,SYS_REL_ID,CNTRCT_NO,SEL_ID,BUYER_ID,INV_NO,INV_DUE_DT,INV_BAL,DAYOFF"; 
		
		StringBuffer xBuff = new StringBuffer("");
		xBuff.append(" SELECT ");
		xBuff.append(" SYS_OP_ID,SYS_REL_ID,CNTRCT_NO,SEL_ID,BUYER_ID,INV_NO,INV_DUE_DT,INV_BAL, TRUNC(SYSDATE)-TRUNC(INV_DUE_DT) AS DAYOFF ");
		xBuff.append(" FROM TRX.INVC_M ");
		xBuff.append(" WHERE INV_BAL > 0 AND (TRUNC(INV_DUE_DT) < TRUNC(SYSDATE)) AND SEL_ID='"+selId+"'");
		
		List<Map<String, Object>> back = daoHelper.executeOrentSql(xBuff.toString(), cols.split(","));
		if(null != back && back.size() > 0) {
			//每应收账款逾期一条扣5分
			int invcOverNum = back.size()*(-5);
			return invcOverNum;
		}else{
			return 0;
		}
	}
}
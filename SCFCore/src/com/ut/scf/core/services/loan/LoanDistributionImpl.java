package com.ut.scf.core.services.loan;

import com.ut.comm.xml.product.ProductPara;

import net.sf.json.JSONObject;

public interface LoanDistributionImpl {
	/*
	 * 初始化数据
	 */
	public void initDate(JSONObject jsonObject,ProductPara productPara);
	
	/*
	 * 单级资金还是多级资金
	 */
	public Object judgeFintp();
}

package com.ut.scf.core.services.loan;


import java.io.ObjectInputStream.GetField;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.xml.product.FinSourcePara;
import com.ut.comm.xml.product.FinSourcesPara;
import com.ut.comm.xml.product.ProductPara;

import net.sf.json.JSONObject;


/*
 * 
 * 资金优先级分配
 */
public class LoanDistribution implements LoanDistributionImpl{
	protected JSONObject trxDate;
	protected JSONObject trxDom;
	protected ProductPara productPara;
	protected List<FinSourcePara> finsources=new ArrayList<FinSourcePara>();
	/*
	 * 
	 * (non-Javadoc)
	 * @see com.ut.scf.core.services.loan.LoanDistributionImpl#initDate(net.sf.json.JSONObject, com.ut.comm.xml.product.ProductPara)
	 */
	@Override
	public void initDate(JSONObject jsonObject, ProductPara productPara) {
		this.trxDate=jsonObject;
		this.trxDom=JsonHelper.getTrxObject(trxDate);
		this.productPara=productPara;
		this.finsources=(List<FinSourcePara>)setFinsources();
//		productPriority=(Map)getProductPrioritys();
//		return getClass();
	}
	
	public Object judgeFintp(){
		switch (Integer.parseInt(productPara.getFintp())){
		case 0:
			return new LoanDistributionSingle();
		case 1:
			return new LoanDistributionDouble();
		default:
			return null;
		}
	}
	public Object setFinsources(){
		return productPara.getFinsources().getFinSources();
	}
	public void sortProductId(){
	}
	public Object getFinsources(){
		return finsources;
	}
//	public Object getProductPrioritys(){
//		for(FinSourcePara finSourcePara:(List<FinSourcePara>)getFinsources()){
//		
//		return productPriority;
//	}
	
}

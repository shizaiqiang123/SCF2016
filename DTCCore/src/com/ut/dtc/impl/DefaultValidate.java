package com.ut.dtc.impl;

import java.util.ArrayList;
import java.util.List;

import com.ut.dtc.intf.IMessageHeader;
import com.ut.dtc.intf.IValidate;
import com.ut.dtc.util.DBUtil;
import com.ut.dtc.util.LogUtil;

public class DefaultValidate implements IValidate{

	@Override
	public boolean validateHeader(Object obj) throws Exception {
		IMessageHeader header = (IMessageHeader) obj;
		String custId = header.getCustId();
		String sercurity = header.getSecurityCode();
		String msgTp = header.getTranCode();
		
		String sql = "select sys_ref_no from TRX.DTC_CUST_M where sys_ref_no = ? and sercurity = ?";
		List<Object> parms = new ArrayList<Object>();
		parms.add(custId);
		parms.add(sercurity);
		int count = DBUtil.countData(sql, parms);
//		count = 1;// need to completed
		if(count>0){
			sql = "select sys_ref_no from TRX.DTC_CUST_INTF where cust_Id = ? and intf_tp = ?";
			parms = new ArrayList<Object>();
			parms.add(custId);
			parms.add(msgTp);
			count = DBUtil.countData(sql, parms);
//			count =1;// need to completed
			if(count>0){
				LogUtil.debug("do Authorize Check success.");
			}else{
				throw new Exception("do Authorize Check failed: 用户无此接口权限。");
			}
		}else{
			throw new Exception("do Authorize Check failed: 授权码错误。");
		}
		return true;
	}

	@Override
	public boolean validateBody(Object obj) throws Exception {
		//验证每个栏位的格式
		
		return false;
	}

	@Override
	public boolean validateRequest(Object obj) throws Exception {
		return false;
	}

	@Override
	public boolean validateResponse(Object obj) throws Exception {
		return false;
	}

}

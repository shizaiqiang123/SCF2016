package com.ut.dtc.intf;

public interface IMessageHeader {
	public String getSystemId();
	public void setSystemId(String systemId);
	public String getTranCode() ;
	public void setTranCode(String tranCode);
	public String getCustId() ;
	public void setCustId(String custId);
	public String getTranDate();
	public void setTranDate(String tranDate);
	public String getSecurityCode() ;
	public void setSecurityCode(String securityCode);
	public String getCustNm() ;
	public void setCustNm(String custNm) ;
}

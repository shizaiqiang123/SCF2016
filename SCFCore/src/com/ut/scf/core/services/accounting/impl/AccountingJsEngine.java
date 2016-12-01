package com.ut.scf.core.services.accounting.impl;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.accounting.AccountingNoPara;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.js.AbsServerSideJs;
import com.ut.scf.core.js.ScriptManager;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ApSessionUtil;

@Service("accountingJsEngine")
@Scope("prototype")
@Lazy
public class AccountingJsEngine extends AbsServerSideJs{
	
	private final String BEANNAME = "$";
	
	protected Object reqData;
	
	protected Object commData;
	
	protected Object funcData;
	
	protected Object userData;
	
	private Date sysDate;
	
	private AccountingObject accountObj;
	
	private AccountingConfiture configture;
	
	private Map<String,Object> definedAccount;
	
	private List debitList= new ArrayList<Object>();
	private List creditList= new ArrayList<Object>();
	
	private List<AccountingSubject> subjectList = new ArrayList<AccountingSubject>();
	
	@Override
	protected Logger getLogger() {
		ApSessionContext context = ApSessionUtil.getContext();
		return APLogUtil.getServiceLogger(context.getSysBusiUnit());
	}

	@Override
	public void initTrxData(Object trxData) {
		if(scriptMgr==null){
			scriptMgr =new ScriptManager(BEANNAME, this); 
		}
		subjectList.clear();
		debitList.clear();
		creditList.clear();
		
		Assert.isTrue(JSONObject.class.isAssignableFrom(trxData.getClass()), "Currenttly doesn't support others data type but [JSONObject].");
		this.orgnData = (JSONObject) trxData;
		
		this.reqData = JsonUtil.clone((JSONObject) trxData);
		
		JSONObject reqJson = (JSONObject) this.reqData;
		
		commData = JsonHelper.getConnObject(reqJson);
		funcData = JsonHelper.getFuncObject(reqJson);
		userData = JsonHelper.getUserObject(reqJson);
		this.trxData = JsonHelper.getTrxObject(reqJson);
		
		sysDate = DateTimeUtil.getSysDate();
		accountObj = new AccountingObject();
		
		accountObj.setAmt(new BigDecimal("0.00"));
		accountObj.setCcy(super.getStringValue(this.trxData, "ccy"));
		if(StringUtil.isTrimEmpty(accountObj.getCcy())){
			accountObj.setCcy("CNY");
		}
		accountObj.setCretTm(sysDate);
		accountObj.setReconStat("S");
 		accountObj.setRelEvtNo(0);
		accountObj.setRelRefNo(super.getStringValue(this.trxData, "sysRefNo"));
		accountObj.setSysRefNo(UUIdGenerator.getUUId());
		accountObj.setTrxDesc(super.getStringValue(this.funcData, "name"));
	}

	@Override
	public Object getTrxData() {
		return this.subjectList;
	}

	@Override
	public void executeJsFile(String fileName) throws Exception {
		if (StringUtil.isTrimEmpty(fileName))
			return;
		File scriptFile = new File(getJsFilePath("accounting", fileName));
		if (scriptFile.exists() && scriptFile.canRead()){
			scriptMgr.exec(scriptFile);
			checkBalance();
		}
		else
			throw new IOException("File not found or cannt read.");
	}

	@Override
	public void executeJsContent(String jsContent) throws Exception{
		scriptMgr.exec(jsContent);
	}
	
	public Object getData(){
		return this.trxData;
	}
	
	public Object createDebitSubject(){
		AccountingSubject debitObj = (AccountingSubject) createSubject();
		debitObj.setTrxTp("D");
		return debitObj;
	}
	
	public Object createCreditSubject(){
		AccountingSubject creditObj = (AccountingSubject) createSubject();
		creditObj.setTrxTp("C");
		return creditObj;
	}
	
	public void addSubject(AccountingSubject subject){
		
		if(isForeignAccount(subject)){
			if(isDebitSubject(subject)){
				subjectList.add(subject);
				appendForeignSubject(subject);
			}else{
				appendForeignSubject(subject);
				subjectList.add(subject);
			}
		}else{
			subjectList.add(subject);
		}
	}
	
	private void appendForeignSubject(AccountingSubject subject) {
		BigDecimal trxAmt = subject.getAmt();
		Double rate = subject.getExchRate();

		
		String cridetAccount = this.getSysAccountNo("Exchange_Account_C");
		
		appendForeignSubject(trxAmt,rate,cridetAccount,"C",subject.getCcy());
		
		String debitAccount = this.getSysAccountNo("Exchange_Account_D");
		
		BigDecimal subjectAmt = trxAmt.divide(new BigDecimal(rate),trxAmt.scale(),BigDecimal.ROUND_HALF_UP);
		
		appendForeignSubject(subjectAmt,1.00,debitAccount,"D",accountObj.getCcy());
	}
	
	private void appendForeignSubject(BigDecimal trxAmt,Double rate ,String accountNo,String trxType,String ccy){
		AccountingSubject creditObj = new AccountingSubject();
		creditObj.setCretTm(sysDate);
		creditObj.setUpdtTm(sysDate);
		creditObj.setTrxTp(trxType);
		creditObj.setAccNo(accountNo);
		creditObj.setAmt(trxAmt);
		creditObj.setExchRate(rate);
		creditObj.setCcy(ccy);
		subjectList.add(creditObj);
	}

	private boolean isDebitSubject(AccountingSubject subject) {
		return "D".equalsIgnoreCase(subject.getTrxTp());
	}

	private boolean isForeignAccount(AccountingSubject subject) {
		return !subject.getCcy().equalsIgnoreCase(accountObj.getCcy());
	}

	public Object createSubject(){
		AccountingSubject creditObj = new AccountingSubject();
		creditObj.setCretTm(sysDate);
		creditObj.setUpdtTm(sysDate);
		return creditObj;
	}
	
	public void setAccountNo(AccountingSubject subject, Object accNo) throws Exception{
		if(accNo==null)
			super.throwException("Canot get Account No.");
		ApSessionContext context=ApSessionUtil.getContext();
		String bu = context.getSysBusiUnit();
		if(StringUtils.isEmpty(bu)){
			bu = "platform";
		}
		String accountNo = this.getSysAccountNo(bu+accNo.toString());
		String accountDesc = this.getSysAccountDesc(bu+accNo.toString());
		subject.setAccNo("("+accountNo+")"+accountDesc);
//		subject.setDesc(accountDesc);
	}
	
	/*
	 * 从页面上抓取还款账号
	 * */
	public void setAccountNoFormForm(AccountingSubject subject, String accNo,Object acNo) throws Exception{
		if(!StringUtil.isEmpty(accNo)){
			if(acNo==null)
				super.throwException("Canot get Account No.");
			ApSessionContext context=ApSessionUtil.getContext();
			String bu=context.getSysBusiUnit();
			String accountNo = this.getSysAccountNo(bu+acNo.toString());
			String accountDesc = this.getSysAccountDesc(bu+acNo.toString());
			subject.setAccNo("("+accNo+")"+accountDesc);
		}
	}
	
	public void setAccountDesc(AccountingSubject subject, Object accDesc) throws Exception{
		if(accDesc==null)
			super.throwException("Canot get Account Description.");
		subject.setDesc(accDesc.toString());
	}
	
	public void setAmt(AccountingSubject subject, Object amt) throws Exception{
		if(amt==null)
			super.throwException("Canot get Amt.");
		subject.setAmt(new BigDecimal(amt.toString()));
	}
	
	public void setBalBef(AccountingSubject subject, Object balBef) throws Exception{
		if(balBef==null)
			super.throwException("Canot get Bal Bef.");
		subject.setBalBef(new BigDecimal(balBef.toString()));
	}
	
	public void setBalAft(AccountingSubject subject, Object balAft) throws Exception{
		if(balAft==null)
			super.throwException("Canot get Bal Aft.");
		subject.setBalAft(balAft.toString());
	}
	
	public void setOrgAmt(AccountingSubject subject, Object orgAmt) throws Exception{
		if(orgAmt==null)
			super.throwException("Canot get Org Amt.");
		subject.setOrgAmt(new BigDecimal(orgAmt.toString()));
	}
	
	public void setCcy(AccountingSubject subject, Object ccy) throws Exception{
		if(ccy==null)
			super.throwException("Canot get ccy.");
		subject.setCcy(ccy.toString());
	}
	
	public void setRelRefNo(AccountingSubject subject, Object relRefNo) throws Exception{
		if(relRefNo==null)
			super.throwException("Canot get relRefNo.");
		subject.setRelRefNo(relRefNo.toString());
	}

	public void setExchRate(AccountingSubject subject, Object exchRate) throws Exception{
		if(exchRate==null)
			super.throwException("Canot get Exchange Rate.");
		subject.setExchRate(Double.parseDouble(exchRate.toString()));
	}
	
	public String getSysAccountNo(String accountType){
		if(configture==null){
			configture = AccountingConfiture.loadConfiture();
			definedAccount = configture.getDefinedAccount();
		}
		
		if(definedAccount.containsKey(accountType)){
			AccountingNoPara account  = (AccountingNoPara) definedAccount.get(accountType);
			return account.getAccount();
		}else{
//			throwException("No account number defined by type:"+accountType);
			printError(ErrorUtil.getErrorStackTrace(new Exception("No account number defined by type:"+accountType)));
			return "";
		}
	}
	
	public String getSysAccountDesc(String accountType){
		if(configture==null){
			configture = AccountingConfiture.loadConfiture();
			definedAccount = configture.getDefinedAccount();
		}
		
		if(definedAccount.containsKey(accountType)){
			AccountingNoPara account  = (AccountingNoPara) definedAccount.get(accountType);
			return account.getDesc();
		}else{
//			throwException("No account number defined by type:"+accountType);
			printError(ErrorUtil.getErrorStackTrace(new Exception("No account number defined by type:"+accountType)));
			return "";
		}
	}
	
	private void checkBalance() throws Exception {
		Map<String,List<AccountingSubject>> groupSubject = groupAllSubject();
		for (String key : groupSubject.keySet()) {
			List<AccountingSubject> accountList = groupSubject.get(key);
			if(checkSingleCcyBanlance(accountList)){
				this.print("Check Banlance success, CCY is "+key);
			}else{
				this.printError("Check Banlance failed, CCY is "+key);
				throw new Exception("Accounting Check Banlance failed, CCY is "+key);
			}
		}
	}
	
	public boolean checkSingleCcyBanlance(List<AccountingSubject> accountList){
		BigDecimal debitAmt = accountList.get(0).getAmt();
		BigDecimal cridetAmt = accountList.get(1).getAmt();
		return debitAmt.equals(cridetAmt);
	}

	private Map<String, List<AccountingSubject>> groupAllSubject() {
		Map<String,List<AccountingSubject>> groupSubject = new HashMap<String, List<AccountingSubject>>();
		for (AccountingSubject subject : subjectList) {
			List<AccountingSubject> ccyList = null;
			if (!groupSubject.containsKey(subject.getCcy())) {
				ccyList = new ArrayList<AccountingSubject>(2);
				AccountingSubject debitSubject = new AccountingSubject();
				debitSubject.setCcy(subject.getCcy());
				debitSubject.setAmt(BigDecimal.ZERO);
				debitSubject.setTrxTp("D");
				ccyList.add(debitSubject);
				
				AccountingSubject cridetSubject = new AccountingSubject();
				cridetSubject.setCcy(subject.getCcy());
				cridetSubject.setAmt(BigDecimal.ZERO);
				cridetSubject.setTrxTp("C");
				ccyList.add(cridetSubject);
				
				groupSubject.put(subject.getCcy(), ccyList);
			}else{
				ccyList = groupSubject.get(subject.getCcy());
			}
			
			String currentType = subject.getTrxTp();
			if ("D".equalsIgnoreCase(currentType)) {
				AccountingSubject debitSubject = ccyList.get(0);
				debitSubject.setAmt(debitSubject.getAmt().add(subject.getAmt()));
			} else {
				AccountingSubject debitSubject = ccyList.get(1);
				debitSubject.setAmt(debitSubject.getAmt().add(subject.getAmt()));
			}

		}
		return groupSubject;
	}
}

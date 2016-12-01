package com.ut.scf.core.services.accounting.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.mozilla.javascript.Context;
import org.springframework.stereotype.Component;

import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.accounting.AccountingDefine;
import com.ut.comm.xml.accounting.AccountingNoPara;
import com.ut.comm.xml.accounting.AccountingPara;
import com.ut.comm.xml.batch.BatchPara;
import com.ut.comm.xml.batch.BatchsPara;
import com.ut.scf.core.batch.BatchStatus;
import com.ut.scf.core.batch.IBatchStatus;
import com.ut.scf.core.conf.IConfig;
import com.ut.scf.core.conf.SysBussinessUnitConfig;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;

@Component("accountConfig")
public class AccountingConfiture implements IConfig{
	private static Map<String,Object> sysDefinedAccount;
	
	private static AccountingConfiture confiture = new AccountingConfiture();
	
	private AccountingConfiture(){
		loadSysAccount();
	}
	
	public static AccountingConfiture loadConfiture(){
		if(sysDefinedAccount==null){
			loadSysAccount();
		}
		return confiture;
	}
	
	public synchronized static void loadSysAccount(){
		if(sysDefinedAccount==null){
			sysDefinedAccount = new HashMap<String, Object>();
		}
		//此处需要根据不同的保理商配置，重新加载accounting的配置参数。
		//遍历所有保理商盘符，读取accounting的配置
		//遍历所有保理商路径，逐个处理各保理商配置的参数

		//遍历所有保理商路径，逐个处理各保理商配置的参数
		List<String> bus = SysBussinessUnitConfig.getBuList();
		for (String bu : bus) {
			AccountingPara accounting = new AccountingPara();
			accounting = XMLParaParseHelper.parseApPara(accounting, "syst",bu);
			AccountingDefine accountDefine  = accounting.getAccountDefine();
			for (int i = 0; i < accountDefine.size(); i++) {
				AccountingNoPara account = accountDefine.getAccount(i);
				sysDefinedAccount.put(bu+account.getType(), account);//bu+type以确保唯一
			}
		}
	}
	
	public Map<String,Object> getDefinedAccount(){
		return sysDefinedAccount;
	}

	@Override
	public void initilize() {
		loadSysAccount();
	}

	@Override
	public void destory() {
		if(sysDefinedAccount!=null)
			sysDefinedAccount.clear();
	}
	
}

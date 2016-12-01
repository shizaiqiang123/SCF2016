package com.ut.scf.core.services.advice.impl;

import org.apache.log4j.Logger;

import com.ut.scf.core.log.APLogUtil;

public class AdviceUtil {
	public static Logger getLogger(){
		return APLogUtil.getLogger("adviceLogger", "", "");
	}
}

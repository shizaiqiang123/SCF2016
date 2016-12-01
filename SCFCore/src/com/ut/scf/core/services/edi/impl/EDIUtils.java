package com.ut.scf.core.services.edi.impl;

import org.apache.log4j.Logger;

import com.ut.scf.core.log.APLogUtil;

public class EDIUtils {
	public static Logger getLogger(){
		return APLogUtil.getLogger("EDILogger", "","");
	}
}

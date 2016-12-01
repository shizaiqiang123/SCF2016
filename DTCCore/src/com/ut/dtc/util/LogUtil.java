package com.ut.dtc.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogUtil {
	
	private static Logger logger = LoggerFactory.getLogger("DTCLog");

	public static void error(String string) {
		logger.error(string);
	}
	
	public static void info(String string) {
		logger.info(string);
	}
	
	public static void debug(String string) {
		logger.debug(string);
	}

}

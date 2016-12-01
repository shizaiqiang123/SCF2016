package com.ut.scf.core;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class APRequestTypeDefine {
	public static final String AP_RET_TYPE_QUERY="query";
	public static final String AP_RET_TYPE_SUBMIT="submit";
	public static final String AP_RET_TYPE_AJAX="ajax";
	public static final String AP_RET_TYPE_CANCEL="cancel";
	public static final String AP_RET_TYPE_PAGE="gopage";
	public static final String AP_RET_TYPE_IMPORT="import";
	public static final String AP_RET_TYPE_LOGIN="login";
	public static final String AP_RET_TYPE_REPORT="report";
	public static final String AP_RET_TYPE_DOWNLOAD="download";
	public static final String AP_RET_TYPE_BATCH="batch";
	
	private static Map<String,String> ApRequestProcessor = new ConcurrentHashMap<String,String>();
}

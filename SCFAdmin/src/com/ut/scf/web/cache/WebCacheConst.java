package com.ut.scf.web.cache;

public class WebCacheConst {
	/**
	 * 不需要缓存
	 */
	public static final String CACHETYPE_NON="NON";
	/**
	 * 公共缓存
	 */
	public static final String CACHETYPE_COMM="COMM";
	
	public static final String CACHETYPE_FORCE="FORCE";
	/**
	 * 追加到Page load cache中，比如表格数据，在上下翻页时，能够保存
	 */
	public static final String CACHETYPE_APPEND="APPEND";
}

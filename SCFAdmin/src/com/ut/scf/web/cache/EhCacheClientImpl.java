package com.ut.scf.web.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EhCacheClientImpl implements ICSCacheClient{

	@Override
	public Object getData(String key) {
		return getDefaultCache().getData(key);
	}

	@Override
	public void createData(String key, Object data) throws Exception {
		getDefaultCache().createData(key, data);
	}

	@Override
	public void updateData(String key, Object data) throws Exception {
		getDefaultCache().updateData(key, data);
	}

	@Override
	public void removeData(String key) {
		getDefaultCache().removeData(key);
	}

	@Override
	public void removeDataContainsChild(String key) {
		getDefaultCache().removeDataContainsChild(key);
	}

	@Override
	public boolean existData(String key) {
		return getDefaultCache().existData(key);
	}

	@Override
	public List<String> getChildKeys(String key) {
		return getDefaultCache().getChildKeys(key);
	}
	
	private static CacheManager cm = null;
	private static Map<String ,ICacheClient> mapCSCacheImpls = new HashMap<String ,ICacheClient>();
	private static Logger logger = LoggerFactory.getLogger("webLog");
	
	public static synchronized void init(String configFile)
			throws Exception
	{
		if (cm != null)
		{
			return;
		}

		CacheManager.create(configFile);
		cm = CacheManager.getInstance();
		String[] caches = cm.getCacheNames();
		String cacheName = null;
		for (int i = caches.length - 1; i >= 0; i--) {
			cacheName = caches[i];
			mapCSCacheImpls.put(cacheName, new WebCacheImpl(cm.getCache(cacheName)));
		}
		
		logger.debug("Web Cache initlize success...");
	}
	
	private static final String DEFAULT_CACHE_NAME  = "CACHE_WEB_DATA";//所有web端数据
	
	private static final String CACHE_LEVEL_SESSION  = "CACHE_WEB_SESS";//当前 session 的数据，包括function 数据和公共数据
	
	private static final String CACHE_LEVEL_COMMON  = "CACHE_WEB_COMM";//当前common数据
	
	private static final String CACHE_LEVEL_FUNCTION  = "CACHE_WEB_FUNC";//当前function数据
	
	private static final String CACHE_LEVEL_PAGE  = "CACHE_WEB_PAGE";//当前页面数据
	
	private static final String CACHE_LEVEL_QUERY  = "CACHE_WEB_QUERY";//当前查询数据
	
	
	public static ICacheClient getDefaultCache(){     
		if (cm == null)
		{
			return null;
		}
		return getCache(DEFAULT_CACHE_NAME);
	}

	public static String[] getCacheNames() {
		return cm.getCacheNames();
	}

	public static boolean cacheExists(String cacheName)
	{
		return cm.cacheExists(cacheName);
	}

	public static ICacheClient getCache(String name)
	{
		net.sf.ehcache.Cache ch = cm.getCache(name);
		if (ch == null) {
			return null;
		}
		ICacheClient cacheImpl = mapCSCacheImpls.get(name);
		return cacheImpl;
	}

	public static synchronized void shutdown()
	{
		List knownCacheManagers = CacheManager.ALL_CACHE_MANAGERS;
		while (!knownCacheManagers.isEmpty()) {
			((CacheManager) CacheManager.ALL_CACHE_MANAGERS.get(0)).shutdown();
		}
		mapCSCacheImpls = null;
	}

	public static boolean isCacheEnabled() {
		boolean enabled = true;
		String value = System.getProperty(Cache.NET_SF_EHCACHE_DISABLED);
		if ("true".equalsIgnoreCase(value)) {
			enabled = false;
		}
		return enabled;
	}

	static class WebCacheImpl implements ICacheClient {

		private Cache cache;

		public WebCacheImpl(Cache ch)
		{
			cache = ch;
		}

		public Object get(Object key)
		{
			Element e = cache.get(key);
			if (e == null)
				return null;

			return e.getObjectValue();
		}

		public void put(Object key, Object value)
		{
			Element e = new Element(key, value);
			cache.put(e);
		}

		public boolean remove(Object key)
		{
			List<String> keys = cache.getKeys();
			String strKey = key.toString();
			for (String string : keys) {
				if(string.contains(strKey)){
					logger.debug("Cache remove... key:"+string);
					cache.remove(string);
				}
			}
			return true;
		}

		public void removeAll()
		{
			cache.removeAll();
		}

		public boolean isEnabled() {
			return cache.getMemoryStoreSize() > 0;
		}

		@Override
		public Object getData(String key) {
			Element e = cache.get(key);
			if (e == null)
				return null;

			return e.getObjectValue();
		}

		@Override
		public void createData(String key, Object data) throws Exception {
			Element e = new Element(key, data);
			cache.put(e);
		}

		@Override
		public void updateData(String key, Object data) throws Exception {
			Element e = new Element(key, data);
			cache.put(e);
		}

		@Override
		public void removeData(String key) {
			cache.remove(key);
		}

		@Override
		public void removeDataContainsChild(String key) {
			List<String> keys = cache.getKeys();
			String strKey = key.toString();
			for (String string : keys) {
				if(string.contains(strKey)){
					logger.debug("Cache remove... key:"+string);
					cache.remove(string);
				}
			}
		}

		@Override
		public boolean existData(String key) {
			return getData(key)!=null;
		}

		@Override
		public List<String> getChildKeys(String key) {
			List<String> keys = cache.getKeys();
			List<String> retKeys = new ArrayList<String>();
			String strKey = key.toString();
			for (String string : keys) {
				if(string.contains(strKey)){
					retKeys.add(string);
				}
			}
			return retKeys;
		}
	}

	@Override
	public void createConnection() {
		
	}

	@Override
	public void connect() {
		
	}

	@Override
	public void close() {
		
	}

	@Override
	public Object getConnection() {
		return null;
	}

}

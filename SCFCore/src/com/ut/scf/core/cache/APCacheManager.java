package com.ut.scf.core.cache;

import org.springframework.stereotype.Service;

import com.ut.comm.cache.CommCacheManager;
import com.ut.comm.tool.ErrorUtil;
import com.ut.scf.core.conf.IConfig;
import com.ut.scf.core.log.APLogUtil;

@Service("apCacheManager")
public class APCacheManager implements IConfig {
//	private static ICacheManager cacheManager;

	@Override
	public void initilize() {
		String initFile = "AP_Cache_Config.xml";
		try {
			CommCacheManager.getInstance().start(initFile);
		} catch (Exception e) {
			APLogUtil.getBatchLogger().error(ErrorUtil.getErrorStackTrace(e));
		}
	}

	@Override
	public void destory() {
		CommCacheManager.getInstance().shutdown();
	}
}

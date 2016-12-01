package com.ut.scf.web.cache;

public class DefaultWebCacheServer extends AbsCacheServer{

	@Override
	public void start() {
		logger.debug("No catch server start...");
	}

	@Override
	public void shutdown() {
		logger.debug("No catch server need to shutdown...");
	}

	@Override
	public void initilise() {
		logger.debug("No catch server need to initilise...");
	}

	@Override
	public String getConfig() {
		return null;
	}

	@Override
	public String getName() {
		return "default catch";
	}

}

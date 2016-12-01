package com.ut.scf.web.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class AbsCacheServer implements ICacheServer{
	
	public static Logger logger = LoggerFactory.getLogger(AbsCacheServer.class);
	
	public abstract void initilise();
	
	public abstract String getConfig();
	
	public abstract String getName();
}

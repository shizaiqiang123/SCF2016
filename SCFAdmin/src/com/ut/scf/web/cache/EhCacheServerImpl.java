package com.ut.scf.web.cache;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.tool.consts.ASPathConst;

public class EhCacheServerImpl implements ICacheServer{

	private static Logger logger = LoggerFactory.getLogger("webLog");
	@Override
	public void start() {
//		String rootPath = this.getClass().getResource("/").getPath();
//		String configFile = rootPath+"/"+"Web_Cache_Config.xml";
		StringBuffer paraPath = new StringBuffer(ASPathConst.getUserDirPath());
		paraPath.append(File.separator).append("syst").append(File.separator).append("Web_Cache_Config").append(".xml");
		try {
			EhCacheClientImpl.init(paraPath.toString());
		} catch (Exception e) {
			logger.error("Initialize WebCache failed");
			logger.error(e.toString());
		}
	}

	@Override
	public void shutdown() {
		EhCacheClientImpl.shutdown();
	}

}

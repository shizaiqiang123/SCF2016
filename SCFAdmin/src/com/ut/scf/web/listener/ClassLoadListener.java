package com.ut.scf.web.listener;

import java.io.File;
import java.io.FilenameFilter;
import java.util.StringTokenizer;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.comm.tool.consts.ASPathConst;

public class ClassLoadListener implements ServletContextListener {
	private Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void contextInitialized(ServletContextEvent event) {
		ServletContext context = event.getServletContext();
		addJar(context);
	}

	@Override
	public void contextDestroyed(ServletContextEvent event) {

	}

	synchronized private void addJar(ServletContext context) {
		//从web.xml中加载定义
//		String extlibs = context.getInitParameter(CONTEXT_PARAM_NAME_EXTLIBPATH);
		//从系统从加载
		String extlibs = ASPathConst.getUserLibPath();
		
		if (extlibs == null || extlibs.length() == 0)
			return;

		ClassLoader loader = getClass().getClassLoader();

		StringTokenizer st = new StringTokenizer(extlibs, ",");
		while (st.hasMoreTokens()) {
			String jarPath = st.nextToken();
//			String jarRealPath = context.getRealPath(jarPath);

			File jarDir = new File(jarPath);
			if(!jarDir.exists()){
				logger.debug("Canot load extended Jar class path.");
				return;
			}
			if (!jarDir.isDirectory())
				continue;
			File[] jarFiles = jarDir.listFiles(new JarFileNameFilter());
			for (File jarFile : jarFiles) {
//				try {
////					if (loader.getClass().isAssignableFrom(WebappClassLoader.class)) {
////						((WebappClassLoader) loader).addRepository(jarFile.toURI().toURL().toString());
////					}
//
//				} catch (MalformedURLException e) {
//					logger.error(e.getMessage());
//				}
			}
		}
	}

	class JarFileNameFilter implements FilenameFilter {
		public boolean accept(File dir, String name) {
			return name.toLowerCase().endsWith(".jar");
		}
	}
}

//package com.ut.scf.mule.web.servlet;
//
//import javax.servlet.ServletContext;
//import javax.servlet.ServletContextEvent;
//
//import org.mule.config.builders.MuleXmlBuilderContextListener;
//
//import com.ut.scf.mule.web.context.MuleContextLoader;
//
//
//public class WSSMuleManagerListener extends MuleXmlBuilderContextListener{
//	private static String configPath;
//
//	@Override
//	public void contextDestroyed(ServletContextEvent event) {
//		super.destroy();
//		MuleContextLoader.setCurrentMuleContext(null);
//	}
//
//	@Override
//	public void contextInitialized(ServletContextEvent event) {
//		ServletContext context  = event.getServletContext();
//		configPath = context.getAttribute(ATTR_JAVAX_SERVLET_CONTEXT_TEMPDIR)+"/mule/config";
//		String configs = loadMuleConfig();
//		context.setInitParameter(INIT_PARAMETER_MULE_CONFIG, "/WEB-INF/mule/cxf-mule-config.xml,/WEB-INF/mule/mule-config.xml,/WEB-INF/mule/mule-vm.xml");
//		super.contextInitialized(event);
//		MuleContextLoader.setCurrentMuleContext(muleContext);
//	}
//	
//	private String loadMuleConfig() {
//		
//		return null;
//	}
//
//	private void refluseMuleContext() {
////		MuleConfiguration configuration = muleContext.get();
////		muleContext.stop();
//	}
//
//}

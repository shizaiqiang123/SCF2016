package com.ut.scf.mule.web.context;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.mule.api.MuleContext;
import org.springframework.util.Assert;

public class MuleContextLoader {
	/**
	 * Map from (thread context) ClassLoader to corresponding 'current' MuleContext.
	 */
	private static final Map<ClassLoader, MuleContext> currentContextPerThread =
			new ConcurrentHashMap<ClassLoader, MuleContext>(1);

	/**
	 * The 'current' WebApplicationContext, if the ContextLoader class is
	 * deployed in the web app ClassLoader itself.
	 */
	private static volatile MuleContext currentContext;

	public static void setCurrentMuleContext(MuleContext muleContext){
		ClassLoader ccl = Thread.currentThread().getContextClassLoader();
		if (ccl == MuleContextLoader.class.getClassLoader()) {
			currentContext = muleContext;
		}
		else if (ccl != null) {
			currentContextPerThread.put(ccl, muleContext);
		}else{
			Assert.notNull(ccl, "Cannot load ClassLoader for Mule Context.");
		}
	}


	/**
	 * Obtain the Spring root web application context for the current thread
	 * (i.e. for the current thread's context ClassLoader, which needs to be
	 * the web application's ClassLoader).
	 * @return the current root web application context, or <code>null</code>
	 * if none found
	 * @see org.springframework.web.context.support.SpringBeanAutowiringSupport
	 */
	public static MuleContext getCurrentMuleContext() {
		ClassLoader ccl = Thread.currentThread().getContextClassLoader();
		if (ccl != null) {
			MuleContext ccpt = currentContextPerThread.get(ccl);
			if (ccpt != null) {
				return ccpt;
			}
		}
		return currentContext;
	}
	
	public static void closeMuleContext(){
		ClassLoader ccl = Thread.currentThread().getContextClassLoader();
		if (ccl == MuleContextLoader.class.getClassLoader()) {
			currentContext = null;
		}
		else if (ccl != null) {
			currentContextPerThread.remove(ccl);
		}
	}
}

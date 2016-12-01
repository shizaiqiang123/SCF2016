package com.ut.scf.core.utils;

import org.w3c.dom.Document;

import com.ut.scf.core.entity.ApSessionContext;

public class ApSessionUtil {
	static ThreadLocal<ApSessionContext> local = new ThreadLocal<ApSessionContext>();

	public static ApSessionContext initialize(Object contextDoc) {
//		ApSessionContext context = local.get();
		// if (context == null) {
		// context = new ApSessionContext();
		// local.set(context);
		// context.initialize(contextDoc);
		// }

		ApSessionContext context = new ApSessionContext();
		context.initialize(contextDoc);
		local.set(context);
		return context;
	}

	public static ApSessionContext reflash(Document contextDoc) {
		ApSessionContext context = local.get();
		if (context == null) {
			context = new ApSessionContext();
			local.set(context);
		}
		context.initialize(contextDoc);

		return context;
	}

	public static ApSessionContext getContext() {
		ApSessionContext context = local.get();
		if(context==null){
			context = new ApSessionContext();
			context.initialize(null);
		}
			
		return context;
	}

	public static void setContext(ApSessionContext context) {
		ApSessionContext _context = local.get();
		if (_context != null) {
			_context.destroy();
			_context = null;
			local.set(null);
		}

		local.set(context);
	}

	public static void close() {
		ApSessionContext context = local.get();
		if (context != null) {
			context.destroy();
			context = null;
		}
		local.set(null);
	}

}

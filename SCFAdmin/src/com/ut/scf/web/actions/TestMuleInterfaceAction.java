package com.ut.scf.web.actions;

import com.ut.scf.core.APControlManager;
import com.ut.scf.web.servlet.AbsServletRequestAware;

public class TestMuleInterfaceAction extends AbsServletRequestAware{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public String execute() throws Exception {
//		APControlManager mainManager = new APControlManager();
//		String responseMsg = mainManager.runApServices("test vm processor");
//		response.getOutputStream().print(responseMsg);
		return null;
	}
	@Override
	protected String getReqType() {
		// TODO Auto-generated method stub
		return "mule interface";
	}
}

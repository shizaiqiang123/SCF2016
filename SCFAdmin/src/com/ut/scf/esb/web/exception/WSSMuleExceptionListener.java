package com.ut.scf.esb.web.exception;

import java.beans.ExceptionListener;

public class WSSMuleExceptionListener implements ExceptionListener {

	@Override
	public void exceptionThrown(Exception e) {
		e.printStackTrace();
	}

}

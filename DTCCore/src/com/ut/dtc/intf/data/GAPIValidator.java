package com.ut.dtc.intf.data;

import com.ut.dtc.intf.IValidate;

public class GAPIValidator implements IValidate{

	@Override
	public boolean validateHeader(Object obj) throws Exception {
		return false;
	}

	@Override
	public boolean validateBody(Object obj) throws Exception {
		return false;
	}

	@Override
	public boolean validateRequest(Object obj) throws Exception {
		return false;
	}

	@Override
	public boolean validateResponse(Object obj) throws Exception {
		return false;
	}

}

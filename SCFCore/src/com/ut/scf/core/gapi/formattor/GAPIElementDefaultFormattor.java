package com.ut.scf.core.gapi.formattor;

public class GAPIElementDefaultFormattor implements IGapiElementFormattor{

	@Override
	public Object format(Object value,String formattor) {
		return value.toString();
	}

}

package com.ut.scf.core.gapi.formattor;

import java.math.BigDecimal;

public class GAPIElementNumberFormattor implements IGapiElementFormattor{

	@Override
	public Object format(Object value,String formattor) {
//			DecimalFormat.
		if(value!=null && !"".equals(value)){
			BigDecimal bigDecimal=new BigDecimal(value.toString());
			String[] format=formattor.split(":")[1].split(",");
			return bigDecimal.setScale(Integer.parseInt(format[1]));
		}else{
			return null;
		}
	}
}

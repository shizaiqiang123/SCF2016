package com.ut.scf.core.gapi.formattor;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JSONObject;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;

public class GAPIElementDateFormattor implements IGapiElementFormattor{

	@Override
	public Object format(Object value,String formattor) {
//		if("get")
		if(value!=null&&StringUtil.isNotNull(value.toString())){
			if(value instanceof String){
				try {
					String[] formats=formattor.split(":");
					StringBuffer format=new StringBuffer();
					for(int i =1;i<formats.length;i++){
						 format.append(formats[i]);
						 if(i!=formats.length-1){
							 format.append(":");
						 }
					}
					SimpleDateFormat df = new SimpleDateFormat(format.toString());
					String str = df.format(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(value.toString()));
					return str;
//					return DateTimeUtil.getDate(value.toString(), formattor.split(":")[1]);
				} catch (Exception e) {
					e.printStackTrace();
				}	
			}else if(value instanceof JSONObject){
				Date date= (Date) JsonUtil.getDTO(value.toString(), Date.class);
				String[] formats=formattor.split(":");
				StringBuffer format=new StringBuffer();
				for(int i =1;i<formats.length;i++){
					 format.append(formats[i]);
					 if(i!=formats.length-1){
						 format.append(":");
					 }
				}
				return new SimpleDateFormat(format.toString()).format(date);
			}
			}
				return "";		
	}
}

//package com.ut.test.filter;
//
//import org.mule.api.MuleMessage;
//import org.mule.api.routing.filter.Filter;
//
//public class MuleESBLogFilter implements Filter{
//
//	@Override
//	public boolean accept(MuleMessage message) {
//		try {
//			System.out.println(message.getPayloadAsString());
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return true;
//	}
//
//}

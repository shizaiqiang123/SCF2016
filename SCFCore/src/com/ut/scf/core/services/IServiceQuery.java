package com.ut.scf.core.services;

import com.ut.scf.core.data.FuncDataObj;

public interface IServiceQuery {
	public final String SERVICE_QUERY_TYPE_PREVIEW = "PREVIEW";
	
	public final String SERVICE_QUERY_TYPE_VIEW = "VIEW";
	
	public final String SERVICE_QUERY_TYPE_LIST = "QUERYLIST";
	
	public final String SERVICE_QUERY_TYPE_COUNT = "QUERYCOUNT";
	
	public final String SERVICE_QUERY_TYPE_SEND = "SEND";
	
	
	public void viewServiceData(FuncDataObj logicObj) throws Exception;
	
	public void perViewServiceData(FuncDataObj logicObj) throws Exception;
	
	public void queryServiceList(FuncDataObj logicObj) throws Exception;
	
	public void queryServiceCount(FuncDataObj logicObj) throws Exception;
}

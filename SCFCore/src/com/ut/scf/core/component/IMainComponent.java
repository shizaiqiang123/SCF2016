package com.ut.scf.core.component;


public interface IMainComponent {
	public Object submitData(Object paraDom) throws Exception;

	public Object queryData(Object paraDom) throws Exception;
	
	public Object cancelData(Object paraDom) throws Exception;

}

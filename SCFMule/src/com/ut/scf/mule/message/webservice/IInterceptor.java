package com.ut.scf.mule.message.webservice;

public interface IInterceptor {
	public String getWsUser();

	public void setWsUser(String wsUser);

	public String getWsPwd();

	public void setWsPwd(String wsPwd);
}

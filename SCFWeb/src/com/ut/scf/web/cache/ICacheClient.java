package com.ut.scf.web.cache;

import java.util.List;


public interface ICacheClient {
	public Object getData(String key);
	
	public void createData(String key,Object data) throws Exception;
	
	public void updateData(String key,Object data) throws Exception;
	
	public void removeData(String key);
	
	public void removeDataContainsChild(String key);
	
	public boolean existData(String key);
	
	public List<String> getChildKeys(String key);
}

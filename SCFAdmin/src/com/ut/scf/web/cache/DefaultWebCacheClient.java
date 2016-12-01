package com.ut.scf.web.cache;

import java.util.List;

public class DefaultWebCacheClient implements ICacheClient{

	@Override
	public Object getData(String key) {
		return null;
	}

	@Override
	public void updateData(String key, Object data) {
		
	}

	@Override
	public void removeData(String key) {
		
	}

	@Override
	public void createData(String key, Object data) {
		
	}

	@Override
	public boolean existData(String key) {
		return false;
	}

	@Override
	public void removeDataContainsChild(String key) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<String> getChildKeys(String key) {
		// TODO Auto-generated method stub
		return null;
	}

}

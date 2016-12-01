package com.ut.scf.core.para;

import net.sf.json.JSONObject;

public interface IParaManager {
	public Object getParaDefine(String paraId,String paraPath, String paraBu) throws Exception;
	
	public Object updateParaDefine(String paraId,String paraPath,JSONObject trxData, String paraBu) throws Exception;
	
	public void deleteParaDefine(String paraId,String paraPath,JSONObject trxData) throws Exception;
}

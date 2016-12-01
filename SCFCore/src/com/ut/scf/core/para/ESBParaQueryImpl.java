package com.ut.scf.core.para;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaHelper;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.comm.xml.XMLParaParseHelper;

@Service("esbParaQueryImpl")
public class ESBParaQueryImpl implements IParaManager{

	@Override
	public AbsObject getParaDefine(String paraId, String paraPath, String paraBu) throws Exception {
		Class<? extends AbsObject> clazz = XMLParaHelper.getRegistedObjectClass(paraPath);
		AbsObject obj = clazz.newInstance();
		obj.setId(paraId);
		XMLParaParseHelper.parsePara(obj, paraPath);
		return obj;
	}
	
	@Override
	public Object updateParaDefine(String paraId, String paraPath, JSONObject trxData, String paraBu) throws Exception {
		Class<? extends AbsObject> paraClazz = XMLParaHelper.getRegistedObjectClass(paraPath);
		if(paraClazz!=null){
			AbsObject paraInstence = paraClazz.newInstance();
			paraInstence.setId(paraId);
			XMLParaHelper.parseJson2Bean(paraInstence, trxData);
			Document paraXml = XMLManager.createDocument(paraInstence.getNodeName());
			XMLParaHelper.parseBean2XML(paraInstence, paraXml.getDocumentElement());
			
			XMLParaLoadHelper.writeParaDefine(paraId, paraPath, paraXml);
		}
		return null;
	}
	
	protected String [] getTargetBus(JSONObject trxData) {
		if(trxData.containsKey("bu")){
			String targetBu = trxData.getString("bu");
			if(StringUtil.isTrimNotEmpty(targetBu)){
				return targetBu.split(",");
			}
		}
		return new String[]{""};
	}

	@Override
	public void deleteParaDefine(String paraId, String paraPath,
			JSONObject trxData) throws Exception {
		XMLParaLoadHelper.deleteParaDefine(paraId, paraPath);
	}

}

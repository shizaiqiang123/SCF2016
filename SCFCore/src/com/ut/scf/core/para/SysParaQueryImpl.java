package com.ut.scf.core.para;

import java.util.List;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaHelper;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.esb.ESBServicePara;
import com.ut.comm.xml.esb.ESBServicesPara;

@Service("sysParaQueryImpl")
public class SysParaQueryImpl implements IParaManager{

	@Override
	public AbsObject getParaDefine(String paraId, String paraPath, String paraBu) throws Exception {
		Class<? extends AbsObject> clazz = XMLParaHelper.getRegistedObjectClass(paraPath);
		AbsObject obj = clazz.newInstance();
		obj.setId(paraId);
		XMLParaParseHelper.parsePara(obj, getParaPath());
		return obj;
	}
	
	@Override
	public Object updateParaDefine(String paraId, String paraPath, JSONObject trxData, String paraBu) throws Exception {
		Class<? extends AbsObject> paraClazz = XMLParaHelper.getRegistedObjectClass(paraPath);
		if(paraClazz!=null){
			AbsObject paraInstence = paraClazz.newInstance();
			paraInstence.setId(paraId);
			
			if("ESB_Root".equalsIgnoreCase(paraId)){
				XMLParaParseHelper.parsePara(paraInstence, getParaPath());
				ESBServicesPara esbServicesPara = (ESBServicesPara) paraInstence;
				
				ESBServicePara currentService =new ESBServicePara();
				currentService.setId(trxData.getString("paraId"));
				currentService.setName(trxData.getString("paraName"));
				String strOpType = getOpTp(trxData);
				if("paraAdd".equalsIgnoreCase(strOpType)){
					esbServicesPara.setEsbservice(currentService);
				}else{
					List<ESBServicePara> allSerives = esbServicesPara.getEsbserviceList();
					allSerives.remove(currentService);
				}
			}else{
				XMLParaHelper.parseJson2Bean(paraInstence, trxData);
			}

			
//			XMLParaHelper.parseJson2Bean(paraInstence, trxData);
			Document paraXml = XMLManager.createDocument(paraInstence.getNodeName());
			XMLParaHelper.parseBean2XML(paraInstence, paraXml.getDocumentElement());
			
			XMLParaLoadHelper.writeParaDefine(paraId, getParaPath(), paraXml);
		}
		return null;
	}

	@Override
	public void deleteParaDefine(String paraId, String paraPath,
			JSONObject trxData) throws Exception {
		// TODO Auto-generated method stub
		
	}
	
	private String getParaPath(){
		return "syst";
	}
	
	protected final String OPERATE_TYPE_NAME= "_opTp";
	protected String getOpTp(JSONObject trxData){
		String strOpTp = trxData.containsKey(OPERATE_TYPE_NAME)?trxData.getString(OPERATE_TYPE_NAME):"";
		return strOpTp;
	}
}

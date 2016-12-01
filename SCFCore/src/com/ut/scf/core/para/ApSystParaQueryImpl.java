package com.ut.scf.core.para;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.cglib.beans.BeanMap;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;

import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaHelper;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.batch.BatchPara;
import com.ut.comm.xml.batch.BatchsPara;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.utils.ApSessionUtil;
@Service("apSystParaQueryImpl")
public class ApSystParaQueryImpl implements IParaManager{
	
	private static Map<String, String> ignoreMap = new HashMap<String, String>();
	static{
		ignoreMap.put("id", "id");
		ignoreMap.put("bu", "bu");
		ignoreMap.put("schemamapping", "schemamapping");
		ignoreMap.put("propertyBean", "propertyBean");
		ignoreMap.put("proterties", "proterties");
		ignoreMap.put("nodeName", "nodeName");
		ignoreMap.put("mappingschema", "mappingschema");
	}

	@Override
	public Object getParaDefine(String paraId, String paraPath, String paraBu) throws Exception {
		ApSessionContext context = ApSessionUtil.getContext();
		Class<? extends AbsObject> clazz = XMLParaHelper.getRegistedObjectClass(paraPath);
		AbsObject obj = clazz.newInstance();
		obj.setId(paraId);
		XMLParaParseHelper.parseApPara(obj, getParaPath(), context.getSysBusiUnit());
		
		if("syspara".equalsIgnoreCase(paraId)){
			List<Map> retObj = new ArrayList<Map>();
			BeanMap	beanMap= BeanUtils.setBean(obj);
			if (beanMap != null) {
				Object[] keys = beanMap.keySet().toArray();
				for (int i = 0; i < keys.length; i++) {
					String key = keys[i].toString();
					if(checkIgnoreFiled(key)){
						continue;
					}
					Object value = beanMap.get(key);
					Map<String,String> fieldMap = new HashMap<String,String>();
					fieldMap.put("fieldName", key);
					fieldMap.put("fieldValue",value==null?"": value.toString());
					retObj.add(fieldMap);
				}
			}
			obj.setProterty("paraList", retObj);
		}
		return obj;
	}

	private boolean checkIgnoreFiled(String key) {
		return ignoreMap.containsKey(key);
	}
	
	private String getParaPath(){
		return "syst";
	}

	@Override
	public Object updateParaDefine(String paraId, String paraPath, JSONObject trxData, String paraBu) throws Exception {
		Class<? extends AbsObject> paraClazz = XMLParaHelper.getRegistedObjectClass(paraPath);
		if(paraClazz!=null){
			ApSessionContext context = ApSessionUtil.getContext();
			AbsObject paraInstence = paraClazz.newInstance();
			paraInstence.setId(paraId);
			if("syspara".equalsIgnoreCase(paraId)){
				XMLParaParseHelper.parseApPara(paraInstence, getParaPath(), context.getSysBusiUnit());
				String fieldName = trxData.getString("fieldName");
				String fieldValue = trxData.getString("fieldValue");
				BeanUtils.setBeanProperty(paraInstence, fieldName,fieldValue);
			}else if("Batch_Root".equalsIgnoreCase(paraId)){
				XMLParaParseHelper.parseApPara(paraInstence, getParaPath(), context.getSysBusiUnit());
				BatchsPara batchsPara = (BatchsPara) paraInstence;
				
				BatchPara currentBatch =new BatchPara();
				currentBatch.setId(trxData.getString("paraId"));
				currentBatch.setName(trxData.getString("paraName"));
				currentBatch.setBu(trxData.getString("bu"));
				String strOpType = getOpTp(trxData);
				if("paraAdd".equalsIgnoreCase(strOpType)){
					batchsPara.setBatch(currentBatch);
				}else{
					List<BatchPara> allBatchs = batchsPara.getBatch();
					allBatchs.remove(currentBatch);
				}
			}else{
				XMLParaHelper.parseJson2Bean(paraInstence, trxData);
			}

			Document paraXml = XMLManager.createDocument(paraInstence.getNodeName());
			XMLParaHelper.parseBean2XML(paraInstence, paraXml.getDocumentElement());
			
			if(StringUtil.isTrimEmpty(paraBu)){
				String [] targetBu = getTargetBus(trxData);
				for (String string : targetBu) {
					XMLParaLoadHelper.writeApParaDefine(paraId, getParaPath(), string, paraXml);
				}
			}else{
				XMLParaLoadHelper.writeApParaDefine(paraId, getParaPath(), paraBu, paraXml);
			}
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
		
	}
	protected final String OPERATE_TYPE_NAME= "_opTp";
	protected String getOpTp(JSONObject trxData){
		String strOpTp = trxData.containsKey(OPERATE_TYPE_NAME)?trxData.getString(OPERATE_TYPE_NAME):"";
		return strOpTp;
	}

}

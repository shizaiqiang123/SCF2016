package com.ut.scf.core.services.edi.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.comm.xml.edi.EDIPara;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.utils.ApSessionUtil;

@Service("ediDemerge")
public class EDIMsgDemerge implements IEDIMsgDemerge{
	
	private Document msgTemplate;
	private Document msgMapping;
	private Document msgContent;
	private String msgType;
	
	private String currentBu;

	/**
	 * @throws Exception 
	 * 
	 */
	@Override
	public List<Object> demerge(EDIPara para, Object ediMsg) throws Exception {
		ApSessionContext context = ApSessionUtil.getContext();
		currentBu = context.getSysBusiUnit();
		
		this.msgContent = XMLManager.xmlStrToDom(ediMsg.toString());
		
		loadTemplate(para.getTemplate());
		
		loadMapping(para.getMapping());
		
		this.msgType = getMsgType();
		
		EDIUtils.getLogger().debug("Demerge EDI message begin...type is:"+this.msgType);
		
		JSONObject reqDom = JsonHelper.createReqJson();
		
		processEDIJs(para,reqDom);
		
		EDIElement ediStruture = buildMsgStruture();
		
		String loopPath = getLoopPath(ediStruture);
		
		List<Object> retLsit = new ArrayList<Object>();
		if(StringUtil.isTrimNotEmpty(loopPath)){
			int msgSize = getLoopMsgSize(loopPath);
			for (int i = 0; i < msgSize; i++) {
				EDIElement struture = ediStruture.clone();
				
				fillContent(struture,i+1);
				
				JSONObject json = JsonUtil.createJson();
				
				json.put("funcInfo", JsonHelper.getFuncObject(reqDom));
				
				convertToXml(struture,json);
				
//				validator.validateMsg();
				
				retLsit.add(json);
			}
		}else{
			fillContent(ediStruture,1);
			JSONObject json = JsonUtil.createJson();
			json.put("funcInfo", JsonHelper.getFuncObject(reqDom));
			
			convertToXml(ediStruture,json);
			
//			validator.validateMsg();
			
			retLsit.add(json);
		}
		
		EDIUtils.getLogger().debug("Demerge EDI message end...type is:"+this.msgType);
		return retLsit;
	}
	
	public void loadTemplate(String fileName) throws Exception {
		try {
			this.msgTemplate = XMLParaLoadHelper.loadEDITemplatePara(fileName,currentBu);
		} catch (IOException e) {
			EDIUtils.getLogger().error("参数文件没有找到："+fileName);
			throw e;
		} catch (Exception e) {
			EDIUtils.getLogger().error("解析参数文件失败："+fileName);
			throw e;
		}
	}

	public void loadMapping(String fileName) throws Exception {
		try {
			this.msgMapping = XMLParaLoadHelper.loadEDIMappingPara(fileName,currentBu);
		} catch (IOException e) {
			EDIUtils.getLogger().error("参数文件没有找到："+fileName);
			throw e;
		} catch (Exception e) {
			EDIUtils.getLogger().error("解析参数文件失败："+fileName);
			throw e;
		}
	}
	
	private String getMsgType() throws Exception{
		if(msgTemplate==null){
			throw new Exception("No template find.");
		}
		return msgTemplate.getDocumentElement().getNodeName();
	}
	
	@Resource(name = "ediJsEngine")
	protected IServerSideJs jsEngine;
	
	private JSONObject processEDIJs(EDIPara para,JSONObject serviceData) throws Exception{
		String jsFile = para.getJs();
		
		if(StringUtil.isTrimNotEmpty(jsFile)){
			jsEngine.initTrxData(serviceData);
			jsEngine.initTrxPara(para);
			try {
				jsEngine.executeJsFile(jsFile);
			} catch (Exception e) {
				EDIUtils.getLogger().error(e.toString());
				throw e;
			}
			
			return (JSONObject) jsEngine.getTrxData();
		}
		return serviceData;
	}
	
	private EDIElement buildMsgStruture() {
		Element rootEle = msgMapping.getDocumentElement();
		EDIElement rootEDI = new EDIElement(rootEle);
		parseChildEDIEle(rootEDI, rootEle);
		
		return rootEDI;
	}
	
	private void parseChildEDIEle(EDIElement parent, Element ele) {
		if(ele==null)
			return;

		if (ele.hasChildNodes()) {
			Node child = ele.getFirstChild();
			while (child != null) {
				if(child.getNodeType() == Node.ELEMENT_NODE){
					EDIElement childEdiNode = new EDIElement((Element) child);
					childEdiNode.setParentEle(parent);
					parseChildEDIEle(childEdiNode, (Element) child);
				}
				child = child.getNextSibling();
			}
		}
	}
	
	private void fillContent(EDIElement child, int index){
		if(child==null)
			return;
		
		if(StringUtil.isTrimNotEmpty(child.getValue())){
			String type = child.getType();
			String realValue= "";
			
			if("V".equals(type)){
				realValue = child.getValue();
			}else if("C".equals(type)){
				realValue = "";
			}else{
				Element field = null;
				if(child.isLoop()){
					field = (Element) XMLManager.findNode(msgContent.getDocumentElement(), child.getPath(),index);
				}else{
					 field = (Element) XMLManager.findNode(msgContent.getDocumentElement(), child.getPath());
				}
				realValue = XMLManager.getChildNodeValue(field, child.getValue(), true);
			}
			
			/*switch (type) {
			case "V":
				realValue = child.getValue();
				break;
			case "C":
				realValue = "";
				//add js engine here
				break;
			default:
				Element field = null;
				if(child.isLoop()){
					field = (Element) XMLManager.findNode(msgContent.getDocumentElement(), child.getPath(),index);
				}else{
					 field = (Element) XMLManager.findNode(msgContent.getDocumentElement(), child.getPath());
				}
				realValue = XMLManager.getChildNodeValue(field, child.getValue(), true);
				break;
			}*/
			
			child.setValue(realValue);
		}
		if(child.hasChilds()){
			int size = child.getChildSize();
			for (int i = 0; i < size; i++) {
				fillContent(child.getChild(i),index);
			}
		}
	}
	
	private JSONObject convertToXml(EDIElement struture,JSONObject json) {
		if(struture.hasChilds()){
			int size = struture.getChildSize();
			String nodeName =json.containsKey("_json_name")? json.getString("_json_name"):"";
			for (int i = 0; i < size; i++) {
				EDIElement child = struture.getChild(i);
				JSONObject ele = JsonUtil.createJson(child.getNodeName());
				if(child.hasChilds()){
					json.put(child.getNodeName(),convertToXml(child,ele));
				}else{
					json.putAll(convertToXml(child,ele));
				}
			}
			if(StringUtil.isTrimNotEmpty(nodeName))
				json.put("_json_name", nodeName);
		}else{
			json.put(struture.getNodeName(), struture.getValue());
		}
		return json;
	}
	
	private String getLoopPath(EDIElement ediStruture){
		if(ediStruture.isLoop()){
			return ediStruture.getPath();
		}
		if(ediStruture.hasChilds()){
			int size = ediStruture.getChildSize();
			for (int i = 0; i < size; i++) {
				String path = getLoopPath(ediStruture.getChild(i));
				if(StringUtil.isTrimNotEmpty(path))
					return path;
			}
		}
		
		return "";
	}
	
	private int getLoopMsgSize(String loopPath){
		if(StringUtil.isTrimEmpty(loopPath))
			return 0;
		ArrayList loopElement = XMLManager.findChildNodes(msgContent.getDocumentElement(), loopPath);
		return loopElement.size();
	}

}

package com.ut.scf.core.services.edi.impl;

import java.io.IOException;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.comm.xml.edi.EDIPara;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.utils.ApSessionUtil;

@Component("ediProcessor")
public class EDIMsgMerge implements IEDIMsgGenerate{
	
	private Document msgTemplate;
	private Document msgMapping;
	private Document msgContent;
	private String msgType;
	private String xmlns;
	private String currentBu;
	
	private JSONObject reqDom;
	
//	@Resource(name="")
	private IEDIMsgValidate validator;

	public void loadTemplate(String fileName) throws Exception {
		try {
			this.msgTemplate = XMLParaLoadHelper.loadEDITemplatePara(fileName,currentBu);
			this.xmlns = this.msgTemplate.getDocumentElement().getNamespaceURI();
		} catch (IOException e) {
			EDIUtils.getLogger().error("参数文件没有找到："+fileName);
			throw e;
		} catch (Exception e) {
			EDIUtils.getLogger().error("解析参数文件失败："+fileName);
			throw e;
		}
	}

	public void setTemplate(Document tempFile) {
		this.msgTemplate = tempFile;
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

	public void setMapping(Document mappingFile) {
		this.msgMapping = mappingFile;
	}

	@Override
	public Document generateMsg(EDIPara ediPara,JSONObject reqDom) throws Exception {
		this.reqDom = reqDom;
		ApSessionContext context = ApSessionUtil.getContext();
		currentBu = context.getSysBusiUnit();
		
		loadTemplate(ediPara.getTemplate());
		
		loadMapping(ediPara.getMapping());
		
		this.msgType = getMsgType();
		
		EDIUtils.getLogger().debug("Generate EDI message begin...type is:"+this.msgType);
		
		processEDIJs(ediPara,reqDom);
		
		EDIElement ediStruture = buildMsgStruture();
		
		String loopPath = this.getLoopPath(ediStruture);
		if(StringUtil.isTrimNotEmpty(loopPath)){
			int size = this.getLoopMsgSize(loopPath);
			EDIElement loopElement = findLoopElement(ediStruture);
			for (int i = size-1; i >-1; i--) {
				EDIElement element = loopElement.clone();
				String suffix = element.getPath()+"/rows"+i;
				setLoopElementPath(element,suffix);
				element.setPath(suffix);
				loopElement.getParentEle().appendChild(element, loopElement);
			}
			loopElement.getParentEle().removeChild(loopElement);
		}
		
		fillContent(ediStruture);
		
		msgContent = XMLManager.createDocument(this.msgType);
		convertToXml(ediStruture,msgContent.getDocumentElement());
		msgContent.getDocumentElement().setAttribute("xmlns", xmlns);
		
//		validator.validateMsg();
		
		EDIUtils.getLogger().debug("Generate EDI message end...type is:"+this.msgType);
		return msgContent;
	}
	
	private void convertToXml(EDIElement struture,Element parent) {
		if(struture.hasChilds()){
			int size = struture.getChildSize();
			for (int i = 0; i < size; i++) {
				EDIElement child = struture.getChild(i);
				Element ele = XMLManager.createXMLElement(msgContent, child.getNodeName(),child.getValue());
				parent.appendChild(ele);
				convertToXml(child,ele);
			}
		}
	}

	private void fillContent(EDIElement child) {
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
				JSONObject field = JsonUtil.findJson(reqDom,child.getPath());
				realValue = field.containsKey(child.getValue())?field.getString(child.getValue()):"";
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
				JSONObject field = JsonUtil.findJson(reqDom,child.getPath());
				
				realValue = field.containsKey(child.getValue())?field.getString(child.getValue()):"";
				//error
				break;
			}*/
			
			child.setValue(realValue);
		}
		
		if(child.isLoop()){
			String loopPath = child.getLoopPath();
			//待处理
		}
		
		if(child.hasChilds()){
			int size = child.getChildSize();
			for (int i = 0; i < size; i++) {
				fillContent(child.getChild(i));
			}
		}
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
		JSONObject loopObject = JsonUtil.findJson(reqDom,loopPath);
		
		return getRecordCount(loopObject);
	}
	
	private int getRecordCount(JSONObject trxObj){
		if(trxObj!=null&&trxObj.containsKey("_total_rows")){
			return trxObj.getInt("_total_rows");
		}
		return 0;
	}
	
	private JSONObject getTrxDom(JSONObject rows,int recodIndex){
		String key = "rows"+recodIndex;
		if(rows.containsKey(key)){
			return rows.getJSONObject(key);
		}
		return null;
	}
	
	private EDIElement findLoopElement(EDIElement ediStruture){
		if(ediStruture.isLoop()){
			return ediStruture;
		}
		if(ediStruture.hasChilds()){
			int size = ediStruture.getChildSize();
			for (int i = 0; i < size; i++) {
				EDIElement pathEle = findLoopElement(ediStruture.getChild(i));
				if(pathEle!=null)
					return pathEle;
			}
		}
		
		return null;
	}
	
	private void setLoopElementPath(EDIElement ediStruture,String suffix){
		if(StringUtil.isTrimEmpty(ediStruture.getPath())){
			ediStruture.setPath(suffix);
		}

		if(ediStruture.hasChilds()){
			int size = ediStruture.getChildSize();
			for (int i = 0; i < size; i++) {
				EDIElement pathEle = ediStruture.getChild(i);
				setLoopElementPath(pathEle,suffix);
			}
		}else{
//			ediStruture.setPath(suffix);
		}
	}

}

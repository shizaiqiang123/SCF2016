package com.ut.scf.core.gapi;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.scf.core.entity.ApSessionContext;
import com.ut.scf.core.js.IServerSideJs;
import com.ut.scf.core.utils.ApSessionUtil;

@Service("gapiDemerge")
public class GAPIMsgDemerge implements IGAPIMsgDemerge {

	private Document msgTemplate;
	// private Document msgMapping;
	private Document msgContent;
	private String msgType;

	private String currentBu;

	/**
	 * @throws Exception
	 * 
	 */
	@Override
	public List<Object> demerge(GapiMsgPara para, Object gapiMsg) throws Exception {
		ApSessionContext context = ApSessionUtil.getContext();
		currentBu = context.getSysBusiUnit();

		this.msgContent = XMLManager.xmlStrToDom(gapiMsg.toString());

		loadTemplate(para.getReceivetemp());

		GAPIUtil.getLogger().debug("Demerge GAPI message begin...type is:" + this.msgType);

		JSONObject reqDom = JsonHelper.createReqJson();

		GAPIElement ediStruture = buildMsgStruture();

		List<GAPIElement> loopPathList = new ArrayList<GAPIElement>();
		getLoopPath(loopPathList,ediStruture);

		List<Object> retLsit = new ArrayList<Object>();
		if (!loopPathList.isEmpty()) {
			for (GAPIElement loopName : loopPathList) {
				int msgSize = getLoopMsgSize(loopName.getPath());
				GAPIElement parent = loopName.clone();
				loopName.setLoop(false);
				loopName.removeChilds();
				for (int i = 0; i < msgSize; i++) {
					GAPIElement struture = parent.clone();
					struture.setNodeName(loopName.getNodeName());
					struture.setParentEle(loopName);
					fillContent(struture, i + 1);
				}
			}
			
		
			JSONArray jsArray = new JSONArray();
			fillContent(ediStruture, 1);
			JSONObject json = JsonUtil.createJson();
			json.put("funcInfo", JsonHelper.getFuncObject(reqDom));
			JSONObject firstNode = JsonUtil.createJson(ediStruture.getNodeName());
			convertToXml(ediStruture, firstNode);
			JsonUtil.append(json, firstNode);
			retLsit.add(json);
		} else {
			fillContent(ediStruture, 1);
			JSONObject json = JsonUtil.createJson();
			json.put("funcInfo", JsonHelper.getFuncObject(reqDom));
			JSONObject firstNode = JsonUtil.createJson(ediStruture.getNodeName());
			convertToXml(ediStruture, firstNode);
			JsonUtil.append(json, firstNode);
			// validator.validateMsg();

			retLsit.add(json);
		}

		GAPIUtil.getLogger().debug("Demerge GAPI message end...type is:" + this.msgType);
		return retLsit;
	}

	public void loadTemplate(String fileName) throws Exception {
		try {
			this.msgTemplate = XMLParaLoadHelper.loadGAPIMappingPara(fileName, currentBu);
		} catch (IOException e) {
			GAPIUtil.getLogger().error("参数文件没有找到：" + fileName);
			throw e;
		} catch (Exception e) {
			GAPIUtil.getLogger().error("解析参数文件失败：" + fileName);
			throw e;
		}
	}

	private String getMsgType() throws Exception {
		if (msgTemplate == null) {
			throw new Exception("No template find.");
		}
		return msgTemplate.getDocumentElement().getNodeName();
	}

	@Resource(name = "ediJsEngine")
	protected IServerSideJs jsEngine;

	//
	// private JSONObject processEDIJs(EDIPara para,JSONObject serviceData)
	// throws Exception{
	// String jsFile = para.getJs();
	//
	// if(StringUtil.isTrimNotEmpty(jsFile)){
	// jsEngine.initTrxData(serviceData);
	// jsEngine.initTrxPara(para);
	// try {
	// jsEngine.executeJsFile(jsFile);
	// } catch (Exception e) {
	// GAPIUtil.getLogger().error(e.toString());
	// throw e;
	// }
	//
	// return (JSONObject) jsEngine.getTrxData();
	// }
	// return serviceData;
	// }

	private GAPIElement buildMsgStruture() {
		// Element rootEle = msgMapping.getDocumentElement();
		Element rootEle = (Element) msgTemplate.getDocumentElement().cloneNode(true);
		GAPIElement rootEDI = new GAPIElement(rootEle);
		parseChildEle(rootEDI, rootEle);

		return rootEDI;
	}

	private void parseChildEle(GAPIElement parent, Element ele) {
		if (ele == null)
			return;

		if (ele.hasChildNodes()) {
			Node child = ele.getFirstChild();
			while (child != null) {
				if (child.getNodeType() == Node.ELEMENT_NODE) {
					GAPIElement childEdiNode = new GAPIElement((Element) child);
					childEdiNode.setParentEle(parent);
					parseChildEle(childEdiNode, (Element) child);
				}
				child = child.getNextSibling();
			}
		}
	}

	private void fillContent(GAPIElement child, int index) {
		if (child == null)
			return;

		if (StringUtil.isTrimNotEmpty(child.getValue())) {
			String type = child.getType();
			String realValue = "";
			if("V".equals(type)){
				realValue = child.getValue();
			}else if("C".equals(type)){
				realValue = "";
			}else{
				Element field = null;
				if (child.isLoop()) {
					Node fromNode = XMLManager.selectSingleNode(msgContent.getDocumentElement(), child.getLoopPath());
					field = (Element) XMLManager.findNode(fromNode, child.getPath(), index);
				} else {
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
				// add js engine here
				break;
			default:
				Element field = null;
				if (child.isLoop()) {
					Node fromNode = XMLManager.selectSingleNode(msgContent.getDocumentElement(), child.getLoopPath());
					field = (Element) XMLManager.findNode(fromNode, child.getPath(), index);
				} else {
					field = (Element) XMLManager.findNode(msgContent.getDocumentElement(), child.getPath());
				}
				realValue = XMLManager.getChildNodeValue(field, child.getValue(), true);
				break;
			}*/

			child.setValue(realValue);
			child.setType("V");
		}
		if (child.hasChilds()) {
			int size = child.getChildSize();
			for (int i = 0; i < size; i++) {
				fillContent(child.getChild(i), index);
			}
		}
	}

	private JSONObject convertToXml(GAPIElement struture, JSONObject json) {
		if (struture.hasChilds()) {
			int size = struture.getChildSize();
			String nodeName = json.containsKey("_json_name") ? json.getString("_json_name") : "";
			for (int i = 0; i < size; i++) {
				GAPIElement child = struture.getChild(i);
				JSONObject ele = JsonUtil.createJson(child.getNodeName());
				if (child.hasChilds()&&child.isLoop()) {
					int msgSize = getLoopMsgSize(child.getPath());
					ele = JsonUtil.createJson(child.getNodeName());
					json.put("_total_rows",msgSize);
					json.put("rows"+i, convertToXml(child, ele));
//					json.accumulate(child.getNodeName(), convertToXml(child, ele));
				}else if(child.hasChilds()){
					json.put(child.getNodeName(), convertToXml(child, ele));
				}else {
					json.putAll(convertToXml(child, ele));
				}
			}
			if (StringUtil.isTrimNotEmpty(nodeName))
				json.put("_json_name", nodeName);
		} else {
			json.put(struture.getNodeName(), struture.getValue());
		}
		return json;
	}

	private void getLoopPath(List<GAPIElement> list,GAPIElement ediStruture) {
		if (ediStruture.isLoop()) {
//			return ediStruture.getPath();
			list.add(ediStruture);
			return ;
		}
		if (ediStruture.hasChilds()) {
			int size = ediStruture.getChildSize();
			for (int i = 0; i < size; i++) {
				getLoopPath(list,ediStruture.getChild(i));
//				if (StringUtil.isTrimNotEmpty(path))
////					return path;
//					list.add(ediStruture.getNodeName());
			}
		}
	}

	private int getLoopMsgSize(String loopPath) {
		if (StringUtil.isTrimEmpty(loopPath))
			return 0;
		NodeList loopElement = XMLManager.selectNodes(msgContent, loopPath);
		return loopElement.getLength();
	}
	
	private NodeList getLoopMsgNode(String loopPath){
		if (StringUtil.isTrimEmpty(loopPath))
			return null;
		NodeList loopElement = XMLManager.selectNodes(msgContent, loopPath);
		return loopElement;
	}
	
	private GAPIElement getLoopStruture(String loopPath,GAPIElement root){
		if (StringUtil.isTrimEmpty(loopPath)||root==null)
			return null;
		if(root.getNodeName().equalsIgnoreCase(loopPath)){
			return root;
		}
		if(root.hasChilds()){
			int size = root.getChildSize();
			for (int i = 0; i < size; i++) {
				GAPIElement child = getLoopStruture(loopPath,root.getChild(i));
				if(child!=null){
					return child;
				}
			}
		}
		return null;
	}

}

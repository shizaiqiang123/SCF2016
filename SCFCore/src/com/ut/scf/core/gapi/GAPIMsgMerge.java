package com.ut.scf.core.gapi;

import java.io.IOException;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.ut.comm.tool.json.JsonUtil;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.scf.core.gapi.formattor.GAPIElementFormatorFactory;

@Component("gapiProcessor")
public class GAPIMsgMerge implements IGAPIMsgMerge{
	
	private Document msgTemplate;
//	private Document msgMapping;
	private Document msgContent;
	private String msgType;
	private String xmlns;
	private String currentBu;
	
	private JSONObject reqDom;
	
	public void loadTemplate(String fileName) throws Exception {
		try {
			this.msgTemplate = XMLParaLoadHelper.loadGAPIMappingPara(fileName,currentBu);
			this.xmlns = this.msgTemplate.getDocumentElement().getNamespaceURI();
		} catch (IOException e) {
			GAPIUtil.getLogger().error("参数文件没有找到："+fileName);
			throw e;
		} catch (Exception e) {
			GAPIUtil.getLogger().error("解析参数文件失败："+fileName);
			throw e;
		}
	}

	public void setTemplate(Document tempFile) {
		this.msgTemplate = tempFile;
	}

	public void loadMapping(String fileName) throws Exception {
//		try {
////			this.msgMapping = XMLParaLoadHelper.loadEDIMappingPara(fileName,currentBu);
//		} catch (IOException e) {
//			GAPIUtil.getLogger().error("参数文件没有找到："+fileName);
//			throw e;
//		} catch (Exception e) {
//			GAPIUtil.getLogger().error("解析参数文件失败："+fileName);
//			throw e;
//		}
	}

	public void setMapping(Document mappingFile) {
//		this.msgMapping = mappingFile;
	}

	@Override
	public Document mergeMsg(GapiMsgPara gapiMsgPara,Object reqDom) throws Exception {
		this.reqDom = (JSONObject) reqDom;
		
		this.currentBu = gapiMsgPara.getBu();//或者从context中获取
		
 		loadTemplate(gapiMsgPara.getSendtemp());
		
//		loadMapping(gapiMsgPara.getSendtemp());
		
		this.msgType = getMsgType();
		
		GAPIUtil.getLogger().debug("Generate GAPI message begin...type is:"+this.msgType);
		
//		processEDIJs(gapiMsgPara,reqDom);
		
		GAPIElement ediStruture = buildMsgStruture();
		
		String loopPath = this.getLoopPath(ediStruture);
		if(StringUtil.isTrimNotEmpty(loopPath)){
			int size = this.getLoopMsgSize(loopPath);
			GAPIElement loopElement = findLoopElement(ediStruture);
			for (int i = size-1; i >-1; i--) {
				GAPIElement element = loopElement.clone();
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
		
		GAPIUtil.getLogger().debug("Generate GAPI message end...type is:"+this.msgType);
		return msgContent;
	}
	
	private void convertToXml(GAPIElement struture,Element parent) {
		if(struture.hasChilds()){
			int size = struture.getChildSize();
			for (int i = 0; i < size; i++) {
				GAPIElement child = struture.getChild(i);
				Element ele = XMLManager.createXMLElement(msgContent, child.getNodeName(),child.getValue());
				parent.appendChild(ele);
				convertToXml(child,ele);
			}
		}
	}

	private void fillContent(GAPIElement child) {
		if(child==null)
			return;
		if(StringUtil.isTrimNotEmpty(child.getValue())){
			String type = child.getType();
			Object realValue= null;
			
			if("V".equals(type)){
				realValue = child.getValue();
			}else if("C".equals(type)){
				realValue = "";
			}else{
				JSONObject field = JsonUtil.findJson(reqDom,child.getPath());
				
				realValue = field.containsKey(child.getValue())?field.get(child.getValue()):"";
				String formattor = child.getFormattor();
				if(StringUtil.isTrimNotEmpty(formattor)){
					realValue = GAPIElementFormatorFactory.getFormattor(formattor).format(realValue,formattor);
				}
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
				
				realValue = field.containsKey(child.getValue())?field.get(child.getValue()):"";
				String formattor = child.getFormattor();
				if(StringUtil.isTrimNotEmpty(formattor)){
					realValue = GAPIElementFormatorFactory.getFormattor(formattor).format(realValue,formattor);
				}
				//error
				break;
			}
			*/
			child.setValue(realValue.toString());
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

	private GAPIElement buildMsgStruture() {
//		Element rootEle = msgMapping.getDocumentElement();
		Element rootEle = (Element) msgTemplate.getDocumentElement().cloneNode(true);
		GAPIElement rootEDI = new GAPIElement(rootEle);
		parseChildEDIEle(rootEDI, rootEle);
		
		return rootEDI;
	}
	
	private void parseChildEDIEle(GAPIElement parent, Element ele) {
		if(ele==null)
			return;

		if (ele.hasChildNodes()) {
			Node child = ele.getFirstChild();
			while (child != null) {
				if(child.getNodeType() == Node.ELEMENT_NODE){
					GAPIElement childEdiNode = new GAPIElement((Element) child);
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
	
	private String getLoopPath(GAPIElement ediStruture){
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
	
	private GAPIElement findLoopElement(GAPIElement ediStruture){
		if(ediStruture.isLoop()){
			return ediStruture;
		}
		if(ediStruture.hasChilds()){
			int size = ediStruture.getChildSize();
			for (int i = 0; i < size; i++) {
				GAPIElement pathEle = findLoopElement(ediStruture.getChild(i));
				if(pathEle!=null)
					return pathEle;
			}
		}
		
		return null;
	}
	
	private void setLoopElementPath(GAPIElement ediStruture,String suffix){
		if(StringUtil.isTrimEmpty(ediStruture.getPath())){
			ediStruture.setPath(suffix);
		}

		if(ediStruture.hasChilds()){
			int size = ediStruture.getChildSize();
			for (int i = 0; i < size; i++) {
				GAPIElement pathEle = ediStruture.getChild(i);
				String type = pathEle.getType();
				String realValue= "";
				
				if("V".equals(type)){
				}else if("C".equals(type)){
					realValue = "";
				}else{
					pathEle.setPath(suffix);
					setLoopElementPath(pathEle,suffix);
				}
				
				/*switch (type) {
				case "V":
					break;
				case "C":
					realValue = "";
					//add js engine here
					break;
				default:
//					suffix+="/";
//					suffix+=pathEle.getValue();
					pathEle.setPath(suffix);
					setLoopElementPath(pathEle,suffix);
					break;
				}*/

			}
		}else{
//			ediStruture.setPath(suffix);
		}
	}

}

package com.ut.scf.core.para;

import net.sf.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.Properties;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.springframework.stereotype.Service;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.AbsObject;
import com.ut.comm.xml.XMLParaHelper;
import com.ut.comm.xml.XMLParaLoadHelper;
import com.ut.comm.xml.XMLParaParseHelper;

/**
 * 将页面数据打包生成会计科目XML文件
 * 
 * @author YeQing
 * @date 2016-8-5
 */
@Service("accountParseToXmlImpl")
public class AccountParseToXmlImpl implements IParaManager {
	private Document document;
	public static final String AP_PARA_DEFAULT_PATH = ASPathConst.getDefaultBuName();

	@Override
	public AbsObject getParaDefine(String paraId, String paraPath, String paraBu) throws Exception {
		Class<? extends AbsObject> clazz = XMLParaHelper.getRegistedObjectClass(paraPath);
		AbsObject obj = clazz.newInstance();
		obj.setId(paraId);
		XMLParaParseHelper.parseApPara(obj, paraPath, paraBu);
		return obj;
	}

	@Override
	public Object updateParaDefine(String paraId, String paraPath, JSONObject trxData, String paraBu) throws Exception {
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			document = builder.newDocument();
		} catch (ParserConfigurationException e) {
			System.out.println(e.getMessage());
		}

		Element root = document.createElement("accounting"); // 创建根节点
		document.appendChild(root);
		Element accountdefine = document.createElement("accountdefine");
		// 循环取值
		JSONObject doname = trxData.getJSONObject("account");
		String totalRecords = doname.getString("_total_rows");
		for (int i = 0; i < Integer.parseInt(totalRecords); i++) {
			JSONObject retTrxData = getTrxDom(doname, i);
			String accType = retTrxData.getString("accType");
			String accNm = retTrxData.getString("accNm");
			String accNo = retTrxData.getString("accNo");

			Element account = document.createElement("account");
			Attr accType_new = document.createAttribute("type");
			Attr accNm_new = document.createAttribute("desc");
			account.setAttribute("type", accType); // 增加属性的另一种方法
			account.setAttribute("desc", accNm); // 增加属性的另一种方法
			account.appendChild(document.createTextNode(accNo));
			accountdefine.appendChild(account);

		}
		root.appendChild(accountdefine);

		// 将DOM对象document写入到xml文件中
		TransformerFactory tf = TransformerFactory.newInstance();
		try {
			if (StringUtil.isTrimEmpty(paraBu)) {
				paraBu = AP_PARA_DEFAULT_PATH;
			}
			// 生成文件路径
			StringBuffer acconutPath = new StringBuffer(ASPathConst.getUserDirPath());
			acconutPath.append(File.separator).append(paraBu).append(File.separator).append(paraPath)
					.append(File.separator).append(paraId).append(".xml");

			Transformer transformer = tf.newTransformer();
			DOMSource source = new DOMSource(document);

			ByteArrayOutputStream bytes = new ByteArrayOutputStream();
			StreamResult result = new StreamResult(bytes);
			Properties properties = transformer.getOutputProperties();
			properties.setProperty(OutputKeys.ENCODING, "UTF-8");
			properties.setProperty(OutputKeys.INDENT, "yes");
			transformer.setOutputProperties(properties);
			transformer.transform(source, result);

			String xmlStr = bytes.toString("UTF-8");
			FileOutputStream fos = new FileOutputStream(acconutPath.toString());
			OutputStreamWriter writer = new OutputStreamWriter(fos, "UTF-8");
			writer.write(xmlStr);
			writer.close();
			System.out.println("生成XML文件成功!");
		} catch (TransformerConfigurationException e) {
			System.out.println(e.getMessage());
		} catch (IllegalArgumentException e) {
			System.out.println(e.getMessage());
		} catch (FileNotFoundException e) {
			System.out.println(e.getMessage());
		} catch (TransformerException e) {
			System.out.println(e.getMessage());
		}

		return null;
	}

	protected String[] getTargetBus(JSONObject trxData) {
		if (trxData.containsKey("bu")) {
			String targetBu = trxData.getString("bu");
			if (StringUtil.isTrimNotEmpty(targetBu)) {
				return targetBu.split(",");
			}
		}
		return new String[] { "" };
	}

	@Override
	public void deleteParaDefine(String paraId, String paraPath, JSONObject trxData) throws Exception {
		String[] targetBu = getTargetBus(trxData);
		for (String string : targetBu) {
			XMLParaLoadHelper.deleteApParaDefine(paraId, paraPath, string);
		}
	}

	protected JSONObject getTrxDom(JSONObject rows, int recodIndex) {
		String key = "rows" + recodIndex;
		if (rows.containsKey(key)) {
			return rows.getJSONObject(key);
		}
		return null;
	}
}
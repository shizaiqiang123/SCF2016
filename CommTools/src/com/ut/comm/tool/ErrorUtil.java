package com.ut.comm.tool;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.error.ErrorMsg;
import com.ut.comm.xml.error.ErrorPara;

public class ErrorUtil {

	private static HashMap hmErrMsg = null;
	public static final String ERROR_CODE_DB_DEFAULT = "199999";
	public static final String ERROR_CODE_AP_DEFAULT = "299999";
	public static final String ERROR_CODE_WEB_DEFAULT = "399999";
	public static final String ERROR_CODE_INTERFACE_DEFAULT = "499999";

	public static String msgSetErr(String errMsg)
	{
		try
		{
			if (errMsg == null || errMsg.trim().length() < 1)
				return null;
			if (hmErrMsg == null)
				initHmErrMsg();

			Iterator it = hmErrMsg.keySet().iterator();
			String errKey = null;
			String errMsgvalue = null;
			while (it.hasNext())
			{
				errKey = (String) it.next();
				errMsgvalue = (String) hmErrMsg.get(errKey);

				if (errMsg.indexOf(errKey) > -1)
					return errMsgvalue;
			}
			return errMsg;
		} catch (Exception e)
		{
			return errMsg;
		}

	}

	private static synchronized void initHmErrMsg()
	{
		if (hmErrMsg != null)
			return;
		String bin = ASPathConst.USER_DIR_PATH;
		String errFilePath = bin + "/EE_SYS/ErrorRoot.xml";
		hmErrMsg = new HashMap();

		Document errDoc = null;
		try {
			errDoc = XMLManager.xmlFileToDom(errFilePath);
		} catch (Exception e) {
			e.printStackTrace();
			return;
		}

		Element eleRoot = errDoc.getDocumentElement();
		NodeList nlErr = eleRoot.getChildNodes();

		String errLevel = null;
		String errCode = null;
		String errKey = null;
		String errMsg = null;
		Element eErr = null;
		StringBuffer msgBuf = null;
		int in = 0;
		for (int i = 0; i < nlErr.getLength(); i++) {
			Node nErr = nlErr.item(i);
			if (nErr.getNodeType() != Node.ELEMENT_NODE)
				continue;

			eErr = (Element) nErr;

			errLevel = eErr.getAttribute("level").trim();
			errCode = eErr.getAttribute("errCode").trim();
			errKey = eErr.getAttribute("errKey").trim();
			errMsg = XMLManager.getNodeValue(eErr, true);
			if (errMsg != null)
				errMsg = errMsg.trim();
			if ((errKey != null && errKey.length() > 0) && (errMsg != null && errMsg.length() > 0))
			{
				msgBuf = new StringBuffer("[");
				msgBuf.append(errLevel);
				msgBuf.append(":");
				msgBuf.append(errCode);
				msgBuf.append("]    ");
				in = errMsg.indexOf("\n");
				while (in > 0)
				{
					if (errMsg.substring(in - 2, in).equals("\r"))
					{
						errMsg = errMsg.substring(0, in - 2) + " " + errMsg.substring(in + 2).trim();
					} else
					{
						errMsg = errMsg.substring(0, in) + " " + errMsg.substring(in + 2).trim();
					}
					in = errMsg.indexOf("\n");
				}
				msgBuf.append(errMsg);
				errMsg = msgBuf.toString();
				hmErrMsg.put(errKey, errMsg);
			}
		}

	}

	public static String getErrorStackTrace(Exception e) {
		String err = "";
		try {
			ByteArrayOutputStream os = new ByteArrayOutputStream();
			PrintWriter pw = new PrintWriter(os);
			e.printStackTrace(pw);
			os.close();
			pw.close();
			err = os.toString();
			os = null;
			pw = null;
		} catch (Exception ee) {
		}
		return err;
	}
	
	public static String getErrorMsg(String errorCode){
		return getErrorMsg(errorCode, "", "");
	}
	
	public static String getErrorMsg(String errorCode,String cnty){
		return getErrorMsg(errorCode, cnty, "");
	}
	
	public static String getErrorMsg(String errorCode,String cnty,String bu){
		ErrorPara para = getErrorPara(errorCode,bu);
		if(StringUtil.isTrimEmpty(cnty)){
			cnty = para.getDefaultLang();
		}
		ErrorMsg msg = para.getErrmsg(cnty);
		return msg.getMsg();
	}
	
	public static ErrorPara getErrorPara(String errorCode){
		return getErrorPara(errorCode,"");
	}
	
	public static ErrorPara getErrorPara(String errorCode,String bu){
		ErrorPara para = XMLParaParseHelper.parseErrorCodePara(errorCode,bu);
		return para;
	}
	
	public static String getDBDefaultError(String cnty){
		return getErrorMsg(ERROR_CODE_DB_DEFAULT, cnty, "");
	}
	
	public static String getDBDefaultError(String cnty,String bu){
		return getErrorMsg(ERROR_CODE_DB_DEFAULT, cnty, bu);
	}
	
	public static String getAPDefaultError(String cnty){
		return getErrorMsg(ERROR_CODE_AP_DEFAULT, cnty, "");
	}
	
	public static String getAPDefaultError(String cnty,String bu){
		return getErrorMsg(ERROR_CODE_AP_DEFAULT, cnty, bu);
	}
	
	public static String getWEBDefaultError(String cnty){
		return getErrorMsg(ERROR_CODE_WEB_DEFAULT, cnty, "");
	}
	
	public static String getWEBDefaultError(String cnty,String bu){
		return getErrorMsg(ERROR_CODE_WEB_DEFAULT, cnty, bu);
	}
	
	public static String getInterfaceDefaultError(String cnty){
		return getErrorMsg(ERROR_CODE_INTERFACE_DEFAULT, cnty, "");
	}
	
	public static String getInterfaceDefaultError(String cnty,String bu){
		return getErrorMsg(ERROR_CODE_INTERFACE_DEFAULT, cnty, bu);
	}
}
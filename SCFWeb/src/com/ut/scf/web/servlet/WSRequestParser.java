package com.ut.scf.web.servlet;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.xerces.parsers.DOMParser;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.xml.XMLManager;

public class WSRequestParser {

	private static final String ACTION_SERVLET = "ACTION_SERVLET";

	private static final String ACTION_PAGE = "ACTION_PAGE";

	private static String sServletConfigPath = ASPathConst.USER_DIR_PATH + "/web/Servlet_Config.xml";

	private static String sPageConfigPath = ASPathConst.USER_DIR_PATH + "/web/Page_Config.xml";

	private static final String NODE_TRX_STATUS = "trx_status";

	private static final String NODE_SERVLET_NAME = "servlet-name";

	private static final String NODE_URL_PATTEN = "url-pattern";

	private static final String NODE_PARA_NAME = "param-name";

	private static final String NODE_PARA_VALUE = "param-value";

	private static final String NODE_INIT_PARA = "initparam";

	// private static final String NODE_PAGE_TYPE = "page_type";

	private static final String NODE_SCREEN_NAME = "screen_name";

	// private static final String NODE_CE_SCREEN_NAME = "";

	private static long lServeletFileModifiedTime = 0;

	private static long lPageFileModifiedTime = 0;

	private static File servletConfigFile = new File(sServletConfigPath);

	private static File pageConfigFile = new File(sPageConfigPath);

	private static Map hmActionServletConfig = new HashMap();

	private static Map hmActionPageConfig = new HashMap();

	private static WSRequestParser ActionServletInstance;

	private static WSRequestParser ActionPageInstance;

	private WSRequestParser(String requestType) {

		if (requestType.equals(ACTION_SERVLET)) {
			hmActionServletConfig = readServletConfigure();
		} else if (requestType.equals(ACTION_PAGE)) {
//			hmActionPageConfig = readPageConfigure();
		}

	}

	private synchronized static WSRequestParser getActionServletInstance() {

		if (ActionServletInstance == null) {

			lServeletFileModifiedTime = servletConfigFile.lastModified();

			ActionServletInstance = new WSRequestParser(ACTION_SERVLET);

		} else if (servletConfigFile.exists()) {
			long newModifiedTime = servletConfigFile.lastModified();
			if (newModifiedTime != lServeletFileModifiedTime) {
				lPageFileModifiedTime = newModifiedTime;
				ActionServletInstance = new WSRequestParser(ACTION_SERVLET);
			}
		}

		return ActionServletInstance;
	}

	private synchronized static WSRequestParser getActionPageInstance() {

		if (ActionPageInstance == null) {
			lPageFileModifiedTime = pageConfigFile.lastModified();
			ActionPageInstance = new WSRequestParser(ACTION_PAGE);

		} else if (pageConfigFile.exists()) {
			long newModifiedTime = pageConfigFile.lastModified();
			if (newModifiedTime != lPageFileModifiedTime) {
				lPageFileModifiedTime = newModifiedTime;
				ActionPageInstance = new WSRequestParser(ACTION_PAGE);
			}
		}

		return ActionPageInstance;
	}

	/**
	 * @return
	 */
	private synchronized static Map readServletConfigure() {

		hmActionServletConfig.clear();

		ServletObj servletObj;
		String sTrxStatus;
		String sServletName;
		String sUrlPatten;
		// String sInitparaName;
		// String sInitParaValue;

		try {

			DOMParser sp = new DOMParser();
			sp.parse(sServletConfigPath);
			NodeList nl = sp.getDocument().getDocumentElement()
					.getElementsByTagName("Servlet");
			for (int i = 0, j = nl.getLength(); i < j; i++) {

				Node n = nl.item(i);

				sTrxStatus = XMLManager.getChildNodeValue(n, NODE_TRX_STATUS,
						true);
				sServletName = XMLManager.getChildNodeValue(n,
						NODE_SERVLET_NAME, true);
				sUrlPatten = XMLManager.getChildNodeValue(n, NODE_URL_PATTEN,
						true);
				// sInitparaName =
				// WSDomUtil.getChildNodeValue(n, NODE_PARA_NAME, true);
				// sInitParaValue =
				// WSDomUtil.getChildNodeValue(n, NODE_PARA_VALUE, true);

				servletObj = new ServletObj();
				servletObj.setTrxStatus(sTrxStatus);
				servletObj.setServletName(sServletName);
				servletObj.setUrlPatten(sUrlPatten);
				// servletObj.setInitParaName(sInitparaName);
				// servletObj.setInitParaValue(sInitParaValue);

				hmActionServletConfig.put(sTrxStatus, servletObj);

			}
		} catch (SAXException e) {
//			WebLogExec.writeEEError(e);
		} catch (IOException e) {
//			WebLogExec.writeEEError(e);
		}

		return hmActionServletConfig;
	}

	/**
	 * @return
	 */
//	private synchronized static Map readPageConfigure() {
//
//		hmActionPageConfig.clear();
//
//		try {
//			PageActionObj pageActionObj;
//			String sPageType;
//			String sScreenName;
//			String sInitparaName;
//			String sInitParaValue;
//
//			DOMParser sp = new DOMParser();
//			sp.parse(sPageConfigPath);
//			NodeList nl = sp.getDocument().getDocumentElement()
//					.getElementsByTagName("JSP");
//			for (int i = 0, j = nl.getLength(); i < j; i++) {
//
//				Node n = nl.item(i);
//
//				sPageType = XMLManager.getChildNodeValue(n, NODE_TRX_STATUS,
//						true);
//				sScreenName = XMLManager.getChildNodeValue(n, NODE_SCREEN_NAME,
//						true);
//
//				pageActionObj = new PageActionObj();
//				pageActionObj.setPageType(sPageType);
//				pageActionObj.setScreenName(sScreenName);
//
//				ArrayList paraList = XMLManager.findChildNodes(n,
//						NODE_INIT_PARA);
//
//				for (int l = 0, m = paraList.size(); l < m; l++) {
//					sInitparaName = XMLManager.getChildNodeValue(n,
//							NODE_PARA_NAME, true);
//					sInitParaValue = XMLManager.getChildNodeValue(n,
//							NODE_PARA_VALUE, true);
//					pageActionObj.putInitPara(sInitparaName, sInitParaValue);
//				}
//
//				hmActionPageConfig.put(sPageType, pageActionObj);
//
//			}
//		} catch (SAXException e) {
////			WebLogExec.writeEEError(e);
//		} catch (IOException e) {
////			WebLogExec.writeEEError(e);
//		}
//
//		return hmActionPageConfig;
//
//	}

	public static ServletObj getActionServlet(String sTrxStatus) {

		ActionServletInstance = getActionServletInstance();

		Object obj = hmActionServletConfig.get(sTrxStatus);
		if (obj != null)
			return (ServletObj) obj;
		else
			return null;
	}

//	public static PageActionObj getForwardPage(String pageType) {
//
//		ActionPageINSTANCE = getActionPageInstance();
//
//		Object obj = hmActionPageConfig.get(pageType);
//		if (obj != null)
//			return (PageActionObj) obj;
//		else
//			return null;
//	}

}

class ServletObj {
	private String sServletName;

	private String urlPatten;

	private String sInitParaName;

	private String sInitParaValue;

	private String sTrxStatus;

	public String getTrxStatus() {

		return sTrxStatus;
	}

	/**
	 * @return
	 */
	public String getInitParaName() {
		return sInitParaName;
	}

	/**
	 * @return
	 */
	public String getInitParaValue() {
		return sInitParaValue;
	}

	/**
	 * @return
	 */
	public String getServletName() {
		return sServletName;
	}

	/**
	 * @param string
	 */
	public void setInitParaName(String string) {
		sInitParaName = string;
	}

	/**
	 * @param string
	 */
	public void setInitParaValue(String string) {
		sInitParaValue = string;
	}

	/**
	 * @param string
	 */
	public void setServletName(String string) {
		sServletName = string;
	}

	public void setTrxStatus(String sTrxStatus) {
		this.sTrxStatus = sTrxStatus;
	}

	/**
	 * @return urlPatten
	 */
	public String getUrlPatten() {
		return urlPatten;
	}

	/**
	 * @param urlPatten
	 *            urlPatten
	 */
	public void setUrlPatten(String urlPatten) {
		this.urlPatten = urlPatten;
	}

	public String toString() {
		return this.urlPatten;
	}
}

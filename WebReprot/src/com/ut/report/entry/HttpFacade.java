package com.ut.report.entry;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.TreeMap;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.birt.report.engine.api.EngineException;
import org.eclipse.birt.report.engine.api.HTMLRenderOption;
import org.eclipse.birt.report.engine.api.IReportEngine;
import org.eclipse.birt.report.engine.api.IReportRunnable;
import org.eclipse.birt.report.engine.api.IRunAndRenderTask;
import org.eclipse.birt.report.engine.api.script.ScriptException;
import org.eclipse.birt.report.model.api.ReportDesignHandle;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.report.engine.EngineFactory;

public class HttpFacade extends HttpServlet
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private static final String encodingScheme = "UTF-8";
	private ServletOutputStream servletOutputStream = null;
	static
	{
	}

	public HttpFacade()
	{
		super();
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		try {
			request.setCharacterEncoding("UTF-8");
			String report = request.getParameter("report");
			if ("online".equalsIgnoreCase(report) || "BatchReport".equalsIgnoreCase(report))
			{
				mergeOnlineOrBatch(request, response, report);
			}
			else if ("TSUMessage".equalsIgnoreCase(report))
			{
				String designFilePath = getTemplatePath(request.getParameter("designFilePath"));
				if (fileIsExists(designFilePath))
				{
					mergeTsu(request, response);
				}
				else
				{
					throw new ServletException("Can not find file");
				}

			}
			else
			{
				mergeOther(request, response);
			}
		} catch (Throwable t)
		{
			String s = t.getMessage();
			if (s == null)
			{
				t.printStackTrace();
				s = t.toString();
			}
			if (servletOutputStream != null) {
				servletOutputStream.write(s.getBytes());
			} else {
				response.getWriter().write(s);
			}
		} finally
		{
			try {
				if (servletOutputStream != null) {
					servletOutputStream.close();
				}
			} catch (Exception e) {
				// DataType.writeSysOutLog(e.getMessage());
			}
			servletOutputStream = null;
		}
	}

	private String getTemplatePath(String fileName)
	{
		if (fileName.startsWith("/"))
		{
			fileName = fileName.substring("/".length());
		} else if (fileName.startsWith("\\"))
		{
			fileName = fileName.substring("\\".length());
		}
		String filePath = ASPathConst.USER_DIR_PATH;
		if (filePath.endsWith("/") || filePath.endsWith("\\"))
		{
			return filePath + fileName;
		}
		else
		{
			return filePath + "/" + fileName;
		}

	}

	private String getPdfFilePath(String fileName)
	{
		if (fileName.startsWith("/"))
		{
			fileName = fileName.substring("/".length());
		} else if (fileName.startsWith("\\"))
		{
			fileName = fileName.substring("\\".length());
		}

		String filePath = ASPathConst.USER_DIR_PATH;
		if (filePath.endsWith("/") || filePath.endsWith("\\"))
		{
			return filePath + fileName;
		}
		else
		{
			return filePath + "/" + fileName;
		}
	}

	private boolean fileIsExists(String fileName)
	{
		File file = new File(fileName);
		return file.exists();
	}

	private void mergeOther(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String name = request.getParameter("name");
		if (null == name)
		{
			ServletException e = new ServletException("Http-servlet-request parameter 'name' is NULL.");
			throw e;
		}
		String mainRef = request.getParameter("mainRef");
		if (null == mainRef)
		{
			ServletException e = new ServletException("Http-servlet-request parameter 'mainRef' is NULL.");
			throw e;
		}
		String eventTimes = request.getParameter("eventTimes");
		if (Integer.parseInt(eventTimes) < 1)
		{
			ServletException e = new ServletException("Http-servlet-request parameter 'eventTimes' is ILLEGAL (< 1).");
			throw e;
		}
		String doWhat = request.getParameter("doWhat");
		if (null == doWhat)
		{
			ServletException e = new ServletException("Http-servlet-request parameter 'doWhat' is NULL.");
			throw e;
		}
		String reportFilePath = request.getParameter("reportFilePath");
		reportFilePath = ASPathConst.USER_DIR_PATH + reportFilePath;
		if (null == reportFilePath)
		{
			ServletException e = new ServletException("Http-servlet-request parameter 'reportFilePath' is NULL.");
			throw e;
		}
		String designFilePath = request.getParameter("designFilePath");
		designFilePath = ASPathConst.USER_DIR_PATH + designFilePath;
		if (null == designFilePath)
		{
			ServletException e = new ServletException("Http-servlet-request parameter 'designFilePath' is NULL.");
			throw e;
		}
		String docType = request.getParameter("docType");
		if (null == docType)
		{
			throw new ServletException("Http-servlet-request parameter 'documentType' is NULL.");
		}
		String dsName = request.getParameter("dsName");
		if (null == dsName)
		{
			dsName = "";
		}
		String sysSchema = request.getParameter("sysSchema");
		if (sysSchema == null) {
			sysSchema = "EXIMSYS";
		}
		String dbType = request.getParameter("dbType");
		String bankGroup = request.getParameter("bankGroupId");
		String country = request.getParameter("countryCode");
		if (null == docType)
		{
			ServletException e = new ServletException("Http-servlet-request parameter 'documentType' is NULL.");
		}
		if ("SHOW".equals(doWhat))
		{
			this.showReport(request, response, reportFilePath);
		}
		else if ("ISSUE".equals(doWhat))
		{
			try
			{
				String docInex = request.getParameter("docIndex");

				this.issueReportFile(designFilePath, reportFilePath, mainRef,
						eventTimes, docType, dsName, bankGroup, country, docInex, sysSchema, dbType);
			} catch (EngineException e)
			{
				throw new ServletException(e);
			} catch (SQLException e)
			{
				throw new ServletException(e);
			}
		}
		else if ("ISSUE_AND_SHOW".equals(doWhat))
		{
			try
			{
				String docInex = request.getParameter("docIndex");
				this.issueReportFile(designFilePath, reportFilePath, mainRef,
						eventTimes, docType, dsName, bankGroup, country, docInex, sysSchema, dbType);
			} catch (EngineException e)
			{
				throw new ServletException(e);
			} catch (SQLException e)
			{
				throw new ServletException(e);
			}
			this.showReport(request, response, reportFilePath);
		}
		else
		{
			ServletException e = new ServletException(
					"The value of parameter 'doWhat' isn't 'SHOW' or 'ISSUE' or 'ISSUE_AND_SHOW'.");
			throw e;
		}
	}

	private void mergeTsu(HttpServletRequest request, HttpServletResponse response) throws IOException,
			EngineException, SQLException
	{
		String reportFilePath = getPdfFilePath(request.getParameter("reportFilePath"));
		String designFilePath = getTemplatePath(request.getParameter("designFilePath"));
		String xmlSource = request.getParameter("xmlSource");
		String docType = request.getParameter("docType");
		String doWhat = request.getParameter("doWhat");
		String bankGroup = request.getParameter("bankGroupId");
		String country = request.getParameter("countryCode");
		String messageID = request.getParameter("messageID") == null ? "" : request.getParameter("messageID");
		if ("SHOW".equalsIgnoreCase(doWhat))
		{
			this.showReport(request, response, reportFilePath);
		}
		else if ("ISSUE".equalsIgnoreCase(doWhat))
		{
			try
			{
				if (!"".equalsIgnoreCase(messageID))
				{
					this.issueTSUMessageByDB(reportFilePath, designFilePath, messageID, docType);
				}
				else if (!"".equalsIgnoreCase(xmlSource))
				{
					this.issueTSUMessageByXML(reportFilePath, bankGroup, country, designFilePath, xmlSource, docType);
				}
			} catch (EngineException e)
			{
				throw e;
			} catch (SQLException e)
			{
				throw e;
			}
		}
		else if ("ISSUE_AND_SHOW".equalsIgnoreCase(doWhat))
		{
			try
			{
				if (!"".equalsIgnoreCase(messageID))
				{
					this.issueTSUMessageByDB(reportFilePath, designFilePath, messageID, docType);
				}
				else if (!"".equalsIgnoreCase(xmlSource))
				{
					this.issueTSUMessageByXML(reportFilePath, bankGroup, country, designFilePath, xmlSource, docType);
				}
			} catch (EngineException e)
			{
				throw e;
			} catch (SQLException e)
			{
				throw e;
			}
			this.showReport(request, response, reportFilePath);
		}
	}

	private void mergeOnlineOrBatch(HttpServletRequest request, HttpServletResponse response, String report)
			throws ServletException, IOException
	{
		String reportFilePath = request.getParameter("reportFilePath");
		if (null == reportFilePath)
		{
			ServletException e = new ServletException("Http-servlet-request parameter 'reportFilePath' is NULL.");
			throw e;
		}
		reportFilePath = ASPathConst.USER_DIR_PATH + reportFilePath;
		String designFilePath = request.getParameter("designFilePath");
		if (null == designFilePath)
		{
			ServletException e = new ServletException("Http-servlet-request parameter 'designFilePath' is NULL.");
			throw e;
		}
		designFilePath = ASPathConst.USER_DIR_PATH + designFilePath;
		String docType = request.getParameter("docType");
		if (null == docType)
		{
			throw new ServletException("Http-servlet-request parameter 'documentType' is NULL.");
		}
		String dsName = request.getParameter("dsName");
		if (null == dsName)
		{
			dsName = "";
		}
		String parameters = request.getParameter("parameters");
		List list = null;
		if (null != parameters)
		{
			StringTokenizer tokenizer = new StringTokenizer(parameters, ";");
			list = new ArrayList();
			while (tokenizer.hasMoreTokens())
			{
				Map treeMap = new TreeMap();
				String param = tokenizer.nextToken();
				String[] paramArray = param.split("__");
				for (int i = 0; i < paramArray.length; i++)
				{
					String subParam = paramArray[i];
					int index = subParam.indexOf("=");
					String name = subParam.substring(0, index);
					String value = subParam.substring(index + 1);
					value = value.replaceAll("\\|\\|", ",");
					treeMap.put(name, value);
				}
				list.add(treeMap);
			}
		}

		try
		{
			this.issueReportFile(designFilePath, reportFilePath, docType, list, dsName);
		} catch (EngineException e)
		{
			e.printStackTrace();
		} catch (SQLException e)
		{
			e.printStackTrace();
		}
		this.showReport(request, response, reportFilePath);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		this.doPost(request, response);
	}

	private void issueReportFile(String designFilePath, String reportFilePath, String docType, List list, String dsName)
			throws EngineException, SQLException
	{
		Map context = new HashMap();
		Connection connection = null;
		try
		{
			try
			{
				connection = EngineFactory.getConnection(dsName);
			} catch (SQLException e)
			{
				throw e;
			} finally
			{
			}
			context.put("CustomedConnection", connection);
			HTMLRenderOption hTMLRenderOption = new HTMLRenderOption();
			setRenderOption(docType, hTMLRenderOption);

			hTMLRenderOption.setOutputFileName(reportFilePath);

			// Get report engine.
			IReportEngine reportEngine = EngineFactory.getReportEngine();

			// Open report design.
			IReportRunnable reportRunnable = null;
			try
			{
				reportRunnable = reportEngine.openReportDesign(designFilePath);
			} catch (EngineException e)
			{
				throw e;
			} finally
			{
			}
			if (dsName.length() > 0)
			{
				try
				{
					reportRunnable.getDesignInstance().getDataSource("Data Source")
							.setPrivateDriverProperty("odaJndiName", dsName);
				} catch (Exception e1)
				{
					e1.printStackTrace();
				}
			}
			IRunAndRenderTask runAndRenderTask = reportEngine.createRunAndRenderTask(reportRunnable);

			runAndRenderTask.setAppContext(context);
			runAndRenderTask.setRenderOption(hTMLRenderOption);
			if (list != null)
			{
				for (Iterator iter = list.iterator(); iter.hasNext();)
				{
					Map treeMap = (Map) iter.next();
					String dataType = (String) treeMap.get("dataType");
					char type = dataType.charAt(0);
					treeMap.remove("dataType");
					for (Iterator it = treeMap.entrySet().iterator(); it.hasNext();)
					{
						Map.Entry entry = (Map.Entry) it.next();
						String key = (String) entry.getKey();
						String value = (String) entry.getValue();
						switch (type)
						{
						case 'S':
							runAndRenderTask.setParameterValue(key, value);
							break;
						case 'I':
							Integer paraI = new Integer(value);
							runAndRenderTask.setParameterValue(key, paraI);
							break;
						case 'F':
							Float paraF = new Float(value);
							runAndRenderTask.setParameterValue(key, paraF);
							break;
						case 'D':
							if ("Decimal".equalsIgnoreCase(dataType) && !"".equals(value))
							{
								BigDecimal paraD = new BigDecimal(value);
								runAndRenderTask.setParameterValue(key, paraD);
							}
							else if ("DateTime".equalsIgnoreCase(dataType) && !"".equals(value))
							{
								Date paraDate = Date.valueOf(value);
								runAndRenderTask.setParameterValue(key, paraDate);
							}
							break;
						case 'B':
							Boolean paraB = new Boolean(value);
							runAndRenderTask.setParameterValue(key, paraB);
							break;
						default:
							break;
						}
					}
				}
			}
			runAndRenderTask.run();
			runAndRenderTask.close();
			responseErrors(runAndRenderTask);
		} finally
		{
			if (connection != null)
				try
				{
					connection.close();
				} catch (Exception e)
				{
				}
		}
	}

	private void setRenderOption(String docType,
			HTMLRenderOption hTMLRenderOption) {
		if ("pdf".equalsIgnoreCase(docType))
		{
			hTMLRenderOption.setOutputFormat(HTMLRenderOption.OUTPUT_FORMAT_PDF);
		}
		else if ("html".equalsIgnoreCase(docType))
		{
			hTMLRenderOption.setOutputFormat(HTMLRenderOption.OUTPUT_FORMAT_HTML);
		} else if ("xls".equalsIgnoreCase(docType)) {
			hTMLRenderOption.setOutputFormat("xls");
		} else if ("doc".equalsIgnoreCase(docType)) {
			hTMLRenderOption.setOutputFormat("doc");
		} else if ("ppt".equalsIgnoreCase(docType)) {
			hTMLRenderOption.setOutputFormat("ppt");
		}
	}

	private void issueReportFile(String designFilePath, String reportFilePath, String mainRef, String eventTimes,
			String docType, String dsName,
			String bankGroup, String country, String docInex, String sysSchema, String dbType)
			throws Exception
	{

		String strvalue = null;
		Map context = new HashMap();
		Connection connection = null;
		try
		{
			try
			{
				boolean bXmlDS = false;
				try {
					Document designDom = XMLManager.xmlFileToDom(designFilePath);
					Node root = designDom.getDocumentElement();
					Node parentDS = XMLManager.findNode(root, "data-sources");
					Node odaDS = XMLManager.findNode(parentDS, "oda-data-source");
					if (odaDS != null) {
						String dataSourceType = XMLManager.getNodeAttribute(odaDS, "extensionID");
						if (dataSourceType != null && dataSourceType.endsWith(".xml")) {
							bXmlDS = true;
						}
					}
				} catch (Exception e) {
					// DataType.writeSysErrLog(DataType.getErrorStackTrace(e));
				}
				connection = EngineFactory.getConnection(dsName);
				// if (bXmlDS && connection != null &&
				// StringUtil.isTrimNotEmpty(docInex))
				// {
				// StringBuffer sbf = new StringBuffer();
				// String tableName
				// =SchemaUtil.getTableNameWithSchema(sysSchema,"TRX_DOCS_INDX_MGR");
				// ASGenSQLTool genSql = new
				// ASGenSQLTool(ASGenSQLTool.I_SQL_TYPE_SELECT,tableName,
				// sbf.append(" WHERE C_DOC_INDEX='")
				// .append(docInex).append("'").toString(),null,dbType);
				// genSql.addField("C_TRX_DOC_DATA", "", Types.VARCHAR);
				// String sql = genSql.genSqlString();
				// Statement st = connection.createStatement();
				// ResultSet rs = st.executeQuery(sql);
				// while (rs.next())
				// {
				// Clob clob = rs.getClob("C_TRX_DOC_DATA");
				// if (clob != null){
				// strvalue = DBUtil.getClobValue(clob);
				// strvalue = CompressUtil.decompressString2String(strvalue);
				// }
				// }
				// rs.close();
				// st.close();
				// rs = null;
				// st = null;
				//
				// }
			} catch (SQLException e)
			{
				throw e;
			} finally
			{
			}
			context.put("CustomedConnection", connection);

			if (strvalue != null)
			{
				issueTSUMessageByXML(reportFilePath, bankGroup, country, designFilePath, strvalue, docType);
				return;
			}
			HTMLRenderOption hTMLRenderOption = new HTMLRenderOption();
			setRenderOption(docType, hTMLRenderOption);
			hTMLRenderOption.setOutputFileName(reportFilePath);

			// Get report engine.
			IReportEngine reportEngine = EngineFactory.getReportEngine();

			// Open report design.
			IReportRunnable reportRunnable = null;

			try
			{
				reportRunnable = reportEngine.openReportDesign(designFilePath);
			} catch (EngineException e)
			{
				throw e;
			} finally
			{
			}
			if (dsName.length() > 0)
			{
				try
				{
					reportRunnable.getDesignInstance().getDataSource("Data Source")
							.setPrivateDriverProperty("odaJndiName", dsName);
				} catch (ScriptException e1)
				{
					e1.printStackTrace();
				}
			}
			// Run run-and-render task.
			IRunAndRenderTask runAndRenderTask = reportEngine.createRunAndRenderTask(reportRunnable);
			runAndRenderTask.setAppContext(context);
			runAndRenderTask.setRenderOption(hTMLRenderOption);
			Integer event = Integer.valueOf(eventTimes);
			runAndRenderTask.setParameterValue("C_MAIN_REF", mainRef);
			runAndRenderTask.setParameterValue("I_EVENT_TIMES", event);
			runAndRenderTask.validateParameters();
			runAndRenderTask.run();
			runAndRenderTask.close();
			responseErrors(runAndRenderTask);
		} finally
		{
			if (connection != null)
				try
				{
					connection.close();
				} catch (Exception e)
				{
				}
		}
	}

	private void issueTSUMessageByXML(String reportFilePath, String bankGroup, String country, String designFilePath,
			String xmlSource, String docType) throws EngineException
	{
		// Config context.
		Map context = new HashMap();
		ByteArrayInputStream stream = null;
		try
		{
			stream = new ByteArrayInputStream(xmlSource.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e)
		{
			e.printStackTrace();
		}
		context.put("org.eclipse.birt.report.data.oda.xml.inputStream", stream);
		context.put("org.eclipse.birt.report.data.oda.xml.closeInputStream", new Boolean(true));

		// Config HTTP render option.
		HTMLRenderOption hTMLRenderOption = new HTMLRenderOption();
		setRenderOption(docType, hTMLRenderOption);
		hTMLRenderOption.setOutputFileName(reportFilePath);
		// Get report engine.
		IReportEngine reportEngine = EngineFactory.getReportEngine();
		// Open report design.
		IReportRunnable reportRunnable = null;
		try
		{
			reportRunnable = reportEngine.openReportDesign(designFilePath);
			ReportDesignHandle report = (ReportDesignHandle) reportRunnable.getDesignHandle();
			try {
				Document designDom = XMLManager.xmlFileToDom(designFilePath);
				Node root = designDom.getDocumentElement();
				Element parentDS = (Element) XMLManager.findNode(root, "data-sources");
				NodeList odaDSList = parentDS.getElementsByTagName("oda-data-source");
			} catch (Exception e) {
				// DataType.writeSysErrLog(DataType.getErrorStackTrace(e));
			}
		} catch (EngineException e)
		{
			throw e;
		} finally
		{
		}

		// Run run-and-render task.
		IRunAndRenderTask runAndRenderTask = reportEngine.createRunAndRenderTask(reportRunnable);
		runAndRenderTask.setAppContext(context);
		runAndRenderTask.setRenderOption(hTMLRenderOption);
		runAndRenderTask.validateParameters();
		runAndRenderTask.run();
		runAndRenderTask.close();
		responseErrors(runAndRenderTask);
	}

	private void issueTSUMessageByDB(String reportFilePath, String designFilePath, String messageID, String docType)
			throws EngineException, SQLException
	{
		// Config context.
		Map context = new HashMap();
		Connection connection = null;
		try
		{
			try
			{
				connection = EngineFactory.getConnection(null);
			} catch (SQLException e)
			{
			} finally
			{
			}
			context.put("CustomedConnection", connection);
			HTMLRenderOption hTMLRenderOption = new HTMLRenderOption();
			setRenderOption(docType, hTMLRenderOption);
			hTMLRenderOption.setOutputFileName(reportFilePath);

			// Get report engine.
			IReportEngine reportEngine = EngineFactory.getReportEngine();

			// Open report design.
			IReportRunnable reportRunnable = null;
			try
			{
				reportRunnable = reportEngine.openReportDesign(designFilePath);
			} catch (EngineException e)
			{
				throw e;
			} finally
			{
			}

			// Run run-and-render task.
			IRunAndRenderTask runAndRenderTask = reportEngine.createRunAndRenderTask(reportRunnable);
			runAndRenderTask.setAppContext(context);
			runAndRenderTask.setRenderOption(hTMLRenderOption);
			runAndRenderTask.setParameterValue("C_MESSAGE_ID", messageID);
			runAndRenderTask.validateParameters();
			runAndRenderTask.run();
			runAndRenderTask.close();
			responseErrors(runAndRenderTask);
		} finally
		{
			if (connection != null)
				try
				{
					connection.close();
				} catch (Exception e)
				{
				}
		}
	}

	private void showReport(HttpServletRequest request, HttpServletResponse responese, String reportFilePath)
			throws IOException
	{
		String outPath = null;
		String isEnablePrint = request.getParameter("isEnablePrintButton");
		if ("N".equals(isEnablePrint) && reportFilePath.endsWith("pdf")) {
			outPath = reportFilePath.substring(0, reportFilePath.lastIndexOf("."));
			outPath = outPath + "_encrypt.pdf";
			// try
			// {
			// PdfEncrytor.hideBars(reportFilePath, outPath);
			// }catch(Exception e)
			// {
			// throw new IOException(" PdfEncrytor.hideBars exception ");
			// }
		} else {
			outPath = reportFilePath;
		}
		String documentType = null;
		if (reportFilePath.endsWith(".pdf")) {
			responese.setContentType("application/pdf");
			documentType = "pdf";
		}
		else if (reportFilePath.endsWith(".xls")) {
			responese.setContentType("application/vnd.ms-excel");
			documentType = "xls";
		}
		else if (reportFilePath.endsWith(".doc")) {
			responese.setContentType("application/msword"); // vnd.ms-powerpoint
			documentType = "doc";
		}
		else if (reportFilePath.endsWith(".ppt")) {
			responese.setContentType("application/vnd.ms-powerpoint"); //
			documentType = "ppt";
		}
		else {
			responese.setContentType("html/text");
			documentType = "html";
		}
		responese.setHeader("Content-Disposition", "inline; filename=Advice." + documentType);
		try
		{
			servletOutputStream = responese.getOutputStream();
		} catch (IOException e)
		{
			throw e;
		} finally
		{
		}
		try
		{
			this.getBytesFromFile(outPath, servletOutputStream);
			if ("N".equals(isEnablePrint) && reportFilePath.endsWith("pdf")) {
				servletOutputStream.println("#toolbar=0");
			}
		} catch (IOException e)
		{
			throw e;
		}
		if ("N".equals(isEnablePrint) && reportFilePath.endsWith("pdf")) {
			File f = new File(outPath);
			if (!f.delete()) {
				// APLogExec.writeEEError(new
				// StringBuffer(f.getPath()).append(" delete failed").toString());
			}

		}
	}

	private void getBytesFromFile(String reportFile, ServletOutputStream servletOutputStream)
			throws FileNotFoundException, IOException
	{

		File file = new File(reportFile);
		BufferedInputStream inputStream = null;
		inputStream = new BufferedInputStream(new FileInputStream(file));

		byte[] buffer = new byte[4096];
		int curLen = inputStream.read(buffer);
		while (curLen > 0) {
			servletOutputStream.write(buffer, 0, curLen);
			servletOutputStream.flush();
			curLen = inputStream.read(buffer);
		}
		inputStream.close();
		inputStream = null;
		file = null;
		buffer = null;
	}

	private String decodeParameter(String parameter) throws UnsupportedEncodingException
	{
		try
		{
			parameter = URLDecoder.decode(parameter, HttpFacade.encodingScheme);
		} catch (UnsupportedEncodingException e)
		{
			throw e;
		} finally
		{
		}
		return parameter;
	}

	public String toString()
	{
		return super.toString();
	}

	public int hashCode()
	{
		return super.hashCode();
	}

	public boolean equals(Object object)
	{
		return super.equals(object);
	}

	String getClobValue(Clob clob)
	{
		try
		{
			Reader reader = clob.getCharacterStream();
			int len = 4096;
			char[] buf = new char[len];

			StringBuffer str = new StringBuffer();
			int rSize = reader.read(buf);
			while (rSize > 0)
			{
				str.append(new String(buf, 0, rSize));
				rSize = reader.read(buf);
			}
			reader.close();
			return str.toString();

		} catch (Exception e)
		{
			// APLogFileManager.writeSQLError(e.getMessage(), null, "", "");
		}
		return null;
	}

	private void responseErrors(IRunAndRenderTask runAndRenderTask)
	{
		List errors = runAndRenderTask.getErrors();
		if (errors != null && errors.size() > 0)
		{
			StringBuffer errorStr = new StringBuffer();
			for (int i = 0, length = errors.size(); i < length; i++)
			{
				Object error = errors.get(i);
				errorStr.append(error).append("\r\n");
			}
			throw new RuntimeException(errorStr.toString());
		}
	}

}
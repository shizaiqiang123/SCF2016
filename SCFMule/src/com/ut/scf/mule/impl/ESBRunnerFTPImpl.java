package com.ut.scf.mule.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Date;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ftpserver.ConnectionConfigFactory;
import org.apache.ftpserver.DataConnectionConfigurationFactory;
import org.apache.ftpserver.FtpServer;
import org.apache.ftpserver.FtpServerFactory;
import org.apache.ftpserver.listener.ListenerFactory;
import org.apache.ftpserver.usermanager.PropertiesUserManagerFactory;

import com.ut.comm.tool.DateTimeUtil;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.FtpUtil;
import com.ut.comm.tool.MD5;
import com.ut.comm.tool.json.JsonHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.data.AbsDataObject;
import com.ut.scf.core.data.FuncDataObj;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBService;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.utils.BuDateTimeUtil;
import com.ut.scf.mule.IESBProtocol;

import net.sf.json.JSONObject;

public class ESBRunnerFTPImpl implements IESBProtocol {
	private static Log logger = LogFactory.getLog(ESBRunnerFTPImpl.class);
	private String inorout;
	private String ip;
	private int port;
	private int timeout;
	private String serviceTp;
	private String ftpUser;
	private String ftpPwd;
	private String homeDir;
	private String charset;
	private String passsivePort;

	FtpServer service = null;

	@Override
	public void initlizeService(IESBService request) throws Exception {
		this.inorout = request.getInorout();
		this.ip = request.getAddress();
		this.port = Integer.parseInt(request.getPort());
		this.timeout = Integer.parseInt(request.getTimeout());
		this.serviceTp = request.getServiceType();
		this.ftpUser = request.getUser();
		this.ftpPwd = request.getPwd();
		this.homeDir = request.getHomeDir();
		this.charset = request.getCharacterset();
		this.passsivePort = request.getPasssivePort();

		if ("o".equalsIgnoreCase(this.inorout)) {
			MainServer server = new MainServer();
			server.start();
		} else {
		}
	}

	@Override
	public void destoryService(IESBService request) throws Exception {
		if ("o".equalsIgnoreCase(this.inorout)) {
			if (service != null) {
				service.stop();
				System.out.println("Ftp Server Stop !");
				logger.info("Ftp Server Stop !");
			}
		} else {
		}
	}

	@Override
	public IESBServiceResponse runService(IESBServiceRequest request) throws Exception {
		IESBServiceResponse response = new ServiceResponseImpl();
		JSONObject json = (JSONObject) request.getRequestData();
		String method = request.getMethodName();
		JSONObject jsonObject = JsonHelper.getTrxObject(json);
		FtpUtil ftpUtil = new FtpUtil();
		FuncDataObj retObj = new FuncDataObj();
		try {
			String localPath = jsonObject.containsKey("localPath")?jsonObject.getString("localPath"):"";
			String fileName = jsonObject.containsKey("fileName")?jsonObject.getString("fileName"):"";
			String remotePath = jsonObject.containsKey("remotePath")?jsonObject.getString("remotePath"):"";
			String validate = jsonObject.containsKey("validate")?jsonObject.getString("validate"):"";
			String backupPath = jsonObject.containsKey("backupPath")?jsonObject.getString("backupPath"):"";
			String deleteOnSuccess = jsonObject.containsKey("deleteOnSuccess")?jsonObject.getString("deleteOnSuccess"):"";
			
			localPath = formatPath(localPath);
			remotePath = formatPath(remotePath);
			backupPath = formatPath(backupPath);
			
			ftpUtil.connect(ip, port, ftpUser, ftpPwd, false, this.charset);
			
			if ("UPLOAD".equalsIgnoreCase(method)) {
				if(StringUtil.isTrimEmpty(validate)||fileName.endsWith(validate)){
					ftpUtil.upload(remotePath, fileName, localPath,backupPath);
				}
			}if ("UPLOADALL".equalsIgnoreCase(method)) {
				File localDir= new File(localPath);
				if(localDir.exists()&&localDir.isDirectory()){
					for (String string : localDir.list()) {
						if(StringUtil.isTrimEmpty(validate)||string.endsWith(validate)){
							ftpUtil.upload(remotePath,string, localPath,backupPath);
						}
					}
				}
				retObj.buildRespose();
			} else if ("DOWNLOAD".equalsIgnoreCase(method)) {
				ftpUtil.setBackupPath(backupPath);
				ftpUtil.download(remotePath, fileName, localPath);
				retObj.buildRespose();
			}else if ("DOWNLOADALL".equalsIgnoreCase(method)) {
				ftpUtil.setBackupPath(backupPath);
//				String[] fileNameList = ftpUtil.getFileNames(remotePath);
//				for (String string : fileNameList) {
//					ftpUtil.download(remotePath,string, localPath);
//				}
				ftpUtil.retrieve(remotePath, localPath,validate,"true".equalsIgnoreCase(deleteOnSuccess));
				retObj.buildRespose();
			} else if ("FILENAMES".equalsIgnoreCase(method)) {
				String[] fileNameList = ftpUtil.getFileNames(remotePath);
			
				retObj.buildRespose(fileNameList);
			}
		} catch (Exception e) {
			ESBServiceUtil.getLogger().error(String.format("Process FTP exception...ip:%s port:%s exception:", ip, port,e.getMessage()));
			ESBServiceUtil.getLogger().error(ErrorUtil.getErrorStackTrace(e));
			retObj.setRetStatus(AbsDataObject.EXCEPTION);
			retObj.setRetInfo(e.toString());
			response.setError("Exception");
		} finally {
			ftpUtil.disconnect();
		}
		response.setResponseData(retObj);
		return response;
	}

	class MainServer extends Thread {
		public void run() {
			File configFile = new File("ftp.properties");
			try {
				loadparams(configFile);
				FtpServerFactory serverFactory = new FtpServerFactory();
				ListenerFactory factory = new ListenerFactory();
				factory.setPort(port);
				ConnectionConfigFactory config = new ConnectionConfigFactory();
				if (StringUtil.isTrimNotEmpty(passsivePort)) {
					DataConnectionConfigurationFactory dccf = new DataConnectionConfigurationFactory();
					dccf.setPassivePorts(passsivePort);
					factory.setDataConnectionConfiguration(dccf.createDataConnectionConfiguration());
				}
				serverFactory.addListener("default", factory.createListener());
				PropertiesUserManagerFactory userManagerFactory = new PropertiesUserManagerFactory();
				userManagerFactory.setFile(configFile);
				serverFactory.setUserManager(userManagerFactory.createUserManager());
				serverFactory.setConnectionConfig(config.createConnectionConfig());
				service = serverFactory.createServer();
				service.start();
				System.out.println("Ftp Server is Listening " + port + "!");
				logger.info("Ftp Server is Listening " + port + "!");
			} catch (Exception ex) {
				logger.error("Start Ftp Server Failed！", ex);
			} finally {
				configFile.deleteOnExit();
			}
		}

		private void loadparams(File file) throws Exception {
			Properties p = new Properties();
			String head = "ftpserver.user." + ftpUser;
			p.setProperty(head + ".userpassword", MD5.makeMd5(ftpPwd));
			p.setProperty(head + ".homedirectory", homeDir);
			p.setProperty(head + ".enableflag", "true");
			p.setProperty(head + ".writepermission", "true");
			p.setProperty(head + ".maxloginnumber", "0");
			p.setProperty(head + ".maxloginperip", "0");
			p.setProperty(head + ".idletime", timeout + "");
			p.setProperty(head + ".uploadrate", "0");
			p.setProperty(head + ".downloadrate", "0");
			FileOutputStream inStream = null;
			try {
				inStream = new FileOutputStream(file);
				p.store(inStream, null);
			} finally {
				if (inStream != null) {
					inStream.close();
				}
			}
		}
	}

	@Override
	public String getServiceTp() {
		return this.serviceTp;
	}
	
	public String formatPath(String input){
		if(StringUtil.isTrimEmpty(input))
			return "";
		if(input.contains("$")){
			String replaseField = input.substring(input.indexOf("$")+1,input.lastIndexOf("$"));
			if("sysdate".equalsIgnoreCase(replaseField)){
				Date buDate = BuDateTimeUtil.getCurrentBuDate();
				String strSysdate = DateTimeUtil.parseDate(buDate, "yyyyMMdd");
				input = input.replace("$sysdate$", strSysdate);
				return input;
			}else{
				return input;
			}
		}else{
			return input;
		}
	}
}

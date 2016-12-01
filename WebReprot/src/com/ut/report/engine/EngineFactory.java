package com.ut.report.engine;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletContext;
import javax.sql.DataSource;

import org.eclipse.birt.core.exception.BirtException;
import org.eclipse.birt.core.framework.IPlatformContext;
import org.eclipse.birt.core.framework.Platform;
import org.eclipse.birt.core.framework.PlatformServletContext;
import org.eclipse.birt.report.engine.api.EngineConfig;
import org.eclipse.birt.report.engine.api.IReportEngine;
import org.eclipse.birt.report.engine.api.IReportEngineFactory;

public class EngineFactory {

	private final static String CONFIG_FILE_NAME = "BirtConfig.properties";

	private static Properties properties;
	private static IReportEngine reportEngine;
	private static Map dataSource = new HashMap();
	private static boolean initialized;

	static {

		EngineFactory.properties = null;
		EngineFactory.reportEngine = null;
		EngineFactory.initialized = false;
	}

	private EngineFactory() {
		super();
	}

	public static synchronized void startup(ServletContext servletContext) {
		if (!EngineFactory.initialized) {
			try {
				EngineFactory.loadProperties(servletContext);
				EngineFactory.buildReportEngine(servletContext);
				EngineFactory.initialized = true;
			} catch (Exception e) {
				throw new Error(e);
			}
		}
	}

	private static void loadProperties(ServletContext servletContext) throws FileNotFoundException, IOException,
			Exception {
		String configFilePath = "/config/" + EngineFactory.CONFIG_FILE_NAME;
		String rootPath = servletContext.getRealPath("/WEB-INF");

		configFilePath = rootPath + configFilePath;
		InputStream inputStream = null;
		try {
			inputStream = new FileInputStream(configFilePath);
		} catch (FileNotFoundException e) {
			throw e;
		} catch (Exception e) {
			throw e;
		}
		EngineFactory.properties = new Properties();
		try {
			EngineFactory.properties.load(inputStream);
		} catch (IOException e) {
			throw e;
		}
		try {
			inputStream.close();
		} catch (IOException e) {
			throw e;
		}

		EngineFactory.checkPropertyExistence("LOG_LEVEL");
		EngineFactory.checkPropertyExistence("LOG_FOLDER");
	}

	private static void buildReportEngine(ServletContext servletContext) throws BirtException {
		EngineConfig engineConfig = new EngineConfig();
		String logLevel = EngineFactory.properties.getProperty("LOG_LEVEL");
		Level level;
		if ("ALL".equalsIgnoreCase(logLevel)) {
			level = Level.ALL;
		}
		else if ("CONFIG".equalsIgnoreCase(logLevel)) {
			level = Level.CONFIG;
		}
		else if ("FINE".equalsIgnoreCase(logLevel)) {
			level = Level.FINE;
		}
		else if ("FINER".equalsIgnoreCase(logLevel)) {
			level = Level.FINER;
		}
		else if ("FINEST".equalsIgnoreCase(logLevel)) {
			level = Level.FINEST;
		}
		else if ("INFO".equalsIgnoreCase(logLevel)) {
			level = Level.INFO;
		}
		else if ("OFF".equalsIgnoreCase(logLevel)) {
			level = Level.OFF;
		}
		else if ("SEVERE".equalsIgnoreCase(logLevel)) {
			level = Level.SEVERE;
		}
		else if ("WARNING".equalsIgnoreCase(logLevel)) {
			level = Level.WARNING;
		}
		else {
			level = Level.OFF;
		}
		// Config engine.
		engineConfig.setLogConfig(EngineFactory.properties.getProperty("LOG_FOLDER"), level);

		engineConfig.setEngineHome("");
		IPlatformContext platformContext = new PlatformServletContext(servletContext);
		engineConfig.setPlatformContext(platformContext);

		// Start up platform.
		try {
			Platform.startup(engineConfig);
		} catch (BirtException e) {
			e.printStackTrace();
			throw e;
			
		}

		// Create report engine.
		IReportEngineFactory reportEngineFactory =
				(IReportEngineFactory) Platform
						.createFactoryObject(IReportEngineFactory.EXTENSION_REPORT_ENGINE_FACTORY);
		EngineFactory.reportEngine = reportEngineFactory.createReportEngine(engineConfig);
	}

	private static DataSource buildDataSource(String dsName) throws NamingException {
		DataSource source = null;
		InitialContext context = new InitialContext();
		try {
			source = (DataSource) context.lookup(dsName);
		} catch (NamingException e) {
			String tomcatDatasource = new StringBuffer("java:comp/env/").append(dsName).toString();
			source = (DataSource) context.lookup(tomcatDatasource);
		}
		context = null;
		return source;
	}

	private static void checkPropertyExistence(String propertyName) {
		String propertyValue = EngineFactory.properties.getProperty(propertyName);
		if (null == propertyValue) {
			StringBuffer stringBuffer = new StringBuffer("");
			stringBuffer.append("Parameter '");
			stringBuffer.append(propertyName);
			stringBuffer.append("' in file '");
			stringBuffer.append(EngineFactory.CONFIG_FILE_NAME);
			stringBuffer.append("' cannot be NULL.");
			String message = stringBuffer.toString();
			IllegalArgumentException e = new IllegalArgumentException(message);

			throw e;
		}
	}

	public static synchronized void shutdown() {

		if (EngineFactory.initialized) {
			EngineFactory.reportEngine.destroy();
			Platform.shutdown();
			EngineFactory.initialized = false;
		}
	}

	public static IReportEngine getReportEngine() {
		return EngineFactory.reportEngine;
	}

	public static Connection getConnection(String dsName) throws SQLException {

		Connection connection = null;
		DataSource source = null;
		try {
			if (dataSource.containsKey(dsName)) {
				source = (DataSource) dataSource.get(dsName);
			} else {
				source = buildDataSource(dsName);
				dataSource.put(dsName, source);
			}
			connection = source == null ? null : source.getConnection();
			return connection;
		} catch (SQLException e) {
			throw e;
		} catch (NamingException e) {
			return null;
		} finally {
		}
	}
}

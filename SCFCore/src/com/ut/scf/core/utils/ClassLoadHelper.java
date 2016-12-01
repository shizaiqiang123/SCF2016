package com.ut.scf.core.utils;

import org.springframework.context.ApplicationContext;
import org.springframework.util.Assert;




//import org.springframework.web.context.ContextLoader;
//
//import com.ut.comm.tool.consts.ASPathConst;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.core.component.ILogicComponent;
import com.ut.scf.core.component.IMainComponent;
import com.ut.scf.core.component.IServiceComponent;
import com.ut.scf.core.component.ITemplateReformat;
import com.ut.scf.core.component.logic.ILogicFlowComponent;
import com.ut.scf.core.component.query.IQueryComponent;
import com.ut.scf.core.container.SpringContextLoader;
import com.ut.scf.core.exception.SCFThrowableException;
//import com.ut.scf.core.xml.func.FuncObj;

public class ClassLoadHelper {
	@Deprecated
	public static Class<?extends IMainComponent > getMainComponentClass(String strClassName){
//		String strPackage = ASPathConst.PACKAGE_COMPONENT_MAIN;
//		strClassName = strPackage +"."+strClassName;
//		
//		Class<?extends IMainComponent> c = null;
//		try {
//			c = (Class<? extends IMainComponent>) Class.forName(strClassName);
//		} catch (ClassNotFoundException e) {
//			System.out.println("�����������ڻ���·������ȷ��");		
//			e.printStackTrace();
//		}
//		
//		return c;
		return null;
	}
	
	public static boolean isRegisterComponent(String component){
		if(StringUtil.isTrimEmpty(component))
			return false;
		String springName = convertToSpringName(component);
		ApplicationContext context = SpringContextLoader.getCurrentContainer();
		return context.containsBean(springName);

	}
	
	public static IMainComponent getMainComponetProcessor(String mainComponent) throws ClassNotFoundException {
		String springName = convertToSpringName(mainComponent);
		ApplicationContext context = SpringContextLoader.getCurrentContainer();
		if (context.containsBean(springName)) {
			return (IMainComponent) context.getBean(springName);
		}
		throw new ClassNotFoundException(String.format("Class not found Exception:[%s].",springName));

	}

	
	public static ILogicComponent getBusiComponetProcessor(String busiComponent) throws SCFThrowableException {
		String springName = convertToSpringName(busiComponent);
		ApplicationContext context = SpringContextLoader.getCurrentContainer();
		if (context.containsBean(springName)) {
			return (ILogicComponent) context.getBean(springName);
		}
		throw new SCFThrowableException(String.format("Class not found Exception:[%s ].",springName));
	}
	
	public static IServiceComponent getServiceComponetProcessor(String serviceComponent) throws SCFThrowableException {
		String springName = convertToSpringName(serviceComponent);
		ApplicationContext context = SpringContextLoader.getCurrentContainer();
		if (context.containsBean(springName)) {
			return (IServiceComponent) context.getBean(springName);
		}
		throw new SCFThrowableException(String.format("Class not found Exception:[%s ].",springName));
	}
	
	public static ILogicComponent getOutgoingServiceProcessor(String busiComponent) throws ClassNotFoundException {
		String springName = convertToSpringName(busiComponent);
		ApplicationContext context = SpringContextLoader.getCurrentContainer();
		if (context.containsBean(springName)) {
			return (ILogicComponent) context.getBean(springName);
		}
		throw new ClassNotFoundException(String.format("Class not found Exception:[%s ].",springName));
	}
	
	private static String convertToSpringName(String component) {
		Assert.isTrue(StringUtil.isTrimNotEmpty(component));
		return StringUtil.firstLowerName(component);
	}
	
	public static Object getOrmEntity(String tableName) throws SCFThrowableException, ClassNotFoundException, InstantiationException, IllegalAccessException {
		String entityName = convertToOrmName(tableName);
		ApplicationContext context = SpringContextLoader.getCurrentContainer();
		if (context.containsBean(StringUtil.firstLowerName(entityName.substring(entityName.lastIndexOf(".")+1)))) {
			return context.getBean(StringUtil.firstLowerName(entityName.substring(entityName.lastIndexOf(".")+1)));
		}
		
		Class<?> t = Class.forName(entityName);
		return t.newInstance();
	}
	
	public static String getOrmName(String tableName){
		String strSchema = tableName.substring(0,tableName.indexOf(SCHEMA_SEPARATOR));
		String strTableName = tableName.substring(tableName.indexOf(SCHEMA_SEPARATOR)+1);
		StringBuffer buff= new StringBuffer();
		processTableName(buff,strTableName);
		return buff.toString();
	}
	
	private static String DEFAULT_PREFIX = "";
	private static String NAME_SEPARATOR = "_";
	private static String SCHEMA_SEPARATOR = ".";
	private static String PACKAGE_SEPARATOR = ".";
	private static String DEFAULT_PACKEAGE_NAME = "com.ut.scf.orm.";
	
	private static String convertToOrmName(String tableName) {
		Assert.isTrue(StringUtil.isTrimNotEmpty(tableName));
		String prifix = DEFAULT_PREFIX;//������
		StringBuffer ormPath= new StringBuffer(DEFAULT_PACKEAGE_NAME);
		if(tableName.contains(SCHEMA_SEPARATOR)){
			//process schema
			String strSchema = tableName.substring(0,tableName.indexOf(SCHEMA_SEPARATOR));
			String strTableName = tableName.substring(tableName.indexOf(SCHEMA_SEPARATOR)+1);
			ormPath.append(strSchema.toLowerCase()).append(PACKAGE_SEPARATOR);
			processTableName(ormPath,strTableName);
		}else{
			//process no schema
			processTableName(ormPath,tableName);
		}
		return ormPath.toString();
	}
	
	private static StringBuffer processTableName(StringBuffer buff,String tableName){
		Assert.isTrue(StringUtil.isTrimNotEmpty(tableName));
		
		String[] nameList = tableName.split(NAME_SEPARATOR);
		for(String str:nameList){
			buff.append(StringUtil.firstUpName(str.toLowerCase()));
		}
		return buff;
	}
	
	public static IQueryComponent getQueryProcessor(String mainComponent) throws ClassNotFoundException{
		return getComponentClass(mainComponent);
	}
	
	public static ILogicFlowComponent getLogicProcessor(String mainComponent) throws ClassNotFoundException {
		return getComponentClass(mainComponent);
	}
	
	public static ITemplateReformat getTemplementReformat(String className) throws ClassNotFoundException {
		return getComponentClass(className);
	}
	
	public static <T> T getComponentClass(String className) throws ClassNotFoundException {
		String springName = convertToSpringName(className);
		ApplicationContext context = SpringContextLoader.getCurrentContainer();
		if (context.containsBean(springName)) {
			return (T) context.getBean(springName);
		}
		throw new ClassNotFoundException(springName+" is not defined in current context.");
	}
}

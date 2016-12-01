package com.ut.scf.dao.hibernate;

import java.util.Properties;

import javax.persistence.Table;
import javax.sql.DataSource;

import org.hibernate.Interceptor;
import org.hibernate.cfg.NamingStrategy;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.orm.hibernate4.LocalSessionFactoryBean;

import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.xml.XMLParaParseHelper;
import com.ut.comm.xml.sys.SchemaMapping;
import com.ut.comm.xml.sys.SysPara;
import com.ut.scf.dao.hibernate.support.ClassUtils;

public class MyLocalSessionFactoryBean extends LocalSessionFactoryBean{

	public void setDataSource(DataSource dataSource) {
		super.setDataSource(dataSource);
	}

	/**
	 * Set the location of a single Hibernate XML config file, for example as
	 * classpath resource "classpath:hibernate.cfg.xml".
	 * <p>Note: Can be omitted when all necessary properties and mapping
	 * resources are specified locally via this bean.
	 * @see org.hibernate.cfg.Configuration#configure(java.net.URL)
	 */
	public void setConfigLocation(Resource configLocation) {
		super.setConfigLocation(configLocation);
	}

	/**
	 * Set the locations of multiple Hibernate XML config files, for example as
	 * classpath resources "classpath:hibernate.cfg.xml,classpath:extension.cfg.xml".
	 * <p>Note: Can be omitted when all necessary properties and mapping
	 * resources are specified locally via this bean.
	 * @see org.hibernate.cfg.Configuration#configure(java.net.URL)
	 */
	public void setConfigLocations(Resource... configLocations) {
		super.setConfigLocations(configLocations);
	}

	/**
	 * Set Hibernate mapping resources to be found in the class path,
	 * like "example.hbm.xml" or "mypackage/example.hbm.xml".
	 * Analogous to mapping entries in a Hibernate XML config file.
	 * Alternative to the more generic setMappingLocations method.
	 * <p>Can be used to add to mappings from a Hibernate XML config file,
	 * or to specify all mappings locally.
	 * @see #setMappingLocations
	 * @see org.hibernate.cfg.Configuration#addResource
	 */
	public void setMappingResources(String... mappingResources) {
		super.setMappingResources(mappingResources);
	}

	/**
	 * Set locations of Hibernate mapping files, for example as classpath
	 * resource "classpath:example.hbm.xml". Supports any resource location
	 * via Spring's resource abstraction, for example relative paths like
	 * "WEB-INF/mappings/example.hbm.xml" when running in an application context.
	 * <p>Can be used to add to mappings from a Hibernate XML config file,
	 * or to specify all mappings locally.
	 * @see org.hibernate.cfg.Configuration#addInputStream
	 */
	public void setMappingLocations(Resource... mappingLocations) {
		super.setMappingLocations(mappingLocations);
		
	}

	/**
	 * Set locations of cacheable Hibernate mapping files, for example as web app
	 * resource "/WEB-INF/mapping/example.hbm.xml". Supports any resource location
	 * via Spring's resource abstraction, as long as the resource can be resolved
	 * in the file system.
	 * <p>Can be used to add to mappings from a Hibernate XML config file,
	 * or to specify all mappings locally.
	 * @see org.hibernate.cfg.Configuration#addCacheableFile(java.io.File)
	 */
	public void setCacheableMappingLocations(Resource... cacheableMappingLocations) {
		super.setCacheableMappingLocations(cacheableMappingLocations);
	}

	/**
	 * Set locations of jar files that contain Hibernate mapping resources,
	 * like "WEB-INF/lib/example.hbm.jar".
	 * <p>Can be used to add to mappings from a Hibernate XML config file,
	 * or to specify all mappings locally.
	 * @see org.hibernate.cfg.Configuration#addJar(java.io.File)
	 */
	public void setMappingJarLocations(Resource... mappingJarLocations) {
		super.setMappingJarLocations(mappingJarLocations);
	}

	/**
	 * Set locations of directories that contain Hibernate mapping resources,
	 * like "WEB-INF/mappings".
	 * <p>Can be used to add to mappings from a Hibernate XML config file,
	 * or to specify all mappings locally.
	 * @see org.hibernate.cfg.Configuration#addDirectory(java.io.File)
	 */
	public void setMappingDirectoryLocations(Resource... mappingDirectoryLocations) {
		super.setMappingDirectoryLocations(mappingDirectoryLocations);
	}

	/**
	 * Set a Hibernate entity interceptor that allows to inspect and change
	 * property values before writing to and reading from the database.
	 * Will get applied to any new Session created by this factory.
	 * @see org.hibernate.cfg.Configuration#setInterceptor
	 */
	public void setEntityInterceptor(Interceptor entityInterceptor) {
		super.setEntityInterceptor(entityInterceptor);
	}

	/**
	 * Set a Hibernate NamingStrategy for the SessionFactory, determining the
	 * physical column and table names given the info in the mapping document.
	 * @see org.hibernate.cfg.Configuration#setNamingStrategy
	 */
	public void setNamingStrategy(NamingStrategy namingStrategy) {
		super.setNamingStrategy(namingStrategy);
	}

	/**
	 * Set Hibernate properties, such as "hibernate.dialect".
	 * <p>Note: Do not specify a transaction provider here when using
	 * Spring-driven transactions. It is also advisable to omit connection
	 * provider settings and use a Spring-set DataSource instead.
	 * @see #setDataSource
	 */
	public void setHibernateProperties(Properties hibernateProperties) {
		super.setHibernateProperties(hibernateProperties);
	}


	/**
	 * Specify annotated entity classes to register with this Hibernate SessionFactory.
	 * @see org.hibernate.cfg.Configuration#addAnnotatedClass(Class)
	 */
	public void setAnnotatedClasses(Class<?>... annotatedClasses) {
		Class<?> [] newClass = new Class<?>[annotatedClasses.length];
		for (int i = 0; i < annotatedClasses.length; i++) {
			Class clazz = annotatedClasses[i];
			String schema = getAnnotatedSchemaValue(clazz);
			schema = getConfiguredSchemaValue(schema);
			try {
				Class<?> nClazz =  ClassUtils.updateAnnotationForClass(clazz.getName(), Table.class.getName(), "schema", schema);
				if(nClazz==null){
					nClazz = clazz;
				}
				newClass[i] = nClazz;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		super.setAnnotatedClasses(annotatedClasses);
	}
	
	/**
	 * 获取参数中配置的schema，默认只有两种，std & trx，系统将根据此schema转化成真实的DB schema
	 * @param clazz
	 * @return
	 */
	public String getAnnotatedSchemaValue(Class clazz){
		if (clazz.isAnnotationPresent(Table.class)) {
			Table annotation = (Table) clazz.getAnnotation(Table.class);
			String schema = annotation.schema();
			if(StringUtil.isTrimEmpty(schema))
				schema = "STD";
			return schema;
		}
		return "STD";
	}
	
	public String getConfiguredSchemaValue(String schema){
		SysPara sysPara;
		try {
			sysPara = XMLParaParseHelper.parseSysPara("");
			SchemaMapping mapping = sysPara.getSchemamapping();
			if(mapping!=null)
				return mapping.getMappingSchema(schema);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return schema;
	}

	/**
	 * Specify the names of annotated packages, for which package-level
	 * annotation metadata will be read.
	 * @see org.hibernate.cfg.Configuration#addPackage(String)
	 */
	public void setAnnotatedPackages(String... annotatedPackages) {
		super.setAnnotatedPackages(annotatedPackages);
	}

	/**
	 * Specify packages to search for autodetection of your entity classes in the
	 * classpath. This is analogous to Spring's component-scan feature
	 * ({@link org.springframework.context.annotation.ClassPathBeanDefinitionScanner}).
	 */
	public void setPackagesToScan(String... packagesToScan) {
		super.setPackagesToScan(packagesToScan);
	}

	/**
	 * Set the Spring {@link org.springframework.transaction.jta.JtaTransactionManager}
	 * or the JTA {@link javax.transaction.TransactionManager} to be used with Hibernate,
	 * if any.
	 * @see LocalSessionFactoryBuilder#setJtaTransactionManager
	 */
	public void setJtaTransactionManager(Object jtaTransactionManager) {
		super.setJtaTransactionManager(jtaTransactionManager);
	}

	public void setResourceLoader(ResourceLoader resourceLoader) {
		super.setResourceLoader(resourceLoader);
	}

}

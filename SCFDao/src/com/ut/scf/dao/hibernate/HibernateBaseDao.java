package com.ut.scf.dao.hibernate;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.beanutils.PropertyUtils;
import org.hibernate.Criteria;
import org.hibernate.LockOptions;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.jdbc.ReturningWork;
import org.hibernate.metadata.ClassMetadata;
import org.hibernate.transform.Transformers;
import org.hibernate.type.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.orm.hibernate4.SessionFactoryUtils;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import com.comm.pojo.Page;
import com.ut.comm.tool.BeanUtils;
import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.sql.Express;
import com.ut.comm.tool.sql.ExpressBox;
import com.ut.comm.tool.sql.ExpressEntity;
import com.ut.comm.tool.sql.ExpressionHelper;
import com.ut.comm.tool.string.StringUtil;
import com.ut.scf.dao.IDaoEntity;

@Repository("commDao")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class HibernateBaseDao<T, PK extends Serializable> implements IHibernateDao<T> {
	Logger logger = LoggerFactory.getLogger("org.hibernate.SQL");
	
	protected Class<T> entityClass;
	
	private String datasource="sessionFactory2";//for test muti-datasource

	@Resource(name = "sessionFactory")
	protected SessionFactory sessionFactory;

	public String getDatasource() {
		return datasource;
	}

	public void setDatasource(String datasource) {
		this.datasource = datasource;
	}

	public SessionFactory getSessionFactory() {
//		ApplicationContext context = ApplicationContextUtil.getContext();
//		return (SessionFactory) context.getBean(datasource);
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	public Session getSession() {
		return getSessionFactory().getCurrentSession();
	}

	public HibernateBaseDao(Class<T> type) {
		this.entityClass = type;
	}

	public HibernateBaseDao() {
	}

	public T get(Serializable id) {
		return (T) getSession().get(entityClass, id);
	}

	public List<T> findByCriteria(Criterion... criterion) {
		return createCriteria(criterion).list();
	}

	public void removeById(Serializable id) {
		Assert.notNull(id);
		getSession().delete(getSession().load(entityClass, id));
	}

	public List<T> findBy(String propertyName, Object value) {
		Assert.hasText(propertyName);
		return createCriteria(Restrictions.eq(propertyName, value)).list();
	}

	public void save(Object o) {
		getSession().save(o);
	}
	
	public void update(Object o) {
		getSession().update(o);
	}

	public void delete(T entity) {
		Assert.notNull(entity);
		getSession().delete(entity);
	}

	public Query createQuery(String hql, Object... values) {
		String str = "";
		for (int i = 0; i < values.length; i++) {
			str += " "+i+".  "+values[i];
		}
		System.out.println(str);
		System.out.println("****"+hql);
		Assert.hasText(hql);
		Query queryObject = getSession().createQuery(hql);
		if (values != null) {
			for (int i = 0; i < values.length; i++) {
				Object value = values[i];
				if (String.class.isAssignableFrom(value.getClass())&&value.toString().contains(":type")) {
					queryObject.setParameter(i,parseDateType(value.toString()));
				} else {
					queryObject.setParameter(i, value);
				}
			}
		}
		return queryObject;
	}
	
	private Object parseDateType(String value) {
		String strValue = value.substring(0, value.indexOf(":type"));
		String strType = value.substring(value.indexOf(":type")
				+ ":type".length());
		if (BeanUtils.isBaseJavaType(strType)) {
			Object retObj = BeanUtils.getBaseJavaObj(strValue, strType);
			if (retObj != null)
				return retObj;
		}
		return strValue;
	}
	
	@SuppressWarnings("unchecked")
	public Serializable getId(Class entityClass, Object entity){

		Assert.notNull(entity);
		Assert.notNull(entityClass);
		try {
			return (Serializable) PropertyUtils.getProperty(entity, getIdName(entityClass));
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
		}
		Assert.isTrue(false, "Canot excute here.");
		return null;
	}

	@SuppressWarnings("unchecked")
	public String getIdName(Class clazz) {
		Assert.notNull(clazz);
		ClassMetadata meta = getSessionFactory().getClassMetadata(clazz);
		Assert.notNull(meta, "Class " + clazz + " not define in hibernate session factory.");
		String idName = meta.getIdentifierPropertyName();
		Assert.hasText(idName, clazz.getSimpleName() + " has no identifier property define.");
		return idName;
	}


	@Override
	public Object getIdType(Class clazz) {
		Assert.notNull(clazz);
		ClassMetadata meta = getSessionFactory().getClassMetadata(clazz);
		Assert.notNull(meta, "Class " + clazz + " not define in hibernate session factory.");
		Type t = meta.getIdentifierType();
		Assert.notNull(t, clazz.getSimpleName() + " has no identifier type define.");
		return t;
	}


	public Criterion createCriterion(String condition) throws Exception {
		List<ExpressBox> allBoxes = ExpressionHelper.getInstence().parseSql(condition);
		if (allBoxes.isEmpty())
			return null;
		int i = 0;
		ExpressBox box = allBoxes.get(i);
		Criterion c = getBoxCriterion(box);

		while (i < allBoxes.size() - 1) {
			i++;
			box = allBoxes.get(i);
			c = (Criterion) BeanUtils.invokeStaticMethod(Restrictions.class, allBoxes.get(i - 1).getBoxOperator()
					.getOperator(),
					new Object[] { c, getBoxCriterion(box) }, new Class[] { Criterion.class, Criterion.class });
		}
		return c;
	}

	private Criterion getCriterion(Express ex) throws Exception {
		ExpressEntity entity = ex.getExpress();
		return (Criterion) BeanUtils.invokeStaticMethod(Restrictions.class, entity.getOpName(),
				new Object[] { entity.getFieldName(), getDBTypeObject(entity) }, new Class[] { String.class,
						Object.class });
	}

	private Criterion getExpressCriterion(Express ex) throws Exception {
		if (ex.getExpress() == null)
			return null;

		Criterion c = getCriterion(ex);
		List<Criterion> opList = new ArrayList<Criterion>();
		opList.add(c);
		String strOp = ex.getOperator().trim();
		while ((ex = ex.getNextExpress()) != null) {
			Criterion next = getCriterion(ex);
			opList.add(next);
		}

		if (opList.size() > 1) {
			Criterion[] parameters = new Criterion[opList.size()];
			parameters = opList.toArray(parameters);
			c = (Criterion) BeanUtils.invokeStaticMethod(Restrictions.class, strOp, new Object[] { parameters },
					new Class[] { Criterion[].class });
		}

		return c;
	}

	private Criterion getBoxCriterion(ExpressBox box) throws Exception {
		ExpressBox child = box.getChildBox();
		if (child == null) {
			Criterion c = getExpressCriterion(box.getBoxExpress());
			while ((box = box.getNextBox()) != null) {
				Criterion chi = getBoxCriterion(box);
				if (chi != null)
					c = (Criterion) BeanUtils.invokeStaticMethod(Restrictions.class, box.getPreBox().getBoxOperator()
							.getOperator(),
							new Object[] { c, chi }, new Class[] { Criterion.class, Criterion.class });
			}
			return c;
		}

		return getBoxCriterion(child);
	}

	private Object getDBTypeObject(ExpressEntity entity) throws Exception {
		if ("id.sysRefNo".equalsIgnoreCase(entity.getFieldName())) {
			return entity.getFieldValue();
		} else if ("id.sysEventTimes".equalsIgnoreCase(entity.getFieldName())) {
			return Integer.parseInt(entity.getFieldValue());
		}
		Type type = getFieldType(entity.getFieldName());

		Class<?> clazz = type.getReturnedClass();

		Object obj = BeanUtils.getDBFiledValue(clazz, entity.getFieldValue());
		return obj;
	}

	private Type getFieldType(String fieldName) throws NoSuchFieldException, SecurityException {
		Assert.notNull(fieldName);
		fieldName = fieldName.trim();
		ClassMetadata meta = getSessionFactory().getClassMetadata(entityClass);
		Assert.notNull(meta, "Class " + entityClass + " not define in hibernate session factory.");
		Type t = meta.getPropertyType(fieldName);
		Assert.notNull(t, entityClass.getDeclaredField(fieldName).getName() + " has no such type define.");
		return t;
	}

	public Criterion createCriterion(Map condition) {
		return Restrictions.allEq(condition);
	}

	public Criteria createCriteria(Criterion... criterions) {
		Criteria criteria = getSession().createCriteria(entityClass);
		for (Criterion c : criterions) {
			criteria.add(c);
		}
		return criteria;
	}


	@Override
	public void setEntityClass(Class<T> entityClass) {
		this.entityClass = entityClass;
	}


	@Override
	public List find(String hql, Object... values) {
		Query query =  createQuery(hql,values);
		return query.list();
	}


	@Override
	public void update(Object o, List<String> list) {
		if (list == null || list.isEmpty()) {
			update(o);
			return;
		}
		T t = get(this.getId(entityClass, o));
		if (t == null)
			return;
		BeanUtils.copyProperties(o, t, list.toArray(new String[list.size()]));
		getSession().update(t);
	}

	@Override
	public Object excute(String hql, Object... values) {
		
 		Assert.hasText(hql);
		Query queryObject = this.createQuery(hql, values);
		
		return queryObject.executeUpdate();
		
	}


	@Override
	public Object excuteBatch(List<List<String>> updateList) throws Exception {
		if (updateList == null || updateList.isEmpty())
			return 0;
		Session session = getSessionFactory().getCurrentSession();
//		Transaction t = session.getTransaction();
//		t.begin();
		java.sql.Connection conn = SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
		Statement sm = conn.createStatement();
		try{
			for (List<String> list : updateList) {
				if (list == null || list.isEmpty())
					continue;
				sm.addBatch(list.remove(0));
			}
			int[] i = sm.executeBatch();
//			t.commit();
			conn.commit();
		}catch(Exception e){
			conn.rollback();
			throw e;
		}finally{
			if(conn!=null)
				conn.close();
			if(sm!=null)
				sm.close();
			
		}
		
		return 1;
	}

	@Override
	public void saveOrUpdate(Object o, List<String> list) {
		if (list == null || list.isEmpty()) {
			getSession().saveOrUpdate(o);
			return;
		}
		T t = get(this.getId(entityClass, o));
		if (t == null) {
			getSession().save(o);
			return;
		}
		BeanUtils.copyProperties(o, t, list.toArray(new String[list.size()]));
		getSession().update(t);
	}


	@Override
	public Object findSpecificField(IDaoEntity entity) {
		try {
			List<String> filedList = entity.getProcessList();
			String[] orderBy = entity.getOrderList().toArray(new String[0]);
			boolean isAsc = entity.isAscOrder();

			String condition = entity.getCondition();
			String alias = entity.getAlias();
			Page p = entity.getPage();
			
			List<String> distinctList = entity.getDistinctList();
			DetachedCriteria dc = DetachedCriteria.forClass(entityClass, alias);
			ProjectionList pList = Projections.projectionList();
			if(distinctList!=null&&!distinctList.isEmpty()){
				for (String string : distinctList) {
					pList.add(Projections.distinct(Projections.property(alias + "." + string).as(string)));
				}
			}
			if(filedList!=null&&!filedList.isEmpty()){
				for (String fieldName : filedList) {
					pList.add(Projections.property(alias + "." + fieldName).as(fieldName));
				}
			}
			
			if (StringUtil.isTrimNotEmpty(condition)) {
				Criterion c = createCriterion(condition);
				if (c != null)
					dc.add(c);
			}
			if (orderBy != null && orderBy.length > 0) {
				for (int i = 0; i < orderBy.length; i++) {
					if (isAsc) {
						dc.addOrder(Order.asc(orderBy[i]));
					} else {
						dc.addOrder(Order.desc(orderBy[i]));
					}
				}
			}
			Criteria executableCriteria = dc.getExecutableCriteria(getSession()) ;
			if(pList.getLength()>0){
				executableCriteria.setProjection(pList);
			}else{
				executableCriteria = createCriteria();
				Criteria criteria = createCriteria();
				Criterion c = createCriterion(condition);
				if (c != null)
					criteria.add(c);
				if (orderBy != null && orderBy.length > 0) {
					for (int i = 0; i < orderBy.length; i++) {
						String string = orderBy[i];
						if (isAsc) {
							criteria.addOrder(Order.asc(string));
						} else {
							criteria.addOrder(Order.desc(string));
						}
					}
				}
				
				if(p==null){
					return criteria.list();
				}else{
					Object count = criteria.setProjection(Projections.rowCount()).uniqueResult();
					criteria.setProjection(null);
					if (p.getCurrentPageNo() >= 0) {
						criteria.setFirstResult(p.getStartNo());
					}
					if (p.getPageSize() > 0) {
						criteria.setMaxResults(p.getPageSize());
					}
					
					return new Page(p.getCurrentPageNo(),Integer.parseInt(count.toString()) , p.getPageSize(), criteria.list());
				}
				
			}
				
			if(p==null){
				dc.setResultTransformer(Transformers.aliasToBean(entityClass));
				return executableCriteria.list();
			}else{
				Object count = 0;
				if (distinctList.isEmpty()) {
					count = executableCriteria.setProjection(Projections.rowCount()).uniqueResult();
				} else {
					count = executableCriteria.setProjection(Projections.countDistinct(distinctList.get(0))).uniqueResult();
				}
				
				if (p.getCurrentPageNo() >= 0) {
					executableCriteria.setFirstResult(p.getStartNo());
				}
				if (p.getPageSize() > 0) {
					executableCriteria.setMaxResults(p.getPageSize());
				}
				executableCriteria.setProjection(pList);
				dc.setResultTransformer(Transformers.aliasToBean(entityClass));
				return new Page(p.getCurrentPageNo(),Integer.parseInt(count.toString()) , p.getPageSize(), executableCriteria.list());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

//	@Override
//	public List<T> find(String condition, String[] orderBy, boolean isAsc) {
//		return (List<T>) find(condition, orderBy, isAsc,null);
//	}

	@Override
	public Object selectFor(String hql, Object... values) {
		Query query =  createQuery(hql,values);
		query.setLockOptions(LockOptions.UPGRADE);
		return query.list();
	}

	@Override
	public Object findByHql(IDaoEntity entity) {
		try {
			Page p = entity.getPage();
			if(p==null){
				Query query = createQuery(entity.getHql(),entity.getParaList().toArray());
				return query.list();
			}else{
				Object count = 0;
				String countQuery = "select count(*) from "+entity.getTableName()+" where "+ entity.getCondition();
				count = createQuery(countQuery, entity.getParaList().toArray()).uniqueResult();
				int intCount = 0;
				if(count!=null){
					Long l =Long.parseLong(count.toString());
					intCount= l.intValue();
				}
				
				int size = p.getPageSize();
				int start = p.getStartNo();
				int max = (start+1)*size<intCount?(start+1)*size:intCount;
				int min = start*size;
				
				Query query = createQuery(entity.getHql(),entity.getParaList().toArray());
				query.setMaxResults(max);
				query.setFirstResult(min);
				
				return new Page(p.getCurrentPageNo(),Integer.parseInt(count.toString()) , p.getPageSize(), query.list());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public Object findBySql(IDaoEntity entity) {
		final String sql =entity.getHql();
		final String condition = entity.getCondition();
		final String table = entity.getTableName();
		final Page p = entity.getPage();
		final List<String> distinctList = entity.getDistinctList();
		Session session = getSessionFactory().openSession();
		try{
			session.beginTransaction();
			Object retObj = session.doReturningWork(new ReturningWork<T>() {

				@Override
				public T execute(Connection connection) throws SQLException {
					
					PreparedStatement stmt = null;
					ResultSet rs = null;
					StringBuffer buff = new StringBuffer();
					try{
						if(p==null){
							return (T) excuteWithoutPage(stmt,connection);
						}else{
							return (T) excuteWithPage(stmt,connection);
						}
					}catch(SQLException e){
						connection.rollback();
						System.err.println("SQL:"+buff.toString());
						e.printStackTrace();
					}finally{
						try {
							if (rs != null)
								rs.close();
						} catch (Exception e) {
						}
						try {
							if (stmt != null)
								stmt.close();
						} catch (Exception e) {
						}
						try {
							if (connection != null)
								connection.close();
						} catch (Exception e) {
						}
						stmt = null;
						rs = null;
						connection = null;
					}
					return null;
				}
				
				private int getCount(Connection connection) throws SQLException{
					PreparedStatement stmt = null;
					ResultSet rs = null;
					StringBuffer countSql = new StringBuffer();
					try{
						if(distinctList.isEmpty()){
							countSql.append("select count(*) as count from ")
							.append(condition);
						}else{
							countSql.append("select count(distinct ").append(getDistinctSql()).append(") as count from ")
							.append(condition);
						}
						
						stmt = connection.prepareStatement(countSql.toString());
						rs = stmt.executeQuery();
						ResultSetMetaData rsmd = rs.getMetaData();
						int retCount = 0;
						int count = 1;
						while (rs.next()) {
							for (int i = 1; i <= count; i++) {
								retCount = rs.getInt(i);
								break;
							}
							break;
						}
						connection.commit();
						System.out.println("SQL:"+countSql.toString());
						return retCount;
					}catch(SQLException e){
						connection.rollback();
						System.err.println("SQL:"+countSql.toString());
						e.printStackTrace();
						throw e;
					}finally{
						try {
							if (rs != null)
								rs.close();
						} catch (Exception e) {
						}
						try {
							if (stmt != null)
								stmt.close();
						} catch (Exception e) {
						}
						stmt = null;
						rs = null;
					}
				}
				
				private Object excuteWithPage(PreparedStatement stmt,Connection connection) throws SQLException{
					ResultSet rs =null;
					try{
						int total = getCount(connection);
						StringBuffer buff= new StringBuffer();
						// ORACLE 版本
						if(distinctList.isEmpty()){
							buff.append(" select * from ( select row_.*, rownum rownum_ from (").append(sql ).append(") row_ ) where rownum_ <= ").append(p.getStartNo()+p.getPageSize())
							.append(" and rownum_ > ").append(p.getStartNo());
						}else{
							buff.append(" select * from ( select row_.*, rownum rownum_ from (").append(sql ).append(") row_ ) where rownum_ <= ").append(p.getStartNo()+p.getPageSize())
							.append(" and rownum_ > ").append(p.getStartNo());
						}
						//mysql 版本使用
//						buff.append(sql).append(" LIMIT ").append(p.getStartNo()).append(",").append(p.getPageSize());
						stmt = connection.prepareStatement(buff.toString());
//						stmt.setInt(1,(p.getStartNo()+1)*p.getPageSize());
//						stmt.setInt(2,p.getStartNo()*p.getPageSize());
						rs = stmt.executeQuery();
						ResultSetMetaData rsmd = rs.getMetaData();
						int count = rsmd.getColumnCount();
						List<Object> retList =new ArrayList<Object>();
						while (rs.next()) {
							Object [] obj = new Object[count];
							for (int i = 1; i <= count; i++) {
								obj[i-1] =  rs.getObject(i);
							}
							retList.add(obj);
						}
						connection.commit();
						System.out.println("SQL:"+buff.toString());
						return (T)new Page(p.getCurrentPageNo(),total,p.getPageSize(),retList);
					}finally{
						if(rs!=null)
						rs.close();
						rs = null;
					}
					
				}
				
				private Object excuteWithoutPage(PreparedStatement stmt, Connection connection) throws SQLException {
					ResultSet rs = null;
					try {
						stmt = connection.prepareStatement(sql);
						rs = stmt.executeQuery();
						ResultSetMetaData rsmd = rs.getMetaData();
						int count = rsmd.getColumnCount();
						List<Object> retList = new ArrayList<Object>();
						while (rs.next()) {
							Object[] obj = new Object[count];
							for (int i = 1; i <= count; i++) {
								obj[i - 1] = rs.getObject(i);
							}
							retList.add(obj);
						}
						connection.commit();
						System.out.println("SQL:" + sql.toString());
						return (T) retList;

					} finally {
						if(rs!=null)
						rs.close();
						rs = null;
					}

				}
				
				private String getDistinctSql(){
//					StringBuffer buff = new StringBuffer();
//					if(distinctList.isEmpty()){
//						countSql.append("select count (*) as count from ")
//						.append(table).append(" where ").append(condition);
//					}else{
//					
//						countSql.append("select count (distinct ").append(strField).append(") as count from ")
//						.append(table).append(" where ").append(condition);
//					}
					StringBuffer strField = new StringBuffer();
					for (String string : distinctList) {
						strField.append(string).append(",");
					}
//					for (String string : fieldList) {
//						strField.append(string).append(",");
//					}
					
					if(strField.length()>0){
						strField = strField.delete(strField.length()-1, strField.length());
					}
					return strField.toString();
				}
				
				
			});
			return retObj;
		}catch(Exception e){
			e.printStackTrace();
		}finally{
		}
		return null;
	}
	
	
	@Override
	public void executeOrentSql(String sql) {
		
		java.sql.Connection conn = null;
		Statement sm = null;
		
		try{
			conn = SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
			sm = conn.createStatement();
			sm.execute(sql);
			conn.commit();
			conn.close();
			sm.close();
		} catch(Exception e){
			System.out.println(e.getLocalizedMessage());
		} finally {
			try {
				conn.close();
				sm.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
	}
   
	@Override
	public List<Map<String, Object>> executeOrentSql(String sql, String[] cols) {
		
		List<Map<String,Object>> result = new ArrayList<Map<String, Object>>();
		
		int count = cols.length;
		
		java.sql.Connection conn = null;
		
		PreparedStatement stmt;
		ResultSet         rs;
		try {
			conn = SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
			stmt = conn.prepareStatement(sql);
			rs   = stmt.executeQuery();
			
			Map<String, Object> xMap = null;
			
			while (rs.next()) {
				
				xMap = new HashMap<String, Object>();
				
				for (int i = 0; i < count; i++) {
					xMap.put(cols[i], rs.getObject(cols[i]));
				}
				result.add(xMap);
			}
			
			conn.close();
			stmt.close();
			rs.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		
		return result;
	}
	
	@Override
	public List<Object> executeForList(String sql, String col) {
		
		List<Object> result = new ArrayList<Object>();
		
		java.sql.Connection conn = null;
		
		PreparedStatement stmt;
		ResultSet         rs;
		try {
			conn = SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
			stmt = conn.prepareStatement(sql);
			rs   = stmt.executeQuery();
			
			while (rs.next()) {
				result.add(rs.getObject(col));
			}
			
			conn.close();
			stmt.close();
			rs.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		} 
		
		return result;
	}

	@Override
	public Object excute(IDaoEntity entity) {
		Assert.hasText(entity.getHql());
		
		List<Object> para =  entity.getParaList();
		Object [] objs = para.toArray(new Object [para.size()]);
		Query queryObject = this.createQuery(entity.getHql(),objs);

		return queryObject.executeUpdate();
	}

	@Override
	public Object excuteJdbc(String sql, Object... values) {
		Assert.hasText(sql);
		final Object[] paraList = values;
		Session session = null;
		Transaction t = null;
		java.sql.Connection conn = null;
		PreparedStatement sm = null;
		try {
			session = getSessionFactory().openSession();
//			session.beginTransaction();
			t = session.getTransaction();
			t.begin();
			conn = SessionFactoryUtils.getDataSource(getSessionFactory()).getConnection();
			sm = conn.prepareStatement(sql.toString());
			try {
				for (int i = 0; i < paraList.length; i++) {
					sm.setObject(i+1, paraList[i]);
				}
				boolean i = sm.execute();
				t.commit();
				return i;
			} catch (Exception e) {
				logger.error(ErrorUtil.getErrorStackTrace(e));
				throw e;
			} finally {
				
			}
		} catch (Exception e) {
			logger.error(ErrorUtil.getErrorStackTrace(e));
		} finally {
			if(session!=null)
				session.close();
			if (conn != null)
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			if (sm != null)
				try {
					sm.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}
		return null;
	}
}

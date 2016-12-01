package com.ut.scf.dao;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Map;

/**
 * @author
 * 
 *         提供dao的所有操作,
 *         实现类由spring注入HibernateEntityDao和HibernateEntityExtendDao来实现
 *         最大限度的解耦hibernate持久层的操作
 */

public interface IBaseDao<T> {

	public void setEntityClass(Class<T> entityClass);

	/**
	 * 根据ID获取对象.
	 * 
	 * @see HibernateGenericDao#getId(Class,Object)
	 */
	public T get(Serializable id);

	/**
	 * 根据ID移除对象.
	 * 
	 * @see HibernateGenericDao#removeById(Class,Serializable)
	 */
	public void removeById(Serializable id);

	/**
	 * 根据属性名和属性值查询对象.
	 * 
	 * @return 符合条件的对象列表
	 * @see HibernateGenericDao#findBy(Class,String,Object)
	 */
	public List<T> findBy(String propertyName, Object value);

	/**
	 * 物理删除对象
	 * @param entity
	 */
	public void delete(T entity);

	/**
	 * 保存对象.
	 */
	public void save(Object o);
	
	/**
	 * 保存对象指定属性.
	 */
	public void update(Object o,List<String> list);
	
	/**
	 * 保存对象指定属性.
	 */
	public void saveOrUpdate(Object o,List<String> list);
	/**
	 * 根据hql查询,直接使用HibernateTemplate的find函数.
	 *
	 * @param values
	 *            可变参数,见{@link #createQuery(String,Object...)}
	 */
	@SuppressWarnings("unchecked")
	public List<T> find(String hql, Object... values);
	
	@SuppressWarnings("unchecked")
	public Serializable getId(Class entityClass, Object entity) throws NoSuchMethodException, IllegalAccessException,
			InvocationTargetException;

	/**
	 * 取得对象的主键名,辅助函数.
	 */
	@SuppressWarnings("unchecked")
	public String getIdName(Class clazz);
	
	@SuppressWarnings("unchecked")
	public Object getIdType(Class clazz);
	
	public Object findSpecificField(IDaoEntity entity);
	
	public Object excute(String hsl, Object... values);
	
    public Object excute(IDaoEntity entity);
	
	public Object excuteJdbc(String hsl, Object... values);
	
	public Object excuteBatch(List<List<String>> updateList) throws Exception;
	
	public Object selectFor(String hql,Object ...values);
	
    public Object findByHql(IDaoEntity entity);

    public Object findBySql(IDaoEntity entity);
    
    /*
     * added by zhangyilei 2015-12-01
     */
    public void executeOrentSql(String sql);
    public List<Map<String, Object>> executeOrentSql(String sql, String[] cols);
    public List<Object> executeForList(String sql, String col);
    
}

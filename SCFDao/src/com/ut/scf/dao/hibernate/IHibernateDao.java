package com.ut.scf.dao.hibernate;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;

import com.ut.scf.dao.IBaseDao;

public interface IHibernateDao<T> extends IBaseDao<T>{
	 /**
     * 取得Entity的Criteria.
     * 
     * @see HibernateGenericDao#createCriteria(Class,Criterion[])
     */
    public Criteria createCriteria(Criterion... criterions);
    
    /**
     * 创建Query对象. 对于需要first,max,fetchsize,cache,cacheRegion等诸多设置的函数,可以在返回Query后自行设置.
     * 留意可以连续设置,如下：
     * <pre>
     * dao.getQuery(hql).setMaxResult(100).setCacheable(true).list();
     * </pre>
     * 调用方式如下：
     * <pre>
     *        dao.createQuery(hql)
     *        dao.createQuery(hql,arg0);
     *        dao.createQuery(hql,arg0,arg1);
     *        dao.createQuery(hql,new Object[arg0,arg1,arg2])
     * </pre>
     *
     * @param values 可变参数.
     */
    public Query createQuery(String hql, Object... values);
    
    /**
     * 创建Criteria对象.
     *
     * @param criterions 可变的Restrictions条件列表,见{@link #createQuery(String,Object...)}
     */
    
    /**
     * 更新对象.
     *
     * @see #update(Object)
     */
    
    public void update(Object o);

}

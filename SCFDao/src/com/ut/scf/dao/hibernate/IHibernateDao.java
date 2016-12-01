package com.ut.scf.dao.hibernate;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Criterion;

import com.ut.scf.dao.IBaseDao;

public interface IHibernateDao<T> extends IBaseDao<T>{
	 /**
     * ȡ��Entity��Criteria.
     * 
     * @see HibernateGenericDao#createCriteria(Class,Criterion[])
     */
    public Criteria createCriteria(Criterion... criterions);
    
    /**
     * ����Query����. ������Ҫfirst,max,fetchsize,cache,cacheRegion��������õĺ���,�����ڷ���Query����������.
     * ���������������,���£�
     * <pre>
     * dao.getQuery(hql).setMaxResult(100).setCacheable(true).list();
     * </pre>
     * ���÷�ʽ���£�
     * <pre>
     *        dao.createQuery(hql)
     *        dao.createQuery(hql,arg0);
     *        dao.createQuery(hql,arg0,arg1);
     *        dao.createQuery(hql,new Object[arg0,arg1,arg2])
     * </pre>
     *
     * @param values �ɱ����.
     */
    public Query createQuery(String hql, Object... values);
    
    /**
     * ����Criteria����.
     *
     * @param criterions �ɱ��Restrictions�����б�,��{@link #createQuery(String,Object...)}
     */
    
    /**
     * ���¶���.
     *
     * @see #update(Object)
     */
    
    public void update(Object o);

}

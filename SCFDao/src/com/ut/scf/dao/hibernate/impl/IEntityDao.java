package com.ut.scf.dao.hibernate.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.type.Type;

/**
 * 针对单个Entity对象的操作定义.不依赖于具体ORM实现方案.
 *
 * @author springside
 *
 */
public interface IEntityDao<T> {
	T get(Serializable id);

	List<T> getAll();

	void save(Object o);

	void remove(Object o);

	void removeById(Serializable id);

	/**
	 * 获取Entity对象的主键名.
	 */
	@SuppressWarnings("unchecked")
	String getIdName(Class clazz);
	
	/**
	 * 获取Entity对象的主键类型，复合主键.
	 */
	Type getIdType(Class clazz);
}
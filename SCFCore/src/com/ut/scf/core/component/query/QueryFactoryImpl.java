package com.ut.scf.core.component.query;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.ut.comm.xml.query.QueryNode;
import com.ut.scf.core.utils.ClassLoadHelper;

@Component("queryFactory")
public class QueryFactoryImpl implements IQueryFactory{
	@Resource(name = "entityQuery")
	protected IQueryComponent entityQuery;
	
	@Resource(name = "hqlQuery")
	protected IQueryComponent hqlQuery;
	
	public IQueryComponent getProcessor(QueryNode node){
		String strQueryType = node.getType();
		if("E".equalsIgnoreCase(strQueryType)){
			return entityQuery;
		}else if("S".equalsIgnoreCase(strQueryType)){
			return hqlQuery;
		}else if("J".equalsIgnoreCase(strQueryType)){
			return hqlQuery;
		}else if("C".equalsIgnoreCase(strQueryType)){
			try {
				return ClassLoadHelper.getQueryProcessor(node.getComponent());
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		Assert.isTrue(false, "Can not instance Query processor.");
		return null;
	}
}

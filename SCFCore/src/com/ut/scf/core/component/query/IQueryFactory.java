package com.ut.scf.core.component.query;

import com.ut.comm.xml.query.QueryNode;

public interface IQueryFactory {
	public IQueryComponent getProcessor(QueryNode node);
}

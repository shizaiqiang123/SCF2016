package com.ut.scf.core.component.query;

import org.springframework.stereotype.Component;

import com.ut.scf.core.data.FuncDataObj;
/**
 * @see 根据class 配置，实现自定义的查询
 * @author PanHao
 *
 */
@Component("queryInvoiceList")
public class QueryInvoiceList implements IQueryComponent{

	@Override
	public FuncDataObj queryData(FuncDataObj logicObj) {
		FuncDataObj retObj = new FuncDataObj();
		return retObj;
	}

}

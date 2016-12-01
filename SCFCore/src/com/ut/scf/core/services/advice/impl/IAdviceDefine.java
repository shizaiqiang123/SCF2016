package com.ut.scf.core.services.advice.impl;

/**
 * @see 通知定义接口，用来定义Advice Header表信息
 * @author PanHao
 *
 */
interface IAdviceDefine {
	public String ADVICE_DEFINE_OP_TYPE_ADD = "add";
	public String ADVICE_DEFINE_OP_TYPE_EDIT = "edit";
	public String ADVICE_DEFINE_OP_TYPE_DELETE = "delete";
	public String ADVICE_DEFINE_OP_TYPE_ACTIVED = "active";
	public String ADVICE_DEFINE_OP_TYPE_INACTIVED = "inactive";
	
	Object defineAdvice(Object definition,Object msg);
	
	Object getAdviceDefinition(Object definition);
}

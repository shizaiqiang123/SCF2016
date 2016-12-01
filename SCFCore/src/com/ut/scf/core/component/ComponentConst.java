package com.ut.scf.core.component;

public class ComponentConst {
	//定义业务组件的返回对象属性名和属性值
	public static final String BUSI_COMP_RESULT_NAME = "reuslt";//属性名
	public static final String BUSI_COMP_RESULT_VALUE_SUCC = "success";//处理成功的属性值
	public static final String BUSI_COMP_RESULT_VALUE_FAIL = "failed";//处理失败但是不需要中断操作的失败属性值
	public static final String BUSI_COMP_RESULT_VALUE_EXCEPTION = "exception";//处理异常，需要中断操作的失败属性值
	
	
	//定义交易类型
	public static final String COMP_TRX_TYPE_QUERY = "query";//查询交易
	public static final String COMP_TRX_TYPE_SUBMIT = "submit";//提交交易
	public static final String COMP_TRX_TYPE_CANCEL = "cancel";//取消交易
	
	//定义主控组件返回对象属性
//	public static final String MAIN_COMP_RETURN_QUERY_ROOT = "records";
//	public static final String MAIN_COMP_RETURN_SUBMIT_ROOT = "root";
//	
//	public static final String MAIN_COMP_RETURN_QUERY_TIER_TWO = "record";
//	public static final String MAIN_COMP_RETURN_SUBMIT_TIER_TWO = "record";//待定义
//	
	//定义 Function类型
	public static final String COMP_FUNC_TYPE_MASTER = "MM";//Master Manager 交易
	public static final String COMP_FUNC_TYPE_PENDING = "PM";//Pending Manager 交易
	public static final String COMP_FUNC_TYPE_RELEASE = "RE";//Release Manager 交易
	public static final String COMP_FUNC_TYPE_FIX_PENDING = "FP";//Fix Pending Manager  修改在途交易
	public static final String COMP_FUNC_TYPE_DEL_PENDING = "DP"; //Del Pending Manager 删除在途交易
	public static final String COMP_FUNC_TYPE_REJECT = "RJ"; //Del Pending Manager 拒绝
	public static final String COMP_FUNC_TYPE_EC = "EC";//EC Manager  回滚交易??
	public static final String COMP_FUNC_TYPE_AJAX = "AX";//Ajax请求交易
	public static final String COMP_FUNC_TYPE_VIEW_HISTORY = "VH";//请求交易历史
	public static final String COMP_FUNC_TYPE_VIEW = "VW";//查询交易
	public static final String COMP_FUNC_TYPE_CATALOG = "CA";//catalog请求交易
	public static final String COMP_FUNC_TYPE_MANAGE = "MA";//manager catalog请求交易
	public static final String COMP_FUNC_TYPE_PARAMETER = "PA";//manager catalog请求交易
	public static final String COMP_FUNC_TYPE_UNLOCK = "UL";//manager catalog请求交易
	public static final String COMP_FUNC_TYPE_ROLLBACK = "RB";//rollback Manager  回滚交易
	public static final String COMP_FUNC_TYPE_MUTI = "MR";//rollback Manager  回滚交易
	public static final String COMP_FUNC_TYPE_REFUSE = "RF";//refuse Manager  拒绝交易
	
	public static final String COMP_PAGE_TYPE_ADD = "ADD";//ADD 交易
	public static final String COMP_PAGE_TYPE_EDIT = "EDIT";//EIDT 交易
	public static final String COMP_PAGE_TYPE_DELETE = "DELETE";//DELETE 交易
	public static final String COMP_PAGE_TYPE_ROLLBACK = "ROLLBACK";//DELETE 交易
	public static final String COMP_PAGE_TYPE_VIEW = "VIEW";//DELETE 交易
	public static final String COMP_PAGE_TYPE_UNLOCK = "UNLOCK";//DELETE 交易
	public static final String COMP_PAGE_TYPE_DELPENDING = "DELP";
	
	public static final String COMP_PAGE_TYPE_PARA_ADD = "PARAADD";//DELETE 交易
	public static final String COMP_PAGE_TYPE_PARA_EDIT = "PARAEDIT";//DELETE 交易
	public static final String COMP_PAGE_TYPE_PARA_DELETE = "PARADELETE";//DELETE 交易
	public static final String COMP_PAGE_TYPE_PARA_LOCK = "PARALOCK";//DELETE 交易
	
	public static final String COMP_PAGE_TYPE_ACCOUNTING = "ACCOUNTING";//ACCOUNTING 交易
	public static final String COMP_PAGE_TYPE_LIMITS = "LIMITS";//ACCOUNTING 交易
	
	public static final String LOGIC_FLOW_TYPE_POST = "P";//Ajax请求交易
	public static final String LOGIC_FLOW_TYPE_QUERY = "Q";//Ajax请求交易
	
	public static final String SERVICE_TYPE_MASTER = "M";//当前交易将处于M档，M档服务触发
	public static final String SERVICE_TYPE_PENDING = "P";//当前交易将处于P档，P档服务触发
	public static final String SERVICE_TYPE_SAVE = "S";//当前交易将处于S档，不触发服务
	public static final String SERVICE_TYPE_REJECT = "R";//当前交易将处于R档，不触发服务
}

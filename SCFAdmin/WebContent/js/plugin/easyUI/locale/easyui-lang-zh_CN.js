if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = '第';
	$.fn.pagination.defaults.afterPageText = '共{pages}页';
	$.fn.pagination.defaults.displayMsg = '显示{from}到{to},共{total}记录';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = '正在处理，请稍待。。。';
	$.fn.datagrid.defaults.searchpromt = '请输入筛选的值...';
	$.fn.datagrid.defaults.notexport = "没有获取到数据,则不执行导出!";
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = '确定';
	$.messager.defaults.cancel = '取消';
}
if ($.fn.validatebox){
	$.fn.validatebox.defaults.missingMessage = '该输入项为必输项';
	$.fn.validatebox.defaults.rules.email.message = '请输入有效的电子邮件地址';
	$.fn.validatebox.defaults.rules.url.message = '请输入有效的URL地址';
	$.fn.validatebox.defaults.rules.length.message = '输入内容长度必须介于{0}和{1}之间,注意：一个中文字占2个字符';
	$.fn.validatebox.defaults.rules.remote.message = '后台检查该栏位输入有误';
}
if ($.fn.textbox){
	$.fn.textbox.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.numberbox){
	$.fn.numberbox.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.combobox){
	$.fn.combobox.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.combotree){
	$.fn.combotree.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.combogrid){
	$.fn.combogrid.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.numberspinner){
	$.fn.numberspinner.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.lookup){
	$.fn.lookup.defaults.missingMessage = '该输入项为必输项';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ['日','一','二','三','四','五','六'];
	$.fn.calendar.defaults.months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = '今天';
	$.fn.datebox.defaults.closeText = '关闭';
	$.fn.datebox.defaults.okText = '确定';
	$.fn.datebox.defaults.clearText = '清除';
	$.fn.datebox.defaults.missingMessage = '该输入项为必输项';
	$.fn.datebox.defaults.formatter = function(date){
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
	};
	$.fn.datebox.defaults.parser = function(s){
		if (!s) return new Date();
		var ss = s.split('-');
		var y = parseInt(ss[0],10);
		var m = parseInt(ss[1],10);
		var d = parseInt(ss[2],10);
		if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
			return new Date(y,m-1,d);
		} else {
			return $.fn.calendar.defaults.current;
		}
	};
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText,
		missingMessage: $.fn.datebox.defaults.missingMessage
	});
}

window['LOCALE'] = {

   FLOW : {
      APR : '待复核',
      MOD : '-待修改',
      FORM : '-表单'
   },
   BTN : {
		INTO: "进入",
		NEW: "新增",
		MOD: "修改",
		DEL: "删除",
		QRY: "查询",
		APR: "审核",
		HOME : '主页',
		SAVE : '提交保存',
		OK:'确定',
		CANCEL : '取消',
		CLOSE:'关闭',
		HOME : '主页',
		BACK : '返回'
   },
   
   TTL : {
  		TTL_WARN : "警告",
    	TTL_ALERT : "消息提示窗口",
    	TTL_CONFIRM : "确认窗口",
    	TTL_ERROR : '错误提示窗口',
    	TTL_SUBMIT_RESULT: '操作结果提示',  
    	TTL_MAINPAGE : '主页'  
   },
   
   MSG : {

        MSG_DELETE_NOT_ALLOW : '该数据不允许删除',
    	MSG_SUBMITINGMSGTITL:'正在提交数据,请稍候...',
       	MSG_LOADING : '正在加载中，请稍候...',
       	MSG_LOADFAIL : '数据加载失败！',
       	MSG_PAGELOADFAIL : '页面加载失败！',
       	MSG_AJAXFAIL : '数据加载失败(网络错误)',
    	MSG_SUBMIT_VALID_FAIL_MSG : '页面栏位输入有错误，不能提交保存，详情请看栏位上之提示！',
    	MSG_CONFIRM_DELETE : '是否确定删除该笔数据？',
    	MSG_SUBMIT_FAIL : '数据提交失败！',
    	MSG_MUST_SELECT_A_RECORD : "请选择一条数据再执行此操作！",
    	MSG_MUST_SELECT_AT_LEAST_ONE_ITEM : "请至少选择一个选项！",
    	MSG_SURE_LOSE_MODIFY : '页面设置有修改且未保存，是否不保存则关闭该页?',
    	MSG_SYS_DATA_ERROR : '数据发生异常!',
    	MSG_OPERATE_SUCCESS : '操作成功!',
    	MSG_DATA_WAIT_CHECK_NO_MODIFY :  '该数据已在流程中，不能修改！',
    	MSG_DATA_VALID_FAIL : '您填写的数据不符合要求!',
    	MSG_MSUT_BE_NUMBER : '该栏位只能输入数字',
    	MSG_DATA_OVERFLOW : '您填写的数据已经超过最大可用余额',
    	MSG_SYSTEM_BIZY : '系统繁忙，请稍候再试。',
    	MSG_INPUT_OVERFLOW : '您输入的数据超过最大值',
    	MSG_MUST_SELECT_A_RECORD :  "请选择一条纪录后，再执行此操作！",
    	MSG_DATA_NOT_EXISTS : '数据不存在或者被删除！',
    	MSG_JS_ERROR : 'JS程序错误',
        MSG_CONFIG_ERROR_FOR_URL : '参数配置错误: 无法根据配置生成url',
        MSG_VALID_PENDING : '正在验证[{0}]的有效性，请稍候再提交...',
	    MSG_VALID_SYS_ERROR : '无法验证[{0}]的有效性(程序错误)',
	    MSG_VALID_AJAX_ERROR : '无法验证[{0}]的有效性(网络错误)'
   } 
};
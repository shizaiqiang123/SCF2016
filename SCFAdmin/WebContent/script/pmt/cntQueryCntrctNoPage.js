function ignoreToolBar() {

}
function pageLoad(win) {
	var selId = win.getData("selId");
	if (SCFUtils.isEmpty(selId)) {
		selId = "";
	}
	$('#selId').val(selId);

	var cntrctNo = win.getData("cntrctNo");
	if (SCFUtils.isEmpty(cntrctNo)) {
		cntrctNo = "";
	}
	$('#cntrctNo').val(cntrctNo);

	var loanId = win.getData("loanId");
	if (SCFUtils.isEmpty(loanId)) {
		loanId = "";
	}
	$('#loanId').val(loanId);

	var data = {
		'selId' : selId,
		'cntrctNo' : cntrctNo,
		'sysRefNo' : loanId
	};
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable(data);
	SCFUtils.repalcePH("");
}

//重置
function onResetBtnClick() {
	$('#loanId').val("");
}

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

//能否直接传target
function doSave(win) {
	var row = $('#dg').datagrid('getSelected');
	var target = win.getData('callback');
	target(row);
	win.close();
}

function ajaxTable(data) {
	//加载表格
	$('#dg').datagrid({
		url : SCFUtils.AJAXURL,
		queryParams : data,
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,//只选一行
		pagination : true,//是否分页
		fitColumns : true,//列自适应表格宽度
		striped : true,//当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			alert('数据加载失败!');
		},
		onLoadSuccess : function(data) {
		},
		columns : [ [ {
			field : 'id',
			checkbox : 'true',
			width : 20
		}, {
			field : 'sysRefNo',
			title : '融资编号',
			width : 40
		}, {
			field : 'cntrctNo',
			title : '授信额度编号',
			width : 40
		}, {
			field : 'selNm',
			title : '授信客户名称',
			width : 40,
			hidden : true
		}, {
			field : 'busiTp',
			title : '业务类型',
			width : 40,
			formatter : busiTypeFormater
		}, {
			field : 'ccy',
			title : '币别',
			width : 40
		}, {
			field : 'trxDt',
			title : '交易日期',
			width : 40,
			formatter : dateFormater
		} ] ]
	});
}

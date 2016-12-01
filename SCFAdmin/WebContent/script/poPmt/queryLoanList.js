function ignoreToolBar() {

}
function pageLoad(win) {
	var sysRefNo = win.getData("sysRefNo");
	//修改页面进入时，该字段未定义 导致查询数据失败
	if (SCFUtils.isEmpty(sysRefNo)) {
		sysRefNo = "";
	}
	$('#sysRefNo').val(sysRefNo);

	var buyerId = win.getData("buyerId");
	$('#buyerId').val(buyerId);
	var selId = win.getData("selId");
	$('#selId').val(selId);
	var cntrctNo = win.getData("cntrctNo");
	$('#cntrctNo').val(cntrctNo);

	var data = {
		'sysRefNo' : sysRefNo,
		'buyerId' : buyerId,
		'selId' : selId,
		'cntrctNo' : cntrctNo
	};
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable(data);
	SCFUtils.repalcePH("");
}

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

//重置
function onResetBtnClick() {
	$('#sysRefNo').val("");
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
			width : '14.28%'
		}, {
			field : 'ttlLoanAmt',
			title : '融资金额',
			width : '14.28%',
			formatter : ccyFormater
		}, {
			field : 'ttlLoanBal',
			title : '融资余额',
			width : 40,
			hidden : true
		}, {
			field : 'ttlLoanBalHD',
			title : '融资余额',
			width : 40,
			hidden : true
		}, {
			field : 'initMarginPct',
			title : '初始保证金比例',
			width : 40,
			hidden : true
		}, {
			field : 'loanValDt',
			title : '融资开始日期',
			width : '14.28%',
			formatter : dateFormater
		}, {
			field : 'loanDueDt',
			title : '融资结束日期',
			width : '14.28%',
			formatter : dateFormater
		}, {
			field : 'payBailAcno',
			title : '追加保证金账号',
			width : '14.28%'
		}, {
			field : 'marginAmt',
			title : '初始保证金金额',
			width : '14.28%',
			formatter : ccyFormater
		}, {
			field : 'marginBal',
			title : '追加保证金金额',
			width : '14.28%',
			formatter : ccyFormater
		} ] ]
	});
}
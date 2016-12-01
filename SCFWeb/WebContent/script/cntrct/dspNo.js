function ignoreToolBar(){
	
}

function pageLoad(win) {
	var notifyBy = win.getData("notifyBy");
	// 修改页面进入时，该字段未定义 导致查询数据失败
	if (SCFUtils.isEmpty(notifyBy)) {
		notifyBy = "";
	}
	$('#notifyBy').val(notifyBy);
	var selNm = win.getData("selNm");
	if (SCFUtils.isEmpty(selNm)) {
		selNm = "";
	}
	$('#selNm').val(selNm);
	var data = {
		'notifyBy' : notifyBy,
		'selNm' : selNm
	};
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable(data);
	SCFUtils.repalcePH("");

}

// 重置
function onResetBtnClick() {
	$('#notifyBy').val("");
	$('#selNm').val("");
}

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

// 能否直接传target
function doSave(win) {
	var row = $('#dg').datagrid('getSelected');
	var target = win.getData('callback');
	target(row);
	win.close();
}

function ajaxTable(data) {
	// 加载表格
	$('#dg').datagrid({
		url : SCFUtils.AJAXURL,
		queryParams : data,
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
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
			title : '争议流水号',
			width : '33.33%'
		}, {
			field : 'notifyBy',
			title : '争议提出方',
			hidden : true,
			width : 40
		}, {
			field : 'selId',
			title : '授信客户编号',
			hidden : true,
			width : 40
		}, {
			field : 'ttlDspInvNo',
			title : '发票总份数',
			hidden : true,
			width : 40
		}, {
			field : 'ttlDspInvAmt',
			title : '发票争议总金额',
			hidden : true,
			width : 40
		}, {
			field : 'dspFlag',
			title : '争议标识',
			hidden : true,
			width : 40
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			hidden : true,
			width : 40
		}, {
			field : 'selNm',
			title : '授信客户名称',
			width : '33.33%'
		}, {
			field : 'busiTp',
			title : '业务类别',
			width : 60,
			formatter : busiTypeFormater,
			hidden : true
		}, {
			field : 'trxDt',
			title : '争议登记日期',
			width : '33.33%',
			formatter : dateFormater,
		} ] ]
	});
}

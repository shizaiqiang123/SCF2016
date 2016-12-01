function ignoreToolBar() {

}
function pageLoad(win) {
	var selId = win.getData("selId");
	if (SCFUtils.isEmpty(selId)) {
		selId = "";
	}
	$('#selId').val(selId);
	var selNm = win.getData("selNm");
	if (SCFUtils.isEmpty(selNm)) {
		selNm = "";
	}
	$('#selNm').val(selNm);

	var cntrctNo = win.getData("cntrctNo");
	var data = {
		'cntrctNo' : cntrctNo,
		'selId' : selId,
		'selNm' : selNm
	};
	$.extend(data, {
		'queryId' : win.getData("queryId"),
		'cacheType' : 'non'
	});
	ajaxTable(data);
	SCFUtils.repalcePH("");
}

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	// 不需要缓存数据
	$.extend(data, {
		cacheType : 'non'
	});
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

// 重置
function onResetBtnClick() {
	$('#selId').val("");
	$('#selNm').val("");
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
			title : '协议关联流水号',
			width : '33.33%'
		}, {
			field : 'selId',
			title : '授信客户编号',
			width : '33.33%'
		}, {
			field : 'selNm',
			title : '授信客户名称',
			width : '33.33%'
		} ] ]
	});
}
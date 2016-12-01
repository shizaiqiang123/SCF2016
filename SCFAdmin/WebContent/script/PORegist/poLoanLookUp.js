function ignoreToolBar() {

}
function pageLoad(win) {
	var poNo = win.getData("poNo");
	$('#poNo').val(poNo);
	var data = SCFUtils.convertArray('searchForm');
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable(data);
	SCFUtils.repalcePH("");
}

function SearchPo() {
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
			SCFUtils.error('数据加载失败!');
		},
		onLoadSuccess : function(data) {
		},
		columns : getColumns()
	});
}

function getColumns() {
	return [ [ {
		field : 'ck',
		checkbox : 'true'
	}, {
		field : 'sysRefNo',
		title : '订单流水号',
		width : 80
	}, {
		field : 'poNo',
		title : '订单编号',
		width : 80
	}, {
		field : 'poCcy',
		title : '订单币别',
		width : 40
	}, {
		field : 'poAmt',
		title : '订单金额',
		width : 80,
		formatter : ccyFormat
	}, {
		field : 'poDueDt',
		title : '订单到期日',
		width : 80,
		formatter : dateFormat
	} ] ];
}

function dateFormat(value) {
	return SCFUtils.dateFormat(value, "yyyy-MM-dd");
}

function ccyFormat(value) {
	return SCFUtils.ccyFormatNoPre(value, '2');
}
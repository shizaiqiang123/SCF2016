function ignoreToolBar() {

}

function pageLoad(win) {
	var productId = win.getData("productId");
	$('#productId').val(productId);
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	var data = {
		'productId' : productId,
		'sysBusiUnit' : sysBusiUnit
	};
	//var data = SCFUtils.convertArray('searchForm');
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable(data);
	SCFUtils.repalcePH("");
}

function SearchProductInfo() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

//能否直接传target
function doSave(win) {
	//var selects = SCFUtils.getSelectedGridData('dg',false);
	var data = $('#dg').datagrid('getChecked');
	var target = win.getData('callback');
	target(data);
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
			field : 'productId',
			title : '产品编号',
			width : 40
		}, {
			field : 'productNm',
			title : '产品名称',
			width : 40
		} ] ]
	});
}
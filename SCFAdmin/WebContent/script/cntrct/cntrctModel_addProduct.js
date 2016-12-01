function pageOnInt() {
	SCFUtils.setTextReadonly("productId", true);
	SCFUtils.setTextReadonly("productNm", true);
}

//function searchCompanyInfo() {
//	var data = SCFUtils.convertArray('searchForm');
//	// 不需要缓存数据
//	$.extend(data, {
//		cacheType : 'non'
//	});
//	var queryParams = $('#dg').datagrid('options').queryParams;
//	$('#dg').datagrid('load', $.extend(queryParams, data));
//}

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
			field : 'ck',
			checkbox : true
		}, {
			field : 'productId',
			title : '产品编号',
			width : 200,
		}, {
			field : 'productNm',
			title : '产品名称',
			width : 200
		} ] ]
	});
}

function doSave(win) {
	var data = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}

function ignoreToolBar(){
	
}

function pageLoad(win) {
	var data = {};
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable(data);
	loadClick();
}

function loadClick() {
	var options = $('#dg').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck() {
	var data = $('#dg').datagrid('getChecked');// 获取所有当前加载的数据行
	$('#productId').val(data[0].productId);
	$('#productNm').val(data[0].productNm);
}

function ignoreToolBar() {

}
function pageLoad(win) {
	//var collatId = win.getData("collatId");
	//$('#collatId').val(collatId);
	var data = SCFUtils.convertArray('searchForm');
	$.extend(data, {
		'queryId' : win.getData("queryId"),
		cacheType : 'non'
	});
	ajaxTable(data);
}

function SearchRoleInfo() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

function onResetBtnClick() {
	$('#roleId').val("");
	$('#roleName').val("");
}

//能否直接传target
function doSave(win) {
	var selects = SCFUtils.getSelectedGridData('dg', false);
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
		singleSelect : false,//只选一行
		pagination : true,//是否分页
		fitColumns : true,//列自适应表格宽度
		striped : true,//当true时，单元格显示条纹
		idField : 'roleId',
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
			field : 'roleId',
			title : '角色编号',
			width : 40
		}, {
			field : 'roleName',
			title : '角色名称',
			width : 40
		}, {
			field : 'sysBusiUnit',
			title : '业务机构',
			width : 40
		} ] ]
	});
}
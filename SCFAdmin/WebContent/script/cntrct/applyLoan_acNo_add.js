function pageOnInt() {
//	SCFUtils.setTextReadonly("acno", true);
//	SCFUtils.setTextReadonly("acnm", true);
//	SCFUtils.setTextReadonly("acbknm", true);
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
			field : 'ck',
			checkbox : true
		}, {
			field : 'acNo',
			title : '放款户名',
			width : 200,
		}, {
			field : 'acNm',
			title : '放款账号',
			width : 200
		}, {
			field : 'acBkNm',
			title : '放款开户银行',
			width : 200,
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
	var row = win.getData("row");
	if ('del' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else {

	}
	var data = {
		'licenceNo' : row.licenceNo,
		'buyerId' : row.buyerId,
		cacheType : 'non'
	};
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
	$('#acnm').val(data[0].acNm);
	$('#acno').val(data[0].acNo);
	$('#acbknm').val(data[0].acBkNm);
}

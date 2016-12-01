function SearchPageInfo(){
	var data = SCFUtils.convertArray('searchForm');
	//不需要缓存数据
	$.extend(data,{cacheType:'non'});
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load',$.extend(queryParams,data));
}

function onResetBtnClick() {
	$('#taskId').val("");
	$('#taskNm').val("");	
}

function ajaxTable(data) {
	//加载表格
	$('#dg').datagrid({
		url: SCFUtils.AJAXURL,
		queryParams :data,
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
			field : 'ck',
			checkbox : true
		}, {
			field : 'paraId',
			title : 'Task编号',
			width : 200
		}, {
			field : 'paraName',
			title : 'Task名称',
			width : 200
		}, {
			field : 'paraDesc',
			title : 'Task描述',
			width : 300
		}] ]
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

function pageLoad(win){
	var row = win.getData("row");
	//修改
	if('edit' == row.op){
		SCFUtils.loadForm('mainForm',row);
	}else if ('del' == row.op){
		SCFUtils.loadForm('mainForm',row);
	}else {
	
	}
	
	var data = SCFUtils.convertArray('searchForm');
	$.extend(data,{'queryId':win.getData("queryId")});
	ajaxTable(data);
	loadClick();
}

function loadClick(){
	var options =$('#dg').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck(){
//	debugger;
	var data= $('#dg').datagrid('getChecked');//获取所有当前加载的数据行
	$('#id').val(data[0].paraId);
	$('#name').val(data[0].paraName);
	$('#desc').val(data[0].paraDesc);
}

function newId(){
	var options={};
	options.data = {
			refName: 'TaskRef',
			refField:'id'
				};
	options.force=true;
	SCFUtils.getRefNo(options);
}

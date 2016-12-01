function pageOnInt(){
//	$('#pageDiv').hide();
}

function SearchComfInfo(){
	var data = SCFUtils.convertArray('searchForm');
	//不需要缓存数据
	$.extend(data,{cacheType:'non'});
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load',$.extend(queryParams,data));
}

function onResetBtnClick() {
	$('#searchId').val("");
	$('#searchNm').val("");
}
	
function ajaxTable(data) {
	//加载表格
	$('#dg').datagrid({
		url: SCFUtils.AJAXURL,
		queryParams :data,
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,//只选一行
//		pagination : true,//是否分页
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
			field : 'funId',
			title : '功能编号',
			width : 150
		}, {
			field : 'funNm',
			title : '功能名称',
			width : 150
		}, {
			field : 'funPath',
			title : '功能路径',
			width : 300
		}] ]
	});
}

function doSave(win) {
	var data = SCFUtils.convertArray('mainForm');
	if(data.funId==""){
		SCFUtils.alert("请选择要添加的常用功能！");
		return;
	}
	var target = win.getData('callback');
	target(data);
	win.close();
}

function ignoreToolBar(){
	
}

function pageLoad(win){
	var row = win.getData("row");
	//修改
	$('#userRoleType').val(row.userRoleType);
	$('#userTp').val(row.userTp);
	$('#userFunType').val(row.userFunType);
	if('edit' == row.op){
		SCFUtils.loadForm('mainForm',row.data);
	}
//	var userRoleType=row.data.userRoleType;
	var data = {
			searchId:$('#searchId').val(),
			searchNm:$('#searchNm').val(),
			userRoleType:$('#userRoleType').val(),
			userTp:$('#userTp').val(),
			userId:$('#userId').val(),
			userFunType:$('#userFunType').val(),
			cacheType : 'non'
	};
	$.extend(data,{'queryId':win.getData("queryId")});
	loadClick();
	ajaxTable(data);
	SCFUtils.setTextReadonly("funId", true);
	SCFUtils.setTextReadonly("funNm", true);
	SCFUtils.setTextReadonly("userId", true);
	SCFUtils.setTextReadonly("funPath", true);
	
}

function loadClick(){
	var options =$('#dg').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck(){
//	debugger;
	var data= $('#dg').datagrid('getChecked');//获取所有当前加载的数据行
	$('#funId').val(data[0].funId);
	$('#funNm').val(data[0].funNm);
	$('#funPath').val(data[0].funPath);
}

function newId(){
	var options={};
	options.data = {
			refName: 'PageRef',
			refField:'id'
				};
	options.force=true;
	SCFUtils.getRefNo(options);
}

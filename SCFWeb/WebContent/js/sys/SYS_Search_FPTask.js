function initToolBar(){
	return ["entry","cancel","logout"];
}

function pageOnInt(){
	ajaxTable();
	loadDataGrid();
}

function loadSuccess(data) {
	$('#todoTable').datagrid('loadData',data);
}

function searchTaskInfo() {
	var data = SCFUtils.convertArray('searchForm');
//	var queryParams = $('#todoTable').datagrid('options').queryParams;
//	$('#todoTable').datagrid('load',$.extend(queryParams,data));
	loadDataGrid(data);
}

function onResetBtnClick() {
	$('#itemName').val("");
	$('#startTime').val("");
}

function loadDataGrid(data){
	var options = {
			title:'待办事项查询',
			reqid:'I_S_000002',
			data:{cacheType:'non',queryCon:'onpassageitem'},
			onSuccess:loadSuccess
		};
	SCFUtils.getData(options);
}


function ajaxTable() {
	// 加载表格
	var options = {
		rownumbers : true,
		animate : true,
		checkOnSelect:true,
		singleSelect:true,//只选一行
		collapsible : true,
		fitColumns : true,
		idField : 'id',
		treeField : 'taskName',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		},{
			field : 'itemId',
			title : '工作项编号',
			width : 120,
			hidden : false
		}, {
			field : 'itemName',
			title : '工作项描述',
			width : 200,
			hidden : false
		}, {
			field : 'itemState',
			title : '工作项状态',
			width : 100
		}, {
			field : 'itemRefNo',
			title : '流水号',
			width : 100
		}, {
			field : 'itemEvent',
			title : '批次号',
			width : 100
		}, {
			field : 'startTime',
			title : '创建时间',
			width : 100
		}, {
			field : 'currentStep',
			title : '当步操作',
			width : 100
		}, {
			field : 'nextStep',
			title : '下一步操作',
			width : 100
		}] ]

	};
	$('#todoTable').datagrid(options);
}

function onNextBtnClick() {
	var data = SCFUtils.getSelectedGridData('todoTable');
	$.extend(data,{
		sysFuncId:'F_P_TEST_0003',
		reqPageType : 'initlize',
		sysFuncType:'CE'
	});
	
	data.workflowInfo = SCFUtils.json2str(workflow);
	return data;
}

function onEntryBtnClick(){
	var griddata = SCFUtils.getSelectedGridData('todoTable').rows0;
	var data = {};
	$.extend(data,{
		sysFuncId:griddata.nextStep,
//		funcType:'FP',
		reqPageType : 'initlize',
		entryType:'workflow'
	});
	$.extend(griddata,{
			sysFuncId:griddata.nextStep,
			sysOrgnFuncId:griddata.currentStep
//			funcType:'FP',
			
		});
	data.workflowInfo = SCFUtils.json2str(griddata);
	return data;
}

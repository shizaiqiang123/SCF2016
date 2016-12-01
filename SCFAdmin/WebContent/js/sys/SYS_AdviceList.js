function initToolBar(){
	return ["entry","cancel","logout"];
}

function pageOnInt(){
	ajaxTable();
	
	var options = {
			title:'通知信息查询',
			reqid:'I_S_000003',
			data:{cacheType:'non',queryType:'queryList'},
			onSuccess:loadSuccess
		};
	SCFUtils.getData(options);
}

function loadSuccess(data) {
	$('#adviceTable').datagrid('loadData',data);
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
			field : 'msgId',
			title : '消息编号',
			width : 120,
			hidden : false
		}, {
			field : 'msgTitle',
			title : '消息标题',
			width : 200,
			hidden : false
		}, {
			field : 'sendId',
			title : '发件人',
			width : 100
		}, {
			field : 'msgStatus',
			title : '消息状态',
			width : 100
		}] ]

	};
	$('#adviceTable').datagrid(options);
}

function onNextBtnClick() {
	var data = SCFUtils.getSelectedGridData('adviceTable');
	$.extend(data,{
		sysFuncId:'F_P_TEST_0003',
		reqPageType : 'initlize',
		sysFuncType:'CE'
	});
	
	data.workflowInfo = SCFUtils.json2str(workflow);
	return data;
}

function onEntryBtnClick(){
	var griddata = SCFUtils.getSelectedGridData('adviceTable').rows0;
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

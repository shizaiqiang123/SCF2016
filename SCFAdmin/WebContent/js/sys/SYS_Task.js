function beforeLoad(){
	var para={};
	para.data = {
			reqBatchType:'inq-single',
			cacheType:'non'
	};
	return para;
}

function pageOnInt(){
	SCFUtils.setTextReadonly("batchId", true);
	SCFUtils.setTextReadonly("batchName", true);
	SCFUtils.setTextReadonly("batchType", true);
	SCFUtils.setTextReadonly("batchStatus", true);
}

function pageOnLoad(data) {
	SCFUtils.loadForm("mainForm", data);
	if(data.obj.batchType=="M"){
		$('#batchType').val("手动");
	}else if(data.obj.batchType=="A"){
		$('#batchType').val("自动");
	}
	if(data.obj.batchStatus=="stopped"){
		$('#batchStatus').val("已停止");
	}else if(data.obj.batchStatus=="initliazed"){
		$('#batchStatus').val("预置");
	}else if(data.obj.batchStatus=="started"){
		$('#batchStatus').val("已启动");
	}
	ajaxTable();
	$('#taskTable').treegrid('loadData',data.obj);
}

function onNextBtnClick() {
	var data =SCFUtils.serializeGridData('taskTable');	
	return data;
}

function ajaxTable() {
	// 加载表格
	var options = {
		rownumbers : true,
		animate : true,
		collapsible : true,
		fitColumns : true,
		idField : 'id',
		treeField : 'taskName',
		columns : [ [ {
			field : 'taskId',
			title : 'Task编号',
			width : 120,
			hidden : true
		}, {
			field : 'taskName',
			title : 'Task描述',
			width : 200,
			hidden : false
		}, {
			field : 'taskComponent',
			title : 'Task组件名',
			width : 100
		}, {
			field : 'taskStatus',
			title : 'Task状态',
			width : 100
		}, {
			field : 'progress',
			title : '操作',
			width : 300,
			formatter : formatProgress
		} ] ]

	};
	$('#taskTable').treegrid(options);
}

function formatProgress(value){
    if (value){
        var s = '<div style="width:100%;border:1px solid #ccc">' +
                '<div style="width:' + value + '%;background:#cc0000;color:#fff">' + value + '%' + '</div>'+
                '</div>';
        return s;
    } else {
        return '';
    }
}

function collapseAll(){

    $('#tg').treegrid('collapseAll');

}

function expandAll(){

    $('#tg').treegrid('expandAll');

}

function expandTo(){

    $('#tg').treegrid('expandTo',21).treegrid('select',21);

}

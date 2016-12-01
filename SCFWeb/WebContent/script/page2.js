function initTooltip(){
	var options = {
			display : 'block',
			content:'<span style="color:red">这里是要显示的内容</span>'
	};
	return options;
}
function pageOnInt() {
	ajaxPageTable();
	ajaxServiceTable();
	ajaxReportTable();
}

function pageOnFPLoad(data){
	SCFUtils.loadForm('mainForm',data);
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	
	if(data.obj.pageList&&!SCFUtils.isEmpty(data.obj.pageList))
		SCFUtils.loadGridData('pageDg',SCFUtils.parseGridData(data.obj.pageList), true);
	if(data.obj.serviceList&&!SCFUtils.isEmpty(data.obj.serviceList))
		SCFUtils.loadGridData('serviceDg',SCFUtils.parseGridData(data.obj.serviceList), true);
	if(data.obj.reportList&&!SCFUtils.isEmpty(data.obj.reportList))
		SCFUtils.loadGridData('reportDg',SCFUtils.parseGridData(data.obj.reportList), true);
}
function pageOnPreLoad(data) {
	pageOnResultLoad(data);
}


function onSaveBtnClick() {
	var data =  SCFUtils.convertArray('mainForm');
	var pageList = SCFUtils.getGridData('pageDg');
	var grid={};
	if(pageList&&!SCFUtils.isEmpty(pageList)){
		grid.pageList = SCFUtils.json2str(pageList);
	}
	var serviceList = SCFUtils.getGridData('serviceDg');
	if(serviceList&&!SCFUtils.isEmpty(serviceList)){
		grid.serviceList = SCFUtils.json2str(serviceList);
	}
	var reportList = SCFUtils.getGridData('reportDg');
	if(reportList&&!SCFUtils.isEmpty(reportList)){
		grid.reportList = SCFUtils.json2str(reportList);
	}
	$.extend(data,grid);
	return data;
}
function onNextBtnClick() {
	return onSaveBtnClick();
}

function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data.obj);
	if(data.obj.pageList&&!SCFUtils.isEmpty(data.obj.pageList))
		$('#pageDg').datagrid('loadData',data.obj.pageList);
	if(data.obj.serviceList&&!SCFUtils.isEmpty(data.obj.serviceList))
		$('#serviceDg').datagrid('loadData',data.obj.serviceList);
	if(data.obj.reportList&&!SCFUtils.isEmpty(data.obj.reportList))
		$('#reportDg').datagrid('loadData',data.obj.reportList);
}

function ajaxPageTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'index',
			title : 'index',
			width : 70
		}, {
			field : 'id',
			title : 'id',
			width : 70
		}, {
			field : 'name',
			title : 'name',
			width : 70
		}, {
			field : 'desc',
			title : 'desc',
			width : 70
		}, {
			field : 'pagetype',
			title : 'pagetype',
			width : 70
		} ] ]
	};
	$('#pageDg').datagrid(options);
}

function ajaxServiceTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'index',
			title : 'index',
			width : 70
		}, {
			field : 'id',
			title : 'id',
			width : 70
		}, {
			field : 'name',
			title : 'name',
			width : 70
		}, {
			field : 'type',
			title : 'type',
			width : 70
		}, {
			field : 'component',
			title : 'component',
			width : 70
		} ] ]
	};
	$('#serviceDg').datagrid(options);
}

function ajaxReportTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'index',
			title : 'index',
			width : 70
		}, {
			field : 'id',
			title : 'id',
			width : 70
		}, {
			field : 'name',
			title : 'name',
			width : 70
		}, {
			field : 'desc',
			title : 'desc',
			width : 70
		}, {
			field : 'reporttype',
			title : 'reporttype',
			width : 70
		} ] ]
	};
	$('#reportDg').datagrid(options);
}

function addSuccess(data) {
	$('#testTable').datagrid('appendRow', data);
}

function editSuccess(data) {
	var row = $('#testTable').datagrid('getSelected');
	var rowIndex = $('#testTable').datagrid('getRowIndex', row);
	$('#testTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
}
// 新增一条数据
function addRow() {
	var row = {};
	row.selId = $('#selId').val();
	row.op ='add';
	var options = {
		reqid : 'I_T_000002',
		data : {
			'row' : row
		},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);

}
// 修改一条数据
function editRow() {
	var row = $('#testTable').datagrid('getSelected');
	row.op ='edit';
	if (row) {
		var options = {
			reqid : 'I_T_000002',
			data : {
				'row' : row
			},
			onSuccess : editSuccess
		};
		SCFUtils.getData(options);
	} else {
		alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteRow() {
	var row = $('#testTable').datagrid('getSelected');
	var rowIndex = $('#testTable').datagrid('getRowIndex',row);
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				$('#testTable').datagrid('deleteRow', rowIndex);
			}
		});
	} else {
		alert("请选择一条数据！");
	}
}
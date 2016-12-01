function pageOnLoad(data) {
	ajaxTable();
	SCFUtils.loadForm('testForm', data);
}

function onSaveBtnClick() {
	//return SCFUtils.convertArray('testForm');
	var data =SCFUtils.serializeGridData('testTable');	
	return data;
}
function onDelBtnClick() {
	return SCFUtils.convertArray('testForm');
}

function ajaxTable() {
	// 加载表格
	var options = {
		url : SCFUtils.AJAXURL,
		queryParams : {
			queryId : 'Q_P_000003'
		},
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
			field : 'id',
			title : 'ID',
			width : 70
		}, {
			field : 'name',
			title : 'NAME',
			width : 70
		}, {
			field : 'sys_op_id',
			title : 'SYS_OP_ID',
			width : 70
		}, {
			field : 'sys_trx_sts',
			title : 'SYS_TRX_STS',
			width : 70
		} ] ]
	};
	$('#testTable').datagrid(options);
}

function addSuccess(data) {
	$('#id').val(data.id);
	$('#name').val(data.name);
	$('#testTable').datagrid('appendRow', data);
}

function editSuccess(data) {
	var row = $('#testTable').datagrid('getSelected')
	var rowIndex = $('#testTable').datagrid('getRowIndex', row);
	$('#id').val(data.id);
	$('#name').val(data.name);
	$('#testTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
}
// 新增一条数据
function addRow() {
	var options = {
		reqid : 'I_P_000002',
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);

}
// 修改一条数据
function editRow() {
	var row = $('#testTable').datagrid('getSelected');
	if (row) {
		var options = {
			reqid : 'I_P_000002',
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

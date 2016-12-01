//function beforeLoad(){
//	
//}
function pageOnLoad(data) {
	debugger;
	SCFUtils.loadForm('mainForm', data);
	ajaxTable();
}

function onSaveBtnClick() {
	var data =SCFUtils.serializeGridData('testTable');	
	return data;
}

function onPrevBtnClick(){
	return onNextBtnClick();
}

function onNextBtnClick() {
	var data =SCFUtils.serializeGridData('testTable');	
	return data;
}
function onDelBtnClick() {
	return SCFUtils.convertArray('mainForm');
}

function ajaxTable() {
	// 加载表格
	var options = {
		url : SCFUtils.AJAXURL,
		queryParams : {
			queryId : 'Q_T_000001',
			cacheType : 'append'
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
			field : 'sysRefNo',
			title : 'SYS_REF_NO',
			width : 70
		}, {
			field : 'selId',
			title : 'SEL_ID',
			width : 70
		}, {
			field : 'buyerId',
			title : 'BUYER_ID',
			width : 70
		}, {
			field : 'loanId',
			title : 'LOAN_ID',
			width : 70
		} ] ]
	};
	$('#testTable').datagrid(options);
}

function addSuccess(data) {
	//$('#sysRefNo').val(data.id);
	//$('#selId').val(data.name);
	//$('#buyerId').val(data.id);
	//$('#loanId').val(data.name);
	$('#testTable').datagrid('appendRow', data);
}

function editSuccess(data) {
	var row = $('#testTable').datagrid('getSelected');
	var rowIndex = $('#testTable').datagrid('getRowIndex', row);
//	$('#sysRefNo').val(data.id);
//	$('#selId').val(data.name);
//	$('#buyerId').val(data.id);
//	$('#loanId').val(data.name);
	$('#testTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	//$('#testTable').datagrid('beginEdit',rowIndex);
//	var ed = $('#testTable').datagrid('getEditor', {index:rowIndex,field:'buyerId'});
//	$(ed.target).datebox('setValue', data.buyerId);
//	
//	var ed = $('#testTable').datagrid('getEditor', {index:rowIndex,field:'loanId'});
//	$(ed.target).datebox('setValue', data.loanId);
	//$('#testTable').datagrid('refreshRow',rowIndex);
	//$('#testTable').datagrid('endEdit',rowIndex);
	//row.buyerId = data.buyerId;
	//row.loanId = data.loanId;
}
// 新增一条数据
function addRow() {
	var row = {};
	row.selId = $('#selId').val();
	row.sysNextOp ='add';
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
	row.sysNextOp ='edit';
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

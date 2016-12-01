function pageOnLoad(data) {
	ajaxTable();
	SCFUtils.loadForm('CntrctSbrForm', data);
	$('#cntrctSbrNo').val(data.obj.cntrctNo);
}

function onSaveBtnClick() {
	return SCFUtils.convertArray('CntrctSbrForm');
}
function onDelBtnClick() {
	return SCFUtils.convertArray('CntrctSbrForm');
}

function ajaxTable() {
	// 加载表格
	var options = {
		url : SCFUtils.AJAXURL,
		queryParams : {
			queryId : 'Q_P_000004'
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
			title : '交易流水号',
			hidden:true
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			hidden:true
		}, {
			field : 'buyerId',
			title : '间接客户编号',
			width : 100
		},
		{
			field : 'buyerNm',
			title : '间接客户名称',
			width : 100
		},{
			field : 'serviceReq',
			title : '授信模式',
			hidden:true
		}, {
			field : 'buyerLmtCcy',
			title : '间接客户额度币别',
			hidden:true
		}, {
			field : 'buyerLmtAmt',
			title : '间接客户额度金额',
			hidden:true
		}, {
			field : 'acctPeriod',
			title : '付款账期',
			hidden:true
		} 
		
		] ]
	};
	$('#CntrctSbrTable').datagrid(options);
}

function addSuccess(data) {
	$('#CntrctSbrTable').datagrid('appendRow', data);
}

function editSuccess(data) {
	var row = $('#CntrctSbrTable').datagrid('getSelected')
	var rowIndex = $('#CntrctSbrTable').datagrid('getRowIndex', row);
	$('#CntrctSbrTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
}
// 新增一条数据
function addRow() {
	var cntrctSbrNo = $("#cntrctSbrNo").val();
	var options = {
		reqid : 'I_P_000003',
		data:{'cntrctSbrNo':cntrctSbrNo},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);

}
// 修改一条数据
function editRow() {
	var row = $('#CntrctSbrTable').datagrid('getSelected');
	if (row) {
		var options = {
			reqid : 'I_P_000003',
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
	var row = $('#CntrctSbrTable').datagrid('getSelected');
	var rowIndex = $('#CntrctSbrTable').datagrid('getRowIndex',row);
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				$('#CntrctSbrTable').datagrid('deleteRow', rowIndex);
			}
		});
	} else {
		alert("请选择一条数据！");
	}
}

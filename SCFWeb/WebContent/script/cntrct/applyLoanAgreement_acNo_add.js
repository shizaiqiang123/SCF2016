function pageOnInt() {
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setDateboxReadonly("dueDt", true);
	ajaxbox();
	ajaxTable();
}

function ajaxbox() {
	var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000265',
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#busiTp').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(option);
}

function ajaxTable() {
	var options = {
		toolbar : '#toolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'acnm',
			title : '放款户名',
			width : 70
		}, {
			field : 'acno',
			title : '放款账号',
			width : 70
		}, {
			field : 'acbknm',
			title : '放款开户银行',
			width : 70
		} ] ]
	};
	$('#dg').datagrid(options);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function addAcNo() {
	var row = {};
	row.licenceNo = $('#licenceNo').val();
	row.buyerId = $('#buyerId').val();
	// row.licenceNo = 'YY20150911';
	// row.buyerId = 'Fac01216';
	row.op = 'add';
	var options = {
		title : '新增账号信息',
		reqid : 'I_P_000093',
		data : {
			'row' : row,
			cacheType : 'non'
		},
		onSuccess : addAcNoSuccess
	};
	SCFUtils.getData(options);
}

function addAcNoSuccess(data) {
	$('#dg').datagrid('insertRow', {
		index : data.index,
		row : data
	});
	$('#acNm').val(data.acnm);
	$('#acNo').val(data.acno);
	$('#acBkNm').val(data.acbknm);
}

function deleteAcNo() {
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				var rowIndex = $('#dg').datagrid('getRowIndex', row);
				$('#dg').datagrid('deleteRow', rowIndex);
				$('#acNm').val('');
				$('#acNo').val('');
				$('#acBkNm').val('');
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function onNextBtnClick() {
	var data = SCFUtils.convertArray('mainForm');
	return data;
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
}

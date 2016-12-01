function ignoreToolBar() {

}

function pageLoad(win) {
	SCFUtils.setTextReadonly("sysRefNo", true);
	ajaxBox();
	ajaxTable();
	setFormReadOnly();
	var options = $('#invcMTable').datagrid('options');
	options.onCheck = onCheck;

	var row = win.getData("row");
	var options = {};
	options.data = {
		refName : 'InvCredit',
		refField : 'sysRefNo',
		cacheType : 'non'
	};
	options.force = true;
	if (row.op === 'add') {
		SCFUtils.getRefNo(options);
		$('#cntrctNo').val(row.cntrctNo);
		$('#batchNo').val(row.batchNo);
		$('#selId').val(row.selId);
		$('#buyerId').val(row.buyerId);
		$('#invCcy').combobox('setValue', row.invCcy);
		queryInvc(row);
	} else if (row.op === 'edit') {
		if (row.state === 'query') {
			SCFUtils.setFormReadonly('#invcMChgForm', true);
		}
		// SCFUtils.getRefNo(options);
		SCFUtils.loadForm('creditDetailForm', row);
		var invRef = row.linkInvRef;
		queryInvc(row);
		var data = $('#invcMTable').datagrid('getRows');
		$.each(data, function(i, n) {
			if (n.sysRefNo == invRef) {
				$('#invcMTable').datagrid('selectRow', i);
			}
		});
	}
}

function doSave(win) {
	var invAmt = $('#invAmt').numberbox('getValue');// 当部贷项清单金额
	var crnAmtHD = $('#crnAmtHD').val();// 贷项清单总金额
	// 贷项清单总金额=原始贷项清单总金额+当部贷项清单金额
	crnAmtHD = SCFUtils.Math(crnAmtHD, invAmt, 'add');
	$('#crnAmt').val(crnAmtHD);
	var data = SCFUtils.convertArray('creditDetailForm');
	if (checkAmt(data)) {
		var target = win.getData('callback');
		var invLoanBalLS = $('#invLoanBal').val();
		data.invLoanBalLS = invLoanBalLS;
		target(data);
		win.close();
	}
	// if(data){
	// var target = win.getData('callback');
	// target(data);
	// win.close();
	// }
}

function ajaxBox() {
	var arType = [ {
		"id" : '0',
		"text" : "订单"
	}, {
		"id" : '1',
		"text" : "应收账款"
	}, {
		"id" : '2',
		"text" : "货运单"
	}, {
		"id" : '3',
		"text" : "合同"
	}, {
		"id" : '4',
		"text" : "其他"
	}, {
		"id" : '5',
		"text" : "账单"
	} ];
	$("#arType").combobox('loadData', arType);
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006',
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#invCcy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
}

function setFormReadOnly() {
	SCFUtils.setComboReadonly('invCcy', true);
	SCFUtils.setTextReadonly('linkInvNo', true);
	SCFUtils.setTextReadonly('linkInvRef', true);
	SCFUtils.setNumberboxReadonly('invAmtHD', true);
	SCFUtils.setNumberboxReadonly('invBalHD', true);
	SCFUtils.setNumberboxReadonly('invLoanBal', true);
	SCFUtils.setNumberboxReadonly('invBal', true);
}

function queryInvc(row) {
	var cntrctNo = row.cntrctNo;
	var selId = row.selId;
	var buyerId = row.buyerId;
	if (!SCFUtils.isEmpty(cntrctNo) && !SCFUtils.isEmpty(selId)
			&& !SCFUtils.isEmpty(buyerId)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000113',
				cntrctNo : cntrctNo,
				selId : selId,
				buyerId : buyerId
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					SCFUtils.loadGridData('invcMTable', data.rows);
				}
			}
		};
		SCFUtils.ajax(opt);
	}
}

function onCheck(rowIndex, rowData) {
	if (!SCFUtils.isEmpty(rowData)) {
		$('#invCcy').combobox('setValue', rowData.invCcy);
		$('#linkInvNo').val(rowData.invNo);
		$('#linkInvRef').val(rowData.sysRefNo);
		$('#invAmtHD').numberbox('setValue', rowData.invAmt);
		$('#invBalHD').numberbox('setValue', rowData.invBal);
		$('#invLoanBal').numberbox('setValue', rowData.invLoanBal);
		$('#crnAmt').val(rowData.crnAmt);
		$('#crnAmtHD').val(rowData.crnAmt);
		$('#invSts').val('CRN');
	}
}

function changeinvAmt() {
	var invAmt = $('#invAmt').numberbox('getValue');
	var invBalHD = $('#invBalHD').numberbox('getValue');
	// if(SCFUtils.isEmpty(invBalHD)){
	// SCFUtils.alert("请先选择发票");
	// }
	$('#invBal').numberbox('setValue', invAmt);
}

function checkAmt(data) {
	if (data) {
		var invBalHD = data.invBalHD;// 发票余额
		var crnAmt = data.crnAmt;// 贷项清单总金额
		if (SCFUtils.isEmpty(invBalHD)) {
			SCFUtils.alert("请先选择应收账款");
			return;
		}
		var subAmt = SCFUtils.Math(invBalHD, crnAmt, 'sub');
		if (subAmt >= 0) {
			return true;
		} else {
			SCFUtils.alert("贷项清单总金额不能大于应收账款余额，请重新输入。");
			return false;
		}
	} else {
		return false;
	}
}

function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		idField : "sysRefNo",
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
			width : 100
		}, {
			field : 'cntrctNo',
			title : '协议编号',
		}, {
			field : 'invNo',
			title : '编号',
			width : 100
		}, {
			field : 'invCcy',
			title : '币别',
			width : 100
		}, {
			field : 'invAmt',
			title : '金额',
			width : 100,
			formatter : ccyFormater
		}, {
			field : 'invBal',
			title : '应收账款净额',
			width : 100,
			formatter : ccyFormater
		}, {
			field : 'invLoanBal',
			title : '融资余额',
			width : 100,
			formatter : ccyFormater
		}, {
			field : 'crnAmt',
			title : '累计贷项清单总金额',
			width : 100,
			formatter : ccyFormater
		} ] ]
	};
	$('#invcMTable').datagrid(options);
}

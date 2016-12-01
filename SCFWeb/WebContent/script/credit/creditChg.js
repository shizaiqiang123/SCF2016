function ignoreToolBar() {

}

function pageLoad(win) {
	SCFUtils.setNumberspinnerReadonly('invBal', true);
	SCFUtils.setDateboxReadonly('invDueDt', true);
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("batchNo", true);
	ccyQueryAjax();
	var row = win.getData("row");
	var options = {};
	options.data = {
		refName : 'InvcRef',
		refField : 'sysRefNo',
		cacheType : 'non'
	};
	options.force = true;
	if (row.op === 'add') {
		SCFUtils.getRefNo(options);
		$('#cntrctNo').val(row.cntrctNo);
		$('#batchNo').val(row.batchNo);
		$('#buyerId').val(row.buyerId);
		$('#selId').val(row.selId);
		$('#busiTp').val(row.busiTp);
		SCFUtils.setComboReadonly('invCcy', true);
		$('#invCcy').combobox('setValue', row.ccy);
	} else if (row.op === 'edit') {
		if (row.state === 'query') {
			SCFUtils.setFormReadonly('#creditChgForm', true);
		}
		$('#sysRefNo').val(row.sysRefNo);
		$('#cntrctNo').val(row.cntrctNo);
		$('#orderNo').val(row.orderNo);
		$('#invNo').val(row.invNo);
		$('#invDt').datebox('setValue', row.invDt);
		$('#invValDt').datebox('setValue', row.invValDt);
		$('#invDueDt').datebox('setValue', row.invDueDt);
		$('#invCcy').combobox('setValue', row.invCcy);
		$('#invAmt').numberspinner('setValue', row.invAmt);
		$('#invBal').numberspinner('setValue', row.invBal);
		$('#batchNo').val(row.batchNo);
		$('#buyerId').val(row.buyerId);
		$('#selId').val(row.selId);
		$('#busiTp').val(row.busiTp);

	}
}

function contains(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}

function doSave(win) {
	var data = SCFUtils.convertArray('creditChgForm');
	if (data) {
		if (contains(win.getData('row').invNoList, data.invNo)) {
			SCFUtils.error('应收账款编号为：' + data.invNo + '的应收账款在表格或数据库中已存在!');
			return;
		}
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

function ccyQueryAjax() {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#invCcy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);

}

function changeinvDueDt() {
	var invValDt = $('#invValDt').datebox('getValue');
	var invDueDt = SCFUtils.FormatDate(invValDt, 30);
	$('#invDueDt').datebox('setValue', invDueDt);

}

function changeInvAmt() {
	var invAmt = $('#invAmt').numberspinner('getValue');
	$('#invBal').numberspinner('setValue', invAmt);
}

function onSearchClick() {

}

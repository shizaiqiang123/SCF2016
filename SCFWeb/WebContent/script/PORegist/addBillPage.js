function ignoreToolBar() {

}

function pageLoad(win) {
	var row = win.getData("row");
	if (row.op === 'add') {
		var options = {};
		options.data = {
			refName : 'billRefNo',
			refField : 'sysRefNo',
			cacheType : 'non'
		};
		options.force = true;
		SCFUtils.getRefNo(options);
		$('#loanId').val(row.trxId);
		$('#cntrctNo').val(row.cntrctRefNo);
		$('#loanValDt').val(row.loanValDt);
		$('#loanDueDt').val(row.loanDueDt);
	} else if (row.op === 'edit') {
		if (row.state === 'query') {
			SCFUtils.setFormReadonly('#addCntrctSbrForm', true);
		}
		$('#sysRefNo').val(row.sysRefNo);
		$('#billNo').val(row.billNo);
		$('#billAmt').numberspinner('setValue', row.billAmt);
		$('#billBal').val(row.billBal);
		$('#billValDt').datebox('setValue', row.billValDt);
		$('#billDueDt').datebox('setValue', row.billDueDt);
		$('#billRecp').val(row.billRecp);
		$('#billRecpAcno').val(row.billRecpAcno);
		$('#loanId').val(row.trxId);
		$('#cntrctNo').val(row.cntrctRefNo);
		$('#loanValDt').val(row.loanValDt);
		$('#loanDueDt').val(row.loanDueDt);
		$('#billNoOld').val(row.billNo);
		SCFUtils.eachElement('addBillForm');// 循环整个表单里的element来去除红色字体（不去除*号）
	}
}

function doSave(win) {
	var data = SCFUtils.convertArray('addBillForm');
	if (data) {
		var billValDt = $('#billValDt').datebox('getValue');
		var billDueDt = $('#billDueDt').datebox('getValue');

		var loanValDt = $('#loanValDt').val();
		var loanDueDt = $('#loanDueDt').val();

		if (SCFUtils.DateDiff(loanDueDt, loanValDt) < 0) {
			SCFUtils.alert('融资到期日必须晚于融资起始日！');
			return;
		}

		if (SCFUtils.DateDiff(billDueDt, billValDt) < 0) {
			SCFUtils.alert('票据到期日必须晚于票据起始日！');
			return;
		}

		if (SCFUtils.DateDiff(billValDt, loanValDt) < 0
				|| SCFUtils.DateDiff(billDueDt, loanDueDt) > 0) {
			SCFUtils.alert('票据起止日期必须在融资起止日期范围内！');
			return;
		}

		// 校验票号是否存在
		var row = win.getData("row");
		// 退回功能 修改同一张票号时不校验
		if (!('FP' == SCFUtils.FUNCTYPE && row.op === 'edit' && row.billNo == $(
				'#billNo').val())) {
			if (checkBillNo()) {
				SCFUtils.alert('票号已存在！');
				return;
			}
		}

		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

// 验证票号是否存在数据库中
function checkBillNo() {
	var result = false;
	var billNo = $('#billNo').val();
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000376',
			billNo : billNo,
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				result = true;
			}
		}
	};
	SCFUtils.ajax(option);

	return result;
}

function changeBillAmt() {
	var billAmt = $('#billAmt').numberspinner('getValue');
	$('#billBal').val(billAmt);
}

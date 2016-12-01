var bailBillData = {};

function ignoreToolBar(){
	
}

function pageLoad(win) {
	var row = win.getData("row");
	ajaxTable();
	SCFUtils.setFormReadonly('#bailMForm', true);
	SCFUtils.setNumberboxReadonly('marginCompen', false);
	if (!SCFUtils.isEmpty(row.bailBillData)) {
		bailBillData = row.bailBillData;
	} else {
		bailBillData.total = 0;
	}
	if (row.op == 'add') {
		$('#loanId').val(row.loanId);
		$('#cntrctNo').val(row.cntrctNo);
		$('#selId').val(row.selId);
		$('#buyerId').val(row.buyerId);
		$('#refNo').val(row.refNo);
		$('#marginBal').numberbox('setValue', row.ttlMarginBal);
		$('#marginBalOld').val(row.ttlMarginBalOld);
	} else if (row.op == 'edit') {
		$('#marginBalOld').val(row.ttlMarginBalOld);
		$('#billAmt').numberbox('setValue', row.billAmt);
		SCFUtils.loadForm('bailMForm', row);
		$('#marginBal').numberbox('setValue', row.marginBal);
		SCFUtils.setDatagridReadonly('dg', true);
	}
	if ("PM" === row.functype) {
		SearchPageInfo();
	} else if ("FP" === row.functype) {
		SearchPageInfoRe();
	}
	loadClick();
	SCFUtils.repalcePH("");

	/*
	 * if (row.op === 'add') { } else if (row.op === 'edit') { }
	 */
}

function loadClick() {
	var options = $('#dg').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck() {
	// debugger;
	var data = $('#dg').datagrid('getChecked');// 获取所有当前加载的数据行
	$('#billNo').val(data[0].billNo);
	$('#sysRefNo').val(data[0].sysRefNo);
	$('#billValDt').val(data[0].billValDt);
	$('#billDueDt').val(data[0].billDueDt);
	$('#billAmt').numberbox('setValue', data[0].billAmt);
	$('#marginBal').numberbox('setValue', data[0].marginBal);
	$('#marginCompen').numberbox('setValue', '0');
}

function checkMarginCompen() {
	var marginCompen = $('#marginCompen').numberbox('getValue');
	var billAmt = $('#billAmt').numberbox('getValue');
	var marginBalOld = $('#marginBalOld').val();// 保证金余额
	if (SCFUtils.Math(marginCompen, billAmt, 'sub') > 0) {
		SCFUtils.alert('追加保证金金额不能大于票面金额！');
	} else {
		// 保证金余额=原值+本次追加的保证金
		var marginBal = SCFUtils.Math(marginBalOld, marginCompen, 'add');
		$('#marginBal').numberbox('setValue', marginBal);
	}
}

function ajaxTable() {
	// 加载表格
	$('#dg').datagrid({
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'billNo',
			title : '票号',
			width : "25%"
		}, {
			field : 'sysRefNo',
			title : 'sysRefNo',
			width : "25%",
			hidden : true
		}, {
			field : 'billValDt',
			title : '开票日',
			width : "25%",
			formatter : dateFormater
		}, {
			field : 'billDueDt',
			title : '到期日',
			width : "25%",
			formatter : dateFormater
		}, {
			field : 'billAmt',
			title : '票据金额',
			width : "25%",
			formatter : ccyFormater
		} ] ]
	});
}

function SearchPageInfo() {
	var loanId = $('#loanId').val();
	var billNo = $('#copyOfBillNo').val();
	var refNo = $('#refNo').val();
	// var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000490',
			loanId : loanId,
			billNo : billNo,
			refNo : refNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('dg', data.rows, false, true);
				if (bailBillData.total != 0) {
					$.each(data.rows, function(i, n) {
						for (var j = 0; j < bailBillData.total; j++) {
							if (bailBillData.rows[j].sysRefNo == n.sysRefNo) {
								SCFUtils.setDatagridRowReadonly("dg", i, true,
										function() {
											SCFUtils.alert("您已添加过该票据信息！");
										});
								break;
							}
						}
					});
				}
			}
		}
	};
	SCFUtils.ajax(opts);
}

function SearchPageInfoRe() {
	var loanId = $('#loanId').val();
	var billNo = $('#copyOfBillNo').val();
	var refNo = $('#refNo').val();
	// var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000523',
			loanId : loanId,
			billNo : billNo,
			refNo : refNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('dg', data.rows, false, true);
				if (bailBillData.total != 0) {
					$.each(data.rows, function(i, n) {
						for (var j = 0; j < bailBillData.total; j++) {
							if (bailBillData.rows[j].sysRefNo == n.sysRefNo) {
								SCFUtils.setDatagridRowReadonly("dg", i, true,
										function() {
											SCFUtils.alert("您已添加过该票据信息！");
										});
								break;
							}
						}
					});
				}
			}
		}
	};
	SCFUtils.ajax(opts);
}

function doSave(win) {
	var data = SCFUtils.convertArray('bailMForm');
	if (data) {
		if (SCFUtils.Math(data.marginCompen, data.billAmt, 'sub') > 0) {
			return;
		}
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}
// 重置
function onResetBtnClick() {
	$("#copyOfBillNO").val("");
}

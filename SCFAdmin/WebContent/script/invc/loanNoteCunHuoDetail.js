function initToolBar() {
	return [ 'prev', 'cancel' ];
}

function beforeLoad() {
	var data = {
		cacheType : 'non'
	};
	return {
		data : data
	};
}

function pageOnInt() {
	$("#loanDiv").hide();
	$("#buyerPmtDiv").hide();
	$("#cbkDiv").hide();
	$("#crnDiv").hide();
	ajaxBox();

}

function pageOnPreLoad(data) {
}



function pageOnLoad(data) {
	if (!SCFUtils.isEmpty(data)) {
		if (!SCFUtils.isEmpty(data.obj.invc)) {
			SCFUtils.loadForm('loanForm', data.obj.invc.rows0);
		} else {
			SCFUtils.loadForm('loanForm', data.obj);
			//$('#acctAmt').numberbox('setValue', data.obj.acctAmt);
			$('#loanCcy').combobox('setValue', data.obj.ccy);
		}
		// queryInvcMcrnAmt();//根据发票编号查询M表中的贷项清单金额，如果大于0，则load贷项清单信息
		/*queryseler();
		querybuyer();
		queryCntrctInfo();
		checkNull();
		loadSomeTabel();*/
	}
}
// 根据发票状态加载表格
function loadSomeTabel() {
	var invSts = $('#invSts').val();
	if ('0' == invSts) {
		// loadLoanTable();
	} else if ('1' == invSts) {
		loadLoanTable();
		loadBuyerpmtTable();
		loadCrnTable();
	} else if ('2' == invSts) {
		loadLoanTable();
		loadBuyerpmtTable();
		loadCbkTable();
		loadCrnTable();
	}

	/*
	 * if ('LOAN' == invSts) { loadLoanTable(); } else if ('BUYERPMT' == invSts) {
	 * loadBuyerpmtTable(); } else if ('SELPMT' == invSts) {
	 * loadBuyerpmtTable(); // loadSelpmtTable(); } else if ('INDPMT' == invSts) {
	 * loadBuyerpmtTable(); // loadIndpmtTable(); } else if ('CBK' == invSts) {
	 * loadCbkTable(); } else if ('CRN' == invSts) { loadCrnTable(); }
	 */
}

//根据发票编号查询M表中的贷项清单金额，如果大于0，则load贷项清单信息
function queryInvcMcrnAmt() {
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000018',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if (data.rows[0].crnAmt > 0) {
					loadCrnTable();
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadCrnTable() {
	// $("#invAmtTd").html("贷项清单金额：");
	// $("#invBalTd").html("贷项清单净额：");
	$("#crnDiv").show();
	$("#crnAmtTr").show();
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
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
			title : '贷项清单流水号',
			width : '20%'
		}, {
			field : 'invNo',
			title : '贷项清单编号',
			width : '20%'
		}, {
			field : 'invAmt',
			title : '贷项清单金额',
			width : '20%',
			formatter : ccyFormater
		}, {
			field : 'invBal',
			title : '贷项清单净额',
			width : '20%',
			formatter : ccyFormater
		}, {
			field : 'invSts',
			title : '交易类型',
			width : '20%',
			formatter : function invStsFormter(value, row, index) {
				if (value === "0") {
					return "登记";
				}
				if (value === "1") {
					return "转让";
				}
				if (value === "2") {
					return "反转让";
				}
			}
		} ] ]
	};
	$('#crnTable').datagrid(options);
	var linkInvRef = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000187',
			linkInvRef : linkInvRef
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('crnTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}
function loadCbkTable() {
	$("#cbkDiv").show();
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
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
			width : '25%'
		}, {
			field : 'trxId',
			title : '反转让批次号',
			width : '25%'
		}, {
			field : 'chgBcAmt',
			title : '反转让金额',
			width : '25%',
			formatter : ccyFormater
		}, {
			field : 'cbkDt',
			title : '反转让日期',
			width : '25%',
			formatter : dateFormater
		} ] ]

	};
	$('#cbkTable').datagrid(options);
	var invcId = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000185',
			invcId : invcId
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('cbkTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadBuyerpmtTable() {
	$("#buyerPmtDiv").show();
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹ffv
		idField : 'sysRefNo',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '还款编号',
			width : '16.66%'
		}, {
			field : 'invPmtRef',
			title : '还款批次号',
			width : '16.66%'
		}, {
			field : 'pmtAmt',
			title : '本次还款金额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'intAmt',
			title : '应付利息',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'payPrinAmt',
			title : '还本金金额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'payIntAmt',
			title : '还息金额',
			width : '16.66%',
			formatter : ccyFormater
		} ] ]
	};
	$('#buyerPmtTable').datagrid(options);
	var invRef = $('#sysRefNo').val();
	var sysEventTimes = $('#sysEventTimes').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000184',
			invRef : invRef,
			sysEventTimes : sysEventTimes
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('buyerPmtTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadLoanTable() {
	$("#loanDiv").show();
	var options = {
		toolbar : '#toolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '融资ID',
			width : '9.09%'
		}, {
			field : 'invcLoanId',
			title : '融资批次号',
			width : '9.09%'
		}, {
			field : 'loanPct',
			title : '融资比例',
			width : '9.09%'
		}, {
			field : 'loanRt',
			title : '利率',
			width : '9.09%'
		}, {
			field : 'loanTimes',
			title : '融资次数',
			width : '9.09%'
		}, {
			field : 'invLoanAmt',
			title : '融资金额',
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'invLoanEbal',
			title : '本次融资金额',
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'invLoanBal',
			title : '融资总金额',
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'loanValDt',
			title : '融资起息日',
			width : '9.09%',
			formatter : dateFormater
		}, {
			field : 'loanDueDt',
			title : '融资到期日',
			width : '9.09%',
			formatter : dateFormater
		}, {
			field : 'invLoanAval',
			title : '应收账款可融资金额',
			width : '9.09%',
			formatter : ccyFormater
		} ] ]
	};
	$('#loanTable').datagrid(options);
	var invRef = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000183',
			invRef : invRef
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('loanTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function checkNull() {
	var invAmt = $('#invAmt').numberbox('getValue');
	var invBal = $('#invBal').numberbox('getValue');
	// var invLoanBal=$('#invLoanBal').numberbox('getValue');
	// var invLoanAval=$('#invLoanAval').numberbox('getValue');
	if (SCFUtils.isEmpty(invAmt)) {
		$('#invAmt').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(invBal)) {
		$('#invBal').numberbox('setValue', 0);
	}
	// if(SCFUtils.isEmpty(invLoanBal)){
	// $('#invLoanBal').numberbox('setValue',0);
	// }
	// if(SCFUtils.isEmpty(invLoanAval)){
	// $('#invLoanAval').numberbox('setValue',0);
	// }
}

function queryseler() {
	var sysRefNo = $('#selId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000068',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if (!SCFUtils.isEmpty(sysRefNo)) {
					$('#selNm').val(data.rows[0].custNm);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
function querybuyer() {
	var sysRefNo = $('#buyerId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000068',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if (!SCFUtils.isEmpty(sysRefNo)) {
					$('#buyerNm').val(data.rows[0].custNm);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryCntrctInfo() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000008',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#busiTp').combobox('setValue', data.rows[0].busiTp);
			}
		}
	};
	SCFUtils.ajax(options);
}

function ajaxBox() {
	// 币别
	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);

	var data = [ {
		"id" : '3',
		"text" : "银承"
	}, {
		"id" : '4',
		"text" : "流贷"
	} ];
	$("#loanTp").combobox('loadData', data);

}

function onPrevBtnClick() {
	return SCFUtils.convertArray('loanForm');
}
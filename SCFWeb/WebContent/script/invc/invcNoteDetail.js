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
	$("#sellerPmtDiv").hide();
	$("#indPmtDiv").hide();
	$("#cbkDiv").hide();
	$("#crnDiv").hide();
	$("#crnAmtTr").hide();
	$("#dspRegDiv").hide();
	$("#dspSolDiv").hide();
	$("#transDiv").hide();
	ajaxBox();

}

function pageOnPreLoad(data) {
	
}

// 根据发票编号查询M表中的贷项清单金额，如果大于0，则load贷项清单信息
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

function pageOnLoad(data) {
	if (!SCFUtils.isEmpty(data)) {
		if (!SCFUtils.isEmpty(data.obj.invc)) {
			SCFUtils.loadForm('invcForm', data.obj.invc.rows0);
		} else {
			SCFUtils.loadForm('invcForm', data.obj);
			//$('#acctAmt').numberbox('setValue', data.obj.acctAmt);
		}
		// queryInvcMcrnAmt();//根据发票编号查询M表中的贷项清单金额，如果大于0，则load贷项清单信息
		queryseler();
		querybuyer();
		//queryCntrctInfo();
		checkNull();
		loadSomeTabel();
	}
}

// 根据发票状态加载表格
function loadSomeTabel() {
	var invSts = $('#invSts').val();
	if ('0' == invSts) {
		$("#cntrctT").hide();
		$("#cntrctD").hide();
		$("#loanDiv").hide();
		$("#buyerPmtDiv").hide();
		$("#cbkDiv").hide();
		$("#crnDiv").hide();
		$("#dspRegDiv").hide();
		$("#dspSolDiv").hide();
		$("#transDiv").hide();
	} else if ('1' == invSts) {
		/*$("#cntrctT").hide();
		$("#cntrctD").hide();*/
		$("#loanDiv").hide();
		$("#buyerPmtDiv").hide();
		$("#cbkDiv").hide();
		$("#crnDiv").hide();
		$("#dspRegDiv").hide();
		$("#dspSolDiv").hide();
		loadTransTable();
		var transTableData = $('#transTable').datagrid('getData');
		if (transTableData.total == 0) {
			SCFUtils.alert("没有找到符合要求的转让信息!");
		}
	} else if ('2' == invSts) {
		loadLoanTable();
		var loanTableData = $('#loanTable').datagrid('getData');
		if (loanTableData.total == 0) {
			SCFUtils.alert("没有找到符合要求的融资信息!");
		}
	} else if ('3' == invSts) {
		loadCbkTable();
		var cbkTableData = $('#cbkTable').datagrid('getData');
		if (cbkTableData.total == 0) {
			SCFUtils.alert("没有找到符合要求的反转让信息!");
		}
	} else if ('4' == invSts) {
		loadCrnTable();
		var crnTableData = $('#crnTable').datagrid('getData');
		if (crnTableData.total == 0) {
			SCFUtils.alert("没有找到符合要求的关联贷项清单信息!");
		}
	} else if ('5' == invSts) {
		loadBuyerpmtTable();
		var buyerPmtTableData = $('#buyerPmtTable').datagrid('getData');
		if (buyerPmtTableData.total == 0) {
			SCFUtils.alert("没有找到符合要求的买方还款信息!");
		}
	} else if ('6' == invSts) {
		loadIndpmtTable();
		var indPmtTableData = $('#indPmtTable').datagrid('getData');
		if (indPmtTableData.total == 0) {
			SCFUtils.alert("没有找到符合要求的间接还款信息!");
		}
	}else if ('10' == invSts) {
		loadSellerpmtTable();
		var sellerPmtTableData = $('#sellerPmtTable').datagrid('getData');
		if (sellerPmtTableData.total == 0) {
			SCFUtils.alert("没有找到符合要求的卖方还款信息!");
		}
	}else if ('7' == invSts) {
		$("#cntrctT").hide();
		$("#cntrctD").hide();
		loadDspRegTable();
		var dspRegTableData = $('#dspRegTable').datagrid('getData');
		if (dspRegTableData.total == 0) {
			SCFUtils.alert("没有找到符合要求的争议登记信息!");
		}
	}else if ('8' == invSts) {
		$("#cntrctT").hide();
		$("#cntrctD").hide();
		loadDspSolTable();
		var dspSolTableData = $('#dspSolTable').datagrid('getData');
		if (dspSolTableData.total == 0) {
			SCFUtils.alert("没有找到符合要求的争议解决信息!");
		}
	}

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
			title : '发票流水号',
			width : '33.33%'
		},/* {
			field : 'invNo',
			title : '贷项清单编号',
			width : '20%'
		},*/ {
			field : 'crnAmt',
			title : '贷项清单金额',
			width : '33.33%',
			formatter : ccyFormater
		}, /*{
			field : 'invBal',
			title : '贷项清单净额',
			width : '20%',
			formatter : ccyFormater
		}, */{
			field : 'sysOpTm',
			title : '交易日期',
			width : '33.33%',
			formatter : dateFormater
		} ] ]
	};
	$('#crnTable').datagrid(options);
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000187',
			sysRefNo : sysRefNo
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
			field : 'revTrfAmt',
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

function loadTransTable() {
	$("#transDiv").show();
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
			title : '发票流水号',
			width : '33.33%'
		}, {
			field : 'invBal',
			title : '转让金额',
			width : '33.33%',
			formatter : ccyFormater
		}/*, {
			field : 'regNo',
			title : '转让数量',
			width : '33.33%',
			formatter : ccyFormater
		}*/, {
			field : 'sysOpTm',
			title : '交易日期',
			width : '33.33%',
			formatter : dateFormater
		} ] ]

	};
	$('#transTable').datagrid(options);
	var theirRef = $('#theirRef').val();
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000535',
			theirRef : theirRef,
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('transTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadDspRegTable() {
	$("#dspRegDiv").show();
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
			field : 'notifyBy',
			title : '争议提出方',
			width : '25%',
		}, {
			field : 'ttlDspInvNo',
			title : '争议登记数量',
			width : '25%',
			formatter : ccyFormater
		}, {
			field : 'ttlDspInvAmt',
			title : '争议登记金额',
			width : '25%',
			formatter : ccyFormater
		} ] ]

	};
	$('#dspRegTable').datagrid(options);
	var dspRef = $('#dspRef').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000536',
			dspRef : dspRef,
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('dspRegTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadDspSolTable() {
	$("#dspSolDiv").show();
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
			field : 'dspRsn',
			title : '争议原因',
			width : '25%',
			formatter : dspFormater
		}, {
			field : 'fixRsn',
			title : '解决原因',
			width : '25%',
		}, {
			field : 'dspAmt',
			title : '争议金额',
			width : '25%',
			formatter : ccyFormater
		} ] ]

	};
	$('#dspSolTable').datagrid(options);
	var dspRef = $('#dspRef').val();
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000537',
			dspRef : dspRef,
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('dspSolTable', data.rows);
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
			field : 'struLoanAmt',
			title : '冲销应收账款金额',
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


function loadIndpmtTable() {
	$("#indPmtDiv").show();
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
			field : 'ttlPmtAmt',
			title : '还款总金额',
			width : '16.66%'
		}, {
			field : 'pmtDt',
			title : '还款日期',
			width : '16.66%',
			formatter : dateFormater
		}, {
			field : 'payIntAmt',
			title : '还利息总额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'payPrinAmt',
			title : '还本金总额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'trxDt',
			title : '交易日期',
			width : '16.66%',
			formatter : dateFormater
		} ] ]
	};
	$('#indPmtTable').datagrid(options);
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000530',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('indPmtTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadSellerpmtTable() {
	$("#sellerPmtDiv").show();
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
			field : 'ttlPmtAmt',
			title : '还款总金额',
			width : '16.66%'
		}, {
			field : 'pmtDt',
			title : '还款日期',
			width : '16.66%',
			formatter : dateFormater
		}, {
			field : 'payIntAmt',
			title : '还利息总额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'payPrinAmt',
			title : '还本金总额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'trxDt',
			title : '交易日期',
			width : '16.66%',
			formatter : dateFormater
		} ] ]
	};
	$('#sellerPmtTable').datagrid(options);
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000531',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('sellerPmtTable', data.rows);
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
			width : '9.09%',
			formatter : pectType
		}, {
			field : 'loanRt',
			title : '利率',
			width : '9.09%',
			formatter : pectType
		}, {
			field : 'loanTimes',
			title : '融资次数',
			width : '9.09%'
		}, {
			field : 'invLoanAmt',
			title : '发票融资金额',
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'invLoanEbal',
			title : '最大可融资金额',
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'invLoanBal',
			title : '发票融资余额',
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
			field : 'loanAmt',
			title : '本次融资金额',
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

	/*
	 * var data = [ { "id" : 'TRF', "text" : "应收账款转让" }, { "id" : 'LOAN', "text" :
	 * "融资" }, { "id" : 'BUYERPMT', "text" : "间接客户还款" }, { "id" : 'SELPMT',
	 * "text" : "授信客户还款" }, { "id" : 'INDPMT', "text" : "间接还款" }, { "id" :
	 * 'CBK', "text" : "反转让" }, { "id" : 'CRN', "text" : "贷项清单" } ];
	 */
	var data = [ {
		"id" : '0',
		"text" : "登记"
	}, {
		"id" : '1',
		"text" : "转让"
	}, {
		"id" : '2',
		"text" : "融资"
	}, {
		"id" : '3',
		"text" : "反转让"
	}, {
		"id" : '4',
		"text" : "贷项清单"
	}, {
		"id" : '5',
		"text" : "买方还款"
	}, {
		"id" : '6',
		"text" : "间接还款"
	}, {
		"id" : '7',
		"text" : "争议登记"
	}, {
		"id" : '8',
		"text" : "争议解决"
	}, {
		"id" : '9',
		"text" : "发票调整"
	}, {
		"id" : '10',
		"text" : "卖方还款"
	} ];
	$("#invSts").combobox('loadData', data);

	data = [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '2',
		"text" : "先票款后货"
	}, {
		"id" : '3',
		"text" : "保险项"
	}, {
		"id" : '4',
		"text" : "现货动态"
	}, {
		"id" : '5',
		"text" : "现货静态"
	}, {
		"id" : '6',
		"text" : "应收账款池融资"
	}, {
		"id" : '7',
		"text" : "应收账款质押"
	}, {
		"id" : '8',
		"text" : "买方保理"
	}];
	$("#busiTp").combobox('loadData', data);
}

function onPrevBtnClick() {
	return SCFUtils.convertArray('invcForm');
}

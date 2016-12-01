function ajaxBox() {

	var clearPmt = [ {
		"id" : '0',
		"text" : "是",
	}, {
		"id" : '1',
		"text" : "否"
	} ];
	$("#clearPmt").combobox('loadData', clearPmt);

	var busiTp = [ {
		"id" : '0',
		"text" : "应收款融资",
	} ];
	$("#busiTp").combobox('loadData', busiTp);

	var payIntTp = [ {
		"id" : '0',
		"text" : "利随本清"
	} ];
	$("#payIntTp").combobox('loadData', payIntTp);

	var finaSts = [ {
		"id" : '0',
		"text" : "待放款",
	}, {
		"id" : '1',
		"text" : "已放款 ",
	}, {
		"id" : '2',
		"text" : "部分还款",
	}, {
		"id" : '3',
		"text" : "已还款"
	} ];
	$("#finaSts").combobox('loadData', finaSts);

	var pmtSts = [ {
		"id" : '0',
		"text" : "待核销"
	}, {
		"id" : '1',
		"text" : "已核销"
	}, {
		"id" : '2',
		"text" : "异常核销"
	} ];
	$("#pmtSts").combobox('loadData', pmtSts);

	var advaPaytype = [ {
		"id" : '0',
		"text" : "成员企业",
	}, {
		"id" : '1',
		"text" : "自有资金"
	} ];
	$("#advaPaytype").combobox('loadData', advaPaytype);
}

function queryPmtM(data) {
	var selId = $('#selId').val();
	if (!SCFUtils.isEmpty(selId)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000252',
				selId : selId,
				ttlPmtAmt : data.obj.ttlPmtAmt,
				pmtDt : data.obj.pmtDt
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					SCFUtils.loadForm('loanPmtSubmit', data.rows[0]);
					$('#intAmt').numberbox('setValue', data.rows[0].payIntAmt);
					$('#pmtId').val(data.rows[0].sysRefNo);
				} else {
					SCFUtils.alert("未找到与该资金流匹配的信息流！");
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

function queryLoan() {
	var sysRefNo = $('#loanId').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000023',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					// 还款次数
					if (SCFUtils.isEmpty(data.rows[0].pmtTimes)) {
						$('#pmtTimes').val(1);
					} else {
						$("#pmtTimes").val(
								SCFUtils.Math(data.rows[0].pmtTimes, 1, 'add'));
					}
					if (SCFUtils.isEmpty(data.rows[0].intAmt)) {
						$('#ttlIntAmt').val(0);
					} else {
						$("#ttlIntAmt").val(data.rows[0].intAmt);
					}
					$('#busiTp').combobox('setValue', data.rows[0].busiTp);
					$('#ttlLoanBal').numberbox('setValue',data.rows[0].ttlLoanBal);
					$('#ttlLoanAmt').val(data.rows[0].ttlLoanAmt);
					$('#loanRt').numberbox('setValue', data.rows[0].loanRt);
					$('#payIntTp').combobox('setValue', data.rows[0].payIntTp);
					$('#finaSts').combobox('setValue', data.rows[0].finaSts);
					$("#finaStsHD").val(data.rows[0].finaSts);
					$("#finChgrt").val(data.rows[0].finChgrt);
					$('#cntrctNo').val(data.rows[0].cntrctNo);
					$('#advaPaytype').combobox('setValue',
							data.rows[0].advaPaytype);
				}
			}
		};
		SCFUtils.ajax(options);
	}

}

//计算费用
function changeCost() {
	if ($('#pmtTimes').val() == '1') {//只有第一次还款的时候才算费用
		var finChgrt = SCFUtils.Math($("#finChgrt").val(), 0.01, 'mul');//费率
		var ttlLoanAmt = $('#ttlLoanAmt').val();//借款金额
		var currFinCost = SCFUtils.Math(ttlLoanAmt, finChgrt, 'mul');//应收费用=借款金额*费率
		$('#currFinCost').numberbox('setValue', currFinCost);
	}else{
		$('#currFinCost').numberbox('setValue', 0);
	}

}

function queryCntrct() {
	var cntrctNo = $('#cntrctNo').val();
	if (!SCFUtils.isEmpty(selId)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000029',
				sysRefNo : cntrctNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					
					$('#lmtBal').numberbox('setValue', data.rows[0].lmtBal);
					// $('#arBal').numberbox('setValue', data.rows[0].arBal);
					$('#openLoanAmt').numberbox('setValue',
							data.rows[0].openLoanAmt);
					$('#arAvalLoan').numberbox('setValue',
							data.rows[0].arAvalLoan);
					$('#lmtBal').numberbox('setValue', data.rows[0].lmtBal);
					$('#lmtAmt').numberbox('setValue', data.rows[0].lmtAmt);
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

function pageOnInt(data) {
	ajaxBox();
	SCFUtils.setFormReadonly('#loanPmtSubmit', true);

}

// 还款状态、融资状态
function changePmtSts() {
	var ttlLoanBal = $('#ttlLoanBal').numberbox('getValue');// 借款余额
	if (ttlLoanBal > 0) {
		// $("#pmtSts").combobox('setValue', '2'); // 还款状态
		$("#finaSts").combobox('setValue', '2');// 融资状态
	} else if (ttlLoanBal == 0) {
		// $("#pmtSts").combobox('setValue', '3');
		$("#finaSts").combobox('setValue', '3');
	}
	$("#pmtSts").combobox('setValue', '1');
}

// 计算借款余额、信用额度余额、融资余额、应收账款可融资余额
function calc() {
	var payPrinAmt = $('#payPrinAmt').numberbox('getValue');// 本次还本金金额
	var ttlLoanBal = $('#ttlLoanBal').numberbox('getValue');// 借款余额
//	var reAmt = 0; // 恢复额度金额
	$('#ttlLoanBal').numberbox('setValue',
			SCFUtils.Math(ttlLoanBal, payPrinAmt, 'sub'));

	var lmtAmt = $('#lmtAmt').numberbox('getValue');// 信用额度金额
	var lmtBal = $('#lmtBal').numberbox('getValue');// 信用额度余额
	var subAmt = SCFUtils.Math(lmtAmt, lmtBal, 'sub');
	// if 本次还本金金额 >(信用额度金额-信用额度余额)
	if (SCFUtils.Math(payPrinAmt, subAmt, 'sub') > 0) {
		$('#lmtBal').numberbox('setValue', lmtAmt);
//		reAmt = subAmt;
	} else {
		$('#lmtBal').numberbox('setValue',
				SCFUtils.Math(lmtBal, payPrinAmt, 'add'));
//		reAmt = payPrinAmt;

	}

	var openLoanAmt = $('#openLoanAmt').numberbox('getValue');// 融资余额
	$('#openLoanAmt').numberbox('setValue',
			SCFUtils.Math(openLoanAmt, payPrinAmt, 'sub'));

	var arAvalLoan = $('#arAvalLoan').numberbox('getValue');// 应收账款可融资余额
	$('#arAvalLoan').numberbox('setValue',
			SCFUtils.Math(arAvalLoan, payPrinAmt, 'add'));
}

// 根据付款账号在账号表中查询selId
function querySelIdBuyAcNo(acNo) {
	if (!SCFUtils.isEmpty(acNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000255',
				acNo : acNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#selId').val(data.rows[0].acOwnerid);
				} else {
					SCFUtils.alert("账号" + acNo + "不存在!");
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

function pageOnLoad(data) {
	querySelIdBuyAcNo(data.obj.selAcNo);
	queryPmtM(data);
	queryLoan();
	queryCntrct();
	changeCost();//计算费用
	var ttlIntAmt = SCFUtils.Math($("#ttlIntAmt").val(),$("#payIntAmt").numberbox('getValue'), 'add');
	$("#ttlIntAmt").val(ttlIntAmt);//还款总利息金额=原+本次还利息金额  更新回融资表
	$('#trxDt').val(getDate(new Date()));
	$('#selAcNo').val(data.obj.selAcNo);
	$('#sysRefNo').val(data.obj.sysRefNo);
	$('#theirRef').val(data.obj.sysRefNo);
	$('#pmtDt').datebox('setValue',data.obj.pmtDt);

	$('#ttlLoanBalHD').val($('#ttlLoanBal').numberbox('getValue'));
	$('#lmtAmtHD').val($('#lmtAmt').numberbox('getValue'));
	$('#openLoanAmtHD').val($('#openLoanAmt').numberbox('getValue'));
	$('#arAvalLoanHD').val($('#arAvalLoan').numberbox('getValue'));
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}
function onNextBtnClick() {

	calc();
	changePmtSts();// 还款状态、融资状态
	return SCFUtils.convertArray('loanPmtSubmit');
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('loanPmtSubmit', data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('loanPmtSubmit', data);

	$("#finaSts").combobox('setValue', $("#finaStsHD").val());
	$("#pmtSts").combobox('setValue', '0');
	$('#ttlLoanBal').numberbox('setValue', $('#ttlLoanBalHD').val());
	$('#lmtAmt').numberbox('setValue', $('#lmtAmtHD').val());
	$('#openLoanAmt').numberbox('setValue', $('#openLoanAmtHD').val());
	$('#arAvalLoan').numberbox('setValue', $('#arAvalLoanHD').val());
}
function ajaxBox() {
	var busiTp = [ {
		"id" : '0',
		"text" : "应收款融资",
		"selected" : true
	} ];
	$("#busiTp").combobox('loadData', busiTp);
	var payChgTp = [ {
		"id" : '0',
		"text" : "先收费"
	}, {
		"id" : '1',
		"text" : "后收费"
	} ];
	$("#payChgTp").combobox('loadData', payChgTp);
	var payIntTp = [ {
		"id" : '0',
		"text" : "利随本清"
	} ];
	$("#payIntTp").combobox('loadData', payIntTp);

	var advaPaytype = [ {
		"id" : '0',
		"text" : "成员企业",
	}, {
		"id" : '1',
		"text" : "自有资金"
	} ];
	$("#advaPaytype").combobox('loadData', advaPaytype);

	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success) {
				$.each(data.rows, function(i, n) {
					var textField = n.sysRefNo + '-' + n.ccyNm;
					$.extend(n, {
						textField : textField
					});
				});
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);
}

function pageOnInt(data) {
	ajaxBox();
	SCFUtils.setFormReadonly('#loanSubmit', true);
	SCFUtils.setComboReadonly('advaPaytype', false);
}

function pageOnLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
	queryReCntrct();
	$('#trxDt').datebox('setValue', getDate(new Date()));
	$('#ccy').combobox('setValue', 'CNY');

	$('#arAvalLoanHD').val($('#arAvalLoan').numberbox('getValue'));
	$('#openLoanAmtHD').val($('#openLoanAmt').numberbox('getValue'));
	queryCustM();
}
// 计算费用
function calcCost() {

	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 借款金额
	var finChgrt = $('#finChgrt').numberspinner('getValue');// 费率
	var cost = SCFUtils.Math(ttlLoanAmt, finChgrt, 'mul');
	cost = parseFloat(cost).toFixed(2);
	return cost;
}

function changeCost() {
	var cost = calcCost();
	var payChgTp = $('#payChgTp').combobox('getValue');
	if (payChgTp == '1') {
		$('#currFinPayCost').val(cost);
		$('#currFinCost').val(0);
	} else if (payChgTp == '2') {
		$('#currFinPayCost').val(0);
		$('#currFinCost').val(cost);
	}

}

// 根据客户ID查询客户等级
function queryCustM() {
	var sysRefNo = $('#selId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$("#custLevel").val(data.rows[0].custLevel);
			}
		}
	};
	SCFUtils.ajax(options);
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
	var arAvalLoan = $('#arAvalLoanHD').val();// 原应收账款可融资余额
	var openLoanAmt = $('#openLoanAmtHD').val();// 原融资余额
	$('#arAvalLoan').numberbox('setValue', arAvalLoan);
	$('#openLoanAmt').numberbox('setValue', openLoanAmt);
}

function onNextBtnClick() {
	if (calc()) {
		return;
	}
	// $('#ttlLoanBal').val($('#ttlLoanAmt').numberbox('getValue'));
	$('#finaSts').val('1');
	return SCFUtils.convertArray('loanSubmit');
}

function calc() {
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 借款金额
	if (SCFUtils.isEmpty(ttlLoanAmt)) {
		SCFUtils.alert("请输入借款金额!");
		return true;
	}
	var arAvalLoan = $('#arAvalLoanHD').val();// 原应收账款可融资余额
	var openLoanAmt = $('#openLoanAmtHD').val();// 原融资余额
	var subAmt = SCFUtils.Math(arAvalLoan, ttlLoanAmt, 'sub');
	if (subAmt >= 0) {
		$('#arAvalLoan').numberbox('setValue', subAmt);// 应收账款可融资余额=原应收账款可融资余额-借款金额
		openLoanAmt = SCFUtils.Math(openLoanAmt, ttlLoanAmt, 'add');// 融资余额=原融资余额+借款金额
		$('#openLoanAmt').numberbox('setValue', openLoanAmt);
		return false;
	} else {
		SCFUtils.alert("借款金额不能大于可融资额度！");
		return true;
	}
}

function queryReCntrct() {
	var sysRefNo = $('#cntrctNo').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000029',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$("#loanPerc").val(data.rows[0].loanPerc);
					$("#openLoanAmt").numberbox('setValue',
							data.rows[0].openLoanAmt);
					$("#arAvalLoan").numberbox('setValue',
							data.rows[0].arAvalLoan);
					$("#payChgTp").combobox('setValue', data.rows[0].payChgTp);
					$('#buyerId').val(data.rows[0].buyerId);
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

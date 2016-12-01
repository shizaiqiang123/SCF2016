function initToolBar() {
	return [ 'expt', 'prev', 'cancel' ];
}

function beforeLoad() {
	var data = {
		cacheType : 'non'
	};
	return {
		data : data
	};
}

function ajaxBox() {
	var busiTp = [ {
		"id" : '0',
		"text" : "应收款融资"
	} ];
	$("#busiTp").combobox('loadData', busiTp);

	var payIntTp = [ {
		"id" : '0',
		"text" : "利随本清"
	} ];
	$("#payIntTp").combobox('loadData', payIntTp);

	var payChgTp = [ {
		"id" : '0',
		"text" : "先收费"
	}, {
		"id" : '1',
		"text" : "后收费"
	} ];
	$("#payChgTp").combobox('loadData', payChgTp);

	var pmtSts = [ {
		"id" : '0',
		"text" : "待核销"
	}, {
		"id" : '1',
		"text" : "已核销"
	} ];
	$("#pmtSts").combobox('loadData', pmtSts);

	/*
	 * var optt = { url : SCFUtils.AJAXURL, data : { queryId : 'Q_P_000006' },
	 * callBackFun : function(data) { if (data.success) {
	 * $('#ccy').combobox('loadData', data.rows); } } }; SCFUtils.ajax(optt);
	 */
}

function queryPmtE(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000246',
			sysRefNo : data.obj.sysRefNo,
			sysEventTimes : data.obj.sysEventTimes
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadForm('pmtSubmit', data.rows[0]);
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryLoanM() {
	var sysRefNo = $('#loanId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000023',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$('#ttlLoanAmt').numberbox('setValue', data.rows[0].ttlLoanAmt);
				$('#ttlLoanBal').numberbox('setValue', data.rows[0].ttlLoanBal);
				$('#loanValDt').datebox('setValue', data.rows[0].loanValDt);
				$('#loanDueDt').datebox('setValue', data.rows[0].loanDueDt);
				$('#loanRt').numberspinner('setValue', data.rows[0].loanRt);
				$('#payIntTp').combobox('setValue', data.rows[0].payIntTp);
				$('#finChgrt').numberspinner('setValue', data.rows[0].finChgrt);
				$('#payChgTp').combobox('setValue', data.rows[0].payChgTp);
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryAcNo() {
	var acOwnerid = $('#selId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000228',
			acOwnerid : acOwnerid
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$('#selAcNo').val(data.rows[0].acNo);
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryReCntrct() {
	var selId = $('#selId').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_S_00000100',
				selId : selId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$("#cntrctNo").val(data.rows[0].sysRefNo);
					$("#lmtAmt").numberbox('setValue', data.rows[0].lmtAmt);
					$("#lmtBal").numberbox('setValue', data.rows[0].lmtBal);
					$("#arBal").numberbox('setValue', data.rows[0].arBal);
					$("#openLoanAmt").numberbox('setValue',
							data.rows[0].openLoanAmt);
					$("#arAvalLoan").numberbox('setValue',
							data.rows[0].arAvalLoan);
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

function pageOnInt(data) {
	$('#inputtrCntrctNo').hide();
	$('#inputtrBusiTp').hide();
	$('#inputtrSelId').hide();
	$('#inputtrSelNm').hide();
	$('#inputtrLmtAmt').hide();
	$('#inputtrLmtBal').hide();
	$('#inputtrArBal').hide();
	$('#inputtrOpenLoanAmt').hide();
	$('#inputtrArAvalLoan').hide();
	ajaxBox();
	SCFUtils.setFormReadonly('pmtSubmit', true);
}

function pageOnLoad(data) {
	queryPmtE(data);
	queryReCntrct();
	queryLoanM();
	queryAcNo();
	calcCurrFinCost();
}

function calcCurrFinCost() {
	var payPrinAmt = $("#payPrinAmt").numberbox('getValue');// 本次还本金金额
	var payIntAmt = $("#payIntAmt").numberbox('getValue');// 本次还利息金额
	var ttlPmtAmt = $("#ttlPmtAmt").numberbox('getValue');// 合计还款金额
	var currFinCost = SCFUtils.Math(ttlPmtAmt, SCFUtils.Math(payPrinAmt,
			payIntAmt, 'add'), 'sub');// 应收费用
	$("#currFinCost").numberbox('setValue', currFinCost);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('pmtSubmit', data);
}
function prinReceipt() {
	var data = SCFUtils.convertArray('pmtSubmit');
	// data.loanId ;//合同号
	data.printNumber = queryPmtPrintNumber();// 打印次数
	// data.selNm ;//借款人
	 data.payPrinAmt =data.ttlLoanAmt;//本次还款本金
	 data.loanRt =data.loanRt+"%";//利率
	// data.loanValDt ;//借款日
	// data.pmtDt ;//还款日
	// data.GreatPayIntAmt ;//本次还款利息大写
	// data.payIntAmt ;//本次还款利息
	// data.loanValDt ;//起始日
	// data.loanDueDt ;//到期日
	// data.sysData ;//打印日
	// data.clearPmt ;//是否全额还款 0是
	data.oldpayPrinAmt=SCFUtils.ccyFormatNoPre(0, 2);  //提前还款金额
//	remark 备注
	if (data.printNumber == "" || data.printNumber == null)
		data.printNumber = "1";
	addPrintNumber(data.sysRefNo, data.printNumber);
	var money = data.payIntAmt;
	data.GreatPayIntAmt = ccyGreatFormat(money);
//	money = SCFUtils.ccyFormatNoPre(money, 2);

	return data;
}
function ccyGreatFormat(money) {
	money = SCFUtils.ccyFormatNoPre(money, 2);
	var FloatStr;// 小数部分
	FloatStr = money.substring(money.indexOf(".") + 1).split("");
	money = SCFUtils.deformatCcy(money);
	money += "";
	var Great = [ "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾" ];
	var GreatLong = [ "", "万", "亿" ];
	var GreatInt = [ "", "拾", "佰", "仟" ];
	var GreatFloat = [ "角", "分" ];
	var IntStr;// 整数部分
	var intGreat = "";
	var floatGreat = "";// 1111
	IntStr = money.substring(0, money.indexOf(".")) == ""
			|| money.substring(0, money.indexOf(".")) == undefined 
			|| money.substring(0, money.indexOf(".")) == null ? ("0" + money)
			.split("") : money.substring(0, money.indexOf(".")).split("");
	for ( var i = IntStr.length - 1, j = 1; i >= 0; i--, j++) {
		if (IntStr[i] == "0")
			continue;
		intGreat = Great[parseInt(IntStr[i])]
				+ ((j - 1) % 4 == 0 ? "" : GreatInt[((j - 1) % 4)])
				+ ((j - 1) % 4 == 0 ? GreatLong[parseInt(j / 4)] : "")
				+ intGreat;
	}
	for ( var i = 0; i < FloatStr.length; i++) {
		if (FloatStr[i] == "0")
			continue;
		floatGreat = floatGreat + Great[parseInt(FloatStr[i]) - 1]
				+ GreatFloat[i];
	}
	var GreatMoney=intGreat==""?"": (intGreat+ "元") + floatGreat;
	return GreatMoney==""?"零":GreatMoney;
}
function queryPmtPrintNumber() {
	var sysRefNo = $('#sysRefNo').val();
	var printNumber = "";
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000321',
				cacheType : 'non',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					printNumber=data.rows[0].printNumber;
					$("#printNumber").val(data.rows[0].printNumber);
				}
			}
		};
		SCFUtils.ajax(options);
		return printNumber;
	}
}
function addPrintNumber(sysRefNo, printNumber) {
	var data = {};
	printNumber = parseInt(printNumber);
	printNumber = (printNumber + 1) + "";
	data = {
		sysRefNo : sysRefNo,
		printNumber : printNumber,
		sysFuncName : "打印还款回执单"
	};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_000105',
			_opTp : "edit",
			cacheType : 'non',
			reqPageType : 'finish'
				,
			funcType : 'MM'
		}, data)
	};
	SCFUtils.ajax(options);
}
function onExptBtnClick() {
	var data = prinReceipt();
	return data;
}

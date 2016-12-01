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
	var finaSts = [ {
		"id" : '0',
		"text" : "待放款"
	}, {
		"id" : '1',
		"text" : "已放款",
		"selected" : true
	}, {
		"id" : '2',
		"text" : "已部分还款",
		"selected" : true
	}, {
		"id" : '3',
		"text" : "已全额还款",
		"selected" : true
	} ];
	$("#finaSts").combobox('loadData', finaSts);
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

function queryLoanE(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000227',
			sysRefNo : data.obj.sysRefNo,
			sysEventTimes : data.obj.sysEventTimes
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadForm('loanSubmit', data.rows[0]);
			}
		}
	};
	SCFUtils.ajax(options);
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
					$("#loanPerc").numberspinner('setValue',
							data.rows[0].loanPerc);
					$("#openLoanAmt").val(data.rows[0].openLoanAmt);
					$("#arAvalLoan").val(data.rows[0].arAvalLoan);
					$("#payChgTp").combobox('setValue', data.rows[0].payChgTp);
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

function pageOnInt(data) {
	ajaxBox();
	SCFUtils.setFormReadonly('loanSubmit', true);
}

function pageOnLoad(data) {
	queryLoanE(data);
	queryReCntrct();
	queryAc($('#cntrctNo').val());
	var finaSts = $("#finaSts").combobox('getValue');
	if (finaSts != "1") {

	}
}
function queryAc(cntrctNo) {
	if (!SCFUtils.isEmpty(cntrctNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000261',
				cntrctNo : cntrctNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#selAcNo').combobox('setValue', data.rows[0].acNo);

				}
			}
		};
		SCFUtils.ajax(options);
	}
}
function pageOnPreLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}
function prinReceipt() {
	var data = SCFUtils.convertArray('loanSubmit');
	data.date = data.sysData;
	data.printNumber=queryLoanPrintNumber();
	if (data.printNumber == "" || data.printNumber == null)
		data.printNumber = "1";
	addPrintNumber(data.sysRefNo, data.printNumber);
	data.userNm = data.userNm;
	data.remark = data.remark;
	var money = data.ttlLoanAmt;
	data.GreatMoney = ccyGreatFormat(money);
	money = SCFUtils.ccyFormatNoPre(money, 2);
	var FloatStr = money.substring(money.indexOf(".") + 1);
	money = SCFUtils.deformatCcy(money);
	money += "";
	// var IntStr = ("0" + money.substring(0, money.indexOf(".")));
	var IntStr = money;
	var newMoney = (IntStr + FloatStr).split("");
	var moneyNumber = [];
	for ( var i = 11, l = newMoney.length; i >= 0; i--, l--) {
		moneyNumber[i] = newMoney[l - 1];
		if (l == 0)
			moneyNumber[i] = "￥";
		else if (l < l)
			moneyNumber[i] = "";
	}
	data.moneyNumber1 = moneyNumber[11];
	data.moneyNumber2 = moneyNumber[10];
	data.moneyNumber3 = moneyNumber[9];
	data.moneyNumber4 = moneyNumber[8];
	data.moneyNumber5 = moneyNumber[7];
	data.moneyNumber6 = moneyNumber[6];
	data.moneyNumber7 = moneyNumber[5];
	data.moneyNumber8 = moneyNumber[4];
	data.moneyNumber9 = moneyNumber[3];
	data.moneyNumber10 = moneyNumber[2];
	data.moneyNumber11 = moneyNumber[1];
	data.moneyNumber12 = moneyNumber[0];

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
			|| money.substring(0, money.indexOf(".")) == null? ("0" + money)
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

	return intGreat==""?"": (intGreat+ "元") + floatGreat;
}

function queryCntrct() {
	var cntrctNo = $('#cntrctNo').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000312',
				sysRefNo : cntrctNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$("#buyerId").val(data.rows[0].buyerId);
					$("#selId").val(data.rows[0].selId);
					queryBuAc();
					queryCustAc();
				}
			}
		};
		SCFUtils.ajax(options);
	}
}
function queryBuAc() {
	var buyerId = $('#buyerId').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000313',
				acOwnerid : buyerId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$("#buyerNm").val(data.rows[0].acNm);
					$("#buyerAc").val(data.rows[0].acNo);
					$("#buyerBkNm").val(data.rows[0].acBkNm);
				}
			}
		};
		SCFUtils.ajax(options);
	}
}
function queryCustAc() {
	var selId = $('#selId').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000314',
				acOwnerid : selId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$("#selNm").val(data.rows[0].acNm);
					$("#selAc").val(data.rows[0].acNo);
					$("#selBkNm").val(data.rows[0].acBkNm);
				}
			}
		};
		SCFUtils.ajax(options);
	}
}
function queryLoanPrintNumber() {
	var sysRefNo = $('#sysRefNo').val();
	var printNumber="";
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000320',
				cacheType : 'non',
				sysRefNo:sysRefNo
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
	printNumber =(printNumber+1) + "";
	data = {
		sysRefNo : sysRefNo,
		printNumber : printNumber,
		sysFuncName:"打印转账回执单"
	};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_000097',
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
	queryCntrct();
	var data = prinReceipt();
	return data;
}

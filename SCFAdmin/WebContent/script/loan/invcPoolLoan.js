function initNotice(){
	var notice = '（1）按照集团收取利息、费用的结算日为基准，当前显示的利息和费用都是预算值，实际的利息和费用以实际收取为准；<br/>（2）“融资起始日”为预计估算日期，必须为工作日，以实际放款日期为准 ；<br/>（3）利息、费用的计算方式是按照国家统一利息计算标准收取。';
	return notice;
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
	SCFUtils.setDateboxReadonly('loanValDt', false);
	$('#loanValDt').datebox({
		editable : false
	});
	SCFUtils.setNumberboxReadonly('ttlLoanAmt', false);
	SCFUtils.setTextboxReadonly('sysRelReason', false);
//	lookSysRelReason();
}
//打回处理
function pageOnFPLoad(data) {
	//交换意见
	var row=exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('loanSubmit', row);
	var loanValDt=$('#loanValDt').datebox('getValue');
	var loanDueDt=$('#loanDueDt').datebox('getValue');
	var acctPeriod=SCFUtils.DateDiff(loanDueDt,loanValDt);
	$('#acctPeriod').val(acctPeriod);
//	acctPeriod账期
	lookSysRelReason();
	$('#loanValDt').datebox({
		onChange : changeDueDt,
		value :$('#loanValDt').datebox('getValue')
	});
	$('#ttlLoanAmt').numberbox({
		onChange : changeCalc
	});
	queryCustM();
	
	queryReCntrct();
	queryAc($('#cntrctNo').val());
	calcCost();
	calcIntAmt();
	checkNull();
}
function pageOnLoad(data) {
	//交换意见
	$('#ccy').combobox('setValue', 'CNY');
	var row=exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('loanSubmit', row);
	
	var canLoan = SCFUtils.Math(data.obj.arAvalLoan, data.obj.openLoanAmt, 'sub');//可融资额度 = 融资额度-融资余额  （临时栏位）'
	$('#canLoan').numberbox('setValue',canLoan);
	
//	SCFUtils.loadForm('loanSubmit', data);
//	$('#trxDt').val(getDate(new Date()));
	$('#loanValDt').datebox({
		onChange : changeDueDt,
		value :getDate(new Date())
	});
	SCFUtils.controlDate('loanValDt');
//	$('#loanValDt').datebox('setValue', getDate(new Date()));
	$('#cntrctNo').val(data.obj.sysRefNo);
	var options = {};
	options.data = {
		refName : 'poolLoanRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	// var arBal = $('#arBal').numberbox('getValue');// 应收账款余额
	// var loanPerc = SCFUtils.Math($('#loanPerc').numberspinner('getValue'),
	// 0.01, 'mul');// 融资比例
	// var lmtBal = $('#lmtBal').numberbox('getValue');// 信用额度余额
	// var ttlLoanAmt = SCFUtils.Math(SCFUtils.Math(arBal, loanPerc, 'mul'),
	// lmtBal, 'add');// 借款金额=默认为应收款余额*融资比例+信用额度余额,可修改
	checkNull();
	$('#ttlLoanAmt').numberbox('setValue', SCFUtils.Math(data.obj.arAvalLoan,data.obj.openLoanAmt,'sub'));// 借款金额=默认为融资额度-融资余额,可修改
	queryCustM();

	queryAc(data.obj.sysRefNo);
	$('#ttlLoanAmt').numberbox({
		onChange : changeCalc
	});
	
	lookSysRelReason();
}

function checkNull(){
	if (SCFUtils.isEmpty($("#openLoanAmt").numberbox('getValue'))) {
		$("#openLoanAmt").numberbox('setValue',0);
	}
}

function pageOnResultLoad(data) {
	$('#calcBtn').hide();
	SCFUtils.loadForm('loanSubmit', data);
	lookSysRelReason();
}

function pageOnPreLoad(data) {
	$('#calcBtn').show();
	SCFUtils.loadForm('loanSubmit', data);
	$('#loanValDt').datebox({
		onChange : changeDueDt,
		value :$('#loanValDt').datebox('getValue')
	});
	$('#ttlLoanAmt').numberbox({
		onChange : changeCalc
	});
	lookSysRelReason();
}

function pageOnReleasePageLoad(data) {
	//交换意见
	var row=exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('loanSubmit', row);
	
	queryReCntrct();
	queryAc($('#cntrctNo').val());
	$('#accrualTr').hide();
	$('#costTr').hide();
	$('#calcBtn').hide();
	$('#adjustAmtBtn').hide();
	calcCost();
	calcIntAmt();
	checkNull();
	// queryReLoan(data);
	// queryAc();
	lookSysRelReason();
}
// 计算利息
function calcIntAmt() {
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox('getValue');// 借款金额
	var loanRt = SCFUtils.Math($('#loanRt').numberspinner('getValue'), 0.01,
			'mul');// 利率
	var loanDueDt = $('#loanDueDt').datebox('getValue');// 资金到账日期
	var loanValDt = $('#loanValDt').datebox('getValue');// 融资起始日
	var dt = SCFUtils.Math(SCFUtils.DateDiff(loanDueDt, loanValDt), 360, 'div');
	var intAmt = SCFUtils.Math(SCFUtils.Math(ttlLoanAmt, loanRt, 'mul'), dt,
			'mul');
	intAmt = parseFloat(intAmt).toFixed(2);
	$("#accrualText").numberbox('setValue', intAmt);// 本次还利息金额=利息
}
// 计算费用
function calcCost() {
	var ttlLoanAmt = $('#ttlLoanAmt').val();// 借款金额
	var finChgrt = SCFUtils.Math($('#finChgrt').numberspinner('getValue'),
			0.01, 'mul');// 费率
	var costBtnText = SCFUtils.Math(ttlLoanAmt, finChgrt, 'mul');
	costBtnText = parseFloat(costBtnText).toFixed(2);// 费用=借款金额*费率
	$('#costText').numberbox('setValue', costBtnText);
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
}

function onNextBtnClick() {
	var submitMessage = "数据提交成功！";
	if ('RE' != SCFUtils.FUNCTYPE && SCFUtils.OPTSTATUS == 'ADD') {
		submitMessage = '融资申请提交成功！';
		if (checktTtlLoanAmt()) {
			return;
		}
	}
	if (checkDate()) {
		return;
	}
	$('#ttlLoanBal').val($('#ttlLoanAmt').numberbox('getValue'));
	$('#finaSts').val('0');
	var data = SCFUtils.convertArray('loanSubmit');
	$.extend(data, {submitMessage:submitMessage});
	return data;
}

function checktTtlLoanAmt() {
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');
	if (SCFUtils.isEmpty(ttlLoanAmt)) {
		SCFUtils.alert("请输入借款金额!");
		return true;
	}else if(ttlLoanAmt==0){
		SCFUtils.alert("借款金额必须大于0!");
		return true;
	}
	var arAvalLoan = $('#arAvalLoan').numberbox('getValue');//融资额度
	var openLoanAmt = $('#openLoanAmt').numberbox('getValue');//融资余额
	var canAmt = SCFUtils.Math(arAvalLoan, openLoanAmt, 'sub');//可融资额度 = 融资额度-融资余额  （临时栏位）
	var subAmt = SCFUtils.Math(canAmt, ttlLoanAmt, 'sub');
	if (subAmt < 0) {
		SCFUtils.alert("借款金额不能大于可融资额度!");
		return true;
	} else {
		return false;
	}
}

function checkDate() {
	var loanValDt = $('#loanValDt').datebox('getValue');
	var loanDueDt = $('#loanDueDt').datebox('getValue');
	if (SCFUtils.isEmpty(loanDueDt)) {
		SCFUtils.alert("请输入融资到期日！");
		return true;
	}
	var subDate = SCFUtils.DateDiff(loanDueDt, loanValDt);
	if (!SCFUtils.isEmpty(subDate) && subDate < 0) {
		SCFUtils.alert("融资到期日必须大于融资起始日!");
		return true;
	}
	return false;
}

function showCntrct() {
	$.showWindow({
		title : '应收款融资协议',
		useiframe : true,
		modal : true,
		width : '70%',
		height : '80%',
		minimizable : false,
		maximizable : false,
		collapsible : false,
		content : 'url:screen/loan/loanCntrct.html',
		data : {
			'callback' : onCntrctSuccess
		}
	// buttons:[{
	// text:'同意并继续',
	// handler:'protocolReg'
	// },{
	// text:'下载',
	// handler:'downProtocol'
	// }]
	});
}
function onCntrctSuccess() {

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
					$('#selAcNoHD').val(data.rows[0].acNo);
					$('#selAcNmHD').val(data.rows[0].acNm);
//					$('#selAcBkNoHD').val(data.rows[0].acBkNo);
					$('#selAcBkNmHD').val(data.rows[0].acBkNm);

				}
			}
		};
		SCFUtils.ajax(options);
	}
}

function queryReLoan(data) {
	var sysRefNo = data.obj.sysRefNo;
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000128',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					SCFUtils.loadForm('loanSubmit', data.rows);
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

// 借款余额改变时，清空利率费率，利息，费用，让用户再根据利息计算器选最佳一条记录
function changeCalc() {
	$('#loanDueDt').datebox('setValue', '');
	$('#loanRt').numberspinner('setValue', '');
	$('#finChgrt').numberspinner('setValue', '');
	$('#accrualText').numberbox('setValue', '');
	$('#costText').numberbox('setValue', '');
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
					
					var canLoan = SCFUtils.Math(data.rows[0].arAvalLoan, data.rows[0].openLoanAmt, 'sub');//可融资额度 = 融资额度-融资余额  （临时栏位）'
					$('#canLoan').numberbox('setValue',canLoan);
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

function adjustAmt(){
	 SCFUtils.entry('F_P_000397','公共管理信息 > 额度调整申请');
	
}

// // 计算费用
// function calcCost() {
// var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 借款金额
// var finChgrt = SCFUtils.Math($('#finChgrt').numberspinner('getValue'),
// 0.01, 'mul');// 费率
// var costBtnText = SCFUtils.Math(ttlLoanAmt, finChgrt, 'mul');
// costBtnText = parseFloat(costBtnText).toFixed(2);
// $('#costBtnText').val(costBtnText);// 费用=借款金额*费率
// }
// // 计算利息
// function accrualCost() {
// var loanValDt = $('#loanValDt').datebox('getValue');
// var loanDueDt = $('#loanDueDt').datebox('getValue');
// if (checkDate()) {
// return;
// }
// var dt = SCFUtils.Math(SCFUtils.DateDiff(loanDueDt, loanValDt), 360, 'div');
// var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 借款金额
// var loanRt = SCFUtils.Math($('#loanRt').numberspinner('getValue'), 0.01,
// 'mul');// 利率
// var accrualBtnText = SCFUtils.Math(
// SCFUtils.Math(ttlLoanAmt, loanRt, 'mul'), dt, 'mul');
// accrualBtnText = parseFloat(accrualBtnText).toFixed(2);
// $('#accrualBtnText').val(accrualBtnText);// 利息=借款余额*利率*（融资到期日-融资起始日）/360
// }

function showAccrualWindow() {
	var custLevel = $("#custLevel").val();// 客户等级
	var finaTp = $('#finaTp').val();// 融资类型
	var busiTp = $("#busiTp").combobox('getValue');// 业务类型
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 借款金额
	var options = {
		title : '利息/费用查询',
		reqid : 'I_P_000082',
		data : {
			'custLevel' : custLevel,
			'finaTp' : finaTp,
			'busiTp' : busiTp,
			'ttlLoanAmt' : ttlLoanAmt
		},
		buttons : [ {
			text : '确认',
			handler : 'doSave'
		} ],
		onSuccess : accrualSuccess
	};
	SCFUtils.getData(options);
}

function changeDueDt() {
	if (!SCFUtils.isEmpty($('#loanDueDt').datebox('getValue'))) {
		var loanDueDt = SCFUtils.FormatDate(
				$('#loanValDt').datebox('getValue'), $('#acctPeriod').val());
		$('#loanDueDt').datebox('setValue', loanDueDt);
	}
}

function accrualSuccess(data) {
	var loanValDt = $('#loanValDt').datebox('getValue');
	var acctPeriod = data.acctPeriod;// 账期
	$('#acctPeriod').val(acctPeriod);
	var loanDueDt = SCFUtils.FormatDate(loanValDt, acctPeriod);
	$('#loanDueDt').datebox('setValue', loanDueDt);

	$('#finChgrt').numberspinner('setValue', data.finChgrt);// 费率
	$('#loanRt').numberspinner('setValue', data.loanRt);// 利率
	$('#accrualText').numberbox('setValue', data.accrual);
	$('#costText').numberbox('setValue', data.cost);
}

//控制意见的div
function lookSysRelReason() {
	var OldMessageDiv=$("#OldSysRelReason").val();
	if (SCFUtils.FUNCTYPE == "FP" || SCFUtils.FUNCTYPE == "PM") {
		if(OldMessageDiv==null || OldMessageDiv==""){
			$('#messageSpan').css('display', 'none');
			$('#OldMessageDiv').css('display', 'none');
		}
		$('#messageDiv').css('display', 'block');
	} else if (SCFUtils.FUNCTYPE == "DP" || SCFUtils.FUNCTYPE == "RE") {
		// SCFUtils.setTextboxReadonly('sysRelReason', false);
		$('#messageDiv').css('display', 'none');
	}
}
//用于交换意见
function exchangeSysRelReason(data) {
	var sysRelReason=data.sysRelReason;
	var OldSysRelReason=data.OldSysRelReason;
	data.sysRelReason=OldSysRelReason;
	data.OldSysRelReason=sysRelReason;
	
	return data;
}
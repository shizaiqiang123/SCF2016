function initNotice(){
	var notice = "资金到账日只能选择今天(工作日)或者下一个工作日,具体以实际到账日期为准！";
	return notice;
}

function ajaxBox() {
	// var clearPmt = [ {
	// "id" : '0',
	// "text" : "是"
	// }, {
	// "id" : '1',
	// "text" : "否"
	// } ];
	// $("#clearPmt").combobox('loadData', clearPmt);
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

	SCFUtils.setNumberboxReadonly('payPrinAmt', false);

	SCFUtils.setNumberboxReadonly('selAcNoHD', false);

	SCFUtils.setDateboxReadonly('pmtDt', false);
	$('#pmtDt').datebox({
		editable : false
	});

	SCFUtils.setComboReadonly('selAcNo', false);
	$('#selAcNo').combobox({
		editable : false
	});

}

function pageOnLoad(data) {
//	$(document).keydown(function(e) {
//		var k = e.keyCode;
//		var obj = e.target || e.srcElement;
//		var vReadOnly = obj.getAttribute('editable');
//		if(k==8&&vReadOnly==true){
//			return false;
//		}
//	});

	$('#autoAcNo').hide();
	$('#ccy').combobox('setValue', 'CNY');
	SCFUtils.loadForm('loanSubmit', data);
	queryLicenceNo();// 查询营业执照号
	// $("#currFinCost").numberbox('setValue',12345);
	// $('#trxDt').val(getDate(new Date()));
	// $('#pmtDt').datebox('setValue', getDate(new Date()));
	$('#loanId').val(data.obj.sysRefNo);
	var options = {};
	options.data = {
		refName : 'PmtRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);

	var pmtTimes = $('#pmtTimes').val();
	if (SCFUtils.isEmpty(pmtTimes)) {
		$('#pmtTimes').val(1);
	} else {
		$("#pmtTimes").val(SCFUtils.Math($('#pmtTimes').val(), 1, 'add'));
	}

	var lastPayDt = $('#lastPayDt').val();
	if (SCFUtils.isEmpty(lastPayDt)) {
		$('#lastPayDt').val($('#trxDt').val());
	}
	queryCntrct();
	queryCustAc();
	$('#pmtDt').datebox({
		onChange : calcIntCost
	});
	
	controlPmtDt();//将不能点的日期在日历空间中置灰
	
	calcIntAmt();// 计算利息
	changeCost();// 计算费用
	// changeClearPmt();//计算'本次还本金金额'和'合计还款金额'
}

//修改资金到账日同时计算利息费用
function calcIntCost(){
	calcIntAmt();// 计算利息
	changeCost();// 计算费用
}

function controlPmtDt(){
	var now = $('#trxDt').val();
	var d1=null;
	var d2=null;
	if (SCFUtils.isHoliday(now)) {
		d1=SCFUtils.dateFormat(SCFUtils.getAfterWorkingDate(now, 1), 'yyyy-MM-dd');
		d2=SCFUtils.dateFormat(SCFUtils.getAfterWorkingDate(d1, 1), 'yyyy-MM-dd');
	}else{
		d1=now;
		d2=SCFUtils.dateFormat(SCFUtils.getAfterWorkingDate(now, 1), 'yyyy-MM-dd');
	} 
	
	$('#pmtDt').datebox().datebox('calendar').calendar(
			{
				validator : function(date) {
					date=SCFUtils.dateFormat(date, 'yyyy-MM-dd');
					
					var re1=SCFUtils.DateDiff(d1,date);
					var re2=SCFUtils.DateDiff(d2,date);
					return re1 == 0 || re2 == 0;
				}
			});
	$('#pmtDt').datebox('setValue',d1);
}

function acNoSts() {
	if ($('#acNoSts').val() == "1") {
		$('#handAcNo').hide();
		$('#autoAcNo').show();
	} else {
		$('#autoAcNo').hide();
		$('#handAcNo').show();
	}
}

// 点击'手动输入账号'
function changeHand() {
	$('#handAcNo').hide();
	$('#autoAcNo').show();

	SCFUtils.setTextReadonly('selAcNm', false);
	SCFUtils.setTextReadonly('selAcBkNm', false);

	$('#selAcNm').val('');
	$('#selAcNoHD').numberbox('setValue', '');
	$('#selAcBkNm').val('');

	$('#acNoSts').val('1');// 表示手动

	$('#selAcNoHD').numberbox({
		required : true
	});

	$('#selAcNm').validatebox({
		required : true
	});
	$('#selAcBkNm').validatebox({
		required : true
	});
}

// 点击'选择已有账号'
function changeAuto() {
	$('#autoAcNo').hide();
	$('#handAcNo').show();

	queryCustAc();
	SCFUtils.setTextReadonly('selAcNm', true);
	SCFUtils.setTextReadonly('selAcBkNm', true);

	$('#acNoSts').val('0');// 表示自动

	$('#selAcNoHD').numberbox({
		required : false
	});

	$('#selAcNm').validatebox({
		required : false
	});
	$('#selAcBkNm').validatebox({
		required : false
	});
}

// 根据协议编号查询信息
function queryCntrct() {
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
					$("#openLoanAmt").val(data.rows[0].openLoanAmt);
					$("#arAvalLoan").val(data.rows[0].arAvalLoan);
					$("#buyerId").val(data.rows[0].buyerId);

				}
			}
		};
		SCFUtils.ajax(options);
	}
}

// 查询营业执照号
function queryLicenceNo() {
	var selId = $('#selId').val();
	if (!SCFUtils.isEmpty(selId)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000068',
				sysRefNo : selId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#licenceNo').val(data.rows[0].licenceNo);
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

// 根据selId和buyerID查询客户账号
function queryCustAc() {
	var licenceNo = $('#licenceNo').val();
	if (!SCFUtils.isEmpty(licenceNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000259',
				licenceNo : licenceNo,
				buyerId : $('#buyerId').val()
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#selAcNo').combobox('loadData', data.rows);
					$('#selAcNo').combobox('setValue', data.rows[0].acNo);
					$('#selAcNm').val(data.rows[0].acNm);
					$('#selAcBkNo').val(data.rows[0].acBkNo);
					$('#selAcBkNm').val(data.rows[0].acBkNm);
				} else {
					SCFUtils.alert("没有查到相应的账号！");
					// $('#selAcNo').validatebox({
					// required : true
					// });
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

// 根据选择的还款账号改变账号信息
function changeAcInfo() {
	var selAcNo = $('#selAcNo').combobox('getValue');

	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000273',
			acNo : selAcNo,
			buyerId : $('#buyerId').val()
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$('#selAcNm').val(data.rows[0].acNm);
				$('#selAcBkNo').val(data.rows[0].acBkNo);
				$('#selAcBkNm').val(data.rows[0].acBkNm);
			}
		}
	};
	SCFUtils.ajax(options);
}

/*// 检查'资金到账日'，只能等于今天或者下一个工作日
function checkPmtDt() {

	var flag = false;
	var pmtDt = $('#pmtDt').datebox('getValue');// 资金到账日期
	if (SCFUtils.isHoliday(pmtDt)) {
		SCFUtils.alert("资金到账日不能是节假日");
		pmtDt = $('#pmtDt').datebox('setValue', '');
		return true;
	} else if (SCFUtils.DateDiff(pmtDt, $('#trxDt').val()) != 0
			&& SCFUtils.DateDiff(SCFUtils.dateFormat(SCFUtils
					.getAfterWorkingDate($('#trxDt').val(), 1), 'yyyy-MM-dd'),
					pmtDt) != 0) {
		SCFUtils.alert("资金到账日只能等于今天或者下一个工作日");
		pmtDt = $('#pmtDt').datebox('setValue', '');
		return true;
	}
	return flag;
}*/

// 计算利息
function calcIntAmt() {
	var ttlLoanBal = $("#ttlLoanBal").numberbox('getValue');// 借款余额
	var loanRt = SCFUtils.Math($("#loanRt").val(), 0.01, 'mul');// 利率
	var dt = 0;
	var pmtDt = $('#pmtDt').datebox('getValue');// 资金到账日期
	var loanValDt = $('#loanValDt').datebox('getValue');// 融资起始日
	var lastPayDt = $('#lastPayDt').val();// 上次还款日
	var pmtTimes = $("#pmtTimes").val();
	if (pmtTimes == '1') {
		dt = SCFUtils.Math(SCFUtils.DateDiff(pmtDt, loanValDt), 360, 'div');
	} else {
		dt = SCFUtils.Math(SCFUtils.DateDiff(pmtDt, lastPayDt), 360, 'div');
	}
	var intAmt = SCFUtils.Math(SCFUtils.Math(ttlLoanBal, loanRt, 'mul'), dt,
			'mul');
	intAmt = parseFloat(intAmt).toFixed(2);
	$("#intAmt").val(intAmt);// 利息
	$("#payIntAmt").numberbox('setValue', intAmt);// 本次还利息金额=利息
}
// 根据是'全额还款'计算'本次还本金金额'和'合计还款金额'
function changeClearPmtY() {
	var ttlLoanBal = $("#ttlLoanBal").numberbox('getValue');// 借款余额
	var currFinCost = $('#currFinCost').numberbox('getValue');// 应收费用
	var intAmt = $('#intAmt').val();// 利息
	SCFUtils.setNumberboxReadonly('payPrinAmt', true);
	$("#payPrinAmt").numberbox('setValue', ttlLoanBal);// 本次还本金金额
	var ttlPmtAmt = SCFUtils.Math(
			SCFUtils.Math(ttlLoanBal, currFinCost, 'add'), intAmt, 'add');
	ttlPmtAmt = parseFloat(ttlPmtAmt).toFixed(2);
	$('#ttlPmtAmt').numberbox('setValue', ttlPmtAmt);// 合计还款金额
}

// 根据是'部分还款'计算'本次还本金金额'和'合计还款金额'
function changeClearPmtN() {
	SCFUtils.setNumberboxReadonly('payPrinAmt', false);
	changeTtlPmtAmt();// 根据'还款金额'计算'合计还款金额'
}

// '部分还款'的时候，根据'还款金额'计算'合计还款金额'
function changeTtlPmtAmt() {
	var payPrinAmt = $("#payPrinAmt").numberbox('getValue');// 本次还本金金额
	var currFinCost = $('#currFinCost').numberbox('getValue');// 应收费用
	var intAmt = $('#intAmt').val();// 利息
	if (SCFUtils.isEmpty(payPrinAmt)) {
		return;
	}
	// if(checkPayPrinAmt()){
	// return ;
	// }
	var ttlPmtAmt = SCFUtils.Math(SCFUtils.Math(payPrinAmt, currFinCost, 'add'),
			intAmt, 'add');
	ttlPmtAmt = parseFloat(ttlPmtAmt).toFixed(2);
	$('#ttlPmtAmt').numberbox('setValue', ttlPmtAmt);// 合计还款金额
}

function checkPayPrinAmt() {
	var clearPmt = $("input[name='clearPmt']:checked").val();
	var flag = false;
	var payPrinAmt = $("#payPrinAmt").numberbox('getValue');// 本次还本金金额
	var ttlLoanBal = $("#ttlLoanBal").numberbox('getValue');// 借款余额
	if (SCFUtils.Math(payPrinAmt, ttlLoanBal, 'sub') > 0) {
		SCFUtils.alert("还本金金额不能超过借款余额！");
		flag = true;
	} else if (clearPmt == '1'
			&& SCFUtils.Math(payPrinAmt, ttlLoanBal, 'sub') == 0) {
		SCFUtils.alert("部分还款时还本金金额不能等于借款余额！");
		flag = true;
	}
	return flag;
}

// 计算费用
function changeCost() {

	var ttlLoanBal = $("#ttlLoanBal").numberbox('getValue');// 借款余额
	var finChgrt = SCFUtils.Math($("#finChgrt").val(), 0.01, 'mul');// 费率
	var dt = 0;
	var pmtDt = $('#pmtDt').datebox('getValue');// 资金到账日期
	var loanValDt = $('#loanValDt').datebox('getValue');// 融资起始日
	var lastPayDt = $('#lastPayDt').val();// 上次还款日
	var pmtTimes = $("#pmtTimes").val();
	if (pmtTimes == '1') {
		dt = SCFUtils.Math(SCFUtils.DateDiff(pmtDt, loanValDt), 360, 'div');
	} else {
		dt = SCFUtils.Math(SCFUtils.DateDiff(pmtDt, lastPayDt), 360, 'div');
	}
	var currFinCost = SCFUtils.Math(SCFUtils.Math(ttlLoanBal, finChgrt, 'mul'),
			dt, 'mul');
	currFinCost = parseFloat(currFinCost).toFixed(2);
	$('#currFinCost').numberbox('setValue', currFinCost);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
	$("input[name=clearPmt]").attr("disabled", true);
	acNoSts();
	// $("#handBtn").css({'display':'none'});
	// $("#autoBtn").css({'display':'none'});

	// $("#handBtn").removeAttr('onclick');
	// $("#autoBtn").removeAttr('onclick');

	$("#handBtn").hide();
	$("#autoBtn").hide();
	$("#calcInfo").hide();
	$("#queryPmt").hide();
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);

	queryCustAc();
	$('#selAcNo').combobox('setValue', data.obj.selAcNo);

	acNoSts();
	// $("#handBtn").css({'display':'block'});
	// $("#autoBtn").css({'display':'block'});
	if ($('#acNoSts').val() == "1") {
		SCFUtils.setTextReadonly('selAcNm', false);
		SCFUtils.setTextReadonly('selAcBkNm', false);
	}
}

function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}

function onNextBtnClick() {
	if (checkPayPrinAmt()) {
		return;
	}
	if ($('#acNoSts').val() == "1") {
		$('#selAcNo').combobox('setValue',
				$('#selAcNoHD').numberbox('getValue'));
	}
	$('#pmtSts').val('0');
	$('#lastPayDt').val(getDate(new Date()));
	var data = SCFUtils.convertArray('loanSubmit');
	$.extend(data, {
		submitMessage : '还款登记提交成功！'
	});
	return data;
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}
// 根据融资ID查看还款历史
function queryPmtMshowWindow() {
	var loanId = $('#loanId').val();
	if (loanId) {
		var options = {
			title : '查看还款历史',
			height : '370',
			reqid : 'I_P_000090',
			data : {
				'loanId' : loanId
			},
			buttons : [ {
				text : '关闭',
				handler : 'doSave'
			} ]
		};
		SCFUtils.getData(options);
	}

}

// 查看计算利息详情信息
function calcInfoDetails() {
	var row = {};
	row.ttlLoanAmt = $("#ttlLoanAmt").val();// 借款金额
	row.ttlLoanBal = $("#ttlLoanBal").numberbox('getValue');// 借款余额
	row.loanRt = $("#loanRt").val();// 利率
	row.finChgrt = $("#finChgrt").val();// 费率
	row.dt = 0;
	row.pmtDt = $('#pmtDt').datebox('getValue');// 资金到账日期
	row.loanValDt = $('#loanValDt').datebox('getValue');// 融资起始日
	row.lastPayDt = $('#lastPayDt').val();// 上次还款日
	row.pmtTimes = $("#pmtTimes").val();// 还款次数
	var options = {
		title : '利息费用计算详情',
		height : '600',
		reqid : 'I_P_000091',
		data : {
			'row' : row
		},
		buttons : [ {
			text : '关闭',
			handler : 'doSave'
		} ]
	};
	SCFUtils.getData(options);

}
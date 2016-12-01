function initNotice(){
	var notice = "资金到账日只能选择今天(工作日)或者下一个工作日,具体以实际到账日期为准！";
	return notice;
}
function ajaxBox() {
	var data = [ {
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
		"text" : "信用保险项下"
	}, {
		"id" : '4',
		"text" : "动产质押融资"
	}, {
		"id" : '7',
		"text" : "应收账款质押"
	} ];
	$("#busiTp").combobox('loadData', data);
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
function pageOnInt() {
	ajaxBox();
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setComboReadonly('busiTp', true);
	SCFUtils.setComboReadonly('ccy', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('buyerId', true);
	SCFUtils.setTextReadonly('buyerNm', true);
	SCFUtils.setTextReadonly('invNo', true);
	SCFUtils.setNumberboxReadonly('invAmt', true);
	//SCFUtils.setNumberboxReadonly('acctAmt', true);
	SCFUtils.setNumberboxReadonly('invBal', true);
	//SCFUtils.setDateboxReadonly("invDt", true);
	//SCFUtils.setDateboxReadonly("invValDt", true);
	SCFUtils.setNumberspinnerReadonly("loanPerc",true);
	SCFUtils.setNumberspinnerReadonly("acctPeriod",true);
	SCFUtils.setNumberboxReadonly('invLoanAval', true);
	//SCFUtils.setFormReadonly('#loanSubmit', true);
	SCFUtils.setComboReadonly('OldSysRelReason', true);
}

function exchangeSysRelReason(data) {
	if (data.sysRelReason == undefined || data.sysRelReason == null) {
		data.sysRelReason = "";
		data.OldSysRelReason = "";
		return data;
	}
	var sysRelReason = data.sysRelReason;
	var OldSysRelReason = data.OldSysRelReason;
	data.sysRelReason = OldSysRelReason;
	data.OldSysRelReason = sysRelReason;

	return data;
}

// 控制意见的div
function lookSysRelReason() {
	var OldMessageDiv = $("#OldSysRelReason").val();
	$('#messageListDiv').css('margin-left', '20px');
	if (SCFUtils.FUNCTYPE == "FP" || SCFUtils.FUNCTYPE == "PM") {
		if (OldMessageDiv == null || OldMessageDiv == "") {
			$('#OldMessageDiv').css('display', 'none');
			$('#messageSpanY').css('display', 'block');
			$('#messageSpanN').css('display', 'none');

		} else {
			$('#messageSpanY').css('display', 'none');
			$('#messageDivFa').css('margin-top', '-20px');

		}
		$('#messageDiv').css('display', 'block');
		
		// SCFUtils.setTextboxReadonly('sysRelReason', false);// 保护意见
	} else if (SCFUtils.FUNCTYPE == "DP" || SCFUtils.FUNCTYPE == "RE") {
		// SCFUtils.setTextboxReadonly('sysRelReason', false);
		$('#messageDivFa').css('display', 'none');
	} else {
		$('#messageDivFa').css('display', 'none');
	}
}

function pageOnFPLoad(data) {
	pageOnReleasePageLoad(data);
	initialInvDueDt = $("#invDueDt").datebox('getValue');//得到原先的到期日 by JinJH
	initialAcctPeriod = $("#acctPeriod").numberspinner('getValue');//得到原先的账期
	lookSysRelReason();
}

var initialInvDueDt = 0;//记录原先的到期日 new on 20160805 by JinJH
var initialAcctPeriod =0;//记录原先的账期
function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	$('#ccy').combobox('setValue', data.obj.invCcy);
	SCFUtils.loadForm('loanSubmit', data);
	/*var options = {};
	options.data = {
		refName : 'PmtRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);*/
	queryCntrct(data.obj.cntrctNo);
	
	//controlPmtDt();//将不能点的日期在日历空间中置灰	
	initialInvDueDt = $("#invDueDt").datebox('getValue');//得到原先的到期日 by JinJH
	initialAcctPeriod = $("#acctPeriod").numberspinner('getValue');//得到原先的账期
	lookSysRelReason();
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('loanSubmit', data);
	lookSysRelReason();
	
}

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('loanSubmit', data);
	initialInvDueDt = $("#invDueDt").datebox('getValue');//得到原先的到期日 by JinJH
	initialAcctPeriod = $("#acctPeriod").numberspinner('getValue');//得到原先的账期
	lookSysRelReason();
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('loanSubmit', row);
	$('#ccy').combobox('setValue', data.obj.invCcy);
	queryCntrct(data.obj.cntrctNo);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function onNextBtnClick() {
	var invDueDt = $("#invDueDt").datebox('getValue');//得到到期日
	if(SCFUtils.DateDiff(invDueDt,SCFUtils.getcurrentdate())<0){
		SCFUtils.alert('到期日期不能小于当前日期！');
		return;
	}
	var a= $("#busiTp").combobox('getValue');
	var data = SCFUtils.convertArray('loanSubmit');
	if(SCFUtils.FUNCTYPE == 'PM'){//申请会出现这2个字段没值的情况  这里手动加
		data['sysLockFlag'] = 'F';
		data['sysTrxSts'] = 'P';
	}
	data['invCcy'] = 'CNY';
	return data;
}
//查询额度关联关系表
function queryCntrct(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000389',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$('#sellerInstCd').val(data.rows[0].sellerInstCd);
				$("#busiTp").combobox('setValue', data.rows[0].busiTp);
			}
		}
	};
	SCFUtils.ajax(options);
}
function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}


function changeinvDueDt(){
	var invDueDt = $("#invDueDt").datebox('getValue');//得到到期日
	if(SCFUtils.DateDiff(invDueDt,SCFUtils.getcurrentdate())<0){
		SCFUtils.alert('到期日期不能小于当前日期！');
	}else{
		var difference= SCFUtils.DateDiff(invDueDt,initialInvDueDt); //账期差额--现在的到期日减去原先的到期日
		$("#acctPeriod").numberspinner('setValue',SCFUtils.Math(initialAcctPeriod,difference,'add'));
		initialInvDueDt = $("#invDueDt").datebox('getValue');//得到原先的到期日
		initialAcctPeriod = $("#acctPeriod").numberspinner('getValue');//得到原先的账期
	}
}
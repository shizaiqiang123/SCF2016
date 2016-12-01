//function beforeLoad() {
//	var data = {
//		cacheType : 'non'
//	};
//	return {
//		data : data
//	};
//}

function pageOnInt() {
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setTextReadonly("lmtAmt", true);
	SCFUtils.setTextReadonly("openLoanAmt", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setNumberboxReadonly("currentLoanAmt", true);
	SCFUtils.setNumberboxReadonly("lmtAmt", true);
	SCFUtils.setNumberboxReadonly("openLoanAmt", true);
	SCFUtils.setNumberboxReadonly("arAvalLoan", true);
	SCFUtils.setDateboxReadonly("dueDt", true);
	SCFUtils.setComboReadonly("finaTp", true);
	SCFUtils.setComboReadonly("lmtCcy", true);
	ajaxbox();
}

function ajaxbox() {
	var busiTp = [ {
		"id" : '0',
		"text" : "应收款融资",
	} ];
	$('#busiTp').combobox('loadData', busiTp);

	var finaTp = [ {
		"id" : '0',
		"text" : "普通融资",
		"selected" : true
	}, {
		"id" : '1',
		"text" : "买断式融资"
	} ];
	$('#finaTp').combobox('loadData', finaTp);
	
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
					$('#lmtCcy').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(optt);
}

function pageOnResultLoad(data) {
//	$("#readme")[0].disabled = true;
//	$("#readme")[0].checked = true;
	SCFUtils.loadForm('mainForm', data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	$('#preLmtAmt').val(data.obj.lmtAmt);
	queryCust();
}

//function showProtocol() {
//	$.showWindow({
//		title : '应收款融资协议',
//		useiframe : true,
//		modal : true,
//		width : '70%',
//		height : '80%',
//		minimizable : false,
//		maximizable : false,
//		collapsible : false,
//		content : 'url:jsp/1441856796094text.txt.txt',
//		data : {
//			'reqLoginType' : 'noLogin',
//			'callback' : onproSuccess
//		},
//		buttons : [ {
//			text : '同意并继续',
//			handler : 'protocolReg'
//		}, {
//			text : '下载',
//			handler : 'downProtocol'
//		} ]
//	});
//}

//function onproSuccess() {
//	$("#readme")[0].checked = true;
//}

function queryCust() {
	var sysRefNo = $('#selId').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000229',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#selNm').val(data.rows[0].custNm);
				}
			}
		};
		SCFUtils.ajax(option);
	}
}

function calculatecurrentLoanAmt(){
	var arAvalLoan = $('#arAvalLoan').numberbox('getValue');
	var lmtAmt = $('#lmtAmt').numberbox('getValue');
	var openLoanAmt = $('#openLoanAmt').numberbox('getValue');
	$("#currentLoanAmt").numberbox('setValue',SCFUtils.Math(SCFUtils.Math(arAvalLoan,lmtAmt,'add'),openLoanAmt,'sub'));
}

function setTrxDt(){
	var trxDt = new Date();
	$('#trxDt').val(SCFUtils.dateFormat(trxDt,'yyyy-MM-dd'));
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

function onNextBtnClick() {
//	if($("#readme")[0].checked == false){		
//		SCFUtils.alert('请阅读《应收款融资协议》');
//		return;
//	}	
	$('#lmtSts').val(1);
	$('#chgSts').val(0);
	setTrxDt();
	var data = SCFUtils.convertArray('mainForm');
	return data;
}

function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
	calculatecurrentLoanAmt();
	$('#finaTp').combobox('select', '0');
	$('#lmtCcy').combobox('setValue', 'CNY');
	queryCust();
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
	$('#chgLmtAmt').numberbox('setValue','0');
	calculatecurrentLoanAmt();
	$('#finaTp').combobox('select', '0');
	$('#lmtCcy').combobox('setValue', 'CNY');
	queryCust();
}
//function queryCntrctText() {
//}

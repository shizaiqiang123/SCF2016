function pageOnInt() {
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setDateboxReadonly("dueDt", true);
	SCFUtils.setTextReadonly("acNm", true);
	SCFUtils.setTextReadonly("acNo", true);
	SCFUtils.setTextReadonly("acBkNm", true);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setNumberboxReadonly("arBal", true);
	SCFUtils.setNumberboxReadonly("arAvalLoan", true);
	SCFUtils.setComboReadonly("finaTp", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("payChgTp", true);
	SCFUtils.setComboReadonly("payIntTp", true);
	SCFUtils.setComboReadonly("lmtCcy", true);
	SCFUtils.setTextboxReadonly('OldSysRelReason', true);
	ajaxbox();
}

function ajaxbox() {
	var busiTp = [ {
		"id" : '0',
		"text" : "应收款融资"
	} ];
	$('#busiTp').combobox('loadData', busiTp);

	var finaTp = [ {
		"id" : '0',
		"text" : "普通融资"
	}, {
		"id" : '1',
		"text" : "买断式融资"
	} ];
	$('#finaTp').combobox('loadData', finaTp);

	var payIntTp = [ {
		"id" : '0',
		"text" : "利随本清"
	} ];
	$('#payIntTp').combobox('loadData', payIntTp);

	var payChgTp = [ {
		"id" : '0',
		"text" : "先收费"
	}, {
		"id" : '1',
		"text" : "后收费"
	} ];
	$('#payChgTp').combobox('loadData', payChgTp);

	var approvalSts = [ {
		"id" : '1',
		"text" : "通过"
	}, {
		"id" : '2',
		"text" : "不通过"
	} ];
	$('#approvalSts').combobox('loadData', approvalSts);

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
	$("#queryCntrct").remove();
	SCFUtils.loadForm('mainForm', data);
	lookSysRelReason();
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	queryCust();
	findAcNo();
	lookSysRelReason();
}

function onNextBtnClick() {
	var submitMessage = "数据提交成功！";
	if ('PM' == SCFUtils.FUNCTYPE) {
		submitMessage = '协议签约审核已完成，请提交复核处理！';
	}else if('RE' == SCFUtils.FUNCTYPE){
		submitMessage = '协议签约复核已完成！';
	}
	var data = SCFUtils.convertArray('mainForm');
	$.extend(data, {submitMessage:submitMessage});
	return data;
}

// 打回处理
function pageOnFPLoad(data) {
	// 交换意见
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('mainForm', row);
	lookSysRelReason();
	queryCust();
	findAcNo();
}

function pageOnLoad(data) {
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('mainForm', row);
	lookSysRelReason();
	// SCFUtils.loadForm('mainForm', data);
	queryCust();
	findAcNo();
	$('#approvalSts').combobox('setValue', '');
}

function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	queryCust();
	findAcNo();
	lookSysRelReason();
}

function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	lookSysRelReason();
}

function pageOnReleasePageLoad(data) {
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('mainForm', row);
	lookSysRelReason();
	// SCFUtils.loadForm('mainForm', data);
	queryCust();
	findAcNo();
}
// 对意见栏位的显示隐藏
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
// 意见交换显示
function exchangeSysRelReason(data) {
	var sysRelReason = data.sysRelReason;
	var OldSysRelReason = data.OldSysRelReason;
	data.sysRelReason = OldSysRelReason;
	data.OldSysRelReason = sysRelReason;

	return data;
}
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

function findAcNo() {
	var sysRefNo = $("#sysRefNo").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000250',
			sysRefNo : sysRefNo
		// ,
		// sysTrxSts : "P"
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					// ajaxCustLevel(data.rows);
				} else {
					if ((data.rows).length != 1) {
						SCFUtils.alert("系统错误，请联系管理员！");
					} else {
						$('#acNm').val(data.rows[0].acNm);
						$('#acNo').val(data.rows[0].acNo);
						$('#acBkNm').val(data.rows[0].acBkNm);
						// 必输框有值情况下显示错误，手动修改
						$('#acNm').val(data.rows[0].acNm).validatebox(
								'validate');
						$('#acNm_succeed').removeClass('succeed');
						$('#acNo').val(data.rows[0].acNo).validatebox(
								'validate');
						$('#acNo_succeed').removeClass('succeed');
						$('#acBkNm').val(data.rows[0].acBkNm).validatebox(
								'validate');
						$('#acBkNm_succeed').removeClass('succeed');
						return;
					}

				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function calculateArAvalLoan() {
	var loanPerc = $('#loanPerc').spinner('getValue');
	var arBal = $('#arBal').val();
	var temp = SCFUtils.Math(loanPerc, arBal, 'mul');
	var arAvalLoan = SCFUtils.Math(temp, 100, 'div').toFixed(2);
	$('#arAvalLoan').numberbox('setValue', arAvalLoan);
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
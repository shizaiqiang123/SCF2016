function beforeLoad(){
	var data = {
		cacheType : 'non'
	};
	return {data:data};
}

function pageOnInt() {
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("cntrctNo", true);
//	SCFUtils.setNumberboxReadonly("sumArBal", true);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setTextReadonly("acNm", true);
	SCFUtils.setTextReadonly("acNo", true);
	SCFUtils.setTextReadonly("acBkNm", true);
	SCFUtils.setNumberboxReadonly("arBal", true);
	SCFUtils.setDateboxReadonly("dueDt", true);
	SCFUtils.setComboReadonly("finaTp", true);
	SCFUtils.setComboReadonly("lmtCcy", true);
	ajaxbox();
}

function ajaxbox() {
	var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000265',
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#busiTp').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(option);

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

/*function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	queryCust();
	findAcNo();
}

function pageOnReleaseResultLoad(data) {
	$("#readme")[0].checked = true;
	SCFUtils.loadForm('mainForm', data);
}

function pageOnReleasePageLoad(data) {
	$("#readme")[0].checked = true;
	SCFUtils.loadForm('mainForm', data);
	queryCust();
	findAcNo();
}*/

function pageOnResultLoad(data) {
	$("#readme")[0].disabled = true;
	$("#readme")[0].checked = true;
	$("#queryCntrct").remove();
	SCFUtils.loadForm('mainForm', data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	queryCust();
	findAcNo();
}

function showProtocol() {
	$.showWindow({
		title : '应收款融资协议',
		useiframe : true,
		modal : true,
		width : '70%',
		height : '80%',
		minimizable : false,
		maximizable : false,
		collapsible : false,
		content : 'url:jsp/1441856796094text.txt.txt',
		data : {
			'reqLoginType' : 'noLogin',
			'callback' : onproSuccess
		},
		buttons : [ {
			text : '同意并继续',
			handler : 'protocolReg'
		}, {
			text : '下载',
			handler : 'downProtocol'
		} ]
	});
}

function onproSuccess() {
	$("#readme")[0].checked = true;
}

function goLogin() {
	parent.window.location = SCFUtils.ROOTURL + "/index.jsp";
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
	if($("#readme")[0].checked == false){		
		SCFUtils.alert('请阅读《应收款融资协议》');
		return;
	}	
	var data = SCFUtils.convertArray('mainForm');
	var acNm = $("#acNm").val();
	var acNo = $("#acNo").val();
	var acBkNm = $("#acBkNm").val();
	var sysRefNo = $("#sysRefNo").val();
	var userId = $("#userId").val();
	var buyerId = $("#buyerId").val();
	var acTp = $("#acTp").val();
	var sysBusiUnit = findBU();
	var accountList = {
		sysRefNo : sysRefNo,
		sysEventTimes : 0,
		acNm : acNm,
		acOwnerid : userId,
		acNo : acNo,
		acBkNm : acBkNm,
		cntrctNo : sysRefNo,
		buyerId : buyerId,
		acTp : acTp,
		sysBusiUnit : sysBusiUnit
	};
	var grid = {};
	grid.accountList = SCFUtils.json2str(accountList);
	$.extend(data, grid,{submitMessage:'协议签约完成，您可通过协议明细查询功能查询审批进度！'});
	return data;
}

function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	$('#finaTp').combobox('select', '0');
	queryCust();
}

function queryCntrctText(){}

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
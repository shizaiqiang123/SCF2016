function pageOnInt() {
	SCFUtils.setFormReadonly('#mainForm', true);
	SCFUtils.setComboReadonly("lmtSts", false);
	SCFUtils.setTextboxReadonly('sysRelReason', false);
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

	var lmtSts = [ {
		"id" : '2',
		"text" : "通过"
	}, {
		"id" : '3',
		"text" : "不通过"
	} ];
	$('#lmtSts').combobox('loadData', lmtSts);

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
	SCFUtils.loadForm('mainForm', data);
	lookSysRelReason();
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	queryCust();
	findAcNo();
	lookSysRelReason();
	calculateLmtAmt();
}

function onNextBtnClick() {
	if($('#lmtSts').combobox('getValue')==3){
		$('#lmtAmt').numberbox('setValue',$('#preLmtAmt').val());
	}
	var data = SCFUtils.convertArray('mainForm');
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
//	data.obj.sysRelReason="";
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('mainForm', row);
	
	$('#lmtSts').combobox('setValue', '');
	$('#preLmtAmt').numberbox('setValue',data.obj.lmtAmt);
	calculateLmtAmt();
	lookSysRelReason();
	queryCust();
	findAcNo();
}

function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	queryCust();
	findAcNo();
	lookSysRelReason();
	calculateLmtAmt();
}

function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	lookSysRelReason();
}

function pageOnReleasePageLoad(data) {
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('mainForm', row);
	$('#preLmtAmt').numberbox('setValue',data.obj.lmtAmt);
	lookSysRelReason();
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

function calculateLmtAmt() {
	var lmtAmt = $("#preLmtAmt").val();
	var chgLmtAmt = $("#chgLmtAmt").numberbox('getValue');
	$("#lmtAmt").numberbox('setValue', SCFUtils.Math(lmtAmt, chgLmtAmt, 'add'));
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

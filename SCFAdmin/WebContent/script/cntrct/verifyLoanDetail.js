function initToolBar(){
	return ['prev','cancel'];
}

function beforeLoad(){
	var data = {
		cacheType : 'non'
	};
	return {data:data};
}

function pageOnInt() {
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
		"id" : '0',
		"text" : "未审核"
	}, {
		"id" : '1',
		"text" : "审核通过"
	}, {
		"id" : '2',
		"text" : "审核不通过"
	}];
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
	SCFUtils.loadForm('mainForm', data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	queryCntrctE(data);
	queryCust();
	findAcNo();
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	queryLicenceNo();
	querySumInvcM();
	queryCust();
	findAcNo();
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
//			,
//			sysTrxSts : "P"
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
						//必输框有值情况下显示错误，手动修改
						$('#acNm').val( data.rows[0].acNm).validatebox('validate');
						$('#acNm_succeed').removeClass('succeed');
						$('#acNo').val( data.rows[0].acNo).validatebox('validate');
						$('#acNo_succeed').removeClass('succeed');
						$('#acBkNm').val( data.rows[0].acBkNm).validatebox('validate');
						$('#acBkNm_succeed').removeClass('succeed');
						return;
					}

				}
			}
		}
	};
	SCFUtils.ajax(options);
}

//function queryCntrctE(data) {
//	var options = {
//		url : SCFUtils.AJAXURL,
//		data : {
//			queryId : 'Q_P_000249',
//			sysRefNo : data.obj.sysRefNo,
//			sysEventTimes : data.obj.sysEventTimes
//		},
//		callBackFun : function(data) {
//			if (data.success&&!SCFUtils.isEmpty(data.rows)) {
//				SCFUtils.loadForm('mainForm', data.rows[0]);
//			}
//		}
//	};
//	SCFUtils.ajax(options);
//}

function queryLicenceNo() {
	var sysRefNo = $('#selId').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000268',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#licenceNo').val(data.rows[0].licenceNo);
				}
			}
		};
		SCFUtils.ajax(option);
	}
}

function querySumInvcM() {
	var licenceNo = $('#licenceNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		// async : false,
		data : {
			cacheType : 'non',
			licenceNo : licenceNo,
			queryId : 'Q_P_000274'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#sumArBal').numberbox('setValue', data.rows[0]);
			}
		}
	};
	SCFUtils.ajax(options);
}

/*function queryBusiNm() {
	var productId = $('#busiTp').val();
	if (!SCFUtils.isEmpty(productId)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000265',
				productId : productId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#busiNm').val(data.rows[0].productNm);
				}
			}
		};
		SCFUtils.ajax(option);
	}
}*/

/*function queryAcNo() {
	var acOwnerid = $('#selId').val();
	if (!SCFUtils.isEmpty(acOwnerid)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000228',
				acOwnerid : acOwnerid
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#acNo').val(data.rows[0].acNo);
				}
			}
		};
		SCFUtils.ajax(option);
	}
}*/

/*function queryBuyer2Nm() {
	var custId = $('#buyer2Id').val();
	if (!SCFUtils.isEmpty(custId)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000248',
				custId : custId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#buyer2Nm').val(data.rows[0].custNm);
				}
			}
		};
		SCFUtils.ajax(option);
	}
}

function queryBuyer3Nm() {
	var custId = $('#buyer3Id').val();
	if (!SCFUtils.isEmpty(custId)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000248',
				custId : custId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#buyer3Nm').val(data.rows[0].custNm);
				}
			}
		};
		SCFUtils.ajax(option);
	}
}*/


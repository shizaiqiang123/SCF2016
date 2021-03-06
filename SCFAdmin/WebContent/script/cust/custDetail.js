function initToolBar() {
	return [ 'prev', 'cancel' ];
}

function ajaxBox() {
	var data = [ {
		"id" : '0',
		"text" : "领用"
	}, {
		"id" : '1',
		"text" : "归还"
	} ];
	$("#lmtFlg").combobox('loadData', data);

	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);
}

function pageOnInt() {
	ajaxBox();
	SCFUtils.setFormReadonly("#custForm", true);

}

function pageOnPreLoad(data) {

}
function pageOnLoad(data) {
	$("#tr4").hide();
	$("#tr5").hide();
	createTree(data);
}

function changeLmt() {
	var lmtFlg = $("#lmtFlg").combobox('getValue');
	if (lmtFlg == '0') {
		$('#lmtRecover').numberbox('setValue', 0);
	} else if (lmtFlg == '1') {
		$('#lmtAllocate').numberbox('setValue', 0);
	}

}

function checkNull() {
	var lmtAmt = $('#lmtAmt').numberbox('getValue');
	var lmtBal = $('#lmtBal').numberbox('getValue');
	var lmtAllocate = $('#lmtAllocate').numberbox('getValue');
	var lmtRecover = $('#lmtRecover').numberbox('getValue');
	var buyerLmtAmt = $('#buyerLmtAmt').numberbox('getValue');
	var buyerLmtBat = $('#buyerLmtBat').numberbox('getValue');
	if (SCFUtils.isEmpty(lmtAmt) || lmtAmt <= 0) {
		$('#lmtAmt').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(lmtBal) || lmtBal <= 0) {
		$('#lmtBal').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(lmtAllocate) || lmtAllocate <= 0) {
		$('#lmtAllocate').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(lmtRecover) || lmtRecover <= 0) {
		$('#lmtRecover').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(buyerLmtAmt) || buyerLmtAmt <= 0) {
		$('#buyerLmtAmt').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(buyerLmtBat) || buyerLmtBat <= 0) {
		$('#buyerLmtBat').numberbox('setValue', 0);
	}
}

// 根据买方流水号和trxId查询cust_E表中数据
function queryCustInfo(sysRefNo, trxId) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000191',
			sysRefNo : sysRefNo,
			trxId : trxId
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadForm('custForm', data.rows[0]);
				checkNull();
				changeLmt();
			}
		}
	};
	SCFUtils.ajax(opt);
}

// 根据买方流水号查询cust_M表中数据
function queryCustM(sysRefNo) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadForm('custForm', data.rows[0]);
				checkNull();
			}
		}
	};
	SCFUtils.ajax(opt);
}

function createTree(data) {
	var sysRefNo = data.obj.sysRefNo;
	var custNm = data.obj.custNm;

	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000188',
			sysRefNo : sysRefNo,
			cacheType : 'non',
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$("#perInfoDiv").tree('loadData', data.rows);
					$('#perInfoDiv').tree({
						onClick : function(node) {
							// 点击最原始的父节点，触发事件
							var fatherId = sysRefNo + custNm;
							if (node.id == fatherId) {
								$("#tr1").hide();
								$("#tr2").hide();
								$("#tr3").hide();
								$("#tr4").hide();
								$("#tr5").hide();
								$("#tr6").show();
								$("#tr7").show();
								$("#tr8").show();
								queryCustM(sysRefNo);
							}
							// 是叶子节点，则触发事件
							if (node.isparent == 'N') {
								if (node.text.startsWith("Loan")) {
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									$("#tr4").show();
									$("#tr5").show();
									$("#tr6").hide();
									$("#tr7").hide();
									$("#tr8").hide();
									queryCustInfo(sysRefNo, node.text);
								} else if (node.text.startsWith("Pmt")) {
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									$("#tr4").show();
									$("#tr5").show();
									$("#tr6").hide();
									$("#tr7").hide();
									$("#tr8").hide();
									queryCustInfo(sysRefNo, node.text);
								} else if (node.text.startsWith("Bail")) {
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									$("#tr4").show();
									$("#tr5").show();
									$("#tr6").hide();
									$("#tr7").hide();
									$("#tr8").hide();
									queryCustInfo(sysRefNo, node.text);
								} else if (node.text.startsWith("Cnt")) {
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									$("#tr4").show();
									$("#tr5").show();
									$("#tr6").hide();
									$("#tr7").hide();
									$("#tr8").hide();
									queryCustInfo(sysRefNo, node.text);
								} else if (node.text.startsWith("Trf")) {
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									$("#tr4").show();
									$("#tr5").show();
									$("#tr6").hide();
									$("#tr7").hide();
									$("#tr8").hide();
									queryCustInfo(sysRefNo, node.text);
								} else if (node.text.startsWith("cbkRef")) {
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									$("#tr4").show();
									$("#tr5").show();
									$("#tr6").hide();
									$("#tr7").hide();
									$("#tr8").hide();
									queryCustInfo(sysRefNo, node.text);
								} else if (node.text.startsWith("LoanClt")) {
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									$("#tr4").show();
									$("#tr5").show();
									$("#tr6").hide();
									$("#tr7").hide();
									$("#tr8").hide();
									queryCustInfo(sysRefNo, node.text);
								}
							}
						}
					});
				} else {
					var rows = [ {
						"id" : sysRefNo + custNm,
						"text" : custNm
					} ];
					$("#perInfoDiv").tree('loadData', rows);
					$('#perInfoDiv').tree({
						onClick : function(node) {
							$("#tr1").hide();
							$("#tr2").hide();
							$("#tr3").hide();
							queryCustInfo(sysRefNo, "");
						}
					});
				}
			}

		}
	};
	SCFUtils.ajax(options);
}
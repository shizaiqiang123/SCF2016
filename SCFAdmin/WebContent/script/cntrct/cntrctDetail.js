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
				$('#lmtCcy').combobox('loadData', data.rows);
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
	if (SCFUtils.isEmpty(lmtAmt)) {
		$('#lmtAmt').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(lmtBal)) {
		$('#lmtBal').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(lmtAllocate)) {
		$('#lmtAllocate').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(lmtRecover)) {
		$('#lmtRecover').numberbox('setValue', 0);
	}
}

// 根据协议流水号和theirRef查询cntrct_E表中数据
function queryCustInfo(sysRefNo, theirRef) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000193',
			sysRefNo : sysRefNo,
			theirRef : theirRef
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

// 根据协议流水号查询cntrct_M表中数据
function queryCustM(sysRefNo) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000008',
			cntrctNo : sysRefNo
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

function createTree(datas) {
	var sysRefNo = datas.obj.sysRefNo;
	var selId = datas.obj.selId;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000192',
			cacheType : 'non',
			sysRefNo : sysRefNo,
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$("#perInfoDiv").tree('loadData', data.rows);

					$('#perInfoDiv').tree({
						onClick : function(node) {
							// 点击最原始的父节点，触发事件
							var fatherId = sysRefNo + selId;
							if (node.id == fatherId) {
								$("#tr1").hide();
								$("#tr2").hide();
								$("#tr3").hide();
								queryCustM(sysRefNo);
							}
							// 是叶子节点，则触发事件
							if (node.isparent == 'N') {
							
								if (node.text.startsWith("Loan")) {
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									queryCustInfo(sysRefNo, node.text);
								}else if(node.text.startsWith("Pmt")){
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									queryCustInfo(sysRefNo, node.text);
								}else if(node.text.startsWith("Bail")){
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									queryCustInfo(sysRefNo, node.text);
								}else if(node.text.startsWith("Trf")){
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									queryCustInfo(sysRefNo, node.text);
								}else if(node.text.startsWith("cbkRef")){
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									queryCustInfo(sysRefNo, node.text);
								}else if(node.text.startsWith("Cnt")){
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									queryCustInfo(sysRefNo, node.text);
								}else if(node.text.startsWith("LoanClt")){
									$("#tr1").show();
									$("#tr2").hide();
									$("#tr3").show();
									queryCustInfo(sysRefNo, node.text);
								}

							}
						}
					});
				} else {
					var rows = [ {
						"id" : sysRefNo + selId,
						"text" : selNm
					} ];
					$("#perInfoDiv").tree('loadData', rows);
					$('#perInfoDiv').tree({
						onClick : function(node) {
							$("#tr1").hide();
							$("#tr2").hide();
							$("#tr3").hide();
							queryCustM(sysRefNo);

						}
					});
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function initToolBar() {
	return [ 'prev', 'cancel' ];
}

function beforeLoad() {
	var data = {
		cacheType : 'non'
	};
	return {
		data : data
	};
}

function pageOnInt() {
	ajaxBox();

}

function pageOnPreLoad(data) {
}



function pageOnLoad(data) {
	if (!SCFUtils.isEmpty(data)) {
		if (!SCFUtils.isEmpty(data.obj.invc)) {
			SCFUtils.loadForm('loanForm', data.obj.invc.rows0);
		} else {
			SCFUtils.loadForm('loanForm', data.obj);
			//$('#poNum').val(SCFUtils.Math(data.obj.poInNum, data.obj.ttlPoOutNum, 'sub'));
			//$('#poAmt').numberbox('setValue',SCFUtils.Math($('#poNum').val(), data.obj.price, 'mul'));
			//$('#openM').numberbox('setValue',SCFUtils.Math(SCFUtils.Math(data.obj.poInNum, data.obj.price, 'mul'), data.obj.pldPerc, 'mul'));
			
		}
	}
}

function checkNull() {
	var invAmt = $('#invAmt').numberbox('getValue');
	var invBal = $('#invBal').numberbox('getValue');
	// var invLoanBal=$('#invLoanBal').numberbox('getValue');
	// var invLoanAval=$('#invLoanAval').numberbox('getValue');
	if (SCFUtils.isEmpty(invAmt)) {
		$('#invAmt').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(invBal)) {
		$('#invBal').numberbox('setValue', 0);
	}
}

function queryseler() {
	var sysRefNo = $('#selId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000068',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if (!SCFUtils.isEmpty(sysRefNo)) {
					$('#selNm').val(data.rows[0].custNm);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
function querybuyer() {
	var sysRefNo = $('#buyerId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000068',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if (!SCFUtils.isEmpty(sysRefNo)) {
					$('#buyerNm').val(data.rows[0].custNm);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryCntrctInfo() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000008',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#busiTp').combobox('setValue', data.rows[0].busiTp);
			}
		}
	};
	SCFUtils.ajax(options);
}

function ajaxBox() {
	// 币别
	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);

	data = [ {
		"id" : '0',
		"text" : "买方收到发票重复"
	}, {
		"id" : '1',
		"text" : "买方没有收到发票"
	}, {
		"id" : '2',
		"text" : "其他"
	} ];
	$("#dspRsn").combobox('loadData', data);

}

function onPrevBtnClick() {
	return SCFUtils.convertArray('loanForm');
}
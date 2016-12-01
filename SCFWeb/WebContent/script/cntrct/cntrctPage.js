function pageOnInt() {
	ajaxBox();
}

function ajaxBox() {
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('buyerNm', true);
	SCFUtils.setComboReadonly('busiTp', true);
	SCFUtils.setComboReadonly('ccy', true);

	var busiTp = [ {
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
	} ];
	$("#busiTp").combobox('loadData', busiTp);
}

function showLookUpWindow() {
	var options = {
		title : '客户授信信息查询',
		reqid : 'I_P_000196',
		onSuccess : cntrctNoSuccess
	};
	SCFUtils.getData(options);
}

function cntrctNoSuccess(data) {
	$('#cntrctNo').val(data.cntrctNo);
	$('#sellerInstCd').val(data.sellerInstCd);
	$('#selNm').val(data.selNm);
	$('#selId').val(data.selId);
	$('#buyerNm').val(data.buyerNm);
	$('#buyerId').val(data.buyerId);
	$('#patnerId').val(data.patnerId);
	$('#patnerNm').val(data.patnerNm);

	if (data.busiTp == "0" || data.busiTp == "1" || data.busiTp == "3") {
		$('#busiTp').combobox('setValue', data.busiTp);
	} else {
		$('#busiTp').combobox('setValue', '');
	}

	// $('#busiTp').combobox('setValue', data.busiTp);
	$('#ccy').combobox('setValue', data.lmtCcy);
	$('#cntSysRefNo').val(data.sysRefNo);
	$('#initThFlg').val(data.initThFlg);
}

function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('cntrcHomeForm');
	return mainData;
}

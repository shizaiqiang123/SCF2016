function pageOnInt() {
	 ajaxBox();	
}

function ajaxBox(){
	SCFUtils.setTextReadonly('cntrctNo',true);
	SCFUtils.setTextReadonly('sellerInstCd',true);
	SCFUtils.setTextReadonly('selNm',true);
	SCFUtils.setComboTreeReadonly('busiTp',true);
	SCFUtils.setComboTreeReadonly('lmtCcy',true);
}

function showLookUpWindow(){
		var options = {
				title : '客户授信信息查询',
				reqid : 'I_P_000109',
				onSuccess : cntrctNoSuccess
			};
			SCFUtils.getData(options);
}

function cntrctNoSuccess(data){
	$('#cntrctNo').val(data.cntrctNo);
	$('#sellerInstCd').val(data.sellerInstCd);
	$('#selNm').val(data.selNm);
	$('#selId').val(data.selId);
	var busiTp = [{"id":'0',"text":"国内有追索权保理"},{"id":'1',"text":"国内无追索权保理"}];
	$("#busiTp").combobox('loadData',busiTp);
	$('#busiTp').combobox('setValue',data.busiTp);
	$('#lmtCcy').combobox('setValue',data.lmtCcy);
	$('#cntSysRefNo').val(data.sysRefNo);
	$('#billAmt').val(data.billAmt);
	$('#transChgrt').val(data.transChgrt);
}

function onNextBtnClick(){	
	var mainData =SCFUtils.convertArray('cntrcHomeForm');	
	return mainData;
}



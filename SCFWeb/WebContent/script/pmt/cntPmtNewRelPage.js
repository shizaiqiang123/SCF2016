function pageOnInt() {
	 ajaxBox();	
}

function ajaxBox(){
	SCFUtils.setTextReadonly('cntrctNo',true);
	SCFUtils.setTextReadonly('selNm',true);
	SCFUtils.setTextReadonly('buyerNm',true);
	SCFUtils.setComboTreeReadonly('busiTp',true);
	SCFUtils.setComboTreeReadonly('lmtCcy',true);
}

function showLookUpWindow(){
		var options = {
				title : '协议信息查询',
				reqid : 'I_P_000123',
				onSuccess : cntrctNoSuccess
			};
			SCFUtils.getData(options);
}

function cntrctNoSuccess(data){
	$('#cntrctNo').val(data.cntrctNo);
	$('#buyerId').val(data.buyerId);
	$('#selNm').val(data.selNm);
	$('#lmtAmt').val(data.lmtAmt);
	$('#lmtBal').val(data.lmtBal);
	$('#buyerNm').val(data.buyerNm);
	var busiTp = [{"id":'0',"text":"国内有追索权保理"},{"id":'1',"text":"国内无追索权保理"}];
	$("#busiTp").combobox('loadData',busiTp);
	$("#busiTp").combobox('setValue',data.busiTp);
	SCFUtils.setTextReadonly('busiTp',true);
	$('#lmtCcy').combobox('setValue',data.lmtCcy);
	$('#sysRefNo').val(data.sysRefNo);
	$('#selId').val(data.selId);
}

function onNextBtnClick(){	
	var mainData =SCFUtils.convertArray('cntPmtNewRelPage');	
	return mainData;
}

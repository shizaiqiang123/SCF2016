function pageOnInt() {
	 ajaxBox();	
}

function ajaxBox(){
	SCFUtils.setTextReadonly('sysRefNo',true);
	SCFUtils.setTextReadonly('selNm',true);
	//SCFUtils.setTextReadonly('sellerInstCd',true);
	//SCFUtils.setComboTreeReadonly('busiTp',true);
	//SCFUtils.setComboTreeReadonly('lmtCcy',true);
	
	/*var busiTp = [{"id":'0',"text":"国内有追索权保理"},{"id":'1',"text":"国内无追索权保理"},{"id":'3',"text":"信用保险项下"}];
	$("#busiTp").combobox('loadData',busiTp);*/
}

function showLookUpWindow(){
		var options = {
				title : '客户授信信息查询',
				reqid : 'I_P_000184',
				onSuccess : custNoSuccess
			};
			SCFUtils.getData(options);
}

function custNoSuccess(data){
	
	$('#selNm').val(data.custNm);
	$('#selId').val(data.sysRefNo);
	$('#ccy').val("CNY");
	$('#sysRefNo').val(data.sysRefNo);
	/*$('#billAmt').val(data.billAmt);
	$('#transChgrt').val(data.transChgrt);
	$('#buyerId').val(data.buyerId);
	$('#selId').val(data.selId);
	$('#lmtCcy').combobox('setValue',data.lmtCcy);
	$('#sellerInstCd').val(data.sellerInstCd);*/
	/*$('#sellerInstCd').val(data.sellerInstCd);
	$('#selId').val(data.selId);
	$('#lmtCcy').combobox('setValue',data.lmtCcy);
	$('#cntSysRefNo').val(data.sysRefNo);
	$('#billAmt').val(data.billAmt);
	$('#transChgrt').val(data.transChgrt);
	$('#buyerId').val(data.buyerId);*/
}

function onNextBtnClick(){	
	var mainData =SCFUtils.convertArray('cntrcHomeForm');	
	return mainData;
}



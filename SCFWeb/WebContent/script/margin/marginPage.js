function pageOnInt() {
	 ajaxBox();	
}

function ajaxBox(){
	SCFUtils.setTextReadonly('cntrctNo',true);
	SCFUtils.setTextReadonly('selNm',true);
	SCFUtils.setComboTreeReadonly('busiTp',true);
	SCFUtils.setTextReadonly('ccy',true);
}

function showLookUpWindow(){
		var options = {
				title : '额度信息查询',
				reqid : 'I_P_000162',
				cacheType:'non',
				onSuccess : cntrctNoSuccess,
			
			};
			SCFUtils.getData(options);
}

function cntrctNoSuccess(data){
	$("#cntrctNo").val(data.cntrctNo);
	var busiTp = [{"id":'0',"text":"国内有追索权保理"},{"id":'1',"text":"国内无追索权保理"},{"id":'2',"text":"先票款后货"},{"id":'3',"text":"保险项下"}];
	$("#busiTp").combobox('loadData',busiTp);
	$("#sysRefNo").val(data.sysRefNo);
	$("#sellerInstCd").val(data.sellerInstCd);
	$("#busiTp").combobox('setValue',data.busiTp);
	$("#selNm").val(data.selNm);
	$("#collatCompNm").val(data.collatCompNm);
	$("#collatNo").val(data.collatNo);
	$("#loanTp").val(data.loanTp);
	$("#selAcNo").val(data.selAcNo);
	$("#selAcNm").val(data.selAcNm);
	$("#selAcBkNm").val(data.selAcBkNm);
	$("#ccy").val(data.ccy);
	$("#ttlLoanAmt").val(data.ttlLoanAmt);
	$("#loanAble").val(data.loanAble);
	$("#loanValDt").val(data.loanValDt);
	$("#loanDueDt").val(data.loanDueDt);
	$("#payIntTp").val(data.payIntTp);
	$("#marginAcNo").val(data.marginAcNo);
	$("#initMarginPct").val(data.initMarginPct);
	$("#autoMarginPct").val(data.autoMarginPct);
	$("#marginAmt").val(data.marginAmt);
	$("#loanRt").val(data.loanRt);
	$("#loanApplicat").val(data.loanApplicat);
	$("#marginBal").val(data.marginBal);
	$("#selId").val(data.selId);
}

function onNextBtnClick(){	
	var mainData =SCFUtils.convertArray('cntrcHomeForm');	
	return mainData;
}

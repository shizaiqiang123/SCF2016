function pageOnInt() {
	 ajaxBox();	
}

function ajaxBox(){
	SCFUtils.setTextReadonly('cntrctNo',true);
	SCFUtils.setTextReadonly('sellerInstCd',true);
	SCFUtils.setTextReadonly('selNm',true);
	SCFUtils.setComboTreeReadonly('busiTp',true);
	SCFUtils.setTextReadonly('lmtCcy',true);
	SCFUtils.setTextReadonly('buyerNm',true);
}

function showLookUpWindow(){
		var options = {
				title : '额度信息查询',
				reqid : 'I_P_000205',
				cacheType:'non',
				onSuccess : cntrctNoSuccess,
			
			};
			SCFUtils.getData(options);
}

function cntrctNoSuccess(data){
	$('#cntrctNo').val(data.cntrctNo);
	$('#sellerInstCd').val(data.sellerInstCd);
	$('#selNm').val(data.selNm);
	$('#lmtAllocate').val(data.lmtAllocate);
	$('#lmtAmt').val(data.lmtAmt);
	$('#sellerLmtLimit').val(data.sellerLmtLimit);
	var busiTp = [{"id":'0',"text":"国内有追索权保理"},{"id":'1',"text":"国内无追索权保理"},{"id":'6',"text":"应收账款池融资"}];
	$("#busiTp").combobox('loadData',busiTp);
	$("#busiTp").combobox('setValue',data.busiTp);
	SCFUtils.setTextReadonly('busiTp',true);
	$('#lmtCcy').val(data.lmtCcy);
	$('#sysRefNo').val(data.sysRefNo);
	$('#selId').val(data.selId);
	$('#lmtBal').val(data.lmtBal);
	$('#serviceReq').val(data.serviceReq);
	$('#loanPct').val(data.loanPct);
	$('#finChgrt').val(data.finChgrt);
	$('#loanRt').val(data.loanRt);
	$('#arAvalLoan').val(data.arAvalLoan);
	$('#payIntTp').val(data.payIntTp);
	$('#initMarginPct').val(data.initGartPct);
	$('#openLoanAmt').val(data.openLoanAmt);
	$('#arBal').val(data.arBal);
	$('#transChgrt').val(data.transChgrt);
	/*
	 * 查询按钮加载数据成功，去判断cntrctNo的div有无值,无值不做处理
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160728 by XuX
	 */
	if($('#cntrctNo').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#cntrctNo').parent('div').removeClass('requried-item-ifo');//去除*号
		$('#cntrctNo').removeClass('validatebox-invalid');
	}

}

function onNextBtnClick(){	
	var mainData =SCFUtils.convertArray('cntrcHomeForm');	
	return mainData;
}

function pageOnInt() {
	ajaxBox();	
}

function ajaxBox(){
	SCFUtils.setTextReadonly('cntrctNo',true);
	SCFUtils.setTextReadonly('sellerInstCd',true);
	SCFUtils.setTextReadonly('selNm',true);
	SCFUtils.setTextReadonly('buyerNm',true);
	SCFUtils.setComboReadonly('busiTp',true);
	SCFUtils.setComboReadonly('ccy',true);

	
	var busiTp = [{"id":'2',"text":"先票款后货"}];
	$("#busiTp").combobox('loadData',busiTp);
}

function showLookUpWindow(){
	var options = {
		title : '客户授信信息查询',
		reqid : 'I_P_000131',
		onSuccess : cntrctNoSuccess
	};
	SCFUtils.getData(options);
}

function cntrctNoSuccess(data){
	$('#cntrctNo').val(data.cntrctNo);
	$('#sellerInstCd').val(data.sellerInstCd);
	$('#selNm').val(data.selNm);
	$('#selId').val(data.selId);
	$('#buyerNm').val(data.buyerNm);
	$('#buyerId').val(data.buyerId);
	$('#patnerId').val(data.patnerId);
	$('#patnerNm').val(data.patnerNm);
	if(!SCFUtils.isEmpty(data.busiTp) && data.busiTp =="2"){
		$('#busiTp').combobox('setValue',data.busiTp);
	}else{
		$('#busiTp').combobox('setValue','');
	}
	$('#ccy').combobox('setValue',data.lmtCcy);
	$('#cntSysRefNo').val(data.sysRefNo);
	$('#initThFlg').val(data.initThFlg);
	$('#pldPerc').val(data.pldPerc);//质押率
	$('#initMarginPct').val(data.initGartPct);//初始化保证金比例
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



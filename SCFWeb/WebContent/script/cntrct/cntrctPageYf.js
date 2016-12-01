function pageOnInt() {
	ajaxBox();	
}

function ajaxBox(){
	SCFUtils.setTextReadonly('cntrctNo',true);
	SCFUtils.setTextReadonly('sellerInstCd',true);
	SCFUtils.setTextReadonly('selNm',true);
//	SCFUtils.setTextReadonly('buyerNm',true);
	SCFUtils.setComboReadonly('busiTp',true);
	SCFUtils.setComboReadonly('lmtCcy',true);
	
	var busiTp = [{"id":'2',"text":"先票款后货"},{"id":'0',"text":"国内有追索权保理"},{"id":'1',"text":"国内有追索权保理"}];
	$("#busiTp").combobox('loadData',busiTp);
	$('#info').hide();
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
	$('#busiTp').combobox('setValue',data.busiTp);
	$('#lmtCcy').combobox('setValue',data.lmtCcy);
	$('#cntSysRefNo').val(data.sysRefNo);//额度流水号
	$('#lmtBal').val(data.lmtBal);//额度余额
	$('#lmtAllocate').val(data.lmtAllocate);//占用额度
	$('#lmtDueDt').datebox('setValue',data.lmtDueDt);
	$('#initMarginPct').val(data.initGartPct);
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



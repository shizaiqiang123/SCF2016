function pageOnInt() {
	 ajaxBox();	
}

function ajaxBox(){
	SCFUtils.setTextReadonly('cntrctNo',true);
	SCFUtils.setTextReadonly('sellerInstCd',true);
	SCFUtils.setTextReadonly('selNm',true);
	SCFUtils.setComboTreeReadonly('busiTp',true);
	SCFUtils.setComboTreeReadonly('lmtCcy',true);
	
	var busiTp = [{"id":'0',"text":"国内有追索权保理"},{"id":'1',"text":"国内无追索权保理"},{"id":'3',"text":"信用保险项下"}];
	$("#busiTp").combobox('loadData',busiTp);
}

function showLookUpWindow(){
		var options = {
				title : '客户授信信息查询',
				reqid : 'I_P_000151',
				onSuccess : cntrctNoSuccess
			};
			SCFUtils.getData(options);
}

function cntrctNoSuccess(data){
	$('#cntrctNo').val(data.cntrctNo);
	$('#sellerInstCd').val(data.sellerInstCd);
	$('#selNm').val(data.selNm);
	$('#selId').val(data.selId);
	if(!SCFUtils.isEmpty(data.busiTp) && data.busiTp !="2"){
		$('#busiTp').combobox('setValue',data.busiTp);
	}else{
		$('#busiTp').combobox('setValue','');
	}
	$('#lmtCcy').combobox('setValue',data.lmtCcy);
	$('#cntSysRefNo').val(data.sysRefNo);
	$('#billAmt').val(data.billAmt);
	$('#transChgrt').val(data.transChgrt);
	$('#buyerId').val(data.buyerId);
	$('#lmtBal').val(data.lmtBal);
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

//查询间接客户
function showCustWindow(){
	var cntrctNo = $('#cntrctNo').val();
	if(SCFUtils.isEmpty(cntrctNo)){
		SCFUtils.alert("请先选择授信额度信息！");
	}else{
		var options = {
				title:'买方查询',
				reqid:'I_P_000111',
				data:{'cntrctNo' : cntrctNo},
				onSuccess:buyerSuccess
			};
			SCFUtils.getData(options);
	}
}


function buyerSuccess(data){
	$('#buyerNm').val(data.buyerNm);
	$('#buyerId').val(data.buyerId);
}

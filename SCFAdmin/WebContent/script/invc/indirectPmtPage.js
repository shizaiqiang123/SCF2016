function pageOnInt() {
	ajaxBox();	
	 
	var busiTp = [{"id":'0',"text":"国内有追索权保理"},{"id":'1',"text":"国内无追索权保理"}];
	$("#busiTp").combobox('loadData',busiTp);
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
		title : '授信额度信息查询',
		reqid : 'I_P_000125',
		onSuccess : cntrctNoSuccess
	};
	SCFUtils.getData(options);
}

function cntrctNoSuccess(data){
	$('#cntrctNo').val(data.cntrctNo);
	$('#selNm').val(data.selNm);
	$('#lmtAvl').val(data.lmtAllocate);
	$('#lmtBal').val(data.lmtBal);
	$('#lmtAmt').val(data.lmtAmt);
	$('#sysRefNo').val(data.sysRefNo);
	if(!SCFUtils.isEmpty(data.busiTp) && (data.busiTp =="0" || data.busiTp =="1")){
		$('#busiTp').combobox('setValue',data.busiTp);
	}else{
		$('#busiTp').combobox('setValue','');
	}
	$('#lmtCcy').combobox('setValue',data.lmtCcy);
	$('#selId').val(data.selId);
	
	getBuyer(data.cntrctNo);
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

//初始化买方列表
function getBuyer(data){
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000383',
				cntrctNo:data
			},
			callBackFun:function(data){
				if(data.success){
					$('#buyerId').combobox('loadData', data.rows);
    			}
			}
	};	
	SCFUtils.ajax(optt);
	
	$('#buyerId').combobox('setValue','');
}

//设置买方值
function changeBuyerNm(){
	var buyerId = $('#buyerId').combobox('getValue');
	$('#buyerNm').val($('#buyerId').combobox('getText'));
}

function onNextBtnClick(){	
	var mainData =SCFUtils.convertArray('indirectPmtPageForm');	
	return mainData;
}

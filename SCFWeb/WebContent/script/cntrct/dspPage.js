function pageOnInt() {
	ajaxBox();
}

function ajaxBox() {
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('selNm', true);
	//SCFUtils.setComboTreeReadonly('busiTp', true);
	SCFUtils.setTextReadonly('trxDt', true);

//	var busiTp = [ {
//		"id" : '0',
//		"text" : "国内有追索权保理",
//		"selected" : true
//	}, {
//		"id" : '1',
//		"text" : "国内无追索权保理"
//	}, {
//		"id" : '2',
//		"text" : "先票款后货"
//	},{
//		"id" : '3',
//		"text" : "信用保险项下"
//	},{
//		"id" : '4',
//		"text" : "动产质押融资"
//	} ];
//	$("#busiTp").combobox('loadData', busiTp);
}

function showLookUpWindow() {
	var options = {
		title : '客户授信信息查询',
		reqid : 'I_P_000188',
		onSuccess : dspNoSuccess
	};
	SCFUtils.getData(options);
}

function dspNoSuccess(data) {
	$('#sysRefNo').val(data.sysRefNo);// 协议编号
	$('#selNm').val(data.selNm);// 卖方名称
	$('#selId').val(data.selId);// 卖方编号
//	if (!SCFUtils.isEmpty(data.busiTp) && data.busiTp != "2") {
//		$('#busiTp').combobox('setValue', data.busiTp);// 业务类别
//	} else {
//		$('#busiTp').combobox('setValue', '');
//	}
	$('#trxDt').val(SCFUtils.dateFormat(data.trxDt,'yyyy-MM-dd'));//争议登记日期
	
	$('#notifyBy').val(data.notifyBy);//争议提出方
	$('#ttlDspInvNo').val(data.notifyBy);//发票总份数
	$('#ttlDspInvAmt').val(data.notifyBy);//发票争议总金额
	$('#dspFlag').val(data.notifyBy);//争议标识
	$('#cntrctNo').val(data.notifyBy);//协议编号
	if($('#sysRefNo').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#sysRefNo').parent('div').removeClass('requried-item-ifo');//去除*号
		$('#sysRefNo').removeClass('validatebox-invalid');
	}

}

function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('cntrcForm');
	return mainData;
}

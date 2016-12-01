function pageOnInt() {
	 ajaxBox();	
}

function ajaxBox(){
	SCFUtils.setTextReadonly('instName',true);
	SCFUtils.setTextReadonly('custName',true);
}

//查询网点信息
function showLookUpWindowInst() {
	var options = {
		title : '网点信息查询',
		reqid : 'I_P_000106',
		onSuccess : netAddressSuccess
	};
	SCFUtils.getData(options);
}

function netAddressSuccess(data) {
	$('#instNo').val(data.sysRefNo);
	$('#instName').val(data.brNm);
}

function showLookUpWindowCust(){
	var options = {
			title : '客户信息查询',
			reqid : 'I_P_000020',
			onSuccess : cntrctNoSuccessCust
		};
		SCFUtils.getData(options);
}

function cntrctNoSuccessCust(data){
	$('#custNo').val(data.sysRefNo);
	$('#custName').val(data.custNm);
}

function onNextBtnClick(){	
	var mainData =SCFUtils.convertArray('cntrcHomeForm');	
	return mainData;
}



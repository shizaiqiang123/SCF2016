function pageOnPreLoad(data) {
}

function onNextBtnClick() {
	var option = {
			url : SCFUtils.AJAXURL,
				data:{
					cacheType :'non',
					byFunc :'N',
					getdataId:'I_P_000081',
					requestTp:'post',
					telphone:$("#telPhone").val(),
					sysRefNo:$("#sysRefNo").val(),
					inputCode:$('#inputCode').val()
				},
				onSuccess : compareVerSuccess
				
		};
		SCFUtils.getData(option);
	var data = SCFUtils.convertArray('phoneForm');
	// var data = SCFUtils.getSelectedGridData('ScreenMenuTable',true);
	// var p = {};
	// p.catalog = SCFUtils.json2str(data);
	return data;
}
function compareVerSuccess(){
	debugger;
}

var countDown = 59;
function sendBtn() {
	if (countDown == 59) {
		var option = {
			url : SCFUtils.AJAXURL,
				data:{
					cacheType :'non',
					byFunc :'N',
					getdataId:'I_P_000078',
					telphone:$("#telPhone").val(),
					sysRefNo:$("#sysRefNo").val()
				},
				onSuccess : addVerSuccess
				
		};
		SCFUtils.getData(option);
	}
	$("#send_btn").val("重新发送");
	var timeId = setTimeout(function() {
		sendBtn();
	}, 1000);
	if (countDown == 0) {
		$("#send_btn").attr("disabled", false);
		$("#send_btn").value = "重新发送";
		countDown = 59;
		clearTimeout(timeId);
	} else {
		$("#send_btn").attr("disabled", true);
		$("#send_btn").val("重新发送(" + countDown + ")");
		countDown--;
	}

}
function addVerSuccess(){
	debugger;
	
}
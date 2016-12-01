function ignoreToolBar(){
	
}
function pageOnInt() {
	SCFUtils.setTextReadonly('mobPhone', true);
	$('#infoDiv').hide();
}
function queryUserRefNo() {	
	var sysRefNo = $('#SYSUSERREF').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {			
			queryId : 'Q_P_000101',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && data.rows.length == 1) {				
				$('#mobPhone').val(data.rows[0].mobPhone);				
			}
		}
	};
	SCFUtils.ajax(options);	
}

function pageOnLoad(data){
	queryUserRefNo();
	createInput(data);	
}

function createInput(data){
	$('<input type="hidden" id="sysRefNo" name="sysRefNo"/>').val(data.obj.sysRefNo).appendTo($('#codeForm'));
}

function doSave(win) {
	var data = SCFUtils.convertArray('codeForm');
	var target = win.getData('callback');
	var result = target(data);
	if(result){
		win.close();
	}else{
		$("#identifyingcode").val('');	
		$('#identifyingcode_succeed').removeClass('succeed');
	}
}
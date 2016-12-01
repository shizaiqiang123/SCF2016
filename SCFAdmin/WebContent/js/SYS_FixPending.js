function onApprBtnClick() {
	setReadOnly();
	var data=SCFUtils.convertArray('mainForm');
//	data.sysOpId=$('#newSysOpId').val();
//	data.sysOpTm=$('#newSysOpTm').val();
	return data;
}

//function onNextBtnClick() {
//	setReadOnly();
//	var data=SCFUtils.convertArray('mainForm');
////	data.sysOpId=$('#newSysOpId').val();
////	data.sysOpTm=$('#newSysOpTm').val();
//	return data;
//}

//function onNextBtnClick() {
//	setReadOnly();
////	var data=SCFUtils.convertArray('mainForm');
////	data.sysOpId=$('#newSysOpId').val();
////	data.sysOpTm=$('#newSysOpTm').val();
//	var isValidCode = $('#isValidCode').val();
//	if(!isValidCode){
//		return SCFUtils.convertArray('mainForm');
//	}
//	var options = {
//			title:'短信验证码',
//			reqid:'I_P_000092',
//			data:{},
//			width:'800px',
//			height:'200px',
//			onSuccess:checkCode
//		};
//		SCFUtils.getData(options);	
//	return false;
//}

function onPrevBtnClick() {
//	setReadOnly();
//	var data=SCFUtils.convertArray('mainForm');
//	return data;
	return SCFUtils.convertArray('mainForm');
	setReadOnly();
}

function onSubmitBtnClick() {	
	setReadOnly();
	var isValidCode = $('#isValidCode').val();
	if(!isValidCode){
		return SCFUtils.convertArray('mainForm');
	}
	var options = {
			title:'短信验证码',
			reqid:'I_P_000092',
			data:{},
			width:'600px',
			height:'215px',
			buttons : [ {
				text : '确认',
				handler : 'doSave'
			} ],
			onSuccess:checkCode
		};
		SCFUtils.getData(options);	
	return false;
//	var data=SCFUtils.convertArray('mainForm');
//	data.sysOpId=$('#newSysOpId').val();
//	data.sysOpTm=$('#newSysOpTm').val();
//	return data;
}

function checkCode(data){
	var flag = true;
	var option = {
			url : SCFUtils.AJAXURL,
			data : {				
				cacheType : 'non',
				byFunc : 'N',
				requestTp : 'post',
				getdataId : 'I_P_000081',
				mobPhone : data.mobPhone,
				sysRefNo : $('#sysRefNo').val(),
				inputCode:data.identifyingcode
			},
			callBackFun : function(data) {
				if (data.success) {
					if (data.obj) {
						SCFUtils.ContinueAjax(SCFUtils.convertArray('mainForm'));
					} else {
						flag=false;
						SCFUtils.alert("验证码错误,请重新输入！");
					}
				}
			}
	};
	SCFUtils.ajax(option);	
	return flag;
}

function pageOnReleaseResultLoad(data) {
	setReadOnly();
	SCFUtils.loadForm('mainForm', data);
}
/**
 * 复合功能时，Next进入交易页面
 * @param data
 */
function pageOnReleasePageLoad(data) {
	setReadOnly();
	if(data.obj.isValidCode){
		createValidCode(data.obj.isValidCode);
	}
	SCFUtils.loadForm('mainForm', data);
	setSysOpTm();
	var sysOpId = $('#sysOpIdCopy').val();
	$('#sysOpId').val(sysOpId);
}
/**
 * 复合功能时，Pre进入交易页面
 * @param data
 */
function pageOnReleasePreLoad(data) {
	setReadOnly();
	SCFUtils.loadForm('mainForm', data);
}

/**
 * 复合功能时，Pre进入交易页面
 * @param data
 */
function pageOnFPLoad(data) {
	setReadOnly();
	if(data.obj.isValidCode){
		createValidCode(data.obj.isValidCode);
	}
	SCFUtils.loadForm('mainForm', data);
	setSysOpTm();
	var sysOpId = $('#sysOpIdCopy').val();
	$('#sysOpId').val(sysOpId);
}

function createValidCode(isValidCode){
	$('<input type="hidden" id="isValidCode" name="isValidCode"/>').val(isValidCode).appendTo($('#mainForm'));	
}

function setReadOnly(){
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('sysEventTimes', true);
	SCFUtils.setTextReadonly('sysOpId', true);
	SCFUtils.setTextReadonly('sysOpTm', true);
}

function setSysOpTm(){
	var sysOpTm = new Date();
	$('#sysOpTm').val(SCFUtils.dateFormat(sysOpTm,'yyyy-MM-dd HH:mm:ss'));
}
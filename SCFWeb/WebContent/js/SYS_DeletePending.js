function onApprBtnClick() {
	setReadOnly();
	var data=SCFUtils.convertArray('mainForm');
//	data.sysOpId=$('#newSysOpId').val();
//	data.sysOpTm=$('#newSysOpTm').val();
	return data;
}

function onNextBtnClick() {
	setReadOnly();
//	var data=SCFUtils.convertArray('mainForm');
//	data.sysOpId=$('#newSysOpId').val();
//	data.sysOpTm=$('#newSysOpTm').val();
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
}

function onPrevBtnClick() {
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
}

function checkCode(data){
	var flag = 1;
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			cacheType : 'non',
			byFunc : 'N',
			requestTp : 'post',
			getdataId : 'I_P_000081',
			mobPhone : data.mobPhone,
			sysRefNo : $('#sysRefNo').val(),
			inputCode : data.identifyingcode
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.obj === 0) {//成功
					SCFUtils.ContinueAjax(SCFUtils.convertArray('mainForm'));
				} else if (data.obj === 2) {
					SCFUtils.alert("验证码已失效,请重新发送！");
				} else {
					SCFUtils.alert("验证码错误,请重新输入！");
				}
				flag = data.obj;
			}
		}
	};
	SCFUtils.ajax(option);
	return flag;
}

function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	setReadOnly();
}

function pageOnReleasePageLoad(data) {
	setReadOnly();
	if(data.obj.isValidCode){
		createValidCode(data.obj.isValidCode);
	}
	SCFUtils.loadForm('mainForm', data);
	setPreUser(data.obj.sysTrxSts);
	setSysOpTm();
	querySysRelNm();
	var sysOpId = $('#sysOpIdCopy').val();
	$('#sysOpId').val(sysOpId);
}
/**
 * 复合功能时，Pre进入交易页面
 * @param data
 */
function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	setReadOnly();
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
	setPreUser(data.obj.sysTrxSts);
	setSysOpTm();
	querySysRelNm();
	var sysOpId = $('#sysOpIdCopy').val();
	$('#sysOpId').val(sysOpId);
}

function createValidCode(isValidCode){
	$('<input type="hidden" id="isValidCode" name="isValidCode"/>').val(isValidCode).appendTo($('#mainForm'));	
}

function setReadOnly(){
//	SCFUtils.setFormReadonly("mainForm",false);
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('sysEventTimes', true);
	SCFUtils.setTextReadonly('preSysUserId', true);
	SCFUtils.setTextReadonly('preSysUserNm', true);
	SCFUtils.setTextReadonly('preSysUserTm', true);
}
function setPreUser(sysTrxSts){
	if(  sysTrxSts== "P" ){
		$("#preSysUserId").val( $("#sysOpId").val() );
		$("#preSysUserTm").val( $("#sysOpTm").val() );
	}else if( sysTrxSts== "S" ){
		$("#preSysUserId").val( $("#sysRelId").val() );
		$("#preSysUserTm").val( $("#sysRelTm").val() );
	}
}
function setSysOpTm(){
	$('#preSysUserTm').val(SCFUtils.dateFormat($('#preSysUserTm').val(),'yyyy-MM-dd HH:mm:ss'));
}
function querySysRelNm() {
	var sysRefNo = $("#preSysUserId").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000101',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
				} else {
					$("#preSysUserNm").val(data.rows[0].userNm);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
$(function(){
	$('#centerDiv',parent.document).css({
		'width':'80%',
		'padding-bottom':'80px'
	});
});

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function ignoreToolBar() {

}

function cancelBtnClick() {
	var sysRefNo = $('#sysRefNo').val();
	var data = {
		sysRefNo : sysRefNo,
		reqLoginType:"noLogin"
	};
	var options = {
		
		url : SCFUtils.CANCEL,
		callBackFun : goLogin,
		data : data
	};

	SCFUtils.ajax(options);
}

function prevBtnClick(){
	var data={};
	var options = {
		url : SCFUtils.CANCEL,
		data :$.extend({reqPageType:'pre',reqLoginType:"noLogin"},data),
		async : true,
		callBackFun : function(data){
			SCFUtils.requestUrl(data,'noLogin');
			}
	};
	SCFUtils.ajax(options);
}

function goLogin() {
	parent.window.location = SCFUtils.ROOTURL + "/main.jsp";
}

function checkPwd() {
	var flag = false;
	var newPwd = $('#newPwd').val();
	var enterPwd = $('#enterPwd').val();
	newPwd = hex_md5(newPwd);
	enterPwd = hex_md5(enterPwd);

	if (newPwd != enterPwd) {
		SCFUtils.error('两次密码输入不一致。');
		flag = false;
		return flag;
	} else {
		$('#password').val(newPwd);
		flag = true;
		return flag;
	}
}

function submitBtnClick() {
	if (!checkPwd()) {
		return;
	} else {
		$('#pwdEditDt').val(SCFUtils.getcurrentdate);
		var data = SCFUtils.convertArray('mainForm');
		if(!data)return;		
		var options = {
				url : SCFUtils.SUBMITURL,
				data : $.extend({
					reqPageType : 'finish',
					reqLoginType:"noLogin"
				}, data),
				async : true,
				showMsg:true,
				callBackFun : function(data){
					if(data.success){
						SCFUtils.success('修改密码成功！',function(){
							goLogin();
						});
					}								
				}
		};
		SCFUtils.ajax(options);
	}
}
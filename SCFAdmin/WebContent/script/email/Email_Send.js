$(document).ready(function(){
	//按钮栏
	var toolBar = parent.$('#toolBarTable');
	//隐藏确定按钮
	toolBar.find("button#submit_btn").hide();
	//取消按钮移位
	var cancelBtn = toolBar.find("button#cancel_btn");
	$(cancelBtn).before(toolBar.find("button#send_btn"));
});

/**
 * 添加发送按钮
 * @returns 添加按钮的类型
 */
function appendToolBar(){
	return ['send'];
}

function onSendBtnClick(){
	
	var isValid = $('#mailSendForm').form('validate');
	
	if(isValid){
		var formData = SCFUtils.convertArray('mailSendForm');
		var options = {
				title:'邮件发送',
				reqid:'I_S_000401',
				queryType:'send',
				data:$.extend({'reqid':'I_S_000401','queryType':'send'},formData),
				onSuccess:loadSuccess
			};
		SCFUtils.getData(options);
	}
}

function loadSuccess(){
	SCFUtils.alert("发送成功");
}


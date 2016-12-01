function appendToolBar(){
	return ['send'];
}

function onSendBtnClick(){
	var data = SCFUtils.convertArray('messageForm');
	var options = {
			title:'通知查询',
			reqid:'I_S_000305',
			data:$.extend({cacheType:'non',queryType:'SEND'},data),
			onSuccess:loadAdviceItem
		};
	SCFUtils.getData(options);
}

function loadAdviceItem(){
	SCFUtils.success('发送成功');
	$(':input','#messageForm')  
	 .not(':button, :submit, :reset, :hidden')  
	 .val('')  
	 .removeAttr('checked')  
	 .removeAttr('selected'); 
}


$(document).ready(function(){
	//按钮栏
	var toolBar = parent.$('#toolBarTable');
	//隐藏确定按钮
	toolBar.find("button#submit_btn").hide();
	//取消按钮移位
	var cancelBtn = toolBar.find("button#cancel_btn");
	$(cancelBtn).before(toolBar.find("button#send_btn"));
});
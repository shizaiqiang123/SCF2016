function initNotice(){
	var notice = "复核页面，点击提交完成复核操作。<br>"+
	"同意时，复核意见可选;拒绝时，复核意见必须输入。";
	return notice;
}
function onApprBtnClick() {
	return SCFUtils.convertArray('mainForm');
}

function onNextBtnClick() {
	return SCFUtils.convertArray('mainForm');
}

function onPrevBtnClick() {
//	return SCFUtils.convertArray('mainForm');
}

function openArea() {
	$('#sysRelReason').textbox({
		required : true
	});
	//在选择“拒绝”，意见框变为必输，在父层div后面加上*号——new by JinJH on 0727
	if($('#sysRelReason').parent('div').hasClass('item-ifo')){
		$('#sysRelReason').parent('div').addClass('requried-item-ifo');
	}
}

function closeArea() {
	$('#sysRelReason').textbox({
		required : false
	});
	//在选择“同意”，意见框重新变为非必输，去掉在父层div后面*号——new by JinJH on 0727
	if($('#sysRelReason').parent('div').hasClass('requried-item-ifo')){
		$('#sysRelReason').parent('div').removeClass('requried-item-ifo');
	}
}

/*function onSubmitBtnClick() {	
	return SCFUtils.convertArray('mainForm');	
}*/

function createValidCode(isValidCode){
	$('<input type="hidden" id="isValidCode" name="isValidCode"/>').val(isValidCode).appendTo($('#mainForm'));	
}

function onSubmitBtnClick(){
	if($('#checkedN').is(":checked")&&$('#sysRelReason').val()==""){
		SCFUtils.alert('请填写复核意见！');
		return;
	}
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

function setSysOpTm(){
	var sysOpTm = new Date();
	$('#sysOpTm').val(SCFUtils.dateFormat(sysOpTm,'yyyy-MM-dd HH:mm:ss'));
}

/*function pageOnLoad(data){
	
	SCFUtils.loadForm('mainForm',data);
	SCFUtils.setTextboxReadonly('sysRelReason', false);
}

function pageOnPreLoad(data) {
	
	SCFUtils.loadForm('mainForm', data);
	
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	
}
*/

/**
 * 复合功能时，进入结果汇总页面
 * @param data
 */
function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	$('#sysRelReason').focus();
	$('#sysRefNo').focus();
}
/**
 * 复合功能时，Next进入交易页面
 * @param data
 */
function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	if(data.obj.submitMessage){
		$('#submitMessage').val(data.obj.submitMessage);
	}
	setSysOpTm();
	SCFUtils.setTextboxReadonly('sysRelReason', false);
	if(data.obj.isValidCode){
		createValidCode(data.obj.isValidCode);
	}
	/*
	 * 修改复核结果页面form的头标题背景颜色
	 * new on 2016.07.27 by JinJH
	 */
	$("div[class='panel-header']").attr('style','background-image:linear-gradient(to bottom, #014295, #014295)');
	$("div[class='panel-header']").children().eq(0).attr('style','color:#fff');
	$("#dd").attr('style','padding:10px 0 20px 0');
}
/**
 * 复合功能时，Pre进入交易页面
 * @param data
 */
function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

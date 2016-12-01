function initNotice(){
	var notice = "选择提交按钮，完成该笔交易。";
	return notice;
}

function beforeLoad(){
	var data = {};
	data.data = {
		cacheType : 'non'
	};
	return data;
}

function appendToolBar(){
	if(toolBar){
		var toolBarBtn = toolBar.split(",");
		var addTool = [];
		for(var i=0;i<toolBarBtn.length;i++){
			addTool.push(toolBarBtn[i]);
		}
		return addTool;
	}
	return [];
}

function onPrintBtnClick(){
	window.print();
}

function pageOnResultLoad(data) {
	pageOnLoad(data);
}
var toolBar;
function pageOnLoad(data){
	if(data.obj.isValidCode){
		createValidCode(data);
	}
	if(data.obj.appendToolBar){
		toolBar=data.obj.appendToolBar;
		SCFUtils.initBar();
	}
	if(data.obj.submitMessage){
		$('#submitMessage').val(data.obj.submitMessage);
	}
	eachPage(data.obj.pages);
}

function createValidCode(data){
	$('<input type="hidden" id="sysRefNo" name="sysRefNo"/>').val(data.obj.sysRefNo).appendTo($('#sysResult'));	
	$('<input type="hidden" id="isValidCode" name="isValidCode"/>').val(data.obj.isValidCode).appendTo($('#sysResult'));	
}

function onSubmitBtnClick(){
	var isValidCode = $('#isValidCode').val();
	if(!isValidCode){
		return true;
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
						SCFUtils.ContinueAjax({submitMessage:$('#submitMessage').val()});
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

function onExptBtnClick(){
	var options = {
			title:'报表预览',
			reqid:'I_P_000014',
			buttons : [{
				text :'关闭',
//				iconCls: 'icon-cancel',
				handler:function(win){
					win.close();
				}
			}]
		};
	SCFUtils.getData(options);
}

function onAdviceBtnClick(){
	var options = {
			title:'通知预览',
			reqid:'I_P_000050',
			buttons : [{
				text :'关闭',
//				iconCls: 'icon-cancel',
				handler:function(win){
					win.close();
				}
			}]
		};
	SCFUtils.getData(options);
}

function pageOnReleaseResultLoad(data) {
	pageOnLoad(data);
}

function eachPage(pageInfo){
	var sysResult = $("#sysResult");		
	$.each(pageInfo,function(i,n){
		$(getContent(n)).appendTo(sysResult);		
	});	
}

//function iFrameHeight(iframeId) {
//	var ifm= $(iframeId);
//	var subWeb;
//	if(document.frames){//如果是ie
//		subWeb = ifm[0].contentDocument;
//		if(subWeb!=null && subWeb.body!=null){
//			if(/MSIE ([678])/.test(navigator.userAgent)){ //IE 678
//				ifm[0].frameElement.height = subWeb.body.scrollHeight;
//			}else{
//				ifm[0].frameElement.height = subWeb.body.offsetHeight;				
//			}			
//		}
//	}else{
//		subWeb = ifm[0].contentDocument;
//		if(subWeb!=null && subWeb.body!=null){
//			ifm[0].height = subWeb.body.offsetHeight;
//		}
//	}	
//	setTimeout("iFrameHeight("+ifm.attr('id')+")", 1);
//}

function iFrameHeight(iframeId) {
	var ifm = $(iframeId);
	var subWeb;
	if ('IE'===SCFUtils.getBrowserType()) {// 如果是ie
		if(ifm[0]&&(subWeb = ifm[0].document)){
			if (subWeb.body != null) {
				if (parseInt(SCFUtils.getBrowserVersion())<9) { // IE 678
					ifm[0].frameElement.height = subWeb.body.scrollHeight;
				} else {
					ifm[0].frameElement.height = subWeb.body.offsetHeight;
				}
			}
		}
		
	} else {
		subWeb = ifm[0].contentDocument;
		if (subWeb != null && subWeb.body != null) {
			ifm[0].height = subWeb.body.offsetHeight;
		}
	}
	setTimeout("iFrameHeight(" + ifm.attr('id') + ")", 1);
}


function getContent(page){	
	var iframeId =  'sysResultIframePage'+$.now();
	return '<iframe name="work" id="'+iframeId+'" src="'+page.url+'?_dc='+$.now()+
	'" width="100%" scrolling="no"'+
	' marginheight="0" frameborder="0" marginwidth="0" onLoad="iFrameHeight('+iframeId+')"></iframe>';	
}
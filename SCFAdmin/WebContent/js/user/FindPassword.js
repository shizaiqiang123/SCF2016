function pageOnInt() {
	$('#centerDiv',parent.document).css({
		'width':'80%',
		'padding-bottom':'80px'
	});
	ajaxBox();
	$('#inputtr').hide();
	$('#inputtrMail').hide();
	$('#infoDiv').hide();
}

function pageOnPreLoad() {
}

function ajaxBox() {
	var checktype = [ {
		"id" : '短信找回',
		"text" : "短信找回"
	}, {
		"id" : '邮箱找回',
		"text" : "邮箱找回"
	} ];
	$('#checktype').combobox('loadData', checktype);
	$('#checktype').combobox({
		onSelect : function() {
			if ("" == $('#checktype').combobox('getValue')) {
				$('#inputtr').hide();
			} else {
				var userId = $('#userId').val();
				if (userId == null || userId == "") {					
					$('#userId').focus();
				}
				$('#inputtr').show();
				if("邮箱找回" == $('#checktype').combobox('getValue')){
					$('#bdyMobileButton').html("获取验证码");
					$('#mobPhone').val($('#email').val());
				}
				else{
					$('#bdyMobileButton').html("获取短信验证码");
				}
//				$('#bdyMobileButton').val("获取验证码");
			}
		}
	});
}

function ignoreToolBar() {

}
function checkTypeBox(){
	
}

function cancelBtnClick() {
	var options = {
		url : SCFUtils.CANCEL,
		callBackFun : goLogin
	};
	SCFUtils.ajax(options);
}

//function sendVerCode() {
//	var option = {
//		url : SCFUtils.AJAXURL,
//		data : {
//			reqLoginType : "noLogin",
//			cacheType : 'non',
//			byFunc : 'N',
//			getdataId : 'I_P_000078',
//			telphone : $("#mobPhone").val(),
//			sysRefNo : $("#sysRefNo").val()
//		},
//		onSuccess : addVerSuccess
//
//	};
//	SCFUtils.getData(option);
//}

function addVerSuccess(data) {
}
function goLogin() {
	parent.window.location = SCFUtils.ROOTURL + "/main.jsp";
}

function userIdFocus(){	
	$('#userId').addClass('validatebox-invalid');
	$('#userId_succeed').removeClass('succeed');
}

function userIdBlur() {
	var result = false;
	var userId = $('#userId').val();
	if (userId == null || userId == "") {
		$('#userId_error').addClass('null').removeClass('error').text('');
		return result;
	}
	var flag = $('#userId').validatebox('isValid');
	if(!flag){
		$('#userId_error').addClass('error').removeClass('null').text('该用户ID不符合规范');
		$('#userId').focus();
		return result;
	}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			reqLoginType : "noLogin",
			queryId : 'Q_P_000222',
			userId : userId
		},
		callBackFun : function(data) {
			if (data.success && data.rows.length == 1) {
				$('#sysRefNo').val(data.rows[0].sysRefNo);
				$('#busiUnit').val(data.rows[0].busiUnit);
				$('#mobPhone').val(data.rows[0].mobPhone);
				$('#email').val(data.rows[0].email);
				$('#licenceNo_error').addClass('null').removeClass('error').text('');
				result = true;
			} else {
				$('#userId_error').addClass('error').removeClass('null').text('该用户ID不存在！');				
			}
		}
	};
	SCFUtils.ajax(options);
	return result;
}

function nextBtnClick() {
	var data = SCFUtils.convertArray('mainForm');
	if (!data) {
		return;
	}
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			reqLoginType : "noLogin",
			cacheType : 'non',
			byFunc : 'N',
			requestTp : 'post',
			getdataId : 'I_P_000081',
			telphone : $("#telPhone").val(),
			sysRefNo : $("#sysRefNo").val(),
			inputCode : $("#identifyingcode").val()
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.obj) {
					compareVerSuccess();
				} else {
					SCFUtils.alert("验证码错误,请重新输入！");
					$("#identifyingcode").val('');
					$('#identifyingcode_succeed').removeClass('succeed');
				}
			}
		}

	};
	SCFUtils.ajax(option);

}
function compareVerSuccess() {
	var data = SCFUtils.convertArray('mainForm');
	if (!data)
		return;
	var options = {
		url : SCFUtils.SUBMITURL,
		data : $.extend({
			reqPageType : 'next',
			reqLoginType : "noLogin"
		}, data),
		async : true,
		callBackFun : function(data) {
			SCFUtils.requestUrl(data, "noLogin");
		}
	};
	SCFUtils.ajax(options);
}
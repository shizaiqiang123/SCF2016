function pageOnInt() {
//	ajaxBox();
//	$('#inputtr1').hide();
//	$('#inputtr2').hide();
//	$('#inputtr3').hide();
//	$('#inputtr4').hide();
//	$('#infoDiv').hide();
}

function ajaxBox() {
	var checktype = [ {
		"id" : '短信验证',
		"text" : "短信验证"
	}, {
		"id" : '邮箱验证',
		"text" : "邮箱验证"
	} ];
	$('#checktype').combobox('loadData', checktype);
	$('#checktype').combobox({
		onSelect : function() {
			if ("" == $('#checktype').combobox('getValue')) {
				$('#inputtr1').hide();
				$('#inputtr2').hide();
				$('#inputtr3').hide();
				$('#inputtr4').hide();
			} else {
				queryUserId();
				$('#inputtr1').show();
				$('#inputtr2').show();
				$('#inputtr3').show();
				$('#inputtr4').show();
			}
			if("邮箱验证" == $('#checktype').combobox('getValue')){
				$('#bdyMobileButton').html("获取验证码");
				$('#mobPhone').val($('#email').val());
			}
			else{
				$('#bdyMobileButton').html("获取短信验证码");
			}
		}
	});
}

function ignoreToolBar() {

}

function queryUserId() {
	var sysRefNo = $('#sysRefNo').val();
	// if (userId == null || userId == "") {
	// SCFUtils.error("请输入用户名");
	// return result;
	// }
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000253',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			$('#mobPhone').val(data.rows[0].mobPhone);
			$('#email').val(data.rows[0].email);
		}

	};
	SCFUtils.ajax(options);
}

//function sendVerCode() {
//	queryUserId();
//	var option = {
//		url : SCFUtils.AJAXURL,
//		data : {
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
//
//}

function addVerSuccess() {
}

function doSave(win) {
	var data = SCFUtils.convertArray('updatePwdForm');
	if (!data)
		return;
	compareVerSuccess(win);
//	var option = {
//		url : SCFUtils.AJAXURL,
//		data : {
//			cacheType : 'non',
//			byFunc : 'N',
//			requestTp : 'post',
//			getdataId : 'I_P_000081',
//			mobPhone : $("#mobPhone").val(),
//			sysRefNo : $("#sysRefNo").val(),
//			inputCode : $("#identifyingcode").val()
//		},
//		callBackFun : function(data) {
//			if (data.success) {
//				if (data.obj) {
//					
//				} else {
//					SCFUtils.alert("验证码错误,请重新输入！");
//					$("#identifyingcode").val('');
//					$('#identifyingcode_succeed').removeClass('succeed');
//				}
//			}
//		}
//
//	};
//	SCFUtils.ajax(option);
}

function compareVerSuccess(win) {
	var sysRefNo = $("#sysRefNo").val();
	//var row = win.getData("row");
	//var result = false;
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000115',
			cacheType :'non',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data)) {
				checkPwd(data, win);
			}
		}
	};
	SCFUtils.ajax(opt);	
	//return result;
}

function checkPwd(data, win) {
	var oldPwd = $("#oldPwd").val();
	var newPwd = $('#newPwd').val();
	var enterPwd = $("#enterPwd").val();
	var pwdDueDt = getTime();
	oldPwd = hex_md5(oldPwd);
	newPwd = hex_md5(newPwd);
	enterPwd = hex_md5(enterPwd);
	if (oldPwd != data.rows[0].password) {
		SCFUtils.alert("原密码错误！");
		resetPwd();
		return;
	}
	if (enterPwd != newPwd) {
		SCFUtils.alert("两次密码不一致！");
		resetPwd();
		return;
	}
	if (oldPwd == newPwd) {
		SCFUtils.alert("新密码与原密码一致！");
		resetPwd();
		return;
	}
	var row = {};
	row.op = "edit";
	var options = {
		reqid : 'I_P_000063',
		title : '修改密码',		
		data : {
			//'row' : row,
			sysRefNo : $("#sysRefNo").val(),
			password : newPwd,
			pwdDueDt : pwdDueDt,
			strTrxStatus:'M',
			cacheType :'non'
		},
		onSuccess : function(data) {
			var target = win.getData('callback');
			target();			
		}
	};
	SCFUtils.getData(options);
	SCFUtils.result("修改密码成功！", function() {
		win.close();
	});
}
function getTime() {
	var curr_date = new Date();
	var month = (curr_date.getMonth() + 2);
	if (eval(month) < 10) {
		month = 0 + "" + month;
	}
	var day = curr_date.getDate();
	if (eval(day) < 10) {
		day = 0 + "" + day;
	}
	return curr_date.getFullYear() + "-" + month + "-" + day;
}

function resetPwd() {
	$('#oldPwd').val('').validatebox('isValid');
	//去掉勾
	$('#oldPwd_succeed').removeClass('succeed');
	$('#newPwd').val('').validatebox('isValid');
	$('#newPwd_succeed').removeClass('succeed');
	$('#enterPwd').val('').validatebox('isValid');
	$('#enterPwd_succeed').removeClass('succeed');
	
}

function pageLoad(win) {
	// var data = SCFUtils.convertArray('searchForm');
}

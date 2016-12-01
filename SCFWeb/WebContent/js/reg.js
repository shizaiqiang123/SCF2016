function pageOnInt() {
	SCFUtils.setFormReadonly('#regForm',true);
	$('#arrivalDt').datebox({
		onSelect : onSelect
	});
	SCFUtils.setTextReadonly('userId', false);
	SCFUtils.setTextReadonly('identifyingcode', false);
	SCFUtils.setTextReadonly('remark', false);
	SCFUtils.setTextReadonly('acNo', false);
	SCFUtils.setTextReadonly('acNm', false);
	SCFUtils.setTextReadonly('acBkNm', false);
	SCFUtils.setDateboxReadonly('arrivalDt', false);
	$('#userId,#custInstCd').validatebox({
		onValidate : function(flag) {
		}
	});
	$('#centerDiv', parent.document).css({
		'width' : '80%',
		'padding-bottom' : '80px'
	});
	$('#infoDiv').hide();
}

function pageOnLoad(data) {
	SCFUtils.loadForm('regForm', data);
	getSysRefNo();
	queryCustImport();
	if(judgeAcNo(data)){
		$('#acNo').val("");
		$('#acNm').val("");
		$('#acBkNm').val("");
		$('#acNo').val("").validatebox('validate');
		$('#acNm').val("").validatebox('validate');
		$('#acBkNm').val("").validatebox('validate');
	}
//	$('#identifyingcode').val("");
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('regForm', data);
	$('#identifyingcode').val("");
	$('#identifyingcode').val("").validatebox('validate');
	$('#lsysRefNo').html($('#sysRefNo').val());
}

function ignoreToolBar() {

}

function userIdFocus() {
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
	if (!flag) {
		$('#userId_error').addClass('error').removeClass('null').text(
				'该用户名不符合规范');
		$('#userId').focus();
		return result;
	}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000129',
			reqLoginType : 'noLogin',
			userId : userId
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length != 0) {
					$('#userId').focus();
					$('#userId_error').addClass('error').removeClass('null')
							.text('该用户名已被注册');
					return;
				} else {
					$('#userId').removeClass('validatebox-invalid');
					$('#userId_succeed').addClass('succeed');
					$('#userId_error').addClass('null').removeClass('error')
							.text('');
					result = true;
					return result;
				}
			}
		}
	};
	SCFUtils.ajax(options);
	return result;
}

function agreeonProtocol() {
	if ($("#readme")[0].checked) {
		$('#nextBtn').removeClass("disabled").removeClass('cursorD').unbind()
				.bind('click', nextBtnClick);
	} else {
		$('#nextBtn').addClass("disabled").addClass('cursorD').unbind();
	}
}

function onDownNotice() {
	$.showWindow({
		title : '模板下载页面',
		useiframe : true,
		modal : true,
		width : '70%',
		height : '80%',
		minimizable : false,
		maximizable : false,
		collapsible : false,
		content : 'url:jsp/SYS_ModelList.jsp',
		data : {
			'reqType' : 'noLogin'
		}
	/*
	 * , buttons:[{ text:'下载', handler:'downNotice' }]
	 */
	});
}

function showProtocol() {
	$.showWindow({
		title : '用户注册协议',
		useiframe : true,
		modal : true,
		width : '70%',
		height : '80%',
		minimizable : false,
		maximizable : false,
		collapsible : false,
		content : 'url:jsp/protocol.html',
		data : {
			'reqType' : 'noLogin',
			'callback' : onproSuccess
		},
		buttons : [ {
			text : '同意并继续',
			handler : 'protocolReg'
		}, {
			text : '下载',
			handler : 'downProtocol'
		} ]
	});
}

function onproSuccess() {
	$("#readme")[0].checked = true;
	$('#protocol').css('color', '#f00');
	agreeonProtocol();
}

function getSysRefNo() {
	var options = {};
	options.data = {
		reqLoginType : "noLogin",
		refName : 'FacNo',
		refField : 'sysRefNo'
	};
	options.onSuccess = function(data) {
		$('#lsysRefNo').html(data[0].sysRefNo);
		$('#copySysRefNo').val(data[0].sysRefNo);
	};
	SCFUtils.getRefNo(options);
	
	var opt = {};
	opt.data = {
		reqLoginType : "noLogin",
		refName : 'AcNo',
		refField : 'acRefNo'
	};
	opt.onSuccess = function(data) {
		$('#acRefNo').val(data[0].acRefNo);
	};
	SCFUtils.getRefNo(opt);
}

function mobileValidateBtn() {

}

/**
 * 实物资料预计到达日必须大于等于平台日期
 * 
 * @param date
 */
function onSelect(date) {
	var trxDt = SCFUtils.getcurrentdate();

	if (SCFUtils.DateDiff(trxDt, SCFUtils.dateFormat(date)) > 0) {
		SCFUtils.alert("纸质材料寄送日必须大于等于平台日期");
		$(this).datebox('setValue', '');
	}
}

function cancelBtnClick() {
	var options = {
		url : SCFUtils.CANCEL,
		data : {
			reqLoginType : "noLogin"
		},
		callBackFun : goLogin
	};
	SCFUtils.ajax(options);
}

function goLogin() {
	parent.window.location = SCFUtils.ROOTURL + "/main.jsp";
}

function compareVerSuccess() {
	var data = SCFUtils.convertArray('regForm');
	if (!data)
		return;
	var options = {
		url : SCFUtils.SUBMITURL,
		data : $.extend({
			reqPageType : 'next',
			cacheType : 'non',
			reqLoginType : "noLogin"
		}, data),
		async : true,
		callBackFun : function(data) {
			SCFUtils.requestUrl(data, "noLogin");
		}
	};
	SCFUtils.ajax(options);
}

function showMobPhoneCode() {
	/*
	 * <div class="item"> <span class="label">短信验证码：</span> <div class="fl
	 * item-ifo"> <input type="text" class="easyui-validatebox combo"
	 * required="true" id="identifyingcode" name="identifyingcode"
	 * mobPhonecode="true"
	 * data-options="validType:'maxLength[6]',mobPhoneId:'mobPhone'"
	 * style="width:132px"/> </div> </div>
	 */

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

function nextBtnClick() {
	var data = SCFUtils.convertArray('regForm');
	if (!data) {
		SCFUtils.alert("请检查注册信息是否填写完整");
		return;
	}
		if ($("#readme")[0].checked == false) {
			$("#protocol_error").removeClass('hide');
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
				mobPhone : $("#mobPhone").val(),
				sysRefNo : $("#sysRefNo").val(),
				inputCode : $("#identifyingcode").val()
			},
			callBackFun : function(data) {
				if (data.success) {
					if (data.obj) {
						compareVerSuccess();
					} else {
						SCFUtils.alert("验证码错误,请重新输入！");
						$("#identifyingcode").focus();
						$("#identifyingcode").val('');
						$('#identifyingcode_succeed').removeClass('succeed');
					}
				}
			}
		};
		SCFUtils.ajax(option);
}

function showMaterial() {
	$.showWindow({
		title : '纸质材料寄送要求',
		useiframe : true,
		modal : true,
		width : '70%',
		height : '80%',
		minimizable : false,
		maximizable : false,
		collapsible : false,
		content : 'url:jsp/material.html',
		data : {
			'reqType' : 'noLogin',
			'callback' : onMaterialSuccess
		},
		buttons : [ {
			text : '打印',
			handler : 'printReg'
		}, {
			text : '下载',
			handler : 'materialReg'
		},{
			text : '关闭',
			handler : 'materialClose'
		}  ]
	});
}
function onMaterialSuccess() {

}

function queryCustImport(){
	var licenceNo = $('#licenceNo').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000296',
				reqLoginType : 'noLogin',
				licenceNo : licenceNo
			},
			callBackFun : function(data) {
				if (data.success) {
					if (data.rows.length == 0) {
						return;
					}else{
						SCFUtils.loadForm('regForm', data.rows[0]);
						$('#sysRefNo').val($('#copySysRefNo').val());
					}
				}
			}

		};
		SCFUtils.ajax(options);
}

function judgeAcNo(data){
	var flag = true;
	if(data.obj.acNo){
	}else{
		flag = false;
	}
	return flag;
}
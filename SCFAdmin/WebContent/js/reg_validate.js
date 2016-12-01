function pageOnInt() {
	$('#centerDiv', parent.document).css({
		'width' : '80%',
		'padding-bottom' : '80px'
	});
}

function pageOnLoad() {
}

function ignoreToolBar() {
}

/**
 * 验证营业执照
 */
function licenceNoFocus() {
	$('#licenceNo').addClass('validatebox-invalid');
	$('#licenceNo_succeed').removeClass('succeed');
}

/**
 * 验证营业执照
 */
function licenceNoBlur() {
	var result = false;
	var licenceNo = $('#licenceNo').val();
	if (licenceNo == null || licenceNo == "") {
		$('#licenceNo_error').addClass('null').removeClass('error').text('');
		emptyAcNo();
		return result;
	}
	var flag = $('#licenceNo').validatebox('isValid');
	if (!flag) {
		$('#licenceNo').focus();
		$('#licenceNo_error').addClass('error').removeClass('null').text(
				'该营业执照不符合规范');
		emptyAcNo();
		return result;
	}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000263',
			reqLoginType : 'noLogin',
			licenceNo : licenceNo
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length != 0) {
					$('#licenceNo').focus();
					$('#licenceNo_error').addClass('error').removeClass('null')
							.text('该营业执照已被注册');
					emptyAcNo();
					return;
				} else {
					queryCustImport();

				}
			}
		}

	};
	SCFUtils.ajax(options);
	return result;
}

/**
 * 验证账号
 */
function acNoBlur() {
	var data = SCFUtils.convertArray('regForm');
	if (!data) {
		SCFUtils.alert("请检查表单输入是否完整");
		return;
	}
	var result = false;
	var licenceNo = $('#licenceNo').val();
	var acNo = $('#acNo').val();
	var acNm = $('#acNm').val();
	var acBkNm = $('#acBkNm').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000297',
			reqLoginType : 'noLogin',
			licenceNo : licenceNo
		},
		callBackFun : function(data) {
			if (data.success) {
				for ( var i = 0; i < (data.rows).length; i++) {
					if (data.rows[i].acNo == acNo && data.rows[i].acNm == acNm && data.rows[i].acBkNm == acBkNm) {
						result = true;
						break;
					}
				}
				if (!result) {
					SCFUtils.alert('未查询到该账号信息');
					$('#acNo').val('');
					$('#acNm').val('');
					$('#acBkNm').val('');
					$('#acNo').val("").validatebox('validate');
					$('#acNm').val("").validatebox('validate');
					$('#acBkNm').val("").validatebox('validate');
				}

			}
		}
	};
	SCFUtils.ajax(options);
	return result;
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

function nextBtnClick() {
	if(acNoBlur()){
		var data = SCFUtils.convertArray('regForm');
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
	}else{
		return;
	}
}

function queryCustImport() {
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
					$('#licenceNo').focus();
					$('#licenceNo_error').addClass('error').removeClass('null')
							.text('您未初始化该公司信息');
					emptyAcNo();
					return;
				} else {
					queryCustAc();
				}
			}
		}

	};
	SCFUtils.ajax(options);
}

function queryCustAc() {
	var result = false;
	var licenceNo = $('#licenceNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000297',
			reqLoginType : 'noLogin',
			licenceNo : licenceNo
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length == 0) {
					$('#licenceNo').focus();
					$('#licenceNo_error').addClass('error').removeClass('null')
							.text('您未初始化账号信息');
					emptyAcNo();
					return;
				} else {
					$('#licenceNo').removeClass('validatebox-invalid');
					$('#licenceNo_succeed').addClass('succeed');
					$('#licenceNo_error').addClass('null').removeClass('error')
							.text('');
					$('#nextBtn').removeClass("disabled")
							.removeClass('cursorD').unbind().bind('click',
									nextBtnClick);
					result = true;
				}
			}
		}
	};
	SCFUtils.ajax(options);
	return result;
}

function emptyAcNo() {
	$('#nextBtn').addClass("disabled").addClass('cursorD').unbind();
	$('#acNo').val('');
	$('#acNm').val('');
	$('#acBkNm').val('');
}
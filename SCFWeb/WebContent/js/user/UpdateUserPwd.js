function beforeLoad() {
	// var sysRefNo=SCFUtils.SYSUSERREF;
	var sysRefNo = $('#sysRefNo').val();
	var data = {};
	data.data = {
		sysRefNo : sysRefNo
	};
	return data;
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('userAddForm', data);
}
function pageOnLoad(data) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000101',
			sysRefNo : $('#sysRefNo').val()
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#mobPhone').val(data.rows[0].mobPhone);
				$('#sysEventTimes').val(data.rows[0].sysEventTimes);
			}
		}
	};
	SCFUtils.ajax(opt);
}

function AuthPasswd(string) {
	if (string.length >= 1) {
		if (/[a-z]+/.test(string) && /[0-9]+/.test(string)
				&& /[A-Z]+/.test(string)) {
			noticeAssign(1);
		} else if (/[a-zA-Z]+/.test(string) || /[0-9]+/.test(string)
				|| /\W+\D+/.test(string)) {
			if (/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string)) {
				noticeAssign(-1);
			} else if (/\[a-zA-Z]+/.test(string) && /\W+\D+/.test(string)) {
				noticeAssign(-1);
			} else if (/[0-9]+/.test(string) && /\W+\D+/.test(string)) {
				noticeAssign(-1);
			} else {
				noticeAssign(0);
			}
		}
	} else {
		noticeAssign(null);
	}
}

function noticeAssign(num) {
	if (num == 1) {
		$('#weak').css({
			backgroundColor : '#009900'
		});
		$('#middle').css({
			backgroundColor : '#009900'
		});
		$('#strength').css({
			backgroundColor : '#009900'
		});
		$('#strength').html('强');
		$('#middle').html('');
		$('#weak').html('');
	} else if (num == -1) {
		$('#weak').css({
			backgroundColor : '#ffcc33'
		});
		$('#middle').css({
			backgroundColor : '#ffcc33'
		});
		$('#strength').css({
			backgroundColor : ''
		});
		$('#weak').html('');
		$('#middle').html('中');
		$('#strength').html('');
	} else if (num == 0) {
		$('#weak').css({
			backgroundColor : '#dd0000'
		});
		$('#middle').css({
			backgroundColor : ''
		});
		$('#strength').css({
			backgroundColor : ''
		});
		$('#weak').html('弱');
		$('#middle').html('');
		$('#strength').html('');
	} else {
		$('#weak').html('弱');
		$('#middle').html('中');
		$('#strength').html('强');
		$('#weak').css({
			backgroundColor : '#ffffff'
		});
		$('#middle').css({
			backgroundColor : '#ffffff'
		});
		$('#strength').css({
			backgroundColor : '#ffffff'
		});
	}
}
function checkPassword(password) {
	var flag = false;
	// var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,8}$/;
	if (password.length < 6 || password.length > 8) {
		SCFUtils.alert("密码必须由6~8位组成且需同时包含数字、小写字母和大写字母!");
		flag = true;
		return flag;
	}
	if (!(/([a-z])+/.test(password))) {
		SCFUtils.alert("密码必须由6~8位组成且需同时包含数字、小写字母和大写字母!");
		flag = true;
		return flag;
	}
	if (!(/([0-9])+/.test(password))) {
		SCFUtils.alert("密码必须由6~8位组成且需同时包含数字、小写字母和大写字母!");
		flag = true;
		return flag;
	}
	if (!(/([A-Z])+/.test(password))) {
		SCFUtils.alert("密码必须由6~8位组成且需同时包含数字、小写字母和大写字母!");
		flag = true;
		return flag;
	}
	var regEx = new RegExp(/^(([^\^\.<>%&',;=?$"':#@!~\]\[{}\\/`\|])*)$/);
	var result = password.match(regEx);
	if (result == null) {
		SCFUtils.alert("密码不能包含数字、大小写字母之外的字符!");
		flag = true;
		return flag;
	}

}

function showPwd() {
	var oldPwd = document.getElementById("oldPwd");
	oldPwd.type = "text";
}
function hidePwd() {
	var oldPwd = document.getElementById("oldPwd");
	oldPwd.type = "password";
}

function showNPwd() {
	var newPwd = document.getElementById("newPwd");
	newPwd.type = "text";
}
function hideNPwd() {
	var newPwd = document.getElementById("newPwd");
	newPwd.type = "password";
}

function checkPwd() {
	var flag = false;
	var oldPwd = $('#oldPwd').val();
	var newPwd = $('#newPwd').val();
	var newPwdHD = $('#newPwd').val();

	var enterPwd = $('#enterPwd').val();
	oldPwd = hex_md5(oldPwd);
	newPwd = hex_md5(newPwd);
	enterPwd = hex_md5(enterPwd);
	var sysRefNo = $('#sysRefNo').val();
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000115',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows[0])) {
					if (data.rows[0].password != oldPwd) {
						SCFUtils.error('旧密码不正确，重新输入。');
						$('#oldPwd').val('');
						flag = false;
						return flag;
					} else if (newPwd != enterPwd) {
						SCFUtils.error('两次密码输入不一致。');
						flag = false;
						return flag;
					} else if (newPwd == oldPwd) {
						SCFUtils.error('新密码与原密码一直，请重新输入！');
						flag = false;
						return flag;
					} else if (checkPassword(newPwdHD) == true) {
						SCFUtils.error('新密码格式有误，请重新输入！');
						flag = false;
						return flag;
					} else {
						flag = true;
						return flag;
					}
				} else {
					SCFUtils.alert('没有找到对应的用户信息。');
				}
			}
		};
		SCFUtils.ajax(opt);
		return flag;
	} else {
		return !flag;
	}
}

function onNextBtnClick() {
	if (!checkPwd()) {
		return;
	} else {
		$('#oldPwd').val(hex_md5($('#oldPwd').val()));
		$('#newPwd').val(hex_md5($('#newPwd').val()));
		$('#enterPwd').val(hex_md5($('#enterPwd').val()));
		$('#password').val($('#newPwd').val());
		return SCFUtils.convertArray('userAddForm');

	}
}

function onCancelBtnClick() {
	var sysRefNo = $('#sysRefNo').val();
	return {
		sysRefNo : sysRefNo
	};
}

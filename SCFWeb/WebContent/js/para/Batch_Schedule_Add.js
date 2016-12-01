function pageOnInt() {
	SCFUtils.setTextReadonly("express", true);
	SCFUtils.setTextReadonly("bu", true);
	lockInputField();
	ajaxBox();
}

//var userDefinedyear;
//var userDefinedmonth;
//var userDefinedday;

function lockInputField() {
	SCFUtils.setComboReadonly("month", true);
	SCFUtils.setComboReadonly("week", true);
	SCFUtils.setComboReadonly("hour", true);
	SCFUtils.setDateboxReadonly("date", true);
	SCFUtils.setNumberboxReadonly("minute", true);
	SCFUtils.setNumberboxReadonly("second", true);
}

function cleanField() {
	$('#minute').numberbox('setValue', 0);
	$('#second').numberbox('setValue', 0);
	$('#date').datebox('setValue', '');
	$('#week').combobox('setValue', '');
	$('#month').combobox('setValue', '');
	$('#hour').combobox('setValue', '');
	$('#express').val('');
}

function ajaxBox() {
	var scheduletype = [ {
		"id" : '自定义',
		"text" : "自定义"
	}, {
		"id" : '每季度初',
		"text" : "每季度初"
	}, {
		"id" : '每季度末',
		"text" : "每季度末"
	}, {
		"id" : '每月初',
		"text" : "每月初"
	}, {
		"id" : '每月末',
		"text" : "每月末"
	}, {
		"id" : '每周',
		"text" : "每周"
	}, {
		"id" : '每天',
		"text" : "每天"
	}, {
		"id" : '每小时',
		"text" : "每小时"
	}, {
		"id" : '每分钟',
		"text" : "每分钟"
	}, {
		"id" : '每秒',
		"text" : "每秒"
	} ];
	$('#scheduletype').combobox('loadData', scheduletype);

	var checkholiday = [ {
		"id" : 'Y',
		"text" : "Y"
	}, {
		"id" : 'N',
		"text" : "N"
	} ];
	$('#checkholiday').combobox('loadData', checkholiday);

	var isbybu = [ {
		"id" : 'Y',
		"text" : "Y"
	}, {
		"id" : 'N',
		"text" : "N"
	} ];
	$('#isbybu').combobox('loadData', isbybu);

	var month = [ {
		"id" : '1',
		"text" : "1"
	}, {
		"id" : '2',
		"text" : "2"
	}, {
		"id" : '3',
		"text" : "3"
	}, {
		"id" : '4',
		"text" : "4"
	}, {
		"id" : '5',
		"text" : "5"
	}, {
		"id" : '6',
		"text" : "6"
	}, {
		"id" : '7',
		"text" : "7"
	}, {
		"id" : '8',
		"text" : "8"
	}, {
		"id" : '9',
		"text" : "9"
	}, {
		"id" : '10',
		"text" : "10"
	}, {
		"id" : '11',
		"text" : "11"
	}, {
		"id" : '12',
		"text" : "12"
	} ];
	$('#month').combobox('loadData', month);

	var hour = [ {
		"id" : '0',
		"text" : "0"
	}, {
		"id" : '1',
		"text" : "1"
	}, {
		"id" : '2',
		"text" : "2"
	}, {
		"id" : '3',
		"text" : "3"
	}, {
		"id" : '4',
		"text" : "4"
	}, {
		"id" : '5',
		"text" : "5"
	}, {
		"id" : '6',
		"text" : "6"
	}, {
		"id" : '7',
		"text" : "7"
	}, {
		"id" : '8',
		"text" : "8"
	}, {
		"id" : '9',
		"text" : "9"
	}, {
		"id" : '10',
		"text" : "10"
	}, {
		"id" : '11',
		"text" : "11"
	}, {
		"id" : '12',
		"text" : "12"
	}, {
		"id" : '13',
		"text" : "13"
	}, {
		"id" : '14',
		"text" : "14"
	}, {
		"id" : '15',
		"text" : "15"
	}, {
		"id" : '16',
		"text" : "16"
	}, {
		"id" : '17',
		"text" : "17"
	}, {
		"id" : '18',
		"text" : "18"
	}, {
		"id" : '19',
		"text" : "19"
	}, {
		"id" : '20',
		"text" : "20"
	}, {
		"id" : '21',
		"text" : "21"
	}, {
		"id" : '22',
		"text" : "22"
	}, {
		"id" : '23',
		"text" : "23"
	} ];
	$('#hour').combobox('loadData', hour);

	var week = [ {
		"id" : '1',
		"text" : "1"
	}, {
		"id" : '2',
		"text" : "2"
	}, {
		"id" : '3',
		"text" : "3"
	}, {
		"id" : '4',
		"text" : "4"
	}, {
		"id" : '5',
		"text" : "5"
	}, {
		"id" : '6',
		"text" : "6"
	}, {
		"id" : '7',
		"text" : "7"
	} ];
	$('#week').combobox('loadData', week);

	$('#scheduletype').combobox({
		onSelect : function() {
			if ("自定义" == ($('#scheduletype').combobox('getValue'))) {
				cleanField();
				lockInputField();
				SCFUtils.setComboReadonly("hour", false);
				SCFUtils.setNumberboxReadonly("minute", false);
				SCFUtils.setNumberboxReadonly("second", false);
				SCFUtils.setDateboxReadonly("date", false);
//				$('#date').datebox('setValue','2102-10-21');
//				$('#date').datebox({
//					onSelect : function(date) {
//						userDefinedyear = date.getFullYear();
//						userDefinedmonth = date.getMonth() + 1;
//						userDefinedday = date.getDate();
//					}
//				});
			} else if ("每季度初" == $('#scheduletype').combobox('getValue')) {
				cleanField();
				lockInputField();
				SCFUtils.setComboReadonly("hour", false);
				SCFUtils.setComboReadonly("month", false);
				SCFUtils.setNumberboxReadonly("minute", false);
				SCFUtils.setNumberboxReadonly("second", false);
			} else if ("每季度末" == $('#scheduletype').combobox('getValue')) {
				cleanField();
				lockInputField();
				SCFUtils.setComboReadonly("hour", false);
				SCFUtils.setComboReadonly("month", false);
				SCFUtils.setNumberboxReadonly("minute", false);
				SCFUtils.setNumberboxReadonly("second", false);
			} else if ("每月初" == $('#scheduletype').combobox('getValue')) {
				cleanField();
				lockInputField();
				SCFUtils.setComboReadonly("hour", false);
				SCFUtils.setNumberboxReadonly("minute", false);
				SCFUtils.setNumberboxReadonly("second", false);
			} else if ("每月末" == $('#scheduletype').combobox('getValue')) {
				cleanField();
				lockInputField();
				SCFUtils.setComboReadonly("hour", false);
				SCFUtils.setNumberboxReadonly("minute", false);
				SCFUtils.setNumberboxReadonly("second", false);
			} else if ("每周" == $('#scheduletype').combobox('getValue')) {
				cleanField();
				lockInputField();
				SCFUtils.setComboReadonly("week", false);
				SCFUtils.setComboReadonly("hour", false);
				SCFUtils.setNumberboxReadonly("minute", false);
				SCFUtils.setNumberboxReadonly("second", false);
			} else if ("每天" == $('#scheduletype').combobox('getValue')) {
				cleanField();
				lockInputField();
				SCFUtils.setComboReadonly("hour", false);
				SCFUtils.setNumberboxReadonly("minute", false);
				SCFUtils.setNumberboxReadonly("second", false);
			} else if ("每小时" == $('#scheduletype').combobox('getValue')) {
				cleanField();
				lockInputField();
				SCFUtils.setComboReadonly("hour", false);
			} else if ("每分钟" == $('#scheduletype').combobox('getValue')) {
				cleanField();
				lockInputField();
				SCFUtils.setNumberboxReadonly("minute", false);
			} else if ("每秒" == $('#scheduletype').combobox('getValue')) {
				cleanField();
				lockInputField();
				SCFUtils.setNumberboxReadonly("second", false);
			}
		}
	});

}

function addCronExpression() {
	if ("自定义" == $('#scheduletype').combobox('getValue')) {
		if ($('#date').datebox('getValue') !== ""
				&& $('#hour').combobox('getValue') !== ""
				&& $('#minute').numberbox('getValue') !== ""
				&& $('#second').numberbox('getValue') !== "") {
			var userDefineddate = $('#date').datebox('getValue');
			var a = userDefineddate.substr(5,1);
			var b = userDefineddate.substr(8,1);
			var userDefinedyear=userDefineddate.substr(0,4);
			var userDefinedmonth;
			var userDefinedday;
			if(b=='0'){
				userDefinedday=userDefineddate.substr(9,1);
			}else{
				userDefinedday=userDefineddate.substr(8,2);
			}
			if(a=='0'){
				userDefinedmonth=userDefineddate.substr(6,1);
			}else{
				userDefinedmonth=userDefineddate.substr(5,2);
			}
			var hour = $('#hour').combobox('getValue');
			var minute = $('#minute').numberbox('getValue');
			var second = $('#second').numberbox('getValue');
			$('#express').val(
					second + " " + minute + " " + hour + " " + userDefinedday
							+ " " + userDefinedmonth + " " + "?" + " "
							+ userDefinedyear);
			return true;
		} else {
			return false;
		}
	} else if ("每季度初" == $('#scheduletype').combobox('getValue')) {
		if ($('#hour').combobox('getValue') !== ""
				&& $('#minute').numberbox('getValue') !== ""
				&& $('#second').numberbox('getValue') !== ""
				&& $('#month').combobox('getValue') !== "") {
			var hour = $('#hour').combobox('getValue');
			var month = $('#month').combobox('getValue');
			var minute = $('#minute').numberbox('getValue');
			var second = $('#second').numberbox('getValue');
			$('#express').val(
					second + " " + minute + " " + hour + " " + "1" + " "
							+ month + "/" + "4" + " " + "?" + " " + "*");
			return true;
		} else {
			return false;
		}
	} else if ("每季度末" == $('#scheduletype').combobox('getValue')) {
		if ($('#hour').combobox('getValue') !== ""
				&& $('#minute').numberbox('getValue') !== ""
				&& $('#second').numberbox('getValue') !== ""
				&& $('#month').combobox('getValue') !== "") {
			var hour = $('#hour').combobox('getValue');
			var month = $('#month').combobox('getValue');
			var minute = $('#minute').numberbox('getValue');
			var second = $('#second').numberbox('getValue');
			$('#express').val(
					second + " " + minute + " " + hour + " " + "L" + " "
							+ month + "/" + "4" + " " + "?" + " " + "*");
			return true;
		} else {
			return false;
		}
	} else if ("每月初" == $('#scheduletype').combobox('getValue')) {
		if ($('#hour').combobox('getValue') !== ""
				&& $('#minute').numberbox('getValue') !== ""
				&& $('#second').numberbox('getValue') !== "") {
			var hour = $('#hour').combobox('getValue');
			var minute = $('#minute').numberbox('getValue');
			var second = $('#second').numberbox('getValue');
			$('#express').val(
					second + " " + minute + " " + hour + " " + "1" + " " + "*"
							+ " " + "?" + " " + "*");
			return true;
		} else {
			return false;
		}
	} else if ("每月末" == $('#scheduletype').combobox('getValue')) {
		if ($('#hour').combobox('getValue') !== ""
				&& $('#minute').numberbox('getValue') !== ""
				&& $('#second').numberbox('getValue') !== "") {
			var hour = $('#hour').combobox('getValue');
			var minute = $('#minute').numberbox('getValue');
			var second = $('#second').numberbox('getValue');
			$('#express').val(
					second + " " + minute + " " + hour + " " + "L" + " " + "*"
							+ " " + "?" + " " + "*");
			return true;
		} else {
			return false;
		}
	} else if ("每周" == $('#scheduletype').combobox('getValue')) {
		if ($('#hour').combobox('getValue') !== ""
				&& $('#minute').numberbox('getValue') !== ""
				&& $('#second').numberbox('getValue') !== ""
				&& $('#week').combobox('getValue') !== "") {
			var hour = $('#hour').combobox('getValue');
			var week = $('#week').combobox('getValue');
			var minute = $('#minute').numberbox('getValue');
			var second = $('#second').numberbox('getValue');
			$('#express').val(
					second + " " + minute + " " + hour + " " + "?" + " " + "*"
							+ " " + week + " " + "*");
			return true;
		} else {
			return false;
		}
	} else if ("每天" == $('#scheduletype').combobox('getValue')) {
		if ($('#hour').combobox('getValue') !== ""
				&& $('#minute').numberbox('getValue') !== ""
				&& $('#second').numberbox('getValue') !== "") {
			var hour = $('#hour').combobox('getValue');
			var minute = $('#minute').numberbox('getValue');
			var second = $('#second').numberbox('getValue');
			$('#express').val(
					second + " " + minute + " " + hour + " " + "*" + " " + "*"
							+ " " + "?" + " " + "*");
			return true;
		} else {
			return false;
		}
	} else if ("每小时" == $('#scheduletype').combobox('getValue')) {
		if ($('#hour').combobox('getValue') !== "") {
			var hour = $('#hour').combobox('getValue');
			$('#express').val(
					"*" + " " + "*" + " " + "*" + "/" + hour + " " + "*" + " "
							+ "*" + " " + "?" + " " + "*");
			return true;
		} else {
			return false;
		}
	} else if ("每分钟" == $('#scheduletype').combobox('getValue')) {
		if ($('#minute').numberbox('getValue') !== "") {
			var minute = $('#minute').numberbox('getValue');
			$('#express').val(
					"*" + " " + "*" + "/" + minute + " " + "*" + " " + "*"
							+ " " + "*" + " " + "?" + " " + "*");
			return true;
		} else {
			return false;
		}
	} else if ("每秒" == $('#scheduletype').combobox('getValue')) {
		if ($('#second').numberbox('getValue') !== "") {
			var second = $('#second').numberbox('getValue');
			$('#express').val(
					"*" + "/" + second + " " + "*" + " " + "*" + " " + "*"
							+ " " + "*" + " " + "?" + " " + "*");
			return true;
		} else {
			return false;
		}
	} else {
		return;
	}
}

function doSave(win) {
	if (addCronExpression() == true) {
		// alert($('#express').val());
		var data = SCFUtils.convertArray('mainForm');
		var target = win.getData('callback');
		target(data);
		win.close();
	} else {
		SCFUtils.alert('请检查输入是否完整！');
		return;
	}
}

function ignoreToolBar(){
	
}

function pageLoad(win) {
	var row = win.getData("row");
	// 修改
	if ('edit' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else if ('del' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else {

	}
}

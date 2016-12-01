function doSave(win) {
	var row = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(row);
	win.close();
}
function ignoreToolBar() {

}
function pageOnInt() {
	ajaxBox();
	SCFUtils.setNumberboxReadonly('rate', true);
	SCFUtils.setNumberboxReadonly('baseRt', true);
	findLev();
}
function ajaxBox() {
	var busiTp = [ {
		"id" : '0',
		"text" : "应收款融资",
		selected : true
	} ];
	$("#busiTp").combobox('loadData', busiTp);

	var finaTp = [ {
		"id" : '0',
		"text" : "普通融资",
		selected : true
	} ];
	$("#finaTp").combobox('loadData', finaTp);

	var rateTp = [ {
		"id" : '0',
		"text" : "基础利率"
	// ,
	// selected : true
	}, {
		"id" : '1',
		"text" : "基础利率+上浮点差",
	}, {
		"id" : '2',
		"text" : "基础利率+上浮百分比率",
	} ];
	$("#rateTp").combobox('loadData', rateTp);

	var feeOrIntr = [ {
		"id" : '0',
		"text" : "业务利率"
	// ,
	// selected : true
	}, {
		"id" : '1',
		"text" : "业务费率"
	} ];
	$("#feeOrIntr").combobox('loadData', feeOrIntr);
}

function ignoreToolBar() {

}

function pageLoad(win) {
	var row = win.getData("row");

	if (row.op == "edit") {
		$('#custLevel').combobox('setValue', row.custLevel);

		// 必输框有值情况下显示错误，手动修改
		$('#acctPeriodDesc').val(row.acctPeriodDesc).validatebox('validate');
		$('#acctPeriodDesc_succeed').removeClass('succeed');
		// $('#acctPeriodDesc').val(row.acctPeriodDesc);

		$('#busiTp').combobox('setValue', row.busiTp);
		$('#finaTp').combobox('setValue', row.finaTp);
		$('#acctPeriod').numberbox('setValue', row.acctPeriod);
		$('#feeOrIntr').combobox('setValue', row.feeOrIntr);
		$('#rateTp').combobox('setValue', row.rateTp);
		$('#rtSpread').numberbox('setValue', row.rtSpread);
		$('#libor').numberbox('setValue', row.libor);
		// $('#rate').numberbox('setValue', row.rate);
		$('#mainForm').append(
				"<input type='hidden' id=\"sysRefNo\"  name=\"sysRefNo\"  value=\""
						+ row.sysRefNo + "\" >");
		$('#mainForm').append(
				"<input type='hidden' id=\"sysBusiUnit\"  name=\"sysBusiUnit\"  value=\""
						+ row.sysBusiUnit + "\" >");

		lookRate();
		return;
	} else if (row.op == "add") {
		return;
	}
	SCFUtils.alert("您的网络有问题，请重新选取！");
}
function changeFeeOrIntr() {
	var feeOrIntr = $('#feeOrIntr').combobox('getValue');
	if (feeOrIntr == '0') {

		var rateTp = [ {
			"id" : '0',
			"text" : "基础利率"
		}, {
			"id" : '1',
			"text" : "基础利率+上浮点差"
		}, {
			"id" : '2',
			"text" : "基础利率+上浮百分比率"
		} ];
		$("#rateTp").combobox('loadData', rateTp);
	} else if (feeOrIntr == '1') {

		var rateTp = [ {
			"id" : '0',
			"text" : "基础费率"
		}, {
			"id" : '1',
			"text" : "基础费率+上浮点差"
		}, {
			"id" : '2',
			"text" : "基础费率+上浮百分比率"
		} ];
		$("#rateTp").combobox('loadData', rateTp);
	}
}

function findLev() {
	var sysBusiUnit = findBU();
	// var sysBusiUnit="SYSBU00215";
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000224',
			sysBusiUnit : sysBusiUnit
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装SCFUtils.isEmpty(data.rows)
				if (SCFUtils.isEmpty(data.rows)) {
					// ajaxCustLevel(data.rows);
					SCFUtils.alert("您还没有添加有效的客户等级信息");
					return;
				} else {
					$('#custLevel').combobox('loadData', data.rows);
					return;
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}

// 获取基础利率表的利率信息，塞进表格，业务类型，融资模式，融资期限，利率类型
function findBasalBaseRt(busiTp, finaTp, acctPeriod, feeOrIntr) {
	var sysBusiUnit = findBU();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000240',
			sysBusiUnit : sysBusiUnit,
			busiTp : busiTp,
			finaTp : finaTp,
			acctPeriod : acctPeriod,
			feeOrIntr : feeOrIntr
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils.alert("您还没有添加相应的基础利率或费率信息！");
				} else {
					if ((data.rows).length == 1) {
						$("#baseRt").numberbox('setValue', data.rows[0].baseRt);
					} else {
						SCFUtils.alert("网络错误，请检查网络！");
					}
				}
			} else {
				SCFUtils.alert("网络错误，请检查网络！");
			}
		}
	};
	SCFUtils.ajax(options);
}
function finalbaseRt() {

	var busiTp = $("#busiTp").combobox('getValue'); // 业务类型
	var finaTp = $("#finaTp").combobox('getValue'); // 融资模式
	var acctPeriod = $("#acctPeriod").val(); // 融资期限
	var feeOrIntr = $("#feeOrIntr").combobox('getValue'); // 利率?费率?acctPeriodDesc

	if (SCFUtils.isEmpty(busiTp) || SCFUtils.isEmpty(finaTp)
			|| SCFUtils.isEmpty(acctPeriod) || SCFUtils.isEmpty(feeOrIntr)) {
	} else {
		findBasalBaseRt(busiTp, finaTp, acctPeriod, feeOrIntr); // 重新刷新基础利率
	}
}
function changeRateTp() {
	var rateTp = $("#rateTp").combobox('getValue'); // 利率取值方式

	SCFUtils.setNumberboxReadonly("rtSpread", false);
	SCFUtils.setNumberboxReadonly("libor", false);
	if (rateTp == "0") {
		SCFUtils.setNumberboxReadonly("rtSpread", true);
		SCFUtils.setNumberboxReadonly("libor", true);
		$("#rtSpread").numberbox('setValue', 0);
		$("#libor").numberbox('setValue', 0);
	} else if (rateTp == "1") {
		SCFUtils.setNumberboxReadonly("libor", true);
		$("#libor").numberbox('setValue', 0);
	} else if (rateTp == "2") {
		SCFUtils.setNumberboxReadonly("rtSpread", true);
		$("#rtSpread").numberbox('setValue', 0);
	}
}
function lookRate() {
	var feeOrIntr = $("#feeOrIntr").combobox('getValue'); // 利率?费率?
	var rateTp = $("#rateTp").combobox('getValue'); // 利率取值方式
	var rtSpread = $("#rtSpread").val(); // 上浮点差
	var libor = $("#libor").val(); // 上浮百分比
	var baseRt = $("#baseRt").numberbox('getValue'); // 基础利率费率
	// SCFUtils.isEmpty(feeOrIntr)
	var rate = 0;

	if (SCFUtils.isEmpty(baseRt) || SCFUtils.isEmpty(rateTp)) {

	} else {

		baseRtNumber = parseFloat(baseRt);
		rtSpreadtNumber = parseFloat(rtSpread);
		libortNumber = parseFloat(libor);

		if (feeOrIntr == "0") { // 业务利率
			if (rateTp == "0") {
				rate = baseRtNumber;
			} else if (rateTp == "1") {
				if (SCFUtils.isEmpty(rtSpread)) {
					return;
				} else {
					rate = baseRtNumber + rtSpreadtNumber;
				}
			} else if (rateTp == "2") {
				if (SCFUtils.isEmpty(libor)) {
					return;
				} else {
					rate = baseRtNumber * (1 + libortNumber / 100);
				}
			} else {
				return;
			}
		} else if (feeOrIntr == "1") { // 业务费率
			if (rateTp == "0") {
				rate = baseRtNumber;
			} else if (rateTp == "1") {
				if (SCFUtils.isEmpty(rtSpread)) {
					return;
				} else {
					rate = baseRtNumber + rtSpreadtNumber;
				}
			} else if (rateTp == "2") {
				if (SCFUtils.isEmpty(libor)) {
					return;
				} else {
					rate = baseRtNumber * (1 + libortNumber / 100);
				}
			} else {
				return;
			}
		}

		$("#rate").numberbox('setValue', rate); // 最终利率费率值

	}
}
function onChangeBusiTp() {// 业务类型

	finalbaseRt();

}
function onChangeFinaTp() {// 融资模式

	finalbaseRt();

}
function onChangeAcctPeriod() {// 融资期限

	finalbaseRt();

}
function onChangeFeeOrIntr() {// 利率？费率

	changeFeeOrIntr();
	finalbaseRt();
	lookRate();

}
function onChangeRateTp() {// 利率取值方式

	changeRateTp();
	lookRate();

}
function onChangeRtSpread() {// 上浮点差

	lookRate();

}
function onChangeLibor() {// 上浮百分比

	lookRate();

}
function onChangeRate() {// 基础利率值

	lookRate();

}
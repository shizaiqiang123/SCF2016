function pageOnInt() {
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setDateboxReadonly('regDt', true);
	SCFUtils.setTextReadonly('licenceNo', true);
	SCFUtils.setTextReadonly('custInstCd', true);
	SCFUtils.setTextReadonly('custNm', true);
	SCFUtils.setTextReadonly('regAddr', true);
	SCFUtils.setTextReadonly('legalMobPhone', true);
	SCFUtils.setTextReadonly('legalRepNm', true);
	SCFUtils.setTextReadonly('remark', true);
	SCFUtils.setTextReadonly('contactPerson', true);
	SCFUtils.setTextReadonly('mobPhone', true);
	SCFUtils.setTextReadonly('userId', true);
	SCFUtils.setTextReadonly('email', true);
	SCFUtils.setTextboxReadonly('OldSysRelReason', true);
	SCFUtils.setDateboxReadonly('arrivalDt', true);
	findLev();
	ajaxBOx();
	var userOwnerid = $('#userSysRefNo').val();
	$('#userOwnerid').val(userOwnerid);
	
}

function ajaxBOx() {
	var signSts = [ {
		"id" : '1',
		"text" : "审核通过"
	},
//	{
//		"id" : '2',
//		"text" : "不通过"
//	},
	{
		"id" : '3',
		"text" : "材料待补充"
	} ];
	$("#signSts").combobox('loadData', signSts);
}
// 打回处理
function pageOnFPLoad(data) {
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('supplierForm', row);
	$("#busiUnit").val(findBU());
	findUserId();
	lookRefNo();
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('supplierForm', data);
	lookRefNo();
}
function pageOnPreLoad(data) {
	SCFUtils.loadForm('supplierForm', data);
	lookRefNo();
}
function onNextBtnClick() {
	if (!findCustImp()) {
		$("#signSts").combobox('setValue', "2");
		return;
	} else {
		var data = SCFUtils.convertArray('supplierForm');

		var sysRefNo = $("#sysRefNo").val();
		var signSts = $("#signSts").combobox('getValue');
		var userRoleInfo = {
			sysRefNo : sysRefNo,
			signSts : signSts,
		};
		$.extend(data, {
			'userRoleInfo' : SCFUtils.json2str(userRoleInfo)
		});

		var userId = $("#userId").val();
		var busiUnit = findBU();
		var userInfoM = {
			sysRefNo : sysRefNo,
			busiUnit : busiUnit,
			signSts : signSts,
			userId : userId
		};
		$.extend(data, {
			'userInfoM' : SCFUtils.json2str(userInfoM)
		});

		var licenceNo = $("#licenceNo").val();
		var custImpRefNo = $("#custImpRefNo").val();
		var custImp = {
//			sysEventTimes : 0,
			sysRefNo : custImpRefNo,
			signSts : signSts,
			licenceNo : licenceNo,
			'custId' : sysRefNo
		};
		$.extend(data, {
			'custImp' : SCFUtils.json2str(custImp)
		});
		
		//添加标示
		$.extend(data, {
			'custTp' : "0"
		});
		return data;
	}
	return;
}

function pageOnLoad(data) {
	$("#acNm").removeAttr("required");
	$("#acNo").removeAttr("required");
	$("#acBkNm").removeAttr("required");

	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('supplierForm', row);
	$("gongsi1").val(data.obj.custNm);
	$("#signSts").combobox('setValue', "3");
	$('#custLevel').combobox('setValue', "001");
	$("#busiUnit").val(findBU());
	findCustImp();

	findUserId();
	lookRefNo();
}
function lookSysRelReason() {
	var OldMessageDiv=$("#OldSysRelReason").val();
	if (SCFUtils.FUNCTYPE == "FP" || SCFUtils.FUNCTYPE == "PM") {
		if(OldMessageDiv==null || OldMessageDiv==""){
			$('#messageSpan').css('display', 'none');
			$('#OldMessageDiv').css('display', 'none');
		}
		$('#messageDiv').css('display', 'block');
	} else if (SCFUtils.FUNCTYPE == "DP" || SCFUtils.FUNCTYPE == "RE") {
		// SCFUtils.setTextboxReadonly('sysRelReason', false);
		$('#messageDiv').css('display', 'none');
	}
}
function exchangeSysRelReason(data) {
	var sysRelReason = data.sysRelReason;
	var OldSysRelReason = data.OldSysRelReason;
	data.sysRelReason = OldSysRelReason;
	data.OldSysRelReason = sysRelReason;

	return data;
}
function lookRefNo() {
	var sysRefNo = $('#sysRefNo').val();
	$('#lsysRefNo').html(sysRefNo);
	lookSysRelReason();
}

// 复核用的页面加载
function pageOnReleasePageLoad(data) {
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('supplierForm', row);
	$("#acNm").attr("required", "false");
	findUserId();
	lookRefNo();
	findCustImp();
}
function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('supplierForm', data);
	lookRefNo();
}
function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('supplierForm', data);
	lookRefNo();
}
function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}
function findLev() {
	var sysBusiUnit = findBU();
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
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils.alert("您没有可选的用户等级！");
					// ajaxCustLevel(data.rows);
				} else {
					$('#custLevel').combobox('loadData', data.rows);
					return;
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryBu() {
	var sysRefNo = $("#sysRefNo").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000247',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils.alert("网络错误，请检查网络！");
					// ajaxCustLevel(data.rows);
				} else {
					if ((data.rows).length != 1) {
						SCFUtils.alert("系统错误，请联系管理员！");
					} else {
//						$('#busiUnit').val(data.rows[0].busiUnit);
//						$('#sysBusiUnit').val(data.rows[0].busiUnit);
						return;
					}

				}
			}
		}
	};
	SCFUtils.ajax(options);
}
function findUserId() {
	var sysRefNo = $("#sysRefNo").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000247',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils.alert("网络错误，请检查网络！");
					// ajaxCustLevel(data.rows);
				} else {
					if ((data.rows).length != 1) {
						SCFUtils.alert("系统错误，请联系管理员！");
					} else {
						$('#userId').val(data.rows[0].userId);
						$('#userOwnerid').val(data.rows[0].userOwnerid);
//						$('#busiUnit').val(data.rows[0].busiUnit);
//						$('#sysBusiUnit').val(data.rows[0].busiUnit);
						return;
					}

				}
			}
		}
	};
	SCFUtils.ajax(options);
}
// 获取imp
function findCustImp() {
	// var sysBusiUnit = findBU();
	var flag = false;
	var licenceNo = $('#licenceNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000270',
			// sysBusiUnit : sysBusiUnit,
			licenceNo : licenceNo
		},
		callBackFun : function(data) {
			if (data.success) {
				if ((data.rows).length == 1) {
					$('#custImpRefNo').val(data.rows[0].sysRefNo);
					flag = true;
				} else {
					SCFUtils.alert("没有此供应商的相关客户记录！");
				}
			}
		}
	};
	SCFUtils.ajax(options);
	return flag;
}
function pageOnInt() {
//	SCFUtils.setTextReadonly('sysRefNo', true);
//	SCFUtils.setDateboxReadonly('regDt', true);
//	SCFUtils.setTextReadonly('custNm', true);
//	SCFUtils.setTextReadonly('userId', true);
//	SCFUtils.setTextReadonly('legalMobPhone', true);
//	SCFUtils.setTextReadonly('legalRepNm', true);
//	SCFUtils.setTextReadonly('regAddr', true);
//	SCFUtils.setTextReadonly('remark', true);
//	SCFUtils.setTextReadonly('acNm', true);
//	SCFUtils.setTextReadonly('acBkNm', true);
//	SCFUtils.setTextReadonly('acNo', true);
//	SCFUtils.setTextReadonly('contactPerson', true); 
//	SCFUtils.setTextReadonly('licenceNo', true);
//	SCFUtils.setTextReadonly('custInstCd', true);
//	SCFUtils.setTextReadonly('mobPhone', true);
//	SCFUtils.setTextReadonly('email', true);
//	SCFUtils.setComboReadonly('signSts', true);
//	SCFUtils.setDateboxReadonly('arrivalDt', true);
	SCFUtils.setFormReadonly('#supplierForm', true);
	ajaxBOx();
}
function beforeLoad(){
	var data = {
		cacheType : 'non'
	};
	return {data:data};
}
//去掉下面所有按钮
function initToolBar(){
	var showButton = ['cancel'];
	showButton.push('prev');
	showButton.push('print');
	
	return showButton;
}

function ajaxBOx() {
	var signSts = [ {
		"id" : '0',
		"text" : "待审核"
	}, {
		"id" : '1',
		"text" : "审核通过"
	}, {
		"id" : '2',
		"text" : "不通过"
	}, {
		"id" : '3',
		"text" : "材料待补充"
	} ];
	$("#signSts").combobox('loadData', signSts);
}
function lookRefNo() {
	var sysRefNo=$('#sysRefNo').val();
	$('#lsysRefNo').html(sysRefNo);
}
function pageOnLoad(data) {
	SCFUtils.loadForm('supplierForm', data.obj);

//	findAcNo();//审核的时候不需要
	lookRefNo();
}
function findBU(){
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if(SCFUtils.isEmpty(sysBusiUnit) ){
		sysBusiUnit="platform";
	}
	return sysBusiUnit;
}
// 获取当前用户在客户表的信息
function findRow() {
//	var sysBusiUnit = findBU();
	var sysRefNo = $("#userSysRefNo").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000243',
			sysRefNo : sysRefNo
//			,
//			sysBusiUnit:sysBusiUnit
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils.alert("网络错误!");
				} else {
					if ((data.rows).length = 1) {
						SCFUtils.loadForm('supplierForm', data.rows[0],false);

					} else {
						SCFUtils.alert("网络错误或没有您的信息,请联系管理员！");
					}
				}
			} else {
				SCFUtils.alert("网络错误!");
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
						return;
					}

				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function findAcNo() {
	var sysRefNo = $("#sysRefNo").val();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000250',
			sysRefNo : sysRefNo
//			,
//			sysTrxSts : "P"
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					// ajaxCustLevel(data.rows);
				} else {
					if ((data.rows).length != 1) {
						SCFUtils.alert("系统错误，请联系管理员！");
					} else {
						$('#acNm').val(data.rows[0].acNm);
						$('#acNo').val(data.rows[0].acNo);
						$('#acBkNm').val(data.rows[0].acBkNm);
						return;
					}
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

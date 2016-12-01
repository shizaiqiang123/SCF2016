//function beforeLoad(){
//	var sysRefNo = $('#sysRefNo').val();
//	var data = {
//		cacheType : 'non',
//		sysRefNo:sysRefNo
//	};
//	return {data:data};
//}
function pageOnInt() {
	$('#arrivalDt').datebox({
		onSelect : onSelect
	});
//	 findRow();
//	if(!flag){
//		var message="您目前还不需要额外补充材料！";
//		SCFUtils.alert(message, function() {
////				parent.window.location = SCFUtils.ROOTURL + "/index.jsp";
////			SCFUtils.onCancelBtnClick();
//		});
//	}
	
	SCFUtils.setFormReadonly('#supplierForm', true);
	SCFUtils.setDateboxReadonly('arrivalDt', false);
}
function isFlag(){
	var signSts = $('#signSts').val();
	var sysTrxSts = $('#sysTrxSts').val();
	var flag=false;
	if(signSts=="3" && sysTrxSts=="M"){
		flag=true;
	}
	return flag;
}
function pageOnLoad(data) {
//	findRow();
	SCFUtils.loadForm('supplierForm', data, false);
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
function onSaveBtnClick(data) {
	var data = SCFUtils.convertArray('supplierForm');
	return data;
}
function onNextBtnClick() {
	var data = SCFUtils.convertArray('supplierForm');
	var flag =isFlag();
	if(!flag){
		SCFUtils.alert("您还不需要额外补充材料！");
		return;
	}
	return data;
}
function printBtnClick() {
	window.print();
}
function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}
function lookRefNo() {
	var sysRefNo = $('#sysRefNo').val();
	$('#lsysRefNo').html(sysRefNo);
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
// 获取当前用户在客户表的信息
function findRow() {
	// var sysBusiUnit = findBU();
	var sysRefNo = $("#sysRefNo").val();
	var flag=false;
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000278',
			sysRefNo : sysRefNo,
		// ,
		// sysBusiUnit:sysBusiUnit
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
//					SCFUtils.alert("您还不需要额外补充材料！");
				} else {
					if ((data.rows).length = 1) {
						SCFUtils.loadForm('supplierForm', data.rows[0], false);
						flag=true;
					} else {
						SCFUtils.alert("您的信息已经失效，请重新申请或联系管理员！");
					}
				}
			} else {
				SCFUtils.alert("网络错误!");
			}
		}
	};
	SCFUtils.ajax(options);
	return flag;
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
			} else {
				$('#userId').val(data.rows[0].userId);
				$('#userOwnerid').val(data.rows[0].userOwnerid);
				return;
			}
		}
	};
	SCFUtils.ajax(options);
}

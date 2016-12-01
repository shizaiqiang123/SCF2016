function pageOnInt() {
	ajaxBox();
	loadcountry();
	SCFUtils.setComboReadonly('custTp', true);
	SCFUtils.setNumberboxReadonly('lmtAllocate', true);
	SCFUtils.setNumberboxReadonly('lmtBal', true);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('insureForm', data);
}

function pageOnLoad(data) {
	var options = {};
	options.data = {
		refName : 'FacNo',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	SCFUtils.loadForm('insureForm', data);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('insureForm', data);
}

function pageOnReleasePreLoad(data) {
	pageOnPreLoad(data);
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('insureForm', data);
}

function pageOnFPLoad(data) {
	SCFUtils.loadForm('insureForm', data);
}

function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('insureForm');
	return mainData;
}

function ajaxBox() {
	var custTp = [ {
		"id" : '3',
		"text" : "保险公司"
	}];
	$("#custTp").combobox('loadData', custTp);
	$('#custTp').combobox('setValue', '3');
	var optt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000006'
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#ccy').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(optt);
}

function loadcountry() {
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000328'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#countryId').combobox('loadData', data.rows);
				if (SCFUtils.OPTSTATUS == 'ADD')
					$('#countryId').combobox('setValue', 'CHN');
			}
		}
	};
	SCFUtils.ajax(option);
}

function changelmtAmt() {
	if (SCFUtils.OPTSTATUS == 'ADD') {
		$('#lmtAllocate').numberbox('setValue', 0);
		$('#lmtBal').numberbox('setValue', $('#lmtAmt').numberbox('getValue'));
	} else if (SCFUtils.OPTSTATUS == 'EDIT' || SCFUtils.OPTSTATUS == 'DELETE') {
		// 可用额度 = 额度 -已用额度
		$('#lmtBal').numberbox(
				'setValue',
				SCFUtils.Math($('#lmtAmt').numberbox('getValue'), $(
						'#lmtAllocate').numberbox('getValue'), 'sub'));
	}
}


function changeCustInstCd(){
	var custInstCd = $('#custInstCd').val();
	var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000430',
				custInstCd :custInstCd
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					SCFUtils.alert("组织机构代码已存在，请重新输入！");
					$('#custInstCd').val("");
				}
			}
		};
		SCFUtils.ajax(option);
}

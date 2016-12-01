function initToolBar() {
	return [ 'prev', 'cancel' ];
}

function beforeLoad() {
	var data = {
		cacheType : 'non'
	};
	return {
		data : data
	};
}

function pageOnInt() {
	ajaxBox();

}

function pageOnPreLoad(data) {
}

function pageOnLoad(data) {
	if (!SCFUtils.isEmpty(data)) {
		SCFUtils.loadForm('loanForm', data.obj);
		$('#intCcy').combobox('setValue', data.obj.intCcy);
		queryseler();

	}
}

function queryseler() {
	var sysRefNo = $('#selId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000068',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if (!SCFUtils.isEmpty(sysRefNo)) {
					$('#custNm').val(data.rows[0].custNm);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function checkNull() {
	var invAmt = $('#invAmt').numberbox('getValue');
	var invBal = $('#invBal').numberbox('getValue');
	// var invLoanBal=$('#invLoanBal').numberbox('getValue');
	// var invLoanAval=$('#invLoanAval').numberbox('getValue');
	if (SCFUtils.isEmpty(invAmt)) {
		$('#invAmt').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(invBal)) {
		$('#invBal').numberbox('setValue', 0);
	}
}

function ajaxBox() {
	// 币别
	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#intCcy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);

	data = [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '6',
		"text" : "应收账款池融资"
	}, {
		"id" : '7',
		"text" : "应收账款质押"
	} ];
	$("#busiTp").combobox('loadData', data);

	data = [ {
		"id" : '0',
		"text" : "正常利息"
	}, {
		"id" : '1',
		"text" : "逾期利息"
	}, {
		"id" : '2',
		"text" : "展期利息"
	}, {
		"id" : '3',
		"text" : "呆账利息"
	} ];
	$("#intTp").combobox('loadData', data);

	data = [ {
		"id" : '1',
		"text" : "预收息"
	}, {
		"id" : '2',
		"text" : "利随本清"
	} ];
	$("#payIntTp").combobox('loadData', data);

}

function onPrevBtnClick() {
	return SCFUtils.convertArray('loanForm');
}
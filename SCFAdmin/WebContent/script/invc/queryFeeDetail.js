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
	SCFUtils.setFormReadonly('feeForm', true);
}

function ajaxBox(){
	var busiTp = [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '6',
		"text" : "应收账款池融资"
	},{
		"id" : '7',
		"text" : "应收账款质押"
	}];
	$("#bustTp").combobox('loadData',busiTp);
	
	var costTp = [ {
		"id" : '0',
		"text" : '融资手续费'
	}, {
		"id" : '1',
		"text" : '应收账款处理费'
	} ]
	$("#costTp").combobox('loadData',costTp);
}

function pageOnPreLoad(data) {
}

function pageOnLoad(data) {
	if (!SCFUtils.isEmpty(data)) {
		SCFUtils.loadForm('feeForm', data.obj);
		ajaxCustNm(data);
		resetAmtValue(data);
	}
}

function ajaxCustNm(data){
	
	var custId = data.obj.selId;
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000619',
				sysRefNo : custId
			},
			callBackFun : function(data) {
				if(!SCFUtils.isEmpty(data.rows[0])){
					$('#selNm').val(data.rows[0].custNm);
				}
			}
	};
	SCFUtils.ajax(opt);
	
}

function resetAmtValue(data){
	var currFinPayCost = data.obj.currFinPayCost;//手续费
	var currTransPayCost = data.obj.currTransPayCost;//处理费
	if(SCFUtils.isEmpty(currFinPayCost)){
		$('#currFinPayCost').numberbox('setValue',SCFUtils.ccyFormatNoPre(0, 2));
	}
	if(SCFUtils.isEmpty(currTransPayCost)){
		$('#currTransPayCost').numberbox('setValue',SCFUtils.ccyFormatNoPre(0, 2));
	}
}

function onPrevBtnClick() {
	return SCFUtils.convertArray('loanForm');
}
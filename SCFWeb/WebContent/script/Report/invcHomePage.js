function pageOnInt() {
	ajaxBox();
}
/*function beforeLoad() {
	var data = {
		cacheType : 'non'
	};
	return {
		data : data
	};
}*/

function ajaxBox() {
	var busiTp = [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '2',
		"text" : "先票款后货"
	}, {
		"id" : '3',
		"text" : "信用保险项下"
	}, {
		"id" : '4',
		"text" : "现货动态"
	}, {
		"id" : '5',
		"text" : "现货静态"
	} ];
	$("#busiTp").combobox('loadData', busiTp);

	var invSts = [ {
		"id" : '0',
		"text" : '登记'
	}, {
		"id" : '1',
		"text" : '转让'
	}, {
		"id" : '2',
		"text" : '融资'
	}, {
		"id" : '3',
		"text" : '反转让'
	}, {
		"id" : '4',
		"text" : '贷项清单'
	}, {
		"id" : '5',
		"text" : '买方还款'
	}, {
		"id" : '6',
		"text" : '间接还款'
	}, {
		"id" : '7',
		"text" : '争议登记'
	}, {
		"id" : '8',
		"text" : '争议解决'
	}, {
		"id" : '9',
		"text" : '发票调整'
	}, {
		"id" : '10',
		"text" : '卖方还款'
	} ];
	$("#invSts").combobox('loadData', invSts);
}

/*function pageOnPreLoad(data) {
	SCFUtils.loadForm('cntrcHomeForm', data);
}*/
function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('cntrcHomeForm');
	return mainData;
}
/*
 * //查询网点信息 function showLookUpWindowInst() { var options = { title : '网点信息查询',
 * reqid : 'I_P_000106', onSuccess : netAddressSuccess };
 * SCFUtils.getData(options); }
 * 
 * function netAddressSuccess(data) { $('#instNo').val(data.sysRefNo);
 * $('#instName').val(data.brNm); }
 * 
 * function showLookUpWindowCust(){ var options = { title : '客户信息查询', reqid :
 * 'I_P_000020', onSuccess : cntrctNoSuccessCust }; SCFUtils.getData(options); }
 * 
 * function cntrctNoSuccessCust(data){ $('#custNo').val(data.sysRefNo);
 * $('#custName').val(data.custNm); }
 */


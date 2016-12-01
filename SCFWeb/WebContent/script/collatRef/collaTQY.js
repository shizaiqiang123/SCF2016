function pageOnInt(data) {
	ajaxBox();
//	SCFUtils.setComboReadonly('busiTp', true);
//	SCFUtils.setComboReadonly('ccy', true);
//	SCFUtils.setNumberspinnerReadonly('fundRt', true);
//	SCFUtils.setNumberspinnerReadonly('lmtBal', true);
//	SCFUtils.setNumberspinnerReadonly('ttlRegAmt', true);
//	SCFUtils.setNumberspinnerReadonly('ttlLowPayNum', true);
//	SCFUtils.setNumberspinnerReadonly('marginApplied', true);
//	SCFUtils.setNumberspinnerReadonly('initBailBal', true);
//	SCFUtils.setNumberspinnerReadonly('openLoanAmt', true);
//	SCFUtils.setTextReadonly('sysRefNo', true);
//	SCFUtils.setTextReadonly('selId', true);
//	SCFUtils.setTextReadonly('selNm', true);
//	SCFUtils.setTextReadonly('cntrctNo', true);
}

function ajaxBox() {
	var data =[ {
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
	$("#busiTp").combobox('loadData', data);
	
	var isChu=[{
		"id" : '0',
		"text" : "出库"
	},{
		"id" : '1',
		"text" : "入库"
	}];
	$("#isChu").combobox('loadData', isChu);
	
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006',
			cacheType : 'comm'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
}

function pageOnLoad(data) {
	SCFUtils.loadForm("collatTqyForm", data.obj);
	//判断入库还是出库（未明白两个字段如何判断）
	
	//出库入库为null则为0
	if(data.obj.collatQty==null||data.obj.collatQty==""){
		$('#collatQty').numberspinner('setValue','0');
	}
	if(data.obj.collatOutQty==null||data.obj.collatOutQty==""){
		$('#collatOutQty').numberspinner('setValue','0');
	}
	
	//计算库存数量，入库数量减去出库数量
	var qty = $("#collatQty").val()-$("#collatOutQty").val();
	$('#QTY').numberspinner('setValue',qty);
	//计算库存价值，最新认定价格*库存数量
	var qtyValue= $("#QTY").val()*$("#collatRdPrice").val();
	$('#QtyValue').numberspinner('setValue',qtyValue);
	//计算可覆盖敞口
	/*var loanOverBal = $("#QtyValue").val()*$("#fundRt").val()/100;
	$('#loanOverBal').numberspinner('setValue',loanOverBal);*/
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('collatTqyForm', data);
}
function pageOnPreLoad(data) {
	SCFUtils.loadForm('collatTqyForm', data);
}
function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('POForm', data);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}

function onNextBtnClick() {
}
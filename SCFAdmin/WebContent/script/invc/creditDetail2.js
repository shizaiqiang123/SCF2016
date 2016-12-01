function ignoreToolBar(){
	
}

function pageLoad(win) {
	SCFUtils.setTextReadonly("sysRefNo", true);
	ajaxBox();
	setFormReadOnly();
	//crnAmtHD
	var row = win.getData("row");
	if(row.op === 'edit'){
		//SCFUtils.loadForm('creditDetailForm', row);
		$('#sysRefNo').val(row.sysRefNo);
		$('#invNo').val(row.invNo);
		$('#cntrctNo').val(row.cntrctNo);
		$('#invCcy').combobox('setValue',row.invCcy);
		$('#invBal').numberbox('setValue',row.invBal);
		$('#invLoanBal').numberbox('setValue',row.invLoanBal);
		//$('#crnAmt').numberbox('setValue',row.crnAmt);
		//$('#invBal2').numberbox('setValue',row.invBal-100);
		//crnAmt设置为0.00
		$('#crnAmt').numberbox('setValue',0.00);
		
		//invBal2 = 发票余额-融资余额-贷项清单金额-融资余额/融资比例
		//          invBal - invLoanBal -  crnAmt -   invLoanBal/loanPerc/100  
		var invBal2Value_01 = SCFUtils.Math(row.invBal, row.invLoanBal, 'sub'); 
		var invBal2Value_02 = SCFUtils.Math(invBal2Value_01, row.crnAmt, 'sub'); 
		var invBal2Value_03 = SCFUtils.Math(row.invLoanBal, row.loanPerc, 'div'); 
		var invBal2Value_04 = SCFUtils.Math(invBal2Value_03, 100, 'mul'); 
		var invBal2Value_05 = SCFUtils.Math(invBal2Value_02, invBal2Value_04, 'sub'); 
		$('#invBal2').numberbox('setValue',invBal2Value_05);
	
		$('#batchNo').val(row.batchNo);
		$('#selId').val(row.selId);
		$('#buyerId').val(row.buyerId);
		
		
	}
}

function doSave(win) {
	var crnAmt   = $('#crnAmt').numberbox('getValue');//当部贷项清单金额
	var crnAmtHD = $('#crnAmtHD').val();//贷项清单总金额
	//贷项清单总金额=原始贷项清单总金额+当部贷项清单金额
	crnAmtHD=SCFUtils.Math(crnAmtHD, crnAmt, 'add');
	$('#crnAmt').val(crnAmtHD);
	var data = SCFUtils.convertArray('creditDetailForm');
	if(checkAmt(data)){
		var target = win.getData('callback');
		var invLoanBalLS=$('#invLoanBal').val();
		data.invLoanBalLS=invLoanBalLS;
		target(data);
		win.close();
	}
}

function ajaxBox(){
	var arType =  [ {
		"id" : '0',
		"text" : "订单"
	}, {
		"id" : '1',
		"text" : "应收账款"
	}, {
		"id" : '2',
		"text" : "货运单"
	}, {
		"id" : '3',
		"text" : "合同"
	}, {
		"id" : '4',
		"text" : "其他"
	}, {
		"id" : '5',
		"text" : "账单"
	} ];
	$("#arType").combobox('loadData', arType);
	var opt = {
		url  : SCFUtils.AJAXURL,
		data : {queryId : 'Q_P_000006',},
		callBackFun : function(data) {
			if (data.success) {
				$('#invCcy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
}

function setFormReadOnly(){
	
	SCFUtils.setComboReadonly('invCcy', true);
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setTextReadonly('invNo', true);
	SCFUtils.setNumberboxReadonly('invBal', true);
	SCFUtils.setNumberboxReadonly('invBal2', true);
	SCFUtils.setNumberboxReadonly('invLoanBal', true);
    
}

function changeinvAmt(){
	var crnAmt  = $('#crnAmt').numberbox('getValue');
	if(crnAmt == '') {
		crnAmt = 0.00;
	}
	var invBal2 = $('#invBal2').numberbox('getValue');
	if(crnAmt < 0){
		SCFUtils.alert("[贷项清单金额]应>0.");
		return;
	}
	var subAmt = SCFUtils.Math(invBal2, crnAmt, 'sub');
	$('#invBal2').numberbox('setValue', subAmt);
}



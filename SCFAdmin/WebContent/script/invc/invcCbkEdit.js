function ignoreToolBar(){
	
}

function pageLoad(win) {
	ajaxBox();
	var row = win.getData("row");
	var options = {};
	options.data = {
		refName : 'InvCbkNo',
		refField : 'sysRefNo',
		cacheType : 'non'
	};
	options.force = true;
	if (row.op === 'add') {
		$('#cntrctNo').val(row.cntrctNo);
		$('#batchNo').val(row.batchNo);
		$('#busiTp').val(row.busiTp);
		$('#acctPeriod').val(row.acctPeriod);
		$('#invCcy').combobox('setValue',row.invCcy);
//		SCFUtils.setComboReadonly('invCcy',true);
//		$('#buyerId').val(row.buyerId);
//		$('#selId').val(row.selId);
//		$('#invCcy').combobox('setValue',row.ccy);
	}else if(row.op === 'edit'){
		if(row.state === 'query'){
			SCFUtils.setFormReadonly('#invcMChgForm',true);
		}
		SCFUtils.getRefNo(options);
		$('#invNo').val(row.invNo);
		$('#invcId').val(row.sysRefNo);
		$('#trxId').val(row.trxId);
		$('#cntrctNo').val(row.cntrctNo);
		$('#invCcy').combobox('setValue', row.invCcy);
		$('#invAmt').numberbox('setValue', row.invAmt);
		$('#invBal').numberbox('setValue', row.invBal);
		$('#invLoanBal').numberbox('setValue', row.invLoanBal);
		$('#invCrnBal').numberbox('setValue', row.invCrnBal);
		$('#chgBcAmt').numberbox('setValue', row.chgBcAmt);
		$('#invBalHD').val(row.invBalHD);
	}
}

function doSave(win) {
	var data = SCFUtils.convertArray('invcCbkEditForm');
//	changeChgbcAmt(data);
	if(changeChgbcAmt(data)){
		var target = win.getData('callback');
		target(data);
//		win.close();
	}
	win.close();
}

function ajaxBox(){
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000006'
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#invCcy').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(opt);
		SCFUtils.setTextReadonly("invNo",true);
		SCFUtils.setComboReadonly("invCcy", true);
		SCFUtils.setNumberboxReadonly("invAmt", true);
		SCFUtils.setNumberboxReadonly("invBal", true);
		SCFUtils.setNumberboxReadonly("invLoanBal", true);
		SCFUtils.setNumberboxReadonly("invCrnBal", true);
}

function changeChgbcAmt(data){
	if(data){
		var invBalHD=data.invBalHD;
		var chgBcAmt=data.chgBcAmt;
		var subAmt=SCFUtils.Math(invBalHD, chgBcAmt, 'sub');
		if(subAmt>=0){
			data.invBal=subAmt;
			return true;
		}else{
			SCFUtils.alert("反转让金额不能大于应收账款余额，请重新输入。");
			return  false ;
		}
	}else{
		return false
	}
}


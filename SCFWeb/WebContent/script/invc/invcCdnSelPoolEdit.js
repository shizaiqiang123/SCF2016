function ajaxBox(){
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setTextReadonly("invCcy", true);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setTextReadonly("invNo", true);
	SCFUtils.setNumberspinnerReadonly("invBal", true);
	SCFUtils.setNumberspinnerReadonly("invLoanAval", true);
	SCFUtils.setNumberspinnerReadonly("invLoanBal", true);
	SCFUtils.setNumberspinnerReadonly("loanPerc", true);
}

function ignoreToolBar(){
	
}

function pageLoad(win) {	
	ajaxBox();
	var row = win.getData("row");
	
	$('#cntrctNo').val(row.cntrctNo);
	$('#invCcy').val(row.invCcy);
	$('#selId').val(row.selId);
	$('#buyerId').val(row.buyerId);
	$('#invNo').val(row.invNo);
	
	/*
	$('#invLoanBal').numberbox('setValue', row.invLoanBal);
	$('#loanPerc').numberspinner('setValue',row.loanPerc);
	$('#rowTtlCrnBal').val(rowTtlCrnBalAtBegin(row));
	
	var invBalOld =row.invBalOld;
	var invLoanAvalOld = row.invLoanAvalOld;
	$('#invBal').numberbox('setValue', invBalOld);
	$('#invBalOld').val(invBalOld);
	$('#invLoanAval').numberbox('setValue', invLoanAvalOld);
	$('#invLoanAvalOld').val(invLoanAvalOld);*/
	
	
	if(SCFUtils.FUNCTYPE == 'FP'){
		$('#invBal').numberbox('setValue', row.invBal);
		
		setLoanValue(SCFUtils.Math(row.invBal,row.crnAmt,'add'));
		
		$('#invLoanAval').numberbox('setValue', row.invLoanAval);
		$('#invLoanBal').numberbox('setValue', row.invLoanBal);
		$('#loanPerc').numberspinner('setValue',row.loanPerc);
		$('#rowTtlCrnBal').val(rowTtlCrnBalAtBegin(row));
		var loan_Perc = SCFUtils.Math(SCFUtils.Math(row.crnAmt, row.loanPerc, "mul"),100,"div");
		$('#invBalOld').val(SCFUtils.Math(row.invBal,row.crnAmt,'add'));
		$('#invLoanAvalOld').val(SCFUtils.Math(row.invLoanAval,loan_Perc,'add'));
		$('#crnAmt').numberbox('setValue', row.crnAmt);
		
	}else{
		/*$('#invLoanBal').numberbox('setValue', row.invLoanBal);
		$('#loanPerc').numberspinner('setValue',row.loanPerc);
		$('#rowTtlCrnBal').val(rowTtlCrnBalAtBegin(row));
		
		var invBalOld =row.invBalOld
		var invLoanAvalOld = row.invLoanAvalOld;
		$('#invBal').numberbox('setValue', invBalOld);
		$('#invBalOld').val(invBalOld);
		$('#invLoanAval').numberbox('setValue', invLoanAvalOld);
		$('#invLoanAvalOld').val(invLoanAvalOld);*/
		
		
		$('#invBal').numberbox('setValue', row.invBal);
		setLoanValue(row.invBal);
		$('#invLoanAval').numberbox('setValue', row.invLoanAval);
		$('#invLoanBal').numberbox('setValue', row.invLoanBal);
		$('#loanPerc').numberspinner('setValue',row.loanPerc);
		$('#rowTtlCrnBal').val(rowTtlCrnBalAtBegin(row));
		var loan_Perc = SCFUtils.Math(SCFUtils.Math(row.crnAmt, row.loanPerc, "mul"),100,"div");
		$('#invBalOld').val(SCFUtils.Math(row.invBal,row.crnAmt,'add'));
		$('#invLoanAvalOld').val(SCFUtils.Math(row.invLoanAval,loan_Perc,'add'));
		$('#crnAmt').numberbox('setValue', row.crnAmt);
		
	}
}

function validateSave() {
	var crnAmt = $('#crnAmt').numberbox('getValue');
	if(SCFUtils.isEmpty(crnAmt)) {
		crnAmt = 0.00;
	}
	return true;
}

function doSave(win) {
	if(!validateSave()) {
		return;
	}
	var data = SCFUtils.convertArray('CollateralForm');
	if(data){
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}
//冲销金额与应收账款余额
function changeAmt(){
	//冲销金额
	var crnAmt = $('#crnAmt').numberspinner('getValue');
	//应收账款余额
	var invBal = $('#invBalOld').val();
	//可融资金额
	var invLoanAval = $('#invLoanAvalOld').val();
	//融资比例
	var loanPerc = $('#loanPerc').numberspinner('getValue');
	//cnAmt = SCFUtils.Math(cnAmt, data.crnAmt, "add");
	var loan_Perc = SCFUtils.Math(SCFUtils.Math(crnAmt, loanPerc, "mul"),100,"div");
	$('#invBal').numberspinner('setValue', invBal-crnAmt);
	$('#invLoanAval').numberspinner('setValue', invLoanAval-loan_Perc);
//	if(SCFUtils.Math(crnAmt, invBal, 'sub') >0 ){
//		$('#crnAmt').numberspinner('setValue', invBal);
//	}
}


//根据最初的数据, 计算出贷项清单可调整金额
function rowTtlCrnBalAtBegin(row) {
	//（应收账款余额 - 调整金额） * 融资比例  >= 融资余额
	var maxTtlAmt = SCFUtils.Math(row.invBalHD, SCFUtils.Math(row.invLoanBal,  SCFUtils.Math(row.loanPerc, 100, 'div'), 'div'), 'sub');
	return maxTtlAmt;
}

/**
 * 对冲销金额计算和记录
 */
function setLoanValue(invBal){
	
	$("#crnAmt").numberbox({max:parseFloat(invBal)});

}
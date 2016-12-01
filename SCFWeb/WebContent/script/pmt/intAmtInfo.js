function ignoreToolBar() {

}

function pageLoad(win) {
	SCFUtils.setFormReadonly('#invcMChgForm', true);
	var row = win.getData("row");
	$('#ttlLoanAmt').numberbox('setValue', row.ttlLoanAmt);
	$('#ttlLoanBal').numberbox('setValue', row.ttlLoanBal);
	$('#loanRt').numberbox('setValue', row.loanRt);
	$('#finChgrt').numberbox('setValue', row.finChgrt);
	$('#pmtDt').datebox('setValue', row.pmtDt);
	$('#loanValDt').datebox('setValue', row.loanValDt);
	$('#pmtTimes').val(row.pmtTimes);
	if (row.pmtTimes == 1) {
		$('#lastPayDt').datebox('setValue', '');
	} else {
		$('#lastPayDt').datebox('setValue', row.lastPayDt);
	}
}

function doSave(win) {
	win.close();
}

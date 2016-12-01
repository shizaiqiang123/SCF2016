function ajaxBox() {
}

function pageOnInt(data) {
	ajaxBox();
	SCFUtils.setTextReadonly('sysRefNo', true);
}

function pageOnLoad(data) {
	var options = {};
	options.data = {
		refName : 'FundRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
}


function onNextBtnClick() {
	$("#compSts").val('0');
	return SCFUtils.convertArray('loanSubmit');
}

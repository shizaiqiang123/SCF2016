function ajaxBox() {
}

function pageOnLoad(data) {
	var options = {};
	options.data = {
		refName : 'GoodsTp',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	SCFUtils.loadForm('goodsTacaForm', data);
}

function onNextBtnClick() {
	return SCFUtils.convertArray('goodsTacaForm');
}


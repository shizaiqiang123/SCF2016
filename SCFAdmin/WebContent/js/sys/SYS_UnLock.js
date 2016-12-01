function pageOnInt() {
	ajaxBox();
}

function ajaxBox() {
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
}

function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('mainForm');
	return mainData;
}

function pageOnFPLoad(data){
	SCFUtils.loadForm('mainForm',data);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function pageOnPreLoad(data) {
	pageOnResultLoad(data);
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}
function pageOnPreLoad(data) {
	pageOnResultLoad(data);
}

function onSaveBtnClick() {
	var data =  SCFUtils.convertArray('mainForm');
	return data;
}
function onNextBtnClick() {
	return onSaveBtnClick();
}

function pageLoad(data){
	SCFUtils.loadForm('mainForm',data);
}
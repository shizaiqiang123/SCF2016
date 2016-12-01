function pageOnResultLoad(data){
	SCFUtils.loadForm('userPwdForm', data);
}
function onNextBtnClick(){
	return  SCFUtils.convertArray('userPwdForm');
}
function pageOnLoad(data) {
	SCFUtils.loadForm('userAddForm', data);
	var sysRefNo=$("#sysRefNo").val();
}
function pageOnLoad(data){
	SCFUtils.loadForm('bankMForm',data);
	var options = {};
	options.data = {
			refName : 'BankNo',
			refField :'sysRefNo'
	};
	
	SCFUtils.getRefNo(options);
}


function onNextBtnClick(){
	return SCFUtils.convertArray('bankMForm');
}
function onDelBtnClick(){
	return SCFUtils.convertArray('bankMForm');
}
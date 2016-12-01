function pageOnLoad(data){
	SCFUtils.loadForm('deptForm', data);
	if(!SCFUtils.isEmpty(SCFUtils.OPTSTATUS)&&SCFUtils.OPTSTATUS=='ADD'){
		var options={};
		options.data = {
				refName: 'DeptRef',
				refField:'sysRefNo'
					};
		SCFUtils.getRefNo(options);
	}
}

function onNextBtnClick(){	
	return SCFUtils.convertArray('deptForm');		
}

function pageOnInt(data){
	SCFUtils.setTextReadonly('sysRefNo', true);
}


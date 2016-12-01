function onNextBtnClick() {
	return SCFUtils.convertArray('mainForm');
}

//function onDelBtnClick(){
//	return SCFUtils.convertArray('mainForm');
//}

function pageOnInt(){
	ajaxBox();
}
 
function ajaxBox(){
	var refType = [{"id":'G',"text":"全局",selected:true},{"id":'U',"text":"局部"}];
	$("#refType").combobox('loadData',refType);
	var resetFrequency = [{"id":'N',"text":"不重置",selected:true},{"id":'Y',"text":"每年重置"},{"id":'S',"text":"每季度重置"},{"id":'M',"text":"每月重置"},{"id":'D',"text":"每天重置"}];
	$("#resetFrequency").combobox('loadData',resetFrequency);
}
function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data);
	
	if(SCFUtils.OPTSTATUS==='ADD'){
		var options = {};
		options.data = {
				refName : 'RefRef',
				refField :'sysRefNo'
		};
		
		SCFUtils.getRefNo(options);
	}else if(SCFUtils.OPTSTATUS==='EDIT'){
		SCFUtils.setTextReadonly('sysRefNo',true);
		SCFUtils.setTextReadonly('refName',true);		
	}}

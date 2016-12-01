function initTooltip(){
	var options = {
			display : 'block',
			content:'<span style="color:red">这里是要显示的内容</span>'
	};
	return options;
}

function pageOnInt(){
	ajaxBox();
}

function ajaxBox(){
	var type = [{"id":'F',"text":"File",selected:true},{"id":'E',"text":"ESB"},{"id":'W',"text":"Webservice"},{"id":'M',"text":"MO"},{"id":'S',"text":"Socket"}];
	$("#type").combobox('loadData',type);
	var modle = [{"id":'SYNC',"text":"SYNC",selected:true},{"id":'ASYNC',"text":"ASYNC"}];
	$("#modle").combobox('loadData',modle);
	var resend = [{"id":'N',"text":"No",selected:true},{"id":'Y',"text":"Yes"}];
	$("#resend").combobox('loadData',resend);
}
function pageOnFPLoad(data){
	SCFUtils.loadForm('mainForm',data);
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

function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data.obj);
	if('PARAADD'!=SCFUtils.OPTSTATUS){
		$('#name').val(data.obj.paraName);
		$('#id').val(data.obj.paraId);
	}
	ajaxSysRefNo();
}

function newId(){
	var options={};
	options.data = {
			refName: 'GapiRef',
			refField:'id'
				};
	options.force=true;
	SCFUtils.getRefNo(options);
	/*
	 * 获取新编号后，去判断#id的div有无值,无值不做处理
	 * 有去除这个id的validatebox-invalid方法，不去除*号了
	 * new on 20160829 by JinJH
	 */
	if($('#id').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#id').removeClass('validatebox-invalid');
	}
}
function ajaxSysRefNo(){
	if('PARAADD'==SCFUtils.OPTSTATUS){
	var newsysRefNo=SCFUtils.uuid(32);
	$('#sysRefNo').val(newsysRefNo);
	}
}
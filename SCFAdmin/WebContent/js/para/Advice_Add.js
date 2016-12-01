function pageOnInt() {
	ajaxBox();
	SCFUtils.setDateboxReadonly('senddt',true);
}

function pageOnFPLoad(data){
	SCFUtils.loadForm('mainForm',data);
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}
function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	
}

function newId(){
	var options={};
	options.data = {
			refName: 'AdviceRef',
			refField:'id'
				};
	options.force=true;
	SCFUtils.getRefNo(options);
	/*
	 * 获取新编号后，去判断#id的div有无值,无值不做处理
	 * 有去除这个id的validatebox-invalid方法，不去除*号了
	 * new on 20160728 by JinJH
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
function onSaveBtnClick() {
	var mainData =  SCFUtils.convertArray('mainForm');
	var editorData={};
	var editor = CKEDITOR.instances.content.getData();  
	editorData.content=editor;
	$.extend(mainData,editorData);
	return mainData;
}
function onNextBtnClick() {
	return onSaveBtnClick();
}

function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data.obj);
	ajaxSysRefNo();
}

function ajaxBox(){
//	var msgStatue = [{"id":'1',"text":"未生效"},{"id":'2',"text":"有效","selected":true},{"id":'3',"text":"失效"},{"id":'4',"text":"删除"},{"id":'5',"text":"草稿"}];
//	$("#msgStatue").combobox('loadData',msgStatue);
	var type = [{"id":'P',"text":"P"},{"id":'M',"text":"M"},{"id":'S',"text":"S"}];
	$("#type").combobox('loadData',type);
//	var remindtp = [{"id":'1',"text":"通知","selected":true},{"id":'2',"text":"提醒"},{"id":'3',"text":"紧急通知"},{"id":'4',"text":"重要通知"},{"id":'5',"text":"警告"}];
	var remindtp = [{"id":'1',"text":"通知","selected":true},{"id":'2',"text":"重要通知"},{"id":'3',"text":"警告"}];
	$("#remindtp").combobox('loadData',remindtp);
	var grouptp = [{"id":'1',"text":"点消息","selected":true},{"id":'2',"text":"组消息"}];
	$("#grouptp").combobox('loadData',grouptp);
	var sendtp = [{"id":'0',"text":"站内信","selected":true},{"id":'1',"text":"Mail"},{"id":'2',"text":"短信"},{"id":'3',"text":"APP推送"}];
	$("#sendtp").combobox('loadData',sendtp);
}

//获取编号后去掉*号和红色字
function removeAndAddRed(){
	/*
	 * 查询按钮加载数据成功，去判断cntrctNo的div有无值,无值不做处理
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160728 by JinJH
	 */
	if($('#id').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#id').parent('div').removeClass('requried-item-ifo');//去除*号
		$('#id').removeClass('validatebox-invalid');
	}
}
function pageOnInt(){
	ajaxBox();

}

function ajaxSysRefNo(){
	if('PARAADD'==SCFUtils.OPTSTATUS){
		var newsysRefNo=SCFUtils.uuid(32);
		$('#sysRefNo').val(newsysRefNo);
	}
}

function ajaxBox(){
	var type = [{"id":'RMI',"text":"RMI"},{"id":'WS',"text":"WS"},
	            {"id":'MQ',"text":"MQ"},{"id":'Class',"text":"Class"}
			   ];
	$('#type').combobox('loadData',type);
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

function newId(){
	var options={};
	options.data = {
			refName: 'ESBServiceRef',
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

function onSaveBtnClick() {
	var data =  SCFUtils.convertArray('mainForm');
	return data;
}
function onNextBtnClick() {
	return onSaveBtnClick();
}

function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data.obj);
	ajaxSysRefNo();
}

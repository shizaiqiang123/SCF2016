function pageOnFPLoad(data){
	SCFUtils.loadForm('mainForm',data);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function pageOnPreLoad(data) {
	pageOnResultLoad(data);
}

/*新建流水号*/
function newId(){
	var options={};
	options.data = {
			refName: 'TaskRef',
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
function openFile(){
	var trxPage = $("#trxData");	
	var url = $("#jspfile").val();	
	if(!url){
		SCFUtils.alert("请先输入文件路径。");
		return;
	}
	var options={};
	var page = $('<div id="page'+$.now()+'" title="交易页面" data-options="collapsible:true,fit:true" style="width:100%;height:90%;">');
	page.appendTo(trxPage);
	page.panel({			
		content:getContent(url)
	});		
}

function getContent(url){
	return '<iframe name="trxFrame" src="'+url+'?_dc='+$.now()+
	'" width="100%" height = "auto" frameborder="0" scrolling="none" ></iframe>';	
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	
}
function pageOnPreLoad(data) {
	pageOnResultLoad(data);
}

function onSaveBtnClick() {
	var data =  SCFUtils.convertArray('mainForm');
	//var trxData = self.trxFrame.onSaveBtnClick();
	//$.extend(data,{trxdatapara:SCFUtils.json2str(trxData)});
	
	return data;
}
function onNextBtnClick() {
	return onSaveBtnClick();
}

function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data.obj);
	if(data.obj.jspfile&&!SCFUtils.isEmpty(data.obj.jspfile)){
		openFile();
		if($.isFunction(self.trxFrame.pageLoad)){
			self.trxFrame.pageLoad(data.obj.trxdatapara.proterties);
		}
	}
	ajaxSysRefNo();
}
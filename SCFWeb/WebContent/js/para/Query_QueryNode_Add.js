function pageOnInt(){
	ajaxBox();
}

function ajaxBox(){
	var type = [{"id":'E',"text":"Entity 查询",selected:true},{"id":'S',"text":"SQL查询"},{"id":'C',"text":"Component 查询"}];
	$("#type").combobox('loadData',type);
	var cascadeevent = [{"id":'Y',"text":"Y",selected:true},{"id":'N',"text":"N"}];
	$("#cascadeevent").combobox('loadData',cascadeevent);
	var asc = [{"id":'Y',"text":"升序",selected:true},{"id":'N',"text":"降序"}];
	$("#asc").combobox('loadData',asc);
}

function doSave(win) {
	var data = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}

function ignoreToolBar(){
	
}

function pageLoad(win){
	var row = win.getData("row");
	
	queryNodeId=row.queryNodeId;
	//修改
	if('edit' == row.op){
		SCFUtils.loadForm('mainForm',row);
	}else if ('del' == row.op){
		SCFUtils.loadForm('mainForm',row);
	}else {
	
	}
	
	if(""==$('#id').val())
	{
		$('#id').val(queryNodeId);
		$('#id').attr("readonly","true");
	}
	else
	{
		$('#id').removeAttr("readonly");
	}
}




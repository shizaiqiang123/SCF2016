function ignoreToolBar(){
	
}

function pageLoad(win) {
	var row = win.getData("row");
	//修改
	if('edit' == row.op){
		judgeFieldName(row.fieldName);
		SCFUtils.loadForm('mainForm',row);		
		SCFUtils.setTextReadonly('fieldName', true);
	}
}

function doSave(win) {
	var data = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}

function judgeFieldName(data){
	var obj;
	if("workflowtype"==data){	
		obj = [{"id":'RMI',"text":"RMI"},{"id":'WebService',"text":"WebService",selected:true}];
	}else if("workflowflag"==data){
		obj = [{"id":'false',"text":"false"},{"id":'true',"text":"true",selected:true}];		
	}else if("singleSignOn"==data){
	 obj = [{"id":'false',"text":"false"},{"id":'true',"text":"true",selected:true}];
	}else{
		return;	
	}
	comboValueAjax(obj);
}

function comboValueAjax(obj){	
	var select = $('#fieldValue').attr('class','easyui-combobox');
	select.combobox({
		    data:obj,
			valueField : 'id',
			textField : 'text',
			panelHeight: 'auto'
		});
	//select.combobox('loadData',obj);
}


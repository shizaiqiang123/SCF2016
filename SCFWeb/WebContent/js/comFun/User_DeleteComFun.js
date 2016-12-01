
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
	//修改
	if('delete' == row.op){
		SCFUtils.loadForm('mainForm',row.data);
	}
	var data = SCFUtils.convertArray('searchForm');
	$.extend(data,{'queryId':win.getData("queryId")});
	SCFUtils.setTextReadonly("funId", true);
	SCFUtils.setTextReadonly("funNm", true);
	SCFUtils.setTextReadonly("userNm", true);
	SCFUtils.setTextReadonly("funPath", true);
}

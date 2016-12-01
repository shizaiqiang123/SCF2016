function doSave(win) {
	var data = SCFUtils.convertArray('mainForm');
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

function pageOnInt() {
	//ajaxBox();
}

function ignoreToolBar(){
	
}

// 全局变量保存传过来的行号
function pageLoad(win) {
	var row = win.getData("row");
	// 修改
	if ('edit' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else if ('del' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else {

	}
}

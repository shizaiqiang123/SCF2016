function ignoreToolBar(){
	
}

function pageLoad(win) {
	var row = win.getData("row");
	var options = {};
	options.data = {
			refName : 'UserRef',
			refField : 'sysRefNo'
		};
    SCFUtils.getRefNo(options);
	SCFUtils.loadForm('addPoMForm', row);
}
function doSave(win) {
	var data = SCFUtils.convertArray('addPoMForm');
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

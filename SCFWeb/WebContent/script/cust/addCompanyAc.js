function ignoreToolBar() {
}

function pageLoad(win) {
	var row = win.getData("row");
	$('#acOwnerid').val(row.acOwnerid);
	if ('edit' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else if ('del' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else {
		var options = {};
		options.force = true, options.data = {
			refName : 'AcNo',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);
	}
}

function doSave(win) {
	var data = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}

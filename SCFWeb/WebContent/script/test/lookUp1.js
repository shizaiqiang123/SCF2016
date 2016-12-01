function ignoreToolBar() {

}

function pageLoad(win) {
	var row = win.getData("row");
	if (row) {
		$('#id').val(row.id);
		$('#name').val(row.name);
	}
}

function doSave(win) {
	var data = SCFUtils.convertArray('testForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}

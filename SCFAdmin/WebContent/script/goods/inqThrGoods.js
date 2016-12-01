function ignoreToolBar() {

}
function pageLoad(win) {
	$('tr[id=Tr1]').hide();
	$('tr[id=Tr2]').hide();
	var row = win.getData("row");

	if (row.op === 'inq') {
		SCFUtils.loadForm('mainForm', row);
		SCFUtils.setFormReadonly('#mainForm', true);
	}

	ajaxBox();
	SCFUtils.repalcePH("");
}

function doSave(win) {
	var data = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}

function ajaxBox() {
	var isMortgage = [ {
		"id" : '01',
		"text" : "是",
		"selected" : true
	}, {
		"id" : '02',
		"text" : "否"
	} ];
	$('#isMortgage').combobox('loadData', isMortgage);
}
function doSave(win) {
	var row = SCFUtils.convertArray('mainForm');

	var target = win.getData('callback');
	target(row);
	win.close();
}
function ignoreToolBar() {

}
function pageOnInt() {
	// ajaxBox();
}
function ajaxBox() {
	var busiTp = [ {
		"id" : '0',
		"text" : "应收款融资",
		selected : true
	} ];
	$("#busiTp").combobox('loadData', busiTp);
}

function ignoreToolBar() {

}

function pageLoad(win) {
	var row = win.getData("row");

	if (row.op == "edit") {
		$('#levelDesc').val(row.levelDesc);
		$('#levelCd').val(row.levelCd);
		// $('#levelDesc').combobox('setValue',row.levelDesc);
		// $('#levelCd').combobox('setValue',row.levelCd);
		$('#mainForm').append(
				"<input type='hidden' id=\"sysRefNo\"  name=\"sysRefNo\"  value=\""
						+ row.sysRefNo + "\" >");
		return;
	} else if (row.op == "add") {
		return;
	}
	SCFUtils.alert("您的网络有问题，请重新选取！");
}

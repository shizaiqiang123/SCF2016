function doSave(win) {
	var row = SCFUtils.convertArray('mainForm');
	
	var target = win.getData('callback');
	target(row);
	win.close();
}
function ignoreToolBar(){
	
}
function pageOnInt() {
	ajaxBox();
}
function ajaxBox() {
	var busiTp = [ {
		"id" : '0',
		"text" : "应收款融资",
		selected : true
	} ];
	$("#busiTp").combobox('loadData', busiTp);

	var finaTp = [ {
		"id" : '0',
		"text" : "普通融资",
		selected : true
	} ];
	$("#finaTp").combobox('loadData', finaTp);

	var feeOrIntr = [ {
		"id" : '0',
		"text" : "基础利率",
		selected : true
	}, {
		"id" : '1',
		"text" : "基础费率"
	} ];
	$("#feeOrIntr").combobox('loadData', feeOrIntr);
}

function ignoreToolBar(){
	
}

function pageLoad(win) {
	var row = win.getData("row");

	if (row.op == "edit") {
		$('#busiTp').combobox('setValue',row.busiTp);
		$('#finaTp').combobox('setValue',row.finaTp);
		$('#feeOrIntr').combobox('setValue',row.feeOrIntr);
		$('#acctPeriodDesc').val(row.acctPeriodDesc);
		$('#acctPeriod').numberbox('setValue',row.acctPeriod);
		$('#baseRt').numberbox('setValue',row.baseRt);
		$('#mainForm').append("<input type='hidden' id=\"sysRefNo\"  name=\"sysRefNo\"  value=\""+row.sysRefNo+"\" >");
		$('#acctPeriodDesc').val(row.acctPeriodDesc).validatebox('validate');
		return;
	} else if (row.op == "add") {
		return;
	}
	SCFUtils.alert("您的网络有问题，请重新选取！");
}

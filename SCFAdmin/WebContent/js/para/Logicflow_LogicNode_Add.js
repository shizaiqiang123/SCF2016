function doSave(win) {
	var data = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}

function pageOnInt() {
	ajaxBox();
}
function ajaxBox() {
	var type = [ {
		"id" : 'C',
		"text" : "C"
	}, {
		"id" : 'S',
		"text" : "S"
	}, {
		"id" : 'E',
		"text" : "E",
	} ];
	$("#type").combobox('loadData', type);

	var cascadeevent = [ {
		"id" : 'Y',
		"text" : "Y",
	}, {
		"id" : 'N',
		"text" : "N"
	} ];
	$("#cascadeevent").combobox('loadData', cascadeevent);

	var asc = [ {
		"id" : 'Y',
		"text" : "Y",
	}, {
		"id" : 'N',
		"text" : "N"
	} ];
	$("#asc").combobox('loadData', asc);
}

function ignoreToolBar(){
	
}

// 全局变量保存传过来的行号
function pageLoad(win) {
	var row = win.getData("row");

	// 获取传过来的行号
	var logicNodeId = row.logicNodeId;
	$('#mainForm').append(
			"<input type='hidden'  id=\"logicNodeId\" name=\"logicNodeId\"  value="
					+ logicNodeId + " >");

	// 修改
	if ('edit' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else if ('del' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else {

	}

	// 添加logicNode的id
	if (SCFUtils.isEmpty($('#id').val())) {
		$('#id').val(logicNodeId);
		SCFUtils.setTextReadonly('id', true);
	} else {
		$('#id').removeAttr("readonly");
	}
}

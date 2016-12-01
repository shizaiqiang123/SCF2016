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
		"text" : "C",
		selected : true
	}, {
		"id" : 'S',
		"text" : "S"
	}, {
		"id" : 'E',
		"text" : "E"
	} ];
	$("#type").combobox('loadData', type);

	var cascadeevent = [ {
		"id" : 'Y',
		"text" : "Y",
		selected : true
	}, {
		"id" : 'N',
		"text" : "N"
	} ];
	$("#cascadeevent").combobox('loadData', cascadeevent);

	var asc = [ {
		"id" : 'Y',
		"text" : "Y",
		selected : true
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
	var transforNodeId = row.transforNodeId;
	$('#mainForm').append(
			"<input type='hidden'  id=\"transforNodeId\" name=\"transforNodeId\"  value="
					+ transforNodeId + " >");

	// 修改
	if ('edit' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else if ('del' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else {

	}

	// 添加logicNode的id
	if (SCFUtils.isEmpty($('#id').val())) {
		$('#id').val(transforNodeId);
		SCFUtils.setTextReadonly('id', true);
	} else {
		$('#id').removeAttr("readonly");
	}
}

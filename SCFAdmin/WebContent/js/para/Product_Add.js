function pageOnInt() {
	ajaxTable();
	ajaxBOx();
}
function pageOnLoad(data) {
	if (data != null) {
		SCFUtils.loadForm('mainForm', data.obj);
	} else {

	}
}
function onNextBtnClick() {
	return onSaveBtnClick();
}
function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}
function pageOnFPLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}
function addButton(){
	
}
function editButton(){
	
}
function delButton(){
	
}
function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			SCFUtils.alert('数据加载失败!');
		},
		columns : getColumns(),
	};
	$('#finSourceTable').datagrid(options);
}
function getColumns() { // 初始化表头
	return [ [ {
		field : 'ck',
		checkbox : true
	}, {
		field : 'sourceNumber',
		title : '来源方编号',
		width : 120
	}, {
		field : 'sourceNm',
		title : '来源方描述',
		width : 120
	} ] ];
}
function ajaxBOx() {
	var finTp = [ {
		"id" : '0',
		"text" : "单资金来源"
	}, {
		"id" : '1',
		"text" : "多资金来源"
	} ];
	$("#finTp").combobox('loadData', finTp);

	var finFrec = [ {
		"id" : 'M',
		"text" : "一月"
	}, {
		"id" : 'S',
		"text" : "一季"
	}, {
		"id" : 'HY',
		"text" : "半年"
	}, {
		"id" : 'Y',
		"text" : "一年"
	} ];
	$("#finFrec").combobox('loadData', finFrec);
}
/* 新建流水号 */
function newId() {
	var options = {};
	options.data = {
		refName : 'LogicflowRef',
		refField : 'id'
	};
	options.force = true;
	SCFUtils.getRefNo(options);
}
function ajaxSysRefNo() {
	if ('PARAADD' == SCFUtils.OPTSTATUS) {
		var newsysRefNo = SCFUtils.uuid(32);
		$('#sysRefNo').val(newsysRefNo);
	}
}

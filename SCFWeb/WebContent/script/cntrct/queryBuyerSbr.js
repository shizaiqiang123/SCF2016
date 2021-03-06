function ignoreToolBar() {

}
function pageLoad(win) {
	var cntrctNo = win.getData("cntrctNo");
	//修改页面进入时，该字段未定义 导致查询数据失败
	if (SCFUtils.isEmpty(cntrctNo)) {
		cntrctNo = "";
	}
	$('#cntrctNo').val(cntrctNo);
	var buyerNm = $('#buyerNm').val();
	var buyerId = $('#buyerId').val();
	var data = {
		'cntrctNo' : cntrctNo,
		'buyerId' : buyerId,
		'buyerNm' : buyerNm
	};
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable(data);
	SCFUtils.repalcePH("");
}

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

function onResetBtnClick() {
	$('#buyerId').val('');
	$('#buyerNm').val('');
}

//能否直接传target
function doSave(win) {
	var row = $('#dg').datagrid('getSelected');
	var target = win.getData('callback');
	target(row);
	win.close();
}

function ajaxTable(data) {
	//加载表格
	$('#dg').datagrid({
		url : SCFUtils.AJAXURL,
		queryParams : data,
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,//只选一行
		pagination : true,//是否分页
		fitColumns : true,//列自适应表格宽度
		striped : true,//当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			alert('数据加载失败!');
		},
		onLoadSuccess : function(data) {
		},
		columns : [ [ {
			field : 'id',
			checkbox : 'true',
			width : 20
		}, {
			field : 'buyerId',
			title : '间接客户编号',
			width : '25%'
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : '25%'
		}, {
			field : 'buyerLmtAmt',
			title : '关联间接客户额度',
			width : '25%'
		}, {
			field : 'buyerLmtBat',
			title : '关联间接客户额度余额',
			width : '25%'
		} ] ]
	});
}
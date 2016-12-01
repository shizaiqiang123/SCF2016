function ignoreToolBar() {

}
function pageLoad(win) {
	var cntrctNo = win.getData("cntrctNo");
	if (SCFUtils.isEmpty(cntrctNo)) {
		cntrctNo = "";
	}
	$('#cntrctNo').val(cntrctNo);

	var patnerId = win.getData("patnerId");
	var patnerNm = win.getData("patnerNm");
	if (SCFUtils.isEmpty(patnerId)) {
		patnerId = "";
	}
	if (SCFUtils.isEmpty(patnerNm)) {
		patnerNm = "";
	}
	$('#patnerNm').val(patnerNm);

	var data = {
		'cntrctNo' : cntrctNo,
		"patnerId" : patnerId,
		"patnerNm" : patnerNm
	};
	$.extend(data, {
		'queryId' : win.getData("queryId"),
		'cacheType' : 'non'
	});
	ajaxTable(data);
	SCFUtils.repalcePH("");
}

function SearchCimCust() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#patnerTable').datagrid('options').queryParams;
	$('#patnerTable').datagrid('load', $.extend(queryParams, data));
}

// 能否直接传target
function doSave(win) {
	var row = $('#patnerTable').datagrid('getSelected');
	var target = win.getData('callback');
	target(row);
	win.close();
}

function ajaxTable(data) {
	// 加载表格
	$('#patnerTable').datagrid({
		url : SCFUtils.AJAXURL,
		queryParams : data,
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
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
			field : 'patnerId',
			title : '监管方编号',
			width : '50%'
		}, {
			field : 'patnerNm',
			title : '监管方名称',
			width : '50%'
		} ] ]
	});
}

//重置
function onResetBtnClick() {
	$('#patnerId').val("");
	$('#patnerNm').val("");
}
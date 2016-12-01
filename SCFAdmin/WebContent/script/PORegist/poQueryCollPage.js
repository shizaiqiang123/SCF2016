function ignoreToolBar() {

}
function pageLoad(win) {
	var poNo = win.getData("poNo");
	var data = {
		'poNo' : poNo
	};
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable(data);
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
			field : 'sysRefNo',
			title : '交易流水号',
			width : 40
		}, {
			field : 'goodsCharacter',
			title : '型号',
			width : 40,
		}, {
			field : 'goodsNm',
			title : '品牌',
			width : 40,
		}, {
			field : 'poPrice',
			title : '单价',
			width : 40
		}, {
			field : 'poNum',
			title : '数量',
			width : 40,
		}, {
			field : 'ttlAmt',
			title : '总金额',
			width : 40
		} ] ]
	});
}
function doSave(win) {
	win.close();
}
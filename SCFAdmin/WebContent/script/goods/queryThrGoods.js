function ignoreToolBar() {

}
function pageLoad(win) {
	$('tr[id=Tr1]').hide();
	$('tr[id=Tr2]').hide();
	var row = win.getData("row");
	var data = SCFUtils.convertArray('searchForm');
	$.extend(data, {
		'queryId' : win.getData("queryId"),
		'cacheTpye' : 'none'
	});
	if (row.op === 'edit') {
		ajaxTable(data);
		loadClick();
		SCFUtils.loadForm('mainForm', row);
	}else if(row.op === 'add'){
		ajaxTable(data);
		loadClick();
	}

	ajaxBox();
	SCFUtils.repalcePH("");
}

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

// 重置
function onResetBtnClick() {
	$('#queryGoodsId').val("");
	$('#queryGoodsNm').val("");
}

function doSave(win) {
	// modify by shiaiqiang 用于修改如果没有勾选商品 就不让保存
	var sysRefNo = $('#sysRefNo').val();
	if (SCFUtils.isEmpty(sysRefNo)) {
		SCFUtils.alert("请选择一笔商品信息!");
		return;
	}

	var data = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}

function ajaxTable(data) {
	// 加载表格
	$('#dg').datagrid({
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
			field : 'sysRefNo',
			title : '流水号',
			width : 40
		}, {
			field : 'goodsId',
			title : '商品编号',
			width : 40,
		}, {
			field : 'goodsNm',
			title : '商品名称',
			width : 40
		}, {
			field : 'goodsCata',
			title : '商品类型',
			width : 40
		}, {
			field : 'unit',
			title : '计价单位',
			width : 40
		}, {
			field : 'ccy',
			title : '计价币别',
			width : 40
		}, {
			field : 'price',
			title : '最新单价',
			width : 40
		}, {
			field : 'isMortgage',
			title : '是否抵押登记',
			hidden : true
		}, {
			field : 'note',
			title : '备注',
			hidden : true
		} ] ]
	});
}

/*--------当选择一条货物信息时，将table中选择的信息加载到底下的输入区----------*/
function loadClick() {
	var options = $('#dg').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck() {
	var data = $('#dg').datagrid('getChecked');// 获取所有当前加载的数据行
	$('#sysRefNo').val(data[0].sysRefNo);
	$('#goodsId').val(data[0].goodsId);
	$('#goodsNm').val(data[0].goodsNm);
	$('#goodsCata').val(data[0].goodsCata);
	$('#unit').val(data[0].unit);
	$('#ccy').val(data[0].ccy);
	$('#price').val(data[0].price);
	$('#subCata').val(data[0].subCata);
	$('#goodsCharacter').val(data[0].goodsCharacter);
	$('#producer').val(data[0].producer);
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
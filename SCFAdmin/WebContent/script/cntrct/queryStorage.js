function ignoreToolBar(){
	
}

function pageLoad(win) {
	SCFUtils.setFormReadonly('mainForm', true);
	SCFUtils.setTextReadonly('note', false);
	var sysRefNo = win.getData("sysRefNo");
	if (SCFUtils.isEmpty(sysRefNo)) {
		sysRefNo = "";
	}
	$('#sysRefNo').val(sysRefNo);

	var patnerNm = win.getData("patnerNm");
	if (SCFUtils.isEmpty(patnerNm)) {
		patnerNm = "";
	}
	$('#patnerNm').val(patnerNm);

	var data = {
		'sysRefNo' : sysRefNo,
		"patnerNm" : patnerNm
	};
	$.extend(data, {
		'queryId' : win.getData("queryId"),
		'cacheType':'non'
	});
	ajaxTable(data);
	loadClick();
	
	SCFUtils.repalcePH("");
}

function SearchCimCust() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#patnerTable').datagrid('options').queryParams;
	$('#patnerTable').datagrid('load', $.extend(queryParams, data));
}

function onResetBtnClick() {
	$('#sysRefNo').val("");
	$('#patnerNm').val("");
}

// 能否直接传target
function doSave(win) {
	var sysRefNo = $('#sysRefId').val();
	if (SCFUtils.isEmpty(sysRefNo)) {
		SCFUtils.alert("请选择一仓储信息!");
		return;
	}
	var data = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(data);
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
			field : 'sysRefNo',
			title : '仓储编号',
			width : 40
		}, {
			field : 'patnerNm',
			title : '仓储名称',
			width : 40
		},  {
			field : 'patnerAdr',
			title : '仓库地址',
			width : 40
		}, {
			field : 'patnerCity',
			title : '城市',
			width : 40
		}, {
			field : 'patnerTel',
			title : '电话',
			width : 40
		}, {
			field : 'patnerFax',
			title : '传真',
			width : 40
		}, {
			field : 'patnerEmail',
			title : '电子邮箱',
			width : 40
		} ] ]
	});
}

/*--------当选择一条货物信息时，将table中选择的信息加载到底下的输入区----------*/
function loadClick() {
	var options = $('#patnerTable').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck() {
	var data = $('#patnerTable').datagrid('getChecked');// 获取所有当前加载的数据行
	$('#sysRefId').val(data[0].sysRefNo);
	$('#patnerNm').val(data[0].patnerNm);
	$('#patnerCity').val(data[0].patnerCity);
	$('#patnerAdr').val(data[0].patnerAdr);
	$('#patnerTel').val(data[0].patnerTel);
	$('#patnerFax').val(data[0].patnerFax);
	$('#patnerEmail').val(data[0].patnerEmail);
}
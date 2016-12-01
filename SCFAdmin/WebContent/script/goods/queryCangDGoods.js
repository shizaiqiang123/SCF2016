function ignoreToolBar() {

}
function pageLoad(win) {
	//		var data = {'queryId':win.getData("queryId"),'cacheTpye':'non'};
	var data = SCFUtils.convertArray('searchForm');
	SCFUtils.setFormReadonly('#mainForm',true);
	SCFUtils.setTextReadonly('note',false);
	$.extend(data, {
		'queryId' : win.getData("queryId"),
		'cacheTpye' : 'none'
	});
	ajaxTable(data);
	ajaxBox();
	loadClick();
	
	SCFUtils.repalcePH("");
}

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

//重置
function onResetBtnClick() {
	$('#queryGoodsId').val("");
	$('#queryGoodsNm').val("");
}

//能否直接传target
/*	function doSave(win) {
 var row = $('#dg').datagrid('getSelected');
 var target = win.getData('callback');
 target(row);
 win.close();
 }*/

function doSave(win) {
	//modify by shiaiqiang 用于修改如果没有勾选商品 就不让保存
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
			title : '流水号',
			width : 40
		},{
			field : 'goodsId',
			title : '商品编号',
			hidden : true,
			width : 40
		},{
			field : 'goodsCata',
			title : '商品大类',
			hidden : true,
			width : 40
		}, {
			field : 'subCata',
			title : '商品子类',
			hidden : true,
			width : 40
		}, {
			field : 'goodsNm',
			title : '商品名称',
			width : 40
		}, {
			field : 'unit',
			title : '计价单位'
		},{
			field : 'ccy',
			title : '计价币别'
		},{
			field : 'price',
			title : '价格',
			formatter : ccyFormater
		},{
			field : 'producer',
			title : '生产厂家',
			hidden : true
		}] ]
	});
}

/*--------当选择一条货物信息时，将table中选择的信息加载到底下的输入区----------*/
function loadClick() {
	var options = $('#dg').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck() {
	// debugger;
	var data = $('#dg').datagrid('getChecked');// 获取所有当前加载的数据行
	$('#sysRefNo').val(data[0].sysRefNo);
	$('#goodsId').val(data[0].sysRefNo);
	$('#goodsNm').val(data[0].goodsNm);
	$('#goodsCata').combobox('setValue',data[0].goodsCata);
	subCataQueryAjax(data[0].goodsCata);
	$('#subCata').combobox('setValue',data[0].subCata);
	$('#unit').val(data[0].unit);
	$('#ccy').combobox('setValue',data[0].ccy);
	$('#producer').val(data[0].producer);
	$('#price').numberbox('setValue',data[0].price);
}

function ajaxBox() {
	var optt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000006',
				cacheType : 'non'
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#ccy').combobox('loadData', data.rows);
					// 给币种设置默认值
					$('#ccy').combobox('setValue', 'CNY');
					// $('#collatCcy').combobox('loadData', data.rows);
				}
			}
		};
	SCFUtils.ajax(optt);
	
	goodsCataQueryAjax();
}

//商品大类查询
function goodsCataQueryAjax() {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000060',
		},
		callBackFun : function(data) {
			if (data.success&&!SCFUtils.isEmpty(data.rows)) {
				$('#goodsCata').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
}

// 商品子类查询
function subCataQueryAjax(goodsCata) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000058',
			goodsCata : goodsCata
		},
		callBackFun : function(data) {
			if (data.success&&!SCFUtils.isEmpty(data.rows)) {
				$('#subCata').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
}
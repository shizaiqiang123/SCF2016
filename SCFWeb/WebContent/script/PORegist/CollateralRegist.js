function ignoreToolBar() {

}

function pageLoad(win) {
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setNumberspinnerReadonly('ttlAmt', true);
	var row = win.getData("row");
	// options.force = true;
	if (row.op === 'add') {
		var options = {};
		options.data = {
			refName : 'CollatRef',
			refField : 'sysRefNo',
			cacheType : 'non'
		};
		SCFUtils.getRefNo(options);
		SCFUtils.setTextReadonly('goodsCata', true);
		SCFUtils.setTextReadonly('subCata', true);
		SCFUtils.setTextReadonly('goodsNm', true);
		SCFUtils.setTextReadonly('goodsId', true);
		SCFUtils.setTextReadonly('goodsCharacter', true);
		SCFUtils.setTextReadonly('producer', true);
		SCFUtils.setTextReadonly('unit', true);
		SCFUtils.setTextReadonly('ccy', true);
		SCFUtils.setTextReadonly('invNo', true);
		SCFUtils.setTextReadonly('invNo', true);
		SCFUtils.setNumberboxReadonly('poPrice', true);
		SCFUtils.setNumberspinnerReadonly('ttlAmt', true);
		$('#cntrctNo').val(row.cntrctNo);
		$('#refNo').val(row.refNo);
	} else if (row.op === 'edit') {
		$('#sysRefNo').val(row.sysRefNo);
		$('#refNo').val(row.refNo);
		$('#cntrctNo').val(row.cntrctNo);

		// SCFUtils.setComboReadonly('collatCcy', true);
		// $('#collatCcy').combobox('setValue',row.collatCcy);
		$('#poPrice').numberbox('setValue', row.poPrice);
		$('#poNum').numberbox('setValue', row.poNum);
		$('#ttlAmt').numberbox('setValue', row.ttlAmt);
		$('#goodsNm').val(row.goodsNm);
		$('#goodsId').val(row.goodsId);
		$('#goodsCata').val(row.goodsCata);
		$('#subCata').val(row.subCata);
		$('#goodsCharacter').val(row.goodsCharacter);
		$('#unit').val(row.unit);
		$('#ccy').val(row.ccy);
		$('#producer').val(row.producer);
		SCFUtils.setTextReadonly('goodsCata', true);
		SCFUtils.setTextReadonly('subCata', true);
		SCFUtils.setTextReadonly('goodsNm', true);
		SCFUtils.setTextReadonly('goodsId', true);
		SCFUtils.setTextReadonly('goodsCharacter', true);
		SCFUtils.setTextReadonly('producer', true);
		SCFUtils.setTextReadonly('unit', true);
		SCFUtils.setTextReadonly('ccy', true);
		SCFUtils.setTextReadonly('invNo', true);
		SCFUtils.setTextReadonly('invNo', true);
		SCFUtils.setNumberboxReadonly('poPrice', true);
		SCFUtils.setNumberspinnerReadonly('ttlAmt', true);
		SCFUtils.eachElement('CollateralForm');// 循环整个表单里的element来去除红色字体（不去除*号）

	}
	var data = {};
	$.extend(data, {
		'queryId' : win.getData("queryId"),
		'cacheType' : 'non'
	});
	ajaxTable(data);
	loadClick();
	
	SCFUtils.repalcePH("");
}

function searchGoodsCata() {
	var data = SCFUtils.convertArray('searchForm');
	// 不需要缓存数据
	$.extend(data, {
		cacheType : 'non'
	});
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

function onResetBtnClick() {
	$('#copyOfGoodsId').val("");
	$('#copyOfGoodsNm').val("");
}

function loadClick() {
	var options = $('#dg').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck() {
	// debugger;
	var data = $('#dg').datagrid('getChecked');// 获取所有当前加载的数据行
	$('#poPrice').numberbox('setValue', data[0].price);
	$('#goodsNm').val(data[0].goodsNm);
	$('#goodsId').val(data[0].goodsId);
	$('#goodsCata').val(data[0].goodsCata);
	$('#subCata').val(data[0].subCata);
	$('#goodsCharacter').val(data[0].goodsCharacter);
	$('#unit').val(data[0].unit);
	$('#ccy').val(data[0].ccy);
	$('#producer').val(data[0].producer);
	// 将焦点获取到数量栏
	$('#poNum').numberspinner().next('span').find('input').focus();
	SCFUtils.eachElement('CollateralForm');// 循环整个表单里的element来去除红色字体（不去除*号）
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
		fitColumns : false,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			alert('数据加载失败!');
		},
		onLoadSuccess : function(data) {
		},
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'goodsId',
			title : '商品ID',
			width : '35%'
		}, {
			field : 'goodsNm',
			title : '品牌',
			width : '35%'
		}, {
			field : 'price',
			title : '单价',
			width : '26%',
			formatter : ccyFormater
		}, {
			field : 'goodsCata',
			title : '商品大类',
			hidden : true
		}, {
			field : 'subCata',
			title : '商品子类',
			hidden : true
		} ] ]
	});
}

function doSave(win) {
	var data = SCFUtils.convertArray('CollateralForm');
	var poNumUseable = $('#poNum').numberspinner('getValue')
	$.extend(data, {
		poNumUseable : poNumUseable,
		poNumUsed : 0
	});
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}
function ccyQueryAjax() {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006',
			cacheType : 'comm'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#collatCcy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);

}

// 计算总金额
function collatVal() {
	var price = $('#poPrice').numberspinner('getValue');
	var collatQty = $('#poNum').numberspinner('getValue');
	if (!SCFUtils.isEmpty(price) && !SCFUtils.isEmpty(collatQty)) {
		$('#ttlAmt').numberspinner('setValue', price * collatQty);
	}
}

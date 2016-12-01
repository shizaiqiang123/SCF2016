function ajaxBox() {
	var data = [ {
		"id" : '0',
		"text" : "国内保理",
		"selected" : true
	}, {
		"id" : '1',
		"text" : "预付款融资"
	}, {
		"id" : '2',
		"text" : "动产质押融资"
	} ];
	$("#busiTp").combobox('loadData', data);

	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006',
			cacheType : 'comm'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#lmtCcy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

// // 质物入库批次表查询
// function collatRegQueryAjax(regNo) {
// var opt = {
// url : SCFUtils.AJAXURL,
// data : {
// queryId : 'Q_P_000038',
// regNo : regNo
// },
// callBackFun : function(data) {
// if (data.success && !SCFUtils.isEmpty(data.rows)) {
// SCFUtils.loadForm('collatOutForm', data.rows[0]);
// }
// }
// };
// SCFUtils.ajax(opt);
//
// }
// 协议表查询
function cntrctQueryAjax(cntrctNo) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000008',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				// $('#lmtCcy').combobox('setValue', data.rows[0].lmtCcy);
				// $('#lmtBal').numberspinner('setValue', data.rows[0].lmtBal);
				SCFUtils.loadForm('collatOutForm', data.rows[0]);
			}
		}
	};
	SCFUtils.ajax(opt);

}

function pageOnInt(data) {
	SCFUtils.setFormReadonly('#collatOutForm', true);
	ajaxBox();
	ajaxTable();

}

function defineDataGridEvent() {
	var options = $('#collatOutTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
}

function pageOnLoad(data) {
	cntrctQueryAjax(data.obj.sysRefNo);
	$('#trxDt').datebox('setValue', getDate(new Date()));
	defineDataGridEvent();
	loadTable();
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('collatOutForm', data);
	SCFUtils.loadGridData('collatOutTable', SCFUtils
			.parseGridData(data.obj.doname), true);// 加载数据并保护表格。
	$('#querybutton').linkbutton('disable');
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('collatOutForm', data);
	SCFUtils.loadGridData('collatOutTable', SCFUtils
			.parseGridData(data.obj.doname), false);
	defineDataGridEvent();
	loadTable();
}

function pageOnReleasePageLoad(data) {
	cntrctQueryAjax(data.obj.sysRefNo);
    $('#ttlRegAmt').numberspinner('setValue',data.obj.ttlRegAmt);
	$('#trxDt').datebox('setValue', getDate(new Date()));
	reLoadTable();
	$('#collatOutTable').datagrid('hideColumn', 'ck');
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
	$('#collatOutTable').datagrid('hideColumn', 'ck');
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
	$('#collatOutTable').datagrid('hideColumn', 'ck');
}

function check() {
	var flag = false;
	var ttlRegAmt = $('#ttlRegAmt').numberspinner('getValue');
	var regLowestVal = $('#regLowestVal').numberspinner('getValue');
	if (SCFUtils.Math(ttlRegAmt, regLowestVal, 'sub') < 0) {
		SCFUtils.alert('出库后的库存价值已不能覆盖融资敞口!');
		flag = true;
	}
	var data = SCFUtils.getSelectedGridData('collatOutTable', false);
	if ('RE' != SCFUtils.FUNCTYPE) {
		if (data._total_rows == 0) {
			SCFUtils.alert('当前没有商品出库！');
			flag = true;
		}
	}
	return flag;

}
function onNextBtnClick() {
	if (check()) {
		return;
	}
	var mainData = SCFUtils.convertArray('collatOutForm');
	var grid = {};
	var griddata = SCFUtils.getSelectedGridData('collatOutTable', false);
	grid.doname = SCFUtils.json2str(griddata);
	$.extend(mainData, grid);
	return mainData;
}

function loadTable() {
	var cntrctNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000067',
			cntrctNo : cntrctNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('collatOutTable', data.rows, false, true);

			} else {
				SCFUtils.alert("没有找到符合要求的质押品!！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function reLoadTable() {
	var cntrctNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000028',
			cntrctNo : cntrctNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('collatOutTable', data.rows, false, true);

			} else {
				SCFUtils.alert("没有找到符合要求的质押品!！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function forEach(data) {
	$.each(data, function(i, n) {
		var numCollatQty = SCFUtils.Math(n.collatQty || 0,
				n.numCollatOutQty || 0, 'add');
		var numQty = SCFUtils.Math(n.qty || 0, n.numOutQty || 0, 'add');
		var numWeight = SCFUtils
				.Math(n.weight || 0, n.numOutWeight || 0, 'add');
		$('#collatOutTable').datagrid('updateRow', {
			index : i,
			row : {
				numCollatQty : numCollatQty,
				numCollatOutQty : numCollatQty,
				numQty : numQty,
				numOutQty : numQty,
				numWeight : numWeight,
				numOutWeight : numWeight,
				numCollatVal : n.collatVal
			}
		});
	});
}

function onCheck(rowIndex, rowData) {
	var collatQty = SCFUtils.Math(rowData.numCollatQty,
			rowData.numCollatOutQty, 'sub');
	$('#collatOutTable').datagrid(
			'updateRow',
			{
				index : rowIndex,
				row : {
					collatOutQty : rowData.numCollatOutQty,
					outQty : rowData.numOutQty,
					outWeight : rowData.numOutWeight,
					collatQty : collatQty,
					qty : SCFUtils.Math(rowData.numQty, rowData.numOutQty,
							'sub'),
					weight : SCFUtils.Math(rowData.numWeight,
							rowData.numOutWeight, 'sub'),
					collatVal : SCFUtils.Math(rowData.collatRdPrice, collatQty,
							'mul')
				}
			});
	var ttlRegAmt = $('#ttlRegAmt').numberspinner('getValue');
	ttlRegAmt = SCFUtils.Math(ttlRegAmt, rowData.numCollatVal, 'sub');
	$('#ttlRegAmt').numberspinner('setValue', ttlRegAmt);
}

function onUncheck(rowIndex, rowData) {
	var collatVal = rowData.numCollatVal;
	$('#collatOutTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			qty : rowData.numQty,
			weight : rowData.numWeight,
			collatQty : rowData.numCollatQty,
			collatVal : collatVal,
			outQty : 0,
			collatOutQty : 0,
			outWeight : 0
		}
	});
	var ttlRegAmt = $('#ttlRegAmt').numberspinner('getValue');
	ttlRegAmt = SCFUtils.Math(ttlRegAmt, collatVal, 'add');
	$('#ttlRegAmt').numberspinner('setValue', ttlRegAmt);
}

function onCheckAll(rows) {
	onUncheckAll(rows);
	var ttlRegAmt = 0;
	$.each(rows,
			function(i, n) {
				var collatQty = SCFUtils.Math(n.numCollatQty,
						n.numCollatOutQty, 'sub');
				$('#collatOutTable').datagrid(
						'updateRow',
						{
							index : i,
							row : {
								collatOutQty : n.numCollatOutQty,
								outQty : n.numOutQty,
								outWeight : n.numOutWeight,
								collatQty : collatQty,
								qty : SCFUtils.Math(n.numQty, n.numOutQty,
										'sub'),
								weight : SCFUtils.Math(n.numWeight,
										n.numOutWeight, 'sub'),
								collatVal : SCFUtils.Math(n.collatRdPrice,
										collatQty, 'mul')
							}
						});
				ttlRegAmt = SCFUtils.Math(ttlRegAmt, n.collatVal, 'add');
			});
	$('#ttlRegAmt').numberspinner('setValue', ttlRegAmt);
}

function onUncheckAll(rows) {
	var ttlRegAmt = $('#ttlRegAmt').numberspinner('getValue');
	$.each(rows, function(i, n) {
		$('#collatOutTable').datagrid('updateRow', {
			index : i,
			row : {
				qty : n.numQty,
				weight : n.numWeight,
				collatQty : n.numCollatQty,
				collatVal : n.numCollatVal,
				outQty : 0,
				collatOutQty : 0,
				outWeight : 0
			}
		});
		ttlRegAmt = SCFUtils.Math(ttlRegAmt, n.numCollatVal, 'add');
	});
	$('#ttlRegAmt').numberspinner('setValue', ttlRegAmt);
}

function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'sysRefNo',// 分页勾选
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			hidden : true
		}, {
			field : 'regNo',
			title : '批次号',
			width : 90
		}, {
			field : 'collatNm',
			title : '质物品种',
			hidden : true
		}, {
			field : 'arrivalDt',
			title : '质物入库日期',
			width : 90,
			formatter : function(value, row, index) {
				return SCFUtils.dateFormat(value, "yyyy-MM-dd");
			}
		}, {
			field : 'collatUnit',
			title : '质物计价单位',
			hidden : true
		}, {
			field : 'collatQty',
			title : '质物计价量',
			width : 90,
			formatter : numberFormater
		}, {
			field : 'numCollatQty',
			title : '质物计价量(临时栏位)',
			hidden : true
		}, {
			field : 'collatOutQty',
			title : '质物出库计价量',
			width : 90,
			formatter : numberFormater
		}, {
			field : 'numCollatOutQty',
			title : '质物出库计价量(临时栏位)',
			hidden : true
		}, {
			field : 'outQty',
			title : '质物出库数量',
			width : 90,
			formatter : numberFormater
		}, {
			field : 'numOutQty',
			title : '质物出库数量(临时栏位)',
			hidden : true
		}, {
			field : 'outWeight',
			title : '质物出库重量',
			width : 90,
			formatter : numberFormater
		}, {
			field : 'numOutWeight',
			title : '质物出库重量(临时栏位)',
			hidden : true
		}, {
			field : 'collatVal',
			title : '质物当日价值',
			width : 90,
			formatter : ccyFormater
		}, {
			field : 'numCollatVal',
			title : '质物当日价值(临时栏位)',
			hidden : true
		}, {
			field : 'collatRdPrice',
			title : '质物认定价格(当日价格)',
			width : 90,
			formatter : ccyFormater
		}, {
			field : 'collatSpec',
			title : '质物规格',
			hidden : true
		}, {
			field : 'collatFact',
			title : '生产厂家',
			hidden : true
		}, {
			field : 'qty',
			title : '质物数量',
			width : 90,
			formatter : numberFormater
		}, {
			field : 'numQty',
			title : '质物数量(临时栏位)',
			hidden : true
		}, {
			field : 'weight',
			title : '质物重量',
			width : 90,
			formatter : numberFormater
		}, {
			field : 'numWeight',
			title : '质物重量(临时栏位)',
			hidden : true
		} ] ],
	};
	if ('RE' != SCFUtils.FUNCTYPE) {
		options.onLoadSuccess = function(data) {
			return forEach(data.rows);
		};
	}
	$('#collatOutTable').datagrid(options);
}

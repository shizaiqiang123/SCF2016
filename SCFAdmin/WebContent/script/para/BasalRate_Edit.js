function pageOnInt() {
	ajaxTable();
	ajaxBox();
	// onSearchBtnClick();
	findOnIntRow("", "", "", "");
}
function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}
// 去掉下面所有按钮
function initToolBar() {
	var showButton = [ 'cancel' ];

	return showButton;
}
// //去掉下面所有按钮
// function ignoreToolBar(){
// var showButton = ['cancel'];
// showButton.push('prev');
//
// return showButton;
// }

function ajaxBox() {
	var busiTp = [ {
		"id" : '0',
		"text" : "应收款融资"
	}, {
		"id" : '',
		"text" : "全部",
		selected : true
	} ];
	$("#busiTp").combobox('loadData', busiTp).combobox({
		editable : false
	});

	var finaTp = [ {
		"id" : '0',
		"text" : "普通融资"
	}, {
		"id" : '',
		"text" : "全部",
		selected : true
	} ];
	$("#finaTp").combobox('loadData', finaTp).combobox({
		editable : false
	});

	var feeOrIntr = [ {
		"id" : '0',
		"text" : "基础利率"
	}, {
		"id" : '1',
		"text" : "基础费率"
	}, {
		"id" : '',
		"text" : "全部",
		selected : true
	} ];
	$("#feeOrIntr").combobox('loadData', feeOrIntr).combobox({
		editable : false
	});
}

// 获取基础利率表的信息
function findRow(busiTp, finaTp, acctPeriod, feeOrIntr) {
	var sysBusiUnit = findBU();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000220',
			sysBusiUnit : sysBusiUnit,
			busiTp : busiTp,
			finaTp : finaTp,
			acctPeriod : acctPeriod,
			feeOrIntr : feeOrIntr
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils
							.loadGridData('searchTable', data.rows, false, true);
					SCFUtils.alert("没有相应的基础利率/费率!");
				} else {
					SCFUtils
							.loadGridData('searchTable', data.rows, false, true);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
function findOnIntRow(busiTp, finaTp, acctPeriod, feeOrIntr) {
	var sysBusiUnit = findBU();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000220',
			sysBusiUnit : sysBusiUnit,
			busiTp : busiTp,
			finaTp : finaTp,
			acctPeriod : acctPeriod,
			feeOrIntr : feeOrIntr
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils
							.loadGridData('searchTable', data.rows, false, true);
				} else {
					SCFUtils
							.loadGridData('searchTable', data.rows, false, true);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
function ajaxTable() {
	// 加载表格
	var options = {
		// url : SCFUtils.QUERYURL,
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
//		onLoadSuccess : onLoadSuccess
	};
	$('#searchTable').datagrid(options);
}

function getColumns() { // 初始化表头
	return [ [ {
		field : 'ck',
		checkbox : true
	}, {
		field : 'busiTp',
		title : '业务类型',
		width : 120,
		formatter : busiTpFormter
	}, {
		field : 'finaTp',
		title : '融资模式',
		width : 120,
		formatter : finaTpFormter
	},
	// {
	// field : 'acctPeriodDesc',
	// title : '融资期限描述',
	// width : 120
	// },
	{
		field : 'acctPeriod',
		title : '融资期限(单位：天)',
		width : 150
	}, {
		field : 'baseRt',
		title : '率利/费率(单位：%)',
		width : 120
	}, {
		field : 'feeOrIntr',
		title : '利率类型',
		width : 120,
		formatter : feeOrIntrFormter
	}, {
		field : 'sysRefNo',
		title : '流水号',
		hidden : true
	}
//	,{
//		field : 'edit',
//		title : '操作',
//		width : 150,
//		formatter : Buttons
//	} 
	] ];
}
function busiTpFormter(value, row, index) {
	if (value === "0") {
		return "应收款融资";
	}
}
function finaTpFormter(value, row, index) {
	if (value === "0") {
		return "普通融资";
	}
}
function feeOrIntrFormter(value, row, index) {
	if (value === "0") {
		return "基础利率";
	}
	if (value === "1") {
		return "基础费率";
	}
}

// 设置超链接的文字显示按钮
function onLoadSuccess(data) {
	$('.edit').linkbutton({
		text : "修改"
	});
	$('.del').linkbutton({
		text : "删除"
	});
}

function Buttons(value, row, index) { // 设置表格记录加载的按钮
	var edit = '<a class="edit" icon="icon-filter" style="width:60px"  \
			onclick="editButton('
			+ index + ');" ></a>';

	// del功能待后期添加
	var del = '<a class="del" icon="icon-filter" style="width:60px"  \
		onclick="delButton('
			+ index + ');" ></a>';
	return edit + del;
}

function addButton() {
	// 获取所有
	var tableRows = SCFUtils.getGridData('searchTable', false);
	var row = {};
	row.op = 'add';
	var options = {
		title : "新增基础利率和费率信息",
		reqid : 'I_P_000071',
		height : 500,
		data : {
			'row' : row,
			cacheType : 'non',
			tableRows : tableRows
		},
		onSuccess : addBasalRateSuccess
	};
	SCFUtils.getData(options);
}

function addBasalRateSuccess(data) {
	// var tableRows= SCFUtils.getGridData('searchTable', false);
	var flag = isSame(data);
	if (flag) {
		addBasaRate(data);
	}
	onSearchBtnClick();
}

function editButton() {
	// 按钮在表格顶端
	var selectRow = $('#searchTable').datagrid('getSelected');
	var rowIndex = $('#searchTable').datagrid('getRowIndex', selectRow);
	if (selectRow) {
		var rows = $('#searchTable').datagrid('getRows');// 获取所有当前加载的数据行
		var row = rows[rowIndex];
		// 按钮在行上
		// // 获取所有
		// var tableRows = SCFUtils.getGridData('searchTable', false);
		// // 获取本页
		// var rowss = $('#searchTable').datagrid('getRows');
		// var rows = rowss[index];
		row.op = 'edit';
		var options = {
			title : "修改基础利率和费率信息",
			reqid : 'I_P_000071',
			height : 500,
			data : {
				'row' : row,
				cacheType : 'non',
//				tableRows : tableRows
			},
			onSuccess : editBasalRateSuccess
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
function editBasalRateSuccess(data) {
	var flag = isSame(data);
	if (flag) {
		editBasaRate(data);
	}
	onSearchBtnClick();
}
function isSame(rows) {
	var tableRows = SCFUtils.getGridData('searchTable', false);
	var flag = true;
	$.each(tableRows, function(i, row) {
		if (row.sysRefNo == rows.sysRefNo) {
			return;
		} else {
			if (row.busiTp == rows.busiTp && row.finaTp == rows.finaTp
					&& row.acctPeriod == rows.acctPeriod) {
				if (row.feeOrIntr == rows.feeOrIntr) {
					SCFUtils.alert("您已添加过相同类型的基础利率或费率！");
					flag = false;
					return;
				}
			}
		}

	});
	return flag;
}
function delButton() {
	var row = $('#searchTable').datagrid('getSelected');
	var rowIndex = $('#searchTable').datagrid('getRowIndex', row);
	if (row) {
		// 获取本页
		var rowss = $('#searchTable').datagrid('getRows');
		var rows = rowss[rowIndex];
		SCFUtils.confirm('您确定要删删除这条数据吗？', function() {
			delBasaRate(rows);
			findOnIntRow("", "", "", "");
//			onSearchBtnClick();
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
function addBasaRate(row) {
	var sysBusiUnit = findBU();
	var data = {};
	data = {
		sysBusiUnit : sysBusiUnit,
		busiTp : row.busiTp,
		finaTp : row.finaTp,
		acctPeriodDesc : row.acctPeriodDesc,
		acctPeriod : row.acctPeriod,
		baseRt : row.baseRt,
		feeOrIntr : row.feeOrIntr,
		sysRefNo : SCFUtils.uuid(16)
	};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_000074',
			_opTp : "ADD",
			cacheType : 'non',
			reqPageType : 'finish'
		// ,funcType : 'MM'
		}, data)
	// onSuccess : function(data) {
	// if (data.success) {
	// return;
	// }
	// }
	};
	SCFUtils.ajax(options);
}

function editBasaRate(row) {
	var data = {};
	data = {
		sysBusiUnit : row.sysBusiUnit,
		busiTp : row.busiTp,
		finaTp : row.finaTp,
		acctPeriodDesc : row.acctPeriodDesc,
		acctPeriod : row.acctPeriod,
		baseRt : row.baseRt,
		feeOrIntr : row.feeOrIntr,
		sysRefNo : row.sysRefNo
	};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_000074',
			_opTp : "edit",
			cacheType : 'non',
			reqPageType : 'finish',
		// funcType : 'MM'
		}, data),
	// onSuccess : function(data) {
	// if (data.success) {
	// return;
	// }
	// }
	};
	SCFUtils.ajax(options);
}

function delBasaRate(row) {
	var data = {};
	data = {
		sysRefNo : row.sysRefNo
	};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_000074',
			_opTp : "DELETE",
			cacheType : 'non',
			reqPageType : 'finish',
			funcType : 'MM'
		}, data),
	// onSuccess : function(data) {
	// if (data.success) {
	//
	// }
	// }
	};
	SCFUtils.ajax(options);
}

// 刷新表格
function newTable() {
	$('#searchTable').datagrid('reload');
}

// 搜索栏表单重置
function onResetBtnClick() {
	$('#screenForm')[0].reset();
//	onSearchBtnClick();
	// findRow("", "", "", "", "", "");
}

/**
 * 表单的查询
 */
function onSearchBtnClick() {
	// 获取表单内容以查询
	var acctPeriod = $('#acctPeriod').val();
	var busiTp = $('#busiTp').combobox('getValue');
	var finaTp = $('#finaTp').combobox('getValue');
	var feeOrIntr = $('#feeOrIntr').combobox('getValue');
	// var busiTp = $('#busiTp').val();
	// var finaTp = $('#finaTp').val();
	// var feeOrIntr = $('#feeOrIntr').val();
	findRow(busiTp, finaTp, acctPeriod, feeOrIntr);
}

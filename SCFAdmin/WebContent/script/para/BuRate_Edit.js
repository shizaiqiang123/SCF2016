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
// 去掉下面所有按钮
// function ignoreToolBar() {
// var showButton = ['cancel'];
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
		"text" : "业务利率"
	}, {
		"id" : '1',
		"text" : "业务费率"
	}, {
		"id" : '',
		"text" : "全部",
		selected : true
	} ];
	$("#feeOrIntr").combobox('loadData', feeOrIntr).combobox({
		editable : false
	});
}

// 获取业务利率表的信息
function findRow(busiTp, finaTp, acctPeriod, feeOrIntr) {
	var sysBusiUnit = findBU();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000221',
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
					SCFUtils.alert("没有相应的基础利率/费率！");
				} else {

					SCFUtils
							.loadGridData('searchTable', data.rows, false, true);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
// 获取业务利率表的信息
function findOnIntRow(busiTp, finaTp, acctPeriod, feeOrIntr) {
	var sysBusiUnit = findBU();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000221',
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
	// onLoadSuccess : onLoadSuccess
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
		width : 100,
		formatter : busiTpFormter
	}, {
		field : 'finaTp',
		title : '融资模式',
		width : 100,
		formatter : finaTpFormter
	},
	// {
	// field : 'acctPeriodDesc',
	// title : '融资期限描述',
	// width : 100
	// ,
	// hidden : true
	// },
	{
		field : 'acctPeriod',
		title : '融资期限(单位：天)',
		width : 120
	}, {
		field : 'custLevel',
		title : '客户等级',
		width : 100,
		formatter : custLevelFormter
	}, {
		field : 'feeOrIntr',
		title : '利率类型',
		width : 100,
		formatter : feeOrIntrFormter
	}, {
		field : 'sysRefNo',
		title : '流水号',
		hidden : true
	},
	// {
	// field : 'edit',
	// title : '操作',
	// width : 150,
	// formatter : Buttons
	// },
	{
		field : 'rateTp',
		title : '利率取值方式',
		width : 150,
		hidden : true
	}, {
		field : 'rtSpread',
		title : '上浮点差',
		width : 150,
		hidden : true
	}, {
		field : 'libor',
		title : '上浮百分率',
		width : 150,
		hidden : true
	}, {
		field : 'rate',
		title : '最终利率/费率',
		width : 150,
		hidden : true
	} ] ];
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
		return "业务利率";
	}
	if (value === "1") {
		return "业务费率";
	}
}
function custLevelFormter(value, row, index) {
	var levList = findLev();
	var text = "";
	$(levList).each(function(i, lev) {
		if (value === lev.levelCd) {
			text = lev.levelDesc;
		}
	});
	return text;
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

	var del = '<a class="del" icon="icon-filter" style="width:60px"  \
		onclick="delButton('
			+ index + ');" ></a>';
	return edit + del;
}

function addButton() {
	// 获取所有
	// var tableRows= SCFUtils.getGridData('searchTable', false);
	var row = {};
	row.op = 'add';
	var options = {
		title : "新增业务利率和费率信息",
		reqid : 'I_P_000073',
		data : {
			'row' : row,
			cacheType : 'non'
		// ,tableRows:tableRows
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
	// ajaxTable();
	onSearchBtnClick();
	// findRow("", "", "", "", "", "");
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
		custLevel : row.custLevel,
		feeOrIntr : row.feeOrIntr,
		sysRefNo : SCFUtils.uuid(16),
		libor : row.libor,
		rate : row.rate,
		rtSpread : row.rtSpread,
		rateTp : row.rateTp
	};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_000076',
			_opTp : "ADD",
			cacheType : 'non',
			reqPageType : 'finish',
		// funcType : 'MM'
		}, data)
	};
	SCFUtils.ajax(options);
}

function editButton() {
	var selectRow = $('#searchTable').datagrid('getSelected');
	var rowIndex = $('#searchTable').datagrid('getRowIndex', selectRow);
	if (selectRow) {
		var rows = $('#searchTable').datagrid('getRows');// 获取所有当前加载的数据行
		var row = rows[rowIndex];
		// 获取所有// 按钮在行上
		// var tableRows= SCFUtils.getGridData('searchTable', false);
		// 获取本页
		// var rowss = $('#searchTable').datagrid('getRows');
		// var rows = rowss[index];
		row.op = 'edit';
		var options = {
			title : "修改业务利率和费率信息",
			reqid : 'I_P_000073',
			data : {
				'row' : row,
				cacheType : 'non'
			// ,tableRows:tableRows
			},
			onSuccess : editBasalRateSuccess
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
function editBasalRateSuccess(data) {
	var sysBusiUnit = findBU();
	if (data.sysBusiUnit == sysBusiUnit) {
		var flag = isSame(data);
		if (flag) {
			editBasaRate(data);
		}
		onSearchBtnClick();
		// ajaxTable();
		// findRow("", "", "", "", "", "");
	} else {
		SCFUtils.alert("网络错误，请重新刷新本页面！");
	}
}

function editBasaRate(row) {
	var data = {};
	data = {
		sysBusiUnit : row.sysBusiUnit,
		busiTp : row.busiTp,
		finaTp : row.finaTp,
		acctPeriodDesc : row.acctPeriodDesc,
		acctPeriod : row.acctPeriod,
		custLevel : row.custLevel,
		feeOrIntr : row.feeOrIntr,
		sysRefNo : row.sysRefNo,
		libor : row.libor,
		rate : row.rate,
		rtSpread : row.rtSpread,
		rateTp : row.rateTp
	};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_000076',
			_opTp : "edit",
			cacheType : 'non',
			reqPageType : 'finish',
		// funcType : 'MM'
		}, data)
	};
	SCFUtils.ajax(options);
}
function isSame(rows) {
	var tableRows = SCFUtils.getGridData('searchTable', false);
	var flag = true;
	$.each(tableRows, function(i, row) {

		if (row.sysRefNo == rows.sysRefNo) {
			return;
		} else {
			if (row.busiTp == rows.busiTp && row.finaTp == rows.finaTp
					&& row.acctPeriod == rows.acctPeriod
					&& row.custLevel == rows.custLevel) {
				if (row.feeOrIntr == rows.feeOrIntr) {
					flag = false;
					SCFUtils.alert("您已添加过相同类型的业务利率或费率！");
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
//			onSearchBtnClick();
			findOnIntRow("", "", "", "");
		});
		// ajaxTable();
		// findRow("", "", "", "", "", "");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
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
			getdataId : 'I_P_000076',
			_opTp : "DELETE",
			cacheType : 'non',
			reqPageType : 'finish',
			funcType : 'MM'
		}, data)
	};
	SCFUtils.ajax(options);
}

// 刷新表格
function newTable() {
	$('#batchTable').datagrid('reload');
}

// 搜索栏表单重置
function onResetBtnClick() {
	$('#screenForm')[0].reset();
//	ajaxTable();
//	ajaxBox();
//	onSearchBtnClick();
	// findRow("", "", "", "", "", "");
}

/**
 * 表单的查询
 */
function onSearchBtnClick() {
	// 获取表单内容以查询
	ajaxTable();
	newTable();
	var acctPeriod = $('#acctPeriod').val();
	var busiTp = $('#busiTp').combobox('getValue');
	var finaTp = $('#finaTp').combobox('getValue');
	var feeOrIntr = $('#feeOrIntr').combobox('getValue');
	// var busiTp = $('#busiTp').val();
	// var finaTp = $('#finaTp').val();
	// var feeOrIntr = $('#feeOrIntr').val();
	// var custLevel = $('#custLevel').val();
	findRow(busiTp, finaTp, acctPeriod, feeOrIntr);
}
function findLev() {
	var sysBusiUnit = findBU();
	var levList = {};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000224',
			sysBusiUnit : sysBusiUnit
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils.alert("您没有可选的用户等级！");
					// ajaxCustLevel(data.rows);
				} else {
					levList = data.rows;
					return levList;
				}
			}
		}
	};
	SCFUtils.ajax(options);
	return levList;
}
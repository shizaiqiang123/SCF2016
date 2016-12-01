function pageOnInt() {
	ajaxTable();
	findOnIntRow("", "");
}
// 去掉下面所有按钮
function initToolBar() {
	var showButton = [ 'cancel' ];

	return showButton;
}
// 去掉下面所有按钮
// function ignoreToolBar(){
// var showButton = ['cancel'];
//	
// return showButton;
// }

// 获取基础利率表的信息
function findRow(levelDesc, levelCd) {
	var sysBusiUnit = findBU();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000225',
			sysBusiUnit : sysBusiUnit,
			levelDesc : levelDesc,
			levelCd : levelCd
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils
							.loadGridData('searchTable', data.rows, false, true);
					SCFUtils.alert("没有相关的用户等级信息！");
				} else {
					SCFUtils
							.loadGridData('searchTable', data.rows, false, true);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
function findOnIntRow(levelDesc, levelCd) {
	var sysBusiUnit = findBU();
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000225',
			sysBusiUnit : sysBusiUnit,
			levelDesc : levelDesc,
			levelCd : levelCd
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
		field : 'levelDesc',
		title : '客户等级描述',
		width : 120
	// ,formatter : busiTpFormter
	}, {
		field : 'levelCd',
		title : '客户等级编号',
		width : 120
	}, {
		field : 'sysRefNo',
		title : '流水号',
		hidden : true
	}
//	, {
//		field : 'edit',
//		title : '操作',
//		width : 150,
//		formatter : Buttons
//	} 
	] ];
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
	// var tableRows= SCFUtils.getGridData('searchTable', false);
	var row = {};
	row.op = 'add';
	var options = {
		title : "新增客户等级信息",
		reqid : 'I_P_000079',
		height : 266,
		data : {
			'row' : row,
			cacheType : 'non'
		// ,tableRows:tableRows
		},
		onSuccess : addBasalRateSuccess
	};
	SCFUtils.getData(options);
}
function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}
function addBasaRate(row) {
	var sysBusiUnit = findBU();
	var data = {};
	data = {
		sysRefNo : SCFUtils.uuid(16),
		sysBusiUnit : sysBusiUnit,
		levelDesc : row.levelDesc,
		levelCd : row.levelCd
	};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_000080',
			_opTp : "ADD",
			cacheType : 'non',
			reqPageType : 'finish'
		// ,funcType : 'MM'
		}, data)
	};
	SCFUtils.ajax(options);
}
function addBasalRateSuccess(data) {
	// var tableRows= SCFUtils.getGridData('searchTable', false);
	var flag = isSame(data);
	if (flag) {
		addBasaRate(data);
		ajaxTable();
		findRow("", "");
	}
}

function editButton() {
	// 按钮在表格顶端
	var selectRow = $('#searchTable').datagrid('getSelected');
	var rowIndex = $('#searchTable').datagrid('getRowIndex', selectRow);
	if (selectRow) {
		var rows = $('#searchTable').datagrid('getRows');// 获取所有当前加载的数据行
		var row = rows[rowIndex];
		// 获取所有
		// var tableRows= SCFUtils.getGridData('searchTable', false);
		// 获取本页
		// var rowss = $('#searchTable').datagrid('getRows');
		// var rows = rowss[index];
		row.op = 'edit';
		var options = {
			title : "修改客户等级信息",
			reqid : 'I_P_000079',
			height : 266,
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
function editBasaRate(row) {
	var sysBusiUnit = findBU();
	var data = {};
	data = {
		sysRefNo : row.sysRefNo,
		sysBusiUnit : sysBusiUnit,
		levelDesc : row.levelDesc,
		levelCd : row.levelCd
	};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_000080',
			_opTp : "edit",
			cacheType : 'non',
			reqPageType : 'finish',
		// funcType : 'MM'
		}, data)
	};
	SCFUtils.ajax(options);
}

function editBasalRateSuccess(data) {
	var flag = isSame(data);
	if (flag) {
		editBasaRate(data);
		ajaxTable();
		findRow("", "");
	}
}
function isSame(rows) {
	var tableRows = SCFUtils.getGridData('searchTable', false);
	var flag = true;
	$.each(tableRows,
			function(i, row) {
				if (row.sysRefNo == rows.sysRefNo) {
					return;
				} else {
					if (row.levelDesc == rows.levelDesc
							|| row.levelCd == rows.levelCd) {
						SCFUtils.alert("您已添加过相同类型或编号的客户等级！");
						flag = false;
						return;
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
			findRow("", "");
		});
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
			getdataId : 'I_P_000080',
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
	$('#searchTable').datagrid('reload');
}

// 搜索栏表单重置
function onResetBtnClick() {
	$('#screenForm')[0].reset();
//	ajaxTable();
//	findOnIntRow("", "");
}

/**
 * 表单的查询
 */
function onSearchBtnClick() {
	// 获取表单内容以查询
//	ajaxTable();
	var levelDesc = $('#levelDesc').val();
	var levelCd = $('#levelCd').val();
	findRow(levelDesc, levelCd);
}

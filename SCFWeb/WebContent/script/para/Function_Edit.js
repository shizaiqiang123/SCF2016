function pageOnInt() {
	ajaxTable();
	findRow("", "");
}
//去掉下面所有按钮
function ignoreToolBar(){
	
}

// 获取复核条件的function选项
function findRow(menuId, menuName) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000200',
			menuId : menuId,
			menuName : menuName,
			busiUnit : SCFUtils.SYSBUSIUNIT
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils.alert("您没有可以修改的文件");
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
		onLoadSuccess : onLoadSuccess
	};
	$('#searchTable').datagrid(options);
}

function getColumns() { // 初始化表头
	return [ [ {
		field : 'ck',
		checkbox : true
	}, {
		field : 'menuId',
		title : 'Function的编号',
		width : 120
	}, {
		field : 'menuName',
		title : 'Function的名称',
		width : 120
	}, {
		field : 'sysFuncId',
		title : '父菜单的编号',
		width : 120
	}, {
		field : 'accountingId',
		title : '账务',
		width : 150,
		formatter : accountingButton
	}, {
		field : 'faceId',
		title : '面凾',
		width : 150,
		formatter : reportButton
	}, {
		field : 'workflowId',
		title : '工作流',
		width : 150,
		formatter : workflowButton
	}, {
		field : 'resetAllId',
		title : '全部',
		width : 150,
		formatter : resetRowButton
	} ] ];
}

// 设置超链接的文字显示按钮
function onLoadSuccess(data) {
	$('.editButton').linkbutton({
		text : "修改"
	});
	$('.resetButton').linkbutton({
		text : "重置"
	});
	$('.resetAllButton').linkbutton({
		text : "重置全部"
	});
}

// accountingId的
function accountingButton(value, row, index) { // 设置表格记录加载的按钮

	var editFunction = '<a class="editButton" icon="icon-edit" style="width:60px"   \
			onclick="accountingButtonEdit('
			+ index + ');"></a>';

	var resetFunction = '<a class="resetButton" icon="icon-filter" style="width:60px"  \
			onclick="accountingButtonReset('
			+ index + ');" ></a>';
	return editFunction + resetFunction;
}

function accountingButtonEdit(index) {
	// $('#searchTable').datagrid('scrollTo',index);
	var rowss = $('#searchTable').datagrid('getRows');
	var rows = rowss[index];
	var row = {};
	row.paraId = rows.menuId;
	row.ServiceType = 'accounting';
	if (row) {
		var options = {
			reqid : 'I_P_000046',
			data : {
				'row' : row,
				cacheType : 'non',
				'index' : index
			},
		// onSuccess : accountingButtonEditSuccess
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// function accountingButtonEditSuccess(data) {
// var row = $('#searchTable').datagrid('getSelected');
// var rowIndex = $('#testTable').datagrid('getRowIndex', row);
// $('#searchTable').datagrid('updateRow', {
// index : data.index,
// row : data
// });
// }

function accountingButtonReset(index) {
	// SCFUtils.alert('这是'+index+'行账务重置');
	var rowss = $('#searchTable').datagrid('getRows');
	var rows = rowss[index];
	var row = {};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		reqid : 'I_P_000055',
		data : {
			'row' : rows,
			cacheType : 'non',
			requestType : 'reset',
			functionId : rows.menuId,
			resetType : 'accounting',
			ServiceType : 'accounting'
		},
	// onsucces:function(){SCFUtils.alert("function编号为"+rows.paraId+"的账务重置完毕！");}
	// callBackFun : function(data){
	// if(data.success)
	// {
	// SCFUtils.alert("function编号为"+rows.paraId+"的账务重置完毕！")
	// }else
	// {
	// SCFUtils.alert("function编号为"+rows.paraId+"的账务重置失败，或许因为您的function没有账务！")
	// }
	// }
	};
	SCFUtils.getData(options);
}

// reportId的
function reportButton(value, row, index) { // 设置表格记录加载的按钮
	var editFunction = '<a class="editButton" icon="icon-edit" style="width:60px"   \
			onclick="reportButtonEdit('
			+ index + ');"></a>';

	var resetFunction = '<a class="resetButton" icon="icon-filter" style="width:60px"  \
			onclick="reportButtonReset('
			+ index + ');" ></a>';

	return editFunction + resetFunction;
}

function reportButtonEdit(index) {
	// SCFUtils.alert('这是'+index+'行面凾修改');
	var rowss = $('#searchTable').datagrid('getRows');
	var rows = rowss[index];
	var row = {};
	row.paraId = rows.menuId;
	row.ServiceType = 'report';
	if (row) {
		var options = {
			reqid : 'I_P_000047',
			data : {
				'row' : row,
				cacheType : 'non',
				'index' : index
			},
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function reportButtonReset(index) {
	// SCFUtils.alert('这是'+index+'行面凾重置');
	var rowss = $('#searchTable').datagrid('getRows');
	var rows = rowss[index];
	var row = {};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		reqid : 'I_P_000057',
		data : {
			'row' : rows,
			cacheType : 'non',
			requestType : 'reset',
			functionId : rows.menuId,
			resetType : 'report',
			ServiceType : 'report'
		},
	};
	SCFUtils.getData(options);
}

// workflow的
function workflowButton(value, row, index) { // 设置表格记录加载的按钮
	var editFunction = '<a class="editButton" icon="icon-edit" style="width:60px"   \
			onclick="workflowButtonEdit('
			+ index + ');"></a>';

	var resetFunction = '<a class="resetButton" icon="icon-filter" style="width:60px"  \
			onclick="workflowButtonReset('
			+ index + ');" ></a>';

	return editFunction + resetFunction;
}

function workflowButtonEdit(index) {
	// SCFUtils.alert('这是'+index+'行工作流修改');
	var rowss = $('#searchTable').datagrid('getRows');
	var rows = rowss[index];
	var row = {};
	row.paraId = rows.menuId;
	row.ServiceType = 'accounting';
	if (row) {
		var options = {
			reqid : 'I_P_000051',
			data : {
				'row' : row,
				cacheType : 'non',
				'index' : index
			},
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// function workflowButtonEditSuccess(data) {
// var row = $('#searchTable').datagrid('getSelected');
// var rowIndex = $('#testTable').datagrid('getRowIndex', row);
// $('#searchTable').datagrid('updateRow', {
// index : data.index,
// row : data
// });
// }

function workflowButtonReset(index) {
	// SCFUtils.alert('这是'+index+'行工作流重置');
	var rowss = $('#searchTable').datagrid('getRows');
	var rows = rowss[index];
	var row = {};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		reqid : 'I_P_000059',
		data : {
			'row' : rows,
			cacheType : 'non',
			requestType : 'reset',
			functionId : rows.menuId,
			resetType : 'workflow',
			ServiceType : 'workflow'
		},
	};
	SCFUtils.getData(options);
}

// resetAll的
function resetRowButton(value, row, index) { // 设置表格记录加载的按钮

	var resetFunction = '<a class="resetAllButton" icon="icon-filter" style="width:100px"  \
			onclick="resetAll('
			+ index + ');" ></a>';

	return resetFunction;
}

// 全部重置
function resetAll(index) {
	// SCFUtils.alert('这是'+index+'行一行全部重置');
	var rowss = $('#searchTable').datagrid('getRows');
	var rows = rowss[index];
	var row = {};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		reqid : 'I_P_000060',
		data : {
			'row' : rows,
			cacheType : 'non',
			requestType : 'reset',
			functionId : rows.menuId,
			resetType : 'all',
			ServiceType : 'all'
		},
	};
	SCFUtils.getData(options);
}

// 刷新表格
function changeType() {
	$('#batchTable').datagrid('reload');
}

// 搜索栏表单重置
function onResetBtnClick() {
	$('#ScreenMenuForm')[0].reset();
}

/**
 * 表单的查询
 */
function onSearchBtnClick() {
	//获取表单内容以查询
	ajaxTable();
	var menuId = $('#menuId').val();
	var menuName = $('#menuName').val();
	findRow(menuId, menuName);
}

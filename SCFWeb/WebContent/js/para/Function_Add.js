//function initTooltip(){
//	var options = {
//			display : 'block',
//			content:'<span style="color:red">这里是要显示的内容</span>'
//	};
//	return options;
//}
function pageOnInt() {
	ajaxPageTable();
	ajaxServiceTable();
	ajaxBox();
}

function pageOnFPLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);

	if (data.obj.pageList && !SCFUtils.isEmpty(data.obj.pageList))
		SCFUtils.loadGridData('pageDg', SCFUtils
				.parseGridData(data.obj.pageList), true);
	if (data.obj.serviceList && !SCFUtils.isEmpty(data.obj.serviceList))
		SCFUtils.loadGridData('serviceDg', SCFUtils
				.parseGridData(data.obj.serviceList), true);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);

	if (data.obj.pageList && !SCFUtils.isEmpty(data.obj.pageList))
		SCFUtils.loadGridData('pageDg', SCFUtils
				.parseGridData(data.obj.pageList), false);
	if (data.obj.serviceList && !SCFUtils.isEmpty(data.obj.serviceList))
		SCFUtils.loadGridData('serviceDg', SCFUtils
				.parseGridData(data.obj.serviceList), false);
}

function newId() {
	var options = {};
	options.data = {
		refName : 'FuncRef',
		refField : 'id'
	};
	options.force = true;
	SCFUtils.getRefNo(options);
	/*
	 * 获取新编号后，去判断#id的div有无值,无值不做处理
	 * 有去除这个id的validatebox-invalid方法，不去除*号了
	 * new on 20160829 by JinJH
	 */
	if($('#id').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#id').removeClass('validatebox-invalid');
	}
}

function ajaxSysRefNo() {
	if ('PARAADD' == SCFUtils.OPTSTATUS) {
		var newsysRefNo = SCFUtils.uuid(32);
		$('#sysRefNo').val(newsysRefNo);
	}
}

function onSaveBtnClick() {
	var data = SCFUtils.convertArray('mainForm');
	var pageList = SCFUtils.getGridData("pageDg");
	var grid = {};
	if (pageList && !SCFUtils.isEmpty(pageList)) {
		grid.pageList = SCFUtils.json2str(pageList);
	}
	var serviceList = SCFUtils.getGridData('serviceDg');
	if (serviceList && !SCFUtils.isEmpty(serviceList)) {
		grid.serviceList = SCFUtils.json2str(serviceList);
	}
	$.extend(data, grid);
	return data;
}

function onNextBtnClick() {
	return onSaveBtnClick();
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
	if (data.obj.pageList && !SCFUtils.isEmpty(data.obj.pageList))
		$('#pageDg').datagrid('loadData', data.obj.pageList);
	if (data.obj.serviceList && !SCFUtils.isEmpty(data.obj.serviceList))
		$('#serviceDg').datagrid('loadData', data.obj.serviceList);
	ajaxSysRefNo();
}

function ajaxBox() {
	var functype = [ {
		"id" : 'MM',
		"text" : "MM"
	}, {
		"id" : 'PM',
		"text" : "PM"
	}, {
		"id" : 'RE',
		"text" : "RE"
	}, {
		"id" : 'FP',
		"text" : "FP"
	}, {
		"id" : 'DP',
		"text" : "DP"
	}, {
		"id" : 'EC',
		"text" : "EC"
	}, {
		"id" : 'AX',
		"text" : "AX"
	}, {
		"id" : 'VH',
		"text" : "VH"
	}, {
		"id" : 'CA',
		"text" : "CA"
	}, {
		"id" : 'MA',
		"text" : "MA"
	}, {
		"id" : 'PA',
		"text" : "PA"
	}, {
		"id" : 'UL',
		"text" : "UL"
	}, {
		"id" : 'VW',
		"text" : "VW"
	} ];
	$('#functype').combobox('loadData', functype);
}

function ajaxPageTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'id',
			title : 'id',
			width : 70
		}, {
			field : 'name',
			title : 'name',
			width : 70
		}, {
			field : 'desc',
			title : 'desc',
			width : 70
		}, {
			field : 'pagetype',
			title : 'pagetype',
			width : 70
		}, {
			field : 'accountingjs',
			title : 'accountingjs',
			hidden : true
		}, {
			field : 'bu',
			title : 'bu',
			hidden : true
		}, {
			field : 'cascadeevent',
			title : 'cascadeevent',
			hidden : true
		}, {
			field : 'catalog',
			title : 'catalog',
			hidden : true
		}, {
			field : 'doname',
			title : 'doname',
			hidden : true
		}, {
			field : 'gapi',
			title : 'gapi',
			hidden : true
		}, {
			field : 'holdmaster',
			title : 'holdmaster',
			hidden : true
		}, {
			field : 'istransaction',
			title : 'istransaction',
			hidden : true
		}, {
			field : 'jsfile',
			title : 'jsfile',
			hidden : true
		}, {
			field : 'jspfile',
			title : 'jspfile',
			hidden : true
		}, {
			field : 'lockcheck',
			title : 'lockcheck',
			hidden : true
		}, {
			field : 'logicid',
			title : 'logicid',
			hidden : true
		}, {
			field : 'maincomp',
			title : 'maincomp',
			hidden : true
		}, {
			field : 'maintable',
			title : 'maintable',
			hidden : true
		}, {
			field : 'pagejs',
			title : 'pagejs',
			hidden : true
		}, {
			field : 'queryid',
			title : 'queryid',
			hidden : true
		} ] ]
	};
	$('#pageDg').datagrid(options);
}

function ajaxServiceTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'id',
			title : 'id',
			width : 70
		}, {
			field : 'name',
			title : 'name',
			width : 70
		}, {
			field : 'type',
			title : 'type',
			width : 70
		}, {
			field : 'component',
			title : 'component',
			width : 70
		}, {
			field : 'gapiid',
			title : 'gapiid',
			hidden : true
		}, {
			field : 'servicejs',
			title : 'servicejs',
			hidden : true
		}, {
			field : 'templateid',
			title : 'templateid',
			hidden : true
		} ] ]
	};
	$('#serviceDg').datagrid(options);
}

function addSuccess(data) {
	$('#testTable').datagrid('appendRow', data);
}

function editSuccess(data) {
	var row = $('#testTable').datagrid('getSelected');
	var rowIndex = $('#testTable').datagrid('getRowIndex', row);
	$('#testTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
}
// 新增一条数据
function addRow() {
	var row = {};
	row.selId = $('#selId').val();
	row.op = 'add';
	var options = {
		reqid : 'I_P_000024',
		data : {
			'row' : row
		},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);

}
// 修改一条数据
function editRow() {
	var row = $('#testTable').datagrid('getSelected');
	row.op = 'edit';
	if (row) {
		var options = {
			reqid : 'I_P_000024',
			data : {
				'row' : row
			},
			onSuccess : editSuccess
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteRow() {
	var row = $('#testTable').datagrid('getSelected');
	var rowIndex = $('#testTable').datagrid('getRowIndex', row);
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				$('#testTable').datagrid('deleteRow', rowIndex);
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function addPage() {
	var row = {};
	// row.index = $('#pageDg').datagrid('getRows').length;
	row.op = 'add';
	var options = {
		title : '新增Page',
		reqid : 'I_P_000024',
		data : {
			'row' : row,
			cacheType : 'non'
		},
		onSuccess : addPageSuccess
	};
	SCFUtils.getData(options);
}

function addPageSuccess(data) {
	$('#pageDg').datagrid('insertRow', {
		index : data.index,
		row : data
	});
	// $('#pageDg').datagrid('reload');
}

function editPage() {
	var selectRow = $('#pageDg').datagrid('getSelected');
	var rowIndex = $('#pageDg').datagrid('getRowIndex', selectRow);
	if (selectRow) {
		var rows = $('#pageDg').datagrid('getRows');// 获取所有当前加载的数据行
		var data = rows[rowIndex];

		var row = {};
		// row.index = $('#pageDg').datagrid('getRows').length;
		row.op = 'edit';
		row.data = data;
		$.extend(row, data);
		var options = {
			title : '修改Page',
			reqid : 'I_P_000024',
			data : {
				'row' : row,
				cacheType : 'non'
			},
			onSuccess : editPageSuccess

		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editPageSuccess(data) {
	var row = $('#pageDg').datagrid('getSelected');
	var rowIndex = $('#pageDg').datagrid('getRowIndex', row);
	$.extend(row, {
		id : data.id,
		name : data.name,
		desc : data.desc,
		pagetype : data.pagetype,
		accountingjs : data.accountingjs,
		bu : data.bu,
		cascadeevent : data.cascadeevent,
		catalog : data.catalog,
		gapi : data.gapi,
		doname : data.doname,
		holdmaster : data.holdmaster,
		istransaction : data.istransaction,
		jsfile : data.jsfile,
		jspfile : data.jspfile,
		lockcheck : data.lockcheck,
		logicid : data.logicid,
		maincomp : data.maincomp,
		maintable : data.maintable,
		pagejs : data.pagejs,
		queryid : data.queryid
	});
	$('#pageDg').datagrid('refreshRow', rowIndex);
}

function delPage() {
	var row = $('#pageDg').datagrid('getSelected');
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				var rowIndex = $('#pageDg').datagrid('getRowIndex', row);
				$('#pageDg').datagrid('deleteRow', rowIndex);
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function addService() {
	var row = {};
	// row.index = $('#pageDg').datagrid('getRows').length;
	row.op = 'add';
	var options = {
		title : '新增service',
		reqid : 'I_P_000030',
		data : {
			'row' : row,
			cacheType : 'non'
		},
		onSuccess : addServiceSuccess
	};
	SCFUtils.getData(options);
}

function addServiceSuccess(data) {
	$('#serviceDg').datagrid('insertRow', {
		index : data.index,
		row : data
	});
	// $('#serviceDg').datagrid('reload');
}

function editService() {
	var selectRow = $('#serviceDg').datagrid('getSelected');
	var rowIndex = $('#serviceDg').datagrid('getRowIndex', selectRow);
	if (selectRow) {
		var rows = $('#serviceDg').datagrid('getRows');// 获取所有当前加载的数据行
		var data = rows[rowIndex];
		var row = {};
		// row.index = $('#pageDg').datagrid('getRows').length;
		row.op = 'edit';
		row.data = data;
		$.extend(row, data);
		var options = {
			title : '新增Service',
			reqid : 'I_P_000030',
			data : {
				'row' : row,
				cacheType : 'non'
			},
			onSuccess : editServiceSuccess

		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editServiceSuccess(data) {
	var row = $('#serviceDg').datagrid('getSelected');
	var rowIndex = $('#serviceDg').datagrid('getRowIndex', row);
	$.extend(row, {
		id : data.id,
		name : data.name,
		type : data.type,
		component : data.component,
		gapiid : data.gapiid,
		servicejs : data.servicejs,
		templateid : data.templateid
	});
	$('#serviceDg').datagrid('refreshRow', rowIndex);

	// $('#serviceDg').datagrid('reload');
}

function delService() {
	var row = $('#serviceDg').datagrid('getSelected');
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				var rowIndex = $('#serviceDg').datagrid('getRowIndex', row);
				$('#serviceDg').datagrid('deleteRow', rowIndex);
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// function addReport() {
// var row = {};
// //row.index = $('#pageDg').datagrid('getRows').length;
// row.op ='add';
// var options = {
// title:'report信息',
// reqid : 'I_P_000031',
// data : {
// 'row' : row,
// cacheType :'non'
// },
// onSuccess : addReportSuccess
// };
// SCFUtils.getData(options);
// }
//
// function addReportSuccess(data){
// $('#reportDg').datagrid('insertRow', {
// index:data.index,
// row : data
// });
// $('#reportDg').datagrid('reload');
// }
//
// function editReport() {
// var selectRow = $('#reportDg').datagrid('getSelected');
// var rowIndex = $('#reportDg').datagrid('getRowIndex',selectRow);
// if (selectRow) {
// var rows=$('#reportDg').datagrid('getRows');//获取所有当前加载的数据行
// var data=rows[rowIndex];
//		
// var row = {};
// //row.index = $('#pageDg').datagrid('getRows').length;
// row.op ='edit';
// row.data = data;
// $.extend(row,data);
// var options = {
// title:'report信息',
// reqid : 'I_P_000031',
// data : {
// 'row' : row,
// cacheType :'non'
// },
// onSuccess : editReportSuccess
//		
// };
// SCFUtils.getData(options);
// } else {
// alert("请选择一条数据！");
// }
// }
//
// function editReportSuccess(data){
// var row = $('#reportDg').datagrid('getSelected');
// var rowIndex = $('#reportDg').datagrid('getRowIndex', row);
// $('#reportDg').datagrid('updateRow', {
// index : rowIndex,
// row : data
// });
//	
// $('#reportDg').datagrid('reload');
// }
//
// function delReport() {
// var row = $('#reportDg').datagrid('getSelected');
// if (row) {
// $.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
// if (r) {
// var rowIndex = $('#reportDg').datagrid('getRowIndex',row);
// $('#reportDg').datagrid('deleteRow', rowIndex);
// }
// });
// } else {
// alert("请选择一条数据！");
// }
// }

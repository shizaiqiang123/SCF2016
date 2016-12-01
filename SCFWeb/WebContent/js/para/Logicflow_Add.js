function initTooltip() {
	var options = {
		display : 'block',
		content : ''
	};
	return options;
}
function pageOnInt() {
	ajaxLogicNodeTable();
	ajaxTransforNodeTable();
}

function pageOnFPLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);

	if (data.obj.lnodeList && !SCFUtils.isEmpty(data.obj.lnodeList))
		SCFUtils.loadGridData('logicNodeDg', SCFUtils
				.parseGridData(data.obj.lnodeList), true);
	if (data.obj.transfornodeList
			&& !SCFUtils.isEmpty(data.obj.transfornodeList))
		SCFUtils.loadGridData('transforNodeDg', SCFUtils
				.parseGridData(data.obj.transfornodeList), true);

}
function pageOnPreLoad(data) {

	SCFUtils.loadForm('mainForm', data);

	if (data.obj.lnodeList && !SCFUtils.isEmpty(data.obj.lnodeList))
		SCFUtils.loadGridData('logicNodeDg', SCFUtils
				.parseGridData(data.obj.lnodeList), false);
	if (data.obj.transfornodeList
			&& !SCFUtils.isEmpty(data.obj.transfornodeList))
		SCFUtils.loadGridData('transforNodeDg', SCFUtils
				.parseGridData(data.obj.transfornodeList), false);

}

function onSaveBtnClick() {
	var data = SCFUtils.convertArray('mainForm');
	var logicNdoeList = SCFUtils.getGridData('logicNodeDg');
	var grid = {};
	if (logicNdoeList && !SCFUtils.isEmpty(logicNdoeList)) {
		grid.lnodeList = SCFUtils.json2str(logicNdoeList);
	}
	var transforNodeList = SCFUtils.getGridData('transforNodeDg');
	if (transforNodeList && !SCFUtils.isEmpty(transforNodeList)) {
		grid.transfornodeList = SCFUtils.json2str(transforNodeList);
	}
	$.extend(data, grid);
	return data;
}
function onNextBtnClick() {
	return onSaveBtnClick();
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
	if (data.obj.lnodeList && !SCFUtils.isEmpty(data.obj.lnodeList)) {
		$('#logicNodeDg').datagrid('loadData', data.obj.lnodeList);
	}
	if (data.obj.transfornodeList
			&& !SCFUtils.isEmpty(data.obj.transfornodeList)) {
		$('#transforNodeDg').datagrid('loadData', data.obj.transfornodeList);
	}
	ajaxSysRefNo();
}

function ajaxLogicNodeTable() {
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
			field : 'component',
			title : 'component',
			hidden : true
		}, {
			field : 'tablename',
			title : 'tablename',
			hidden : true
		}, {
			field : 'doname',
			title : 'doname',
			hidden : true
		}, {
			field : 'type',
			title : 'type',
			hidden : true
		}, {
			field : 'cascadeevent',
			title : 'cascadeevent',
			hidden : true
		}, {
			field : 'event',
			title : 'event',
			hidden : true
		}, {
			field : 'fields',
			title : 'fields',
			hidden : true
		}, {
			field : 'condition',
			title : 'condition',
			hidden : true
		}, {
			field : 'orderby',
			title : 'orderby',
			hidden : true
		}, {
			field : 'asc',
			title : 'asc',
			hidden : true
		}, {
			field : 'module',
			title : 'module',
			hidden : true
		}, {
			field : 'sql',
			title : 'sql',
			hidden : true
		}, {
			field : 'params',
			title : 'params',
			hidden : true
		}, {
			field : 'bu',
			title : 'bu',
			hidden : true
		} , {
			field : 'nodejs',
			title : 'nodejs',
			hidden : true
		} ] ]
	};
	$('#logicNodeDg').datagrid(options);
}

function ajaxTransforNodeTable() {
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
			field : 'component',
			title : 'component',
			hidden : true
		}, {
			field : 'tablename',
			title : 'tablename',
			hidden : true
		}, {
			field : 'doname',
			title : 'doname',
			hidden : true
		}, {
			field : 'type',
			title : 'type',
			hidden : true
		}, {
			field : 'cascadeevent',
			title : 'cascadeevent',
			hidden : true
		}, {
			field : 'event',
			title : 'event',
			hidden : true
		}, {
			field : 'fields',
			title : 'fields',
			hidden : true
		}, {
			field : 'condition',
			title : 'condition',
			hidden : true
		}, {
			field : 'orderby',
			title : 'orderby',
			hidden : true
		}, {
			field : 'asc',
			title : 'asc',
			hidden : true
		}, {
			field : 'module',
			title : 'module',
			hidden : true
		}, {
			field : 'sql',
			title : 'sql',
			hidden : true
		}, {
			field : 'params',
			title : 'params',
			hidden : true
		}, {
			field : 'bu',
			title : 'bu',
			hidden : true
		}, {
			field : 'nodejs',
			title : 'nodejs',
			hidden : true
		}, {
			field : 'fields',
			title : 'fields',
			hidden : true
		}, {
			field : 'valuse',
			title : 'valuse',
			hidden : true
		}, {
			field : 'fields',
			title : 'fields',
			hidden : true
		}, {
			field : 'valuse',
			title : 'valuse',
			hidden : true
		}] ]
	};
	$('#transforNodeDg').datagrid(options);
}

/* 新建流水号 */
function newId() {
	var options = {};
	options.data = {
		refName : 'LogicflowRef',
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
/* LogicNode的操作 */
function addLogicNode() {

	var row = {};
	row.index = $('#logicNodeDg').datagrid('getRows').length;

	/* 传值LogicNodeId，赋值 */
	// var rowvalue= $("td").children("div
	// .datagrid-cell-rownumber").last().html();
	var id = "N0000000";
	var logicNodeId = "";
	// LogicNodeId
	var lengths = row.index;
	if ("" == lengths || 0 == lengths) {
		logicNodeId = id + "1";
	} else {
		lengths = parseInt(lengths) + 1;
		logicNodeId = id + lengths;
	}
	// end

	row.op = 'add';
	row.logicNodeId = logicNodeId;
	var options = {
		title : "新增LogicNode",
		reqid : 'I_P_000026',
		data : {
			'row' : row,
			cacheType : 'non'
		},
		onSuccess : addLogicNodeSuccess
	};
	SCFUtils.getData(options);
}

function addLogicNodeSuccess(data) {
	$('#logicNodeDg').datagrid('insertRow', {
		index : data.index,
		row : data
	});
	$('#logicNodeDg').datagrid('reload');
}
function editLogicNode() {
	var selectRow = $('#logicNodeDg').datagrid('getSelected');
	var rowIndex = $('#logicNodeDg').datagrid('getRowIndex', selectRow);
	if (selectRow) {
		var rows = $('#logicNodeDg').datagrid('getRows');// 获取所有当前加载的数据行
		var data = rows[rowIndex];

		var row = {};
		row.op = 'edit';
		row.data = data;
		$.extend(row, data);
		var options = {
			title : "修改LogicNode",
			reqid : 'I_P_000026',
			data : {
				'row' : row,
				cacheType : 'non'
			},
			onSuccess : editLogicNodeSuccess

		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editLogicNodeSuccess(data) {
	var row = $('#logicNodeDg').datagrid('getSelected');
	var rowIndex = $('#logicNodeDg').datagrid('getRowIndex', row);
//	$('#logicNodeDg').datagrid('updateRow', {
//		index : rowIndex,
//		row : data
//	});
//	$('#logicNodeDg').datagrid('reload');
	$.extend(row,{
		id : data.id,
		name : data.name,
		desc : data.desc,
		component : data.component,
		tablename : data.tablename,
		doname : data.doname,
		type : data.type,
		cascadeevent : data.cascadeevent,
		event : data.event,
		fields : data.fields,
		condition : data.condition,
		orderby : data.orderby,
		asc : data.asc,
		module : data.module,
		sql : data.sql,
		params : data.params,
		bu : data.bu,
		nodejs : data.nodejs,
	});
	$('#logicNodeDg').datagrid('refreshRow',rowIndex);
}

function delLogicNode() {
	var rows = $('#logicNodeDg').datagrid('getSelected');
	var rowIndex = $('#logicNodeDg').datagrid('getRowIndex', rows);

	if (rows) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				$('#logicNodeDg').datagrid('deleteRow', rowIndex);
				$('#logicNodeDg').datagrid('reload');
			}

		});

	} else {
		SCFUtil.alert("请选择一条数据！");
	}
}

/* TransforNode的操作 */
function addTransforNode() {
	var row = {};
	row.index = $('#transforNodeDg').datagrid('getRows').length;

	/* 传值LogicNodeId，赋值 */
	// var rowvalue= $("td").children("div
	// .datagrid-cell-rownumber").last().html();
	var id = "N0000000";
	var transforNodeId = "";
	// LogicNodeId
	var lengths = row.index;
	if ("" == lengths || 0 == lengths) {
		transforNodeId = id + "1";
	} else {
		lengths = parseInt(lengths) + 1;
		transforNodeId = id + lengths;
	}
	// end

	row.op = 'add';
	row.transforNodeId = transforNodeId;
	var options = {
		title : "新增TransforNodeId",
		reqid : 'I_P_000027',
		data : {
			'row' : row,
			cacheType : 'non'
		},
		onSuccess : addTransforNodeSuccess
	};
	SCFUtils.getData(options);
}

function addTransforNodeSuccess(data) {
	$('#transforNodeDg').datagrid('insertRow', {
		index : data.index,
		row : data
	});
	$('#logicNodeDg').datagrid('reload');
}
function editTransforNode() {
	var selectRow = $('#transforNodeDg').datagrid('getSelected');
	var rowIndex = $('#transforNodeDg').datagrid('getRowIndex', selectRow);
	if (selectRow) {
		var rows = $('#transforNodeDg').datagrid('getRows');// 获取所有当前加载的数据行
		var data = rows[rowIndex];

		var row = {};
		// row.index = $('#pageDg').datagrid('getRows').length;
		row.op = 'edit';
		row.data = data;
		$.extend(row, data);
		var options = {
			title : "修改TransforNodeId",
			reqid : 'I_P_000027',
			data : {
				'row' : row,
				cacheType : 'non'
			},
			onSuccess : editTransforNodeSuccess

		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editTransforNodeSuccess(data) {

	var row = $('#transforNodeDg').datagrid('getSelected');
	var rowIndex = $('#transforNodeDg').datagrid('getRowIndex', row);
//	$('#transforNodeDg').datagrid('updateRow', {
//		index : data.index,
//		row : data
//	});
//	$('#logicNodeDg').datagrid('reload');
	$.extend(row,{
		id : data.id,
		name : data.name,
		desc : data.desc,
		component : data.component,
		tablename : data.tablename,
		doname : data.doname,
		type : data.type,
		cascadeevent : data.cascadeevent,
		event : data.event,
		fields : data.fields,
		condition : data.condition,
		orderby : data.orderby,
		asc : data.asc,
		module : data.module,
		sql : data.sql,
		params : data.params,
		bu : data.bu,
		nodejs : data.nodejs,
	});
	$('#logicNodeDg').datagrid('refreshRow',rowIndex);
}

function delTransforNode() {
	var row = $('#transforNodeDg').datagrid('getSelected');
	var rowIndex = $('#transforNodeDg').datagrid('getRowIndex', row);
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				$('#transforNodeDg').datagrid('deleteRow', rowIndex);
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

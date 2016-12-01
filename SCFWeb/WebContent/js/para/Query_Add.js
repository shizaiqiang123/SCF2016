function pageOnInt() {
	ajaxQueryNodeTable();
}

function pageOnFPLoad(data){
	SCFUtils.loadForm('mainForm',data);
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	
	if(data.obj.qnodeList&&!SCFUtils.isEmpty(data.obj.qnodeList))
		SCFUtils.loadGridData('queryNodeDg',SCFUtils.parseGridData(data.obj.qnodeList), true);
	
}
function pageOnPreLoad(data) {
    SCFUtils.loadForm('mainForm', data);
	
	if(data.obj.qnodeList&&!SCFUtils.isEmpty(data.obj.qnodeList))
		SCFUtils.loadGridData('queryNodeDg',SCFUtils.parseGridData(data.obj.qnodeList), false);
	
}


function onSaveBtnClick() {
	var data =  SCFUtils.convertArray('mainForm');
	var queryNodeList = SCFUtils.getGridData('queryNodeDg');
	var grid={};
	if(queryNodeList&&!SCFUtils.isEmpty(queryNodeList)){
		grid.qnodeList = SCFUtils.json2str(queryNodeList);
	}
	
	$.extend(data,grid);
	return data;
}
function onNextBtnClick() {
	return onSaveBtnClick();
}

function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data.obj);
	if(data.obj.qnodeList&&!SCFUtils.isEmpty(data.obj.qnodeList))
		$('#queryNodeDg').datagrid('loadData',data.obj.qnodeList);
	ajaxSysRefNo();
}

function ajaxQueryNodeTable() {
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
			width : 70
		}, {
			field : 'doname',
			title : 'doname',
			hidden: true
		} , {
			field : 'type',
			title : 'type',
			hidden: true
		} , {
			field : 'cascadeevent',
			title : 'cascadeevent',
			hidden: true
		} , {
			field : 'fields',
			title : 'fields',
			hidden: true
		} , {
			field : 'condition',
			title : 'condition',
			hidden: true
		} , {
			field : 'orderby',
			title : 'orderby',
			hidden: true
		} , {
			field : 'asc',
			title : 'asc',
			hidden: true
		} , {
			field : 'sql',
			title : 'sql',
			hidden: true
		} , {
			field : 'bybu',
			title : 'bybu',
			hidden: true
		} , {
			field : 'lockcheck',
			title : 'lockcheck',
			hidden: true
		} , {
			field : 'params',
			title : 'params',
			hidden: true
		} , {
			field : 'tablename',
			title : 'tablename',
			hidden: true
		}  ] ]
	};
	$('#queryNodeDg').datagrid(options);
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
	row.op ='add';
	var options = {
		reqid : 'I_P_000035',
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
	row.op ='edit';
	if (row) {
		var options = {
			reqid : 'I_P_000035',
			data : {
				'row' : row
			},
			onSuccess : editSuccess
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteRow() {
	var row = $('#testTable').datagrid('getSelected');
	var rowIndex = $('#testTable').datagrid('getRowIndex',row);
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

/*新建流水号*/
function newId(){
	var options={};
	options.data = {
			refName: 'QueryRef',
			refField:'id'
				};
	options.force=true;
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
function ajaxSysRefNo(){
	if('PARAADD'==SCFUtils.OPTSTATUS){
	var newsysRefNo=SCFUtils.uuid(32);
	$('#sysRefNo').val(newsysRefNo);
	}
}
/*QueryNode的操作*/
function addQueryNode() {
	var id="N0000000";
	var queryNodeId="";
	
	var row = {};
	row.index = $('#queryNodeDg').datagrid('getRows').length;
	var lengths=row.index;
	if(""==lengths || 0==lengths )
	{
		queryNodeId=id+"1";
	}
	else
	{
		lengths=parseInt(lengths)+1;
		queryNodeId=id+lengths;
	}
	
	row.op ='add';
	row.queryNodeId=queryNodeId;
	var options = {
		title : '新增QueryNode',
		reqid : 'I_P_000035',
		data : {
			'row' : row,
			cacheType :'non'
		},
		onSuccess : addQueryNodeSuccess
	};
	SCFUtils.getData(options);
}

function addQueryNodeSuccess(data){
	$('#queryNodeDg').datagrid('insertRow', {
		index:data.index,
		row : data
	});
}
function editQueryNode() {
	var selectRow = $('#queryNodeDg').datagrid('getSelected');
	var rowIndex = $('#queryNodeDg').datagrid('getRowIndex',selectRow);
	if (selectRow) {
		var rows=$('#queryNodeDg').datagrid('getRows');//获取所有当前加载的数据行
		var data=rows[rowIndex];
		
		var row = {};
		//row.index = $('#pageDg').datagrid('getRows').length;
		row.op ='edit';
		row.data = data;
		$.extend(row,data);
		var options = {
			title : '修改QueryNode',
			reqid : 'I_P_000035',
			data : {
				'row' : row,
				cacheType :'non'
			},
			onSuccess : editQueryNodeSuccess
		
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editQueryNodeSuccess(data){
	var row = $('#queryNodeDg').datagrid('getSelected');
	var rowIndex = $('#queryNodeDg').datagrid('getRowIndex', row);
	$.extend(row,{
		id : data.id,
		name : data.name,
		desc : data.desc,
		pagetype : data.component,
		doname : data.doname,
		type : data.type,
		cascadeevent : data.cascadeevent,
		fields : data.fields,
		condition : data.condition,
		orderby : data.orderby,
		asc : data.asc,
		sql : data.sql,
		bybu : data.bybu,
		lockcheck : data.lockcheck,
		params : data.params,
		tablename : data.tablename
	});
	$('#queryNodeDg').datagrid('refreshRow',rowIndex);
}

function delQueryNode() {
	var row = $('#queryNodeDg').datagrid('getSelected');
	var rowIndex = $('#queryNodeDg').datagrid('getRowIndex',row);
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				$('#queryNodeDg').datagrid('deleteRow', rowIndex);
			}
		});
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
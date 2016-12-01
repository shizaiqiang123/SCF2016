function initTooltip() {
	var options = {
		display : 'block',
		content : ''
	};
	return options;
}
function pageOnInt() {
	ajaxLogicNodeTable();
}

function pageOnFPLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	if (data.obj.account && !SCFUtils.isEmpty(data.obj.account))
		SCFUtils.loadGridData('logicNodeDg', SCFUtils
				.parseGridData(data.obj.account), true);
}
function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	if (data.obj.account && !SCFUtils.isEmpty(data.obj.account))
		SCFUtils.loadGridData('logicNodeDg', SCFUtils
				.parseGridData(data.obj.account), false);
}

function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('mainForm');
	var grid = {};
	var account = SCFUtils.getGridData('logicNodeDg');	
	grid.account = SCFUtils.json2str(account);
	$.extend(mainData, grid);
	return mainData;
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
	if (data.obj.account && !SCFUtils.isEmpty(data.obj.account)) {
		$('#logicNodeDg').datagrid('loadData', data.obj.account);
	}
//	ajaxSysRefNo();
	queryAccountInfo();
}

function ajaxLogicNodeTable() {
	var options = {
		toolbar : '#toolbar',
		idField :  'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'accType',
			title : '会计科目类型',
			width : '33.3%'
		}, {
			field : 'accNm',
			title : '会计科目名称',
			width : '33.3%'
		}, {
			field : 'accNo',
			title : '会计科目编号',
			width : '33.3%'
		}, {
			field : 'sysRefNo',
			title : '会计科目类型',
			width : '33.3%',
			hidden : true
		}, {
			field : 'oprateTm',
			title : '操作时间',
			width : '33.3%',
			hidden : true
		}, {
			field : 'accId',
			title : '科目文件Id',
			width : '33.3%',
			hidden : true
		}] ]
	};
	$('#logicNodeDg').datagrid(options);
}


/* 生成会计科目文件名称，目前为固定的单一文件，暂时先写死
 * YeQing create on 2016-8-5 
 */
function newId() {
	$('#id').val('Accounting_Root');
}

function ajaxSysRefNo() {
	if ('PARAADD' == SCFUtils.OPTSTATUS) {
		var newsysRefNo = SCFUtils.uuid(32);
		$('#sysRefNo').val(newsysRefNo);
	}
}

/**
 * 查询会计科目
 * @param cntrctNo
 */
function queryAccountInfo(){
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000533',
			accId : 'Accounting_Root'
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				SCFUtils.loadGridData('logicNodeDg', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function addLogicNode() {
    var id = $('#id').val();
    if(id == ''){
    	SCFUtils.alert("请先生成会计科目文件！");
    	return;
    }
	var row = {};
	row.index = $('#logicNodeDg').datagrid('getRows').length;
	row.op = 'add';
	var options = {
		title : "添加科目信息",
		reqid : 'I_P_000201',
		data : {
			'row' : row,
			cacheType : 'non'
		},
		onSuccess : addLogicNodeSuccess
	};
	SCFUtils.getData(options);
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function addLogicNodeSuccess(data) {
	var row = {};
	row.sysRefNo = SCFUtils.uuid(32);
	row.oprateTm = getDate(new Date());
	row.accId = $('#id').val();
	$.extend(data, row);
	$('#logicNodeDg').datagrid('appendRow', data);
	$('#logicNodeDg').datagrid('reload');
}

function editLogicNode() {
	var id = $('#id').val();
	if(id == ''){
	    SCFUtils.alert("请先生成会计科目文件！");
	    return;
	}
	var row = $('#logicNodeDg').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		var options = {
			title : "修改科目信息",
			reqid : 'I_P_000201',
			data : {
				'row' : row
			},
			onSuccess : editLogicNodeSuccess
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}



function editLogicNodeSuccess(data) {
	var row = $('#logicNodeDg').datagrid('getSelected');
	var rowIndex = $('#logicNodeDg').datagrid('getRowIndex', row);
	$('#logicNodeDg').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
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
		SCFUtils.alert("请选择一条数据！");
	}
}
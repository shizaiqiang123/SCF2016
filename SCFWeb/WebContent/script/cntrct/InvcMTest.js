function ajaxBox() {
	var data =  [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	} ];
	$("#busiTp").combobox('loadData', data);
}	
function pageOnInt(data) {
	ajaxBox();
	ajaxSbrTable();
}	
function pageOnLoad(data) {
	SCFUtils.loadForm('invcMForm',data);
}	
function pageOnResultLoad(data) {
	SCFUtils.loadForm('invcMForm',data);
	SCFUtils.loadGridData('sbrTable', SCFUtils.parseGridData(data.obj.sbr), true);// 加载数据并保护表格
}
function pageOnPreLoad(data) {
	SCFUtils.loadForm('invcMForm',data);
	SCFUtils.loadGridData('sbrTable', SCFUtils.parseGridData(data.obj.sbr), true);// 加载数据并保护表格
}
function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('invcMForm',data);
	SCFUtils.loadGridData('sbrTable', SCFUtils.parseGridData(data.obj.sbr), true);// 加载数据并保护表格
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}

function onNextBtnClick() {
	var data = SCFUtils.convertArray('invcMForm');
	var grid = {};
	var sbrgriddata = SCFUtils.getGridData('sbrTable');	
	grid.sbr = SCFUtils.json2str(sbrgriddata);
	$.extend(data,grid);
	return data ;
}

function ajaxSbrTable() {
	var options = {
			//url : SCFUtils.AJAXURL,
			toolbar : '#toolbar1',
			idField :  'poNo',
			rownumbers : true,
			checkOnSelect : true,
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : true,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : [ [ {
				field : 'ck',
				checkbox : true
			},{
				field : 'poNo',
				title : '订单号',
//				hidden:true,
				width : 150
			},{
				field : 'cntrctNo',
				title : '协议号',
				width : 100
			},{
				field : 'buyerId',
				title : '间接客户编号',
				width : 100
			},{
				field  : 'selId',
				title  : '授信客户编号',
				width  : 100,
			}
			] ]
		};
		$('#sbrTable').datagrid(options);
}

function addSbrRow(){
	var row={};
	row.op='add';
	var options = {
		title:'新增关联关系信息',
		reqid : 'I_P_000107',
		height : '370',
		data : {'row' : row},
		onSuccess : addSbrSuccess
	};
	SCFUtils.getData(options);
}

function addSbrSuccess(data){
	$('#sbrTable').datagrid('appendRow', data);
}

function editSbrRow() {
	var row = $('#sbrTable').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title:'修改订单信息',
			reqid : 'I_P_000107',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : editSbrSuccess
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteSbrRow() {
	var rows = $('#sbrTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#sbrTable').datagrid('getAllRowIndex',copyRows[i].poNo);
			            $('#sbrTable').datagrid('deleteRow',index); 
			        }
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editSbrSuccess(data){
	var row = $('#sbrTable').datagrid('getSelected');
	var rowIndex = $('#sbrTable').datagrid('getRowIndex', row);
	$('#sbrTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
}
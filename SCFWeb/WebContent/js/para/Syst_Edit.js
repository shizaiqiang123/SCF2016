function beforeLoad() {
	var sysRefNo = $('#sysRefNo').val();
	var paraId=$('#paraId').val();
	var data = {};
	data.data = {
		sysRefNo : sysRefNo,
		paraId:paraId
	};
	return data;
}
function pageOnInt(){
	//ajaxBox();
	ajaxTable();
	SCFUtils.setTextReadonly('id', true);
}

function onCancelBtnClick() {
	var sysRefNo = $('#sysRefNo').val();
	var paraId=$('#paraId').val();
	return {
		sysRefNo : sysRefNo,
		paraId:paraId
	};
}


function pageOnFPLoad(data){
	//SCFUtils.loadForm('mainForm',data);
	//ajaxBox(data.obj.proterties.paraList);
	SCFUtils.loadForm('mainForm',data.obj);
	if(data.obj.proterties&&data.obj.proterties.paraList&&!SCFUtils.isEmpty(data.obj.proterties.paraList))
		SCFUtils.loadGridData('dg',data.obj.proterties.paraList,false,false);
}

function pageOnResultLoad(data) {
	//SCFUtils.loadForm('mainForm', data);
	//ajaxBox(data.obj.proterties.paraList);
	SCFUtils.loadForm('mainForm',data.obj);
	if(data.obj.proterties&&data.obj.proterties.paraList&&!SCFUtils.isEmpty(data.obj.proterties.paraList))
		SCFUtils.loadGridData('dg',data.obj.proterties.paraList,false,false);
}

function pageOnPreLoad(data) {
	pageOnResultLoad(data);
}

/*function onSaveBtnClick() {
	var data =  SCFUtils.convertArray('mainForm');
	return data;
}
function onNextBtnClick() {
	return onSaveBtnClick();
}*/

function pageOnLoad(data){
	//ajaxBox(data.obj.proterties.paraList);
	SCFUtils.loadForm('mainForm',data.obj);
	if(data.obj.proterties&&data.obj.proterties.paraList&&!SCFUtils.isEmpty(data.obj.proterties.paraList))
		SCFUtils.loadGridData('dg',data.obj.proterties.paraList,false,false);
}

//修改workflowflag的值变成on/off
/*function ajaxBox(obj){
	$.each(obj,function(i,n){
		if('workflowflag'==n.fieldName){
			n.fieldValue=checkWorkflowFlag(n.fieldValue);
		}
	});
	
}
function checkWorkflowFlag(obj){
	if("true"==obj){
		return "on";
	}
	return "off";
}*/


function ajaxTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'fieldName',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, 
		{
			field : 'fieldName',
			title : '属性名称',
			width : 170
		}, {
			field : 'fieldValue',
			title : '属性值',
			width : 270
		} ] ]
	};
	$('#dg').datagrid(options);
}

/*function addRecord() {
	var row = {};
	row.op ='add';
	var options = {
		reqid : 'I_P_000048',
		data : {
			'row' : row,
			cacheType :'non'
		},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);
}

function addSuccess(data){
	var options={
			reqid :'I_P_000049',
			data :$.extend(data,{
				_opTp:'paraAdd',
				cacheType :'non',
				id:$('#paraId').val()
			}),
			onSuccess : function(backData){
				$('#dg').datagrid('appendRow',data);
			}
	};
	SCFUtils.getData(options);
}*/

function editRecord() {
	var selectRow = $('#dg').datagrid('getSelected');
	//var rowIndex = $('#dg').datagrid('getRowIndex',selectRow);
	if (selectRow) {
		//var rows=$('#dg').datagrid('getRows');//获取所有当前加载的数据行
		//var data=rows[rowIndex];
		var row = {};
		row.op ='edit';
		row.data = selectRow;
		$.extend(row,selectRow);
		var options = {
			title:'系统属性',
			reqid : 'I_P_000048',
			data : {
				'row' : row,
				cacheType :'non'
			},
			onSuccess : editSuccess
		
		};
		SCFUtils.getData(options);
	} else {
		alert("请选择一条数据！");
	}
}

function editSuccess(data){
	var options={
			reqid :'I_P_000049',
			data :$.extend(data,{
				_opTp:'paraEdit',
				cacheType :'non',
				id:$('#paraId').val()
			}),
			onSuccess : function(backData){
				var row = $('#dg').datagrid('getSelected');
				var rowIndex = $('#dg').datagrid('getRowIndex', row);
				$('#dg').datagrid('updateRow', {
					index : rowIndex,
					row : data
				});
			}
	};
	SCFUtils.getData(options);
	
}

/*function delRecord() {
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				var rowIndex = $('#dg').datagrid('getRowIndex',row);
				$('#dg').datagrid('deleteRow', rowIndex);
			}
		});
	} else {
		alert("请选择一条数据！");
	}
}*/
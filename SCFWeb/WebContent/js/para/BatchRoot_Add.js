function beforeLoad() {
	var sysRefNo = $('#sysRefNo').val();
	var data = {};
	data.data = {
		sysRefNo : sysRefNo,
		paraId : sysRefNo
	}
	return data;
}

function pageOnInt() {
	SCFUtils.setTextReadonly("id", true);
	SCFUtils.setTextReadonly("bu", true);
	ajaxBatchTable();
}

function onCancelBtnClick() {
	var sysRefNo = $('#sysRefNo').val();
	return {
		sysRefNo : sysRefNo,
		paraId : sysRefNo
	};
}

function pageOnFPLoad(data){
	SCFUtils.loadForm('mainForm',data);
}

function onSaveBtnClick() {
	var data = SCFUtils.convertArray('mainForm');
	var batchList = SCFUtils.getGridData('batchDg');
	var grid={};
	if(batchList&&!SCFUtils.isEmpty(batchList)){
		grid.batch = SCFUtils.json2str(batchList);
	}
	$.extend(data,grid);
	return data;
}

function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data.obj);
	if(data.obj.batch&&!SCFUtils.isEmpty(data.obj.batch)){
		SCFUtils.loadGridData('batchDg', data.obj.batch, false, false)	}
}

function ajaxBatchTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'id',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, 
		{
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
		}] ]
	};
	$('#batchDg').datagrid(options);
}

function addBatch() {
	var row = {};
	row.op ='add';
	var options = {
		reqid : 'I_P_000061',
		data : {
			'row' : row,
			cacheType :'non'
		},
		onSuccess : addBatchSuccess
	};
	SCFUtils.getData(options);
}

function addBatchSuccess(data){
	var options={
			reqid :'I_P_000064',
			data :$.extend(data,{
				_opTp:'paraAdd',
				cacheType :'non',
				id:$('#sysRefNo').val(),
				bu:$('#bu').val()
			}),
			onSuccess : function(backData){
//				$('#batchDg').datagrid('insertRow', {
//					index:1,
//					row : {
//						id:data.paraId,
//						name:data.paraName,
//						desc:data.paraDesc
//					}
//				});
//				$('#batchDg').datagrid('reload');
				$('#batchDg').datagrid('appendRow',{
					id:data.paraId,
					name:data.paraName,
					desc:data.paraDesc
				});
			}
	};
	SCFUtils.getData(options);
}

function delBatch() {
	var row = $('#batchDg').datagrid('getSelected');
	var data = $('#batchDg').datagrid("getSelected") ;
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				var rowIndex = $('#batchDg').datagrid('getRowIndex',row);
				$('#batchDg').datagrid('deleteRow', rowIndex);
				
				var options={
						reqid :'I_P_000064',
						data :$.extend(data,{
							paraId:row.id ,
							paraName:row.name,
							_opTp:'paraEdit',
							cacheType :'non',
							id:$('#sysRefNo').val(),
							bu:$('#bu').val()
						})
				};
				SCFUtils.getData(options);
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
 
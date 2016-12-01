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
	ajaxESBServiceTable();
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
	var batchList = SCFUtils.getGridData('esbserviceDg');
	var grid={};
	if(esbserviceList&&!SCFUtils.isEmpty(esbserviceList)){
		grid.esbservice = SCFUtils.json2str(esbserviceList);
	}
	$.extend(data,grid);
	return data;
}

function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data.obj);
	if(data.obj.esbserviceList&&!SCFUtils.isEmpty(data.obj.esbserviceList)){
		SCFUtils.loadGridData('esbserviceDg', data.obj.esbserviceList, false, false)	}
}

function ajaxESBServiceTable() {
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
	$('#esbserviceDg').datagrid(options);
}

function addEsbservice() {
	var row = {};
	row.op ='add';
	var options = {
		reqid : 'I_P_000065',
		data : {
			'row' : row,
			cacheType :'non'
		},
		onSuccess : addEsbserviceSuccess
	};
	SCFUtils.getData(options);
}

function addEsbserviceSuccess(data){
	var options={
			reqid :'I_P_000066',
			data :$.extend(data,{
				_opTp:'paraAdd',
				cacheType :'non',
				id:$('#sysRefNo').val()
			}),
			onSuccess : function(backData){
//				$('#esbserviceDg').datagrid('insertRow', {
//					index:1,
//					row : {
//						id:data.paraId,
//						name:data.paraName,
//						desc:data.paraDesc
//					}
//				});
//				$('#esbserviceDg').datagrid('reload');
				$('#esbserviceDg').datagrid('appendRow',{
					id:data.paraId,
					name:data.paraName,
					desc:data.paraDesc
				});
			}
	};
	SCFUtils.getData(options);
}

function delEsbservice() {
	var row = $('#esbserviceDg').datagrid('getSelected');
	var data = $('#esbserviceDg').datagrid("getSelected") ;
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				var rowIndex = $('#esbserviceDg').datagrid('getRowIndex',row);
				$('#esbserviceDg').datagrid('deleteRow', rowIndex);
				
				var options={
						reqid :'I_P_000066',
						data :$.extend(data,{
							paraId:row.id ,
							paraName:row.name,
							_opTp:'paraEdit',
							cacheType :'non',
							id:$('#sysRefNo').val()
						})
				};
				SCFUtils.getData(options);
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
 
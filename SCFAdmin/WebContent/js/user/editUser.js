function beforeLoad() {
	var sysRefNo = $('#sysRefNo').val();
	// var sysRefNo=SCFUtils.SYSUSERREF;
	var data = {};
	data.data = {
		sysRefNo : sysRefNo
	};
	return data;
}
function onCancelBtnClick() {
	var sysRefNo = $('#sysRefNo').val();
	return {
		sysRefNo : sysRefNo
	};
}

function ajaxBox() {
	SCFUtils.setTextReadonly('userId', true);
	SCFUtils.setTextReadonly('userNm', true);
//	SCFUtils.setDateboxReadonly('DueDt', true);
//	SCFUtils.setDateboxReadonly('EditDt', true);
	SCFUtils.setTextReadonly('title', true);

	var sysRefNo=$("#sysRefNo").val();
	var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId:'Q_P_000158',
				userId:sysRefNo
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#roleIdBox').combobox("loadData",data.rows);
					$('#roleIdBox').combobox("select",data.rows[0].roleNm);
				}
			}
		};
		SCFUtils.ajax(option);

}
function pageOnInt(){
	ajaxBox();
	ajaxComfTable();
	ajaxCombTable();
}
function pageOnPreLoad(data){
	ajaxBox();
	SCFUtils.loadForm('userAddForm', data);
	if(data.obj.comfList&&!SCFUtils.isEmpty(data.obj.comfList)){
		SCFUtils.loadGridData('comfDg',SCFUtils.parseGridData(data.obj.comfList), false);
//		$('#roleIdBox').combobox("select",data.roleId);
	}
	if(data.obj.combList&&!SCFUtils.isEmpty(data.obj.combList)){
		SCFUtils.loadGridData('combDg',SCFUtils.parseGridData(data.obj.combList), false);
//		$('#roleIdBox').combobox("select",data.roleId);
	}
}
function uploadBust(){
	var fileList = {};
	var param = {
		data : {
			'reqType' : 'fileImportManager',
			'fileList' : fileList
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data)) {
				Bustadd(data.obj.filePath);
			}
		}
	};
	SCFUtils.upload(param);
}
function Bustadd(bust){
	$('#bust').attr("src",bust);
}
function pageOnLoad(data) {
	var options = {};
	options.data = {
		refName : 'UserRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	SCFUtils.loadForm('userAddForm', data);
//	var sysRefNo=$("#sysRefNo").val();
	
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId:'Q_P_000210',
				userId: $('#userId').val()
			},
			callBackFun : function(data) {
				if (data.success&&!SCFUtils.isEmpty(data.rows)) {
					$.each(data.rows,function(i,n){
						$('#comfDg').datagrid('appendRow',{
							userId: n.userId,
							funId : n.funId,
							funNm : n.funNm,
							funPath : n.funPath,
							userFunType:n.userFunType,
							sysRefNo:SCFUtils.uuid(8)
						});
					});
//					$('#comfDg').datagrid('loadData',data.rows);
				}
			}
		};
		SCFUtils.ajax(opt);
		var option = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId:'Q_P_000301',
					userId: $('#userId').val()
				},
				callBackFun : function(data) {
					if (data.success&&!SCFUtils.isEmpty(data.rows)) {
						$.each(data.rows,function(i,n){
							$('#combDg').datagrid('appendRow',{
								userId: n.userId,
								funId : n.funId,
								funNm : n.funNm,
								funPath : n.funPath,
								userFunType:n.userFunType,
								userQueryId:n.userQueryId,
								sysRefNo:SCFUtils.uuid(8)
							});
						});
//						$('#comfDg').datagrid('loadData',data.rows);
					}
				}
			};
			SCFUtils.ajax(option);
//	if(data.obj.pageList&&!SCFUtils.isEmpty(data.obj.pageList))
//		$('#pageDg').datagrid('loadData',data.obj.pageList);
}

function checkComfInfo(funId){
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId:'Q_P_000210',
				funId: funId
			},
			callBackFun : function(data) {
				if (data.success&&!SCFUtils.isEmpty(data)) {
					return data.row[0];
				}else{
					return null;
				}
			}
		};
		SCFUtils.ajax(opt);
}
function checkCombInfo(funId){
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId:'Q_P_000301',
				funId: funId
			},
			callBackFun : function(data) {
				if (data.success&&!SCFUtils.isEmpty(data)) {
					return data.row[0];
				}else{
					return null;
				}
			}
		};
		SCFUtils.ajax(opt);
}
function pageOnResultLoad(data)
{
	SCFUtils.loadForm('userAddForm', data);
	if(data.obj.comfList&&!SCFUtils.isEmpty(data.obj.comfList))
		SCFUtils.loadGridData('comfDg',SCFUtils.parseGridData(data.obj.comfList), true);
	if(data.obj.combList&&!SCFUtils.isEmpty(data.obj.combList))
		SCFUtils.loadGridData('combDg',SCFUtils.parseGridData(data.obj.combList), true);

}

function onNextBtnClick() {
	return onSaveBtnClick();	
}
function onSaveBtnClick() {
	var data =  SCFUtils.convertArray('userAddForm');
	var comfList = SCFUtils.getGridData('comfDg');
	var combList = SCFUtils.getGridData('combDg');
	var grid={};
	if(comfList&&!SCFUtils.isEmpty(comfList)){
		grid.comfList = SCFUtils.json2str(comfList);
	}
	if(combList&&!SCFUtils.isEmpty(combList)){
		grid.combList = SCFUtils.json2str(combList);
	}
	$.extend(data,grid);
	return data;
}
function ajaxComfTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'funId',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, 
		{
			field : 'userId',
			title : '用户Id',
			hidden:true,
			width : 70
		},
		{
			field : 'funId',
			title : '功能编号',
			width : '25%'
		}, {
			field : 'funNm',
			title : '功能名称',
			width : '25%'
		}, {
			field : 'funPath',
			title : '功能路径',
			width : '25%'
		}, {
			field : 'userFunType',
			title : '用户功能类型',
////			hidden:true,
//			value:"1",
			width : '25%'
		} ] ]
	};
	$('#comfDg').datagrid(options);
}
function ajaxCombTable() {
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'funId',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, 
		{
			field : 'userId',
			title : '用户Id',
			hidden:true,
			width : 70
		},
		{
			field : 'funId',
			title : '功能编号',
			width : '20%'
		}, {
			field : 'funNm',
			title : '功能名称',
			width : '20%'
		}, {
			field : 'funPath',
			title : '功能路径',
			width : '20%'
		}, {
			field : 'userQueryId',
			title : '用户查询编号',
			width : '20%'
		} 
		, {
			field : 'userFunType',
			title : '用户功能类型',
//			hidden:true,
//			value:"2",
			width : '20%'
		}] ]
	};
	$('#combDg').datagrid(options);
}
function deleteComf(){
	var row = $('#comfDg').datagrid('getSelected');
	if (row) {
		SCFUtils.confirm("确定删除该行数据吗？",function(){
			var rowIndex = $('#comfDg').datagrid('getRowIndex',row);
			$('#comfDg').datagrid('deleteRow', rowIndex);
		});
		} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
function deleteComb(){
		var row = $('#combDg').datagrid('getSelected');
	if (row) {
		SCFUtils.confirm("确定删除该行数据吗？",function(){
			var rowIndex = $('#combDg').datagrid('getRowIndex',row);
			$('#combDg').datagrid('deleteRow', rowIndex);
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
function addComf(){
	var selectRow = $('#comfDg').datagrid('getData');
	if(selectRow.total>=6)
		{
		SCFUtils.alert("常用功能上限为六个！");
		return false;
		}
//	queryRoleType();
	var row = {};
	row.op ='add';
	row.userRoleType=$('#userRoleType').val();
	row.userTp=$('#userTp').val();
	row.userFunType="1";
//	row.userId=$('#userId').val();
	var options = {
		title:'常用功能信息',
		reqid : 'I_P_000053',
		data : {
			'row' : row,
			userRoleType:$('#userRoleType').val(),
			userTp:$('#userTp').val(),
			userId:$('#userId').val(),
			userFunType:"1",
			cacheType :'non'
		},
		onSuccess : addComfSuccess
	};
	SCFUtils.getData(options);
}
function addComb(){
	var selectRow = $('#combDg').datagrid('getData');
	if(selectRow.total>=2)
		{
		SCFUtils.alert("业务数据展示上限为二个！");
		return false;
		}
//	queryRoleType();
	var row = {};
	row.op ='add';
	row.userRoleType=$('#userRoleType').val();
	row.userTp=$('#userTp').val();
	row.userFunType="2";
//	row.userId=$('#userId').val();
	var options = {
		title:'业务数据展示信息',
		reqid : 'I_P_000095',
		data : {
			'row' : row,
			userRoleType:$('#userRoleType').val(),
			userTp:$('#userTp').val(),
			userId:$('#userId').val(),
			userFunType:"2",
			cacheType :'non'
		},
		onSuccess : addCombSuccess
	};
	SCFUtils.getData(options);
}
function editComf(){
		var selectRow = $('#comfDg').datagrid('getSelected');
		if (selectRow) {
			var row = {};
			row.op ='edit';
			row.data = selectRow;
			row.userFunType="1";
			var options = {
				title:'常用功能信息',
				reqid : 'I_P_000053',
				data : {
					'row' : row,
					cacheType :'non'
				},
				onSuccess : editComfSuccess
			
			};
			SCFUtils.getData(options);
		} else {
			SCFUtils.alert("请选择一条数据！");
		}
}
function editComb(){
	var selectRow = $('#combDg').datagrid('getSelected');
	if (selectRow) {
		var row = {};
		row.op ='edit';
		row.data = selectRow;
		row.userFunType="2";
		var options = {
			title:'业务数据展示信息',
			reqid : 'I_P_000095',
			data : {
				'row' : row,
				cacheType :'non'
			},
			onSuccess : editCombSuccess
		
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
function deleteComfSuccess(data){
	var row = $('#comfDg').datagrid('getSelected');
	var rowIndex = $('#comfDg').datagrid('getRowIndex',row);
	$('#comfDg').datagrid('deleteRow',rowIndex);
}
function deleteCombSuccess(data){
	var row = $('#combDg').datagrid('getSelected');
	var rowIndex = $('#combDg').datagrid('getRowIndex',row);
	$('#combDg').datagrid('deleteRow',rowIndex);
}
function addComfSuccess(data){
	if(dataComfDg(data)){
		var row={};
		$.extend(row,{
			userId : data.userId,
			funId  : data.funId,
			funNm  : data.funNm,
			funPath: data.funPath,
			sysRefNo:SCFUtils.uuid(8),
			userFunType:data.userFunType
		});
		$('#comfDg').datagrid('appendRow',row);
	}else{
		SCFUtils.alert("该功能已存在！");
	}
	
}
function addCombSuccess(data){
	if(dataComfDg(data)){
		var row={};
		$.extend(row,{
			userId : data.userId,
			funId  : data.funId,
			funNm  : data.funNm,
			funPath: data.funPath,
			userQueryId:data.userQueryId,
			sysRefNo:SCFUtils.uuid(8),
			userFunType:data.userFunType
		});
		$('#combDg').datagrid('appendRow',row);
	}else{
		SCFUtils.alert("该功能已存在！");
	}
	
}
function editComfSuccess(data){
	if(dataComfDg(data)){
	var row = $('#comfDg').datagrid('getSelected');
	var rowIndex = $('#comfDg').datagrid('getRowIndex', row);
	if(!SCFUtils.isEmpty(data)){
		$.extend(row,{
			userId : data.userId,
			funId  : data.funId,
			funNm  : data.funNm,
			funPath: data.funPath,
			userFunType:data.userFunType
		});
	}
	$('#comfDg').datagrid('refreshRow',rowIndex);
	}else{
		SCFUtils.alert("该功能已存在！");
	}
}
function editCombSuccess(data){
	if(dataCombDg(data)){
	var row = $('#combDg').datagrid('getSelected');
	var rowIndex = $('#combDg').datagrid('getRowIndex', row);
	if(!SCFUtils.isEmpty(data)){
		$.extend(row,{
			userId : data.userId,
			funId  : data.funId,
			funNm  : data.funNm,
			funPath: data.funPath,
			userQueryId:data.userQueryId,
			userFunType:data.userFunType
		});
	}
	$('#combDg').datagrid('refreshRow',rowIndex);
	}else{
		SCFUtils.alert("该功能已存在！");
	}
}
function dataComfDg(data){
	var rows=$('#comfDg').datagrid('getRows');
	if(!SCFUtils.isEmpty(rows)){
		for(var i=0;i<rows.length;i++){
			if(rows[i].funId == data.funId){
				return false;
			}
		}
		return true;
	}
	return true;
}
function dataCombDg(data){
	var rows=$('#combDg').datagrid('getRows');
	if(!SCFUtils.isEmpty(rows)){
		for(var i=0;i<rows.length;i++){
			if(rows[i].funId == data.funId){
				return false;
			}
		}
		return true;
	}
	return true;
}
//function queryRoleType(){
//	var sysRefNo=$('#sysRefNo').val();
//	var option = {
//			url : SCFUtils.AJAXURL,
//			data : {
//				queryId:'Q_P_000258',
//				sysRefNo: sysRefNo
//			},
//			callBackFun : function(data) {
//				if (data.success) {
//					debugger;
//				}
//			}
//		};
//		SCFUtils.ajax(option);
//}

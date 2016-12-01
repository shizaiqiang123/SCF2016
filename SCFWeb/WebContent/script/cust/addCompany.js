function pageOnInt() {
	ajaxTable();
	SCFUtils.setTextReadonly("sysRefNo", true);
}

function pageOnFPLoad(data){
	SCFUtils.loadForm('mainForm',data);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	SCFUtils.loadGridData('accountDg',SCFUtils.parseGridData(data.obj.accountList), true);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	SCFUtils.loadGridData('accountDg',SCFUtils.parseGridData(data.obj.accountList), false);
}

function queryAcNo(){
	var acOwnerid=$('#sysRefNo').val();
	if(!SCFUtils.isEmpty(acOwnerid)){
		var option={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000228',
					acOwnerid:acOwnerid
				},
				callBackFun:function(data){
					if(!SCFUtils.isEmpty(data.rows)){
						SCFUtils.loadGridData('accountDg',data.rows);	
					}
				}
		};	
		SCFUtils.ajax(option);
	}
}

function ajaxSysRefNo(){
	if('ADD'==SCFUtils.OPTSTATUS){
		var options={};
		options.data = {
				refName: 'FacNo',
				refField:'sysRefNo'
					};
		SCFUtils.getRefNo(options);
	}
}

function checkDataGrid(){
	var flag=false;
	var data = $('#accountDg').datagrid('getData');
	if(data.total==0){
		SCFUtils.alert('请添加账号信息！');
		flag=true;
	}
	return flag;
}

function onNextBtnClick() {
	if(checkDataGrid()){
		return;
	}
	$('#acOwnerid').val($('#sysRefNo').val());
	var data =  SCFUtils.convertArray('mainForm');
	var accountList = SCFUtils.getGridData('accountDg');
	var grid={};
	grid.accountList = SCFUtils.json2str(accountList);
	$.extend(data,grid);
	return data;
}

function pageOnLoad(data){
	SCFUtils.loadForm('mainForm',data.obj);
	if(data.obj.accountList&&!SCFUtils.isEmpty(data.obj.accountList))
		$('#accountDg').datagrid('loadData',data.obj.accountList);
	ajaxSysRefNo();
	queryAcNo();
}

function ajaxTable() {
	var options = {
		toolbar : '#toolbar',
		idField :  'sysRefNo',
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
			field : 'acBkNm',
			title : '开户银行',
			width : 70
		}, {
			field : 'acNo',
			title : '账号',
			width : 70
		}, {
			field : 'acNm',
			title : '户名',
			width : 70
		}, {
			field : 'acOwnerid',
			title : 'acOwnerid',
			hidden : true
		}, {
			field : 'sysRefNo',
			title : 'sysRefNo',
			hidden : true
		}, {
			field : 'acTp',
			title : 'acTp',
			hidden : true
		}] ]
	};
	$('#accountDg').datagrid(options);
}

function addInfo() {
	var row = {};
	row.op ='add';
	row.acOwnerid=$('#sysRefNo').val();
	var options = {
		title:'新增账号信息',
		reqid : 'I_P_000077',
		height : '450',
		data : {
			'row' : row,
			cacheType :'non'
		},
		onSuccess : addInfoSuccess
	};
	SCFUtils.getData(options);
}

function addInfoSuccess(data){
	$('#accountDg').datagrid('insertRow', {
		index:data.index,
		row : data
	});
//	 $('#pageDg').datagrid('reload');
}

function editInfo() {
	var selectRow = $('#accountDg').datagrid('getSelected');
	var rowIndex = $('#accountDg').datagrid('getRowIndex',selectRow);
	if (selectRow) {
		var rows=$('#accountDg').datagrid('getRows');//获取所有当前加载的数据行
		var data=rows[rowIndex];
		
		var row = {};
		//row.index = $('#pageDg').datagrid('getRows').length;
		row.op ='edit';
		row.data = data;
		$.extend(row,data);
		var options = {
			title:'修改账号信息',
			reqid : 'I_P_000077',
			height : '450',
			data : {
				'row' : row,
				cacheType :'non'
			},
			onSuccess : editInfoSuccess
		
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editInfoSuccess(data){
	var row = $('#accountDg').datagrid('getSelected');
	var rowIndex = $('#accountDg').datagrid('getRowIndex', row);
	$.extend(row,{
		acBkNm : data.acBkNm,
		acNo : data.acNo,
		acNm : data.acNm,
		acOwnerid : data.acOwnerid,
		sysRefNo : data.sysRefNo
	});
	$('#accountDg').datagrid('refreshRow',rowIndex);
}

function deleteInfo() {
	var row = $('#accountDg').datagrid('getSelected');
	if (row) {
		SCFUtils.confirm("确定删除该行数据吗？",function(){
			var rowIndex = $('#accountDg').datagrid('getRowIndex',row);
			$('#accountDg').datagrid('deleteRow', rowIndex);
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

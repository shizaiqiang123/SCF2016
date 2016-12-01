function pageOnInt(data) {
	ajaxTable();
}

function pageOnLoad(data) {
	SCFUtils.loadForm('blackListForm',data);
/*	var options = {};
	options.data = {
		refName : 'TrfRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	$('#trxId').val($('sysRefNo').val());*/

}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('blackListForm',data);
	SCFUtils.loadGridData('blacklistMTable',
	SCFUtils.parseGridData(data.obj.doname), true);// 加载数据并保护表格。
	
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('blackListForm',data);
	SCFUtils.loadGridData('blacklistMTable',
	SCFUtils.parseGridData(data.obj.doname), false);
}

function onSubmitBtnClick() {
	var data = SCFUtils.convertArray('blackListForm');
	var grid = {};
	grid.doname = SCFUtils.json2str(SCFUtils.getGridData('blacklistMTable'));
	$.extend(data, grid);
	return data;
}

function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		// singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			width : 100
		}, {
			field : 'branchNo',
			title : '本机构业务分支机构代码',
			width : 100
		}, {
			field : 'blackName',
			title : '姓名',
			width : 100
		}, {
			field : 'cretType',
			title : '证件类型',
			width : 100,
			formatter:cretTypeFormater
		},{
			field : 'cretCode',
			title : '证件号码',
			width : 100
		},{
			field : 'msgCode',
			title : '信息代码',
			width : 100
		},{
			field : 'msgCreateDate',
			title : '提示信息生成时间',
			width : 100,
			formatter:dateFormater
		}
		] ]
	};
	$('#blacklistMTable').datagrid(options);
}

// 删除一条数据
function deleteRow() {
	var rows = $('#blacklistMTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#blacklistMTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
			            $('#blacklistMTable').datagrid('deleteRow',index); 
			     }
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
	
}

/**
 * 导入
 */
function upload() {
	var invNoList = [];
	var data = {};
	var param ={
		data:$.extend({"templateId":"T0000010","bussType":"1"},data),
		callBackFun:function(data){	
			/*$.each(data.rows, function(i, n){
				$.extend(n,{
					bussType  : '1'
				});
			});*/
			SCFUtils.loadGridData('blacklistMTable', data.rows);
		}
	};
	SCFUtils.upload(param);
}

function onNextBtnClick() {

	var data = SCFUtils.convertArray('blackListForm');
	var grid = {};
	var griddata = $('#blacklistMTable').datagrid('getRows');
	/*$.each(griddata, function(i, n) {
		$('#blacklistMTable').datagrid('updateRow', {
			index : i,
			row : {
				invSts : 'TRF'
			}
		});
	});*/
	griddata = SCFUtils.getGridData('blacklistMTable', false);
	grid.doname = SCFUtils.json2str(griddata);
	$.extend(data, grid);
	return data;
}
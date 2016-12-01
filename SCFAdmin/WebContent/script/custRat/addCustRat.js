function ajaxBox() {
	var data =[ {
		"id" : '0',
		"text" : "贷前"
	}, {
		"id" : '1',
		"text" : "贷后"
	}];
	$("#custRatTp").combobox('loadData', data);
}

function pageOnInt(data) {
	ajaxBox();
	ajaxTable();
	SCFUtils.setTextReadonly('sysRefNo', true);
}


function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
//		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '评级子表流水号',
			width : '33%',
			resizable : true
		}, {
			field : 'ratBaseId',
			title : '评级基础表ID',
			width : '33%',
			resizable : true
		}, {
			field : 'ratName',
			title : '评级内容名称',
			width : '33%',
			resizable : true
		}, {
			field : 'custRatTp',
			title : '评级类别',
			width : '33%',
			resizable : true,
			hidden : true
		} ] ]
	};
	$('#custratDetailMTable').datagrid(options);
}

function pageOnLoad(data) {
		var options = {};
		options.data = {
			refName : 'CustratRef',
			refField : 'sysRefNo'
		};
	SCFUtils.getRefNo(options);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('custRatForm', data);
	SCFUtils.loadGridData('custratDetailMTable', SCFUtils.parseGridData(data.obj.custRat),
			true);// 加载数据并保护表格。
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('custRatForm', data);
	SCFUtils.loadGridData('custratDetailMTable', SCFUtils
			.parseGridData(data.obj.custRat), false);
	$("#custratDetailMTable").datagrid("selectAll",true);
}

function onNextBtnClick() {
	//判断datagrid中没有数据则不能下一步
	var rows=SCFUtils.getGridData("custratDetailMTable");
	if(rows.length<=0){
		SCFUtils.alert("请至少添加一条评级基础信息！");
		return;
	}
	var data = SCFUtils.convertArray('custRatForm');
	var grid = {};
	if (rows && !SCFUtils.isEmpty(rows)) {
		grid.custRat = SCFUtils.json2str(rows);
	}
	$.extend(data, grid);/* 继承 */
	return data;
	
}

//重新加入的添加
function addRow() {
	//判判主页中的评级类型是否为null null不弹窗
	if(!$("#custRatTp").combobox("getValue")){
		SCFUtils.alert("请先选择评级类型!");
		return;
	}
	var row = {};
	row.op = 'add';
	var options = {
		title : '添加评级基础信息',
		reqid : 'I_P_000217',
		data : {
			'row' : row,
			cacheType : 'non'
		},
		onSuccess : addPageSuccess
	};
	SCFUtils.getData(options);
}

function addPageSuccess(data) {
	//data.type = "ADD";
	//检查新增的数据是否已经加载在datagrid中
	var isContains = false;
	var hasRows = SCFUtils.getGridData("custratDetailMTable");
	$.each(hasRows,function(i,u){
		if(u.ratBaseId == data.sysRefNo){
			SCFUtils.alert("此评价基础内容已存在！");
			isContains = true;
		}
	});
	if(isContains)
		return;
	$('#custratDetailMTable').datagrid('insertRow', {
		index : data.index,
		row : {
			sysRefNo : data.ratDtlSysRefNo, 
			ratBaseId : data.sysRefNo,
			ratName : data.ratName,
			custRatTp : $("#custRatTp").combobox("getValue")
		}

	});
}


//删除一条数据
function deleteRow() {
	var row = $('#custratDetailMTable').datagrid('getSelected');
	if (row) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				var rowIndex = $('#custratDetailMTable').datagrid('getRowIndex', row);//得到row这行数据的索引index
				$('#custratDetailMTable').datagrid('deleteRow', rowIndex);
//				SCFUtils.refreshAllRows("custratDetailMTable");// 删除后刷新行记录
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}

}
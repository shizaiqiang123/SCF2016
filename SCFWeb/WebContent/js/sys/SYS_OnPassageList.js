function pageOnInt() {
	ajaxTable();

	var options = {
		title : '查询在途',
		reqid : 'I_S_000002',
		data : {
			cacheType : 'non',
			queryCon : 'onpassageitem'
		},
		onSuccess : loadSuccess
	};
	SCFUtils.getData(options);
}

function loadSuccess(data) {

	if (SCFUtils.isEmpty(data)) {
		SCFUtils.loadGridData('onPassageTable', [], false, true);
		return;
	}
	$.each(data, function(i, n) {
		var reFuncId = n.bussinessData.reFuncId;
		var sysRefNo = n.bussinessData.sysRefNo;
		$.extend(n, {
			reFuncId : reFuncId,
			sysRefNo : sysRefNo
		});
	});

	SCFUtils.loadGridData('onPassageTable', data);
}

function ajaxTable() {
	// 加载表格
	var options = {
		rownumbers : true,
		animate : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		collapsible : true,
		fitColumns : true,
		idField : 'id',
		pagination : true,
		treeField : 'taskName',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'priId',
			title : '工作流编号',
			width : 120
		}, {
			field : 'priNm',
			title : '工作流名称',
			width : 200
		}, {
			field : 'priState',
			title : '工作流状态',
			width : 100
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			width : 100
		}, {
			field : 'priStartTm',
			title : '创建时间',
			width : 100
		} ] ]

	};
	$('#onPassageTable').datagrid(options);
}

function onNextBtnClick() {
	return $('#onPassageTable').datagrid('getSelected');
}

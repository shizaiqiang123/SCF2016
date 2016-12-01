function pageOnInt(){
	ajaxTable();
	
	var options = {
			title:'查询在途',
			reqid:'I_S_000002',
			data:{cacheType:'non',queryCon:'detailWitem'},
			onSuccess:loadSuccess
		};
	SCFUtils.getData(options);
}

function loadSuccess(data) {
	
	if (SCFUtils.isEmpty(data)) {
		SCFUtils.loadGridData('workItemTable', [], false, true);
		return;
	}
	$.each(data, function(i, n) {
		var FunctionId = n.bussinessData.FunctionId;
//		var FunctionNm = queryMenueNm(FunctionId);
		$.extend(n, {
			FunctionId : FunctionId
//			FunctionNm :FunctionNm
		});
	});
	
	SCFUtils.loadGridData('workItemTable', data);
}

//根据菜单Id查询菜单名称
function queryMenueNm(FunctionId) {
	var FunctionNm="";
	if(FunctionId){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000338',
					menuId : FunctionId
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						FunctionNm = data.rows[0].menuName;
					}
				}
			};
			SCFUtils.ajax(options);
	}
	return FunctionNm;

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
		pagination:true,
		idField : 'id',
		treeField : 'taskName',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'itemName',
			title : '工作项描述',
			width : 200
		}, 
//		{
//			field : 'FunctionNm',
//			title : '描述',
//			width : 100
//		}, 
		{
			field : 'startTime',
			title : '创建时间',
			width : 100,
			formatter:dateTimeFormater
		}, {
			field : 'itemId',
			title : '工作项编号',
			width : 120,
			hidden : true
		},{
			field : 'itemState',
			title : '工作项状态',
			width : 100,
			formatter:workItemState
		}, {
			field : 'itemRefNo',
			title : '流水号',
			width : 100,
			hidden : true
		}, {
			field : 'itemId',
			title : '节点',
			width : 100,
			hidden : true
		}, {
			field : 'itemEvent',
			title : '批次号',
			width : 100,
			hidden : true
		},  {
			field : 'itemExecutorId',
			title : '执行人',
			width : 120
		},  {
			field : 'itemPreExecutorId',
			title : '上一步执行人',
			width : 120
		},{
			field : 'preItemName',
			title : '上一步操作',
			width : 100
		}, {
			field : 'currentStep',
			title : '当步操作',
			width : 100,
			hidden : true
		}, {
			field : 'FunctionId',
			title : '下一步操作功能Id',
			width : 100,
			hidden : true
		}, {
			field : 'sysFuncId',
			title : '交易类型',
			width : 100,
			hidden : true
		} ] ]

	};
	$('#workItemTable').datagrid(options);
}
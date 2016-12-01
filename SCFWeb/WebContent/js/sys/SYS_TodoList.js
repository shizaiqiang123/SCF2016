function initToolBar() {
	return [ "entry", "cancel", "logout" ];
}

function pageOnInt() {
	ajaxTable();

	var options = {
		title : '待办事项查询',
		reqid : 'I_S_000002',
		data : {
			cacheType : 'non',
			queryCon : 'workitem'
		},
		onSuccess : loadSuccess
	};
	SCFUtils.getData(options);
}

function loadSuccess(data) {
	if (SCFUtils.isEmpty(data)) {
		SCFUtils.loadGridData('todoTable', [], false, true);
		SCFUtils.alert("您当前没有需要处理的待办任务！");
		return;
	}
	$.each(data, function(i, n) {
		var itemExecutorId = n.itemExecutorId;// 执行人，如果没有，说明是从开始节点传过来的，即上一步操作人是创建人
		if (SCFUtils.isEmpty(itemExecutorId)) {
			// itemExecutorId = queryCreator;
		}
		// var FunctionNm = queryMenueNm(FunctionId);
		$.extend(n, {
			FunctionId : n.bussinessData.FunctionId,
			sysRefNo : n.bussinessData.sysRefNo
		// FunctionNm :FunctionNm
		});
	});
	// $('#todoTable').datagrid('loadData', data);
	SCFUtils.loadGridData('todoTable', data);
}

// 根据菜单Id查询菜单名称
function queryMenueNm(FunctionId) {
	var FunctionNm = "";
	if (FunctionId) {
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
		pagination : true,
		fitColumns : true,
		idField : 'id',
		treeField : 'taskName',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			width : '20%'
		}, {
			field : 'itemName',
			title : '工作项描述',
			width : '20%'
		}, {
			field : 'itemId',
			title : '工作项编号',
			hidden : true
		}, {
			field : 'itemState',
			title : '工作项状态',
			hidden : true
		}, {
			field : 'itemRefNo',
			title : '流水号',
			hidden : true
		}, {
			field : 'itemId',
			title : '节点',
			hidden : true
		}, {
			field : 'itemEvent',
			title : '批次号',
			hidden : true
		}, {
			field : 'itemPreExecutorId',
			title : '上一步执行人',
			width : '13%'
		}, {
			field : 'preItemName',
			title : '上一步操作',
			width : '20%'
		}, {
			field : 'startTime',
			title : '创建时间',
			width : '20%',
			formatter : dateTimeFormater
		}, {
			field : 'currentStep',
			title : '当步操作',
			hidden : true
		}, {
			field : 'FunctionId',
			title : '下一步操作功能Id',
			hidden : true
		}, {
			field : 'sysFuncId',
			title : '交易类型',
			hidden : true
		} ] ]

	};
	$('#todoTable').datagrid(options);
}

// function onNextBtnClick() {
// var data = SCFUtils.getSelectedGridData('todoTable');
// $.extend(data, {
// sysFuncId : 'F_P_TEST_0003',
// reqPageType : 'initlize',
// sysFuncType : 'CE'
// });
//
// data.workflowInfo = SCFUtils.json2str(workflow);
// return data;
// }

function checkoutSuccess() {
}

function onEntryBtnClick() {
	var griddata = SCFUtils.getSelectedGridData('todoTable').rows0;
	// var itemId = griddata.itemId;
	// var options = {
	// title:'待办事项查询',
	// reqid:'I_S_000002',
	// data:{cacheType:'non',queryCon:'workitem',queryType:'checkOut',itemId:itemId},
	// onSuccess:checkoutSuccess
	// };
	// SCFUtils.getData(options);

	/*
	 * var FunctionId = griddata.FunctionId; var FunctionNm =
	 * griddata.FunctionNm; SCFUtils.entry(FunctionId, FunctionNm);
	 */

	var sysRefNo = griddata.bussinessData.sysRefNo;
	var sysEventTimes = griddata.bussinessData.sysEventTimes;
	var funId = griddata.FunctionId;
	var sysOrgnFuncId = griddata.bussinessData.sysOrgnFuncId;
	var funPath = "";
	funPathBox(funId, funPath);
	funPath = $('#funPath').val();
	var data = {};
	data.sysRefNo = sysRefNo;
	data.sysEventTimes = sysEventTimes;
	if (!SCFUtils.isEmpty(sysOrgnFuncId)) {
		data.sysOrgnFuncId = sysOrgnFuncId;
		data.sysFuncId = sysOrgnFuncId;
	}
	// data.FunctionId = FunctionId;
	SCFUtils.entry(funId, funPath, "", data);

	// var rows = $('#searchTable').datagrid('getRows');
	// var row = rows[index];
	// var data = {};//模拟原始交易的catalog数据
	// data.sysRefNo = row.cntrctNo;
	// data.sysBusiUnit = row.sysBusiUnit;
	// data.busiTp = 0;
	//
	// SCFUtils.entry('F_P_000316', '应收款融资 > 融资业务 >融资申请','entry',data);
	/*
	 * var data = {}; $.extend(data,{ sysFuncId:griddata.nextStep, //
	 * funcType:'FP', reqPageType : 'initlize', entryType:'workflow' });
	 * $.extend(griddata,{ sysFuncId:griddata.nextStep,
	 * sysOrgnFuncId:griddata.currentStep // funcType:'FP',
	 * 
	 * }); data.workflowInfo = SCFUtils.json2str(griddata); return data;
	 */
}

function funPathBox(funId, funPath) {
	if (funId == null) {
		return;
	}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000217',
			menuId : funId
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if (funPath != "") {
					if (!SCFUtils.isEmpty(data.rows[0].menuDisplayNm))
						funPath = data.rows[0].menuDisplayNm + ">" + funPath;
					else
						funPath = data.rows[0].menuName + ">" + funPath;
				} else {
					if (!SCFUtils.isEmpty(data.rows[0].menuDisplayNm))
						funPath = data.rows[0].menuDisplayNm;
					else
						funPath = data.rows[0].menuName;
				}
				if (data.rows[0].menuParentid != null
						&& data.rows[0].menuParentid != data.rows[0].menuId) {
					funPathBox(data.rows[0].menuParentid, funPath);
				} else {
					$('#funPath').val(funPath);
				}

			}
		}
	};
	SCFUtils.ajax(options);

}

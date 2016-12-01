function ignoreToolBar() {

}

function pageLoad(win) {
	var loanId = win.getData("loanId");
	$('#loanId').val(loanId);
	var data = {
		'loanId' : loanId,
		cacheType : 'non'
	};
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable();
	loadTable(data);
}

// 根据还款流水号从费用表查询费用
function queryCurrFinCost(sysRefNo) {
	var currFinCost = 0;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000286',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				currFinCost = data.rows[0].currFinCost;
			}
		}
	};
	SCFUtils.ajax(options);
	return currFinCost;
}

function loadTable(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : data,
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					var currFinCost = queryCurrFinCost(n.sysRefNo);// 利率
					$.extend(n, {
						currFinCost : currFinCost
					});
				});
				SCFUtils.loadGridData('dg', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

// 能否直接传target
function doSave(win) {
	win.close();
}

function ajaxTable() {
	// 加载表格
	$('#dg').datagrid({
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			SCFUtils.alert('数据加载失败!');
		},
		columns : [ [ {
			field : 'sysRefNo',
			title : '还款编号',
			width : 60
		}, {
			field : 'ttlPmtAmt',
			title : '还款金额',
			width : 60,
			formatter : ccyFormater
		}, {
			field : 'payPrinAmt',
			title : '还本金金额',
			width : 60,
			formatter : ccyFormater
		}, {
			field : 'payIntAmt',
			title : '还利息金额',
			width : 60,
			formatter : ccyFormater
		}, {
			field : 'currFinCost',
			title : '还费用金额',
			width : 60,
			formatter : ccyFormater
		} ] ]
	});
}
function pageOnInt() {
	ajaxTable();
}

function pageOnLoad(data) {
	queryIncome(data);
}

function pageOnPreLoad(data) {
	queryIncome(data);
}

function onNextBtnClick() {
	var gridData = {};
	gridData = SCFUtils.getSelectedGridData('incomeDg', false);
	return gridData.rows0;
}

function ajaxTable() {
	var options = {
		toolbar : '#companyToolbar',
		idField : 'sysRefNo',
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
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			width : 70
		}, {
			field : 'sysEventTimes',
			title : '批次号',
			width : 70
		}, {
			field : 'currIncomeAmt',
			title : '本次营业外收益金额',
			width : 70,
			formatter : ccyFormater
		}, {
			field : 'incomeFlag',
			title : '收益类型',
			width : 70,
			formatter : currIncomeFlagFormater
		}, {
			field : 'sysTrxSts',
			title : '交易状态',
			width : 70,
			formatter : trxStsFormater
		} ] ]
	};
	$('#incomeDg').datagrid(options);
}

function queryIncome(data) {
	var sysRefNo = data.obj.sysRefNo;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000288',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					var currStatus = "0";
					if (n.currIncomeAmt > 0) {
						currStatus = "1";
					}
					var sumStatus = "0";
					if (n.incomeAmt > 0) {
						sumStatus = "1";
					}
					$.extend(n, {
						currStatus : currStatus,
						sumStatus : sumStatus
					});
				});
				SCFUtils.loadGridData('incomeDg', data.rows, false, true);
			}
		}
	};
	SCFUtils.ajax(options);
}

function pageOnInt() {
	ajaxTable();
}

function pageOnLoad() {
	queryIncome();
}

function pageOnPreLoad() {
	queryIncome();
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
			field : 'sysRefNo',
			title : '交易流水号',
			hidden : true
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			width : 70
		}, {
			field : 'incomeAmt',
			title : '营业外收益总金额',
			width : 70,
			formatter : ccyFormater
		}, {
			field : 'sumIncomeFlag',
			title : '收益类型',
			width : 70,
			formatter : incomeFlagFormater
		} ] ]
	};
	$('#incomeDg').datagrid(options);
}

function queryIncome() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000295',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					var sumIncomeFlag = "0";
					if (n.incomeAmt < 0) {
						sumIncomeFlag = "1";
					}
					$.extend(n, {
						sumIncomeFlag : sumIncomeFlag
					});
				});
			} else {
				data.rows = [];
			}
			SCFUtils.loadGridData('incomeDg', data.rows, false, true);
		}
	};
	SCFUtils.ajax(options);
}

function onResetBtnClick() {
	$('#cntrctNo').val("");
}

function onSearchBtnClick() {
	queryIncome();
}
/*function initToolBar() {
	return [ 'prev', 'cancel' ];
}*/

function beforeLoad() {
	var data = {
		cacheType : 'non'
	};
	return {
		data : data
	};
}

function pageOnInt() {
	ajaxBox();

}

function pageOnPreLoad(data) {
	ajaxTable(data);
	SCFUtils.loadForm('loanForm', data);
}

function pageOnLoad(data) {
	ajaxTable(data);
	if (!SCFUtils.isEmpty(data)) {
		if (!SCFUtils.isEmpty(data.obj.invc)) {
			SCFUtils.loadForm('loanForm', data.obj.invc.rows0);
		} else {
			SCFUtils.loadForm('loanForm', data.obj);
		}
	}
}

// 根据发票编号查询M表中的贷项清单金额，如果大于0，则load贷项清单信息
function queryInvcMcrnAmt() {
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000018',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if (data.rows[0].crnAmt > 0) {
					loadCrnTable();
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function checkNull() {
	var invAmt = $('#invAmt').numberbox('getValue');
	var invBal = $('#invBal').numberbox('getValue');
	if (SCFUtils.isEmpty(invAmt)) {
		$('#invAmt').numberbox('setValue', 0);
	}
	if (SCFUtils.isEmpty(invBal)) {
		$('#invBal').numberbox('setValue', 0);
	}
}

function queryseler() {
	var sysRefNo = $('#selId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000068',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if (!SCFUtils.isEmpty(sysRefNo)) {
					$('#selNm').val(data.rows[0].custNm);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
function querybuyer() {
	var sysRefNo = $('#buyerId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000068',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if (!SCFUtils.isEmpty(sysRefNo)) {
					$('#buyerNm').val(data.rows[0].custNm);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryCntrctInfo() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000008',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#busiTp').combobox('setValue', data.rows[0].busiTp);
			}
		}
	};
	SCFUtils.ajax(options);
}

function ajaxTable(data) {
	var sysRefNo = data.obj.sysRefNo;// 获取融资编号
	// 加载表格
	$('#invcTable').datagrid({
		url : SCFUtils.AJAXURL,
		queryParams : {
			queryId : 'Q_P_000512',
			sysRefNo : sysRefNo,
			cacheType : 'non'
		},
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			alert('数据加载失败!');
		},
		onLoadSuccess : function(data) {
			if (SCFUtils.isEmpty(queryParams.rows)) {
				SCFUtils.alert("没有找到符合要求的发票明细信息!");
			}
		},
		columns : [ [ {
			field : 'id',
			checkbox : 'true',
			width : 20
		}, {
			field : 'invNo',
			title : '发票编号',
			width : '16.66%',
		}, {
			field : 'invAmt',
			title : '发票金额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'invValDt',
			title : '发票日期',
			width : '16.66%',
			formatter : dateFormater
		}, {
			field : 'invDueDt',
			title : '发票到期日',
			width : '16.66%',
			formatter : dateFormater
		}, {
			field : 'invLoanAmt',
			title : '发票融资金额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'invLoanBal',
			title : '发票融资余额',
			width : '16.66%',
			formatter : ccyFormater
		} ] ]
	});
}

function ajaxBox() {
	// 币别
	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);

	/*var data = [ {
		"id" : '1',
		"text" : "保理预付款"
	}, {
		"id" : '2',
		"text" : "保理授信"
	} ];
	$("#loanTp").combobox('loadData', data);*/

}

function pageOnPreLoad(data) {
	ajaxTable(data);
}

/*
 * function onPrevBtnClick() { return SCFUtils.convertArray('loanForm'); }
 */

function onNextBtnClick() {
	var grid = {};
	var griddata;
	var mainData = SCFUtils.convertArray('loanForm');
	griddata = SCFUtils.getSelectedGridData('invcTable', false);
	grid.invc = SCFUtils.json2str(griddata);
	$.extend(mainData, grid);
	return griddata.rows0;
}

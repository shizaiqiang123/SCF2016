function pageOnInt() {
	ajaxTable();
}

function pageOnLoad(data){
	var sysdate = SCFUtils.getcurrentdate();
	SCFUtils.loadForm('invcMForm',data);
	
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000334',
			custNo : data.obj.custNo,
			instNo : data.obj.instNo,
			startDt : data.obj.startDt,
			endDt : data.obj.endDt
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('invcMTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
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
			title : '融资申请编号',
			width : 100
		}, {
			field : 'selNm',
			title : '授信客户名称',
			width : 100
		},{
			field : 'loanTp',
			title : '业务品种',
			formatter:busiTpFormater
		}, {
			field : 'ccy',
			title : '币种',
			width : 100
		}, {
			field : 'ttlLoanAmt',
			title : '融资金额',
			width : 100,
			formatter:ccyFormater
		},{
			field : 'ttlLoanBal',
			title : '融资余额',
			width : 100,
			formatter:ccyFormater
		},{
			field : 'loanValDt',
			title : '融资申请日',
			width : 100,
			formatter:dateFormater
		},{
			field : 'loanDueDt',
			title : '融资到期日',
			width : 100,
			formatter:dateFormater
		}] ]
	};
	$('#invcMTable').datagrid(options);
}

function initToolBar() {
	return [ 'expt', 'prev', 'cancel' ];
}

function onExptBtnClick(){
	var data =SCFUtils.convertArray('invcMForm');	
	return data;
}



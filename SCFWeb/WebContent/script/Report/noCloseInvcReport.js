function pageOnInt() {
	ajaxTable();
}

function pageOnLoad(data){
	var sysdate = SCFUtils.getcurrentdate();
	SCFUtils.loadForm('invcMForm',data);
	
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000336',
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
			field : 'custNm',
			title : '授信客户名称',
			width : 100
		}, {
			field : 'custNm1',
			title : '间接客户名称',
			width : 100
		},{
			field : 'busiTp',
			title : '业务类别',
			formatter:busiTypeFormater
		}, {
			field : 'invNo',
			title : '应收账款凭证号',
			width : 100
		},{
			field : 'sysOpTm',
			title : '转让日期',
			width : 100,
			formatter:dateFormater
		},{
			field : 'invValDt',
			title : '应收账款起算日',
			width : 100,
			formatter:dateFormater
		},{
			field : 'invDueDt',
			title : '到期日',
			width : 100,
			formatter:dateFormater
		}, {
			field : 'invCcy',
			title : '币种',
			width : 100
		}, {
			field : 'invAmt',
			title : '应收账款金额',
			width : 100,
			formatter:ccyFormater
		},{
			field : 'invBal',
			title : '应收账款余额',
			width : 100,
			formatter:ccyFormater
		},{
			field : 'acctPeriod',
			title : '账期',
			width : 100
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



function pageOnInt() {
	ajaxTable();
}

function pageOnLoad(data){
	var sysdate = SCFUtils.getcurrentdate();
	SCFUtils.loadForm('invcMForm',data);
	
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000333',
			custNo : data.obj.custNo,
			instNo : data.obj.instNo,
			startDt : data.obj.startDt,
			endDt : data.obj.endDt,
			dueNumDt : sysdate,
			sysdate : sysdate
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
			field : 'brNm',
			title : '所属网点',
			width : 100
		}, {
			field : 'selNm',
			title : '授信客户名称',
			width : 100
		},{
			field : 'buyerNm',
			title : '间接客户名称',
			width : 100
		}, {
			field : 'invCcy',
			title : '币种',
			width : 100
		}, {
			field : 'invNo',
			title : '应收账款凭证号',
			width : 100
		},{
			field : 'invDueDt',
			title : '到期日',
			width : 100,
			formatter:dateFormater
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
			field : 'dueNum',
			title : '逾期天数',
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



function pageOnInt() {
	ajaxTable();
}
function pageOnPreLoad(data) {
	ajaxTable();
	var selNm = $('#selNmNew').val(data.obj.selNm).val();
	var buyerNm = $('#buyerNmNew').val(data.obj.buyerNm).val();
	var cntrctNo = $('#cntrctNoNew').val(data.obj.cntrctNo).val();
	var invMinAmt = $('#invMinAmt').val(data.obj.invMinAmt).val();
	var invMaxAmt = $('#invMaxAmt').val(data.obj.invMaxAmt).val();
	var startDt = $('#startDt').val(data.obj.startDt).val();
	var endDt = $('#endDt').val(data.obj.endDt).val();
	var busiTp = $('#busiTpNew').val(data.obj.busiTp).val();
	var invSts = $('#invStsNew').val(data.obj.invSts).val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000549',
			selNm : selNm,
			buyerNm : buyerNm,
			cntrctNo : cntrctNo,
			invMinAmt : invMinAmt,
			invMaxAmt : invMaxAmt,
			startDt : startDt,
			endDt : endDt,
			busiTp : busiTp,
			invSts : invSts,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('invcMTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
	var invcMTableData = $('#invcMTable').datagrid('getData');
	if (invcMTableData.total == 0) {
		SCFUtils.alert("没有找到符合要求的应收账款信息!");
	}
	// SCFUtils.loadForm('invcMForm', data);
}
function beforeLoad() {
	var data = {
		cacheType : 'non'
	};
	return {
		data : data
	};
}

function pageOnLoad(data) {
	var sysdate = SCFUtils.getcurrentdate();
	$('#selNmNew').val(data.obj.selNm);
	$('#buyerNmNew').val(data.obj.buyerNm);
	$('#cntrctNoNew').val(data.obj.cntrctNo);
	$('#invMinAmt').val(data.obj.invMinAmt);
	$('#invMaxAmt').val(data.obj.invMaxAmt);
	$('#startDt').val(data.obj.startDt);
	$('#endDt').val(data.obj.endDt);
	$('#busiTpNew').val(data.obj.busiTp);
	$('#invStsNew').val(data.obj.invSts);

	// SCFUtils.loadForm('invcMForm', data);
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000549',
			selNm : data.obj.selNm,
			buyerNm : data.obj.buyerNm,
			invNo : data.obj.invNo,
			cntrctNo : data.obj.cntrctNo,
			invMinAmt : data.obj.invMinAmt,
			invMaxAmt : data.obj.invMaxAmt,
			startDt : data.obj.startDt,
			endDt : data.obj.endDt,
			busiTp : data.obj.busiTp,
			invSts : data.obj.invSts,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('invcMTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
	var invcMTableData = $('#invcMTable').datagrid('getData');
	if (invcMTableData.total == 0) {
		SCFUtils.alert("没有找到符合要求的应收账款信息!");
	}
}

function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		idField : "sysRefNo",
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'invNo',
			title : '应收账款编号',
			width : '9.09%'
		}, {
			field : 'selNm',
			title : '卖方名称',
			width : '9.09%'
		}, {
			field : 'buyerNm',
			title : '买方名称',
			width : '9.09%'
		}, {
			field : 'invAmt',
			title : '应收账款金额',
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'invBal',
			title : '应收账款余额',
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'invLoanBal',
			title : '应收账款融资余额',
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'invCcy',
			title : '币别',
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'invDt',
			title : '应收账款日期',
			width : '9.09%',
			formatter : dateFormater
		}, {
			field : 'invValDt',
			title : '应收账款起算日期',
			width : '9.09%',
			formatter : dateFormater
		}, {
			field : 'acctPeriod',
			title : '账期',
			width : '9.09%'
		}, {
			field : 'invSts',
			title : '应收账款状态',
			width : '9.09%',
			formatter : invStsNewFormater
		} /*, {
			field : 'invStsBak',
			title : '应收账款状态beiyong',
			width : '9.09%',
			formatter : invStsNewFormater
		}*/] ]
	};
	$('#invcMTable').datagrid(options);
}

function initToolBar() {
	return [ 'expt', 'prev', 'cancel', 'next' ];
}

function onExptBtnClick() {
	var data = SCFUtils.convertArray('invcMForm');
	return data;
}

function pageOnResultLoad(data) {
}

function onNextBtnClick() {
	var grid = {};
	var griddata;
	var mainData = SCFUtils.convertArray('invcMForm');
	griddata = $('#invcMTable').datagrid('getSelected');
	/*$.each(SCFUtils.parseGridData(griddata), function(i, n){
		$.extend(n,{'sysRefNoNNNNNNNN':'11111111'});
	});*/
	
	grid.invc = SCFUtils.json2str(griddata);
	//grid.invcNew = SCFUtils.json2str(mainData);
	$.extend(mainData, grid);
	return mainData;
}

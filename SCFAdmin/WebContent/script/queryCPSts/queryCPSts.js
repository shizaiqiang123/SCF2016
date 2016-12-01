
function pageOnInt() {
	ajaxCollat();
	ajaxLoan();
}

function pageOnLoad(data){
	SCFUtils.setTextReadonly("patnerNm", true);
	SCFUtils.setNumberboxReadonly("patnerBal", true);
	SCFUtils.setNumberboxReadonly("sumAmt",true);
	SCFUtils.setNumberboxReadonly("lmtAmt", true);
	SCFUtils.setNumberboxReadonly("lmtBal", true);
	SCFUtils.setNumberboxReadonly("maxlmtAmt", true);
	SCFUtils.setNumberboxReadonly("openLoanAmt", true);
	SCFUtils.setNumberboxReadonly("sumAmtRt", true);
	SCFUtils.loadForm('queryCPSts', data);
	$('#maxlmtAmt').numberbox('setValue',$('#lmtAmt').numberbox('getValue'));
	queryParty();
	queryCollat();
	queryLoan();
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('queryCPSts', data);
	SCFUtils.loadGridData('collatTable', SCFUtils.parseGridData(data.obj.COLLAT), true);// 加载数据并保护表格。
	SCFUtils.loadGridData('loanTable', SCFUtils.parseGridData(data.obj.LOAN), true);// 加载数据并保护表格。
}

function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('queryCPSts');
	var grid = {};
	var collatTable =SCFUtils.getGridData('collatTable');	
	var loanTable =SCFUtils.getGridData('loanTable');
	grid.COLLAT = SCFUtils.json2str(collatTable);
	grid.LOAN = SCFUtils.json2str(loanTable);
	$.extend(mainData, grid);
	return mainData;
}

function ajaxCollat() {
	var options = {
			//url : SCFUtils.AJAXURL,
			toolbar : '#toolbar',
			idField :  'sysRefNo',
			rownumbers : true,
			checkOnSelect : true,
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : false,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : [ [ {
				field : 'sysRefNo',
				title : '交易流水号',
				//hidden:true,
				width : '16.66%'
			}, {
				field : 'collatNm',
				title : '质物品种',
				width : '16.66%'
			},{
				field : 'arrivalDt',
				title : '质物入库日期',
				width : '16.66%',
				formatter: dateFormater
			},{
				field : 'qty',
				title : '质物数量',
				width : '16.66%'
			},{
				field : 'collatQty',
				title : '质物计价量',
				width : '16.66%'
			},{
				field : 'collatVal',
				title : '质物价值',
				width : '16.66%',
				formatter:ccyFormater
			}
			] ]
		};
		$('#collatTable').datagrid(options);
}

function ajaxLoan() {
	var options = {
			//url : SCFUtils.AJAXURL,
			toolbar : '#toolbar',
			idField :  'sysRefNo',
			rownumbers : true,
			checkOnSelect : true,
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : false,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : [ [ {
				field : 'sysRefNo',
				title : '放款编号',
				//hidden:true,
				width : '16.66%'
			}, {
				field : 'ccy',
				title : '币别',
				width : '16.66%'
			},{
				field : 'ttlLoanAmt',
				title : '放款金额',
				width : '16.66%',
				formatter:ccyFormater
			},{
				field : 'marginAcNo',
				title : '保证金账号',
				width : '16.66%'
			},{
				field : 'marginAmt',
				title : '初始保证金金额',
				width : '16.66%',
				formatter:ccyFormater
			},{
				field : 'marginBal',
				title : '保证金余额',
				width : '16.66%',
				formatter:ccyFormater
			}
			] ]
		};
		$('#loanTable').datagrid(options);
}

function queryParty(){
	var patnerNm=$('#patnerNm').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000080',
				patnerNm : patnerNm,
				cacheType : 'append'
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#patnerBal').numberbox('setValue',data.rows[0].lmtBal);
				}
			}
	};
	SCFUtils.ajax(options);
}

function queryCollat(){
	var cntrctNo=$('#sysRefNo').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000078',
				cntrctNo : cntrctNo,
				cacheType : 'append'
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					SCFUtils.loadGridData('collatTable', data.rows, true, true);
					sumCollatVal(data.rows);
				}
			}
	};
	SCFUtils.ajax(options);
}

function queryLoan(){
	var cntrctNo=$('#sysRefNo').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000079',
				cntrctNo : cntrctNo,
				cacheType : 'append'
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					SCFUtils.loadGridData('loanTable', data.rows, true, true);
//					sumCollatVal(data.rows);
				}
			}
	};
	SCFUtils.ajax(options);
}

function sumCollatVal(data){
	var sumAmt=0;
	$.each(data,function(i,n){
		sumAmt=SCFUtils.Math(sumAmt, n.collatVal, 'add');
	});
	$('#sumAmt').numberbox('setValue',sumAmt);
	var fundRt=SCFUtils.Math( $('#fundRt').val(), 100, 'div');
	var sumAmtRt=SCFUtils.Math(sumAmt, fundRt, 'mul');
	$('#sumAmtRt').numberbox('setValue',sumAmtRt);
}
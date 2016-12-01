function pageOnInt() {
	ajaxBox();
	ajaxTable();
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setTextReadonly('sellerInstCd', true); 
	SCFUtils.setComboReadonly('busiTp', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('buyerNm', true);
	SCFUtils.setNumberboxReadonly('ttlLoanAmt', true);
}

function pageOnLoad(data) {
	queryLoanM(data.obj.cntrctNo);
	SCFUtils.loadForm('loanMForm',data);
}

function onNextBtnClick() {
	var rows = $('#loanMTable').datagrid('getSelections');
	var mainData = SCFUtils.convertArray('loanMForm');
	var grid = {};
	if(rows.length == 0){
		SCFUtils.alert("请选择一条融资信息！");
		return ;
	}else{
		//data.sysRefNo = rows[0].sysRefNo;
		//data.loanNo = rows[0].sysRefNo;
		//data.ttlLoanAmt = rows[0].ttlLoanAmt;
		//data.ttlLoanBal = rows[0].ttlLoanBal;
		//data.ccy = rows[0].ccy;
		//data.loanValDt = rows[0].loanValDt;
		//data.loanDueDt = rows[0].loanDueDt;
		$.extend(grid,{"sysRefNo":rows[0].sysRefNo},{"loanNo":rows[0].loanNo},{"ttlLoanAmt":rows[0].ttlLoanAmt},{"ttlLoanBal":rows[0].ttlLoanBal},{"ccy":rows[0].ccy},{"loanValDt":rows[0].loanValDt},{"loanDueDt":rows[0].loanDueDt});
	}
	return grid;
}


function ajaxBox() {
	var data =  [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	},{
		"id" : '2',
		"text" : "先票款后货"
	} ];
	$("#busiTp").combobox('loadData', data);
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006'
			},
			callBackFun:function(data){
				if(data.success){
					$('#ccy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(optt);
}

function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '融资编号',
			width : 100
		}, {
			field : 'ttlLoanAmt',
			title : '融资金额',
			width : 100
		},{
			field : 'ttlLoanBal',
			title : '融资余额',
			width : 100
		}, {
			field : 'ccy',
			title : '币种',
			width : 100,
			formatter:ccyFormater
		},{
			field : 'loanValDt',
			title : '融资日期',
			width : 100,
			formatter:dateFormater
		},{
			field : 'loanDueDt',
			title : '融资到期日',
			width : 100,
			formatter:dateFormater
		}] ]
	};
	$('#loanMTable').datagrid(options);
}

//查询融资信息
function queryLoanM (cntrctNo){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000344' ,
					cntrctNo :cntrctNo
				},
				callBackFun : function(data){
					if(!SCFUtils.isEmpty(data.rows)){
						SCFUtils.loadGridData('loanMTable',data.rows,false,true);
					}
				}
		}
		SCFUtils.ajax(options);
}


function initToolBar(){
	return ['prev','cancel'];
}

function beforeLoad(){
	var data = {
		cacheType : 'non'
	};
	return {data:data};
}

function pageOnInt(){
	$("#loanDiv").hide();
	$("#buyerPmtDiv").hide();
	$("#cbkDiv").hide();
	$("#crnDiv").hide();
	$("#crnAmtTr").hide();
	ajaxBox();
}

function pageOnPreLoad(data){
}

//根据发票编号查询M表中的贷项清单金额，如果大于0，则load贷项清单信息
function queryInvcMcrnAmt(){
	var sysRefNo=$('#sysRefNo').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000018',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					if(data.rows[0].crnAmt>0){
						loadCrnTable();
					}
				}
			}
		};
		SCFUtils.ajax(options);
}


function pageOnLoad(data){
	if(!SCFUtils.isEmpty(data)){
		if(!SCFUtils.isEmpty(data.obj.invc)){
			SCFUtils.loadForm('invcForm',data.obj.invc.rows0);	
		}else{
			SCFUtils.loadForm('invcForm',data.obj);
		}
//		queryInvcMcrnAmt();//根据发票编号查询M表中的贷项清单金额，如果大于0，则load贷项清单信息
		queryseler();
		querybuyer();
		queryCntrctInfo();
		checkNull();
		loadSomeTabel();
	}
}

function loadSomeTabel(){
	var invSts = $('#invSts').val();
	if('LOAN'==invSts){
		loadLoanTable();
	}else if('BUYERPMT'==invSts){
		loadBuyerpmtTable();
	}else if('SELPMT'==invSts){
		loadBuyerpmtTable();
//		loadSelpmtTable();
	}else if('INDPMT'==invSts){
		loadBuyerpmtTable();
//		loadIndpmtTable();
	}else if('CBK'==invSts){
		loadCbkTable();
	}else if('CRN'==invSts){
		loadCrnTable();
	}
}

function loadCrnTable(){
//	$("#invAmtTd").html("贷项清单金额：");
//	$("#invBalTd").html("贷项清单净额：");
	$("#crnDiv").show();
	$("#crnAmtTr").show();
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
			field : 'sysRefNo',
			title : '贷项清单流水号',
			width : 100
		}, {
			field : 'invNo',
			title : '贷项清单编号',
			width : 100
		}, {
			field : 'invAmt',
			title : '贷项清单金额',
			width : 100,
			formatter:ccyFormater
		},{
			field : 'invBal',
			title : '贷项清单净额',
			width : 100,
			formatter: ccyFormater
		},{
			field : 'invSts',
			title : '交易类型',
			width : 100,
			formatter: invStsFormater
		}]]	
	
};
	$('#crnTable').datagrid(options);
	var linkInvRef=$('#sysRefNo').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000187',
				linkInvRef : linkInvRef
			},
			callBackFun : function(data) {
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					SCFUtils.loadGridData('crnTable', data.rows);
				}
			}
		};
		SCFUtils.ajax(options);
}
function loadCbkTable(){
	$("#cbkDiv").show();
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
			field : 'sysRefNo',
			title : '交易流水号',
			width : 100
		}, {
			field : 'trxId',
			title : '反转让批次号',
			width : 100
		}, {
			field : 'chgBcAmt',
			title : '反转让金额',
			width : 100,
			formatter:ccyFormater
		},{
			field : 'cbkDt',
			title : '反转让日期',
			width : 100,
			formatter: dateFormater
		}]]	
	
};
	$('#cbkTable').datagrid(options);
	var invcId=$('#sysRefNo').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000185',
				invcId : invcId
			},
			callBackFun : function(data) {
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					SCFUtils.loadGridData('cbkTable', data.rows);
				}
			}
		};
		SCFUtils.ajax(options);
}		

function loadBuyerpmtTable(){
	$("#buyerPmtDiv").show();
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹ffv
		idField : 'sysRefNo',
		columns : [ [ {
			field : 'sysRefNo',
			title : '还款编号',
			width : 200
		}, {
			field : 'invPmtRef',
			title : '还款批次号',
			width : 100
		}
//		, {
//			field : 'orderNo',
//			title : '买卖合同编号',
//			width : 100
//		}
		, {
			field : 'pmtAmt',
			title : '本次还款金额',
			width : 100,
			formatter : ccyFormater
		}
//		, {
//			field : 'pmtDt',
//			title : '还款日期',
//			width : 100,
//			formatter : dateFormater
//		}
		,{
			field : 'intAmt',
			title : '应付利息',
			width : 100,
			formatter : ccyFormater
		}, {
			field : 'payPrinAmt',
			title : '还本金金额',
			width : 100,
			formatter : ccyFormater
		}, {
			field : 'payIntAmt',
			title : '还息金额',
			width : 100,
			formatter : ccyFormater
		} ] ]
	};
	$('#buyerPmtTable').datagrid(options);
	var invRef=$('#sysRefNo').val();
	var sysEventTimes=$('#sysEventTimes').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000184',
				invRef : invRef,
				sysEventTimes : sysEventTimes
			},
			callBackFun : function(data) {
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					SCFUtils.loadGridData('buyerPmtTable', data.rows);
				}
			}
		};
		SCFUtils.ajax(options);
}

function loadLoanTable(){
	$("#loanDiv").show();
	var options = {
			toolbar : '#toolbar',
			idField :  'sysRefNo',
			rownumbers : true,
			checkOnSelect : true,
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : true,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : [ [ {
				field : 'sysRefNo',
				title : '融资ID',
				width : 200
			}, {
				field : 'invcLoanId',
				title : '融资批次号',
				width : 100
			},{
				field : 'loanPct',
				title : '融资比例',
				width : 100
			}, {
				field : 'loanRt',
				title : '利率',
				width : 100
			}, {
				field : 'loanTimes',
				title : '融资次数',
					width : 100
			}, {
				field : 'invLoanAmt',
				title : '融资金额',
				width : 100,
				formatter:ccyFormater
			}, {
				field : 'invLoanEbal',
				title : '本次融资金额',
				width : 100,
				formatter:ccyFormater
			}, {
				field : 'invLoanBal',
				title : '融资总金额',
				width : 100,
				formatter:ccyFormater
			},{
				field : 'loanValDt',
				title : '融资起息日',
				width : 100,
				formatter: dateFormater
			}, {
				field : 'loanDueDt',
				title : '融资到期日',
				width : 100,
				formatter: dateFormater
			}, {
				field : 'invLoanAval',
				title : '应收账款可融资金额',
				width : 120,
//				hidden:true,
				formatter:ccyFormater
			}
			] ]
		};
		$('#loanTable').datagrid(options);
		var invRef=$('#sysRefNo').val();
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000183',
					invRef : invRef
				},
				callBackFun : function(data) {
					if(data.success&&!SCFUtils.isEmpty(data.rows)){
						SCFUtils.loadGridData('loanTable', data.rows);
					}
				}
			};
			SCFUtils.ajax(options);
}

function checkNull(){
	var invAmt=$('#invAmt').numberbox('getValue');
	var invBal=$('#invBal').numberbox('getValue');
//	var invLoanBal=$('#invLoanBal').numberbox('getValue');
//	var invLoanAval=$('#invLoanAval').numberbox('getValue');
	if(SCFUtils.isEmpty(invAmt)){
		$('#invAmt').numberbox('setValue',0);
	}
	if(SCFUtils.isEmpty(invBal)){
		$('#invBal').numberbox('setValue',0);
	}
//	if(SCFUtils.isEmpty(invLoanBal)){
//		$('#invLoanBal').numberbox('setValue',0);
//	}
//	if(SCFUtils.isEmpty(invLoanAval)){
//		$('#invLoanAval').numberbox('setValue',0);
//	}
}

function queryseler(){
		var sysRefNo=$('#selId').val();
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000068',
					sysRefNo : sysRefNo
				},
				callBackFun : function(data) {
					if(data.success&&!SCFUtils.isEmpty(data.rows)){
						if(!SCFUtils.isEmpty(sysRefNo)){
							$('#selNm').val(data.rows[0].custNm);
						}
					}
				}
			};
			SCFUtils.ajax(options);
}
function querybuyer(){
		var sysRefNo=$('#buyerId').val();
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000068',
					sysRefNo : sysRefNo
				},
				callBackFun : function(data) {
					if(data.success&&!SCFUtils.isEmpty(data.rows)){
						if(!SCFUtils.isEmpty(sysRefNo)){
							$('#buyerNm').val(data.rows[0].custNm);
						}
					}
				}
			};
			SCFUtils.ajax(options);
}

function queryCntrctInfo(){
	var cntrctNo=$('#cntrctNo').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000008',
				cntrctNo : cntrctNo
			},
			callBackFun : function(data) {
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					$('#busiTp').combobox('setValue',data.rows[0].busiTp);
				}
			}
		};
		SCFUtils.ajax(options);
}


function ajaxBox(){
	//币别
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006'
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					$('#ccy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(optt);
	
	var data =  [ {
		"id" : 'TRF',
		"text" : "应收账款转让"
	}, {
		"id" : 'LOAN',
		"text" : "融资"
	} , {
		"id" : 'BUYERPMT',
		"text" : "间接客户还款"
	} , {
		"id" : 'SELPMT',
		"text" : "授信客户还款"
	} , {
		"id" : 'INDPMT',
		"text" : "间接还款"
	} , {
		"id" : 'CBK',
		"text" : "反转让"
	} , {
		"id" : 'CRN',
		"text" : "贷项清单"
	} ];
	$("#invSts").combobox('loadData', data);
	
	data =  [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	} ];
	$("#busiTp").combobox('loadData', data);
}

function onPrevBtnClick(){
	return SCFUtils.convertArray('invcForm');
}
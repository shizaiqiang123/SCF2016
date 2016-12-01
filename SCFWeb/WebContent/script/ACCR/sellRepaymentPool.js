/**
 * 复合功能时，进入结果汇总页面
 * 
 * @param data
 */
function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}
/**
 * 复合功能时，Next进入交易页面
 * 
 * @param data
 */
function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('rePaymentForm', row);
	queryCntrctE();
	queryLoanE();
	relQueryIntE();
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}
/**
 * 复合功能时，Pre进入交易页面
 * 
 * @param data
 */
function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('rePaymentForm', data);
	SCFUtils.loadGridData('loanTable', SCFUtils.parseGridData(data.obj.loan),
			true);// 加载数据并保护表格。
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

/**
 * 申请功能时，进入结果页面
 * 
 * @param data
 */
function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('rePaymentForm', data);
	$('#intAmt').numberbox('setValue',data.obj.intAmt);
	$('#ttlLoanBal').numberbox('setValue',data.obj.ttlLoanBal);
	$('#arAvalLoan').numberbox('setValue',data.obj.arAvalLoan);
	$('#payIntAmt').numberbox('setValue',data.obj.payIntAmt);
	$('#payPrinAmt').numberbox('setValue',data.obj.payPrinAmt);
	SCFUtils.loadGridData('loanTable', SCFUtils.parseGridData(data.obj.loan),
			true);// 加载数据并保护表格。
	lookSysRelReason();

}

/**
 * 申请功能时，Pre进入交易页面
 * 
 * @param data
 */
function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('rePaymentForm', data);
	$('#intAmt').numberbox('setValue',data.obj.intAmt);
	$('#payIntAmt').numberbox('setValue',data.obj.payIntAmt);
	$('#payPrinAmt').numberbox('setValue',data.obj.payPrinAmt);
	$('#ttlLoanBal').numberbox('setValue',data.obj.ttlLoanBal);
	$('#arAvalLoan').numberbox('setValue',data.obj.arAvalLoan);
	$('#lmtBal').val(SCFUtils.Math($('#lmtBal').val(),data.obj.ttlPmtAmt, 'sub'));
	SCFUtils.loadGridData('loanTable', SCFUtils.parseGridData(data.obj.loan),
			true);// 加载数据并保护表格。
	var griddata = SCFUtils.getGridData('loanTable');
//	var ttlLoanBalTotal = 0.00;
//	$.each(griddata,function(i,v){
//		if(i!='_total_rows'){
//			ttlLoanBalTotal = SCFUtils.Math(v.ttlLoanBalBak, ttlLoanBalTotal, 'add');
//		}
//	});
//	$('#ttlPmtAmt').numberbox({max:parseFloat(ttlLoanBalTotal)});
	var ttlLoanBalTotal = 0.00;
	var ttlLoanBalBak = 0.00;
	var intAmtBak = 0.00;
	$.each(SCFUtils.parseGridData(griddata), function(i, n){
		ttlLoanBalBak = SCFUtils.Math(ttlLoanBalBak, n.ttlLoanBalBak, 'add');
		if(n.payIntTp == '利随本清'){
			intAmtBak = SCFUtils.Math(intAmtBak, n.intAmtBak, 'add');
		}
	});
	ttlLoanBalTotal = SCFUtils.Math(ttlLoanBalBak, intAmtBak, 'add');
	$('#ttlPmtAmt').numberbox({max:parseFloat(ttlLoanBalTotal)});
	lookSysRelReason();
}

/**
 * 申请功能时，Next进入交易页面
 * 
 * @param data
 */
function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('rePaymentForm', data);
	$('#trxDt').datebox('setValue', SCFUtils.getcurrentdate());
	$('#pmtDt').datebox('setValue', SCFUtils.getcurrentdate());
	$('#ttlLoanBalHD').val(data.obj.openLoanAmt);
	$('#ttlLoanBalOld').val(data.obj.openLoanAmt);
	$('#arAvalLoanOld').val(data.obj.arAvalLoan);
	$('#ttlLoanBal').numberbox('setValue',data.obj.openLoanAmt);
	$('#ccy').combobox('setValue',data.obj.lmtCcy);
	$('#lmtBal').val(data.obj.lmtBal);
	var refRequest = {};
	refRequest.data = {
		refName : 'PoolPmt',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(refRequest);
	//生成利息流水号
	var intRequest = {};
	intRequest.data = {
		refName : 'IntRef',
		refField : 'intSysRefNo'
	};
	SCFUtils.getRefNo(intRequest);
	searchLoanM();
	
	var griddata = SCFUtils.getGridData('loanTable');
	var ttlLoanBalTotal = 0.00;
	var ttlLoanBalBak = 0.00;
	var intAmtBak = 0.00;
	$.each(SCFUtils.parseGridData(griddata), function(i, n){
		ttlLoanBalBak = SCFUtils.Math(ttlLoanBalBak, n.ttlLoanBalBak, 'add');
		if(n.payIntTp == '利随本清'){
			intAmtBak = SCFUtils.Math(intAmtBak, n.intAmtBak, 'add');
		}
	});
	ttlLoanBalTotal = SCFUtils.Math(ttlLoanBalBak, intAmtBak, 'add');
	$('#ttlPmtAmt').numberbox({max:parseFloat(ttlLoanBalTotal)});
	lookSysRelReason();
}

/**
 * new 修改在途初始化页面
 */
function pageOnFPLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('rePaymentForm', row);
	queryCntrctE();
	queryLoanEFP();
	relQueryIntE();
	queryCntrctMFP();
	var griddata = SCFUtils.getGridData('loanTable');
	var ttlLoanBalTotal = 0.00;
	var ttlLoanBalBak = 0.00;
	var intAmtBak = 0.00;
	$.each(SCFUtils.parseGridData(griddata), function(i, n){
		ttlLoanBalBak = SCFUtils.Math(ttlLoanBalBak, n.ttlLoanBalBak, 'add');
		if(n.payIntTp == '利随本清'){
			intAmtBak = SCFUtils.Math(intAmtBak, n.intAmtBak, 'add');
		}
	});
	ttlLoanBalTotal = SCFUtils.Math(ttlLoanBalBak, intAmtBak, 'add');
	$('#ttlPmtAmt').numberbox({max:parseFloat(ttlLoanBalTotal)});
	$('#arAvalLoanOld').val(SCFUtils.Math($('#arAvalLoanOld').val(),$('#payPrinAmt').numberbox('getValue'),'sub'));
	lookSysRelReason();
	relQueryIntE();//new  为了在FP时给int信息加上sysRefnO
}
/**
 * 所有进入交易页面 公共的方法
 * 
 * @param data
 */
function pageOnInt() {
	ajaxBox();
	ajaxTable();
	SCFUtils.setFormReadonly('#rePaymentDiv', true);
	SCFUtils.setNumberboxReadonly('ttlPmtAmt', false);
	SCFUtils.setComboReadonly('OldSysRelReason', true);
	
}

function exchangeSysRelReason(data) {
	if (data.sysRelReason == undefined || data.sysRelReason == null) {
		data.sysRelReason = "";
		data.OldSysRelReason = "";
		return data;
	}
	var sysRelReason = data.sysRelReason;
	var OldSysRelReason = data.OldSysRelReason;
	data.sysRelReason = OldSysRelReason;
	data.OldSysRelReason = sysRelReason;

	return data;
}

// 控制意见的div
function lookSysRelReason() {
	var OldMessageDiv = $("#OldSysRelReason").val();
	$('#messageListDiv').css('margin-left', '20px');
	if (SCFUtils.FUNCTYPE == "FP" || SCFUtils.FUNCTYPE == "PM") {
		if (OldMessageDiv == null || OldMessageDiv == "") {
			$('#OldMessageDiv').css('display', 'none');
			$('#messageSpanY').css('display', 'block');
			$('#messageSpanN').css('display', 'none');

		} else {
			$('#messageSpanY').css('display', 'none');
			$('#messageDivFa').css('margin-top', '-20px');

		}
		$('#messageDiv').css('display', 'block');
		
		// SCFUtils.setTextboxReadonly('sysRelReason', false);// 保护意见
	} else if (SCFUtils.FUNCTYPE == "DP" || SCFUtils.FUNCTYPE == "RE") {
		// SCFUtils.setTextboxReadonly('sysRelReason', false);
		$('#messageDivFa').css('display', 'none');
	} else {
		$('#messageDivFa').css('display', 'none');
	}
}

function ajaxBox() {
	var payIntTp = [ {
		"id" : '1',
		"text" : "预收息"
	}, {
		"id" : '2',
		"text" : "利随本清"
	}];
	$("#payIntTp").combobox('loadData',payIntTp);
	var data =[ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '2',
		"text" : "先票款后货"
	}, {
		"id" : '3',
		"text" : "信用保险项下"
	}, {
		"id" : '4',
		"text" : "现货动态"
	}, {
		"id" : '5',
		"text" : "现货静态"
	}, {
		"id" : '6',
		"text" : "应收账款池融资"
	} ];
	$("#busiTp").combobox('loadData', data);
	ajaxCcy();
}

/**
 * 加载币别
 */
function ajaxCcy() {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006',
			cacheType : 'comm'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
}

//复核时查询协议
function queryCntrctE(){
	var cntrctNo = $('#cntrctNo').val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000577',
				sysRefNo : cntrctNo
			},
			callBackFun : function(data) {
				$('#payIntTp').combobox('setValue',data.rows[0].payIntTp);
				$('#loanRt').numberspinner('setValue',data.rows[0].loanRt);
				$('#ttlLoanBal').numberspinner('setValue',data.rows[0].openLoanAmt);
				$('#arAvalLoan').numberspinner('setValue',data.rows[0].arAvalLoan);
				$('#loanRt').numberspinner('setValue',data.rows[0].loanRt);
				$('#ccy').combobox('setValue',data.rows[0].lmtCcy);
				$('#lmtBal').val(data.rows[0].lmtBal);
				$('#arAvalLoanOld').val(data.rows[0].arAvalLoan);
			}
		};
		SCFUtils.ajax(opt);
}
//退回修改时，融资余额以M表数据为准
function queryCntrctMFP(){
	var cntrctNo = $('#cntrctNo').val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000029',
				sysRefNo : cntrctNo
			},
			callBackFun : function(data) {
				//$('#arAvalLoanOld').val(data.rows[0].arAvalLoan);
				$('#ttlLoanBalOld').val(data.rows[0].openLoanAmt);
			}
		};
		SCFUtils.ajax(opt);
}

//复核时查询融资
function queryLoanE(){
	var cntrctNo = $('#cntrctNo').val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000578',
				cntrctNo : cntrctNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					var intAmtHD = 0.00;//计算主页利息总额
					$.each(data.rows, function(i, n) {
						intAmtHD = SCFUtils.Math(intAmtHD,n.intAmt, 'add');
						if (n.payIntTp == 1) {
							$.extend(n, {
								payIntTp : '预收息'
							});
						}
						if (n.payIntTp == 2) {
							$.extend(n, {
								payIntTp : '利随本清'
							});
						}
					});
					//主页赋值
					$('#intAmt').numberbox('setValue',intAmtHD);
					SCFUtils.loadGridData('loanTable', data.rows);
				}
			}
		};
		SCFUtils.ajax(opt);
}
//退回修改时查询融资
function queryLoanEFP(){
	var cntrctNo = $('#cntrctNo').val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000578',
				cntrctNo : cntrctNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					var intAmtHD = 0.00;//计算主页利息总额
					$.each(data.rows, function(i, n) {
						intAmtHD = SCFUtils.Math(intAmtHD,n.intAmt, 'add');
						if (n.payIntTp == 1) {
							$.extend(n, {
								payIntTp : '预收息'
							});
						}
						if (n.payIntTp == 2) {
							$.extend(n, {
								payIntTp : '利随本清'
							});
						}
						//如果退回时有还款金额，则重新返回融资余额与利息
						if(n.pmtAmt!=0){
							$.extend(n,{
								//ttlLoanBalBak : SCFUtils.Math(n.payPrinAmt,n.payIntAmt, 'add'),
								ttlLoanBalBak : SCFUtils.Math(n.ttlLoanBal,n.payPrinAmt, 'add'),
								intAmtBak : n.payIntAmt
							 });
						}else{
							$.extend(n,{
								ttlLoanBalBak : n.ttlLoanBal,
								intAmtBak : n.intAmt
							 });
						}
					});
					//主页赋值
					$('#intAmt').numberbox('setValue',intAmtHD);
					SCFUtils.loadGridData('loanTable', data.rows);
				}
			}
		};
		SCFUtils.ajax(opt);
}

function ajaxTable() {

	var options = {
		toolbar : '#toolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		singleSelect : false,// 只选一行
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : getColumns()
	};
	$('#loanTable').datagrid(options);
}

function getColumns() {
	return [ [ {
		field : 'ck',
		checkbox : true
	}, {
		field : 'sysRefNo',
		title : '放款编号',
		width : '8.33%'
	}, {
		field : 'selNm',
		title : '授信客户名称',
		width : '8.33%'
	}, {
		field : 'ccy',
		title : '放款币别',
		width : '8.33%'
	}, {
		field : 'ttlLoanBal',
		title : '融资余额',
		width : '8.33%',
		formatter : ccyFormater
	}, {
		field : 'ttlLoanBalBak',
		title : '融资余额备用字段',
		width : '8.33%',
		formatter : ccyFormater,
		hidden : false
	}, {
		field : 'payIntTp',
		title : '扣息方式',
		width : '8.33%'
	}, {
		field : 'loanRt',
		title : '融资利率（年化）',
		width : '8.33%',
		formatter : pectType
	}, {
		field : 'loanValDt',
		title : '融资起算日',
		width : '8.33%',
		formatter : dateFormater
	}, {
		field : 'loanDueDt',
		title : '融资到期日',
		width : '8.33%',
		formatter : dateFormater
	}, {
		field : 'pmtDt',
		title : '还款日期',
		width : '8.33%',
		formatter : function() {
			return SCFUtils.getcurrentdate();
		}
	}, {
		field : 'intAmt',
		title : '利息总额',
		width : '8.33%',
		formatter : ccyFormater
	}, {
		field : 'intAmtBak',
		title : '利息总额备用字段',
		width : '8.33%',
		formatter : ccyFormater,
		hidden : false
	}, {
		field : 'payIntAmt',
		title : '本次还利息',
		width : '8.33%',
		formatter : ccyFormater
	}, {
		field : 'payPrinAmt',
		title : '本次还本金',
		width : '8.33%',
		formatter : ccyFormater
	}, {
		field : 'pmtAmt',
		title : '本次还款金额',
		width : '8.33%',
		formatter : ccyFormater
	} ] ];
}

/**
 * 查询协议下融资信息
 */
function searchLoanM() {
	var cntrctNo = $("#cntrctNo").val();
	var intAmt = 0.00;//计算利息总额
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000580',
			cntrctNo : cntrctNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$.each(data.rows, function(i, n) {
						//1为预收息2为利随本清
						if(n.payIntTp == 1){
							$.extend(n,{payIntTp:'预收息',ttlLoanBalBak:n.ttlLoanBal,intAmtBak:n.intAmt,payIntAmt:0,payPrinAmt:0,pmtAmt:0});
						}
						/**
						 * 利息总额计算规则：
						 * 如果(Pay_Int_Tp=先收息)】{则INT_AMT=从融资表带出；}
						 * 如果(Pay_Int_Tp=利随本清){则INT_AMT= Ttl_Loan_Bal*【（还款日-起息日）】* LOAN_RT/360}
						 */
						if(n.payIntTp == 2){
							var subDate=SCFUtils.DateDiff(SCFUtils.getcurrentdate(), SCFUtils.dateFormat(n.loanValDt, 'yyyy-MM-dd'));
							var intAmt_lsbq=SCFUtils.Math(n.ttlLoanBal, n.loanRt*0.01, 'mul');
							intAmt_lsbq=SCFUtils.Math(intAmt_lsbq, subDate, 'mul');
							intAmt_lsbq=SCFUtils.Math(intAmt_lsbq, 360, 'div');
							$.extend(n,{payIntTp:'利随本清',ttlLoanBalBak:n.ttlLoanBal,intAmtBak:intAmt_lsbq,intAmt:intAmt_lsbq,payIntAmt:0,payPrinAmt:0,pmtAmt:0});
						}
						intAmt = SCFUtils.Math(intAmt, n.intAmt, 'add');
					});
					//给主页利息总额赋值
					$('#intAmt').numberbox('setValue',intAmt);
					SCFUtils.loadGridData('loanTable', data.rows);
				} else {
					SCFUtils.alert("没有符合的融资信息");
				}
			}else{
				SCFUtils.alert("查询失败");
			}
		}
	};
	SCFUtils.ajax(opts);
}

/*
 * 获取卖方额度信息
 */
function getSellerData() {
	querySellerLmt();
	/*griddata = SCFUtils.getGridData("invcMTable", false);
	var invLoanBalHd = '';
		$.each(SCFUtils.parseGridData(griddata), function(i, n) {
			var stuLoanAmt = SCFUtils.Math(n.invLoanBalHd,n.invLoanBal,'sub');
			invLoanBalHd = SCFUtils.Math(invLoanBalHd,stuLoanAmt,'add');
			 
	});*/
	
	var sellerLmt = {};// 添加卖方额度信息
	sellerLmt._total_rows = 1;
	var obj = {};
	var lmtTp = '1';
	if('RE'===SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE ){
		obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		obj.lmtBal = relQueryLmtE(lmtTp)[0].lmtBal ;//卖方额度余额
		obj.lmtAllocate = relQueryLmtE(lmtTp)[0].lmtAllocate ;//本次占用额度
		obj.lmtRecover = relQueryLmtE(lmtTp)[0].lmtRecover ;//归还额度

	}else{
		if('FP'===SCFUtils.FUNCTYPE){
			obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		}else{
			obj.sysRefNo = $('#sellerLmtSysRefNo').val();
		}
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtBal,$('#ttlPmtAmt').numberbox('getValue'),'add') ;//卖方额度余额=原卖方额度余额+还款余额
		obj.lmtAllocate = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtAllocate,$('#ttlPmtAmt').numberbox('getValue'),'sub') ;//本次占用额度=原来占用额度-还款余额
		obj.lmtRecover = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtRecover,$('#ttlPmtAmt').numberbox('getValue'),'add') ;//归还额度=原归还额度+还款余额

	}

	obj.ttlAllocate = 0;// 已占用额度
	obj.theirRef = $('#sysRefNo').val();//主页流水号

	sellerLmt['rows0'] = obj;
	return sellerLmt;

}

function querySellerLmt(){
	var cntrctNo = $("#cntrctNo").val();
	var selId = $("#selId").val();
	   if(!SCFUtils.isEmpty(selId)){
		  var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000673',
					selId : selId,
					cntrctNo : cntrctNo
				},
				callBackFun : function(data1) {
					if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
						$('#sellerLmtSysRefNo').val(data1.rows[0].sysRefNo);//卖方额度流水号
						
					}
				}
			};
			SCFUtils.ajax(opt);
	    }
}

/*
 * 复核时候查询LMT的E表
 */
function relQueryLmtE(lmtTp) {
	var cntrctNo = $("#cntrctNo").val();
	// var selId= $("#selId").val();
	var sysLockBy = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000651',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp,
			// selId :selId,
			sysLockBy : sysLockBy
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

/*
 * 申请时候查询LMT的表
 */
function relQueryLmtM(lmtTp) {
	var cntrctNo = $("#cntrctNo").val();
	var buyerId = $("#buyerId").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000671',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp,
			buyerId : buyerId
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

/*
 * 申请时候查询LMT的表
 */
function relQueryLmtMRe(lmtTp) {
	var cntrctNo = $("#cntrctNo").val();
	var selId = $("#selId").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000672',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp,
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

function onNextBtnClick() {
	var ttlPmtAmt = $('#ttlPmtAmt').numberbox('getValue');
	if (ttlPmtAmt == 0) {
		SCFUtils.alert('本次还款金额为零,请调整！');
		return;
	}
	$('#lmtBal').val(SCFUtils.Math($('#lmtBal').val(),ttlPmtAmt, 'add'));
	var mainData = SCFUtils.convertArray('rePaymentForm');
	var grid = {};
	var griddata = SCFUtils.getGridData('loanTable');
	grid.loan = SCFUtils.json2str(griddata);
	
	var payIntTp = $('#payIntTp').combobox('getValue');
	if('2' == payIntTp){//利随本清是打包利息表数据
		//得到利息产生时间
		var createDt = "";
		if('PM' === SCFUtils.FUNCTYPE || 'FP' === SCFUtils.FUNCTYPE){
			createDt = getMinLoanValDt();//利息产生时间
		}else{
			var createDt = relQueryIntE().createDt;
		}
		//利息计算
		var intList= {};
		intList._total_rows = 1;//total_rows不给值会默认没有数据，一笔还款只有一条记录
		var obj= {};
		obj.sysRefNo = $("#intSysRefNo").val();
		obj.cntrctNo = $('#cntrctNo').val();
		obj.trxDt = $('#pmtDt').datebox('getValue');
		obj.selId = $('#selId').val();
		obj.busiTp = $("#busiTp").combobox('getValue');
		obj.intTp = 0;
		obj.currIntDt = SCFUtils.getcurrentdate();//利随本清时，本次应收利息日期为当前时间  new
		obj.intCcy = $("#ccy").combobox('getValue');
		obj.currInt = 0;//利随本清时，本次应收利息为0
		obj.currPayInt = $('#payIntAmt').numberbox('getValue');//本次实收利息
		obj.currIntPayDt = $('#pmtDt').datebox('getValue');//本次利息实收日期
		obj.theirRef = $('#sysRefNo').val();
		obj.selAcNo =queryCustAcno().acNo;//收费扣款账号
		obj.selAcNm = queryCustAcno().acNm;//账户户名
		obj.selAcBkNm = queryCustAcno().acBkNm;//开户行行名
		obj.intAmt = '';//总利息金额
		obj.createDt = createDt;//利息产生时间=融资起始日(PM时生成，其余都查询)
		obj.intPayFlg = 1;//利息收取标志 0.应收未收 1.应收已收
		obj.payIntTp = 2;//new 收取方式（直接为2 利随本清）
		obj.overdueInt = '';//本次逾期利息
		intList['rows0'] = obj;
		grid.int = SCFUtils.json2str(intList);
	}
	//打包卖方额度数据
	grid.sellerLmt = SCFUtils.json2str(getSellerData());
	$.extend($.extend(mainData, grid));
	return mainData;
}


/**
 * 本次还款金额发生变化，相应字段跟着变化
 */
function changePmtAmt() {
	var ttlPmtAmt = $("#ttlPmtAmt").numberbox("getValue");// 本次还款金额
	var loan = SCFUtils.getGridData('loanTable');
	$.each(SCFUtils.parseGridData(loan), function(i, n) {
		// 获取融资余额
		var ttlLoanBal = n.ttlLoanBalBak;
		// 获取利息
		var intAmt = n.intAmtBak;
		// 预收息 方式，冲销融资余额即可
		if (n.payIntTp == '预收息') {
			// 如果还款金额大融资余额，则更新本行还款本金为融资余额，融资余额为0
			if (SCFUtils.Math(ttlPmtAmt, ttlLoanBal, 'sub') > 0) {
				$('#loanTable').datagrid('updateRow', {
					index : i,
					row : {
						payPrinAmt : ttlLoanBal,
						pmtAmt : ttlLoanBal,
						ttlLoanBal : 0
					}
				});
			} else {
				$('#loanTable').datagrid('updateRow',{
							index : i,
							row : {
								payPrinAmt : ttlPmtAmt,
								pmtAmt : ttlPmtAmt,
								ttlLoanBal : SCFUtils.Math(ttlLoanBal,ttlPmtAmt, 'sub')
							}
						});
			}
		}
		// 利随本清 需要冲销融资余额+利息
		if (n.payIntTp == '利随本清') {
			//首先判断还款金额是否大于融资余额+利息
			if (SCFUtils.Math(ttlPmtAmt, SCFUtils.Math(ttlLoanBal, intAmt,'add'), 'sub') > 0) {
				$('#loanTable').datagrid('updateRow', {
					index : i,
					row : {
						payPrinAmt : ttlLoanBal,
						payIntAmt : intAmt,
						pmtAmt : SCFUtils.Math(ttlLoanBal,intAmt, 'add'),
						ttlLoanBal : 0,
						intAmt : 0
					}
				});
			}else{
				//再判断还款金额是否大于利息
				if (SCFUtils.Math(ttlPmtAmt, intAmt, 'sub') > 0) {
					$('#loanTable').datagrid('updateRow',{
								index : i,
								row : {
									payPrinAmt : SCFUtils.Math(ttlPmtAmt,intAmt, 'sub'),
									payIntAmt : intAmt,
									pmtAmt : SCFUtils.Math(SCFUtils.Math(ttlPmtAmt,intAmt, 'sub'),intAmt, 'add'),
									ttlLoanBal : SCFUtils.Math(ttlLoanBal,SCFUtils.Math(ttlPmtAmt,intAmt, 'sub'), 'sub'),
									intAmt : 0
								}
							});
				}else{
					$('#loanTable').datagrid('updateRow', {
						index : i,
						row : {
							payPrinAmt : 0,
							payIntAmt : ttlPmtAmt,
							pmtAmt : ttlPmtAmt,
							ttlLoanBal:ttlLoanBal,
							intAmt : SCFUtils.Math(intAmt,ttlPmtAmt, 'sub')
						}
					});
				}
			}
		}
		//剩余的钱
		ttlPmtAmt = SCFUtils.Math(ttlPmtAmt,n.pmtAmt, 'sub');
	});
	
	//获取变化之后表格的数据
	var loanNew = SCFUtils.getGridData('loanTable');
	var intAmtHD=0.00;//利息总额
	var payIntAmtHD=0.00;//本次还利息
	var payPrinAmtHD=0.00;//本次还本金
	$.each(SCFUtils.parseGridData(loan), function(i, n) {
		intAmtHD=SCFUtils.Math(intAmtHD,n.intAmt, 'add');
		payIntAmtHD=SCFUtils.Math(payIntAmtHD,n.payIntAmt, 'add');
		payPrinAmtHD=SCFUtils.Math(payPrinAmtHD,n.payPrinAmt, 'add');
	});
	//主页赋值
	$('#intAmt').numberbox('setValue',intAmtHD);
	$('#payIntAmt').numberbox('setValue',payIntAmtHD);
	$('#payPrinAmt').numberbox('setValue',payPrinAmtHD);
	$('#ttlLoanBal').numberbox('setValue',SCFUtils.Math($('#ttlLoanBalOld').val(),payPrinAmtHD, 'sub'));
	$('#arAvalLoan').numberbox('setValue',SCFUtils.Math($('#arAvalLoanOld').val(),payPrinAmtHD, 'add'));
}

/*
 * 复核时候查询INT的E表
 */
function relQueryIntE(){
	var selId = $("#selId").val();
	var sysRefNo = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000618',
			selId : selId,
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$("#intSysRefNo").val(data.rows[0].sysRefNo);
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

/*
 * new on 2016-10-12 by JJH
 * 查询卖方的扣款账号
 */
function queryCustAcno(){
	var acOwnerid=$("#selId").val();
	var obj = {};
	if(!SCFUtils.isEmpty(acOwnerid)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000180',
					acOwnerid : acOwnerid,
					acFlag    : 'R',
					acTp    : '2'
				},
				callBackFun : function(data1) {
					if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
						obj = data1.rows[0];
					}
				}
			};
			SCFUtils.ajax(opt);
			return obj;
	}
}

/*
 * 得到表单勾选数据中的最早的那个起息日
 */
function getMinLoanValDt(){
	var data = SCFUtils.getGridData('loanTable');
	var minLoanValDt = data.rows0.loanValDt;
	$.each(data, function(i, n){
		if(SCFUtils.Math(n.pmtAmt,0,'sub')==0){
			return true;
		}
		if(SCFUtils.DateDiff(n.loanValDt,minLoanValDt)<0){
			minLoanValDt = n.loanValDt;
		}
	});
	return minLoanValDt;
}
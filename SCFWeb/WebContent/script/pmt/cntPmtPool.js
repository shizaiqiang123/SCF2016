var totalPayTranAMt = 0.0000;
// var totalPayBillAmt = 0.0000;
// var totalStruLoanAmt = 0.0000;
var totalPayAmt = 0.0000;
var totalSurPayAmt = 0.0000;
var FPLoadTable = 0;
var list = [];
var ischangeStruLoanAmt = false;//创建一个是否触发onchange事件的变量
function ajaxBox() {
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
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("lmtCcy", true);
//	SCFUtils.setNumberboxReadonly("ttlPmtAmt", true);
	// SCFUtils.setNumberboxReadonly("payTranAmt", true);
	// SCFUtils.setNumberboxReadonly("payBillAmt", true);
	SCFUtils.setTextReadonly("sysRefNo", true);
	$('tr[id=Tr1]').hide();
	$('tr[id=Tr2]').hide();
	$('tr[id=Tr3]').hide();
	$('tr[id=Tr4]').hide();
	$('tr[id=Tr5]').hide();

}

/**
 * 根据协议编号查询买方信息
 */
function queryBuyerInfo(cntrctNo,buyerId) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000567',
			cntrctNo : cntrctNo,
			buyerId : buyerId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$('#buyerNm').val(data.rows[0].buyerNm);
				$('#buyerId').val(data.rows[0].buyerId);
				$('#trxId').val(data.rows[0].sysRefNo);
				// 获取买方额度信息
				//getBuyerLmt(data.rows[0].buyerId);
			} 
		}
	};
	SCFUtils.ajax(options);
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function pageOnFPLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	ischangeStruLoanAmt = false;
	
	SCFUtils.loadForm('pmtForm', row);
	$('#OldSysRelReason').textbox('setValue',row.OldSysRelReason);
	
	$("#intSysRefNo").val(relQueryIntE().sysRefNo);
	reLoadTable();
	loadLoanMTableRe();//查询loanM
	$('#invcMTable').datagrid('selectAll',true);//在加载数据初始化时就将datagrid中的数据默认全勾选
	$('#lmtAmtHd').numberbox('setValue', data.obj.lmtAmt);
	$('#lmtAllocateHd').numberbox('setValue', data.obj.lmtAllocate);
	$('#lmtBalHd').numberbox('setValue', data.obj.lmtBal);
	var selId = $("#selId").val();
	getSellerHKH(selId);
	var busiTp = $("#busiTp").val();
	queryCntrctInfoFP(data.obj.cntrctNo,data.obj.sysRefNo);
	if (data.obj.busiTp == '3') {
		queryCollatCompNm(data.obj.insureNo);
	} else {
		changeBusiTp();
	}
	/*
	 * 给ttlPmtAmtHd字段赋值，为了“下一步”能通过控制
	 */
	var ttlInvBal = 0;     //invBal
	$.each(SCFUtils.getSelectedGridData('invcMTable', false),function(i,n){
		ttlInvBal = SCFUtils.Math(ttlInvBal,n.invBalHd,'add');
	});
	$("#ttlPmtAmtHd").val(ttlInvBal);
	$('#ttlPmtAmt').numberbox({    
		max:parseFloat(ttlInvBal),
	}); 
	//给buyerId字段赋值
//	queryBuyerIdFP(data.obj.cntrctNo,data.obj.sysRefNo);
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
	getBuyerLmt(data.obj.buyerId);//得到更新sbr表要的值
	ischangeStruLoanAmt = true;
	lookSysRelReason();
}
function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	ischangeStruLoanAmt = true;
	SCFUtils.loadForm('pmtForm', data);
	var options = {};
	options.data = {
		refName : 'PoolPmtRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	$('#buyerLmtSysRefNo').val(data.obj.lmtSysRefNo);// 买方额度流水号
	$('#lmtAmtHd').numberbox('setValue', data.obj.lmtAmt);
//	$('#lmtAllocateHd').numberbox('setValue', data.obj.lmtAllocate);
	$('#cntrctNo').val(data.obj.sysRefNo);
	$('#lmtBalHd').numberbox('setValue', data.obj.lmtBal);
	var selId = $("#selId").val();
	getSellerHKH(selId); // 获取卖方保理专户
	getCntrctSbrSysRefNo(data.obj.sysRefNo);
	getBuyerLmt(data.obj.buyerId);
	defineDataGridEvent();
	$('#loanId').val("");
	if (data.obj.busiTp == '3') {
		queryInsure(data.obj.sysRefNo);
	} else {
		changeBusiTp();
	}
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
	loadLoanMTable();
	//给主页临时字段赋值
	$("#arAvalLoanHd").val(data.obj.arAvalLoan);
	$("#arBalHd").val(data.obj.arBal);
	$("#openLoanAmtHd").val(data.obj.openLoanAmt);
	$("#poolLineHd").val(data.obj.poolLine);
	lookSysRelReason();
}

function queryInsure(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000424',
			cntrctNo : data
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#collatCompNm').textbox('setValue',
						data.rows[0].collatCompNm);
				$('#insureNo').val(data.rows[0].insureNo);
			}
		}
	};
	SCFUtils.ajax(options);
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	ischangeStruLoanAmt = false;
	SCFUtils.loadForm('pmtForm', data);
	SCFUtils.loadGridData('invcMTable', SCFUtils.parseGridData(data.obj.invc),
			true);// 加载数据并保护表格。
	SCFUtils.loadGridData('loanMTable', SCFUtils.parseGridData(data.obj.loan),
			true);// 加载数据并保护表格。
	
	var griddataLoan = SCFUtils.getGridData('loanMTable');// 打包全部
    if(griddataLoan._total_rows == 0){
    	$("#loanMDiv").parent("div").parent("div").attr("style","display:none");
	}
	
	$('#invcMTable').datagrid('hideColumn', 'ck');
//	$('#invcMTable').datagrid('selectAll');
	$('#loanMTable').datagrid('hideColumn', 'ck');
	$('#querybutton').linkbutton('disable');
	$('#acceptbutton').linkbutton('disable');
//	loadLoanMTable();
	lookSysRelReason();
}

/*function showLookUpWindow() {
	var sysRefNo = $('#cntrctNo').val();
	var options = {
		title : '合同号信息查询',
		reqid : 'I_P_000120',
		data : {
			'cntrctNo' : sysRefNo
		},
		onSuccess : cntrctNoSuccess
	};
	SCFUtils.getData(options);

}*/

function getCntrctSbrSysRefNo(data) {
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000374',
			trxId : data,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#sysRefNoSbr').val(data.rows[0].sysRefNo);
				$('#cntrctSbrBuyerBal').numberbox('setValue',
						data.rows[0].buyerLmtBat);
				$('#cntrctSbrBuyerBalHd').numberbox('setValue',
						data.rows[0].buyerLmtBat);
			}
		}
	};
	SCFUtils.ajax(opts);
}

function getBuyerLmt(data) {
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000375',
			sysRefNo : data,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#buyerlmtBal').numberbox('setValue', data.rows[0].lmtBal);
				$('#buyerlmtAvl').numberbox('setValue',
						data.rows[0].lmtAllocate);
				$('#buyerlmtBalHd').numberbox('setValue', data.rows[0].lmtBal);
				$('#buyerlmtAvlHd').numberbox('setValue',
						data.rows[0].lmtAllocate);
				$('#lmtAllocate').numberbox('setValue',data.rows[0].lmtAllocate);
				$('#lmtAllocateHd').numberbox('setValue',data.rows[0].lmtAllocate);
			}
		}
	};
	SCFUtils.ajax(opts);
}

/*function cntrctNoSuccess(data) {
	$("#loanId").textbox('setValue', data.sysRefNo);
}*/

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	ischangeStruLoanAmt = false;
	SCFUtils.loadForm('pmtForm', data);
	SCFUtils.loadGridData('invcMTable', SCFUtils.parseGridData(data.obj.invc),
			true,true);
	SCFUtils.loadGridData('loanMTable', SCFUtils.parseGridData(data.obj.loan),
			true,true);
	var griddataLoan = SCFUtils.getGridData('loanMTable');// 打包全部
    if(griddataLoan._total_rows == 0){
    	$("#loanMDiv").parent("div").parent("div").attr("style","display:none");
	}
	$('#invcMTable').datagrid('selectAll');
	SCFUtils.setNumberspinnerReadonly("ttlPmtAmt", true);
//	defineDataGridEvent();
//	loadTable();
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	$('#sysRelReason').textbox('setValue',data.obj.sysRelReason);
	lookSysRelReason();

}

function queryCollatCompNm(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000428',
			cntrctNo : data
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#collatCompNm').textbox('setValue', data.rows[0].custNm);
			}
		}
	};
	SCFUtils.ajax(options);
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	ischangeStruLoanAmt = false;
	SCFUtils.loadForm('pmtForm', row);
	$('#querybutton').linkbutton('disable');
//	$('#acceptbutton').linkbutton('disable');
	var selId = $("#selId").val();
	getSellerHKH(selId);
	var busiTp = $("#busiTp").val();
	reLoadTable();
	loadLoanMTableRe();//查询loanM
	if (data.obj.busiTp == '3') {
		queryCollatCompNm(data.obj.insureNo);
	} else {
		changeBusiTp();
	}
	$('#invcMTable').datagrid('hideColumn', 'ck');
	$('#invcMTable').datagrid('uncheckAll');
	SCFUtils.setDatagridReadonly('invcMTable', true);
	getBuyerLmt(data.obj.buyerId);//得到更新sbr表要的值
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
	queryCntrctInfo(data.obj.cntrctNo,data.obj.sysRefNo);
	if(relQueryIntE().length > 0){
		$("#intSysRefNo").val(relQueryIntE().sysRefNo);
	}
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleasePreLoad(data) {
	ischangeStruLoanAmt = false;
	$('#querybutton').linkbutton('disable');
	$('#acceptbutton').linkbutton('disable');
	var selId = $("#selId").val();
	getSellerHKH(selId);
	SCFUtils.loadForm('pmtForm', data);
	var busiTp = $("#busiTp").val();
	reLoadTable();
	$('#invcMTable').datagrid('hideColumn', 'ck');
	SCFUtils.loadGridData('loanMTable', SCFUtils.parseGridData(data.obj.loan),
			false);
	var griddataLoan = SCFUtils.getGridData('loanMTable');// 打包全部
    if(griddataLoan._total_rows == 0){
    	$("#loanMDiv").parent("div").parent("div").attr("style","display:none");
	}
	SCFUtils.setDatagridReadonly('invcMTable', true);

	// SCFUtils.loadGridData('invcMTable',
	// SCFUtils.parseGridData(data.obj.invc), false);
	// SCFUtils.loadGridData('invcMTable',
	// SCFUtils.parseGridData(data.obj.invc),
	// true);// 加载数据并保护表格。
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnInt(data) {
	ajaxBox();
	ajaxTable();
	//$("#loanMDiv").parent("div").parent("div").attr("style","display:none");
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


function checkDataGrid() {
	var flag = false;
	var ttlPmtAmt = $('#ttlPmtAmt').numberbox('getValue')
	if (!SCFUtils.Math(ttlPmtAmt, 0, 'sub') > 0) {
		flag = true;
	}
	return flag;
}

/*
 * 判断所有发票融资余额(冲销后)总额>=融资余额(融资主表) 传入参数 发票的交易流水号(useless)
 */
function checkLoanBal(data, list) {
	var temp;
	var temp1 = 0.0000;
	var temp2 = 0.0000;
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000408',
			invRef : data
		},
		callBackFun : function(data) {
			temp1 = data.rows[0].ttlLoanBal;
			temp = data.rows[0].sysRefNo;
		}
	};
	SCFUtils.ajax(opt);

	var buyerId = $('#buyerId').val();
	var opt1 = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000409',
			invcLoanId : temp,
			buyerId : buyerId
		},
		callBackFun : function(data) {
			$.each(data.rows,
					function(i, n) {
						if (contains(list, n.sysRefNo)) {
							var index = getIndex(list, n.sysRefNo);
							temp2 = SCFUtils.Math(temp2,
									list[index].invLoanBal, 'add');
						} else {
							temp2 = SCFUtils.Math(temp2, n.invLoanBal, 'add');
						}
					});
		}
	};
	SCFUtils.ajax(opt1);

	if (SCFUtils.Math(temp1, temp2, 'sub') > 0) {
		return true;
	}
	return false;

}

function contains(a, obj) {
	for ( var i in a) {
		if (a[i].sysRefNo === obj) {
			return true;
		}
	}
	return false;
}

function getIndex(a, obj) {
	for ( var i in a) {
		if (a[i].sysRefNo === obj) {
			return i;
		}
	}
	return;
}

/*
 * 获取买方额度信息
 */
function getBuyerLmtData(){
	var buyerLmt = {};// 添加买方额度信息
	buyerLmt._total_rows = 1;
	var obj = {};
	var lmtTp = '0';
	if('RE'===SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE ){
		obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		obj.lmtBal = relQueryLmtE(lmtTp)[0].lmtBal ;//买方额度余额
		obj.lmtAllocate = relQueryLmtE(lmtTp)[0].lmtAllocate ;//本次占用额度
		obj.lmtRecover = relQueryLmtE(lmtTp)[0].lmtRecover ;//归还额度

	}else{
		if('FP'===SCFUtils.FUNCTYPE){
			obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		}else{
			obj.sysRefNo = $('#buyerLmtSysRefNo').val();
		}
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#ttlPmtAmt').numberbox('getValue'),'add') ;//买方额度余额=原买方额度余额+还款金额
		obj.lmtAllocate = parseFloat(SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#ttlPmtAmt').numberbox('getValue'),'sub')) ;//本次占用额度=原来占用额度-还款金额
		
		obj.lmtRecover = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtRecover,$('#ttlPmtAmt').numberbox('getValue'),'add') ;//归还额度=原归还额度+还款金额

	}
	obj.ttlAllocate = 0;//已占用额度
	obj.theirRef = $('#sysRefNo').val();//主页流水号
	
	buyerLmt['rows0'] = obj;
	return buyerLmt;

}
/*
 * 获取卖方额度信息
 */
function getSellerData() {
	querySellerLmt();
	griddata = SCFUtils.getGridData("loanMTable", false);
	var invLoanBalHd = '';
		$.each(SCFUtils.parseGridData(griddata), function(i, n) {
			//var stuLoanAmt = SCFUtils.Math(n.invLoanBalHd,n.pmtAmt,'sub');
			invLoanBalHd = SCFUtils.Math(invLoanBalHd,n.pmtAmt,'add');
			 
	});
	
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
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtBal,invLoanBalHd,'add') ;//卖方额度余额=原卖方额度余额+融资余额
		obj.lmtAllocate = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtAllocate,invLoanBalHd,'sub') ;//本次占用额度=原来占用额度-融资余额
		obj.lmtRecover = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtRecover,invLoanBalHd,'add') ;//归还额度=原归还额度+融资余额

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
	var ttlLoanBal = $('#ttlPmtAmt').numberbox('getValue');
	if (ttlLoanBal <= 0) {
		SCFUtils.alert('核销金额必须大于0！');
		return;
	}
	if('PM' === SCFUtils.FUNCTYPE || 'FP' === SCFUtils.FUNCTYPE){
		if (SCFUtils.Math(ttlLoanBal,$("#ttlPmtAmtHd").val(),'sub')>0) {
			SCFUtils.alert('本次核销金额大于可核销应收账款金额，请调整！');
			return;
		}
	}
	getLmt();//计算额度的方法要在mainData上面。不然不会改变主页的值
	var mainData = SCFUtils.convertArray('pmtForm');
	//还原买方卖方额度
		var cntrctNo = mainData.cntrctNo;//协议编号
		var buyerId = mainData.buyerId;
		
		//协议相关信息
		var cntrct=queryLimitInfo(cntrctNo);
		
		//客户表相关信息
		var custInfo = queryCustInfo(buyerId);
		
		//额度关联表相关信息
		var cntrctSbrInfo = queryCntrctSbrInfo(cntrctNo, buyerId);
		$.extend(mainData,{
			"cntrctLmtCcy" : cntrct.lmtCcy ,//额度币别
			"custLmtCcy" : custInfo.ccy ,//额度币别
			"cntrctSbrLmtCcy" : cntrctSbrInfo.lmtCcy ,//额度币别
			
			"cntrctLmtBal" : SCFUtils.Math(cntrct.lmtBal, ttlLoanBal, 'add'),//协议_额度余额 = 原额度余额+核销应收账款总额
			"custLmtBal" : SCFUtils.Math(custInfo.lmtBal, ttlLoanBal, 'add'),//客户_额度余额 = 原额度余额+核销应收账款总额
			"cntrctSbrLmtBal" : SCFUtils.Math(cntrctSbrInfo.buyerLmtBat, ttlLoanBal, 'add'),//额度关联信息_额度余额 = 原额度余额+核销应收账款总额
			
			'cntrctLmtAmt' : cntrct.lmtAmt, //协议_额度金额
			'custLmtAmt' : custInfo.lmtAmt, //客户信息表_额度金额
			'cntrctSbrLmtAmt' : cntrctSbrInfo.buyerLmtAmt, //额度关联信息表_额度金额
			
			'cntrctLmtAllocate' : SCFUtils.Math(cntrct.lmtAllocate, ttlLoanBal, 'sub'), //协议_占用额度 = 原占用额度-核销应收账款总额
			'custLmtAllocate' : SCFUtils.Math(custInfo.lmtAllocate, ttlLoanBal, 'sub'),  //客户_占用额度 = 原占用额度-核销应收账款总额
			'cntrctSbrLmtAllocate' : SCFUtils.Math(cntrctSbrInfo.lmtAllocate, ttlLoanBal, 'sub'), //额度关联信息_占用额度 = 原占用额度-核销应收账款总额
			
			'cntrctLmtRecover' :SCFUtils.Math(cntrct.lmtRecover, ttlLoanBal, 'add'), //协议_归还额度 =原归还额度+核销应收账款总额
			'custLmtRecover' :SCFUtils.Math(custInfo.lmtRecover, ttlLoanBal, 'add'), //客户_归还额度 =原归还额度+核销应收账款总额
			'cntrctSbrLmtRecover' :SCFUtils.Math(cntrctSbrInfo.lmtRecover, ttlLoanBal, 'add'),  //额度关联信息_归还额度 =原归还额度+核销应收账款总额
			'sysRelReason' : $('#sysRelReason').val(),
			'OldSysRelReason' : $('#OldSysRelReason').val(),
			
		});
	if ('PM' == SCFUtils.FUNCTYPE) {
		var data = SCFUtils.getSelectedGridData('invcMTable', false);
		var list = [];
		$.each(data, function(i, n) {
			var temp = {
				'sysRefNo' : n.invRef,
				'invLoanBal' : n.invLoanBal
			};
			list.push(temp);
		});
			addEventTimes();
			var grid = {};
			var griddata;
			var griddataLoan;
			if ('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE) {
				griddata = SCFUtils.getGridData('invcMTable');
				griddataLoan = SCFUtils.getGridData('loanMTable');//打包全部
			} else {
				if (checkDataGrid()) {
					return;
				}
//				var accetpFlag = $("#accetpFlag").val();
//				if (acceptSaved(accetpFlag)) {
//					return;
//				}
				griddata = SCFUtils.getSelectedGridData('invcMTable', false);
				griddataLoan = SCFUtils.getGridData('loanMTable');//打包全部
			}
			var selId = $('#selId').val();
			var selName = $('#selNm').val();
			var sysRefNo = $('#sysRefNo').val();
			var ccy = $('#lmtCcy').combobox('getValue');
			var ttlLoanBal = $('#ttlPmtAmt').numberbox('getValue');
			$.extend($.extend(mainData, grid), {
				"custNo" : selId
			}, {
				"custNm" : selName
			}, {
				"rerNo" : sysRefNo
			}, {
				"refNo" : sysRefNo
			}, {
				"trxCcy" : ccy
			}, {
				"trxAmt" : ttlLoanBal
			}, {
				"expTrxAmt" : ttlLoanBal
			}, {
				"clType" : "O"
			}, {
				"tdType" : "R"
			}, {
				"trxDate" : SCFUtils.getcurrentdate()
			});
			grid.invc = SCFUtils.json2str(griddata);
			grid.loan = SCFUtils.json2str(griddataLoan);
			if(cntrct.payIntTp == "2"){//利随本清
				grid.int = SCFUtils.json2str(getIntData());//打包利息表data
			}else if(cntrct.payIntTp == "1"){
				grid.int = {};//打包利息表data
			}
			//打包买方额度数据
			grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
			//打包卖方额度数据
			grid.sellerLmt = SCFUtils.json2str(getSellerData());
			$.extend(mainData, grid);
			return mainData;
	} else {
		// addEventTimes();//提交时给还款子表的eventTimes字段赋值
		var grid = {};
		var griddata;
		if ('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE) {
			griddata = SCFUtils.getGridData('invcMTable');
			griddataLoan = SCFUtils.getGridData('loanMTable');//打包全部
		} else {
			if (checkDataGrid()) {
				return;
			}
//			var accetpFlag = $("#accetpFlag").val();
//			if (acceptSaved(accetpFlag)) {
//				return;
//			}
			griddata = SCFUtils.getSelectedGridData('invcMTable', false);
			griddataLoan = SCFUtils.getGridData('loanMTable');//打包全部
		}
		var selId = $('#selId').val();
		var selName = $('#selNm').val();
		var sysRefNo = $('#sysRefNo').val();
		var ccy = $('#lmtCcy').combobox('getValue');
		var ttlLoanBal = $('#ttlPmtAmt').numberbox('getValue');
		$.extend($.extend(mainData, grid), {
			"custNo" : selId
		}, {
			"custNm" : selName
		}, {
			"rerNo" : sysRefNo
		}, {
			"refNo" : sysRefNo
		}, {
			"trxCcy" : ccy
		}, {
			"trxAmt" : ttlLoanBal
		}, {
			"expTrxAmt" : ttlLoanBal
		}, {
			"clType" : "S"
		}, {
			"tdType" : "R"
		}, {
			"trxDate" : SCFUtils.getcurrentdate()
		});
		grid.invc = SCFUtils.json2str(griddata);
		grid.loan = SCFUtils.json2str(griddataLoan);
		if(cntrct.payIntTp == "2"){//利随本清
			grid.int = SCFUtils.json2str(getIntData());//打包利息表data
		}else if(cntrct.payIntTp == "1"){
			grid.int = {};//打包利息表data
		}
		//打包买方额度数据
		grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
		//打包卖方额度数据
		grid.sellerLmt = SCFUtils.json2str(getSellerData());
		$.extend(mainData, grid);
		return mainData;
	}
}

function getLmt() {
	var ttlPmtAmt = $('#ttlPmtAmt').numberbox('getValue');
	$('#cntrctSbrBuyerBal').numberbox('setValue',SCFUtils.Math(ttlPmtAmt, $('#cntrctSbrBuyerBalHd').numberbox('getValue'), 'add'));
	$('#buyerlmtBal').numberbox('setValue',SCFUtils.Math(ttlPmtAmt, $('#buyerlmtBalHd').numberbox('getValue'),'add'));
	$('#buyerlmtAvl').numberbox('setValue',SCFUtils.Math($('#buyerlmtAvlHd').numberbox('getValue'), ttlPmtAmt,'sub'));
}
/**
 * 提交时给还款子表的eventTimes字段赋值 还款子表的eventTimes值为发票E表中最大sysEventTImes+1
 */

function addEventTimes() {
	var griddata = SCFUtils.getSelectedGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	$.each(datas, function(i, n) {
		var eventTimes = queryInvcEmaxEventTImes(n.sysRefNoEventTms);
		$.extend(n, {
			eventTimes : eventTimes
		});
	});
}
// 根据sysRefNo查询发票E表中最大evnetTImes
function queryInvcEmaxEventTImes(sysRefNo) {
	var eventTimes = 1;
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000203',
			sysRefNo : sysRefNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				eventTimes = SCFUtils.Math(data.rows[0].eventTimes, 1, 'add');
			}
		}
	};
	SCFUtils.ajax(opts);
	return eventTimes;
}

//function acceptSaved(accetpFlag) {
//	if (accetpFlag == "true") {
//		return false;
//	} else {
//		SCFUtils.alert('请您点击接受改变按键以便进行下一步操作！');
//		return true;
//	}
//}

function defineDataGridEvent() {
	$('#accetpFlag').val("false");
	var options = $('#invcMTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
}
function onCheck(rowIndex, rowData) {
	/*rowData.ck = true;
//	$('#accetpFlag').val("false"); // 是否已接受编辑。

	var index = $("#invcMTable").datagrid('getAllRowIndex', rowData);
	list.push({
		index : rowIndex,
		tempTranAmt : rowData.tempTranAmt,
		tempBillAmt : rowData.tempBillAmt,
		struLoanAmt : rowData.struLoanAmt
	});
	$('#invcMTable').datagrid('updateRow', {
		index : rowIndex,
		row : {//选中时直接冲销最大值
			// 当选中一行数据时，给字段重新改值
			struLoanAmt :rowData.invBal
		}
	});
	onClickRow(rowIndex);*/
}

function onUncheck(rowIndex, rowData) {
	/*rowData.ck = false;
	$('#accetpFlag').val("false");
	$('#invcMTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			invLoanBal : rowData.invLoanBalHd,
			invLoanAval : rowData.invLoanAvalHd,
			invBal : rowData.invBalHd,
			struLoanAmt : 0.00,
			loanAmt : rowData.loanAmtHd,
		}
	});
	endEditing();
	$('#ttlPmtAmt').numberbox('setValue', 0);*/
}
function onCheckAll(rows) {
//	$.each(rows, function(i, n) {
//		onUncheck(i, n);
//		onCheck(i, n);
//	});
}

function onUncheckAll(rows) {
//	$.each(rows, function(i, n) {
//		onUncheck(i, n);
//	});
}

function reLoadTable() {//复核时候的查询
	var invPmtRef = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000571',
			invPmtRef : invPmtRef
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				if('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE)
					$.each(data.rows,function(i,n){
						if(n.invBal==0){
							$.extend(n, {
//								invBalHd : 
								inPool : 1
							});
						}else{
							$.extend(n, {
								inPool : 0
							});
						}
					});
					SCFUtils.loadGridData('invcMTable', data.rows, true, true);//复核时候保护表格
					forEachRe(data.rows);
				if('FP' === SCFUtils.FUNCTYPE){
					$.each(data.rows,function(i,n){
						if(n.invBal==0){
							$.extend(n, {
								inPool : 1
							});
						}else{
							$.extend(n, {
								inPool : 0
							});
						}
					});
					SCFUtils.loadGridData('invcMTable', data.rows, false, true);//在途申请时候不保护表格
					forEachRe(data.rows);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadTable() {
	SCFUtils.setNumberspinnerReadonly("ttlPmtAmt", false);
	var cntrctNo = $("#cntrctNo").val();
	FPLoadTable = SCFUtils.Math(FPLoadTable, 1, 'add');
	if (SCFUtils.CURRENTPAGE == '1'
			&& ('PM' == SCFUtils.FUNCTYPE || 'FP' == SCFUtils.FUNCTYPE)) {//原来为('FP' == SCFUtils.FUNCTYPE && FPLoadTable != '1'))
		if (SCFUtils.isEmpty($('#buyerId').val())) {
			SCFUtils.alert('请指定间接客户！');
			return;
		}
		var buyerId = $('#buyerId').val();
		var selId = $('#selId').val();
		var busiTp = $('#busiTp').combobox('getValue');
		var cntrctNo = $('#cntrctNo').val();
		$('#accetpFlag').val("false");
		$('#invcMTable').datagrid('clearChecked');
//		var data = SCFUtils.convertArray("pmtForm");
		if($("#acNo").combobox('getValue')==null || $("#acNo").combobox('getValue')==""){
			SCFUtils.alert('请指定扣款账号！');
			return;
		}
		var sysLockBy = $("#sysRefNo").val();
			if('PM' === SCFUtils.FUNCTYPE){
			var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000568',
					buyerId : buyerId,
					selId : selId,
					busiTp : busiTp,
					cntrctNo : cntrctNo,
					cacheType : 'non'
				},
				callBackFun : function(data) {
					if (data.success) {
						if (!SCFUtils.isEmpty(data.rows)) {
							SCFUtils.loadGridData('invcMTable', data.rows,
									true, true);//加载的时候就保护数据，struLoanAmt自动计算
							forEach(data.rows);
							getTtlPmtAmt(data.rows);
						} else {

							SCFUtils.alert("没有符合的应收账款");
						}
					} else {
						SCFUtils.alert("查询失败");
					}
				}
			};
			SCFUtils.ajax(options);
			editIndex = undefined;
			ischangeStruLoanAmt = true;
			changeStruLoanAmt();//触发发票冲销款的计算
			}else if('FP' === SCFUtils.FUNCTYPE ){
				loadLoanMTable();
				var options = {
						url : SCFUtils.AJAXURL,
						data : {
							queryId : 'Q_P_000573',
							buyerId : buyerId,
							selId : selId,
							busiTp : busiTp,
							sysLockBy : sysLockBy,
							cntrctNo : cntrctNo,
							cacheType : 'non'
						},
						callBackFun : function(data) {
							if (data.success) {
								if (!SCFUtils.isEmpty(data.rows)) {
									SCFUtils.loadGridData('invcMTable', data.rows,
											true, true);
									forEach(data.rows);
									getTtlPmtAmt(data.rows);
								} else {

									SCFUtils.alert("没有符合的应收账款");
								}
							} else {
								SCFUtils.alert("查询失败");
							}
						}
					};
					SCFUtils.ajax(options);
					editIndex = undefined;
					ischangeStruLoanAmt = true;
					changeStruLoanAmt();//触发发票冲销款的计算
			}
	}
}

//加载融资信息datagrid
function loadLoanMTable(){
	var cntrctNo = $("#cntrctNo").val();
	var sysLockBy = $("#sysRefNo").val();
//	alert(cntrctNo);
	//融资loanM表单
	if('PM' === SCFUtils.FUNCTYPE ){
		var optionsLoan = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000569',
					cntrctNo : cntrctNo,
					cacheType : 'non'
				},
				callBackFun : function(data) {
					if (data.success) {
						if (!SCFUtils.isEmpty(data.rows)) {
							SCFUtils.loadGridData('loanMTable', data.rows,
									true, true);//加载的时候就保护数据，struLoanAmt自动计算
//						forEach(data.rows);
							$.each(data.rows, function(i, n) {
								$('#loanMTable').datagrid(
										'updateRow',
										{
											index : i,
											row : {
												loanId : n.sysRefNo,//将流水号给loanId
												ttlLoanBalHd : n.ttlLoanBal//LOAN_M. Ttl_Loan_Bal = Ttl_Loan_Bal- Pay_Prin_Amt.
											}
										});
							});
						} 
						else {
							$("#loanMDiv").parent("div").parent("div").attr("style","display:none");
						}
					} else {
						SCFUtils.alert("查询失败");
					}
				}
		};
		SCFUtils.ajax(optionsLoan);
	}
	else if('FP' === SCFUtils.FUNCTYPE ){
		var optionsLoan = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000574',
					cntrctNo : cntrctNo,
					sysLockBy : sysLockBy,
					cacheType : 'non'
				},
				callBackFun : function(data) {
					if (data.success) {
						if (!SCFUtils.isEmpty(data.rows)) {
							SCFUtils.loadGridData('loanMTable', data.rows,
									true, true);//加载的时候就保护数据，struLoanAmt自动计算
//							forEach(data.rows);
							$.each(data.rows, function(i, n) {
							$('#loanMTable').datagrid(
									'updateRow',
									{
										index : i,
										row : {
											loanId : n.sysRefNo,//将流水号给loanId
											ttlLoanBalHd : n.ttlLoanBal//LOAN_M. Ttl_Loan_Bal = Ttl_Loan_Bal- Pay_Prin_Amt.
										}
									});
							});
						} 
						else {
							$("#loanMDiv").parent("div").parent("div").attr("style","display:none");
						}
					} else {
						SCFUtils.alert("查询失败");
					}
				}
			};
		SCFUtils.ajax(optionsLoan);
	}
}

//复核时候加载融资信息datagrid
function loadLoanMTableRe(){
	var cntrctNo = $("#cntrctNo").val();
	var sysLockBy = $("#sysRefNo").val();
	var ttlPmtAmt = $("#ttlPmtAmt").numberbox('getValue');
	var optionsLoan = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000570',
				cntrctNo : cntrctNo,
				sysLockBy : sysLockBy,
				cacheType : 'non'
			},
			callBackFun : function(data) {
				if (data.success) {
					if (!SCFUtils.isEmpty(data.rows)) {
						SCFUtils.loadGridData('loanMTable', data.rows,
								true, true);//加载的时候就保护数据，struLoanAmt自动计算
//						forEach(data.rows);
						if('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE){
							$.each(data.rows, function(i, n) {
								$('#loanMTable').datagrid(
										'updateRow',
										{
											index : i,
											row : {
												loanId : n.sysRefNo,//将流水号给loanId
												ttlLoanBalHd : n.ttlLoanBal//LOAN_M. Ttl_Loan_Bal = Ttl_Loan_Bal- Pay_Prin_Amt.
											}
										});
							});
						}else if('FP' === SCFUtils.FUNCTYPE){
							$.each(data.rows, function(i, n) {
								$('#loanMTable').datagrid(
										'updateRow',
										{
											index : i,
											row : {
												loanId : n.sysRefNo,//将流水号给loanId
												//复核时融资余额临时变量应该加上页面上的冲销金额。（FP初始化未点击查询按钮）
												ttlLoanBalHd : SCFUtils.Math(n.ttlLoanBal,n.payPrinAmt,'add')//LOAN_M. Ttl_Loan_Bal = Ttl_Loan_Bal- Pay_Prin_Amt.
											}
										});
							});
						}
					} 
					else {
						$("#loanMDiv").parent("div").parent("div").attr("style","display:none");
					}
				} else {
					SCFUtils.alert("查询失败");
				}
			}
		};
		SCFUtils.ajax(optionsLoan);
}


function loadGridData(data, flag1, flag2) {
	SCFUtils.loadGridData('invcMTable', data, flag1, flag2);
}

function forEach(data) {//在原先基础上增加查询loanM给融资信息字段赋值
	var loanId = $('#loanId').val();
	var invPmtRef = $('#sysRefNo').val();
	var date = getDate(new Date());
	$.each(data, function(i, n) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000421',
				sysRefNo : loanId + n.sysRefNo
			},
			callBackFun : function(data) {
				if (SCFUtils.isEmpty(data.rows[0])) {
					temp = 0;
				} else {
					temp = data.rows[0].loanAmt;
				}
				$('#invcMTable').datagrid(
						'updateRow',
						{
							index : i,
							row : {
								struLoanAmt : 0,
//								loanId : n.sysRefNo,
								invBalHd : n.invBal,//不能丢要赋值，用于onchangStruLoanAmt
								invPmtRef : invPmtRef,
								invRef : n.sysRefNo,
								sysRefNo : n.sysRefNo + invPmtRef,
								lastPayDt : SCFUtils.getcurrentdate(),
								invLoanRefNo : loanId + n.sysRefNo,
								loanAmt : temp,
								loanAmtHd : temp,
							}
						});
			}
		};
		SCFUtils.ajax(opt);
	});
}

/**
 * 融资信息的字段计算，在加载时候就计算
 * @data 参数data传来的值为Q_P_000569查询到的数据   data.rows
 */
function calculateLoanM(data) {
	var ttlPmtAmt = $('#ttlPmtAmt').numberbox('getValue');//得到总核销金额
	var invPmtRef = $('#sysRefNo').val();
	var date = getDate(new Date());
	$.each(data, function(i, n) {
		if(n.payIntTp==1){//1=先收息
			//计算intAmt，规则：payIntTp = ‘先收息’ intAmt=loanM.intAmt;payIntTp=‘利随本清’ INT_AMT= Ttl_Loan_Bal*【（还款日-起息日）+1】* LOAN_RT/360
			var intAmtNew = n.intAmt;
//			var payIntAmtNew = intAmtNew;
			var payIntAmtNew = 0;//预收息不还利息，本次还款利息永远为0
			if(SCFUtils.Math(ttlPmtAmt,n.ttlLoanBalHd,'sub')>0){//大于，本次还款本金=融资余额，本次还款利息=利息总额
				var payPrinAmtNew = n.ttlLoanBalHd;
				ttlPmtAmt = SCFUtils.Math(ttlPmtAmt,payPrinAmtNew,'sub'); //计算的到剩余可归还融资敞口金额
			}else{
				var payPrinAmtNew = ttlPmtAmt;
				ttlPmtAmt = 0; //计算的到剩余可归还融资敞口金额
			}
			var pmtAmtNew=payPrinAmtNew;
			$('#loanMTable').datagrid(
					'updateRow',
					{
						index : i,
						row : {
							intAmt : intAmtNew,
							payIntAmt : payIntAmtNew,
							payPrinAmt : payPrinAmtNew,
							pmtAmt : pmtAmtNew,
							ttlLoanBal : SCFUtils.Math(n.ttlLoanBalHd,payPrinAmtNew,'sub')//LOAN_M. Ttl_Loan_Bal = Ttl_Loan_Bal- Pay_Prin_Amt.
						}
					});
		}
		if(n.payIntTp==2){
			//计算intAmt，规则：payIntTp = ‘先收息’ intAmt=loanM.intAmt;payIntTp=‘利随本清’ INT_AMT= Ttl_Loan_Bal*【（还款日-起息日）+1】* LOAN_RT/360
			var pmtDt = $("#pmtDt").val();//得到当前还款日
//			var intAmtNew = n.ttlLoanBalHd*(pmtDt-n.loanValDt+1)*n.loanRt/360;
			var days = SCFUtils.DateDiff(SCFUtils.dateFormat(pmtDt, 'yyyy-MM-dd'),n.loanValDt);
			var loanRtRe = SCFUtils.Math(n.loanRt,0.01,'mul');
			var loanRtDay = SCFUtils.Math(loanRtRe,360,'div');
			var intAmtNew = SCFUtils.Math(SCFUtils.Math(n.ttlLoanBalHd,days,'mul'),loanRtDay,'mul').toFixed(2);
			if(SCFUtils.Math(ttlPmtAmt,SCFUtils.Math(n.ttlLoanBalHd,n.intAmt,'add'),'sub')>0){//大于，本次还款本金=融资余额，本次还款利息=利息总额
				var payPrinAmtNew = n.ttlLoanBalHd;
				var payIntAmtNew = intAmtNew;
				ttlPmtAmt = SCFUtils.Math(ttlPmtAmt,SCFUtils.Math(payPrinAmtNew,payIntAmtNew,'add'),'sub'); //计算的到剩余可归还融资敞口金额
			}else{
				if(SCFUtils.Math(ttlPmtAmt,intAmtNew,'sub')>0){//剩余可归还融资敞口金额> INT_AMT
					var payPrinAmtNew = SCFUtils.Math(ttlPmtAmt,intAmtNew,'sub');
					var payIntAmtNew = intAmtNew;
				}else{
					 var payPrinAmtNew = 0;
					 var payIntAmtNew = ttlPmtAmt; 
				}
				ttlPmtAmt = 0; //计算的到剩余可归还融资敞口金额
			}
			var pmtAmtNew=SCFUtils.Math(payPrinAmtNew,payIntAmtNew,'add');
			$('#loanMTable').datagrid(
					'updateRow',
					{
						index : i,
						row : {
							intAmt : intAmtNew,
							payIntAmt : payIntAmtNew,
							payPrinAmt : payPrinAmtNew,
							pmtAmt : pmtAmtNew,
							ttlLoanBal : SCFUtils.Math(n.ttlLoanBalHd,payPrinAmtNew,'sub')//LOAN_M. Ttl_Loan_Bal = Ttl_Loan_Bal- Pay_Prin_Amt.
						}
					});
		}
	});
}


/*
 * FP进来时候的foreach给临时变量赋值
 */
function forEachRe(data) {
	var loanId = $('#loanId').val();
	var invPmtRef = $('#sysRefNo').val();
	var date = getDate(new Date());
	var ttlPmtAmt = $("#ttlPmtAmt").numberbox('getValue');
	$.each(data, function(i, n) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000421',
				sysRefNo : loanId + n.sysRefNo
			},
			callBackFun : function(data) {
				if (SCFUtils.isEmpty(data.rows[0])) {
					temp = 0;
				} else {
					temp = data.rows[0].loanAmt;
				}
				$('#invcMTable').datagrid(
						'updateRow',
						{
							index : i,
							row : {
								invBalHd : SCFUtils.Math(n.invBal,n.struLoanAmt,'add'),//不能丢要赋值，用于onchangStruLoanAmt
								invPmtRef : invPmtRef,
								invRef : n.sysRefNo.substring(0,8),//n.sysRefNo = invcxxxpmtxxxx
								sysRefNo : n.sysRefNo,
								lastPayDt : SCFUtils.getcurrentdate(),
								invLoanRefNo : loanId + n.sysRefNo.substring(0,8),
								loanAmt : temp,
								loanAmtHd : temp,
							}
						});
			}
		};
		SCFUtils.ajax(opt);
	});
}
function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹ffv
		singleSelect : false,// 只选一行
		idField : 'sysRefNo',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'struLoanAmt',
			title : '冲销应收账款金额',
			width : '14.3%',
//			editor : {
//				type : 'numberbox',
//				options : {
//					precision : 2
//				},
//			},
			formatter : ccyFormater
		}, {
			field : 'sysRefNo',
			title : '融资申请号',
			hidden : true
		}, {
			field : 'cntrctNo',
			title : '授信额度编号',
			hidden : true
		}, {
			field : 'invNo',
			title : '应收账款凭证号',
			width : '14.3%'
		}, {
			field : 'invCcy',
			title : '币种',
			width : '14.3%'
		}, {
			field : 'invBal',
			title : '应收账款净额',
			width : '14.3%',
			formatter : ccyFormater
		}, {
			field : 'invValDt',
			title : '应收账款起算日',
			width : '14.3%',
			formatter: dateFormater
		},{
			field : 'invDueDt',
			title : '应收账款到期日',
			width : '14.3%',
			formatter: dateFormater
		},{
			field : 'invBalHd',
			title : '应收账款余额（临时）',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
				field : 'lastPayDt',
				title : '上一次还款日期',
				width : 60,
				hidden : true,
				formatter : dateFormater
//		}, {
//			field : 'invLoanBal',
//			title : '融资余额',
//			width : '12.5%',
//			formatter : ccyFormater
//		}, {
//			field : 'invLoanBalHd',
//			title : '融资余额（临时）',
//			width : 110,
//			hidden : true,
//			formatter : ccyFormater
//		}, {
//			field : 'invLoanAval',
//			title : '最大可融资金额',
//			width : '12.5%',
//			formatter : ccyFormater
//		}, {
//			field : 'invLoanAvalHd',
//			title : '最大可融资金额（临时）',
//			width : 110,
//			hidden : true,
//			formatter : ccyFormater
		}, { //new  inPool  出入池标记 0入池 1出池
			field : 'inPool',
			title : '出入池标记',
			width : '14.3%',
			hidden : true
		}, { //new  invSts  发票状态  5为买方还款
			field : 'invSts',
			title : '发票状态',
			width : '14.3%',
			hidden : true
		}, {
			field : 'loanPerc',
			title : '融资比例',
			width : '14.3%',
			formatter : pectType
//			hidden : true,
		}, {
			field : 'invRef',
			title : '应收账款ID',
			width : 60,
			hidden : true
		}, {
			field : 'eventTimes',
			title : 'eventTimes',
			width : 100,
			hidden : true
		}, {
			field : 'sysEventTimes',
			title : 'sysEventTimes',
			width : 100,
			hidden : true
		}, {
			field : 'invPmtRef',
			title : '关联还款流水号',
			width : 110,
			hidden : true
		}, {
			field : 'invLoanRefNo',
			title : '融资申请子表流水号',
			width : 110,
			hidden : true
		}, {
			field : 'loanAmt',
			title : '融资申请子表融资金额',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'loanAmtHd',
			title : '融资申请子表融资金额(临时)',
			width : 110,
			hidden : true,
			formatter : ccyFormater
//		}, {//融资信息表字段
//			field : 'loanId',// = loanM.sysRefNo
//			title : '融资编号',
//			hidden : true
//		}, {
//			field : 'payIntTp',//=loanM.payIntTp(扣息方式)
//			title : '扣息方式',
//			hidden : true
//		}, {
//			field : 'ttlLoanBal',//= laonM.ttlLoanBal
//			title : '融资余额',
//			hidden : true
//		}, {
//			field : 'ttlLoanBalHd',//= laonM.ttlLoanBal
//			title : '融资余额(临时)',
//			hidden : true
//		}, {
//			field : 'loanRt',//=loanM.laonRt
//			title : '融资利率（年化）',
//			hidden : true
//		}, {
//			field : 'loanValDt',//=loanM.loanValDt
//			title : '起息日',
//			hidden : true
//		}, {
//			field : 'intAmt',//根据payIntTp来判断计算。
//			title : '利息总额',
//			hidden : true
//		}, {
//			field : 'payIntAmt',//不计入loanM为了计算别的字段。
//			title : '本次还款利息',
//			hidden : true
//		}, {
//			field : 'payPrinAmt',//不计入loanM为了计算别的字段。
//			title : '本次还款本金',
//			hidden : true
//		}, {
//			field : 'pmtAmt',//先收息：=payPrinAmt；利随本清：payIntAmt+payPrinAmt
//			title : '本次还款金额',
//			hidden : true
		} ] ]
	};
	$('#invcMTable').datagrid(options);
	
	//加载融资信息datagrid
	var optionsLoan = {
//		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹ffv
		singleSelect : false,// 只选一行
		idField : 'sysRefNo',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {//融资信息表字段
			field : 'loanId',// = loanM.sysRefNo
			title : '融资编号',
			width : '10%', 
//			hidden : true
		}, {
			field : 'payIntTp',//=loanM.payIntTp(扣息方式)
			title : '扣息方式',
			width : '10%',
			formatter : payIntTp,
//			hidden : true
		}, {
			field : 'ttlLoanBal',//= laonM.ttlLoanBal
			title : '融资余额',
			width : '10%',
			formatter : ccyFormater,
//			hidden : true
		}, {
			field : 'loanRt',//=loanM.laonRt
			title : '融资利率（年化）',
			width : '10%',
			formatter : pectType,
//			hidden : true
		}, {
			field : 'loanValDt',//=loanM.loanValDt
			title : '起息日',
			width : '10%',
			formatter : dateFormater,
//			hidden : true
		}, {
			field : 'intAmt',//根据payIntTp来判断计算。
			title : '利息总额',
			width : '10%',
			formatter : ccyFormater
//			hidden : true
		}, {
			field : 'payIntAmt',//不计入loanM为了计算别的字段。
			title : '本次还款利息',
			width : '10%',
			formatter : ccyFormater
//			hidden : true
		}, {
			field : 'payPrinAmt',//不计入loanM为了计算别的字段。
			title : '本次还款本金',
			width : '10%',
			formatter : ccyFormater
//			hidden : true
		}, {
			field : 'pmtAmt',//先收息：=payPrinAmt；利随本清：payIntAmt+payPrinAmt
			title : '本次还款金额',
			width : '10%',
			formatter : ccyFormater
//			hidden : true
		} ] ]
	};
	$('#loanMTable').datagrid(optionsLoan);
}

function addEventTimes() {
	var griddata = SCFUtils.getSelectedGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	$.each(datas, function(i, n) {
		var eventTimes = queryInvcEmaxEventTImes(n.invRef);
		$.extend(n, {
			eventTimes : eventTimes
		});
	});
}

// 根据sysRefNo查询发票E表中最大evnetTImes
function queryInvcEmaxEventTImes(sysRefNo) {
	var eventTimes = 1;
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000203',
			sysRefNo : sysRefNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				eventTimes = SCFUtils.Math(data.rows[0].eventTimes, 1, 'add');
			}
		}
	};
	SCFUtils.ajax(opts);
	return eventTimes;
}

var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#invcMTable').datagrid('validateRow', editIndex)) {
		$('#invcMTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function onClickRow(index) { // 修改表格还款金额
// $('#accetpFlag').val("0");
	if (editIndex != index) {
		if (endEditing()) {
			$('#invcMTable').datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#invcMTable').datagrid('selectRow', editIndex);
		}
	}
}


// 根据发票流水号从invcLoan表中查询融资起始日
function getLoanDt(invRef) {
	var loanDt = SCFUtils.getcurrentdate();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000183',
			invRef : invRef
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length > 0) {
					loanDt = data.rows[0].loanValDt;
				}

			}
		}
	};
	SCFUtils.ajax(options);
	return loanDt;
}

function getSellerHKH(selId) {
	var acOwnerid = selId;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_S_SELACNO_001',
			acOwnerid : acOwnerid
		},
		callBackFun : function(data) {
			if (data.success) {
				// $('#roleIdBox').combobox('loadData', data.rows);
				// 取买方表中的BUYER_ID，BUYER_NM
				// 卖方还款账号
				if (data.rows.length > 0) {
					$("#acNo").combobox('loadData', data.rows);
				}

			}
		}
	};
	SCFUtils.ajax(options);
}

// function getCntInfo(selId,busiTp) {
// //var selId = selId;var busiTp=busiTp;
// var options = {
// url : SCFUtils.AJAXURL,
// data : {
// queryId : 'Q_S_REBUYERPAY_001',
// selId : selId,
// busiTp:busiTp
// },
// callBackFun : function(data) {
// if (data.success) {
// // $('#roleIdBox').combobox('loadData', data.rows);
// // 取买方表中的BUYER_ID，BUYER_NM
// // 卖方还款账号
// if (data.rows.length > 0) {
// $("#arBal").numberspinner('setValue',data.rows[0].arBal);
// $("#arAvalLoan").numberspinner('setValue',data.rows[0].arAvalLoan);
// $("#openLoanAmt").numberspinner('setValue',data.rows[0].openLoanAmt);
// $("#openIntAmt").numberspinner('setValue',data.rows[0].openIntAmt);
// // $("#finaTp").combobox('setValue',data.rows[0].finaTp);
// $("#sysRefNohd").val(data.rows[0].sysRefNo);
// // $("#payIntTp").combobox('setValue',data.rows[0].payIntTp);
// }
//
// }
// }
// };
// SCFUtils.ajax(options);
// }

function showDetail() {

}

function changeBusiTp() {
	var busiTp = $('#busiTp').combobox('getValue');
	if (busiTp != '3') {
		// $('td[id=collate1]').hide();
		// $('td[id=collate2]').hide();
	}
}


//当冲销总额改变时，改变datagrid中的每笔冲销金额
function changeStruLoanAmt(){
	if(ischangeStruLoanAmt == false){
		return;
	}
	$('#invcMTable').datagrid('clearChecked');//清空勾选
	var ttlPmtAmt = $("#ttlPmtAmt").numberbox('getValue');//得到主页上的冲销金额
//	var data = SCFUtils.getGridData('invcMTable');
	var data = $("#invcMTable").datagrid("getRows");
	for(var i = 0;i<data.length;i++){
		if(SCFUtils.Math(ttlPmtAmt,data[i].invBalHd,'sub')>=0){//判断剩余冲销金额是否大于该笔应收账款净额(用临时)，大于：该笔struLoanAmt = invBal，小于struLaonAmt=剩余PmtAmt
			ttlPmtAmt = SCFUtils.Math(ttlPmtAmt,data[i].invBalHd,'sub');//剩余的ttlPmtAmt
			$('#invcMTable').datagrid(
					'updateRow',
					{
						index : i,
						row : {
							struLoanAmt : data[i].invBalHd,
							invBal : 0,
							inPool : 1,//if invbal = 0 那么 INPOOL=1
						}
					});
			$('#invcMTable').datagrid('selectRow', i);
			continue;
		}else{
			$('#invcMTable').datagrid(
					'updateRow',
					{
						index : i,
						row : {
							struLoanAmt : ttlPmtAmt,
							invBal : SCFUtils.Math(data[i].invBalHd,ttlPmtAmt,'sub'),
							inPool : 0,//if invbal = 0 那么 INPOOL=1
						}
					});
			ttlPmtAmt = 0;
			if(data[i].struLoanAmt!=0){
				$('#invcMTable').datagrid('selectRow', i);
			}
			continue;
		}
	}
	calculateLoanM($("#loanMTable").datagrid("getRows"));//每次更高核销总额，都去计算loanMtable信息
	var invcData = SCFUtils.getSelectedGridData('invcMTable', false);
	getMainAmt(SCFUtils.getSelectedGridData('invcMTable', false));//计算基础信息中的值
}

function getMainAmt(data){//计算主页的信息
	//更新可融资余额  CNTRCT_M. AR_AVAL_LOAN = AR_AVAL_LOAN –SUM(小页（STRU_LOAN_AMT* LOAN_PERC）)+ SUM(Pay_Prin_Amt);
	var arAvalLoan = $("#arAvalLoanHd").val();//得到页面上arAvalLoan，即cntrctM表中的arAvalLoan
	var ttlStruLoanPercAmt = 0;
	var ttlPayPrinAmt = 0;
	var ttlPayPrinAmt = 0;
	var loanData = $("#loanMTable").datagrid("getRows");
	$.each(data,function(i,n){//循环invcMTable中更新的记录
		var perc = SCFUtils.Math(n.loanPerc,0.01,'mul');
		ttlStruLoanPercAmt = SCFUtils.Math(SCFUtils.Math(n.struLoanAmt,perc,'mul'),ttlStruLoanPercAmt,'add');//得到每笔发票冲销融资的金额=sum(STRU_LOAN_AMT* LOAN_PERC)
//		ttlPayPrinAmt = SCFUtils.Math(ttlPayPrinAmt,n.payPrinAmt,'add');//SUM(Pay_Prin_Amt);
	});
	$.each(loanData,function(i,n){//循环invcMTable中更新的记录
//		ttlStruLoanPercAmt = SCFUtils.Math(SCFUtils.Math(n.struLoanAmt,n.loanPerc,'mul'),ttlStruLoanPercAmt,'add');//得到每笔发票冲销融资的金额
		ttlPayPrinAmt = SCFUtils.Math(ttlPayPrinAmt,n.payPrinAmt,'add');//SUM(Pay_Prin_Amt);
	});
//	arAvalLoan = arAvalLoan -ttlStruLoanPercAmt+ttlPayPrinAmt;
	arAvalLoan = SCFUtils.Math(SCFUtils.Math(arAvalLoan,ttlStruLoanPercAmt,'sub'),ttlPayPrinAmt,'add');
	if(arAvalLoan<0)
		arAvalLoan = 0;
	$("#arAvalLoan").val(arAvalLoan);
	//更新arBal应收账款余额  公式：CNTRCT_M. ar_Bal = ar_Bal- ttlPmt_Amt;
	var arBalOld = $("#arBalHd").val();
	var arBalNew = SCFUtils.Math(arBalOld,$("#ttlPmtAmt").val(),'sub');
	if(arBalNew<0)
		arBalNew = 0;
	$("#arBal").val(arBalNew);
	//更新已融资敞口  CNTRCT_M.OPEN_LOAN_AMT = OPEN_LOAN_AMT-SUM(小页Pay_Prin_Amt)
	var openLoanAmtOld = $("#openLoanAmtHd").val();//得到协议中原来的值
	var openLoanAmtNew = SCFUtils.Math(openLoanAmtOld,ttlPayPrinAmt,'sub');
	if(openLoanAmtNew<0)
		openLoanAmtNew = 0;
	$("#openLoanAmt").val(openLoanAmtNew);
	//根据新改需求增加 add on 20160831 by JinJH
	//更新主页的poolline：CNTRCT_M.pool_line=pool_line- SUM(小页（STRU_LOAN_AMT* LOAN_PERC）)=poolLine-ttlStruLoanPercAmt
	var poolLineOld = $("#poolLineHd").val();//得到协议中原来的值
	var poolLineNew = SCFUtils.Math(poolLineOld,ttlStruLoanPercAmt,'sub');
	if(poolLineNew<0)
		poolLineNew = 0;
	$("#poolLine").val(poolLineNew);
}

function getTtlPmtAmt(data){//点击查询按钮，给ttlPmtAmt字段默认赋值所有发票的invBal总和
	var ttlInvBal = 0;     //invBal
	$.each(data,function(i,n){
		ttlInvBal = SCFUtils.Math(ttlInvBal,n.invBalHd,'add');
	});
	$("#ttlPmtAmtHd").val(ttlInvBal);
	$('#ttlPmtAmt').numberbox({    
		max:parseFloat(ttlInvBal),
	}); 
	$("#ttlPmtAmt").numberbox('setValue',ttlInvBal);
}
//还原卖方额度。
function restorelmtAmt(){
	var loanData = SCFUtils.getGridData('loanMTable');//打包全部
	var ttlPayPrinAmt = 0;
	$.each(loanData,function(i,n){//循环invcMTable中更新的记录
		ttlPayPrinAmt = SCFUtils.Math(ttlPayPrinAmt,n.payPrinAmt,'add');//SUM(Pay_Prin_Amt);
	});
	var lmtAmt = SCFUtils.Math($("#lmtAmtHd").numberbox('getValue'),ttlPayPrinAmt,'add');//还原卖方额度，lmtAmt+sum本次还款金额
	$("#lmtAmt").numberbox('setValue',lmtAmt);
}

//复核的时候根据cntrctNo去查询cntrcE表，带出来arAvalLoan，arBal，openLoanAmt字段
function queryCntrctInfo(cntrctNo,sysLockBy){
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000572',
				cntrctNo : cntrctNo,
				sysLockBy : sysLockBy
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$("#arAvalLoan").val(data.rows[0].arAvalLoan);
					$("#arBal").val(data.rows[0].arBal);
					$("#openLoanAmt").val(data.rows[0].openLoanAmt);
					$("#poolLine").val(data.rows[0].poolLine);//新增的池水位字段
					$("#lmtAmt").numberbox('setValue',data.rows[0].lmtAmt);
					$("#lmtBal").numberbox('setValue',data.rows[0].lmtAmt);
				}
			}
		};
		SCFUtils.ajax(options);
}

//FP的时候根据cntrctNo去查询cntrcM表，带出来arAvalLoan，arBal，openLoanAmt字段并复制给Hd
function queryCntrctInfoFP(cntrctNo,sysLockBy){
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000572',//查询cntrctE表
				cntrctNo : cntrctNo,
				sysLockBy : sysLockBy
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$("#arAvalLoan").val(data.rows[0].arAvalLoan);
					$("#arBal").val(data.rows[0].arBal);
					$("#openLoanAmt").val(data.rows[0].openLoanAmt);
					$("#lmtAmt").numberbox('setValue',data.rows[0].lmtAmt);
					$("#lmtBal").numberbox('setValue',data.rows[0].lmtAmt);
					$("#poolLine").val(data.rows[0].poolLine);//新增的池水位字段
				}
			}
		};
		SCFUtils.ajax(options);
		var optionsHd = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000575',
					cntrctNo : cntrctNo,
					sysLockBy : sysLockBy
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
						//赋值给HD
						$("#arAvalLoanHd").val(data.rows[0].arAvalLoan);
						$("#arBalHd").val(data.rows[0].arBal);
						$("#openLoanAmtHd").val(data.rows[0].openLoanAmt);
						$("#poolLineHd").val(data.rows[0].poolLine);//新增的池水位临时字段
					}
				}
			};
			SCFUtils.ajax(optionsHd);
}

//根据cntrctNo去sbr表里查询buyerSysRefNo字段 = buyerId
function queryBuyerIdFP(cntrctNo,sysLockBy){
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000576',
				cntrctNo : cntrctNo,
				sysLockBy : sysLockBy
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$("#buyerId").val(data.rows[0].buyerId);
				}
			}
		};
		SCFUtils.ajax(options);
}
 
/*
 * 更新买方还款时候的买方、卖方额度时候需要抓取的三表M表数据
 * 查询custM sbrM cntrctM 表
 */
//查询协议表
function queryLimitInfo(cntrctNo) {
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000552',
			cntrctNo:cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}
//查询客户信息表
function queryCustInfo(buyerId) {
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000559',
			sysRefNo:buyerId
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}
//查询额度关联关系信息表
function queryCntrctSbrInfo(cntrctNo, buyerId) {
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000560',
			cntrctNo : cntrctNo,
			buyerId : buyerId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

/*
 * 打包利息信息入Int表
 * 公式：CURR_PAY_INT= Ttl_Loan_Bal*【（还款日-起息日）+1】* LOAN_RT/360
 * 获取loanMtable中的本次还款利息总和  = sum(payIntAmt)
 */
function getIntData(){
	//计算sum(payIntAmt)
	var loanRows = SCFUtils.getGridData('loanMTable');//打包全部
	var currPayInt = 0;
	var loanValDt="";
	$.each(loanRows,function(i,n){
		currPayInt = SCFUtils.Math(currPayInt,n.payIntAmt,'add');
	});
	var int = {};// 添加费用表
	int._total_rows = 1;//total_rows不给值会默认没有数据，一笔还款只有一条记录
	//生成int的流水号，intSysRefNo
	var options = {};
	var trxDt;
	if('PM' === SCFUtils.FUNCTYPE){
		options.data = {
				refName : 'IntRef',
				refField : 'intSysRefNo'
		};
		SCFUtils.getRefNo(options);
		trxDt = SCFUtils.getcurrentdate();
		loanValDt = getMinLoanValDt();//利息产生时间
	}else{
		trxDt = relQueryIntE().trxDt;
		if('FP' === SCFUtils.FUNCTYPE){
			loanValDt = getMinLoanValDt();//利息产生时间
		}else{
			loanValDt = relQueryIntE().createDt;
		}
	}
	//查询本次应收利息,融资申请记录本次应收利息
	
	
		var obj = {};
			obj.sysRefNo = $('#intSysRefNo').val();//PM的时候新增，RE.FP.DP都是带过来的值
			obj.trxDt = trxDt;// trxDt = 当前日期
			obj.selId = $("#selId").val();//得到当前页面的selId
			obj.selAcNo = acNoInfo()[0].acNo;
			obj.selAcNm = acNoInfo()[0].acNm;
			obj.selAcBkNm = acNoInfo()[0].acBkNm;
			obj.busiTp = $("#busiTp").combobox("getValue");
			obj.intTp = 0;//正常利息
			obj.intCcy = $('#lmtCcy').combobox("getValue");
			obj.currInt = 0;//本次应收利息
			obj.currPayInt = currPayInt;//本次实收利息，利随本清肯定收息；预收息不记录
			obj.intPayFlg = 1;//应收已收
			obj.theirRef = $("#sysRefNo").val();
			obj.payIntTp = 2;//还款只打包利随本清的数据
			obj.createDt = loanValDt;//利息产生时间
			obj.overdueInt = '';//本次逾期利息
			obj.remark = '';//备注
			obj.currIntDt = getDate(new Date());//本次利息应收日期
			obj.currIntPayDt = getDate(new Date());//本次利息实收日期

		int['rows0'] = obj;
	return int;
}

/*
 * 复核时候查询INT的E表（catalog双表查询有冲突）
 */
function relQueryIntE(){
	var selId = $("#selId").val();
	var sysRefNo = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000617',
			selId : selId,
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows[0];
				obj.length = 1;
			}else{
				obj.length = 0;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}
/*
 * 查询扣款账号信息如int表
 */
function acNoInfo(){
	var acNo = $("#acNo").combobox('getValue');
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000579',//根据acNo去查询acBkNm
			acNo : acNo
		},
		callBackFun : function(data) {
			if (data.success) {
				obj = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

/*
 * 得到表单的最早的那个起息日
 */
function getMinLoanValDt(){
	var data = SCFUtils.getGridData('loanMTable');
	var minLoanValDt = data.rows0.loanValDt;
	$.each(data, function(i, n){
		if(SCFUtils.Math(n.pmtAmt,0,'sub')==0){
			return true;
		}
		if(SCFUtils.DateDiff(n.loanValDt,minLoanValDt)<0){//比较日期 
			minLoanValDt = n.loanValDt;
		}
	});
	return minLoanValDt;
}
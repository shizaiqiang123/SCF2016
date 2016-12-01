var totalPayTranAMt = 0.0000;
// var totalPayBillAmt = 0.0000;
// var totalStruLoanAmt = 0.0000;
var totalPayAmt = 0.0000;
var totalSurPayAmt = 0.0000;
var FPLoadTable = 0;
var list = [];
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
		"text" : "动产质押融资"
	}, {
		"id" : '7',
		"text" : "应收账款质押"
	} ];
	$("#busiTp").combobox('loadData', data);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("lmtCcy", true);
	SCFUtils.setNumberboxReadonly("ttlPmtAmt", true);
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
			queryId : 'Q_P_000539',
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
	isFpLoad = true;
	SCFUtils.loadForm('pmtForm', row);
	$('#OldSysRelReason').textbox('setValue',row.OldSysRelReason);
	$('#invcMTable').datagrid('selectAll',true);//在加载数据初始化时就将datagrid中的数据默认全勾选
	$('#lmtAmtHd').numberbox('setValue', data.obj.lmtAmt);
	$('#lmtAllocateHd').numberbox('setValue', data.obj.lmtAllocate);
	$('#lmtBalHd').numberbox('setValue', data.obj.lmtBal);
	var selId = $("#selId").val();
	getSellerHKH(selId);
	var busiTp = $("#busiTp").val();
	defineDataGridEvent();
	reLoadTable();
	$('#accetpFlag').val('true');
	$("#invcMTable").datagrid("selectAll");
	if (data.obj.busiTp == '3') {
		queryCollatCompNm(data.obj.insureNo);
	} else {
		changeBusiTp();
	}
	if(relQueryIntE().length > 0){
		$("#intSysRefNo").val(relQueryIntE().sysRefNo);
	}
	$("#payIntTp").val(queryCntrctInfo(data.obj.cntrctNo).payIntTp);
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
	isFpLoad = false;
	/*
	 * $('#invcMTable').datagrid('uncheckAll');
	 */
	lookSysRelReason();
}
function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('pmtForm', data);
	var options = {};
	options.data = {
		refName : 'PmtRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	$('#buyerLmtSysRefNo').val(data.obj.lmtSysRefNo);// 买方额度流水号
	$('#lmtAmtHd').numberbox('setValue', data.obj.lmtAmt);
	$('#lmtAllocateHd').numberbox('setValue', data.obj.lmtAllocate);
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
	$('#sysRelReason').textbox('setValue',data.obj.sysRelReason);
	SCFUtils.setComboReadonly('sysRelReason', true);
	SCFUtils.loadForm('pmtForm', data);
	SCFUtils.loadGridData('invcMTable', SCFUtils.parseGridData(data.obj.invc),
			true);// 加载数据并保护表格。
	$('#invcMTable').datagrid('hideColumn', 'ck');
	$('#querybutton').linkbutton('disable');
	$('#acceptbutton').linkbutton('disable');
	lookSysRelReason();
}

function showLookUpWindow() {
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

}

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
			}
		}
	};
	SCFUtils.ajax(opts);
}

function cntrctNoSuccess(data) {
	$("#loanId").textbox('setValue', data.sysRefNo);

}
function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('pmtForm', data);
	SCFUtils.loadGridData('invcMTable', SCFUtils.parseGridData(data.obj.invc),
			false);
	$("#invcMTable").datagrid("selectAll");
	// $('#payPrinAmt').numberspinner('setValue', 0);//本金总金额
	// $('#payIntAmt').numberspinner('setValue', 0); //利息总金额
	/*
	 * var options =$('#invcMTable').datagrid('options');
	 * options.onLoadSuccess=function(gridData){ forEach(gridData.rows); };
	 */
	defineDataGridEvent();
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	$('#sysRelReason').textbox('setValue',data.obj.sysRelReason);
//	loadTable();
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
	SCFUtils.loadForm('pmtForm', row);
	if(relQueryIntE().length > 0){
		$("#intSysRefNo").val(relQueryIntE().sysRefNo);
	}
	$("#payIntTp").val(queryCntrctInfo(data.obj.cntrctNo).payIntTp);
	$('#querybutton').linkbutton('disable');
	$('#acceptbutton').linkbutton('disable');
	var selId = $("#selId").val();
	getSellerHKH(selId);
	var busiTp = $("#busiTp").val();
	// getCntInfo(selId,busiTp);
	reLoadTable();
	// calcInvBal(); //计算发票余额
	// calIntAmt();
	if (data.obj.busiTp == '3') {
		queryCollatCompNm(data.obj.insureNo);
	} else {
		changeBusiTp();
	}
	$('#invcMTable').datagrid('hideColumn', 'ck');
	$('#invcMTable').datagrid('uncheckAll');
	SCFUtils.setDatagridReadonly('invcMTable', true);
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
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
	$('#querybutton').linkbutton('disable');
	$('#acceptbutton').linkbutton('disable');
	var selId = $("#selId").val();
	getSellerHKH(selId);
	SCFUtils.loadForm('pmtForm', data);
	var busiTp = $("#busiTp").val();
	// getCntInfo(selId,busiTp);
	reLoadTable();
	// calcInvBal();
	// calIntAmt();
	$('#invcMTable').datagrid('hideColumn', 'ck');
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

// 复核的时候由于余额是从发票M表抓的，故重新计算发票余额(其实没用到)
function calcInvBal() {
	var data = $("#invcMTable").datagrid('getAllData').rows;
	$.each(data, function(i, n) {
		var invLoanBal = n.invLoanBal; // 融资余额

		// var payIntAmt = n.intAmt;
		// if (SCFUtils.Math(n.pmtAmt, payIntAmt, 'sub')<=0){
		// payIntAmt = n.pmtAmt;
		// }else{
		// if (SCFUtils.Math(invLoanBal, n.payPrinAmt, 'sub')<=0){
		// invLoanBal = 0;
		// }else{
		// invLoanBal = SCFUtils.Math(invLoanBal, n.payPrinAmt, 'sub');
		// }
		// }
		// $('#invcMTable').datagrid('updateRow', {
		// index : i,
		// row : {
		// invBal : SCFUtils.Math(n.invBal, n.payPrinAmt, 'sub'),
		// invLoanBal : invLoanBal,
		// payIntAmt :payIntAmt
		// }
		// });
	});
}

function pageOnInt(data) {
	ajaxBox();
	ajaxTable();
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
 * 判断所有发票融资余额(冲销后)总额>=融资余额(融资主表) 传入参数 发票的交易流水号
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
	griddata = SCFUtils.getGridData("invcMTable", false);
	var invLoanBalHd = '';
		$.each(SCFUtils.parseGridData(griddata), function(i, n) {
			var stuLoanAmt = SCFUtils.Math(n.invLoanBalHd,n.invLoanBal,'sub');
			invLoanBalHd = SCFUtils.Math(invLoanBalHd,stuLoanAmt,'add');
			 
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
	var ttlLoanBal = $('#ttlPmtAmt').numberbox('getValue');//核销应收账款总额
	if (ttlLoanBal <= 0) {
		SCFUtils.alert('核销金额必须大于0！');
		return;
	}
	var mainData = SCFUtils.convertArray('pmtForm');
	$.extend(mainData,{
		"confirmFlag" : 1,
		"trxDt" : SCFUtils.getcurrentdate(),
		"pmtDt" : SCFUtils.getcurrentdate(),
	});
	var cntrctNo = mainData.cntrctNo;//协议编号
	var buyerId = mainData.buyerId;
	
	//协议相关信息
	var cntrct=queryCntrctInfo(cntrctNo);
	
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
		var invRef = data.rows0.invRef;
		// if(checkLoanBal(invRef,list)){
		if (false) {
			SCFUtils.confirm('冲销后该笔融资关联的应收账款融资余额总额小于该笔融资的融资余额，是否继续交易',
					function() {
						getLmt();
						addEventTimes();
						// addEventTimes();//提交时给还款子表的eventTimes字段赋值
						var grid = {};
						var griddata;
						if ('RE' === SCFUtils.FUNCTYPE
								|| 'DP' === SCFUtils.FUNCTYPE) {
							griddata = SCFUtils.getGridData('invcMTable');
						} else {
							if (checkDataGrid()) {
								return;
							}
							var accetpFlag = $("#accetpFlag").val();
							if (acceptSaved(accetpFlag)) {
								return;
							}
							griddata = SCFUtils.getSelectedGridData(
									'invcMTable', false);
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
						if(cntrct.payIntTp == "2"){//利随本清
							grid.int = SCFUtils.json2str(getIntData());//打包利息表data
						}else if(cntrct.payIntTp == "1"){
							grid.int = {};//打包利息表data
						}
						//打包买方额度数据
//						grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
						//打包卖方额度数据
//						grid.sellerLmt = SCFUtils.json2str(getSellerData());
						$.extend(mainData, grid);
						return mainData;
//						SCFUtils.SubmitAjax(mainData);
					});
		} else {
			getLmt();
			addEventTimes();
			// addEventTimes();//提交时给还款子表的eventTimes字段赋值
			var grid = {};
			var griddata;
			if ('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE) {
				griddata = SCFUtils.getGridData('invcMTable');
			} else {
				if (checkDataGrid()) {
					return;
				}
				var accetpFlag = $("#accetpFlag").val();
				if (acceptSaved(accetpFlag)) {
					return;
				}
				griddata = SCFUtils.getSelectedGridData('invcMTable', false);
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
			grid.loan = SCFUtils.json2str(getLoanMData());
			if(cntrct.payIntTp == "2"){//利随本清
				grid.int = SCFUtils.json2str(getIntData());//打包利息表data
			}else if(cntrct.payIntTp == "1"){
				grid.int = {};//打包利息表data
			}
			//打包买方额度数据
//			grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
			//打包卖方额度数据
//			grid.sellerLmt = SCFUtils.json2str(getSellerData());
			$.extend(mainData, grid);
			return mainData;
//			SCFUtils.SubmitAjax(mainData);
		}
	} else {
		getLmt();
		addEventTimes();
		// addEventTimes();//提交时给还款子表的eventTimes字段赋值
		var grid = {};
		var griddata;
		if ('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE) {
			griddata = SCFUtils.getGridData('invcMTable');
		} else {
			if (checkDataGrid()) {
				return;
			}
			var accetpFlag = $("#accetpFlag").val();
			if (acceptSaved(accetpFlag)) {
				return;
			}
			griddata = SCFUtils.getSelectedGridData('invcMTable', false);
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
		grid.loan = SCFUtils.json2str(getLoanMData());
		if(cntrct.payIntTp == "2"){//利随本清
			grid.int = SCFUtils.json2str(getIntData());//打包利息表data
		}else if(cntrct.payIntTp == "1"){
			grid.int = {};//打包利息表data
		}
		//打包买方额度数据
//		grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
		//打包卖方额度数据
//		grid.sellerLmt = SCFUtils.json2str(getSellerData());
		$.extend(mainData, grid);
		return mainData;
	}
	/*
	 * getLmt(); addEventTimes(); // addEventTimes();//提交时给还款子表的eventTimes字段赋值
	 * var mainData = SCFUtils.convertArray('pmtForm'); var grid = {}; var
	 * griddata; if ('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE) {
	 * griddata = SCFUtils.getGridData('invcMTable'); } else { if
	 * (checkDataGrid()) { return; } var accetpFlag = $("#accetpFlag").val(); if
	 * (acceptSaved(accetpFlag)){ return; } griddata =
	 * SCFUtils.getSelectedGridData('invcMTable', false); } var selId =
	 * $('#selId').val(); var selName = $('#selNm').val(); var sysRefNo =
	 * $('#sysRefNo').val(); var ccy =$('#lmtCcy').combobox('getValue'); var
	 * ttlLoanBal = $('#ttlPmtAmt').numberbox('getValue');
	 * $.extend($.extend(mainData,grid),{"custNo":selId},{"custNm":selName},{"rerNo":sysRefNo},{"trxCcy":ccy},{"trxAmt":ttlLoanBal},{"expTrxAmt":ttlLoanBal},{"clType":"S"},{"tdType":"R"},{"trxDate":SCFUtils.getcurrentdate()});
	 * grid.invc = SCFUtils.json2str(griddata); $.extend(mainData, grid); return
	 * mainData;
	 */
}

function getLmt() {
	var ttlPmtAmt = $('#ttlPmtAmt').numberbox('getValue');
	$('#cntrctSbrBuyerBal').numberbox(
			'setValue',
			SCFUtils.Math(ttlPmtAmt, $('#cntrctSbrBuyerBalHd').numberbox(
					'getValue'), 'add'));
	$('#buyerlmtBal').numberbox(
			'setValue',
			SCFUtils.Math(ttlPmtAmt, $('#buyerlmtBalHd').numberbox('getValue'),
					'add'));
	$('#buyerlmtAvl').numberbox(
			'setValue',
			SCFUtils.Math($('#buyerlmtAvlHd').numberbox('getValue'), ttlPmtAmt,
					'sub'));
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

function acceptSaved(accetpFlag) {
	if (accetpFlag == "true") {
		return false;
	} else {
		SCFUtils.alert('请您点击接受改变按键以便进行下一步操作！');
		return true;
	}
}

function defineDataGridEvent() {
	$('#accetpFlag').val("false");
	var options = $('#invcMTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
}
function onCheck(rowIndex, rowData) {
	rowData.ck = true;
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
	onClickRow(rowIndex);
}

function onUncheck(rowIndex, rowData) {
	rowData.ck = false;
	$('#accetpFlag').val("false");
	$('#invcMTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
//			invLoanBal : rowData.invLoanBalHd,
//			invLoanAval : rowData.invLoanAvalHd,
			invBal : rowData.invBalHd,
			struLoanAmt : 0.00,
//			loanAmt : rowData.loanAmtHd,
		}
	});
	endEditing();
	$('#ttlPmtAmt').numberbox('setValue', 0);
}
function onCheckAll(rows) {
	if(isFpLoad){
		return;
	}
	$.each(rows, function(i, n) {
		onUncheck(i, n);
		onCheck(i, n);
	});
}

function onUncheckAll(rows) {
	$.each(rows, function(i, n) {
		onUncheck(i, n);
	});
}

function reLoadTable() {//复核时候的查询
	var invPmtRef = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000725',
			invPmtRef : invPmtRef
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				if('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE){
					SCFUtils.loadGridData('invcMTable', data.rows, true, true);//复核时候保护表格
					forEachRe(data.rows);
				}
				if('FP' === SCFUtils.FUNCTYPE){
					SCFUtils.loadGridData('invcMTable', data.rows, false, true);//在途申请时候不保护表格
					forEachRe(data.rows);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}


function loadTable() {//Q_P_000712
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
		var data = SCFUtils.convertArray("pmtForm");
		if (data) {
			var sysLockBy = $("#sysRefNo").val();
			if('PM' === SCFUtils.FUNCTYPE){
			var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000712',
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
									false, true);
							forEach(data.rows);
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
			}else if('FP' === SCFUtils.FUNCTYPE ){
				var options = {
						url : SCFUtils.AJAXURL,
						data : {
							queryId : 'Q_P_000713',
							buyerId : buyerId,
							selId : selId,
							busiTp : busiTp,
							sysLockBy : sysLockBy,
							cacheType : 'non'
						},
						callBackFun : function(data) {
							if (data.success) {
								if (!SCFUtils.isEmpty(data.rows)) {
									SCFUtils.loadGridData('invcMTable', data.rows,
											false, true);
									forEach(data.rows);
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
			}
		}
	}
}


function loadGridData(data, flag1, flag2) {
	SCFUtils.loadGridData('invcMTable', data, flag1, flag2);
}

function forEach(data) {
	var loanId = $('#loanId').val();
	var invPmtRef = $('#sysRefNo').val();
	var date = getDate(new Date());
	$.each(data, function(i, n) {
		$('#invcMTable').datagrid(
				'updateRow',
				{
					index : i,
					row : {
						struLoanAmt : 0,
						invBalHd : n.invBal,
						invPmtRef : invPmtRef,
						invRef : n.sysRefNo,
						sysRefNo : n.sysRefNo + invPmtRef,
						lastPayDt : SCFUtils.getcurrentdate(),
					}
				});
	});
}

/*
 * FP进来时候的foreach给临时变量赋值
 */
function forEachRe(data) {
	$.each(data, function(i, n) {
		$('#invcMTable').datagrid(
				'updateRow',
				{
					index : i,
					row : {
						invBalHd : SCFUtils.Math(n.invBal,n.struLoanAmt,'add'),
						invPmtRef : $("#sysRefNo").val(),
						lastPayDt : SCFUtils.getcurrentdate(),
					}
				});
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
			width : '12.5%',
			editor : {
				type : 'numberbox',
				options : {
					precision : 2
				},
			},
		}, {
			field : 'sysRefNo',
			title : '融资申请号',
			hidden : true
		}, {
			field : 'cntrctNo',
			title : '授信额度编号',
			hidden : true
		}, {
			field : 'loanId',
			title : '融资编号',
			hidden : true
		}, {
			field : 'invNo',
			title : '应收账款凭证号',
			width : '12.5%'
		}, {
			field : 'invCcy',
			title : '币种',
			width : '12.5%'
		}, {
			field : 'invBal',
			title : '应收账款余额',
			width : '12.5%',
			formatter : ccyFormater
		}, {
			field : 'invBalHd',
			title : '应收账款余额（临时）',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'invLoanBal',
			title : '融资余额',
			width : '12.5%',
			formatter : ccyFormater
		}, {
			field : 'invLoanBalHd',
			title : '融资余额（临时）',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'invLoanAval',
			title : '最大可融资金额',
			width : '12.5%',
			formatter : ccyFormater
		},{
			field : 'trxDt',
			title : '还款日期',
			width : '12.5%',
			formatter : dateFormater
		},{
			field : 'currInt',
			title : '本次应收利息',
			width : '12.5%',
			formatter : ccyFormater
		},{
			field : 'currPayInt',
			title : '本次实收利息',
			width : '12.5%',
			formatter : ccyFormater
		}, {
			field : 'loanRt',
			title : '融资利率（年化）',
			width : 60,
			hidden : true,
		}, {
			field : 'loanValDt',//=loanM.loanValDt
			title : '起息日',
			width : 60,
			hidden : true,
		}, {
			field : 'invLoanAvalHd',
			title : '最大可融资金额（临时）',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}
		// , {
		// field : 'payTranAmt',
		// title : '已还手续费金额',
		// hidden:true,
		// formatter:ccyFormater
		// }, {
		// field : 'payBillAmt',
		// title : '已还处理费金额',
		// width : 60,
		// hidden:true,
		// formatter:ccyFormater
		// }
		, {
			field : 'lastPayDt',
			title : '上一次还款日期',
			width : 60,
			hidden : true,
			formatter : dateFormater
		}, {
			field : 'payAmt',
			title : '入账金额',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'loanPerc',
			title : '融资比例',
			width : 60,
			hidden : true,
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
		} ] ]
	};
	$('#invcMTable').datagrid(options);
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

var isFpLoad = false;
function accept() {
	$('#accetpFlag').val("true");
	// totalPayTranAMt =0.0000;
	// totalPayBillAmt =0.0000;
	totalPayAmt = 0.0000;
	totalStruLoanAmt = 0.0000;
	var data = $('#invcMTable').datagrid('getSelections');
	endEditing();// 结束编辑。
	$.each(data, function(i, n) {
		if (SCFUtils.Math(n.struLoanAmt, n.invBalHd, 'sub') > 0) {
			var index = $("#invcMTable").datagrid('getAllRowIndex', n);
			SCFUtils.alert('冲销金额不得大于应收账款余额！');
			onUncheck(index, n);
		}
		var rowIndex = $('#invcMTable').datagrid('getRowIndex', n);
				$('#invcMTable').datagrid(
						'updateRow',
						{
							index : rowIndex,
							row : {
								invBal : SCFUtils.Math(n.invBalHd,n.struLoanAmt,'sub'),
								trxDt : SCFUtils.getcurrentdate()
								
							}
						});
		totalStruLoanAmt = SCFUtils
				.Math(totalStruLoanAmt, n.struLoanAmt, 'add');
	});
	$('#ttlPmtAmt').numberbox('setValue', totalStruLoanAmt);
	// $('#payTranAmt').numberbox('setValue',totalPayTranAMt);
	// $('#payBillAmt').numberbox('setValue',totalPayBillAmt);
	var lmtAmt = $('#lmtAmt').numberbox('getValue');
	var lmtBal = $('#lmtBal').numberbox('getValue');
	var lmtAllocate = $('#lmtAllocate').numberbox('getValue');
	var temp = SCFUtils.Math(lmtAmt, lmtBal, 'sub');
	if (SCFUtils.Math(temp, totalStruLoanAmt, 'sub') > 0) {
		$('#lmtBal').numberbox('setValue',
				SCFUtils.Math(lmtBal, totalStruLoanAmt, 'add'));
		$('#lmtAllocate').numberbox('setValue',
				SCFUtils.Math(lmtAllocate, totalStruLoanAmt, 'sub'));
	} else {
		$('#lmtBal').numberbox('setValue', lmtAmt);
		$('#lmtAllocate').numberbox('setValue', 0);
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

//查询协议表
function queryCntrctInfo(cntrctNo) {
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
 * 查询扣款账号信息入int表
 * 主要查询开户行开户名称和账户名称
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
 * 打包利息信息入Int表
 * 公式：CURR_PAY_INT= Ttl_Loan_Bal*【（还款日-起息日）+1】* LOAN_RT/360
 * 获取loanMtable中的本次还款利息总和  = sum(payIntAmt)
 */
function getIntData(){
	//计算sum(payIntAmt)
	var invcRows = SCFUtils.getGridData('invcMTable');//打包全部
	var currPayInt = 0;
	var currInt = 0;
	var loanValDt="";
	$.each(invcRows,function(i,n){
		currPayInt = SCFUtils.Math(currPayInt,n.currPayInt,'add');
		currInt = SCFUtils.Math(currInt,n.currInt,'add');
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
			obj.currInt = currPayInt;//本次应收利息
			obj.currPayInt = currPayInt;//本次实收利息，利随本清肯定收息；预收息不记录
			obj.intPayFlg = 1;//应收已收
			obj.theirRef = $("#sysRefNo").val();
			obj.createDt = loanValDt;//利息产生时间
			obj.payIntTp = 2;//new 收取方式2利随本清
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
 * 得到表单的最早的那个起息日
 */
function getMinLoanValDt(){
	var data = $('#invcMTable').datagrid('getSelections');
	var minLoanValDt = data[0].loanValDt;
	$.each(data, function(i, n){
		if(SCFUtils.DateDiff(n.loanValDt,minLoanValDt)<0){
			minLoanValDt = n.loanValDt;
		}
	});
	return minLoanValDt;
}

/**
 * 打包loan数据。更新loanM表
 * @returns {___anonymous48325_48326}
 */
function getLoanMData(){
	if('PM' === SCFUtils.FUNCTYPE || 'FP' === SCFUtils.FUNCTYPE){
		var rows = SCFUtils.getSelectedGridData('invcMTable', false);
	}else if('DP' === SCFUtils.FUNCTYPE || 'RE' === SCFUtils.FUNCTYPE){
		var rows = SCFUtils.getGridData('invcMTable');
	}
	var repeatLoanId = getRepeatLoanId(rows);//得到去除重复的loanId数组
	var loan = {};// 融资信息表
	for(var i=0;i<repeatLoanId.length;i++){
		var ttlInvLoanBal = 0;
		var obj={};
		var loanId = repeatLoanId[i];
		$.each(rows,function(i,n){
			if(i == '_total_rows'){
				return true;
			}
			if(loanId == n.loanId){
				ttlInvLoanBal = SCFUtils.Math(ttlInvLoanBal,n.invLoanBal,'add');
			}
		});
		obj.sysRefNo = loanId;
		obj.ttlLoanBal = ttlInvLoanBal;
		loan['rows'+i] = obj;
	}
	loan._total_rows = repeatLoanId.length;
	return loan;
}


/**
 * 得到datagrid中重复的loanID
 * @param data
 * @returns {Array}
 */
function getRepeatLoanId(data){
	 var tmp={},b=[]; 
	 $.each(data,function(i,n){
		 if(i == '_total_rows'){
				return true;
			}
		 if(!tmp[n.loanId]){
	            b.push(n.loanId);
	            tmp[n.loanId]=!0;
	        }
	 });
	return b;
}


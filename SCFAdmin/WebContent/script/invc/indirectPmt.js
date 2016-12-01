var totalPayTranAMt = 0.0000;
var totalPayBillAmt = 0.0000;
var totalStruLoanAmt = 0.0000;
var totalPayAmt = 0.0000;
var totalSurPayAmt = 0.0000;
var FPLoadTable = 0;
var list = [];
function ajaxBox() {
	var data = [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	} ];
	$("#busiTp").combobox('loadData', data);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("lmtCcy", true);
	SCFUtils.setNumberboxReadonly("verPmtAmt", true);
	SCFUtils.setNumberboxReadonly("payTranAmt", true);
	SCFUtils.setNumberboxReadonly("payBillAmt", true);
	SCFUtils.setNumberspinnerReadonly("ttlPmtAmt", true);
	SCFUtils.setTextReadonly("sysRefNo", true);
	$('tr[id=Tr1]').hide();
	$('tr[id=Tr2]').hide();
	$('tr[id=Tr3]').hide();
	$('tr[id=Tr4]').hide();
	$('tr[id=Tr5]').hide();
	$('tr[id=Tr6]').hide();
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
	SCFUtils.loadForm('pmtForm', data);
	var selId = $("#selId").val();
	getSellerHKH(selId);
	var busiTp = $("#busiTp").val();
	defineDataGridEvent();
	reLoadTable();
	if (data.obj.busiTp == '3') {
		queryCollatCompNm(data.obj.insureNo);
	} else {
		changeBusiTp();
	}
	/*
	 * $('#invcMTable').datagrid('uncheckAll');
	 */
}
function pageOnLoad(data) {
	SCFUtils.loadForm('pmtForm', data);
	var options = {};
	options.data = {
		refName : 'PmtRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	$('#lmtAmtHd').numberbox('setValue', data.obj.lmtAmt);
	$('#lmtAllocateHd').numberbox('setValue', data.obj.lmtAllocate);
	$('#cntrctNo').val(data.obj.sysRefNo);
	$('#lmtBalHd').numberbox('setValue', data.obj.lmtBal);
	$('#ttlPmtAmt').numberspinner('setValue', 0);// 付款总金额
	$('#verPmtAmt').numberbox('setValue', 0);// 核销总金额
	$('#payTranAmt').numberbox('setValue', 0);// 本次还款手续费
	$('#payBillAmt').numberbox('setValue', 0);// 本次还款处理费
	var selId = $("#selId").val();
	getSellerHKH(selId); // 获取卖方保理专户
	getCntrctSbrSysRefNo(data.obj.sysRefNo);// 根据额度表中的交易流水号得到额度关联表的交易流水号
	getBuyerLmt(data.obj.buyerId);// 根据额度表中的客户Id得到客户信息
	defineDataGridEvent();
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
	$('#sysRelReason').textbox('setValue',data.obj.sysRelReason);
	SCFUtils.setComboReadonly('sysRelReason', true);
	SCFUtils.loadForm('pmtForm', data);
	// loadInvc(true);
	SCFUtils.loadGridData('invcMTable', SCFUtils.parseGridData(data.obj.invc),
			true);// 加载数据并保护表格。
//	$('#invcMTable').datagrid('hideColumn', 'ck');
//	$('#querybutton').linkbutton('disable');
//	$('#acceptbutton').linkbutton('disable');
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
	SCFUtils.loadForm('pmtForm', data);
	// SCFUtils.loadGridData('invcMTable',SCFUtils.parseGridData(data.obj.invc),
	// false);
	SCFUtils.loadGridData('invcMTable',
			SCFUtils.parseGridData(data.obj.doname), false);
	$('#ttlPmtAmt').numberspinner('setValue', 0);
	// $('#payPrinAmt').numberspinner('setValue', 0);//本金总金额
	// $('#payIntAmt').numberspinner('setValue', 0); //利息总金额
	/*
	 * var options =$('#invcMTable').datagrid('options');
	 * options.onLoadSuccess=function(gridData){ forEach(gridData.rows); };
	 */
	defineDataGridEvent();
	loadTable();
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
	lookSysRelReason();
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
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
	lookSysRelReason();

}

// 复核的时候由于余额是从发票M表抓的，故重新计算发票余额
function calcInvBal() {
	var data = $("#invcMTable").datagrid('getAllData').rows;
	$.each(data, function(i, n) {
		//var invLoanBal = n.invLoanBal; // 融资余额
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
	var flag=false;
	var data = $('#invcMTable').datagrid('getData');
	if(data.total==0){
		SCFUtils.alert('请选择核销的发票！');
		flag=true;
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
						if (contains(list, n.sysRefNo)) {// 假如选中的行里存在’Q_P_000409‘中查询出来的
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

function onNextBtnClick() {
	if (editIndex !== undefined) {
		SCFUtils.alert('请您点击接受改变按键以便进行下一步操作！');
		return;
	}
	var ttlLoanBal = $('#verPmtAmt').numberbox('getValue');
	if (ttlLoanBal<= 0) {
		SCFUtils.alert('核销金额必须大于0！');
		return;
	}
	var mainData = SCFUtils.convertArray('pmtForm');
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
		"custLmtCcy" : custInfo.lmtCcy ,//额度币别
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
		'cntrctSbrLmtRecover' :SCFUtils.Math(cntrctSbrInfo.lmtRecover, ttlLoanBal, 'add')  //额度关联信息_归还额度 =原归还额度+核销应收账款总额
	});
	getLmt();
	var grid = {};
	var griddata;
	if ('PM' == SCFUtils.FUNCTYPE) {
		$.extend($.extend(mainData, grid), {
			"clType" : "O"
		});
//		var data = SCFUtils.getSelectedGridData('invcMTable', false);
//		var list = [];
//		$.each(data, function(i, n) {
//			var temp = {
//				'sysRefNo' : n.sysRefNo,
//				'invLoanBal' : n.invLoanBal
//			};
//			list.push(temp);
//		});
//		var invRef = data.rows0.sysRefNo;// data.rows0 取到的是所有的？不要循环吗？
//		if (checkLoanBal(invRef, list)) {
//			SCFUtils.confirm('冲销后该笔融资关联的应收账款融资余额总额小于该笔融资的融资余额，是否继续交易',
//					function() {
//						getLmt();
//						addEventTimes();
//						// addEventTimes();//提交时给还款子表的eventTimes字段赋值
//						var grid = {};
//						var griddata;
//						if ('RE' === SCFUtils.FUNCTYPE
//								|| 'DP' === SCFUtils.FUNCTYPE) {
//							griddata = SCFUtils.getGridData('invcMTable');
//						} else {
//							if (checkDataGrid()) {
//								return;
//							}
//							griddata = SCFUtils.getSelectedGridData(
//									'invcMTable', false);
//						}
//						var selId = $('#selId').val();
//						var selName = $('#selNm').val();
//						var sysRefNo = $('#sysRefNo').val();
//						var ccy = $('#lmtCcy').combobox('getValue');
//						var ttlLoanBal = $('#verPmtAmt').numberbox('getValue');
//						$.extend($.extend(mainData, grid), {
//							"custNo" : selId
//						}, {
//							"custNm" : selName
//						}, {
//							"rerNo" : sysRefNo
//						}, {
//							"trxCcy" : ccy
//						}, {
//							"trxAmt" : ttlLoanBal
//						}, {
//							"expTrxAmt" : ttlLoanBal
//						}, {
//							"clType" : "S"
//						}, {
//							"tdType" : "R"
//						}, {
//							"trxDate" : SCFUtils.getcurrentdate()
//						});
//						grid.invc = SCFUtils.json2str(griddata);
//						$.extend(mainData, grid);
//						SCFUtils.SubmitAjax(mainData);
//					});
//		} else {
			
//		}
	} else {
		$.extend($.extend(mainData, grid), {
			"clType" : "S"
		});
	}
	if ('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE) {
		griddata = SCFUtils.getGridData('invcMTable');
	} else {
		if (checkDataGrid()) {
			return;
		}
		griddata = SCFUtils.getSelectedGridData('invcMTable', false);
	}
	var selId = $('#selId').val();
	var selName = $('#selNm').val();
	var sysRefNo = $('#sysRefNo').val();
	var ccy = $('#lmtCcy').combobox('getValue');
	//var ttlLoanBal = $('#verPmtAmt').numberbox('getValue');
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
		"tdType" : "R"
	}, {
		"trxDate" : SCFUtils.getcurrentdate()
	}, {
		"sysRelReason" : $('#sysRelReason').val()
	});
	grid.invc = SCFUtils.json2str(griddata);
	$.extend(mainData, grid);
	return mainData;
	
}
function getLmt() {
	var verPmtAmt = $('#verPmtAmt').numberbox('getValue');
	$('#cntrctSbrBuyerBal').numberbox(
			'setValue',
			SCFUtils.Math(verPmtAmt, $('#cntrctSbrBuyerBalHd').numberbox(
					'getValue'), 'add'));
	$('#buyerlmtBal').numberbox(
			'setValue',
			SCFUtils.Math(verPmtAmt, $('#buyerlmtBalHd').numberbox('getValue'),
					'add'));
	$('#buyerlmtAvl').numberbox(
			'setValue',
			SCFUtils.Math($('#buyerlmtAvlHd').numberbox('getValue'), verPmtAmt,
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

function defineDataGridEvent() {
	var options = $('#invcMTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
}

function reLoadTable() {
	var invPmtRef = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000019',
			invPmtRef : invPmtRef
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
//				appendRow(data.rows);
				SCFUtils.loadGridData('invcMTable', data.rows,
						false, true);// 加载本地数据分页显示
			}
		}
	};
	SCFUtils.ajax(options);
}

//function appendRow(rows) {
//	var loanId = $('#loanId').val();
//	$.each(rows, function(i, n) {
//		var sysRefNo = rows[i].invRef;
//		var sysEventTimes = rows[i].eventTimes;
//		var opt = {
//			url : SCFUtils.AJAXURL,
//			data : {
//				queryId : 'Q_P_000422',
//				sysRefNo : loanId + sysRefNo
//			},
//			callBackFun : function(data) {
//				temp = data.rows[0].loanAmt;
//
//				var options = {
//					url : SCFUtils.AJAXURL,
//					data : {
//						queryId : 'Q_P_000018',
//						sysRefNo : sysRefNo,
//						sysEventTimes : sysEventTimes,
//					},
//					callBackFun : function(data) {
//						if (data.success && !SCFUtils.isEmpty(data.rows)) {
//							rows[i].invNo = data.rows[0].invNo;
//							rows[i].invCcy = data.rows[0].invCcy;
//							rows[i].invBal = data.rows[0].invBal;
//							rows[i].struLoanAmt = data.rows[0].struLoanAmt;
//							rows[i].loanPerc = data.rows[0].loanPerc;
//							rows[i].invDueDt = data.rows[0].invDueDt;
//							rows[i].invValDt = data.rows[0].invValDt;
//						}
//					}
//				};
//				SCFUtils.ajax(options);
//			}
//		};
//		SCFUtils.ajax(opt);
//	});
//	if ('FP' == SCFUtils.FUNCTYPE) {
//		SCFUtils.loadGridData('invcMTable', rows, false, true);
//	} else {
//		SCFUtils.loadGridData('invcMTable', rows, true, true);
//	}
//}

function loadTable() {
	FPLoadTable = SCFUtils.Math(FPLoadTable, 1, 'add');
	$('#verPmtAmt').numberbox('setValue', 0);// 清零
	$('#ttlPmtAmt').numberspinner('setValue', 0);// 清零
	if (SCFUtils.CURRENTPAGE == '1'
			&& ('PM' == SCFUtils.FUNCTYPE || ('FP' == SCFUtils.FUNCTYPE && FPLoadTable != '1'))) {
		if (SCFUtils.isEmpty($('#buyerId').val())) {
			SCFUtils.alert('请指定间接客户！');
			return;
		}
		var buyerId = $('#buyerId').val();
		var selId = $('#selId').val();
		//var busiTp = $('#busiTp').combobox('getValue');
		var cntrctNo = $('#cntrctNo').val();
		$('#invcMTable').datagrid('clearChecked');
		var data = SCFUtils.convertArray("pmtForm");
		if (data) {
			var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000435',
					buyerId : buyerId,
					selId : selId,
					cntrctNo : cntrctNo,
					cacheType : 'non'
				// 根据授信客户ID和间接客户ID来查询InvcM（发票表）表
				},
				callBackFun : function(data) {
					if (data.success) {
						if (!SCFUtils.isEmpty(data.rows)) {
							$.each(data.rows, function(i, n) {
								var sysRefNo = n.sysRefNo;
								var pmtSysRefNo = $('#sysRefNo').val();
								$.extend(n, {
									invRef  :sysRefNo,
									invPmtRef :pmtSysRefNo,
									sysRefNo : pmtSysRefNo+sysRefNo,
									invBalHD:n.invBal
								});
							});
							// $('#ttlPmtAmt').numberspinner('setValue', 0);
							SCFUtils.loadGridData('invcMTable', data.rows,
									false, true);// 加载本地数据分页显示
							// $('#invcMTable').datagrid('selectAll');//
							// 将查询出来的数据放到表格中，并且全部选中了
						} else {

							SCFUtils.alert("没有符合的应收账款");
						}
					} else {
						SCFUtils.alert("查询失败");
					}
				}
			};
			SCFUtils.ajax(options);// 共同ajax调用
			editIndex = undefined;
		}
	}
}

function loadInvc(flag) {
	// var buyerId = $('#buyerId').val();
	// var selId = $('#selId').val();
	var busiTp = $('#busiTp').combobox('getValue');
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000011',
			// buyerId : buyerId,
			// selId : selId,
			busiTp : busiTp,
			cacheType : 'append'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {

				loadGridData(data.rows, flag);
				// SCFUtils.loadGridData('invcMTable',data.rows);
			}
		}
	};
	SCFUtils.ajax(options);

}

function loadGridData(data, flag1, flag2) {
	SCFUtils.loadGridData('invcMTable', data, flag1, flag2);
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
			width : '14.28%',
			editor : {
				type : 'numberbox',
				options : {
					precision : 2
				},
			},
			formatter : ccyFormater
		}, {
			field : 'invRef',
			title : '发票流水号',
			hidden : true
		}, {
			field : 'invPmtRef',
			title : '还款编号',
			hidden : true
		}, {
			field : 'sysRefNo',
			title : '还款子表流水号',
			hidden : true
		}, {
			field : 'invNo',
			title : '应收账款凭证号',
			width : '14.28%'
		}, {
			field : 'invCcy',
			title : '币种',
			width : '14.28%'
		}, {
			field : 'invBal',
			title : '应收账款余额',
			width : '14.28%',
			formatter : ccyFormater
		}
//		, {
//			field : 'invBalHD',
//			title : '应收账款余额(隐藏)',
//			width : 110,
//			formatter : ccyFormater
//		}
//		, {
//			field : 'loanPerc',
//			title : '融资百分比',
//			width : 110,
//			formatter : pectType
		// 百分比格式化
//		}
		, {
			field : 'invDueDt',
			title : '应收账款到期日',
			width : '14.28%',
			formatter : dateFormater
		}, {
			field : 'lastPayDt',
			title : '上一次还款日期',
			width : '14.28%',
			formatter : dateFormater
		}, {
			field : 'invLoanAval',
			title : '最大可融资金额',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'invValDt',
			title : '应收账款生效日',
			width : '14.28%',
			formatter : dateFormater
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

function accept() {
	totalPayAmt = 0.0000;
	totalStruLoanAmt = 0.0000;
	var data = $('#invcMTable').datagrid('getSelections');
	endEditing();// 结束编辑
	$.each(data,
			function(i, n) {
		if (SCFUtils.Math(n.struLoanAmt, n.invBalHD,
		'sub') > 0){
			SCFUtils.alert('冲销金额不得大于该笔应收账款余额！');
			onUncheck(i,n);
		}else{
			// 如果符合 冲销 <= 应收
			var rowIndex = $('#invcMTable').datagrid(
					'getRowIndex', n);// 获得选中的行数
			$('#invcMTable').datagrid(
					'updateRow',
					{
						index : rowIndex,
						row : {
							invBal : SCFUtils.Math(
									n.invBalHD,
									n.struLoanAmt, 'sub'),// 数据库中实际的应收账款余额减去冲销
						}
					});
			totalStruLoanAmt = SCFUtils.Math(totalStruLoanAmt,
					n.struLoanAmt, 'add');
		
		}
				/*
				 * "冲销应收账款金额"<=“应收账款余额”(当选中的时候“应收账款金额”=0了)
				 * 要做如下判定，应收账款余额的值应该重新从数据库中取 做个Query查询，并循环
				 */
//				var opt = {
//					url : SCFUtils.AJAXURL, 	
//					data : {
//						queryId : 'Q_P_000437',
//						sysRefNo : n.sysRefNo,
//						cacheType : 'non'
//					},
//					callBackFun : function(data) {
//						if (SCFUtils.Math(n.struLoanAmt, data.rows[0].invBal,
//								'sub') > 0
//								&& SCFUtils.Math(n.struLoanAmt,
//										data.rows[0].invBal, 'sub') != 0) {
//							var index = $("#invcMTable").datagrid(
//									'getAllRowIndex', n);
//							SCFUtils.alert('冲销金额不得大于该笔应收账款余额！');
//							acceptonUncheck(index, n, data);
//						} else {// 如果符合 冲销 <= 应收
//							var rowIndex = $('#invcMTable').datagrid(
//									'getRowIndex', n);// 获得选中的行数
//							$('#invcMTable').datagrid(
//									'updateRow',
//									{
//										index : rowIndex,
//										row : {
//											invBal : SCFUtils.Math(
//													data.rows[0].invBal,
//													n.struLoanAmt, 'sub'),// 数据库中实际的应收账款余额减去冲销
//										}
//									});
//							totalStruLoanAmt = SCFUtils.Math(totalStruLoanAmt,
//									n.struLoanAmt, 'add');
//						}
//					}
//				};
//				SCFUtils.ajax(opt);
			});
	$('#verPmtAmt').numberbox('setValue', totalStruLoanAmt);
	$('#ttlPmtAmt').numberspinner('setValue', totalStruLoanAmt);

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

function showDetail() {

}

function changeBusiTp() {
	var busiTp = $('#busiTp').combobox('getValue');
	if (busiTp != '3') {
		$('td[id=collate1]').hide();
		$('td[id=collate2]').hide();
	}
}

/*
 * 冲销金额和应收账款计算，Form中核销总额，入账金额赋值
 */
function subArAmt() {
	totalStruLoanAmt = 0.0000;// 冲销的总金额
	var data = SCFUtils.getGridData('invcMTable');
	$.each(data, function(i, n) {
		// //"冲销应收账款金额"<=“应收账款余额”
		// if(SCFUtils.Math(n.struLoanAmt, n.invBal, 'sub') >0){
		// var index = $("#invcMTable").datagrid('getAllRowIndex',n);
		// SCFUtils.alert('冲销金额不得大于该笔应收账款余额！');
		// onUncheck(index, n);
		// }
		// var rowIndex = $('#invcMTable').datagrid('getRowIndex',n);
		$('#invcMTable').datagrid('updateRow', {
			index : i,
			row : {
				invBal : SCFUtils.Math(n.invBal, n.struLoanAmt, 'sub'),// 应收账款余额减去冲销
			}
		});

		totalStruLoanAmt = SCFUtils
				.Math(totalStruLoanAmt, n.struLoanAmt, 'add');
	});
	$('#verPmtAmt').numberbox('setValue', totalStruLoanAmt);
	$('#ttlPmtAmt').numberspinner('setValue', totalStruLoanAmt);
}


function onCheck(rowIndex, rowData) {
	rowData.ck = true;
	var invBal = rowData.invBal;// 获得应收账款余额
	totalStruLoanAmt = $('#verPmtAmt').numberbox('getValue');// form上核销应收账款总额;
	$('#invcMTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			// 当选中一行数据时，给字段重新改值
			sysRefNo : rowData.sysRefNo,
			invNo : rowData.invNo,
			invCcy : rowData.invCcy,
			invBal : 0,
			struLoanAmt : invBal,// 当选中时，冲销应收账款金额等于应收账款余额
			loanPerc : rowData.loanPerc,
			invDueDt : rowData.invDueDt,
			invValDt : rowData.invValDt,
			invLoanAval : SCFUtils.Math(rowData.invLoanAval, invBal, 'add'),// 最大可融资余额=数据库中invLoanAval+冲销金额
			lastPayDt : SCFUtils.getcurrentdate()
		// 更新最后一次还款时间，取当前时间 （问题：当取消的时候暂时无法恢复为原来数值）
		}
	});
	totalStruLoanAmt = SCFUtils.Math(totalStruLoanAmt, rowData.struLoanAmt,
			'add');// 总核销金额 = form上的加上新选中的，相当于叠加
	$('#verPmtAmt').numberbox('setValue', totalStruLoanAmt);// 设置核销总额的值
	$('#ttlPmtAmt').numberspinner('setValue', totalStruLoanAmt);// 设置入账总金额的值
	onClickRow(rowIndex);
}
// 改好 测试完成，当取消选择时，能将应收账款余额还原
function onUncheck(rowIndex, rowData) {
	rowData.ck = false;
	var newstruLoanAmt = rowData.struLoanAmt;
	totalStruLoanAmt = $('#verPmtAmt').numberbox('getValue');// form上核销应收账款总额;
	// $('#accetpFlag').val("false");
	$('#invcMTable').datagrid(
			'updateRow',
			{
				index : rowIndex,
				row : {
					sysRefNo : rowData.sysRefNo,
					invNo : rowData.invNo,
					invCcy : rowData.invCcy,
					invBal :rowData.invBalHD,
					struLoanAmt : 0,
					loanPerc : rowData.loanPerc,
					invDueDt : rowData.invDueDt,
					invValDt : rowData.invValDt,
					invLoanAval : SCFUtils.Math(rowData.invLoanAval,
							newstruLoanAmt, 'sub'),// 最大可融资余额=数据库中invLoanAval+冲销金额
					lastPayDt :	0	
				}
			});
	endEditing();
	$('#verPmtAmt').numberbox('setValue',
			SCFUtils.Math(totalStruLoanAmt, newstruLoanAmt, 'sub'));// 还原一条核销应收账款总额
	$('#ttlPmtAmt').numberbox('setValue',
			SCFUtils.Math(totalStruLoanAmt, newstruLoanAmt, 'sub'));// 还原一条入账金额总额
}

function onCheckAll(rows) {
	$.each(rows, function(i, n) {
		onUncheck(i, n);
		onCheck(i, n);
	});// 循环每一次选中事件
	endEditing();
}

function onUncheckAll(rows) {
	$.each(rows, function(i, n) {
		onUncheck(i, n);
	});
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

function onClickRow(index) {
	if (editIndex != index) {
		if (endEditing()) {
			$('#invcMTable').datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#invcMTable').datagrid('selectRow', editIndex);
		}
	}
}
// 用于accept不合格的时候释放
function acceptonUncheck(rowIndex, rowData, data) {
	rowData.ck = false;
	totalStruLoanAmt = $('#verPmtAmt').numberbox('getValue');// form上核销应收账款总额;
	$('#invcMTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			sysRefNo : rowData.sysRefNo,
			invNo : rowData.invNo,
			invCcy : rowData.invCcy,
			invBal : data.rows[0].invBal,// 这是重新从数据库里查的，所以这样写应收账款余额
			struLoanAmt : 0,
			loanPerc : rowData.loanPerc,
			invDueDt : rowData.invDueDt,
			invValDt : rowData.invValDt
		}
	});
	endEditing();
	$('#verPmtAmt').numberbox('setValue',
			SCFUtils.Math(totalStruLoanAmt, data.rows[0].invBal, 'sub'));// 还原一条核销应收账款总额
	$('#ttlPmtAmt').numberbox('setValue',
			SCFUtils.Math(totalStruLoanAmt, data.rows[0].invBal, 'sub'));// 还原一条入账金额总额
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

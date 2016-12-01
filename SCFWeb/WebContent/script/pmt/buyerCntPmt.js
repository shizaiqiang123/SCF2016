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
	}, {
		"id" : '8',
		"text" : "买方单笔保理"
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
	SCFUtils.loadForm('pmtForm', row);
	
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	$('#sysRelReason').textbox('setValue',data.obj.sysRelReason);
	
	if(relQueryIntE().length > 0){
		$("#intSysRefNo").val(relQueryIntE().sysRefNo);
	}
	$("#payIntTp").val(queryCntrctInfo(data.obj.cntrctNo).payIntTp);
	var selId = $("#selId").val();
	getSellerHKH(selId);
//	var busiTp = $("#busiTp").val();
	// getCntInfo(selId,busiTp);
	reLoadTable();
	$('#invcMTable').datagrid('selectAll',true);//在加载数据初始化时就将datagrid中的数据默认全勾选
//	/queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
	queryCntrctInfo(data.cntrctNo);
	defineDataGridEvent();
	lookSysRelReason();
	$('#accetpFlag').val('true');
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
	$('#lmtAmtHd').numberbox('setValue', data.obj.lmtAmt);
	$('#lmtAllocateHd').numberbox('setValue', data.obj.lmtAllocate);
	$('#cntrctNo').val(data.obj.sysRefNo);
	$('#lmtBalHd').numberbox('setValue', data.obj.lmtBal);
//	getSellerHKH(selId); // 获取卖方保理专户（初次加载页面不查询，在选择完授信用户时查询）
	getCntrctSbrSysRefNo(data.obj.sysRefNo);
	getBuyerLmt(data.obj.buyerId);
	defineDataGridEvent();
	$('#loanId').val("");
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
	// loadInvc(true);
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
	// $('#payPrinAmt').numberspinner('setValue', 0);//本金总金额
	// $('#payIntAmt').numberspinner('setValue', 0); //利息总金额
	/*
	 * var options =$('#invcMTable').datagrid('options');
	 * options.onLoadSuccess=function(gridData){ forEach(gridData.rows); };
	 */
	defineDataGridEvent();
	loadTable();
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

function showDetail() {

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
function onNextBtnClick() {
	var ttlLoanBal = $('#ttlPmtAmt').numberbox('getValue');//核销应收账款总额
	if (ttlLoanBal <= 0) {
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
		'sysRelReason' : $('#sysRelReason').val(),
		'OldSysRelReason' : $('#OldSysRelReason').val(),
	});
	
	
	
	if ('PM' == SCFUtils.FUNCTYPE) {
		var data = SCFUtils.getSelectedGridData('invcMTable', false);
		var list = [];
//		$.each(data, function(i, n) {
//			var temp = {
//				'sysRefNo' : n.invRef,
//				'invLoanBal' : n.invLoanBal
//			};
//			list.push(temp);
//		});
		var invRef = data.rows0.invRef;
		// if(checkLoanBal(invRef,list)){
		if (false) {
			SCFUtils.confirm('冲销后该笔融资关联的应收账款融资余额总额小于该笔融资的融资余额，是否继续交易',
					function() {
//						getLmt();
//						addEventTimes();
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
						grid.lmt = SCFUtils.json2str(updateLmt());
						$.extend(mainData, grid);
						return mainData;
//						SCFUtils.SubmitAjax(mainData);
					});
		} else {
//			getLmt();
//			addEventTimes();
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
			grid.lmt = SCFUtils.json2str(updateLmt());
			$.extend(mainData, grid);
			return mainData;
//			SCFUtils.SubmitAjax(mainData);
		}
	} else {
//		getLmt();
//		addEventTimes();
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
		grid.lmt = SCFUtils.json2str(updateLmt());
		$.extend(mainData, grid);
		return mainData;
	}
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
			struLoanAmt :rowData.invBalHd
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
			invLoanBal : rowData.invLoanBalHd,
			invLoanAval : rowData.invLoanAvalHd,
			invBal : rowData.invBalHd,
			struLoanAmt : 0.00,
			loanAmt : rowData.loanAmtHd,
		}
	});
	endEditing();
	$('#ttlPmtAmt').numberbox('setValue', 0);
}
function onCheckAll(rows) {
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
			queryId : 'Q_P_000019',
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
				
//				appendRow(data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function appendRow(rows) {
	// var loanId = $('#loanId').val();
	$.each(rows, function(i, n) {
		var sysRefNo = rows[i].invRef;
		var sysEventTimes = rows[i].eventTimes;

		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000018',
				sysRefNo : sysRefNo,
				sysEventTimes : sysEventTimes,
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					rows[i].invBal = data.rows[0].invBal;
					rows[i].invLoanBal = data.rows[0].invLoanBal;
					rows[i].invLoanAval = data.rows[0].invLoanAval;
					rows[i].invBalHd = SCFUtils.Math(data.rows[0].invBal,
							data.rows[0].struLoanAmt, 'add');
					// rows[i].invLoanBalHd = data.rows[0].invLoanBal;
					rows[i].invLoanBalHd = SCFUtils.Math(
							data.rows[0].invLoanBal, SCFUtils.Math(
									data.rows[0].struLoanAmt,
									data.rows[0].loanPerc / 100.0000, 'mul'),
							'add')
					// rows[i].invLoanAvalHd = data.rows[0].invLoanAval;
					rows[i].invLoanAvalHd = SCFUtils.Math(
							data.rows[0].invLoanBal, SCFUtils.Math(
									data.rows[0].invBal,
									data.rows[0].loanPerc / 100.0000, 'mul'),
							'add');
					rows[i].loanTranAmt = data.rows[0].loanTranAmt;
					rows[i].loanBillAmt = data.rows[0].loanBillAmt;
					rows[i].payAmt = data.rows[0].payAmt;
					rows[i].loanPerc = data.rows[0].loanPerc;
					rows[i].struLoanAmt = data.rows[0].struLoanAmt;
					rows[i].invNo = data.rows[0].invNo;
					rows[i].invCcy = data.rows[0].invCcy;
					rows[i].tempTranAmt = data.rows[0].tempTranAmt;
					rows[i].tempBillAmt = data.rows[0].tempBillAmt;
//					rows[i].invLoanRefNo = loanId + sysRefNo;
					// rows[i].loanAmt = temp;
					// rows[i].loanAmtHd = SCFUtils.Math(temp,
					// data.rows[0].struLoanAmt, 'add');
					rows[i].ck = true;
				}
			}
		};
		 SCFUtils.ajax(options);
	});
	$('#accetpFlag').val('true');
	if ('FP' == SCFUtils.FUNCTYPE) {
		SCFUtils.loadGridData('invcMTable', rows, false, true);
	} else {
		SCFUtils.loadGridData('invcMTable', rows, true, true);
	}
}

function loadTable() {
	FPLoadTable = SCFUtils.Math(FPLoadTable, 1, 'add');
	if (SCFUtils.CURRENTPAGE == '1'
			&& ('PM' == SCFUtils.FUNCTYPE || 'FP' == SCFUtils.FUNCTYPE)) {//原来为('FP' == SCFUtils.FUNCTYPE && FPLoadTable != '1'))
		if (SCFUtils.isEmpty($('#selId').val())) {
			SCFUtils.alert('请指定授信客户名称！');
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
					queryId : 'Q_P_000640',
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
							queryId : 'Q_P_000649',
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
						invLoanBalHd : n.invLoanBal,
						invBalHd : n.invBal,
						invLoanAvalHd : n.invLoanAval,
						invPmtRef : invPmtRef,
						lastPayDt : SCFUtils.getcurrentdate(),
						invRef : n.sysRefNo,
						sysRefNo : n.sysRefNo + invPmtRef,
					}
				});
	});
}

/*
 * FP进来时候的foreach给临时变量赋值
 */
function forEachRe(data) {
	var invPmtRef = $('#sysRefNo').val();
	var date = getDate(new Date());
	$.each(data, function(i, n) {
		var loanId = "";
		var invcLoanId = "";
		var invLoanBalHd = "";
		var invBalHd = "";
		var invLoanAvalHd = "";
		var loanValDt = "";
		var loanPerc = "";
		var loanRt = "";
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000648',//new 
				invRef : n.invRef
			},
			callBackFun : function(data) {
				if (SCFUtils.isEmpty(data.rows[0])) {
					SCFUtils.alert("没有符合的发票融资信息");
				} else {
					loanId = data.rows[0].invcLoanId;
					invcLoanId = data.rows[0].sysRefNo;
					invLoanBalHd = data.rows[0].invLoanBal;
					invBalHd = data.rows[0].invBal;
					invLoanAvalHd = data.rows[0].invLoanAval;
					loanValDt = data.rows[0].loanValDt;
					loanPerc = data.rows[0].loanPerc;
					loanRt = data.rows[0].loanRt;
				}
				$('#invcMTable').datagrid(
						'updateRow',
						{
							index : i,
							row : {
								invLoanBalHd : invLoanBalHd,
								invBalHd : invBalHd,
								invLoanAvalHd : invLoanAvalHd,
								loanId : loanId,
								invLoanRefNo : invcLoanId,
								invPmtRef : $("#sysRefNo").val(),
								lastPayDt : SCFUtils.getcurrentdate(),
								loanValDt : loanValDt,
								loanPerc :  loanPerc,
								loanRt : loanRt
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
			width : '12.5%',
			editor : {
				type : 'numberbox',
				options : {
					precision : 2
				},
			},
		}, {
			field : 'sysRefNo',
			title : '发票流水号',
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
			field : 'invValDt',
			title : '应收帐款起算日',
			width : '12.5%',
			formatter : dateFormater
		}, {
			field : 'invDueDt',
			title : '应收帐款到期日',
			width : '12.5%',
			formatter : dateFormater
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
		}, {
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
			field : 'invRef',//存放发票流水号
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
			field : 'invPmtRef',//更新invcPmtM表的流水号
			title : '关联还款流水号',
			width : 110,
			hidden : true
		}, {
			field : 'invLoanRefNo',
			title : '融资申请子表流水号',
			width : 110,
			hidden : true
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
		if($("#payIntTp").val() == 2){//利随本清
			//计算本次应收利息总额
			var trxDt = SCFUtils.getcurrentdate();//得到当前还款日
//			本次应收利息公式： currInt = n.ttlLoanBalHd*(pmtDt-n.loanValDt+1)*n.loanRt/360;
			var days = SCFUtils.DateDiff(trxDt,SCFUtils.dateFormat(n.loanValDt, 'yyyy-MM-dd'));
			var loanRtRe = SCFUtils.Math(n.loanRt,0.01,'mul');
			var loanRtDay = SCFUtils.Math(loanRtRe,360,'div');
			var currInt = SCFUtils.Math(SCFUtils.Math(n.invLoanBalHd,days,'mul'),loanRtDay,'mul');//本次应收利息总额
			/*
			 * 假如(冲销金额*融资比例)大于（融资余额+应收利息） 实收利息=应收利息，融资余额=0
			 * 假如(融资余额>(冲销金额*融资比例)>应收利息) 实收利息=应收利息，融资余额=原融资余额-（冲销金额-实收利息）
			 * 假如((冲销金额*融资比例)<应收利息) 实收利息=冲销金额，融资余额=不变
			 */
			var struLoanReal = SCFUtils.Math(n.struLoanAmt,n.loanPerc / 100.0000, 'mul');
			var invBallc = SCFUtils.Math(n.invBalHd, n.struLoanAmt,'sub');//应收账款余额
			if(SCFUtils.Math(struLoanReal,SCFUtils.Math(n.invLoanBalHd,currInt,'add'),'sub')>0){
				var currPayInt = currInt;
				var invLoanBallc = 0;
				// 最大可融资额=应收账款余额*融资比例-融资余额	
				var invLoanAvallc = SCFUtils.Math(SCFUtils.Math(invBallc,	n.loanPerc / 100.0000, 'mul'),	invLoanBallc,'sub');
				if(invLoanAvallc<0){invLoanAvallc=0;}
			}else if (SCFUtils.Math(struLoanReal,currInt, 'sub') > 0) {
				// modify by longchao for bug 124	
				var currPayInt = currInt;
				var invLoanBallc = SCFUtils.Math(n.invLoanBalHd,SCFUtils.Math(struLoanReal,currInt,'sub'),'sub');
				// 最大可融资额=应收账款余额*融资比例-融资余额	
				var invLoanAvallc = SCFUtils.Math(SCFUtils.Math(invBallc,	n.loanPerc / 100.0000, 'mul'),	invLoanBallc,'sub');
				if(invLoanAvallc<0){invLoanAvallc=0;}
			} else if(SCFUtils.Math(struLoanReal,currInt, 'sub') < 0){
				var currPayInt = struLoanReal;
				var invLoanBallc = n.invLoanBalHd;
				// 最大可融资额=应收账款余额*融资比例-融资余额	
				var invLoanAvallc = SCFUtils.Math(SCFUtils.Math(invBallc,	n.loanPerc / 100.0000, 'mul'),	invLoanBallc,'sub');
				if(invLoanAvallc<0){invLoanAvallc=0;}
			}
			$('#invcMTable').datagrid(
					'updateRow',
					{
						index : rowIndex,
						row : {
							invBal :invBallc,
							invLoanBal : invLoanBallc,
							invLoanAval : invLoanAvallc,
							loanAmt : SCFUtils.Math(n.loanAmtHd, n.struLoanAmt,'sub'),
							currInt : currInt,
							currPayInt : currPayInt,
							trxDt : trxDt
						}
					});
		}else{
			if (SCFUtils.Math(n.invLoanBalHd, SCFUtils.Math(n.struLoanAmt,
					n.loanPerc / 100.0000, 'mul'), 'sub') > 0) {
				// modify by longchao for bug 124	
				var invBallc = SCFUtils.Math(n.invBalHd, n.struLoanAmt,'sub');//应收账款余额
				var invLoanBallc = SCFUtils.Math(n.invLoanBalHd, 
						SCFUtils.Math(n.struLoanAmt, n.loanPerc / 100.0000, 'mul'), 'sub')//融资余额
						// 最大可融资额=应收账款余额*融资比例-融资余额	
						var invLoanAvallc = SCFUtils.Math(SCFUtils.Math(invBallc,	n.loanPerc / 100.0000, 'mul'),	invLoanBallc,'sub');
				if(invLoanAvallc<0){invLoanAvallc=0;}
				$('#invcMTable').datagrid(
						'updateRow',
						{
							index : rowIndex,
							row : {
								invBal : invBallc,
								invLoanBal : invLoanBallc,
								invLoanAval : invLoanAvallc,
//							invLoanAval : SCFUtils.Math(SCFUtils.Math(
//									n.invBalHd, n.loanPerc / 100.0000, 'mul'),
//									n.invLoanBalHd, 'sub'),
								loanAmt : SCFUtils.Math(n.loanAmtHd, n.struLoanAmt,
								'sub'),
								currInt : 0,
								currPayInt : 0,
								trxDt : SCFUtils.getcurrentdate()
								
							}
						});
			} else {
				// 最大可融资额=应收账款余额*融资比例-融资余额		（没有减融资余额吧）
				var invLoanAvallc1 = SCFUtils.Math(SCFUtils.Math(n.invBalHd, n.struLoanAmt,'sub'),n.loanPerc / 100.0000, 'mul');
				if(invLoanAvallc<0){invLoanAvallc=0;}
				$('#invcMTable').datagrid(
						'updateRow',
						{
							index : rowIndex,
							row : {
								invBal : SCFUtils.Math(n.invBalHd, n.struLoanAmt,
								'sub'),
								invLoanBal : 0,
								invLoanAval : invLoanAvallc1,
//							invLoanAval : SCFUtils.Math(SCFUtils.Math(
//									n.invBalHd, n.loanPerc / 100.0000, 'mul'),
//									n.invLoanBalHd, 'sub'),
								loanAmt : SCFUtils.Math(n.loanAmtHd, n.struLoanAmt,
								'sub'),
								currInt : 0,
								currPayInt : 0,
								trxDt : SCFUtils.getcurrentdate()
							}
						});
			}
		}
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
//查询协议关联关系信息表
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

/*
 * 查询买方保理里的关联客户
 * 从协议关联表里去查询selId和selNm
 * new on 2016-10-17 by JJH
 */
function selIdLookUp() {
	var cntrctNo = $("#cntrctNo").val();
	var options = {
		title : '买方保理的授信客户查询',
		reqid : 'I_P_000211',
		data : {
			'cntrctNo' : cntrctNo
		},
		onSuccess : selSuccess
	};
	SCFUtils.getData(options);
}

function selSuccess(data) {
	$('#selNm').val(data.selNm);
	$('#selId').val(data.selId);
	getSellerHKH(data.selId);
	/*
	 * 查询按钮前的必输项，以及查询之后带出来的一个字段
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160801 by JinJH
	 */
	if($('#selNm').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#selNm').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#selNm').removeClass('validatebox-invalid');
	}
}

function queryLmt(cntrctNo,custId,lmtTp){
	var obj= {};
	if(lmtTp == '0'){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000646',//通用
					buyerId : custId,
					cntrctNo : cntrctNo,
					lmtTp : lmtTp,
					cacheType : 'non'
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
	}else if(lmtTp == '1'){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000645',//通用
					cntrctNo : cntrctNo,
					selId : custId,
					lmtTp : lmtTp,
					cacheType : 'non'
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
	}
	return obj;
}

function updateLmt(){
	var cntrctNo = $("#cntrctNo").val();
	var buyerId = $("#buyerId").val();
	var selId = $("#selId").val();
	var buyerLmtAmt = 0;//买方
	var selerLmtAmt = 0;//卖方
	var buyerLmtRefNo = "";//买方额度流水号
	var selerLmtRefNo = "";//买方额度流水号
	//协议 buyerID lmtTp= 0
	//查询买方额度
	var buyerobj = queryLmt(cntrctNo,buyerId,'0');
	if(buyerobj.length > 0){
		buyerLmtAmt = SCFUtils.Math(buyerobj.lmtBal,getTtlPmtLoanBal(),'add');
		buyerLmtRefNo = buyerobj.sysRefNo;
	}
	//查询卖方额度
	var selerobj = queryLmt(cntrctNo,selId,'1');
	if(selerobj.length > 0){
		if(selerobj.lmtAmt > 0){
			selerLmtAmt = SCFUtils.Math(selerobj.lmtBal,getTtlPmtLoanBal(),'add');
		}
		selerLmtRefNo = selerobj.sysRefNo;
	}
	var lmt = {};// 添加额度信息表
	lmt._total_rows = 2;//total_rows不给值会默认没有数据，一笔还款只有2条记录
	var buyerObj = {};
	buyerObj.sysRefNo = buyerLmtRefNo;
	buyerObj.lmtBal = buyerLmtAmt;
	buyerObj.theirRef = $("#sysRefNo").val();
	lmt['rows0'] = buyerObj;
	
	var selerObj = {};
	selerObj.sysRefNo = selerLmtRefNo;
	selerObj.lmtBal = selerLmtAmt;
	selerObj.theirRef = $("#sysRefNo").val();
	lmt['rows1'] = selerObj;
	
	return lmt;
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


/**
 *  得到总的还款的融资总额
 */
function getTtlPmtLoanBal(){
	var ttlPmtLoanBal = 0;
	if('PM' == SCFUtils.FUNCTYPE || 'FP' == SCFUtils.FUNCTYPE){
		var data = SCFUtils.getSelectedGridData('invcMTable', false);
	}else{
		var data = SCFUtils.getGridData('invcMTable');
	}
	$.each(data,function(i,n){
		ttlPmtLoanBal = SCFUtils.Math(ttlPmtLoanBal,SCFUtils.Math(n.invLoanBalHd,n.invLoanBal,'sub'),'add');
	});
	return ttlPmtLoanBal;
}
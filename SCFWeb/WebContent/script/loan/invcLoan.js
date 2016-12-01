var list = [];
var totalMarginAmt = 0.0000;
var totalLoanAval = 0.0000;
var numFlag = 0;
var cntrOrAmt;
var ischangeInvcAval = true;
// 定义一个全局变量，用于FP判断是否初次加载未点击table中的查询按钮。
// true为是FP初次加载未点击查询按钮。false为点击了查询按钮后的FP
var isFPfirst = false;
/**
 * 复合功能时，进入结果汇总页面
 * 
 * @param data
 */
function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
	changeLoanTp();
	changePayIntTp();
	SCFUtils.setNumberboxReadonly("marginAmt", true);
	SCFUtils.setTextboxReadonly("marginAcNo", true);
	// queryCust(data);
	SCFUtils.loadGridData('invcLoanTable', SCFUtils
			.parseGridData(data.obj.invc), true);// 加载数据并保护表格
	$('#querybutton').linkbutton('disable');
	$('#invcLoanTable').datagrid('checkAll');
	lookSysRelReason();
	if (data.obj.OldSysRelReason == "") {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}

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

function pageOnFPLoad(data) {
	isFPfirst = true;
	pageOnReleasePageLoad(data);
	queryCustAcno(data);
	// 注释下一行原因：在pageonReleasePageonLoad中已经给form加载数据，再次加载，会触发reloadInvcLoanTable时间。调用loadTable
	// SCFUtils.loadForm('loanSubmit', data);
	$("#loanAble").numberbox('setValue', data.obj.loanAble);// 页面上的可融资金额需要再次赋值一次，因主表加载时触发各种onchange事件改变此值
	changeLoanTp();
	cntrOrAmt = $('#lmtBal').val();
	$('#lmtAmtHd').val(data.obj.lmtAmt);
	$('#lmtBalHd').val(
			SCFUtils.Math(data.obj.lmtBal, data.obj.ttlLoanAmt, 'add'));
	$('#lmtAllocateHd').val(
			SCFUtils.Math(data.obj.lmtAllocate, data.obj.ttlLoanAmt, 'sub'));

	$('#lmtBal').val($('#lmtBalHd').val());
	$('#lmtAllocate').val($('#lmtAllocateHd').val());
	$('#querybutton').linkbutton('enable');
	queryCollatCompNm(data.obj.insureNo);
	// SCFUtils.setComboReadonly("loanTp", true);
	SCFUtils.setNumberboxReadonly('intAmt', true);
	setDueDt(data.obj.cntrctNo);
	var options = $('#invcLoanTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	// loadRelTab(data);
	setTotalLoanFP();// 设置totalLoan的值要在loadTable之后，用到table中的字段计算
	$("#invcLoanTable").datagrid('selectAll');
	queryBuyerInfo(data.obj.cntrctNo, data.obj.buyerId);
	$('#ttlLoanAmt').numberbox("setValue", data.obj.ttlLoanAmt);
	$('#loanAble').numberbox("setValue", data.obj.loanAble);
	$('#intAmt').numberbox("setValue", data.obj.intAmt);
	$('#pdgAmt').numberbox("setValue", data.obj.pdgAmt);
	// 协议相关信息
	var cntrct = queryCntrctInfo(data.obj.cntrctNo);
	$('#transChgrt').val(cntrct.transChgrt);
	changePayIntTp();
	isFPfirst = false;// $("#invcLoanTable").datagrid('selectAll');语句结束就放开。isFPfirst只控制了oncheckAll
	// gridData = SCFUtils.getGridData('invcLoanTable');
	lookSysRelReason();
}

/**
 * 根据协议编号查询买方信息
 */
function queryBuyerInfo(cntrctNo, buyerId) {
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
				// getBuyerLmt(data.rows[0].buyerId);
			}
		}
	};
	SCFUtils.ajax(options);
}
/**
 * 复合功能时，Next进入交易页面
 * 
 * @param data
 */
function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('loanSubmit', row);
	$('#currFinPayCost').val(relQueryFeeE()[0].currFinPayCost);// 应收账款处理费金额
	$('#currFinCost').val(relQueryFeeE()[0].currFinCost);// 本次应收处理费
	$('#feeSysRefNo').val(relQueryFeeE()[0].sysRefNo);// 插入fee表时候的流水号字段
														// relQueryIntE
	$('#intSysRefNo').val(relQueryIntE()[0].sysRefNo);// 插入int表时候的流水号字段
														// relQueryIntE
	$('#currInt').val(relQueryIntE()[0].currInt);// 本次应收利息
	$('#currPayInt').val(relQueryIntE()[0].currPayInt);// 本次应收利息
	$('#currIntDt').val(relQueryIntE()[0].currIntDt);// 本次应收利息
	$('#currIntPayDt').val(relQueryIntE()[0].currIntPayDt);// 本次应收利息
	loadRelTab(data);
	$("#loanAble").numberbox('setValue', data.obj.loanAble);// 页面上的可融资金额需要再次赋值一次，因主表加载时触发各种onchange事件改变此值
	changeLoanTp();
	queryCollatCompNm(data.obj.insureNo);
	SCFUtils.setNumberboxReadonly("marginAmt", true);
	SCFUtils.setTextboxReadonly("marginAcNo", true);

	$('#intAmt').numberbox("setValue", data.obj.intAmt);
	$('#pdgAmt').numberbox("setValue", data.obj.pdgAmt);
	$('#querybutton').linkbutton('disable');
	$('#invcLoanTable').datagrid('checkAll');
	queryBuyerInfo(data.obj.cntrctNo, data.obj.buyerId);
	changePayIntTp();
	lookSysRelReason();
	if (data.obj.OldSysRelReason == "") {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
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
				$('#insureLmtBal').val(data.rows[0].lmtBal);
				$('#collatNo').textbox('setValue', data.rows[0].lmtBal);
			}
		}
	};
	SCFUtils.ajax(options);
}
/**
 * 复合功能时，Pre进入交易页面
 * 
 * @param data
 */
function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('loanSubmit', data);
	changeLoanTp();

	SCFUtils.setNumberboxReadonly("marginAmt", true);
	SCFUtils.setTextboxReadonly("marginAcNo", true);
	// queryCust(data);
	SCFUtils.loadGridData('invcLoanTable', SCFUtils
			.parseGridData(data.obj.invc), true);// 加载数据并保护表格
	changePayIntTp();
	$('#querybutton').linkbutton('disable');
	$('#invcLoanTable').datagrid('checkAll');
	lookSysRelReason();
	if (data.obj.OldSysRelReason == "") {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
}

/**
 * 申请功能时，进入结果页面
 * 
 * @param data
 */
function pageOnResultLoad(data) {
	if (SCFUtils.FUNCTYPE == 'PM') {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
	SCFUtils.loadForm('loanSubmit', data);
	// $('#ttlLoanAmt').numberbox('setValue',data.obj.ttlLoanAmt);
	changeLoanTp();
	changePayIntTp();
	// SCFUtils.setNumberboxReadonly("marginAmt", true);
	// SCFUtils.setTextboxReadonly("marginAcNo", true);
	SCFUtils.loadGridData('invcLoanTable', SCFUtils
			.parseGridData(data.obj.invc), true);// 加载数据并保护表格
	lookSysRelReason();
}

/**
 * 申请功能时，Pre进入交易页面
 * 
 * @param data
 */
function pageOnPreLoad(data) {
	if (SCFUtils.FUNCTYPE == 'PM') {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
	isFPfirst = true;
	SCFUtils.loadForm('loanSubmit', data);

	changeLoanTp();
	SCFUtils.loadGridData('invcLoanTable', SCFUtils
			.parseGridData(data.obj.invc), false);
	gridData = $("#invcLoanTable").datagrid('getSelections');
	var options = $('#invcLoanTable').datagrid('options');
	// options.onLoadSuccess=function(data){
	// eachAdd(data.rows);
	// };
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	$("#invcLoanTable").datagrid('selectAll');
	isFPfirst = false;
	changePayIntTp();
	/*
	 * var lmtBal=$('#subLmt').numberspinner('getValue');
	 * $('#lmtBal').val(lmtBal);
	 */
	// loadTable();
	// $('#intAmt').numberbox('setValue',0);
	// $('#currFinCost').numberbox('setValue',0);
	// $('#currFinPayCost').numberbox('setValue',0);
	lookSysRelReason();
}

/**
 * 申请功能时，Next进入交易页面
 * 
 * @param data
 */
function pageOnLoad(data) {
	if (SCFUtils.FUNCTYPE == 'PM') {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
	SCFUtils.loadForm('loanSubmit', data);
	changeLoanTp();
	$('#ccy').val(data.obj.lmtCcy);
	$('#cntrctNo').val(data.obj.sysRefNo);
	queryCustAcno(data);
	cntrOrAmt = $('#lmtBal').val();
	$('#sellerLmtSysRefNo').val(data.obj.lmtSysRefNo);// 卖方额度流水号
	$('#lmtAmtHd').val(data.obj.lmtAmt);
	$('#lmtBalHd').val(data.obj.lmtBal);
	$('#lmtAllocateHd').val(data.obj.lmtAllocate);
	$('#lmtAmt').val($('#lmtAmtHd').val());
	$('#lmtBal').val($('#lmtBalHd').val());
	$('#lmtAllocate').val($('#lmtAllocateHd').val());
	var refRequest = {};
	refRequest.data = {
		refName : 'LoanRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(refRequest);

	querySelInfo();
	setDueDt(data.obj.sysRefNo);
	queryInsure(data.obj.cntrctNo);
	var options = $('#invcLoanTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	// SCFUtils.setNumberboxReadonly('initMarginPct', true);
	queryBuyerInfo(data.obj.cntrctNo, data.obj.buyerId);
	var date = new Date();
	$("#loanValDt")
			.datebox("setValue", SCFUtils.dateFormat(date, "yyyy-MM-dd"));// 20160831融资起始日默认当前时间
	changePayIntTp();
	lookSysRelReason();
}

function queryInsure(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000427',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#collatCompNm').textbox('setValue',
						data.rows[0].collatCompNm);
				$('#insureNo').val(data.rows[0].insureNo);
				$('#insureLmtBal').val(data.rows[0].lmtBal);
				$('#collatNo').val(data.rows[0].collatAmt);
			}
		}
	};
	SCFUtils.ajax(options);
}

/**
 * 所有进入交易页面 公共的方法
 * 
 * @param data
 */
function pageOnInt() {
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setTextReadonly('ccy', true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setNumberspinnerReadonly("loanAble", true);
	SCFUtils.setNumberboxReadonly('pdgAmt', true);
	SCFUtils.setNumberboxReadonly('intAmt', true);
	// SCFUtils.setComboReadonly('loanTp', true);
	ajaxBox();
	ajaxTable();
	SCFUtils.setComboReadonly('OldSysRelReason', true);
	SCFUtils.setComboReadonly("payIntTp", true);
}

function setDueDt(data) {
	if (!SCFUtils.isEmpty(data)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000419',
				trxId : data
			},
			callBackFun : function(data) {
				$('#dueDt').val(data.rows[0].graceDay);
			}
		};
		SCFUtils.ajax(opt);
	}
	if ('PM' == SCFUtils.FUNCTYPE || 'FP' == SCFUtils.FUNCTYPE) {
		var loanDueDt = $('#loanDueDt').datebox('getValue');
		if (!SCFUtils.isEmpty(loanDueDt)) {
			var dueDt = $("#dueDt").val();
			$("#loanOverdueDt").val(SCFUtils.FormatDate(loanDueDt, dueDt));
		}
	}

}

function getDueDt() {
	if ('PM' == SCFUtils.FUNCTYPE || 'FP' == SCFUtils.FUNCTYPE) {
		var loanDueDt = $('#loanDueDt').datebox('getValue');
		if (!SCFUtils.isEmpty(loanDueDt)) {
			var dueDt = $("#dueDt").val();
			$("#loanOverdueDt").val(SCFUtils.FormatDate(loanDueDt, dueDt));
		}
	}
	var loanDueDt = $('#loanDueDt').datebox("getValue");
	var trxDt = $('#trxDt').datebox('getValue');
	if (SCFUtils.DateDiff(loanDueDt, trxDt) < 0) {
		SCFUtils.alert("融资到期日不能小于当前日期,请修改");
		return false;
	}
}
function checkSelAcNm() {
	if ('PM' == SCFUtils.FUNCTYPE) {
		var marginAcNo = $("#marginAcNo").val();
		if (!marginAcNo.isEmpty) {
			var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000352',
					marginAcNo : marginAcNo
				},
				callBackFun : function(data) {
					$.each(data.rows, function(i, n) {
						if (n.marginAcNo == marginAcNo) {
							SCFUtils.alert('该账号已经存在！');
							$("#marginAcNo").textbox('setValue', '');
							$("#acNOFlag").val('false');
							return;
						}
					});
					$("#acNOFlag").val('true');
				}
			};
			SCFUtils.ajax(opt);
		}
	}
}

// 查询用户客户号，客户经理，登记机构
function querySelInfo() {
	var selId = $('#selId').val();
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000414',
			sysRefNo : selId
		},
		callBackFun : function(data) {
			$('#cmsCustNo').val(data.rows[0].cmsCustNo);
			$('#custMgrId').val(data.rows[0].custMgrId);
			$('#custBrId').val(data.rows[0].custBrId);
		}
	};
	SCFUtils.ajax(opt);

}
// 判断保证金是否符合规则
function doMarginAmt() {
	/*
	 * var loanTp = $('#loanTp').val(); if(loanTp == '2'){ var tempMarginAmt =
	 * $('#tempMarginAmt').numberbox('getValue'); var marginAmt =
	 * $('#marginAmt').numberbox('getValue'); if(SCFUtils.Math(marginAmt,
	 * tempMarginAmt, 'sub')<0){ return true; } return false; }
	 */
	return false;
}

function getSellerData() {

	var sellerLmt = {};// 添加卖方额度信息
	sellerLmt._total_rows = 1;
	var obj = {};
	var lmtTp = '1';
	if('RE'===SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE ){
		obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		obj.lmtBal = relQueryLmtE(lmtTp)[0].lmtBal ;//卖方额度余额=原卖方额度余额-融资金额
		obj.lmtAllocate = relQueryLmtE(lmtTp)[0].lmtAllocate ;//本次占用额度=原来占用额度+融资金额

	}else{
		if('FP'===SCFUtils.FUNCTYPE){
			obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		}else{
			obj.sysRefNo = $('#sellerLmtSysRefNo').val();
		}
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#ttlLoanAmt').numberbox('getValue'),'sub') ;//卖方额度余额=原卖方额度余额-融资金额
		obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#ttlLoanAmt').numberbox('getValue'),'add') ;//本次占用额度=原来占用额度+融资金额

	}

	obj.ttlAllocate = $('#sellerTtlAllocate').val();// 已占用额度
	obj.theirRef = $('#sysRefNo').val();//主页流水号

	sellerLmt['rows0'] = obj;
	return sellerLmt;

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
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');
	var loanDueDt = $("#loanDueDt").datebox("getValue");
	var loanValDt = $('#loanValDt').datebox('getValue');
	var acNoFlag = $("#acNOFlag").val();
	var selId = $('#selId').val();
	var selName = $('#selNm').val();
	var busiTp = $('#busiTp').val();
	var trxDt = $('#trxDt').datebox('getValue');
	var loanAble = $('#loanAble').numberspinner('getValue');
	var mainData = SCFUtils.convertArray('loanSubmit');
	var sysRefNo = $('#sysRefNo').val();
	var ccy = $('#ccy').val();
	// 协议相关信息
	var cntrct = queryCntrctInfo(mainData.cntrctNo);
	if (ttlLoanAmt == 0) {
		SCFUtils.alert('本次融资金额为零,请勾选应收账款！');
		return;
	}
	var grid = {};
	var griddata; // =SCFUtils.getSelectedGridData('invcLoanTable',false);
	if ('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE) {
		griddata = SCFUtils.getGridData('invcLoanTable');
	} else {
		// griddata=SCFUtils.getSelectedGridData('invcLoanTable',false);
		var rows = $('#invcLoanTable').datagrid('getSelections');
		var copyRows = [];
		for (var j = 0; j < rows.length; j++) {
			if (rows[j].invLoanBal != 0) {
				copyRows.push(rows[j]);
			}
		}
		var invcGd = {};
		invcGd._total_rows = copyRows.length;
		for (var j = 0; j < copyRows.length; j++) {
			invcGd['rows' + j] = copyRows[j];
		}
		griddata = invcGd;
	}
	$.each(griddata, function(i, n) {
		$.extend(n, {
			"loanValDt" : loanValDt
		// 融资起始日为输入的日期--不限定当前日期
		});
	});
	grid.invc = SCFUtils.json2str(griddata);
	grid.invcLoan = SCFUtils.json2str(griddata);
	//打包卖方额度数据
	grid.sellerLmt = SCFUtils.json2str(getSellerData());
	grid.fee = SCFUtils.json2str(getFeeData());// 打包费用表mainData
	grid.int = SCFUtils.json2str(getIntData());// 打包利息表mainData
	$.extend($.extend(mainData, grid), {
		"loanAble" : loanAble
	}, {
		"selId" : selId
	}, {
		"selName" : selName
	}, {
		"busiTp" : busiTp
	}, {
		"trxDt" : trxDt
	}, {
		"custNo" : selId
	}, {
		"custNm" : selName
	}, {
		"refNo" : sysRefNo
	}, {
		"trxCcy" : ccy
	}, {
		"expTrxAmt" : loanAble
	}, {
		"clType" : "S"
	}, {
		"tdType" : "T"
	}, {
		"trxDate" : trxDt
	});
	$.extend(mainData, {
		'cntrctLmtAmt' : cntrct.lmtAmt, // 协议_额度金额

		"cntrctLmtBal" : SCFUtils.Math(cntrct.lmtBal, mainData.ttlLoanAmt,
				'sub'),// 协议_额度余额 = 原额度余额-本次占用金额（即：融资金额）

		'cntrctLmtAllocate' : SCFUtils.Math(cntrct.lmtAllocate,
				mainData.ttlLoanAmt, 'add'), // 协议_占用额度 =
												// 原占用额度+本次占用金额（即：融资金额）

		'cntrctLmtRecover' : cntrct.lmtRecover, // 协议_归还额度

		"cntrctLmtCcy" : cntrct.lmtCcy,// 额度币别
		'confirmFlag' : 0
	});
	changePayIntTp();
	// 复核
	if ('RE' === SCFUtils.FUNCTYPE) {
		$.extend($.extend(mainData, grid), {
			"trxAmt" : loanAble
		});
		SCFUtils.SubmitAjax(mainData);
	} else {
		var sellerLmtLimit = $('#sellerLmtLimit').val();
		if (acNoFlag == 'false') {
			SCFUtils.alert('账号已存在，请更换账号！');
			return;
		}
		if (doMarginAmt()) {
			SCFUtils.alert('保证金不足！');
			return;
		}
		if (checkLoanDueDt()) {
			return;
		}
		getLmtBal();
		addEventTimes();// 提交时给融资子表invc_loan的eventTimes字段赋值
		if (sellerLmtLimit == '') {
			$.extend($.extend(mainData, grid), {
				"trxAmt" : ttlLoanAmt
			});
			SCFUtils.SubmitAjax(mainData);
		} else {
			SCFUtils.alert(sellerLmtLimit, function() {
				$('#loanDueTime').val(SCFUtils.DateDiff(loanDueDt, loanValDt));
				$.extend($.extend(mainData, grid), {
					"trxAmt" : ttlLoanAmt
				});
				SCFUtils.SubmitAjax(mainData);
			});
		}
	}
}

function checkLoanDueDt() {
	var data = $('#invcLoanTable').datagrid('getSelections');
	var flag = false;
	var loanDueDt = $('#loanDueDt').datebox('getValue');
	$.each(data, function(i, n) {

		if (SCFUtils.DateDiff(n.dueDt, loanDueDt) > 0) {
			loanDueDt = n.dueDt;
			flag = true;
		}
	});
	if (flag) {
		$('#loanDueDt').datebox('setValue', '');
		SCFUtils.alert("融资到期日应不早于最晚应收账款逾期日" + loanDueDt);
	}
	return flag;
}
// 计算额度表已用额度与剩余额度
function getLmtBal() {
	var loanTp = $('#loanTp').val();
	if (loanTp == '2') {
		var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");
		var lmtBalHd = $("#lmtBalHd").val();
		var lmtAmtHd = $("#lmtAmtHd").val();
		var lmtAllocateHd = $("#lmtAllocateHd").val();
		var temp = SCFUtils.Math(lmtBalHd, ttlLoanAmt, 'sub');
		$("#lmtAllocate").val(SCFUtils.Math(lmtAllocateHd, ttlLoanAmt, 'add'));
		$("#lmtBal").val(temp);
	} else if (loanTp == '1') {
		var temp1 = $("#ttlLoanAmt").numberbox("getValue");
		var temp2 = $('#marginAmt').numberbox('getValue');
		var ttlLoanAmt = SCFUtils.Math(temp1, temp2, 'sub');
		var lmtBalHd = $("#lmtBalHd").val();
		// var lmtAmtHd =$("#lmtAmtHd").val();
		var lmtAllocateHd = $("#lmtAllocateHd").val();
		var temp = SCFUtils.Math(lmtBalHd, ttlLoanAmt, 'sub');
		$("#lmtAllocate").val(SCFUtils.Math(lmtAllocateHd, ttlLoanAmt, 'add'));
		$("#lmtBal").val(temp);
	}
}

function ajaxBox() {
	var busiTp = [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '3',
		"text" : "信保项下"
	}, {
		"id" : '7',
		"text" : "应收账款质押"
	} ];
	$("#busiTp").combobox('loadData', busiTp);
	SCFUtils.setComboReadonly("busiTp", true);
	var payIntTp = [ {
		"id" : '1',
		"text" : "预收息"
	}, /*
		 * { "id" : '3', "text" : "按月扣息" }, { "id" : '4', "text" : "按季扣息" }, {
		 * "id" : '5', "text" : "按年扣息" },
		 */{
		"id" : '2',
		"text" : "利随本清"
	} ];
	$("#payIntTp").combobox('loadData', payIntTp);
	/*
	 * var loanTp = [{"id":'1',"text":"保理预付款"},{"id":'2',"text":"保理授信"}];
	 * $("#loanTp").combobox('loadData',loanTp);
	 */
	var lmtBal = $("#lmtBal").val();
	$("#lmtBalHd").val(lmtBal);
	SCFUtils.setTextReadonly('sysRefNo', true);
	$('tr[id=Tr1]').hide();
	$('tr[id=Tr2]').hide();
	SCFUtils.setTextReadonly("selAcNm", true);
	SCFUtils.setTextReadonly("selAcBkNm", true);
	SCFUtils.setNumberboxReadonly("marginAmt", true);
	// SCFUtils.setTextboxReadonly("collatCompNm", true);
	SCFUtils.setTextboxReadonly("totalLoan", true);
	var isCollect = [ {
		"id" : 'Y',
		"text" : "是"
	}, {
		"id" : 'N',
		"text" : "否"
	} ];
	$("#isCollect").combobox('loadData', isCollect);
	$("#isCollect").combobox('setValue', "Y");
}

/*
 * 是否收取费用下拉框onchange事件
 */
function changecostPayFlg() {
	var costPayFlg = $('#costPayFlg').combobox('getValue');
	if (costPayFlg == 'Y') {
		var currFinCost = $('#currFinCost').numberbox('getValue');
		$('#currFinPayCost').numberbox('setValue', currFinCost);
	} else {
		$('#currFinPayCost').numberbox('setValue', 0);
	}
}

function buyerSuccess(data) {
	$('#buyerId').val(data.buyerId);
	$('#buyerNm').val(data.buyerNm);
	queryBuyer(data.buyerId);
}
/*
 * 查询间接客户额度，额度起始日，额度到期日
 */
function queryBuyer(sysRefNo) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#lmtBalHD').val(data.rows[0].lmtBal);
				$('#custLmtBal').numberbox('setValue', data.rows[0].lmtBal);
				$('#lmtValidDt').datebox('setValue', data.rows[0].validDt);
				$('#lmtDueDt').datebox('setValue', data.rows[0].dueDt);
				$('#subSel').val(data.rows[0].lmtBal);
			}
		}
	};
	SCFUtils.ajax(opt);
}

/*
 * 融资利率方式下拉框onchenge事件
 */
function doRt() {
	var rtTp = $('#rtTp').combobox('getValue');
	if (rtTp === '1') {
		$('#libor').numberspinner({
			required : true,
			readonly : false
		});
		$('#rtSpread').numberspinner({
			required : true,
			readonly : false
		});
		$('#loanRt').numberspinner({
			required : false,
			readonly : true
		});
		$('#loanRt').numberspinner('setValue', '');
	} else {
		$('#libor').numberspinner({
			required : false,
			readonly : true
		});
		$('#rtSpread').numberspinner({
			required : false,
			readonly : true
		});
		$('#loanRt').numberspinner({
			required : true,
			readonly : false
		});
		$('#libor').numberspinner('setValue', '');
		$('#rtSpread').numberspinner('setValue', '');
	}
}
/*
 * libor和点数onchange事件
 */
function countRt() {
	var libor = $('#libor').numberspinner('getValue');
	var rtSpread = $('#rtSpread').numberspinner('getValue');
	if (!SCFUtils.isEmpty(libor) && !SCFUtils.isEmpty(rtSpread)) {
		var loanRt = SCFUtils.Math(libor, rtSpread * 0.01, 'add');
		$('#loanRt').numberspinner('setValue', loanRt);
	}
}

/*
 * 利率onchange事件
 */
function changeLoanRt() {
	var loanRt = $('#loanRt').numberspinner('getValue');
	var data = $('#invcLoanTable').datagrid('getRows');
	$.each(data, function(i, n) {
		$.extend(n, {
			loanRt : loanRt
		});
	});
	SCFUtils.loadGridData('invcLoanTable', data, false, true);
}

/*
 * 费率onchange事件
 */
function changefinChgrt() {
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 本次融资申请总金额
	var finChgrt = SCFUtils.Math($('#finChgrt').numberspinner('getValue'), 100,
			'div');// 费率
	var currFinCost = SCFUtils.Math(finChgrt, ttlLoanAmt, 'mul');// 本次应收费用
	$('#currFinCost').numberbox('setValue', currFinCost);
}
// /*
// * 复核时查询协议
// * */
// function queryRelCntrct(data){
// var sysRefNo=data.obj.cntrctNo;
// var opt = {
// url : SCFUtils.AJAXURL,
// data : {
// queryId : 'Q_P_000205',
// sysRefNo : sysRefNo
// },
// callBackFun : function(data) {
//				
// if(!SCFUtils.isEmpty(data.rows[0])){
// $('#subLmt').numberspinner('setValue',data.rows[0].lmtBal);
// }
// }
// };
// SCFUtils.ajax(opt);
// }

/*
 * 复核时查询费用信息
 */
// function queryReCost(data){
// var sysRefNo=data.obj.sysRefNo;
// if(!SCFUtils.isEmpty(sysRefNo)){
// var options = {
// url : SCFUtils.AJAXURL,
// data : {
// queryId : 'Q_P_000132',
// sysRefNo : sysRefNo
// },
// callBackFun : function(data) {
// if (!SCFUtils.isEmpty(data.rows)) {
// $('#currFinCost').numberbox('setValue',data.rows[0].currFinCost);
// $('#currFinPayCost').numberbox('setValue',data.rows[0].currFinPayCost);
// $('#costPayFlg').combobox('setValue',data.rows[0].costPayFlg);
// }
// }
// };
// SCFUtils.ajax(options);
// }
// }
/*
 * 获取当前日期
 */
function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function eachAdd(data) {
	var trxDate = getDate(new Date());
	var sysRefNo = $('#sysRefNo').val();
	$.each(data, function(i, n) {
		$('#invcLoanTable').datagrid('updateRow', {
			index : i,
			row : {
				loanPct : n.loanPerc,
				invRef : n.sysRefNo,
				invLoanId : sysRefNo
			}
		});
	});
}

function loadRelTab(data) {
	var sysRefNo = data.obj.sysRefNo;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000057',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					$.extend(n, {
						loanDueDtRe : n.loanDueDt
					});
				});
				ajaxInvc(data.rows);
				gridData = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
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

/**
 * 提交时给还款子表的eventTimes字段赋值 还款子表的eventTimes值为发票E表中最大sysEventTImes+1
 */

function addEventTimes() {
	var griddata = SCFUtils.getSelectedGridData('invcLoanTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	$.each(datas, function(i, n) {
		var eventTimes = queryInvcEmaxEventTImes(n.invRef);
		$.extend(n, {
			eventTimes : eventTimes
		});
	});
}
/*
 * 此方法reLoanTable中用，用于FP.DP.RE 修改ajaxInvc方法的Query查询条件。 不根据sysEventTimes去查询
 * 因为是RE.FP.DP初始进来的查询，根据sysTrxSts=T，sysLockBy=$sysRefNo$查询 edit on 2016-08-24 by
 * JinJh
 */
function ajaxInvc(rows) {
	var trxDate = $('#trxDt').datebox('getValue');
	var sysRefNo = $('#sysRefNo').val();
	var loanRt = $('#loanRt').numberspinner('getValue');
	var totalLoan = 0;
	$.each(rows, function(i, n) {
		var sysRefNoTemp = rows[i].invRef;
		var sysEventTimes = rows[i].eventTimes;
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000018',
				sysRefNo : sysRefNoTemp,
				// 根据sysEventTimes去查。FP退回处理再次勾选这笔的时候会查询不到数据。因为sysEventTimes不一样
				// sysEventTimes :sysEventTimes,
				sysLockBy : sysRefNo,
				cacheType : 'non'
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					rows[i].invDt = data.rows[0].invDt;
					rows[i].invDueDt = data.rows[0].invDueDt;
					rows[i].invValDt = data.rows[0].invValDt;
					rows[i].loanPerc = data.rows[0].loanPerc;
					rows[i].invLoanAval = data.rows[0].invLoanAval;
					rows[i].invLoanBal = data.rows[0].invLoanBal;
					// rows[i].invLoanEbal = data.rows[0].invLoanAval;
					// 融资申请已控制一笔发票只能融资一次，所以FP加载的时候invLoanEBal可以等于invLoanAvalHd
					rows[i].invLoanEbal = data.rows[0].invLoanAval
							+ data.rows[0].invLoanBal;
					rows[i].loanPct = data.rows[0].loanPerc;
					rows[i].loanValDt = trxDate;
					rows[i].invLoanBal = data.rows[0].invLoanBal;
					rows[i].invSts = "LOAN";
					rows[i].sysRefNo = sysRefNo + data.rows[0].sysRefNo;
					rows[i].invcLoanId = sysRefNo;
					rows[i].invRef = data.rows[0].sysRefNo;
					rows[i].invLoanAvalHd = data.rows[0].invLoanAval
							+ data.rows[0].invLoanBal;
					rows[i].sysEventTimes = data.rows[0].sysEventTimes;
					rows[i].ck = true;
				}
			}
		};
		SCFUtils.ajax(options);
		// new
		totalLoan = SCFUtils.Math(totalLoan, rows[i].invLoanAvalHd, 'add');
	});
	if ('FP' == SCFUtils.FUNCTYPE) {
		SCFUtils.loadGridData('invcLoanTable', rows, false, true);
		$("#flag").val(true);
	} else {
		SCFUtils.loadGridData('invcLoanTable', rows, true, true);
	}
	// 给totalLoan字段赋值，为了复核的FP时候能将最大可融资金额计算出来。
	$("#totalLoan").numberbox('setValue', totalLoan);
}

// function queryCust(data){
// var selId=data.obj.selId;
// var ops = {
// url : SCFUtils.AJAXURL,
// data : {
// queryId : 'Q_P_000021',
// sysRefNo : selId
// },
// callBackFun : function(data) {
// if(!SCFUtils.isEmpty(data.rows[0])){
// $('#selLmtBal').val(data.rows[0].lmtBal);
// $('#subSel').numberspinner('setValue',data.rows[0].lmtBal);
// $('#selLmtDueDt').datebox('setValue',data.rows[0].dueDt);
// }
// }
// };
// SCFUtils.ajax(ops);
// }

function queryCustAcno(data) {
	var acOwnerid = data.obj.selId;
	if (!SCFUtils.isEmpty(acOwnerid)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000180',
				acOwnerid : acOwnerid,
				acFlag : 'R',
				acTp : '2'
			},
			callBackFun : function(data1) {
				if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
					$('#selAcNo').combobox('loadData', data1.rows);
				}
			}
		};
		SCFUtils.ajax(opt);
	}
}

function changeSelAcNo() {
	var selAcNo = $("#selAcNo").combobox("getValue");
	if (!SCFUtils.isEmpty(selAcNo)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000365',
				acNo : selAcNo,
			},
			callBackFun : function(data1) {
				if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
					$("#selAcNm").val(data1.rows[0].acNm);
					$("#selAcBkNm").val(data1.rows[0].acBkNm);

				}
			}
		};
		SCFUtils.ajax(opt);
	}
}
var gridData = null;
function loadTable() {
	ischangeInvcAval = false;
	$("#loanAble").numberspinner("setValue", 0);
	list = [];
	totalMarginAmt = 0.0000;
	totalLoanAval = 0.0000;
	numFlag = 0;
	if (!SCFUtils.isEmpty(cntrOrAmt)) {
		$('#lmtBal').val(cntrOrAmt);
	}
	var loanValDt = $('#loanValDt').datebox("getValue");
	var loanDueDt = $('#loanDueDt').datebox("getValue");
	var selId = $('#selId').val();
	var busiTp = $('#busiTp').val();
	// var loanRt = $('#loanRt').numberspinner('getValue');
	// $('#ttlLoanAmt').numberbox('setValue',0);
	var trxDt = $('#trxDt').datebox('getValue');
	if (SCFUtils.DateDiff(loanValDt, trxDt) < 0
			|| SCFUtils.DateDiff(loanDueDt, trxDt) < 0
			|| SCFUtils.DateDiff(loanDueDt, loanValDt) < 0) {
		SCFUtils.alert("融资日期必须晚于当前日期,且到期日必须晚于融资日期");
		// return false;
	}
	var data = SCFUtils.convertArray("loanSubmit");
	var cntrctNo = $('#cntrctNo').val();
	var mainTablesysRefNo = $("#sysRefNo").val();
	if (data) {
		if ('PM' === SCFUtils.FUNCTYPE) {
			var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000009',
					selId : selId,
					busiTp : busiTp,
					trxDt : trxDt,
					cntrctNo : cntrctNo,
					cacheType : 'non'
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						appendFieldTotable(data.rows);
						gridData = data.rows;
						fullGrid(data.rows, false, true);
					} else {
						SCFUtils.alert("没有找到符合要求的应收账款!");
						$('#invcLoanTable').datagrid('loadData', {
							total : 0,
							rows : []
						});
					}
				}
			};
			SCFUtils.ajax(options);
		} else if ('FP' === SCFUtils.FUNCTYPE) {
			var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000521',
					selId : selId,
					busiTp : busiTp,
					trxDt : trxDt,
					cntrctNo : cntrctNo,
					mainTablesysRefNo : mainTablesysRefNo,
					cacheType : 'non'
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						appendFieldTotable(data.rows);
						gridData = data.rows;
						fullGrid(data.rows, false, true);
					} else {
						SCFUtils.alert("没有找到符合要求的应收账款!");
						$('#invcLoanTable').datagrid('loadData', {
							total : 0,
							rows : []
						});
					}
				}
			};
			SCFUtils.ajax(options);
		}
	}
	$("#flag").val(true);
	ischangeInvcAval = true;
	isFPfirst = false;
}

// 计算可融资金额
function addTtlLoanBal(rowIndex, rowData) {
	var loanAble = $("#loanAble").numberspinner("getValue");
	var loanTp = $("#loanTp").val();
	var lmtBal = $('#lmtBal').val();
	var insureLmtBal = $('#insureLmtBal').val();
	var busiTp = $('#busiTp').combobox('getValue');
	if (busiTp == '3') {
		if (loanTp == '1') {// 预付款
			totalMarginAmt = SCFUtils.Math(totalMarginAmt, rowData.invBal,
					'add');
			totalLoanAval = SCFUtils.Math(totalLoanAval, rowData.invLoanAvalHd,
					'add');
			loanAble = SCFUtils.Math(rowData.invLoanAvalHd, loanAble, 'add');
			if (SCFUtils.Math(lmtBal, loanAble, 'sub') > 0) {
				if (SCFUtils.Math(loanAble, insureLmtBal, 'sub') > 0) {
					SCFUtils.alert('保险公司可用额度为：' + insureLmtBal);
					$("#loanAble").numberspinner("setValue", insureLmtBal);
				} else {
					$("#loanAble").numberspinner("setValue", loanAble);
				}
			} else {
				if (SCFUtils.Math(lmtBal, insureLmtBal, 'sub') > 0) {
					SCFUtils.alert('保险公司可用额度为：' + insureLmtBal);
					$("#loanAble").numberspinner("setValue", insureLmtBal);
				} else {
					SCFUtils.alert('授信客户可用额度为：' + lmtBal);
					$("#loanAble").numberspinner("setValue", lmtBal);
				}
			}
		} else if (loanTp == '2') {// 授信
			numFlag = SCFUtils.Math(numFlag, 1, 'add');
			totalMarginAmt = SCFUtils.Math(totalMarginAmt, rowData.invBal,
					'add');
			totalLoanAval = SCFUtils.Math(totalLoanAval, rowData.invLoanAvalHd,
					'add');
			loanAble = SCFUtils.Math(rowData.invLoanAvalHd, loanAble, 'add');
			setMarginAmt();
			var temp;
			if (SCFUtils.Math(numFlag, 1, 'sub') == 0) {
				var marginAmt = $('#marginAmt').numberbox('getValue');
				temp = SCFUtils.Math(marginAmt, loanAble, 'add');
			} else {
				temp = loanAble;
			}
			if (SCFUtils.Math(lmtBal, temp, 'sub') > 0) {
				if (SCFUtils.Math(temp, insureLmtBal, 'sub') > 0) {
					SCFUtils.alert('保险公司可用额度为：' + insureLmtBal);
					$("#loanAble").numberspinner("setValue", insureLmtBal);
				} else {
					$("#loanAble").numberspinner("setValue", temp);
				}
			} else {
				if (SCFUtils.Math(lmtBal, insureLmtBal, 'sub') > 0) {
					SCFUtils.alert('保险公司可用额度为：' + insureLmtBal);
					$("#loanAble").numberspinner("setValue", insureLmtBal);
				} else {
					SCFUtils.alert('授信客户可用额度为：' + lmtBal);
					$("#loanAble").numberspinner("setValue", lmtBal);
				}
			}
		}
	} else {
		if (loanTp == '1') {// 预付款
			totalMarginAmt = SCFUtils.Math(totalMarginAmt, rowData.invBal,
					'add');
			totalLoanAval = SCFUtils.Math(totalLoanAval, rowData.invLoanAvalHd,
					'add');
			loanAble = SCFUtils.Math(rowData.invLoanAvalHd, loanAble, 'add');
			if (SCFUtils.Math(lmtBal, loanAble, 'sub') > 0) {
				$("#loanAble").numberspinner("setValue", loanAble);
			} else {
				SCFUtils.alert('授信客户可用额度为：' + lmtBal);
				$("#loanAble").numberspinner("setValue", lmtBal);
			}
		} else if (loanTp == '2') {// 授信
			numFlag = SCFUtils.Math(numFlag, 1, 'add');
			totalMarginAmt = SCFUtils.Math(totalMarginAmt, rowData.invBal,
					'add');
			totalLoanAval = SCFUtils.Math(totalLoanAval, rowData.invLoanAvalHd,
					'add');
			loanAble = SCFUtils.Math(rowData.invLoanAvalHd, loanAble, 'add');
			setMarginAmt();
			var temp;
			if (SCFUtils.Math(numFlag, 1, 'sub') == 0) {
				var marginAmt = $('#marginAmt').numberbox('getValue');
				temp = SCFUtils.Math(marginAmt, loanAble, 'add');
			} else {
				temp = loanAble;
			}
			if (SCFUtils.Math(lmtBal, temp, 'sub') > 0) {
				$("#loanAble").numberspinner("setValue", temp);
			} else {
				SCFUtils.alert('卖方可用额度为：' + lmtBal);
				$("#loanAble").numberspinner("setValue", lmtBal);
			}
		}
	}
}

function setTableInit() {
	var data = $('#invcLoanTable').datagrid('getSelections');
	$.each(data, function(i, n) {
		var index = $('#invcLoanTable').datagrid("getRowIndex", n);
		$('#invcLoanTable').datagrid('updateRow', {
			index : index,
			row : {
				invLoanEbal : n.invLoanAvalHd,
				invLoanAval : n.invLoanAvalHd,
				invLoanBal : n.invLoanBalHd
			}
		});
	});
}
function changeTempMarginAmt() {
	if (SCFUtils.Math(totalMarginAmt, 0, 'sub') > 0) {
		var data = $('#invcLoanTable').datagrid('getSelections');
		var temp = 0.0000;
		var lmtBal = $('#lmtBal').val();
		var loanTp = $("#loanTp").val();
		$.each(data, function(i, n) {
			temp = SCFUtils.Math(temp, n.invLoanAvalHd, 'add');
		});
		if (loanTp == '1') {// 预付款
			if (SCFUtils.Math(lmtBal, temp, 'sub') > 0) {
				$("#loanAble").numberspinner("setValue", temp);
			} else {
				$("#loanAble").numberspinner("setValue", lmtBal);
			}
		} else if (loanTp == '2') {// 预付款
		// var tempMarginAmt = $('#tempMarginAmt').numberbox('getValue');
			var marginAmt = $('#marginAmt').numberbox('getValue');
			temp = SCFUtils.Math(marginAmt, temp, 'add');
			if (SCFUtils.Math(lmtBal, temp, 'sub') > 0) {
				$("#loanAble").numberspinner("setValue", temp);
			} else {
				$("#loanAble").numberspinner("setValue", lmtBal);
			}
		}
	}
}
function subTtlLoanBal(rowIndex, rowData) {
	$('#ttlLoanAmt').numberbox('setValue', 0);
	var loanAble = $("#loanAble").numberspinner("getValue");
	var loanTp = $("#loanTp").val();
	var lmtBal = $('#lmtBal').val();
	var insureLmtBal = $('#insureLmtBal').val();
	var busiTp = $('#busiTp').val();
	if (busiTp == '3') {
		if (loanTp == '1') {// 预付款
			totalMarginAmt = SCFUtils.Math(totalMarginAmt, rowData.invBal,
					'sub');
			totalLoanAval = SCFUtils.Math(totalLoanAval, rowData.invLoanAvalHd,
					'sub');
			if (SCFUtils.Math(lmtBal, totalLoanAval, 'sub') > 0) {
				if (SCFUtils.Math(totalLoanAval, insureLmtBal, 'sub') > 0) {
					SCFUtils.alert('保险公司可用额度为：' + insureLmtBal);
					$("#loanAble").numberspinner("setValue", insureLmtBal);
				} else {
					$("#loanAble").numberspinner("setValue", totalLoanAval);
				}
			} else {
				if (SCFUtils.Math(lmtBal, insureLmtBal, 'sub') > 0) {
					SCFUtils.alert('保险公司可用额度为：' + insureLmtBal);
					$("#loanAble").numberspinner("setValue", insureLmtBal);
				} else {
					SCFUtils.alert('授信客户可用额度为：' + lmtBal);
					$("#loanAble").numberspinner("setValue", lmtBal);
				}
			}
		} else if (loanTp == '2') {// 授信
			numFlag = SCFUtils.Math(numFlag, 1, 'sub');
			totalMarginAmt = SCFUtils.Math(totalMarginAmt, rowData.invBal,
					'sub');
			totalLoanAval = SCFUtils.Math(totalLoanAval, rowData.invLoanAvalHd,
					'sub');
			var marginAmt = $('#marginAmt').numberbox('getValue');
			var temp = SCFUtils.Math(totalLoanAval, marginAmt, 'add');
			setMarginAmt();
			if (SCFUtils.Math(numFlag, 1, 'sub') < 0) {
				$("#loanAble").numberspinner("setValue", 0);
			} else {
				if (SCFUtils.Math(lmtBal, temp, 'sub') > 0) {
					if (SCFUtils.Math(temp, insureLmtBal, 'sub') > 0) {
						SCFUtils.alert('保险公司可用额度为：' + insureLmtBal);
						$("#loanAble").numberspinner("setValue", insureLmtBal);
					} else {
						$("#loanAble").numberspinner("setValue", temp);
					}
				} else {
					if (SCFUtils.Math(lmtBal, insureLmtBal, 'sub') > 0) {
						SCFUtils.alert('保险公司可用额度为：' + insureLmtBal);
						$("#loanAble").numberspinner("setValue", insureLmtBal);
					} else {
						SCFUtils.alert('授信客户可用额度为：' + lmtBal);
						$("#loanAble").numberspinner("setValue", lmtBal);
					}
				}
			}
		}
	} else {
		if (loanTp == '1') {// 预付款
			totalMarginAmt = SCFUtils.Math(totalMarginAmt, rowData.invBal,
					'sub');
			totalLoanAval = SCFUtils.Math(totalLoanAval, rowData.invLoanAvalHd,
					'sub');
			if (SCFUtils.Math(lmtBal, totalLoanAval, 'sub') > 0) {
				$("#loanAble").numberspinner("setValue", totalLoanAval);
			} else {
				SCFUtils.alert('授信客户可用额度为：' + lmtBal);
				$("#loanAble").numberspinner("setValue", lmtBal);
			}
		} else if (loanTp == '2') {// 授信
			numFlag = SCFUtils.Math(numFlag, 1, 'sub');
			totalMarginAmt = SCFUtils.Math(totalMarginAmt, rowData.invBal,
					'sub');
			totalLoanAval = SCFUtils.Math(totalLoanAval, rowData.invLoanAvalHd,
					'sub');
			var marginAmt = $('#marginAmt').numberbox('getValue');
			var temp = SCFUtils.Math(totalLoanAval, marginAmt, 'add');
			setMarginAmt();
			if (SCFUtils.Math(numFlag, 1, 'sub') < 0) {
				$("#loanAble").numberspinner("setValue", 0);
			} else {
				if (SCFUtils.Math(lmtBal, temp, 'sub') > 0) {
					$("#loanAble").numberspinner("setValue", temp);
				} else {
					SCFUtils.alert('授信客户可用额度为：' + lmtBal);
					$("#loanAble").numberspinner("setValue", lmtBal);
				}
			}
		}
	}
	setTableInit();
}

function changeTtlLoanAmt() {
	/*
	 * var currentPage = SCFUtils.CURRENTPAGE; var loanAble =
	 * $('#loanAble').numberspinner('getValue'); if('RE'!=SCFUtils.FUNCTYPE &&
	 * 'DP'!=SCFUtils.FUNCTYPE){ if(currentPage==1){ var loanTp =
	 * $("#loanTp").combobox("getValue"); var lmtBal =$('#lmtBal').val();
	 * if(SCFUtils.Math(lmtBal, loanAble, 'sub')>0){
	 * $('#ttlLoanAmt').numberbox({ max:parseFloat(loanAble), }); }else{
	 * $('#ttlLoanAmt').numberbox({ max: parseFloat(lmtBal), }); } } }
	 */
}

/**
 * 保证金的OnChange事件 要求 保证金大于初始保证金比率*融资金额 保证金小于融资金额 逻辑 需求变更此处暂时不用
 * 保证金金额的变化要改变可融资金额及其隐藏域 需求变更此处暂时不用
 * 此时融资金额的最大值也要变化******这里可能会有个BUG：保证金要是在融资金额之后输入的话，融资金额的最大值的计算不是用其本次的保证金 字段
 * 这里加了个隐藏域marginAmtRe为了保证用户在融资金额之后输入保证金，对可融资金额的正确计算
 */
function changeMarginAmt() {
	var nowMarginAmt = $("#marginAmt").numberbox("getValue");
	if (SCFUtils.isEmpty(nowMarginAmt)
			&& SCFUtils.isEmpty($("#ttlLoanAmt").numberbox("getValue"))) {
		return;// 如果是页面刚加载时触发该事件时直接结束
	}
	// if($("#ttlLoanAmt").numberbox("getValue")<=0){
	// SCFUtils.alert("你要先输入一个正确的融资金额哦！");
	// return;
	// }
	var marginAmt = SCFUtils.Math(SCFUtils.Math($("#ttlLoanAmt").numberbox(
			"getValue"), 100, 'mul'),
			$("#initMarginPct").numberbox("getValue"), 'div');// 默认保证金--保证金=融资金额*比率
	if (SCFUtils.Math(nowMarginAmt, marginAmt, 'sub') < 0
			|| SCFUtils.Math(nowMarginAmt, $("#ttlLoanAmt").numberbox(
					"getValue"), "sub") > 0) {
		SCFUtils.alert("你要保证你的保证金金额不小于初始保证金比率*融资金额且不大于融资金额哈！！！！");
		return;
	}
	// var marginAmtRe = $("#marginAmtRe").val();//上次参与计算的保证金
	// var loanAble = SCFUtils.Math($("#loanAble").numberbox('getValue'),
	// SCFUtils.Math(nowMarginAmt,marginAmtRe,'sub'),'add');
	// $("#loanAble").numberbox('setValue',loanAble);//重新计算可融资金额---这里的可融资金额可以是在减去融资金额后的
	// $('#ttlLoanAmt').numberbox({max:parseFloat(loanAble)});//重新设置融资金额的最大值---这里的设置并没法影响目前的融资金额即上面说的BUG
}

/**
 * 融资金额的onchange事件 1.重新计算可融资金额及改融资金额的隐藏域loanTotal 2.重新计算信息表中的应收金额和最大可融资金额
 * 3.对保证金的默认值计算---因为需求变更 要求如果没有初始保证金比率的话要先输入，再计算--保证金=融资金额*比率
 */
function changeInvcAval() {
	if (ischangeInvcAval == false) {
		return;
	}
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");
	$('#ttlLoanBal').val(ttlLoanAmt);
	// 1.对保证金的计算和改变可融资金额的值
	var marginAmt = SCFUtils.Math(SCFUtils.Math(ttlLoanAmt, 100, 'div'), $(
			"#initMarginPct").numberbox("getValue"), 'mul');// 保证金--保证金=融资金额*比率
	$("#marginAmt").numberbox("setValue", marginAmt);
	$("#marginAmtRe").val(marginAmt);// 对本次计算的保证金金额保存
	var loanTp = $('#loanTp').val();
	var loanTotal = $("#loanTotal").val();
	if (loanTp == '2') {// 授信时
		$("#loanAble").numberbox("setValue",
				SCFUtils.Math(loanTotal, marginAmt, 'add'));
	}
	// $("#loanAble").numberbox("setValue",SCFUtils.Math($("#loanAble").val(),ttlLoanAmt,'sub'));
	// 1.利息计算
	countIntAmt();
	// 2.手续费计算
	countPdgAmt();
	// var rowDatas = gridData;
	var rowDatas = $('#invcLoanTable').datagrid('getSelections');
	var loan_Able = 0;
	if (rowDatas == undefined || rowDatas == null || rowDatas.length == 0) {
		return;
	}
	// rowIndexs = rowIndexs.sort();
	// for(var i = 0;i<rowDatas.length;i++){
	// var flag = true;
	// for(var j = 0;j<rowIndexs.length;j++){
	// if(rowIndexs[j] == i){// oncheck选的这一笔发票==i
	// flag = false;
	// break;
	// }
	// }
	// if(flag)continue;
	for (var i = 0; i < rowDatas.length; i++) {
		var v = rowDatas[i];
		var index = $('#invcLoanTable').datagrid('getRowIndex', v);
		if (SCFUtils.Math(ttlLoanAmt, v.invLoanAvalHd, 'sub') > 0) {
			$("#loanAble").numberbox("setValue", 0);
			$('#invcLoanTable').datagrid('updateRow', {
				index : index,
				row : {
					invLoanAval : 0,// 最大可融资金额
					invLoanBal : v.invLoanAvalHd
				// 应收款
				}
			});
			ttlLoanAmt = SCFUtils.Math(ttlLoanAmt, v.invLoanAvalHd, 'sub');
		} else {
			loan_Able = SCFUtils.Math(loan_Able, SCFUtils.Math(v.invLoanEbal,
					ttlLoanAmt, 'sub'), 'add');

			if ('FP' == SCFUtils.FUNCTYPE) {
				var invc_loan = SCFUtils.Math(v.invLoanEbal, v.invLoanAval,
						'sub');
				var inv_Loan_Bal = SCFUtils
						.Math(v.invLoanBal, invc_loan, 'sub');
				$('#invcLoanTable').datagrid(
						'updateRow',
						{
							index : index,
							row : {
								invLoanAval : SCFUtils.Math(v.invLoanEbal,
										ttlLoanAmt, 'sub'),
								invLoanBal : SCFUtils.Math(inv_Loan_Bal,
										ttlLoanAmt, 'add')
							}
						});

			} else {
				$('#invcLoanTable').datagrid(
						'updateRow',
						{
							index : index,
							row : {
								invLoanAval : SCFUtils.Math(v.invLoanEbal,
										ttlLoanAmt, 'sub'),
								invLoanBal : SCFUtils.Math(v.invLoanBalHd,
										ttlLoanAmt, 'add')
							}
						});
			}
			ttlLoanAmt = 0;
		}

	}
	$("#loanAble").numberbox("setValue", loan_Able);
}

function chkLoan() {
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 融资金额
	var ttlLoanAmtf = parseFloat(ttlLoanAmt);
	var loanAble = $('#loanAble').numberbox('getValue');// 可融资金额
	var loanAblef = parseFloat(loanAble);
	if (SCFUtils.Math(ttlLoanAmtf, loanAblef, 'sub') > 0) {// if(ttlLoanAmtf >
															// loanAblef )
		SCFUtils.alert('融资金额不能大于可融资金额！');
		$('#ttlLoanAmt').focus();
		return false;
	}
}

function asc(list) {
	var temp = list;
	var min = list[0];
	for (var i = 0, j = list.length; i < j; i++) {
		var min = list[i];
		for (var k = i + 1; k < j; k++) {
			if (min.key > list[k].key) {
				min = list[k];
				list[k] = list[i];
			}
		}
		temp[i] = min;
	}
	return temp;
}
function appendFieldTotable(data) {
	var trxDate = $('#trxDt').datebox('getValue');
	var sysRefNo = $('#sysRefNo').val();
	var loanRt = $('#loanRt').numberspinner('getValue');
	var loanTimes = $('#loanTimes').val();
	var loanDueDt = $("#loanDueDt").datebox('getValue');
	$.each(data, function(i, n) {
		var invRef = n.sysRefNo;
		$.extend(n, {
			invLoanEbal : n.invLoanAval,
			loanPct : n.loanPerc,
			loanValDt : trxDate,
			loanRt : loanRt,
			loanTimes : loanTimes,
			invLoanBal : n.invLoanBal,
			invLoanBalHd : n.invLoanBal,
			invSts : "LOAN",
			sysRefNo : sysRefNo + invRef,
			invcLoanId : sysRefNo,
			invRef : invRef,
			invLoanAvalHd : n.invLoanAval + n.invLoanBal,
			sysEventTimes : 1,
			loanAmt : 0,
			loanDueDtRe : loanDueDt
		});
	});
}

function loadInvc(flag) {
	var selId = $('#selId').val();
	var buyerId = $('#buyerId').val();
	var busiTp = $('#busiTp').combobox('getValue');
	// var loanRt = $('#loanRt').numberspinner('getValue');
	var trxDueDt = $('#trxDueDt').datebox('getValue');
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000009',
			selId : selId,
			buyerId : buyerId,
			busiTp : busiTp,
			invDueDt : trxDueDt,
			cacheType : 'append'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				fullGrid(data.rows, flag);
			}
		}
	};
	SCFUtils.ajax(options);
}

function fullGrid(data, flag1, flag2) {
	// $('#trxDueDt').datebox('setValue','');
	$('#invcLoanTable').datagrid('clearChecked');
	SCFUtils.loadGridData('invcLoanTable', data, flag1, flag2);
}

function ajaxTable() {
	var options = {
		// url : SCFUtils.AJAXURL,
		toolbar : '#toolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'invNo',
			title : '应收账款凭证号',
			width : '9.09%'
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			width : 300,
			hidden : true,
		}, {
			field : 'invValDt',
			title : '应收账款起算日',
			width : '9.09%',
			formatter : dateFormater
		}, {
			field : 'invDueDt',
			title : '应收账款到期日',
			width : '9.09%',
			formatter : dateFormater
		/*
		 * }, { field : 'dueDt', title : '应收账款逾期日', width : '9.09%', formatter:
		 * dateFormater
		 */
		}, {
			field : 'invCcy',
			title : '币别',
			width : '9.09%'
		}, {
			field : 'loanAmt',
			title : '本次融资金额',
			width : 80,
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'invBal',
			title : '应收账款净额',
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'loanPerc',
			title : '融资比例',
			width : '9.09%',
			formatter : pectType
		}, {
			field : 'invLoanBal',
			title : '应收账款融资余额',
			width : '9.09%'
		}, {
			field : 'invLoanBalHd',
			title : '应收账款融资余额',
			width : 100,
			hidden : true
		}, {
			field : 'invLoanAval',
			title : '可融资金额',// 这里需求变更 除了2016/7/26后的修改 其他处的最大可融资金额都指该值
			width : '9.09%',
			formatter : ccyFormater
		}, {
			field : 'invLoanEbal',
			title : '最大可融资金额',
			width : 100,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'invLoanAvalHd',
			title : '最大可融资金额',
			width : 100,
			// hidden:true,
			formatter : ccyFormater
		}, {
			field : 'buyerId',
			title : '间接客户编号',
			width : '9.09%'
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : '9.09%'
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
			field : 'invRef',
			title : '应收账款主键',
			width : 100,
			hidden : true
		}, {
			field : 'loanPct',
			title : '融资比例',
			width : 100,
			hidden : true
		}, {
			field : 'invcLoanId',
			title : '融资表主键',
			width : 100,
			hidden : true
		}, {
			field : 'loanDueDtRe',
			title : '发票融资表主中的融资到期日',
			width : 100,
			hidden : true
		} ] ]
	};
	$('#invcLoanTable').datagrid(options);
}

function addAmtRow(i, n) {
	var invLoan = SCFUtils.Math(n.invLoanBal, (n.invBal - n.invLoanBal)
			* n.loanPct * 0.01, 'add');
	$('#invcLoanTable').datagrid('updateRow', {
		index : i,
		row : {
			invLoanAmt : (n.invBal - n.invLoanBal) * n.loanPct * 0.01,// INV_BAL*
																		// LOAN_PCT融资金额
			invLoanEbal : (n.invBal - n.invLoanBal) * n.loanPct * 0.01,// INV_BAL*
																		// LOAN_PCT每次融资金额
			invLoanBal : invLoan,
		}
	});
}

function subAmtRow(i, n) {
	var invLoan = SCFUtils.Math(n.invLoanBal, n.invLoanAmt, 'sub');
	$('#invcLoanTable').datagrid('updateRow', {
		index : i,
		row : {
			invLoanAmt : 0,// INV_BAL* LOAN_PCT融资金额
			invLoanEbal : 0,// INV_BAL* LOAN_PCT每次融资金额
			invLoanBal : invLoan,
		}
	});
}

function updateGridRow(rowIndex, rowData) {
	$('#invcLoanTable').datagrid('refreshRow', rowIndex
	// {
	// index:rowIndex
	// ,row:rowData
	// }
	);
}

function checkSel(subSel) {
	if (subSel < 0) {
		SCFUtils.alert('本次申请融资余额必须小于授信客户额度余额！！！');
		return false;
	} else {
		return true;
	}
}

function checkLmt(subLmt) {
	if (subLmt < 0) {
		SCFUtils.alert('本次申请融资余额必须小于授信客户额度余额！！！');
		return false;
	} else {
		return true;
	}
}

/**
 * 汇总融资总金额=融资总金额+本次融资金额 扣减客户额度 扣减协议额度 累计利息总金额
 */
function countTtlLoanAmt(rowData) {
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 本次融资申请总金额
	ttlLoanAmt = SCFUtils.Math(ttlLoanAmt, rowData.invLoanAmt, 'add');
	$('#ttlLoanAmt').numberbox('setValue', ttlLoanAmt);
	// 费率
	var finChgrt = SCFUtils.Math($('#finChgrt').numberspinner('getValue'), 100,
			'div');
	// 本次应收费用
	var currFinCost = SCFUtils.Math(finChgrt, ttlLoanAmt, 'mul');
	$('#currFinCost').numberbox('setValue', currFinCost);
	// 计算协议余额
	var lmtBal = parseFloat($('#lmtBal').val()).toFixed(2);// 协议余额
	var subLmt = SCFUtils.Math(lmtBal, rowData.invLoanAmt, 'sub');
	$('#lmtBal').val(subLmt);// 隐藏栏位 用于扣减协议额度
}

/*
 * 计算每笔发票的利息金额 利息金额=本次融资金额*融资天数*利率/360
 */
function countIntAmt() {
	var payIntTp = $('#payIntTp').combobox('getValue');// 扣息方式 1 预收息 2 利随本清 3
														// 按月扣息 4 按季扣息 5 按年扣息
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");// 融资金额

	var loanDueDt = $("#loanDueDt").datebox("getValue");
	var loanValDt = $('#loanValDt').datebox('getValue');
	if (SCFUtils.DateDiff(loanDueDt, loanValDt) < 0) {
		SCFUtils.alert("融资到期日不能小于融资日期,请修改!");
		return;
	}
	var loanRt = $('#loanRt').numberspinner('getValue') * 0.01;// 正常利率
	var subDate = SCFUtils.DateDiff(loanDueDt, loanValDt);// 融资到期日— 融资起始日
	var intAmt = SCFUtils.Math(ttlLoanAmt, loanRt, 'mul');// 融资金额 * 正常利率
	intAmt = SCFUtils.Math(intAmt, subDate, 'mul');// 融资金额 * 正常利率*（融资到期日—
													// 融资起始日）
	intAmt = SCFUtils.Math(intAmt, 360, 'div');// 融资金额 * 正常利率*（融资到期日—
												// 融资起始日）/360
	$("#currInt").val(intAmt.toFixed(2));// 本次应收利息
	if (payIntTp == '1') {
		$("#currPayInt").val(intAmt.toFixed(2));// 本次实收利息
		$('#intAmt').numberbox('setValue', intAmt.toFixed(2));
	} else {
		$("#currPayInt").val(0);// 本次实收利息
		$('#intAmt').numberbox('setValue', 0);
	}
}

/*
 * 计算利息总金额 利息金额=本次融资金额*融资天数*利率/360
 */
function changeLoanRt() {
	var payIntTp = $('#payIntTp').combobox('getValue');// 扣息方式 1 预收息 2 利随本清 3
														// 按月扣息 4 按季扣息 5 按年扣息
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");// 融资金额

	var loanDueDt = $("#loanDueDt").datebox("getValue");
	var loanValDt = $('#loanValDt').datebox('getValue');
	if (SCFUtils.DateDiff(loanDueDt, loanValDt) < 0) {
		SCFUtils.alert("融资到期日不能小于融资日期,请修改!");
		return;
	}
	var loanRt = $('#loanRt').numberspinner('getValue') * 0.01;// 正常利率
	var subDate = SCFUtils.DateDiff(loanDueDt, loanValDt);// 融资到期日— 融资起始日
	var intAmt = SCFUtils.Math(ttlLoanAmt, loanRt, 'mul');// 融资金额 * 正常利率
	intAmt = SCFUtils.Math(intAmt, subDate, 'mul');// 融资金额 * 正常利率*（融资到期日—
													// 融资起始日）
	intAmt = SCFUtils.Math(intAmt, 360, 'div');// 融资金额 * 正常利率*（融资到期日—
												// 融资起始日）/360
	$("#currInt").val(intAmt.toFixed(2));// 本次应收利息
	if (payIntTp == '1') {
		$("#currPayInt").val(intAmt.toFixed(2));// 本次实收利息
		$('#intAmt').numberbox('setValue', intAmt.toFixed(2));
	} else {
		$("#currPayInt").val(0);// 本次实收利息
		$('#intAmt').numberbox('setValue', 0);
	}
}

// 手续费计算:如果（Is_Collect=Y）则，手续费=融资金额* CNTRCT_M.trans_Chgrt
function countPdgAmt() {
	var isCollect = $('#isCollect').combobox('getValue');// 是否收取费用 Y 是 N 否
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");// 融资金额
	var transChgrt = $('#transChgrt').val();// 费用利率
	if ('Y' == isCollect) {
		if (transChgrt > 0) {// 如过费用利率>0 则计算出百分比
			transChgrt = $('#transChgrt').val() * 0.01;
		} else {
			transChgrt = 0;
		}
		var pdgAmt = SCFUtils.Math(ttlLoanAmt, transChgrt, 'mul');// 融资金额 *
																	// 费用利率

		$('#currFinCost').val(pdgAmt.toFixed(2));// 本次应收处理费
		$('#pdgAmt').numberbox('setValue', pdgAmt.toFixed(2));
	} else {
		$('#currFinCost').val(0);// 本次应收处理费
		$('#pdgAmt').numberbox('setValue', 0);
	}
}
/** 存放选中列的索引 */
var rowIndexs = [];
/**
 * onCheck列事件
 */
function onCheck(rowIndex, rowData) {
	// 1.初始化
	if ($("#loanTotal").val() == "" || $("#loanTotal").val() == "undefined"
			|| $("#loanTotal").val() == null) {
		$("#loanTotal").val("0");// 初始化下loanTotal
	}
	$("#ttlLoanAmt").numberbox("setValue", 0);
	// restoreWork();
	var totalLoan = 0;// 总可融资金额
	totalLoan = SCFUtils.Math($("#loanTotal").val(), rowData.invLoanAvalHd,
			'add');
	var loanAble = $("#loanAble").val();
	loanAble = SCFUtils.Math(loanAble, rowData.invLoanAval, 'add');
	$("#loanAble").numberbox('setValue', loanAble);
	setLoanValue(totalLoan);
	rowIndexs.push(rowIndex);
	rowIndexs = rowIndexs.sort();
}
/**
 * 初始化还原工作
 */
function restoreWork() {
	rowIndexs = rowIndexs.sort();
	// 2.还原
	$.each(rowIndexs, function(i, v) {
		$('#invcLoanTable').datagrid(
				'updateRow',
				{// 对应收账款融资金额和最大可融资金额还原
					index : v,
					row : {
						invLoanAval : getRowIndexOfPro("invcLoanTable", v,
								"invLoanAvalHd"),
						invLoanBal : getRowIndexOfPro("invcLoanTable", v,
								"invLoanBalHd"),
					}
				});
	});
}
/**
 * 对可融资金额计算和记录
 */
function setLoanValue(totalLoan) {
	// $("#loanAble").numberbox('setValue',totalLoan);//这里会触发changeTtlLoanAmt
	if (SCFUtils.Math($('#lmtBal').val(), totalLoan, 'sub') > 0) {
		$("#ttlLoanAmt").numberbox({
			max : parseFloat(totalLoan)
		});
	} else {
		$("#ttlLoanAmt").numberbox({
			max : parseFloat($('#lmtBal').val())
		});
	}
	// 4.记录本次可融资金额
	$("#loanTotal").val(totalLoan);// 记录下可融资金额 防止用户在多次输入融资金额时产生递减情况
	$("#totalLoan").numberbox('setValue', totalLoan);
}

/**
 * 从表格中取出index行的field的值
 * 
 * @param tableId
 *            表格ID
 * @param index
 *            行号
 * @param field
 *            字段名
 * @returns value
 */
function getRowIndexOfPro(tableId, index, field) {
	var rowData = $("#" + tableId).datagrid("getData");
	var obj = rowData.rows[index];
	return eval("obj." + field);
}
/*
 * function setDueDt(rowIndex, rowData){
 * if(SCFUtils.DateDiff(rowData.dueDt,standardDate)>0){ standardDate =
 * rowData.dueDt; } }
 */
// 计算保证金金额
function setMarginAmt() {
	var initMarginPct = $("#initMarginPct").numberbox("getValue");
	if (initMarginPct < 0 || initMarginPct > 100) {
		SCFUtils.alert("请输入在0~100之间的数!!!!");
		return;
	}
	/*
	 * var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue'); var
	 * initMarginPct = $("#initMarginPct").numberspinner("getValue"); var
	 * authMarginPct = $("#authMarginPct").numberspinner("getValue"); var
	 * initMargin = SCFUtils.Math(initMarginPct/100.0000, ttlLoanAmt, 'mul');
	 * var authMargin = SCFUtils.Math(authMarginPct/100.0000, ttlLoanAmt,
	 * 'mul'); var temp = SCFUtils.Math(initMargin, authMargin, 'add');
	 * $("#tempMarginAmt").numberbox('setValue',temp);
	 */
}
/**
 * 还原融资总金额=融资总金额—本次融资金额 还原协议额度 还原客户额度 减少当步产生的利息金额
 */
function returnTtlLoanAmt(rowData) {
	var intAmt = $('#intAmt').numberbox('getValue');
	var lmtBal = $('#lmtBal').val();// 协议余额
	var subLmt = SCFUtils.Math(lmtBal, rowData.invLoanAmt, 'add');
	$('#lmtBal').val(subLmt);
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');
	ttlLoanAmt = SCFUtils.Math(ttlLoanAmt, rowData.invLoanAmt, 'sub');
	$('#ttlLoanAmt').numberbox('setValue', ttlLoanAmt);
	// 费率
	var finChgrt = SCFUtils.Math($('#finChgrt').numberspinner('getValue'), 100,
			'div');
	// 本次应收费用
	var currFinCost = SCFUtils.Math(finChgrt, ttlLoanAmt, 'mul');
	$('#currFinCost').numberbox('setValue', currFinCost);
	// 利息计算
	var intAmtGD = parseFloat(rowData.intAmt).toFixed(2);// 卖方额度余额
	intAmt = SCFUtils.Math(intAmt, intAmtGD, 'sub');
	$('#intAmt').numberbox('setValue', intAmt);
}

function onUnCheck(rowIndex, rowData) {
	// 1.初始化
	$("#ttlLoanAmt").numberbox("setValue", 0);// 对融资金额初始化----此处调用了onchange事件changeInvcAval
	// restoreWork();
	var totalLoan = SCFUtils.Math($("#loanTotal").val(), rowData.invLoanAvalHd,
			'sub');
	var loanAble = $("#loanAble").val();
	loanAble = SCFUtils.Math(loanAble, rowData.invLoanAval, 'sub');
	if (loanAble < 0) {
		$("#loanAble").numberbox('setValue', 0);
	} else {
		$("#loanAble").numberbox('setValue', loanAble);
	}
	setLoanValue(totalLoan);
	var newRowIndexs = [];
	for (var i = 0; i < rowIndexs.length; i++) {
		if (rowIndexs[i] != rowIndex)
			newRowIndexs.push(rowIndexs[i]);
	}
	rowIndexs = newRowIndexs;

}

function onCheckAll(rows) {
	if (isFPfirst == true) {
		// 1.初始化
		$("#loanTotal").val("0");
		restoreWork();
		var totalLoan = $("#totalLoan").numberbox('getValue');
		rowIndexs = [];
		$.each(rows, function(i, v) {
			rowIndexs.push(i);
		});
		if (SCFUtils.Math($('#lmtBal').val(), totalLoan, 'sub') > 0) {
			$("#ttlLoanAmt").numberbox({
				max : parseFloat(totalLoan)
			});
		} else {
			$("#ttlLoanAmt").numberbox({
				max : parseFloat($('#lmtBal').val())
			});
		}
		// 4.记录本次可融资金额
		$("#loanTotal").val(totalLoan);// 记录下可融资金额 防止用户在多次输入融资金额时产生递减情况
		$("#totalLoan").numberbox('setValue', totalLoan);
		return;
	}
	// 1.初始化
	$("#loanTotal").val("0");
	$("#ttlLoanAmt").numberbox('setValue', 0);
	restoreWork();
	var totalLoan = 0;
	var loanAble = 0;
	rowIndexs = [];
	$.each(rows, function(i, v) {
		totalLoan = SCFUtils.Math(totalLoan, v.invLoanAvalHd, 'add');
		loanAble = SCFUtils.Math(loanAble, v.invLoanAval, 'add');
		rowIndexs.push(i);
	});
	$("#loanAble").numberbox('setValue', loanAble);// 这里会触发changeTtlLoanAmt
	if (SCFUtils.Math($('#lmtBal').val(), totalLoan, 'sub') > 0) {
		$("#ttlLoanAmt").numberbox({
			max : parseFloat(totalLoan)
		});
	} else {
		$("#ttlLoanAmt").numberbox({
			max : parseFloat($('#lmtBal').val())
		});
	}
	// 4.记录本次可融资金额
	$("#loanTotal").val(totalLoan);// 记录下可融资金额 防止用户在多次输入融资金额时产生递减情况
	$("#totalLoan").numberbox('setValue', totalLoan);
	// setLoanValue(totalLoan);

}

/*
 * function onUnCheckAll(rows){ $.each(rows,function(i,n){ if(delCheck(list,i)){
 * onUnCheck(i,n); } }); }
 */
function onUnCheckAll(rows) {
	$("#loanTotal").val("0");
	$("#totalLoan").numberbox('setValue', 0);
	$("#ttlLoanAmt").numberbox("setValue", 0);
	$("#loanAble").numberbox("setValue", 0);
	// restoreWork();
	rowIndexs = [];
	// setLoanValue();

	/* $("#loanAble").numberbox('setValue', 0); */
}

function contains(a, obj) {
	for ( var i in a) {
		if (a[i].key === obj) {
			return true;
		}
	}
	return false;
}

function delCheck(a, obj) {
	var arr = a;
	for ( var i in a) {
		if (a[i].key === obj) {
			delete arr[i];
		}
	}
	return arr;
}

/**
 * 提交时给还款子表的eventTimes字段赋值 还款子表的eventTimes值为发票E表中最大sysEventTImes+1
 */

function addEventTimes() {
	var griddata = SCFUtils.getSelectedGridData('invcLoanTable', false);
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

function changeLoanTp() {
	// var loanTp = $("#loanTp").val();
	// if(loanTp=="1"){
	$('tr[id=amtTr]').hide();
	$('tr[id=balTr]').hide();
	// $("#AuthMarginPct").numberbox('setValue','');
	$("#marginAcNo").textbox('setValue', '');
	// $("#AuthMarginPct").numberbox({required:false});
	$("#marginAcNo").textbox({
		required : false
	});
	$("#marginAmt").numberbox('setValue', '');
	$("#marginAmt").numberbox({
		required : false
	});
	/*
	 * }else{ $('tr[id=amtTr]').show(); $('tr[id=balTr]').show();
	 * //$("#AuthMarginPct").numberbox({required:true});
	 * $("#marginAcNo").textbox({required:true});
	 * $("#initMarginPct").textbox({required:true});
	 * //$("#marginAmt").numberbox({required:true});
	 * //SCFUtils.setNumberboxReadonly("marginAmt", true);
	 * //selLookUpWindowMargin(); } var busiTp =
	 * $('#busiTp').combobox('getValue'); if(busiTp=='0' || busiTp=='1' ||
	 * busiTp =='2'){
	 */
	$('tr[id=collat]').hide();
	$('#collatCompNm').textbox('setValue', '');
	$('#collatNo').textbox('setValue', '');
	// }
}

function reloadInvcLoanTable() {
	var data = SCFUtils.checkForm("loanSubmit");
	if (data) {
		loadTable();
	}
	/*
	 * if('PM'==SCFUtils.FUNCTYPE || 'FP'==SCFUtils.FUNCTYPE){ var loanDueDt =
	 * $('#loanDueDt').datebox('getValue'); if(!SCFUtils.isEmpty(loanDueDt)){
	 * var dueDt = $("#dueDt").val();
	 * $("#loanOverdueDt").val(SCFUtils.FormatDate(loanDueDt, dueDt)); } }
	 */
}

function changeMarginAmt() {
	var loanAble = $('#loanAble').numberspinner('getValue');
	var loanTp = $('#loanTp').val();
	if (loanTp == '2' && SCFUtils.Math(loanAble, 0, 'sub') > 0) {
		var data = SCFUtils.getSelectedGridData('invcLoanTable', false);
		totalLoanAval = 0.0000;
		var lmtBal = $('#lmtBal').val();
		$.each(data, function(i, n) {
			totalLoanAval = SCFUtils.Math(totalLoanAval, n.invLoanAval, 'add');
		});
		var marginAmt = $('#marginAmt').numberbox('getValue');
		var temp = SCFUtils.Math(marginAmt, totalLoanAval, 'add');
		if (SCFUtils.Math(lmtBal, temp, 'sub') > 0) {
			$("#loanAble").numberspinner("setValue", temp);
		} else {
			$("#loanAble").numberspinner("setValue", lmtBal);
		}
	}
}
/**
 * 这里不再做Ajax 而是对其按保证金比例计算
 */
function selLookUpWindowMargin() {
	var marginAcNo = $("#marginAcNo").textbox('getValue');
	var marginAmt = $("#marginAmt").numberbox("getValue");
	if (SCFUtils.isEmpty(marginAcNo)) {
		SCFUtils.alert("请选择保证金账号");
		return;
	}
	if ($("#loanTotal").val() == "0" || $("#loanTotal").val() == ""
			|| $("#loanTotal").val() == null
			|| $("#loanTotal").val() == "undefined") {
		SCFUtils.alert("请选择应收账款信息!!!");
	}
	var initMarginPct = $("#initMarginPct").numberbox("getValue");
	var marginAmtPct = SCFUtils.Math(SCFUtils.Math($("#ttlLoanAmt").numberbox(
			"getValue"), 100, 'div'), initMarginPct, 'mul');
	if (marginAmt == 0) {// 初始化--给默认值
		$("#marginAmt").numberbox("setValue", marginAmtPct);
		return;
	}
	if (marginAmt < marginAmtPct) {
		SCFUtils.alert("请输入不大于" + marginAmtPct + "的保证金！！！");
	}

}

function addBalance(data) {
	// $('#cmsCntrctNo').val("HT000000001");
	$('#marginAmt').numberbox('setValue', data.obj.trxDom.token);
}
// 查询协议表
function queryCntrctInfo(cntrctNo) {
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000552',
			cntrctNo : cntrctNo
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
/*-------------手续费计算----------------
 * 可以根据融资金额变化。
 * 那不需要单独开个function
 * */
// 处理费手续费计算
function changePdgAmt(n) {
	// var ttlLoanAmt=$("#ttlLoanAmt").numberbox('getValue');

}

/**
 * 此方法用于FP加载时，未点击datagrid“查询”时设置totalLoan的值。 用于FP初始化时的直接修改。 add on 2016-08-25 by
 * JinJH
 */
function setTotalLoanFP() {
	var totalLoan = 0;// 总可融资金额
	// totalLoan =
	// SCFUtils.Math($("#loanTotal").val(),rowData.invLoanAvalHd,'add');
	var rowDatas = gridData;
	if (rowDatas == undefined || rowDatas == null || rowDatas.length == 0) {
		return;
	}
	for (var i = 0; i < rowDatas.length; i++) {
		var v = rowDatas[i];
		totalLoan = SCFUtils
				.Math($("#loanTotal").val(), v.invLoanAvalHd, 'add');
	}
	$("#loanTotal").val(totalLoan);
}
function changePayIntTp() {
	var payIntTp = $('#payIntTp').combobox('getValue');
	if (payIntTp == '2' || payIntTp == '3' || payIntTp == '4'
			|| payIntTp == '5') {
		$('td[id=Tr1]').hide();
		$('td[id=Tr2]').hide();
	} else {
		$('td[id=Tr1]').show();
		$('td[id=Tr2]').show();
	}

}
// 费用表数据打包
function getFeeData() {
	var fee = {};// 添加费用信息
	fee._total_rows = 1;
	// 生成fee的流水号，feeSysRefNo
	var options = {};
	var costPayFlg;
	var trxDt;
	var obj = {};
	if ('PM' === SCFUtils.FUNCTYPE) {
		options.data = {
			refName : 'FeeRef',
			refField : 'feeSysRefNo'
		};
		SCFUtils.getRefNo(options);
		trxDt = SCFUtils.getcurrentdate();
		obj.sysRefNo = $('#feeSysRefNo').val();
	} else {
		trxDt = relQueryFeeE()[0].trxDt;
		obj.sysRefNo = relQueryFeeE()[0].sysRefNo;
	}
	if ($("#isCollect").combobox('getValue') == 'Y') {// 收取处理费
		costPayFlg = 1; // 1.应收已收 (是否收取手续费选择 是)
	} else {
		costPayFlg = 0; // 0.应收未收 (是否收取手续费选择 否)
	}

	obj.trxDt = trxDt;// 交易日期
	obj.selId = $("#selId").val();// 授信客户编号
	obj.selAcNo = $("#selAcNo").combobox("getValue");// 收费扣款账号
	obj.selAcNm = $("#selAcNm").val();// 账户户名
	obj.selAcBkNm = $("#selAcBkNm").val();// 开户行行名
	obj.busiTp = $("#busiTp").combobox("getValue");// 产品类型
	obj.costTp = 0;// 费用类型 0.融资手续费 1.应收账款处理费
	obj.costCcy = $('#ccy').val();// 币别
	obj.costAmt = '';// 总费用金额
	obj.costFinCost = '';// 本次应收手续费
	obj.costFinPayCost = '';// 本次已收手续费
	obj.costfinPayDt = getDate(new Date());// 本次收取费用日期
	obj.costPayFlg = costPayFlg;// 费用收取标志
	obj.theirRef = $("#sysRefNo").val();// 关联编号
	obj.costItem = 0;// 收费项目 0 手续费 1 应收账款处理费
	obj.remark = ''; // 备注
	obj.totalTransPayCost = '';// 累计已收处理费
	obj.currFinCost = $("#currFinCost").val();// 本次应收处理费

	var isCollect = $('#isCollect').combobox('getValue');// 是否收取费用
	if (isCollect == 'Y') {
		obj.currFinPayCost = $("#currFinCost").val();// 本次收取处理费
	} else {
		obj.currFinPayCost = 0;// 本次收取处理费
	}

	obj.cntrctNo = $('#cntrctNo').val();

	obj.trxDate = getDate(new Date());
	fee['rows0'] = obj;
	return fee;
}

// 利息表数据打包
function getIntData() {
	var int = {};// 添加额度变动表
	int._total_rows = 1;
	var options = {};
	var trxDt;
	var payIntTp = $("#payIntTp").combobox('getValue');
	var obj = {};
	if ('PM' === SCFUtils.FUNCTYPE) {
		options.data = {
			refName : 'IntRef',
			refField : 'intSysRefNo'
		};
		SCFUtils.getRefNo(options);
		trxDt = SCFUtils.getcurrentdate();
		obj.sysRefNo = $('#intSysRefNo').val();
	} else {
		trxDt = relQueryIntE()[0].trxDt;
		obj.sysRefNo = relQueryIntE()[0].sysRefNo;
	}
	obj.trxDt = trxDt;// 交易日期
	obj.selId = $("#selId").val();// 授信客户编号
	obj.selAcNo = $("#selAcNo").combobox("getValue");// 收费扣款账号
	obj.selAcNm = $("#selAcNm").val();// 账户户名
	obj.selAcBkNm = $("#selAcBkNm").val();// 开户行行名
	obj.busiTp = $("#busiTp").combobox("getValue");// 产品类型
	obj.intTp = 0;// 利息类型 0.正常利息 1.逾期利息 2.展期利息 3.呆账利息
	// obj.INT_CCY = $('#ccy').combobox("getValue");//币别
	obj.intCcy = $('#ccy').val();// 币别
	obj.intAmt = '';// 总利息金额
	obj.currInt = $("#currInt").val();// 本次应收利息
	obj.currPayInt = $("#currPayInt").val();// 本次实收利息
	obj.createDt = getDate(new Date());// 利息产生时间
	obj.intPayFlg = 0;// 利息收取标志 0.应收未收 1.应收已收
	obj.payIntTp = payIntTp;// new 收取方式
	obj.overdueInt = '';// 本次逾期利息

	obj.theirRef = $("#sysRefNo").val();// 关联编号（关联业务交易流水号）
	obj.remark = '';// 备注
	if (payIntTp == '1') {// 预收息
		obj.currIntDt = $('#loanValDt').datebox('getValue');// 本次利息应收日期
		obj.currIntPayDt = $('#loanValDt').datebox('getValue');// 本次利息实收日期
	} else {
		obj.currIntDt = $('#loanDueDt').datebox('getValue');// 本次利息应收日期
		obj.currIntPayDt = '';// 本次利息实收日期
	}

	obj.trxDate = getDate(new Date());
	int['rows0'] = obj;
	return int;
}

/*
 * 复核时候查询FEE的E表（catalog双表查询有冲突）
 */
function relQueryFeeE() {
	var selId = $("#selId").val();
	var sysRefNo = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000615',
			selId : selId,
			sysRefNo : sysRefNo
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
 * 复核时候查询INT的E表
 */
function relQueryIntE() {
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
				obj = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}
// 查询协议表
function queryCntrctInfo(cntrctNo) {
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000552',
			cntrctNo : cntrctNo
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
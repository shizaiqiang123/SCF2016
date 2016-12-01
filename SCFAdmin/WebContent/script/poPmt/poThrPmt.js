/**
 * 复合功能时，进入结果汇总页面
 * 
 * @param data
 */
function pageOnReleaseResultLoad(data) {
	// queryLoanDetails(data);
	SCFUtils.loadForm('loanForm', data);
	$("#ttlLoanBal").numberbox('setValue', data.obj.ttlLoanBal);
	lookSysRelReason();
	if (data.obj.OldSysRelReason == "") {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
}

function pageOnFPLoad(data) {
	pageOnReleasePageLoad(data);
	lookSysRelReason();
}
/**
 * 复合功能时，Next进入交易页面
 * 
 * @param data
 */
function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	queryLoanDetails(row);
	$('#marginBalHD').val($('#marginBal').numberbox('getValue'));
	$('#loanId').val(data.obj.loanId);
	$('#sysRefNo').val(data.obj.sysRefNo);
	$('#cntrctNo').val(data.obj.cntrctNo);
	$('#selId').val(data.obj.selId);
	$('#buyerId').val(data.obj.buyerId);
	$('#buyerNm').val(data.obj.buyerNm);
	var ttlLoanBal = $('#ttlLoanBal').numberbox('getValue');
	$("#ttlLoanBalOld").numberbox('setValue', ttlLoanBal);// 原融资余额
	$("#marginAmtUsed").numberbox('setValue', marginAmtUsed);// 保证金提取金额
	SCFUtils.loadForm('loanForm', data);
	$("#ttlLoanBal").numberbox('setValue',
			SCFUtils.Math(ttlLoanBal, data.obj.payPrinAmt, 'sub'));
	queryBuyerInfo(data.obj.cntrctNo, data.obj.buyerId);
	// $('#intAmt').numberbox('setValue', data.obj.payIntAmt);
	// queryPom();
	$('#OldSysRelReason').textbox('setValue', row.OldSysRelReason);
	lookSysRelReason();
	if (data.obj.OldSysRelReason == "") {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
}
/**
 * 复合功能时，Pre进入交易页面
 * 
 * @param data
 */
function pageOnReleasePreLoad(data) {
	queryLoanDetails(data);
	$('#acNo').val(data.obj.acNo);
	$("#ttlLoanBalOld").numberbox('setValue', data.obj.ttlLoanBalOld);
	SCFUtils.loadForm('loanForm', data);
	$('#OldSysRelReason').textbox('setValue', data.obj.OldSysRelReason);
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
	$('#marginBalHD').val(data.obj.marginBalHD);
	// queryLoanDetails(data);
	$("#acNo").val(data.obj.acNo);
	$('#marginBal').numberbox('setValue', data.obj.marginBal);// 保证金余额
	$("#ttlLoanBal").numberbox('setValue', data.obj.ttlLoanBal);// 融资余额
	$('#ttlLoanBalHD').val(data.obj.ttlLoanBalHD);
	$("#ttlLoanBalOld").numberbox('setValue', data.obj.ttlLoanBalOld);// 原融资余额
	$('#marginAmtUsed').numberbox('setValue', data.obj.marginAmtUsed);// 保证金提取金额
	$('#payPrinAmt').numberbox('setValue', data.obj.payPrinAmt);// 本次还款金额

	SCFUtils.loadForm('loanForm', data);
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
	$('#marginBalHD').val(data.obj.marginBalHD);
	SCFUtils.setNumberspinnerReadonly('payPrinAmt', false);
	queryLoanDetails(data);
	$('#ttlLoanBalOld').numberbox('setValue', data.obj.ttlLoanBalOld);
	SCFUtils.loadForm('loanForm', data);
	$('#ttlLoanBal').numberbox('setValue',
			SCFUtils.Math(data.obj.ttlLoanBalOld, data.obj.payPrinAmt, 'sub'));// 还款后融资余额
	$('#OldSysRelReason').textbox('setValue', data.obj.OldSysRelReason);
	$('#sysRelReason').textbox('setValue', data.obj.sysRelReason);
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
	SCFUtils.loadForm('loanForm', data);
	$('#ccy').combobox('setValue', data.obj.lmtCcy);
	$('#sellerLmtSysRefNo').val(data.obj.lmtSysRefNo);// 卖方额度流水号
	$('#initMarginPct').numberspinner('setValue', data.obj.initGartPct);
	var options = {};
	options.data = {
		refName : 'PmtRefNo',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	$('#sysRefNo').val(SCFUtils.setRefNo($('#sysRefNo').val(),3));
	lookSysRelReason();
}

function checkPmtAmt() {
	// 复核时不校验
	if (SCFUtils.FUNCTYPE == 'RE') {
		return true;
	}
	var flag = true;
	var marginBal = $('#marginBal').numberbox('getValue');// 保证金余额
	var marginBalHD = $('#marginBalHD').val();
	var ttlLoanBal = $('#ttlLoanBal').numberbox('getValue');// 融资余额
	var ttlLoanBalOld = $('#ttlLoanBalOld').numberbox('getValue');// 原融资余额
	var marginAmtUsed = $('#marginAmtUsed').numberbox('getValue');// 保证金提取金额
	var pmtAmt = $('#payPrinAmt').numberbox('getValue');// 本次还款金额

	var _marginBal = SCFUtils.Math(marginBalHD, marginAmtUsed, 'sub');// 本次修改过后的值
	if (SCFUtils.Math(marginAmtUsed, marginBalHD, 'sub') > 0) {
		SCFUtils.alert('提取保证金金额不能大于保证金余额！');
		flag = false;
	} else {
		if (SCFUtils.Math(ttlLoanBalOld, pmtAmt, 'sub') < 0) {
			SCFUtils.alert('还款金额不能大于原融资余额！');
			flag = false;
		}
	}
	$('#marginBal').numberbox('setValue', _marginBal);// 保证金余额
	return flag;
}
function checkTtlLoanBal() {
	// 复核时不校验
	if (SCFUtils.FUNCTYPE == 'RE') {
		return true;
	}
	var flag = true;
	var marginBal = $('#marginBal').numberbox('getValue');// 保证金余额
	var marginBalHD = $('#marginBalHD').val();
	var ttlLoanBal = $('#ttlLoanBal').numberbox('getValue');// 融资余额
	// var ttlLoan_Bal = $('#ttlLoan_Bal').val();//融资余额
	var ttlLoanBalOld = $('#ttlLoanBalOld').numberbox('getValue');// 原融资余额
	var ttlLoanBalHD = $('#ttlLoanBalHD').val();// 融资余额
	var marginAmtUsed = $('#marginAmtUsed').numberbox('getValue');// 保证金提取金额
	var pmtAmt = $('#payPrinAmt').numberbox('getValue');// 本次还款金额
	if (ttlLoanBalHD == "") {
		// ttlLoanBalHD = SCFUtils.Math(ttlLoanBal,pmtAmt,'sub');
		// modify by shizaiqiang修改这个是为了退回处理时还款后融资余额计算正确
		ttlLoanBalHD = SCFUtils.Math(ttlLoanBalOld, pmtAmt, 'sub');
	} else {
		ttlLoanBalHD = SCFUtils.Math(ttlLoanBalHD, pmtAmt, 'sub');
	}
	$("#ttlLoanBal").numberbox('setValue', ttlLoanBalHD);
	if (SCFUtils.Math(marginAmtUsed, marginBalHD, 'sub') > 0) {
		SCFUtils.alert('提取保证金金额不能大于保证金余额！');
		flag = false;
	} else {
		if (SCFUtils.Math(ttlLoanBalOld, pmtAmt, 'sub') < 0) {
			SCFUtils.alert('还款金额不能大于原融资余额！');
			flag = false;
		}
	}
	return flag;
}

// 查询融资信息
function onSearchPoClick() {
	var cntrctNo = $('#cntrctNo').val();
	var selId = $('#selId').val();
	var buyerId = $('#buyerId').val();
	if (buyerId == "" || buyerId == null) {
		SCFUtils.alert('请先选择供货商！');
		return;
	}
	var options = {
		title : '融资查询',
		reqid : 'I_P_000165',
		data : {
			'selId' : selId,
			'cntrctNo' : cntrctNo,
			'buyerId' : buyerId,
			cacheType : 'non'
		},
		onSuccess : setLoanData,
		cacheType : 'non'
	};
	SCFUtils.getData(options);
}

function setLoanData(data) {
	if (SCFUtils.isEmpty(data)) {
		SCFUtils.alert("未选择融资记录！");
		return;
	}

	$('#loanId').val(data.sysRefNo);
	/** 买方编号与名称不在选择融资后赋值，改为页面选择买方后赋值 YeQing modify on 2016-06-06 */
	$('#ttlLoanAmt').numberbox('setValue', data.ttlLoanAmt);
	$('#ttlLoanBal').numberbox('setValue', data.ttlLoanBal);
	$('#ttlLoanBalOld').numberbox('setValue', data.ttlLoanBal);
	$('#ttlLoanBalHD').val(data.ttlLoanBal);
	$('#marginBal').numberbox('setValue', data.marginBal);
	$('#marginBalHD').val(data.marginBal);
	$('#initMarginPct').numberspinner('setValue', data.initMarginPct);
	$('#loanValDt').datebox('setValue', data.loanValDt);
	$('#loanDueDt').datebox('setValue', data.loanDueDt);
	$('#poNo').val(data.poNo);
	$('#poAmt').numberbox('setValue', data.poAmt);
	$('#acNo').val(data.selAcNo);
	$("#payPrinAmt").numberbox({
		max : parseFloat($("#ttlLoanAmt").numberbox("getValue"))
	});
	if ($('#poNo').val() != null) {
		$('#poNo').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#poNo').removeClass('validatebox-invalid');
	}

}

/**
 * 所有进入交易页面 公共的方法
 * 
 * @param data
 */
function pageOnInt() {
	$('tr[id=Tr1]').hide();
	SCFUtils.setFormReadonly('#loanForm', true);
	SCFUtils.setLinkbuttonReadonly('poButton', false);
	SCFUtils.setNumberboxReadonly('marginAmtUsed', false);
	SCFUtils.setNumberboxReadonly('payPrinAmt', false);
	SCFUtils.setTextReadonly('acNo', true);
	SCFUtils.setLinkbuttonReadonly('queryBuyer', false);
	SCFUtils.setLinkbuttonReadonly('poButton', false);
	ajaxBox();
	$('#marginAmtUsedTD').hide();
	$('#marginAmtUsedHD').hide();
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

	} else if (SCFUtils.FUNCTYPE == "DP" || SCFUtils.FUNCTYPE == "RE") {
		$('#messageDivFa').css('display', 'none');
	} else {
		$('#messageDivFa').css('display', 'none');
	}
}

function ajaxBox() {
	var data = data = [ {
		"id" : '0',
		"text" : "国内有追索权保理",
		"selected" : true
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
		"id" : '11',
		"text" : "三方保兑仓"
	} ];
	$("#busiTp").combobox('loadData', data);
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function oblurpayPrin() {
	$('#payPrinAmt').numberbox({
		onChange : function() {
			changepayPrin();
		}
	});
}

function queryData(data) {
	var sysRefNo = data.obj.sysRefNo;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000023',
			sysRefNo : sysRefNo,
			cacheType : 'append'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {

					SCFUtils.loadForm('loanForm', data.rows[0]);
					queryCntrct(data.rows[0]);
					// $('#payPrinAmt').numberbox('setValue',data.rows[0].ttlLoanBal);//还本金金额
					$('#tempBal').val(data.rows[0].ttlLoanBal);// 原始融资余额
					// queryPom(data.rows[0]);
					countAmt(data.rows[0]);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryCntrct(data) {

	var cntrctNo = data.cntrctNo;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000008',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#lmtBal').val(data.rows[0].lmtBal);
					$('#cntrctNo').val(data.rows[0].sysRefNo);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryPom() {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000022',
			poId : $('#poId').val(),
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#poAmt').numberbox('setValue', data.rows[0].poAmt);
					$('#poDueDt').datebox('setValue', data.rows[0].poDueDt);
					$('#poCcy').combobox('setValue', data.rows[0].poCcy);
					// countAmt();
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryLoan(data) {
	var sysRefNo = data.obj.loanId;
	/*
	 * if('RE'==SCFUtils.FUNCTYPE){ $('#sysRefNo').val(data.obj.sysRefNo); }
	 */
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000023',
			sysRefNo : sysRefNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					// SCFUtils.loadForm('loanForm', data.rows[0]);
					// $('#payPrinAmt').numberbox('setValue',data.rows[0].ttlLoanBal);//还本金金额
					// $('#poNo').val(data.rows[0].poNo);
					// $('#tempBal').val(data.rows[0].ttlLoanBal);// 原始融资余额
					// $('#loanRt').numberspinner('setValue',
					// data.rows[0].loanRt);
					// $('#loanValDt').datebox('setValue',
					// data.rows[0].loanValDt);
					// $('#loanDueDt').datebox('setValue',
					// data.rows[0].loanDueDt);
					$('#ttlLoanAmt').numberbox('setValue',
							data.rows[0].ttlLoanAmt);
					$('#ttlLoanBal').numberbox('setValue',
							data.rows[0].ttlLoanBal);
					var ttlPmtAmt = $('#ttlPmtAmt').numberbox('getValue');
					// $('#ttlLoanBal').numberbox(
					// 'setValue',
					// SCFUtils.Math(data.rows[0].ttlLoanBal, ttlPmtAmt,
					// 'sub'));
					// queryPom(data.rows[0]);
					// countAmt(data.rows[0]);
					// queryCntrct(data.rows[0]);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function countAmt(data) {
	// var start = data.loanValDt;
	// var end = getDate(new Date());

	var start = SCFUtils.dateFormat(data.loanValDt, 'yyyy-MM-dd');
	var end = getDate(new Date());
	var ttlLoanBal = $('#ttlLoanBal').numberbox('getValue');
	if (!SCFUtils.isEmpty(ttlLoanBal)) {
		if (SCFUtils.DateDiff(end, start) >= 0) {
			// alert(parseInt((end-start) / (1000 * 60 * 60 * 24)));
			var tolttm = ttlLoanBal * data.loanRt * 0.01
					* (SCFUtils.DateDiff(end, start)) * 100 / 360;
			// $('#tempInt').numberbox('setValue',tolttm);
			// $('#tempBal').val(data.ttlLoanBal);
			$('#intAmt').numberbox('setValue', tolttm);
			$('#payIntAmt').numberbox('setValue', tolttm);
			$('#payPrinAmt').numberbox('setValue', $('#tempBal').val());// 还本金金额
			// $('#ttlPmtAmt').numberbox('setValue',data.ttlLoanBal+tolttm);
			// $('#ttlLoanBal').numberbox('setValue',0);
		}
	}
	var tolttm = $('#intAmt').numberbox('getValue');
	var ttlPmtAmt = SCFUtils.Math(ttlLoanBal, tolttm, 'add');
	$('#ttlPmtAmt').numberbox('setValue', ttlPmtAmt);

}

// function changeLoanBal(){
// var tempBal=$('#tempBal').val();//原融资余额
// var payPrinAmt=$('#payPrinAmt').numberbox('getValue');//还本金金额
// if(!SCFUtils.isEmpty(tempBal)&&!SCFUtils.isEmpty(payPrinAmt)&&tempBal!=0&&payPrinAmt!=0){
// if(SCFUtils.Math(payPrinAmt, tempBal, 'sub')>0){
// $('#payPrinAmt').numberbox('setValue',0);
// $('#ttlPmtAmt').numberbox('setValue',0);
// SCFUtils.alert('本次还款金额超出融资余额！');
// }else{
// $('#ttlLoanBal').numberbox('setValue',SCFUtils.Math(tempBal,$('#ttlPmtAmt').numberbox('getValue'),
// 'sub'));
// }
// }
// }

function changepayPrin() {
	var payPrinAmt = $('#payPrinAmt').numberbox('getValue');// 还本金金额
	var payIntAmt = $('#payIntAmt').numberbox('getValue');
	var tempBal = $('#tempBal').val();// 原融资余额
	var subamt = SCFUtils.Math(tempBal, payPrinAmt, 'sub');
	if (!SCFUtils.isEmpty(tempBal) && !SCFUtils.isEmpty(payIntAmt)
			&& subamt >= 0) {
		var sumamt = SCFUtils.Math(payPrinAmt, payIntAmt, 'add');
		$('#ttlPmtAmt').numberbox('setValue', sumamt);
		$('#ttlLoanBal').numberbox('setValue',
				SCFUtils.Math(tempBal, sumamt, 'sub'));
	} else {
		$('#ttlPmtAmt').numberbox('setValue', '');
		SCFUtils.alert('本次还款金额超出融资余额！');
	}
}

/*
 * 打包卖方额度
 */
function getSellerData() {
	querySellerLmt();
	var sellerLmt = {};// 添加卖方额度信息
	sellerLmt._total_rows = 1;
	var obj = {};
	var lmtTp = '1';
	if ('RE' === SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE) {
		var relQueryE = relQueryLmtE(lmtTp);
		obj.sysRefNo = relQueryE.sysRefNo;
		obj.lmtBal = relQueryE.lmtBal;// 卖方额度余额
		obj.lmtAllocate = relQueryE.lmtAllocate;// 本次占用额度
		obj.lmtRecover = relQueryE.lmtRecover;// 归还额度

	} else {
		if ('FP' === SCFUtils.FUNCTYPE) {
			var relQueryE = relQueryLmtE(lmtTp);
			obj.sysRefNo = relQueryE.sysRefNo;
		} else {
			obj.sysRefNo = $('#sellerLmtSysRefNo').val();
		}
		var relQueryM = relQueryLmtM(lmtTp);
		obj.lmtBal = SCFUtils.Math(relQueryM.lmtBal, $('#payPrinAmt')
				.numberbox('getValue'), 'add');// 卖方额度余额=原卖方额度余额+还款金额
		obj.lmtAllocate = SCFUtils.Math(relQueryM.lmtAllocate, $('#payPrinAmt')
				.numberbox('getValue'), 'sub');// 本次占用额度=原来占用额度-还款金额
		obj.lmtRecover = SCFUtils.Math(relQueryM.lmtRecover, $('#payPrinAmt')
				.numberbox('getValue'), 'add');// 归还额度=原归还额度+还款余额

	}

	obj.ttlAllocate = 0;// 已占用额度
	obj.theirRef = $('#sysRefNo').val();// 主页流水号

	sellerLmt['rows0'] = obj;
	return sellerLmt;

}

function querySellerLmt() {
	var cntrctNo = $("#cntrctNo").val();
	var selId = $("#selId").val();
	if (!SCFUtils.isEmpty(selId)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000673',
				selId : selId,
				cntrctNo : cntrctNo
			},
			callBackFun : function(data1) {
				if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
					$('#sellerLmtSysRefNo').val(data1.rows[0].sysRefNo);// 卖方额度流水号

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
	var sysLockBy = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000651',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp,
			sysLockBy : sysLockBy
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
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

function onNextBtnClick() {
	if (SCFUtils.Math($("#payPrinAmt").numberbox("getValue"), 0, 'sub') <= 0) {
		SCFUtils.alert("本次还款金额不能为0");
		return;
	}
	if (checkPmtAmt()) {
		var mainData = SCFUtils.convertArray('loanForm');
		// $('#acNo').val(mainData.acNo);
		queryRelCntrct();

		var marginBal = $('#marginBal').numberbox('getValue');
		var marginAmtUsed = $('#marginAmtUsed').numberbox('getValue');

		var lmtCcy = $('#ccy').val();
		// 本次还款金额
		var ttlPmtAmt = $('#payPrinAmt').val();
		var lmtBal = $('#lmtBal').val();

		var cntrctNo = $('#cntrctNo').val();
		var buyerId = $('#buyerId').val();
		// 协议相关信息
		var cntrct = queryCntrctInfo(cntrctNo);

		// 客户表相关信息
		var custInfo = queryCustInfo(buyerId);

		// 额度关联表相关信息
		var cntrctSbrInfo = queryCntrctSbrInfo(cntrctNo, buyerId);
		var grid = {};
		queryBuyerLmt(cntrctNo, buyerId);// 买方额度编号
		// 打包买方额度数据
		// grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData(buyerId));
		// 打包卖方额度数据
		grid.sellerLmt = SCFUtils.json2str(getSellerData());

		$.extend(mainData, grid, {
			"cntrctLmtCcy" : cntrct.lmtCcy,// 额度币别
			"custLmtCcy" : custInfo.ccy,// 额度币别
			"cntrctSbrLmtCcy" : cntrctSbrInfo.lmtCcy,// 额度币别

			"cntrctLmtBal" : SCFUtils.Math(cntrct.lmtBal, ttlPmtAmt, 'add'),// 协议_额度余额
			// =
			// 原额度余额+本次释放金额
			"custLmtBal" : SCFUtils.Math(custInfo.lmtBal, ttlPmtAmt, 'add'),// 客户_额度余额
			// =
			// 原额度余额+本次释放金额
			"cntrctSbrLmtBal" : SCFUtils.Math(cntrctSbrInfo.buyerLmtBat,
					ttlPmtAmt, 'add'),// 额度关联信息_额度余额 = 原额度余额+本次释放金额

			'cntrctLmtAmt' : cntrct.lmtAmt, // 协议_额度金额
			'custLmtAmt' : custInfo.lmtAmt, // 客户信息表_额度金额
			'cntrctSbrLmtAmt' : cntrctSbrInfo.buyerLmtAmt, // 额度关联信息表_额度金额

			'cntrctLmtAllocate' : SCFUtils.Math(cntrct.lmtAllocate, ttlPmtAmt,
					'sub'), // 协议_占用额度 = 原占用额度-本次还款金额
			'custLmtAllocate' : SCFUtils.Math(custInfo.lmtAllocate, ttlPmtAmt,
					'sub'), // 客户_占用额度 = 原占用额度-本次还款金额
			'cntrctSbrLmtAllocate' : SCFUtils.Math(cntrctSbrInfo.lmtAllocate,
					ttlPmtAmt, 'sub'), // 额度关联信息_占用额度 = 原占用额度-本次还款金额

			'cntrctLmtRecover' : SCFUtils.Math(cntrct.lmtRecover, ttlPmtAmt,
					'add'), // 协议_归还额度 =原归还额度+本次释放金额（即本次还款金额）
			'custLmtRecover' : SCFUtils.Math(custInfo.lmtRecover, ttlPmtAmt,
					'add'), // 客户_归还额度 =原归还额度+本次释放金额（即本次还款金额）
			'cntrctSbrLmtRecover' : SCFUtils.Math(cntrctSbrInfo.lmtRecover,
					ttlPmtAmt, 'add'), // 额度关联信息_归还额度 =原归还额度+本次释放金额（即本次还款金额）
			'sysRelReason' : $('#sysRelReason').val(),
			'OldSysRelReason' : $('#OldSysRelReason').val(),

		}, {
			"lmtBal" : SCFUtils.Math(lmtBal, ttlPmtAmt, 'add')
		}, {
			"ttlPmtAmt" : ttlPmtAmt
		}, {
			"pmtDt" : SCFUtils.getcurrentdate()
		}, {
			"trxDt" : SCFUtils.getcurrentdate()
		}/*
			 * ,{ marginBal : SCFUtils.Math(marginBal, marginAmtUsed, 'sub') }
			 */);
		return mainData;
	} else {
		return;
	}
}
/**
 * 查询协议额度
 * 
 * @param data
 */
function queryRelCntrct() {
	var cntrctNo = $('#cntrctNo').val();
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000029',
			sysRefNo : cntrctNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#lmtBal').val(data.rows[0].lmtBal);// 额度余额
			}
		}
	};
	SCFUtils.ajax(opts);
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
				getBuyerLmt(data.rows[0].buyerId);
			}
		}
	};
	SCFUtils.ajax(options);
}

// 买方查询
function showLookUpWindow() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		title : '间接客户查询',
		reqid : 'I_P_000111',
		data : {
			'cntrctNo' : cntrctNo
		},
		onSuccess : getBuyerSuccess
	};
	SCFUtils.getData(options);
}

function getBuyerSuccess(data) {
	$('#buyerNm').val(data.buyerNm);
	$('#buyerId').val(data.buyerId);
	$('#trxId').val(data.sysRefNo);
	// loadTable(data.cntrctNo, data.buyerId);
	// 获取买方额度信息
	getBuyerLmt(data.buyerId);
}
function getBuyerLmt(data) {
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000375',
			sysRefNo : data,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#buyerlmtBal').val(
						SCFUtils.Math(data.rows[0].lmtBal, ttlLoanAmt, 'sub'));// 额度余额
				$('#buyerlmtAvl').val(
						SCFUtils.Math(data.rows[0].lmtAllocate, ttlLoanAmt,
								'add'));// 占用额度金额
				$('#buyerlmtBalHD').val(
						SCFUtils.Math(data.rows[0].lmtBal, ttlLoanAmt, 'sub'));// 额度余额
				$('#buyerlmtAvlHD').val(
						SCFUtils.Math(data.rows[0].lmtAllocate, ttlLoanAmt,
								'add'));// 占用额度金额
			}
		}
	};
	SCFUtils.ajax(opts);
}
/**
 * 查询融资表信息
 * 
 * @param data
 */
function queryLoanDetails(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000495',
			loanId : data.loanId
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#loanValDt').datebox('setValue', data.rows[0].loanValDt);
				$('#loanDueDt').datebox('setValue', data.rows[0].loanDueDt);
				$('#ttlLoanAmt').numberbox('setValue', data.rows[0].ttlLoanAmt);
				$('#ttlLoanBal').numberbox('setValue', data.rows[0].ttlLoanBal);
				$('#ccy').combobox('setValue', data.rows[0].ccy);
				$('#marginBal').numberbox('setValue', data.rows[0].marginBal);
				// $('#marginBalHD').numberbox('setValue',SCFUtils.Math(data.rows[0].marginBal,
				// data.row[0].marginAmtUsed, 'add'));
				$('#initMarginPct').numberbox('setValue',
						data.rows[0].initMarginPct);
			}
		}
	};
	SCFUtils.ajax(options);
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
// 查询客户信息表
function queryCustInfo(buyerId) {
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000559',
			sysRefNo : buyerId
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
// 查询额度关联关系信息表
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
 * 复核时候查询LMT的E表
 */
/*
 * function relQueryLmtE(lmtTp){ var cntrctNo = $("#cntrctNo").val(); //var
 * selId= $("#selId").val(); var sysLockBy =$("#sysRefNo").val(); var obj = {};
 * var options = { url : SCFUtils.AJAXURL, data : { queryId : 'Q_P_000651',
 * cntrctNo : cntrctNo, lmtTp : lmtTp, //selId :selId, sysLockBy:sysLockBy },
 * callBackFun : function(data) { if (!SCFUtils.isEmpty(data.rows)) { obj =
 * data.rows; } } }; SCFUtils.ajax(options); return obj; }
 */

/*
 * 申请时候查询LMT的表
 */
/*
 * function relQueryLmtM(lmtTp,buyerId){ var cntrctNo = $("#cntrctNo").val();
 * var obj = {}; var options = { url : SCFUtils.AJAXURL, data : { queryId :
 * 'Q_P_000671', cntrctNo : cntrctNo, lmtTp : lmtTp, buyerId : buyerId },
 * callBackFun : function(data) { if (!SCFUtils.isEmpty(data.rows)) { obj =
 * data.rows; } } }; SCFUtils.ajax(options); return obj; }
 */

/*
 * function getBuyerLmtData(buyerId){ var buyerLmt = {};// 添加买方额度信息
 * buyerLmt._total_rows = 1; var obj = {}; var lmtTp = '0';
 * if('RE'===SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE ){ obj.sysRefNo =
 * relQueryLmtE(lmtTp)[0].sysRefNo; obj.lmtBal = relQueryLmtE(lmtTp)[0].lmtBal
 * ;//买方额度余额=原买方额度余额-转让金额 obj.lmtAllocate = relQueryLmtE(lmtTp)[0].lmtAllocate
 * ;//本次占用额度=原来占用额度+转让金额
 * 
 * }else{ if('FP'===SCFUtils.FUNCTYPE){ obj.sysRefNo =
 * relQueryLmtE(lmtTp)[0].sysRefNo; }else{ obj.sysRefNo =
 * $('#buyerLmtSysRefNo').val(); }
 * 
 * obj.lmtBal =
 * SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#payPrinAmt').numberbox('getValue'),'add')
 * ;//买方额度余额=原额度余额+本次还款金额 obj.lmtRecover =
 * SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtRecover,$('#payPrinAmt').numberbox('getValue'),'add')
 * ;//归还额度=原归还额度+本次还款金额 obj.lmtAllocate =
 * SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#payPrinAmt').numberbox('getValue'),'sub')
 * ;//占用额度=原占用额度-本次还款金额 } obj.ttlAllocate = $('#buyerTtlAllocate').val();//已占用额度
 * obj.theirRef = $('#sysRefNo').val();//
 * 
 * buyerLmt['rows0'] = obj; return buyerLmt; }
 */

function queryBuyerLmt(cntrctNo, buyerId) {
	if (!SCFUtils.isEmpty(buyerId)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000670',
				buyerId : buyerId,
				cntrctNo : cntrctNo
			},
			callBackFun : function(data1) {
				if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
					$('#buyerLmtSysRefNo').val(data1.rows[0].sysRefNo);// 买方额度流水号
					$('#buyerLmtBal').val(data1.rows[0].lmtBal);// 买方额度余额
					$('#buyerLmtBalHd').val(data1.rows[0].lmtBal);// 买方额度余额
					if (SCFUtils.isEmpty(data1.rows[0].ttlAllocate)) {
						$('#buyerTtlAllocate').val(0);// 买方占用额度
						$('#buyerTtlAllocateHd').val(0);
					} else {
						$('#buyerTtlAllocate').val(data1.rows[0].ttlAllocate);// 买方占用额度
						$('#buyerTtlAllocateHd').val(data1.rows[0].ttlAllocate);
					}

				}
			}
		};
		SCFUtils.ajax(opt);
	}
}
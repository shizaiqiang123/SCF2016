function pageOnInt(data) {
	ajaxBox();
	ajaxTable();
	// SCFUtils.setTextReadonly('collatCompNm', true);
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
	var data = [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '3',
		"text" : "信用保险项下"
	}, {
		"id" : '6',
		"text" : "应收账款池融资"
	},{
		"id" : '7',
		"text" : "应收账款质押"
	} ];
	$("#busiTp").combobox('loadData', data);

	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006',
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("ccy", true);
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setTextReadonly("selId", true);
	// SCFUtils.setNumberboxReadonly("ttlCbkAmt", true);
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

// 加载表格
function ajaxTable() {

	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		// singleSelect : true,
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '流水号',
			hidden : true
		}, {
			field : 'selId',
			title : '授信客户编号',
			hidden : true
		}, {
			field : 'buyerId',
			title : '间接客户编号',
			hidden : true
		}, {
			field : 'selNm',
			title : '授信客户名称',
			width : '11.11%'
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : '11.11%'
		}, {
			field : 'invNo',
			title : '应收账款凭证号',
			width : '11.11%'
		}, {
			field : 'invCcy',
			title : '币种',
			width : '11.11%'
		}, {
			field : 'invBal',
			title : '应收账款净额',
			formatter : ccyFormater,
			width : '11.11%'
		}, {
			field : 'invBalOld',
			title : '应收账款净额',
			formatter : ccyFormater,
			width : 60,
			hidden : true
		}, {
			field : 'invLoanAval',
			title : '可融资余额',
			formatter : ccyFormater,
			width : '11.11%'
		}, {
			field : 'invLoanAvalOld',
			title : '可融资余额',
			formatter : ccyFormater,
			width : 60,
			hidden : true
		}, {
			field : 'crnAmt',
			title : '冲销金额',
			formatter : ccyFormater,
			width : '11.11%'
		}, {
			field : 'invDueDt',
			title : '应收账款到期日',
			width : '11.11%',
			formatter : dateFormater
		}, {
			field : 'cntrctNo',
			title : '额度编号',
			hidden : true
		}, {
			field : 'invSts',
			title : '发票状态',
			hidden : true
		}, {
			field : 'loanPercOld',
			title : '融资比例',
			//formatter : ccyFormater,
			width : '11.11%'
		},{
			field : 'loanPerc',
			title : '融资比例',
			hidden : true,
			width : '11.11%'
		}, {
			field : 'temp',
			title : '冲销金额可融资额',
			hidden : true
		}, {
			field : 'invDt',
			title : '应收账款日期',
			formatter : dateFormater,
			hidden : true
		} ] ]
	};
	$('#invcCdnTable').datagrid(options);
}

function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	$("#invcInfo").hide();
	SCFUtils.loadForm('cdnRegForm', data);
	/*
	 * if ("FP" == SCFUtils.FUNCTYPE) { // queryCust(data.obj.buyerId);
	 * loadTable(data.obj.sysRefNo); } else {
	 */
	$('#ccy').combobox('setValue', data.obj.lmtCcy);
	$('#buyerLmtSysRefNo').val(data.obj.lmtSysRefNo);// 买方额度流水号
	$('#cntrctNo').val(data.obj.cntrctNo);
	$('#selId').val(data.obj.selId);
	$('#selNm').val(data.obj.selNm);
	$('#buyerId').val(data.obj.buyerId);
	$('#cnAmt').numberbox('setValue', data.obj.lmtBal);
	SCFUtils.setNumberboxReadonly("cnAmt", true);
	var options = {};
	options.data = {
		refName : 'cdnRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);

	var optionsGrid = $('#invcCdnTable').datagrid('options');
	optionsGrid.onCheck = onCheck;
	optionsGrid.onUncheck = onUncheck;
	optionsGrid.onCheckAll = onCheckAll;
	optionsGrid.onUncheckAll = onUncheckAll;
	queryInvc();
	$('#cnNo').validatebox({
		required : true
	});
	queryBuyerInfo(data.obj.cntrctNo, data.obj.buyerId);
	lookSysRelReason();
}

function pageOnFPLoad(data) {
	$("#invcInfo").show();
	pageOnReleasePageLoad(data);
	$('#cnAmt').numberbox('setValue', '0');
	var optionsGrid = $('#invcCdnTable').datagrid('options');
	optionsGrid.onCheck = onCheck;
	optionsGrid.onUncheck = onUncheck;
	optionsGrid.onCheckAll = onCheckAll;
	optionsGrid.onUncheckAll = onUncheckAll;
	SCFUtils.setNumberboxReadonly("cnAmt", true);
	// $('#invcCdnTable').datagrid('checkAll');
	// 在加载数据初始化时就将datagrid中的数据默认全勾选
	// $('#billTable').datagrid('selectAll', true);//
	// 在加载数据初始化时就将datagrid中的数据默认全勾选
	lookSysRelReason();
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
	SCFUtils.loadForm('cdnRegForm', data);
	SCFUtils.loadGridData('invcCdnTable', SCFUtils
			.parseGridData(data.obj.invCbk), true);
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
	SCFUtils.loadForm('cdnRegForm', data);
	SCFUtils.setNumberboxReadonly("cnAmt", true);
	if (SCFUtils.FUNCTYPE == "PM") {
		$("#invcInfo").hide();
		$('#cnAmt').numberbox('setValue', 0);
		queryInvc();

	} else {
		SCFUtils.loadGridData('invcCdnTable', SCFUtils
				.parseGridData(data.obj.invCbk), false);
	}
	var optionsGrid = $('#invcCdnTable').datagrid('options');
	optionsGrid.onCheck = onCheck;
	optionsGrid.onUncheck = onUncheck;
	optionsGrid.onCheckAll = onCheckAll;
	optionsGrid.onUncheckAll = onUncheckAll;
	if ("FP" == SCFUtils.FUNCTYPE) {
		$("#invcCdnTable").datagrid('selectAll');
	} 
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
	SCFUtils.loadForm('cdnRegForm', row);
	loadTable(data.obj.sysRefNo);
	queryBuyerInfo(data.obj.cntrctNo, data.obj.buyerId);
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
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

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

/*
 * function pageOnFPLoad(data) { pageOnReleasePageLoad(data); }
 */

/**
 * 查询应收账款信息
 */
var flagHD = false;

function queryInvc() {
	flagHD = true;
	var newData = [];
	var data = SCFUtils.convertArray('cdnRegForm');
	if (data) {
		$('#invcCdnTable').datagrid('clearChecked');
		// 加载的时候重新加载datagrid
		$('#invcCdnTable').datagrid('loadData', {
			total : 0,
			rows : []
		});
		var cntrctNo = $('#cntrctNo').val();
		var sysRefNo = $('#sysRefNo').val();
		var selId = $('#selId').val();
		var buyerId = $('#buyerId').val();
		var invNo = data.invNo;
		var temp ='%';
		var loanPerc;
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000109',
				buyerId : buyerId,
				selId : selId,
				cntrctNo : cntrctNo,
				sysRefNo : sysRefNo,
				invNo : invNo
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$.each(data.rows, function(i, n) {
						loanPerc = n.loanPerc+temp;
						$.extend(n, {
							invBalHD : n.invBal,
							invSts : 'CDN',
							chgBcAmt : '0',
							invBalOld : n.invBal,
							invLoanAvalOld : n.invLoanAval,
							loanPerc :n.loanPerc,
							loanPercOld :loanPerc
						});
						newData.push(n);
					});
					SCFUtils.loadGridData('invcCdnTable', newData, false, true);
				} else {
					SCFUtils.alert("未找到符合条件的应收账款");
				}
			}
		};
		SCFUtils.ajax(opt);
	}
	$('#cnAmt').numberbox('setValue', 0);
	
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
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#cnAmt').numberbox('getValue'),'add') ;//买方额度余额=原买方额度余额+贷项清单金额
		obj.lmtAllocate = parseFloat(SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#cnAmt').numberbox('getValue'),'sub')) ;//本次占用额度=原来占用额度-贷项清单金额
		
		obj.lmtRecover = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtRecover,$('#cnAmt').numberbox('getValue'),'add') ;//归还额度=原归还额度+贷项清单金额

	}
	obj.ttlAllocate = 0;//已占用额度
	obj.theirRef = $('#sysRefNo').val();//主页流水号
	
	buyerLmt['rows0'] = obj;
	return buyerLmt;

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
	var cnAmt = $('#cnAmt').numberbox('getValue');
	if (SCFUtils.FUNCTYPE === 'PM' || SCFUtils.FUNCTYPE === 'FP') {

		var row = $('#invcCdnTable').datagrid('getSelections');
		if (row.length == 0) {
			SCFUtils.alert("请选择应收账款！");
			return;
		} else if (cnAmt <= 0 || SCFUtils.isEmpty(cnAmt)) {
			SCFUtils.alert("您的贷项清单总额没有操作！");
			return;
		}
	}
	var data = SCFUtils.convertArray('cdnRegForm');
	var cntrctNo = data.cntrctNo;// 协议编号
	var buyerId = data.buyerId;
	// 客户表相关信息
	var custInfo = queryCustInfo(buyerId);

	// 额度关联表相关信息
	var cntrctSbrInfo = queryCntrctSbrInfo(cntrctNo, buyerId);
	$.extend(data, {
		"custLmtCcy" : custInfo.lmtCcy,// 额度币别
		"cntrctSbrLmtCcy" : cntrctSbrInfo.lmtCcy,// 额度币别

		"custLmtBal" : SCFUtils.Math(custInfo.lmtBal, cnAmt, 'add'),// 客户_额度余额 =
		// 原额度余额+贷项清单总额
		"cntrctSbrLmtBal" : SCFUtils.Math(cntrctSbrInfo.buyerLmtBat, cnAmt,
				'add'),// 额度关联信息_额度余额 = 原额度余额+贷项清单总额

		'custLmtAmt' : custInfo.lmtAmt, // 客户信息表_额度金额
		'cntrctSbrLmtAmt' : cntrctSbrInfo.buyerLmtAmt, // 额度关联信息表_额度金额

		'custLmtAllocate' : SCFUtils.Math(custInfo.lmtAllocate, cnAmt, 'sub'), // 客户_占用额度
		// =
		// 原占用额度-贷项清单总额
		'cntrctSbrLmtAllocate' : SCFUtils.Math(cntrctSbrInfo.lmtAllocate,
				cnAmt, 'sub'), // 额度关联信息_占用额度 = 原占用额度-贷项清单总额

		'custLmtRecover' : SCFUtils.Math(custInfo.lmtRecover, cnAmt, 'add'), // 客户_归还额度
		// =原归还额度+贷项清单总额
		'cntrctSbrLmtRecover' : SCFUtils.Math(cntrctSbrInfo.lmtRecover, cnAmt,
				'add')
	// 额度关联信息_归还额度 =原归还额度+贷项清单总额
	});
	var grid = {};
	var invCbk = {};
	var fpData = [];
	var custData = [];
	var sysRefNo = $('#sysRefNo').val();
	var cbkDt = $('#cbkDt').datebox('getValue');
	if (SCFUtils.FUNCTYPE === 'RE') {
		invCbk = SCFUtils.getGridData("invcCdnTable", false);
		$.each(invCbk, function(i, n) { // 复核发票表发票余额，融资余额修改成0；
			if (i != '_total_rows') {
				invBal = n.invBal;
				invLoanAval = n.invLoanAval;
			}
		});
	} else if (SCFUtils.FUNCTYPE === 'DP') {
		invCbk = SCFUtils.getGridData("invcCdnTable", false);
	} else {
		invCbk = SCFUtils.getSelectedGridData('invcCdnTable', false);
		
		//var sysDate = SCFUtils.getcurrentdate();
		$.each(invCbk, function(i, n) { // 发票表字段加入到反转让子表
			if (i != '_total_rows') {
				var invCust = {}; // 发票中的客户信息
				invCust.sysRefNo = n.buyerId;
				invCust.buyerNm = n.buyerNm;
				invCust.chgBcAmt = n.chgBcAmt;
				custData.push(invCust);
				var options = {};
				/*
				 * options.data = { refName : 'inCdnRef', refField : 'cdnRefNo',
				 * cacheType : 'non' };
				 */
				options.data = {
					refName : 'inCbkRef',
					refField : 'cbkRefNo',
					cacheType : 'non'
				};
				SCFUtils.getRefNo(options);
				// var cdnRefNo = $('#cdnRefNo').val();
				var cbkRefNo = $('#cbkRefNo').val();
				var index = $("#invcCdnTable").datagrid('getAllRowIndex', n);
				var row = { // 修改发票表的转让金额
					sysRefNo : cbkRefNo,
					trxId : sysRefNo,
					invId : n.sysRefNo,
					cbkDt : cbkDt
				};
				
				if (SCFUtils.FUNCTYPE == 'FP') { 
					row = { // 修改发票表的转让金额 
							sysRefNo : cbkRefNo,
							cbkDt : cbkDt
							
					}; 
					if(flagHD){
						row = { // 修改发票表的转让金额 
								sysRefNo : cbkRefNo,
								trxId : sysRefNo,
								invId : n.sysRefNo,
								cbkDt : cbkDt
								
						}; }
					$.each(invCbk,function(i,n){ 
						n.sysLockBy = sysRefNo;
					});
						
					}
				 
				$('#invcCdnTable').datagrid('updateRow', {
					index : index,
					/*
					 * row : { // 修改发票表的转让金额 sysRefNo : cdnRefNo, trxId :
					 * sysRefNo, invId : n.sysRefNo, cbkDt : cbkDt, invBal : 0,
					 * invLoanAval : 0 }
					 */
					row : // 修改发票表的转让金额
					row
				/*
				 * , invBal : 0, invLoanAval :0
				 */

				});

				/*if ("FP" == SCFUtils.FUNCTYPE) {// 退回复核是否插入相同数据 if
					(!checkInvCbk(n.invNo))
					{
						fpData.push(n);
					}
				}*/

			}
		});
		if ("FP" == SCFUtils.FUNCTYPE && SCFUtils.isEmpty(fpData)) {
			/*
			 * invCbk._total_rows = fpData.length; $.each(fpData, function(i,
			 * obj) { invCbk['rows' + i + ''] = obj; });
			 */
		}

	}
	var cust = {}; // 合并客户信息
	for (var i = 0; i < custData.length; i++) {
		var obj = queryCust(custData[i].sysRefNo);// 查询买方额度信息
		custData[i].lmtBal = obj.lmtBal;
		custData[i].lmtAllocate = obj.lmtAllocate;
		if (custData.length > 1) {
			for (var j = custData.length - 1; j > i; j--) {
				if (custData[j].sysRefNo == custData[i].sysRefNo) {
					custData[i].chgBcAmt = SCFUtils.Math(custData[i].chgBcAmt,
							custData[j].chgBcAmt, 'add');
					custData.splice(j, 1);
				}
			}
			custData[i].lmtBal = SCFUtils.Math(custData[i].lmtBal,
					custData[i].chgBcAmt, 'add');
			custData[i].lmtAllocate = SCFUtils.Math(custData[i].lmtAllocate,
					custData[i].chgBcAmt, 'sub');
		} else {
			custData[i].lmtBal = SCFUtils.Math(custData[i].lmtBal,
					custData[i].chgBcAmt, 'add'); // 可用额度
			custData[i].lmtAllocate = SCFUtils.Math(custData[i].lmtAllocate,
					custData[i].chgBcAmt, 'sub');// 已用额度
		}
	}
	cust._total_rows = custData.length;
	// 额度关联关系表与客户表更新
	var cntrct = {};
	var cntChange = {};
	cust._total_rows = custData.length;
	cntrct._total_rows = custData.length;
	cntChange._total_rows = custData.length;
	$.each(custData, function(i, obj) {
		cust['rows' + i + ''] = obj;
		var cntrctSbrM = queryCntrctSbrM(cntrctNo, obj.sysRefNo);// 客户额度编号，买方Id查询关联表中的买方关联额度
		var buyerLmtBat = SCFUtils.Math(cntrctSbrM.buyerLmtBat, obj.chgBcAmt,
				'add'); // 关联买方额度余额+净额
		cntrct['rows' + i + ''] = {
			'buyerLmtBat' : buyerLmtBat,
			'sysRefNo' : cntrctSbrM.sysRefNo
		};
		// 额度变更表插入记录
		var cntrctNo = $("#cntrctNo").val();
		//var buyerId = $("#buyerId").val();
		//var selId = $("#selId").val();
		var trxCcy = $('#ccy').combobox('getValue');
		var clType = "O";
		var tdType = "R";
		cntChange['rows' + i + ''] = {
			"sysRefNo" : sysRefNo + obj.sysRefNo,
			"cntrctNo" : cntrctNo,
			"clType" : clType,
			"tdType" : tdType,
			"trxDate" : cbkDt,
			"trxAmt" : obj.chgBcAmt,
			"refNo" : sysRefNo,
			"trxCcy" : trxCcy,
			'custNo' : obj.sysRefNo,
			'custNm' : obj.buyerNm
		};
	});
	grid.invCbk = SCFUtils.json2str(invCbk);
	grid.cust = SCFUtils.json2str(cust);
	grid.cntChange = SCFUtils.json2str(cntChange);
	grid.custSbrM = SCFUtils.json2str(cntrct);
	//打包买方额度数据
	grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
	//打包卖方额度数据
	//grid.sellerLmt = SCFUtils.json2str(getSellerData());
	$.extend(data, grid);
	return data;
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function queryCust(sysRefNo) {
	var obj = {};
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(opt);
	return obj;
}

// 获取买方信息
function getBuyerCredit() {
	var buyerId = $('#buyerId').val();
	// var ttlCbkAmt =$('#ttlCbkAmt').numberbox('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : buyerId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#buyerNm').val(data.rows[0].custNm);
				// $('#lmtBal').val(SCFUtils.Math(data.rows[0].lmtBal,
				// ttlCbkAmt, 'add'));//额度余额
				// $('#lmtAllocate').val(SCFUtils.Math(data.rows[0].lmtAllocate,
				// ttlCbkAmt, 'sub'));//占用额度金额
			}
		}
	};
	SCFUtils.ajax(opts);
}

// 获取卖方信息
function getSellerCredit() {
	var selId = $('#selId').val();
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : selId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#selNm').val(data.rows[0].custNm);// 额度余额
			}
		}
	};
	SCFUtils.ajax(opts);
}

function getSBR() {
	var cntrctNo = $('#cntrctNo').val();
	var buyerId = $('#buyerId').val();
	var selId = $('#selId').val();

	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000392',
			cntrctNo : cntrctNo,
			buyerId : buyerId,
			selId : selId
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				// var ttlCbkAmt = $('#ttlCbkAmt').numberbox('getValue');
				$('#sbrNo').val(data.rows[0].sysRefNo);
				// $('#buyerLmtBat').val(SCFUtils.Math(data.rows[0].buyerLmtBat,
				// ttlCbkAmt, 'add'));//额度余额
			}
		}
	};
	SCFUtils.ajax(opt);

}

function getCbkData(griddata) {
	// 贷项清单子表
	var invCbk = {};
	var cnt = 0;
	$.each(SCFUtils.parseGridData(griddata), function(i, n) {
		var obj = {};
		var invcCdnId = $('#sysRefNo').val();
		obj.sysRefNo = invcCdnId + "" + cnt + "";
		obj.cntrctNo = n.cntrctNo;
		obj.cbkDt = getDate(new Date());
		obj.invCcy = n.invCcy;
		obj.trxId = invcCdnId;
		obj.invNo = n.invNo;
		obj.invId = n.sysRefNo;
		obj.invAmt = n.invAmt;
		obj.invBal = n.invBal;
		obj.invLoanAval = n.invLoanAval;
		obj.invCrnBal = n.invCrnBal;
		invCbk['rows' + i + ''] = obj;
		cnt = cnt + 1;
	});
	invCbk._total_rows = cnt;
	return invCbk;
}

function getCreditChangeData() {
	var cChange = {};// 添加额度变动表
	cChange._total_rows = 1;
	// var ttlCbkAmt = $('#ttlCbkAmt').numberbox('getValue');//融资金额

	var buyerId = $('#buyerId').val();

	var obj = {};
	obj.sysRefNo = $('#sysRefNo').val() + buyerId;
	obj.custNo = buyerId;
	obj.custNm = $('#buyerNm').val();
	obj.clType = 'O';
	obj.cntrctNo = $('#cntrctNo').val();
	obj.refNo = $('#sysRefNo').val();
	obj.trxCcy = $('#ccy').combobox('getValue');
	// obj.trxAmt = SCFUtils.Math(0,ttlCbkAmt,'sub');
	// obj.expTrxAmt = SCFUtils.Math(0,ttlCbkAmt,'sub');
	obj.tdType = 'R';
	obj.trxDate = getDate(new Date());
	cChange['rows0'] = obj;
	return cChange;
}

// 贷项清单应收账款查询
function loadTable(sysRefNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000112',
			trxId : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('invcCdnTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

// 修改一条数据
function editRow() {
	var row = $('#invcCdnTable').datagrid('getSelections');
	var selId = $('#selId').val();
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		row.selId = selId;
		var options = {
			title : '调整贷项清单金额',
			reqid : 'I_P_000152',
			height : 350,
			data : {
				'row' : row
			},
			onSuccess : editSuccess
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editSuccess(data) {
	var row = $('#invcCdnTable').datagrid('getSelected');
	var rowIndex = $('#invcCdnTable').datagrid('getRowIndex', row);
	$('#invcCdnTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			crnAmt : data.crnAmt,
			invBal : data.invBal,
			invLoanAval : data.invLoanAval,
		// invLoanAval : getNewInvLoanAval(row,data)
		}
	});
	var row = $('#invcCdnTable').datagrid('getSelections');//获取选中的行数
	var inv_No = $("#inv_No").val();// 贷项清单总额会不断累加，使用标识区分
	if (inv_No != data.invNo && row.length>1) {
		// var cnAmt = $("#cnAmt").numberbox('getValue');
		var cnAmt = 0;
		cnAmt = SCFUtils.Math(cnAmt, data.crnAmt, "add");// 贷项清单总额=累计冲销金额总和
		$("#cnAmt").numberbox('setValue', cnAmt);
		$("#inv_No").val(data.invNo);
	} else {
		$("#cnAmt").numberbox('setValue', data.crnAmt);
	}
	// sysTtlCrnAmt();
}

// 得到新的可融资余额
function getNewInvLoanAval(row, data) {
	var newInvBal = SCFUtils.Math(row.invBalHD, data.invCrnBal, 'sub');
	var invBal2Value = SCFUtils.Math(newInvBal, SCFUtils.Math(row.loanPerc,
			100, 'div'), 'mul');
	invBal2Value = SCFUtils.Math(invBal2Value, row.invLoanBal, 'sub');
	return invBal2Value;
}

// 计算贷项清单金额
/*
 * function sysTtlCrnAmt() { var griddata = SCFUtils.getGridData('invcCdnTable',
 * false); var datas = SCFUtils.parseGridData(griddata, false); if
 * (griddata._total_rows == 0) { } else { var cnAmt = 0; $.each(datas,
 * function(i, n) { if (n.crmAmt > 0.00) { cnAmt = SCFUtils.Math(cnAmt,
 * n.crmAmt, 'add'); } }); $('#"cnAmt"').numberbox('setValue', cnAmt); } }
 */

// 查询保单信息
/*
 * function queryInsure(cntrctNo) { var options = { url : SCFUtils.AJAXURL, data : {
 * queryId : 'Q_P_000424', cntrctNo : cntrctNo }, callBackFun : function(data) {
 * if (data.success && !SCFUtils.isEmpty(data.rows)) {
 * $('#collatCompNm').val(data.rows[0].collatCompNm); } } };
 * SCFUtils.ajax(options); }
 */

// 查询客户额度
function queryCust(sysRefNo) {
	var obj = {};
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(opt);
	return obj;
}

// 查询额度关联关系表
function queryCntrctSbrM(cntrctNo, buyerId) {
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000385',
			cntrctNo : cntrctNo,
			buyerId : buyerId
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
function onCheck(rowIndex, rowData) {
	var cnAmt = $("#cnAmt").numberbox('getValue');// 贷项清单总额
	cnAmt = SCFUtils.Math(cnAmt, rowData.crnAmt, "add");// 贷项清单总额=累计冲销金额总和
	$("#cnAmt").numberbox('setValue', cnAmt);

}

function onUncheck(rowIndex, rowData) {
	var cnAmt = $("#cnAmt").numberbox('getValue');
	cnAmt = SCFUtils.Math(cnAmt, rowData.crnAmt, "sub");
	$("#cnAmt").numberbox('setValue', cnAmt);

}

function onCheckAll(rows) {
	var cnAmt = 0;
	$.each(rows, function(i, obj) {
		//var rowIndex = $('#invcCdnTable').datagrid('getRowIndex', obj);
		cnAmt = SCFUtils.Math(cnAmt, obj.crnAmt, "add");
	});
	$("#cnAmt").numberbox('setValue', cnAmt);
}

function onUncheckAll(rows) {
	$("#cnAmt").numberbox('setValue', 0);
}

/* 冲销总额 */
function sumCrnAmt(rowData, flag) {
	var crnAmt = $('#crnAmt').numberbox('getValue');// 冲销金额
	crnAmt = SCFUtils.Math(crnAmt, 1, flag);
	$('#crnAmt').numberbox('setValue', regNo);
}

/* 冲销可融资金额 */
function sumTemptAmt(rowData, flag) {
	// 融资比例
	var billAmt = $('#loanperc').val();
	//var crnAmt = $('#crnAmt').numberbox('getValue');
	var docketAmt = SCFUtils.Math(regNo, billAmt, flag);
	$("#temp").numberbox('setValue', docketAmt);
}

function getTtlDatas() {
	var griddata = SCFUtils.getSelectedGridData('"invcCdnTable"', false);

	var crnAmt = 0;// 冲销金额
	//var loanperc = 0;// 融资比例
	//var temp = 0;// 冲销可融资金额
	if (griddata._total_rows == '0') {
		$('#crnAmt').numberbox('setValue', 0);
		$('#loanperc').numberbox('setValue', 0);
		$("#temp").numberbox('setValue', 0);
		return;
	}
	$.each(griddata, function(i, n) {
		if (i != '_total_rows') {
			// 冲销总额
			crnAmt = SCFUtils.Math(crnAmt, 1, 'add');
		}

	});
	$('#crnAmt').numberbox('setValue', crnAmt);

	// 冲销可融资金额
	var billAmt = $('#loanperc').val();
	//var crnAmt = $('#crnAmt').numberbox('getValue');
	var docketAmt = SCFUtils.Math(regNo, billAmt, 'mul');
	$("#temp").numberbox('setValue', docketAmt);

}
/**
 * 更新可融资余额
 * 
 * @param rowData
 * @param flag
 *            add||sub
 */
function updateInvLoanEbal(rowData, flag) {
	var arAvalLoan = $('#arAvalLoan').numberbox('getValue');// 可融资余额
	arAvalLoan = SCFUtils.Math(arAvalLoan, rowData.invLoanAval, flag);
	$('#arAvalLoan').numberbox('setValue', arAvalLoan);
}

// 验证发票是否退回处理
function checkInvCbk(invNo) {
	var flag = false;
	var options = {
		url : SCFUtils.AJAXURL,
		data : data = {
			queryId : 'Q_P_000410',
			invNo : invNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				flag = true;
			}
		}
	};
	SCFUtils.ajax(options);
	return flag;
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
function pageOnInt() {
	ajaxTable();
	ajaxBox();
	$('#pldDiv').hide();
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setComboReadonly('busiTp', true);
	SCFUtils.setComboReadonly('ccy', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setNumberboxReadonly('regAmt', true);
	SCFUtils.setNumberboxReadonly('currTransPayCost', true);
	SCFUtils.setNumberboxReadonly('arAvalLoan', true);
	SCFUtils.setNumberboxReadonly('regNo', true);
	SCFUtils.setTextReadonly('collatCompNm', true);
	SCFUtils.setTextReadonly('pldNm', true);
	SCFUtils.setTextReadonly('pawNm', true);
	SCFUtils.setTextReadonly('pldCnNo', true);
	SCFUtils.setNumberboxReadonly('pldPro', true);
	SCFUtils.setDateboxReadonly('lmtValidDt', true);
	SCFUtils.setDateboxReadonly('lmtDueDt', true);
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

function pageOnFPLoad(data) {
	pageOnReleasePageLoad(data);
	$('#invcMTable').datagrid('selectAll', true);// 在加载数据初始化时就将datagrid中的数据默认全勾选
	queryTransChgrtBillAmt();
	var options = $('#invcMTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
	lookSysRelReason();
}
function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	$('#pldDiv').hide();
	if (data.obj.busiTp == 7) {
		$('#pldNoHD').html('质押笔数：');
		$('#pldAmtHD').html('质押金额 ：');
		$('#pldDiv').show();
		$('#pldNm').val(data.obj.selNm);
		$('#pawNm').val(data.obj.bchNm);
		$('#pldCnNo').val(data.obj.cntrctNo);
		$('#lmtDueDt').datebox('setValue', data.obj.lmtDueDt);
		$('#lmtValidDt').datebox('setValue', data.obj.lmtValidDt);
		$('#trfFlg').val('2');
	} else {
		$('#pldValDt').datebox({
			required : false
		});
		$('#pldDueDt').datebox({
			required : false
		});
	}
	SCFUtils.loadForm('invcMForm', data);
	$('#arAvalLoanHD').val('0');

	$('#ccy').combobox('setValue', data.obj.lmtCcy);
	$('#sellerLmtSysRefNo').val(data.obj.lmtSysRefNo);//卖方额度流水号
	$('#arAvalLoan').numberbox('setValue', 0);
	var optionsGrid = $('#invcMTable').datagrid('options');
	optionsGrid.onCheck = onCheck;
	optionsGrid.onUncheck = onUncheck;
	optionsGrid.onCheckAll = onCheckAll;
	optionsGrid.onUncheckAll = onUncheckAll;

	// if ("FP" == SCFUtils.FUNCTYPE) {
	// loadTable();
	// } else {
	var options = {};
	options.data = {
		refName : 'TrfRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	queryBuyerInfo(data.obj.cntrctNo);
	lookSysRelReason();
}

// 质押起始日期
function changeValDt() {
	var lmtValidDt = $('#lmtValidDt').datebox('getValue');// 协议起始日期
	var pldValDt = $('#pldValDt').datebox('getValue'); // 质押起始日期
	var flag = false;
	if (SCFUtils.DateDiff(pldValDt, lmtValidDt) > 0) {
		flag = true;
	}
	return flag;
}

// 质押到期日
function changeDueDt() {
	var lmtDueDt = $('#lmtDueDt').datebox('getValue');// 协议到期日期
	// var lmtDueDtNew = SCFUtils.dateFormat(lmtDueDt,'yyyy-MM-dd');
	var pldValDt = $('#pldValDt').datebox('getValue'); // 质押起始日期
	var pldDueDt = $('#pldDueDt').datebox('getValue'); // 质押到期日期
	var flag = false;
	if (SCFUtils.DateDiff(pldDueDt, lmtDueDt) > 0) {
		flag = true;
	}
	if (SCFUtils.DateDiff(pldDueDt, pldValDt) < 0) {
		flag = true;
	}
	return flag;
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('invcMForm', data);
	var busiTp = $("#busiTp").combobox('getValue');
	if (busiTp == 7) {
		$('#pldDiv').show();
	}else{
		$('#pldValDt').datebox({
			required : false
		});
		$('#pldDueDt').datebox({
			required : false
		});
	}
	SCFUtils.loadGridData('invcMTable', SCFUtils.parseGridData(data.obj.invc),
			true);// 加载数据并保护表格。
	lookSysRelReason();

}
function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	// preStep++;
	SCFUtils.loadForm('invcMForm', data);
	if ("PM" === SCFUtils.FUNCTYPE || "FP" === SCFUtils.FUNCTYPE) {
		SCFUtils.loadGridData('invcMTable', SCFUtils
				.parseGridData(data.obj.invc), false);
	} else {
		var griddata = SCFUtils.getSelectedGridData("invcMTable", false);
		SCFUtils.loadGridData('invcMTable', SCFUtils
				.parseGridData(data.obj.invc), true);
	}
	var busiTp = $("#busiTp").combobox('getValue');
	if (busiTp == 7) {
		$('#pldDiv').show();
	}else{
		$('#pldValDt').datebox({
			required : false
		});
		$('#pldDueDt').datebox({
			required : false
		});
	}
	$("#invcMTable").datagrid("selectAll");
	var options = $('#invcMTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
	lookSysRelReason();
}

/**
 * 根据协议编号查询买方信息
 */
function queryBuyerInfo(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000555',
			cntrctNo : cntrctNo,
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

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	// $('#lmtValidDtHD').hide();
	SCFUtils.loadForm('invcMForm', row);
	$("#currTransPayCost").numberbox('setValue',relQueryFeeE()[0].currFinPayCost);
	$("#currTransCost").val(relQueryFeeE()[0].currFinCost);
	$("#feeSysRefNo").val(relQueryFeeE()[0].sysRefNo);
	var busiTp = $("#busiTp").combobox('getValue');
	if (busiTp == 7) {
		$('#pldDiv').show();
	}else{
		$('#pldValDt').datebox({
			required : false
		});
		$('#pldDueDt').datebox({
			required : false
		});
	}
	loadTableRe();
	getArAvalLoanRe();
	queryBuyerInfo(data.obj.cntrctNo);
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
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

/*
 * 复核时候查询LMT的E表
 */
/*function relQueryLmtE(lmtTp){
	var cntrctNo = $("#cntrctNo").val();
	//var selId= $("#selId").val();
	var sysLockBy =$("#sysRefNo").val(); 
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000651',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp,
			//selId :selId,
			sysLockBy:sysLockBy
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}*/

/*
 * 申请时候查询LMT的表
 */
/*function relQueryLmtM(lmtTp,buyerId){
	var cntrctNo = $("#cntrctNo").val(); 
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
}*/
/*
function getBuyerLmtData(buyerId){
	var buyerLmt = {};// 添加买方额度信息
	buyerLmt._total_rows = 1;
	var obj = {};
	var lmtTp = '0';
	if('RE'===SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE ){
		obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		obj.lmtBal = relQueryLmtE(lmtTp)[0].lmtBal ;//买方额度余额=原买方额度余额-转让金额
		obj.lmtAllocate = relQueryLmtE(lmtTp)[0].lmtAllocate ;//本次占用额度=原来占用额度+转让金额

	}else{
		if('FP'===SCFUtils.FUNCTYPE){
			obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		}else{
			obj.sysRefNo = $('#buyerLmtSysRefNo').val();
		}
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp,buyerId)[0].lmtBal,$('#regAmt').numberbox('getValue'),'sub') ;//买方额度余额=原买方额度余额-转让金额
		obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp,buyerId)[0].lmtAllocate,$('#regAmt').numberbox('getValue'),'add') ;//本次占用额度=原来占用额度+转让金额

	}
	obj.ttlAllocate = $('#buyerTtlAllocate').val();//已占用额度
	obj.theirRef = $('#sysRefNo').val();//
	
	buyerLmt['rows0'] = obj;
	return buyerLmt;

}*/

function queryBuyerLmt(cntrctNo, buyerId){
	   if(!SCFUtils.isEmpty(buyerId)){
		  var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000670',
					buyerId : buyerId,
					cntrctNo : cntrctNo
				},
				callBackFun : function(data1) {
					if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
						$('#buyerLmtSysRefNo').val(data1.rows[0].sysRefNo);//买方额度流水号
						$('#buyerLmtBal').val(data1.rows[0].lmtBal);//买方额度余额
						$('#buyerLmtBalHd').val(data1.rows[0].lmtBal);//买方额度余额
						if (SCFUtils.isEmpty(data1.rows[0].ttlAllocate)) {
							$('#buyerTtlAllocate').val(0);//买方占用额度
							$('#buyerTtlAllocateHd').val(0);
						}else{
							$('#buyerTtlAllocate').val(data1.rows[0].ttlAllocate);//买方占用额度
							$('#buyerTtlAllocateHd').val(data1.rows[0].ttlAllocate);
						}
						
					}
				}
			};
			SCFUtils.ajax(opt);
	    }
}

// 计算上一步操作次数
var preStep = 0;
function onNextBtnClick() {
	var data = SCFUtils.convertArray('invcMForm');
	var grid = {};
	var griddata = {};
	if ('PM' === SCFUtils.FUNCTYPE || 'FP' === SCFUtils.FUNCTYPE) {
		if (checkDataGrid()) {
			return;
		}
		var busiTp = $("#busiTp").combobox('getValue');
		if (busiTp == 7) {
			$('#pldDiv').show();
			if (changeValDt()) {
				SCFUtils.alert("质押起始日期不能大于协议起始日期！");
				return;
			}
			if (changeDueDt()) {
				SCFUtils.alert("质押到期日期不能大于协议到期日期且质押到期日期不能小于质押起始日期！");
				return;
			}

		}
		// 当上一步操作大于=1时，抓取表格下全行数据
		// if (preStep >= 1) {
		// griddata = SCFUtils.getGridData("invcMTable", false);
		// } else {
		griddata = SCFUtils.getSelectedGridData("invcMTable", false);
		// }
	} else {
		griddata = SCFUtils.getGridData("invcMTable", false);

	}
	var buyerId = '';
	$.each(SCFUtils.parseGridData(griddata), function(i, n) {
		buyerId = n.buyerId;
	});

	var cntrctNo = $('#cntrctNo').val();// 协议编号
	
	//var buyerLmt = queryBuyerLmt(cntrctNo, buyerId);// 买方额度编号
	
	var cntrctSbrM = queryCntrctSbrM(cntrctNo, buyerId);// 客户额度编号
	var regAmt = $('#regAmt').numberbox('getValue');// 待转让金额
	var buyerLmtBat = SCFUtils.Math(cntrctSbrM.buyerLmtBat, regAmt, 'sub');
	$('#buyerLmtBat').val(buyerLmtBat);

	var obj = queryBuyerLmtAmt(buyerId);
	var lmtBal = SCFUtils.Math(obj.lmtBal, regAmt, 'sub');
	$('#lmtBal').val(lmtBal);

	var lmtAllocate = SCFUtils.Math(obj.lmtAllocate, regAmt, 'add');
	$('#lmtAllocate').val(lmtAllocate);

	// 客户表相关信息
	var custInfo = queryCustInfo(buyerId);

	$.extend(data, {
		'custLmtAmt' : custInfo.lmtAmt, // 客户信息表_额度金额
		'cntrctSbrLmtAmt' : cntrctSbrM.buyerLmtAmt, // 额度关联信息表_额度金额

		"custLmtBal" : SCFUtils.Math(custInfo.lmtBal, regAmt, 'sub'),// 客户_额度余额
		// =
		// 原额度余额-本次占用金额(即：应收账款转让金额)
		"cntrctSbrLmtBal" : SCFUtils
				.Math(cntrctSbrM.buyerLmtBat, regAmt, 'sub'),// 额度关联信息_额度余额
		// =
		// 原额度余额-本次占用金额(即：应收账款转让金额)

		'custLmtAllocate' : SCFUtils.Math(custInfo.lmtAllocate, regAmt, 'add'), // 客户_占用额度
		// =
		// 原占用额度+应收账款转让金额
		'cntrctSbrLmtAllocate' : SCFUtils.Math(cntrctSbrM.lmtAllocate, regAmt,
				'add'), // 额度关联信息_占用额度
		// =
		// 原占用额度+应收账款转让金额

		'custLmtRecover' : custInfo.lmtRecover, // 客户_归还额度
		'cntrctSbrLmtRecover' : cntrctSbrM.lmtRecover, // 额度关联信息_归还额度

		"custLmtCcy" : custInfo.ccy,// 额度币别
		"cntrctSbrLmtCcy" : cntrctSbrM.lmtCcy,// 额度币别

		buyerId : buyerId,
		'cntrctSbrId' : cntrctSbrM.sysRefNo,
		buyerLmtBat : buyerLmtBat,
		lmtBal : lmtBal,
		lmtAllocate : lmtAllocate,
		confirmFlag:1 
	});

	grid.invc = SCFUtils.json2str(griddata);
	//打包买方额度数据
	//grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData(buyerId));
	//打包卖方额度数据
	//grid.sellerLmt = SCFUtils.json2str(getSellerData());
	
	grid.fee = SCFUtils.json2str(getFeeData());//打包费用表data
	$.extend(data, grid);
	return data;
}
// 判断是否被选中事件
function defineDataGridEvent() {
	$('#accetpFlag').val("false");
	var options = $('#invcMTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
}
function ajaxBox() {
	var data = [ {
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
	var isCollect = [ {
		"id" : 'Y',
		"text" : "是"
	}, {
		"id" : 'N',
		"text" : "否"
	} ];
	$("#isCollect").combobox('loadData', isCollect);
	$("#isCollect").combobox('setValue', "Y");

	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);
}

function querySelAcNo(data) {
	var acOwnerid = data.obj.selId;
	if (!SCFUtils.isEmpty(acOwnerid)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000105',
				acOwnerid : acOwnerid
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					// 卖方账号，开户行，账号户名
					// $('#selId').val(data.rows[0].acOwnerid);
					$('#selAcNo').val(data.rows[0].acNo);
					$('#selAcNm').val(data.rows[0].acNm);
					$('#selAcBkNm').val(data.rows[0].acBkNm);
				}
			}
		};
		SCFUtils.ajax(optt);
	}
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function checkDataGrid() {
	var flag = false;
	var regAmt = $('#regAmt').val();
	var data = $('#invcMTable').datagrid('getData');
	if (data.total == 0) {
		SCFUtils.alert('请添加应收账款！');
		flag = true;
	}
	if (regAmt == 0) {
		SCFUtils.alert('请选择一笔发票进行转让！');
		flag = true;
	}
	
	return flag;
}
function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		// singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '发票流水号',
			width : '7.69%'
		}, {
			field : 'buyerId',
			title : '间接客户编号',
			width : '7.69%'
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : '7.69%'
		}, {
			field : 'invNo',
			title : '应收账款凭证编号',
			width : '7.69%'
		}, {
			field : 'invCcy',
			title : '币种',
			width : '7.69%',
			formatter : ccyFormater
		}, {
			field : 'invAmt',
			title : '应收账款金额',
			width : '7.69%',
		}, {
			field : 'acctAmt',
			title : '预付款金额',
			width : '7.14%',
			hidden : true
		}, {
			field : 'invBal',
			title : '应收账款净额',
			width : '7.69%',
		}, {
			field : 'invDt',
			title : '应收账款开立日期',
			width : '7.69%',
			formatter : dateFormater
		}, {
			field : 'invValDt',
			title : '应收账款起算日',
			width : '7.69%',
			formatter : dateFormater
		}, {
			field : 'invDueDt',
			title : '到期日',
			width : '7.69%',
			formatter : dateFormater
		}, {
			field : 'acctPeriod',
			title : '账期',
			width : '7.69%'
		}, {
			field : 'cntrctNo',
			title : '协议号',
			width : 70,
			hidden : true
		}, {
			field : 'batchNo',
			title : '转让批次',
			width : 70,
			hidden : true
		}, {
			field : 'busiTp',
			title : '业务类别',
			width : 70,
			hidden : true
		}, {
			field : 'invSts',
			title : '发票状态',
			width : 70,
			hidden : true
		}, {
			field : 'loanPerc',
			title : '融资比例(%)',
			width : '7.69%'
		}, {
			field : 'invLoanAval',
			title : '可融资余额',
			width : '7.69%'
		} ] ]
	};
	$('#invcMTable').datagrid(options);
}

// 检查发票编号是否重复
function getInvNo() {
	var invNoList = [];
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (datas.length > 0) {
		$.each(datas, function(i, m) {
			invNoList.push(m.invNo);
		});
	}

	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000032'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, m) {
					invNoList.push(m.invNo);
				});
			}
		}
	};
	SCFUtils.ajax(options);
	return invNoList;
}

// 判断a数组是否包含obj元素
function contains(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}
// 返回该数组的索引
function getArrIndex(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return i;
		}
	}
	return -1;
}
function loadTable() {
	if (SCFUtils.CURRENTPAGE == '1'
			&& ('PM' == SCFUtils.FUNCTYPE || 'FP' == SCFUtils.FUNCTYPE)) {
		var cntrctNo = $('#cntrctNo').val();// 协议编号
		var selId = $('#selId').val();// 卖方ID
		$('#invcMTable').datagrid('clearChecked');// 清除选中
		var data = SCFUtils.convertArray("invcMForm");// 表单json值赋给data
		if (data) {
			var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000691',// 应收账款额度信息查询
					cntrctNo : cntrctNo,
					selId : selId,
					ccy : $('#ccy').combobox('getValue'),
					cacheType : 'non'
				},
				callBackFun : function(data) {
					if (data.success) {
						if (!SCFUtils.isEmpty(data.rows)) {
							$.each(data.rows, function(i, n) {
								var invBal = n.invBal;
								var loanPerc = n.loanPerc;
								var invLoanAval = SCFUtils.Math(invBal,
										loanPerc, 'mul');
								invLoanAval = SCFUtils.Math(invLoanAval, 0.01,
										'mul');
								$.extend(n, {
									invLoanAval : invLoanAval,
									cntrctNo : cntrctNo,
									invSts : '2',
									batchNo : $('#sysRefNo').val(),
									busiTp : $('#busiTp').val()

								});
							});
							SCFUtils.loadGridData('invcMTable', data.rows,
									false, true);
							// forEach(data.rows);
							// loadGridData(data, flag);
						} else {

							SCFUtils.alert("没有符合的应收账款");
						}
					} else {
						SCFUtils.alert("查询失败");
					}
				},
			};

			if('FP' == SCFUtils.FUNCTYPE){
				$.extend(options.data,{
					queryId : 'Q_P_000692',
					sysLockFlag : 'T',
					sysLockBy : $('#sysRefNo').val()
				});
			}
		}
		SCFUtils.ajax(options);
	}
}

function loadTableRe() {
	var batchNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000721',// 应收账款额度信息查询
			batchNo : batchNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					SCFUtils.loadGridData('invcMTable', data.rows, false, true);
				} else {
					SCFUtils.alert("没有符合的应收账款");
				}
			} else {
				SCFUtils.alert("查询失败");
			}
		},
	};
	SCFUtils.ajax(options);
}

function onCheck(rowIndex, rowData) {

	rowData.ck = true;// 勾选列表

	sumRegNo(rowData, 'add');
	sumRegAmt(rowData, 'add');// 汇总待转让金额
	sumDocketAmt(rowData, 'mul');
	sumPdgAmt(rowData, 'mul');
	updateGridRow(rowIndex, rowData);
	updateInvLoanEbal(rowData, 'add');

}
function onUncheck(rowIndex, rowData) {
	rowData.ck = false;
	sumRegNo(rowData, 'sub');
	sumRegAmt(rowData, 'sub');// 汇总待转让金额
	sumDocketAmt(rowData, 'mul');
	sumPdgAmt(rowData, 'mul');
	updateGridRow(rowIndex, rowData);
	updateInvLoanEbal(rowData, 'sub');

}
function onCheckAll(rows) {
	getTtlDatas();
}
function onUncheckAll(rows) {
	getTtlDatas();
	// 全不选质押财产归零
	$('#pldPro').numberbox('setValue', '0');
}
function getArAvalLoanRe() {
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var arAvalLoan = 0;// 可融资余额
	$.each(griddata, function(i, n) {
		if (i != '_total_rows') {
			// 可融资余额
			arAvalLoan = SCFUtils.Math(arAvalLoan, n.invLoanAval, 'add');

		}
	});
	$("#arAvalLoan").numberbox('setValue', arAvalLoan);
}

function getTtlDatas() {
	var griddata = SCFUtils.getSelectedGridData('invcMTable', false);

	var regNo = 0;// 转让笔数
	var regAmt = 0;// 待转让金额
	var currTransPayCost = 0;// 处理费
	var arAvalLoan = $('#arAvalLoanHD').val();// 可融资余额
	if (griddata._total_rows == '0') {
		$('#regNo').numberbox('setValue', 0);
		$('#regAmt').numberbox('setValue', 0);
		$("#currTransPayCost").numberbox('setValue', 0);
		$("#currTransCost").val(0);
		$("#arAvalLoan").numberbox('setValue', $('#arAvalLoanHD').val());
		return;
	}
	var billAmt = $('#billAmt').val();// 获取发票金额
	$.each(griddata, function(i, n) {
		if (i != '_total_rows') {
			// 转让笔数
			regNo = SCFUtils.Math(regNo, 1, 'add');

			// 待转让金额
			regAmt = SCFUtils.Math(regAmt, n.invBal, 'add');

			// 处理费

			currTransPayCost = SCFUtils.Math(currTransPayCost, billAmt, 'add');

			// 可融资余额
			arAvalLoan = SCFUtils.Math(arAvalLoan, n.invLoanAval, 'add');

		}

	});
	$('#regNo').numberbox('setValue', regNo);
	$('#regAmt').numberbox('setValue', regAmt);
	// 质押财产等于质押金额
	var busiTp = $("#busiTp").combobox('getValue');
	if (busiTp == 7) {
		$('#pldPro').numberbox('setValue', regAmt);
	}
	$("#currTransCost").val(currTransPayCost);
	$('#arAvalLoan').numberbox('setValue', arAvalLoan);
	
	if (isCollect == 'Y') {// 收取
		// 实收的应收账款处理费
		$("#currTransPayCost").numberbox('setValue', currTransPayCost);
	}else{
		$("#currTransPayCost").numberbox('setValue', 0);
	}

}

function updateGridRow(rowIndex, rowData) {
	$('#invcMTable').datagrid('refreshRow', rowIndex
	// {
	// index:rowIndex
	// ,row:rowData
	// }
	);
}
/* 手续费 */
function sumPdgAmt(rowData, flag) {
//	var transChgrt = $('#transChgrt').val();
//	var regAmt = $('#regAmt').numberbox('getValue');// 应收净值
//	var pdgAmt = SCFUtils.Math(regAmt, transChgrt, flag);
//	pdgAmt = SCFUtils.Math(pdgAmt, 0.01, flag);
//	$("#pdgAmt").numberbox('setValue', pdgAmt);
}
/* 应收账款处理费 */
function sumDocketAmt(rowData, flag) {
	var billAmt = $('#billAmt').val();
	var regNo = $('#regNo').numberbox('getValue');
	var currTransPayCost = SCFUtils.Math(regNo, billAmt, flag);
	$("#currTransCost").val(currTransPayCost);
	if($("#isCollect").combobox("getValue") == 'Y'){//收取手续费
		$("#currTransPayCost").numberbox('setValue', currTransPayCost);
	}
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
/* 待转让笔数 */
function sumRegNo(rowData, flag) {
	var regNo = $('#regNo').numberbox('getValue');// 应收净值
	regNo = SCFUtils.Math(regNo, 1, flag);
	$('#regNo').numberbox('setValue', regNo);
}
/**
 * sum grid int_amt 待转让金额
 * 
 * @param rowData
 * @param flag
 */
function sumRegAmt(rowData, flag) {
	var regAmt = $('#regAmt').numberbox('getValue');// 应收净值
	regAmt = SCFUtils.Math(regAmt, rowData.invBal, flag);
	$('#regAmt').numberbox('setValue', regAmt);
	// 质押财产等于质押金额
	var busiTp = $("#busiTp").combobox('getValue');
	if (busiTp == 7) {
		$('#pldPro').numberbox('setValue', regAmt);
	}
}

// 加载网格数据
function loadGridData(data, flag1, flag2) {
	SCFUtils.loadGridData('invcMTable', data, flag1, flag2);
}



// 查询买方额度
function queryBuyerLmtAmt(sysRefNo) {
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000340',
			sysRefNo : sysRefNo
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

// 金额计算
function getAmt(data) {
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (data.type == "ADD") {
		var regAmt = 0; // 累计金额
		var regNo = datas.length + 1; // 转让笔数
		var billAmt = $('#billAmt').val();
		var currTransPayCost = SCFUtils.Math(regNo, billAmt, 'mul');
		$("#currTransPayCost").numberbox('setValue', currTransPayCost);
		$('#regNo').numberbox('setValue', regNo);
	}
	if (!SCFUtils.isEmpty(datas)) {
		$.each(datas, function(i, n) {
			regAmt = SCFUtils.Math(regAmt, n.invBal, 'add');
		});
		if (data.type == "ADD")
			regAmt = SCFUtils.Math(regAmt, data.invBal, 'add');
	} else {
		regAmt = data.invBal;
	}
	$("#regAmt").numberbox('setValue', regAmt);
	if (data.type == "ADD") {
		$('#loanPerc').val(data.loanPerc); // 融资比例
		$('#dueDt').datebox('setValue', data.dueDt);// 逾期日期
	}
}

// 处理费手续费计算
function getProcPag(n) {
	// var cntrctAmt = queryAmt();//额度信息
	var isCollect = $('#isCollect').combobox('getValue');
	var transChgrt = $('#transChgrt').val();
	var loanTranAmt = SCFUtils.Math(n.invBal, transChgrt, 'mul');
	loanTranAmt = SCFUtils.Math(loanTranAmt, 100, 'div');
	var billAmt = $('#billAmt').val();
	var loanBillAmt = billAmt;
	if (isCollect == 'Y') {
		// 处理费，手续费插入发票表
		var payTranAmt = SCFUtils.Math(n.invBal, transChgrt, 'mul');
		payTranAmt = SCFUtils.Math(payTranAmt, 100, 'div');
		var payBillAmt = billAmt;
	} else {
		var payTranAmt = 0;
		var payBillAmt = 0;
	}
	if (n.type == "ADD") {
		$('#invcMTable').datagrid('updateRow', {
			index : n.index,
			row : {
				loanTranAmt : loanTranAmt,
				payTranAmt : payTranAmt,
				loanBillAmt : loanBillAmt,
				payBillAmt : payBillAmt
			}
		});
		// n.index++;
	} else if (n.type == "UPLOAD") {
		// 查询额度关联，融资比例,赊销 款限期，计算融资余额，逾期日期。
		var obj = queryCntrctSbrM(n.cntrctNo, n.buyerId);
		var openactGraceDay = obj.openactGraceDay;
		var loanPerc = obj.loanPct;
		var invLoanAval = SCFUtils.Math(n.invBal, loanPerc, "mul");
		invLoanAval = SCFUtils.Math(invLoanAval, 100, "div");
		var invDueDt = SCFUtils.dateFormat(n.invDueDt);
		var dueDt = SCFUtils.FormatDate(invDueDt, openactGraceDay);
		$.extend(n, {
			loanPerc : loanPerc,
			invLoanAval : invLoanAval,
			dueDt : dueDt,
			selId : $('#selId').val(),
			busiTp : $('#busiTp').val(),
			loanBalAmt : 0,
			loanTranAmt : loanTranAmt,
			payTranAmt : payTranAmt,
			loanBillAmt : loanBillAmt,
			payBillAmt : payBillAmt
		});
	}
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

/*
 * FP时候查询cntrctM表从中带出TransChgrt字段和BillAmt字段的值。 用于手续费和应收账款处理费金额的计算
 */
function queryTransChgrtBillAmt() {
	var sysRefNo = $("#cntrctNo").val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000603',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$("#billAmt").val(data.rows[0].billAmt);
				$("#transChgrt").val(data.rows[0].transChgrt);
			}
		}
	};
	SCFUtils.ajax(options);
}

/*
 * 当是否收取费用下拉框改变时触发
 * isCollect = 0，收取，情况table的勾选
 * isCollect = 1，不收取，设置 应收账款处理费=0；手续费=0；
 */
function changeIsCollect(){
	var isCollect = $("#isCollect").combobox("getValue");
	if(isCollect == 'Y'){
		$('#invcMTable').datagrid('clearChecked');
//		$("#pdgAmt").numberbox("setValue",0);
		$("#currTransPayCost").numberbox("setValue",0);
	}else{
//		$("#pdgAmt").numberbox("setValue",0);
		$("#currTransPayCost").numberbox("setValue",0);
	}
}

/*
*  给FEE_M表插入打包数据
*/
function getFeeData() {
	var fee = {};// 添加费用表
	fee._total_rows = 1;//total_rows不给值会默认没有数据，一笔转让只有一条记录
	//生成fee的流水号，feeSysRefNo
	var options = {};
	var trxDt;
	if('PM' === SCFUtils.FUNCTYPE){
		options.data = {
				refName : 'FeeRef',
				refField : 'feeSysRefNo'
		};
		SCFUtils.getRefNo(options);
		trxDt = SCFUtils.getcurrentdate();
	}else{
		trxDt = relQueryFeeE()[0].trxDt;
	}
	if($("#isCollect").combobox('getValue')=='Y'){//收取处理费
		var costPayFlg = 1;  //1.应收已收 (是否收取手续费选择 是)
	}else{
		var costPayFlg = 0;  //0.应收未收 (是否收取手续费选择 否)
	}
		var obj = {};
			obj.sysRefNo = $('#feeSysRefNo').val();//PM的时候新增，RE.FP.DP都是带过来的值
			obj.trxDt = trxDt;// trxDt = 当前日期
			obj.currFinPayDt = trxDt;//收费日期
			obj.selId = $("#selId").val();//得到当前页面的selId
			obj.busiTp = $("#busiTp").combobox("getValue");
			obj.costTp = 1;   //0.融资手续费    1.应收账款处理费
			obj.costCcy = $('#ccy').combobox("getValue");
			obj.costPayFlg = costPayFlg;
			obj.theirRef = $("#sysRefNo").val();
			obj.costItem = 1;  //0.手续费   1.应收账款处理费
//			obj.currTransCost = $("#currTransCost").val();//本次应收处理费
//			obj.currTransPayCost = $("#currTransPayCost").numberbox('getValue');//本次实收处理费
			obj.currFinCost = $("#currTransCost").val();//本次应收处理费
			obj.currFinPayCost = $("#currTransPayCost").numberbox('getValue');//本次实收处理费
			obj.costAmt = $("#currTransPayCost").numberbox('getValue');//总费用金额

		fee['rows0'] = obj;
	return fee;
}
/*
 * 复核时候查询FEE的E表（catalog双表查询有冲突）
 */
function relQueryFeeE(){
	var selId = $("#selId").val();
	var sysRefNo = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000694',
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
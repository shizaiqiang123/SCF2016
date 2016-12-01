/**
 * -------------------------
 * 预付类-融资申请 
 * @author hyy 2015-1-16
 * -------------------------
 */

/**
 * 所有进入交易页面 公共的方法
 * 
 * @param data
 */
// var totalLoanAmt = 0.0000;
function pageOnInt() {
	SCFUtils.setNumberboxReadonly('marginAmt', true);
	ajaxBox();// 加载下拉列表
	ajaxTable();// 加载表格
	ajaxBillTable();
	setFormReadonly();// 设置表单保护
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
/**
 * 申请功能时，Next进入交易页面
 * 
 * @param data
 */
function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	loadForm(data); // 加载表单数据
	// $('#cntrctRefNo').val(data.obj.cntSysRefNo);
	$('#selLmtBal').val(data.obj.lmtBal);
	$('#selLmtAvl').val(data.obj.lmtAllocate);
	$('#selLmtBalHD').val(data.obj.lmtBal);// 用来判断额度是否足够 占用后不修改其值
	// $("#marginAmt").numberbox('setValue',SCFUtils.Math(data.obj.lmtBal,$('#initMarginPct').numberspinner('getValue')/100,'mul'))
	$('#selLmtAvlHD').val(data.obj.lmtAllocate);// 用来判断额度是否足够 占用后不修改其值
	$('#selLmtDueDt').val(data.obj.lmtDueDt);
	$('#buyerId').val(data.obj.buyerId);
	$('#selId').val(data.obj.selId);
	$('#ccy').combobox('setValue', data.obj.lmtCcy);
	$('#sellerLmtSysRefNo').val(data.obj.lmtSysRefNo);//卖方额度流水号
	$('#initMarginPct').numberspinner('setValue',data.obj.initGartPct);
	var options = {};
	options.data = {
		refName : 'LoanRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	lookSysRelReason();
}

function getBuyerLmt(datas) {
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000375',
			sysRefNo : datas,
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
 * 申请功能时，进入结果页面
 * 
 * @param data
 */
function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('loanForm', data);
	SCFUtils.loadGridData('collateralTable', SCFUtils
			.parseGridData(data.obj.loanCollateralMList), true);
	if (data.obj.loanTp == '3') {
		SCFUtils.loadGridData('billTable', SCFUtils
				.parseGridData(data.obj.bill), true);
	} else {
		$('#BillInfoDiv').hide();
	}
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
	SCFUtils.loadForm('loanForm', data);
	if (data.obj.loanTp == '3') {
		SCFUtils.loadGridData('collateralTable', SCFUtils
				.parseGridData(data.obj.loanCollateralMList), false);
		SCFUtils.loadGridData('billTable', SCFUtils
				.parseGridData(data.obj.bill), false);
	} else {
		SCFUtils.loadGridData('collateralTable', SCFUtils
				.parseGridData(data.obj.loanCollateralMList), false);
		$('#BillInfoDiv').hide();
	}
	if(SCFUtils.FUNCTYPE == 'FP'){
		$('#ttlLoanAmt').numberbox('setValue', 0);
		$('#marginAmt').numberbox('setValue', 0);
	}
	// $('#ttlLoanAmt').numberbox('setValue', 0);
	// $('#marginAmt').numberbox('setValue', 0);
	$('#payBailAcnoCheck').val('0');// 账户校验标志
	$('#collateralTable').datagrid('selectAll');
	lookSysRelReason();
}

/**
 * 复合功能时，进入结果汇总页面
 * 
 * @param data
 */
function pageOnReleaseResultLoad(data) {
	loadForm(data); // 加载表单数据
	ajaxPoM(data.obj.sysRefNo);// 加载订单信息
	if (data.obj.loanTp == '3') {
		ajaxBillM(data.obj.sysRefNo);
	} else {
		$('#BillInfoDiv').hide();
	}
	SCFUtils.loadGridData('collateralTable', SCFUtils
			.parseGridData(data.obj.loanCollateralMList), true);
	SCFUtils.loadGridData('billTable', SCFUtils.parseGridData(data.obj.bill),
			true);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnFPLoad(data) {
	pageOnReleasePageLoad(data);
	getBuyerLmt(data.obj.buyerId);
	$('#selLmtBalHD').val(data.obj.selLmtBal);// 用来判断额度是否足够 占用后不修改其值
	// $('#collateralTable').datagrid('selectAll', true);//
	// 在加载数据初始化时就将datagrid中的数据默认全勾选
	// $('#billTable').datagrid('selectAll', true);//
	// 在加载数据初始化时就将datagrid中的数据默认全勾选
	$('#payBailAcnoCheck').val('0');// 账户校验标志
	$('#collateralTable').datagrid('selectAll');
	$('#billTable').datagrid('selectAll');
	lookSysRelReason();
}

function ajaxBillM(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000378',
			sysRefNo : data,
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				// SCFUtils.loadGridData('billTable', data,false,true);
				SCFUtils.loadGridData('billTable', data.rows);
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
	if ('FP' != SCFUtils.FUNCTYPE) {
		loadForm(row); // 加载表单数据
	} else {
		loadForm(row);
		$('#ttlLoanAmt').numberbox('setValue', '0');
	}
	$('#initMarginPct').numberspinner('setValue',data.obj.initMarginPct);
	$('#marginAmt').numberbox('setValue',data.obj.marginAmt);
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
	ajaxPoM(data.obj.sysRefNo);// 加载订单信息
	if (data.obj.loanTp == '3') {
		ajaxBillM(data.obj.sysRefNo);
	} else {
		$('#BillInfoDiv').hide();
	}
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
	loadForm(data); // 加载表单数据
	if (data.obj.loanTp == '3') {
		SCFUtils.loadGridData('billTable', SCFUtils
				.parseGridData(data.obj.bill), true);
	} else {
		$('#BillInfoDiv').hide();
	}

	SCFUtils.loadGridData('collateralTable', SCFUtils
			.parseGridData(data.obj.loanCollateralMList), true);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

// ==========================================

/**
 * 加载下拉列表
 */
function ajaxBox() {
	var data = [ {
		"id" : '0',
		"text" : "国内有追索权保理",
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '2',
		"text" : "先票款后货"
	} ];
	$("#busiTp").combobox('loadData', data);
	// var loanTp = [{"id":'1',"text":"保理预付款"},{"id":'2',"text":"保理授信"}];
	var loanTp = [ {
		"id" : '3',
		"text" : "银承"
	}, {
		"id" : '4',
		"text" : "流贷"
	} ];
	$("#loanTp").combobox('loadData', loanTp);

	// 加载币种
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

function changeLoanTp() {
	// 现在订单信息子表不需要根据融资支付方式的变化而清空已选择的订单信息
	// SCFUtils.loadGridData('collateralTable', [], false, true);
	$("#collateralTable").datagrid("loadAllData", []);
	SCFUtils.loadGridData('billTable', [], false, true);
	if ($('#loanTp').combobox('getValue') == '4') {
		$('#BillInfoDiv').hide();
		/*$('#marginAmt').numberbox({
			required : false,
			readonly : true
		});*/
	} else {
		$('#BillInfoDiv').show();
		/*$('#marginAmt').numberbox({
			required : true,
			readonly : true
		});*/
	}
}

/**
 * 加载商品信息表格
 */
function ajaxTable() {
	// totalLoanAmt = 0.0000;
	var options = {
		toolbar : '#toolbar',
		idField : 'sysRefNo', // 指明商品编号是标识字段。
		rownumbers : true,// 显示行号
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		onCheck : function(rowIndex, rowData) {
			onCheck(rowIndex, rowData);
		},
		onUncheck : function(rowIndex, rowData) {
			onUnCheck(rowIndex, rowData);
		},
		onCheckAll : function(rows) {
			onCheckAll(rows);
		},
		onUncheckAll : function(rows) {
			onUnCheckAll(rows);
		},
		/*
		 * onClickRow : function(index, row) { onClickRow(index, row); },
		 * onDblClickRow : function(index, row) { onClickRow(index, row); },
		 */
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'selId',
			title : 'selId',
			width : 100,
			hidden : true
		}, {
			field : 'buyerId',
			title : 'buyerId',
			width : 100,
			hidden : true
		}, {
			field : 'loanId',
			title : 'loanId',
			width : 100,
			hidden : true
		}, {
			field : 'cntrctNo',
			title : 'cntrctNo',
			width : 100,
			hidden : true
		}, {
			field : 'sysRefNo',
			title : '订单关联表',
			width : 100,
			hidden : true
		}, {
			field : 'refNo',
			title : '订单编号',
			width : 100,
			hidden : true
		}, {
			field : 'poNumUsed',
			title : '已融资数量',
			width : 100,
			hidden : true
		}, {
			field : 'poNumUseable',
			title : '可融资数量',
			width : 100,
			hidden : true
		}, {
			field : 'goodsCata',
			title : '商品大类',
			width : '11.11%'
		}, {
			field : 'subCata',
			title : '商品子类',
			width : '11.11%'
		}, {
			field : 'goodsNm',
			title : '商品名称',
			width : '11.11%'
		}, {
			field : 'goodsId',
			title : '商品ID',
			width : '11.11%'
		}, {
			field : 'unit',
			title : '单位',
			width : '11.11%'
		}, {
			field : 'producer',
			title : '生产厂商',
			width : 100,
			hidden : true
		}, {
			field : 'ccy',
			title : '币别',
			width : '11.11%'
		}, {
			field : 'price',
			title : '单价',
			width : '11.11%',
			formatter : ccyFormater
		}, {
			field : 'poLoanAmt',
			title : '融资金额',
			width : '11.11%',
			formatter : ccyFormater
		}, {
			field : 'poLoanNum',
			title : '融资数量',
			width : '11.11%'
		} ] ]
	};
	$('#collateralTable').datagrid(options);
}

var checkArray = [];

function onCheck(rowIndex, rowData) {
	if ('FP' == SCFUtils.FUNCTYPE) {
		var totalLoanAmt = $('#ttlLoanAmt').numberbox('getValue');
		var cntrct=queryCntrctInfo($('#cntrctNo').val());
		var pldPerc  = SCFUtils.Math(cntrct.pldPerc, 100, 'div');
		totalLoanAmt = SCFUtils.Math(totalLoanAmt, rowData.poLoanAmt, 'add');
		totalLoanAmt = SCFUtils.Math(totalLoanAmt, pldPerc, 'mul');
		$('#ttlLoanAmt').numberbox('setValue', totalLoanAmt);

		checkArray.push(rowData.sysRefNo);
	} else {
		return;
	}
}

function onUnCheck(rowIndex, rowData) {
	if ('FP' == SCFUtils.FUNCTYPE) {
		var totalLoanAmt = $('#ttlLoanAmt').numberbox('getValue');
		var cntrct=queryCntrctInfo($('#cntrctNo').val());
		var pldPerc  = SCFUtils.Math(cntrct.pldPerc, 100, 'div');
		totalLoanAmt = SCFUtils.Math(totalLoanAmt, pldPerc, 'div');
		totalLoanAmt = SCFUtils.Math(totalLoanAmt, rowData.poLoanAmt, 'sub');
		$('#ttlLoanAmt').numberbox('setValue', totalLoanAmt);

		checkArray = delCheck(checkArray, rowData.sysRefNo);
	} else {
		return;
	}
}

// 判断是否包含在数组中
function contains(a, obj) {
	for ( var i in a) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}

// 删除数组中的值
function delCheck(a, obj) {
	var arr = a;
	for ( var i in a) {
		if (a[i] === obj) {
			delete arr[i];
		}
	}
	return arr;
}

function onCheckAll(rows) {
	if ('FP' == SCFUtils.FUNCTYPE) {
		$.each(rows, function(i, n) {
			if (!contains(checkArray, n.sysRefNo)) {
				onCheck(i, n);
			}
		});
	} else {
		return;
	}
}

function onUnCheckAll(rows) {
	if ('FP' == SCFUtils.FUNCTYPE) {
		$.each(rows, function(i, n) {
			if (contains(checkArray, n.sysRefNo)) {
				onUnCheck(i, n);
			}
		});
	} else {
		return;
	}
}
/**
 * 设置只读字段
 */
function setFormReadonly() {
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setTextReadonly('buyerNm', true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("ccy", true);
	SCFUtils.setNumberboxReadonly("ttlLoanAmt", true);
	SCFUtils.setNumberspinnerReadonly("initMarginPct", true);
	SCFUtils.setNumberboxReadonly("marginAmt", true);
}

/**
 * 加载表单数据，获取流水号
 * 
 * @param data
 */
function loadForm(data) {
	SCFUtils.loadForm('loanForm', data);
}

function ajaxBillTable() {
	var options = {
		toolbar : '#toolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'k',
			checkbox : true
		}, {
			field : 'billNo',
			title : '票号',
			width : '16.66%'
		}, {
			field : 'billAmt',
			title : '出票金额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'billValDt',
			title : '起始日',
			width : '16.66%',
			formatter : dateFormater
		}, {
			field : 'billDueDt',
			title : '到期日',
			width : '16.66%',
			formatter : dateFormater
		}, {
			field : 'billRecp',
			title : '收票人',
			width : '16.66%'
		}, {
			field : 'billRecpAcno',
			title : '收票人账号',
			width : '16.66%',
		}, {
			field : 'billBal',
			title : '票据余额',
			width : 110,
			hidden : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			width : 110,
			hidden : true
		}, {
			field : 'loanId',
			title : '融资编号',
			width : 110,
			hidden : true
		}, {
			field : 'cntrctNo',
			title : '授信额度编号',
			width : 110,
			hidden : true
		} ] ]
	};
	$('#billTable').datagrid(options);
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
	$('#buyerId').focus();
}

function addPoRow() {
	var data = SCFUtils.convertArray("loanForm");
	// 添加前验证表单是否完整
	if (data) {

		var row = {};
		var collateralData = $("#collateralTable").datagrid('getAllData');
		row.trxId = $('#sysRefNo').val();
		row.cntrctNo = $('#cntrctNo').val();
		row.selId = $('#selId').val();
		row.buyerId = $('#buyerId').val();
		row.collateralData = collateralData;
		row.op = 'add';
		var options = {
			title : '添加货物信息',
			height : '600',
			reqid : 'I_P_000192',
			data : {
				'row' : row
			},
			onSuccess : addPoRowSuccess
		};
		SCFUtils.getData(options);

	}

}

function addPoRowSuccess(data) {
	// var ttlLoanAmt = SCFUtils.Math($('#ttlLoanAmt').numberbox('getValue'),
	// data.poLoanAmt, 'add');
	// $('#ttlLoanAmt').numberbox('setValue',ttlLoanAmt) pldPerc
	$('#collateralTable').datagrid('appendRow', data);
	// 修改在途时添加商品信息就不给融资金额赋值
	if ('FP' != SCFUtils.FUNCTYPE) {
		$('#ttlLoanAmt').numberbox('setValue', calcTtlLoanAmt());
	}
	$('#buyerId').focus();
}

function calcTtlLoanAmt() {
	var collateralData = $("#collateralTable").datagrid('getAllData');
	var ttLoanAmt = 0;
	var pldPerc  = SCFUtils.Math($('#pldPerc').val(), 100, 'div');
	
	if ('FP' == SCFUtils.FUNCTYPE){
		collateralData = $('#collateralTable').datagrid('getSelections');
		ttLoanAmt = collateralData[0].poLoanAmt;
		return ttLoanAmt;
	}
	for (var i = 0; i < collateralData.total; i++) {
		ttLoanAmt = SCFUtils.Math(ttLoanAmt, collateralData.rows[i].poLoanAmt,
				'add');
	}
	ttLoanAmt = SCFUtils.Math(ttLoanAmt, pldPerc, 'mul');
	return ttLoanAmt;
}

// 删除一条数据
function deletePoRow() {
	var rows = $('#collateralTable').datagrid('getSelections');
	var loanAmtCount = 0;
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		loanAmtCount += rows[j].poLoanAmt;
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#collateralTable').datagrid(
							'getAllRowIndex', copyRows[i].sysRefNo);
					$('#collateralTable').datagrid('deleteRow', index);
				}
				$('#ttlLoanAmt').numberbox(
						'setValue',
						SCFUtils.Math($('#ttlLoanAmt').numberbox('getValue'),
								loanAmtCount, 'sub'));
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}

}

function editPoRow() {
	var rows = $('#collateralTable').datagrid('getSelections');
	// var collateralData = $("#collateralTable").datagrid('getAllData');
	if (rows.length == 1) {
		var row = rows[0];
		// row.collateralData = collateralData;
		row.op = 'edit';
		var options = {
			title : '修改货物信息',
			reqid : 'I_P_000192',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : editPoRowSuccess
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editPoRowSuccess(data) {
	var row = $('#collateralTable').datagrid('getSelected');
	var rowIndex = $('#collateralTable').datagrid('getRowIndex', row);
	// 限定关联关系修改时不能修改为已经存在的关系
	$('#collateralTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	$('#ttlLoanAmt').numberbox('setValue', calcTtlLoanAmt());
	$('#buyerId').focus();
}

function addBillRow() {
	var data = SCFUtils.convertArray("loanForm");
	// 添加前验证表单是否完整
	if (data) {
		var row = {};
		row.trxId = $('#sysRefNo').val();
		row.cntrctRefNo = $('#cntrctRefNo').val();
		row.loanValDt = $('#loanValDt').datebox('getValue');
		row.loanDueDt = $('#loanDueDt').datebox('getValue');
		row.op = 'add';
		var options = {
			title : '添加票据信息',
			reqid : 'I_P_000134',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : addBillSuccess
		};
		SCFUtils.getData(options);
	}

}

function addBillSuccess(data) {
	// 限定关联关系只能选择一次
	var arr = getBillNo();
	if (contains(arr, data.billNo)) {
		SCFUtils.alert('票据已存在!');
		return;
	}
	data.cntrctNo = $('#cntrctNo').val();
	data.loanId = $('#sysRefNo').val();
	$('#billTable').datagrid('appendRow', data);
	$('#buyerId').focus();
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function contains(arrays, obj, rowIndex) {
	for (var i = 0; i < arrays.length; i++) {
		if (arrays[i] == obj && rowIndex != i) {
			return true;
		}
	}
	return false;
}

// 获取列表中所有的票据NO
function getBillNo() {
	var array = [];
	var gridData = SCFUtils.getGridData('billTable', false);
	var datas = SCFUtils.parseGridData(gridData, false);
	if (datas.length > 0) {
		$.each(datas, function(i, m) {
			array[i] = m.billNo;
		});
	}
	return array;
}
function editBillRow() {
	var rows = $('#billTable').datagrid('getSelections');
	if (rows.length == 1) {
		var row = rows[0];
		row.op = 'edit';
		row.state = '';
		row.trxId = $('#sysRefNo').val();
		row.loanValDt = $('#loanValDt').datebox('getValue');
		row.loanDueDt = $('#loanDueDt').datebox('getValue');
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title : '修改票据信息',
			reqid : 'I_P_000134',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : editBillSuccess
		};
		SCFUtils.getData(options);
	} else if (rows.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editBillSuccess(data) {
	var row = $('#billTable').datagrid('getSelected');
	var rowIndex = $('#billTable').datagrid('getRowIndex', row);
	// 限定关联关系修改时不能修改为已经存在的关系
	var arr = getBillNo();
	if (contains(arr, data.billNo, rowIndex)) {
		SCFUtils.alert('票据已存在!');
		return;
	}
	$('#billTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	$('#buyerId').focus();
}

// 删除一条数据
function deleteBillRow() {
	var rows = $('#billTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#billTable').datagrid('getAllRowIndex',
							copyRows[i].sysRefNo);
					$('#billTable').datagrid('deleteRow', index);
				}
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 校验账号是否已存在
function checkBailAcNo(marginAcNo) {
	var result = false;
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000377',
			marginAcNo : marginAcNo,
			sysRefNo : $("#sysRefNo").val(),
			selNm : $("#selNm").val()
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				result = true;
			}
		}
	};
	SCFUtils.ajax(option);

	return result;
}
// 校验账号是否已存在
function checkPayBailAcNo(payBailAcno) {
	var result = false;
	var option = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000387',
			payBailAcno : payBailAcno,
			sysRefNo : $("#sysRefNo").val()
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				result = true;
			}
		}
	};
	SCFUtils.ajax(option);

	return result;
}

/*
 * 打包卖方额度
 */
function getSellerData() {
	var sellerLmt = {};// 添加卖方额度信息
	sellerLmt._total_rows = 1;
	var obj = {};
	var lmtTp = '1';
	if('RE'===SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE ){
		obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		obj.lmtBal = relQueryLmtE(lmtTp)[0].lmtBal ;//卖方额度余额=原卖方额度余额-融资金额
		obj.lmtAllocate = relQueryLmtE(lmtTp)[0].lmtAllocate ;//本次占用额度=原来占用额度+融资金额
		//obj.lmtRecover = relQueryLmtE(lmtTp)[0].lmtRecover ;//归还额度
		

	}else{
		if('FP'===SCFUtils.FUNCTYPE){
			obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		}else{
			obj.sysRefNo = $('#sellerLmtSysRefNo').val();
		}
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,SCFUtils.Math($('#ttlLoanAmt').numberspinner('getValue'),$('#marginAmt').numberspinner('getValue'),'sub'),'sub') ;//卖方额度余额=原卖方额度余额-融资金额
		obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,SCFUtils.Math($('#ttlLoanAmt').numberspinner('getValue'),$('#marginAmt').numberspinner('getValue'),'sub'),'add') ;//本次占用额度=原来占用额度+融资金额
		//obj.lmtRecover = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtRecover,$('#ttlLoanAmt').numberbox('getValue'),'add') ;//归还额度=原归还额度+融资余额

	}

	obj.ttlAllocate = 0;// 已占用额度
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
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 融资金额
	
	var loanValDt = $('#loanValDt').datebox('getValue');
	var loanDueDt = $('#loanDueDt').datebox('getValue');

	if ('RE' != SCFUtils.FUNCTYPE && 'DP' != SCFUtils.FUNCTYPE) {
		if (SCFUtils.DateDiff(loanValDt, SCFUtils.getcurrentdate()) < 0
				|| SCFUtils.DateDiff(loanValDt, loanDueDt) > 0
				|| SCFUtils.DateDiff(SCFUtils.getcurrentdate(), loanDueDt) > 0) {
			SCFUtils.alert('融资起始日必须晚于当前时间且必须早于到期日！');
			return;
		}

		if (ttlLoanAmt <= 0) {
			SCFUtils.alert('还未选择订单信息！');
			return;
		}

		if (getBillAmt() != ttlLoanAmt
				&& $("#loanTp").combobox('getValue') == '3') {
			SCFUtils.alert('票据金额必须与融资金额相等！');
			return;
		}

		var marginAmt = $('#marginAmt').numberbox('getValue');// 保证金金额
		var initMarginPct = $('#initMarginPct').numberspinner('getValue');
		if ($('#loanTp').combobox('getValue') == '3') {
			if (marginAmt < SCFUtils.Math(ttlLoanAmt, initMarginPct / 100,
					'mul')) {
				SCFUtils.alert('保证金金额必须大于融资金额*初始保证金比例！');
				return;
			}
		}
		var payBailAcnoCheck = $('#payBailAcnoCheck').val();
		if (payBailAcnoCheck == "0") {
			// 如果用户没有点击校验标志 重新校验 默认账号都存在
			if (true) {
				$('#payBailAcnoCheck').val("1");
			} else {
				SCFUtils.alert('还款保证金账号不存在！');
				return;
			}
		}

		// 校验账号是否存在
		var marginAcNo = $('#marginAcNo').val();
		var payBailAcno = $('#payBailAcno').val();
		if (checkBailAcNo(marginAcNo) || checkPayBailAcNo(marginAcNo)) {
			SCFUtils.alert('初始保证金账号已存在！');
			return;
		}
		/*if (checkBailAcNo(payBailAcno) || checkPayBailAcNo(payBailAcno)) {
			SCFUtils.alert('还款保证金账号已存在！');
			return;
		}*/

		// 获取卖方额度信息
		var selLmtBal = $('#selLmtBalHD').val();
		var buyerlmtBal = $('#buyerlmtBalHD').val();
		if (SCFUtils.Math(selLmtBal, ttlLoanAmt, 'sub') < 0) {
			SCFUtils.alert('授信额度余额不足！');
			return;
		}
		/*if (SCFUtils.Math(buyerlmtBal, ttlLoanAmt, 'sub') < 0) {
			SCFUtils.alert('间接客户额度余额不足！');
			return;
		}*/
	}

	var grid = {};
	// 货物信息 融资子表
	var loanCollateralMList = SCFUtils.getGridData('collateralTable', false);
	// 增加一个判断退回处理时选中勾选的数据
	if ('FP' == SCFUtils.FUNCTYPE) {
		loanCollateralMList = SCFUtils.getSelectedGridData('collateralTable');
		if (loanCollateralMList._total_rows == 0) {
			SCFUtils.alert('请勾选一笔订单数据！');
			return;
		}
	}

	grid.loanCollateralMList = SCFUtils.json2str(loanCollateralMList);
	var buyerId = $('#buyerId').val();
	var cntrctNo = $('#cntrctNo').val();
	queryBuyerLmt(cntrctNo, buyerId);// 买方额度编号
	// 票据信息
	var griddata1 = SCFUtils.getGridData('billTable', false);
	grid.bill = SCFUtils.json2str(griddata1);
	// 额度变动表
	grid.cntrct = SCFUtils.json2str(getCreditChangeData());
	//打包买方额度数据
	//grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData(buyerId));
	grid.sellerLmt = SCFUtils.json2str(getSellerData());
	// 设置卖方额度
	queryRelCntrct();
	
	// 设置买方额度
	getBuyerLmt(buyerId);

	var mainData = SCFUtils.convertArray('loanForm');
	
	var cntrctNo = $('#cntrctNo').val();
	//协议相关信息
	var cntrct=queryCntrctInfo(cntrctNo);
	
	//客户表相关信息
	var custInfo = queryCustInfo(buyerId);
	
	//额度关联表相关信息
	var cntrctSbrInfo = queryCntrctSbrInfo(cntrctNo, buyerId);
	
	//保证金金额
	var margin_Amt = $('#marginAmt').numberbox('getValue');
	var lmtAllocate =0;
	if(SCFUtils.Math(ttlLoanAmt, margin_Amt, 'sub')>0){
		//占用额度 =融资金额-初始保证金金额
		lmtAllocate = SCFUtils.Math(ttlLoanAmt, margin_Amt, 'sub');
	}else{
		lmtAllocate =0;
	}
	
	$.extend(mainData, grid, {
		marginBal : margin_Amt,//保证金金额
		'lmtAllocate' : SCFUtils.Math(cntrct.lmtAllocate, lmtAllocate, 'add'),//协议_占用额度
		'custLmtAllocate' : SCFUtils.Math(custInfo.lmtAllocate, lmtAllocate, 'add'),//客户信息_占用额度
		'cntrctSbrLmtAllocate' : SCFUtils.Math(cntrctSbrInfo.lmtAllocate, lmtAllocate, 'add'),//额度关联信息_占用额度
		
		'lmtRecover' :cntrct.lmtRecover, //协议_归还额度
		'custLmtRecover' :custInfo.lmtRecover, //客户信息_归还额度
		'cntrctSbrLmtRecover' :cntrctSbrInfo.lmtRecover, //额度关联信息_归还额度
		
		'lmtAmt' : cntrct.lmtAmt, //协议_额度金额
		'custLmtAmt' : custInfo.lmtAmt, //客户信息表_额度金额
		'cntrctSbrLmtAmt' : cntrctSbrInfo.buyerLmtAmt, //额度关联信息表_额度金额
		
		'lmtBal' :SCFUtils.Math(cntrct.lmtBal, lmtAllocate, 'sub'),//协议_额度余额 = 原额度余额-本次占用金额
		'custLmtBal' :SCFUtils.Math(custInfo.lmtBal, lmtAllocate, 'sub'),//客户信息_额度余额 = 原额度余额-本次占用金额
		'cntrctSbrLmtBal' :SCFUtils.Math(cntrctSbrInfo.buyerLmtBat, lmtAllocate, 'sub'),//额度关联信息_额度余额 = 原额度余额-本次占用金额
		
		'lmtCcy':mainData.ccy, //额度币别
		'regLowestVal':SCFUtils.Math(ttlLoanAmt, margin_Amt, 'sub') //最低库存价值
	});
	return mainData;
}

function getCreditChangeData() {
	var cntrct = {};// 添加额度变动表
	cntrct._total_rows = 2;
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 融资金额

	for (var i = 0; i < 2; i++) {
		var obj = {};
		obj.sysRefNo = $('#sysRefNo').val() + "" + i + "";
		if (i == 0) {
			obj.custNo = $('#selId').val();
			obj.custNm = $('#selNm').val();
			obj.clType = 'S';
		} else {
			obj.custNo = $('#buyerId').val();
			obj.custNm = $('#buyerNm').val();
			obj.clType = 'O';
		}
		obj.cntrctNo = $('#cntrctNo').val();
		obj.refNo = $('#sysRefNo').val();
		obj.trxCcy = $('#ccy').val();
		obj.trxAmt = ttlLoanAmt;
		obj.expTrxAmt = ttlLoanAmt;
		obj.tdType = 'T';
		obj.trxDate = getDate(new Date());

		cntrct['rows' + i + ''] = obj;
	}
	return cntrct;
}

/**
 * 根据额度编号查询可融资订单
 */
function loadTable(cntrctNo, buyerId) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000035',
			cntrctNo : cntrctNo,
			buyerId : buyerId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils
						.loadGridData('collateralTable', data.rows, false, true);
			} else {
				// SCFUtils.error("没有找到复合条件的订单信息!");
			}
		}
	};
	SCFUtils.ajax(options);
}

/**
 * 查询协议额度
 * 
 * @param data
 */
function queryRelCntrct() {
	var cntrctNo = $('#cntrctNo').val();
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000029',
			sysRefNo : cntrctNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#selLmtBal').val(
						SCFUtils.Math(data.rows[0].lmtBal, ttlLoanAmt, 'sub'));// 额度余额
				$('#selLmtAVl').val(
						SCFUtils.Math(data.rows[0].lmtAllocate, ttlLoanAmt,
								'add'));// 占用额度金额
			}
		}
	};
	SCFUtils.ajax(opts);
}

/**
 * 根据订单流水号查询出订单币别、金额、到期日;
 * 
 * @param poId
 */
function ajaxPoM(sysRefNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000037',
			sysRefNo : sysRefNo,
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					// 根据LOAN_COLLATERAL_E表中的refNo查询
					if ('FP' != SCFUtils.FUNCTYPE) {
					var options = {
						url : SCFUtils.AJAXURL,
						data : {
							queryId : 'Q_P_000503',
							sysRefNo : n.refNo,
						},
						callBackFun : function(data) {
							if (!SCFUtils.isEmpty(data.rows)) {
								// 因为LOAN_COLLATERAL_E表中没有可融资数量，已融资数量，现在从COLLATERAL_E中取值更新COLLATERAL_M表
								$.extend(n, {
									poNumUsed : data.rows[0].poNumUsed,
									poNumUseable : data.rows[0].poNumUseable
								})
							}
						}
					};
					}else{
						var options = {
								url : SCFUtils.AJAXURL,
								data : {
									queryId : 'Q_P_000610',
									sysRefNo : n.refNo,
								},
								callBackFun : function(data) {
									if (!SCFUtils.isEmpty(data.rows)) {
										// 因为LOAN_COLLATERAL_E表中没有可融资数量，已融资数量，现在从COLLATERAL_M中取值
										$.extend(n, {
											poNumUsed : data.rows[0].poNumUsed,
											poNumUseable : data.rows[0].poNumUseable
										})
									}
								}
							};
					}
					SCFUtils.ajax(options);
				});
				SCFUtils.loadGridData('collateralTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

// 双击订单查看详情
function onClickRow(index, row) {
	var options = {
		title : '订单详情展示',
		reqid : 'I_P_000137',
		data : {
			poNo : row.poNo
		}
	};
	SCFUtils.getData(options);
}

// 查看订单详细
function onClickSearch() {
	var row = $('#collateralTable').datagrid('getSelections');
	if (row.length != 1) {
		SCFUtils.alert("请选择一条记录");
		return;
	}
	var options = {
		title : '订单详情展示',
		reqid : 'I_P_000137',
		data : {
			poNo : row[0].poNo
		}
	};
	SCFUtils.getData(options);
}

// 查询初始保证金金额
function onSearchBailClick() {
	var marginAcNo = $("#marginAcNo").val();
	if (SCFUtils.isEmpty(marginAcNo)) {
		SCFUtils.alert("请输入初始保证金账号");
		return;
	}
	$('#marginAmt').numberbox('setValue', 10000000);
}

// 校验还款保证金账号是否存在
function onSearchBailAcClick() {
	var payBailAcno = $("#payBailAcno").val();
	if (SCFUtils.isEmpty(payBailAcno)) {
		SCFUtils.alert("请输入还款保证金账号");
		return;
	}

	// 校验账号是否存在
	if (true) {
		$('#payBailAcnoCheck').val("1");// 还款保证金校验标志
		$('#payBailAcno').val("180888888880001");
	} else {
		$('#payBailAcnoCheck').val("0");
		$('#payBailAcno').val("");
	}
}

// 设置融资余额
function changeTtlLoanAmt() {
	$('#ttlLoanBal').val($('#ttlLoanAmt').numberbox('getValue'));
	$('#marginAmt').numberbox(
			'setValue',
			SCFUtils.Math($('#ttlLoanBal').val(), $('#initMarginPct')
					.numberspinner('getValue') / 100, 'mul'));
}

// 计算票据总金额
function getBillAmt() {
	var totalAmt = 0;
	var griddata = SCFUtils.getGridData('billTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (griddata._total_rows == 0) {
		totalAmt = 0;
	} else {
		$.each(datas, function(i, n) {
			totalAmt = SCFUtils.Math(totalAmt, n.billAmt, 'add');
		});
	}
	return totalAmt;
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

/*function getBuyerLmtData(buyerId){
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
	
	obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#ttlLoanAmt').numberbox('getValue'),'sub') ;//买方额度余额=原买方额度余额-转让金额
	obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#ttlLoanAmt').numberbox('getValue'),'add') ;//本次占用额度=原来占用额度+转让金额

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
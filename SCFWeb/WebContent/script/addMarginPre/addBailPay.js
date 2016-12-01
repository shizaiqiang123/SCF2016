function pageOnInt() {
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

function ajaxBox() {
	var busiTp = [ {
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
		"text" : "现货动态"
	} ];
	$("#busiTp").combobox('loadData', busiTp);

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

	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("ccy", true);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setTextReadonly("loanId", true);
	SCFUtils.setNumberspinnerReadonly("loanAmt", true);
	SCFUtils.setDateboxReadonly("loanValDt", true);
	SCFUtils.setDateboxReadonly("loanDueDt", true);
	SCFUtils.setTextReadonly("payBailAcno", true);
	SCFUtils.setNumberspinnerReadonly("bailPayAmt", true);
	SCFUtils.setNumberspinnerReadonly("initMarginPct", true);
	SCFUtils.setNumberspinnerReadonly("ttlMarginBal", true);
}

function ajaxTable() {
	var options = {
		toolbar : '#toolbar',
		idField : 'sysRefNo', // 指明商品编号是标识字段。
		rownumbers : true,// 显示行号
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'refNo',
			title : 'refNo',
			width : '10%',
			hidden : true
		}, {
			field : 'sysRefNo',
			title : 'sysRefNo',
			width : '10%',
			hidden : true
		}, {
			field : 'billNo',
			title : '票号',
			width : '14.28%'
		}, {
			field : 'billAmt',
			title : '出票金额',
			width : '14.28%',
			formatter : ccyFormater
		}, {
			field : 'billValDt',
			title : '起始日',
			width : '14.28%',
			formatter : dateFormater
		}, {
			field : 'billDueDt',
			title : '到期日',
			width : '14.28%',
			formatter : dateFormater
		}, {
			field : 'marginBal',
			title : '保证金余额',
			width : '12.5%',
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'marginCompen',
			title : '本次续存保证金金额',
			width : '14.28%',
			formatter : ccyFormater
		}, {
			field : 'loanId',
			title : '融资编号',
			width : '14.28%',
		// hidden : true
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			width : '14.28%'
		// hidden : true
		} ] ]
	};
	$('#bailBillDg').datagrid(options);
}

function ajaxBillM(sysRefNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000491',
			refNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('bailBillDg', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function addRow() {
	var data = SCFUtils.convertArray("dispatchForm");
	// 添加前验证表单是否完整
	if (data) {
		var row = {};
		var bailBillData = $("#bailBillDg").datagrid('getAllData');
		row.loanId = $('#loanId').val();
		row.cntrctNo = $('#cntrctNo').val();
		row.refNo = $('#sysRefNo').val();
		row.bailBillData = bailBillData;
		row.ttlMarginBal = $('#ttlMarginBal').numberspinner('getValue');
		row.ttlMarginBalOld = $('#ttlMarginBalOld').val();
		row.op = 'add';
		row.functype = SCFUtils.FUNCTYPE;
		var options = {
			title : '添加票据信息',
			reqid : 'I_P_000193',
			data : {
				'row' : row
			},
			onSuccess : addRowSuccess
		};
		SCFUtils.getData(options);
	}

}
// 修改一条数据
function editRow() {
	var row = $('#bailBillDg').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		row.ttlMarginBalOld = $('#ttlMarginBalOld').val();
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title : '修改票据信息',
			reqid : 'I_P_000193',
			height : '370',
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
	var row = $('#bailBillDg').datagrid('getSelected');
	var rowIndex = $('#bailBillDg').datagrid('getRowIndex', row);
	$('#bailBillDg').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	$('#bailPayAmt').numberspinner('setValue', calBailPayAmt());
	// 重新计算主页保证金余额
	$('#ttlMarginBal').numberspinner('setValue', calMarginBal());
}
function addRowSuccess(data) {
	// var ttlLoanAmt = SCFUtils.Math($('#ttlLoanAmt').numberbox('getValue'),
	// data.poLoanAmt, 'add');
	// $('#ttlLoanAmt').numberbox('setValue',ttlLoanAmt)
	$('#bailBillDg').datagrid('appendRow', data);
	if(SCFUtils.FUNCTYPE == 'FP'){//退回时对其选择
		$('#bailBillDg').datagrid('selectRow',$('#bailBillDg').datagrid('getRows').length-1);
	}
	getValues();
}

/**
 *  计算相关值 
 */
function getValues(){
	$('#bailPayAmt').numberspinner('setValue', calBailPayAmt());
	$('#ttlMarginBal').numberspinner(
			'setValue',
			SCFUtils.Math($('#ttlMarginBalOld').val(),
					calBailPayAmt(), 'add'));
}

/**
 *  计算相关值modify by shizaiqiang 
 */
function getValuesRe(){
	var bailPayAmt = $('#bailPayAmt').numberspinner('getValue');
	$('#bailPayAmt').numberspinner('setValue', calBailPayAmt());
	var ttlMarginBalOld = SCFUtils.Math($('#ttlMarginBal').numberspinner('getValue'),bailPayAmt, 'sub');
	$('#ttlMarginBal').numberspinner('setValue',SCFUtils.Math(ttlMarginBalOld,calBailPayAmt(), 'add'));
}

function calBailPayAmt() {
	var bailBillData = $("#bailBillDg").datagrid('getAllData');
	/*if(SCFUtils.FUNCTYPE == 'FP'){
		bailBillData = $("#bailBillDg").datagrid('getChecked');
		var bailBillDataObj = {};
		bailBillDataObj['total'] =  bailBillData.length;
		bailBillDataObj['rows'] = bailBillData;
		bailBillData = bailBillDataObj;
	}*/
	var bailPayAmt = 0;
	for (var i = 0; i < bailBillData.total; i++) {
		bailPayAmt = SCFUtils.Math(bailPayAmt,
				bailBillData.rows[i].marginCompen, 'add');
	}
	$('#bailPayAmtOld').val(bailPayAmt);
	return bailPayAmt;
}

function calMarginBal() {
	var bailBillData = $("#bailBillDg").datagrid('getAllData');
	/*if(SCFUtils.FUNCTYPE == 'FP'){
		return SCFUtils.Math($("#ttlMarginBal").numberbox('getValue'),data.marginCompen,'sub');
	}*/
	var bailPayAmt = 0;
	for (var i = 0; i < bailBillData.total; i++) {
		bailPayAmt = SCFUtils.Math(bailPayAmt,
				bailBillData.rows[i].marginCompen, 'add');
	}
	var marginBal =  SCFUtils.Math($('#ttlMarginBalOld').val(),bailPayAmt, 'add');
	return marginBal;
}

function deleteRow() {
	var rows = $('#bailBillDg').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#bailBillDg').datagrid('getAllRowIndex',
							copyRows[i].sysRefNo);
					$('#bailBillDg').datagrid('deleteRow', index);
				}
				getValuesRe();
			}
		});
		

	} else {
		SCFUtils.alert("请选择一条数据！");
	}
	
}

function getValusAfterDele(data){
	var bailPayAmt = calBailPayAmt();
	var ttlMarginBal = calMarginBal(data);

	$('#bailPayAmt').numberspinner(
			'setValue',
			SCFUtils.Math($('#bailPayAmtOld').val(), bailPayAmt,
					'sub'));
	$('#ttlMarginBal').numberspinner('setValue',
			SCFUtils.Math(ttlMarginBal, bailPayAmt, 'sub'));
}

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('dispatchForm', data);
	SCFUtils.loadGridData('bailBillDg', SCFUtils
			.parseGridData(data.obj.bailBillList), false);
	if(SCFUtils.FUNCTYPE == 'FP'){
		$('#bailBillDg').datagrid('selectAll');
		/*var options = $('#bailBillDg').datagrid('options');
		options.onCheck = onCheck;
		options.onUncheck = onUncheck;
		options.onCheckAll = onCheckAll;
		options.onUncheckAll = onUncheckAll;*/
	}
	lookSysRelReason();
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('dispatchForm', data);
	$('#ccy').combobox('setValue',data.obj.lmtCcy);
	$('#sellerLmtSysRefNo').val(data.obj.lmtSysRefNo);//卖方额度流水号
	$('#initMarginPct').numberspinner('setValue',data.obj.initGartPct);
	if (SCFUtils.OPTSTATUS == 'ADD') {
		var options = {};
		options.data = {
			refName : 'BailRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);

		$('#trxDt').val(getDate(new Date()));
	}
	lookSysRelReason();

}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('dispatchForm', data);
	SCFUtils.loadGridData('bailBillDg', SCFUtils
			.parseGridData(data.obj.bailBillList), true);
	lookSysRelReason();
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('dispatchForm', row);
	queryReLoan();
	$('#ttlMarginBal').numberspinner('setValue', data.obj.marginBal);
	ajaxBillM(data.obj.sysRefNo);
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
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

function pageOnFPLoad(data) {
	$('#ttlMarginBalOld').val(SCFUtils.Math(data.obj.marginBal, data.obj.marginCompen, 'sub'));
	pageOnReleasePageLoad(data);
	$('#bailBillDg').datagrid('selectAll', true);
	/*var options = $('#bailBillDg').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;*/
	lookSysRelReason();
}

function onCheck(rowIndex,rowData){
	getValues();
}

function onUncheck(rowIndex,rowData){
	getValusAfterDele(rowData);
}

function onCheckAll(rows){
	getValusAfterDele();
}

function onUncheckAll(rows){
	$.each(rows,function(i,v){
		onUncheck(i,v);
	});
}

function onNextBtnClick() {

	var bailPayAmt = $('#bailPayAmt').numberspinner('getValue');
	if (bailPayAmt <= 0) {
		SCFUtils.alert('本次追加保证金金额为零！');
		return;
	}

	// 2.本次补入保证金金额<=融资余额-保证金余额；

	// var bailPayAmt = $('#bailPayAmt').numberspinner('getValue');
	var loanAmt = $('#loanAmt').numberspinner('getValue');
	var ttlMarginBal = $('#ttlMarginBal').numberspinner('getValue');
	// var value = SCFUtils.Math(bailPayAmt, SCFUtils.Math(loanAmt,
	// ttlMarginBal,
	// 'sub'), 'sub');

	if (SCFUtils.Math(loanAmt, ttlMarginBal, 'sub') < 0) {
		// SCFUtils.alert('本次只需追加的保证金金额为！'
		// + SCFUtils.Math(loanAmt, ttlMarginBal, 'sub'));
		SCFUtils.alert('保证金金额不能大于融资余额！');
		return;
	}
	// $('#marginBal').val(SCFUtils.Math(bailPayAmt, ttlMarginBal,'add'));
	getBuyerCredit();
	getSellerCredit();

	var mainData = SCFUtils.convertArray('dispatchForm');

	var cntrctNo = mainData.cntrctNo;
	var buyerId = mainData.buyerId;
	//协议相关信息
	var cntrct=queryCntrctInfo(cntrctNo);
	
	//客户表相关信息
	var custInfo = queryCustInfo(buyerId);
	
	//额度关联表相关信息
	var cntrctSbrInfo = queryCntrctSbrInfo(cntrctNo, buyerId);
	
	var grid = {};
	queryBuyerLmt(cntrctNo, buyerId);// 买方额度编号
	//打包买方额度数据
	grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData(buyerId));
	$.extend(mainData,grid, {
		"cntrctLmtCcy" : cntrct.lmtCcy ,//额度币别
		"custLmtCcy" : custInfo.ccy ,//额度币别
		"cntrctSbrLmtCcy" : cntrctSbrInfo.lmtCcy ,//额度币别
		
		"cntrctLmtBal" : SCFUtils.Math(cntrct.lmtBal, bailPayAmt, 'add'),//协议_额度余额 = 原额度余额+本次追加保证金金额
		"custLmtBal" : SCFUtils.Math(custInfo.lmtBal, bailPayAmt, 'add'),//客户_额度余额 = 原额度余额+本次追加保证金金额
		"cntrctSbrLmtBal" : SCFUtils.Math(cntrctSbrInfo.buyerLmtBat, bailPayAmt, 'add'),//额度关联信息_额度余额 = 原额度余额+本次追加保证金金额
		
		'cntrctLmtAmt' : cntrct.lmtAmt, //协议_额度金额
		'custLmtAmt' : custInfo.lmtAmt, //客户信息表_额度金额
		'cntrctSbrLmtAmt' : cntrctSbrInfo.buyerLmtAmt, //额度关联信息表_额度金额
		
		'cntrctLmtAllocate' : SCFUtils.Math(cntrct.lmtAllocate, bailPayAmt, 'sub'), //协议_占用额度 = 原占用额度-本次追加保证金金额
		'custLmtAllocate' : SCFUtils.Math(custInfo.lmtAllocate, bailPayAmt, 'sub'),  //客户_占用额度 = 原占用额度-本次追加保证金金额
		'cntrctSbrLmtAllocate' : SCFUtils.Math(cntrctSbrInfo.lmtAllocate, bailPayAmt, 'sub'), //额度关联信息_占用额度 = 原占用额度-本次追加保证金金额
		
		'cntrctLmtRecover' :SCFUtils.Math(cntrct.lmtRecover, bailPayAmt, 'add'), //协议_归还额度 =原归还额度+本次追加保证金金额
		'custLmtRecover' :SCFUtils.Math(custInfo.lmtRecover, bailPayAmt, 'add'), //客户_归还额度 =原归还额度+本次追加保证金金额
		'cntrctSbrLmtRecover' :SCFUtils.Math(cntrctSbrInfo.lmtRecover, bailPayAmt, 'add'),  //额度关联信息_归还额度 =原归还额度+本次追加保证金金额
		
		"marginBal" : $('#ttlMarginBal').numberspinner('getValue'),
		"marginCompen" : $('#bailPayAmt').numberspinner('getValue'),
		"ttlLoanAmt" : $('#loanAmt').numberspinner('getValue')
	});
	$.extend(mainData, getCreditChangeData());

	return mainData;
}
// 获取买方信息
function getBuyerCredit() {
	var buyerId = $('#buyerId').val();
	var bailPayAmt = $('#bailPayAmt').numberspinner('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : buyerId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#buyerLmtBal').val(
						SCFUtils.Math(data.rows[0].lmtBal, bailPayAmt, 'add'));// 额度余额
				$('#lmtAllocate').val(
						SCFUtils.Math(data.rows[0].lmtAllocate, bailPayAmt,
								'sub'));// 占用额度金额
			}
		}
	};
	SCFUtils.ajax(opts);
}
// 获取卖方额度信息
function getSellerCredit() {
	var cntrctNo = $('#cntrctNo').val();
	var bailPayAmt = $('#bailPayAmt').numberspinner('getValue');
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
						SCFUtils.Math(data.rows[0].lmtBal, bailPayAmt, 'add'));// 额度余额
				$('#selLmtAllocate').val(
						SCFUtils.Math(data.rows[0].lmtAllocate, bailPayAmt,
								'sub'));// 占用额度金额
			}
		}
	};
	SCFUtils.ajax(opts);
}

function getCreditChangeData() {
	var grid = {};
	// 货物信息 融资子表
	var bailBillList = SCFUtils.getGridData('bailBillDg', false);
	grid.bailBillList = SCFUtils.json2str(bailBillList);

	var cntrct = {};// 添加额度变动表
	cntrct._total_rows = 2;
	//var custData = [];
	var bailPayAmt = $('#bailPayAmt').numberspinner('getValue');

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
		obj.trxAmt = SCFUtils.Math(0, bailPayAmt, 'sub');
		obj.expTrxAmt = 0;
		obj.tdType = 'R';
		obj.trxDate = $('#trxDt').val();

		cntrct['rows' + i + ''] = obj;
	}

	grid.cntrct = SCFUtils.json2str(cntrct);
	return grid;
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

// 查询融资信息
function onSearchPoClick() {
	var cntrctNo = $('#cntrctNo').val();
	var selId = $('#selId').val();
	//var buyerId = $('#buyerId').val();
	var options = {
		title : '融资查询',
		reqid : 'I_P_000117',
		data : {
			'selId' : selId,
			'cntrctNo' : cntrctNo,
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
	var cntrctNo = $('#cntrctNo').val();
	$('#loanId').val(data.sysRefNo);
	$('#buyerId').val(data.buyerId);
	$('#buyerNm').val(data.buyerNm);
	$('#loanAmt').numberspinner('setValue', data.ttlLoanAmt);
	$('#initMarginPct').numberspinner('setValue', data.initMarginPct);
	$('#ttlMarginBal').numberspinner('setValue', data.marginBal);
	$('#ttlMarginBalOld').val(data.marginBal);
	// SCFUtils.Math(data.marginAmt, data.marginBal, 'add'));
	$('#payBailAcno').val(data.payBailAcno);
	$('#loanValDt').datebox('setValue', data.loanValDt);
	$('#loanDueDt').datebox('setValue', data.loanDueDt);
	/*
	 * 查询按钮加载数据成功，去判断cntrctNo的div有无值,无值不做处理
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160728 by XuX
	 */
	if($('#loanId').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#loanId').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#loanId').removeClass('validatebox-invalid');
	}
	//将买方的流水号加载到TrxId中
	queryBuyerInfo(cntrctNo,data.buyerId); 

}

function queryReLoan() {
	var loanId = $('#loanId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000320',
			sysRefNo : loanId
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				var obj = data.rows[0];
				$('#loanAmt').numberspinner('setValue', obj.ttlLoanAmt);
				$('#initMarginPct')
						.numberspinner('setValue', obj.initMarginPct);
				// $('#ttlMarginBal').numberspinner('setValue',obj.marginBal);
				// SCFUtils.Math(obj.marginAmt, obj.marginBal, 'add'));
				$('#payBailAcno').val(obj.payBailAcno);
				$('#loanValDt').datebox('setValue', obj.loanValDt);
				$('#loanDueDt').datebox('setValue', obj.loanDueDt);

				// 更新累计追加的保证金余额
				var bailPayAmt = $('#bailPayAmt').numberspinner('getValue');
				$('#marginBal').val(
						SCFUtils.Math(obj.marginBal, bailPayAmt, 'add'));
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
function relQueryLmtE(lmtTp){
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
}

/*
* 申请时候查询LMT的表
*/
function relQueryLmtM(lmtTp,buyerId){
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
}

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
	
	obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#bailPayAmt').numberbox('getValue'),'add') ;//买方额度余额=原额度余额+本次追加保证金金额
	obj.lmtRecover = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtRecover,$('#bailPayAmt').numberbox('getValue'),'add') ;//归还额度=原归还额度+本次追加保证金金额
	obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#bailPayAmt').numberbox('getValue'),'sub') ;//占用额度=原占用额度-本次追加保证金金额

}
obj.ttlAllocate = $('#buyerTtlAllocate').val();//已占用额度
obj.theirRef = $('#sysRefNo').val();//

buyerLmt['rows0'] = obj;
return buyerLmt;

}

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
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
	SCFUtils.setComboReadonly('isCollect', true);
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
	lookSysRelReason();
}
function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	// modify by shizaiqiang 用于应收账款质押功能
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
	loadTable();
	$("#invcMTable").datagrid("selectAll");
	// modify by shizaiqiang 2016-08-17 修改catalog
	// $('#arAvalLoanHD').val(data.obj.arAvalLoan);
	$('#arAvalLoanHD').val('0');

	$('#ccy').combobox('setValue', data.obj.ccy);
	$('#sellerLmtSysRefNo').val(data.obj.lmtSysRefNo);//卖方额度流水号
	$('#arAvalLoan').numberbox('setValue', getArAvalLoan());//从datagrid中计算得到可融资余额
	$("#currTransPayCost").numberbox("setValue",queryFeeM().currFinPayCost);
	lookSysRelReason();
}

// 质押起始日期
function changeValDt() {
	var lmtValidDt = $('#lmtValidDt').datebox('getValue');// 协议起始日期
	// var lmtValidDtNew = SCFUtils.dateFormat(lmtValidDt,'yyyy-MM-dd');
	var pldValDt = $('#pldValDt').datebox('getValue'); // 质押起始日期
	var flag = false;
	if (SCFUtils.DateDiff(pldValDt, lmtValidDt) > 0) {
		// SCFUtils.alert('质押起始日期不能大于协议起始日期！');
		// $('#pldValDt').datebox('setValue','');
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
	lookSysRelReason();
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	// $('#lmtValidDtHD').hide();
	SCFUtils.loadForm('invcMForm', row);
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
	loadTable();
	$('#arAvalLoan').numberbox('setValue', getArAvalLoan());//从datagrid中计算得到可融资余额
	$("#currTransPayCost").numberbox("setValue",queryFeeM().currFinPayCost);
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


// 计算上一步操作次数
var preStep = 0;
function onNextBtnClick() {
	var data = SCFUtils.convertArray('invcMForm');
	if($("#isConfirm").combobox("getValue")==0){
		$.extend(data, {
			'confirmFlag' : 4 //行内确认=4
		});
	}else{
		$.extend(data, {
			'confirmFlag' : 2 //行内不确认=2
		});
	}
	var grid = {};
	var griddata = {};
	griddata = SCFUtils.getGridData("invcMTable", false);
	if($("#isConfirm").combobox("getValue")==0){
		$.each(griddata,function(i,n){
			$.extend(n, {
				'invSts' : 4 //行内确认=2
			});
		});
	}else{
		$.each(griddata,function(i,n){
			$.extend(n, {
				'invSts' : 3 //行内确认=2
			});
		});
	}
	grid.invc = SCFUtils.json2str(griddata);
	var buyerIdArray = [];
	$.each(SCFUtils.parseGridData(griddata), function(i, n) {
		buyerIdArray.push(n.buyerId);
	});
	var buyerId = uniqueArray(buyerIdArray);
	var isError = false;
	for (var i = 0; i < buyerId.length; i++) {
		var lmtTp = '1'
		if (SCFUtils.isEmpty(relQueryLmtM(lmtTp, buyerId))) {
//			SCFUtils.alert('协议额度有异常，请重新建协议！');
			isError = true;
		}
	}
	if(isError){
		SCFUtils.alert('协议额度有异常，请重新建协议！');
		return;
	}
	//打包买方额度数据
	grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData(buyerId));
	$.extend(data, grid);
	return data;
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
	var isConfirm = [ {
		"id" : '0',
		"text" : "是"
	}, {
		"id" : '1',
		"text" : "否"
	} ];
	$("#isConfirm").combobox('loadData', isConfirm);
	$("#isConfirm").combobox('setValue', "0");
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

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
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
//	if (SCFUtils.CURRENTPAGE == '1'
//			&& ('PM' == SCFUtils.FUNCTYPE || 'FP' == SCFUtils.FUNCTYPE)) {
		var cntrctNo = $('#cntrctNo').val();// 协议编号
		var selId = $("#selId").val();
		var batchNo = $("#sysRefNo").val();
		$('#invcMTable').datagrid('clearChecked');// 清除选中
		var data = SCFUtils.convertArray("invcMForm");// 表单json值赋给data
		if (data) {
			var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000695',// 应收账款额度信息查询
					cntrctNo : cntrctNo,
					selId : selId,
					batchNo : batchNo,
					buyerId : $("#buyerId").val(),
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
									invSts : '1',
									batchNo : $('#sysRefNo').val(),
									busiTp : $('#busiTp').val()

								});
							});
							SCFUtils.loadGridData('invcMTable', data.rows,
									true, true);
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

//			if('FP' == SCFUtils.FUNCTYPE){
//				$.extend(options.data,{
//					queryId : 'Q_P_000625',
//					sysLockFlag : 'T',
//					sysLockBy : $('#sysRefNo').val()
//				});
//			}
//		}
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
					SCFUtils.loadGridData('invcMTable', data.rows, true, true);
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


// 加载网格数据
function loadGridData(data, flag1, flag2) {
	SCFUtils.loadGridData('invcMTable', data, flag1, flag2);
}

// 查询并计算客户借款金额然后显示在主表金额栏上
function forEach(data) {
	var loanId = $('#loanId').val();
	var invPmtRef = $('#sysRefNo').val();
	var date = getDate(new Date());
	$.each(data, function(i, n) {
		/*
		 * $('#invcMTable').datagrid('updateRow', { index : i, row : {
		 * struLoanAmt:0, loanId :n.sysRefNo, invLoanBalHd : n.invLoanBal,
		 * invBalHd : n.invBal, invLoanAvalHd : n.invLoanAval, invPmtRef :
		 * invPmtRef, invRef : n.sysRefNo, payTranAmt : n.loanTranAmt,
		 * payBillAmt : n.loanBillAmt, sysRefNo : n.sysRefNo + invPmtRef,
		 * tempTranAmt : SCFUtils.Math(n.loanTranAmt, n.payTranAmt, 'sub'),
		 * tempBillAmt : SCFUtils.Math(n.loanBillAmt, n.payBillAmt, 'sub'),
		 * lastPayDt: SCFUtils.getcurrentdate(), payAmt :
		 * SCFUtils.Math(SCFUtils.Math(n.loanTranAmt, n.payTranAmt, 'sub'),
		 * SCFUtils.Math(n.loanBillAmt, n.payBillAmt, 'sub'), 'add'),
		 * invLoanRefNo : loanId+n.sysRefNo, } });
		 */
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
								loanId : n.sysRefNo,
								invLoanBalHd : n.invLoanBal,
								invBalHd : n.invBal,
								invLoanAvalHd : n.invLoanAval,
								invPmtRef : invPmtRef,
								invRef : n.sysRefNo,
								// payTranAmt : n.loanTranAmt,
								// payBillAmt : n.loanBillAmt,
								sysRefNo : n.sysRefNo + invPmtRef,
								// tempTranAmt : SCFUtils.Math(n.loanTranAmt,
								// n.payTranAmt, 'sub'),
								// tempBillAmt : SCFUtils.Math(n.loanBillAmt,
								// n.payBillAmt, 'sub'),
								lastPayDt : SCFUtils.getcurrentdate(),
								payAmt : SCFUtils.Math(SCFUtils.Math(
										n.loanTranAmt, n.payTranAmt, 'sub'),
										SCFUtils.Math(n.loanBillAmt,
												n.payBillAmt, 'sub'), 'add'),
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


/*
 * pageonLoad时候查询FEE的M表
 */
function queryFeeM(){
	var sysRefNo = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000696',
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

/**
 * 从datagrid中的各个记录中计算得到总额
 */
function getArAvalLoan(){
	var griddata = SCFUtils.getGridData("invcMTable", false);
	var arAvalLoan = 0;
	$.each(griddata,function(i,n){
		arAvalLoan = SCFUtils.Math(arAvalLoan,n.invLoanAval,'add');
	});
	return arAvalLoan;
}


function getBuyerLmtData(buyerId){//buyerId 为一个数组类型的值
	var buyerLmt = {};// 添加买方额度信息
	buyerLmt._total_rows = buyerId.length;
	var obj = {};
	var lmtTp = '0';//0为买方额度
	for (var i=0;i<buyerId.length;i++){
		var byId = buyerId[0];
		obj.sysRefNo = relQueryLmtM(lmtTp,byId)[0].sysRefNo;
		obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp,byId)[0].lmtBal,$('#regAmt').numberbox('getValue'),'sub') ;//买方额度余额=原买方额度余额-转让金额
		obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp,byId)[0].lmtAllocate,$('#regAmt').numberbox('getValue'),'add') ;//本次占用额度=原来占用额度+转让金额
		buyerLmt['rows'+i] = obj;
	}
	return buyerLmt;

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



/**
 * 去除数组重复元素
 * data 为数组
 */
function uniqueArray(data){  
	 var tmp={},b=[]; 
	    for(var i=0;i<data.length;i++){
	        if(!tmp[data[i].selId]){
	            b.push(data[i]);
	            tmp[data[i].selId]=!0;
	        }
	    };
	    return b;
} 

/**
 * 是否确认的改变事件
 * 1.意见框的必输性改变
 */
function changeConfirm(){
	if($("#isConfirm").combobox("getValue") == 0){
		$('#confirmOp').textbox({
			required : false
		});
	}else if($("#isConfirm").combobox("getValue") == 1){
		$('#confirmOp').textbox({
			required : true
		});
	}
}

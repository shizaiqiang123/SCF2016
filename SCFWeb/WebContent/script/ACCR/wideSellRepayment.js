/**
 * 复合功能时，进入结果汇总页面
 * 
 * @param data
 */
function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('rePaymentForm', data);
	loadForm(data.obj.loanId);
	loadRefTable();
	queryRelCntrct();
	queryCust();
	// $('#invTable').datagrid('checkAll');
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}
/**
 * 复合功能时，Next进入交易页面
 * 
 * @param data
 */
function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('rePaymentForm', row);
	
	loadForm(data.obj.loanId);
	loadRefTable();
	queryRelCntrct();
	queryCust();
	relQueryIntE();
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
	SCFUtils.loadForm('rePaymentForm', data);
	loadRefTable();
	loadForm(data.obj.loanId);
	queryRelCntrct();
	queryCust();
	// $('#invTable').datagrid('checkAll');
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
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
	SCFUtils.loadForm('rePaymentForm', data);
	SCFUtils.loadGridData('invTable', SCFUtils.parseGridData(data.obj.invc),
			true);// 加载数据并保护表格。
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
	SCFUtils.loadForm('rePaymentForm', data);
	var options = $('#invTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
	searchPmt();
	lookSysRelReason();
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
	SCFUtils.loadForm('rePaymentForm', data);
	$('#loanId').val(data.obj.sysRefNo);
	$('#trxDt').datebox('setValue', SCFUtils.getcurrentdate());
	$('#pmtDt').datebox('setValue', SCFUtils.getcurrentdate());
	$('#ttlLoanBalHD').val(data.obj.ttlLoanBal);
	$('#loanValDt').val(data.obj.loanValDt);//添加融资起算日 add by YeQing 2016-9-27
	getRefNo();
	//生成利息流水号
	var intRequest = {};
	intRequest.data = {
		refName : 'IntRef',
		refField : 'intSysRefNo'
	};
	SCFUtils.getRefNo(intRequest);
	queryRelCntrct();
	queryCust();
	var options = $('#invTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;

	// loadTable();
	lookSysRelReason();
}

/**
 * new 修改在途初始化页面
 */
function pageOnFPLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('rePaymentForm', row);
	loadForm(data.obj.loanId);
	loadRefTable();
	queryRelCntrct();
	queryCust();
	$('#invTable').datagrid('selectAll',true);//在加载数据初始化时就将datagrid中的数据默认全勾选
	queryTtlLoanBalHD();//给ttlLoanBalHD字段赋值
	var options = $('#invTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
	lookSysRelReason();
	relQueryIntE();//new  为了在FP时给int信息加上sysRefnO
}
/**
 * 所有进入交易页面 公共的方法
 * 
 * @param data
 */
function pageOnInt() {
	ajaxBox();
	ajaxTable();
	SCFUtils.setFormReadonly('#rePaymentDiv', true);
	SCFUtils.setComboReadonly('OldSysRelReason', true);
	$('tr[id=Tr1]').hide();
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
 * 生成流水号
 */
function getRefNo() {
	var refRequest = {};
	refRequest.data = {
		refName : 'PmtRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(refRequest);
}

function ajaxBox() {
	var payIntTp = [ {
		"id" : '1',
		"text" : "预收息"
	}, {
		"id" : '2',
		"text" : "利随本清"
	}];
	$("#payIntTp").combobox('loadData',payIntTp);
	var data = [ {
		"id" : '0',
		"text" : "国内保理",
		"selected" : true
	}, {
		"id" : '1',
		"text" : "预付款融资"
	}, {
		"id" : '2',
		"text" : "动产质押融资"
	}, {
		"id" : '7',
		"text" : "应收账款质押"
	} ];
	$("#busiTp").combobox('loadData', data);
	ajaxCcy();
}

/**
 * 加载币别
 */
function ajaxCcy() {
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

function ajaxTable() {

	var options = {
		toolbar : '#toolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		singleSelect : false,// 只选一行
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		//onClickRow : onClickRow,
		columns : getColumns()
	};
	$('#invTable').datagrid(options);
}

function getColumns() {
	return [ [ {
		field : 'ck',
		checkbox : true
	}, {
		field : 'sysRefNo',
		title : '交易流水号',
		width : 150,
		hidden : true
	}, {
		field : 'invNo',
		title : '应收账款编号',
		width : '10%'
	}, {
		field : 'invLoanEbal',
		title : '融资余额',
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'invLoanEbalHD',
		title : '融资余额(隐藏)',
		width : 100,
		hidden : true,
		formatter : ccyFormater
	}, {
		field : 'payPrinAmt',
		title : '本次还本金',
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'currPayInt',
		title : '本次还利息',
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'payPrinAmtOld',
		title : '本次还本金Old(隐藏)',
		hidden : true,
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'pmtAmt',
		title : '本次还款金额',
		width : '10%',
		editor : {
			type : 'numberbox',
			options : {
				precision : 2
			},
		},
		formatter : ccyFormater
	}, {
		field : 'invCcy',
		title : '应收账款币别',
		width : '10%'
	}, {
		field : 'invAmt',
		title : '应收账款金额',
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'invBal',
		title : '应收账款余额',
		width : 100,
		hidden : true,
		formatter : ccyFormater
	}, {
		field : 'invValDt',
		title : '起算日',
		width : '10%',
		formatter : dateFormater
	}, {
		field : 'invDueDt',
		title : '到期日',
		width : '10%',
		formatter : dateFormater
	}, {
		field : 'loanValDt',
		title : '融资起算日',
		width : '10%',
		formatter : dateFormater
	}, {
		field : 'pmtDt',
		title : '还款日期',
		width : '10%',
		formatter : function() {
			return SCFUtils.getcurrentdate();
		}
	}, {
		field : 'invSts',
		title : '应收账款状态',
		width : 100,
		hidden :true
	}, {
		field : 'invLoanBal',
		title : '应收账款总融资余额',
		width : 120,
		hidden : true,
		formatter : ccyFormater
	}, {
		field : 'invLoanBalHD',
		title : '应收账款总融资余额',
		width : 120,
		hidden : true,
		formatter : ccyFormater
	}, {
		field : 'intAmt',
		title : '利息',
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'intAmtHD',
		title : '利息备用',
		width : 100,
		hidden : true,
		formatter : ccyFormater
	}, {
		field : 'eventTimes',
		title : 'eventTimes',
		width : 100,
		hidden : true
	}, {
		field : 'invcLoanRef',
		title : 'invcLoanRef',
		width : 100,
		hidden : true
	} ] ];
}
/**
 * 查询协议额度
 * 
 * @param data
 */
function queryRelCntrct() {
	var sysRefNo = $('#cntrctNo').val();
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000029',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {

			if (!SCFUtils.isEmpty(data.rows[0])) {
				$('#lmtBal').val(data.rows[0].lmtBal);
			}
		}
	};
	SCFUtils.ajax(opt);
}
/**
 * 查询客户额度
 * 
 * @param data
 */
function queryCust() {
	var selId = $('#selId').val();
	var ops = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : selId
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows[0])) {
				$('#selLmtBal').val(data.rows[0].lmtBal);
			}
		}
	};
	SCFUtils.ajax(ops);
}

function loadForm(loanId) {
	var sysRefNo = $('#sysRefNo').val();
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000700',
			loanId : loanId,
			sysRefNo:sysRefNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				//复核时不需要计算融资余额
				$('#ttlLoanBal').numberbox('setValue',data.rows[0].ttlLoanBal);
				
				$('#ccy').combobox('setValue', data.rows[0].ccy);
				$('#loanDueDt').datebox('setValue', data.rows[0].loanDueDt);
				$('#cntrctNo').val(data.rows[0].cntrctNo);
				$('#payIntTp').combobox('setValue',data.rows[0].payIntTp);
			}
		}
	};
	SCFUtils.ajax(opts);
}

function loadTable(flag) {
	var invcLoanId = $('#loanId').val();
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000053',
			invcLoanId : invcLoanId,
			cacheType : 'append'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					loadGridData(data, flag);
				} else {
					SCFUtils.alert("没有符合的应收账款");
				}
			} else {
				SCFUtils.alert("查询失败");
			}
		}
	};
	SCFUtils.ajax(opts);
}

function loadRefTable() {
	var invPmtRef = $('#sysRefNo').val();
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000724',
			invPmtRef : invPmtRef
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				ajaxPmt(data.rows);
				// SCFUtils.loadGridData('invTable', data.rows,true);
			}
		}
	};
	SCFUtils.ajax(opts);
}

function ajaxPmt(rows) {
	var loanId = $('#loanId').val();
	var sysLockBy = $("#sysRefNo").val();
	$.each(rows, function(i, n) {
		//复核时显示剩余利息 add by YeQing 2016-9-20
		$.extend(n,{
			intAmt : n.currInt
		});
		var opts = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000056',
				invRef : n.invRef,
				invcLoanId : loanId,
				sysLockBy : sysLockBy
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					rows[i].invValDt = data.rows[0].invValDt;
					rows[i].invDueDt = data.rows[0].invDueDt;
					rows[i].loanValDt = data.rows[0].loanValDt;
					rows[i].invBal = data.rows[0].invBal;
					rows[i].invLoanEbal = data.rows[0].invLoanEbal;
					rows[i].invSts = 'SELPMT';
					rows[i].invLoanBal = data.rows[0].invLoanBal;
					//rows[i].intAmt = data.rows[0].intAmt;
					rows[i].invcLoanRef = data.rows[0].sysRefNo;
					// rows[i].loanId = loanId;
					rows[i].invId = data.rows[0].invRef;
					rows[i].selId = $('#selId').val();
					rows[i].cntrctNo = $('#cntrctNo').val();
					rows[i].ck = true;
				}
			}
		};
		SCFUtils.ajax(opts);
		//复核时不需要计算invLoanEbal和invLoanBal
		//updateInvLoanEbal(n, 'sub');
		//updateInvLoanBal(n, 'sub');
		//从invcLoanM表中查询hd字段 add by JinJH on 20160829
		var opts = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000613',
					invcLoanId : loanId,
					sysLockBy : sysLockBy,
					invRef : n.invRef,
					cacheType : 'non'
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
							rows[i].invLoanEbalHD = data.rows[0].invLoanBal;
							rows[i].invLoanBalHD = data.rows[0].invLoanBal;
					}
				}
		};
		SCFUtils.ajax(opts);
	});
	if(SCFUtils.FUNCTYPE === "RE"||"DP"===SCFUtils.FUNCTYPE)
		SCFUtils.loadGridData('invTable', rows, true, true);
	if(SCFUtils.FUNCTYPE === "FP")
		SCFUtils.loadGridData('invTable', rows, false, true);
}

function searchPmt() {
	var payIntTp = $('#payIntTp').combobox('getValue');//扣息方式
	var invcLoanId = $('#loanId').val();
	var ttlLoanBal = 0 ;//查询时重新计算一次融资余额,将小页融资余额赋值给主页融资余额
	var sysLockBy = $("#sysRefNo").val();
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000053',
			invcLoanId : invcLoanId,
			sysLockBy : sysLockBy,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
//					$('#invTable').datagrid('clearChecked');
					var sysRefNo = $('#sysRefNo').val();
					var selId = $('#selId').val();
					var cntrctNo = $('#cntrctNo').val();
					$.each(data.rows, function(i, n) {
						ttlLoanBal = SCFUtils.Math(ttlLoanBal, n.invLoanEbal, 'add');
						//1.利随本清时，计算利息  modify by YeQing 2016-9-18
						//2.预收息时，利息默认为0
						var intAmt_lsbq = 0.00;
						if('2' == payIntTp){
							var subDate=SCFUtils.DateDiff(SCFUtils.getcurrentdate(), SCFUtils.dateFormat($("#loanValDt").val(), 'yyyy-MM-dd'));
						    intAmt_lsbq = SCFUtils.Math(n.invLoanEbal, n.loanRt*0.01, 'mul');
							intAmt_lsbq = SCFUtils.Math(intAmt_lsbq, subDate, 'mul');
							intAmt_lsbq = SCFUtils.Math(intAmt_lsbq, 360, 'div');
						}else{
							intAmt_lsbq = 0;
						}
						
						$.extend(n, {
							invLoanEbalHD : n.invLoanEbal,
							invLoanBalHD : n.invLoanBal,
							sysRefNo : sysRefNo + n.invId,
							invSts : 'SELPMT',
							invRef : n.invId,
							invPmtRef : sysRefNo,
							invValDt : n.invValDt,
							invDueDt : n.invDueDt,
							// loanId :invcLoanId,
							selId : selId,
							cntrctNo : cntrctNo,
							intAmt :intAmt_lsbq,
							intAmtHD :intAmt_lsbq,
							loanValDt : $("#loanValDt").val()
						});
					});
					loadGridData(data, false, true);
					$('#payIntAmt').numberbox('setValue', 0);
					$('#ttlPmtAmt').numberbox('setValue', 0);
					$('#payPrinAmt').numberbox('setValue', 0);
					$('#ttlLoanBal').numberbox('setValue', ttlLoanBal);
					queryRelCntrct();
					queryCust();
				} else {
					SCFUtils.alert("没有符合的应收账款");
				}
			}else{
				SCFUtils.alert("查询失败");
			}
		}
	};
	SCFUtils.ajax(opts);
}

function loadGridData(data, flag1, flag2) {
	var sysRefNo = $('#sysRefNo').val();
	// var loanId = $('#loanId').val();
	var selId = $('#selId').val();
	var cntrctNo = $('#cntrctNo').val();
	$.each(data.rows, function(i, n) {
		n.sysRefNo = sysRefNo + n.invId;
		n.invSts = 'SELPMT';
		n.invPmtRef = sysRefNo;
		n.invRef = n.invId;
		n.invLoanEbalHD = n.invLoanEbal;
		// n.loanId = loanId;
		n.selId = selId;
		n.cntrctNo = cntrctNo;
	});
	SCFUtils.loadGridData('invTable', data.rows, flag1, flag2);
	editIndex = undefined;
}


/**
 * grid 中，选中后：</br><b> 总融资余额=原总融资余额-表格中的融资余额。invLoanBal 发票总融资余额 =
 * 原总融资余额-本次还本金.</b>
 * 
 * 本次还款金额 = 融资余额(可修改)</br> 1 还款金额>=融资余额 本次还本金 = 融资余额; 2 还款金额<融资余额 本次还本金 =
 * 本次还款金额; 融资余额 = 原融资余额-本次还本金; </br>
 * 
 * @param rowIndex
 *            行索引
 * @param rowData
 *            行数据
 **/            
 function onCheck(rowIndex, rowData) {
	rowData.ck = true;
	//本次还款金额=融资余额+利息  modify by YeQing 2016-9-18
	rowData.pmtAmt = SCFUtils.Math(rowData.invLoanEbal,parseFloat(rowData.intAmtHD).toFixed(2), 'add');
	//本次还利息
	rowData.currPayInt = rowData.intAmt;
	//利息置0
	rowData.intAmt = 0;
	rowData.payPrinAmt = rowData.invLoanEbal;
	rowData.payPrinAmtOld = rowData.invLoanEbal;
	updateInvLoanEbal(rowData, 'sub');
	updateInvLoanBal(rowData, 'sub');
	sumPmtAmt(rowData, 'add');// 汇总还款金额
	sumIntAmt(rowData, 'add');// 汇总利息
	sumPayPrinAmt(rowData, 'add');// 汇总本次还本金
	//融资余额
	var ttlLoanBal = $('#ttlLoanBal').numberbox('getValue');
	//选择一行,便累计计算融资余额的值  融资余额=原值-本次还款本金
	ttlLoanBal = SCFUtils.Math(ttlLoanBal,rowData.payPrinAmt, 'sub');
	$('#ttlLoanBal').numberbox('setValue', ttlLoanBal);
	updateGridRow(rowIndex, rowData);
	onClickRow(rowIndex);
}


function onUncheck(rowIndex, rowData) {
	rowData.ck = false;
	sumPmtAmt(rowData, 'sub');// 汇总还款金额
	sumIntAmt(rowData, 'sub');// 汇总利息
	sumPayPrinAmt(rowData, 'sub');// 汇总本次还本金
	//本次还利息
	rowData.currPayInt = 0;
	//利息置0
	rowData.intAmt = rowData.intAmtHD;
	updateInvLoanEbal(rowData, 'add');
	updateInvLoanBal(rowData, 'add');
	rowData.pmtAmt = rowData.payPrinAmt = 0;
	rowData.invLoanBal = SCFUtils.Math(rowData.invLoanEbal,
			rowData.payPrinAmt, 'add');
//	$('#ttlLoanBal').numberbox('setValue', SCFUtils.Math(rowData.invLoanEbal,
//			rowData.payPrinAmt, 'add'));
	updateGridRow(rowIndex, rowData);
	//融资余额
	var ttlLoanBal = $('#ttlLoanBal').numberbox('getValue');
	//取消一行,便累计计算融资余额的值  融资余额=原值+本条发票的融资余额(点击接受改变之后还款金额的初始值)
	if(rowData.payPrinAmtOld!=0){
		ttlLoanBal = SCFUtils.Math(ttlLoanBal,rowData.payPrinAmtOld, 'add');
	}else{
		ttlLoanBal = SCFUtils.Math(ttlLoanBal,0, 'add');
	}
	
	$('#ttlLoanBal').numberbox('setValue', ttlLoanBal);
	rowData.payPrinAmtOld = 0;
	updateGridRow(rowIndex, rowData);
	endEditing();
}

function onCheckAll(rows) {
	$.each(rows, function(i, n) {
		//onUncheck(i, n);
//		updateInvLoanEbal(n, 'add');
//		updateInvLoanBal(n, 'add');
		onCheck(i, n);
	});
}

function onUncheckAll(rows) {
	$.each(rows, function(i, n) {
		onUncheck(i, n);
	});
}

/**
 * 更新融资余额
 * 
 * @param rowData
 * @param flag
 *            add||sub
 */
function updateInvLoanEbal(rowData, flag) {
	rowData.invLoanEbal = SCFUtils.Math(rowData.invLoanEbal,
			rowData.payPrinAmt, flag);
}

/**
 * 更新发票总融资余额
 * 
 * @param rowData
 * @param flag
 *            add||sub
 */
function updateInvLoanBal(rowData, flag) {
	rowData.invLoanBal = SCFUtils.Math(rowData.invLoanBal, rowData.payPrinAmt,
			flag);
}

function updateGridRow(rowIndex, rowData) {
	var pager = $.data($('#invTable')[0],"datagrid").panel.children("div.datagrid-pager");
	var pageNumber = pager.pagination("options").pageNumber;
	var pageSize = pager.pagination("options").pageSize;
	var index = (pageNumber-1)*pageSize +rowIndex; 
	
	$('#invTable').datagrid('updateRow', {
		index : index,
		row : rowData
	});
}

/**
 * sum grid int_amt 汇总表格利息
 * 
 * @param rowData
 * @param flag
 */
function sumIntAmt(rowData, flag) {
	var payIntAmt = $('#payIntAmt').numberbox('getValue');// 利息总额
	rowData.intAmt = rowData.intAmt || 0;
	payIntAmt = SCFUtils.Math(payIntAmt, parseFloat(rowData.currPayInt).toFixed(2), flag);
	$('#payIntAmt').numberbox('setValue', payIntAmt);
}

/**
 * sum grid pmt_amt 汇总表格还款金额。
 * 
 * @param rowData
 * @param flag
 */
function sumPmtAmt(rowData, flag) {
	var ttlPmtAmt = $('#ttlPmtAmt').numberbox('getValue');// 本次还款金额
	ttlPmtAmt = SCFUtils.Math(ttlPmtAmt, rowData.pmtAmt, flag);
	$('#ttlPmtAmt').numberbox('setValue', ttlPmtAmt);
}

/**
 * sum grid int_amt 汇总表格本次还本金
 * 
 * @param rowData
 * @param flag
 */
function sumPayPrinAmt(rowData, flag) {
	var payPrinAmt = $('#payPrinAmt').numberbox('getValue');// 利息总额
	payPrinAmt = SCFUtils.Math(payPrinAmt, rowData.payPrinAmt, flag);
	$('#payPrinAmt').numberbox('setValue', payPrinAmt);
}

// 在点下一步的时候，添加协议额度和theirRef
function sumLmtBal() {
	// var selLmtBal = $('#selLmtBal').val();//客户额度
	var lmtBal = $('#lmtBal').val();// 协议额度
	// $('#selLmtBal').val(selLmtBal);
	$('#lmtBal').val(lmtBal);
	var griddata = SCFUtils.getGridData('invTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	$.each(datas, function(i, n) {
		// selLmtBal = SCFUtils.Math(parseFloat(selLmtBal).toFixed(2),n.pmtAmt,
		// 'add');
		lmtBal = SCFUtils.Math(parseFloat(lmtBal).toFixed(2), n.payPrinAmt,
				'add');
	});
	// $('#selLmtBal').val(selLmtBal);
	$('#lmtBal').val(lmtBal);
	var sysRefNo = $('#sysRefNo').val();
	$('#theirRef').val(sysRefNo);
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
	var griddata = SCFUtils.getSelectedGridData('invTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	$.each(datas, function(i, n) {
		var eventTimes = queryInvcEmaxEventTImes(n.invId);
		$.extend(n, {
			eventTimes : eventTimes
		});

	});
}

/*
 * 获取卖方额度信息
 */
function getSellerData() {
	querySellerLmt();
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
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtBal,$('#ttlPmtAmt').numberbox('getValue'),'add') ;//卖方额度余额=原卖方额度余额+还款余额
		obj.lmtAllocate = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtAllocate,$('#ttlPmtAmt').numberbox('getValue'),'sub') ;//本次占用额度=原来占用额度-还款余额
		obj.lmtRecover = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtRecover,$('#ttlPmtAmt').numberbox('getValue'),'add') ;//归还额度=原归还额度+还款余额

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
	if(editIndex !== undefined){
		SCFUtils.alert('请您点击接受改变按键以便进行下一步操作！');
		return;
	}
	var ttlPmtAmt = $('#ttlPmtAmt').numberbox('getValue');
	if (ttlPmtAmt == 0) {
		SCFUtils.alert('本次还本金金额为零,请勾选应收账款！');
		return;
	}
	var ttlLoanBal = $('#ttlLoanBal').numberbox('getValue');// 融资余额
	var payPrinAmt = $('#payPrinAmt').numberbox('getValue');// 本次还本金
//	if (SCFUtils.Math(ttlLoanBal, payPrinAmt, 'sub') < 0) {
//		SCFUtils.alert('本次应收账款还本金金额超出融资余额,请重新勾选！');
//		return;
//	}
	addEventTimes();// 提交时给还款子表的eventTimes字段赋值
	sumLmtBal();// 添加协议额度和theirRef
	var mainData = SCFUtils.convertArray('rePaymentForm');
	
	var cntrctNo = mainData.cntrctNo;//协议编号
	//协议相关信息
	var cntrct=queryCntrctInfo(cntrctNo);
	$.extend(mainData,{
		"cntrctLmtCcy" : cntrct.lmtCcy ,//额度币别
		
		"cntrctLmtBal" : SCFUtils.Math(cntrct.lmtBal, ttlPmtAmt, 'add'),//协议_额度余额 = 原额度余额+本次还款金额
		
		'cntrctLmtAmt' : cntrct.lmtAmt, //协议_额度金额
		
		'cntrctLmtAllocate' : SCFUtils.Math(cntrct.lmtAllocate, ttlPmtAmt, 'sub'), //协议_占用额度 = 原占用额度-本次还款金额
		
		'cntrctLmtRecover' :SCFUtils.Math(cntrct.lmtRecover, ttlPmtAmt, 'add'),//协议_归还额度 =原归还额度+本次还款金额
		
		'confirmFlag' : 1,
		
		'lmtCcy' : $("#ccy").combobox('getValue')
	});
//	if (mainData != null) {
//		mainData.ttlLoanBal = SCFUtils.Math(ttlLoanBal, payPrinAmt, 'sub');
//	}
	var grid = {};
	var griddata;
	if ('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE) {
		griddata = SCFUtils.getGridData('invTable');
	} else {
		griddata = SCFUtils.getSelectedGridData('invTable', false);
	}
	$.each(SCFUtils.parseGridData(griddata), function(i, n){
		$.extend(n,{"currInt":n.intAmt});
	});
	grid.invc = SCFUtils.json2str(griddata);
	
	var payIntTp = $('#payIntTp').combobox('getValue');
	if('2' == payIntTp){//利随本清时打包利息表数据
		//得到利息产生时间
		var createDt = "";
		if('PM' === SCFUtils.FUNCTYPE){
			createDt = $("#loanValDt").val();
		}else{
			var createDt = relQueryIntE().createDt;
		}
		//利息计算
		var intList= {};
		intList._total_rows = 1;//total_rows不给值会默认没有数据，一笔还款只有一条记录
		var obj= {};
		obj.sysRefNo = $("#intSysRefNo").val();
		obj.cntrctNo = $('#cntrctNo').val();
		obj.trxDt = $('#pmtDt').datebox('getValue');
		obj.selId = $('#selId').val();
		obj.busiTp = $("#busiTp").combobox('getValue');
		obj.intTp = 0;
		obj.intCcy = $("#ccy").combobox('getValue');
		obj.currInt = 0;//利随本清时，本次应收利息为0
		obj.currIntDt = SCFUtils.getcurrentdate();//利随本清时，本次应收利息日期为当前时间  new
		obj.currPayInt = $('#payIntAmt').numberbox('getValue');//本次实收利息
		obj.currIntPayDt = $('#pmtDt').datebox('getValue');//本次利息实收日期
		obj.theirRef = $('#sysRefNo').val();
		obj.selAcNo =queryCustAcno().acNo;//收费扣款账号
		obj.selAcNm = queryCustAcno().acNm;//账户户名
		obj.selAcBkNm = queryCustAcno().acBkNm;//开户行行名
		obj.intAmt = '';//总利息金额
		obj.createDt = createDt;//利息产生时间=融资起始日(PM时生成，其余都查询)
		obj.intPayFlg = 1;//利息收取标志 0.应收未收 1.应收已收
		obj.payIntTp = 2;//new 收取方式（edit）
		obj.overdueInt = '';//本次逾期利息
		intList['rows0'] = obj;
		grid.int = SCFUtils.json2str(intList);
	}
	//打包买方额度数据
	//grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
	//打包卖方额度数据
	grid.sellerLmt = SCFUtils.json2str(getSellerData());
	$.extend($.extend(mainData, grid));
	return mainData;
}

var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#invTable').datagrid('validateRow', editIndex)) {
		$('#invTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function getRow(_773,p){
	var _774=(typeof p=="object")?p.attr("datagrid-row-index"):p;
	var jq = $.data(_773,"datagrid");
	var data = jq.data;	
	if(jq.allData){			
		data.rows=jq.allData.rows.concat();
		data.total= data.rows.length;
	}
	return data.rows[parseInt(_774)];
}

function isCheck(index){
	return getRow($('#invTable')[0],index).ck;
}

function onClickRow(index) {
	if (editIndex != index) {
		if (endEditing()) {
			$('#invTable').datagrid('beginEdit',index);
			editIndex = index;
		} else {
			$('#invTable').datagrid('selectRow', editIndex);
		}
	}
}

function accept() {
	$('#invTable').datagrid('acceptChanges');
	var data = $('#invTable').datagrid('getSelections');
	var sumPmtAmt = 0;
	var intAmtPmtAmt = 0;
	var invLoanEbals = 0;
	var invLoanbals = 0;
	var ttlLoanBals = 0;
	var ttlInvLoanBal = 0;//汇总选择行的发票融资余额
	var currPayIntAmt = 0;//汇总本次还利息
	$.each(data, function(i, n) {
		var rowindex = $("#invTable").datagrid('getAllRowIndex',n);
		
		// var intAmt = n.intAmt;
		var invLoanEbalHD = n.invLoanEbalHD; // 融资余额
		// var invLoanEbal = n.invLoanEbal;
		 var ttlLoanBal = $('#ttlLoanBalHD').val();
		// var invLoanBalHD = n.invLoanBalHD;//
		var pmtAmt = n.pmtAmt;// 还款金额		
		// *1 还款金额>=融资余额 本次还本金 = 融资余额;//目前还款金额要小于等于融资金额+利息 modify by YeQing 2016-09-19
		// *2 还款金额<融资余额 本次还本金 = 本次还款金额;
		if (SCFUtils.Math(n.pmtAmt, SCFUtils.Math(n.invLoanEbalHD, parseFloat(n.intAmtHD).toFixed(2), 'add'), 'sub') > 0) {
			SCFUtils.alert("应收账款编号为："+n.invNo+"的本次还款金额超出融资余额加利息！请重新输入。");
			pmtAmt = invLoanEbalHD;
		} 
		//如果还款金额大于等于利息
		var payPrinAmt=0;
		var currPayInt=0;
		if(SCFUtils.Math(pmtAmt, n.intAmtHD, 'sub') >= 0){
			//还款本金=还款金额-利息
			n.payPrinAmt = pmtAmt-parseFloat(n.intAmtHD).toFixed(2);
			payPrinAmt = n.payPrinAmt;
			currPayInt=n.intAmtHD;//本次还利息等于计算出的利息
		}else{
			payPrinAmt = 0;
			currPayInt=pmtAmt;//本次还利息等于还款金额
		}
		currPayIntAmt=SCFUtils.Math(currPayIntAmt, parseFloat(currPayInt).toFixed(2), 'add');
			
		//if (SCFUtils.Math(sumPmtAmt, invLoanEbalHD, 'sub') <= 0) {
		if (SCFUtils.Math(sumPmtAmt, ttlLoanBal, 'sub') <= 0) {// 还款总额小于融资余额
			invLoanbals = SCFUtils.Math(invLoanEbalHD, payPrinAmt, 'sub');// 发票总融资余额
			// 融资余额=原融资余额-还款本金
			invLoanEbals = SCFUtils.Math(invLoanEbalHD, payPrinAmt, 'sub');// 融资余额
			sumPmtAmt = SCFUtils.Math(sumPmtAmt, payPrinAmt, 'add');
			intAmtPmtAmt = SCFUtils.Math(intAmtPmtAmt, pmtAmt, 'add');// 本次还款金额
			var S1=SCFUtils.Math(ttlLoanBal, payPrinAmt, 'sub');
			var S2=SCFUtils.Math(invLoanEbalHD, payPrinAmt, 'sub');
			if( SCFUtils.Math(S1, S2, 'sub')==0 && S1>=0){
				ttlLoanBals = S1;
			}else{
				ttlLoanBals =ttlLoanBal;
			}
			$('#invTable').datagrid('updateRow', {
				index : rowindex,
				row : {
					payPrinAmt : payPrinAmt, // 本次还款金额
					payPrinAmtOld : payPrinAmt, // 本次还款金额历史参照记录
					pmtAmt : pmtAmt,
					invLoanEbal : invLoanEbals,
					invLoanBal : invLoanbals,
					currPayInt:currPayInt,
					intAmt:SCFUtils.Math(parseFloat(n.intAmtHD).toFixed(2), currPayInt, 'sub')//最新利息
				}
			});
		} else {
			SCFUtils.alert("应收账款还款金额超出融资余额！！！");
		}
	});
	$('#payPrinAmt').numberspinner('setValue', sumPmtAmt);
	var invcGridData = SCFUtils.getGridData('invTable',false);
	$.each(SCFUtils.parseGridData(invcGridData), function(i, n){
		ttlInvLoanBal = SCFUtils.Math(ttlInvLoanBal, n.invLoanEbal, 'add');
	});
	$('#ttlLoanBal').numberbox('setValue', ttlInvLoanBal);
	$('#ttlPmtAmt').numberspinner('setValue', intAmtPmtAmt);
	$('#payIntAmt').numberspinner('setValue', currPayIntAmt);
	endEditing();
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

/*
 * 为FP点击查询后，给ttlLoanBalHD元素赋值，用于accept方法中的检测
 * new  on  2016-08-24  by JinJh
 */
function queryTtlLoanBalHD(){
	var sysLockBy = $("#sysRefNo").val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000601',
				sysLockBy:sysLockBy
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$("#ttlLoanBalHD").val(data.rows[0].ttlLoanBal);
				}
			}
		};
		SCFUtils.ajax(options);
}
/*
 * 复核时候查询INT的E表
 */
function relQueryIntE(){
	var obj = {};
	var selId = $("#selId").val();
	var sysRefNo = $("#sysRefNo").val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000618',
			selId : selId,
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$("#intSysRefNo").val(data.rows[0].sysRefNo);
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

/*
 * new on 2016-10-12 by JJH
 * 查询卖方的扣款账号
 */
function queryCustAcno(){
	var acOwnerid=$("#selId").val();
	var obj = {};
	if(!SCFUtils.isEmpty(acOwnerid)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000180',
					acOwnerid : acOwnerid,
					acFlag    : 'R',
					acTp    : '2'
				},
				callBackFun : function(data1) {
					if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
						obj = data1.rows[0];
					}
				}
			};
			SCFUtils.ajax(opt);
			return obj;
	}
}

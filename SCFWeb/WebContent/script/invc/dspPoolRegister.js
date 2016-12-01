function pageOnInt() {
	ajaxBox();
	ajaxTable();
	SCFUtils.setTextReadonly('sysRefNo', true);// 争议流水号
	SCFUtils.setTextReadonly('trxDt', true);// 争议登记日期
	SCFUtils.setTextReadonly('selId', true);// 授信客户编号
	SCFUtils.setTextReadonly('selNm', true);// 授信客户名称
	var date = SCFUtils.getcurrentdate();
	$('#trxDt').val(date);
	// SCFUtils.setComboReadonly('busiTp', true);// 业务类别
	SCFUtils.setNumberboxReadonly('ttlDspInvNo', true);// 发票总份数
	SCFUtils.setNumberboxReadonly('ttlDspInvAmt', true);// 发票争议总金额
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


function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('invcMForm', data);
	// modify by shizaiqiang 用于重新规范使用catalog
	$('#selId').val(data.obj.sysRefNo);
	$('#selNm').val(data.obj.custNm);
	$('#busiTp').val(6);
	if ("FP" == SCFUtils.FUNCTYPE) {
		loadTable();
	} else {
		var options = {};
		options.data = {
			refName : 'DspRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);// 流水号
		// querySelAcNo(data);
		// $('#billAmt').val(data.obj.billAmt); // 应收账款处理单笔费
		// $('#transChgrt').val(data.obj.transChgrt); // 手续费费率
		$('#buyerId').val(data.obj.buyerId);// 核心企业编号
		$('#cntrctNo').val(data.obj.cntrctNo);// 协议编号
	}
	lookSysRelReason();
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('invcMForm', data);
	SCFUtils.loadGridData('invcMTable', SCFUtils.parseGridData(data.obj.invc),
			true);// 加载数据并保护表格。
	lookSysRelReason();
}

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('invcMForm', data);
	if ("PM" === SCFUtils.FUNCTYPE) {
		SCFUtils.loadGridData('invcMTable', SCFUtils
				.parseGridData(data.obj.invc), false);
	} else {
		SCFUtils.loadGridData('invcMTable', SCFUtils
				.parseGridData(data.obj.invc), true);
	}
	$('#invcMTable').datagrid('selectAll',true);
	lookSysRelReason();
}

function pageOnFPLoad(data) {
	pageOnReleasePageLoad(data);
	/*var optionsGrid = $('#invcCdnTable').datagrid('options');
	optionsGrid.onCheck = onCheck;
	optionsGrid.onUncheck = onUncheck;
	optionsGrid.onCheckAll = onCheckAll;
	optionsGrid.onUncheckAll = onUncheckAll;*/
	// $('#invcCdnTable').datagrid('checkAll');
	// 在加载数据初始化时就将datagrid中的数据默认全勾选
	// $('#billTable').datagrid('selectAll', true);//
	// 在加载数据初始化时就将datagrid中的数据默认全勾选
	lookSysRelReason();
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('invcMForm', row);
	$('#trxDt').val(SCFUtils.dateFormat(data.obj.trxDt, 'yyyy-MM-dd'));// 争议登记日期
	loadTable();
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

function onNextBtnClick() {
	var data = SCFUtils.convertArray('invcMForm');
	var pageList = SCFUtils.getGridData("invcMTable");
	var grid = {};
	if (pageList && !SCFUtils.isEmpty(pageList)) {
		$.each(pageList,function(i,n){
			$.extend(n,{
				"busiTp" : 6
			});
		});
		grid.invc = SCFUtils.json2str(pageList);
	}
	// getCntrctMTable();
	$.extend(data, grid);
	// 继承
	return data;

	if (checkDataGrid()) {
		return;
	}
}

// 计算争议发票总金额
function getTtlDspInvAmt() {
	var data = SCFUtils.convertArray("invcMForm");
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (griddata._total_rows == 0) {
		$('#ttlDspInvAmt').numberspinner('setValue', 0);
		$('#ttlDspInvNo').numberspinner('setValue', 0);
	} else {
		var ttlDspInvAmt = 0;
		$.each(datas, function(i, n) {
			ttlDspInvAmt = SCFUtils.Math(ttlDspInvAmt, n.dspAmt, 'add');
		});
		$('#ttlDspInvAmt').numberspinner('setValue', ttlDspInvAmt);
		$('#ttlDspInvNo').numberbox('setValue', datas.length);
	}
}
function ajaxBox() {
	// var data = [ {
	// "id" : '0',
	// "text" : "国内有追索权保理"
	// }, {
	// "id" : '1',
	// "text" : "国内无追索权保理"
	// }, {
	// "id" : '3',
	// "text" : "信用保险项下"
	// } ];
	// $("#busiTp").combobox('loadData', data);

	/*
	 * var dspFlag = [ { "id" : '0', "text" : "争议" }, { "id" : '1', "text" :
	 * "催复" }, { "id" : '2', "text" : "解决" } ];
	 * $("#dspFlag").combobox('loadData', dspFlag);
	 * 
	 * $("#dspFlag").combobox('setValue', "0");
	 */
	// $("#dspFlag").val("0");
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
		SCFUtils.ajax(opt);
	}
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function loadTable() {
	var dspRef = $('#sysRefNo').val();
	// var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000600',
			dspRef : dspRef,
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {

				/*
				 * $.each(data.rows, function(i, n) {
				 * if(!SCFUtils.isEmpty(n.cntrctNo)){ var obj =
				 * QueryCntrctETable(n.cntrctNo); $.extend(n,{ 'arAvalLoan' :
				 * obj[0].arAvalLoan, 'arBal' : obj[0].arBal, 'poolLine' :
				 * obj[0].poolLine, cntrctNo : obj[0].sysRefNo, }); } });
				 */
				SCFUtils.loadGridData('invcMTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function getCntrctMTable() {
	var pageList = SCFUtils.getGridData("invcMTable");
	$.each(SCFUtils.parseGridData(pageList),
			function(i, n) {
				if (!SCFUtils.isEmpty(n.cntrctNo)) {
					var obj = QueryCntrctMTable(n.cntrctNo);
					$('#arAvavLoanHD').val(obj[0].arAvalLoan);
					$('#arBalHD').val(obj[0].arBal);
					$('#poolLineHD').val(obj[0].poolLine);

					$('#arAvavLoan').val(
							SCFUtils.Math($('#arAvavLoan').val(), n.arAvalLoan,
									'add'));
					$('#arBal').val(
							SCFUtils.Math($('#arBal').val(), n.arBal, 'add'));
					$('#poolLine').val(
							SCFUtils.Math($('#poolLine').val(), n.poolLine,
									'add'));

				}
			});
	$('#arAvavLoan').val(
			SCFUtils.Math($('#arAvavLoanHD').val(), $('#arAvavLoan').val(),
					'sub'));
	$('#arBal').val(
			SCFUtils.Math($('#arBalHD').val(), $('#arBal').val(), 'sub'));
	$('#poolLine').val(
			SCFUtils.Math($('#poolLineHD').val(), $('#poolLine').val(), 'sub'));
	if ($('#arAvalLoan').val() < 0) {
		$('#arAvalLoan').val('0')
	}
	if ($('#arBal').val() < 0) {
		$('#arBal').val('0')
	}
	if ($('#poolLine').val() < 0) {
		$('#poolLine').val('0')
	}
}

function QueryCntrctETable(cntcrtNo) {
	// var cntrctNo = $('#cntrctNo').val();
	var obj;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000602',
			cntcrtNo : cntcrtNo,
		},
		callBackFun : function(data) {
			obj = data.rows;

		}
	};
	SCFUtils.ajax(options);
	return obj;
}

function QueryCntrctMTable(cntcrtNo) {
	// var cntrctNo = $('#cntrctNo').val();
	var obj;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000602',
			cntcrtNo : cntcrtNo,
		},
		callBackFun : function(data) {
			obj = data.rows;

		}
	};
	SCFUtils.ajax(options);
	return obj;
}

function checkDataGrid() {
	var flag = false;
	var data = $('#invcMTable').datagrid('getData');
	if (data.total == 0) {
		SCFUtils.alert('请添加应收账款！');
		flag = true;
	}

	var nowDate = $('#trxDt').datebox('getValue');
	var lmtDueDt = $('#lmtDueDt').datebox('getValue');
	if (SCFUtils.DateDiff(nowDate, lmtDueDt) > 0) {
		SCFUtils.alert('间接客户额度已过期，请检查！！');
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
		// fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'buyerId',
			title : '间接客户编号',
			width : '5.56%',
			resizable : true
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : '5.56%',
			resizable : true
		}, {
			field : 'invNo',
			title : '应收账款凭证编号',
			width : '5.56%',
			resizable : true
		}, {
			field : 'invCcy',
			title : '币种',
			width : '5.56%',
			formatter : ccyFormater,
			resizable : true
		}, {
			field : 'invAmt',
			title : '应收账款金额',
			width : '5.56%',
			formatter : ccyFormater,
			resizable : true
		}, {
			field : 'acctAmt',
			title : '预付款金额',
			width : '5.56%',
			formatter : ccyFormater,
			resizable : true
		}, {
			field : 'invBal',
			title : '应收账款净额',
			width : '5.56%',
			formatter : ccyFormater,
			resizable : true
		}, {
			field : 'invDt',
			title : '应收账款开立日期',
			width : '5.56%',
			formatter : dateFormater,
			resizable : true
		}, {
			field : 'invValDt',
			title : '应收账款起算日',
			width : '5.56%',
			formatter : dateFormater,
			resizable : true
		}, {
			field : 'acctPeriod',
			title : '账期',
			width : '5.56%',
			resizable : true
		}, {
			field : 'invDueDt',
			title : '到期日',
			width : '5.56%',
			formatter : dateFormater,
			resizable : true
		}, {
			field : 'loanPerc',
			title : '融资比例',
			width : '5.56%',
			formatter : pectType,
			resizable : true
		}, {
			field : 'invLoanAval',
			title : '可融资金额',
			width : '5.56%',
			formatter : ccyFormater,
			resizable : true
		}, {
			field : 'invLoanBal',
			title : '已融资金额',
			width : '5.56%',
			formatter : ccyFormater,
			resizable : true
		}, {
			field : 'dspAmt',
			title : '争议金额',
			width : '5.56%',
			formatter : ccyFormater,
			resizable : true
		}, {
			field : 'dspDt',
			title : '争议日期',
			width : '5.56%',
			resizable : true
		}, {
			field : 'dspFlag',
			title : '发票争议标识',
			width : 70,
			hidden : true
		}, {
			field : 'dspRsn',
			title : '发票争议原因',
			width : '5.56%',
			formatter : function(value, row, index) {
				if (value === "0") {
					return "买方收到发票重复";
				}
				if (value === "1") {
					return "买方没有收到发票";
				}
				if (value === "2") {
					return "其他";
				}
			}
		}, {
			field : 'otherRsn',
			title : '其他原因',
			width : '5.56%',
			resizable : true
		}, {
			field : 'dspRef',
			title : '争议流水号',
			width : 70,
			hidden : true
		}, {
			field : 'arAvalLoan',
			title : '可融资金额',
			width : 70,
			hidden : true
		}, {
			field : 'arBal',
			title : '应收账款融资余额',
			width : 70,
			hidden : true
		}, {
			field : 'poolLine',
			title : '池水位',
			width : 70,
			hidden : true
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			width : 70,
			hidden : true
		} ] ]
	};
	$('#invcMTable').datagrid(options);
}

function addInvcRow() {
	var data = SCFUtils.convertArray("invcMForm");
	// 添加前验证表单是否完整
	if (data) {
		var row = {};
		var collateralData = $("#invcMTable").datagrid('getAllData');
		row.trxId = $('#sysRefNo').val();
		row.cntrctNo = $('#cntrctNo').val();
		row.selId = $('#selId').val();
		row.trxDt = $('#trxDt').val();
		row.buyerId = $('#buyerId').val();
		row.collateralData = collateralData;
		row.op = 'add';
		var options = {
			title : '添加应收账款信息',
			reqid : 'I_P_000207',
			data : {
				'row' : row
			},
			onSuccess : addInvcRowSuccess
		};
		SCFUtils.getData(options);
	}

}
function addInvcRowSuccess(data) {
	var invNoList = getInvNo();
	if (contains(invNoList, data.invNo)) {
		SCFUtils.error('应收账款编号为：' + data.invNo + '的应收账款在表格或数据库中已存在!');
		return;
	}

	$('#dspFlag').val(data.dspFlag);
	// $('#cntrctNo').val(data.cntrctNo);
	data.type = "ADD";
	$('#invcMTable').datagrid('appendRow', data);

	getTtlDspInvAmt();
	// $('#ttlLoanAmt').numberbox('setValue', calcTtlLoanAmt());
}

function editInvcRow() {
	var row = $('#invcMTable').datagrid('getSelections');
	// row.busiTp = $('#busiTp').combobox('getValue');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title : '修改应收账款',
			height : '370',
			reqid : 'I_P_000187',
			data : {
				'row' : row
			},
			onSuccess : editInvcRowSuccess
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
function editInvcRowSuccess(data) {
	if ("RE" != SCFUtils.FUNCTYPE) {
		var invNoList = getInvNo();
		// 移除在修改之前的那张发票编号
		var index = getArrIndex(invNoList, data.oldInvNo);
		if (index >= 0) {
			invNoList.splice(index, 1);// 从索引index开始删除1条数据（包含该索引）
		}
		if (data.oldInvNo != data.invNo && contains(invNoList, data.invNo)) {
			SCFUtils.error('应收账款编号为：' + data.invNo + '的应收账款在表格或数据库中已存在!');
			return;
		}
	}
	var row = $('#invcMTable').datagrid('getSelected');
	var rowIndex = $('#invcMTable').datagrid('getRowIndex', row);
	$('#invcMTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	getTtlDspInvAmt();
}

function searchPmt() {
	var cntrctNo = $('#cntrctNo').val();
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000446',
			cntrctNo : cntrctNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#invcMTable').datagrid('clearChecked');
					var sysRefNo = $('#sysRefNo').val();
					var selId = $('#selId').val();
					var cntrctNo = $('#cntrctNo').val();
					var trxDt = $('#trxDt').val();
					$.each(data.rows, function(i, n) {
						$.extend(n, {
							buyerId : n.buyerId,
							buyerNm : n.buyerNm,
							invNo : n.invNo,
							invCcy : n.invCcy,
							invAmt : n.invAmt,
							acctAmt : n.acctAmt,
							invBal : n.invBal,
							invDt : n.invDt,
							invValDt : n.invValDt,
							acctPeriod : n.acctPeriod,
							invDueDt : n.invDueDt,
							loanPerc : n.loanPerc,
							invLoanAval : n.invLoanAval,
							invLoanBal : n.invLoanBal,
							dspAmt : n.dspAmt,
							dspDt : trxDt,
							dspFlag : n.dspFlag,
							dspRsn : n.dspRsn,
							otherRsn : n.otherRsn,
							dspRef : sysRefNo
						});
					});
					SCFUtils.loadGridData('invcMTable', data.rows, false, true);
					var befregNo = 0;
					var regNo = SCFUtils.Math(data.total, befregNo, 'add');
					$('#ttlDspInvNo').val(regNo);
					var regAmt = 0;
					$.each(data.rows, function(i, n) {
						regAmt = SCFUtils.Math(regAmt, n.dspAmt, 'add');
					});
					$("#ttlDspInvAmt").numberbox('setValue', regAmt);// 设置待转让金额
					loadGridData(data, false, true);

					$('#payIntAmt').numberbox('setValue', 0);
					$('#ttlPmtAmt').numberbox('setValue', 0);
					$('#payPrinAmt').numberbox('setValue', 0);
					queryRelCntrct();
					queryCust();

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

function loadGridData(data, flag1, flag2) {
	var sysRefNo = $('#sysRefNo').val(); // var loanId = $('#loanId').val();
	// var selId =
	$('#selId').val();
	var cntrctNo = $('#cntrctNo').val();
	$.each(data.rows, function(i, n) {
		n.sysRefNo = sysRefNo + n.invId;
		n.invSts = 'SELPMT';
		n.invPmtRef = sysRefNo;
		n.invRef = n.invId;
		n.invLoanEbalHD = n.invLoanEbal; //
		n.loanId = loanId;
		n.selId = selId;
		n.cntrctNo = cntrctNo;
	});
	SCFUtils.loadGridData('invcMTable', data.rows, flag1, flag2);
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

	/*
	 * var options = { url : SCFUtils.AJAXURL, data : { queryId : 'Q_P_000032' },
	 * callBackFun : function(data) { if (!SCFUtils.isEmpty(data.rows)) {
	 * $.each(data.rows, function(i, m) { invNoList.push(m.invNo); }); } } };
	 * SCFUtils.ajax(options);
	 */
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

function addSuccess(data) {
	var invNoList = getInvNo();
	if (contains(invNoList, data.invNo)) {
		SCFUtils.error('应收账款编号为：' + data.invNo + '的应收账款在表格或数据库中已存在!');
		return;
	}
	data.type = "ADD";
	getAmt(data);
	$('#invcMTable').datagrid('appendRow', data);
}

function editSuccess(data) {
	if ("RE" != SCFUtils.FUNCTYPE) {
		var invNoList = getInvNo();
		// 移除在修改之前的那张发票编号
		var index = getArrIndex(invNoList, data.oldInvNo);
		if (index >= 0) {
			invNoList.splice(index, 1);// 从索引index开始删除1条数据（包含该索引）
		}
		if (data.oldInvNo != data.invNo && contains(invNoList, data.invNo)) {
			SCFUtils.error('应收账款编号为：' + data.invNo + '的应收账款在表格或数据库中已存在!');
			return;
		}
	}
	var regAmt = 0; // 累计金额
	var upAmt = 0; // 修改前净额
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	$.each(datas, function(i, n) {
		regAmt = SCFUtils.Math(regAmt, n.invBal, 'add');
		if (i == index) {
			upAmt = n.invBal;
		}
	});
	var cntrctAmt = queryAmt();// 额度信息
	var cAmt = SCFUtils.Math(data.invBal, upAmt, 'sub');// 修改前后差值
	regAmt = SCFUtils.Math(cAmt, regAmt, 'add');
	$("#regAmt").numberbox('setValue', regAmt);
	var transChgrt = cntrctAmt.transChgrt; // 计算手续费
	var pdgAmt = SCFUtils.Math(regAmt, transChgrt, 'mul');
	pdgAmt = SCFUtils.Math(pdgAmt, 100, 'div');
	$('#pdgAmt').numberbox('setValue', pdgAmt);
	var row = $('#invcMTable').datagrid('getSelected');
	var rowIndex = $('#invcMTable').datagrid('getRowIndex', row);
	$('#invcMTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
}
// 新增一条数据
function addRow() {
	var data = SCFUtils.convertArray('invcMForm');
	if (data) {
		var row = {};
		row.cntrctNo = $('#cntrctNo').val();
		row.acctPeriod = $('#acctPeriod').val();
		// row.busiTp = $('#busiTp').combobox('getValue');
		row.invCcy = $('#ccy').combobox('getValue');
		row.selId = $('#selId').val();
		row.batchNo = $('#sysRefNo').val();
		row.op = 'add';
		var options = {
			title : '新增应收账款',
			height : '370',
			reqid : 'I_P_000006',
			data : {
				'row' : row
			},
			onSuccess : addSuccess
		};
		SCFUtils.getData(options);
	}

}
// 修改一条数据
function editRow() {
	var row = $('#invcMTable').datagrid('getSelections');
	// row.busiTp = $('#busiTp').combobox('getValue');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title : '修改应收账款',
			height : '370',
			reqid : 'I_P_000187',
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

function deleteInvcRow() {
	var rows = $('#invcMTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#invcMTable').datagrid('getAllRowIndex',
							copyRows[i].sysRefNo);

					$('#invcMTable').datagrid('deleteRow', index);

				}
				SCFUtils.refreshAllRows("invcMTable");// 删除后刷新行记录
				getTtlDspInvAmt();
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteRow() {
	var rows = $('#invcMTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	var cntrctAmt = queryAmt();// 额度信息
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#invcMTable').datagrid('getAllRowIndex',
							copyRows[i].sysRefNo);
					var regAmt = $("#regAmt").numberbox('getValue');
					var griddata = SCFUtils.getGridData('invcMTable', false);
					var datas = SCFUtils.parseGridData(griddata, false);
					regAmt = SCFUtils.Math(regAmt, datas[index].invBal, 'sub');
					$("#regAmt").numberbox('setValue', regAmt);
					var billAmt = cntrctAmt.billAmt; // 每笔应收账款处理费
					var transChgrt = cntrctAmt.transChgrt; // 计算手续费
					var pdgAmt = SCFUtils.Math(regAmt, transChgrt, 'mul');
					pdgAmt = SCFUtils.Math(pdgAmt, 100, 'div');
					$('#pdgAmt').numberbox('setValue', pdgAmt);
					var regNo = $("#regNo").val();
					regNo = SCFUtils.Math(regNo, 1, 'sub');
					if (regNo == 0) {
						$("#docketAmt").numberbox('setValue', 0);
					} else {
						var docketAmt = SCFUtils.Math(regNo, billAmt, 'mul');
						$("#docketAmt").numberbox('setValue', docketAmt);
					}
					// 待转让笔数
					var regNo = SCFUtils.Math(
							$('#regNo').numberbox('getValue'), 1, 'sub');
					$('#regNo').numberbox('setValue', regNo);
					$('#invcMTable').datagrid('deleteRow', index);
				}
				SCFUtils.refreshAllRows("invcMTable");// 删除后刷新行记录
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}

}

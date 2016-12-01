function ajaxTable() {
	// 加载表格
	var options = {
		rownumbers : true,
		checkOnSelect : true,
		idField : "sysRefNo",
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		// fitColumns : true,// 列自适应表格宽度
		// striped : true, // 当true时，单元格显示条纹,
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'verifPerc',
			title : '核销差额比例(%)',
			hidden : true,
			width : 60
		}, {
			field : 'verifLimit',
			title : '核销最大差额',
			hidden : true,
			width : 105,
			formatter : ccyFormater
		}, {
			field : 'sysRefNo',
			title : '还款编号',
			width : 105
		}, {
			field : 'payPrinAmt',
			title : '还本金金额',
			width : 105,
			formatter : ccyFormater
		}, {
			field : 'payIntAmt',
			title : '还利息金额',
			width : 105,
			formatter : ccyFormater
		}, {
			field : 'currFinPayCost',
			title : '本次已收费用',
			width : 120,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'currFinCost',
			title : '本次应收费用',
			width : 105,
			formatter : ccyFormater
		}, {
			field : 'ttlPmtAmt',
			title : '合计还款金额',
			width : 105,
			formatter : ccyFormater
		}, {
			field : 'pmtDt',
			title : '还款日期',
			width : 105,
			formatter : dateFormater
		}, {
			field : 'pmtSts',
			title : '还款状态',
			formatter : pmtStsFormater,
			hidden : true
		}, {
			field : 'loanId',
			title : '融资编号',
			width : 105
		}, {
			field : 'ttlLoanBal',
			title : '借款余额',
			width : 80,
			formatter : ccyFormater
		}, {
			field : 'selAcNm',
			title : '户名',
			width : 160
		}, {
			field : 'selAcNo',
			title : '还款账号',
			width : 160
		}, {
			field : 'ttlLoanAmt',
			title : '借款金额',
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'ttlLoanBalHD',
			title : '借款余额(更新回融资表)',
			width : 80,
			hidden : true
		}, {
			field : 'lmtAmt',
			title : '信用额度金额',
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'lmtBal',
			title : '信用额度余额',
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'openLoanAmt',
			title : '融资余额',
			formatter : ccyFormater
		}, {
			field : 'openLoanAmtHD',
			title : '融资余额(更新回协议表)',
			width : 80,
			hidden : true
		}, {
			field : 'arAvalLoan',
			title : '应收账款可融资余额',
			hidden : true,
			formatter : ccyFormater
		}
		// , {
		// field : 'arAvalLoanHD',
		// title : '应收账款可融资余额(更新回协议表)',
		// width : 80,
		// hidden : true
		// }
		, {
			field : 'loanDueDt',
			title : '融资到期日',
			width : 80,
			formatter : dateFormater
		}, {
			field : 'finaSts',
			title : '融资状态',
			hidden : true
		}, {
			field : 'advaPaytype',
			title : '放款资金来源',
			width : 120,
			formatter : adPayTpFormter,
			hidden : true
		} ] ]
	};
	$('#loanDg').datagrid(options);
}
function ajaxBox() {
	var reResult = [ {
		"id" : '0',
		"text" : "点销"
	}, {
		"id" : '1',
		"text" : "转场下"
	} ];
	$("#reResult").combobox('loadData', reResult);
}

function querySelIdBuyAcNo(acNo) {
	if (!SCFUtils.isEmpty(acNo)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000255',
				acNo : acNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#selId').val(data.rows[0].acOwnerid);
				} else {
					SCFUtils.alert("账号" + acNo + "不存在!");
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

function queryRePmtE(sysRefNo) {
	if (sysRefNo) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000264',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					var payPrinAmt = data.rows[0].payPrinAmt;// 本次还本金金额
					var payIntAmt = data.rows[0].payIntAmt;// 本次还利息金额
					var ttlPmtAmt = data.rows[0].ttlPmtAmt;// 合计还款金额
					var currFinCost = SCFUtils.Math(ttlPmtAmt, SCFUtils.Math(
							payPrinAmt, payIntAmt, 'add'), 'sub');// 应收费用
					$.extend(data.rows[0], {
						currFinCost : currFinCost,
					});
					SCFUtils.loadGridData('loanDg', data.rows);
					$('#loanDg').datagrid('checkAll', true);
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

function pageOnInt() {
	ajaxTable();
	ajaxBox();
	if ('RE' != SCFUtils.FUNCTYPE) {
		var tlbarConfigs = {
			showButton : [ 'prev', 'abnormal', 'normal', 'cancel' ],
			isShowText : true
		};
		var tlbarDefine = [ {
			name : 'prev',
			text : '上一步',
			cls : 'btnRed',
			click : 'onPrevBtnClick'
		}, {
			name : 'abnormal',
			text : '转场下',
			cls : 'btnRed',
			click : 'onNextBtnClick'
		}, {
			name : 'normal',
			text : '点销',
			cls : 'btnRed',
			click : 'onNextBtnClick'
		}, {
			name : 'cancel',
			text : '取消',
			cls : 'btnRed',
			click : 'onCancelBtnClick'
		}

		];

		SCFUtils.getToolBar(tlbarConfigs, tlbarDefine);
	}

	SCFUtils.setFormReadonly('#loanPmtSubmit', true);
}
// 打回处理
function pageOnFPLoad(data) {
	// 交换意见
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('loanPmtSubmit', row);

	// SCFUtils.loadForm('loanPmtSubmit', data);
	// querySelIdBuyAcNo(data.obj.selAcNo);
	queryPmtM();
	controlBtn('normal_btn', true); // 点销按钮
	var options = $('#loanDg').datagrid('options');
	options.onCheck = onCheck;

	lookSysRelReason();
	lookeResultDiv();
}
function pageOnLoad(data) {
	// 交换意见
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('loanPmtSubmit', row);

	// SCFUtils.loadForm('loanPmtSubmit', data);
	// 根据"付款人账号"查供应商编号，再根据供应商编号查询该供应商未核销的还款信息流
	// querySelIdBuyAcNo(data.obj.selAcNo);
	queryPmtM();
	// $('#trxDt').val(getDate(new Date()));
	controlBtn('normal_btn', true); // 点销按钮
	var options = $('#loanDg').datagrid('options');
	options.onCheck = onCheck;

	lookeResultDiv();
	lookSysRelReason();
}

// 查询未核销的信息流
function queryPmtM() {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000262',
			selAcNo : $('#selAcNo').val(),
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					var payPrinAmt = n.payPrinAmt;// 本次还本金金额
					var payIntAmt = n.payIntAmt;// 本次还利息金额
					var ttlPmtAmt = n.ttlPmtAmt;// 合计还款金额
					var ttlLoanAmt = n.ttlLoanAmt; // 借款金额
					var currFinCost = SCFUtils.Math(ttlPmtAmt, SCFUtils.Math(
							payPrinAmt, payIntAmt, 'add'), 'sub');// 应收费用
					// var ttlPmtAmt = $('#ttlPmtAmt').val();//合计还款金额
					// var intAmt = intAmtCost(n);// 计算利息
					// var extraAmt =
					// SCFUtils.Math(intAmt,n.currFinCost,'add');//利息+应收费用
					// if(SCFUtils.Math(ttlPmtAmt,extraAmt,'add')<0){
					// payIntAm =
					// SCFUtils.Math(ttlPmtAmt,n.currFinCost,'sub');//本次还利息金额=合计还款金额-应收费用
					// // payPrinAmt =0;
					//						
					// }else
					// if(SCFUtils.Math(ttlLoanAmt,ttlPmtAmt,'sub')>0&&SCFUtils.Math(ttlPmtAmt,extraAmt,'sub')){
					// //借款金额>合计还款金额>(利息+应收费用)
					// payIntAmt = intAmt;
					// payPrinAmt =
					// SCFUtils.Math(ttlPmtAmt,extraAmt,'sub');//本次还本金金额=合计还款金额-利息-应收费用
					// }else{
					// payIntAmt = intAmt;
					// payPrinAmt = ttlLoanAmt;
					// }

					// var lmtAmt = n.lmtAmt;// 信用额度金额
					// var lmtBal = n.lmtBal;// 信用额度余额
					// var subAmt = SCFUtils.Math(lmtAmt, lmtBal, 'sub');
					// // if 本次还本金金额 >(信用额度金额-信用额度余额)
					// if (SCFUtils.Math(payPrinAmt, subAmt, 'sub') > 0) {
					// $('#lmtBal').numberbox('setValue', lmtAmt);
					// } else {
					// ('#lmtBal').numberbox('setValue', SCFUtils.Math(lmtBal,
					// payPrinAmt, 'add'));
					//
					// }

					var ttlLoanBalHD = SCFUtils.Math(ttlLoanAmt, payPrinAmt,
							'sub');// 更新后的借款余额=原TTL_LOAN_BAL- 本次还本金金额
					var openLoanAmtHD = SCFUtils.Math(n.openLoanAmt,
							payPrinAmt, 'sub'); // 更新后的融资余额=原融资余额- 本次还本金金额
					// var arAvalLoanHD = SCFUtils.Math(n.arAvalLoan,
					// payPrinAmt,
					// 'add');// 更新后的应收账款可融资融资余额=原可融资余额+本次还本金金额

					$.extend(n, {
						// lmtAmt : lmtAmt,
						// lmtBal : lmtBal,
						currFinCost : currFinCost,
						ttlLoanBalHD : ttlLoanBalHD,
						openLoanAmtHD : openLoanAmtHD
					// arAvalLoanHD : arAvalLoanHD

					});
				});
				SCFUtils.loadGridData('loanDg', data.rows);
			} else {
				SCFUtils.alert("没有与该资金流匹配的待核销信息流!");
			}
		}
	};
	SCFUtils.ajax(options);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('loanPmtSubmit', data);
	if ($('#controlSts').val() == '1') {
		SCFUtils.loadGridData('loanDg', SCFUtils.parseGridData(data.obj.point),
				true);// 加载数据并保护表格。
	}

	lookSysRelReasonRelease();
	lookeResultDiv();
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('loanPmtSubmit', data);
	queryPmtM();
	var options = $('#loanDg').datagrid('options');
	options.onCheck = onCheck;
	controlBtn('normal_btn', true); // 点销按钮

	lookSysRelReason();
}

function onCheck(rowIndex, rowData) {
	var flag = true;
	var funSelAcNo = $('#selAcNo').val();
	var funSelAcNm = $('#payerNm').val();
	// var funPmtDt = $('#pmtDt').datebox('getValue');
	var funTtlPmtAmt = $('#ttlPmtAmt').numberbox('getValue');

	var msgSelAcNo = rowData.selAcNo;
	var msgSelAcNm = rowData.selAcNm;
	// var msgPmtDt = rowData.pmtDt;
	var msgTtlPmtAmt = rowData.ttlPmtAmt;
	var msgVerifPerc = SCFUtils.Math(rowData.verifPerc, 0.01, 'mul');// 核销差额比例
	var msgVerifLimit = rowData.verifLimit;// 核销最大差额

	var verifPercAmt = SCFUtils.Math(msgTtlPmtAmt, msgVerifPerc, 'mul');

	var subAmt = SCFUtils.Math(funTtlPmtAmt, msgTtlPmtAmt, 'sub');
	if (subAmt < 0) {
		$('#incomeFlag').val('1');// 收益类型0.营业外收入 1.营业外支出
		subAmt = SCFUtils.Math(subAmt, -1, 'mul');// 还款金额的差值
	} else {
		$('#incomeFlag').val('0');
	}

	if (funSelAcNo == msgSelAcNo /*
	 * && SCFUtils.DateDiff(funPmtDt, msgPmtDt) ==
	 * 0
	 */
			&& SCFUtils.Math(subAmt, verifPercAmt, 'sub') <= 0
			&& SCFUtils.Math(subAmt, msgVerifLimit, 'sub') <= 0) {
		flag = false;
	}
	if (funSelAcNm == msgSelAcNm /*
	 * && SCFUtils.DateDiff(funPmtDt, msgPmtDt) ==
	 * 0
	 */
			&& SSCFUtils.Math(subAmt, verifPercAmt, 'sub') <= 0
			&& SCFUtils.Math(subAmt, msgVerifLimit, 'sub') <= 0) {
		flag = false;
	}
	if (flag) {
		// 转场下处理
		SCFUtils.alert("资金流与该信息流不匹配!");
		controlBtn('normal_btn', true); // 点销按钮
		controlBtn('abnormal_btn', false);// 转场下按钮
		// SCFUtils.removeCheckClassToGrid($('#loanDg'),rowIndex);
		$('#loanDg').datagrid('unselectRow', rowIndex);
		$('#controlSts').val('0');
		return;
	} else {
		// 点销通过
		controlBtn('normal_btn', false);
		controlBtn('abnormal_btn', true);
		$('#controlSts').val('1');
		$('#subAmt').val(subAmt);

	}
	return flag;
}

function controlBtn(bt_id, flag) {
	if (flag) {
		$('#' + bt_id, parent.document).attr('disabled', true).addClass(
				'cursorD').removeClass('btnRed').addClass('btnGrey');
	} else {
		$('#' + bt_id, parent.document).attr('disabled', false).removeClass(
				'cursorD').addClass('btnRed').removeClass('btnGrey');
	}
}

function checkDataGrid() {
	var flag = false;
	var data = SCFUtils.getSelectedGridData('loanDg', false);
	if (data._total_rows == 0) {
		// SCFUtils.alert('请选择匹配的信息流！');
		flag = true;
	}
	return flag;
}

function onNextBtnClick() {
	if ('RE' != SCFUtils.FUNCTYPE) {
		$('#trxDt').val($('#trxDtHD').val());
		if (checkDataGrid()) {
			var mainData = SCFUtils.convertArray('loanPmtSubmit');
			$.extend(mainData, {
				compSts : '2'
			});
			return mainData;
		}
		griddata = SCFUtils.getSelectedGridData('loanDg', false);
		var row = $('#loanDg').datagrid('getSelected');
		var rowIndex = $('#loanDg').datagrid('getRowIndex', row);
		$('#loanDg').datagrid('updateRow', {
			index : rowIndex,
			row : {
				pmtSts : '1'
			}
		});
	} else {
		if ($('#controlSts').val() == 1 && checkDataGrid()) {
			SCFUtils.alert("没有匹配的信息流！");
			return;
		}
		griddata = SCFUtils.getGridData('loanDg', false);
	}
	var data = SCFUtils.convertArray('loanPmtSubmit');
	$.extend(data, {
		appendToolBar : 'expt,print'
	});
	var grid = {};
	if ($('#controlSts').val() == '1') {// 点销
		$.extend(griddata.rows0, {
			controlSts : '1',
			subAmt : $('#subAmt').val()
		});

		if ($('#incomeFlag').val() == '1') {
			$.extend(griddata.rows0, {
				incomeFlag : '1'
			});
		} else {
			$.extend(griddata.rows0, {
				incomeFlag : '0'
			});
		}
		grid.point = SCFUtils.json2str(griddata);
		$.extend(data, grid);
		$.extend(data, {
			compSts : '1',
			theirRef : griddata.rows0.sysRefNo
		});
	} else {
		$.extend(data, {
			compSts : '2'
		});
	}

	return data;
}

function pageOnReleasePageLoad(data) {
	// 交换意见
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('loanPmtSubmit', row);

	// SCFUtils.loadForm('loanPmtSubmit', data);
	queryRePmtE(data.obj.theirRef);
	if (data.obj.compSts == 1) {
		$('#controlSts').val('1');
//		$('#reResult').val('0'); //点销
		$("#reResult").combobox('setValue', "0");
		//		controlBtn('normal_btn', false);
		//		controlBtn('abnormal_btn', true);
	} else {
		$('#controlSts').val('2');
//		$('#reResult').val('1');//专场下
		$("#reResult").combobox('setValue', "1");
		//		controlBtn('normal_btn', true);
		//		controlBtn('abnormal_btn', false);
	}

	lookSysRelReason();
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePreLoad(data) {
	// pageOnReleasePageLoad(data);
	SCFUtils.loadForm('loanPmtSubmit', data);
	queryRePmtE(data.obj.theirRef);
	if (data.obj.compSts == 1) {
		$('#controlSts').val('1');
		controlBtn('normal_btn', false);
		controlBtn('abnormal_btn', true);
	} else {
		$('#controlSts').val('2');
		controlBtn('normal_btn', true);
		controlBtn('abnormal_btn', false);
	}

	lookSysRelReason();
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}
function lookSysRelReason() {
	var OldMessageDiv = $("#OldSysRelReason").val();
	if (SCFUtils.FUNCTYPE == "FP" || SCFUtils.FUNCTYPE == "PM") {
		if (OldMessageDiv == null || OldMessageDiv == "") {
			$('#messageSpan').css('display', 'none');
			$('#OldMessageDiv').css('display', 'none');
		}
		$('#messageDiv').css('display', 'block');
		SCFUtils.setTextboxReadonly('sysRelReason', false);// 保护意见
	} else if (SCFUtils.FUNCTYPE == "DP" || SCFUtils.FUNCTYPE == "RE") {
		// SCFUtils.setTextboxReadonly('sysRelReason', false);
		$('#messageDiv').css('display', 'none');
	}
}
function lookSysRelReasonRelease() {
	var OldMessageDiv = $("#OldSysRelReason").val();
	if (SCFUtils.FUNCTYPE == "FP" || SCFUtils.FUNCTYPE == "PM") {
		if (OldMessageDiv == null || OldMessageDiv == "") {
			$('#messageSpan').css('display', 'none');
			$('#OldMessageDiv').css('display', 'none');
		}
		$('#messageDiv').css('display', 'block');
	} else if (SCFUtils.FUNCTYPE == "DP" || SCFUtils.FUNCTYPE == "RE") {
		// SCFUtils.setTextboxReadonly('sysRelReason', false);
		$('#messageDiv').css('display', 'none');
	}
}
function lookeResultDiv() {
	var reResultDiv = $("#reResultDiv").val();
	if (reResultDiv == null || reResultDiv == "") {
		$('#reResultDiv').css('display', 'none');
	}
}
function exchangeSysRelReason(data) {
	var sysRelReason = data.sysRelReason;
	var OldSysRelReason = data.OldSysRelReason;
	data.sysRelReason = OldSysRelReason;
	data.OldSysRelReason = sysRelReason;

	return data;
}
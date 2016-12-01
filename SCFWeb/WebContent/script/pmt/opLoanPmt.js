/*function queryLoan() {
	var sysRefNo = $('#loanId').val();
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000023',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#busiTp').combobox('setValue', data.rows[0].busiTp);
					$('#selId').val(data.rows[0].selId);
					$('#ttlLoanBal').numberbox('setValue', data.rows[0].ttlLoanBal);
					$('#loanRt').numberbox('setValue', data.rows[0].loanRt);
					$('#payIntTp').combobox('setValue', data.rows[0].payIntTp);
					$('#advaPayType').combobox('setValue', data.rows[0].advaPayType);
				}
			}
		};
		SCFUtils.ajax(options);
}

function queryCntrct() {
	var selId = $('#selId').val();
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_S_00000100',
				selId : selId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#cntrctNo').val(data.rows[0].sysRefNo);
					$('#lmtBal').numberbox('setValue', data.rows[0].lmtBal);
					$('#arBal').numberbox('setValue', data.rows[0].arBal);
					$('#openLoanAmt').numberbox('setValue', data.rows[0].openLoanAmt);
					$('#arAvalLoan').numberbox('setValue', data.rows[0].arAvalLoan);
				}
			}
		};
		SCFUtils.ajax(options);
}*/

function ajaxTable() {
	// 加载表格
	var options = {
		rownumbers : true,
		checkOnSelect : true,
		idField : "sysRefNo",
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
//		fitColumns : true,// 列自适应表格宽度
//		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '融资编号',
			width : 80
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			width : 80,
			hidden : true
		}, {
			field : 'busiTp',
			title : '业务类型',
			width : 80,
			formatter : busiTpFormater,
			hidden : true
		}, {
			field : 'selId',
			title : '授信客户编号',
			width : 80,
			hidden : true
		}, {
			field : 'selNm',
			title : '授信客户名称',
			width : 80
		}, {
			field : 'payPrinAmt',
			title : '还本金金额',
			width : 80,
			formatter : ccyFormater
		}, {
			field : 'payIntAmt',
			title : '还利息金额',
			width : 80,
			formatter : ccyFormater
		}, {
			field : 'ttlPmtAmt',
			title : '合计还款金额',
			formatter : ccyFormater
		}, {
			field : 'ttlLoanAmt',
			title : '借款金额',
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'ttlLoanBal',
			title : '借款余额',
			width : 80,
			formatter : ccyFormater
		}, {
			field : 'ttlLoanBalHD',
			title : '借款余额(更新回融资表)',
			width : 80,
			hidden : true
		}, {
			field : 'loanDueDt',
			title : '融资到期日',
			width : 80,
			formatter : dateFormater
		}, {
			field : 'lmtAmt',
			title : '信用额度',
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'lmtBal',
			title : '信用额度余额',
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'openLoanAmt',
			title : '融资余额',
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'openLoanAmtHD',
			title : '融资余额(更新回协议表)',
			width : 80,
			hidden : true
		}, {
			field : 'arAvalLoan',
			title : '应收账款可融资余额',
			formatter : ccyFormater,
			hidden : true
		}
		, {
			field : 'arAvalLoanHD',
			title : '应收账款可融资余额(更新回协议表)',
			width : 80,
			hidden : true
		}, {
			field : 'intAmt',
			title : '利息',
			width : 80,
			formatter : ccyFormater
		}, {
			field : 'currFinCost',
			title : '本次应收费用',
			width : 80,
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'currFinPayCost',
			title : '本次已收费用',
			width : 120,
			formatter : ccyFormater
		}, {
			field : 'finaSts',
			title : '融资状态',
			hidden : true
		}, {
			field : 'pmtSts',
			title : '还款状态',
			hidden : true
		}, {
			field : 'advaPaytype',
			title : '放款资金来源',
			width : 120,
			formatter : adPayTpFormter
		} ] ]
	};
	$('#loanDg').datagrid(options);
}

// 根据付款账号在账号表中查询selId
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
					queryLoanM(data.rows[0].acOwnerid);
				}else{
					SCFUtils.alert("账号"+acNo+"不存在!");
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

// 根据selId查询融资表中的信息
function queryLoanM(selId) {
	if (!SCFUtils.isEmpty(selId)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000256',
				selId : selId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$.each(data.rows, function(i, n) {
						var payPrinAmt = 0;//本次还本金金额
						var payIntAmt = 0;//本次还利息金额
						var ttlLoanAmt = n.ttlLoanAmt; //借款金额
						var ttlPmtAmt = $('#ttlPmtAmt').val();//合计还款金额
						var intAmt = intAmtCost(n);// 计算利息
						var extraAmt = SCFUtils.Math(intAmt,n.currFinCost,'add');//利息+应收费用
						if(SCFUtils.Math(ttlPmtAmt,extraAmt,'add')<0){
							payIntAm = SCFUtils.Math(ttlPmtAmt,n.currFinCost,'sub');//本次还利息金额=合计还款金额-应收费用
//							payPrinAmt =0;
							
						}else if(SCFUtils.Math(ttlLoanAmt,ttlPmtAmt,'sub')>0&&SCFUtils.Math(ttlPmtAmt,extraAmt,'sub')){  //借款金额>合计还款金额>(利息+应收费用)
							payIntAmt = intAmt;
							payPrinAmt = SCFUtils.Math(ttlPmtAmt,extraAmt,'sub');//本次还本金金额=合计还款金额-利息-应收费用
						}else{
							payIntAmt = intAmt;
							payPrinAmt = ttlLoanAmt;
						}
						
						
						var lmtAmt =n.lmtAmt;// 信用额度金额
						var lmtBal = n.lmtBal;// 信用额度余额
						var subAmt = SCFUtils.Math(lmtAmt, lmtBal, 'sub');
						// if 本次还本金金额 >(信用额度金额-信用额度余额)
						if (SCFUtils.Math(payPrinAmt, subAmt, 'sub') > 0) {
							$('#lmtBal').numberbox('setValue', lmtAmt);
						} else {
							('#lmtBal').numberbox('setValue', SCFUtils.Math(lmtBal, payPrinAmt,
									'add'));

						}
						
						var ttlLoanBalHD  =  SCFUtils.Math(ttlLoanAmt, payPrinAmt, 'sub');//更新后的借款余额=原TTL_LOAN_BAL- 本次还本金金额
						var openLoanAmtHD = SCFUtils.Math(n.openLoanAmt, payPrinAmt, 'sub'); //更新后的融资余额=原融资余额- 本次还本金金额
						var arAvalLoanHD  =  SCFUtils.Math(n.arAvalLoan, lmtAmt, 'add');//更新后的应收账款可融资融资余额=原可融资余额+信用额度金额
						
						$.extend(n, {
							payPrinAmt : payPrinAmt,
							payIntAmt : payIntAmt,
							lmtAmt : lmtAmt,
							lmtBal : lmtBal,
							ttlLoanBalHD : ttlLoanBalHD,
							openLoanAmtHD : openLoanAmtHD,
							arAvalLoanHD : arAvalLoanHD
							
						});
					});
					SCFUtils.loadGridData('loanDg', data.rows);
				}else{
					SCFUtils.alert("没有匹配的融资信息!");
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

//计算利息
function intAmtCost(date) {
	var dt = SCFUtils.Math(date.acctPeriod, 360, 'div');// 账期/360
	var ttlLoanAmt = $('#ttlLoanAmt').val();// 借款金额
	var loanRt = SCFUtils.Math(date.loanRt, 0.01, 'mul');// 利率
	var accrualBtnText = SCFUtils.Math(
			SCFUtils.Math(ttlLoanAmt, loanRt, 'mul'), dt, 'mul');
	accrualBtnText = parseFloat(accrualBtnText).toFixed(2);// 利息=借款余额*利率*（融资到期日-融资起始日）/360
	return accrualBtnText;
}

function pageOnInt() {
	ajaxTable();
	SCFUtils.setFormReadonly('#loanPmtSubmit', true);
}

function pageOnLoad(data) {
	SCFUtils.loadForm('loanPmtSubmit', data);
	querySelIdBuyAcNo(data.obj.selAcNo);
	
	$('#trxDt').val(getDate(new Date()));
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('loanPmtSubmit',data);
	SCFUtils.loadGridData('loanDg',
	SCFUtils.parseGridData(data.obj.doname), true);// 加载数据并保护表格。
	
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('loanPmtSubmit',data);
	SCFUtils.loadGridData('loanDg',
	SCFUtils.parseGridData(data.obj.doname), false);
}

function onNextBtnClick() {
	var data = SCFUtils.convertArray('loanPmtSubmit');
	var grid = {};
	griddata = SCFUtils.getGridData('loanDg', false);
	grid.doname = SCFUtils.json2str(griddata);
	$.extend(data, grid);
	return data;
}


function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('loanPmtSubmit', data);
	querySelIdBuyAcNo(data.obj.selAcNo);
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}
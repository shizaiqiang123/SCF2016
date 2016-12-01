var collateralData = {};

function ignoreToolBar(){
	
}

function pageLoad(win) {
	var row = win.getData("row");
	// alert('trxID=============='+row.trxId);
	var selId = row.selId;
	var trxId = row.trxId;
	var data = {
		'selId' : selId,
		'trxId' : trxId
	};
	$.extend(data, {
		'queryId' : win.getData("queryId"),
		'cacheType' : 'non'
	});
	ajaxTable(data);
	// SCFUtils.setFormReadonly('#collateralForm', true);
	// SCFUtils.setNumberboxReadonly('poLoanNum', false);
	var dspRsn = [ {
		"id" : '0',
		"text" : "买方收到发票重复"
	}, {
		"id" : '1',
		"text" : "买方没有收到发票"
	}, {
		"id" : '2',
		"text" : "其他"
	} ];
	$("#dspRsn").combobox('loadData', dspRsn);
	var dspFlag = [ {
		"id" : '1',
		"text" : "争议"
	}, {
		"id" : '2',
		"text" : "催复"
	} ];
	$("#dspFlag").combobox('loadData', dspFlag);
	// $("#dspFlag").val("0");

	if (!SCFUtils.isEmpty(row.collateralData)) {
		collateralData = row.collateralData;
	} else {
		collateralData.total = 0;
	}
	if (row.op == 'add') {
		// $('#loanId').val(row.trxId);
		$('#cntrctNo').val(row.cntrctNo);
		$('#dspRef').val(row.trxId);
		$('#dspDt').val(row.trxDt);
		$('#selId').val(row.selId);

		SCFUtils.setTextReadonly('invNo', true);
		SCFUtils.setTextReadonly('buyerId', true);
		SCFUtils.setTextReadonly('buyerNm', true);
		SCFUtils.setTextReadonly('invCcy', true);
		SCFUtils.setTextReadonly('acctPeriod', true);
		SCFUtils.setDateboxReadonly('invDt', true);
		SCFUtils.setDateboxReadonly('invValDt', true);
		SCFUtils.setDateboxReadonly('invDueDt', true);
		SCFUtils.setTextReadonly('loanPerc', true);
		SCFUtils.setNumberboxReadonly('invAmt', true);
		SCFUtils.setNumberboxReadonly('invBal', true);
		SCFUtils.setNumberboxReadonly('acctAmt', true);
		SCFUtils.setNumberboxReadonly('invLoanAval', true);
		SCFUtils.setNumberboxReadonly('invLoanBal', true);
		SCFUtils.setTextReadonly('dspDt', true);
		// $('#buyerId').val(row.buyerId);
	} else if (row.op == 'edit') {
		// SCFUtils.setDatagridReadonly('dg',true);
		SCFUtils.setTextReadonly('invNo', true);
		SCFUtils.setNumberboxReadonly('invAmt', true);
		SCFUtils.setNumberboxReadonly('acctAmt', true);
		SCFUtils.setDateboxReadonly('invDt', true);
		SCFUtils.setTextReadonly('loanPerc', true);
		SCFUtils.setNumberboxReadonly('invLoanAval', true);
		SCFUtils.setNumberboxReadonly('invLoanBal', true);
		SCFUtils.setDateboxReadonly('dspDt', true);
		SCFUtils.loadForm('collateralForm', row);
	}
	// SearchPageInfo();
	loadClick();
	
	SCFUtils.repalcePH("");

	var div =$(".moreQuery");
	$('#aBtnEvent').hover(function(){
			div.css("color","red");
		},function(){
			div.css("color","blue");
		});

	/*
	 * if (row.op === 'add') { } else if (row.op === 'edit') { }
	 */
}
function searchInvcCata() {
	var data = SCFUtils.convertArray('searchForm');
	// 不需要缓存数据
	$.extend(data, {
		cacheType : 'non'
	});
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

function loadClick() {
	var options = $('#dg').datagrid('options');
	options.onCheck = onCheck;
}

/**
 * 争议金额发生变化
 */
function changeDspAmt() {
	var invBal = $("#invBal").numberbox("getValue");// 应收账款净额
	var dspAmt = $("#dspAmt").numberbox("getValue");// 争议金额
	if (SCFUtils.Math(invBal, dspAmt, 'sub') < 0) {
		SCFUtils.alert('争议金额不能大于应收账款净额！');
		//$("#dspAmt").numberbox("setValue",0);
	}
}

function onCheck() {
	// debugger;
	var data = $('#dg').datagrid('getChecked');// 获取所有当前加载的数据行
	$('#buyerId').val(data[0].buyerId);
	$('#buyerNm').val(data[0].buyerNm);
	$('#invNo').val(data[0].invNo);
	$('#invCcy').val(data[0].invCcy);
	$('#invAmt').numberbox('setValue', data[0].invAmt);
	$('#acctAmt').numberbox('setValue', data[0].acctAmt);
	$('#invBal').numberbox('setValue', data[0].invBal);
	$('#invDt').datebox('setValue', data[0].invDt);
	$('#invValDt').datebox('setValue', data[0].invValDt);
	$('#acctPeriod').val(data[0].acctPeriod);
	$('#invDueDt').datebox('setValue', data[0].invDueDt);
	$('#loanPerc').val(data[0].loanPerc);
	$('#invLoanAval').numberbox('setValue', data[0].invLoanAval);
	$('#invLoanBal').numberbox('setValue', data[0].invLoanBal);
	$("#dspFlag").combobox('setValue', 1);
	$('#sysRefNo').val(data[0].sysRefNo);// 发票流水号
	$('#cntrctNo').val(data[0].cntrctNo);// 协议编号
	$("#dspAmt").numberbox({max:parseFloat($("#invBal").numberbox("getValue"))});
}

function loadTable() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000599',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				var dspAmt = $('#dspAmt').numberbox('getValue');
				var loanPerc = $('#loanPerc').val();
				var dspAmtPerc = SCFUtils.Math(dspAmt, loanPerc, 'mul');
				$('#arAvalLoan').val(dspAmtPerc);// 可融资金额
				$('#arBal').val(dspAmt);// 应收账款融资余额
				$('#poolLine').val(dspAmtPerc);// 池水位
			}
		}
	};
	SCFUtils.ajax(options);
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

function checkPoLoanNum() {
	var price = $('#price').numberbox('getValue');
	var poNumUseable = $('#poNumUseable').numberbox('getValue');
	var poLoanNum = $('#poLoanNum').numberbox('getValue');
	if (SCFUtils.Math(poLoanNum, poNumUseable, 'sub') > 0) {
		$('#poLoanAmt').numberbox('setValue', 0);
		SCFUtils.alert('融资数量不能大于可融资数量！');
	} else {
		var poLoanAmt = SCFUtils.Math(price, poLoanNum, 'mul');
		$('#poLoanAmt').numberbox('setValue', poLoanAmt);
	}
}

function ajaxTable(data) {
	// 加载表格
	$('#dg').datagrid({
		url : SCFUtils.AJAXURL,
		queryParams : data,
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			alert('数据加载失败!');
		},
		onLoadSuccess : function(data) {
		},
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'buyerId',
			title : '间接客户编号',
			width : 70
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : 70
		}, {
			field : 'invNo',
			title : '应收账款凭证编号',
		}, {
			field : 'invCcy',
			title : '币种',
			width : 70,
			formatter : ccyFormater
		}, {
			field : 'invAmt',
			title : '应收账款金额',
			width : 70,
			formatter : ccyFormater
		}, {
			field : 'acctAmt',
			title : '预付款金额',
			width : 70,
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'invBal',
			title : '应收账款净额',
			width : 70,
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'invDt',
			title : '应收账款开立日期',
			width : 70,
			formatter : dateFormater,
			hidden : true
		}, {
			field : 'invValDt',
			title : '应收账款起算日',
			width : 70,
			formatter : dateFormater,
			hidden : true
		}, {
			field : 'acctPeriod',
			title : '账期',
			width : 70,
			hidden : true
		}, {
			field : 'invDueDt',
			title : '到期日',
			width : 70,
			formatter : dateFormater,
			hidden : true
		}, {
			field : 'loanPerc',
			title : '融资比例',
			width : 70,
			formatter : pectType,
			hidden : true
		}, {
			field : 'invLoanAval',
			title : '可融资金额',
			width : 70,
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'invLoanBal',
			title : '已融资金额',
			width : 70,
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			width : 70,
			hidden : true
		} ] ]
	});
}

function SearchPageInfo() {
	var cntrctNo = $('#cntrctNo').val();
	var buyerId = $('#buyerId').val();
	var goodsId = $('#copyOfGoodsId').val();
	var goodsNm = $('#copyOfGoodsNm').val();
	// var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000500',
			sysRefNo : cntrctNo,
			buyerId : buyerId,
			goodsId : goodsId,
			goodsNm : goodsNm,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('dg', data.rows, false, true);
				if (collateralData.total != 0) {
					$.each(data.rows, function(i, n) {
						for (var j = 0; j < collateralData.total; j++) {
							if (collateralData.rows[j].sysRefNo == n.sysRefNo) {
								SCFUtils.setDatagridRowReadonly("dg", i, true,
										function() {
											SCFUtils.alert("您已添加过改货物信息！");
										});
								break;
							}
						}
					});
				}
			}
		}
	};
	SCFUtils.ajax(opts);
}

function doSave(win) {
	/*
	 * if(!SCFUtils.isEmpty($('#cntrctNo').val())){ loadTable(); }
	 */
	var invBal = $("#invBal").numberbox("getValue");// 应收账款净额
	var dspAmt = $("#dspAmt").numberbox("getValue");// 争议金额
	if (SCFUtils.Math(invBal, dspAmt, 'sub') < 0) {
		SCFUtils.alert('争议金额不能大于应收账款净额！');
		return;
	}
	var data = SCFUtils.convertArray('collateralForm');
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

// 重置
function onResetBtnClick() {
	$('#invcBuyerId').val("");
	$('#invcBuyerNm').val("");
	$('#queryInvNo').val("");
}

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}
function aBtnEvent(){
	var div =$(".moreQuery");
		if($('.moreQuery').hasClass('queryDown')){
			$('.moreQuery').removeClass('queryDown');
			$('#moreSearchDiv').hide(50);
			div.html("更多筛选条件");
		}else{
			$('.moreQuery').addClass('queryDown');
			$('#moreSearchDiv').show(50);
			div.html("精选筛选条件");
		}
	
}
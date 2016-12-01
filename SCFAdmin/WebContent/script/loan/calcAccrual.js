function ignoreToolBar(){
	
}

function pageLoad(win) {
	var custLevel = win.getData("custLevel");
	var finaTp = win.getData("finaTp");
	var busiTp = win.getData("busiTp");
	$('#ttlLoanAmt').val(win.getData("ttlLoanAmt"));// 借款金额
	$('#custLevel').val(custLevel);
	$('#finaTp').val(finaTp);
	$('#busiTp').val(busiTp);
	var data = {
		'custLevel' : custLevel,
		'finaTp' : finaTp,
		'busiTp' : busiTp,
		cacheType : 'non'
	};
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable();
	loadTable(data);
}

function loadTable(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : data,
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					
					var loanRt = calcRtChgrt(n);// 利率
					var accrual = accrualCost(n.acctPeriod,loanRt);// 计算利息
					var chgrtData = queryFinChgrt(n.acctPeriod);// 查询对应的业务费率信息
					var finChgrt = calcRtChgrt(chgrtData);// 计算业务费率
					var cost = calcCost(finChgrt);// 计算费用
					$.extend(n, {
						loanRt  :loanRt,
						accrual : accrual,
						finChgrt : finChgrt,
						cost : cost
					});
				});
				SCFUtils.loadGridData('dg', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

// 获取基础利率表的利率信息，根据业务类型，融资模式，融资期限，利率类型
function findBasalBaseRt(date) {
	var baseRt = 0;
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000240',
			busiTp : date.busiTp,
			finaTp : date.finaTp,
			acctPeriod : date.acctPeriod,
			feeOrIntr : date.feeOrIntr
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				baseRt = data.rows[0].baseRt;
			}
		}
	};
	SCFUtils.ajax(options);
	return baseRt;
}

//计算业务利率费率
function calcRtChgrt(data){
	var loanRt = 0;// 利率/费率
	var baseRt = findBasalBaseRt(data);//基础利率/费率
	var rateTp =data.rateTp;//利率取值方式
	if(rateTp==0){
		loanRt = baseRt;
	}else if(rateTp==1){
		loanRt = SCFUtils.Math(data.rtSpread, baseRt, 'add');//RATE=BASE_RT+ RT_SPREAD
	}else if(rateTp==2){
		loanRt = SCFUtils.Math(baseRt, SCFUtils.Math(1, SCFUtils.Math(data.libor,0.01,'mul'), 'add'), 'mul');//RATE=BASE_RT(1+ LIBOR)
	}
	return loanRt;
}

// 计算利息
function accrualCost(acctPeriod,loanRt) {
	var dt = SCFUtils.Math(acctPeriod, 360, 'div');// 账期/360
	var ttlLoanAmt = $('#ttlLoanAmt').val();// 借款金额
	
	loanRt = SCFUtils.Math(loanRt, 0.01, 'mul');
	
	var accrualBtnText = SCFUtils.Math(
			SCFUtils.Math(ttlLoanAmt, loanRt, 'mul'), dt, 'mul');
	accrualBtnText = parseFloat(accrualBtnText).toFixed(2);// 利息=借款余额*利率*（融资到期日-融资起始日）/360
	return accrualBtnText;
}

// 查询费率
function queryFinChgrt(acctPeriod) {
	var chgrtData={};
	var custLevel = $('#custLevel').val();
	var finaTp = $('#finaTp').val();
	var busiTp = $('#busiTp').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000233',
			acctPeriod : acctPeriod,
			custLevel : custLevel,
			finaTp : finaTp,
			busiTp : busiTp,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				chgrtData = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return chgrtData;
}

// 计算费用
function calcCost(finChgrt) {
	var ttlLoanAmt = $('#ttlLoanAmt').val();// 借款金额
	finChgrt = SCFUtils.Math(finChgrt, 0.01, 'mul');//费率
	var costBtnText = SCFUtils.Math(ttlLoanAmt, finChgrt, 'mul');
	costBtnText = parseFloat(costBtnText).toFixed(2);// 费用=借款金额*费率
	return costBtnText;
}

// 能否直接传target
function doSave(win) {
	var row = $('#dg').datagrid('getSelected');
	if(row){
		var target = win.getData('callback');
		target(row);
		win.close();
	}
}

function ajaxTable() {
	// 加载表格
	$('#dg').datagrid({
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			SCFUtils.alert('数据加载失败!');
		},
		columns : [ [ {
			field : 'id',
			checkbox : 'true',
			width : 20
		}, {
			field : 'acctPeriod',
			title : '融资期限(天)',
			width : 60
		}, {
			field : 'loanRt',
			title : '利率(%)',
			width : 60
		}, {
			field : 'accrual',
			title : '利息(元)',
			width : 60,
			formatter:ccyFormater
		}, {
			field : 'finChgrt',
			title : '费率(%)',
			width : 60
		}, {
			field : 'cost',
			title : '费用(元)',
			width : 60,
			formatter:ccyFormater
		} ] ]
	});
}
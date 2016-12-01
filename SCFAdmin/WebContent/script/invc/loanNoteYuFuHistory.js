function pageOnInt() {
	ajaxBox();

}

function pageOnLoad(data) {
	if (data.obj.loanTp == 4) {
		$('#loanDiv').hide();
	}
	ajaxPoTable(data)
	ajaxBillTable(data)
	if (!SCFUtils.isEmpty(data)) {
		if (!SCFUtils.isEmpty(data.obj.invc)) {
			SCFUtils.loadForm('loanForm', data.obj.invc.rows0);
		} else {
			SCFUtils.loadForm('loanForm', data.obj);
		}
	}
}
function pageOnPreLoad(data) {
	ajaxPoTable(data)
	ajaxBillTable(data)
}
function pageOnResultLoad(data) {

}
function onNextBtnClick() {
	var grid = {};
	var griddata;
	var mainData = SCFUtils.convertArray('loanForm');
	griddata = SCFUtils.getSelectedGridData('ScreenHistory', false);

	grid.invc = SCFUtils.json2str(griddata);
	$.extend(mainData, grid);
	return griddata.rows0;
}

function ajaxPoTable(data) {
	var sysRefNo = data.obj.sysRefNo;
	// 加载表格
	$('#poTable').datagrid({
		url : SCFUtils.AJAXURL,
		queryParams : {
			queryId : 'Q_P_000513',
			sysRefNo : sysRefNo,
			cacheType : 'non'
		},
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			alert('数据加载失败!');
		},
		onLoadSuccess : function(queryParams) {
			if (SCFUtils.isEmpty(queryParams.rows)) {
				SCFUtils.alert("没有找到符合要求的订单信息!");
			}
		},
		columns : [ [ {
			field : 'id',
			checkbox : 'true',
			width : 20
		}, {
			field : 'goodsNm',
			title : '商品名称',
			width : '14.28%',
		}, {
			field : 'goodsId',
			title : '商品ID',
			width : '14.28%',
		}, {
			field : 'unit',
			title : '商品单位',
			width : '14.28%',
		}, {
			field : 'ccy',
			title : '商品币别',
			width : '14.28%',
			formatter : ccyFormater
		}, {
			field : 'price',
			title : '商品单价',
			width : '14.28%',
			formatter : ccyFormater
		}, {
			field : 'poLoanAmt',
			title : '订单融资金额',
			width : '14.28%',
			formatter : ccyFormater
		}, {
			field : 'poLoanNum',
			title : '订单融资数量',
			width : '14.28%',
			formatter : ccyFormater
		} ] ]
	});
}

function ajaxBillTable(data) {
	var sysRefNo = data.obj.sysRefNo;
	// 加载表格
	$('#billTable').datagrid({
		url : SCFUtils.AJAXURL,
		queryParams : {
			queryId : 'Q_P_000525',
			sysRefNo : sysRefNo,
			cacheType : 'non'
		},
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			alert('数据加载失败!');
		},
		onLoadSuccess : function(queryParams) {
			if (SCFUtils.isEmpty(queryParams.rows)) {
				//SCFUtils.alert("没有找到符合要求的票据信息!");
			}
		},

		columns : [ [ {
			field : 'id',
			checkbox : 'true',
			width : 20
		}, {
			field : 'billNo',
			title : '票号',
			width : '16.66%',
		}, {
			field : 'billAmt',
			title : '出票金额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'billValDt',
			title : '发票开始日期',
			width : '16.66%',
			formatter : dateFormater
		}, {
			field : 'billDueDt',
			title : '发票到期日',
			width : '16.66%',
			formatter : dateFormater
		}, {
			field : 'billRecp',
			title : '收票人',
			width : '16.66%',
		}, {
			field : 'billRecpAcno',
			title : '收票账号',
			width : '16.66%',
			//hidden : true
		} ] ]
	});
}


function ajaxBox() {
	// 币别
	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);

	var data = [ {
		"id" : '3',
		"text" : "银承"
	}, {
		"id" : '4',
		"text" : "流贷"
	} ];
	$("#loanTp").combobox('loadData', data);

}
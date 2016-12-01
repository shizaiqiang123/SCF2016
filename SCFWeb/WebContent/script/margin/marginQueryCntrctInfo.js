function ignoreToolBar() {

}

function pageLoad(win) {
	ajaxBox();
	var cntrctNo = win.getData("cntrctNo");
	// 修改页面进入时，该字段未定义 导致查询数据失败
	if (SCFUtils.isEmpty(cntrctNo)) {
		cntrctNo = "";
	}
	$('#cntrctNo').val(cntrctNo);

	var selNm = win.getData("selNm");
	if (SCFUtils.isEmpty(selNm)) {
		selNm = "";
	}
	$('#selNm').val(selNm);

	var busiTp = win.getData("busiTp");
	if (SCFUtils.isEmpty(busiTp)) {
		busiTp = "";
	}
	$('#busiTp').combobox("setValue", busiTp);

	var ccy = win.getData("ccy");
	if (SCFUtils.isEmpty(ccy)) {
		ccy = "";
	}
	$('#ccy').combobox("setValue", ccy);

	var data = {
		'cntrctNo' : cntrctNo,
		'selNm' : selNm,
		'busiTp' : busiTp,
		'ccy' : ccy
	};
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable(data);
	
	SCFUtils.repalcePH("");

	var div =$(".moreQuery");
	$('#aBtnEvent').hover(function(){
			div.css("color","red");
		},function(){
			div.css("color","blue");
		});

}

function SearchCimCust() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

function onResetBtnClick() {
	$('#cntrctNo').val("");
	$('#selNm').val("");
	$('#busiTp').val("");
	$('#ccy').val("");
}

// 能否直接传target
function doSave(win) {
	var row = $('#dg').datagrid('getSelected');
	var target = win.getData('callback');
	target(row);
	win.close();
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
			field : 'id',
			checkbox : 'true',
			width : 20
		}, {
			field : 'ccy',
			title : '币种',
			width : 40
		}, {
			field : 'busiTp',
			title : '业务类型',
			width : 40,
			formatter : busiTypeFormater
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			width : 40,
			hidden : true
		}, {
			field : 'cntrctNo',
			title : '额度编号',
			width : 40
		}, {
			field : 'selId',
			title : '客户编号',
			width : 40,
			hidden : true
		}, {
			field : 'selNm',
			title : '授信客户名称',
			width : 40
		}, {
			field : 'lmtAmt',
			title : '授信客户额度',
			width : 40,
			hidden : true
		}, {
			field : 'lmtBal',
			title : '授信客户可用额度',
			width : 40,
			hidden : true
		}, {
			field : 'sellerLmtLimit',
			title : '授信客户限制条款',
			width : 40,
			hidden : true
		}, {
			field : 'lmtAllocate',
			title : '授信客户已用额度',
			width : 40,
			hidden : true
		}, {
			field : 'initGartPct',
			title : '初始保证金比例',
			width : 40,
			hidden : true
		}, {
			field : 'payIntTp',
			title : '扣息方式',
			width : 40,
			formatter : function(value, row, index) {
				if (value === "1") {
					return "预收息";
				}
				if (value === "2") {
					return "利随本清";
				}
				if (value === "3") {
					return "按月扣息";
				}
				if (value === "4") {
					return "按季扣息";
				}
				if (value === "5") {
					return "按年扣息";
				}
			},
		} ] ]
	});
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
	} ];
	$("#busiTp").combobox('loadData', busiTp);
	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#lmtCcy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);
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
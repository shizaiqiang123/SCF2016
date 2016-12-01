function ignoreToolBar() {

}

function pageLoad(win) {
	ajaxBox();
	var cntrctNo = win.getData("cntrctNo");
	//修改页面进入时，该字段未定义 导致查询数据失败
	if (SCFUtils.isEmpty(cntrctNo)) {
		cntrctNo = "";
	}
	$('#cntrctNo').val(cntrctNo);

	var selNm = win.getData("selNm");
	if (SCFUtils.isEmpty(selNm)) {
		selNm = "";
	}
	$('#selNm').val(selNm);

	var sellerInstCd = win.getData("sellerInstCd");
	if (SCFUtils.isEmpty(sellerInstCd)) {
		sellerInstCd = "";
	}
	$('#sellerInstCd').val(sellerInstCd);

	var buyerNm = win.getData("buyerNm");
	if (SCFUtils.isEmpty(buyerNm)) {
		buyerNm = "";
	}
	$('#buyerNm').val(buyerNm);

	var lmtCcy = win.getData("lmtCcy");
	if (SCFUtils.isEmpty(lmtCcy)) {
		lmtCcy = "";
	}
	$('#lmtCcy').combobox("setValue", lmtCcy);

	var data = {
		'cntrctNo' : cntrctNo,
		'selNm' : selNm,
		'lmtCcy' : lmtCcy,
		'buyerNm' : buyerNm
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

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

function onResetBtnClick() {
	$('#cntrctNo').val("");
	$('#selNm').val("");

	$('#sellerInstCd').val("");
	$('#buyerNm').val("");
}

//能否直接传target
function doSave(win) {
	var row = $('#dg').datagrid('getSelected');
	var target = win.getData('callback');
	target(row);
	win.close();
}

function ajaxTable(data) {
	//加载表格
	$('#dg').datagrid({
		url : SCFUtils.AJAXURL,
		queryParams : data,
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,//只选一行
		pagination : true,//是否分页
		fitColumns : false,//列自适应表格宽度
		striped : true,//当true时，单元格显示条纹
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
			field : 'cntrctNo',
			title : '协议编号',
			width : '14.28%'
		}, {
			field : 'sellerInstCd',
			title : '组织机构号',
			width : '14.28%'
		}, {
			field : 'selNm',
			title : '经销商名称',
			width : '14.28%'
		}, {
			field : 'lmtCcy',
			title : '协议额度币种',
			width : '14.28%'
		}, {
			field : 'busiTp',
			title : '业务类型',
			width : '14.28%',
			formatter : busiTypeFormater
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			width : 40,
			hidden : true
		}, {
			field : 'selId',
			title : '协议客户编号',
			width : 40,
			hidden : true
		}, {
			field : 'buyerId',
			title : '协议客户编号',
			width : 40,
			hidden : true
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : 40,
			hidden : true
		}, {
			field : 'lmtDueDt',
			title : '协议额度逾期日',
			width : 40,
			hidden : true
		}, {
			field : 'lmtAmt',
			title : '协议客户额度',
			width : '14.28%',
			formatter : ccyFormater
		}, {
			field : 'lmtBal',
			title : '协议客户额度余额',
			width : '14.28%',
			formatter : ccyFormater
		}, {
			field : 'lmtAvl',
			title : '协议客户已用额度',
			width : 40,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'arAvalLoan',
			title : '可融资余额',
			width : 40,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'payIntTp',
			title : '扣息方式',
			width : 40,
			hidden : true
		}, {
			field : 'initGartPct',
			title : '初始保证金比例',
			width : 40,
			hidden : true
		}, {
			field : 'initThFlg',
			title : '初始保证金是否允许提货',
			width : 40,
			hidden : true
		}, {
			field : 'patnerId',
			title : '监管方编号',
			width : 40,
			hidden : true
		}, {
			field : 'patnerNm',
			title : '监管方名称',
			width : 40,
			hidden : true
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
function ignoreToolBar() {

}

function pageLoad(win) {
	var sysRefNo = win.getData("sysRefNo");
	// 修改页面进入时，该字段未定义 导致查询数据失败
	if (SCFUtils.isEmpty(sysRefNo)) {
		sysRefNo = "";
	}
	$('#sysRefNo').val(sysRefNo);

	var selNm = win.getData("selNm");
	if (SCFUtils.isEmpty(selNm)) {
		selNm = "";
	}
	$('#selNm').val(selNm);

	var buyerNm = win.getData("buyerNm");
	if (SCFUtils.isEmpty(buyerNm)) {
		buyerNm = "";
	}
	$('#buyerNm').val(buyerNm);

	var data = {
		'sysRefNo' : sysRefNo,
		'selNm' : selNm,
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

function SearchCimCust() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
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
			field : 'sysRefNo',
			title : '交易流水号',
			width : 40
		}, {
			field : 'selNm',
			title : '授信客户名称',
			width : 40
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : 40
		} ] ]
	});
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
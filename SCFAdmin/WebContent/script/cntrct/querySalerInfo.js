function pageLoad(win) {
	var custInstCd = win.getData("custInstCd");
	$('#custInstCd').val(custInstCd);

	var selNm = win.getData("selNm");
	var sysRefNo = win.getData("sysRefNo");
	$('#selNm').val(selNm);
	$('#sysRefNo').val(sysRefNo);

	var data = {
		'custInstCd' : custInstCd,
		'selNm' : selNm,
		'sysRefNo' : sysRefNo
	};
	$.extend(data, {
		'queryId' : win.getData("queryId"),
		'cacheType' : 'non'
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

function ignoreToolBar(){
	
}

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

// 重置
function onResetBtnClick() {
	$('#custInstCd').val("");
	$('#selNm').val("");
	$('#sysRefNo').val("");
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
			title : '授信客户编号',
			width : '33.33%'
		}, {
			field : 'custInstCd',
			title : '授信组织机构号',
			width : '33.33%'
		}, {
			field : 'custNm',
			title : '授信客户名称',
			width : '33.33%'
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
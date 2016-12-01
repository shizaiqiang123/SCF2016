var buyerId = "";
var queryId = "";

function ignoreToolBar() {

}

function pageLoad(win) {
	/*var custInstCd = win.getData("custInstCd");
	$('#custInstCd').val(custInstCd);*/
	var row = win.getData("row");
	var selNm = win.getData("selNm");
	var selId = win.getData("selId");
	queryId = win.getData("queryId");
	$('#selNm').val(selNm);
	$('#selId').val(selId);
	buyerId = row.buyerId;
	var data = {
		'selNm' : selNm,
		'selId' : selId,
		'buyerId' : buyerId
	};
	$.extend(data, {
		'queryId' : win.getData("queryId"),
		'cacheType' : 'non'
	});
	//	ajaxTable(data);
	ajaxTable();
	//edit by JinJH on 2016-10-25 排重
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : queryId,
			'selNm' : selNm,
			'selId' : selId,
			'buyerId' : buyerId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$("#dg").datagrid("loadData", uniqueArray(data));
			}
		}
	}
	SCFUtils.ajax(opts);
	SCFUtils.repalcePH("");
}

function onSearchBtnClick() {
	var data = SCFUtils.convertArray('searchForm');
	//	var queryParams = $('#dg').datagrid('options').queryParams;
	//	$('#dg').datagrid('load', $.extend(queryParams, data));
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : queryId,
			'selNm' : data.selNm,
			'selId' : data.selId,
			'buyerId' : buyerId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$("#dg").datagrid("loadData", uniqueArray(data));
			}
		}
	}
	SCFUtils.ajax(opts);
}

// 重置
function onResetBtnClick() {
	//$('#custInstCd').val("");
	$('#selNm').val("");
	$('#selId').val("");
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
		//		url : SCFUtils.AJAXURL,
		//		queryParams : data,
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		//		onLoadError : function() {
		//			alert('数据加载失败!');
		//		},
		//		onLoadSuccess : function(data) {
		//		},
		columns : [ [ {
			field : 'id',
			checkbox : 'true',
			width : 20
		}, {
			field : 'selId',
			title : '卖方客户编号',
			width : '50.00%'
		}, /*{
				field : 'custInstCd',
				title : '授信组织机构号',
				width : '33.33%'
			},*/{
			field : 'selNm',
			title : '卖方客户名称',
			width : '50.00%'
		} ] ]
	});
}

/**
 * 去除数组重复元素
 * add on 2016-10-25 by JinJH
 */
function uniqueArray(data) {
	var obj = {};
	var tmp = {}, b = [];
	for (var i = 0; i < data.rows.length; i++) {
		if (!tmp[data.rows[i].selId]) {
			b.push(data.rows[i]);
			tmp[data.rows[i].selId] = !0;
		}
	}
	;
	obj.rows = b;
	obj.total = b.length;
	return obj;
}
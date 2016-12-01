var queryId = "";
var buyerId = "";

function ignoreToolBar(){
	
}

function pageLoad(win) {
	ajaxTable();
	queryId = win.getData("queryId");
	var selId = win.getData("selId");
	// 修改页面进入时，该字段未定义 导致查询数据失败
	if (SCFUtils.isEmpty(selId)) {
		selId = "";
	}
	$('#selId').val(selId);
	var selNm = win.getData("selNm");
	if (SCFUtils.isEmpty(selNm)) {
		selNm = "";
	}
	$('#selNm').val(selNm);
	buyerId = win.getData("buyerId");
	if (SCFUtils.isEmpty(buyerId)) {
		buyerId = "";
	}
	var cntrctNo = win.getData("cntrctNo");
	if (SCFUtils.isEmpty(cntrctNo)) {
		cntrctNo = "";
	}
//	var data = {
//		'cntrctNo' : cntrctNo,
//		'buyerId' : buyerId,
//		'selId' : selId,
//		'selNm' : selNm
//	};
//	$.extend(data, {
//		'queryId' : win.getData("queryId")
//	});
//	ajaxTable(data);
	
	var opts = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : queryId,
				'buyerId' : buyerId,
				'selId' : selId,
				'selNm' : selNm,
				cacheType : 'non'
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$("#dg").datagrid("loadData",uniqueArray(data));
				}
			}
	}
	SCFUtils.ajax(opts);
	SCFUtils.repalcePH("");
}

// 重置
function onResetBtnClick() {
	$('#selId').val("");
	$('#selNm').val("");
}

function onSearchBtnClick() {
//	var data = SCFUtils.convertArray('searchForm');
//	var queryParams = $('#dg').datagrid('options').queryParams;
//	$('#dg').datagrid('load', $.extend(queryParams, data));
	var dataForm = SCFUtils.convertArray('searchForm');
	var opts = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : queryId,
				'buyerId' : buyerId,
				'selId' : dataForm.selId,
				'selNm' : dataForm.selNm,
				cacheType : 'non'
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$("#dg").datagrid("loadData",uniqueArray(data));
				}
			}
	}
	SCFUtils.ajax(opts);
}

// 能否直接传target
function doSave(win) {
	var row = $('#dg').datagrid('getSelected');
	var target = win.getData('callback');
	target(row);
	win.close();
}

var data1 = [];
/*function ajaxTable(data) {
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
		loadFilter : pagerFilter,
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			alert('数据加载失败!');
		},
		onLoadSuccess : function(data) {
			//处理掉重复的记录
//			$("#dg").datagrid("loadData",uniqueArray(data));
			data1 = uniqueArray(data);
		},
		columns : [ [ {
			field : 'id',
			checkbox : 'true',
			width : 20
		}, {
			field : 'selId',
			title : '供应商编号',
			width : 20
		}, {
			field : 'selNm',
			title : '供应商名称',
			width : 20
		} ] ]
	});
}*/

function ajaxTable() {
	// 加载表格
	$('#dg').datagrid({
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		columns : [ [ {
			field : 'id',
			checkbox : 'true',
			width : 20
		}, {
			field : 'selId',
			title : '供应商编号',
			width : 20
		}, {
			field : 'selNm',
			title : '供应商名称',
			width : 20
		} ] ]
	});
	
}

/**
 * 去除数组重复元素
 */
function uniqueArray(data){  
	var obj={};
	 var tmp={},b=[]; 
	    for(var i=0;i<data.rows.length;i++){
	        if(!tmp[data.rows[i].selId]){
	            b.push(data.rows[i]);
	            tmp[data.rows[i].selId]=!0;
	        }
	    };
	    obj.rows = b;
	    obj.total = b.length;
	    return obj;
}  

function ignoreToolBar() {

}
function pageOnInt(data) {
	ajaxTable();
	// ajaxReprtList();
}

function ajaxTable() {
	var options = {
		rownumbers : true,
		checkOnSelect : false,
		singleSelect : true,// 只选一行
		pagination : false,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		onLoadSuccess : onLoadSuccess,
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'name',
			title : '面函名称',
			width : 120
		}, {
			field : 'desc',
			title : '描述',
			width : 120
		}, {
			field : 'type',
			title : '面函类型',
			width : 100
		}, {
			field : 'status',
			title : '状态',
			width : 100
		}, {
			field : 'show',
			title : '预览',
			width : 150,
			formatter : optFormater
		} ,{
			field : 'id',
			title : '面函编号',
			hidden : true
		} ] ]
	};
	$('#reportTable').datagrid(options);
}

function ajaxReprtList(row) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			getdataId : 'I_P_000044',
			queryType : 'queryList',
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					$.extend( data.rows[i],row);
				});
				SCFUtils.loadGridData('reportTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function pageLoad(win) {
	var row = win.getData("row");
	ajaxReprtList(row);

}
function viewReport(index) {
	var rows = $('#reportTable').datagrid('getRows');// 获取所有当前加载的数据行
	var data = rows[index];// /
	$.extend(data, {
		queryType : 'preView',
		getdataId : 'I_P_000044',
		cacheType : 'non'
	});
//	window.open("report?operateType=saveAndShow" + parseUrl(data));
	window.open("report?" + parseUrl(data));
}

function parseUrl(data) {
	var url = "";
	for ( var key in data) {
		url += key + "=" + data[key] + "&";
	}
	if (url.charAt(url.length - 1) == '&') {
		url = url.substring(0, url.length - 1);
	}
	url = encodeURI(url);
	url = encodeURI(url);//防止中文乱码，特意编码两次
	return url;
}

function optFormater(value, row, index) {
	var viewButton;
	if('pdf' == row.reporttype){
		viewButton = '<a href="javascript:void(0)" class="startBatchView" onclick="viewReport('
			+ index + ')"></a> ';
	}
	if('xls' == row.reporttype){
		viewButton = '<a href="javascript:void(0)" class="startBatchDownLoad" onclick="viewReport('
			+ index + ')"></a> ';
	}
	return viewButton;
};

function onLoadSuccess(data) {
	$.each(data.rows, function(i, n){
		if('pdf' == n.reporttype){
			$('.startBatchView').linkbutton({
				text : "报表预览"
			});
		}
		if('xls' == n.reporttype){
			$('.startBatchDownLoad').linkbutton({
				text : "报表下载"
			});
		}
	});
}
// function ajaxReport() {
// var options = {
// url : "report?operateType=query",
// callBackFun : function(data) {
// if (!SCFUtils.isEmpty(data.rows)) {
// // SCFUtils.loadGridData('reportTable', data.rows, false, true);
// eachAdd(data.rows);
// }
// }
// };
// SCFUtils.ajax(options);

function eachAdd(data) {
	$.each(data, function(i, n) {
		$('#reportTable').datagrid('appendRow', {
			name : n.name,
			type : n.para.reportType
		});
	});
}
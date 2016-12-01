function ignoreToolBar() {

}

function pageLoad(win) {
	// var row = win.getData("row");
	// var row = win.getData("row");
	// var name=win.getData("name");
	SCFUtils.setFormReadonly('#mainForm', true);
	var gapiId = win.getData("gapiId");
	var queryId = win.getData("queryId");
	// SCFUtils.loadForm('mainForm',row.data);
	var data = {
		errorMsgSearch : $('#errorMsgSearch').val(),
		resendTimesSearch : $('#resendTimesSearch').val(),
		gapiTypeSearch : $('#gapiTypeSearch').val(),
		// expType:$('#expType').val(),
		// gapiType:gapiType
		gapiId : gapiId
	};// $.extend(data,{'queryId':win.getData("queryId")});
	$.extend(data, {
		'queryId' : queryId,
		cacheType : 'non'
	});
	var options = $('#dg').datagrid('options');
	options.onCheck = onCheck;
	ajaxTable();
	loadTable(data);
	
	SCFUtils.repalcePH("");

	var div =$(".moreQuery");
	$('#aBtnEvent').hover(function(){
			div.css("color","red");
		},function(){
			div.css("color","blue");
		});
}

function loadTable(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : data,
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('dg', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function ajaxTable() {
	$('#dg').datagrid({
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		// onLoadError : function() {
		// alert('数据加载失败!');
		// },
		// onLoadSuccess : function(data) {
		// },
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'gapiName',
			title : '接口名称',
			width : 200
		}, {
			field : 'gapiId',
			title : '接口编号',
			width : 200
		}, {
			field : 'gapiType',
			title : '所属接口类型',
			width : 200
		}, {
			field : 'errorMsg',
			title : '异常信息',
			width : 300
		}, {
			field : 'resendTimes',
			title : '重发次数',
			width : 300
		} ] ]
	});

}
function onCheck() {
	// debugger;
	var data = $('#dg').datagrid('getChecked');// 获取所有当前加载的数据行
	$('#gapiName').val(data[0].gapiName);
	$('#gapiId').val(data[0].gapiId);
	$('#gapiType').val(data[0].gapiType);
	$('#errorMsg').val(data[0].errorMsg);
	$('#resendTimes').val(data[0].resendTimes);
	$('#errorMsg').textbox('setValue', data[0].errorMsg);
	$('#receiveMessage').textbox('setValue', data[0].receiveMessage);
	$('#sendMessage').textbox('setValue', data[0].sendMessage);

}
function SearchPortMonitor() {
	var data = SCFUtils.convertArray('searchForm');
	// 不需要缓存数据
	$.extend(data, {
		cacheType : 'non'
	});
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}
function doSave(win) {
	var data = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}
function cancel(win) {
	win.close();
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
function pageOnInt() {
	SCFUtils.setTextReadonly("buyerid", true);
	SCFUtils.setTextReadonly("buyernm", true);
}

function searchCompanyInfo() {
	var data = SCFUtils.convertArray('searchForm');
	// 不需要缓存数据
	$.extend(data, {
		cacheType : 'non'
	});
	var queryParams = $('#dg').datagrid('options').queryParams;
	$('#dg').datagrid('load', $.extend(queryParams, data));
}

function onResetBtnClick() {
	$('#custNm"').val("");
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
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '成员企业编号',
			width : 200,
		}, {
			field : 'custNm',
			title : '成员企业名称',
			width : 200
		}, {
			field : 'arAvalLoan',
			title : '可融资额度',
			width : 70,
//			formatter : arAvalLoanFormter
		}] ]
	});
}

//function arAvalLoanFormter(value, row, index) {
//	var companyList = queryCompany();
//	$(companyList).each(function(i,cmp){
//		
//	});
//}

function doSave(win) {
	var data = SCFUtils.convertArray('mainForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}

var licenceNo;

function ignoreToolBar(){
	
}

function pageLoad(win) {
	var row = win.getData("row");
	licenceNo = row.licenceNo;
	if ('del' == row.op) {
		SCFUtils.loadForm('mainForm', row);
	} else {

	}
	var data = SCFUtils.convertArray('searchForm');
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	ajaxTable(data);
	loadClick();

}

function loadClick() {
	var options = $('#dg').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck() {
	var data = $('#dg').datagrid('getChecked');// 获取所有当前加载的数据行
	$('#buyernm').val(data[0].custNm);
	$('#buyerid').val(data[0].sysRefNo);
}

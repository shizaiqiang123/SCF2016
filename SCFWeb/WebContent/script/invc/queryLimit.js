function pageOnInt() {
	ajaxTable();
	ajaxBox();
	findRow("");
}
function findBU() {
	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	if (SCFUtils.isEmpty(sysBusiUnit)) {
		sysBusiUnit = "platform";
	}
	return sysBusiUnit;
}

function ajaxBox() {
	var busiTp = [ {
		"id" : "0",
		"text" : "应收款融资"
	}, {
		"id" : "",
		"text" : "全部",
		selected : true
	} ];
	$("#busiTp").combobox('loadData', busiTp).combobox({
		editable : false
	});
}
function onNextBtnClick(){
	var data = $('#searchTable').datagrid('getSelected');
	if(data==null){
		SCFUtils.alert("请选择一条数据！");
	}
	return data;
}
//function initToolBar() {
//	var showButton = [ 'cancel' ];
//
//	return showButton;
//}

// 获取额度信息
function findRow(busiTp) {
	var sysBusiUnit = findBU();
//	var sysBusiUnit ="SYSBU00223";
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000276',
			sysBusiUnit : sysBusiUnit,
			busiTp:busiTp    //融资类型
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if (SCFUtils.isEmpty(data.rows)) {
					SCFUtils
							.loadGridData('searchTable', data.rows, false, true);
					SCFUtils.alert("没有相应的额度信息!");
				} else {
					SCFUtils.loadGridData('searchTable', data.rows, false, true);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}
function ajaxTable() {
	// 加载表格
	var options = {
		// url : SCFUtils.QUERYURL,
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		loadMsg : '数据加载中,请稍后...',
		onLoadError : function() {
			SCFUtils.alert('数据加载失败!');
		},
		columns : getColumns(),
//		onLoadSuccess : onLoadSuccess
	};
	$('#searchTable').datagrid(options);
}

function getColumns() { // 初始化表头
	return [ [ {
		field : 'ck',
		checkbox : true
	}, {
		field : 'selNm',
		title : '授信客户名称',
		width : 200
//		,
//		formatter : busiTpFormter
	}, {
		field : 'buyerNm',
		title : '企业名称',
		width : 200
	},{
		field : 'lmtAmt',
		title : '信用额度',
		width : 120
//		,
//		formatter : busiTpFormter
	}, {
		field : 'lmtBal',
		title : '信用额度余额',
		width : 120
	}, 
//	{
//		field : 'lmtValidDt',
//		title : '信用额度评定日',
//		width : 120
//	}, 
	{
		field : 'arAvalLoan',
		title : '应收账款可融资余额 ',
		width : 180
	}, {
		field : 'openLoanAmt',
		title : '融资余额',
		width : 120
	}
	] ];
}
// 搜索栏表单重置
function onResetBtnClick() {
	$('#screenForm')[0].reset();
}

/**
 * 表单的查询
 */
function onSearchBtnClick() {
	// 获取表单内容以查询
	var busiTp = $('#busiTp').combobox('getValue');
	findRow(busiTp);
}

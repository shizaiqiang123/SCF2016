function pageOnInt() {
	ajaxTable();
	findRow();
}

// 获取复核条件的function选项
function findRow() {
	// var sysRefNo="Fac00705";
	// var sysBusiUnit = "SYSBU00215";
	var sysRefNo = $("#sysRefNo").val();
//	var sysBusiUnit = SCFUtils.SYSBUSIUNIT;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			cacheType : 'non',
			queryId : 'Q_P_000254',
			// sysBusiUnit : sysBusiUnit,
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success) {
				// 开始拼装
				if ( SCFUtils.isEmpty(data.rows) ) {
					SCFUtils.alert("您没有可以查询的注册签约进度！");
				} else {
					var userId=$("#userId").val();
					$.each(data.rows, function(i, rows) {
						$.extend(rows,{"userId":userId});
					});
					SCFUtils.loadGridData('searchTable', data.rows, false, true);
				}
			} else {
				SCFUtils.alert("网络错误，请检查网络！");
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
		columns : getColumns()
	};
	$('#searchTable').datagrid(options);
}

function getColumns() { // 初始化表头
	return [ [ {
		field : 'ck',
		checkbox : true
	},  {
		field : 'userId',
		title : '注册用户号',
		width : 120
	},{
		field : 'custNm',
		title : '公司名称',
		width : 120
	} ,{
		field : 'signSts',
		title : '签约状态',
		width : 120,
		formatter : signStsDesc
	}, ] ];
}

// workflow的
function signStsDesc(value, row, index) { // 设置表格记录加载的按钮
	var message;
	var signSts = row.signSts;
	if (signSts == "0")
		message = "待审核";
	if (signSts == "1")
		message = "审核通过";
	if (signSts == "2")
		message = "审核不通过";
	if (signSts == "3")
		message = "材料待补充";

	return message;
}

function sysTrxStsDesc(value, row, index) { // 设置表格记录加载的按钮
	var message;
	var sysTrxSts = row.sysTrxSts;
	if (sysTrxSts == "M")
		message = "确认";
	if (sysTrxSts == "P")
		message = "未确认";

	return message;
}
// 刷新表格
function changeType() {
	$('#searchTable').datagrid('reload');
}

// 搜索栏表单重置
function onResetBtnClick() {
	$('#ScreenMenuForm')[0].reset();
	changeType();
}

/**
 * 表单的查询
 */
function onSearchBtnClick() {
	// 获取表单内容以查询
	ajaxTable();
	findRow();
}

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
			queryId : 'Q_P_000223',
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
					$.each(data.rows, function(i, row) {
						$.extend(row,{"userId":userId});
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
	}, 
	{
		field : 'userId',
		title : '注册用户号',
		width : 120
	}, 
//	{
//		field : 'sysOpTm',
//		title : '上一次操作时间',
//		width : 120
//	}, 
	{
		field : 'custNm',
		title : '公司名称',
		width : 120
	}, {
		field : 'signSts',
		title : '签约状态',
		width : 120,
		formatter : signStsDesc
	}, {
		field : 'sysTrxSts',
		title : '业务状态',
		width : 120,
		formatter : sysTrxStsDesc
	} , {
		field : 'sysEventTimes',
		title : '',
		width : 120,
		hidden : true
	}] ];
}

// workflow的
function signStsDesc(value, row, index) { // 设置表格记录加载的按钮
	var message="";
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
	var message="";
	var sysTrxSts = row.sysTrxSts;
	var signSts = row.signSts;
	
	if (signSts == "0" && sysTrxSts == "M")
		message = "已提交，待审核";
	if (signSts == "1" && sysTrxSts == "P")
		message = "已审核，待处理";
	if (signSts == "1" && sysTrxSts == "M")
		message = "已处理";
	if (signSts == "1" && sysTrxSts == "S")
		message = "已处理，被拒绝";
	if (signSts == "2" && sysTrxSts == "P")
		message = "已审核，待处理";
	if (signSts == "2" && sysTrxSts == "M")
		message = "已处理";
	if (signSts == "2" && sysTrxSts == "S")
		message = "已处理，被拒绝";
	if (signSts == "3" && sysTrxSts == "P")
		message = "已审核，待处理";
	if (signSts == "3" && sysTrxSts == "M")
		message = "已处理";
	if (signSts == "3" && sysTrxSts == "S")
		message = "已处理，被拒绝";
	
	return message;
}
function pageOnResultLoad(data) {
	
}
function onNextBtnClick(){
//	var grid = {};
//	var griddata ;
//	var mainData = SCFUtils.convertArray('supplierForm');
//	griddata=SCFUtils.getSelectedGridData('searchTable',false);	
//	grid.invc = SCFUtils.json2str(griddata);
//	$.extend(mainData,grid);
//	return griddata.rows0;
	var data = $('#searchTable').datagrid('getSelected');
	if(data==null){
		SCFUtils.alert("请选择一条数据！");
	}
	return data;
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

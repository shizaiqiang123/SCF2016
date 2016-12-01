function pageOnInt() {
	ajaxBox();
	ajaxTable();
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('selId', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setComboReadonly('ccy', true);
	SCFUtils.setNumberboxReadonly('regAmt', true);
	SCFUtils.setNumberboxReadonly('regNo', true);
	SCFUtils.setComboReadonly('OldSysRelReason', true);
}

function exchangeSysRelReason(data) {
	if (data.sysRelReason == undefined || data.sysRelReason == null) {
		data.sysRelReason = "";
		data.OldSysRelReason = "";
		return data;
	}
	var sysRelReason = data.sysRelReason;
	var OldSysRelReason = data.OldSysRelReason;
	data.sysRelReason = OldSysRelReason;
	data.OldSysRelReason = sysRelReason;

	return data;
}

// 控制意见的div
function lookSysRelReason() {
	var OldMessageDiv = $("#OldSysRelReason").val();
	$('#messageListDiv').css('margin-left', '20px');
	if (SCFUtils.FUNCTYPE == "FP" || SCFUtils.FUNCTYPE == "PM") {
		if (OldMessageDiv == null || OldMessageDiv == "") {
			$('#OldMessageDiv').css('display', 'none');
			$('#messageSpanY').css('display', 'block');
			$('#messageSpanN').css('display', 'none');

		} else {
			$('#messageSpanY').css('display', 'none');
			$('#messageDivFa').css('margin-top', '-20px');

		}
		$('#messageDiv').css('display', 'block');
		
		// SCFUtils.setTextboxReadonly('sysRelReason', false);// 保护意见
	} else if (SCFUtils.FUNCTYPE == "DP" || SCFUtils.FUNCTYPE == "RE") {
		// SCFUtils.setTextboxReadonly('sysRelReason', false);
		$('#messageDivFa').css('display', 'none');
	} else {
		$('#messageDivFa').css('display', 'none');
	}
}

function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('invcMForm', data);
	$('#ccy').combobox('setValue', 'CNY');
	showTable();
//	$('#invcMTable').datagrid('hideColumn', 'ck');
	lookSysRelReason();
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('invcMForm', data);
	SCFUtils.loadGridData('invcMTable', SCFUtils.parseGridData(data.obj.invc),
			true);// 加载数据并保护表格。
	lookSysRelReason();
}

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('invcMForm', data);
	if ("PM" === SCFUtils.FUNCTYPE || "FP" === SCFUtils.FUNCTYPE) {
		SCFUtils.loadGridData('invcMTable', SCFUtils
				.parseGridData(data.obj.invc), false);
	} else {
		SCFUtils.loadGridData('invcMTable', SCFUtils
				.parseGridData(data.obj.invc), true);
	}
	if(SCFUtils.FUNCTYPE=="FP"){
	var options = $("#invcMTable").datagrid("options");
	$("#invcMTable").datagrid("selectAll",true);
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	}
	lookSysRelReason();
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	
	SCFUtils.loadForm('invcMForm', row);
	$('#custNm').val(data.obj.selNm);
	loadTable();
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

/*
 * new 修改在途 on 2016.07.28 by JinJH
 */
function pageOnFPLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	//modify by shizaiqiang 2016-08-17 修改原因：第一个页面修改为catalog导致
	SCFUtils.setTextReadonly('sysRefNo', true);
	
	SCFUtils.loadForm('invcMForm', row);
	$('#custNm').val(data.obj.selNm);
	loadTable();
	$('#invcMTable').datagrid('selectAll',true);//在加载数据初始化时就将datagrid中的数据默认全勾选
	var options = $("#invcMTable").datagrid("options");
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	lookSysRelReason();
}

function onNextBtnClick() {
	var data = SCFUtils.convertArray('invcMForm');
	
	if(data.isConfirm==0){
		$.extend(data, {
			'confirmFlag' : 2 
		});
	}
	
	if(data.isConfirm==1){
		$.extend(data, {
			'confirmFlag' : 0
		});
	}
	
	if (checkDataGrid()) {
		return;
	}

	var pageList = SCFUtils.getGridData("invcMTable");
	
	if(data.isConfirm==0){
		$.each(pageList,function(i,n){
			$.extend(n, {
				'invSts' : 1 
			});
		});
	}
	
	if(data.isConfirm==1){
		$.each(pageList,function(i,n){
			$.extend(n, {
				'invSts' : 0 
			});
		});
	}
	
	var grid = {};
	if (pageList && !SCFUtils.isEmpty(pageList)) {
		$.each(pageList,function(i,n){
			$.extend(n,{
				"busiTp" : 0
			});
		});
		grid.invc = SCFUtils.json2str(pageList);
		
	}
	$.extend(data, grid);/* 继承 */
	return data;
	
	
}

function ajaxBox() {

	var isConfirm = [ {
		"id" : '0',
		"text" : "是"
	}, {
		"id" : '1',
		"text" : "否"
	} ];
	$("#isConfirm").combobox('loadData', isConfirm);
	$("#isConfirm").combobox('setValue', "0");
	
	var optt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000006',
				cacheType:'non'
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#ccy').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(optt);

}

function loadTable() {
	var theirRef = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000707',
			theirRef : theirRef
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('invcMTable', data.rows,true,true);
			}
		}
	};
	SCFUtils.ajax(options);
}

function checkDataGrid() {
	var flag = false;
	var data = $('#invcMTable').datagrid('getData');
	if (data.total == 0) {
		SCFUtils.alert('请添加应收账款！');
		flag = true;
	}
	return flag;
}
function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		// singleSelect : true,// 只选一行
		pagination : true,// 是否分页
//		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'buyerId',
			title : '间接客户编号',
			width : '15%',
			resizable : true
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : '15%',
			resizable : true
		}, {
			field : 'invNo',
			title : '应收账款凭证编号',
			width : '15%',
			resizable : true
		}, {
			field : 'invCcy',
			title : '币种',
			width : '15%',
			formatter : ccyFormater,
			resizable : true
		}, {
			field : 'invAmt',
			title : '应收账款金额',
			width : '15%',
			resizable : true
//		}, {
//			field : 'acctAmt',
//			title : '预付款金额',
//			width : '9.09%',
//			resizable : true
		}, {
			field : 'invBal',
			title : '应收账款净额',
			width : '15%',
			resizable : true
		}, {
			field : 'invDt',
			title : '应收账款开立日期',
			width : '15%',
			formatter : dateFormater,
			resizable : true
		}, {
			field : 'invValDt',
			title : '应收账款起算日',
			width : '15%',
			formatter : dateFormater,
			resizable : true
		}, {
			field : 'invDueDt',
			title : '到期日',
			width : '15%',
			formatter : dateFormater,
			resizable : true
		}, {
			field : 'acctPeriod',
			title : '账期',
			width : '15%',
			resizable : true
		}, {
			field : 'sysRefNo',
			title : '流水号',
			width : 100,
			hidden : true
		}, {
			field : 'selId',
			title : '卖方编号',
			width : 100,
			hidden : true
		}
		, {
			field : 'theirRef',
			title : '关联登记主表流水号',
			width : 100,
			hidden : true
		}, {
			field : 'invSts',
			title : '发票状态',
			width : 100,
			hidden : true
		}, {
			field : 'dspFlag',
			title : '争议标识',
			width : 100,
			hidden : true
		}, {
			field : 'cbkAmt',
			title : '转让金额',
			width : 100,
			hidden : true
		} ] ]
	};
	$('#invcMTable').datagrid(options);
	$('#invcMTable').datagrid('hideColumn', 'ck');
}

// 检查发票编号是否重复
function getInvNo() {
	var invNoList = [];
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (datas.length > 0) {
		$.each(datas, function(i, m) {
			invNoList.push(m.invNo);
		});
	}

	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000032'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, m) {
					invNoList.push(m.invNo);
				});
			}
		}
	};
	SCFUtils.ajax(options);
	return invNoList;
}

// 判断a数组是否包含obj元素
function contains(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}
// 返回该数组的索引
function getArrIndex(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return i;
		}
	}
	return -1;
}
function showTable() {
	// if (SCFUtils.CURRENTPAGE == '1'
	// && ('PM' == SCFUtils.FUNCTYPE || 'FP' == SCFUtils.FUNCTYPE)) {
	var cntrctNo = $('#cntrctNo').val();// 协议编号
	var selId = $("#selId").val();
	var theirRef = $("#sysRefNo").val();
	$('#invcMTable').datagrid('clearChecked');// 清除选中
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000706',// 应收账款额度信息查询
			selId : selId,
			theirRef : theirRef,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$.each(data.rows, function(i, n) {
						var invBal = n.invBal;
						var loanPerc = n.loanPerc;
						var invLoanAval = SCFUtils
								.Math(invBal, loanPerc, 'mul');
						invLoanAval = SCFUtils.Math(invLoanAval, 0.01, 'mul');
						$.extend(n, {
							invLoanAval : invLoanAval,
							cntrctNo : cntrctNo,

							batchNo : $('#sysRefNo').val(),
							busiTp : $('#busiTp').val()

						});
					});
					SCFUtils.loadGridData('invcMTable', data.rows, true, true);
					// forEach(data.rows);
					// loadGridData(data, flag);
				} else {

					SCFUtils.alert("没有符合的应收账款");
				}
			} else {
				SCFUtils.alert("查询失败");
			}
		},
	};

	SCFUtils.ajax(options);
}




// 金额计算
function getAmt(data) {
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	var regAmt = 0;
	/*if (data.type == "ADD") {
		regAmt = 0; // 累计金额
		var regNo = datas.length + 1; // 转让笔数
		$('#regNo').numberbox('setValue', regNo);
	}*/
	$('#regNo').numberbox('setValue', datas.length);
	if (!SCFUtils.isEmpty(datas)) {
		$.each(datas, function(i, n) {
			regAmt = SCFUtils.Math(regAmt, n.invBal, 'add');
		});
		
		/*if (data.type == "ADD")
			regAmt = SCFUtils.Math(regAmt, data.invBal, 'add');*/
	} else {
		regAmt = data.invBal;
	}
	$("#regAmt").numberbox('setValue', regAmt);
}

function onCheck(rowIndex, rowData){
	$("#regAmt").numberbox('setValue', SCFUtils.Math($("#regAmt").numberbox('getValue'),rowData.invBal,'add'));
	$('#regNo').numberbox('setValue', SCFUtils.Math($('#regNo').numberbox('getValue'),
			1,'add'));
}

function onCheckAll(rows){
	$("#regAmt").numberbox('setValue', 0);
	$("#docketAmt").numberbox('setValue', 0);
	$('#regNo').numberbox('setValue', 0);
	$.each(rows,function(i,v){
		onCheck(i,v);
	});
}

function onUnCheck(rowIndex, rowData){
	
	//for (var i = 0; i < rowData.length; i++) {
		var index = $('#invcMTable').datagrid('getAllRowIndex',
				rowData.sysRefNo);
		var regAmt = $("#regAmt").numberbox('getValue');
		//var griddata = SCFUtils.getGridData('invcMTable', false);
		//var griddata = SCFUtils.getSelectedGridData("invcMTable",false);
		//var datas = SCFUtils.parseGridData(griddata, false);
		regAmt = SCFUtils.Math(regAmt, rowData.invBal, 'sub');
		$("#regAmt").numberbox('setValue', regAmt);
		$("#docketAmt").numberbox('setValue', 0);
		// 待转让笔数
		var regNo = $('#invcMTable').datagrid('getChecked').length;
		$('#regNo').numberbox('setValue', regNo);
		//$('#invcMTable').datagrid('deleteRow', index);
	//}
			
}

function onUnCheckAll(rows){
	$("#regAmt").numberbox('setValue', 0);
	$("#docketAmt").numberbox('setValue', 0);
	$('#regNo').numberbox('setValue', 0);
}

/**
 * 是否确认的改变事件
 * 1.意见框的必输性改变
 */
function changeConfirm(){
	if($("#isConfirm").combobox("getValue") == 0){
		$('#confirmOp').textbox({
			required : false
		});
	}else if($("#isConfirm").combobox("getValue") == 1){
		$('#confirmOp').textbox({
			required : true
		});
	}
}
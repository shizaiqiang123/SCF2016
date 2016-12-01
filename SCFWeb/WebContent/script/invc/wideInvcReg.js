function pageOnInt() {
	ajaxBox();
	ajaxTable();
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('selId', true);
	SCFUtils.setTextReadonly('custNm', true);
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
	$('#selId').val(data.obj.sysRefNo);
	//modify by shizaiqiang 2016-08-17 修改原因：第一个页面修改为catalog导致
	//$('#custNm').val(data.obj.selNm);
	$('#custNm').val(data.obj.custNm);
	//modify by shizaiqiang 2016-08-17 修改原因：第一个页面修改为catalog导致
	$('#ccy').combobox('setValue', 'CNY');
		var options = {};
		options.data = {
			refName : 'TrfRef',
			refField : 'sysRefNo'
		};
	SCFUtils.getRefNo(options);
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
	$('#selNm').val($("#custNm").val());//页面增加隐藏字段selNm用作存储在invc_reg_m表中。new on 0728 by JinJH
	var data = SCFUtils.convertArray('invcMForm');
	if (checkDataGrid()) {
		return;
	}
	if(SCFUtils.FUNCTYPE=="FP"){
		var row = $('#invcMTable').datagrid('getSelections');
		if (row.length == 0) {
			SCFUtils.alert("请选择应收账款！");
			return;
		}
	}
	var pageList = SCFUtils.getGridData("invcMTable");
	if(SCFUtils.FUNCTYPE=="FP"){
		pageList = SCFUtils.getSelectedGridData("invcMTable",false);
		//pageList = $("#invcMTable").datagrid("getSelections");
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
	$.extend(data, {
		'confirmFlag' : 1 //1:应收账款登记
	});
	$.extend(data, grid);/* 继承 */
	return data;
	
}

function ajaxBox() {

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
			queryId : 'Q_P_000722',
			theirRef : theirRef
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('invcMTable', data.rows);
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
			width : '9.39%',
			resizable : true
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : '9.39%',
			resizable : true
		}, {
			field : 'invNo',
			title : '应收账款凭证编号',
			width : '12.32%',
			resizable : true
		}, {
			field : 'invCcy',
			title : '币种',
			width : '5.05%',
			formatter : ccyFormater,
			resizable : true
		}, {
			field : 'invAmt',
			title : '应收账款金额',
			width : '9.29%',
			resizable : true
//		}, {
//			field : 'acctAmt',
//			title : '预付款金额',
//			width : '9.09%',
//			resizable : true
		}, {
			field : 'invBal',
			title : '应收账款净额',
			width : '9.89%',
			resizable : true
		}, {
			field : 'invDt',
			title : '应收账款开立日期',
			width : '13.00%',
			formatter : dateFormater,
			resizable : true
		}, {
			field : 'invValDt',
			title : '应收账款起算日',
			width : '11.99%',
			formatter : dateFormater,
			resizable : true
		}, {
			field : 'invDueDt',
			title : '到期日',
			width : '5.05%',
			formatter : dateFormater,
			resizable : true
		}, {
			field : 'acctPeriod',
			title : '账期',
			width : '5.54%',
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

/*
 * function addSuccess(data) { var invNoList = getInvNo(); if
 * (contains(invNoList, data.invNo)) { SCFUtils.error('应收账款编号为：' + data.invNo +
 * '的应收账款在表格或数据库中已存在!'); return; } data.type = "ADD"; getAmt(data);
 * $('#invcMTable').datagrid('appendRow', data); }
 */
// 重新加入的添加
function addRow() {
	var row = {};
	row.op = 'add';
	row.invCcy = $('#ccy').combobox('getValue');
	var options = {
		title : '添加应收账款',
		reqid : 'I_P_000244',
		data : {
			'row' : row,
			cacheType : 'non'
		},
		onSuccess : addPageSuccess
	};
	SCFUtils.getData(options);
}

function addPageSuccess(data) {
	
	var invNoList = getInvNo();
	if (contains(invNoList, data.invNo)) {
		SCFUtils.error('应收账款编号为：' + data.invNo + '的应收账款在表格或数据库中已存在!');
		return;
	}
	//data.type = "ADD";
	$('#invcMTable').datagrid('insertRow', {
		index : data.index,
		row : {
			buyerId : data.buyerId,
			buyerNm : data.buyerNm,
			invNo : data.invNo,
			invCcy : data.invCcy,
			invAmt : data.invAmt,
			//acctAmt : data.acctAmt,
			invBal : data.invBal,
			invDt : data.invDt,
			invValDt : data.invValDt,
			invDueDt : data.invDueDt,
			acctPeriod : data.acctPeriod,
			sysRefNo : data.sysRefNo,
			selNm : $('#custNm').val(),
			theirRef:$('#sysRefNo').val(),
			invSts :0,
			dspFlag:0,//争议标识在应收账款登记时，给0为默认值
			selId:$('#selId').val(),
			cbkAmt: data.invBal
		}

	});
	if(SCFUtils.FUNCTYPE == 'FP'){
		$('#invcMTable').datagrid('selectRow',$('#invcMTable').datagrid('getRows').length-1);
	}else{
		getAmt(data);
	}
}

// 重新加入的修改
function editRow() {
	var selectRow = $('#invcMTable').datagrid('getSelected');
	var rowIndex = $('#invcMTable').datagrid('getRowIndex', selectRow);
	if (selectRow) {
		var rows = $('#invcMTable').datagrid('getRows');// 获取所有当前加载的数据行
		var data = rows[rowIndex];

		var row = {};
		// row.index = $('#pageDg').datagrid('getRows').length;
		row.op = 'edit';
		row.data = data;
		$.extend(row, data);
		var options = {
			title : '修改应收账款',
			reqid : 'I_P_000244',
			data : {
				'row' : row,
				cacheType : 'non'
			},
			onSuccess : editPageSuccess

		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editPageSuccess(data) {
	/*
	 * var row = $('#invcMTable').datagrid('getSelected'); var rowIndex =
	 * $('#invcMTable').datagrid('getRowIndex', row); $.extend(row, { sysRefNo :
	 * data.sysRefNo, courseName : data.courseName, courseTime :
	 * data.courseTime, payAmt : data.payAmt, userId : data.userId
	 * 
	 * }); $('#invcMTable').datagrid('refreshRow', rowIndex);
	 */
	if ("RE" != SCFUtils.FUNCTYPE) {
		var invNoList = getInvNo();
		// 移除在修改之前的那张发票编号
		var index = getArrIndex(invNoList, data.oldInvNo);
		if (index >= 0) {
			invNoList.splice(index, 1);// 从索引index开始删除1条数据（包含该索引）
		}
		if (data.oldInvNo != data.invNo && contains(invNoList, data.invNo)) {
			SCFUtils.error('应收账款编号为：' + data.invNo + '的应收账款在表格或数据库中已存在!');
			return;
		}
	}
	var regAmt = 0; // 累计金额
	var upAmt = 0; // 修改前净额
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if(SCFUtils.FUNCTYPE == 'FP'){
		datas = $('#invcMTable').datagrid('getSelections');
	}
	$.each(datas, function(i, n) {
		regAmt = SCFUtils.Math(regAmt, n.invBal, 'add');
		if(SCFUtils.FUNCTYPE == 'FP'){
			i = $('#invcMTable').datagrid('getRowIndex',n);
		}
		if (i == index) {
			upAmt = n.invBal;
		}
	});
	var cAmt = SCFUtils.Math(data.invBal, upAmt, 'sub');// 修改前后差值
	regAmt = SCFUtils.Math(cAmt, regAmt, 'add');
	$("#regAmt").numberbox('setValue', regAmt);
	var row = $('#invcMTable').datagrid('getSelected');
	var rowIndex = $('#invcMTable').datagrid('getRowIndex', row);
	$('#invcMTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
}

/*
 * function editSuccess(data) { if ("RE" != SCFUtils.FUNCTYPE) { var invNoList =
 * getInvNo(); // 移除在修改之前的那张发票编号 var index = getArrIndex(invNoList,
 * data.oldInvNo); if (index >= 0) { invNoList.splice(index, 1);//
 * 从索引index开始删除1条数据（包含该索引） } if (data.oldInvNo != data.invNo &&
 * contains(invNoList, data.invNo)) { SCFUtils.error('应收账款编号为：' + data.invNo +
 * '的应收账款在表格或数据库中已存在!'); return; } } var regAmt = 0; // 累计金额 var upAmt = 0; //
 * 修改前净额 var griddata = SCFUtils.getGridData('invcMTable', false); var datas =
 * SCFUtils.parseGridData(griddata, false); $.each(datas, function(i, n) {
 * regAmt = SCFUtils.Math(regAmt, n.invBal, 'add'); if (i == index) { upAmt =
 * n.invBal; } }); var cntrctAmt = queryAmt();// 额度信息 var cAmt =
 * SCFUtils.Math(data.invBal, upAmt, 'sub');// 修改前后差值 regAmt =
 * SCFUtils.Math(cAmt, regAmt, 'add'); $("#regAmt").numberbox('setValue',
 * regAmt); var transChgrt = cntrctAmt.transChgrt; // 计算手续费 var pdgAmt =
 * SCFUtils.Math(regAmt, transChgrt, 'mul'); pdgAmt = SCFUtils.Math(pdgAmt, 100,
 * 'div'); $('#pdgAmt').numberbox('setValue', pdgAmt); var row =
 * $('#invcMTable').datagrid('getSelected'); var rowIndex =
 * $('#invcMTable').datagrid('getRowIndex', row);
 * $('#invcMTable').datagrid('updateRow', { index : rowIndex, row : data }); }
 */
// 新增一条数据
/*
 * function addRow() { var data = SCFUtils.convertArray('invcMForm'); if (data) {
 * var row = {}; //row.custInstCd = $('#custInstCd').val(); row.acctPeriod =
 * $('#acctPeriod').val(); row.busiTp = $('#busiTp').combobox('getValue');
 * row.invCcy = $('#ccy').combobox('getValue'); row.selId = $('#selId').val();
 * row.batchNo = $('#sysRefNo').val(); row.op = 'add'; var options = { title :
 * '新增应收账款', height : '370', reqid : 'I_P_000185', data : { 'row' : row },
 * onSuccess : addSuccess }; SCFUtils.getData(options); } }
 */
// 修改一条数据
/*
 * function editRow() { var row = $('#invcMTable').datagrid('getSelections');
 * row.busiTp = $('#busiTp').combobox('getValue'); if (row.length == 1) { row =
 * row[0]; row.op = 'edit'; if ('RE' === SCFUtils.FUNCTYPE) { row.state =
 * 'query'; } var options = { title : '修改应收账款', height : '370', reqid :
 * 'I_P_000006', data : { 'row' : row }, onSuccess : editSuccess };
 * SCFUtils.getData(options); } else if (row.length > 1) {
 * SCFUtils.alert("只能选择一条数据！"); } else { SCFUtils.alert("请选择一条数据！"); } }
 */

// 删除一条数据
function deleteRow() {
	var rows = $('#invcMTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
//	var cntrctAmt = queryAmt();// 额度信息
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#invcMTable').datagrid('getAllRowIndex',
							copyRows[i].sysRefNo);
					var regAmt = $("#regAmt").numberbox('getValue');
					var griddata = SCFUtils.getGridData('invcMTable', false);
					var datas = SCFUtils.parseGridData(griddata, false);
					regAmt = SCFUtils.Math(regAmt, datas[index].invBal, 'sub');
					$("#regAmt").numberbox('setValue', regAmt);
//					var billAmt = cntrctAmt.billAmt; // 每笔应收账款处理费
//					var transChgrt = cntrctAmt.transChgrt; // 计算手续费
//					var pdgAmt = SCFUtils.Math(regAmt, transChgrt, 'mul');
//					pdgAmt = SCFUtils.Math(pdgAmt, 100, 'div');
//					$('#pdgAmt').numberbox('setValue', pdgAmt);
//					var regNo = $("#regNo").val();
//					regNo = SCFUtils.Math(regNo, 1, 'sub');
//					if (regNo == 0) {
//						$("#docketAmt").numberbox('setValue', 0);
//					} else {
//						var docketAmt = SCFUtils.Math(regNo, billAmt, 'mul');
//						$("#docketAmt").numberbox('setValue', docketAmt);
//					}
					$("#docketAmt").numberbox('setValue', 0);
					// 待转让笔数
					var regNo = SCFUtils.Math(
							$('#regNo').numberbox('getValue'), 1, 'sub');
					$('#regNo').numberbox('setValue', regNo);
					$('#invcMTable').datagrid('deleteRow', index);
				}
				SCFUtils.refreshAllRows("invcMTable");// 删除后刷新行记录
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}

}

/**
 * 导入
 * 
 * @param ddd,
 * @result
 * @auther ddd
 * @date
 */
function upload() {
	var data = SCFUtils.convertArray("invcMForm");
	if (data) {
		var invNoList = getInvNo();//获得发票号 
		var param = { 
			data : $.extend({
				"templateId" : "T0000016",	
				'invNoList' : invNoList
			}, data),
			callBackFun : function(data) {
				var griddata = SCFUtils.getGridData('invcMTable', false);
				var befRegNo = 0;
				var befRegAmt = 0;
				if (!SCFUtils.isEmpty(griddata)) { // 汇总已存在记录
					befRegNo = $('#regNo').numberbox('getValue');
					befRegAmt = $("#regAmt").numberbox('getValue');
				}

				var regAmt = 0; // 累计金额
				var regNo = SCFUtils.Math(data.total, befRegNo, 'add');// 累计待转让笔数
				$('#regNo').numberbox('setValue', regNo);//设置待转让笔数
				var regAmt = 0;
				$.each(data.rows, function(i, n) {
					n.theirRef=$('#sysRefNo').val();
					n.invSts = 0;
					n.selId=$('#selId').val(),
					n.type = "UPLOAD";
					n.dspFlag = 0;//争议标识在批量导入时，给0为默认值
					//getProcPag(n); //处理费手续费计算值
					n.cbkAmt = n.invBal;
					getAmt(n); //计算金额
					regAmt = SCFUtils.Math(regAmt, n.invBal, 'add');
				});
				regAmt = SCFUtils.Math(regAmt, befRegAmt, 'add'); // 累计待转让金额
				$("#regAmt").numberbox('setValue', regAmt);//设置待转让金额
				$('#regNo').numberbox('setValue', regNo);//设置待转让笔数
				//var cntrctAmt = queryAmt();// 额度信息
				//var billAmt = cntrctAmt.billAmt; // 计算处理费
				//var docketAmt = SCFUtils.Math(regNo, billAmt, 'mul');
				//$("#docketAmt").numberbox('setValue', docketAmt);
				//var transChgrt = cntrctAmt.transChgrt; // 计算手续费
				//var pdgAmt = SCFUtils.Math(regAmt, transChgrt, 'mul');
				//pdgAmt = SCFUtils.Math(pdgAmt, 100, 'div');
				//$('#pdgAmt').numberbox('setValue', pdgAmt);
				SCFUtils.loadGridData('invcMTable', data.rows);
			}
		};
		SCFUtils.upload(param);
	}
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

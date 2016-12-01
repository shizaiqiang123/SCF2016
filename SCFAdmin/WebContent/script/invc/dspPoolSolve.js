function pageOnInt() {
	ajaxBox();
	ajaxTable();
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('trxDt', true);
	SCFUtils.setTextReadonly('selId', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('notifyBy', true);
	//SCFUtils.setComboReadonly('busiTp', true);
	SCFUtils.setTextReadonly('ttlDspInvNo', true);
	SCFUtils.setNumberboxReadonly('ttlDspInvAmt', true);
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
	if ("FP" == SCFUtils.FUNCTYPE) {
		loadTable();
	} else {
		var options = {};
		options.data = {
			refName : 'DspRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);
		//querySelAcNo(data);
		$('#trxDt').val(SCFUtils.dateFormat(data.obj.trxDt,'yyyy-MM-dd'));//争议登记日期
		//$('#dspFlag').val(data.obj.dspFlag); // 争议标识
		$('#cntrctNo').val(data.obj.cntrctNo);// 协议编号
	}
	//checkBusiTp(data);
	searchPmt();
	$("#invcMTable").datagrid("selectAll");
	lookSysRelReason();
}
function checkBusiTp(data) {
	if (data.obj.busiTp == '3') { // 信用保险项下
		$('#bx1').show();
		$('#bx2').show();
		queryInsure(data.obj.cntrctNo);
	} else {
		$('#bx1').hide();
		$('#bx2').hide();
	}
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('invcMForm', data);
	SCFUtils.loadGridData('invcMTable', SCFUtils.parseGridData(data.obj.invc),
			true);// 加载数据并保护表格。
	//checkBusiTp(data);
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
	$('#invcMTable').datagrid('selectAll',true);
	//checkBusiTp(data);
	lookSysRelReason();
}

function pageOnFPLoad(data) {
	pageOnReleasePageLoad(data);
	/*var optionsGrid = $('#invcCdnTable').datagrid('options');
	optionsGrid.onCheck = onCheck;
	optionsGrid.onUncheck = onUncheck;
	optionsGrid.onCheckAll = onCheckAll;
	optionsGrid.onUncheckAll = onUncheckAll;*/
	// $('#invcCdnTable').datagrid('checkAll');
	// 在加载数据初始化时就将datagrid中的数据默认全勾选
	// $('#billTable').datagrid('selectAll', true);//
	// 在加载数据初始化时就将datagrid中的数据默认全勾选
	lookSysRelReason();
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('invcMForm', row);
	$('#trxDt').val(SCFUtils.dateFormat(data.obj.trxDt,'yyyy-MM-dd'));//争议登记日期
	loadTable();
	//checkBusiTp(data);
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

function onNextBtnClick() {
	var dataRows = $('#invcMTable').datagrid('getData');
	var rows = $('#invcMTable').datagrid('getSelections');
	var ttlRows = dataRows.rows.length;
	var selectRows = rows.length;
	//判断如果有争议的发票总数等于选择的总数，说明本次操作，将该登记的数据全部操作，即再次操作争议解决无需查询出该争议，设置状态为3(dspFalg=3)
	//如果不相等，表明下次继续操作标识为1  add by YeQ 2016-06-25
	if (SCFUtils.FUNCTYPE != 'RE') {
		if(ttlRows == selectRows){
			$('#dspFlag').val(3); // 争议标识
		}else{
			$('#dspFlag').val(1); // 争议标识
		}
	}
	
	if (SCFUtils.FUNCTYPE === 'PM' || SCFUtils.FUNCTYPE === 'FP') {
		if (rows.length == 0) {
			SCFUtils.alert("请选择应收账款！");
			return;
		} 
	}
	var data = SCFUtils.convertArray('invcMForm');
	var pageList = SCFUtils.getSelectedGridData("invcMTable",false);
	//复核时打包子表所有行
	if(SCFUtils.FUNCTYPE === 'RE' || SCFUtils.FUNCTYPE === 'DP'){
		pageList = SCFUtils.getGridData("invcMTable",false);
	}
	var grid = {};
	if (pageList && !SCFUtils.isEmpty(pageList)) {
		$.each(pageList,function(i,n){
			$.extend(n,{
				"busiTp" : 6
			});
		});
		grid.invc = SCFUtils.json2str(pageList);
	}
	$.extend(data, grid);
	return data;

	if (checkDataGrid()) {
		return;
	}
}

function ajaxBox() {
//	var data = [ {
//		"id" : '0',
//		"text" : "国内有追索权保理",
//		"selected" : true
//	}, {
//		"id" : '1',
//		"text" : "国内无追索权保理"
//	}, {
//		"id" : '2',
//		"text" : "先票款后货"
//	},{
//		"id" : '3',
//		"text" : "信用保险项下"
//	},{
//		"id" : '4',
//		"text" : "动产质押融资"
//	} ];
//	$("#busiTp").combobox('loadData', data);
}

function querySelAcNo(data) {
	var acOwnerid = data.obj.selId;
	if (!SCFUtils.isEmpty(acOwnerid)) {
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000105',
				acOwnerid : acOwnerid
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					// 卖方账号，开户行，账号户名
					// $('#selId').val(data.rows[0].acOwnerid);
					$('#selAcNo').val(data.rows[0].acNo);
					$('#selAcNm').val(data.rows[0].acNm);
					$('#selAcBkNm').val(data.rows[0].acBkNm);
				}
			}
		};
		SCFUtils.ajax(opt);
	}
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function loadTable() {
	var dspRef = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000604',
			dspRef : dspRef
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
	/*
	 * var nowDate=$('#trxDt').datebox('getValue'); var
	 * lmtDueDt=$('#lmtDueDt').datebox('getValue');
	 * if(SCFUtils.DateDiff(nowDate, lmtDueDt)>0){
	 * SCFUtils.alert('间接客户额度已过期，请检查！！'); flag = true; }
	 */
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
			width : '9%',
			hidden : true
		}, {
			field : 'buyerNm',
			title : '间接客户名称',
			width : '10%'
		}, {
			field : 'invNo',
			title : '应收账款凭证编号',
			width : '10%'
		}, {
			field : 'invCcy',
			title : '币种',
			width : '10%',
			formatter : ccyFormater
		}, {
			field : 'invAmt',
			title : '应收账款金额',
			width : '9%',
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'acctAmt',
			title : '预付款金额',
			width : '9%',
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'invBal',
			title : '应收账款净额',
			width : '10%',
			formatter : ccyFormater
		}, {
			field : 'invDt',
			title : '应收账款开立日期',
			width : '10%',
			formatter : dateFormater
		}, {
			field : 'invValDt',
			title : '应收账款起算日',
			width : '9%',
			formatter : dateFormater,
			hidden : true
		}, {
			field : 'acctPeriod',
			title : '账期',
			width : '9%',
			hidden : true
		}, {
			field : 'invDueDt',
			title : '到期日',
			width : '10%',
			formatter : dateFormater
		}, {
			field : 'loanPerc',
			title : '融资比例(%)',
			width : 120,
			hidden : true
		}, {
			field : 'invLoanAval',
			title : '可融资金额',
			width : '10%',
			formatter : ccyFormater,
			hidden : true
		}, {
			field : 'invLoanBal',
			title : '已融资金额',
			width : '10%',
			formatter : ccyFormater
		}, {
			field : 'dspAmt',
			title : '争议金额',
			width : '10%',
			formatter : ccyFormater
		}, {
			field : 'dspDt',
			title : '争议日期',
			width : '10%',
			formatter : dateFormater,
		}, {
			field : 'dspFlag',
			title : '发票争议标识',
			width : 70,
			hidden : true
		}, {
			field : 'dspRsn',
			title : '发票争议原因',
			width : 100,
			hidden : true
		}, {
			field : 'otherRsn',
			title : '其他原因',
			width : 70,
			hidden : true
		}, {
			field : 'fixRsn',
			title : '解决原因',
			width : '10%',
		}, {
			field : 'dspRef',
			title : '争议流水号',
			width : 70,
			hidden : true
		} ] ]
	};
	$('#invcMTable').datagrid(options);
}

function searchPmt() {
	var dspRef = $('#sysRefNo').val();
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000443',
			dspRef : dspRef,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#invcMTable').datagrid('clearChecked');
					var sysRefNo = $('#sysRefNo').val();
					var selId = $('#selId').val();
					var cntrctNo = $('#cntrctNo').val();
					var trxDt = $('#trxDt').val();
					$.each(data.rows, function(i, n) {
						$.extend(n, {
							buyerId : n.buyerId,
							buyerNm : n.buyerNm,
							invNo : n.invNo,
							invCcy : n.invCcy,
							invAmt : n.invAmt,
							acctAmt : n.acctAmt,
							invBal : n.invBal,
							invDt : n.invDt,
							invValDt : n.invValDt,
							acctPeriod : n.acctPeriod,
							invDueDt : n.invDueDt,
							loanPerc : n.loanPerc,
							invLoanAval : n.invLoanAval,
							invLoanBal : n.invLoanBal,
							dspAmt : n.dspAmt,
							dspDt : n.trxDt,
							dspFlag : 3,//争议标识，在解决时设置默认为解决
							dspRsn : n.dspRsn,
							otherRsn : n.otherRsn,
							fixRsn : n.fixRsn,
							dspRef : sysRefNo
						});
						if(n.loanPerc==null){
							$.extend(n, {
								loanPerc : ''
							});
						}
					});
					SCFUtils.loadGridData('invcMTable', data.rows, true, true);
					var befregNo = 0;
					var regNo = SCFUtils.Math(data.total, befregNo, 'add');
					$('#ttlDspInvNo').val(regNo);
					var regAmt = 0;
					$.each(data.rows, function(i, n) {
						regAmt = SCFUtils.Math(regAmt, n.dspAmt, 'add');
					});
					$("#ttlDspInvAmt").numberbox('setValue', regAmt);// 设置待转让金额
					/* loadGridData(data, false, true); */
					/*
					 * $('#payIntAmt').numberbox('setValue', 0);
					 * $('#ttlPmtAmt').numberbox('setValue', 0);
					 * $('#payPrinAmt').numberbox('setValue', 0);
					 * queryRelCntrct(); queryCust();
					 */
				} else {
					SCFUtils.alert("没有符合的应收账款");
				}
			} else {
				SCFUtils.alert("查询失败");
			}
		}
	};
	SCFUtils.ajax(opts);
}
/*
 * function loadGridData(data, flag1, flag2) { var sysRefNo =
 * $('#sysRefNo').val(); // var loanId = $('#loanId').val(); var selId =
 * $('#selId').val(); var cntrctNo = $('#cntrctNo').val(); $.each(data.rows,
 * function(i, n) { n.sysRefNo = sysRefNo + n.invId; n.invSts = 'SELPMT';
 * n.invPmtRef = sysRefNo; n.invRef = n.invId; n.invLoanEbalHD = n.invLoanEbal; //
 * n.loanId = loanId; n.selId = selId; n.cntrctNo = cntrctNo; });
 * SCFUtils.loadGridData('invcMTable', data.rows, flag1, flag2); }
 */
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

function addSuccess(data) {
	var invNoList = getInvNo();
	if (contains(invNoList, data.invNo)) {
		SCFUtils.error('应收账款编号为：' + data.invNo + '的应收账款在表格或数据库中已存在!');
		return;
	}
	data.type = "ADD";
	getAmt(data);
	$('#invcMTable').datagrid('appendRow', data);
}

function editSuccess(data) {
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
	var row = $('#invcMTable').datagrid('getSelected');
	var rowIndex = $('#invcMTable').datagrid('getRowIndex', row);
	$('#invcMTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	var ttlDspInvAmt = 0;//应收账款发票总额
	$.each(datas, function(i, n) {
		ttlDspInvAmt = SCFUtils.Math(ttlDspInvAmt, n.dspAmt, 'add');
	});
	$("#ttlDspInvAmt").numberbox('setValue', ttlDspInvAmt);// 修改一条数据后，重新计算争议总金额
}
// 新增一条数据
function addRow() {
	var data = SCFUtils.convertArray('invcMForm');
	if (data) {
		var row = {};
		row.cntrctNo = $('#cntrctNo').val();
		row.acctPeriod = $('#acctPeriod').val();
		//row.busiTp = $('#busiTp').combobox('getValue');
		row.invCcy = $('#ccy').combobox('getValue');
		row.selId = $('#selId').val();
		row.batchNo = $('#sysRefNo').val();
		row.op = 'add';
		var options = {
			title : '新增应收账款',
			height : '370',
			reqid : 'I_P_000006',
			data : {
				'row' : row
			},
			onSuccess : addSuccess
		};
		SCFUtils.getData(options);
	}

}
// 修改一条数据
function editRow() {
	var row = $('#invcMTable').datagrid('getSelections');
	//row.busiTp = $('#busiTp').combobox('getValue');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title : '修改应收账款',
			height : '370',
			reqid : 'I_P_000189',
			data : {
				'row' : row
			},
			onSuccess : editSuccess
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
//删除一条数据
function deleteRow() {
	var rows = $('#invcMTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#invcMTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
			            $('#invcMTable').datagrid('deleteRow',index);
			            
			            var ttlDspInvAmt = $("#ttlDspInvAmt").numberbox('getValue');
						$("#ttlDspInvAmt").numberbox('setValue', SCFUtils.Math(ttlDspInvAmt, copyRows[i].dspAmt, 'sub'));// 设置待转让金额
			     }
				 var ttlDspInvNo = $("#ttlDspInvNo").val();
				 $("#ttlDspInvNo").val(SCFUtils.Math(ttlDspInvNo, copyRows.length, 'sub'));
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
/*
 * function upload() { var data = SCFUtils.convertArray("invcMForm"); if (data) {
 * var invNoList = getInvNo(); var param = { data : $.extend({ "templateId" :
 * "T0000002", 'invNoList' : invNoList }, data), callBackFun : function(data) {
 * var griddata = SCFUtils.getGridData('invcMTable', false); var befregNo = 0;
 * var befregAmt = 0; if (!SCFUtils.isEmpty(griddata)) { // 汇总已存在记录 befregNo =
 * $('#regNo').numberbox('getValue'); befregAmt =
 * $("#regAmt").numberbox('getValue'); }
 * 
 * var regAmt = 0; // 累计金额 var regNo = SCFUtils.Math(data.total, befregNo,
 * 'add'); $('#regNo').numberbox('setValue', regNo); var regAmt = 0;
 * $.each(data.rows, function(i, n) { n.type = "UPLOAD"; getProcPag(n);
 * getAmt(n); regAmt = SCFUtils.Math(regAmt, n.invBal, 'add'); }); regAmt =
 * SCFUtils.Math(regAmt, befregAmt, 'add'); // 累计表单已存在数据
 * $("#regAmt").numberbox('setValue', regAmt); $('#regNo').numberbox('setValue',
 * regNo); var cntrctAmt = queryAmt();// 额度信息 var billAmt = cntrctAmt.billAmt; //
 * 计算处理费 var docketAmt = SCFUtils.Math(regNo, billAmt, 'mul');
 * $("#docketAmt").numberbox('setValue', docketAmt); var transChgrt =
 * cntrctAmt.transChgrt; // 计算手续费 var pdgAmt = SCFUtils.Math(regAmt, transChgrt,
 * 'mul'); pdgAmt = SCFUtils.Math(pdgAmt, 100, 'div');
 * $('#pdgAmt').numberbox('setValue', pdgAmt);
 * SCFUtils.loadGridData('invcMTable', data.rows); } }; SCFUtils.upload(param); } }
 */
// 查询买方额度
function queryBuyerLmtAmt(sysRefNo) {
	var obj = {}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000340',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

// 金额计算
function getAmt(data) {
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	var cntrctAmt = queryAmt();// 额度信息
	if (data.type == "ADD") {
		var regAmt = 0; // 累计金额
		var regNo = datas.length + 1; // 转让笔数
		var billAmt = cntrctAmt.billAmt; // 计算处理费
		var docketAmt = SCFUtils.Math(regNo, billAmt, 'mul');
		$("#docketAmt").numberbox('setValue', docketAmt);
		$('#regNo').numberbox('setValue', regNo);
	}
	if (!SCFUtils.isEmpty(datas)) {
		$.each(datas, function(i, n) {
			regAmt = SCFUtils.Math(regAmt, n.invBal, 'add');
		});
		if (data.type == "ADD")
			regAmt = SCFUtils.Math(regAmt, data.invBal, 'add');
	} else {
		regAmt = data.invBal;
	}
	$("#regAmt").numberbox('setValue', regAmt);
	var transChgrt = cntrctAmt.transChgrt; // 计算手续费
	var pdgAmt = SCFUtils.Math(regAmt, transChgrt, 'mul');
	pdgAmt = SCFUtils.Math(pdgAmt, 100, 'div');
	$('#pdgAmt').numberbox('setValue', pdgAmt);
	if (data.type == "ADD") {
		$('#loanPerc').val(data.loanPerc); // 融资比例
		$('#dueDt').datebox('setValue', data.dueDt);// 逾期日期
	}
}

// 处理费手续费计算
function getProcPag(n) {
	var cntrctAmt = queryAmt();// 额度信息
	var isCollect = $('#isCollect').combobox('getValue');
	var transChgrt = cntrctAmt.transChgrt;
	var loanTranAmt = SCFUtils.Math(n.invBal, transChgrt, 'mul');
	loanTranAmt = SCFUtils.Math(loanTranAmt, 100, 'div');
	var billAmt = cntrctAmt.billAmt;
	var loanBillAmt = billAmt;
	if (isCollect == 'Y') {
		// 处理费，手续费插入发票表
		var payTranAmt = SCFUtils.Math(n.invBal, transChgrt, 'mul');
		payTranAmt = SCFUtils.Math(payTranAmt, 100, 'div');
		var payBillAmt = billAmt;
	} else {
		var payTranAmt = 0;
		var payBillAmt = 0;
	}
	if (n.type == "ADD") {
		$('#invcMTable').datagrid('updateRow', {
			index : n.index,
			row : {
				invSts : 'TRF',
				loanTranAmt : loanTranAmt,
				payTranAmt : payTranAmt,
				loanBillAmt : loanBillAmt,
				payBillAmt : payBillAmt
			}
		});
		// n.index++;
	} else if (n.type == "UPLOAD") {
		// 查询额度关联，融资比例,赊销 款限期，计算融资余额，逾期日期。
		var obj = queryCntrctSbrM(n.cntrctNo, n.buyerId);
		var openactGraceDay = obj.openactGraceDay;
		var loanPerc = obj.loanPct;
		var invLoanAval = SCFUtils.Math(n.invBal, loanPerc, "mul");
		invLoanAval = SCFUtils.Math(invLoanAval, 100, "div");
		var invDueDt = SCFUtils.dateFormat(n.invDueDt);
		var dueDt = SCFUtils.FormatDate(invDueDt, openactGraceDay);
		$.extend(n, {
			loanPerc : loanPerc,
			invLoanAval : invLoanAval,
			dueDt : dueDt,
			selId : $('#selId').val(),
			//busiTp : $('#busiTp').val(),
			invSts : 'TRF',
			loanBalAmt : 0,
			loanTranAmt : loanTranAmt,
			payTranAmt : payTranAmt,
			loanBillAmt : loanBillAmt,
			payBillAmt : payBillAmt
		});
	}
}

// 查询额度关联关系表
function queryCntrctSbrM(cntrctNo, buyerId) {
	var obj = {}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000385',
			cntrctNo : cntrctNo,
			buyerId : buyerId
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

// 查询额度中的手续费与应收账款处理费
function queryAmt() {
	var obj = {}
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000415',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows[0];
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

// 查询保单信息
function queryInsure(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000424',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#collatCompNm').val(data.rows[0].collatCompNm);
				$('#insureNo').val(data.rows[0].insureNo);
				$('#collatVailDt').datebox('setValue',
						data.rows[0].collatVailDt);
				$('#collatDueDt').datebox('setValue', data.rows[0].collatDueDt)
			}
		}
	};
	SCFUtils.ajax(options);
}

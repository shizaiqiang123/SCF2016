//页面初始化
function pageOnInt(data) {
	$('tr[id=Tr1]').hide();
	$('tr[id=Tr2]').hide();
	ajaxBox();
	ajaxTable();
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

// 买方查询
function showLookUpWindow() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		title : '间接客户查询',
		reqid : 'I_P_000111',
		data : {
			'cntrctNo' : cntrctNo
		},
		onSuccess : getBuyerSuccess
	};
	SCFUtils.getData(options);
}

// 设置融资余额
/*
 * function changeTtlLoanAmt() { var loanDueDt =
 * $("#loanDueDt").datebox("getValue"); var loanValDt =
 * $('#loanValDt').datebox('getValue'); var ttlLoanAmt =
 * $("#ttlLoanAmt").numberbox("getValue");// 融资金额
 * $('#ttlLoanBal').val($('#ttlLoanAmt').numberbox('getValue'));
 * $('#marginAmt').numberbox( 'setValue', SCFUtils.Math($('#ttlLoanBal').val(),
 * $('#initMarginPct') .numberspinner('getValue') / 100, 'mul')); var transChgrt =
 * $('#transChgrt').val() * 0.01;// 手续费率 var pdgAmt = SCFUtils.Math(ttlLoanAmt,
 * transChgrt, 'mul');// 融资金额 * 手续费率
 * 
 * var loanRt = $('#loanRt').val() * 0.01;// 正常利率 var subDate =
 * SCFUtils.DateDiff(loanDueDt, loanValDt);// 融资到期日— 融资起始日 var intAmt =
 * SCFUtils.Math(ttlLoanAmt, loanRt, 'mul');// 融资金额 * 正常利率 intAmt =
 * SCFUtils.Math(intAmt, subDate, 'mul');// 融资金额 * 正常利率*（融资到期日— // 融资起始日） intAmt =
 * SCFUtils.Math(intAmt, 360, 'div');// 融资金额 * 正常利率*（融资到期日— // 融资起始日）/360
 * $('#pdgAmt').numberbox('setValue', pdgAmt.toFixed(2));
 * $('#intAmt').numberbox('setValue', intAmt.toFixed(2)); }
 */

// 订单查询
function showLookPoWindow() {
	var cntrctNo = $('#cntrctNo').val();
	var buyerId = $('#buyerId').val();
	var loanDueDt = $('#loanDueDt').datebox('getValue');
	if (buyerId == "" || buyerId == null) {
		SCFUtils.alert('请先选择供货商！');
		return;
	}

	var options = {
		title : '订单查询',
		reqid : 'I_P_000126',
		data : {
			'cntrctNo' : cntrctNo,
			'buyerId' : buyerId
		},
		onSuccess : getPoSuccess
	};
	SCFUtils.getData(options);
}

function getPoSuccess(data) {
	$('#poNo').val(data.sysRefNo);
	$('#poAmt').numberbox('setValue', data.poAmt);
	$('#buyerId').focus();
	if ($('#poNo').val() != null) {
		$('#poNo').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#poNo').removeClass('validatebox-invalid');
	}

	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000711',
			poNo : $('#poNo').val(),
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#loanId').val(data.rows[0].sysRefNo);// 融资编号
				$('#loanDueDt').datebox('setValue', data.rows[0].loanDueDt);
				$('#ttlLoanAmt').numberbox('setValue', data.rows[0].ttlLoanAmt);
				$('#ttlLoanBal').numberbox('setValue', data.rows[0].ttlLoanBal);
			}
		}
	};
	SCFUtils.ajax(opts);

	// loadPoMTable();
}

// 加载融资信息datagrid
function loadPoMTable() {
	var cntrctNo = $("#cntrctNo").val();
	var selId = $("#selId").val();
	var buyerId = $("#buyerId").val();
	var poNo = $("#poNo").val();
	// 订单PoM表单
	var optionsPo = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000407',
			cntrctNo : cntrctNo,
			selId : selId,
			buyerId : buyerId,
			poNo : poNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				if (!SCFUtils.isEmpty(data.rows)) {
					var arr = [];
					for (var i = 0; i < data.rows.length; i++) {
						if (data.rows[i].poNumUseable != 0) {
							arr.push(data.rows[i]);
						}
					}
					data.rows = arr;
					SCFUtils.loadGridData('CollateralTable', data.rows, true,
							true);// 加载的时候就保护数据
					$('#CollateralTable').datagrid({"onLoadSuccess":deal()});
				} else {
					$("#CollateralDiv").parent("div").parent("div").attr(
							"style", "display:none");
				}
			} else {
				SCFUtils.alert("查询失败");
			}
		}
	};
	SCFUtils.ajax(optionsPo);

}

function deal() {
	var rows = $('#CollateralTable').datagrid('getRows');
	var cancelAmt = 0;
	var amt = 0;
	for (var i = 0; i < rows.length; i++) {
		var td = $('.datagrid-body td[field="poAmtUseable"]')[i];
		var div = $(td).find('div')[0];
		amt = rows[i]['poNumUseable'] * rows[i]['poPrice'];
		$(div).text(amt);
		cancelAmt += amt;

	}
	$('#cancelAmt').numberbox('setValue', cancelAmt);
}

function ajaxBox() {
	var data = [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '2',
		"text" : "先票款后货"
	}, {
		"id" : '11',
		"text" : "三方保兑仓"
	} ];
	$("#busiTp").combobox('loadData', data);
	// 加载币种
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006',
			cacheType : 'comm'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);

	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setDateboxReadonly("sysOpTm", true);
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("ccy", true);
	SCFUtils.setTextReadonly("sellerInstCd", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setNumberboxReadonly('poAmt', true);
	SCFUtils.setTextReadonly('loanId', true);
	SCFUtils.setTextReadonly('poNo', true);
	SCFUtils.setNumberboxReadonly('ttlLoanAmt', true);
	SCFUtils.setNumberboxReadonly('ttlLoanBal', true);
	SCFUtils.setNumberboxReadonly('cancelAmt', true);
	SCFUtils.setDateboxReadonly('loanDueDt', true);
}

// 查询融资信息
function onSearchPoClick() {
	var cntrctNo = $('#cntrctNo').val();
	var selId = $('#selId').val();
	var buyerId = $('#buyerId').val();
	if (buyerId == "" || buyerId == null) {
		SCFUtils.alert('请先选择供货商！');
		return;
	}

	var options = {
		title : '融资查询',
		reqid : 'I_P_000220',
		data : {
			'selId' : selId,
			'cntrctNo' : cntrctNo,
			'buyerId' : buyerId,
			cacheType : 'non'
		},
		onSuccess : setLoanData,
		cacheType : 'non'
	};
	SCFUtils.getData(options);
}

function setLoanData(data) {
	if (SCFUtils.isEmpty(data)) {
		SCFUtils.alert("未选择融资记录！");
		return;
	}

	$('#loanId').val(data.sysRefNo);
	/** 买方编号与名称不在选择融资后赋值，改为页面选择买方后赋值 YeQing modify on 2016-06-06 */
	$('#ttlLoanAmt').numberbox('setValue', data.ttlLoanAmt);
	$('#ttlLoanBal').numberbox('setValue', data.ttlLoanBal);
	$('#loanDueDt').datebox('setValue', data.loanDueDt);
	$('#poNo').val(data.poNo);
	$('#poAmt').numberbox('setValue', data.poAmt);
	if ($('#poNo').val() != null) {
		$('#poNo').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#poNo').removeClass('validatebox-invalid');
	}
	loadPoMTable();
}
// 选择关联买方
function showLookUpWindow() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		title : '间接客户查询',
		reqid : 'I_P_000111',
		data : {
			'cntrctNo' : cntrctNo
		},
		onSuccess : buyerSuccess
	};
	SCFUtils.getData(options);
}

function buyerSuccess(data) {
	$('#buyerId').val(data.buyerId);
	$('#buyerNm').val(data.buyerNm);
	$('#sysRefNo').focus();
}

// 选择关联监管方
function showCntrctPatWindow() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		title : '监管方查询',
		reqid : 'I_P_000186',
		data : {
			'cntrctNo' : cntrctNo
		},
		onSuccess : patnerSuccess
	};
	SCFUtils.getData(options);
}

function patnerSuccess(data) {
	$('#patnerId').val(data.patnerId);
	$('#patnerNm').val(data.patnerNm);
	$('#sysRefNo').focus();
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function pageOnLoad(data) {
	if (SCFUtils.FUNCTYPE == 'PM') {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
	SCFUtils.loadForm('POForm', data);
	if (SCFUtils.OPTSTATUS == 'ADD') {
		var options = {};
		options.data = {
			refName : 'CLSRefNo',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);
		var sysRefNo = $('#sysRefNo').val();
		var trxDate = getDate(new Date());
		var refNo = sysRefNo.substring(0, 3);
		var refNo1 = sysRefNo.substring(3, 7);
		var newRef = refNo + trxDate.replace(/-/g, "") + refNo1;
		$('#sysRefNo').val(newRef);
		$('#sysOpTm').datebox('setValue', trxDate);
		$("#ccy").combobox('setValue', data.obj.lmtCcy);
	}
	lookSysRelReason();
}

function pageOnResultLoad(data) {
	if (SCFUtils.FUNCTYPE == 'PM') {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
	SCFUtils.loadForm('POForm', data);
	SCFUtils.loadGridData('CollateralTable', SCFUtils
			.parseGridData(data.obj.COLLAT), true);// 加载数据并保护表格。
	$('#CollateralTable').datagrid({"onLoadSuccess":deal()});
	lookSysRelReason();
}
function pageOnPreLoad(data) {
	if (SCFUtils.FUNCTYPE == 'PM') {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
	SCFUtils.loadForm('POForm', data);
	SCFUtils.loadGridData('CollateralTable', SCFUtils
			.parseGridData(data.obj.COLLAT), false);
	$('#CollateralTable').datagrid({"onLoadSuccess":deal()});
	$('#CollateralTable').datagrid('selectAll');
	var options = $('#CollateralTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	lookSysRelReason();

}
function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('POForm', row);
	// loadTable();
	loadPoMTable();
	queryReSeller();
	lookSysRelReason();
	if (data.obj.OldSysRelReason == "") {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
}

// 获取信息
function queryReSeller() {
	var selId = $('#selId').val();
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : selId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#sellerInstCd').val(data.rows[0].custInstCd);// 额度余额
			}
		}
	};
	SCFUtils.ajax(opts);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
	if (data.obj.OldSysRelReason == "") {
		$("#reasonDiv").parent("div").attr("style", "display:none");
	}
}

function pageOnFPLoad(data) {
	pageOnReleasePageLoad(data);
	$('#CollateralTable').datagrid('selectAll', true);// 在加载数据初始化时就将datagrid中的数据默认全勾选
	var options = $('#CollateralTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	lookSysRelReason();
}

function onCheck(rowIndex, row) {
	getPoAmt();
}

function onUnCheck(rowIndex, row) {
	getPoAmt();
}

function onCheckAll(rows) {
	getPoAmt();
}

function onUnCheckAll(rows) {
	getPoAmt();
}

function onNextBtnClick() {
	if (SCFUtils.FUNCTYPE != 'RE' && SCFUtils.FUNCTYPE != 'DP') {
		if (checkPoNo()) {
			return;
		}
	}
	if (SCFUtils.FUNCTYPE == 'FP') {
		// 增加必要勾选一条的限制条件(2016.07.26新增)
		var rowsNum = $('#CollateralTable').datagrid('getSelections');
		if (rowsNum.length <= 0) {
			SCFUtils.alert("请至少勾选一条订单信息！");
			return;
		}
	}
	var poAmt = $('#poAmt').numberbox('getValue');
	if (poAmt <= 0) {
		SCFUtils.alert("订单金额必须大于零！");
		return;
	}

	var mainData = SCFUtils.convertArray('POForm');
	var grid = {};
	var griddata = SCFUtils.getGridData('CollateralTable', false);
	if (SCFUtils.FUNCTYPE == 'FP') {
		griddata = $('#CollateralTable').datagrid("getSelections");
		griddata = SCFUtils.packageListData(griddata, false);
	}
	$.each(griddata, function(i, n) {
		$.extend(n, {
			poNo : $('#poNo').val(),
			selId : $('#selId').val(),
			buyerId : $('#buyerId').val()
		});
	});
	$.extend(mainData, {
		'confirmFlag' : 0
	});
	grid.COLLAT = SCFUtils.json2str(griddata);
	$.extend($.extend(mainData, grid));
	return mainData;
}

// 复核时加载列表数据
function loadTable() {
	var refNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000016',
			refNo : refNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('CollateralTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

// 验证订单编号是否重复
function checkPoNo() {
	var flag = false;
	var poNo = $('#poNo').val();
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000031',
			poNo : poNo,
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.alert('该订单编号已存在或者为空！');
				flag = true;
			}
		}
	};
	SCFUtils.ajax(options);
	return flag;
}

// 验证是否录入了订单
function checkDataGrid() {
	var flag = false;
	var data = $('#CollateralTable').datagrid('getData');
	if (data.total == 0) {
		SCFUtils.alert('请添加订单详细信息！');
		flag = true;
	}
	return flag;
}

function ajaxTable() {
	// 加载表格
	var options = {
		// toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'sysRefNo',// 分页勾选

		columns : [ [ {
			field : 'goodsCata',
			title : '商品大类',
			width : '8.08%'
		}, {
			field : 'subCata',
			title : '商品子类',
			width : '8.08%'
		}, {
			field : 'goodsNm',
			title : '商品名称',
			width : '8.08%'
		}, {
			field : 'producer',
			title : '生产厂家',
			width : '8.08%'
		}, {
			field : 'unit',
			title : '计价单位',
			width : '8.08%'
		}, {
			field : 'ccy',
			title : '计价币别',
			width : '8.08%'
		}, {
			field : 'poNum',
			title : '采购总数量',
			width : '8.08%'
		}, {
			field : 'poPrice',
			title : '单价',
			width : '8.08%',
			formatter : ccyFormater
		}, {
			field : 'ttlAmt',
			title : '总价值',
			width : '8.08%',
			formatter : ccyFormater
		}, {
			field : 'poDueDt',
			title : '发货到期日',
			width : '8.08%',
			formatter : dateFormater
		}, {
			field : 'poNumUseable',
			title : '未发货数量',
			width : '8.08%'
		}, {
			field : 'poAmtUseable',
			title : '未发货价值',
			width : '8.08%',
			formatter : dateFormater
		} ] ]
	};
	$('#CollateralTable').datagrid(options);
}

// 计算订单总金额
function getPoAmt() {
	var griddata = SCFUtils.getGridData('CollateralTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	var length = griddata._total_rows;
	if (SCFUtils.FUNCTYPE == 'FP') {
		datas = $('#CollateralTable').datagrid("getChecked");
		length = datas.length;
	}
	if (length == 0) {
		$('#poAmt').numberspinner('setValue', 0);
		$('#poNum').numberspinner('setValue', 0);
	} else {
		var poAmt = 0;
		var poNum = 0;
		$.each(datas, function(i, n) {
			poAmt = SCFUtils.Math(poAmt, n.ttlAmt, 'add');
			poNum = SCFUtils.Math(poNum, n.poNum, 'add');
		});
		$('#poAmt').numberspinner('setValue', poAmt);
		$('#poNum').numberspinner('setValue', poNum);
	}
}

function getCollatId() {
	var invNoList = [];
	var griddata = SCFUtils.getGridData('CollateralTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (datas.length > 0) {
		$.each(datas, function(i, m) {
			invNoList.push(m.goodsId);
		});
	}

	return invNoList;
}

function contains(a, obj) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}

// 新增一条数据
function addRow() {
	var row = {};
	row.cntrctNo = $('#cntrctNo').val();
	row.refNo = $('#sysRefNo').val();
	// row.collatCcy =$('#ccy').combobox('getValue');
	row.op = 'add';
	var options = {
		title : '添加订单详细信息',
		height : '600',
		reqid : 'I_P_000222',
		data : {
			'row' : row
		},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);

}

function addSuccess(data) {

	var invNoList = getCollatId();
	if (contains(invNoList, data.goodsId)) {
		SCFUtils.error('商品编号为：' + data.goodsId + '的商品在表格中已存在!');
		return;
	}

	$('#CollateralTable').datagrid('appendRow', data);
	if (SCFUtils.FUNCTYPE == 'FP') {
		$('#CollateralTable').datagrid('selectRow',
				$('#CollateralTable').datagrid('getRows').length - 1);
	} else {
		// 计算订单总金额
		getPoAmt();
	}
	$('#sysRefNo').focus();
}

// 修改一条数据
function editRow() {
	var row = $('#CollateralTable').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		var options = {
			title : '修改订单详细信息',
			reqid : 'I_P_000222',
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

function editSuccess(data) {
	var row = $('#CollateralTable').datagrid('getSelected');
	var rowIndex = $('#CollateralTable').datagrid('getRowIndex', row);
	$('#CollateralTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	getPoAmt();
	$('#sysRefNo').focus();
}

// 删除一条数据
function deleteRow() {
	var rows = $('#CollateralTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#CollateralTable').datagrid(
							'getAllRowIndex', copyRows[i].sysRefNo);
					$('#CollateralTable').datagrid('deleteRow', index);
				}
				getPoAmt();

				SCFUtils.refreshAllRows("CollateralTable");// 删除后刷新行记录
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}

}
/**
 * 导入
 */
function upload() {
	var invNoList = [];
	var data = SCFUtils.convertArray("POForm");
	// var invNoList = getCollatId();
	if (data) {
		var param = {
			data : $.extend({
				"templateId" : "T0000014",
				'invNoList' : invNoList
			}, data),
			callBackFun : function(data) {
				var poNum = 0;
				var poAmt = 0;
				$.each(data.rows, function(i, n) {
					$.extend(n, {
						refNo : $('#sysRefNo').val(),
						cntrctNo : $('#cntrctNo').val(),
						ccy : n.ccy
					});
					poNum = SCFUtils.Math(poNum, n.poNum, 'add');
					poAmt = SCFUtils.Math(poAmt, n.ttlAmt, 'add');
				});
				$("#poNum").numberbox('setValue', poNum);// 订单数量
				$('#poAmt').numberbox('setValue', poAmt);// 订单金额
				SCFUtils.loadGridData('CollateralTable', data.rows);
				// getPoAmt();
			}
		};
		SCFUtils.upload(param);
	}
}
function pageOnInt() {
	ajaxBox();
	ajaxaCollatTable();
	ajaxPartytable();
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('cntrctForm', data);
	SCFUtils.loadGridData('partyTable', SCFUtils.parseGridData(data.obj.party),
			false);
	SCFUtils.loadGridData('collatTable', SCFUtils.parseGridData(data.obj.collateList),
			false);
}

function pageOnLoad(data) {
	//原流水号规则Cnt0001
	var options = {};
	options.data = {
		refName : 'CangCntrctRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	$('#sysRefNo').val(SCFUtils.setRefNo($("#sysRefNo").val(),3));
	$("#cntrctNo").val($("#sysRefNo").val());
	SCFUtils.loadForm('cntrctForm', data);
	queryReSbr(false, 'M');
	queryCntrctPat();
	if (data.obj.busiTp == '10') {
		$('#pldPerc').numberspinner('setValue', data.obj.pldPerc);
		queryCollatRegMS(data.obj.cntrctNo);
	}
}

//选择卖方客户
function selLookUpWindow() {
	var selId = $("#selId").val();
	var selNm = $("#selNm").val();
	var custInstCd = $("#sellerInstCd").val();

	var options = {
		title : '授信客户查询',
		reqid : 'I_P_000020',
		data : {
			'sysRefNo' : selId,
			'selNm' : selNm,
			'custInstCd':custInstCd
		},
		onSuccess : selSuccess
	};
	SCFUtils.getData(options);
}
function selSuccess(data) {
	$('#sellerInstCd').val(data.custInstCd);
	$('#selNm').val(data.custNm);
	$('#selId').val(data.sysRefNo);
	$('#cmsCustNo').val(data.cmsCustNo);
	// changeCmsCustNo(data.cmsCustNo);
	/*
	 * 查询按钮前的必输项，以及查询之后带出来的一个字段
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160801 by JinJH
	 */
	if($('#selId').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#selId').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#selId').removeClass('validatebox-invalid');
	}
	if($("#sellerInstCd").val()!=null){
		$("#sellerInstCd").parent('td').removeClass();
		$('#sellerInstCd').removeClass('validatebox-invalid');
	}
	$('#cntrctNo').focus();
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('cntrctForm', data);
	SCFUtils.loadGridData('partyTable', SCFUtils.parseGridData(data.obj.party),true);// 加载数据并保护表格
	SCFUtils.loadGridData('collatTable', SCFUtils.parseGridData(data.obj.collateList),true);// 加载数据并保护表格
}

function pageOnReleasePreLoad(data) {
	pageOnPreLoad(data);
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePageLoad(data) {
	ajaxbrNm(data);
	SCFUtils.loadForm('cntrctForm', data);
//	queryReSbr(true, 'P');
//	queryCollatCang(data.obj.cntrctNo);
	queryCollatCang(data.obj.cntrctNo);
	queryCntrctPat();// 查询关联监管方信息
//	queryCollatRegMCang(data.obj.cntrctNo);
}

function queryCollatCang(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000666',
			cntrctNo : cntrctNo,
			busiTp  : '10'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if(SCFUtils.FUNCTYPE == 'FP'){
					SCFUtils.loadGridData('collatTable', data.rows, false, true);
				}else{
					SCFUtils.loadGridData('collatTable', data.rows, true, true);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

// 查询现货动态下的质押货物
function queryCollatRegM(cntrctNo) {
	var queryId = 'Q_P_000441';
	if (SCFUtils.OPTSTATUS == 'EDIT' || SCFUtils.OPTSTATUS == 'VIEW'
			|| SCFUtils.OPTSTATUS == 'DELETE')
		queryId = 'Q_P_000563';
	if (SCFUtils.FUNCTYPE == 'RE' || SCFUtils.FUNCTYPE == 'FP'
			|| SCFUtils.FUNCTYPE == 'DP')
		queryId = 'Q_P_000441';
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : queryId,
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('collatTable', data.rows, true, true);
			}
		}
	};
	SCFUtils.ajax(options);
}

//查询现货静态下的质押货物
function queryCollatRegMS(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000527',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('collatTable', data.rows, true, true);
			}
		}
	};
	SCFUtils.ajax(options);
}

// 查询现货静态下的质押货物
function queryCollatRegMStatic(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000538',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('collatTable', data.rows, true, true);
			}
		}
	};
	SCFUtils.ajax(options);
}

//查询现货静态下的质押货物
function queryCollatRegMCang(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000662',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if(SCFUtils.FUNCTYPE == 'FP'){
					SCFUtils.loadGridData('collatTable', data.rows, false, true);
				}else{
					SCFUtils.loadGridData('collatTable', data.rows, true, true);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

// 查询复核时_现货静态下的质押货物
function queryCollatRegMStaticRe(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000621',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('collatTable', data.rows, true, true);
			}
		}
	};
	SCFUtils.ajax(options);
}
function queryCntrctPat() {
	var cntrctNo = $('#cntrctNo').val();
	var queryId = 'Q_P_000439';
	if (SCFUtils.OPTSTATUS == 'EDIT' || SCFUtils.OPTSTATUS == 'VIEW'
			|| SCFUtils.OPTSTATUS == 'DELETE')
		queryId = 'Q_P_000565';
	if (SCFUtils.FUNCTYPE == 'RE' || SCFUtils.FUNCTYPE == 'FP'
			|| SCFUtils.FUNCTYPE == 'DP')
		queryId = 'Q_P_000439';
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : queryId,
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				if(SCFUtils.FUNCTYPE == 'FP'){
					SCFUtils.loadGridData('partyTable', data.rows, false, true);
				}else{
					SCFUtils.loadGridData('partyTable', data.rows, true, true);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function pageOnFPLoad(data) {
	SCFUtils.loadForm('cntrctForm', data);
	SCFUtils.setComboReadonly("busiTp", true);
//	queryReSbr(false, 'P');
	ajaxbrNm(data);
//	queryCollaFP(data.obj.cntrctNo);
	queryCntrctPat();// 查询关联监管方信息
//	queryCollatRegMCang(data.obj.cntrctNo);
	queryCollatCang(data.obj.cntrctNo);
}

function getDueDt() {
	var loanDueDt = $('#lmtDueDt').datebox("getValue");
	var trxDt = $('#trxDt').val();
	if (SCFUtils.DateDiff(loanDueDt, trxDt) <= 0) {
		SCFUtils.alert("到期日不能小于等于当前日期,请修改");
		return false;
	}
}

/*
 * 复核时候查询LMT的E表
 */
function relQueryLmtE() {
	var selId = $("#selId").val();
	var cntrctNo = $('#cntrctNo').val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000661',
			selId : selId,
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

/*
 * 复核时候查询LMT的E表
 */
function relQueryLmtERe() {
	var selId = $("#selId").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000635',
			selId : selId
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

// 额度表数据打包
function getLmtData() {
	var lmt = {};// 添加额度信息
	// lmt._total_rows = 1;
	// 生成lmt的流水号，lmtSysRefNo
	var options = {};
	var costPayFlg;
	var trxDt;
	var obj = {};

	if ('PM' === SCFUtils.FUNCTYPE) {
		options.data = {
			refName : 'LmtRef',
			refField : 'lmtSysRefNo',
			cacheType : 'non'
		};
		SCFUtils.getRefNo(options);
		// trxDt = SCFUtils.getcurrentdate();
		obj.sysRefNo = $('#lmtSysRefNo').val();
	} else {
		obj.sysRefNo = relQueryLmtE()[0].sysRefNo;
	}
	
	lmt._total_rows = 1;
	// obj.trxDt = trxDt;//交易日期
	obj.selId = $("#selId").val();// 买方客户编号
	obj.selNm = $("#selNm").val();// 买方客户编号
	obj.theirRef = $("#sysRefNo").val();// 关联编号
	obj.cntrctNo = $('#sysRefNo').val();// 协议编号
	obj.lmtAmt = $('#lmtAmt').numberbox('getValue');// 额度金额
	obj.lmtCcy = $('#lmtCcy').combobox('getValue');// 额度币种
	obj.lmtBal = $('#lmtBal').numberbox('getValue');// 额度余额
	obj.lmtAllocate = $('#lmtAllocate').numberbox('getValue');// 占用额度
	obj.lmtSts = 0;// 额度状态：0.可用 1.冻结
	obj.lmtTp = 1;// 额度类型：0.买方额度1.卖方额度
	obj.lmtValidDt = $("#lmtValidDt").datebox('getValue');
	obj.lmtDueDt = $("#lmtDueDt").datebox('getValue');
	obj.busiTp = $("#busiTp").combobox('getValue');// 业务类别

	lmt['rows0'] = obj;

	return lmt;
}

function onNextBtnClick() {
	$('#sysRefNoHD').val($('#sysRefNo').val());
	var mainData = SCFUtils.convertArray('cntrctForm');
	if ('RE' != SCFUtils.FUNCTYPE && SCFUtils.OPTSTATUS == 'ADD') {
		/*
		 * if(!checkCustIsinCntrct()){
		 * SCFUtils.alert("同一授信客户对应于同一业务类别只能新建一笔协议。"); return ; }
		 */
	}
	// 判断生效日是否在到期日之前
	if (SCFUtils.OPTSTATUS == 'EDIT' || SCFUtils.OPTSTATUS == 'ADD') {
		if (!checkValidDueDate()) {
			SCFUtils.alert("到期日在生效日期之前，请检查！");
			return;
		}
	}
	var data = $('#partyTable').datagrid('getData');
	if (data.total == 0) {
		SCFUtils.alert('请添加监管方信息！');
		return;
	}
	var grid = {};
	// 货物信息
	var collatList = SCFUtils.getGridData('collatTable');
	var partygriddata = SCFUtils.getGridData('partyTable');
	grid.party = SCFUtils.json2str(partygriddata);
	grid.collateList = SCFUtils.json2str(collatList);
	$.extend(mainData, grid);
	return mainData;
}

function onDelBtnClick() {
	return SCFUtils.convertArray('factorForm');
}

function onDelBtnClick() {
	return SCFUtils.convertArray('factorForm');
}

function ajaxBox() {
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setTextReadonly('selId', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('bchNm', true);
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setNumberboxReadonly('lmtBal', true);
	SCFUtils.setNumberboxReadonly('lmtAllocate', true);
	SCFUtils.setTextReadonly('patnerId', true);
	SCFUtils.setTextReadonly('patnerNm', true);
	SCFUtils.setComboReadonly('busiTp', true);
	SCFUtils.setDateboxReadonly('trxDt', true);
	SCFUtils.setComboReadonly('payChgTp', true);
	SCFUtils.setComboReadonly('intColTp', true);
	if (SCFUtils.OPTSTATUS == 'EDIT') {
		SCFUtils.setTextReadonly('lmtAmt', true);
		SCFUtils.setComboTreeReadonly('lmtCcy', true);
	}
	var busiTp = [{
		"id" : '10',
		"text" : "仓单质押",
		selected : true
	}];
	$("#busiTp").combobox('loadData', busiTp);
	
	//费用收取方式
	var payChgTp = [{
		"id" : '0',
		"text" : "先收",
		selected : true
	},{
		"id" : '1',
		"text" : "后收"
	}];
	$("#payChgTp").combobox('loadData', payChgTp);
	
	//费用收取方式
	var intColTp = [{
		"id" : '0',
		"text" : "先收",
		selected : true
	},{
		"id" : '1',
		"text" : "后收"
	}];
	$("#intColTp").combobox('loadData', intColTp);
	
	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006',
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#lmtCcy').combobox('loadData', data.rows);
				// 给币种设置默认值
				$('#lmtCcy').combobox('setValue', 'CNY');
				// $('#collatCcy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);
}

function changelmtAmt() {
	var lmtAmt = $('#lmtAmt').numberbox('getValue');
	if (SCFUtils.OPTSTATUS == 'ADD') {
		$('#lmtBal').numberbox('setValue', lmtAmt);
		$('#lmtAllocate').numberbox('setValue', 0);
		$('#lmtRecover').val(0);
	} else if (SCFUtils.OPTSTATUS == 'EDIT') {
		var lmtBalHD = $('#lmtBalHD').val();
		var lmtAmtHD = $('#lmtAmtHD').val();
		var lmtAllocateHD = $('#lmtAllocateHD').val();
		var subAmt = SCFUtils.Math(lmtAmt, lmtAmtHD, 'sub');
		var sumAmt = SCFUtils.Math(lmtBalHD, subAmt, 'add');
		$('#lmtBal').numberbox('setValue', sumAmt);
	}
}

// 选择买方客户
function buyerLookUpWindow() {
	var buyerId = $("#buyerId").val();
	var buyerNm = $("#buyerNm").val();
	var custInstCd = $("#sellerInstCd").val();

	var options = {
		title : '买方客户查询',
		reqid : 'I_P_000208',
		data : {
			'sysRefNo' : buyerId,
			'selNm' : buyerNm,
			'custInstCd' : custInstCd
		},
		onSuccess : buyerSuccess
	};
	SCFUtils.getData(options);
}
function buyerSuccess(data) {
	$('#sellerInstCd').val(data.custInstCd);
	$('#buyerNm').val(data.custNm);
	$('#buyerId').val(data.sysRefNo);
	$('#cmsCustNo').val(data.cmsCustNo);
	// changeCmsCustNo(data.cmsCustNo);
	/*
	 * 查询按钮前的必输项，以及查询之后带出来的一个字段
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法 new on 20160801 by
	 * JinJH
	 */
	if ($('#buyerId').val() != null) {// $('#cntrctNo')为查询左边的div的id
		$('#buyerId').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#buyerId').removeClass('validatebox-invalid');
	}
	if ($("#sellerInstCd").val() != null) {
		$("#sellerInstCd").parent('td').removeClass();
		$('#sellerInstCd').removeClass('validatebox-invalid');
	}
	$('#cntrctNo').focus();
}

function queryColla() {
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000199',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#collatCorpNm').val(data.rows[0].collatCorpNm);
				$('#collatNm').val(data.rows[0].collatNm);
				$('#collatTp').combobox('setValue', data.rows[0].collatTp);
				$('#collatCcy').combobox('setValue', data.rows[0].collatCcy);
				if (!SCFUtils.isEmpty(data.rows[0].collatCorpNm)) {
					$('#collatVal').numberbox('setValue',
							data.rows[0].collatVal);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryReSbr(flag, status) {
	var trxId = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000103',
			trxId : trxId,
			status : status
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('sbrTable', data.rows, flag, true);
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryFile(trxId, flag, status) {
	if (!SCFUtils.isEmpty(trxId)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000198',
				trxId : trxId,
				status : status
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					SCFUtils.loadGridData('accessoryTable', data.rows, flag,
							true);
				}
			}
		};
		SCFUtils.ajax(options);
	}
}

function checkCustIsinCntrct() {
	var selId = $('#selId').val();
	var busiTp = $('#busiTp').combobox('getValue');
	var res = false;
	if (!SCFUtils.isEmpty(selId) && !SCFUtils.isEmpty(busiTp)) {
		var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000123',
				selId : selId,
				busiTp : busiTp
			},
			callBackFun : function(data) {
				/*
				 * if(data.success&&!SCFUtils.isEmpty(data.rows)){ res = false;
				 * }else{ res = true; }
				 */
			}
		};
		SCFUtils.ajax(options);
	} else {
		res = true;
	}
	return res;
}

function ajaxaccessoryTable() {
	var options = {
		// url : SCFUtils.AJAXURL,
		toolbar : '#toolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '流水号',
			width : 150
		}, {
			field : 'uploadDesc',
			title : '文件名',
			width : 150
		}, {
			field : 'templateUrl',
			title : '文件路径',
			width : 520
		}, {
			field : 'trxId',
			title : '担保号',
			width : 100
		} ] ]
	};
	$('#accessoryTable').datagrid(options);
}

//额度关联货物表
function ajaxaCollatTable() {
	var options = {
		// url : SCFUtils.AJAXURL,
		toolbar : '#collatToolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '流水号',
			hidden : true
		},{
			field : 'goodsId',
			title : '商品编号',
			width : '16.6%',
			hidden : true
		},{
			field : 'goodsCata',
			title : '商品大类',
			width : '16.6%',
			hidden : true
		}, {
			field : 'subCata',
			title : '商品子类',
			width : '16.6%',
			hidden : true
		},{
			field : 'goodsNm',
			title : '商品名称',
			width : '16.6%'
		},{
			field : 'unit',
			title : '计价单位',
			width : '16.6%'
		},{
			field : 'ccy',
			title : '计价币别',
			width : '16.6%'
		},{
			field : 'price',
			title : '最新价格',
			formatter : ccyFormater,
			width : '16.6%'
		},{
			field : 'collatAdjDt',
			title : '计价日期',
			formatter : dateFormater,
			width : '16.6%'
		},{
			field : 'cntrctNo',
			title : '协议编号',
			width : '16.6%',
			hidden : true
		},{
			field : 'producer',
			title : '生产厂家',
			width : '16.6%',
			hidden : false
		},{
			field : 'note',
			title : '备注',
			width : '16.6%'
		} ] ]
	};
	$('#collatTable').datagrid(options);
}

function queryCollat() {
	var options = {
		title : '货物信息',
		reqid : 'I_P_000183',
		onSuccess : getCollatSuccess
	};
	SCFUtils.getData(options);
}

function getCollatSuccess(data) {
	var rowsData = SCFUtils.getGridData('collatTable', false);
	var flag = true;
	$.each(rowsData, function(i, n) {
		if (i != '_total_rows') {
			if (n.goodsId == data.goodsId) {
				SCFUtils.alert("该商品已经添加！");
				flag = false;
				return false;
			}
		}
	});
	if (flag) {
		var sysRefNo = $('#sysRefNo').val();
		var goodsId = data.sysRefNo;
		data.sysRefNo = sysRefNo + goodsId;
		data.goodsId = goodsId;
		data.cntrctNo = $('#cntrctNo').val();
		data.busiTp = $('#busiTp').combobox('getValue');
		$('#collatTable').datagrid('appendRow', data);
	}
	$('#cntrctNo').focus();
}

function ajaxPartytable() {
	var options = {
		toolbar : '#partyToolbar',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '流水号',
			hidden : true
		}, {
			field : 'patnerId',
			title : '监管方编号',
			width : '12.5%'
		}, {
			field : 'patnerNm',
			title : '监管方名称',
			width : '12.5%'
		},  {
			field : 'patnerAdr',
			title : '仓库地址',
			width : '12.5%'
		}, {
			field : 'patnerCity',
			title : '城市',
			width : '12.5%'
		}, {
			field : 'patnerTel',
			title : '电话',
			width : '12.5%'
		}, {
			field : 'patnerFax',
			title : '传真',
			width : '12.5%'
		}, {
			field : 'patnerEmail',
			title : '电子邮箱',
			width : '12.5%'
		}, {
			field : 'remark',
			title : '备注',
			width : '12.5%'
		},{
			field : 'cntrctNo',
			title : '协议编号',
			hidden : true
		} ] ]
	};
	$('#partyTable').datagrid(options);
}

// 查询仓储信息(动产质押的时候用，值添加到关联监管方表)
function showPatnerToPat() {
	var options = {
		title : '查询仓储信息',
		reqid : 'I_P_000124',
		onSuccess : getPatnerPatSuccess
	};
	SCFUtils.getData(options);
}

function getPatnerPatSuccess(data) {
	var rowsData = SCFUtils.getGridData('partyTable', false);
	var flag = true;
	$.each(rowsData, function(i, n) {
		if (i != '_total_rows') {
			if (n.patnerId == data.sysRefId) {
				SCFUtils.alert("该仓储方已经添加！");
				flag = false;
				return false;
			}
		}
	});
	if (flag) {
		var sysRefNo = $('#sysRefNo').val();
		var partnerId = data.sysRefId;
		data.sysRefNo = sysRefNo + partnerId;
		data.patnerNm = data.patnerName;
		data.patnerId = partnerId;
		data.cntrctNo = sysRefNo;
		data.remark = data.note;
		$('#partyTable').datagrid('appendRow', data);
	}
	$('#cntrctNo').focus();
}

// 删除一条数据
function deleteCollat() {
	var rows = $('#collatTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#collatTable').datagrid('getAllRowIndex',
							copyRows[i].sysRefNo);
					$('#collatTable').datagrid('deleteRow', index);
				}
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteParty() {
	var rows = $('#partyTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#partyTable').datagrid('getAllRowIndex',
							copyRows[i].sysRefNo);
					$('#partyTable').datagrid('deleteRow', index);
				}
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteCollaRow() {
	var rows = $('#accessoryTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		SCFUtils.confirm('确定删除选中的数据吗？', function() {
			for (var i = 0; i < copyRows.length; i++) {
				var index = $('#accessoryTable').datagrid('getAllRowIndex',
						copyRows[i].sysRefNo);
				$('#accessoryTable').datagrid('deleteRow', index);
			}
		});
		/*
		 * $.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) { if (r) {
		 * for(var i =0;i<copyRows.length;i++){ var index =
		 * $('#accessoryTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
		 * $('#accessoryTable').datagrid('deleteRow',index); } } });
		 */
	} else {
		SCFUtils.alert("请选择一条数据！");
	}

}

// 新增一条数据
function addSbrRow() {
	var row = {};
	var busiTp = $('#busiTp').combobox('getValue');
	var isSendSelLmt = $('#isSendSelLmt').combobox('getValue');
	if (SCFUtils.isEmpty(busiTp)) {
		SCFUtils.alert("请选择业务类型！");
		return;
	}
	var data = SCFUtils.convertArray('cntrctForm');
	if (!data) {
		return;
	}
	var rowsData = SCFUtils.getGridData('sbrTable', false);
	var datas = SCFUtils.parseGridData(rowsData, false);
	var buyerLmtAmt = 0;
	$.each(datas, function(i, n) {
		buyerLmtAmt = SCFUtils.Math(buyerLmtAmt, n.buyerLmtAmt, 'add');

	});

	row.trxId = $('#sysRefNo').val();
	row.sellerInstCd = $('#sellerInstCd').val();
	row.buyerId = $('#buyerId').val();
	row.buyerNm = $('#buyerNm').val();
	row.lmtAmt = SCFUtils.Math($('#lmtAmt').numberbox('getValue'), buyerLmtAmt, 'sub');
	row.lmtBal = $('#lmtBal').numberbox('getValue');
	row.busiTp = busiTp;
	row.isSendSelLmt = isSendSelLmt;
	row.op = 'add';
	var options = {
		title : '新增关联关系信息',
		reqid : 'I_P_000212',
		height : '370',
		data : {
			'row' : row
		},
		onSuccess : addSbrSuccess
	};
	SCFUtils.getData(options);
}
// 修改一条数据
function editSbrRow() {
	var isSendSelLmt = $('#isSendSelLmt').combobox('getValue');
	var rowsData = SCFUtils.getGridData('sbrTable', false);
	var datas = SCFUtils.parseGridData(rowsData, false);
	var buyerLmtAmt = 0;
	$.each(datas, function(i, n) {
		buyerLmtAmt = SCFUtils.Math(buyerLmtAmt, n.buyerLmtAmt, 'add');

	});
	
	var row = $('#sbrTable').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		row.trxId = $('#sysRefNo').val();
		row.sellerInstCd = $('#sellerInstCd').val();
		row.lmtAmt = SCFUtils.Math($('#lmtAmt').numberbox('getValue'), buyerLmtAmt, 'sub');
		row.selNm = $('#selNm').val();
		row.busiTp = $('#busiTp').combobox('getValue');
		row.isSendSelLmt = isSendSelLmt;
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title : '修改关联关系信息',
			reqid : 'I_P_000212',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : editSbrSuccess
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteSbrRow() {
	var rows = $('#sbrTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#sbrTable').datagrid('getAllRowIndex',
							copyRows[i].sysRefNo);
					$('#sbrTable').datagrid('deleteRow', index);
				}
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function addSbrSuccess(data) {
	// 限定关联关系只能选择一次
	var arr = getSbrBuyerId();
	if (contains(arr, data.selId)) {
		SCFUtils.alert('关联关系已存在!');
		return;
	}
	$('#sbrTable').datagrid('appendRow', data);
	$('#cntrctNo').focus();
}

function editSbrSuccess(data) {
	var row = $('#sbrTable').datagrid('getSelected');
	var rowIndex = $('#sbrTable').datagrid('getRowIndex', row);
	// 限定关联关系修改时不能修改为已经存在的关系
	var arr = getSbrBuyerId();
	if (contains(arr, data.buyerId, rowIndex)) {
		SCFUtils.alert('关联关系已存在!');
		return;
	}
	$('#sbrTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	$('#cntrctNo').focus();
}

/**
 * 导入
 */
function upload() {
	var fileList = $('#accessoryTable').datagrid('getRows');
	var param = {
		data : {
			'reqType' : 'fileImportManager',
			'fileList' : fileList
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data)) {
				$('#accessoryTable').datagrid('appendRow', {
					sysRefNo : SCFUtils.uuid('10'),
					uploadDesc : data.obj.fileName,
					templateUrl : data.obj.filePath,
					trxId : $('#sysRefNo').val()
				// 担保的流水号
				});
			}
		},
		validate : function(data, fileName) {
			var index = fileName.lastIndexOf("\\");
			var fileNm = fileName.substring(index + 1);
			var flag = true;
			if (!SCFUtils.isEmpty(data.fileList) && data.fileList.length > 0) {
				$.each(data.fileList, function(i, n) {
					if (n.uploadDesc == fileNm) {
						flag = false;
						return;
					}
				});
				if (!flag) {
					return "附件名为 " + fileNm + " 的附件已经存在，请勿重复上传。";
				}

			}
		}
	};
	SCFUtils.upload(param);
}

// 限定生效日期在到期日之前
function checkValidDueDate() {
	var lmtDueDt = $("#lmtDueDt").datebox('getValue');
	var lmtValidDt = $("#lmtValidDt").datebox('getValue');
	var judge = true;
	// 计算到期日与生效日的差值
	var cha = SCFUtils.DateDiff(lmtDueDt, lmtValidDt);
	if (cha <= 0) {
		judge = false;
	}
	return judge;
}

// 获取已经选择过的BuyerId
function getSbrBuyerId() {
	var array = [];
	var gridData = SCFUtils.getGridData('sbrTable', false);
	var datas = SCFUtils.parseGridData(gridData, false);
	if (datas.length > 0) {
		$.each(datas, function(i, m) {
			array[i] = m.selId;
		});
	}
	return array;
}

// 判断是否包含
function contains(arrays, obj, rowIndex) {
	for (var i = 0; i < arrays.length; i++) {
		if (arrays[i] == obj && rowIndex != i) {
			return true;
		}
	}
	return false;
}

function RegVerBox() {
	var result = false;
	var cntrctNo = $('#cmsCntrctNo').val();
	if (cntrctNo == null || cntrctNo == "") {
		SCFUtils.error("请输入信贷额度编号");
		return result;
	}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000349',
			cmsCntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length != 0) {
					SCFUtils.error("该信贷额度编号已被注册");
					$("#cmsCntrctNo").val("");
					return;
				} else {
					result = true;
					return result;
				}
			}
		}

	};
	SCFUtils.ajax(options);
	return result;
}

function changeCmsCustNo(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000434',
			cmsCustNo : data,
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length != 0) {
					SCFUtils.alert('信贷客户编号不唯一！');
					$('#cmsCustNo').val("");
				}
			}
		}

	};
	SCFUtils.ajax(options);
}
// 复核时设置网点 信贷客户号
function ajaxbrNm(data) {
	// 添加网点信息，部门信息
	if (!SCFUtils.isEmpty(data.obj.custBrId)) {
		var options1 = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000323',
				ownerBrId : data.obj.custBrId
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows[0])) {
					$('#bchNm').val(data.rows[0].brNm);
				}
			}
		};
		SCFUtils.ajax(options1);
	}

	// 客户经理
	if (!SCFUtils.isEmpty(data.obj.selId)) {
		var options2 = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000100',
				sysRefNo : data.obj.selId
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows[0])) {
					$('#cmsCustNo').val(data.rows[0].cmsCustNo);
				}
			}
		};
		SCFUtils.ajax(options2);
	}
}

function changeBusiTp() {
	var custTp = $('#busiTp').combobox('getValue');
};

// 买方查询
function showBuyerLookUpWindow() {
	var buyerId = $("#buyerId").val();
	var options = {
		title : '间接客户查询',
		reqid : 'I_P_000021',
		data : {
			'sysRefNo' : buyerId
		},
		onSuccess : getBuyerSuccess
	};
	SCFUtils.getData(options);
}

function getBuyerSuccess(data) {
	$('#buyerId').val(data.sysRefNo);
	$('#buyerNm').val(data.custNm);
	$('#cntrctNo').focus();
}
// 查询监管方信息(三方的时候用，值添加到主表)
function showPatner() {
	var options = {
		title : '查询监管方信息',
		reqid : 'I_P_000119',
		onSuccess : getPatnerSuccess
	};
	SCFUtils.getData(options);
}
function getPatnerSuccess(data) {
	$('#patnerId').val(data.sysRefNo);
	$('#patnerNm').val(data.patnerNm);
	$('#cntrctNo').focus();
}
// 授信网点
function showLookUpWindow() {
	var options = {
		title : '网点信息查询',
		reqid : 'I_P_000106',
		onSuccess : netAddressSuccess
	};
	SCFUtils.getData(options);
}

function netAddressSuccess(data) {
	$('#bchNm').val(data.brNm);
	$('#custBrId').val(data.sysRefNo);
	/*
	 * 查询按钮的必输项设置 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法 new on
	 * 20160801 by JinJH
	 */
	if ($('#bchNm').val() != null) {// $('#cntrctNo')为查询左边的div的id
		$('#bchNm').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#bchNm').removeClass('validatebox-invalid');
	}
	$('#cntrctNo').focus();
}

// 同步信贷额度 可能存在多条额度信息 弹出列表信息供选择
function selLookUpWindowCredit() {
	var cmsCustNo = $("#cmsCustNo").val();
	if (SCFUtils.isEmpty(cmsCustNo)) {
		SCFUtils.alert("请选择授信客户");
		return;
	}
	var sysRefNo = $('#sysRefNo').val();
	/*
	 * var options = { title:'信贷额度查询', reqid:'I_P_000108',
	 * data:{'cmsCustNo':cmsCustNo}, onSuccess:getCreditSuccess };
	 * SCFUtils.getData(options);
	 */

	var data = {};
	var options = {
		url : SCFUtils.AJAXURL,
		async : false,
		data : $.extend({
			getdataId : 'I_P_00007805',
			byFunc : 'N',
			cacheType : 'non',
			sysRefNo : sysRefNo,
			cmsCustNo : cmsCustNo,
			date : SCFUtils.getcurrentdate(),
		}, data),
		callBackFun : function(backData) {
			if (backData.obj.trxDom.coreReturnCode == '0000') {
				addCustInfo(backData);
			} else {
				SCFUtils.alert('接口查询失败！');
			}
		}
	};
	SCFUtils.ajax(options);
}

function addCustInfo(data) {
	$('#selNm').val(data.obj.trxDom.ZCHNM);
	$('#cmsCntrctNo').val(data.obj.trxDom.item_id);
	$('#sellerInstCd').val(data.obj.trxDom.com_ins_code);
	$('#custBrId').val(data.obj.trxDom.main_br_id);
	if (!SCFUtils.isEmpty(data.obj.trxDom.main_br_id)) {
		getCustBrNm(data.obj.trxDom.main_br_id);
	}
	$('#lmtAmt').numberbox('setValue', data.obj.trxDom.crd_lmt);
	$('#lmtBal').numberbox('setValue', data.obj.trxDom.residual_lmt);
	$('#lmtAllocate').numberbox('setValue', data.obj.trxDom.outstnd_lmt);
	$('#lmtValidDt').datebox('setValue', data.obj.trxDom.start_date);
	$('#lmtDueDt').datebox('setValue', data.obj.trxDom.expi_date);
	$('#initGartPct').numberspinner('setValue', data.obj.trxDom.margin_ratio);
	$('#lmtCcy').combobox('setValue', data.obj.trxDom.cur_type);
}

function getCustBrNm(data) {
	var options2 = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000417',
			sysRefNo : data
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows[0])) {
				$('#bchNm').val(data.rows[0].brNm);
			}
		}
	};
	SCFUtils.ajax(options2);
}

function showCollatWindow() {
	var options = {
		title : '保险公司信息查询',
		reqid : 'I_P_000160',
		onSuccess : insureSuccess
	};
	SCFUtils.getData(options);
}

function insureSuccess(data) {
	$('#collatCompNm').val(data.custNm);
	$('#insureNo').val(data.sysRefNo);
	$('#insureAmt').val(data.lmtBal); // 保险公司可用额度
	$('#cntrctNo').focus();
}

function changeCollatAmt() {
	if (SCFUtils.FUNCTYPE == "PM") {
		var collatAmt = $('#collatAmt').numberspinner('getValue');
		var collatCompNm = $('#collatCompNm').val();
		var isPossInsure = $('#isPossInsure').combobox('getValue');
		if (isPossInsure == "Y") { // 验证保险金额
			if (SCFUtils.isEmpty(collatCompNm)) {
				SCFUtils.alert("请先选中保险公司名称！");
				return;
			} else {
				var insureNo = $('#insureNo').val();
				var insureAmt = $('#insureAmt').val();
				var cntrctNo = $('#cntrctNo').val();
				var options = {
					url : SCFUtils.AJAXURL,
					data : {
						queryId : 'Q_P_000424', // 查询保单信息
						insureNo : insureNo
					},
					callBackFun : function(data) {
						if (data.success && !SCFUtils.isEmpty(data.rows)) {
							$
									.each(
											data.rows,
											function(i, obj) {
												if ((SCFUtils.OPTSTATUS == 'EDIT' || SCFUtils.OPTSTATUS == 'DELETE')
														&& obj.cntrctNo == cntrctNo) {// 修改与删除本身记录的保单金额要除外
													collatAmt = collatAmt;
												} else {
													collatAmt = SCFUtils.Math(
															collatAmt,
															obj.collatAmt,
															'add');
												}
											});
						}
					}
				};
				SCFUtils.ajax(options);
			}
			if (SCFUtils.Math(insureAmt, collatAmt, 'sub') < 0) {
				SCFUtils.alert('担保金额超过保险公司金额！', function() {
					$('#collatAmt').numberspinner('setValue', '');
				});
			}
		}
	}
}

// 查询保单信息
function queryGLColla(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000424',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				queryInsure(data.rows[0].insureNo);
				$('#collatCompNm').val(data.rows[0].collatCompNm);
				$('#collatNo').val(data.rows[0].collatNo);
				$('#collatAmt').numberspinner('setValue',
						data.rows[0].collatAmt);
				$('#collatVailDt').datebox('setValue',
						data.rows[0].collatVailDt);
				$('#collatDueDt').datebox('setValue', data.rows[0].collatDueDt);
				$('#collatCompensateRt').numberspinner('setValue',
						data.rows[0].collatCompensateRt);
				$('#collatMaxCompensateAmt').numberspinner('setValue',
						data.rows[0].collatMaxCompensateAmt);
			}
		}
	};
	SCFUtils.ajax(options);
}

// 查询保险公司信息
function queryInsure(insureNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000425',
			sysRefNo : insureNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#insureNo').val(data.rows[0].sysRefNo);
				$('#insureAmt').val(data.rows[0].lmtBal);
			}
		}
	};
	SCFUtils.ajax(options);
}

// 保单生效日期
function changeCollatVailDt() {
	var collatVailDt = $('#collatVailDt').datebox('getValue');
	var collatDueDt = $('#collatDueDt').datebox('getValue');
	if (SCFUtils.DateDiff(collatDueDt, collatVailDt, 'sub') < 0) {
		SCFUtils.alert("保单生效日期不能大于到期日期，请检查！");
		$('#collatVailDt').datebox('setValue', '');
	}
}

// 保单到期日期
function changeCollatDueDt() {
	var collatVailDt = $('#collatVailDt').datebox('getValue');
	var collatDueDt = $('#collatDueDt').datebox('getValue');
	if (SCFUtils.DateDiff(collatDueDt, collatVailDt, 'sub') < 0) {
		SCFUtils.alert("保单生效日期不能大于到期日期，请检查！");
		$('#collatDueDt').datebox('setValue', '');
	}
}

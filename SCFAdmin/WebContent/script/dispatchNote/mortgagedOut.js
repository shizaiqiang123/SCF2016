var checkArray = [];
var isPreOncheck = false;//是否是上一步加载时候的全选，用来控制是否触发oncheck事件。

function pageOnInt() {
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
		"id" : '3',
		"text" : "信用保险项下"
	}, {
		"id" : '4',
		"text" : "现货动态"
	}, {
		"id" : '5',
		"text" : "现货静态"
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
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("ccy", true);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setTextReadonly("initBailAcc", true);
	SCFUtils.setNumberspinnerReadonly("initBailBal", true);
	SCFUtils.setNumberspinnerReadonly("ttlPayAmt", true);
	SCFUtils.setTextReadonly('regId', true);
	SCFUtils.setTextReadonly('regNm', true);
	SCFUtils.setTextReadonly('wareId', true);
	SCFUtils.setTextReadonly('wareNm', true);
	SCFUtils.setNumberspinnerReadonly('ttlLowPayNum', true);
	SCFUtils.setNumberspinnerReadonly('ttlYPayAmt', true);

	SCFUtils.setNumberspinnerReadonly('pldPerc', true);
	SCFUtils.setNumberspinnerReadonly('lmtBal', true);
	SCFUtils.setNumberspinnerReadonly('ttlRegAmt', true);
	SCFUtils.setNumberspinnerReadonly('ttlLoanBal', true);
}

function ajaxTable() {
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
		onCheck : function(rowIndex, rowData) {
			onCheck(rowIndex, rowData);
		},
		onUncheck : function(rowIndex, rowData) {
			onUnCheck(rowIndex, rowData);
		},
		onCheckAll : function(rows) {
			onCheckAll(rows);
		},
		onUncheckAll : function(rows) {
			onUnCheckAll(rows);
		},
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'loanId',
			title : '融资编号',
			hidden : true,
			width : 80
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			hidden : true,
			width : 80
		}, {
			field : 'goodsCata',
			title : '商品大类',
			hidden : true,
			width : 80
		}, {
			field : 'subCata',
			title : '商品子类',
			hidden : true,
			width : 80
		}, {
			field : 'collatNm',
			title : '商品名称',
			width : 80
		}, {
			field : 'goodsId',
			title : '商品ID',
			width : 80
		}, {
			field : 'collatSpec',
			title : '规格型号',
			width : 100
		}, {
			field : 'prcollatFact',
			title : '生产厂家',
			width : 100
		}, {
			field : 'collatUnit',
			title : '计价单位',
			width : 70
		}, {
			field : 'ccy',
			title : '计价币别',
			width : 70
		}, {
			field : 'collatRdPrice',
			title : '质物认定价格',
			width : 80,
			formatter : ccyFormater
		}, {
			field : 'billValDt',
			title : '质物调价日期',
			width : 100,
			formatter : dateTimeFormater
		}, {
			field : 'collatQty',
			title : '质物入库数量',
			width : 80
		}, {
			field : 'collatVal',
			title : '质物最新价值',
			width : 80,
			formatter : ccyFormater
		}, {
			field : 'loanQtyBal',
			title : '已出库数量',
			hidden : true,
			width : 100
		}, {
			field : 'collatOutQty',
			title : '可出库数量',
			width : 100
		}, {
			field : 'collatOutQtyHD',//临时字段。用来记录初始的可出库数量
			title : '临时可出库数量',
			width : 100,
			hidden : false
		}, {
			field : 'outQty',
			title : '本次出库数量',
			editor : {
				type : 'numberbox'
			},
			width : 100
		}, {
			field : 'outVal',
			title : '本次出库价值',
			width : 100,
			//formatter : ccyFormaterLC
			formatter : ccyFormater
		} ] ]
	};
	$('#inOutDetailsTable').datagrid(options);
}

/*function ccyFormaterLC(value,row,index){	
	var collatVal = 0;
	if(SCFUtils.isEmpty(row.collatVal)) {
		collatVal = row.collatRdPrice;
	} else {
		collatVal = row.collatVal;
	}
	var outVal = SCFUtils.Math(collatVal,row.outQty, 'mul');
	return SCFUtils.ccyFormatNoPre(outVal,2);
}*/
var pagepreFlag = false;
function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('dispatchForm', data);
	SCFUtils.loadGridData('inOutDetailsTable', SCFUtils
			.parseGridData(data.obj.crtf), false);// 加载数据并保护表格。
	isPreOncheck=true;//在全选表单前将全局变量控制为true，不执行oncheckAll事件。
	$("#inOutDetailsTable").datagrid("selectAll");
	isPreOncheck=false;//在全选表单后将全局变量控制为false，执行oncheckAll事件。
//	queryDetails(data.obj.sysRefNo);
	pagepreFlag = true;
	isAccept = true;
	lookSysRelReason();
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('dispatchForm', data);
	//最低库存价值直接从协议带出，放货出库不在参与重新计算  YeQing modify on 2016-10-11
	$('#ttlLowPayNum').numberspinner('setValue', data.obj.regLowestVal);
	$('#cntrctNo').val(data.obj.sysRefNo);
	$('#buyerId').val(data.obj.buyerId);
	$('#buyerNm').val(data.obj.buyerNm);
	//因为主页上币种没有加载出来，由于没有赋值，所以在这里给币种赋值
	$('#ccy').combobox('setValue', data.obj.lmtCcy);
	
	queryregId(data.obj.sysRefNo);
	queryCntrctInfo(data.obj.sysRefNo);
	queryDetails(data.obj.sysRefNo);
	queryLoanInfo(data.obj.sysRefNo);
	if (SCFUtils.OPTSTATUS == 'ADD') {
		var options = {};
		options.data = {
			refName : 'InoutRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);

		$('#inoutDate').val(getDate(new Date()));
	}
	$("#ttlRegAmtCount").val(data.obj.ttlRegAmt);
	$('#ttlYPayAmtHD').val($('#ttlYPayAmt').numberspinner('getValue'));
	$('#ttlRegAmtHD').val(data.obj.ttlRegAmt);
	lookSysRelReason();
}

function queryCollat(){
	var cntrctNo = $('#cntrctNo').val();
	var datas = $('#inOutDetailsTable').datagrid('getSelections');
	$.each(datas,function(i,n){
		var index = $('#inOutDetailsTable').datagrid('getRowIndex',n);
		onUnCheck(index,n);
	});
	clearSelectedRows();
	queryCollatDetails(cntrctNo);
}

function clearSelectedRows(){
	$('#inOutDetailsTable').datagrid('clearSelections');
	$('#inOutDetailsTable').datagrid('clearChecked');
}

function queryCollatDetails(cntrctNo){
	var cntrctNo = $('#cntrctNo').val();
	var sysLockBy = $('#sysRefNo').val();
	var data = {};
	if('PM'===SCFUtils.FUNCTYPE){
		data = {
			queryId : 'Q_P_000073',
			cntrctNo : cntrctNo,
			cacheType:'non'
		}
	}else if('FP'===SCFUtils.FUNCTYPE){
		data = {
			queryId : 'Q_P_000624',
			cntrctNo : cntrctNo,
			sysLockBy : sysLockBy,
			cacheType:'non'
		}
	}
	var options = {
			url : SCFUtils.AJAXURL,
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$.each(data.rows, function(i, n) {
						$.extend(n, {
							collatNm : n.collatNm,
							goodsId : n.collatId,
							collatSpec : n.collatSpec,
							prcollatFact : n.collatFact,
							collatUnit : n.collatUnit,
							ccy : n.collatCcy,
							collatRdPrice : n.collatRdPrice,
							billValDt : n.collatAdjDt,
							collatQty : n.collatQty,
							collatVal : n.collatVal,
							outQty : '',
							outVal : '',
							collatOutQtyHD : n.collatOutQty//讲可出库数量的值给临时字段 add by JinJH
						});
					});
					SCFUtils.loadGridData('inOutDetailsTable', data.rows,false, true);
				}
			}
		};
	    options.data = data;
		SCFUtils.ajax(options);
}

/**
 * 查询入库货物表
 * 
 * @param cntrctNo
 */
function queryDetails(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000073',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					$.extend(n, {
						collatNm : n.collatNm,
						goodsId : n.collatId,
						collatSpec : n.collatSpec,
						prcollatFact : n.collatFact,
						collatUnit : n.collatUnit,
						ccy : n.collatCcy,
						collatRdPrice : n.collatRdPrice,
						billValDt : n.collatAdjDt,
						collatQty : n.collatQty,
						collatVal : n.collatVal,
						outQty : '',
						outVal : '',
						collatOutQtyHD : n.collatOutQty//讲可出库数量的值给临时字段 add by JinJH
					});
				});
				SCFUtils.loadGridData('inOutDetailsTable', data.rows,false, true);
			}
		}
	};
	SCFUtils.ajax(options);
}
/**
 * 查询融资表
 * 
 * @param cntrctNo
 */
function queryLoanInfo(cntrctNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000070',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				// 汇总 协议项下的融资余额
				var ttlLoanBal = 0.000;
				// 汇总 协议项下的融资金额
				var ttlLoanAmt = 0.000;
				// 汇总 协议项下的保证金余额
				var marginBal = 0.000;
				$.each(data.rows,function(i, n) {
					ttlLoanBal = SCFUtils.Math(ttlLoanBal,n.ttlLoanBal, 'add');
					ttlLoanAmt = SCFUtils.Math(ttlLoanAmt,n.ttlLoanAmt, 'add');
					marginBal = SCFUtils.Math(marginBal, n.marginBal,'add');
				});
				// 保证金余额
				$("#initBailBal").numberspinner('setValue', marginBal);
				// 协议项下的融资余额
				$("#ttlLoanBal").numberspinner('setValue', ttlLoanBal);
				var pldPerc = SCFUtils.Math($("#pldPerc").val(), 100, 'div');// 百分比
				// 【最低库存价值】=（协议表下的融资敞口-保证金余额）/质押率  该公式将存在于还款中计算
				//最低库存价值直接从协议带出，放货出库不在参与重新计算  YeQing modify on 2016-10-11
				var ttlLowPayNum = $('#ttlLowPayNum').numberspinner('getValue');
//				if(ttlLowPayNum<0)ttlLowPayNum=0;//避免出现当协议项下的融资余额为0时出现负的情况
//				$('#ttlLowPayNum').numberspinner('setValue', ttlLowPayNum);
				// 可放货价值=库存价值总额-最低库存价值
				$('#ttlYPayAmt').numberspinner('setValue',SCFUtils.Math($("#ttlRegAmt").numberspinner('getValue'),ttlLowPayNum, 'sub'));
				//可放货价值临时字段
				$('#ttlYPayAmtOld').val(SCFUtils.Math($("#ttlRegAmt").numberspinner('getValue'),ttlLowPayNum, 'sub'));
				// 隐藏域赋值
				$("#loanId").val(data.rows[0].sysRefNo);
				$("#loanAmt").val(ttlLoanAmt);
				$("#loanBal").val(ttlLoanBal);
				$("#initBailAcc").val(data.rows[0].marginAcNo);
			}
		}
	};
	SCFUtils.ajax(options);
}
/**
 * 查询现货入库表
 * 
 * @param data
 */
function queryregId(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000496',
			cntrctNo : data
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$("#ccy").val(data.rows[0].ccy);
				$("#regId").val(data.rows[0].regId);
				$("#regNm").val(data.rows[0].regNm);
				$("#wareId").val(data.rows[0].wareId);
				$("#wareNm").val(data.rows[0].wareNm);
			}
		}
	};
	SCFUtils.ajax(options);
}
/**
 * 协议表中的融资敞口
 */
var openLoanAmt = 0.00;
/**
 * 查询协议表
 * 
 * @param data
 */
function queryCntrctInfo(cntrctNo) {
	var queryId = 'Q_P_000517';
	if(SCFUtils.FUNCTYPE == 'PM')queryId = 'Q_P_000566';
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : queryId,
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$('#pldPerc').numberspinner('setValue', data.rows[0].pldPerc);
				$('#lmtBal').numberspinner('setValue', data.rows[0].lmtBal);
				$('#ccy').combobox('setValue', data.rows[0].lmtCcy);
				openLoanAmt = data.rows[0].openLoanAmt;
			}
		}
	};
	SCFUtils.ajax(options);
}
function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('dispatchForm', data);
	SCFUtils.loadGridData('inOutDetailsTable', SCFUtils
			.parseGridData(data.obj.crtf), true);// 加载数据并保护表格。
	lookSysRelReason();
}

function pageOnReleasePreLoad(data) {
	isAccept = true;
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	isAccept = true;//复核默认已经接收改变
	SCFUtils.loadForm('dispatchForm', row);
	var cntrctNo = $('#cntrctNo').val();
	queryCntrctInfo(cntrctNo);
	queryLoanInfo(cntrctNo);
	// queryReLoan();
	// queryReCntrct();
	// queryRePo();
	queryReInoutDetails(data.obj.sysRefNo);
	//queryregId(data.obj.sysRefNo);
	//queryDetails(data.obj.sysRefNo);
	// queryReCollat();
	// updateReOutAmt();
	$('#ttlYPayAmtOld').val(SCFUtils.Math($("#ttlYPayAmt").numberspinner('getValue'),$("#ttlPayAmt").numberspinner('getValue'), 'add'));
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleaseResultLoad(data) {
	//queryCntrctInfo(cntrctNo);
	//queryLoanInfo(cntrctNo);
	pageOnResultLoad(data);
	queryReInoutDetails(data.obj.sysRefNo);
	//queryregId(data.obj.sysRefNo);
	//queryDetails(data.obj.sysRefNo);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}
//当退回时是否执行oncheck事件
var fpFlag = false;
function pageOnFPLoad(data) {
	fpFlag =  true;
//	$.extend(data.obj,{
//		ttlYPayAmtOld : SCFUtils.Math(data.obj.ttlPayAmt, data.obj.ttlYPayAmt, 'add')//原可放货价值
//	});
	pageOnReleasePageLoad(data);
	$('#inOutDetailsTable').datagrid('selectAll',true);//在加载数据初始化时就将datagrid中的数据默认全勾选
	//循环获得全部子表，得到每行的outVal
	var inoutTableRow = SCFUtils.getGridData('inOutDetailsTable');
	var totalOutVal = 0;
	$.each(inoutTableRow,function(i,n){
		totalOutVal = SCFUtils.Math(totalOutVal,n.outVal,'add');
	});
	$("#ttlRegAmtCount").val(SCFUtils.Math(data.obj.ttlRegAmt,totalOutVal,'add'));
	//退回的时候ttlYPayAmtOld取申请时候初始的可放货价值
	$('#ttlYPayAmtOld').val(SCFUtils.Math($("#ttlYPayAmt").numberspinner('getValue'),$("#ttlPayAmt").numberspinner('getValue'), 'add'));
	isAccept=true;//FP加载时就赋值已接受改变，为了能够在FP初始加载时，触发onuncheck中的主页还原计算
	endEditing();// 结束编辑
	fpFlag =  false;
	pagepreFlag = true;
	$('#ttlYPayAmtHD').val(SCFUtils.Math($('#ttlYPayAmt').numberspinner('getValue'),$('#ttlPayAmt').numberspinner('getValue'),'add'));
	$('#ttlRegAmtHD').val(SCFUtils.Math($('#ttlRegAmt').numberspinner('getValue'),$('#ttlPayAmt').numberspinner('getValue'),'add'));
	lookSysRelReason();
}

function onNextBtnClick() {
	if(!isAccept){
		SCFUtils.alert('请接收改变数据!');
		return;
	}
	// 本次提货总价值
	var ttlPayAmt = $('#ttlPayAmt').numberspinner('getValue');
	// 可放货价值
	var ttlYPayAmt = $('#ttlYPayAmtOld').val();

	// a)当额度中设定初始保证金不允许提货时，判断保证金余额>融资金额*初始保证金比例；
	// b)本次提货后的押品价值*（1-初始保证金比例）+保证金余额—融资金额>=0
	// if(SCFUtils.FUNCTYPE != 'RE' && SCFUtils.FUNCTYPE != 'DP'){
	// if(checkCollatValue()){
	// return;
	// }
	// }

	var mainData = SCFUtils.convertArray('dispatchForm');
	var grid = {};
	var crtf;// 放货出库子表信息
	if ('RE' == SCFUtils.FUNCTYPE || 'DP' == SCFUtils.FUNCTYPE) {
		crtf = SCFUtils.getGridData('inOutDetailsTable');
	} else {
		if (ttlYPayAmt <= 0) {
			SCFUtils.alert('该协议下已无可放货价值，请追加保证金!');
			return;
		}
		if (ttlPayAmt <= 0) {
			SCFUtils.alert('本次提货总价值为零,请勾选货物信息！');
			return;
		}
		// 如果本次提货价值大于可放货价值，则不能通过
		if (SCFUtils.Math(ttlPayAmt, ttlYPayAmt, 'sub') > 0) {
			SCFUtils.alert('本次提货总价值已超出可放货价值,请修改本次出库数量！');
			return;
		}
		crtf = SCFUtils.getSelectedGridData('inOutDetailsTable', false);
//		crtf = SCFUtils.getGridData('inOutDetailsTable');
		
		if('PM' === SCFUtils.FUNCTYPE || 'FP' === SCFUtils.FUNCTYPE){
			$.each(SCFUtils.parseGridData(crtf), function(i, n) {
				var refNo = $('#sysRefNo').val();
				if(n.sysRefNo.length == 8){//n.sysRefNo = outXXXXX才继承
					$.extend(n, {
						"sysRefNo" : refNo + n.sysRefNo,
						"collatRefNo" : n.sysRefNo,
					});
				}
			});
		}
	}
	grid.crtf = SCFUtils.json2str(crtf);
	$.extend(mainData, grid);
	return mainData;
}

// 校验
function checkCollatValue() {
	var flag = false;
	var initThFlg = $('#initThFlg').val();
	var marginBal = $('#initBailBal').numberspinner('getValue');// 保证金余额
	var loanAmt = $('#loanAmt').val();
	var marginAmt = $('#marginAmt').val();
	var initMarginPct = $('#initMarginPct').val();
	if ("N" == initThFlg) {
		if (marginBal < marginAmt) {
			SCFUtils.alert('初始保证金不允许提货,保证金余额小于初始保证金金额！');
			flag = true;

			return flag;
		}
	}

	var ttlPayAmt = $('#ttlPayAmt').numberspinner('getValue');// 本次提货价值
	var collatValue = SCFUtils.Math(getCollatValue(), ttlPayAmt, 'sub');// 本次提货后的押品价值
	collatValue = SCFUtils.Math(collatValue, SCFUtils.Math(1, SCFUtils.Math(
			initMarginPct, 100, 'div'), 'sub'), 'mul');// 本次提货后的押品价值*（1-初始保证金比例）
	collatValue = SCFUtils.Math(collatValue, marginBal, 'add');
	collatValue = SCFUtils.Math(collatValue, loanAmt, 'sub');

	if (collatValue < 0) {
		SCFUtils.alert('本次提货后不足以覆盖敞口，请追加保证金！');
		flag = true;
	}

	return flag;
}

function getCollatValue() {
	var ttlAmt = 0;
	var loanId = $('#loanId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000347',
			loanId : loanId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				ttlAmt = data.rows[0].ttlAmt;
			}
		}
	};
	SCFUtils.ajax(options);

	return ttlAmt;
}

// 查询票据
function onSearchPoClick() {
	var billNo = $('#billNo').val();
	var cntrctNo = $('#cntrctNo').val();
	var selId = $('#selId').val();
	var buyerId = $('#buyerId').val();
	var options = {
		title : '票据查询',
		reqid : 'I_P_000114',
		data : {
			'billNo' : billNo,
			'selId' : selId,
			'cntrctNo' : cntrctNo,
			'buyerId' : buyerId,
			cacheType : 'non'
		},
		onSuccess : setPoData,
		cacheType : 'non'
	};
	SCFUtils.getData(options);
}

function setPoData(data) {
	if (SCFUtils.isEmpty(data)) {
		SCFUtils.alert("该票据不存在！");
		return;
	}

	$('#buyerId').val(data.buyerId);
	$('#buyerNm').val(data.buyerNm);
	$('#marginAmt').val(data.marginAmt);
	$('#billNo').val(data.billNo);
	$('#loanId').val(data.loanId);
	// $('#loanBal').numberspinner('setValue', data.ttlLoanBal);
	$('#loanAmt').val(data.ttlLoanAmt);
	$('#initBailAcc').val(data.marginAcNo);
	$('#initMarginPct').val(data.initMarginPct);
	$('#initBailBal').numberspinner('setValue',
			SCFUtils.Math(data.marginAmt, data.marginBal, 'add'));

	// $('#ttlPayNum').numberspinner('setValue',0);
	// $('#ttlPayAmt').numberspinner('setValue',0);
	// loadTable();
}

function loadTable() {
	var billNo = $('#billNo').val();
	if (SCFUtils.isEmpty(billNo)) {
		SCFUtils.alert("未选择票号，请检查！");
		return false;
	}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000346',
			billNo : billNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('inOutDetailsTable', data.rows, false,
						true);
				// updateTable(data.rows);
			} else {
				// SCFUtils.alert("没有找到符合要求的合格证!");
				// $('#inOutDetailsTable').datagrid('loadData',{total:0,rows:[]});
			}
		}
	};
	SCFUtils.ajax(options);
}

function onCheck(rowIndex, rowData) {
	if(fpFlag){
		fpFlag=false;
		return;
	}
	isAccept = false;
	rowData.ck = true;
	var collatOutQty = rowData.collatOutQtyHD;// 获得可出库数量
	var collatVal = rowData.collatVal;// 质物最新价值
	var collatRdPrice = rowData.collatRdPrice //获得最新单价
	// 当选中时，本次出库数量等于可出库数量
	var outVal = SCFUtils.Math(collatOutQty, collatRdPrice, 'mul')// 获得本次出库价值
	$('#inOutDetailsTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			// 当选中一行数据时，给字段重新改值
			outQty : collatOutQty,
			outVal : outVal
		}
	});

	onClickRow(rowIndex);
	checkArray.push(rowData.sysRefNo);
}
//默认没有点击接受改变按钮，只有点击接受改变按钮后，才计算库存价值总额
var isAccept = false;
function onUnCheck(rowIndex, rowData) {
	rowData.ck = false;
//	if(isAccept || SCFUtils.Math(tableNumPrePage,flag,'mul')>0){
//		var outQty = rowData.outQty;// 获得本次出库库数量
//		var collatRdPrice = rowData.collatRdPrice //获得最新单价
//		var outVal = SCFUtils.Math(outQty, collatRdPrice, 'mul')// 还原本次出库价值
//		// 取消一行时，本次提货总价值减去当前选中行的本次出库价值
//		var ttlRegAmt = $("#ttlRegAmt").numberspinner("getValue");
//		var ttlPayAmt = $("#ttlPayAmt").numberspinner("getValue");
//		$("#ttlRegAmt").numberspinner('setValue',SCFUtils.Math(ttlRegAmt, outVal, 'add'));
//		ttlPayAmt = SCFUtils.Math(ttlPayAmt, outVal, 'sub');
//		$("#ttlPayAmt").numberspinner("setValue", ttlPayAmt);
//		//还原下一步上一步accept中的sysRefNo即将outXXXcltXXX变回cltXXX
//		var sysRefNo = rowData.sysRefNo.substring(rowData.sysRefNo.length-8);//截取后8位
//	}
	var totalOutVal = 0;
	var crtf = SCFUtils.getSelectedGridData('inOutDetailsTable', false);//得到datagrid中选中的记录
	if(crtf._total_rows > 0){
		$.each(crtf,function(i,n){
			if(rowData == n){//勾选的这笔记录，不做入计算
				return true;
			}
			totalOutVal = SCFUtils.Math(totalOutVal,n.outVal,'add');//得到选中的记录的outVal的总和
		});
		$("#ttlPayAmt").numberspinner('setValue',totalOutVal);//本次提货价值
		$("#ttlYPayAmt").numberspinner('setValue',SCFUtils.Math($("#ttlYPayAmtHD").val(),totalOutVal,'sub'));//可放货价值的原值-本次提货价值
		$("#ttlRegAmt").numberspinner('setValue',SCFUtils.Math($("#ttlRegAmtHD").val(),totalOutVal,'sub'));//库存价值总额的原值-本次提货价值
		var sysRefNo = rowData.sysRefNo.substring(rowData.sysRefNo.length-8);//截取后8位
	}else{
		$("#ttlPayAmt").numberspinner('setValue',0);//本次提货价值
		$("#ttlYPayAmt").numberspinner('setValue',$("#ttlYPayAmtHD").val());
		$("#ttlRegAmt").numberspinner('setValue',$("#ttlRegAmtHD").val());
	}
	var row = {
			// 当选中一行数据时，给字段重新改值
			outQty : 0,// 还原本次出库数量
			outVal : 0,
			collatOutQty : rowData.collatOutQtyHD, //讲可出库数量的临时字段给可出库数量
//			sysRefNo : sysRefNo 
			sysRefNo : rowData.sysRefNo.substring(rowData.sysRefNo.length-8)
	};
	$('#inOutDetailsTable').datagrid('updateRow', {
		index : rowIndex,
		row : row
	});
	endEditing();
	checkArray = delCheck(checkArray, rowData.sysRefNo);
}

// 判断是否包含在数组中
function contains(a, obj) {
	for ( var i in a) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}

// 删除数组中的值
function delCheck(a, obj) {
	var arr = a;
	for ( var i in a) {
		if (a[i] === obj) {
			delete arr[i];
		}
	}
	return arr;
}

function onCheckAll(rows) {
	if(isPreOncheck || fpFlag){
		return;
	}
	$.each(rows, function(i, n) {
		if (!contains(checkArray, n.sysRefNo)) {
			onCheck(i, n);
		}
	});
}

function onUnCheckAll(rows) {
	if(pagepreFlag){
		pagepreFlag = false;
		$.each(rows, function(i, n) {
			onUnCheck(i, n);
		});
	}else{
		$.each(rows, function(i, n) {
			if (contains(checkArray, n.sysRefNo)) {
				onUnCheck(i, n);
			}
		});
	}
}

function queryReInoutDetails(refNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000086',
			refNo : refNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				if ('RE' == SCFUtils.FUNCTYPE||'DP' == SCFUtils.FUNCTYPE) 
					SCFUtils.loadGridData('inOutDetailsTable', data.rows, true,true);
				if ('FP' == SCFUtils.FUNCTYPE){
					$.each(data.rows,function(i,n){
						$.extend(n,{
							collatOutQtyHD : SCFUtils.Math(n.collatOutQty,n.outQty,'add')//讲可出库数量的值给临时字段 add by JinJH
						});
					});
					SCFUtils.loadGridData('inOutDetailsTable', data.rows, false,true);
				} 
			}
		}
	};
	SCFUtils.ajax(options);
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

function getBuyerSuccess(data) {
	$('#buyerNm').val(data.buyerNm);
	$('#buyerId').val(data.buyerId);
}

var totalFP = 0.00;//在退回时上次的出库的总价值
/**
 * 接受改变
 */
function accept() {
	//已经接受改变的数据 不执行
	if(isAccept == true){
		return;
	}
	
	isAccept = true;
	var totalPoOutAmt = 0.00;
	var data = $('#inOutDetailsTable').datagrid('getSelections');
	var totalFP = 0.00;//在退回时刚进入页面时的出库的总价值
	endEditing();// 结束编辑
	$.each(data, function(i, n) {
		var collatQty = n.collatQty;// 获得入库数量
		var collatOutQty = n.collatOutQtyHD;// 获得可出库数量(使用临时字段)
		var collatVal = n.collatVal;// 获得质物最新价值
		var collatRdPrice = n.collatRdPrice;// 获得单价
		var outQty = n.outQty;// 获得本次出库数量
//		if(SCFUtils.FUNCTYPE == 'FP')collatOutQty = collatQty;
		if (SCFUtils.Math(outQty, collatQty, 'sub') > 0) {
			SCFUtils.alert('本次出库数量不得大于入库数量！');
			var rowIndex = $('#inOutDetailsTable').datagrid('getRowIndex', n)
			$('#inOutDetailsTable').datagrid('uncheckRow',rowIndex);
			//onUnCheck(i, n);
		} else if (SCFUtils.Math(outQty, collatOutQty, 'sub') > 0) {
			SCFUtils.alert('本次出库数量不得大于可出库数量！');
			var rowIndex = $('#inOutDetailsTable').datagrid('getRowIndex', n)
			$('#inOutDetailsTable').datagrid('uncheckRow',rowIndex);
			//onUnCheck(i, n);
		} else {
			// 如果符合条件
			var rowIndex = $('#inOutDetailsTable').datagrid('getRowIndex', n);// 获得选中的行数
			var row = {
					outVal : SCFUtils.Math(outQty, collatRdPrice, 'mul')
					// 更改选中行的本次出库价值
					};
			if('PM' === SCFUtils.FUNCTYPE){
					var refNo = $('#sysRefNo').val();
					row = {
//						"sysRefNo" : refNo + n.sysRefNo,
//						"collatRefNo" : n.sysRefNo,
						"collatOutQty" : SCFUtils.Math(n.collatOutQtyHD, n.outQty,
						'sub'),
						"releaseDt" : getDate(new Date()),
						"refNo" : refNo,
						outVal : SCFUtils.Math(outQty, collatRdPrice, 'mul')
					}
			}
			
			if(SCFUtils.FUNCTYPE == 'FP'){
				collatOutQty = n.collatOutQty;
				var refNo = $('#sysRefNo').val();
				row = {
//						"sysRefNo" : refNo + n.sysRefNo,
//						"collatRefNo" : n.sysRefNo,
						"collatOutQty" : SCFUtils.Math(n.collatOutQtyHD, n.outQty,
						'sub'),
						"releaseDt" : getDate(new Date()),
						"refNo" : refNo,
						outVal : SCFUtils.Math(outQty, collatRdPrice, 'mul')
						};
				totalFP = SCFUtils.Math(totalFP, SCFUtils.Math(collatOutQty, collatRdPrice, 'mul'), 'add')
			}
			$('#inOutDetailsTable').datagrid('updateRow', {
				index : rowIndex,
				row : row
			});
			totalPoOutAmt = SCFUtils.Math(totalPoOutAmt, SCFUtils.Math(
					outQty, collatRdPrice, 'mul'), 'add');
		}
	});
	$("#ttlPayAmt").numberspinner("setValue", totalPoOutAmt);
	
	if(SCFUtils.FUNCTYPE == 'FP'){
		// 质物库存总价值=原质物库存总价值-本次提货总价值（更新至协议表）
//		$("#ttlRegAmt").numberspinner('setValue',
//				SCFUtils.Math(SCFUtils.Math($("#ttlRegAmtCount").val(),totalFP,
//						'add'), totalPoOutAmt, 'sub'));
		$("#ttlRegAmt").numberspinner('setValue',
				SCFUtils.Math($("#ttlRegAmtCount").val(), totalPoOutAmt, 'sub'));
	}else{
		// 质物库存总价值=原质物库存总价值-本次提货总价值（更新至协议表）
		$("#ttlRegAmt").numberspinner('setValue',
				SCFUtils.Math($("#ttlRegAmtCount").val(), totalPoOutAmt, 'sub'));
	}
}

function changeTtlYPayAmt() {
	var ttlRegAmt = $("#ttlRegAmt").numberspinner("getValue");
	var ttlLowPayNum = $("#ttlLowPayNum").numberspinner("getValue");
	//可放货价值=库存价值总额-最低库存价值
	$("#ttlYPayAmt").numberspinner('setValue',SCFUtils.Math(ttlRegAmt,ttlLowPayNum, 'sub'));
}

var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#inOutDetailsTable').datagrid('validateRow', editIndex)) {
		$('#inOutDetailsTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function onClickRow(index) {
	if (editIndex != index) {
		if (endEditing()) {
			$('#inOutDetailsTable').datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#inOutDetailsTable').datagrid('selectRow', editIndex);
		}
	}
}
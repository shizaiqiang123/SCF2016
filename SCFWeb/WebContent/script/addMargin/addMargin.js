function pageOnInt() {
	SCFUtils.setFormReadonly('#addMarginDiv',true);
	SCFUtils.setTextReadonly('payBailAcno', true);
	SCFUtils.setNumberspinnerReadonly('marginCompen', true);
	SCFUtils.setLinkbuttonReadonly('poButton',false);
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

function ajaxBillM() {
	var loanId = $('#loanId').val();
	if(!SCFUtils.isEmpty(loanId)){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000505',
					loanId :loanId,
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						$.each(data.rows, function(i, n){
							$.extend(n,{
								refNo : n.sysRefNo,
								marginBalOrg : n.marginBal
							});
						});
						SCFUtils.loadGridData('bailBillDg', data.rows,false,true);
					}
				}
			};
			SCFUtils.ajax(options);
	}else{
		SCFUtils.alert("请选择融资！");
	}
	
}

function ajaxBillRe() {
	var loanId = $('#loanId').val();
	if(!SCFUtils.isEmpty(loanId)){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000509',
					loanId :loanId
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						$.each(data.rows, function(i, n){
							$.extend(n,{
								refNo : n.refNo
							});
						});
						SCFUtils.loadGridData('bailBillDg', data.rows,false,true);
					}
					$('#bailBillDg').datagrid('selectAll');
				}
			};
			SCFUtils.ajax(options);
	}else{
		SCFUtils.alert("没有票据信息！");
	}
	
}

function pageOnLoad(data){
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('addMargin', data);
	queryCntrct();
	//保证金变更功能不需要抓取协议下保证金余额
	$('#marginBal').numberbox('setValue',0);
	$('#initMarginPct').numberbox('setValue',data.obj.initGartPct);
	$('#ccy').combobox('setValue',data.obj.lmtCcy);
	if (SCFUtils.OPTSTATUS == 'ADD') {
		var options = {};
		options.data = {
			refName : 'BailRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);
		$('#trxDt').datebox('setValue',SCFUtils.getcurrentdate());
	}
	var options = $('#bailBillDg').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
	lookSysRelReason();
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('addMargin', data);
	SCFUtils.loadGridData('bailBillDg', SCFUtils.parseGridData(data.obj.bailBill),
			true);// 加载数据并保护表格。
	lookSysRelReason();

}

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('addMargin', data);
	SCFUtils.loadGridData('bailBillDg', SCFUtils.parseGridData(data.obj.bailBill),
			false);// 
	$('#bailBillDg').datagrid('selectAll');
	var options = $('#bailBillDg').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
	if('FP'===SCFUtils.FUNCTYPE){
		$("#FPquery").attr("style","display:inline;float:right;");
	}
	lookSysRelReason();
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('addMargin', row);
	queryReCntrct();
	ajaxBillRe();
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
	SCFUtils.loadForm('addMargin', data);
	SCFUtils.loadGridData('bailBillDg', SCFUtils.parseGridData(data.obj.bailBill),
			true);// 加载数据并保护表格。
	//pageOnPreLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

//new FP load function by JinJH
function pageOnFPLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	$.extend(data.obj,{
		marginBalOrg : SCFUtils.Math(data.obj.marginBal, data.obj.marginCompen, 'sub')
	});
	SCFUtils.loadForm('addMargin', row);
	queryCntrctOrg();
	queryReCntrct();
	ajaxBillRe();
	var options = $('#bailBillDg').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
	$("#FPquery").attr("style","display:inline;float:right;");
	lookSysRelReason();
}
//FP时的查询datagrid的方法
function editRow(){
	clearSelectedRows();
	var loanId = $('#loanId').val();
	if(!SCFUtils.isEmpty(loanId)){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000529',
					loanId :loanId,
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						$.each(data.rows, function(i, n){
							$.extend(n,{
								refNo : n.sysRefNo
							});
						});
						SCFUtils.loadGridData('bailBillDg', data.rows,false,true);
					}
				}
			};
			SCFUtils.ajax(options);
	}
}

function clearSelectedRows(){
	
	$('#bailBillDg').datagrid('clearSelections');
	
}

/*
 * 打包卖方额度
 */
function getSellerData() {
	querySellerLmt();
	var sellerLmt = {};// 添加卖方额度信息
	sellerLmt._total_rows = 1;
	var obj = {};
	var lmtTp = '1';
	if('RE'===SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE ){
		obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		obj.lmtBal = relQueryLmtE(lmtTp)[0].lmtBal ;//卖方额度余额
		obj.lmtAllocate = relQueryLmtE(lmtTp)[0].lmtAllocate ;//本次占用额度
		obj.lmtRecover = relQueryLmtE(lmtTp)[0].lmtRecover ;//归还额度
		

	}else{
		if('FP'===SCFUtils.FUNCTYPE){
			obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		}else{
			obj.sysRefNo = $('#sellerLmtSysRefNo').val();
		}
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#marginCompen').numberspinner('getValue'),'add') ;//卖方额度余额=原卖方额度余额+追加保证金金额
		obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#marginCompen').numberspinner('getValue'),'sub') ;//本次占用额度=原来占用额度+追加保证金金额
		obj.lmtRecover = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtRecover,$('#marginCompen').numberspinner('getValue'),'add') ;//归还额度=原归还额度+追加保证金金额

	}

	obj.ttlAllocate = 0;// 已占用额度
	obj.theirRef = $('#sysRefNo').val();//主页流水号

	sellerLmt['rows0'] = obj;
	return sellerLmt;

}

function querySellerLmt(){
	var cntrctNo = $("#cntrctNo").val();
	var selId = $("#selId").val();
	   if(!SCFUtils.isEmpty(selId)){
		  var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000673',
					selId : selId,
					cntrctNo : cntrctNo
				},
				callBackFun : function(data1) {
					if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
						$('#sellerLmtSysRefNo').val(data1.rows[0].sysRefNo);//卖方额度流水号
						
					}
				}
			};
			SCFUtils.ajax(opt);
	    }
}

/*
 * 复核时候查询LMT的E表
 */
function relQueryLmtE(lmtTp) {
	var cntrctNo = $("#cntrctNo").val();
	// var selId= $("#selId").val();
	var sysLockBy = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000651',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp,
			// selId :selId,
			sysLockBy : sysLockBy
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
 * 申请时候查询LMT的表
 */
function relQueryLmtM(lmtTp) {
	var cntrctNo = $("#cntrctNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000672',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp,
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

function onNextBtnClick() {
	if (editIndex != undefined) {
		SCFUtils.alert("请接受改变编辑数据！");
		return;
	}
	var marginCompen =$('#marginCompen').numberspinner('getValue');//本次追加保证金金额
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var marginBal = $('#marginBal').numberspinner('getValue');//保证金余额
//	var marginBalOrg = $('#marginBalOrg').val();
//	var marginBalVal = SCFUtils.Math(ttlLoanAmt, marginBalOrg, 'sub');
	if(marginCompen == 0){
		SCFUtils.alert('本次追加保证金金额为零,请追加保证金！');
		return;
	}
	if(SCFUtils.Math(marginBal, ttlLoanAmt, 'sub')>0){
		SCFUtils.alert('本次追加保证金金额超出最大金额，请检查！');
		return;
	}
//	var ttlMarginCompen = $('#marginCompen').numberbox('getValue');//总的续存保证金金额
//	var marginBalHD = $('#marginBalHD').numberbox('getValue');//保证金余额
//	var marginBal = SCFUtils.Math(ttlMarginCompen, marginBalHD, 'add');
//	$('#marginBal').val(marginBal);
	var mainData = SCFUtils.convertArray('addMargin');
	
	var cntrctNo = mainData.cntrctNo;//协议编号
	//协议相关信息
	var cntrct=queryCntrctInfo(cntrctNo);
	$.extend(mainData, {
		"cntrctLmtCcy" : cntrct.lmtCcy ,//额度币别
		
		"cntrctLmtBal" : SCFUtils.Math(cntrct.lmtBal, marginCompen, 'add'),//协议_额度余额 = 原额度余额+本次释放金额（即：本次追加保证金金额）
		
		'cntrctLmtAmt' : cntrct.lmtAmt, //协议_额度金额
		
		'cntrctLmtAllocate' : SCFUtils.Math(cntrct.lmtAllocate, marginCompen, 'sub'), //协议_占用额度 = 原占用额度-本次释放金额（即：本次追加保证金金额）
		
		'cntrctLmtRecover' :SCFUtils.Math(cntrct.lmtRecover, marginCompen, 'add') //协议_归还额度 =原归还额度+本次释放金额（即：本次追加保证金金额）
	});
	
	var grid = {};
	var bailBill;//放货出库子表信息
	if('RE' == SCFUtils.FUNCTYPE || 'DP' == SCFUtils.FUNCTYPE){
		bailBill = SCFUtils.getGridData('bailBillDg');	
	}else{
		bailBill = SCFUtils.getSelectedGridData('bailBillDg',false);	
	}
	grid.bailBill = SCFUtils.json2str(bailBill);
	//打包卖方额度数据
	grid.sellerLmt = SCFUtils.json2str(getSellerData());
	$.extend(mainData, grid);
	return mainData;
}

function onSearchPoClick() {
	var cntrctNo = $('#cntrctNo').val();
	var selId = $('#selId').val();
	var options = {
		title : '融资查询',
		reqid : 'I_P_000197',
		data : {
			'selId' : selId,
			'cntrctNo' : cntrctNo,
			cacheType : 'non'
		},
		onSuccess : setLoanData,
		cacheType : 'non'
	};
	SCFUtils.getData(options);
}
/**
 * 
 * 作者：Administrator
 * 时间：2016年9月1日
 *最大可追加保证金
 */
var maxMarginBal = 0.00;

function setLoanData(data) {
	if (SCFUtils.isEmpty(data)) {
		SCFUtils.alert("未选择融资记录！");
		return;
	}

	$('#loanId').val(data.sysRefNo);
	$('#ttlLoanAmt').numberspinner('setValue', data.ttlLoanAmt);
	$('#marginBal').numberspinner('setValue',data.marginBal);
	
	$('#marginBalOrg').val(data.marginBal);//初始保证金金额
	
	$('#payBailAcno').val(data.payBailAcno==null?data.marginAcNo:data.payBailAcno);
	//$('#payBailAcno').combobox({required:true});
	$('#loanValDt').datebox('setValue', data.loanValDt);
	$('#loanDueDt').datebox('setValue', data.loanDueDt);
	ajaxBillM();
	/*
	 * 查询按钮加载数据成功，去判断cntrctNo的div有无值,无值不做处理
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160728 by XuX
	 */
	if($('#loanId').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#loanId').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#loanId').removeClass('validatebox-invalid');
	}
	$('#marginCompen').numberspinner('setValue',0);
	maxMarginBal = SCFUtils.Math($('#ttlLoanAmt').numberbox('getValue'),
			$('#marginBal').numberbox('getValue'), 'sub');
	//$('#marginCompen').numberspinner({max:parseFloat(maxMarginBal)});
}

function ajaxBox(){
	var busiTp = [ {
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
	$("#busiTp").combobox('loadData',busiTp);
}

function queryCntrct(){
	var sysRefNo = $('#sysRefNo').val();
	if(!SCFUtils.isEmpty(sysRefNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000029',
					sysRefNo : sysRefNo
				},
				callBackFun : function(data) {
					if(!SCFUtils.isEmpty(data.rows[0])){
						SCFUtils.loadForm('addMargin', data.rows[0]);
						//最低库存价值初始值记录 add by YeQing 2016-11-2
						$('#regLowestValOld').val(data.rows[0].regLowestVal);
					}
				}
		};
		SCFUtils.ajax(opt);
	}
}
/*
 * 为了退回处理获取最低库存价值的原始值
 */
function queryCntrctOrg(){
	var sysRefNo = $('#cntrctNo').val();
	if(!SCFUtils.isEmpty(sysRefNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000029',
					sysRefNo : sysRefNo
				},
				callBackFun : function(data) {
					if(!SCFUtils.isEmpty(data.rows[0])){
						//SCFUtils.loadForm('addMargin', data.rows[0]);
						//最低库存价值初始值记录 add by Shizaiqiang 2016-11-14
						$('#regLowestValOld').val(data.rows[0].regLowestVal);
					}
				}
		};
		SCFUtils.ajax(opt);
	}
}

function queryReCntrct(){
	var cntrctNo = $('#cntrctNo').val();
	var sysLockBy = $("#sysRefNo").val();//主表流水号的值，根据这个值去查询被这笔交易锁住的子表
	if(!SCFUtils.isEmpty(cntrctNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000075',
					cntrctNo : cntrctNo,
					sysLockBy : sysLockBy
				},
				callBackFun : function(data) {
					if(!SCFUtils.isEmpty(data.rows[0])){
						$('#lmtBal').numberspinner('setValue', data.rows[0].lmtBal);
						$('#pldPerc').numberspinner('setValue', data.rows[0].fundRt);
						$('#ttlRegAmt').numberspinner('setValue', data.rows[0].ttlRegAmt);
						$('#regLowestVal').numberspinner('setValue', data.rows[0].regLowestVal);
					}
				}
		};
		SCFUtils.ajax(opt);
	}
}

function ajaxTable() {
	var options = {
			idField : 'sysRefNo', // 指明商品编号是标识字段。
			toolbar : '#toolbar',
			rownumbers : true,// 显示行号
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : false,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : [ [ {
				field : 'ck',
				checkbox : true
			},{
				field : 'refNo',
				title : 'refNo',
				width : '10%',
				hidden : true
			}, {
				field : 'sysRefNo',
				title : '票据流水号',
				width : '10%',
				hidden : true
			}, {
				field : 'billNo',
				title : '票号',
				width : '14.2%'
			}, {
				field : 'billAmt',
				title : '出票金额',
				width : '14.2%',
				formatter : ccyFormater
			}, {
				field : 'billValDt',
				title : '起始日',
				width : '14.2%',
				formatter : dateFormater
			}, {
				field : 'billDueDt',
				title : '到期日',
				width : '14.2%',
				formatter : dateFormater
			}, {
				field : 'marginBal',
				title : '保证金余额',
				width : '14.2%',
				formatter : ccyFormater,
				hidden : true
			}, {
				field : 'marginCompen',
				title : '本次续存保证金金额',
				width : '14.2%',
				editor : {
					type : 'numberbox',
					options : {
						precision : 2
					},
				},
				formatter : ccyFormater
			}, {
				field : 'loanId',
				title : '融资编号',
				width : '14.2%'
			}, {
				field : 'cntrctNo',
				title : '协议编号',
				width : '14.2%'
			},{
				field : 'marginBalOrg',
				title : '原保证金余额',
				width : '14.2%',
				formatter : ccyFormater,
				hidden : true
			} ] ]
		};
		$('#bailBillDg').datagrid(options);
	}

function updateGridRow(rowIndex,rowData){
	$('#bailBillDg').datagrid('refreshRow',rowIndex
	);
}
function onCheck(rowIndex, rowData) {
	rowData.ck = true;
	updateGridRow(rowIndex, rowData);
	onClickRow(rowIndex);
}

function onUncheck(rowIndex, rowData) {
	rowData.ck = false;
	var ttlMarginCompen = $('#marginCompen').numberbox('getValue');//总的续存保证金金额
	var marginBal = $('#marginBal').numberbox('getValue');//保证金余额
	var marginCompen = rowData.marginCompen;// 本次续存保证金金额
	//取消选中时，还原银承方式最低库存价值计算：最低库存价值=原最低库存价值+（本行追加保证金金额/质押率）add by YeQing 2016-11-2
	//质押率
	var pldPerc =SCFUtils.Math($('#pldPerc').numberspinner('getValue'),0.01,'mul');
	var regLowestValHD = SCFUtils.Math($('#regLowestVal').numberbox('getValue'),SCFUtils.Math(ttlMarginCompen,pldPerc,'div'),'add');
	$('#regLowestVal').numberspinner('setValue', regLowestValHD);
	
	ttlMarginCompen=SCFUtils.Math(ttlMarginCompen, marginCompen, 'sub');
	marginBal=SCFUtils.Math(marginBal, marginCompen, 'sub');
	$('#marginCompen').numberbox('setValue', ttlMarginCompen);	
	$('#marginBal').numberbox('setValue', marginBal);	
	rowData.marginCompen=0;
	//rowData.marginBal=0;
	rowData.marginBal=SCFUtils.Math(rowData.marginBal, marginCompen, 'sub');
	updateGridRow(rowIndex, rowData);
	endEditing();
}

function onCheckAll(rows) {
	$.each(rows, function(i, n) {
		onUncheck(i, n);
//		updateInvLoanEbal(n, 'add');
//		updateInvLoanBal(n, 'add');
		onCheck(i, n);
	});
}

function onUncheckAll(rows) {
	$.each(rows, function(i, n) {
		onUncheck(i, n);
	});
}

var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#bailBillDg').datagrid('validateRow', editIndex)) {
		$('#bailBillDg').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function onClickRow(index) {
	if (editIndex != index) {
		if (endEditing()) {
			$('#bailBillDg').datagrid('beginEdit',index);
			editIndex = index;
		} else {
			$('#bailBillDg').datagrid('selectRow', editIndex);
		}
	}
}

function accept() {
	if (editIndex == undefined) {
		return;
	}
	var maxMargin = maxMarginBal;
	$('#bailBillDg').datagrid('acceptChanges');
	var data = $('#bailBillDg').datagrid('getSelections');
	//var ttlMarginBalHD= $('#marginBal').numberspinner('getValue');//保证金余额
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');//融资金额
	var ttlMarginBalHD = $('#marginBalOrg').val();//初始保证金额
	var ttlMarginCompen = 0;//总的续存保证金金额
	//
	$.each(data,function(i,n){
		var rowIndex = $('#bailBillDg').datagrid('getRowIndex', n);//行索引
		var marginCompen = n.marginCompen;// 本次续存保证金金额
		$('#bailBillDg').datagrid('updateRow',
				{
					index : rowIndex,
					row : {
						marginBal : SCFUtils.Math(n.marginBalOrg,marginCompen, 'add'),
					}
				});
		ttlMarginCompen =SCFUtils.Math(ttlMarginCompen, marginCompen, 'add');
	});
	
	$('#marginCompen').numberspinner('setValue', ttlMarginCompen);
	$('#marginBal').numberspinner('setValue', SCFUtils.Math(ttlMarginCompen, ttlMarginBalHD, 'add'));
	var marginBalVal = SCFUtils.Math(ttlLoanAmt,ttlMarginBalHD, 'sub');
	if(SCFUtils.Math(marginBalVal,ttlMarginCompen, 'sub')<0){
		SCFUtils.alert('本次追加保证金金额过大，请检查！');
		return;
	}
	//银承方式最低库存价值计算：最低库存价值=原最低库存价值-（本次追加保证金金额/质押率）add by YeQing 2016-11-2
	//质押率
	var pldPerc =SCFUtils.Math($('#pldPerc').numberspinner('getValue'),0.01,'mul');
	var regLowestValHD = SCFUtils.Math($('#regLowestValOld').val(),SCFUtils.Math(ttlMarginCompen,pldPerc,'div').toFixed(2),'sub');
	$('#regLowestVal').numberspinner('setValue', regLowestValHD);
	
	endEditing();
}

//查询额度关联关系表
function queryCntrctInfo(cntrctNo) {
	var obj = {}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000552',
			cntrctNo:cntrctNo
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
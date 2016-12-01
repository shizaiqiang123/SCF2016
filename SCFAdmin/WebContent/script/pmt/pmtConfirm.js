var FPLoadTable = 0;
var list = [];
function ajaxBox() {
	var data =[ {
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
		"text" : "动产质押融资"
	}, {
		"id" : '7',
		"text" : "应收账款质押"
	} ];
	$("#busiTp").combobox('loadData', data);
	var isConfirm = [ {
		"id" : '0',
		"text" : "是"
	}, {
		"id" : '1',
		"text" : "否"
	} ];
	$("#isConfirm").combobox('loadData', isConfirm);
}

/**
 * 根据协议编号查询买方信息
 */
function queryBuyerInfo(cntrctNo,buyerId) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000539',
			cntrctNo : cntrctNo,
			buyerId : buyerId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$('#buyerNm').val(data.rows[0].buyerNm);
				$('#buyerId').val(data.rows[0].buyerId);
				$('#trxId').val(data.rows[0].sysRefNo);
				// 获取买方额度信息
				//getBuyerLmt(data.rows[0].buyerId);
			} 
		}
	};
	SCFUtils.ajax(options);
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function pageOnFPLoad(data) {
	if(data.obj.pmtTp == 0){
		$("#cntPmtInvcMDiv").parent().parent().attr("style","display:none");
	}else{
		$("#sellerInvcMDiv").parent().parent().attr("style","display:none");
		$("tr[id=Tr1]").hide();
	}
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	isFpLoad = true;
	SCFUtils.loadForm('pmtForm', row);
	$('#OldSysRelReason').textbox('setValue',row.OldSysRelReason);
//	$('#lmtAmtHd').numberbox('setValue', data.obj.lmtAmt);
//	$('#lmtAllocateHd').numberbox('setValue', data.obj.lmtAllocate);
//	$('#lmtBalHd').numberbox('setValue', data.obj.lmtBal);
	var selId = $("#selId").val();
	getSellerHKH(selId);
	var busiTp = $("#busiTp").val();
	reLoadTable();
	$('#accetpFlag').val('true');
	if($("#pmtTp").val()==0){
		$("#sellerInvcMTable").datagrid("selectAll");//在加载数据初始化时就将datagrid中的数据默认全勾选
	}else{
		$("#cntPmtInvcMTable").datagrid("selectAll");
	}
	if(relQueryIntE().length > 0){
		$("#intSysRefNo").val(relQueryIntE().sysRefNo);
	}
	$("#payIntTp").val(queryCntrctInfo(data.obj.cntrctNo).payIntTp);
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
	isFpLoad = false;
	/*
	 * $('#invcMTable').datagrid('uncheckAll');
	 */
	lookSysRelReason();
	if(data.obj.pmtTp == 1){
		accept();//加载的时候直接计算
	}else if(data.obj.pmtTp == 0){
		getGridData();
	}
	$("#ttlLoanBal").numberbox("setValue",getTtlLoanBal());
}
function pageOnLoad(data) {
	if(data.obj.pmtTp == 0){
		$("#cntPmtInvcMDiv").parent().parent().attr("style","display:none");
	}else{
		$("#sellerInvcMDiv").parent().parent().attr("style","display:none");
		$("tr[id=Tr1]").hide();
	}
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('pmtForm', data);
	loadTable();
	if($("#pmtTp").val()==0){
		$("#sellerInvcMTable").datagrid("selectAll");
	}else{
		$("#cntPmtInvcMTable").datagrid("selectAll");
	}
//	$('#buyerLmtSysRefNo').val(data.obj.lmtSysRefNo);// 买方额度流水号
//	$('#lmtAmtHd').numberbox('setValue', data.obj.lmtAmt);
//	$('#lmtAllocateHd').numberbox('setValue', data.obj.lmtAllocate);
//	$('#cntrctNo').val(data.obj.sysRefNo);
//	$('#lmtBalHd').numberbox('setValue', data.obj.lmtBal);
	var selId = $("#selId").val();
	getSellerHKH(selId); // 获取卖方保理专户
	$('#loanId').val("");
//	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
	lookSysRelReason();
	$("#payIntTp").val(queryCntrctInfo(data.obj.cntrctNo).payIntTp);
	if(data.obj.pmtTp == 1){
		accept();//加载的时候直接计算
	}else if(data.obj.pmtTp == 0){
		getGridData();
	}
	$("#ttlLoanBal").numberbox("setValue",getTtlLoanBal());
}


function pageOnResultLoad(data) {
	if(data.obj.pmtTp == 0){
		$("#cntPmtInvcMDiv").parent().parent().attr("style","display:none");
	}else{
		$("#sellerInvcMDiv").parent().parent().attr("style","display:none");
		$("tr[id=Tr1]").hide();
	}
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	$('#sysRelReason').textbox('setValue',data.obj.sysRelReason);
	SCFUtils.setComboReadonly('sysRelReason', true);
	SCFUtils.loadForm('pmtForm', data);
	if($("#pmtTp").val()==0){
		SCFUtils.loadGridData('sellerInvcMTable', SCFUtils.parseGridData(data.obj.invc),
				true);// 加载数据并保护表格。
		$('#sellerInvcMTable').datagrid('hideColumn', 'ck');
	}else{
		SCFUtils.loadGridData('cntPmtInvcMTable', SCFUtils.parseGridData(data.obj.invc),
				true);// 加载数据并保护表格。
		$('#cntPmtInvcMTable').datagrid('hideColumn', 'ck');
	}
	lookSysRelReason();
}


function getBuyerLmt(data) {
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000375',
			sysRefNo : data,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#buyerlmtBal').numberbox('setValue', data.rows[0].lmtBal);
				$('#buyerlmtAvl').numberbox('setValue',
						data.rows[0].lmtAllocate);
				$('#buyerlmtBalHd').numberbox('setValue', data.rows[0].lmtBal);
				$('#buyerlmtAvlHd').numberbox('setValue',
						data.rows[0].lmtAllocate);
			}
		}
	};
	SCFUtils.ajax(opts);
}

function pageOnPreLoad(data) {
	if(data.obj.pmtTp == 0){
		$("#cntPmtInvcMDiv").parent().parent().attr("style","display:none");
	}else{
		$("#sellerInvcMDiv").parent().parent().attr("style","display:none");
		$("tr[id=Tr1]").hide();
	}
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('pmtForm', data);
	if($("#pmtTp").val()==0){//卖方
		SCFUtils.loadGridData('sellerInvcMTable', SCFUtils.parseGridData(data.obj.invc),
				false);
		$("#sellerInvcMTable").datagrid("selectAll");
	}else{//买方
		SCFUtils.loadGridData('cntPmtInvcMTable', SCFUtils.parseGridData(data.obj.invc),
				false);
		$("#cntPmtInvcMTable").datagrid("selectAll");
	}
	// $('#payPrinAmt').numberspinner('setValue', 0);//本金总金额
	// $('#payIntAmt').numberspinner('setValue', 0); //利息总金额
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	$('#sysRelReason').textbox('setValue',data.obj.sysRelReason);
//	loadTable();
	lookSysRelReason();
}


function pageOnReleasePageLoad(data) {
	if(data.obj.pmtTp == 0){
		$("#cntPmtInvcMDiv").parent().parent().attr("style","display:none");
	}else{
		$("#sellerInvcMDiv").parent().parent().attr("style","display:none");
		$("tr[id=Tr1]").hide();
	}
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('pmtForm', row);
	if(relQueryIntE().length > 0){
		$("#intSysRefNo").val(relQueryIntE().sysRefNo);
	}
	$("#payIntTp").val(queryCntrctInfo(data.obj.cntrctNo).payIntTp);
	var selId = $("#selId").val();
	getSellerHKH(selId);
	var busiTp = $("#busiTp").val();
	reLoadTable();
	if($("#pmtTp").val()==0){
		$('#sellerInvcMTable').datagrid('hideColumn', 'ck');
		$('#sellerInvcMTable').datagrid('selectAll');
		SCFUtils.setDatagridReadonly('sellerInvcMTable', true);
	}else{
		$('#cntPmtInvcMTable').datagrid('hideColumn', 'ck');
		$('#cntPmtInvcMTable').datagrid('selectAll');
		SCFUtils.setDatagridReadonly('cntPmtInvcMTable', true);
	}
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	if(data.obj.pmtTp == 1){
		accept();//加载的时候直接计算
	}else if(data.obj.pmtTp == 0){
		getGridData();
	}
	$("#ttlLoanBal").numberbox("setValue",getTtlLoanBal());
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleasePreLoad(data) {
	if(data.obj.pmtTp == 0){
		$("#cntPmtInvcMDiv").parent().parent().attr("style","display:none");
	}else{
		$("#sellerInvcMDiv").parent().parent().attr("style","display:none");
		$("tr[id=Tr1]").hide();
	}
	var selId = $("#selId").val();
	getSellerHKH(selId);
	SCFUtils.loadForm('pmtForm', data);
	var busiTp = $("#busiTp").val();
	reLoadTable();
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}


function pageOnInt(data) {
	ajaxBox();
	ajaxTable();
	SCFUtils.setComboReadonly('OldSysRelReason', true);
	SCFUtils.setFormReadonly('#pmtForm',true);	
	SCFUtils.setComboReadonly('isConfirm', false);
	SCFUtils.setTextboxReadonly('confirmOp', false);
	$('tr[id=Tr2]').hide();
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

function checkDataGrid() {
	var flag = false;
	var ttlPmtAmt = $('#ttlPmtAmt').numberbox('getValue')
	if (!SCFUtils.Math(ttlPmtAmt, 0, 'sub') > 0) {
		flag = true;
	}
	return flag;
}


function contains(a, obj) {
	for ( var i in a) {
		if (a[i].sysRefNo === obj) {
			return true;
		}
	}
	return false;
}

function getIndex(a, obj) {
	for ( var i in a) {
		if (a[i].sysRefNo === obj) {
			return i;
		}
	}
	return;
}

/*
 * 获取买方额度信息
 */
function getBuyerLmtData(){
	var buyerLmt = {};// 添加买方额度信息
	buyerLmt._total_rows = 1;
	var obj = {};
	var lmtTp = '0';
	if('RE'===SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE ){
		obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		obj.lmtBal = relQueryLmtE(lmtTp)[0].lmtBal ;//买方额度余额
		obj.lmtAllocate = relQueryLmtE(lmtTp)[0].lmtAllocate ;//本次占用额度
		obj.lmtRecover = relQueryLmtE(lmtTp)[0].lmtRecover ;//归还额度

	}else{
		if('FP'===SCFUtils.FUNCTYPE){
			obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
		}else{
			obj.sysRefNo = $('#buyerLmtSysRefNo').val();
		}
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#ttlPmtAmt').numberbox('getValue'),'add') ;//买方额度余额=原买方额度余额+还款金额
		obj.lmtAllocate = parseFloat(SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#ttlPmtAmt').numberbox('getValue'),'sub')) ;//本次占用额度=原来占用额度-还款金额
		
		obj.lmtRecover = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtRecover,$('#ttlPmtAmt').numberbox('getValue'),'add') ;//归还额度=原归还额度+还款金额

	}
	obj.ttlAllocate = 0;//已占用额度
	obj.theirRef = $('#sysRefNo').val();//主页流水号
	
	buyerLmt['rows0'] = obj;
	return buyerLmt;

}
/*
 * 获取卖方额度信息
 */
function getSellerData() {
	querySellerLmt();
	griddata = SCFUtils.getGridData("invcMTable", false);
	var invLoanBalHd = '';
		$.each(SCFUtils.parseGridData(griddata), function(i, n) {
			var stuLoanAmt = SCFUtils.Math(n.invLoanBalHd,n.invLoanBal,'sub');
			invLoanBalHd = SCFUtils.Math(invLoanBalHd,stuLoanAmt,'add');
			 
	});
	
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
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtBal,invLoanBalHd,'add') ;//卖方额度余额=原卖方额度余额+融资余额
		obj.lmtAllocate = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtAllocate,invLoanBalHd,'sub') ;//本次占用额度=原来占用额度-融资余额
		obj.lmtRecover = SCFUtils.Math(relQueryLmtMRe(lmtTp)[0].lmtRecover,invLoanBalHd,'add') ;//归还额度=原归还额度+融资余额

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
	var buyerId = $("#buyerId").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000671',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp,
			buyerId : buyerId
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
function relQueryLmtMRe(lmtTp) {
	var cntrctNo = $("#cntrctNo").val();
	var selId = $("#selId").val();
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
	if($("#pmtTp").val()==1){
		var ttlLoanBal = $('#ttlPmtAmt').numberbox('getValue');// 核销应收账款总额
		if (ttlLoanBal <= 0) {
			SCFUtils.alert('核销金额必须大于0！');
			return;
		}
	}
	if($("#isConfirm").combobox("getValue") == "" || $("#isConfirm").combobox("getValue")==null){
		SCFUtils.alert('请给出是否确认！');
		return;
	}
	var mainData = SCFUtils.convertArray('pmtForm');
	var cntrctNo = mainData.cntrctNo;// 协议编号
	var buyerId = mainData.buyerId;

	// 协议相关信息
	var cntrct = queryCntrctInfo(cntrctNo);

		if (mainData.isConfirm == 0) {// 确认
			$.extend(mainData, {
				'confirmFlag' : 2 //行内确认=2
			});
		}else if (mainData.isConfirm == 1) {// 不确认
			$.extend(mainData, {
				'confirmFlag' : 0 //行内不确认=0
			});
		}
//			addEventTimes();
			var grid = {};
			var griddata;
			if ('RE' === SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE) {
				if(mainData.pmtTp == 0){
					griddata = SCFUtils.getGridData('sellerInvcMTable');
				}else{
					griddata = SCFUtils.getGridData('cntPmtInvcMTable');
				}
			} else {
				if (checkDataGrid()) {
					return;
				}
				if(mainData.pmtTp == 0){
					griddata = SCFUtils.getSelectedGridData('sellerInvcMTable', false);
				}else{
					griddata = SCFUtils.getSelectedGridData('cntPmtInvcMTable', false);
				}
			}
			var selId = $('#selId').val();
			var selName = $('#selNm').val();
			var sysRefNo = $('#sysRefNo').val();
			var ccy = $('#lmtCcy').combobox('getValue');
			var ttlLoanBal = $('#ttlPmtAmt').numberbox('getValue');
			$.extend($.extend(mainData, grid), {
				"custNo" : selId
			}, {
				"custNm" : selName
			}, {
				"rerNo" : sysRefNo
			}, {
				"refNo" : sysRefNo
			}, {
				"trxCcy" : ccy
			}, {
				"trxAmt" : ttlLoanBal
			}, {
				"expTrxAmt" : ttlLoanBal
			}, {
				"clType" : "O"
			}, {
				"tdType" : "R"
			}, {
				"trxDate" : SCFUtils.getcurrentdate()
			});
			//当不确认的时候覆盖invLoanBal invLoanAval currInt currPayInt 
				if (mainData.isConfirm == 1 && mainData.pmtTp==1) {// 不确认
					$.each(griddata,function(i,n){
						var index = $("#cntPmtInvcMTable").datagrid('getAllRowIndex', n);
						if(index<0){
							return;
						}
						$.extend(n, {
							'invSts' : 7, 
							'invLoanBal' : n.invLoanBalHd,
							'invLoanAval' : n.invLoanAvalHd,
							'currInt' : 0,
							'currPayInt' : 0
						});
					});
				}
				if (mainData.isConfirm == 1 && mainData.pmtTp==0) {// 不确认
					$.each(griddata,function(i,n){
						var index = $("#sellerInvcMTable").datagrid('getAllRowIndex', n);
						if(index<0){
							return;
						}
						$.extend(n, {
							'invSts' : 8, 
							'invLoanBal' : n.invLoanBalHd,
							'invLoanAval' : n.invLoanAvalHd,
							'currInt' : 0,
							'currPayInt' : 0
						});
					});
				}
			grid.invc = SCFUtils.json2str(griddata);
			grid.loan = SCFUtils.json2str(getLoanMData());
			if (cntrct.payIntTp == "2") {// 利随本清
				grid.int = SCFUtils.json2str(getIntData());// 打包利息表data
			} else if (cntrct.payIntTp == "1") {
				grid.int = {};// 打包利息表data
			}
			// 打包买方额度数据
			// grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
			// 打包卖方额度数据
			// grid.sellerLmt = SCFUtils.json2str(getSellerData());
			$.extend(mainData, grid);
			return mainData;
}

/**
 * 提交时给还款子表的eventTimes字段赋值 还款子表的eventTimes值为发票E表中最大sysEventTImes+1
 */


function acceptSaved(accetpFlag) {
	if (accetpFlag == "true") {
		return false;
	} else {
		SCFUtils.alert('请您点击接受改变按键以便进行下一步操作！');
		return true;
	}
}


function reLoadTable() {//复核时候的查询
	var invPmtRef = $('#sysRefNo').val();
	if($("#pmtTp").val()==0){//卖方还款
		var queryId = 'Q_P_000710';
	}else if($("#pmtTp").val() == 1){//买方还款
		var queryId = 'Q_P_000708';
	}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : queryId,
			invPmtRef : invPmtRef
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				if ($("#pmtTp").val() == 0) {
					SCFUtils.loadGridData('sellerInvcMTable', data.rows, true,
							true);// 复核时候保护表格
					forEach(data.rows, 'sellerInvcMTable');
				} else {
					SCFUtils.loadGridData('cntPmtInvcMTable', data.rows, true,
							true);// 复核时候保护表格
					forEach(data.rows, 'cntPmtInvcMTable');
				}
			}
		}
	};
	SCFUtils.ajax(options);
}


function loadTable() {//买方---把卖方剥离出去 
	var invPmtRef = $('#sysRefNo').val();
	if($("#pmtTp").val()==0){//卖方还款
		var queryId = 'Q_P_000709';
	}else if($("#pmtTp").val() == 1){//买方还款
		var queryId = 'Q_P_000701';
	}
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : queryId,
				invPmtRef : invPmtRef,
				cacheType : 'non'
			},
			callBackFun : function(data) {
				if (data.success) {
					if (!SCFUtils.isEmpty(data.rows)) {
						if($("#pmtTp").val()==0){//卖方还款
							SCFUtils.loadGridData('sellerInvcMTable', data.rows,
									true, true);
							forEach(data.rows,'sellerInvcMTable');
						}else if($("#pmtTp").val() == 1){//买方还款
							SCFUtils.loadGridData('cntPmtInvcMTable', data.rows,
									true, true);
							forEach(data.rows,'cntPmtInvcMTable');
						}
					} else {
						SCFUtils.alert("没有符合的应收账款");
					}
				} else {
					SCFUtils.alert("查询失败");
				}
			}
		};
		SCFUtils.ajax(options);
}


function loadGridData(data, flag1, flag2) {
	SCFUtils.loadGridData('invcMTable', data, flag1, flag2);
}

function forEach(data,tableId) {//买方还款
	FPLoadTable = SCFUtils.Math(FPLoadTable, 1, 'add');
		$.each(data,function(i,n){
			var options = {
					url : SCFUtils.AJAXURL,
					data : {
						queryId : 'Q_P_000705',// 查询invcLoan表和Loan表
						invRef : n.invRef,
						cacheType : 'non'
					},
					callBackFun : function(data) {
						if (data.success) {
							if (!SCFUtils.isEmpty(data.rows)) {
								$('#'+tableId).datagrid(
										'updateRow',
										{
											index : i,
											row : {
												invLoanBalHd : n.invLoanBal,
												invBalHd : n.invBal,
												invLoanAvalHd : n.invLoanAval,
//												invPmtRef : invPmtRef,
//												invRef : n.sysRefNo,
//												sysRefNo : n.sysRefNo + invPmtRef,
												lastPayDt : SCFUtils.getcurrentdate(),
												loanId : data.rows[0].loanId,
												loanRt : data.rows[0].loanRt,
												loanValDt : data.rows[0].loanValDt,
												invLoanRefNo : data.rows[0].invLoanRefNo,
												loanAmt : data.rows[0].loanAmt,
												loanAmtHd : data.rows[0].loanAmt,
												invSts : 9,
											}
										});
							}
						}
					}
				};
				SCFUtils.ajax(options);
		});
}

/*
 * FP进来时候的foreach给临时变量赋值
 * 查收还款为确认功能。不能修改还款金额等等不需要forEachRe
 */
function forEachRe(data) {
	var invPmtRef = $('#sysRefNo').val();
	var date = getDate(new Date());
	$.each(data, function(i, n) {
		var loanId = "";
		var invcLoanId = "";
		var invLoanBalHd = "";
		var invBalHd = "";
		var invLoanAvalHd = "";
		var loanValDt = "";
		var loanPerc = "";
		var loanRt = "";
		var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000648',//new 
				invRef : n.invRef
			},
			callBackFun : function(data) {
				if (SCFUtils.isEmpty(data.rows[0])) {
					SCFUtils.alert("没有符合的发票融资信息");
				} else {
					loanId = data.rows[0].invcLoanId;
					invcLoanId = data.rows[0].sysRefNo;
					invLoanBalHd = data.rows[0].invLoanBal;
					invBalHd = data.rows[0].invBal;
					invLoanAvalHd = data.rows[0].invLoanAval;
					loanValDt = data.rows[0].loanValDt;
					loanPerc = data.rows[0].loanPerc;
					loanRt = data.rows[0].loanRt;
				}
				$('#invcMTable').datagrid(
						'updateRow',
						{
							index : i,
							row : {
								invLoanBalHd : invLoanBalHd,
								invBalHd : invBalHd,
								invLoanAvalHd : invLoanAvalHd,
								loanId : loanId,
								invLoanRefNo : invcLoanId,
								invPmtRef : $("#sysRefNo").val(),
								lastPayDt : SCFUtils.getcurrentdate(),
								loanValDt : loanValDt,
								loanPerc :  loanPerc,
								loanRt : loanRt
							}
						});
			}
		};
		SCFUtils.ajax(opt);
	});
}

function ajaxTable() {
	var sellerOptions = {
			toolbar : '#toolbar',
			idField : 'sysRefNo',
			rownumbers : true,
			singleSelect : false,// 只选一行
			checkOnSelect : true,
			pagination : true,// 是否分页
			fitColumns : true,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			//onClickRow : onClickRow,
			columns : getSellerColums()
		};
		$('#sellerInvcMTable').datagrid(sellerOptions);
	
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹ffv
		singleSelect : false,// 只选一行
		idField : 'sysRefNo',
		columns : getCntPmtColumns()
	};
	$('#cntPmtInvcMTable').datagrid(options);
}



var editIndex = undefined;
var isFpLoad = false;
function accept() {
	$('#accetpFlag').val("true");
	totalIntAmt = 0.0000;
	totalStruLoanAmt = 0.0000;
	var data = $('#cntPmtInvcMTable').datagrid('getSelections');
//	endEditing();// 结束编辑。
	$.each(data, function(i, n) {
		var rowIndex = $('#cntPmtInvcMTable').datagrid('getRowIndex', n);
		if($("#payIntTp").val() == 2){//利随本清
			//计算本次应收利息总额
			var trxDt = SCFUtils.getcurrentdate();//得到当前还款日
//			本次应收利息公式： currInt = n.ttlLoanBalHd*(pmtDt-n.loanValDt+1)*n.loanRt/360;
			var days = SCFUtils.DateDiff(trxDt,SCFUtils.dateFormat(n.loanValDt, 'yyyy-MM-dd'));
			var loanRtRe = SCFUtils.Math(n.loanRt,0.01,'mul');
			var loanRtDay = SCFUtils.Math(loanRtRe,360,'div');
			var currInt = SCFUtils.Math(SCFUtils.Math(n.invLoanBalHd,days,'mul'),loanRtDay,'mul');//本次应收利息总额
			totalIntAmt = SCFUtils.Math(totalIntAmt,currInt,'add');
			/*
			 * 假如(冲销金额*融资比例)大于（融资余额+应收利息） 实收利息=应收利息，融资余额=0
			 * 假如(融资余额>(冲销金额*融资比例)>应收利息) 实收利息=应收利息，融资余额=原融资余额-（冲销金额-实收利息）
			 * 假如((冲销金额*融资比例)<应收利息) 实收利息=冲销金额，融资余额=不变
			 */
			var struLoanReal = SCFUtils.Math(n.struLoanAmt,n.loanPerc / 100.0000, 'mul');
			var invBallc = n.invBal;//应收账款余额(直接从invcM表带出，在外网发起时就计算完成)
			if(SCFUtils.Math(struLoanReal,SCFUtils.Math(n.invLoanBalHd,currInt,'add'),'sub')>0){
				var currPayInt = currInt;
				var invLoanBallc = 0;
				// 最大可融资额=应收账款余额*融资比例-融资余额	
				var invLoanAvallc = SCFUtils.Math(SCFUtils.Math(invBallc,	n.loanPerc / 100.0000, 'mul'),	invLoanBallc,'sub');
				if(SCFUtils.Math(invLoanAvallc,0,'sub')<0){invLoanAvallc=0;}
			}else if (SCFUtils.Math(struLoanReal,currInt, 'sub') > 0) {
				// modify by longchao for bug 124	
				var currPayInt = currInt;
				var invLoanBallc = SCFUtils.Math(n.invLoanBalHd,SCFUtils.Math(struLoanReal,currInt,'sub'),'sub');
				// 最大可融资额=应收账款余额*融资比例-融资余额	
				var invLoanAvallc = SCFUtils.Math(SCFUtils.Math(invBallc,	n.loanPerc / 100.0000, 'mul'),	invLoanBallc,'sub');
				if(SCFUtils.Math(invLoanAvallc,0,'sub')<0){invLoanAvallc=0;}
			} else if(SCFUtils.Math(struLoanReal,currInt, 'sub') < 0){
				var currPayInt = struLoanReal;
				var invLoanBallc = n.invLoanBalHd;
				// 最大可融资额=应收账款余额*融资比例-融资余额	
				var invLoanAvallc = SCFUtils.Math(SCFUtils.Math(invBallc,	n.loanPerc / 100.0000, 'mul'),	invLoanBallc,'sub');
				if(SCFUtils.Math(invLoanAvallc,0,'sub')<0){invLoanAvallc=0;}
			}
			$('#cntPmtInvcMTable').datagrid(
					'updateRow',
					{
						index : rowIndex,
						row : {
							invBal :invBallc,
							invLoanBal : invLoanBallc,
							invLoanAval : invLoanAvallc,
							loanAmt : SCFUtils.Math(n.loanAmtHd, n.struLoanAmt,'sub'),
							currInt : currInt,
							currPayInt : currPayInt,
							trxDt : trxDt
						}
					});
		}else{
			if (SCFUtils.Math(n.invLoanBalHd, SCFUtils.Math(n.struLoanAmt,
					n.loanPerc / 100.0000, 'mul'), 'sub') > 0) {
				// modify by longchao for bug 124	
				var invBallc = n.invBal;//应收账款余额
				var invLoanBallc = SCFUtils.Math(n.invLoanBalHd, 
						SCFUtils.Math(n.struLoanAmt, n.loanPerc / 100.0000, 'mul'), 'sub')//融资余额
						// 最大可融资额=应收账款余额*融资比例-融资余额	
						var invLoanAvallc = SCFUtils.Math(SCFUtils.Math(invBallc,	n.loanPerc / 100.0000, 'mul'),	invLoanBallc,'sub');
				if(SCFUtils.Math(invLoanAvallc,0,'sub')<0){invLoanAvallc=0;}
				$('#cntPmtInvcMTable').datagrid(
						'updateRow',
						{
							index : rowIndex,
							row : {
								invBal : invBallc,
								invLoanBal : invLoanBallc,
								invLoanAval : invLoanAvallc,
								loanAmt : SCFUtils.Math(n.loanAmtHd, n.struLoanAmt,
								'sub'),
								currInt : 0,
								currPayInt : 0,
								trxDt : SCFUtils.getcurrentdate()
								
							}
						});
			} else {
				// 最大可融资额=应收账款余额*融资比例-融资余额		（没有减融资余额吧）
				var invLoanAvallc1 = SCFUtils.Math(SCFUtils.Math(n.invBalHd, n.struLoanAmt,'sub'),n.loanPerc / 100.0000, 'mul');
				if(SCFUtils.Math(invLoanAvallc,0,'sub')<0){invLoanAvallc=0;}
				$('#cntPmtInvcMTable').datagrid(
						'updateRow',
						{
							index : rowIndex,
							row : {
								invBal : SCFUtils.Math(n.invBalHd, n.struLoanAmt,
								'sub'),
								invLoanBal : 0,
								invLoanAval : invLoanAvallc1,
								loanAmt : SCFUtils.Math(n.loanAmtHd, n.struLoanAmt,
								'sub'),
								currInt : 0,
								currPayInt : 0,
								trxDt : SCFUtils.getcurrentdate()
							}
						});
			}
		}
	});
	//利随本清将利息更新到主界面
	$("#payIntAmt").numberbox("setValue",totalIntAmt);
	// $('#payTranAmt').numberbox('setValue',totalPayTranAMt);
	// $('#payBillAmt').numberbox('setValue',totalPayBillAmt);
//	var lmtAmt = $('#lmtAmt').numberbox('getValue');
//	var lmtBal = $('#lmtBal').numberbox('getValue');
//	var lmtAllocate = $('#lmtAllocate').numberbox('getValue');
//	var temp = SCFUtils.Math(lmtAmt, lmtBal, 'sub');
//	if (SCFUtils.Math(temp, totalStruLoanAmt, 'sub') > 0) {
//		$('#lmtBal').numberbox('setValue',
//				SCFUtils.Math(lmtBal, totalStruLoanAmt, 'add'));
//		$('#lmtAllocate').numberbox('setValue',
//				SCFUtils.Math(lmtAllocate, totalStruLoanAmt, 'sub'));
//	} else {
//		$('#lmtBal').numberbox('setValue', lmtAmt);
//		$('#lmtAllocate').numberbox('setValue', 0);
//	}
}

// 根据发票流水号从invcLoan表中查询融资起始日
function getLoanDt(invRef) {
	var loanDt = SCFUtils.getcurrentdate();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000183',
			invRef : invRef
		},
		callBackFun : function(data) {
			if (data.success) {
				if (data.rows.length > 0) {
					loanDt = data.rows[0].loanValDt;
				}

			}
		}
	};
	SCFUtils.ajax(options);
	return loanDt;
}

function getSellerHKH(selId) {
	var acOwnerid = selId;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_S_SELACNO_001',
			acOwnerid : acOwnerid
		},
		callBackFun : function(data) {
			if (data.success) {
				// $('#roleIdBox').combobox('loadData', data.rows);
				// 取买方表中的BUYER_ID，BUYER_NM
				// 卖方还款账号
				if (data.rows.length > 0) {
					$("#acNo").combobox('loadData', data.rows);
				}

			}
		}
	};
	SCFUtils.ajax(options);
}


//查询协议表
function queryCntrctInfo(cntrctNo) {
	var obj = {};
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

//查询额度关联关系信息表
function queryCntrctSbrInfo(cntrctNo, buyerId) {
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000560',
			cntrctNo : cntrctNo,
			buyerId : buyerId,
			cacheType : 'non'
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

/*
 * 查询扣款账号信息入int表
 * 主要查询开户行开户名称和账户名称
 */
function acNoInfo(){
	var acNo = $("#acNo").combobox('getValue');
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000579',//根据acNo去查询acBkNm
			acNo : acNo
		},
		callBackFun : function(data) {
			if (data.success) {
				obj = data.rows;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

/*
 * 打包利息信息入Int表
 * 公式：CURR_PAY_INT= Ttl_Loan_Bal*【（还款日-起息日）+1】* LOAN_RT/360
 * 获取loanMtable中的本次还款利息总和  = sum(payIntAmt)
 */
function getIntData(){
	//计算sum(payIntAmt)
	if($("#pmtTp").val() == 0){
		var invcRows = SCFUtils.getGridData('sellerInvcMTable');//打包全部
	}else {
		var invcRows = SCFUtils.getGridData('cntPmtInvcMTable');//打包全部
	}
	var currPayInt = 0;
	var currInt = 0;
	var loanValDt="";
	$.each(invcRows,function(i,n){
		currPayInt = SCFUtils.Math(currPayInt,n.currPayInt,'add');
		currInt = SCFUtils.Math(currInt,n.currInt,'add');
	});
	var int = {};// 添加费用表
	int._total_rows = 1;//total_rows不给值会默认没有数据，一笔还款只有一条记录
	//生成int的流水号，intSysRefNo
	var options = {};
	var trxDt;
	if('PM' === SCFUtils.FUNCTYPE){
		options.data = {
				refName : 'IntRef',
				refField : 'intSysRefNo',
				cacheType : 'non'
		};
		getIntSysRefNo(options);
		trxDt = SCFUtils.getcurrentdate();
		loanValDt = getMinLoanValDt();//利息产生时间
	}else{
		trxDt = relQueryIntE().trxDt;
		if('FP' === SCFUtils.FUNCTYPE){
			loanValDt = getMinLoanValDt();//利息产生时间
		}else{
			loanValDt = relQueryIntE().createDt;
		}
	}
		var obj = {};
			obj.sysRefNo = $('#intSysRefNo').val();//PM的时候新增，RE.FP.DP都是带过来的值
			obj.trxDt = trxDt;// trxDt = 当前日期
			obj.selId = $("#selId").val();//得到当前页面的selId
			obj.selAcNo = acNoInfo()[0].acNo;
			obj.selAcNm = acNoInfo()[0].acNm;
			obj.selAcBkNm = acNoInfo()[0].acBkNm;
			obj.busiTp = $("#busiTp").combobox("getValue");
			obj.intTp = 0;//正常利息
			obj.intCcy = $('#lmtCcy').combobox("getValue");
			obj.currInt = currPayInt;//本次应收利息
			obj.currPayInt = currPayInt;//本次实收利息，利随本清肯定收息；预收息不记录
			obj.intPayFlg = 1;//应收已收
			obj.theirRef = $("#sysRefNo").val();
			obj.createDt = loanValDt;//利息产生时间
			obj.payIntTp = 2;//new 收取方式2利随本清
			obj.overdueInt = '';//本次逾期利息
			obj.remark = '';//备注
			obj.currIntDt = getDate(new Date());//本次利息应收日期
			obj.currIntPayDt = getDate(new Date());//本次利息实收日期
		int['rows0'] = obj;
	return int;
}

/*
 * 复核时候查询INT的E表（catalog双表查询有冲突）
 */
function relQueryIntE(){
	var selId = $("#selId").val();
	var sysRefNo = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000617',
			selId : selId,
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				obj = data.rows[0];
				obj.length = 1;
			}else{
				obj.length = 0;
			}
		}
	};
	SCFUtils.ajax(options);
	return obj;
}

/*
 * 得到表单的最早的那个起息日
 */
function getMinLoanValDt(){
	if($("#pmtTp").val() == 0){
		var data = $('#sellerInvcMTable').datagrid('getSelections');
	}else {
		var data = $('#cntPmtInvcMTable').datagrid('getSelections');
	}
	var minLoanValDt = data[0].loanValDt;
	$.each(data, function(i, n){
		if(SCFUtils.DateDiff(n.loanValDt,minLoanValDt)<0){
			minLoanValDt = n.loanValDt;
		}
	});
	return minLoanValDt;
}

/**
 * 打包loan数据。更新loanM表
 * @returns {___anonymous48325_48326}
 */
function getLoanMData(){
	if('PM' === SCFUtils.FUNCTYPE || 'FP' === SCFUtils.FUNCTYPE){
		if($("#pmtTp").val() == 0){
			var rows = SCFUtils.getSelectedGridData('sellerInvcMTable', false);
		}else {
			var rows = SCFUtils.getSelectedGridData('cntPmtInvcMTable', false);
		}
	}else if('DP' === SCFUtils.FUNCTYPE || 'RE' === SCFUtils.FUNCTYPE){
		if($("#pmtTp").val() == 0){
			var rows = SCFUtils.getGridData('sellerInvcMTable');
		}else {
			var rows = SCFUtils.getGridData('cntPmtInvcMTable');
		}
	}
	var repeatLoanId = getRepeatLoanId(rows);//得到去除重复的loanId数组
	var loan = {};// 融资信息表
	for(var i=0;i<repeatLoanId.length;i++){
		var ttlInvLoanBal = 0;
		var obj={};
		var loanId = repeatLoanId[i];
		$.each(rows,function(i,n){
			if(i == '_total_rows'){
				return true;
			}
			if(loanId == n.loanId){
				ttlInvLoanBal = SCFUtils.Math(ttlInvLoanBal,n.invLoanBal,'add');
			}
		});
		obj.sysRefNo = loanId;
		obj.ttlLoanBal = ttlInvLoanBal;
		loan['rows'+i] = obj;
	}
	loan._total_rows = repeatLoanId.length;
	return loan;
}


/**
 * 得到datagrid中重复的loanID
 * @param data
 * @returns {Array}
 */
function getRepeatLoanId(data){
	 var tmp={},b=[]; 
	 $.each(data,function(i,n){
		 if(i == '_total_rows'){
				return true;
			}
		 if(!tmp[n.loanId]){
	            b.push(n.loanId);
	            tmp[n.loanId]=!0;
	        }
	 });
	return b;
}

/**
 * 是否确认的改变事件
 * 1.意见框的必输性改变
 * 2.更改发票状态
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
	if($("#pmtTp").val() == 0){
		var griddata = SCFUtils.getGridData('sellerInvcMTable');
	}else {
		var griddata = SCFUtils.getGridData('cntPmtInvcMTable');
	}
	$.each(griddata,function(i,n){
		if($("#isConfirm").combobox("getValue") == 0 && $("#pmtTp").val()==1){
			var index = $("#cntPmtInvcMTable").datagrid('getAllRowIndex', n);
			if(index<0){
				return;
			}
			$('#cntPmtInvcMTable').datagrid(
					'updateRow',
					{
						index : index,
						row : {
							invSts : 9
						}
					});
		}else if($("#isConfirm").combobox("getValue") == 0 && $("#pmtTp").val()==0){
			var index = $("#sellerInvcMTable").datagrid('getAllRowIndex', n);
			if(index<0){
				return;
			}
			$('#sellerInvcMTable').datagrid(
					'updateRow',
					{
						index : index,
						row : {
							invSts : 9
						}
					});
		}
	});
	
}


function getIntSysRefNo(options){

	if (options.force
			|| 'ADD' === SCFUtils.OPTSTATUS || 'EDIT' === SCFUtils.OPTSTATUS
			&& ('PM' === SCFUtils.FUNCTYPE || 'MA' === SCFUtils.FUNCTYPE
					|| 'MM' === SCFUtils.FUNCTYPE || 'PA' === SCFUtils.FUNCTYPE|| 'FP' === SCFUtils.FUNCTYPE)) {
		var config = {};
		config.reqid = 'I_S_000001';
		config.data = options.data;
		config.onSuccess = function(data) {
			if (options.onSuccess && $.isFunction(options.onSuccess)) {
				options.onSuccess(data);
			} else {
				$.each(data, function(i, obj) {
					for ( var item in obj) {
						$('#' + item).val(obj[item]);
						SCFUtils.setTextReadonly(item, true);
					}
				});
			}
		};

		SCFUtils.getData(config);
	}
}

//卖方还款
function getGridData(){
	$('#accetpFlag').val("true");
	totalPayAmt = 0.0000;
	var data = $('#sellerInvcMTable').datagrid('getSelections');
//	endEditing();// 结束编辑。
	$.each(data, function(i, n) {
		var rowIndex = $('#sellerInvcMTable').datagrid('getRowIndex', n);
		if($("#payIntTp").val() == 2){//利随本清
			//计算本次应收利息总额
			var trxDt = SCFUtils.getcurrentdate();//得到当前还款日
//			本次应收利息公式： currInt = n.ttlLoanBalHd*(pmtDt-n.loanValDt+1)*n.loanRt/360;
			var days = SCFUtils.DateDiff(trxDt,SCFUtils.dateFormat(n.loanValDt, 'yyyy-MM-dd'));
			var loanRtRe = SCFUtils.Math(n.loanRt,0.01,'mul');
			var loanRtDay = SCFUtils.Math(loanRtRe,360,'div');
			var currInt = SCFUtils.Math(SCFUtils.Math(n.invLoanBalHd,days,'mul'),loanRtDay,'mul');//本次应收利息总额
			var currPayInt = currInt;
			$('#invcMTable').datagrid(
					'updateRow',
					{
						index : rowIndex,
						row : {
							currInt : currInt,
							currPayInt : currPayInt,
							trxDt : trxDt
						}
					});
		}else{
				$('#invcMTable').datagrid(
						'updateRow',
						{
							index : rowIndex,
							row : {
								currInt : 0,
								currPayInt : 0,
								trxDt : SCFUtils.getcurrentdate()
								
							}
						});
			} 
	});
	// $('#payTranAmt').numberbox('setValue',totalPayTranAMt);
	// $('#payBillAmt').numberbox('setValue',totalPayBillAmt);
//	var lmtAmt = $('#lmtAmt').numberbox('getValue');
//	var lmtBal = $('#lmtBal').numberbox('getValue');
//	var lmtAllocate = $('#lmtAllocate').numberbox('getValue');
//	var temp = SCFUtils.Math(lmtAmt, lmtBal, 'sub');
//	if (SCFUtils.Math(temp, totalStruLoanAmt, 'sub') > 0) {
//		$('#lmtBal').numberbox('setValue',
//				SCFUtils.Math(lmtBal, totalStruLoanAmt, 'add'));
//		$('#lmtAllocate').numberbox('setValue',
//				SCFUtils.Math(lmtAllocate, totalStruLoanAmt, 'sub'));
//	} else {
//		$('#lmtBal').numberbox('setValue', lmtAmt);
//		$('#lmtAllocate').numberbox('setValue', 0);
//	}
}

function getSellerColums() {
	return [ [ {
		field : 'ck',
		checkbox : true
	}, {
		field : 'sysRefNo',
		title : '交易流水号',
		width : 150,
		hidden : true
	}, {
		field : 'invNo',
		title : '应收账款编号',
		width : '10%'
	}, {
		field : 'payPrinAmt',
		title : '本次还本金',
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'currPayInt',
		title : '本次还利息',
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'payPrinAmtOld',
		title : '本次还本金Old(隐藏)',
		hidden : true,
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'pmtAmt',
		title : '本次还款金额',
		width : '10%',
		editor : {
			type : 'numberbox',
			options : {
				precision : 2
			},
		},
		formatter : ccyFormater
	}, {
		field : 'invCcy',
		title : '应收账款币别',
		width : '10%'
	}, {
		field : 'invAmt',
		title : '应收账款金额',
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'invBal',
		title : '应收账款余额',
		width : 100,
		hidden : true,
		formatter : ccyFormater
	}, {
		field : 'invValDt',
		title : '起算日',
		width : '10%',
		formatter : dateFormater
	}, {
		field : 'invDueDt',
		title : '到期日',
		width : '10%',
		formatter : dateFormater
	}, {
		field : 'loanValDt',
		title : '融资起算日',
		width : '10%',
		formatter : dateFormater
	}, {
		field : 'pmtDt',
		title : '还款日期',
		width : '10%',
		formatter : function() {
			return SCFUtils.getcurrentdate();
		}
	}, {
		field : 'invSts',
		title : '应收账款状态',
		width : 100,
		hidden :true
	}, {
		field : 'invLoanBal',
		title : '应收账款总融资余额',
		width : 120,
		hidden : true,
		formatter : ccyFormater
	}, {
		field : 'invLoanBalHD',
		title : '应收账款总融资余额',
		width : 120,
		hidden : true,
		formatter : ccyFormater
	}, {
		field : 'intAmt',
		title : '利息',
		width : '10%',
		formatter : ccyFormater
	}, {
		field : 'intAmtHD',
		title : '利息备用',
		width : 100,
		hidden : true,
		formatter : ccyFormater
	}, {
		field : 'eventTimes',
		title : 'eventTimes',
		width : 100,
		hidden : true
	}, {
		field : 'invcLoanRef',
		title : 'invcLoanRef',
		width : 100,
		hidden : true
	}, {
		field : 'loanRt',
		title : '融资利率（年化）',
		width : 60,
		hidden : true,
	}, {
		field : 'invLoanRefNo',
		title : '融资申请子表流水号',
		width : 110,
	}, {
		field : 'invRef',
		title : '应收账款ID',
		width : 60,
		hidden : true
	}, {
		field : 'loanId',
		title : '融资编号',
		width : 60,
		hidden : true
	} ] ];
}

function getCntPmtColumns(){

	
	
	return [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'struLoanAmt',
			title : '冲销应收账款金额',
			width : '12.5%',
			editor : {
				type : 'numberbox',
				options : {
					precision : 2
				},
			},
		}, {
			field : 'sysRefNo',
			title : '融资申请号',
			hidden : true
		}, {
			field : 'cntrctNo',
			title : '授信额度编号',
			hidden : true
		}, {
			field : 'loanId',
			title : '融资编号',
			hidden : true
		}, {
			field : 'invNo',
			title : '应收账款凭证号',
			width : '12.5%'
		}, {
			field : 'invCcy',
			title : '币种',
			width : '12.5%'
		}, {
			field : 'invBal',
			title : '应收账款余额',
			width : '12.5%',
			formatter : ccyFormater
		}, {
			field : 'invBalHd',
			title : '应收账款余额（临时）',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'invLoanBal',
			title : '融资余额',
			width : '12.5%',
			formatter : ccyFormater
		}, {
			field : 'invLoanBalHd',
			title : '融资余额（临时）',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'invLoanAval',
			title : '最大可融资金额',
			width : '12.5%',
			formatter : ccyFormater
		},{
			field : 'trxDt',
			title : '还款日期',
			width : '12.5%',
			formatter : dateFormater
		},{
			field : 'currInt',
			title : '本次应收利息',
			width : '12.5%',
			formatter : ccyFormater
		},{
			field : 'currPayInt',
			title : '本次实收利息',
			width : '12.5%',
			formatter : ccyFormater
		}, {
			field : 'loanRt',
			title : '融资利率（年化）',
			width : 60,
			hidden : true,
		}, {
			field : 'loanValDt',//=loanM.loanValDt
			title : '起息日',
			width : 60,
			hidden : true,
		}, {
			field : 'invLoanAvalHd',
			title : '最大可融资金额（临时）',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'lastPayDt',
			title : '上一次还款日期',
			width : 60,
			hidden : true,
			formatter : dateFormater
		}, {
			field : 'payAmt',
			title : '入账金额',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'loanPerc',
			title : '融资比例',
			width : 60,
			hidden : true,
		}, {
			field : 'invRef',
			title : '应收账款ID',
			width : 60,
			hidden : true
		}, {
			field : 'eventTimes',
			title : 'eventTimes',
			width : 100,
			hidden : true
		}, {
			field : 'sysEventTimes',
			title : 'sysEventTimes',
			width : 100,
			hidden : true
		}, {
			field : 'invPmtRef',
			title : '关联还款流水号',
			width : 110,
			hidden : true
		}, {
			field : 'invLoanRefNo',
			title : '融资申请子表流水号',
			width : 110,
			hidden : true
		}, {
			field : 'loanAmt',
			title : '融资申请子表融资金额',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'loanAmtHd',
			title : '融资申请子表融资金额(临时)',
			width : 110,
			hidden : true,
			formatter : ccyFormater
		}, {
			field : 'invSts',
			title : '发票状态',
			width : 110,
			hidden : true
		} ] ];
}

/**
 * 从datagrid中得到总的冲销后的融资余额
 */
function getTtlLoanBal(){
	var ttlLoanBal = 0;
	if($("#pmtTp").val() == 0){
		var griddata = SCFUtils.getGridData('sellerInvcMTable');
	}else {
		var griddata = SCFUtils.getGridData('cntPmtInvcMTable');
	}
	$.each(griddata, function(i, n) {
		var rowIndex = $('#sellerInvcMTable').datagrid('getRowIndex', n);
		if(rowIndex < 0){
			return;
		}
		ttlLoanBal = SCFUtils.Math(ttlLoanBal,n.invLoanBal,'add');
	});
	return ttlLoanBal;
}
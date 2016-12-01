function pageOnInt(data) {
	SCFUtils.setFormReadonly('#collatLoanDiv',true);
//	SCFUtils.setLinkbuttonReadonly('queryPatId',false);
//	SCFUtils.setLinkbuttonReadonly('queryPatnerId',false);
//	SCFUtils.setTextReadonly('custAcNo',false);
//	SCFUtils.setTextReadonly('marginAcNo',false);
	SCFUtils.setNumberspinnerReadonly('ttlLoanAmt',true);
	SCFUtils.setNumberspinnerReadonly('marginAmt',true);
//	SCFUtils.setNumberspinnerReadonly('marginAmt',false);
	SCFUtils.setDateboxReadonly('loanValDt',false);
	SCFUtils.setDateboxReadonly('loanDueDt',false);
	SCFUtils.setComboReadonly('selAcNo', false);
	SCFUtils.setTextboxReadonly('remark', false);
	ajaxBox();
	ajaxTable();
//	ajaxBillTable();
//	changeLoanTp();
	addQueryButton();
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

function addQueryButton(){
	if('FP'===SCFUtils.FUNCTYPE){
		$('#collatToolbar').show();
	}
}

function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	cntrctQueryAjax(data.obj.sysRefNo);
//	partyQueryAjax($('#patnerId').val());
	$('#collatToolbar').show();
	$('#cntrctNo').val(data.obj.sysRefNo);
//	checkNull();
	$('#trxDt').datebox('setValue', getDate(new Date()));
	//最低库存价值
	$('#numRegLowestVal').numberspinner('setValue',$('#regLowestVal').val());
	$('#pldPerc').numberspinner('setValue',data.obj.pldPerc);
//	beforeCale();
	var options={};
	options.data= {
			refName: 'cangDanLoan',
			refField:'sysRefNo'
				};
	SCFUtils.getRefNo(options);
	//Loan0001
	$('#sysRefNo').val(SCFUtils.setRefNo($("#sysRefNo").val(),4));
//	$('#marginAmt').numberspinner({    
//		onChange:changeAboutMarginAmt  
//	}); 
	SCFUtils.setNumberspinnerReadonly('marginAmt',true);
//	$('#ttlLoanAmt').numberspinner({    
//		onChange:changeAboutTtlLoanAmt  
//	}); 
	//申请融资金额  
	//$('#ttlLoanAmt').numberspinner('setValue', 0.00);
	loadTable();
	// 设置最大值限制
//	$('#ttlLoanAmt').numberbox({max:SCFUtils.Math(0,$('#maxLoanOpenAmt').numberbox('getValue'),'add')});
//	SCFUtils.setNumberspinnerReadonly('ttlLoanAmt',true);
	//queryBuyerInfo(data.obj.sysRefNo);
//	var date=new Date();
//	$("#loanValDt").datebox("setValue",SCFUtils.dateFormat(date,"yyyy-MM-dd"));//20160831融资起始日默认当前时间
	lookSysRelReason();
	loadCustAcno();
}

function loadCustAcno(){
	var custId = $('#selId').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000211',
				acOwnerid : custId,
				acTp : '1'
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$('#selAcNo').combobox('loadData', data.rows);	
				}
			}
		};
		SCFUtils.ajax(options);
}


function getDueDt(){
	var loanDueDt = $('#loanDueDt').datebox("getValue");
	var trxDt =$('#trxDt').datebox('getValue');
	if (SCFUtils.DateDiff(loanDueDt, trxDt)<0 ) {
		SCFUtils.alert("融资到期日不能小于当前日期,请修改");
		return false;
	}
}

var flagFp ;
function pageOnFPLoad(data){
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('collatLoanForm',row);
	//SCFUtils.setFormReadonly('#BillInfoDiv',true);
//	changeLoanTp();
	cntrctQueryAjaxFP(data.obj.cntrctNo);
//	partyQueryAjax($('#patnerId').val());
	$('#sysRefNo').val(data.obj.sysRefNo);
	$('#cntrctNo').val(data.obj.cntrctNo);
	$('#loanValDt').datebox('setValue',data.obj.loanValDt);
	$('#loanDueDt').datebox('setValue',data.obj.loanDueDt);
	$('#trxDt').datebox('setValue',data.obj.trxDt);
	$('#loanTp').combobox('setValue',data.obj.loanTp);
	$('#marginAmt').numberspinner('setValue',data.obj.marginAmt);
	$('#marginAcNo').val(data.obj.marginAcNo);
	//申请融资金额
//	checkNull();
//	$('#trxDt').datebox('setValue', getDate(new Date()));
//	beforeCale();
	$('#ttlLoanAmt').numberspinner('setValue',data.obj.ttlLoanBal);
	$('#ttlLoanBal').numberspinner('setValue',data.obj.ttlLoanBal);
	//协议内融资余额
	var openLoanAmt = SCFUtils.Math($('#numOpenLoanAmt').val(), $('#ttlLoanAmt').numberspinner('getValue'), 'add');
	$('#openLoanAmt').numberspinner('setValue',openLoanAmt);
//	afterCalc();
	loadTableRe();
	$('#loanOpenBal').numberspinner('setValue',SCFUtils.Math($('#maxLoanOpenAmt').numberspinner('getValue'), $('#ttlLoanAmt').numberspinner('getValue'), 'sub'));
	if (data.obj.loanTp == '3') {
		ajaxBillM(data.obj.sysRefNo);
	} else {
		$('#BillInfoDiv').hide();
	}
	var marginAmt = $('#marginAmt').numberspinner('getValue');
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	$('#marginAmt').numberspinner({    
		onChange:changeAboutMarginAmt  
	}); 
	SCFUtils.setNumberspinnerReadonly('marginAmt',true);
	$('#ttlLoanAmt').numberspinner({    
		onChange:changeAboutTtlLoanAmt  
	});
	SCFUtils.setNumberspinnerReadonly('ttlLoanAmt',true);
	flagFp = true;
	$('#collatLoanTable').datagrid('checkAll');
	var selectedAmt = 0.00;
	//获取质押率
	var pldPerc = SCFUtils.Math($('#pldPerc').numberspinner('getValue'), 100, 'div');
	$.each($('#collatLoanTable').datagrid('getRows'),function(i,v){
		selectedAmt = SCFUtils.Math(selectedAmt, SCFUtils.Math(v.collatVal, pldPerc, 'mul'), 'add');
	});
	$('#selectedAmt').val(selectedAmt);
	$('#marginAmt').numberspinner('setValue',marginAmt);
	$('#ttlLoanAmt').numberspinner('setValue',ttlLoanAmt);
	var numLmtBal = SCFUtils.Math($('#numLmtBalHd').val(),$('#ttlLoanAmt').numberspinner('getValue'),'sub');
	$('#numLmtBal').numberspinner('setValue',numLmtBal);
	$('#lmtBal').val(numLmtBal);
	flagFp = false;
	//queryBuyerInfo(data.obj.sysRefNo);
	$('#OldSysRelReason').textbox('setValue',row.OldSysRelReason);
	lookSysRelReason();
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	$('#addbutton').linkbutton('disable');
	$('#updatebutton').linkbutton('disable');
	$('#delbutton').linkbutton('disable');
	SCFUtils.loadForm('collatLoanForm',data);
	SCFUtils.loadGridData('collatLoanTable',SCFUtils.parseGridData(data.obj.doname), true);
//	SCFUtils.loadGridData('billTable',SCFUtils.parseGridData(data.obj.bill), true);
//	changeLoanTp();
//	ajaxBillM(data.obj.sysRefNo);
	lookSysRelReason();
}
function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	$('#collatToolbar').show();
	SCFUtils.loadForm('collatLoanForm',data);
	SCFUtils.loadGridData('collatLoanTable',SCFUtils.parseGridData(data.obj.doname), false);
	SCFUtils.loadGridData('billTable',SCFUtils.parseGridData(data.obj.bill), false);
	changeLoanTp();
	flagFp = true;
	$('#collatLoanTable').datagrid('checkAll');
	var marginAmt = $('#marginAmt').numberspinner('getValue');
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	$('#marginAmt').numberspinner({    
		onChange:changeAboutMarginAmt  
	}); 
	SCFUtils.setNumberspinnerReadonly('marginAmt',true);
	$('#ttlLoanAmt').numberspinner({    
		onChange:changeAboutTtlLoanAmt  
	}); 
	SCFUtils.setNumberspinnerReadonly('ttlLoanAmt',true);
	$('#marginAmt').numberspinner('setValue',marginAmt);
	$('#ttlLoanAmt').numberspinner('setValue',ttlLoanAmt);
	flagFp = false;
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	$('#sysRelReason').textbox('setValue',data.obj.sysRelReason);
	lookSysRelReason();
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
//	SCFUtils.setFormReadonly('#BillInfoDiv',true);
//	changeLoanTp();
	cntrctEQuery(data.obj.cntrctNo);
	$('#sysRefNo').val(data.obj.sysRefNo);
	$('#cntrctNo').val(data.obj.cntrctNo);
	$('#loanValDt').datebox('setValue',data.obj.loanValDt);
	$('#loanDueDt').datebox('setValue',data.obj.loanDueDt);
	$('#loanTp').combobox('setValue',data.obj.loanTp);
	$('#marginAmt').numberspinner('setValue',data.obj.marginAmt);
	$('#selAcNo').combobox('setValue',data.obj.selAcNo);
	$('#intAmt').numberspinner('setValue',data.obj.intAmt);
	//申请融资金额
	checkNull();
//	$('#trxDt').datebox('setValue', getDate(new Date()));
	$('#ttlLoanAmt').numberspinner('setValue',data.obj.ttlLoanAmt);
	$('#ttlLoanBal').val(data.obj.ttlLoanBal);
	//beforeCale();
//	queryLoanM();
//	changeAboutMarginAmt();
	//afterCalc();
//	$('#numRegLowestVal').numberspinner('setValue',$('#regLowestVal').val());
	loadTableRe();
	$('#loanOpenBal').numberspinner('setValue',SCFUtils.Math($('#maxLoanOpenAmt').numberspinner('getValue'), $('#ttlLoanAmt').numberspinner('getValue'), 'sub'));
	if (data.obj.loanTp == '3') {
		ajaxBillM(data.obj.sysRefNo);
	} else {
		$('#BillInfoDiv').hide();
	}
	//queryBuyerInfo(data.obj.sysRefNo);
	SCFUtils.eachElement('collatLoanForm');
	$('#OldSysRelReason').textbox('setValue',row.OldSysRelReason);
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
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
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
	}, {
		"id" : '10',
		"text" : "仓单质押"
	}  ];
	$("#busiTp").combobox('loadData',busiTp);
	
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006',
				cacheType:'comm'
			},
			callBackFun:function(data){
				if(data.success){
					$('#lmtCcy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(opt);
	
	var loanTp = [{
		"id" : '4',
		"text" : "流贷",
		'selected':true
	} ];
	$("#loanTp").combobox('loadData', loanTp);
}

function getDate(date){
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}



//质物入库批次表查询
function collatRegQueryAjax(regNo){
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000038',
				regNo:regNo
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					SCFUtils.loadForm('collatLoanForm', data.rows[0]);					
    			}
			}
	};	
	SCFUtils.ajax(opt);
	
}

function changeLoanTp(){
	var loanTp = $('#loanTp').combobox('getValue');
	if(loanTp=='3'){
		$('#BillInfoDiv').show();
	}else if(loanTp=='4'){
		SCFUtils.loadGridData('billTable',[], false,true);
		$('#BillInfoDiv').hide();
	}
}

//协议表查询
function cntrctQueryAjax(cntrctNo){
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000008',
				cntrctNo:cntrctNo
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					SCFUtils.loadForm('collatLoanForm',data.rows[0]);
					$('#LmtAmt').numberspinner('setValue', data.rows[0].lmtAmt);//授信额度余额
					$('#numLmtBal').numberspinner('setValue', data.rows[0].lmtBal);//授信额度余额
					$('#numLmtBalHd').val(data.rows[0].lmtBal);//原授信额度余额
					$('#numOpenLoanAmt').val(data.rows[0].openLoanAmt);
					$('#regLowestVal').val(data.rows[0].regLowestVal);
					$('#finChgrt').numberspinner('setValue',data.rows[0].transChgrt);
					$('#intRt').numberspinner('setValue',data.rows[0].loanRt);
    			}else{
    				SCFUtils.alert("未查询到相关协议信息或者协议被锁住了！");
    			}
			}
	};	
	SCFUtils.ajax(opt);
	
}
//协议表查询
function cntrctQueryAjaxFP(cntrctNo){
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000517',
				cntrctNo:cntrctNo
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					SCFUtils.loadForm('collatLoanForm',data.rows[0]);
					$('#numLmtBal').numberspinner('setValue', data.rows[0].lmtBal);
					$('#numLmtBalHd').val(data.rows[0].lmtBal);
					$('#numOpenLoanAmt').val(data.rows[0].openLoanAmt);
					$('#regLowestVal').val(data.rows[0].regLowestVal);
					$('#finChgrt').numberspinner('setValue',data.rows[0].transChgrt);
					$('#intRt').numberspinner('setValue',data.rows[0].loanRt);
    			}else{
    				SCFUtils.alert("未查询到相关协议信息或者协议被锁住了！");
    			}
			}
	};	
	SCFUtils.ajax(opt);
	
}

//复核时协议表查询
function cntrctEQuery(cntrctNo){
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000075',
				cntrctNo:cntrctNo
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					SCFUtils.loadForm('collatLoanForm',data.rows[0]);
					$('#numLmtBal').numberspinner('setValue', data.rows[0].lmtBal);
					$('#numOpenLoanAmt').val(data.rows[0].openLoanAmt);
					$('#finChgrt').numberspinner('setValue',data.rows[0].transChgrt);
					$('#intRt').numberspinner('setValue',data.rows[0].loanRt);
    			}else{
    				SCFUtils.alert("未查询到相关协议信息或者协议被锁住了！");
    			}
			}
	};	
	SCFUtils.ajax(opt);
	
}


function checkNull(){
	if (SCFUtils.isEmpty($('#regLowestVal').val())) {
		$('#regLowestVal').val(0);
	}
	if (SCFUtils.isEmpty($('#loanTimes').val())) {
		$('#loanTimes').val(0);
	}
//	if (SCFUtils.isEmpty($('#patnerLmtBal').numberspinner('getValue'))) {
//		$('#patnerLmtBal').numberspinner('setValue',0);
//	}
}
//当申请融资金额改变时，其它栏位相应改变
function changeAboutTtlLoanAmt(){
	if(flagFp){
		return;
	}
	//获取申请融资金额
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	//获取协议内可融资金额
	var maxLoanOpenAmt = $('#maxLoanOpenAmt').numberspinner('getValue');
	var maxTtlLoanAmt = maxLoanOpenAmt;//最大可申请融资金额
	var  flagMax = SCFUtils.Math(maxLoanOpenAmt, $('#selectedAmt').val(), 'sub')>0;
	if(flagMax){//如果押品价值小则以押品为最大
		maxTtlLoanAmt = $('#selectedAmt').val();
	}
	if(SCFUtils.Math(ttlLoanAmt, maxTtlLoanAmt, 'sub')>0&&$('#selectedAmt').val()){
		var str = flagMax?'押品总价值('+(maxTtlLoanAmt+0).toFixed(2)+')':'协议内可融资金额';
		SCFUtils.alert("请输入不要大于"+str+'的值！！！！！');
		return;
	}
	//更改协议内可融资余额=协议内可融资金额-本次申请融资金额
	$('#loanOpenBal').numberspinner('setValue', SCFUtils.Math(maxLoanOpenAmt,ttlLoanAmt, 'sub'));
	//融资余额
	$('#ttlLoanBal').numberspinner('setValue', $('#ttlLoanAmt').numberspinner('getValue'));
	//协议内融资余额
	var openLoanAmt = SCFUtils.Math($('#numOpenLoanAmt').val(), $('#ttlLoanAmt').numberspinner('getValue'), 'add');
	$('#openLoanAmt').numberspinner('setValue',openLoanAmt);
	//额度余额
	var lmtBal=SCFUtils.Math($('#numLmtBalHd').val(),ttlLoanAmt,'sub');
	$('#numLmtBal').numberspinner('setValue',lmtBal);
	$('#lmtBal').val(lmtBal);
//	//监管方额度余额
//	var partyNumLmtBal=SCFUtils.Math($('#patnerLmtBal').numberspinner('getValue'),$('#ttlLoanAmt').numberspinner('getValue'),'sub');
//	$('#partyNumLmtBal').val(partyNumLmtBal);
//	changeAboutMarginAmt();
	/**
	 * 保证金 = 融资金额*保证金比例 edit 20160829
	 */
	var marginAmt = SCFUtils.Math($('#ttlLoanAmt').numberspinner('getValue'), $('#initGartPct').numberspinner('getValue'), 'mul');
	$('#marginAmt').numberspinner('setValue',SCFUtils.Math(marginAmt,100,"div"));
}

//当保证金金额改变时，其它栏位相应改变
function changeAboutMarginAmt(){
	if(flagFp){
		return;
	}
	//质押率
	var pldPerc =SCFUtils.Math($('#pldPerc').numberspinner('getValue'),0.01,'mul');
	var cntrctNo = $('#cntrctNo').val();
	var cntrct=queryCntrctInfo(cntrctNo);
	var regLowestVal;
	if (SCFUtils.isEmpty(cntrct.regLowestVal)) {
		regLowestVal=0;
	}else{
		regLowestVal=cntrct.regLowestVal;
	}
	//最低库存价值 =原最低库存价值+（本次申请融资金额 - 保证金金额）/质押率
	//var rlv = SCFUtils.Math($('#ttlLoanAmt').numberspinner('getValue'), $('#marginAmt').numberspinner('getValue'), 'sub');//（原协议内融资余额+本笔申请融资总额）-保证金金额）
	//本次申请融资金额 - 保证金金额
	var rlv = SCFUtils.Math($('#ttlLoanAmt').numberspinner('getValue'), $('#marginAmt').numberspinner('getValue'), 'sub');

	//（本次申请融资金额 - 保证金金额）/质押率
	var rlv_pldPerc = SCFUtils.Math(rlv, pldPerc, 'div');
	//原最低库存价值+（本次申请融资金额 - 保证金金额）/质押率
	var sumRegLowestVal = SCFUtils.Math(regLowestVal, rlv_pldPerc, 'add');
	$('#regLowestVal').val(sumRegLowestVal);
	$('#numRegLowestVal').numberspinner('setValue',sumRegLowestVal);
}

var openLoanAmtOld = 0;
function beforeCale(){
	// 汇总 协议下的融资余额
	var ttlLoanBal = 0.000;
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000070',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows,function(i, n) {
					ttlLoanBal = SCFUtils.Math(ttlLoanBal,n.ttlLoanBal, 'add');
				});
			}
		}
	};
	SCFUtils.ajax(options);
	//融资次数
	$('#loanTimes').val(SCFUtils.Math($('#loanTimes').val(), 1, 'add'));
	//质押率
	var pldPerc =SCFUtils.Math($('#pldPerc').numberspinner('getValue'),0.01,'mul');
	//查询协议下保证金余额
	var marginBalHD = queryBillPay();
	//可融资敞口 
	//考虑到银承方式，续存保证金时不会冲销融资余额，故，协议内可融资金额计算公式变更为：协议内可融资金额=（库存价值总额*质押率+协议下保证金余额）-协议下融资余额（与额度余额的MIN））
	var regVal=SCFUtils.Math(SCFUtils.Math($('#ttlRegAmt').numberspinner('getValue'), pldPerc, 'mul'), marginBalHD, 'add');//库存价值*质押率
	var loanOpenBal=SCFUtils.Math(regVal, ttlLoanBal, 'sub');
	//将原来的协议内可融资金额赋值给一个变量
	openLoanAmtOld =  $('#openLoanAmt').numberspinner('getValue');
	var lob=(SCFUtils.Math(loanOpenBal, $('#numLmtBal').numberspinner('getValue'), 'sub')<0)?loanOpenBal:$('#numLmtBal').numberspinner('getValue');
	$('#loanOpenBal').numberspinner('setValue',lob);
	$('#loanOpenBalOld').val(lob);
	//申请融资金额
	//$('#ttlLoanAmt').numberspinner('setValue', $('#loanOpenBal').numberspinner('getValue'));
	//协议内可融资金额=库存价值总额*质押率-协议下融资余额（与额度余额的MIN）
	$('#maxLoanOpenAmt').numberspinner('setValue', lob);
	changeAboutTtlLoanAmt();
}

function queryBillPay(){
	// 汇总 协议下的融资余额
	var marginBalHD = 0.000;
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000674',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows,function(i, n) {
					marginBalHD = SCFUtils.Math(marginBalHD,n.marginBal, 'add');
				});
			}
		}
	};
	SCFUtils.ajax(options);
	return marginBalHD;
}

function queryLoanM(){
	// 汇总 协议下的融资余额
	var ttlLoanBal = 0.000;
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000070',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows,function(i, n) {
					ttlLoanBal = SCFUtils.Math(ttlLoanBal,n.ttlLoanBal, 'add');
				});
			}
		}
	};
	SCFUtils.ajax(options);
	//质押率
	var pldPerc =SCFUtils.Math($('#pldPerc').numberspinner('getValue'),0.01,'mul');
	//查询协议下保证金余额
	var marginBalHD = queryBillPay();
	//可融资敞口
	//考虑到银承方式，续存保证金时不会冲销融资余额，故，协议内可融资金额计算公式变更为：协议内可融资金额=（库存价值总额*质押率+协议下保证金余额）-协议下融资余额（与额度余额的MIN））
	var regVal=SCFUtils.Math(SCFUtils.Math($('#ttlRegAmt').numberspinner('getValue'), pldPerc, 'mul'), marginBalHD, 'add');//库存价值*质押率
	var loanOpenBal=SCFUtils.Math(regVal, ttlLoanBal, 'sub');
	var lob=(SCFUtils.Math(loanOpenBal, $('#numLmtBal').numberspinner('getValue'), 'sub')<0)?loanOpenBal:$('#numLmtBal').numberspinner('getValue');
	$('#loanOpenBal').numberspinner('setValue',lob);
	$('#loanOpenBalOld').val(lob);
	//协议内可融资金额=库存价值总额*质押率-协议下融资余额（与额度余额的MIN）
	$('#maxLoanOpenAmt').numberspinner('setValue', lob);
}

function afterCalc(){
//	$('#numLmtBal').numberspinner('setValue',$('#lmtBal').val());
	$('#numRegLowestVal').numberspinner('setValue',$('#regLowestVal').val());
	//质押率
/*	//已融资敞口
	var regLoanBal=SCFUtils.Math( $('#ttlLoanAmt').numberspinner('getValue'),  $('#regLoanBal').numberspinner('getValue'), 'add');
	$('#regLoanBal').numberspinner('setValue', regLoanBal);*/

}

//申请融资金额需要小于可融资额敞口
function checkLoanOpenBal(){
	var ttlLoanAmt=$('#ttlLoanAmt').numberspinner('getValue');
	var loanOpenBalOld=$('#loanOpenBalOld').val();
	if(SCFUtils.Math(ttlLoanAmt,loanOpenBalOld,'sub')>0){
		SCFUtils.alert("本次申请融资金额已超出可融资余额！");
		return true;
	}
	if(ttlLoanAmt==0){
		SCFUtils.alert("申请融资金额不能为0！");
		return true;
	}
	return false;
}

//校验：本次申请融资金额<=选中的押品总价值
//YeQing add 2016-8-9
function checkSelectRegAmt(){
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var selectRegAmt = 0.00;//计算选择的押品价值
	//质押率
	var pldPerc =SCFUtils.Math($('#pldPerc').numberspinner('getValue'),0.01,'mul');
	var griddata = SCFUtils.getSelectedGridData('collatLoanTable',false);
	$.each(griddata, function(i, n) {
		selectRegAmt = SCFUtils.Math(selectRegAmt,n.collatVal,'add');
	});
	//计算出选择押品的价值
	selectRegAmt = SCFUtils.Math(selectRegAmt, pldPerc, 'mul');//库存价值*质押率
	if(SCFUtils.Math(ttlLoanAmt,selectRegAmt,'sub')>0){
		SCFUtils.alert("本次申请融资金额已超出选择押品的总价值！");
		return true;
	}
	if(ttlLoanAmt==0){
		SCFUtils.alert("申请融资金额不能为0！");
		return true;
	}
	return false;
}

//协议额度余额需要大于可融资额敞口
function checkTtlLoanAmt(){
	var ttlLoanAmt=$('#ttlLoanAmt').numberspinner('getValue');
	var lmtBal=$('#numLmtBal').numberspinner('getValue');
	if(SCFUtils.Math(ttlLoanAmt,lmtBal,'sub')>0){
		SCFUtils.alert("本次申请融资金额已超出额度余额！");
		return true;
	}
	//监管方额度余额需要大于可融资额敞口
//	var patnerLmtBal=$('#patnerLmtBal').numberspinner('getValue');
//	if(SCFUtils.Math(ttlLoanAmt,patnerLmtBal,'sub')>0){
//		SCFUtils.alert("本次申请融资金额已超出监管方额度余额！");
//		return true;
//	}
	return false;
}

//保证金金额 需要大于 申请融资金额*最低保证金比例
function checkMarginAmt(){
	var marginAmt = $('#marginAmt').numberspinner('getValue');//保证金金额
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var initGartPct =SCFUtils.Math($('#initGartPct').numberspinner('getValue'),0.01,'mul');//初始保证金比例
	var tlammp = SCFUtils.Math(ttlLoanAmt,initGartPct,'mul');
	if(SCFUtils.Math(marginAmt,tlammp,'sub')<0){
		SCFUtils.alert("保证金金额不能小于本次申请融资金额的"+$('#initGartPct').numberspinner('getValue')+"%！");
		return true;
	}
	return false;
}

//银行承兑汇票支付方式下:录入所有票据金额必须=本次申请融资金额
function checkBillAmt(){
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');//本次融资金额
	var loanTp = $('#loanTp').combobox('getValue');//融资支付方式
	var ttlBillAmt = 0.000;
	if(loanTp == 3){
		var billData = SCFUtils.getGridData('billTable');	
		$.each(SCFUtils.parseGridData(billData), function(i, n){
			ttlBillAmt = SCFUtils.Math(ttlBillAmt,n.billAmt,'add');
		});
		if(SCFUtils.Math(ttlBillAmt,ttlLoanAmt,'sub')!=0){
			SCFUtils.alert("录入所有票据金额必须等于本次申请融资金额！");
			return true;
		}
	}else{
		return false;
	}
}

function onNextBtnClick() {
	//设置保证金余额=保证金金额
//	$('#marginBal').val($('#marginAmt').numberspinner('getValue'));
//	if(SCFUtils.FUNCTYPE !='RE'&&SCFUtils.FUNCTYPE !='DP'){
//		if(checkSelectRegAmt()||checkLoanOpenBal()||checkTtlLoanAmt()||checkMarginAmt()||checkBillAmt()){
//			return;
//		}
//	}
//	if(SCFUtils.OPTSTATUS !='RS'){
//		afterCalc();
//	}
	var mainData = SCFUtils.convertArray('collatLoanForm');
	var grid = {};
	var griddata;
	if('RE' == SCFUtils.FUNCTYPE || 'DP' == SCFUtils.FUNCTYPE){//***************************************************
		griddata = SCFUtils.getGridData('collatLoanTable');	
	}else{
		var rows = $('#collatLoanTable').datagrid('getSelections');
		if (rows.length == 0) {
			SCFUtils.alert("请选择需要融资的仓单信息！");
			return;
		} 
		griddata = SCFUtils.getSelectedGridData('collatLoanTable',false);
		$.each(griddata, function(i, n) {
			$.extend(n,{
				collatQtyBal : SCFUtils.Math(n.collatQty,n.collatQty, 'sub')//融资申请时:可融资数量=原可融资数量-本次融资数量
			});
		});
	}
	var cntrctNo = mainData.cntrctNo;//协议编号
	var margin_Amt = $('#marginAmt').numberspinner('getValue');//保证金金额
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');// 融资金额
	var lmtAllocate =0;
	if(SCFUtils.Math(ttlLoanAmt, margin_Amt, 'sub')>0){
		//占用额度 =融资金额-初始保证金金额
		lmtAllocate = SCFUtils.Math(ttlLoanAmt, margin_Amt, 'sub');
	}else{
		lmtAllocate =0;
	}
	//协议相关信息
	var cntrct=queryCntrctInfo(cntrctNo);
	$.extend(mainData, {
		"cntrctLmtCcy" : cntrct.lmtCcy ,//额度币别
		
		//"cntrctLmtBal" : SCFUtils.Math(cntrct.lmtBal, lmtAllocate, 'sub'),//协议_额度余额 = 原额度余额-本次占用金额（即：融资金额-初始保证金金额）
		"cntrctLmtBal" : $('#numLmtBal').numberspinner('getValue'),//授信额度余额
		
		'cntrctLmtAmt' : cntrct.lmtAmt, //协议_额度金额
		
		'cntrctLmtAllocate' : SCFUtils.Math(cntrct.lmtAllocate, lmtAllocate, 'add'), //协议_占用额度 = 原占用额度+本次占用金额（即：融资金额-初始保证金金额）
		
		'cntrctLmtRecover' :cntrct.lmtRecover, //协议_归还额度 
		'sysRelReason' : $('#sysRelReason').val(),
		'OldSysRelReason' : $('#OldSysRelReason').val(),
	});
	grid.doname = SCFUtils.json2str(griddata);
//	var bllGriddata=SCFUtils.getGridData('billTable',false);
//	grid.bill = SCFUtils.json2str(bllGriddata);
	$.extend(mainData,grid);
	return mainData;
}

function loadTable() {
	var cntrctNo = $('#cntrctNo').val();
	var pldPerc = $('#pldPerc').numberspinner('getValue');
	pldPerc = SCFUtils.Math(pldPerc, 100, 'div');
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000159',
			cntrctNo : cntrctNo,
			cacheType:'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {	
					$.each(data.rows, function(i, n) {
					var loanId = $('#sysRefNo').val();
					$.extend(n, {
						sysRefNo : loanId+n.sysRefNo,
						loanId  : loanId,
						crtfNo  : n.sysRefNo,
						crtfAmt : n.regAmt,
						crtfOpenAmt : SCFUtils.Math(pldPerc, n.regAmt, 'mul')
					});
				});
//				clearSelectedGridData('collatLoanTable');
				SCFUtils.loadGridData('collatLoanTable',data.rows,false,true);
//				appendCcy();
			}else{
				SCFUtils.alert("没有找到符合要求的质押品！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadTableRe() {
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000499',
			sysRefNo : sysRefNo,
			cacheType:'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
//				$.each(data.rows, function(i, n) {
//					$.extend(n, {
//						loanRegId  : n.sysRefNo,
//						sysRefNo : n.collatChId
//					});
//				});
				if(SCFUtils.FUNCTYPE == 'FP'){
					SCFUtils.loadGridData('collatLoanTable',data.rows,false,true);
				}else{
					SCFUtils.loadGridData('collatLoanTable',data.rows,true,true);
				}
//				appendCcy();
			}else{
				SCFUtils.alert("没有找到符合要求的质押品！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function clearSelectedGridData(gridId){
	$('#'+gridId).datagrid('clearSelections');
	$('#'+gridId).datagrid('clearChecked');
}

function ajaxBillM(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000378',
			sysRefNo : data,
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				if(SCFUtils.FUNCTYPE == 'FP'){
					SCFUtils.loadGridData('billTable', data.rows, false, true);
				}else{
					SCFUtils.loadGridData('billTable', data.rows, true, true);
				}
				clearSelectedGridData('billTable');
			}
		}
	};
	SCFUtils.ajax(options);

}

function appendCcy(){
	var data =$('#collatLoanTable').datagrid('getRows');
	var ccy=$('#lmtCcy').combobox('getValue');
	$.each(data,function(i,n){
		$('#collatLoanTable').datagrid('updateRow', {
			index : i,
			row : {
				ccy : ccy
			}
		});
	});
}

function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField:'sysRefNo',//分页勾选
		onCheck:function(rowIndex,rowData){
			onCheck(rowIndex,rowData);
		},
		onUncheck:function(rowIndex,rowData){
			onUnCheck(rowIndex,rowData);
		},
		onCheckAll:function(rows){
			onCheckAll(rows);
		},
		onUncheckAll:function(rows){
			onUnCheckAll(rows);
		},
		columns : [ [{
			field : 'ck',
			checkbox : true
		},   
		{
			field : 'sysRefNo',
			title : '交易流水号',
			width : '16.5%',
			hidden:true
		},{
			field : 'crtfNo',
			title : '仓单编号',
			width : '33.3%'
			//hidden:true
		},{
			field : 'crtfAmt',
			title : '仓单价值',
			width : '33.3%',
			formatter : ccyFormater 
		},{
			field : 'crtfOpenAmt',
			title : '仓单价值可覆盖敞口',
			width : '33.3%',
			formatter : ccyFormater 
		},{
			field : 'loanId',
			title : '融资编号',
			width : '16.5%',
			hidden:false
		},{
			field : 'cntrctNo',
			title : '协议编号',
			width : '16.5%',
			hidden:false
		}
		] ]
	};
	$('#collatLoanTable').datagrid(options);
}

function ajaxBillTable() {
	var options = {
		toolbar : '#toolbar1',
		idField : 'sysRefNo',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'k',
			checkbox : true
		}, {
			field : 'billNo',
			title : '票号',
			width : '16.66%'
		}, {
			field : 'billAmt',
			title : '出票金额',
			width : '16.66%',
			formatter : ccyFormater
		}, {
			field : 'billValDt',
			title : '起始日',
			width : '16.66%',
			formatter : dateFormater
		}, {
			field : 'billDueDt',
			title : '到期日',
			width : '16.66%',
			formatter : dateFormater
		}, {
			field : 'billRecp',
			title : '收票人',
			width : '16.66%'
		}, {
			field : 'billRecpAcno',
			title : '收票人账号',
			width : '16.66%',
		}, {
			field : 'billBal',
			title : '票据余额',
			width : 110,
			hidden : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			width : 110,
			hidden : true
		}, {
			field : 'loanId',
			title : '融资编号',
			width : 110,
			hidden : true
		}, {
			field : 'cntrctNo',
			title : '授信额度编号',
			width : 110,
			hidden : true
		} ] ]
	};
	$('#billTable').datagrid(options);
}
function addBillRow() {
	var data = SCFUtils.convertArray("collatLoanForm");
	// 添加前验证表单是否完整
	if (data) {
		var row = {};
		row.trxId = $('#sysRefNo').val();
		row.cntrctRefNo = $('#cntrctNo').val();
		row.loanValDt = $('#loanValDt').datebox('getValue');
		row.loanDueDt = $('#loanDueDt').datebox('getValue');
		row.op = 'add';
		var options = {
			title : '添加票据信息',
			reqid : 'I_P_000241',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : addBillSuccess
		};
		SCFUtils.getData(options);
	}

}

//判断是否包含在数组中
function contains(a, obj) {
	for ( var i in a) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}


function addBillSuccess(data) {
	// 限定关联关系只能选择一次
	var arr = getBillNo();
	if (contains(arr, data.billNo)) {
		SCFUtils.alert('票据已存在!');
		return;
	}
	$('#billTable').datagrid('appendRow', data);
}
function editBillRow() {
	var rows = $('#billTable').datagrid('getSelections');
	if (rows.length == 1) {
		var row = rows[0];
		row.op = 'edit';
		row.state = '';
		row.loanValDt = $('#loanValDt').datebox('getValue');
		row.loanDueDt = $('#loanDueDt').datebox('getValue');
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title : '修改票据信息',
			reqid : 'I_P_000242',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : editBillSuccess
		};
		SCFUtils.getData(options);
	} else if (rows.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
//获取列表中所有的票据NO
function getBillNo() {
	var array = [];
	var gridData = SCFUtils.getGridData('billTable', false);
	var datas = SCFUtils.parseGridData(gridData, false);
	if (datas.length > 0) {
		$.each(datas, function(i, m) {
			array[i] = m.billNo;
		});
	}
	return array;
}

function editBillSuccess(data) {
	var row = $('#billTable').datagrid('getSelected');
	var rowIndex = $('#billTable').datagrid('getRowIndex', row);
	// 限定关联关系修改时不能修改为已经存在的关系
	var arr = getBillNo();
	//如果发票号没有修改，就不需要校验
	if(data.billNoOld != data.billNo){
		if (contains(arr, data.billNo, rowIndex)) {
			SCFUtils.alert('票据已存在!');
			return;
		}
	}
	$.extend(data,{
		loanId : $('#sysRefNo').val()
	})
	$('#billTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
}

// 删除一条数据
function deleteBillRow() {
	var rows = $('#billTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#billTable').datagrid('getAllRowIndex',
							copyRows[i].sysRefNo);
					$('#billTable').datagrid('deleteRow', index);
				}
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function onCheck(rowIndex, rowData){
	var loanValDt = $('#loanValDt').datebox('getValue');
	var loanDueDt = $('#loanDueDt').datebox('getValue');
	if(loanValDt==''){
		SCFUtils.alert("请先输入融资起始日！");
		$('#collatLoanTable').datagrid('clearChecked');
		return;
	}
	if(loanDueDt==''){
		$('#collatLoanTable').datagrid('clearChecked');
		SCFUtils.alert("请先输入融资到期日！");
		return;
	}
	var dateSub = SCFUtils.DateDiff(loanDueDt, loanValDt);
	if(dateSub<=0||dateSub=='NaN'){
		SCFUtils.alert("融资到期日不能小于融资起始日,请修改");
	}else{
		var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
		ttlLoanAmt = SCFUtils.Math(ttlLoanAmt, rowData.crtfOpenAmt, 'add');
		$('#ttlLoanAmt').numberspinner('setValue',ttlLoanAmt);
		rowData.ck=true;
	}
}

function onCheckAll(rows){
	$.each(rows,function(i,n){
		if(!n.ck){
			//过滤掉已勾选的数据，只有当前未勾选的数据才执行勾选逻辑
			onCheck(i,n);
		}
	});
}

function onUnCheck(rowIndex, rowData){
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	ttlLoanAmt = SCFUtils.Math(ttlLoanAmt, rowData.crtfOpenAmt, 'sub');
	$('#ttlLoanAmt').numberspinner('setValue',ttlLoanAmt);
	rowData.ck=false;
}





function onUnCheckAll(rows){
	$.each(rows,function(i,n){
		if(n.ck){
			onUnCheck(i,n);
		}
	});
}

//判断是否包含在数组中
function contains(a, obj){
	for(var i in a) {
	    if(a[i] === obj){
	      return true;
	    }
	}
	return false;
}

//删除数组中的值
function delCheck(a, obj){
	var arr = a;
	for(var i in a) {
	    if(a[i] === obj){
	    	delete arr[i]; 
	    }
	}
	return arr;
}


function onClickRow(index) {
	if (editIndex != index) {
		if (endEditing()) {
			$('#collatLoanTable').datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#collatLoanTable').datagrid('selectRow', editIndex);
		}
	}
}
//查询额度关联关系表
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

/**
 * 计算初始保证金金额 = 融资金额*初始保证金比例
 * */
function changeTtlLoanAmt(){
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	$('#ttlLoanBal').val(ttlLoanAmt);
	var initGartPct = $('#initGartPct').numberspinner('getValue');//初始保证金比例
	var finChgrt = $('#initGartPct').numberspinner('getValue');//费率
	var intRt = $('#intRt').numberspinner('getValue');//利率
	finChgrt = SCFUtils.Math(finChgrt, 100, 'div');
	intRt = SCFUtils.Math(intRt, 100, 'div');
	//初始保证金金额 =融资金额*初始保证金比例
	var marginAmt = SCFUtils.Math(ttlLoanAmt, initGartPct, 'mul');
	$('#marginAmt').numberspinner('setValue',marginAmt);
	$('#marginBal').val(marginAmt);
	
	//手续费金额 =融资金额*手续费率
	var costAmt = SCFUtils.Math(ttlLoanAmt, finChgrt, 'mul');
	$('#costAmt').numberspinner('setValue',costAmt);
	
	//利息 =融资金额*利率*（融资到期日-起始日）/360
	var loanValDt = $('#loanValDt').datebox('getValue');
	var loanDueDt = $('#loanDueDt').datebox('getValue');
	var dateSub = SCFUtils.DateDiff(loanDueDt, loanValDt);
	dateSub = SCFUtils.Math(dateSub, 360, 'div');
	var intAmt =  SCFUtils.Math(ttlLoanAmt, intRt, 'mul');
	intAmt = SCFUtils.Math(intAmt, dateSub, 'mul');
	$('#intAmt').numberspinner('setValue',intAmt);
	
	//协议授信额度减少
	var numLmtBal = $('#numLmtBal').numberspinner('getValue');
	numLmtBal = SCFUtils.Math(numLmtBal, ttlLoanAmt, 'sub');
	$('#lmtBal').val(numLmtBal);
}

//选中一笔仓单信息，查看该笔仓单下的货物信息
function  queryCollat(){

	var row = $('#collatLoanTable').datagrid('getSelections');
	if(row.length==0){
		SCFUtils.alert("请选择一条仓单信息！");
	}else if(row.length>1){
		SCFUtils.alert("只能选择一条数据！");
	}else{
		var regNo =row[0].crtfNo;
		var options = {
				title : '货物信息查询',
				reqid : 'I_P_000069',
				data : {
					'regNo' : regNo
				}
		};
		SCFUtils.getData(options);
	}

}
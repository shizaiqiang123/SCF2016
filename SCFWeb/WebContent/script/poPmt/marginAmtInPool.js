/**
 * 复合功能时，进入结果汇总页面
 * 
 * @param data
 */
function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('loanForm', data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnFPLoad(data) {
	pageOnReleasePageLoad(data);
	
	lookSysRelReason();
}
/**
 * 复合功能时，Next进入交易页面
 * 
 * @param data
 */
function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	$.extend(data.obj,{
		"poolLineOld" : SCFUtils.Math(data.obj.poolLine,data.obj.marginAmt,'sub')
	});
	SCFUtils.loadForm('loanForm', row);
	$('#OldSysRelReason').textbox('setValue',row.OldSysRelReason);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}
/**
 * 复合功能时，Pre进入交易页面
 * 
 * @param data
 */
function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('loanForm', data);

	//重新赋值
	$('#poolLine').numberspinner('setValue',data.obj.poolLine);
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

/**
 * 申请功能时，进入结果页面
 * 
 * @param data
 */
var isNeedChangePoolLine = true;
function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	isNeedChangePoolLine = false;
	SCFUtils.loadForm('loanForm', data);
	lookSysRelReason();
}

/**
 * 申请功能时，Pre进入交易页面
 * 
 * @param data
 */
function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('loanForm', data);
	//重新赋值
	$('#poolLine').numberspinner('setValue',data.obj.poolLine);
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	$('#sysRelReason').textbox('setValue',data.obj.sysRelReason);
	lookSysRelReason();
}

/**
 * 申请功能时，Next进入交易页面
 * 
 * @param data
 */
function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('loanForm', data);
	$('#trxDt').datebox('setValue', SCFUtils.getcurrentdate());
	$('#ccy').combobox('setValue', data.obj.lmtCcy);
	if(data.obj.poolLine==''){
		$('#poolLine').numberspinner('setValue',0);
	}
	if(data.obj.openLoanAmt==''){
		$('#openLoanAmt').numberspinner('setValue',0);
	}
	$('#poolLineOld').val(data.obj.poolLine);
	//系统自动计算入池金额；公式：本次入池金额=已融资金额-最新池水位 add by YeQing 2016-9-30
	$('#marginAmt').numberspinner('setValue',SCFUtils.Math(data.obj.openLoanAmt, data.obj.poolLine, 'sub'));
//	SCFUtils.setTextReadonly('marginAcNo', false);
//	SCFUtils.setNumberboxReadonly("marginAmt", false);
//	SCFUtils.setDateboxReadonly("trxDt", false);
//	SCFUtils.setDateboxReadonly("freezeDueDt", false);
	var options = {};
	options.data = {
		refName : 'PoolAmt',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	lookSysRelReason();
}

/**
 * 所有进入交易页面 公共的方法
 * 
 * @param data
 */
function pageOnInt() {
	SCFUtils.setFormReadonly('#loanForm', true);
	SCFUtils.setTextReadonly('marginAcNo', false);
	//SCFUtils.setNumberboxReadonly("marginAmt", false);
	SCFUtils.setDateboxReadonly("trxDt", false);
	SCFUtils.setDateboxReadonly("freezeDueDt", false);
	ajaxBox();
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

function getDueDt() {
	var freezeDueDt = $('#freezeDueDt').datebox("getValue");
	var trxDt = $('#trxDt').datebox("getValue");
	if (SCFUtils.DateDiff(freezeDueDt, trxDt) <= 0) {
		SCFUtils.alert("本次冻结到期日不能小于等于本次冻结日期,请修改");
		return false;
	}
}

function ajaxBox() {
	var data = data = [ {
		"id" : '0',
		"text" : "国内有追索权保理",
		"selected" : true
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '2',
		"text" : "先票款后货"
	},{
		"id" : '3',
		"text" : "信用保险项下"
	},{
		"id" : '4',
		"text" : "现货动态"
	} ,{
		"id" : '5',
		"text" : "现货静态"
	},{
		"id" : '6',
		"text" : "应收账款池融资"
	}
	];
	$("#busiTp").combobox('loadData', data);
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}
/**
 * 本次入池金额的onchange事件
 */
function changeMarginAmt(){
	if(isNeedChangePoolLine == false){
		return;
	}
	var poolLine = $("#poolLineOld").val();//池水位
	var marginAmt = $("#marginAmt").numberbox("getValue");//本次入池金额
	var openLoanAmt = $("#openLoanAmt").numberbox("getValue");//已融资金额
	var arAvalLoan = $("#arAvalLoan").val();//可融资金额
	
	// 最新池水位= CNTRCT_M .POOL_LINE+ MARGIN_AMT
	$("#poolLine").numberbox("setValue",SCFUtils.Math(poolLine, marginAmt, 'add'));
	// 可融资金额计算=CNTRCT_M .POOL_LINE- OPEN_LOAN_AMT
	$("#arAvalLoan").val(SCFUtils.Math($("#poolLine").numberbox("getValue"), openLoanAmt, 'sub'));
}

//限定生效日期在到期日之前
function checkValidDueDate() {
	var freezeDueDt = $('#freezeDueDt').datebox("getValue");
	var trxDt = $('#trxDt').datebox("getValue");
	var judge = true;
	// 计算到期日与生效日的差值
	var cha = SCFUtils.DateDiff(freezeDueDt, trxDt);
	if (cha <= 0) {
		judge = false;
	}
	return judge;
}

function onNextBtnClick() {
	if (!checkValidDueDate()) {
		SCFUtils.alert("本次冻结到期日不能小于等于本次冻结日期，请检查！");
		return;
	}
	
	var mainData = SCFUtils.convertArray('loanForm');
	$.extend(mainData,{
		'sysRelReason' : $('#sysRelReason').val(),
		'OldSysRelReason' : $('#OldSysRelReason').val(),
		
	});
	return mainData;
}

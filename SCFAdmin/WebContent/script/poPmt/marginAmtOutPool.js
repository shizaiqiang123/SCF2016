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
		"poolLineOld" : SCFUtils.Math(data.obj.poolLine,data.obj.marginAmt,'add')
	});
	SCFUtils.loadForm('loanForm', row);
	$("#arMarginAmt").numberbox("setValue",SCFUtils.Math(data.obj.poolLine, data.obj.openLoanAmt, 'sub'));//计算可出池金额
	if(SCFUtils.isEmpty(data.obj.arBal)){
		$("#arBal").numberbox("setValue",0);
	}
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
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
	$('#ccy').combobox('setValue', data.obj.lmtCcy);
	if(data.obj.poolLine==''){
		$('#poolLine').numberspinner('setValue',0);
	}
	if(data.obj.openLoanAmt==''){
		$('#openLoanAmt').numberspinner('setValue',0);
	}
	$('#poolLineOld').val(data.obj.poolLine);
	$("#arMarginAmt").numberbox("setValue",SCFUtils.Math(data.obj.poolLine, data.obj.openLoanAmt, 'sub'));//计算可出池金额
	$("#arMarginAmtOld").val(SCFUtils.Math(data.obj.poolLine, data.obj.openLoanAmt, 'sub'));
	$("#marginAmt").numberbox("setValue",0);//本次出池金额默认为0
	$("#marginAmt").numberbox({max:parseFloat($("#arMarginAmt").numberbox("getValue"))});
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
	SCFUtils.setNumberboxReadonly("marginAmt", false);
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
 * 本次出池金额的onchange事件
 */
function changeMarginAmt(){
	if(isNeedChangePoolLine == false){
		return;
	}
	var poolLine = $("#poolLineOld").val();//池水位
	var marginAmt = $("#marginAmt").numberbox("getValue");//本次出池金额
	var openLoanAmt = $("#openLoanAmt").numberbox("getValue");//已融资金额
	var arAvalLoan = $("#arAvalLoan").val();//可融资金额
	var arMarginAmtOld = $("#arMarginAmtOld").val();//可出池金额
	$("#poolLine").numberbox("setValue",SCFUtils.Math(poolLine, marginAmt, 'sub'));
	
	//可出池金额计算
	$("#arMarginAmt").numberbox("setValue",SCFUtils.Math(arMarginAmtOld, marginAmt, 'sub'));
		if(arMarginAmtOld !== ""){
			if(SCFUtils.Math(arMarginAmtOld, marginAmt, 'sub') < 0){
				//SCFUtils.alert('本次出池金额不能大于可出池金额，请调整！');
				//$("#arMarginAmt").numberbox("setValue",arMarginAmtOld);
				//$("#marginAmt").numberbox("setValue",arMarginAmtOld);
			}
		}
	
	
	// 最新池水位= CNTRCT_M .POOL_LINE- MARGIN_AMT
	$("#poolLine").numberbox("setValue",SCFUtils.Math(poolLine, marginAmt, 'sub'));
	// 可融资金额计算=CNTRCT_M .POOL_LINE- OPEN_LOAN_AMT
	$("#arAvalLoan").val(SCFUtils.Math($("#poolLine").numberbox("getValue"), openLoanAmt, 'sub'));
}

function onNextBtnClick() {
	var poolLine = $("#poolLine").numberbox("getValue");//池水位
	var openLoanAmt = $("#openLoanAmt").numberbox("getValue");//已融资金额
	var marginAmt = $("#marginAmt").numberbox("getValue");//出池金额
	if(marginAmt == 0){
		SCFUtils.alert('本次出池金额不能为零，请调整！');
		return;
	}
	if(SCFUtils.Math(poolLine, openLoanAmt, 'sub') < 0){
		SCFUtils.alert('出池后池水位不能覆盖敞口，请调整！');
		return;
	}
	var mainData = SCFUtils.convertArray('loanForm');
	
	$.extend(mainData,{
		'sysRelReason' : $('#sysRelReason').val(),
		'OldSysRelReason' : $('#OldSysRelReason').val()
	});
	
	return mainData;
}

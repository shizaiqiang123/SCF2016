function ajaxBox(){
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
	$("#busiTp").combobox('loadData',data);
	
	var serviceReq = 	data = [{"id":'1',"text":"有追索转让","selected":true},{"id":'2',"text":"无追索转让"}];
	$("#serviceReq").combobox('loadData',serviceReq);
	
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
}

function getDate(date){
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}
var marginBal = 0;
//融资主表查询
function loanQueryAjax(sysRefNo){
	
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000023',
				sysRefNo:sysRefNo
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					$('#ttlLoanAmt').numberspinner('setValue',data.rows[0].ttlLoanAmt);
					if(SCFUtils.FUNCTYPE ==='PM'){
						$('#ttlLoanBal').numberspinner('setValue',data.rows[0].ttlLoanBal);
					}
					//协议编号，为了从协议表查询质押率
					$('#cntrctNo').val(data.rows[0].cntrctNo);
					$('#ttlLoanBalOld').val(data.rows[0].ttlLoanBal);//原融资余额
					marginBal = data.rows[0].marginBal;
    			}
			}
	};	
	SCFUtils.ajax(opt);
	
}
/**
 * 退回处理时抓取E表
 * @param sysRefNo
 */
function loanQueryAjaxFP(sysRefNo){
	var sysLockBy = $('#sysRefNo').val();
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000668',
				sysRefNo:sysRefNo,
				sysLockBy:sysLockBy
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					$('#marginAmt').val(data.rows[0].marginAmt);
    			}
			}
	};	
	SCFUtils.ajax(opt);
}
/**
 * 复核时抓取E表
 * @param sysRefNo
 */
function loanQueryAjaxRe(sysRefNo){
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000628',
				sysRefNo:sysRefNo
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					$('#ttlLoanAmt').numberspinner('setValue',data.rows[0].ttlLoanAmt);
					$('#ttlLoanBal').numberspinner('setValue',data.rows[0].ttlLoanBal);
					//协议编号，为了从协议表查询质押率
					$('#cntrctNo').val(data.rows[0].cntrctNo);
//					$('#ttlLoanBalOld').val(data.rows[0].ttlLoanBal);//原融资余额
					marginBal = data.rows[0].marginBal;
    			}
			}
	};	
	SCFUtils.ajax(opt);
}
function pageOnReleasePreLoad(data) {
	
	SCFUtils.loadForm('pmtForm', data);
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}
////质物入库批次表查询
//function collatRegQueryAjax(){
//	var sysRefNo = $('#regNo').val();
//	var opt={
//			url:SCFUtils.AJAXURL,
//			data: {
//				queryId:'Q_P_000024',
//				sysRefNo:sysRefNo
//			},
//			callBackFun:function(data){
//				if(data.success&&!SCFUtils.isEmpty(data.rows)){
//					SCFUtils.loadForm('pmtForm', data.rows[0]);					
//    			}
//			}
//	};	
//	SCFUtils.ajax(opt);
//}

//查询协议信息
function cntrctAjax(){
	var cntrctNo = $('#cntrctNo').val();
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000008',
				cntrctNo:cntrctNo
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
//					$('#pldPerc').numberspinner('setValue',data.rows[0].pldPerc);		
					SCFUtils.loadForm('pmtForm',data.rows[0]);
					$('#cntrctNo').val(data.rows[0].sysRefNo);
					$('#lmtBal').val(data.rows[0].lmtBal);
					$('#numRegLowestVal').numberspinner('setValue',data.rows[0].regLowestVal);
					$('#regLowestVal').val(data.rows[0].regLowestVal);
    			}else{
    				SCFUtils.alert("未查询到相关协议信息！");
    			}
			}
	};	
	SCFUtils.ajax(opt);
	
}

//查询协议信息
function cntrctAjaxFP(){
	var cntrctNo = $('#cntrctNo').val();
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000667',
				cntrctNo:cntrctNo
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					$('#regLowestVal').val(data.rows[0].regLowestVal);
  			}
			}
	};	
	SCFUtils.ajax(opt);
	
}

//查询协议信息
function cntrctAjaxRe(){
	var cntrctNo = $('#cntrctNo').val();
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000515',
				cntrctNo:cntrctNo
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					SCFUtils.loadForm('pmtForm',data.rows[0]);
					$('#openLoanAmtHD').val(data.rows[0].openLoanAmt);
					$('#lmtBal').val(data.rows[0].lmtBal);
					$('#numRegLowestVal').numberspinner('setValue',data.rows[0].regLowestVal);
    			}else{
    				SCFUtils.alert("未查询到相关协议信息！");
    			}
			}
	};	
	SCFUtils.ajax(opt);
	
}

function changeTtlPmt(){
	if(SCFUtils.FUNCTYPE == 'FP'){//还原值
		$('#openLoanAmt').numberbox('setValue',SCFUtils.Math($('#openLoanAmtHD').val(), $('#pmtAmt').numberspinner('getValue'), 'sub'));
		//需要给ttlPmtAmt字段赋值
		$('#ttlPmtAmt').val($('#pmtAmt').numberspinner('getValue'));
		$('#ttlLoanBal').numberbox('setValue',SCFUtils.Math($('#ttlLoanBalOld').val(), $('#pmtAmt').numberspinner('getValue'), 'sub'));
		
		//获取质押率
		var pldPerc = SCFUtils.Math($('#pldPerc').numberspinner('getValue'), 0.01, 'mul');
		var tempVal =0;
		//计算（本次还款金额-该笔融资缴纳的保证金金额）/质押率
		if(SCFUtils.Math($('#pmtAmt').numberspinner('getValue'), $('#marginAmt').val(), 'sub')>0){
			//如果(放款金额-融资余额)>0 则不是第一次还款
			if(SCFUtils.Math($('#ttlLoanAmt').numberspinner('getValue'), $('#ttlLoanBalOld').val(), 'sub')>0){
				 tempVal = $('#pmtAmt').numberspinner('getValue');
			}else{
				//计算（本次还款金额-该笔融资缴纳的保证金金额）/质押率
				 tempVal = SCFUtils.Math($('#pmtAmt').numberspinner('getValue'), $('#marginAmt').val(), 'sub');
			}
		}else{
			 tempVal=0;
		}
		
		tempVal = SCFUtils.Math(tempVal, pldPerc, 'div').toFixed(2);
		//计算后赋值给最低库存价值
		$('#numRegLowestVal').numberspinner('setValue',SCFUtils.Math($('#regLowestVal').val(), tempVal, 'sub'));
	}
	if(SCFUtils.FUNCTYPE == 'PM'){
		var openLoanAmt = $('#openLoanAmtH').val()==""?$('#openLoanAmt').val():$('#openLoanAmtH').val();
		var ttlLoanBal = $('#ttlLoanBalOld').val();
		$('#ttlPmtAmt').val($('#pmtAmt').numberspinner('getValue'));
		$('#ttlLoanBal').numberspinner('setValue',SCFUtils.Math($('#ttlLoanBalOld').val(),$('#pmtAmt').numberspinner('getValue'),'sub'));
		$('#openLoanAmt').numberbox('setValue',SCFUtils.Math(openLoanAmt, $('#pmtAmt').numberspinner('getValue'), 'sub'));
		//还款时，最低库存价值计算公式变更: 最低库存价值=原协议中最低库存价值-【（本次还款金额-该笔融资缴纳的保证金金额）/质押率】
		//YeQing modify on 2016-10-11
		//获取质押率
		var pldPerc = SCFUtils.Math($('#pldPerc').numberspinner('getValue'), 0.01, 'mul');
		var tempVal=0;
		if(SCFUtils.Math($('#pmtAmt').numberspinner('getValue'), $('#marginAmt').val(), 'sub')>0){
			//如果(放款金额-融资余额)>0 则不是第一次还款
			if(SCFUtils.Math($('#ttlLoanAmt').numberspinner('getValue'), ttlLoanBal, 'sub')>0){
				 tempVal = $('#pmtAmt').numberspinner('getValue');
			}else{
				//计算（本次还款金额-该笔融资缴纳的保证金金额）/质押率
				 tempVal = SCFUtils.Math($('#pmtAmt').numberspinner('getValue'), $('#marginAmt').val(), 'sub');
			}
		}else{
			tempVal=0;
		}
		

		tempVal = SCFUtils.Math(tempVal, pldPerc, 'div').toFixed(2);
		//计算后赋值给最低库存价值
		$('#numRegLowestVal').numberspinner('setValue',SCFUtils.Math($('#regLowestVal').val(), tempVal, 'sub'));
	}
}


function pageOnInt(data) {
	SCFUtils.setFormReadonly('#pmtForm', true);
	SCFUtils.setNumberspinnerReadonly('pmtAmt', false);
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

function calc(){
	var ttlLoanBal=$('#ttlLoanBal').numberspinner('getValue');
//	$('#ttlPmtAmt').val(ttlLoanBal);
	//融资余额
	var numTtlLoanBal=(SCFUtils.Math(ttlLoanBal, $('#pmtAmt').numberspinner('getValue'), 'sub'));
	//$('#ttlLoanBal').numberspinner('setValue',numTtlLoanBal);
	$('#numTtlLoanBal').val(numTtlLoanBal);
//	//已放款敞口
//	var regLoanBal=$('#regLoanBal').numberspinner('getValue');
//	var numRegLoanBal=(SCFUtils.Math(regLoanBal, $('#pmtAmt').numberspinner('getValue'), 'sub'));
//	$('#numRegLoanBal').val(numRegLoanBal);
	//协议内融资余额
	var openLoanAmt = $('#openLoanAmt').numberspinner('getValue');
	$('#openLoanAmtH').val(openLoanAmt);
	//$('#openLoanAmt').numberspinner('setValue',SCFUtils.Math(openLoanAmt,$('#pmtAmt').numberspinner('getValue'),'sub'));
	//质押率
	var pldPerc =SCFUtils.Math($('#pldPerc').numberspinner('getValue'),0.01,'mul');
	//最低库存价值
//	if(SCFUtils.FUNCTYPE == 'PM'){
//		getRegLowestVal(pldPerc);
//	}else{
//		getRegLowestValRe(pldPerc);
//		
//	}
	/*$('#regLowestVal').val(SCFUtils.Math(SCFUtils.Math(
			$('#openLoanAmt').numberspinner('getValue'),marginBal,'sub')
				,pldPerc,'div'));*/
	
	//额度余额
	var lmtBal = $('#lmtBal').val();
	$('#lmtBal').val(SCFUtils.Math(lmtBal, $('#pmtAmt').numberspinner('getValue'), 'add'));
	//监管方额度余额
	var patnerLmtBal = $('#patnerLmtBal').val();
	$('#patnerLmtBal').val(SCFUtils.Math(patnerLmtBal, $('#pmtAmt').numberspinner('getValue'), 'add'));
}

/**
 * 计算最低库存价值
 */
function getRegLowestVal(pldPerc){
	var cntrctNo = $('#cntrctNo').val();
	var option = {
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000070',
				cntrctNo:cntrctNo,
				cacheType:'non'
			},
			callBackFun:function(data){
				if(data.success){
					// 汇总 协议项下的保证金余额
					var marginBal = 0.000;
					var regLowestVal = 0.00;
					$.each(data.rows,function(i, n) {
						marginBal = SCFUtils.Math(marginBal,n.marginBal,'add');
					});
					var val = SCFUtils.Math(SCFUtils.Math($('#openLoanAmt').numberspinner('getValue'),marginBal,'sub'), 
							$('#numRegLowestVal').numberspinner('getValue'), 'add');
					val<0?regLowestVal=0:regLowestVal = SCFUtils.Math(val,pldPerc,'mul');
					$('#regLowestVal').val(regLowestVal);
    			}
			}
	}
	SCFUtils.ajax(option);
}

/**
 * 计算最低库存价值
 */
function getRegLowestValRe(pldPerc){
	var cntrctNo = $('#cntrctNo').val();
	var option = {
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000627',
				cntrctNo:cntrctNo,
				cacheType:'non'
			},
			callBackFun:function(data){
				if(data.success){
					// 汇总 协议项下的保证金余额
					var marginBal = 0.000;
					var regLowestVal = 0.00;
					$.each(data.rows,function(i, n) {
						marginBal = SCFUtils.Math(marginBal,n.marginBal,'add');
					});
					var val = SCFUtils.Math(SCFUtils.Math($('#openLoanAmtHD').val(),marginBal,'sub'), 
							$('#numRegLowestVal').numberspinner('getValue'), 'add');
					val<0?regLowestVal=0:regLowestVal = SCFUtils.Math(val,pldPerc,'mul');
					$('#regLowestVal').val(regLowestVal);
    			}
			}
	};
	SCFUtils.ajax(option);
}

function pageOnFPLoad(data) {
	pageOnReleasePageLoad(data);
	loanQueryAjax(data.obj.loanId);
	/*$('#loanId').val(data.obj.sysRefNo);
	$('#pmtDt').datebox('setValue', getDate(new Date()));
	$('#trxDt').datebox('setValue', getDate(new Date()));
	$('#pmtAmt').numberspinner('setValue',ttlLoanBal);
	$('#numRegLowestVal').numberspinner('setValue',$('#regLowestVal').val());*/
	lookSysRelReason();
}

function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	$('#loanId').val(data.obj.sysRefNo);
	$('#marginAmt').val(data.obj.marginAmt);
	loanQueryAjax(data.obj.sysRefNo);
	cntrctAjax();
	$('#pmtDt').datebox('setValue', getDate(new Date()));
	$('#trxDt').datebox('setValue', getDate(new Date()));
	var options={};
	options.data = {
			refName: 'PmtRef',
			refField:'sysRefNo'
				};
	SCFUtils.getRefNo(options);
	$('#pmtAmt').numberspinner('setValue',ttlLoanBal);
	calc(data);
	//$('#numRegLowestVal').numberspinner('setValue',$('#regLowestVal').val());
	$('#pmtAmt').numberbox({max:SCFUtils.Math($('#ttlLoanBal').numberbox('getValue'),0,'add')});
	lookSysRelReason();
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	$('#openLoanAmtH').val(data.obj.openLoanAmtH);
	SCFUtils.loadForm('pmtForm',data);
	$('#numRegLowestVal').numberspinner('setValue',data.obj.numRegLowestVal);
	lookSysRelReason();
}

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('pmtForm',data);
	$('#numRegLowestVal').numberspinner('setValue',data.obj.numRegLowestVal);
	$('#OldSysRelReason').textbox('setValue',data.obj.OldSysRelReason);
	$('#sysRelReason').textbox('setValue',data.obj.sysRelReason);
	lookSysRelReason();
}
function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	loanQueryAjaxRe(data.obj.loanId);
	cntrctAjaxRe();
	$('#loanId').val(data.obj.loanId);
	$('#sysRefNo').val(data.obj.sysRefNo);
	$('#pmtDt').datebox('setValue', getDate(new Date()));
	$('#trxDt').datebox('setValue', getDate(new Date()));
	if(SCFUtils.FUNCTYPE =='FP'){
		cntrctAjaxFP();
		loanQueryAjaxFP(data.obj.loanId);
		$('#openLoanAmtHD').val(SCFUtils.Math($('#openLoanAmtHD').val(), data.obj.ttlPmtAmt, 'add'));
		$('#ttlLoanBalOld').val(SCFUtils.Math($('#ttlLoanBal').numberspinner('getValue'), data.obj.ttlPmtAmt, 'add'));
		$('#pmtAmt').numberbox({max:SCFUtils.Math($('#ttlLoanBal').numberbox('getValue'),data.obj.ttlPmtAmt,'add')});
	}
	$('#pmtAmt').numberspinner('setValue',data.obj.ttlPmtAmt);
	$('#ttlPmtAmt').val(data.obj.ttlPmtAmt);
	calc();
//	var numTtlLoanBal=(SCFUtils.Math($('#ttlLoanBalOld').val(), SCFUtils.Math( $('#ttlLoanAmt').numberspinner('getValue'), $('#pmtAmt').numberspinner('getValue'), 'sub'), 'add'));
//	$('#numTtlLoanBal').val(numTtlLoanBal);
	
	//$('#numRegLowestVal').numberspinner('setValue',$('#regLowestVal').val());
//	$('#ttlLoanBal').numberspinner('setValue',$('#numTtlLoanBal').val());
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

function checkPmtAmt(){
	var flag = false;
	var pmtAmt = $('#pmtAmt').numberspinner('getValue');
	//var ttlLoanBal = $('#ttlLoanBal').numberspinner('getValue');
	var ttlLoanBal = $('#ttlLoanBalOld').val();//FP时候要给ttlLoanBalOld重新赋值
	if(SCFUtils.Math(pmtAmt,ttlLoanBal,'sub')>0){
		SCFUtils.alert("本次还款金额超出融资余额！");
		flag = true;
	}
	return flag;
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
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#pmtAmt').numberspinner('getValue'),'add') ;//卖方额度余额=原卖方额度余额+还款金额
		obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#pmtAmt').numberspinner('getValue'),'sub') ;//本次占用额度=原来占用额度-还款金额
		obj.lmtRecover = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtRecover,$('#pmtAmt').numberspinner('getValue'),'add') ;//归还额度=原归还额度+还款余额

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
	var grid = {};
	if(SCFUtils.isEmpty($('#pmtAmt').numberspinner('getValue'))){
		SCFUtils.alert("请输入还款金额！");
		return;
	}
	
	if(SCFUtils.FUNCTYPE =='PM' || SCFUtils.FUNCTYPE =='FP'){
		if(checkPmtAmt()){
			return;
		}
	}
	
	var data = SCFUtils.convertArray('pmtForm');
	
	var cntrctNo = data.cntrctNo;//协议编号
	//协议相关信息
	var cntrct=queryCntrctInfo(cntrctNo);
	var pmtAmt = data.pmtAmt;//还款金额
	$.extend(data, {
		"cntrctLmtCcy" : cntrct.lmtCcy ,//额度币别
		
		"cntrctLmtBal" : SCFUtils.Math(cntrct.lmtBal, pmtAmt, 'add'),//协议_额度余额 = 原额度余额+本次释放金额（即：本次还款金额）
		
		'cntrctLmtAmt' : cntrct.lmtAmt, //协议_额度金额
		
		'cntrctLmtAllocate' : SCFUtils.Math(cntrct.lmtAllocate, pmtAmt, 'sub'), //协议_占用额度 = 原占用额度-本次释放金额（即：本次还款金额）
		
		'cntrctLmtRecover' :SCFUtils.Math(cntrct.lmtRecover, pmtAmt, 'add'), //协议_归还额度 =原归还额度+本次释放金额（即：本次还款金额）
		'sysRelReason' : $('#sysRelReason').val(),
		'OldSysRelReason' : $('#OldSysRelReason').val(),
	});
	//打包卖方额度数据
	grid.sellerLmt = SCFUtils.json2str(getSellerData());
	$.extend(data,grid);
	return data;
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






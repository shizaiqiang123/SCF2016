/**
 * 复合功能时，进入结果汇总页面
 * @param data
 */
function pageOnReleaseResultLoad(data) {
	isNeedChangeTtlAmt = false;
	SCFUtils.loadForm('loanSubmit', data);
	$("#loanAble").numberbox("setValue",data.obj.loanAble);
	$('#loanAbleOld').val(data.obj.loanAble);
	$('#querybutton').linkbutton('disable');
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnFPLoad(data){
	pageOnReleasePageLoad(data);
	queryCntrctM();//协议下融资余额重新计算
//	changeArBal(data.selId);//覆盖arBal和loanAbleOld
	queryLoanAbleNew();//协议下可融资金额重新计算
	lookSysRelReason();
	$('#ttlLoanAmt').numberbox({    
		max:parseFloat(SCFUtils.Math($("#loanAble").numberbox("getValue"),$("#ttlLoanAmt").numberbox("getValue"),'add')),
	});
}
/**
 * 复合功能时，Next进入交易页面
 * @param data
 */
function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('loanSubmit', row);
	$('#currFinPayCost').val(relQueryFeeE()[0].currFinPayCost);//应收账款处理费金额
	$('#currFinCost').val(relQueryFeeE()[0].currFinCost);//本次应收处理费
	$('#feeSysRefNo').val(relQueryFeeE()[0].sysRefNo);//插入fee表时候的流水号字段 relQueryIntE
	$('#intSysRefNo').val(relQueryIntE()[0].sysRefNo);//插入int表时候的流水号字段 relQueryIntE
	$('#currInt').val(relQueryIntE()[0].currInt);//本次应收利息
	$('#currPayInt').val(relQueryIntE()[0].currPayInt);//本次应收利息
	$('#currIntDt').val(relQueryIntE()[0].currIntDt);//本次应收利息
	$('#currIntPayDt').val(relQueryIntE()[0].currIntPayDt);//本次应收利息
	
	$('#intAmt').numberbox("setValue",data.obj.intAmt);
	$('#pdgAmt').numberbox("setValue",data.obj.pdgAmt);
	$('#loanAble').numberbox("setValue",data.obj.loanAble);
	$('#loanAbleOld').val(data.obj.loanAble);
	$('#ttlLoanAmtOld').val(data.obj.ttlLoanAmt);
	
	queryCntrctE();
	changeArBal(data.selId);//在queryCntrctE的调用函数之下。覆盖arBal和loanAbleOld
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}


/**
 * 复合功能时，Pre进入交易页面
 * @param data
 */
function pageOnReleasePreLoad(data) {
	isNeedChangeTtlAmt = true;
	SCFUtils.loadForm('loanSubmit', data);
	$('#querybutton').linkbutton('disable');
	$("#loanAble").numberbox("setValue",data.obj.loanAble);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

/**
 * 申请功能时，进入结果页面
 * @param data
 */
var isNeedChangeTtlAmt = true;
function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	isNeedChangeTtlAmt = false;
	SCFUtils.loadForm('loanSubmit', data);
	lookSysRelReason();
}

/**
 * 申请功能时，Pre进入交易页面
 * @param data
 */
function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	isNeedChangeTtlAmt = false;//【应收账款池融资 > 融资申请 > 申请】点击下一步、上一步可融资金额计算有误"20160831
	SCFUtils.loadForm('loanSubmit', data);
	isNeedChangeTtlAmt = true;//解决返回 上一步时，修改融资金额不能自动计算的问题20160831
	lookSysRelReason();
}

/**
 * 申请功能时，Next进入交易页面
 * @param data
 */
function pageOnLoad(data){
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('loanSubmit', data);
	$('#ccy').val(data.obj.lmtCcy);
	$('#cntrctNo').val(data.obj.sysRefNo);
	queryCustAcno(data);
	$('#lmtAmtHd').val(data.obj.lmtAmt);
	$('#lmtBalHd').val(data.obj.lmtBal);
	$('#lmtBalHd').val(data.obj.lmtBal);
	$('#openLoanAmtOld').val(data.obj.openLoanAmt);
	$('#lmtAmt').val($('#lmtAmtHd').val());
	$('#lmtBal').val($('#lmtBalHd').val());
	$('#lmtAllocate').val($('#lmtAllocateHd').val());
	$('#transChgrt').val(data.obj.transChgrt);
	$('#poolLine').val(data.obj.poolLine);//池水位 
	$('#buyerLmtSysRefNo').val(data.obj.lmtSysRefNo);//买方额度流水号
	var refRequest={};
	refRequest.data = {
		refName: 'PoolLoanRef',
		refField:'sysRefNo'
	};
	SCFUtils.getRefNo(refRequest);
	
	querySelInfo();
	setDueDt(data.obj.sysRefNo);
	queryLoanPct();
//	queryLoanAble();//取消onLoad的可融资金额计算。在选定供应商时计算
	var date=new Date();
	$("#loanValDt").datebox("setValue",SCFUtils.dateFormat(date,"yyyy-MM-dd"));//20160831融资起始日默认当前时间
	lookSysRelReason();
	//最大值控制放入供应商查询成功中
//	$('#ttlLoanAmt').numberbox({    
//		max:parseFloat($("#loanAble").numberbox("getValue")),
//	}); 
}



/**
 * 所有进入交易页面 公共的方法
 * @param data
 */
function pageOnInt() {
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setNumberspinnerReadonly("openLoanAmt", true);
	SCFUtils.setNumberspinnerReadonly("intAmt", true);
	SCFUtils.setComboReadonly("payIntTp", true);
	SCFUtils.setTextReadonly('ccy', true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setNumberboxReadonly('pdgAmt', true);
	SCFUtils.setNumberspinnerReadonly("loanAble", true);
	SCFUtils.setNumberspinnerReadonly("intAmt", true);
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
		
	} else if (SCFUtils.FUNCTYPE == "DP" || SCFUtils.FUNCTYPE == "RE") {
		$('#messageDivFa').css('display', 'none');
	} else {
		$('#messageDivFa').css('display', 'none');
	}
}

function setDueDt(data){
	if(!SCFUtils.isEmpty(data)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000419',
					trxId : data
				},
				callBackFun : function(data) {
					$('#dueDt').val(data.rows[0].graceDay);
				}
			};
			SCFUtils.ajax(opt);
	}
	if('PM'==SCFUtils.FUNCTYPE || 'FP'==SCFUtils.FUNCTYPE){
		var loanDueDt = $('#loanDueDt').datebox('getValue');
		if(!SCFUtils.isEmpty(loanDueDt)){
			var dueDt = $("#dueDt").val();
			$("#loanOverdueDt").val(SCFUtils.FormatDate(loanDueDt, dueDt));
		}
	}
	
}

function getDueDt(){
	if('PM'==SCFUtils.FUNCTYPE || 'FP'==SCFUtils.FUNCTYPE){
		var loanDueDt = $('#loanDueDt').datebox('getValue');
		if(!SCFUtils.isEmpty(loanDueDt)){
			var dueDt = $("#dueDt").val();
			$("#loanOverdueDt").val(SCFUtils.FormatDate(loanDueDt, dueDt));
		}
	}
	
	var loanDueDt = $('#loanDueDt').datebox("getValue");
	var trxDt =$('#trxDt').val();
	if (SCFUtils.DateDiff(loanDueDt, trxDt)<0 ) {
		SCFUtils.alert("融资到期日不能小于当前日期,请修改");
		return ;
	}
}

//查询用户客户号，客户经理，登记机构
function querySelInfo(){
	var selId = $('#selId').val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000414',
				sysRefNo : selId
			},
			callBackFun : function(data) {
				$('#cmsCustNo').val(data.rows[0].cmsCustNo);
				$('#custMgrId').val(data.rows[0].custMgrId);
				$('#custBrId').val(data.rows[0].custBrId);
			}
		};
		SCFUtils.ajax(opt);

	
}

//退回时查询协议
function queryCntrctM(){
	var cntrctNo = $('#cntrctNo').val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000655',
				sysRefNo : cntrctNo
			},
			callBackFun : function(data) {
				$('#openLoanAmt').numberbox("setValue",data.rows[0].openLoanAmt);
				$('#openLoanAmtOld').val(data.rows[0].openLoanAmt);
//				$('#arBal').numberspinner('setValue',data.rows[0].arBal);
				$('#transChgrt').val(data.rows[0].transChgrt);
				$('#lmtBal').val(data.rows[0].lmtBal);
				$('#lmtBalHd').val(data.rows[0].lmtBal);
			}
		};
		SCFUtils.ajax(opt);
}

//复核时查询协议
function queryCntrctE(){
	var cntrctNo = $('#cntrctNo').val();
	var sysRefNo = $('#sysRefNo').val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000561',
				sysRefNo : cntrctNo,
				loanId : sysRefNo,
				
			},
			callBackFun : function(data) {
				$('#openLoanAmt').numberbox("setValue",data.rows[0].openLoanAmt);
//				$('#arBal').numberspinner('setValue',data.rows[0].arBal);
				$('#transChgrt').val(data.rows[0].transChgrt);
				$('#lmtBal').val(data.rows[0].lmtBal);
				$('#lmtBalHd').val(data.rows[0].lmtBal);
			}
		};
		SCFUtils.ajax(opt);
}
//查询融资比例
function queryLoanPct(){
	var cntrctNo = $('#cntrctNo').val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000383',
				cntrctNo : cntrctNo
			},
			callBackFun : function(data) {
				$('#loanPct').val(data.rows[0].loanPct);
			}
		};
		SCFUtils.ajax(opt);
}

//查询池协议下：可融资金额 LOAN_ABLE= MIN【卖方可用额度，（关联额度内有效应收账款净额*融资比例）】—已用敞口
//公式变更：可融资金额AR_AVAL_LOAN= MIN【卖方可用额度，池水位】—已用敞口  YeQing modify on 2016-9-5
//function queryLoanAble(){
//	var lmtBal =$('#lmtBalHd').val();//卖方可用额度
//	var openLoanAmt = $('#openLoanAmt').numberspinner('getValue');//已融资敞口
//	//var loanPct = SCFUtils.Math($('#loanPct').val(), 0.01, 'mul');//融资比例
//	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
//	var cntrctNo = $('#cntrctNo').val();
//	//协议相关信息
//	var cntrct=queryCntrctInfo(cntrctNo);
//	
//	var poolLine =cntrct.poolLine;//池水位
//	if(SCFUtils.FUNCTYPE == 'FP'){
//		openLoanAmt = SCFUtils.Math(openLoanAmt, ttlLoanAmt, 'add');
//		$('#openLoanAmt').numberbox("setValue",openLoanAmt);
//		$('#openLoanAmtOld').val(openLoanAmt);
//	}
//	
//	//MIN【卖方可用额度，池水位】
//	var lob = (SCFUtils.Math(lmtBal,poolLine, 'sub')<0)?lmtBal:poolLine;
//	//计算可融资金额
//	$('#loanAble').numberspinner('setValue',SCFUtils.Math(lob, openLoanAmt, 'sub'));
//	$('#loanAbleOld').val(SCFUtils.Math(lob, openLoanAmt, 'sub'));
//}

/*
 *可融资金额AR_AVAL_LOAN= MIN【卖方可用额度，根据供应商得出的loanAble】  JJH modify on 2016-9-5
 *根据供应商得出的loanAble 已经扣减了已融资的金额
 */
function queryLoanAbleNew(){
	var lmtBal =$('#lmtBalHd').val();//卖方可用额度
	var openLoanAmt = $('#openLoanAmt').numberspinner('getValue');//已融资敞口
	var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var loanAble = $("#loanAble").numberspinner("getValue");
	if(SCFUtils.FUNCTYPE == 'FP'){
		openLoanAmt = SCFUtils.Math(openLoanAmt, ttlLoanAmt, 'add');
		$('#openLoanAmt').numberbox("setValue",openLoanAmt);
		$('#openLoanAmtOld').val(openLoanAmt);
	}
	
	//MIN【卖方可用额度，池水位】
	var lob = (SCFUtils.Math(lmtBal,loanAble, 'sub')<0)?lmtBal:loanAble;
	//计算可融资金额
	$('#loanAble').numberspinner('setValue',lob);
	$('#loanAbleOld').val(lob);
}


function onNextBtnClick() {
	var grid = {};
	var loanAbleOld;
	
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox("getValue");//本次融资金额
	if('FP' ==SCFUtils.FUNCTYPE){
	   // 原可融资金额 =原可融资金额+融资金额
	   loanAbleOld =SCFUtils.Math($('#loanAble').val(),ttlLoanAmt,'add');//原可融资金额
	}else{
		// 原可融资金额 =原可融资金额+融资金额 
	   loanAbleOld =$('#loanAbleOld').val();//原可融资金额
	}
	
	var loanDueDt = $('#loanDueDt').datebox("getValue");
	var loanValDt = $('#loanValDt').datebox('getValue');
	if (SCFUtils.DateDiff(loanDueDt, loanValDt)<0 ) {
		SCFUtils.alert("融资到期日不能小于融资日期,请修改!");
		return;
	}
	if(SCFUtils.FUNCTYPE != 'RE' && SCFUtils.FUNCTYPE != 'DP'){
		if(ttlLoanAmt == 0){
			SCFUtils.alert('本次融资金额为零,请填写融资金额！');
			return;
		}
		if(SCFUtils.Math(ttlLoanAmt, loanAbleOld, 'sub') > 0){
			SCFUtils.alert('本次融资金额已超出可融资金额，请修改融资金额！');
			return;
		}
		if(queryCntrctInfo($("#cntrctNo").val()).isSendSelLmt=="Y"){//Y代表分配额度。
			var queryLmtM = relQueryLmtM('1');
			if(SCFUtils.Math(ttlLoanAmt,queryLmtM.lmtBal,'sub')>0){
				SCFUtils.alert('本次融资金额已超出卖方额度，请修改融资金额！');
				return;
			}
		}else{
			var queryLmtM = relQueryLmtM('0');
			if(SCFUtils.Math(ttlLoanAmt,queryLmtM.lmtBal,'sub')>0){
				SCFUtils.alert('本次融资金额已超出买方额度，请修改融资金额！');
				return;
			}
		}
	}
	
	$("#ttlLoanBal").val(ttlLoanAmt);
	
	var mainData = SCFUtils.convertArray('loanSubmit');
	if(queryCntrctInfo($("#cntrctNo").val()).isSendSelLmt=="Y"){//Y代表分配额度。同时更新供应商和核心额度
		//打包买方额度数据
		grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
		//打包卖方额度数据
		grid.sellerLmt = SCFUtils.json2str(getSellerData());
	}else{
		//打包买方额度数据
		grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
	}
	grid.fee = SCFUtils.json2str(getFeeData());//打包费用表mainData
	grid.int = SCFUtils.json2str(getIntData());//打包利息表mainData
	$.extend(mainData, grid);
	return mainData;
}


function ajaxBox(){
	var busiTp = [{"id":'9',"text":"买方保理池"}];
	$("#busiTp").combobox('loadData',busiTp);
	SCFUtils.setComboReadonly("busiTp", true);
	var payIntTp = [ {
		"id" : '1',
		"text" : "预收息"
	}, {
		"id" : '2',
		"text" : "利随本清"
	}];
	$("#payIntTp").combobox('loadData',payIntTp);
	var lmtBal = $("#lmtBal").val();
	$("#lmtBalHd").val(lmtBal);
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly("selAcNm", true);
	SCFUtils.setTextReadonly("selAcBkNm", true);
	SCFUtils.setTextboxReadonly("arBal", true);
	var isCollect = [ {
		"id" : 'Y',
		"text" : "是"
	}, {
		"id" : 'N',
		"text" : "否"
	} ];
	$("#isCollect").combobox('loadData', isCollect);
	$("#isCollect").combobox('setValue', "Y");
}

/*
 * 是否收取费用下拉框onchange事件
 * */
function changecostPayFlg(){
	var costPayFlg=$('#costPayFlg').combobox('getValue');
	if(costPayFlg=='Y'){
		var currFinCost=$('#currFinCost').numberbox('getValue');
		$('#currFinPayCost').numberbox('setValue',currFinCost);
	}else{
		$('#currFinPayCost').numberbox('setValue',0);
	}
}


/*
 *获取当前日期
 * */
function getDate(date){
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}


function queryCustAcno(data){
	var acOwnerid=data.selId;
	if(!SCFUtils.isEmpty(acOwnerid)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000180',
					acOwnerid : acOwnerid,
					acFlag    : 'R',
					acTp    : '2'
				},
				callBackFun : function(data1) {
					if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
						$('#selAcNo').combobox('loadData', data1.rows);	
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}

function changeSelAcNo(){
	var selAcNo = $("#selAcNo").combobox("getValue");
	if(!SCFUtils.isEmpty(selAcNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000365',
					acNo : selAcNo,
				},
				callBackFun : function(data1) {
					if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
						$("#selAcNm").val(data1.rows[0].acNm);
						$("#selAcBkNm").val(data1.rows[0].acBkNm);
						
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}

/**
 * 融资金额的onchange事件
 */
function changeTtlLoanAmt(){
	if(isNeedChangeTtlAmt == false){
		return;
	}
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");
	var loanAble = $("#loanAbleOld").val();
	var openLoanAmt = $("#openLoanAmtOld").val();
	var lmtBal = $("#lmtBalHd").val();
	//var loanDueDt = $("#loanDueDt").datebox("getValue");
	//var loanValDt = $('#loanValDt').datebox('getValue');
	var ttlLoanAmtOld = $("#ttlLoanAmtOld").val();
	//1.利息计算
	countIntAmt();
	//2.手续费计算
	countPdgAmt();
	if('FP' ==SCFUtils.FUNCTYPE ){
		
		//当前输入金额> 原来输入金额 则 可融资金额 = 原来可融资金额 -（当前输入金额- 原来输入金额）
		if(SCFUtils.Math(ttlLoanAmt, ttlLoanAmtOld, 'sub')>0){
			//可融资金额 = 原来可融资金额 -（当前输入金额- 原来输入金额）
			var temp = SCFUtils.Math(ttlLoanAmt, ttlLoanAmtOld, 'sub');
			$("#loanAble").numberbox("setValue",SCFUtils.Math(loanAble, temp, 'sub'));
			//已融资敞口计算 = 原已融资金额+（当前输入金额- 原来输入金额）
			$("#openLoanAmt").numberbox("setValue",SCFUtils.Math(openLoanAmt, temp, 'add'));
			//5.协议余额计算
			$("#lmtBal").val(SCFUtils.Math(lmtBal, ttlLoanAmt, 'sub'));
		}else{
			//（原来输入金额-当前输入金额 ）
			var temp = SCFUtils.Math(ttlLoanAmtOld,ttlLoanAmt , 'sub');
			//可融资金额 = 原来可融资金额 + （原来输入金额-当前输入金额 ）
			$("#loanAble").numberbox("setValue",SCFUtils.Math(loanAble, temp, 'add'));
			//已融资敞口计算 = 
			$("#openLoanAmt").numberbox("setValue",SCFUtils.Math(openLoanAmt, temp, 'sub'));
			//5.协议余额计算
			$("#lmtBal").val(SCFUtils.Math(lmtBal, ttlLoanAmt, 'sub'));
		}
		
	}else{
	//3.可融资金额计算
		$("#loanAble").numberbox("setValue",SCFUtils.Math(loanAble, ttlLoanAmt, 'sub'));
		//4.已融资敞口计算
		$("#openLoanAmt").numberbox("setValue",SCFUtils.Math(openLoanAmt, ttlLoanAmt, 'add'));
		//5.协议余额计算
		$("#lmtBal").val(SCFUtils.Math(lmtBal, ttlLoanAmt, 'sub'));
	}
}


function checkSel(subSel){
	if(subSel<0){
		SCFUtils.alert('本次申请融资余额必须小于授信客户额度余额！！！');
		return false;
	}else{
		return true;
	}
}

function checkLmt(subLmt){
	if(subLmt<0){
		SCFUtils.alert('本次申请融资余额必须小于授信客户额度余额！！！');
		return false;
	}else{
		return true;
	}
}

/*
 * 计算利息总金额
 * 利息金额=本次融资金额*融资天数*利率/360
 * */
function countIntAmt(){
	var payIntTp = $('#payIntTp').combobox('getValue');
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");//融资金额
	var loanDueDt = $("#loanDueDt").datebox("getValue");
	var loanValDt = $('#loanValDt').datebox('getValue');
	if (SCFUtils.DateDiff(loanDueDt, loanValDt)<0 ) {
		SCFUtils.alert("融资到期日不能小于融资日期,请修改!");
		return;
	}
	//本次应收利息 = 融资金额 * 正常利率 *（（融资到期日— 融资起始日） / 360）
	var loanRt =$('#loanRt').numberspinner('getValue')*0.01;//正常利率
	var subDate=SCFUtils.DateDiff(loanDueDt,loanValDt);//融资到期日— 融资起始日
	var intAmt=SCFUtils.Math(ttlLoanAmt, loanRt, 'mul');//融资金额 * 正常利率
	intAmt=SCFUtils.Math(intAmt, subDate, 'mul');//融资金额 * 正常利率*（融资到期日— 融资起始日）
	intAmt=SCFUtils.Math(intAmt, 360, 'div');//融资金额 * 正常利率*（融资到期日— 融资起始日）/360
	$("#currInt").val(intAmt);//本次应收利息
	
	if(payIntTp=='1'){
		$("#currPayInt").val(intAmt);//本次实收利息
		$('#intAmt').numberbox('setValue',intAmt);
		
	}else{
		$('#intAmt').numberbox('setValue',0);
		$("#currPayInt").val(0);//本次实收利息
	}
}

/*
 * 计算利息总金额
 * 利息金额=本次融资金额*融资天数*利率/360
 * */
function changeLoanRt(){
	var payIntTp = $('#payIntTp').combobox('getValue');
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");//融资金额
	var loanDueDt = $("#loanDueDt").datebox("getValue");
	var loanValDt = $('#loanValDt').datebox('getValue');
	if (SCFUtils.DateDiff(loanDueDt, loanValDt)<0 ) {
		SCFUtils.alert("融资到期日不能小于融资日期,请修改!");
		return;
	}
	//本次应收利息 = 融资金额 * 正常利率 *（（融资到期日— 融资起始日） / 360）
	var loanRt =$('#loanRt').numberspinner('getValue')*0.01;//正常利率
	var subDate=SCFUtils.DateDiff(loanDueDt,loanValDt);//融资到期日— 融资起始日
	var intAmt=SCFUtils.Math(ttlLoanAmt, loanRt, 'mul');//融资金额 * 正常利率
	intAmt=SCFUtils.Math(intAmt, subDate, 'mul');//融资金额 * 正常利率*（融资到期日— 融资起始日）
	intAmt=SCFUtils.Math(intAmt, 360, 'div');//融资金额 * 正常利率*（融资到期日— 融资起始日）/360
	$("#currInt").val(intAmt);//本次应收利息
	
	if(payIntTp=='1'){
		$("#currPayInt").val(intAmt);//本次实收利息
		$('#intAmt').numberbox('setValue',intAmt);
		
	}else{
		$('#intAmt').numberbox('setValue',0);
		$("#currPayInt").val(0);//本次实收利息
	}
}

//手续费计算:如果（Is_Collect=Y）则，手续费=融资金额* CNTRCT_M.trans_Chgrt
function countPdgAmt(){
	var isCollect = $('#isCollect').combobox('getValue');
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");//融资金额
	if(isCollect=='Y'){
		var transChgrt =$('#transChgrt').val()*0.01;
		var pdgAmt=SCFUtils.Math(ttlLoanAmt, transChgrt, 'mul');
		
		$('#currFinCost').val(pdgAmt);//本次应收处理费
		$('#pdgAmt').numberbox('setValue',pdgAmt);
	}else{
		$('#currFinCost').val(0);//本次应收处理费
		$('#pdgAmt').numberbox('setValue',0);
	}
}
/**
 * 从表格中取出index行的field的值 
 * @param tableId 表格ID
 * @param index 行号
 * @param field 字段名
 * @returns value
 */
function getRowIndexOfPro(tableId,index,field){
	//var rowData = $("#"+tableId).datagrid("getData");
	//var obj = rowData.rows[index];
	return eval("obj."+field);
}

/**
 * 还原融资总金额=融资总金额—本次融资金额
 * 还原协议额度
 * 还原客户额度
 * 减少当步产生的利息金额
 * */
function returnTtlLoanAmt(rowData){
	var intAmt=$('#intAmt').numberbox('getValue');
	var lmtBal=$('#lmtBal').val();//协议余额
	var subLmt=SCFUtils.Math(lmtBal, rowData.invLoanAmt,'add');
	$('#lmtBal').val(subLmt);
	var ttlLoanAmt=$('#ttlLoanAmt').numberbox('getValue');
	ttlLoanAmt=	SCFUtils.Math(ttlLoanAmt, rowData.invLoanAmt, 'sub');
	$('#ttlLoanAmt').numberbox('setValue', ttlLoanAmt);
	//费率
	var finChgrt=SCFUtils.Math($('#finChgrt').numberspinner('getValue'), 100, 'div');
	//本次应收费用
	var currFinCost=SCFUtils.Math(finChgrt, ttlLoanAmt, 'mul');
	$('#currFinCost').numberbox('setValue',currFinCost);
	//利息计算
	var intAmtGD=parseFloat(rowData.intAmt).toFixed(2);//卖方额度余额
	intAmt=SCFUtils.Math(intAmt,intAmtGD,'sub');
	$('#intAmt').numberbox('setValue',intAmt);
}


//费用表数据打包
function getFeeData() {
	var fee = {};// 添加费用信息
	fee._total_rows = 1;
	//生成fee的流水号，feeSysRefNo
	var options = {};
	var costPayFlg;
	var trxDt;
	if('PM' === SCFUtils.FUNCTYPE){
		options.data = {
				refName : 'FeeRef',
				refField : 'feeSysRefNo'
		};
		SCFUtils.getRefNo(options);
		trxDt = SCFUtils.getcurrentdate();
	}else{
		trxDt = relQueryFeeE()[0].trxDt;
	}
	if($("#isCollect").combobox('getValue')=='Y'){//收取处理费
		 costPayFlg = 1;  //1.应收已收 (是否收取手续费选择 是)
	}else{
		 costPayFlg = 0;  //0.应收未收 (是否收取手续费选择 否)
	}

	var obj = {};
	obj.sysRefNo =  $('#feeSysRefNo').val();
	obj.trxDt = trxDt;//交易日期
	obj.selId = $("#selId").val();//授信客户编号
	obj.selAcNo =$("#selAcNo").combobox("getValue");//收费扣款账号
	obj.selAcNm = $("#selAcNm").val();//账户户名
	obj.selAcBkNm = $("#selAcBkNm").val();//开户行行名
	obj.busiTp =  $("#busiTp").combobox("getValue");// 产品类型
	obj.costTp = 0;//费用类型  0.融资手续费    1.应收账款处理费
	obj.costCcy = $('#ccy').val();//币别
	obj.costAmt = '';//总费用金额
	obj.costFinCost = '';//本次应收手续费
	obj.costFinPayCost = '';//本次已收手续费
	obj.costfinPayDt =  getDate(new Date());//本次收取费用日期
	obj.costPayFlg =  costPayFlg;//费用收取标志
	obj.theirRef = $("#sysRefNo").val();//关联编号
	obj.costItem =  0;//收费项目 0 手续费 1 应收账款处理费
	obj.remark =  ''; //备注
	obj.totalTransPayCost =  '';//累计已收处理费
	obj.currFinCost =  $("#currFinCost").val();//本次应收处理费
	
	var isCollect = $('#isCollect').combobox('getValue');//是否收取费用
	if(isCollect =='Y'){
		obj.currFinPayCost =  $("#currFinCost").val();//本次收取处理费
	}else{
		obj.currFinPayCost =  0;//本次收取处理费
	}
	
	//obj.currFinPayCost =   $("#currFinPayCost").val();//本次收取处理费
	obj.cntrctNo = $('#cntrctNo').val();
	
	obj.trxDate = getDate(new Date());
	fee['rows0'] = obj;
	return fee;
}

//利息表数据打包
function getIntData() {
	var int = {};// 添加额度变动表
	int._total_rows = 1;
	var options = {};
	var trxDt;
	var payIntTp = $("#payIntTp").combobox('getValue');
	if('PM' === SCFUtils.FUNCTYPE){
		options.data = {
				refName : 'IntRef',
				refField : 'intSysRefNo'
		};
		SCFUtils.getRefNo(options);
		trxDt = SCFUtils.getcurrentdate();
	}else{
		trxDt = relQueryIntE()[0].trxDt;
	}
	
	var obj = {};
	obj.sysRefNo = $('#intSysRefNo').val();
	obj.trxDt = trxDt;//交易日期
	obj.selId = $("#selId").val();//授信客户编号
	obj.selAcNo =$("#selAcNo").combobox("getValue");//收费扣款账号
	obj.selAcNm = $("#selAcNm").val();//账户户名
	obj.selAcBkNm = $("#selAcBkNm").val();//开户行行名
	obj.busiTp = $("#busiTp").combobox("getValue");// 产品类型
	obj.intTp = 0;//利息类型 0.正常利息  1.逾期利息 2.展期利息 3.呆账利息
	//obj.INT_CCY = $('#ccy').combobox("getValue");//币别
	obj.intCcy = $('#ccy').val();//币别
	obj.intAmt = '';//总利息金额
	obj.currInt = $("#currInt").val();//本次应收利息
	obj.currPayInt = $("#currPayInt").val();//本次实收利息
	obj.createDt = getDate(new Date());//利息产生时间
	obj.intPayFlg = 0;//利息收取标志 0.应收未收 1.应收已收
	obj.payIntTp = payIntTp;//new 收取方式
	obj.overdueInt = '';//本次逾期利息
	
	
	obj.theirRef =  $("#sysRefNo").val();//关联编号（关联业务交易流水号）
	obj.remark = '';//备注
	if(payIntTp=='1'){//预收息
		obj.currIntDt = $('#loanValDt').datebox('getValue');//本次利息应收日期
		obj.currIntPayDt = $('#loanValDt').datebox('getValue');//本次利息实收日期
	}else{
		obj.currIntDt = $('#loanDueDt').datebox('getValue');//本次利息应收日期
		obj.currIntPayDt = '';//本次利息实收日期
	}
	
	obj.trxDate = getDate(new Date());
	int['rows0'] = obj;
	return int;
}

/*
 * 复核时候查询FEE的E表（catalog双表查询有冲突）
 */
function relQueryFeeE(){
	var selId = $("#selId").val();
	var sysRefNo = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000615',
			selId : selId,
			sysRefNo : sysRefNo
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
 * 复核时候查询INT的E表
 */
function relQueryIntE(){
	var selId = $("#selId").val();
	var sysRefNo = $("#sysRefNo").val();
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000618',
			selId : selId,
			sysRefNo : sysRefNo
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
//根据协议编号 查询供应商
function querySellerInfo(){
	var cntrctNo = $('#cntrctNo').val();
	var selNm = $('#selNm').val();
	var selId = $('#selId').val();
	var options = {
		title:'供应商查询',
		reqid:'I_P_000211',//买方保理池查询供应商公用
		data : {
			'cntrctNo' : cntrctNo,
			'selNm' : selNm,
			'selId' : selId
		},
		onSuccess:sellerSuccess
	};
	SCFUtils.getData(options);
}

function sellerSuccess(data){
	$('#selId').val(data.selId);
	$('#selNm').val(data.selNm);
	if($('#selId').val()!=null){
		$('#selId').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#selId').removeClass('validatebox-invalid');
	}
    //查询卖方账户
	queryCustAcno(data);
	//查询卖方额度
	querySellerLmt(data);
	//更改可融资余额 
	changeArBal(data.selId);
	//讲可融资金额与额度比较取小
	queryLoanAbleNew();
	$('#ttlLoanAmt').numberbox({    
		max:parseFloat($("#loanAble").numberbox("getValue")),
	}); 
}
function querySellerLmt(data){
	 var cntrctNo = $('#cntrctNo').val();//
	 var selId=data.selId;
	   if(!SCFUtils.isEmpty(selId)){
		  var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000638',
					selId : selId,
					cntrctNo : cntrctNo
				},
				callBackFun : function(data1) {
					if (data1.success && !SCFUtils.isEmpty(data1.rows)) {
						$('#sellerLmtSysRefNo').val(data1.rows[0].sysRefNo);//卖方额度流水号
						$('#sellerLmtBal').val(data1.rows[0].lmtBal);//卖方额度余额
						$('#sellerLmtBalHd').val(data1.rows[0].lmtBal);//卖方额度余额
						if (SCFUtils.isEmpty(data1.rows[0].ttlAllocate)) {
							$('#sellerTtlAllocate').val(0);//卖方占用额度
							$('#sellerTtlAllocateHd').val(0);
						}else{
							$('#sellerTtlAllocate').val(data1.rows[0].ttlAllocate);//卖方占用额度
							$('#sellerTtlAllocateHd').val(data1.rows[0].ttlAllocate);
						}
						
						//
					}
				}
			};
			SCFUtils.ajax(opt);
	    }
}

function getBuyerLmtData(){
	var buyerLmt = {};// 添加买方额度信息
	buyerLmt._total_rows = 1;
	var obj = {};
	var lmtTp = '0';
	//修改，将原先RE和FP事后查询lmtE表再减去融资金额的判断去掉。RE时候再次算lmt会导致多减去一次（edit on 2016-11-09  by JJH）
	if('RE'===SCFUtils.FUNCTYPE || "FP" === SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE){
		obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
//		obj.lmtBal = SCFUtils.Math(relQueryLmtE(lmtTp)[0].lmtBal,$('#ttlLoanAmt').val(),'sub') ;//买方额度余额=原买方额度余额-融资金额
//		obj.lmtAllocate = SCFUtils.Math(relQueryLmtE(lmtTp)[0].lmtAllocate,$('#ttlLoanAmt').val(),'add') ;//本次占用额度=原来占用额度+融资金额

	}else{
		obj.sysRefNo = $('#buyerLmtSysRefNo').val();
	}
	obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp).lmtBal,$('#ttlLoanAmt').val(),'sub') ;//买方额度余额=原买方额度余额-融资金额
	obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp).lmtAllocate,$('#ttlLoanAmt').val(),'add') ;//本次占用额度=原来占用额度+融资金额
	obj.theirRef = $('#sysRefNo').val();//
	
	buyerLmt['rows0'] = obj;
	return buyerLmt;

}

function getSellerData(){
	
	var sellerLmt = {};// 添加买方额度信息
	sellerLmt._total_rows = 1;
	var obj = {};
	var lmtTp = '1';
	//修改，将原先RE和FP事后查询lmtE表再减去融资金额的判断去掉。RE时候再次算lmt会导致多减去一次（edit on 2016-11-09  by JJH）
	if('RE'===SCFUtils.FUNCTYPE || "FP" === SCFUtils.FUNCTYPE || "DP" === SCFUtils.FUNCTYPE){
		obj.sysRefNo = relQueryLmtE(lmtTp)[0].sysRefNo;
//		obj.lmtBal = SCFUtils.Math(relQueryLmtE(lmtTp)[0].lmtBal,$('#ttlLoanAmt').val(),'sub') ;//买方额度余额=原买方额度余额-融资金额
//		obj.lmtAllocate = SCFUtils.Math(relQueryLmtE(lmtTp)[0].lmtAllocate,$('#ttlLoanAmt').val(),'add') ;//本次占用额度=原来占用额度
	}else{
		obj.sysRefNo = $('#sellerLmtSysRefNo').val();
	}
	obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp).lmtBal,$('#ttlLoanAmt').val(),'sub') ;//买方额度余额=原买方额度余额-融资金额
	obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp).lmtAllocate,$('#ttlLoanAmt').val(),'add') ;//本次占用额度=原来占用额度+融资金额
	
	obj.ttlAllocate = $('#sellerTtlAllocate').val();//已占用额度
	obj.theirRef = $('#sysRefNo').val();//
	
	sellerLmt['rows0'] = obj;
	return sellerLmt;
	
}

/*
 * 复核时候查询LMT的E表
 */
function relQueryLmtE(lmtTp){
	var cntrctNo = $("#cntrctNo").val();
	var selId= $("#selId").val();
	var sysLockBy =$("#sysRefNo").val();  
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000654',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp,
			sysLockBy:sysLockBy
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
function relQueryLmtM(lmtTp){
	var cntrctNo = $("#cntrctNo").val(); 
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000665',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp
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

function changeArBal(selId){
	var cntrctNo = $("#cntrctNo").val();
	var arBal = 0;
	var loanAble = 0;
	var ttlLoanBal = 0;
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000697',
				cntrctNo : cntrctNo,
				selId : selId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$.each(data.rows,function(i,n){
						arBal = SCFUtils.Math(arBal,n.invBal,'add');
						loanAble = SCFUtils.Math(loanAble,n.invLoanAval,'add');
					});
				}
			}
		};
		SCFUtils.ajax(options);
		//查询融资
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000698',
					cntrctNo : cntrctNo,
					selId : selId
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						$.each(data.rows,function(i,n){
							ttlLoanBal = SCFUtils.Math(ttlLoanBal,n.ttlLoanBal,'add');
						});
					}
				}
			};
			SCFUtils.ajax(options);
		$('#arBal').numberspinner('setValue',arBal);
		if('PM' ==SCFUtils.FUNCTYPE){
			$("#loanAble").numberspinner('setValue',SCFUtils.Math(loanAble,ttlLoanBal,'sub'));
			$("#loanAbleOld").val(SCFUtils.Math(loanAble,ttlLoanBal,'sub'));//选定供应商后去覆盖loanAbleOld的值
		}else{
			$("#loanAbleOld").val(SCFUtils.Math(loanAble,ttlLoanBal,'sub'));//选定供应商后去覆盖loanAbleOld的值
		}
}
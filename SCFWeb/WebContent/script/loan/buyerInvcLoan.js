//var list=[];
//var totalMarginAmt = 0.0000;
//var totalLoanAval =0.0000;
//var numFlag = 0;
//var cntrOrAmt;
var ischangeInvcAval = true;
////定义一个全局变量，用于FP判断是否初次加载未点击table中的查询按钮。
////true为是FP初次加载未点击查询按钮。false为点击了查询按钮后的FP
var isFPfirst = false;
/**
 * 复合功能时，进入结果汇总页面
 * @param data
 */
function pageOnReleaseResultLoad(data) {
//	SCFUtils.loadForm('loanSubmit', data);
//	changeLoanTp();
//	changePayIntTp();
//	SCFUtils.setNumberboxReadonly("marginAmt", true);
//	SCFUtils.setTextboxReadonly("marginAcNo", true);
//	//queryCust(data);
//	SCFUtils.loadGridData('invcLoanTable', SCFUtils.parseGridData(data.obj.invc), true);// 加载数据并保护表格
//	$('#querybutton').linkbutton('disable');
//	$('#invcLoanTable').datagrid('checkAll');
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}


function pageOnFPLoad(data){
	isFPfirst = true;
	pageOnReleasePageLoad(data);
	queryCustAcno(data);
	$('#querySellerInfobutton').linkbutton('disable');
	$('#querybutton').linkbutton('enable');
	SCFUtils.setComboReadonly("selAcNo", true);
//	SCFUtils.loadForm('loanSubmit', data);
	$("#loanAble").numberbox('setValue',data.obj.loanAble);//页面上的可融资金额需要再次赋值一次，因主表加载时触发各种onchange事件改变此值
	cntrOrAmt=$('#lmtBal').val();
	$('#lmtAmtHd').val(data.obj.lmtAmt);
	$('#lmtBalHd').val(SCFUtils.Math(data.obj.lmtBal, data.obj.ttlLoanAmt, 'add'));
	$('#lmtAllocateHd').val(SCFUtils.Math(data.obj.lmtAllocate, data.obj.ttlLoanAmt, 'sub'));

	$('#lmtBal').val($('#lmtBalHd').val());
	$('#lmtAllocate').val($('#lmtAllocateHd').val());
	
	SCFUtils.setNumberboxReadonly('intAmt', true);
	var options =$('#invcLoanTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	//loadRelTab(data);
	setLoanValue(SCFUtils.Math(data.obj.loanAble,data.obj.ttlLoanAmt,'add'));
	$('#ttlLoanAmt').numberbox("setValue",data.obj.ttlLoanAmt);
	$('#loanAble').numberbox("setValue",data.obj.loanAble);
	$('#intAmt').numberbox("setValue",data.obj.intAmt);
	$('#pdgAmt').numberbox("setValue",data.obj.pdgAmt);
	//协议相关信息
	var cntrct=queryCntrctInfo(data.obj.cntrctNo);
	$('#transChgrt').val(cntrct.transChgrt);
	changePayIntTp();
	isFPfirst = false;//$("#invcLoanTable").datagrid('selectAll');语句结束就放开。isFPfirst只控制了oncheckAll
//	gridData = SCFUtils.getGridData('invcLoanTable');
	lookSysRelReason();
}

/**
 * 根据协议编号查询买方信息
 */
/*function queryBuyerInfo(cntrctNo,buyerId) {
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
*//**
 * 复合功能时，Next进入交易页面
 * @param data
 */
function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	
	SCFUtils.loadForm('loanSubmit', data);
	$('#currFinPayCost').val(relQueryFeeE()[0].currFinPayCost);//应收账款处理费金额
	$('#currFinCost').val(relQueryFeeE()[0].currFinCost);//本次应收处理费
	$('#feeSysRefNo').val(relQueryFeeE()[0].sysRefNo);//插入fee表时候的流水号字段 relQueryIntE
	$('#intSysRefNo').val(relQueryIntE()[0].sysRefNo);//插入int表时候的流水号字段 relQueryIntE
	$('#currInt').val(relQueryIntE()[0].currInt);//本次应收利息
	$('#currPayInt').val(relQueryIntE()[0].currPayInt);//本次应收利息
	$('#currIntDt').val(relQueryIntE()[0].currIntDt);//本次应收利息
	$('#currIntPayDt').val(relQueryIntE()[0].currIntPayDt);//本次应收利息
	loadRelTab(data);
	$("#loanAble").numberbox('setValue',data.obj.loanAble);//页面上的可融资金额需要再次赋值一次，因主表加载时触发各种onchange事件改变此值
	//changeLoanTp();
	//queryCollatCompNm(data.obj.insureNo);
	
	
	
	$('#intAmt').numberbox("setValue",data.obj.intAmt);
	$('#pdgAmt').numberbox("setValue",data.obj.pdgAmt);
	$('#querybutton').linkbutton('disable');
	$('#invcLoanTable').datagrid('checkAll');
	changePayIntTp();
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}
/*
function queryCollatCompNm(data){
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000428',
				cntrctNo : data
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$('#collatCompNm').textbox('setValue',data.rows[0].custNm);
					$('#insureLmtBal').val(data.rows[0].lmtBal);
					$('#collatNo').textbox('setValue',data.rows[0].lmtBal);
				}
			}
		};
		SCFUtils.ajax(options);
}
*//**
 * 复合功能时，Pre进入交易页面
 * @param data
 */
function pageOnReleasePreLoad(data) {
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('loanSubmit', data);
	//changeLoanTp();
	
	//SCFUtils.setNumberboxReadonly("marginAmt", true);
	//SCFUtils.setTextboxReadonly("marginAcNo", true);
	//queryCust(data);
	SCFUtils.loadGridData('invcLoanTable', SCFUtils.parseGridData(data.obj.invc), true);// 加载数据并保护表格
	changePayIntTp();
	$('#querybutton').linkbutton('disable');
	$('#invcLoanTable').datagrid('checkAll');
	lookSysRelReason();
}

/**
 * 申请功能时，进入结果页面
 * @param data
 */
function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('loanSubmit', data);
	changePayIntTp();
	SCFUtils.loadGridData('invcLoanTable', SCFUtils.parseGridData(data.obj.invc), true);// 加载数据并保护表格
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
	isFPfirst = true;
	SCFUtils.loadForm('loanSubmit', data);
	
	SCFUtils.loadGridData('invcLoanTable', SCFUtils.parseGridData(data.obj.invc),
			false);
	gridData = $("#invcLoanTable").datagrid('getSelections');
	var options =$('#invcLoanTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	$("#invcLoanTable").datagrid('selectAll');
	isFPfirst = false;
	changePayIntTp();
	lookSysRelReason();

}


/**
 * 所有进入交易页面 公共的方法
 * @param data
 */
function pageOnInt() {
	//设置只读字段
	setFieldsReadonly();
	//加载下拉框
	ajaxBox();
	//加载表格数据
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


function setFieldsReadonly(){
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setTextReadonly('ccy', true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setNumberspinnerReadonly("loanAble", true);
	SCFUtils.setNumberboxReadonly('pdgAmt', true);
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly("selAcNm", true);
	SCFUtils.setTextReadonly("selAcBkNm", true);
	SCFUtils.setNumberboxReadonly("intAmt", true);
	SCFUtils.setComboReadonly("payIntTp", true);
}

function ajaxBox(){
	var busiTp = [{"id":'8',"text":"国内买方单笔保理"}];
	$("#busiTp").combobox('loadData',busiTp);
	SCFUtils.setComboReadonly("busiTp", true);
	var payIntTp = [ {
		"id" : '1',
		"text" : "预收息"
	}, {
		"id" : '2',
		"text" : "利随本清"
	} ];
	$("#payIntTp").combobox('loadData',payIntTp);
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

function ajaxTable() {
	var options = {
			toolbar : '#toolbar',
			idField :  'sysRefNo',
			rownumbers : true,
			checkOnSelect : true,
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : true,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : [ [ {
				field : 'ck',
				checkbox : true
			},
			{
				field : 'sysRefNo',
				title : '交易流水号',
				width : 300,
				hidden:true,
			},
		    {
				field : 'buyerId',
				title : '核心企业编号',
				width : '9.09%'
			}, {
				field : 'buyerNm',
				title : '核心企业名称',
				width : '9.09%'
			},
			{
				field : 'invNo',
				title : '应收账款凭证号',
				width : '9.09%'
			},
			{
				field : 'invCcy',
				title : '币别',
				width : '9.09%'
			},
			{
				field : 'invBal',
				title : '应收账款净额',
				width : '9.09%',
				formatter:ccyFormater
			},
			{
				field : 'invValDt',
				title : '应收账款起算日',
				width : '9.09%',
				formatter: dateFormater
			},
			{
				field : 'invDueDt',
				title : '应收账款到期日',
				width : '9.09%',
				formatter: dateFormater
			}, {
				field : 'dueDt',
				title : '应收账款逾期日',
				width : '9.09%',
				formatter: dateFormater,
				hidden: true
			},
			 {
				field : 'loanAmt',
				title : '本次融资金额',
				width : 80,
				formatter:ccyFormater,
				hidden: true
			},
			{
				field : 'loanPerc',
				title : '融资比例',
				width : '9.09%',
				formatter:pectType
			}, {
				field : 'invLoanBal',
				title : '已融资金额',
				width : '9.09%'
			}, {
				field : 'invLoanBalHd',
				title : '已融资金额原值',
				width : 100,
				hidden: true
			},{
				field : 'invLoanAval',
				title : '可融资金额',//这里需求变更 除了2016/7/26后的修改 其他处的最大可融资金额都指该值  
				width : '9.09%',
				formatter:ccyFormater
			},{
				field : 'eventTimes',
				title : 'eventTimes',
				width : 100,
				hidden :true
			},{
				field : 'sysEventTimes',
				title : 'sysEventTimes',
				width : 100,
				hidden:true
			},{
				field : 'invRef',
				title : '应收账款主键',
				width : 100,
				hidden:true
			},{
				field : 'invcLoanId',
				title : '融资表主键',
				width : 100,
				hidden:true
			},{
				field : 'loanDueDtRe',
				title : '发票融资表主中的融资到期日',
				width : 100,
				hidden:true
			},{
				field : 'invId',
				title : '发票流水号',
				width : 100,
				hidden:true
			}
			] ]
		};
		$('#invcLoanTable').datagrid(options);
}

/**
 * 申请功能时，Next进入交易页面
 * @param data
 */
function pageOnLoad(data){
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	
	//页面加载数据
	SCFUtils.loadForm('loanSubmit', data);
	//设置必要的其他数据（主要是一些隐藏字段）
	setFieldsValue(data);
	//设置表格属性
	//setTableOptions();
	var options =$('#invcLoanTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	changePayIntTp();
	lookSysRelReason();
}

function setFieldsValue(data){
	$('#ccy').val(data.obj.lmtCcy);
	$('#cntrctNo').val(data.obj.sysRefNo);
	$('#buyerLmtBal').val(data.obj.lmtBal);//买方额度余额
	$('#buyerLmtBalHd').val(data.obj.lmtBal);
	$('#buyerTtlAllocate').val(data.obj.ttlAllocate);//买方占用额度
	$('#buyerTtlAllocateHd').val(data.obj.ttlAllocate);
	$('#buyerLmtSysRefNo').val(data.obj.lmtSysRefNo);//买方额度流水号
	$('#transChgrt').val(data.obj.transChgrt);//转让费率
	//流水号
	var refRequest={};
	refRequest.data = {
		refName: 'LoanRef',
		refField:'sysRefNo'
	};
	SCFUtils.getRefNo(refRequest);
	//setDueDt(data.obj.sysRefNo);
	var date=new Date();
	$("#loanValDt").datebox("setValue",SCFUtils.dateFormat(date,"yyyy-MM-dd"));//20160831融资起始日默认当前时间
	//queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
}

//根据协议编号 查询供应商
function querySellerInfo(){
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		title:'供应商查询',
		reqid:'I_P_000210',
		data : {'cntrctNo' : cntrctNo},
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
	if(queryCntrctInfo($("#cntrctNo").val()).isSendSelLmt=="Y"){//Y代表分配额度。
		var sellerLmt = relQueryLmtM('1');
		for(var i=0;i<sellerLmt.length;i++){
			if(sellerLmt[i].selNm == $("#selNm").val()){
				$("#lmtBalHd").val(sellerLmt[i].lmtBal);
				$("#lmtBal").val(sellerLmt[i].lmtBal);
				break;
			}
		}
	}else{
		$('#lmtBalHd').val(relQueryLmtM('0')[0].lmtBal);
		$('#lmtBal').val(relQueryLmtM('0')[0].lmtBal);
	}
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
		return false;
	}
}
function onNextBtnClick() {
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');
	var loanValDt = $('#loanValDt').datebox('getValue');
	var selId=$('#selId').val();
	var selName=$('#selNm').val();
	var busiTp=$('#busiTp').val();
	var trxDt=$('#trxDt').val();
	var loanAble=$('#loanAble').numberspinner('getValue');
	var mainData = SCFUtils.convertArray('loanSubmit');
	var sysRefNo = $('#sysRefNo').val();
	var ccy = $('#ccy').val();
	if(ttlLoanAmt==0){
		SCFUtils.alert('本次融资金额为零,请勾选应收账款！');
		return;
	}
	var grid = {};
	var griddata ; //=SCFUtils.getSelectedGridData('invcLoanTable',false);	
	if('RE'===SCFUtils.FUNCTYPE ||'DP'===SCFUtils.FUNCTYPE){
		griddata =SCFUtils.getGridData('invcLoanTable');	
	}else{
		griddata=SCFUtils.getSelectedGridData('invcLoanTable',false);
	}
	$.each(griddata,function(i,n){
		$.extend(n,{
			"loanValDt" : loanValDt //融资起始日为输入的日期--不限定当前日期
		});
	});
	//打包发票数据
	grid.invc = SCFUtils.json2str(griddata);
	//打包发票融资表数据
	grid.invcLoan = SCFUtils.json2str(griddata);
	//打包买方额度数据
	grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
	//打包卖方额度数据
	grid.sellerLmt = SCFUtils.json2str(getSellerData());
	//打包费用表mainData
	grid.fee = SCFUtils.json2str(getFeeData());
	//打包利息表mainData
	grid.int = SCFUtils.json2str(getIntData());
	$.extend($.extend(mainData, grid), {
		"loanAble" : loanAble
	}, {
		"selId" : selId
	}, {
		"selName" : selName
	}, {
		"busiTp" : busiTp
	}, {
		"trxDt" : trxDt
	}, {
		"custNo" : selId
	}, {
		"custNm" : selName
	}, {
		"refNo" : sysRefNo
	}, {
		"trxCcy" : ccy
	}, {
		"expTrxAmt" : loanAble
	}, {
		"clType" : "S"
	}, {
		"tdType" : "T"
	}, {
		"trxDate" : trxDt
	});
    changePayIntTp();
    //复核
	if('RE'===SCFUtils.FUNCTYPE){
		$.extend($.extend(mainData, grid), {
			"trxAmt" : loanAble
		});
		SCFUtils.SubmitAjax(mainData);
	}else{
		if(checkLoanDueDt()){
			return;
		}
		//getLmtBal();
		addEventTimes();//提交时给融资子表invc_loan的eventTimes字段赋值
		$.extend($.extend(mainData, grid), {
			"trxAmt" : ttlLoanAmt
		});
		SCFUtils.SubmitAjax(mainData);
	}
}

function checkLoanDueDt(){
	var data = $('#invcLoanTable').datagrid('getSelections');
	var flag = false;
	var loanDueDt = $('#loanDueDt').datebox('getValue');
	$.each(data,function(i,n){
		
		if(SCFUtils.DateDiff(n.dueDt,loanDueDt)>0){
			loanDueDt = n.dueDt;
			flag = true;
		}
	});
	if(flag){
		$('#loanDueDt').datebox('setValue','');
		SCFUtils.alert("融资到期日应不早于最晚应收账款逾期日"+loanDueDt);
	}
	return flag;
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
	obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#ttlLoanAmt').val(),'sub') ;//买方额度余额=原买方额度余额-融资金额
	obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#ttlLoanAmt').val(),'add') ;//本次占用额度=原来占用额度+融资金额
	obj.ttlAllocate = $('#buyerTtlAllocate').val();//已占用额度
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
	obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#ttlLoanAmt').val(),'sub') ;//买方额度余额=原买方额度余额-融资金额
	obj.lmtAllocate = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#ttlLoanAmt').val(),'add') ;//本次占用额度=原来占用额度+融资金额
	
	obj.ttlAllocate = $('#sellerTtlAllocate').val();//已占用额度
	obj.theirRef = $('#sysRefNo').val();//
	
	sellerLmt['rows0'] = obj;
	return sellerLmt;
	
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

function eachAdd(data){
	var trxDate=getDate(new Date());
	var sysRefNo=$('#sysRefNo').val();
	$.each(data,function(i,n){
		$('#invcLoanTable').datagrid('updateRow',{
			index : i,
			row:{
				loanPct : n.loanPerc,
				invRef 	: n.sysRefNo,
				invLoanId:sysRefNo
			}
		});
	});
}

function loadRelTab(data){
	var sysRefNo=data.obj.sysRefNo;
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000057',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					$.each(data.rows,function(i,n){
						$.extend(n,{
							loanDueDtRe : n.loanDueDt
						});
					});
					ajaxInvc(data.rows);
					gridData = data.rows;
				}
			}
		};
		SCFUtils.ajax(options);
}

//根据sysRefNo查询发票E表中最大evnetTImes
function queryInvcEmaxEventTImes(sysRefNo){
	var eventTimes = 1;
	var opts ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000203',
				sysRefNo:sysRefNo,
				cacheType:'non'
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					eventTimes = SCFUtils.Math(data.rows[0].eventTimes, 1, 'add');						
    			}
			}	
	};
	SCFUtils.ajax(opts);
	return eventTimes;
}

/**
 * 提交时给还款子表的eventTimes字段赋值
 * 还款子表的eventTimes值为发票E表中最大sysEventTImes+1
 */

function addEventTimes(){
	var griddata=SCFUtils.getSelectedGridData('invcLoanTable',false);	
	var datas = SCFUtils.parseGridData(griddata, false);
	$.each(datas, function(i, n) {
		var eventTimes=queryInvcEmaxEventTImes(n.invRef);
		$.extend(n,{
			eventTimes : eventTimes
		});	
	});
}
/*
 * 此方法reLoanTable中用，用于FP.DP.RE
 * 修改ajaxInvc方法的Query查询条件。
 * 不根据sysEventTimes去查询
 * 因为是RE.FP.DP初始进来的查询，根据sysTrxSts=T，sysLockBy=$sysRefNo$查询
 * edit on 2016-08-24 by JinJh
 */
function ajaxInvc(rows){
	var trxDate=$('#trxDt').val();
	var sysRefNo=$('#sysRefNo').val();
	var loanRt=$('#loanRt').numberspinner('getValue');
	var totalLoan = 0;
	$.each(rows,function(i,n){
		var sysRefNoTemp=rows[i].invRef;
		var sysEventTimes = rows[i].eventTimes;
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000018',
					sysRefNo : sysRefNoTemp,
					//根据sysEventTimes去查。FP退回处理再次勾选这笔的时候会查询不到数据。因为sysEventTimes不一样
					//sysEventTimes :sysEventTimes,
					sysLockBy : sysRefNo,
					cacheType:'non'
				},
				callBackFun : function(data) {
					if(data.success&&!SCFUtils.isEmpty(data.rows)){
						rows[i].invDt = data.rows[0].invDt;
						rows[i].invDueDt = data.rows[0].invDueDt;
						rows[i].invValDt = data.rows[0].invValDt;
						rows[i].loanPerc = data.rows[0].loanPerc;
						rows[i].invLoanAval = data.rows[0].invLoanAval;
						rows[i].invLoanBal = data.rows[0].invLoanBal;
//						rows[i].invLoanEbal = data.rows[0].invLoanAval;
						//融资申请已控制一笔发票只能融资一次，所以FP加载的时候invLoanEBal可以等于invLoanAvalHd
						rows[i].invLoanEbal = data.rows[0].invLoanAval+data.rows[0].invLoanBal;
						rows[i].loanPct = data.rows[0].loanPerc;
						rows[i].loanValDt = trxDate;
						rows[i].invLoanBal = data.rows[0].invLoanBal;
						rows[i].invSts = "LOAN";
						rows[i].sysRefNo = sysRefNo+data.rows[0].sysRefNo;
						rows[i].invcLoanId = sysRefNo;
						rows[i].invRef = data.rows[0].sysRefNo;
						rows[i].invLoanAvalHd = data.rows[0].invLoanAval+data.rows[0].invLoanBal;
						rows[i].sysEventTimes = data.rows[0].sysEventTimes;
						rows[i].ck=true;
					}
				}
			};
			SCFUtils.ajax(options);
			//new 
			totalLoan = SCFUtils.Math(totalLoan,rows[i].invLoanAvalHd,'add');
	});
	if('FP'==SCFUtils.FUNCTYPE){
		SCFUtils.loadGridData('invcLoanTable',rows,false,true);
		$("#flag").val(true);
	}else{
		SCFUtils.loadGridData('invcLoanTable',rows,true,true);
	}
	//给totalLoan字段赋值，为了复核的FP时候能将最大可融资金额计算出来。
	$("#totalLoan").val(totalLoan);
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
var gridData = null;
function loadTable() {
	ischangeInvcAval = false;
	$('#invcLoanTable').datagrid('clearSelections');
	$("#loanAble").numberspinner("setValue",0);
	var loanValDt = $('#loanValDt').datebox("getValue");
	var loanDueDt = $('#loanDueDt').datebox("getValue");
	var selId = $('#selId').val();
	var busiTp = $('#busiTp').val();
	var trxDt =$('#trxDt').val();
	if (SCFUtils.DateDiff(loanValDt, trxDt)<0 ||
			SCFUtils.DateDiff(loanDueDt, trxDt)<0 || 
			   SCFUtils.DateDiff(loanDueDt, loanValDt)<0) {
		SCFUtils.alert("融资日期必须晚于当前日期,且到期日必须晚于融资日期");
	}
	var data = SCFUtils.convertArray("loanSubmit");
	var cntrctNo = $('#cntrctNo').val();
	var mainTablesysRefNo = $("#sysRefNo").val();
	if(data){
		if ('PM' === SCFUtils.FUNCTYPE) {
			var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000644',
					selId : selId,
					busiTp : busiTp,
					trxDt : trxDt,
					cntrctNo : cntrctNo,
					cacheType : 'non'
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						appendFieldTotable(data.rows);
						gridData = data.rows;
						fullGrid(data.rows, false, true);
					} else {
						SCFUtils.alert("没有找到符合要求的应收账款!");
						$('#invcLoanTable').datagrid('loadData', {
							total : 0,
							rows : []
						});
					}
				}
			};
			SCFUtils.ajax(options);
		}else if ('FP' === SCFUtils.FUNCTYPE) {
			var options = {
					url : SCFUtils.AJAXURL,
					data : {
						queryId : 'Q_P_000521',
						selId : selId,
						busiTp : busiTp,
						trxDt : trxDt,
						cntrctNo : cntrctNo,
						mainTablesysRefNo : mainTablesysRefNo,
						cacheType : 'non'
					},
					callBackFun : function(data) {
						if (!SCFUtils.isEmpty(data.rows)) {
							appendFieldTotable(data.rows);
							gridData = data.rows;
							fullGrid(data.rows, false, true);
						} else {
							SCFUtils.alert("没有找到符合要求的应收账款!");
							$('#invcLoanTable').datagrid('loadData', {
								total : 0,
								rows : []
							});
						}
					}
				};
				SCFUtils.ajax(options);
			}
	}
	ischangeInvcAval = true;
	isFPfirst = false;
}


		
function changeTtlLoanAmt(){
	/*var currentPage = SCFUtils.CURRENTPAGE;
	var loanAble = $('#loanAble').numberspinner('getValue');
	if('RE'!=SCFUtils.FUNCTYPE && 'DP'!=SCFUtils.FUNCTYPE){
		if(currentPage==1){
			var loanTp = $("#loanTp").combobox("getValue");
			var lmtBal =$('#lmtBal').val();
				if(SCFUtils.Math(lmtBal, loanAble, 'sub')>0){
					$('#ttlLoanAmt').numberbox({    
						max:parseFloat(loanAble),
					}); 
				}else{
					$('#ttlLoanAmt').numberbox({    
						max: parseFloat(lmtBal),
					});
				}
			}
		}*/
}


/**
 * 融资金额的onchange事件
 * 1.重新计算可融资金额及改融资金额的隐藏域loanTotal
 * 2.重新计算信息表中的应收金额和最大可融资金额
 * 3.对保证金的默认值计算---因为需求变更  要求如果没有初始保证金比率的话要先输入，再计算--保证金=融资金额*比率
 */
function changeInvcAval(){
	if(ischangeInvcAval==false){
		return;
	}
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");
	$('#ttlLoanBal').val(ttlLoanAmt);
	//1.利息计算
	countIntAmt();
	//2.手续费计算
	countPdgAmt();
//	var rowDatas = gridData;
	var rowDatas = $('#invcLoanTable').datagrid('getSelections');
	var loan_Able =0;
	if(rowDatas==undefined||rowDatas==null||rowDatas.length==0){
		return;
	}
//		rowIndexs = rowIndexs.sort();
//		for(var i = 0;i<rowDatas.length;i++){
//		var flag = true;
//		for(var j = 0;j<rowIndexs.length;j++){
//			if(rowIndexs[j] == i){// oncheck选的这一笔发票==i
//				flag = false;
//				break;
//			}
//		}
//		if(flag)continue;
	for(var i=0;i<rowDatas.length;i++){
			var v = rowDatas[i];
			var index = $('#invcLoanTable').datagrid('getRowIndex', v);
			if(SCFUtils.Math(ttlLoanAmt,v.invLoanAvalHd,'sub')>0){
				$("#loanAble").numberbox("setValue",0);
				$('#invcLoanTable').datagrid('updateRow',{
					index : index,
					row:{
						invLoanAval : 0,// 最大可融资金额
						invLoanBal  : v.invLoanAvalHd// 应收款
					}
				});
				ttlLoanAmt = SCFUtils.Math(ttlLoanAmt,v.invLoanAvalHd,'sub');
			}else{
				loan_Able = SCFUtils.Math(loan_Able,SCFUtils.Math(v.invLoanEbal,ttlLoanAmt,'sub'),'add');
				
				if('FP' ==SCFUtils.FUNCTYPE ){
					var invc_loan = SCFUtils.Math(v.invLoanEbal,v.invLoanAval,'sub');
					var inv_Loan_Bal =  SCFUtils.Math(v.invLoanBal,invc_loan,'sub');
					$('#invcLoanTable').datagrid('updateRow',{
						index : index,
						row:{
							invLoanAval : SCFUtils.Math(v.invLoanEbal,ttlLoanAmt,'sub'),
							invLoanBal  : SCFUtils.Math(inv_Loan_Bal,ttlLoanAmt,'add')
						}
					});
					
				}else{
					$('#invcLoanTable').datagrid('updateRow',{
						index : index,
						row:{
							invLoanAval : SCFUtils.Math(v.invLoanEbal,ttlLoanAmt,'sub'),
							invLoanBal  : SCFUtils.Math(v.invLoanBalHd,ttlLoanAmt,'add')
						}
					});
				}
				ttlLoanAmt = 0;
			}
			
		}
		$("#loanAble").numberbox("setValue",loan_Able);
}

function chkLoan() {
	var ttlLoanAmt = $('#ttlLoanAmt').numberbox('getValue');//融资金额
	var ttlLoanAmtf = parseFloat(ttlLoanAmt);
	var loanAble = $('#loanAble').numberbox('getValue');//可融资金额
	var loanAblef = parseFloat(loanAble);
	if(SCFUtils.Math(ttlLoanAmtf,loanAblef,'sub')>0) {//if(ttlLoanAmtf > loanAblef  )
		SCFUtils.alert('融资金额不能大于可融资金额！');
		$('#ttlLoanAmt').focus();
		return false;
	}
}

function asc(list){
	var temp = list;
	var min = list[0];
	for(var i=0,j=list.length;i<j;i++){
		var min = list[i];
		for(var k=i+1;k<j;k++){
			if(min.key>list[k].key){
				min = list[k];
				list[k]=list[i];
			}
		}
		temp[i]= min;
	}
	return temp;
}
function appendFieldTotable(data){
	var trxDate=$('#trxDt').val();
	var sysRefNo=$('#sysRefNo').val();
	var loanRt=$('#loanRt').numberspinner('getValue');
	var loanDueDt = $("#loanDueDt").datebox('getValue');
	$.each(data,function(i,n){
		var invRef=n.sysRefNo;
		$.extend(n,{
			invLoanEbal:n.invLoanAval,
			loanPct:n.loanPerc,
			loanValDt:trxDate,
			loanRt  : loanRt,
			invLoanBal : n.invLoanBal,
			invLoanBalHd : n.invLoanBal,
			invSts     : "LOAN",
			sysRefNo   : sysRefNo+invRef,
			invcLoanId : sysRefNo,
			invRef     : invRef,
			invLoanAvalHd:n.invLoanAval,
			sysEventTimes :1,
			loanAmt : 0,
			loanDueDtRe : loanDueDt
		});
	});
}

function loadInvc(flag) {
	var selId = $('#selId').val();
	var buyerId = $('#buyerId').val();
	var busiTp = $('#busiTp').combobox('getValue');
	//var loanRt = $('#loanRt').numberspinner('getValue');
	var trxDueDt = $('#trxDueDt').datebox('getValue');
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000009',
			selId : selId,
			buyerId : buyerId,
			busiTp : busiTp,
			invDueDt : trxDueDt,
			cacheType:'append'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {	
				fullGrid(data.rows,flag);
			}
		}
	};
	SCFUtils.ajax(options);
}

function fullGrid(data,flag1,flag2){
	//$('#invcLoanTable').datagrid('clearChecked');
	SCFUtils.loadGridData('invcLoanTable',data,flag1,flag2);
}

function addAmtRow(i,n){
	var invLoan=SCFUtils.Math(n.invLoanBal, (n.invBal-n.invLoanBal)*n.loanPct*0.01, 'add');
		$('#invcLoanTable').datagrid('updateRow',{
			index : i,
			row:{
				invLoanAmt 	 : (n.invBal-n.invLoanBal)*n.loanPct*0.01,// INV_BAL* LOAN_PCT融资金额
				invLoanEbal  : (n.invBal-n.invLoanBal)*n.loanPct*0.01,// INV_BAL* LOAN_PCT每次融资金额
				invLoanBal   : invLoan,
			}
		});
}

function subAmtRow(i,n){
	var invLoan=SCFUtils.Math(n.invLoanBal, n.invLoanAmt, 'sub');
		$('#invcLoanTable').datagrid('updateRow',{
			index : i,
			row:{
				invLoanAmt 	 : 0,// INV_BAL* LOAN_PCT融资金额
				invLoanEbal  : 0,// INV_BAL* LOAN_PCT每次融资金额
				invLoanBal   : invLoan,
			}
		});
}

function updateGridRow(rowIndex,rowData){
	$('#invcLoanTable').datagrid('refreshRow',rowIndex
			//{
		//index:rowIndex
		//,row:rowData
	//}
	);
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


/**
 * 汇总融资总金额=融资总金额+本次融资金额
 * 扣减客户额度
 * 扣减协议额度
 * 累计利息总金额
 * */
function countTtlLoanAmt(rowData){
	var ttlLoanAmt=$('#ttlLoanAmt').numberbox('getValue');//本次融资申请总金额
	ttlLoanAmt=	SCFUtils.Math(ttlLoanAmt, rowData.invLoanAmt, 'add');
	$('#ttlLoanAmt').numberbox('setValue', ttlLoanAmt);
	//费率
	var finChgrt=SCFUtils.Math($('#finChgrt').numberspinner('getValue'), 100, 'div');
	//本次应收费用
	var currFinCost=SCFUtils.Math(finChgrt, ttlLoanAmt, 'mul');
	$('#currFinCost').numberbox('setValue',currFinCost);
	//计算协议余额
	var lmtBal=parseFloat($('#lmtBal').val()).toFixed(2);//协议余额
	var subLmt=SCFUtils.Math(lmtBal, rowData.invLoanAmt,'sub');
	$('#lmtBal').val(subLmt);//隐藏栏位 用于扣减协议额度
}

/*
 * 计算每笔发票的利息金额
 * 利息金额=本次融资金额*融资天数*利率/360
 * */
function countIntAmt(){
	var payIntTp = $('#payIntTp').combobox('getValue');//扣息方式 1 预收息 2 利随本清
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");//融资金额

	var loanDueDt = $("#loanDueDt").datebox("getValue");
	var loanValDt = $('#loanValDt').datebox('getValue');
	if (SCFUtils.DateDiff(loanDueDt, loanValDt)<0 ) {
		SCFUtils.alert("融资到期日不能小于融资日期,请修改!");
		return;
	}
	var loanRt =$('#loanRt').numberspinner('getValue')*0.01;//正常利率
	var subDate=SCFUtils.DateDiff(loanDueDt,loanValDt);//融资到期日— 融资起始日
	var intAmt=SCFUtils.Math(ttlLoanAmt, loanRt, 'mul');//融资金额 * 正常利率
	intAmt=SCFUtils.Math(intAmt, subDate, 'mul');//融资金额 * 正常利率*（融资到期日— 融资起始日）
	intAmt=SCFUtils.Math(intAmt, 360, 'div');//融资金额 * 正常利率*（融资到期日— 融资起始日）/360
	$("#currInt").val(intAmt.toFixed(2));//本次应收利息
	if(payIntTp=='1'){
		$("#currPayInt").val(intAmt.toFixed(2));//本次实收利息
		$('#intAmt').numberbox('setValue',intAmt.toFixed(2));
	}else{
		$("#currPayInt").val(0);//本次实收利息
		$('#intAmt').numberbox('setValue',0);
	}
}

/*
 * 计算利息总金额
 * 利息金额=本次融资金额*融资天数*利率/360
 * */
function changeLoanRt(){
	var payIntTp = $('#payIntTp').combobox('getValue');//扣息方式 1 预收息 2 利随本清
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");//融资金额

	var loanDueDt = $("#loanDueDt").datebox("getValue");
	var loanValDt = $('#loanValDt').datebox('getValue');
	if (SCFUtils.DateDiff(loanDueDt, loanValDt)<0 ) {
		SCFUtils.alert("融资到期日不能小于融资日期,请修改!");
		return;
	}
	var loanRt =$('#loanRt').numberspinner('getValue')*0.01;//正常利率
	var subDate=SCFUtils.DateDiff(loanDueDt,loanValDt);//融资到期日— 融资起始日
	var intAmt=SCFUtils.Math(ttlLoanAmt, loanRt, 'mul');//融资金额 * 正常利率
	intAmt=SCFUtils.Math(intAmt, subDate, 'mul');//融资金额 * 正常利率*（融资到期日— 融资起始日）
	intAmt=SCFUtils.Math(intAmt, 360, 'div');//融资金额 * 正常利率*（融资到期日— 融资起始日）/360
	$("#currInt").val(intAmt.toFixed(2));//本次应收利息
	if(payIntTp=='1'){
		$("#currPayInt").val(intAmt.toFixed(2));//本次实收利息
		$('#intAmt').numberbox('setValue',intAmt.toFixed(2));
	}else{
		$("#currPayInt").val(0);//本次实收利息
		$('#intAmt').numberbox('setValue',0);
	}
}


//手续费计算:如果（Is_Collect=Y）则，手续费=融资金额* CNTRCT_M.trans_Chgrt
function countPdgAmt(){
	var isCollect = $('#isCollect').combobox('getValue');//是否收取费用 Y 是 N 否
	var ttlLoanAmt = $("#ttlLoanAmt").numberbox("getValue");//融资金额
	var transChgrt = $('#transChgrt').val();//费用利率
	if('Y' ==isCollect){
		if(transChgrt>0){//如过费用利率>0 则计算出百分比
		    transChgrt =$('#transChgrt').val()*0.01;
		}else{
			transChgrt =0;
		}
		var pdgAmt=SCFUtils.Math(ttlLoanAmt, transChgrt, 'mul');//融资金额 * 费用利率
		
		$('#currFinCost').val(pdgAmt.toFixed(2));//本次应收处理费
		$('#pdgAmt').numberbox('setValue',pdgAmt.toFixed(2));
	}else{
		$('#currFinCost').val(0);//本次应收处理费
		$('#pdgAmt').numberbox('setValue',0);
	}
}
/**存放选中列的索引*/
var rowIndexs = [];
/**
 * onCheck列事件
 */
function onCheck(rowIndex, rowData){
	//1.初始化
	if($("#loanTotal").val()==""||$("#loanTotal").val()=="undefined"||
			$("#loanTotal").val()==null){
		$("#loanTotal").val("0");// 初始化下loanTotal
	}
	$("#ttlLoanAmt").numberbox("setValue",0);
	//restoreWork();
	var totalLoan = 0;//总可融资金额
	totalLoan = SCFUtils.Math($("#loanTotal").val(),rowData.invLoanAvalHd,'add');
	var loanAble =$("#loanAble").val();
	loanAble = SCFUtils.Math(loanAble,rowData.invLoanAval,'add');
	$("#loanAble").numberbox('setValue',loanAble);
//	setLoanValue(totalLoan);
	setLoanValue(loanAble);
	rowIndexs.push(rowIndex);
	rowIndexs = rowIndexs.sort();
}
/**
 * 初始化还原工作
 */
function restoreWork(){
	rowIndexs = rowIndexs.sort();
	//2.还原
	$.each(rowIndexs,function(i,v){
		$('#invcLoanTable').datagrid('updateRow',{//对应收账款融资金额和最大可融资金额还原
			index : v,
			row:{
				invLoanAval : getRowIndexOfPro("invcLoanTable",v,"invLoanAvalHd"),
				invLoanBal  : getRowIndexOfPro("invcLoanTable",v,"invLoanBalHd"),
			}
		});
	});
}
/**
 * 对可融资金额计算和记录
 * 直接将ttlLoanAmt的max = loanAble (edit on 2016-11-07 by JJH)
 */
function setLoanValue(loanAble){
	//$("#loanAble").numberbox('setValue',totalLoan);//这里会触发changeTtlLoanAmt
	if(SCFUtils.Math($('#lmtBal').val(),loanAble,'sub')>0){
		$("#ttlLoanAmt").numberbox({max:parseFloat(loanAble)});
	}else{
		$("#ttlLoanAmt").numberbox({max:parseFloat($('#lmtBal').val())});
	}
	//4.记录本次可融资金额
//	$("#loanTotal").val(totalLoan);//记录下可融资金额   防止用户在多次输入融资金额时产生递减情况
//	$("#totalLoan").val(totalLoan);
}

/**
 * 从表格中取出index行的field的值 
 * @param tableId 表格ID
 * @param index 行号
 * @param field 字段名
 * @returns value
 */
function getRowIndexOfPro(tableId,index,field){
	var rowData = $("#"+tableId).datagrid("getData");
	var obj = rowData.rows[index];
	return eval("obj."+field);
}

//计算保证金金额
function setMarginAmt(){
	var initMarginPct = $("#initMarginPct").numberbox("getValue");
	if(initMarginPct<0||initMarginPct>100){
		SCFUtils.alert("请输入在0~100之间的数!!!!");
		return;
	}
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


/**
 * 修改了原先的onuncheck逻辑。现统计选中的行，汇总loanAble；并将ttlLoanAmt = 0
 * edit on 2016-11-07 by JJH
 * @param rowIndex
 * @param rowData
 */
function onUnCheck(rowIndex, rowData){
	//1.初始化
//	var ttlLoanAmt = $("#ttlLoanAmt").numberbox('getValue');//对融资金额初始化----此处调用了onchange事件changeInvcAval
//	if(SCFUtils.Math(ttlLoanAmt,rowData.invLoanAvalHd,'sub')<=0){
//		$("#ttlLoanAmt").numberbox('setValue',0);
//	}else{
//		totalLoan = SCFUtils.Math(ttlLoanAmt,rowData.invLoanAvalHd,'sub');
//		$("#ttlLoanAmt").numberbox('setValue',totalLoan);
//	}
//	
//	var loanAble =$("#loanAble").val();
//	loanAble = SCFUtils.Math(loanAble,rowData.invLoanAval,'sub');
//	if(loanAble<=0){
//		$("#loanAble").numberbox('setValue',0);
//	}else{
//		$("#loanAble").numberbox('setValue',loanAble);
//	}
	$("#ttlLoanAmt").numberbox('setValue',0);
	var newRowIndexs = [];
	for (var i = 0; i < rowIndexs.length; i++) {
		if(rowIndexs[i]!=rowIndex)newRowIndexs.push(rowIndexs[i]);
	}
	rowIndexs = newRowIndexs;
	var loanAble = 0;
	var rowDatas = gridData;
	if(rowDatas==undefined||rowDatas==null||rowDatas.length==0){
		return;
	}
	rowIndexs = rowIndexs.sort();
	for(var i = 0;i<rowDatas.length;i++){
		var flag = true;
		for(var j = 0;j<rowIndexs.length;j++){
			if(rowIndexs[j] == i){// oncheck选的这一笔发票==i
				flag = false;
				break;
			}
		}
		if(flag)continue;
		loanAble = SCFUtils.Math(loanAble,rowDatas[i].invLoanAvalHd,'add');
	}
	$("#loanAble").numberbox('setValue',loanAble);
	setLoanValue(loanAble);
}

function onCheckAll(rows) {
	if(isFPfirst == true){
		//1.初始化
		$("#loanTotal").val("0");
		restoreWork();
		var totalLoan = $("#totalLoan").val();
		rowIndexs = [];
		$.each(rows,function(i,v){
			rowIndexs.push(i);
		});
		if(SCFUtils.Math($('#lmtBal').val(),totalLoan,'sub')>0){
			$("#ttlLoanAmt").numberbox({max:parseFloat(totalLoan)});
		}else{
			$("#ttlLoanAmt").numberbox({max:parseFloat($('#lmtBal').val())});
		}
		//4.记录本次可融资金额
		$("#loanTotal").val(totalLoan);//记录下可融资金额   防止用户在多次输入融资金额时产生递减情况
		$("#totalLoan").val(totalLoan);
		return;
	}
	//1.初始化
	$("#loanTotal").val("0");
	$("#ttlLoanAmt").numberbox('setValue',0);
	restoreWork();
	var totalLoan = 0;
	var loanAble =0;
	rowIndexs = [];
	$.each(rows,function(i,v){
		totalLoan = SCFUtils.Math(totalLoan,v.invLoanAvalHd,'add');
		loanAble = SCFUtils.Math(loanAble,v.invLoanAval,'add');
		rowIndexs.push(i);
	});
	$("#loanAble").numberbox('setValue',loanAble);//这里会触发changeTtlLoanAmt
	if(SCFUtils.Math($('#lmtBal').val(),totalLoan,'sub')>0){
		$("#ttlLoanAmt").numberbox({max:parseFloat(totalLoan)});
	}else{
		$("#ttlLoanAmt").numberbox({max:parseFloat($('#lmtBal').val())});
	}
	//4.记录本次可融资金额
	$("#loanTotal").val(totalLoan);//记录下可融资金额   防止用户在多次输入融资金额时产生递减情况
	$("#totalLoan").val(totalLoan);
	//setLoanValue(totalLoan);

}


/*function onUnCheckAll(rows){
	$.each(rows,function(i,n){
		if(delCheck(list,i)){
			onUnCheck(i,n);
		}
	});
}*/
function onUnCheckAll(rows){
	$("#loanTotal").val("0");
	$("#totalLoan").val(0);
	$("#ttlLoanAmt").numberbox("setValue",0);
	$("#loanAble").numberbox("setValue",0);
	//restoreWork();
	rowIndexs = [];
	//setLoanValue();
	
	/*$("#loanAble").numberbox('setValue', 0);*/
}

function contains(a, obj){
	for(var i in a) {
	    if(a[i].key === obj){
	      return true;
	    }
	}
	return false;
}

function delCheck(a, obj){
	var arr = a;
	for(var i in a) {
	    if(a[i].key === obj){
	    	delete arr[i]; 
	    }
	}
	return arr;
}

/**
 * 提交时给还款子表的eventTimes字段赋值
 * 还款子表的eventTimes值为发票E表中最大sysEventTImes+1
 */

function addEventTimes(){
	var griddata=SCFUtils.getSelectedGridData('invcLoanTable',false);	
	var datas = SCFUtils.parseGridData(griddata, false);
	$.each(datas, function(i, n) {
		var eventTimes=queryInvcEmaxEventTImes(n.invRef);
		$.extend(n,{
			eventTimes : eventTimes
		});	
	});
}

//根据sysRefNo查询发票E表中最大evnetTImes
function queryInvcEmaxEventTImes(sysRefNo){
	var eventTimes = 1;
	var opts ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000203',
				sysRefNo:sysRefNo,
				cacheType:'non'
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					eventTimes = SCFUtils.Math(data.rows[0].eventTimes, 1, 'add');						
    			}
			}	
	};
	SCFUtils.ajax(opts);
	return eventTimes;
}

function reloadInvcLoanTable(){
	var data = SCFUtils.checkForm("loanSubmit");
	if(data){
		loadTable();
	}
	/*if('PM'==SCFUtils.FUNCTYPE || 'FP'==SCFUtils.FUNCTYPE){
		var loanDueDt = $('#loanDueDt').datebox('getValue');
		if(!SCFUtils.isEmpty(loanDueDt)){
			var dueDt = $("#dueDt").val();
			$("#loanOverdueDt").val(SCFUtils.FormatDate(loanDueDt, dueDt));
		}
	}*/
}


function addBalance(data) {
	//$('#cmsCntrctNo').val("HT000000001");
	$('#marginAmt').numberbox('setValue',data.obj.trxDom.token);
}

/*-------------手续费计算----------------
 * 可以根据融资金额变化。
 * 那不需要单独开个function
 * */
//处理费手续费计算
function changePdgAmt(n) {
	//var ttlLoanAmt=$("#ttlLoanAmt").numberbox('getValue');
	
}

function changePayIntTp() {
	var payIntTp = $('#payIntTp').combobox('getValue');
	if(payIntTp=='2'){
		$('td[id=Tr1]').hide();
		$('td[id=Tr2]').hide();
	}else{
		$('td[id=Tr1]').show();
		$('td[id=Tr2]').show();
	}
}
//费用表数据打包
function getFeeData() {
	var fee = {};// 添加费用信息
	fee._total_rows = 1;
	//生成fee的流水号，feeSysRefNo
	var options = {};
	var costPayFlg;
	var trxDt;
	var obj = {};
	if('PM' === SCFUtils.FUNCTYPE){
		options.data = {
				refName : 'FeeRef',
				refField : 'feeSysRefNo'
		};
		SCFUtils.getRefNo(options);
		trxDt = SCFUtils.getcurrentdate();
		obj.sysRefNo =  $('#feeSysRefNo').val();
	}else{
		trxDt = relQueryFeeE()[0].trxDt;
		obj.sysRefNo =  relQueryFeeE()[0].sysRefNo;
	}
	if($("#isCollect").combobox('getValue')=='Y'){//收取处理费
		 costPayFlg = 1;  //1.应收已收 (是否收取手续费选择 是)
	}else{
		 costPayFlg = 0;  //0.应收未收 (是否收取手续费选择 否)
	}
	
	obj.trxDt = trxDt;//交易日期
	obj.selId = $("#selId").val();//授信客户编号
	obj.selAcNo =$("#selAcNo").combobox("getValue");//收费扣款账号
	//obj.selAcNm = $("#selAcNm").val();//账户户名
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
	
	obj.cntrctNo = $('#cntrctNo').val();
	
	obj.trxDate = getDate(new Date());
	fee['rows0'] = obj;
	return fee;
}

//利息表数据打包
function getIntData() {
	var payIntTp = $('#payIntTp').combobox('getValue');//扣息方式 1 预收息 2 利随本清
	var int = {};// 添加额度变动表
	int._total_rows = 1;
	var options = {};
	var trxDt;
	var obj = {};
	if('PM' === SCFUtils.FUNCTYPE){
		options.data = {
				refName : 'IntRef',
				refField : 'intSysRefNo'
		};
		SCFUtils.getRefNo(options);
		trxDt = SCFUtils.getcurrentdate();
		obj.sysRefNo = $('#intSysRefNo').val();
	}else{
		trxDt = relQueryIntE()[0].trxDt;
		obj.sysRefNo = relQueryIntE()[0].sysRefNo;
	}
	obj.trxDt = trxDt;//交易日期
	obj.selId = $("#selId").val();//授信客户编号
	obj.selAcNo =$("#selAcNo").combobox("getValue");//收费扣款账号
	//obj.selAcNm = $("#selAcNm").val();//账户户名
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
	obj.overdueInt = '';//本次逾期利息
	obj.theirRef =  $("#sysRefNo").val();//关联编号（关联业务交易流水号）
	obj.remark = '';//备注
	obj.payIntTp = payIntTp;
	
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
function relQueryLmtE(lmtTp){
	var cntrctNo = $("#cntrctNo").val();
	//var selId= $("#selId").val();
	var sysLockBy =$("#sysRefNo").val(); 
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000651',
			cntrctNo : cntrctNo,
			lmtTp : lmtTp,
			//selId :selId,
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

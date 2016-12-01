var checkArray = [];

function pageOnInt() {
	ajaxBox();
	ajaxTable();
	isAccept = true;
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

//选择关联监管方
function showCntrctPatWindow() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		title : '监管方查询',
		reqid : 'I_P_000186',
		data : {
			'cntrctNo' : cntrctNo
		},
		onSuccess : patnerSuccess
	};
	SCFUtils.getData(options);
}

function patnerSuccess(data) {
	$('#regId').val(data.patnerId);
	$('#regNm').val(data.patnerNm);
	$('#sysRefNo').focus();
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

function ajaxBox(){
	var data =  [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '2',
		"text" : "先票款后货"
	}];
	$("#busiTp").combobox('loadData', data);
	
	//加载币种
	var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006',
				cacheType:'comm'
			},
			callBackFun:function(data){
				if(data.success){
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
	SCFUtils.setTextReadonly('regId',true);
	SCFUtils.setTextReadonly('regNm',true);
	SCFUtils.setTextReadonly('wareId',true);
	SCFUtils.setTextReadonly('wareNm',true);
	SCFUtils.setNumberspinnerReadonly('ttlLowPayNum',true);
	SCFUtils.setNumberspinnerReadonly('ttlYPayAmt',true);
	SCFUtils.setNumberspinnerReadonly('loanBal',true);
}

function ajaxTable() {
	var options = {
			//url : SCFUtils.AJAXURL,
			toolbar : '#toolbar',
			idField :  'sysRefNo',
			rownumbers : true,
			checkOnSelect : true,
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : true,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
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
			columns : [ [ {
				field : 'ck',
				checkbox : true
			}, {
				field : 'loanId',
				title : '融资编号',
				hidden : true,
				width : 80
			}, {
				field : 'poRef',
				title : '订单编号',
				hidden : false,
				width : 80
			},{
				field : 'cntrctNo',
				title : '协议编号',
				hidden : true,
				width : 80
			},{
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
				field : 'goodsNm',
				title : '商品名称',
				width : '9.09%'
			}, {
				field : 'goodsId',
				title : '商品ID',
				width : '9.09%'
			}, {
				field : 'goodsCharacter',
				title : '规格型号',
				width : '9.09%'
			}, {
				field : 'producer',
				title : '生产厂家',
				width : '9.09%'
			}, {
				field : 'unit',
				title : '计价单位',
				width : '9.09%'
			}, {
				field : 'ccy',
				title : '计价币别',
				width : '9.09%'
			}, {
				field : 'price',
				title : '最新单价',
				width : '9.09%',
				formatter : ccyFormater
			}, {
				field : 'poInNum',
				title : '入库数量',
				width : '9.09%'
			}, {
				field : 'ttlPoOutNum',
				title : '已出库数量',
				width : '9.09%'
			}, {
				field : 'ttlPoOutNumHD',
				title : '已出库数量临时',
				hidden : true,
				width : '9.09%'
			}, {
				field : 'poOutNum',
				title : '本次出库数量',
				editor : {
					type : 'numberbox'
				},
				width : '9.09%'
			}, {
				field : 'poOutAmt',
				title : '本次出库价值',
				width : '9.09%',
				formatter : ccyFormater
			} ] ]
		};
		$('#inOutDetailsTable').datagrid(options);
}

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('dispatchForm', data);
	//modify by shizaiqiang为了上一步带出下一步所勾选的子表数据
	/*SCFUtils.loadGridData('inOutDetailsTable', SCFUtils
			.parseGridData(data.obj.crtf), false);*/
	if ("FP" === SCFUtils.FUNCTYPE) {
		//modify by shizaiqiang上一步时子表数据因为重新加载了，所以将本次提货总价值清零
		//$('#ttlPayAmt').numberspinner('setValue','0');
		//queryDetails(data.obj.cntrctNo);
		//loadTable();
		$.each(data.obj.crtf,function(i,n){
			$.extend(n,{
				ttlPoOutNum : SCFUtils.Math(n.ttlPoOutNum,n.poOutNum,'sub')
			});
		});
		$('#ttlPayAmt').numberspinner('setValue','0');
		SCFUtils.loadGridData('inOutDetailsTable', SCFUtils
				.parseGridData(data.obj.crtf), false);
		$('#inOutDetailsTable').datagrid('selectAll');
	}
	if ("PM" === SCFUtils.FUNCTYPE) {
		$("#huowu").hide();
		//modify by shizaiqiang上一步时子表数据因为重新加载了，所以将本次提货总价值清零
		$('#ttlPayAmt').numberspinner('setValue','0');
		queryDetails(data.obj.cntrctNo);
	}
	lookSysRelReason();

}

function getDate(date){
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	$("#huowu").hide();
	SCFUtils.loadForm('dispatchForm', data);
	$('#ccy').combobox('setValue',data.obj.lmtCcy);
	$('#initMarginPct').val(data.obj.initGartPct);
	$('#regId').val(data.obj.patnerId);
	$('#regNm').val(data.obj.patnerNm);
	queryregId(data.obj.cntrctNo);
	queryLoanInfo(data.obj.cntrctNo);
	queryDetails(data.obj.cntrctNo);
	if (SCFUtils.OPTSTATUS == 'ADD') {
		var options = {};
		options.data = {
			refName : 'InoutRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);

		$('#inoutDate').val(getDate(new Date()));
	}
	lookSysRelReason();
}

function addCheckAndUncheckEvent(){
	var options = $('#inOutDetailsTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
}

/**
 * 查询入库货物表
 * @param cntrctNo
 */
function queryDetails(cntrctNo){
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000497',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				//协议下库存商品总价值
				var ttlWareGoodsPrice = 0;
				$.each(data.rows, function(i, n){
					//初始已出库数量若为空，则页面显示0
					if(n.ttlPoOutNum == null){
						$.extend(n,{
							ttlPoOutNum : 0,
							'ttlPoOutNumHD':0
						});
					}else{
						$.extend(n,{
							'ttlPoOutNumHD':n.ttlPoOutNum
						});
					}
					//计算库存数量  库存数量=入库数量-已出库数量
					var wareAmount = SCFUtils.Math(n.poInNum, n.ttlPoOutNum, 'sub');
					//计算库存商品价值
					var wareGoodsPrice = SCFUtils.Math(wareAmount, n.price, 'mul');
					ttlWareGoodsPrice = SCFUtils.Math(ttlWareGoodsPrice, wareGoodsPrice, 'add');
				});
				//质押率换算百分比
				var pldPerc = SCFUtils.Math($("#pldPerc").val(), 100, 'div');
				//【可放货价值】=（【库存数量】-【在途审批提货数】-【已申请提货数】）*【单价】-【最低价值】
				//$('#ttlYPayAmt').numberspinner('setValue',SCFUtils.Math(ttlWareGoodsPrice, $("#ttlLowPayNum").numberspinner('getValue'), 'sub'));
				//可放货价值=库存总价值*质押率-最低价值
				$('#ttlYPayAmt').numberspinner('setValue',SCFUtils.Math(SCFUtils.Math(ttlWareGoodsPrice, pldPerc, 'mul'), $("#ttlLowPayNum").numberspinner('getValue'), 'sub'));
				//需要移除旧数据
				SCFUtils.loadGridData('inOutDetailsTable', data.rows, false, true);
			}
		}
	};
	SCFUtils.ajax(options);
}
/**
 * 查询融资表
 * @param cntrctNo
 */
function queryLoanInfo(cntrctNo){
	//质押率换算百分比
	var pldPerc = SCFUtils.Math($("#pldPerc").val(), 100, 'div');
	var ttlMarginBal = 0.00;//计算协议下保证金余额
	var ttlLoanAmt = 0.00;//计算协议下融资金额
	var ttlLoanBal = 0.00;//计算协议下融资余额
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000070',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				$("#initBailAcc").val(data.rows[0].marginAcNo);
				//隐藏域赋值
				$("#loanId").val(data.rows[0].loanId);
				$.each(data.rows, function(i, n){
					ttlMarginBal = SCFUtils.Math(ttlMarginBal, n.marginBal, 'add');//协议下保证金余额
					ttlLoanAmt = SCFUtils.Math(ttlLoanAmt, n.ttlLoanAmt, 'add');//申请融资金额
					ttlLoanBal = SCFUtils.Math(ttlLoanBal, n.ttlLoanBal, 'add');//协议下融资放款金额余额
				});
				var initThFlg =$('#initThFlg').val();//初始保证金是否允许提货标志
				
				$('#initBailBal').numberspinner('setValue',ttlMarginBal);//协议下保证金余额
				var initMarginPct =SCFUtils.Math($('#initMarginPct').val(), 100, 'div');//初始保证金比例
				if("N" == initThFlg){
					//协议下融资放款金额余额 <= 协议下保证金余额 则最低价值为0
					if(ttlLoanBal<=ttlMarginBal){
						$('#ttlLowPayNum').numberspinner('setValue',0);//最低价值
					}else{
					 //（【协议下融资放款金额余额】-（【协议下保证金余额】-【协议下融资放款金额】*【最低保证金比例】））/质押率	
						
						var ttlLoanAmtMul = SCFUtils.Math(ttlLoanAmt, initMarginPct, 'mul');//【协议下融资放款金额】*【最低保证金比例】
						
						var initBailBalSub = SCFUtils.Math(ttlMarginBal, ttlLoanAmtMul, 'sub');//【协议下保证金余额】-【协议下融资放款金额】*【最低保证金比例】
						
						var ttlLowPayNum = SCFUtils.Math(ttlLoanBal, initBailBalSub, 'sub');//【协议下融资放款金额余额】-（【协议下保证金余额】-【协议下融资放款金额】*【最低保证金比例】）
						//最低价值
						$('#ttlLowPayNum').numberspinner('setValue',SCFUtils.Math(ttlLowPayNum, pldPerc, 'div'));
					}
				}else{
					//【最低价值】=(【协议下融资放款金额余额】-【协议下保证金余额】)/质押率 
					var ttlLowPayNum = SCFUtils.Math(ttlLoanBal, ttlMarginBal, 'sub');
					ttlLowPayNum = SCFUtils.Math(ttlLowPayNum, pldPerc, 'div');
					$('#ttlLowPayNum').numberspinner('setValue',ttlLowPayNum);//最低价值
				}
				
				$("#loanAmt").val(ttlLoanAmt);
				//$("#loanBal").val(ttlLoanBal);
				$('#loanBal').numberspinner('setValue',ttlLoanBal);
				
			}
		}
	};
	SCFUtils.ajax(options);
}
/**
 * 查询现货入库表
 * @param data
 */
function queryregId(data){
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000496',
				cntrctNo : data
			},
			callBackFun : function(data) {
				if(!SCFUtils.isEmpty(data.rows)){
					$("#regId").val(data.rows[0].supervisorId);
					$("#regNm").val(data.rows[0].supervisorNm);
					$("#wareId").val(data.rows[0].warehouseId);
					$("#wareNm").val(data.rows[0].warehouseNm);
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
	SCFUtils.loadGridData('inOutDetailsTable', SCFUtils.parseGridData(data.obj.crtf), true);// 加载数据并保护表格。
	lookSysRelReason();
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('dispatchForm', row);
	//queryReLoan();
	//queryReCntrct();
	//queryRePo();
	queryReInoutDetails(data.obj.sysRefNo);
	//queryReCollat();
	//updateReOutAmt();
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

function pageOnFPLoad(data) {
	$("#huowu").show();
	pageOnReleasePageLoad(data);
	
	//removeCheckEvent();
	$('#inOutDetailsTable').datagrid('selectAll', true);// 在加载数据初始化时就将datagrid中的数据默认全勾选
//	var options = $('#inOutDetailsTable').datagrid('options');
//	options.onCheck = onCheck;
//	options.onUncheck = onUnCheck;
//	options.onCheckAll = onCheckAll;
//	options.onUncheckAll = onUncheckAll;
	
	/*queryregId(data.obj.cntrctNo);
	queryLoanInfo(data.obj.cntrctNo);*/
	lookSysRelReason();
}

//为了区别第一次加载还是第二次加载
var flag = true;

function onNextBtnClick() {
	//先验证表单完整性后计算
	if(!$("#dispatchForm").form('validate')){
		SCFUtils.alert('请检查表单是否输入完整！');
		return;
	}
	
    if(!isAccept){
    	SCFUtils.alert('请接收改变数据！');
    	return;
    }
	var ttlPayAmt =$('#ttlPayAmt').numberspinner('getValue');//本次提货总价值
	var ttlYPayAmt =$('#ttlYPayAmt').numberspinner('getValue');//可放货价值
	if(ttlPayAmt <= 0){
		SCFUtils.alert('本次提货总价值为零,请勾选货物信息！');
		return;
	}
	if(SCFUtils.Math(ttlPayAmt, ttlYPayAmt, 'sub') > 0){
		SCFUtils.alert('本次提货总价值不能超出可放货价值,请重新勾选货物信息！');
		return;
	}
	//a)当额度中设定初始保证金不允许提货时，判断保证金余额>融资金额*初始保证金比例；
	//b)本次提货后的押品价值*（1-初始保证金比例）+保证金余额—融资金额>=0
//	if(SCFUtils.FUNCTYPE != 'RE' && SCFUtils.FUNCTYPE != 'DP'){
//		if(checkCollatValue()){
//			return;
//		}
//	}
	/*if ('FP' == SCFUtils.FUNCTYPE) {
		loanCollateralMList = SCFUtils.getSelectedGridData('inOutDetailsTable');
		if (loanCollateralMList._total_rows == 0) {
			SCFUtils.alert('请勾选一笔货物信息！');
			return;
		}
	}*/
	var mainData = SCFUtils.convertArray('dispatchForm');
	var grid = {};
	var crtf;//放货出库子表信息
	if('RE' == SCFUtils.FUNCTYPE || 'DP' == SCFUtils.FUNCTYPE){
		crtf = SCFUtils.getGridData('inOutDetailsTable');	
	}else if('PM' == SCFUtils.FUNCTYPE){
		crtf = SCFUtils.getSelectedGridData('inOutDetailsTable',false);	
		$.each(SCFUtils.parseGridData(crtf), function(i, n){
			var inoutRefNo = $('#sysRefNo').val();
			//累计出库数量=已出库数量+本次出库数量，更新CRTF_M表
			$.extend(n, {
				"sysRefNo" : inoutRefNo + n.sysRefNo,
				"crtfRefNo" : n.sysRefNo,
				"releaseDt" : getDate(new Date()),
				"inoutRefNo" : inoutRefNo
			});
		});
	}else{
		crtf = SCFUtils.getSelectedGridData('inOutDetailsTable',false);	
		if(flag == false){
			$.each(SCFUtils.parseGridData(crtf), function(i, n){
				var inoutRefNo = $('#sysRefNo').val();
				$.extend(n, {
					"sysRefNo" : inoutRefNo + n.sysRefNo,
					"crtfRefNo" : n.sysRefNo,
					"releaseDt" : getDate(new Date()),
					"inoutRefNo" : inoutRefNo
				});
			});
		}else{
			$.each(SCFUtils.parseGridData(crtf), function(i, n){
				var inoutRefNo = $('#sysRefNo').val();
				//累计出库数量=已出库数量+本次出库数量，更新CRTF_M表
				$.extend(n,{
					//"sysRefNo":inoutRefNo + n.sysRefNo,
					"crtfRefNo":n.crtfRefNo,
					"releaseDt":getDate(new Date()),
					"inoutRefNo":inoutRefNo
					});
			});
		}
		
	}
	grid.crtf = SCFUtils.json2str(crtf);
	$.extend(mainData, grid);
	return mainData;
}


//校验
function checkCollatValue(){
	var flag = false;
	var initThFlg =$('#initThFlg').val();
	var marginBal =$('#initBailBal').numberspinner('getValue');//保证金余额
	var loanAmt = $('#loanAmt').val();
	var marginAmt = $('#marginAmt').val();
	var initMarginPct = $('#initMarginPct').val();
	if("N" == initThFlg){
		if(marginBal < marginAmt){
			SCFUtils.alert('初始保证金不允许提货,保证金余额小于初始保证金金额！');
			flag = true;
			
			return flag;
		}
	}
	
	var ttlPayAmt =$('#ttlPayAmt').numberspinner('getValue');//本次提货价值
	var collatValue = SCFUtils.Math(getCollatValue(),ttlPayAmt, 'sub');//本次提货后的押品价值
	collatValue = SCFUtils.Math(collatValue,SCFUtils.Math(1,SCFUtils.Math(initMarginPct,100, 'div'), 'sub'), 'mul');//本次提货后的押品价值*（1-初始保证金比例）
	collatValue = SCFUtils.Math(collatValue,marginBal, 'add');
	collatValue = SCFUtils.Math(collatValue,loanAmt, 'sub');
	
	if(collatValue < 0){
		SCFUtils.alert('本次提货后不足以覆盖敞口，请追加保证金！');
		flag = true;
	}
	
	return flag;
}

function getCollatValue(){
	var ttlAmt = 0;
	var loanId = $('#loanId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId :'Q_P_000347',
			loanId:loanId,
			cacheType:'non'
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				ttlAmt = data.rows[0].ttlAmt;
			}
		}
	};
	SCFUtils.ajax(options);
	
	return ttlAmt;
}

//查询票据
function onSearchPoClick(){
	var billNo = $('#billNo').val();
	var cntrctNo = $('#cntrctNo').val();
	var selId = $('#selId').val();
	var buyerId = $('#buyerId').val();
	var options = {
			title:'票据查询',
			reqid:'I_P_000114',
			data:{'billNo':billNo,'selId':selId,'cntrctNo':cntrctNo,'buyerId':buyerId,cacheType:'non'},
			onSuccess:setPoData,
			cacheType:'non'
	};
	SCFUtils.getData(options);
}


function setPoData(data){
	if(SCFUtils.isEmpty(data)){
		SCFUtils.alert("该票据不存在！");
		return;
	}

	$('#buyerId').val(data.buyerId);
	$('#buyerNm').val(data.buyerNm);
	$('#marginAmt').val(data.marginAmt);
	$('#billNo').val(data.billNo);
	$('#loanId').val(data.loanId);
	//$('#loanBal').numberspinner('setValue', data.ttlLoanBal);
	$('#loanAmt').val(data.ttlLoanAmt);
	$('#initBailAcc').val(data.marginAcNo);
	$('#initMarginPct').val(data.initMarginPct);
	$('#initBailBal').numberspinner('setValue', SCFUtils.Math(data.marginAmt, data.marginBal, 'add'));
	
	
//	$('#ttlPayNum').numberspinner('setValue',0);
//	$('#ttlPayAmt').numberspinner('setValue',0);
	//loadTable();
}

function loadTable() {
	//modify by shizaiqiang用于在查询所有货物信息前全部不勾选
	$('#inOutDetailsTable').datagrid('unselectAll', true);
	
	var cntrctNo = $('#cntrctNo').val();

	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000524',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				// 协议下库存商品总价值
				var ttlWareGoodsPrice = 0;
				$.each(data.rows, function(i, n) {
					// 初始已出库数量若为空，则页面显示0
					if (n.ttlPoOutNum == null) {
						$.extend(n, {
							ttlPoOutNum : 0,
							ttlPoOutNumHD : 0
						});
					}else{
						$.extend(n, {
							ttlPoOutNumHD : ttlPoOutNum
						});
					}
					// 计算库存数量 库存数量=入库数量-已出库数量
					var wareAmount = SCFUtils.Math(n.poInNum, n.ttlPoOutNum,
							'sub');
					// 计算库存商品价值
					var wareGoodsPrice = SCFUtils.Math(wareAmount, n.price,
							'mul');
					ttlWareGoodsPrice = SCFUtils.Math(ttlWareGoodsPrice,
							wareGoodsPrice, 'add');
				});
				// 【可放货价值】=（【库存数量】-【在途审批提货数】-【已申请提货数】）*【单价】-【最低价值】
				$('#ttlYPayAmt').numberspinner(
						'setValue',
						SCFUtils.Math(ttlWareGoodsPrice, $("#ttlLowPayNum")
								.numberspinner('getValue'), 'sub'));
				SCFUtils.loadGridData('inOutDetailsTable', data.rows, false,
						true);
				$('#ttlPayAmt').numberspinner('setValue','0');
			}
		}
	};
	SCFUtils.ajax(options);
	flag = false;
	// $('#ttlPayAmt').numberspinner('setValue','0');
}



function onCheck(rowIndex, rowData){
	rowData.ck = true;
	var poInNum = rowData.poInNum;// 获得入库数量
	var price = rowData.price;// 获得最新单价
	var ttlPoOutNum = rowData.ttlPoOutNum;// 获得已出库数量
	//退回处理第一次加载时不计算
	if(!('FP'==SCFUtils.FUNCTYPE&&flag)){
		var poOutNum = SCFUtils.Math(poInNum, ttlPoOutNum, 'sub');// 当选中时，本次出库数量等于（入库数量-已出库数量）
	}
	
	
	var poOutAmt =  SCFUtils.Math(poOutNum, price, 'mul');// 获得本次出库价值
	$('#inOutDetailsTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			// 当选中一行数据时，给字段重新改值
			poOutNum : poOutNum,
			poOutAmt : poOutAmt
		}
	});
	
	onClickRow(rowIndex);
	checkArray.push(rowData.sysRefNo);
	
	isAccept = false;
}

function onUnCheck(rowIndex, rowData){
	rowData.ck=false;
	var poInNum = rowData.poInNum;// 获得入库数量
	var price = rowData.price;// 获得最新单价
	var poOutNum = rowData.poOutNum;// 本次出库数量
	//var poOutAmt =  SCFUtils.Math(poInNum, price, 'mul');// 还原本次出库价值 (为什么是入库数量X单价？)
	var poOutAmt =  SCFUtils.Math(poOutNum, price, 'mul');
		
	$('#inOutDetailsTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			// 当选中一行数据时，给字段重新改值
			poOutNum : 0,//还原本次出库数量
			poOutAmt : 0,
			ttlPoOutNum:rowData.ttlPoOutNumHD
		}
	});
	endEditing();
	//取消一行时，本次提货总价值减去当前选中行的本次出库价值
	var ttlPayAmt = $("#ttlPayAmt").numberspinner("getValue");
	ttlPayAmt = SCFUtils.Math(ttlPayAmt, poOutAmt, 'sub');
	$("#ttlPayAmt").numberspinner("setValue",ttlPayAmt);

	checkArray = delCheck(checkArray,rowData.sysRefNo);
	
	flag = false;
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



function onCheckAll(rows){
	$.each(rows,function(i,n){
		if(!contains(checkArray,n.sysRefNo)){
			onCheck(i,n);
		}
	});	
}



function onUnCheckAll(rows){
	$.each(rows,function(i,n){
		if(contains(checkArray,n.sysRefNo)){
			onUnCheck(i,n);
		}
	});
}

function queryReInoutDetails(inoutRefNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			// queryId : 'Q_P_000086',
			queryId : 'Q_P_000519',
			inoutRefNo : inoutRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				if('RE'===SCFUtils.FUNCTYPE || 'DP' === SCFUtils.FUNCTYPE)
					SCFUtils.loadGridData('inOutDetailsTable', data.rows, true,
							true);
				if('FP'===SCFUtils.FUNCTYPE){
					$.each(data.rows,function(i,n){
						$.extend(n,{
//							ttlPoOutNum : SCFUtils.Math(n.ttlPoOutNum, n.poOutNum,'sub'),
							ttlPoOutNumHD : SCFUtils.Math(n.ttlPoOutNum, n.poOutNum,'sub')
						});
					});
					SCFUtils.loadGridData('inOutDetailsTable', data.rows, false,
							true);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

//买方查询
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
	SCFUtils.eachElement('dispatchForm');//循环整个表单里的element来去除红色字体（不去除*号）
	$('#sysRefNo').focus();
}
/**
 * 接受改变
 */
var isAccept = false;//是否已经接收改变
function accept() {
	if(isAccept){
		return;
	}
	isAccept =true;
	var totalPoOutAmt = 0.00;
	
	var data = $('#inOutDetailsTable').datagrid('getSelections');
	endEditing();// 结束编辑
	$.each(data,function(i, n) {
		var poInNum = n.poInNum;// 获得入库数量
		var price = n.price;// 获得单价
		var poOutNum = n.poOutNum;// 获得本次出库数量
//		var ttlPoOutNum = n.ttlPoOutNum;// 获得已出库数量
		var ttlPoOutNum = n.ttlPoOutNumHD;// 获得已出库数量(改成等于已出库数量的临时字段)
		var rowIndex = $('#inOutDetailsTable').datagrid('getRowIndex', n);// 获得选中的行数
		$.extend(n,{
			"ttlPoOutNum":SCFUtils.Math(poOutNum, ttlPoOutNum,'add')
		});
		if (SCFUtils.Math(poOutNum, poInNum,'sub') > 0){
			SCFUtils.alert('本次出库数量不得大于入库数量！');
			onUnCheck(rowIndex,n);
		}else if (SCFUtils.Math(poOutNum, ttlPoOutNum,'add') > poInNum){
			//本次出库数量+已出库数量 不能大于入库数量
			SCFUtils.alert('本次出库数量加上已出库数量不能大于入库数量！');
			onUnCheck(rowIndex,n);
		}else{
			// 如果符合条件
			//var rowIndex = $('#inOutDetailsTable').datagrid('getRowIndex', n);// 获得选中的行数
			$('#inOutDetailsTable').datagrid('updateRow',
					{
						index : rowIndex,
						row : {
							poOutAmt : SCFUtils.Math(poOutNum,price, 'mul'),// 更改选中行的本次出库价值
						}
					});
			totalPoOutAmt = SCFUtils.Math(totalPoOutAmt, SCFUtils.Math(poOutNum,price, 'mul'), 'add');
		
		}
		
	});
	$("#ttlPayAmt").numberspinner("setValue",totalPoOutAmt);
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
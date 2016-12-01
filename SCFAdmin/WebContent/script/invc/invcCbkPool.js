function pageOnInt(data) {
	ajaxBox();
	ajaxTable();
	SCFUtils.setTextReadonly('collatCompNm', true);
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

function pageOnFPLoad(data){
	$("#huowu").show();
	pageOnReleasePageLoad(data);
	var optionsGrid = $('#invcCbkTable').datagrid('options');
	optionsGrid.onCheck = onCheck;
	optionsGrid.onUncheck = onUncheck;
	optionsGrid.onCheckAll = onCheckAll;
	optionsGrid.onUncheckAll = onUncheckAll;
	$('#invcCbkTable').datagrid('checkAll');
	lookSysRelReason();
}

function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	$("#huowu").hide();
	SCFUtils.loadForm('cbkRegForm',data);
	$('#buyerLmtSysRefNo').val(data.obj.lmtSysRefNo);// 买方额度流水号
	if("FP"==SCFUtils.FUNCTYPE){
		//queryCust(data.obj.buyerId);
		loadTable(data.obj.sysRefNo);    //
	}else{
		$('#ccy').combobox('setValue', data.obj.lmtCcy);
		$('#cntrctNo').val(data.obj.cntrctNo);
		$('#selId').val(data.obj.selId);
		//$('reTrfNo').val(data.obj.sysRefNo);
		var options = {};
		options.data = {
			refName : 'cbkRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);
	}
	cheackBusiTp(data);
	//queryCust(data.buyerId);
	//onloadTable();
	var optionsGrid = $('#invcCbkTable').datagrid('options');
	optionsGrid.onCheck = onCheck;
	optionsGrid.onUncheck = onUncheck;
	optionsGrid.onCheckAll = onCheckAll;
	optionsGrid.onUncheckAll = onUncheckAll;
	queryInvc();
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
	lookSysRelReason();
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
function cheackBusiTp(data){
	if(data.obj.busiTp == '3'){ //信用保险项下
		$('#bx1').show();
		$('#bx2').show();
		queryInsure(data.obj.cntrctNo);
	}else{
		$('#bx1').hide();
		$('#bx2').hide();
	}
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('cbkRegForm',data);
	SCFUtils.loadGridData('invcCbkTable',
	SCFUtils.parseGridData(data.obj.invCbk), true);// 加载数据并保护表格。
	cheackBusiTp(data);
	lookSysRelReason();
}

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('cbkRegForm',data);
	if(SCFUtils.FUNCTYPE == "PM"){
		$("#huowu").hide();
		$('#ttlRevTrfAmt').numberbox('setValue',0);
		$('#regNo').numberbox('setValue',0);
		queryInvc();
		/*var invCbk = data.obj.invCbk
		$.each(invCbk,function(i,obj){
			obj.invBal = obj.chgBcAmt;
			obj.chgBcAmt = 0;
		});*/
		//SCFUtils.loadGridData('invcCbkTable',SCFUtils.parseGridData(data.obj.invCbk), false);
	}else{
		SCFUtils.loadGridData('invcCbkTable',SCFUtils.parseGridData(data.obj.invCbk), true);
	}
	cheackBusiTp(data);
	//勾选在注册check函数之前
	if ("FP" == SCFUtils.FUNCTYPE) {
		$("#invcCbkTable").datagrid('selectAll');
	} 
	var optionsGrid = $('#invcCbkTable').datagrid('options');
	optionsGrid.onCheck = onCheck;
	optionsGrid.onUncheck = onUncheck;
	optionsGrid.onCheckAll = onCheckAll;
	optionsGrid.onUncheckAll = onUncheckAll;
	//$('#invcCbkTable').datagrid('checkAll');
	lookSysRelReason();
}
function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('cbkRegForm',row);
	//queryCust(data.obj.buyerId);
	loadTable(data.obj.sysRefNo);
	cheackBusiTp(data);
	queryBuyerInfo(data.obj.cntrctNo,data.obj.buyerId);
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
	lookSysRelReason();
	if(data.obj.OldSysRelReason == ""){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
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
		
		obj.lmtBal = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtBal,$('#ttlRevTrfAmt').numberbox('getValue'),'add') ;//买方额度余额=原买方额度余额+反转让金额
		obj.lmtAllocate = parseFloat(SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtAllocate,$('#ttlRevTrfAmt').numberbox('getValue'),'sub')) ;//本次占用额度=原来占用额度-反转让金额
		
		obj.lmtRecover = SCFUtils.Math(relQueryLmtM(lmtTp)[0].lmtRecover,$('#ttlRevTrfAmt').numberbox('getValue'),'add') ;//归还额度=原归还额度+反转让金额

	}
	obj.ttlAllocate = 0;//已占用额度
	obj.theirRef = $('#sysRefNo').val();//主页流水号
	
	buyerLmt['rows0'] = obj;
	return buyerLmt;

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
	var ttlRevTrfAmt=$('#ttlRevTrfAmt').numberbox('getValue');
	if (SCFUtils.FUNCTYPE === 'PM') {
		
		var row = $('#invcCbkTable').datagrid('getSelections');
		if (row.length == 0) {
			SCFUtils.alert("请选择应收账款！");
			return;
		}else if(ttlRevTrfAmt<=0||SCFUtils.isEmpty(ttlRevTrfAmt)) {
			SCFUtils.alert("您的反转让金额没有操作！");
			return;
		}
	
	}
	var data = SCFUtils.convertArray('cbkRegForm');
	var cntrctNo = data.cntrctNo;//协议编号
	var buyerId = data.buyerId;
	//客户表相关信息
	var custInfo = queryCustInfo(buyerId);
	
	//额度关联表相关信息
	var cntrctSbrInfo = queryCntrctSbrInfo(cntrctNo, buyerId);
	$.extend(data,{
		"custLmtCcy" : custInfo.lmtCcy ,//额度币别
		"cntrctSbrLmtCcy" : cntrctSbrInfo.lmtCcy ,//额度币别
		
		"custLmtBal" : SCFUtils.Math(custInfo.lmtBal, ttlRevTrfAmt, 'add'),//客户_额度余额 = 原额度余额+贷项清单总额
		"cntrctSbrLmtBal" : SCFUtils.Math(cntrctSbrInfo.buyerLmtBat, ttlRevTrfAmt, 'add'),//额度关联信息_额度余额 = 原额度余额+贷项清单总额
		
		'custLmtAmt' : custInfo.lmtAmt, //客户信息表_额度金额
		'cntrctSbrLmtAmt' : cntrctSbrInfo.buyerLmtAmt, //额度关联信息表_额度金额
		
		'custLmtAllocate' : SCFUtils.Math(custInfo.lmtAllocate, ttlRevTrfAmt, 'sub'),  //客户_占用额度 = 原占用额度-贷项清单总额
		'cntrctSbrLmtAllocate' : SCFUtils.Math(cntrctSbrInfo.lmtAllocate, ttlRevTrfAmt, 'sub'), //额度关联信息_占用额度 = 原占用额度-贷项清单总额
		
		'custLmtRecover' :SCFUtils.Math(custInfo.lmtRecover, ttlRevTrfAmt, 'add'), //客户_归还额度 =原归还额度+贷项清单总额
		'cntrctSbrLmtRecover' :SCFUtils.Math(cntrctSbrInfo.lmtRecover, ttlRevTrfAmt, 'add')  //额度关联信息_归还额度 =原归还额度+贷项清单总额
	});
	var grid = {};
	var invCbk = {} ;
	
	
	//var fpData = [];
	var custData = [];
	var sysRefNo = $('#sysRefNo').val();
	var cbkDt = $('#cbkDt').datebox('getValue'); 
	if(SCFUtils.FUNCTYPE === 'RE'  ){
		invCbk = SCFUtils.getGridData("invcCbkTable",false);
		var ttlArAvalLoan = 0;//应收账款可融资额（汇总）
		var ttlArBal = 0;//应收账款余额（汇总）
		$.each(invCbk,function(i,n){ //复核发票表发票余额，融资余额修改成0；
			if(i != '_total_rows'){
				n.invBal =0;
        		n.invLoanAval=0;
        		//计算可融资余额
				//融资比例换算百分比
				var loanPerc = SCFUtils.Math(n.loanPerc,100,'div');
				var revTrfAmtRow = SCFUtils.Math(n.revTrfAmt,loanPerc,'mul');
				var arAvalLoan = $("#arAvalLoan").val();
				ttlArAvalLoan =  SCFUtils.Math(ttlArAvalLoan,SCFUtils.Math(arAvalLoan,revTrfAmtRow,'sub'),'add');//更新协议表，应收账款可融资额-=反转让金额*融资比例
				ttlArBal =  SCFUtils.Math(ttlArBal,SCFUtils.Math($("#arBal").val(),n.revTrfAmt,'sub'),'add');//更新协议表，应收账款余额-=反转让金额
			}
	    });
		$("#arAvalLoan").val(ttlArAvalLoan);
		$("#arBal").val(ttlArBal);
	}else if(SCFUtils.FUNCTYPE === 'DP' ){
		invCbk = SCFUtils.getGridData("invcCbkTable",false);
		var ttlArAvalLoan = 0;//应收账款可融资额（汇总）
		var ttlArBal = 0;//应收账款余额（汇总）
		$.each(invCbk,function(i,n){ //发票表字段加入到反转让子表
			//计算可融资余额
			//融资比例换算百分比
			var loanPerc = SCFUtils.Math(n.loanPerc,100,'div');
			var revTrfAmtRow = SCFUtils.Math(n.revTrfAmt,loanPerc,'mul');
			var arAvalLoan = $("#arAvalLoan").val();
			ttlArAvalLoan =  SCFUtils.Math(ttlArAvalLoan,SCFUtils.Math(arAvalLoan,revTrfAmtRow,'sub'),'add');//更新协议表，应收账款可融资额-=反转让金额*融资比例
			ttlArBal =  SCFUtils.Math(ttlArBal,SCFUtils.Math($("#arBal").val(),n.revTrfAmt,'sub'),'add');//更新协议表，应收账款余额-=反转让金额
		});
		$("#arAvalLoan").val(ttlArAvalLoan);
		$("#arBal").val(ttlArBal);
	}else{
		invCbk = SCFUtils.getSelectedGridData('invcCbkTable',false );
		if('FP' ==SCFUtils.FUNCTYPE ){
			$.each(invCbk,function(i,n){ 
					n.sysLockBy = sysRefNo;
		    });
		}
		var sysDate = SCFUtils.getcurrentdate();
		var ttlArAvalLoan = 0;//应收账款可融资额（汇总）
		var ttlArBal = 0;//应收账款余额（汇总）
		$.each(invCbk,function(i,n){ //发票表字段加入到反转让子表
			if(i != '_total_rows'){
				//计算可融资余额
				//融资比例换算百分比
				var loanPerc = SCFUtils.Math(n.loanPerc,100,'div');
				var revTrfAmtRow = SCFUtils.Math(n.revTrfAmt,loanPerc,'mul');
				var arAvalLoan = $("#arAvalLoan").val();
				ttlArAvalLoan =  SCFUtils.Math(ttlArAvalLoan,SCFUtils.Math(arAvalLoan,revTrfAmtRow,'sub'),'add');//更新协议表，应收账款可融资额-=反转让金额*融资比例
				ttlArBal =  SCFUtils.Math(ttlArBal,SCFUtils.Math($("#arBal").val(),n.revTrfAmt,'sub'),'add');//更新协议表，应收账款余额-=反转让金额
				
			    var invCust = {};  //发票中的客户信息
		        invCust.sysRefNo = n.buyerId;
		        invCust.buyerNm = n.buyerNm;
		        invCust.revTrfAmt = n.revTrfAmt;
				custData.push(invCust);
				var options = {};
				options.data = {
					refName : 'inCbkRef',
					refField : 'cbkRefNo',
					cacheType : 'non'	
				};
				SCFUtils.getRefNo(options);
				var cbkRefNo = $('#cbkRefNo').val();
				var index = $("#invcCbkTable").datagrid('getAllRowIndex',n);
				var row = {   //修改发票表的转让金额
		        		sysRefNo : cbkRefNo,
		        		trxId : sysRefNo,
		        		invId : n.sysRefNo,
		        		cbkDt : cbkDt,
		        		invBal : 0,
		        		invLoanAval :0
		        	};
				if(SCFUtils.FUNCTYPE == 'FP'){
					row = {   //修改发票表的转让金额
			        		sysRefNo : cbkRefNo,
			        		trxId : sysRefNo,
			        		cbkDt : cbkDt,
			        		invBal : 0,
			        		invLoanAval :0
			        	};
					if(flagHD){
						row = { // 修改发票表的转让金额 
								sysRefNo : cbkRefNo,
				        		trxId : sysRefNo,
				        		invId : n.sysRefNo,
				        		cbkDt : cbkDt,
				        		invBal : 0,
				        		invLoanAval :0
								
						}; }
				}
				$('#invcCbkTable').datagrid('updateRow', {
		        	index : index,
		        	row : row
		        });
				/*if("FP" == SCFUtils.FUNCTYPE){//退回复核是否插入相同数据
					if(!checkInvCbk(n.invNo)){
						fpData.push(n);	
					}
				}*/
			
			}
		});
		$("#arAvalLoan").val(ttlArAvalLoan);
		$("#arBal").val(ttlArBal);
		
		/*if("FP" == SCFUtils.FUNCTYPE && SCFUtils.isEmpty(fpData)){
			invCbk._total_rows = fpData.length;
			$.each(fpData,function(i,obj){
				invCbk['rows'+i+''] = obj;
			});
		}*/
	}
	var cust = {}; //合并客户信息
	for(var i=0;i<custData.length;i++){
		var obj = queryCust(custData[i].sysRefNo);//查询买方额度信息
		 custData[i].lmtBal = obj.lmtBal;
		 custData[i].lmtAllocate = obj.lmtAllocate;
		 if(custData.length>1){
			 for(var j=custData.length-1;j>i;j--){
				 if(custData[j].sysRefNo == custData[i].sysRefNo){
					 custData[i].revTrfAmt = SCFUtils.Math(custData[i].revTrfAmt,custData[j].revTrfAmt,'add');
					 custData.splice(j, 1);
				 }
			 }	  
			 custData[i].lmtBal = SCFUtils.Math(custData[i].lmtBal,custData[i].revTrfAmt,'add');
			 custData[i].lmtAllocate = SCFUtils.Math(custData[i].lmtAllocate,custData[i].revTrfAmt,'sub');
		 }else{
			 custData[i].lmtBal = SCFUtils.Math(custData[i].lmtBal,custData[i].revTrfAmt,'add'); //可用额度
			 custData[i].lmtAllocate = SCFUtils.Math(custData[i].lmtAllocate,custData[i].revTrfAmt,'sub');//已用额度
		 }
	}
	cust._total_rows = custData.length;
    //额度关联关系表与客户表更新
	var cntrct = {};
	var cntChange = {};
	cust._total_rows = custData.length;
	cntrct._total_rows = custData.length;
	cntChange._total_rows = custData.length;
	$.each(custData,function(i,obj){
		cust['rows'+i+''] = obj;
		var cntrctSbrM = queryCntrctSbrM(cntrctNo,obj.sysRefNo);//客户额度编号，买方Id查询关联表中的买方关联额度
		var buyerLmtBat = SCFUtils.Math(cntrctSbrM.buyerLmtBat,obj.revTrfAmt,'add'); //关联买方额度余额+净额
		cntrct['rows'+i+''] = {'buyerLmtBat':buyerLmtBat,'sysRefNo':cntrctSbrM.sysRefNo};
		//额度变更表插入记录
		var cntrctNo = $("#cntrctNo").val();
		//var buyerId = $("#buyerId").val();
		//var selId = $("#selId").val();
		var trxCcy = $('#ccy').combobox('getValue');
		var clType = "O";
		var tdType = "R";
		cntChange['rows'+i+''] = {"sysRefNo":sysRefNo+obj.sysRefNo,"cntrctNo":cntrctNo,"clType":clType,"tdType":tdType,
				"trxDate":cbkDt,"trxAmt":obj.revTrfAmt,"refNo":sysRefNo,"trxCcy":trxCcy,'custNo':obj.sysRefNo,'custNm':obj.buyerNm};
	});
	
	
	
	/*var ttlCbkAmt = $("#ttlCbkAmt").numberbox('getValue');
	var buyerId =  $('#buyerId').val();
	var lmtBal=$('#lmtBal').val();
	var lmtAllocate = $('#lmtAllocate').val();
	lmtBal = SCFUtils.Math(lmtBal,ttlCbkAmt,'add');//买方可额度 
    lmtAllocate = SCFUtils.Math(lmtAllocate,ttlCbkAmt,'sub'); //买方已额度
	var gridCust ={'sysRefNo':buyerId,'lmtBal':lmtBal,'lmtAllocate':lmtAllocate};//更新客户信息表
	
	var cntrctNo = $("#cntrctNo").val();
	var buyerId = $("#buyerId").val();
	var selId = $("#selId").val();
	var trxCcy = $('#ccy').combobox('getValue');
	var clType = "O";
	var tdType = "R";
	var buyerId = $('#buyerId').val();
	var buyerNm = $('#buyerNm').val();
	var cntChange ={};//更新额度变更表
	cntChange = {"sysRefNo":sysRefNo+buyerId,"cntrctNo":cntrctNo,"clType":clType,"tdType":tdType,
			"trxDate":cbkDt,"trxAmt":ttlCbkAmt,"refNo":sysRefNo,"trxCcy":trxCcy,'custNo':buyerId,'custNm':buyerNm};
	var custSbrM = {};//更新客户关联表
	var cntrctSbrM = queryCntrctSbrM(cntrctNo,buyerId);
	var buyerLmtBat = SCFUtils.Math(cntrctSbrM.buyerLmtBat,ttlCbkAmt,"add");
	custSbrM = {'buyerLmtBat':buyerLmtBat,'sysRefNo':cntrctSbrM.sysRefNo};
	*/
	grid.invCbk = SCFUtils.json2str(invCbk);
	grid.cust = SCFUtils.json2str(cust);
	grid.cntChange = SCFUtils.json2str(cntChange);
	grid.custSbrM = SCFUtils.json2str(cntrct);
	//打包买方额度数据
	grid.buyerLmt = SCFUtils.json2str(getBuyerLmtData());
	$.extend(data, grid);
	return data;
}

function ajaxBox() {
	var data =  [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	},{
		"id" : '3',
		"text" : "信用保险项下"
	},{
		"id" : '6',
		"text" : "应收账款池融资"
	}];
	$("#busiTp").combobox('loadData', data);
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006',
			},
			callBackFun:function(data){
				if(data.success){
					$('#ccy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(optt);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setTextReadonly("cntrctNo", true);
	//SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setNumberboxReadonly("ttlRevTrfAmt", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("ccy", true);
	SCFUtils.setNumberboxReadonly('regNo', true);
	SCFUtils.setTextReadonly("sysRefNo", true);
}

function cntrctReQueryAjax(cntrctNo) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000008',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$('#busiTp').combobox('setValue',data.rows[0].busiTp);
			}
		}
	};
	SCFUtils.ajax(opt);
}

function cntrctReCost(sysRefNo) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000107',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#currTransCost').numberbox('setValue',data.rows[0].currTransCost);
				$('#costPayFlg').combobox('setValue',data.rows[0].costPayFlg);
				$('#currTransPayCost').numberbox('setValue',data.rows[0].currTransPayCost);
			}
		}
	};
	SCFUtils.ajax(opt);
}

function cntrctQueryAjax(cntrctNo) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000008',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#transChgrt').numberbox('setValue',data.rows[0].transChgrt);
			}
		}
	};
	SCFUtils.ajax(opt);
}



function queryCust(sysRefNo){
	var obj = {};
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000021',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					obj = data.rows[0];
				}
			}
		};
		SCFUtils.ajax(opt);
		return obj;
}

function queryInvc(){
	var newData = [];
	if("FP"==SCFUtils.FUNCTYPE){//退回处理时加入退回处理的数据
		sysRefNo = $("#sysRefNo").val();
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000410',
					trxId : sysRefNo
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						$.each(data.rows,function(i,obj){
							obj.invBal= obj.revTrfAmt;
							obj.revTrfAmt=0;
						});
						newData = data.rows;
					}
				}
			};
			SCFUtils.ajax(options);
	}else if("PM"==SCFUtils.FUNCTYPE){//申请 
		var data=SCFUtils.convertArray('cbkRegForm');
		if(data){
		    $('#invcCbkTable').datagrid('clearChecked');
			//加载的时候重新加载datagrid
			$('#invcCbkTable').datagrid('loadData', { total: 0, rows: [] });
			var buyerId=$('#buyerId').val();
			var selId=$('#selId').val();
			var cntrctNo = $('#cntrctNo').val();
			var opt = {
					url : SCFUtils.AJAXURL,
					data : {
						queryId : 'Q_P_000720',
						buyerId : buyerId,
						selId   : selId,
						cntrctNo :cntrctNo
					},
					callBackFun : function(data) {
						if (data.success && !SCFUtils.isEmpty(data.rows)) {
						$.each(data.rows, function(i, n){
							$.extend(n,{
								invBalHD:n.invBal,
								invSts:'CBK',
								revTrfAmt:'0'
							});
							newData.push(n);
						});
						SCFUtils.loadGridData('invcCbkTable',newData,false,true);
						}else{					
							SCFUtils.alert("未找到符合条件的应收账款");
						}
					}
			};
			SCFUtils.ajax(opt);
			}
	}
	$('#ttlRevTrfAmt').numberbox('setValue',0);
}
/**
 * modify by shizaiqiang用于添加了一个查询按钮 
 * flagHD为点击查询按钮后设置为true，用于下一步打包时做判断
 */
var flagHD = false;

function queryInvcrRe(){
	flagHD = true;
	var newData = [];
	/*if("FP"==SCFUtils.FUNCTYPE){//退回处理时加入退回处理的数据
		sysRefNo = $("#sysRefNo").val();
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000410',
					trxId : sysRefNo
				},
				callBackFun : function(data) {
					if (!SCFUtils.isEmpty(data.rows)) {
						$.each(data.rows,function(i,obj){
							obj.invBal= obj.revTrfAmt
							obj.revTrfAmt=0;
						});
						newData = data.rows;
					}
				}
			};
			SCFUtils.ajax(options);
	}*/
	
	var data=SCFUtils.convertArray('cbkRegForm');

	if(data){
	    $('#invcCbkTable').datagrid('clearChecked');
		//加载的时候重新加载datagrid
		$('#invcCbkTable').datagrid('loadData', { total: 0, rows: [] });
		var buyerId=$('#buyerId').val();
		var selId=$('#selId').val();
		var cntrctNo = $('#cntrctNo').val();
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000720',
					buyerId : buyerId,
					selId   : selId,
					cntrctNo :cntrctNo
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$.each(data.rows, function(i, n){
						$.extend(n,{
							invBalHD:n.invBal,
							invSts:'CBK',
							revTrfAmt:'0'
						});
						newData.push(n);
					});
					SCFUtils.loadGridData('invcCbkTable',newData,false,true);
					}else{					
						SCFUtils.alert("未找到符合条件的应收账款");
					}
				}
		};
		SCFUtils.ajax(opt);
	}
	$('#ttlRevTrfAmt').numberbox('setValue',0);
}


function querySelAcNo(data){
	var acOwnerid=data.obj.selId;
	if(!SCFUtils.isEmpty(acOwnerid)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000105',
					acOwnerid : acOwnerid
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
						$('#selAcNo').numberbox('setValue',data.rows[0].acNo);
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}



function getDate(date){
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function loadTable(sysRefNo) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : data = {
				queryId : 'Q_P_000410',
				trxId : sysRefNo
			},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				if(SCFUtils.FUNCTYPE == 'FP'){
					SCFUtils.loadGridData('invcCbkTable', data.rows,false,true);
				}else {
					SCFUtils.loadGridData('invcCbkTable', data.rows,true,true);
				}
				if(SCFUtils.FUNCTYPE != 'PM'){
					$('#regNo').numberbox('setValue',data.rows.length);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function checkDataGrid() {
	var flag = false;
	var data = $('#invcCbkTable').datagrid('getData');
	if (data.total == 0) {
		SCFUtils.alert('请添加应收账款！');
		flag = true;
	}
	return flag;
}
function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		//singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度(修改为不自适应为了鼠标能拖动列宽)
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			width : 100,
		    hidden : true
		},{
			field : 'buyerId',
			title : '间接客户编号',
			width :100,
			hidden : true
		},{
			field : 'buyerNm',
			title : '间接客户名称',
			width :'9.09%'
		},{
			field : 'invNo',
			title : '应收账款凭证编号',
			width :'9.09%'
		}, {
			field : 'invCcy',
			title : '币种',
			width : '9.09%',
			formatter:ccyFormater
		}, {
			field : 'invAmt',
			title : '应收账款金额',
			width : '9.09%',
			formatter:ccyFormater
		}, {
			field : 'acctAmt',
			title : '预付款金额',
			width : '9.09%',
			formatter:ccyFormater
		}, {
			field : 'invBal',
			title : '应收账款净额',
			width : '9.09%',
			formatter:ccyFormater
		}, {
			field : 'revTrfAmt',
			title : '反转让金额',
			width :'9.09%',
			formatter:ccyFormater
		}, {
			field : 'invValDt',
			title : '应收账款起算日期',
			width :'9.09%',
			formatter:dateFormater
		}, {
			field : 'invDueDt',
			title : '应收账款到期日',
			width :'9.09%',
			formatter:dateFormater
		}, {
			field : 'reTrfNo',
			title : '反转让批次',
			width :100,
			hidden : true
		} ,{
			field : 'invSts',
			title : '发票状态',
			width :100,
			hidden : true
		}, {
			field : 'loanPerc',
			title : '融资比例(%)',
			width :'9.09%'
		},{
			field : 'invLoanAval',
			title : '可融资余额',
			width :'9.09%',
			formatter:ccyFormater
		}
		] ]
	};
	$('#invcCbkTable').datagrid(options);
}


/*function getregAmt() {
	var data=$('#invcCbkTable').datagrid('getAllData');
	var ttlCbkAmt;
	var lmtBalHD=$('#lmtBal').numberbox('getValue');
	var lmtHD=0;
	$.each(data.rows,function(i,n){
		if(!SCFUtils.isEmpty(n.chgBcAmt)&&n.chgBcAmt>0){
			ttlCbkAmt=SCFUtils.Math(ttlCbkAmt, n.chgBcAmt, 'add');
			if(!SCFUtils.isEmpty(n.arType)&&n.arType=='6'){
				lmtBalHD=SCFUtils.Math(lmtBalHD, n.chgBcAmt, 'sub');
				lmtHD=SCFUtils.Math(lmtHD, n.chgBcAmt, 'sub');
			}else{
				lmtBalHD=SCFUtils.Math(lmtBalHD, n.chgBcAmt, 'add');
				lmtHD=SCFUtils.Math(lmtHD, n.chgBcAmt, 'add');
			}
		}
	})
	$('#ttlCbkAmt').numberbox('setValue',ttlCbkAmt);
	$('#lmtBalHD').val(lmtBalHD);
	$('#lmtHD').val(lmtHD);	
}

function editSuccess(data) {
	data.flag='Y'
	var row = $('#invcCbkTable').datagrid('getSelected');
	getregAmt();
	
	//在小页弹出融资余额大于0的提示
	var invLoanBal=data.invLoanBal;
	invLoanBal=parseInt(invLoanBal);
	if(invLoanBal>0){
//		var invNo=invLoanBalList[i].invNo;
//		SCFUtils.alert("您编号为“"+invNo+"”的发票，融资余额超出！建议您重新选择。");
		SCFUtils.alert("本次应收账款的融资余额超出,建议您重新选择应收账款进行反转让！");
//		return;
	}
	//end
}


// 修改一条数据
function editRow() {
	//清空所有反转让金额
	var rows = $('#invcCbkTable').datagrid('getRows');
	$.each(rows,function(i,n){
		var rowIndex = $('#invcCbkTable').datagrid('getRowIndex', n);
		$('#invcCbkTable').datagrid('updateRow', {
			index : rowIndex,
			row : {
				chgBcAmt: 0
			}
		});
	});
	//计算选中的反转让金额
	var row = $('#invcCbkTable').datagrid('getSelections');
	if(row.length<1){
	  SCFUtils.alert("请选择一条数据！");	
	  return ;
	}
	var ttlCbkAmt;
   $.each(row,function(i,n){
	   var rowIndex = $('#invcCbkTable').datagrid('getRowIndex', n);
		$('#invcCbkTable').datagrid('updateRow', {
			index : rowIndex,
			row : {
				chgBcAmt: n.invBal	
			}
		});
		ttlCbkAmt =SCFUtils.Math(ttlCbkAmt,n.invBal,"add");
	});
	 $('#ttlCbkAmt').numberbox('setValue',ttlCbkAmt);
}

*//**
 * 提交时给还款子表的eventTimes字段赋值
 * 还款子表的eventTimes值为发票E表中最大sysEventTImes+1
 *//*

function addEventTimes(){
	var griddata=SCFUtils.getSelectedGridData('invcLoanTable',false);	
	var datas = SCFUtils.parseGridData(griddata, false);
	$.each(datas, function(i, n) {
		var eventTimes=(n.invcId);
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
}*/

/*function showLookUpWindow(){
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		title:'间接客户查询',
		reqid:'I_P_000111',
		data:{'cntrctNo' : cntrctNo},
		onSuccess:buyerSuccess
	};
	SCFUtils.getData(options);
}

function buyerSuccess(data){
	$('#buyerNm').val(data.buyerNm);
	$('#buyerId').val(data.buyerId)
	queryCust(data.buyerId);
	queryInvc();
}*/


//选中一行
function onCheck(rowIndex,rowData){
	sumRegNo(rowData, 'add');
	var ttlRevTrfAmt = $("#ttlRevTrfAmt").numberbox('getValue');
	ttlRevTrfAmt = SCFUtils.Math(ttlRevTrfAmt,rowData.invBal,"add");
	var rowIndex = $('#invcCbkTable').datagrid('getRowIndex', rowData);
	$("#ttlRevTrfAmt").numberbox('setValue',ttlRevTrfAmt);
	//rowIndex  = rowIndex+10; 
	$('#invcCbkTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			revTrfAmt: rowData.invBal,
			invBal: 0
		}
	});
}

//取消一行选中
function onUncheck(rowIndex,rowData){
	sumRegNo(rowData, 'sub');
	var ttlRevTrfAmt = $("#ttlRevTrfAmt").numberbox('getValue');
	ttlRevTrfAmt = SCFUtils.Math(ttlRevTrfAmt,rowData.revTrfAmt,"sub");
	var rowIndex = $('#invcCbkTable').datagrid('getRowIndex', rowData);
	$("#ttlRevTrfAmt").numberbox('setValue',ttlRevTrfAmt);
	$('#invcCbkTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			revTrfAmt: 0,
			invBal: rowData.revTrfAmt
		}
	});
}

//全部选中
function onCheckAll(rows){
	getTtlDatas();
	var ttlRevTrfAmt = $("#ttlRevTrfAmt").numberbox('getValue');
	$.each(rows,function(i,obj){
		var rowIndex = $('#invcCbkTable').datagrid('getRowIndex', obj);
		ttlRevTrfAmt = SCFUtils.Math(ttlRevTrfAmt,obj.invBal,"add");
		if( obj.invBal != 0){
			$('#invcCbkTable').datagrid('updateRow', {
				index : rowIndex,
				row : {
					revTrfAmt: obj.invBal,
					invBal: 0
				}
			});
		}
	});
	$("#ttlRevTrfAmt").numberbox('setValue',ttlRevTrfAmt);
}

//全部不选中
function onUncheckAll(rows){
	getTtlDatas();
	$("#ttlRevTrfAmt").numberbox('setValue',0);
	$.each(rows,function(i,obj){
		var rowIndex = $('#invcCbkTable').datagrid('getRowIndex', obj);
		//ttlRevTrfAmt = SCFUtils.Math(ttlRevTrfAmt,obj.invBal,"add");
		$('#invcCbkTable').datagrid('updateRow', {
			index : rowIndex,
			row : {
				invBal: obj.revTrfAmt,
				revTrfAmt: 0
			}
		});
	});
}

function getTtlDatas() {
	var griddata = SCFUtils.getSelectedGridData('invcCbkTable', false);
	/*if(SCFUtils.FUNCTYPE == 'FP'){
		griddata = $('#invcCbkTable').datagrid('getChecked');
		var grid = {};
		grid['_total_rows'] = griddata.length;
		$.each(griddata,function(i,v){
			grid['row'+i] = v;
		});
		griddata = grid;
	}*/
	var regNo = 0;// 待转让笔数
	if (griddata._total_rows == '0') {
		$('#regNo').numberbox('setValue', 0);
		return;
	}
	$.each(griddata, function(i, n) {
		if (i != '_total_rows') {
			// 待反转让笔数
			regNo = SCFUtils.Math(regNo, 1, 'add');
		}
	});
	$('#regNo').numberbox('setValue', regNo);
}
//待反转让笔数
function sumRegNo(rowData, flag) {
	var regNo = $('#regNo').numberbox('getValue');
	regNo = SCFUtils.Math(regNo, 1, flag);
	$('#regNo').numberbox('setValue', regNo);
}
//查询额度关联关系表
function  queryCntrctSbrM(cntrctNo,buyerId){
	var obj ={};
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000385',
				cntrctNo : cntrctNo,
				buyerId : buyerId
			},
			callBackFun : function(data) {
				if(!SCFUtils.isEmpty(data.rows)){
					obj = data.rows[0];
				}
			}
		};
		SCFUtils.ajax(options);
		return obj;
}

//验证发票是否退回处理
function checkInvCbk(invNo){
	var flag = false;
	var options = {
			url : SCFUtils.AJAXURL,
			data : data = {
					queryId : 'Q_P_000410',
					invNo : invNo
				},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					flag = true;
				}
			}
		};
		SCFUtils.ajax(options);
	return flag;
}

//查询保单信息
function queryInsure(cntrctNo){
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000424',
				cntrctNo : cntrctNo
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					$('#collatCompNm').val(data.rows[0].collatCompNm);
					$('#insureNo').val(data.rows[0].insureNo);
				}
			}
		};
		SCFUtils.ajax(options);
}

//查询额度关联关系表
function  queryCntrctSbrM(cntrctNo,buyerId){
	var obj ={};
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000385',
				cntrctNo : cntrctNo,
				buyerId : buyerId
			},
			callBackFun : function(data) {
				if(!SCFUtils.isEmpty(data.rows)){
					obj = data.rows[0];
				}
			}
		};
		SCFUtils.ajax(options);
		return obj;
}

//查询客户信息表
function queryCustInfo(buyerId) {
	var obj = {};
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000559',
			sysRefNo:buyerId
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
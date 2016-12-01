function getDate(date){
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}
function queryBuyer(){
	var trxId=$('#cntrctNo').val();
	if(!SCFUtils.isEmpty(trxId)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000111',
					trxId : trxId
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
						$('#buyerId').combobox('loadData', data.rows);	
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}

function queryBuyerNm(){
	var buyerId=$('#buyerId').combobox('getValue');
	if(!SCFUtils.isEmpty(sysRefNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000106',
					sysRefNo : buyerId
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
						$('#buyerNm').val(data.rows[0].custNm);	
						$('#lmtBal').numberbox('setValue',data.rows[0].lmtBal);
						//alert($('#lmtBal').val());
						$('#lmtAllocate').numberbox('setValue',data.rows[0].lmtAllocate);
						//alert($('#lmtAllocate').val());
						queryInvc2();
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}

function queryNmEx(custid, name){
	//var buyerId=$('#buyerId').combobox('getValue');
	if(!SCFUtils.isEmpty(sysRefNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000106',
					//sysRefNo : buyerId
					sysRefNo : custid
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
						//$('#buyerNm').val(data.rows[0].custNm);	
						$('#'+name).val(data.rows[0].custNm);	
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}


function queryInvc2(){
	var cntrctNo=$('#cntrctNo').val();
	var selId=$('#selId').val();
	var buyerId=$('#buyerId').combobox('getValue');
	if(!SCFUtils.isEmpty(cntrctNo)&&!SCFUtils.isEmpty(selId)&&!SCFUtils.isEmpty(buyerId)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000112',
					cntrctNo : cntrctNo,
					selId    : selId,
					buyerId  : buyerId
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
						SCFUtils.loadGridData('invcCdnTable', data.rows, false, true);
						makeExtend();
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}

function makeExtend() {
	var rows = $('#invcCdnTable').datagrid('getRows');
	$.each(rows,function(i,n){
		var rowIndex = $('#invcCdnTable').datagrid('getRowIndex', n);
		$('#invcCdnTable').datagrid('updateRow', {
			index : rowIndex,
			row : {
				invBal2:n.invBal,
				invLoanAval2:n.invLoanAval,
				crnAmt2:n.crnAmt
			}
		});
	});
}

function ajaxBox2() {
	var data =  [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	} ];
	$("#busiTp").combobox('loadData', data);
	var costPayFlg =  [ {
		"id" : 'Y',
		"text" : "是"
	}, {
		"id" : 'N',
		"text" : "否"
	} ];
	$("#costPayFlg").combobox('loadData', costPayFlg);
	
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006'
			},
			callBackFun:function(data){
				if(data.success){
					$('#ccy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(optt);

}

function ajaxTable2() {
	
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		singleSelect : true,
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'cntrctNo',
			title : '授信额度编号'
		}, {
			field : 'batchNo',
			title : '批次号'
		}, {
			field : 'sysRefNo',
			title : '流水号'
		}, {
			field : 'selId',
			title : '授信客户编号'
		}, {
			field : 'buyerId',
			title : '间接客户编号'
		}, {
			field : 'invCcy',
			title : '币别',
			hidden : true
		}, {
			field : 'invNo',
			title : '凭证编号'
		}, {
			field : 'acctPeriod',
			title : '账期',
			hidden : true
		}, {
			field : 'invDt',
			title : '应收账款日期',
			formatter:dateFormater,
			hidden : true
		}, {
			field : 'invValDt',
			title : '起算日',
			formatter:dateFormater,
			hidden : true
		}, {
			field : 'invDueDt',
			title : '到期日',
			formatter:dateFormater,
			hidden : true
		}, {
			field : 'dueDt',
			title : '逾期日',
			formatter:dateFormater,
			hidden : true
		}, {
			field : 'invAmt',
			title : '应收账款金额'
		}, {
			field : 'acctAmt',
			title : '预付款',
			formatter:ccyFormater
		}, {
			field : 'invBal',
			title : '应收账款余额',
			formatter:ccyFormater
		}, {
			field : 'invBal2',   
			title : '应收账款余额',
			formatter:ccyFormater,
			hidden : true
		}, {
			field : 'loanPerc',
			title : '融资比例',
			formatter:ccyFormater
		}, {
			field : 'invLoanAval', 
			title : '可融资金额',
			formatter:ccyFormater
		}, {
			field : 'invLoanAval2',
			title : '可融资金额',
			formatter:ccyFormater,
			hidden : true
		}, {
			field : 'invLoanBal',
			title : '融资余额',
			formatter:ccyFormater  
		}, {
			field : 'crnAmt',
			title : '贷项清单金额',
			formatter:ccyFormater,
			editor : {
				type : 'numberbox',
				options:{
					precision: 2,
					required : true,
					onChange : function (newValue, oldValue) {
			               
						var row = $dg.datagrid('getSelected');
						var rindex = $dg.datagrid('getRowIndex', row);
						var ed = $dg.datagrid('getEditor', {
								index : rindex,
								field : 'listprice'
							});
						$(ed.target).numberbox('setValue', '2012');
					}
				}
			}
		}, {
			field : 'crnAmt2',
			title : '贷项清单金额',
			formatter:ccyFormater,
			hidden : true
		}, {
			field : 'linkInvRef',
			title : '原始应收账款流水号',hidden : true,width : 100
		}/*, {
			field : 'chgBcAmt',
			title : '反转让金额',
			width :100,
			formatter:ccyFormater
		}*/
		] ],
		onBeforeEdit:function(index,row){
	        row.editing = true;
	        $obj.datagrid('refreshRow', index);
	    },
	    onAfterEdit:function(index,row){
	        row.editing = false;
	        $obj.datagrid('refreshRow', index);
	    },
	    onCancelEdit:function(index,row){
	        row.editing = false;
	        $obj.datagrid('refreshRow', index);
	    }
	};
	$('#invcCdnTable').datagrid(options);
}

function ajaxTable3() {
	
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		singleSelect : true,
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'cntrctNo',
			title : '授信额度编号'
		}, {
			field : 'sysRefNo',
			title : '流水号'
		}, {
			field : 'trxId',
			title : '关联流水号'
		}, {
			field : 'invCcy',
			title : '币别'
		}, {
			field : 'invId',
			title : '应收账款流水'
		},{
			field : 'invNo',
			title : '凭证编号'
		}, {
			field : 'cbkDt',
			title : '交易日期',
			formatter:dateFormater
		}, {
			field : 'invAmt',
			title : '应收账款金额'
		}, {
			field : 'invBal',
			title : '应收账款余额',
			formatter:ccyFormater
		}, {
			field : 'loanPerc',
			title : '融资比例',
			formatter:ccyFormater
		}, {
			field : 'invLoanAval', 
			title : '可融资金额',
			formatter:ccyFormater
		}, {
			field : 'invLoanBal',
			title : '融资余额',
			formatter:ccyFormater  
		}, {
			field : 'invCrnBal',
			title : '贷项清单金额',
			formatter:ccyFormater/*,
			editor : {
				type : 'numberbox',
				options:{
					precision: 2,
					required : true,
					onChange : function (newValue, oldValue) {
			               
						var row = $dg.datagrid('getSelected');
						var rindex = $dg.datagrid('getRowIndex', row);
						var ed = $dg.datagrid('getEditor', {
								index : rindex,
								field : 'listprice'
							});
						$(ed.target).numberbox('setValue', '2012');
					}
				}
			}*/
		}/*, {
			field : 'chgBcAmt',
			title : '反转让金额',
			width :100,
			formatter:ccyFormater
		}*/
		] ],
		onBeforeEdit:function(index,row){
	        row.editing = true;
	        $obj.datagrid('refreshRow', index);
	    },
	    onAfterEdit:function(index,row){
	        row.editing = false;
	        $obj.datagrid('refreshRow', index);
	    },
	    onCancelEdit:function(index,row){
	        row.editing = false;
	        $obj.datagrid('refreshRow', index);
	    }
	};
	$('#invcCdnTable').datagrid(options);
	
}

function addEditorToInvcCdnTable() {
	$("#invcCdnTable").datagrid('addEditor', {
		field : 'crnAmt',
		editor : {
			//type : 'validatebox',
			type : 'numberbox'/*,
			options : {
				required : true
			}*/
		}
	});
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function pageOnInt(data) {
	ajaxBox();
	//ajaxTable();
	/////////////////////////////////////////////////////////////////////////////////////////
	ajaxBox2();
	ajaxTable2();
	//addEditorToInvcCdnTable();
	////////////////////////////////////////////////////////////////////////////////////////
}

function pageOnLoad(data) {
	SCFUtils.loadForm('cdnRegForm',data);
	
	//////////////////////////////////////////////////////////////////////////
	//$('#trxDt').datebox('setValue',getDate(new Date()));
	 queryBuyer();
	
	
	/////////////////////////////////////////////////////////////////////////
	$('#ccy').combobox('setValue', data.obj.lmtCcy);
	$('#cntrctNo').val(data.obj.cntrctNo);
	$('#selId').val(data.obj.selId);
	
	var options = {};
	options.data = {
		refName : 'cdnRef',
		refField : 'sysRefNo'
	};
	
	SCFUtils.getRefNo(options);

}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('cdnRegForm',data.obj);
	SCFUtils.loadGridData('invcCdnTable',SCFUtils.parseGridData(data.obj.invCbk), true);
	
	//var ttlCrnAmt = $('#ttlCrnAmt').numberbox('getValue');
	$('#ttlCrnAmt').numberbox('setValue',data.obj.ttlCrnAmt);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('cdnRegForm',data.obj);
	SCFUtils.loadGridData('invcCdnTable', SCFUtils.parseGridData(data.obj.invCbk), false);
	$('#ttlCrnAmt').numberbox('setValue',data.obj.ttlCrnAmt);
}
function pageOnReleasePageLoad(data) {
	
	SCFUtils.loadForm('cdnRegForm',data);
	
	/////////////////////////////////////////////////////////
	
	$('#rowTtlCrnAmt').numberbox('setValue',0.00);
	$('#rowTtlCrnBal').numberbox('setValue',0.00);
	
	var buyerId = $('#buyerId').combobox('getValue');
	var selId   = $('#selId').val();
	/*
	queryNmEx(data.obj.buyerId, 'buyerNm');
	queryNmEx(data.obj.selId, 'selNm');
	*/
	
	queryNmEx(buyerId, 'buyerNm');
	queryNmEx(selId, 'selNm');
	
	////////////////////////////////////////////////////////
	cntrctReQueryAjax(data.obj.cntrctNo);
	queryCust(data.obj.buyerId);
	
	ajaxTable3();
	
	//$('#invcCdnTable').datagrid('options');
	//$('#toolbar').html('');
	/*$('#invcCdnTable').datagrid({
		toolbar : [ {
			text : '查询',
			iconCls : 'icon-search',
			handler : function() {
				editRow();
			}
		} ]
	});*/
	loadTable(data);
	
	//$('#ttlCrnAmt').numberbox('setValue',data.obj.ttlCrnAmt);
	
	/*
	SCFUtils.loadForm('cdnRegForm',data.obj);
	SCFUtils.loadGridData('invcCdnTable',SCFUtils.parseGridData(data.obj.invCbk), true);
	$('#ttlCrnAmt').numberbox('setValue',data.obj.ttlCrnAmt);
	*/
}

function queryCust(sysRefNo){
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000021',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#lmtBal').val(data.rows[0].lmtBal);
				$('#lmtAllocate').val(data.rows[0].lmtAllocate);
			}
		}
	};
	SCFUtils.ajax(opt);
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}

function makeJoson(grid, isSerialize) {
	
	var result = {};

	var gridSelection = $('#' + grid).datagrid("getRows");
	
	var index = 0;
	var total = 0;
	
	$.each(gridSelection, function(i, rowData) {
		if(rowData.crnAmt > 0.00){
			result['rows' + index + ''] = isSerialize === true ? SCFUtils.json2str(rowData): rowData;
			total++;
			index++;
		}
	});
	result._total_rows = total;
	
	return result;
	
};

function onNextBtnClick() {
	
	var grid = {};
	
	var invm;
	var invCbk;
	var cntrctChange;
	if(SCFUtils.FUNCTYPE === 'RE' /*表示复核过程*/){
		 invm   = SCFUtils.getGridData("invcCdnTable",false);
		 invCbk = SCFUtils.getGridData("invcCdnTable",false);
		 cntrctChange = getcntrctChange(invCbk,'RE');
		 //SCFUtils.loadGridData('invcCdnTable2',cntrctChange.rows, true);
		 grid.invCbk = SCFUtils.json2str(invCbk);
		 grid.invm = SCFUtils.json2str(invm);
	} else {
		{
			var ttlCrnAmt = $('#ttlCrnAmt').numberbox('getValue');
			$('#regAmt').val(ttlCrnAmt);
			if(ttlCrnAmt == 0) {
				SCFUtils.alert("没有制作贷项清单调整.");
				return;
			}
		}
		
	    invm   = makeJoson("invcCdnTable", false);
	    invCbk = makeJoson("invcCdnTable", false);
	    invCbk = updateCbk(invCbk);
	    
	    cntrctChange = getcntrctChange(invCbk,'');
	    grid.invCbk = SCFUtils.json2str(invCbk);
		grid.invm = SCFUtils.json2str(invm);
		
	}
	
	grid.cChange = SCFUtils.json2str(cntrctChange);
	grid.cust = SCFUtils.json2str(getCustUpdate());
	grid.sbr  = SCFUtils.json2str(getSBR());
	
	
	var data = SCFUtils.convertArray('cdnRegForm');
	
	data.rowTtlCrnAmt = 0.00;
	data.rowTtlCrnBal = 0.00;
	
	$.extend(data, grid);
	
	return data;
	
}

function getSBR() {
	
	var sbr;
	
	var cntrctNo = $('#cntrctNo').val();
	var buyerId  = $('#buyerId').combobox('getValue');
	var selId    = $('#selId').val();
	
	if(!SCFUtils.isEmpty(sysRefNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000392',
					cntrctNo : cntrctNo,
					buyerId  : buyerId,
					selId    : selId
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
						//lmtBalHd
						var buyerLmtBat = data.rows[0].buyerLmtBat;
						var ttlCrnAmtValue = $('#ttlCrnAmt').numberbox('getValue');
						
						buyerLmtBat = SCFUtils.Math(buyerLmtBat, ttlCrnAmtValue,'sub');
						
						var sbrNo = data.rows[0].sysRefNo;
						
						sbr = {'sbrNo':sbrNo,'cntrctNo':buyerId,'selId':selId,'buyerId':buyerId,'buyerLmtBat':buyerLmtBat};
						
					}
				}
			};
			SCFUtils.ajax(opt);
	}
	
	return sbr;
	
}

//var CUST_NO;
//var CUST_NM;
var CNTRCT_NO
var REF_NO;
var TRX_CCY;
var TRX_AMT;
var EXP_TRX_AMT;
//var CL_TYPE;
//var TD_TYPE;
var TRX_DATE;
function getcntrctChange(invCbk,type){
	
	CNTRCT_NO=$('#cntrctNo').val();
	REF_NO=$('#sysRefNo').val();
	TRX_CCY=$('#ccy').combobox('getValue');
	TRX_AMT=$('#ttlCrnAmt').numberbox('getValue');
	EXP_TRX_AMT=$('#ttlCrnAmt').numberbox('getValue');
	//TRX_DATE=$('#trxDt').datebox('getValue'); 
	TRX_DATE= getDate(new Date());
	//CL_TYPE	String	1   额度类型(S:卖方额度 O:买方额度)
	//TD_TYPE	String	1  占用/释放(T:占用 R:释放)
	
	var buyerId=$('#buyerId').combobox('getValue');
	var selId=$('#selId').val();
	var buyerNm=$('#buyerNm').val();
	var selNm=$('#selNm').val();
	/*
	var cntrctChange1 = getCntrctChangeNo('cntrctChange1');
	var cntrctChange2 = getCntrctChangeNo('cntrctChange2');
	*/
	/*if(type == 'RE') {
		var cntrctChange1 = invCbk['rows0'].invId + 's';
		var cntrctChange2 = invCbk['rows0'].invId + 'o';
	} else {
		var cntrctChange1 = invCbk['rows0'].sysRefNo + 's';
		var cntrctChange2 = invCbk['rows0'].sysRefNo + 'o';
	}*/
	var cntrctChange1 = invCbk['rows0'].sysRefNo + 's';
	var cntrctChange2 = invCbk['rows0'].sysRefNo + 'o';
	

	//卖方记录
	var rowdata01 = {'sysRefNo':cntrctChange1,'sysRefNo2':cntrctChange1,'clType':'S','custNo':selId,'custNm':selNm,'cntrctNo':CNTRCT_NO,
			         'refNo':REF_NO,'trxCcy':TRX_CCY,'trxAmt':TRX_AMT,
			         'expTrxAmt':EXP_TRX_AMT,'tdType':'R','trxDate':TRX_DATE};
	//买方记录
	var rowdata02 = {'sysRefNo':cntrctChange2,'sysRefNo2':cntrctChange2,'clType':'O','custNo':buyerId,'custNm':buyerNm,'cntrctNo':CNTRCT_NO,
			         'refNo':REF_NO,'trxCcy':TRX_CCY,'trxAmt':TRX_AMT,
			         'expTrxAmt':EXP_TRX_AMT,'tdType':'R','trxDate':TRX_DATE};
	
	
	var result = {};
	
	result['rows0'] = rowdata01;
	result['rows1'] = rowdata02;
	result._total_rows = 2;
	
	return result;
}

function getCntrctChangeNo(cntrctChange) {
	
	{
		var options = {};
		options.data = {
			refName : 'cntrctChange',//
			refField : cntrctChange,
			cacheType : 'non'	
		};
		SCFUtils.getRefNo(options);
	}
	
	return $('#'+cntrctChange).val();
	
}


function getCustUpdate() {
	
	var gridCust;
	
	var buyerId=$('#buyerId').combobox('getValue');
	if(!SCFUtils.isEmpty(sysRefNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000106',
					sysRefNo : buyerId
				},
				callBackFun : function(data) {
					if (data.success && !SCFUtils.isEmpty(data.rows)) {
						//$('#buyerNm').val(data.rows[0].custNm);	
						//$('#lmtBal').numberbox('setValue',data.rows[0].lmtBal);
						//alert($('#lmtBal').val());
						$('#lmtAllocate').numberbox('setValue',data.rows[0].lmtAllocate);
						//alert($('#lmtAllocate').val());
						
						//var lmtBal = $('#lmtBal').numberbox('getValue');
						var lmtBal = data.rows[0].lmtBal;
						var ttlCrnAmtValue = $('#ttlCrnAmt').numberbox('getValue');
						
						lmtBal = SCFUtils.Math(lmtBal, ttlCrnAmtValue,'add');
						
						//var lmtAllocate = $('#lmtAllocate').numberbox('getValue');
						var lmtAllocate = data.rows[0].lmtAllocate;
						
						lmtAllocate = SCFUtils.Math(lmtAllocate,ttlCrnAmtValue,'sub'); 
						
						var buyerId=$('#buyerId').combobox('getValue');
						gridCust = {'sysRefNo':buyerId,'lmtBal':lmtBal,'lmtAllocate':lmtAllocate};
						
						/*CUST_NO = data.rows[0].sysRefNo;
						CUST_NM = data.rows[0].custNm;*/
						
					}
				}
			};
			SCFUtils.ajax(opt);
	}
	
	return gridCust;
	
}

function updateCbk(invCbk) {
	var sysRefNo = $('#sysRefNo').val();
	//var trxDt = $('#trxDt').datebox('getValue'); 
	var trxDt = getDate(new Date());
	$.each(invCbk,function(i,n){
		if(i != '_total_rows'){
			{
				var options = {};
				options.data = {
					refName : 'inCbkRef',//cntrctChange
					refField : 'cbkRefNo',
					cacheType : 'non'	
				};
				SCFUtils.getRefNo(options);
			}
			var cbkRefNo = $('#cbkRefNo').val();
			var index = $("#invcCdnTable").datagrid('getAllRowIndex',n);
			$('#invcCdnTable').datagrid('updateRow', {
	        	index : index,
	        	row : {
	        		sysRefNo : cbkRefNo,
	        		trxId : sysRefNo,
	        		invId : n.sysRefNo,
	        		cbkDt : trxDt,
	        		invCrnBal:n.crnAmt,
	        		invLoanBal:n.invLoanBal
	        	}
	        });
		}
	});
	
	return invCbk;
}

function onNextBtnClickOld() {
	
	
	/*
	if (SCFUtils.FUNCTYPE === 'PM') {
		var ttlCbkAmt=$('#ttlCbkAmt').numberbox('getValue');
		var row = $('#invcCdnTable').datagrid('getSelections');
		if (row.length == 0) {
			SCFUtils.alert("请选择应收账款！");
			return;
		}else if(ttlCbkAmt<=0||SCFUtils.isEmpty(ttlCbkAmt)) {
			SCFUtils.alert("您的反转让金额没有操作！");
			return;
		}
		var lmtBal=$('#lmtBal').val();
		if(!SCFUtils.isEmpty(lmtBal)&& SCFUtils.Math(lmtBal,ttlCbkAmt,'sub')<0){
		}
	}
	var data = SCFUtils.convertArray('cdnRegForm');
	var grid = {};
	var invCbk = {} ;
	if(SCFUtils.FUNCTYPE === 'RE'){
		invCbk = SCFUtils.getGridData("invcCdnTable",false);
	}else{
		invCbk = SCFUtils.getSelectedGridData('invcCdnTable',false );
	}
	//发票表字段加入到反转让子表
	var sysRefNo = $('#sysRefNo').val();
	var cbkDt = $('#cbkDt').datebox('getValue'); 
	$.each(invCbk,function(i,n){
		if(i != '_total_rows'){
			var options = {};
			options.data = {
				refName : 'inCbkRef',
				refField : 'cbkRefNo',
				cacheType : 'non'	
			};
			SCFUtils.getRefNo(options);
			var cbkRefNo = $('#cbkRefNo').val();
			var index = $("#invcCdnTable").datagrid('getAllRowIndex',n);
			$('#invcCdnTable').datagrid('updateRow', {
	        	index : index,
	        	row : {
	        		sysRefNo : cbkRefNo,
	        		trxId : sysRefNo,
	        		invId : n.sysRefNo,
	        		cbkDt : cbkDt
	        	}
	        });
		}
	});
	
	//更新客户信息
	var lmtBal=$('#lmtBal').val();
	var ttlCbkAmt=$('#ttlCbkAmt').numberbox('getValue');
	var buyerId =  $('#buyerId').val();
	lmtBanl = SCFUtils.Math(lmtBal,ttlCbkAmt,'sub');
	var lmtAllocate = SCFUtils.Math(lmtAllocate,ttlCbkAmt,'add'); 
	var gridCust ={'sysRefNo':buyerId,'lmtBanl':lmtBanl,'lmtAllocate':lmtAllocate};
	grid.invCbk = SCFUtils.json2str(invCbk);
	grid.cust = SCFUtils.json2str(gridCust);
	$.extend(data, grid);
	return data;
	*/
}

function ajaxBox() {
	var data =  [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	} ];
	$("#busiTp").combobox('loadData', data);
	
	var optt = {
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
	SCFUtils.setTextReadonly("buyerNm", true);
	//SCFUtils.setNumberboxReadonly("ttlCbkAmt", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setComboReadonly("ccy", true);
	SCFUtils.setTextReadonly("sysRefNo", true);
	
	
	//////////////////////////
	//SCFUtils.setDateboxReadonly('trxDt', true);
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setNumberboxReadonly("ttlCrnAmt", true);
	SCFUtils.setNumberboxReadonly("rowTtlCrnBal", true);
	
	
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

function loadTable(bigData) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000110',
			trxId : bigData.obj.sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('invcCdnTable', data.rows,true,true);
				$.each(data.rows,function(i,n){
					var rowIndex = $('#invcCdnTable').datagrid('getRowIndex', n);
					$('#invcCdnTable').datagrid('updateRow', {
						index : rowIndex,
						row : {
							/*crnAmt:n.invCrnBal,
							cntrctNo:n.cntrctNo,
							batchNo:n.trxId,*/
							sysRefNo:n.sysRefNo
						}
					});
				});
			}
			$('#ttlCrnAmt').numberbox('setValue',bigData.obj.regAmt); 
		}
	};
	SCFUtils.ajax(options);
	
}

/*
function addRow() {
	var row={};
	row.cntrctNo = $('#cntrctNo').val();
	row.refNo = $('#sysRefNo').val();
	//row.collatCcy =$('#poCcy').combobox('getValue');
	row.op='add';
	var options = {
		title:'添加订单详细信息',
		height : '370',
		reqid : 'I_P_000152',
		data : {'row' : row},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);

}*/

function getPoAmt() {
	var griddata = SCFUtils.getGridData('invcCdnTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (griddata._total_rows == 0) {
		$('#poAmt').numberspinner('setValue', 0);
		$('#poNum').numberspinner('setValue', 0);
	} else {
		var poAmt = 0;
		var poNum = 0;
		$.each(datas, function(i, n) {
			poAmt = SCFUtils.Math(poAmt, n.ttlAmt, 'add');
			poNum = SCFUtils.Math(poNum, n.poNum, 'add');
		});
		$('#poAmt').numberspinner('setValue', poAmt);
		$('#poNum').numberspinner('setValue', poNum);
	}
}
//修改一条数据
function editRow() {
	var row = $('#invcCdnTable').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		var options = {
			title:'调整贷项清单金额',
			reqid : 'I_P_000152',
			data : {
				'row' : row
			},
			onSuccess : editSuccess2
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editSuccess2(data) {
	var row = $('#invcCdnTable').datagrid('getSelected');
	var rowIndex = $('#invcCdnTable').datagrid('getRowIndex', row);
	$('#invcCdnTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	getPoAmt();
}


var xgetNewInvBal;
var xgetNewInvLoanAval;
function editRow3() {
	
	$('#rowTtlCrnAmt').numberbox('setValue',0.00);
	//计算选中的反转让金额
	var row = $('#invcCdnTable').datagrid('getSelections');
	if(row.length < 1){
	  SCFUtils.alert("请选择一条数据！");	
	  return ;
	}
	
    $.each(row,function(i,n){
	   var rowIndex = $('#invcCdnTable').datagrid('getRowIndex', n);
	   //计算选中记录的可融资余额
	   rowTtlCrnBal2Value  = rowTtlCrnBal2(n);
	   $('#invcCdnTable').datagrid('updateRow', {
			index : rowIndex,
			row : {
				//恢复到原来的情况，发票余额，可融资余额，贷项清单金额
				invBal:n.invBal2,
				invLoanAval:n.invLoanAval2,
				crnAmt:n.crnAmt2
			}
		});
	});
    //重新计算贷项清单余额
    $('#rowTtlCrnBal').numberbox('setValue',rowTtlCrnBal2Value);
    //同样需要计算贷项清单的累计金额
    makeTtlCrnAmt();
}


//得到新的发票余额
function getNewInvBal(data){
	var rowTtlCrnAmt  = $('#rowTtlCrnAmt').numberbox('getValue');
	return SCFUtils.Math(data.invBal2, rowTtlCrnAmt, 'sub');
}
//得到新的可融资余额
function getNewInvLoanAval(data){
	var xx = SCFUtils.Math(data.invBal, rowTtlCrnAmtCurrent, 'sub');
	var invBal2Value_03 = SCFUtils.Math(xx, data.loanPerc, 'mul'); 
	var invBal2Value_04 = SCFUtils.Math(invBal2Value_03, 100, 'div'); 
	return invBal2Value_04;
}

function getNewInvLoanAval2(invBal,data){
	var invBal2Value_03 = SCFUtils.Math(invBal, data.loanPerc, 'mul'); 
	var invBal2Value_04 = SCFUtils.Math(invBal2Value_03, 100, 'div'); 
	var invBal2Value_05 = SCFUtils.Math(invBal2Value_04, data.invLoanBal, 'sub'); 
	return invBal2Value_05;
}

function changeinvAmt(){
	
	var rowTtlCrnAmt  = $('#rowTtlCrnAmt').numberbox('getValue');
	if(rowTtlCrnAmt == '') {rowTtlCrnAmt = 0.00;}
	
	if(rowTtlCrnAmt < 0){
		SCFUtils.alert("[贷项清单金额]应>0.");
		return;
	}
	if(SCFUtils.Math(rowTtlCrnAmt, rowTtlCrnBal2Value, 'sub') > 0){
		SCFUtils.alert("[选中记录-贷项清单金额]应<=[选中记录-贷项清单余额].");
		$('#rowTtlCrnAmt').numberbox('setValue',0);
		return;
	}
	
	var subAmt = SCFUtils.Math(rowTtlCrnBal2Value, rowTtlCrnAmt, 'sub');
	$('#rowTtlCrnBal').numberbox('setValue', subAmt);
	
	editRow2();
	
	makeTtlCrnAmt();
    
}

function makeTtlCrnAmt() {
	var ttlCrnAmtValue = 0.00;
	var rows = $('#invcCdnTable').datagrid('getRows');
	$.each(rows,function(i,n){
		if(n.crnAmt > 0.00){
			ttlCrnAmtValue = SCFUtils.Math(ttlCrnAmtValue, n.crnAmt, 'add');
		}
	});
	$('#ttlCrnAmt').numberbox('setValue',ttlCrnAmtValue);
}

var xgetNewInvBal2;
var xgetNewInvLoanAval2;
function editRow2() {
	
	var row = $('#invcCdnTable').datagrid('getSelections');
    $.each(row,function(i,n){
	   var rowIndex = $('#invcCdnTable').datagrid('getRowIndex', n);
	   xgetNewInvBal2 = getNewInvBal(n);
	   xgetNewInvLoanAval2 = getNewInvLoanAval2(xgetNewInvBal2,n);
	   
	   var rowTtlCrnAmt  = $('#rowTtlCrnAmt').numberbox('getValue');
		$('#invcCdnTable').datagrid('updateRow', {
			index : rowIndex,
			row : {
				crnAmt: rowTtlCrnAmt,
				invBal:xgetNewInvBal2,
				invLoanAval:xgetNewInvLoanAval2
			}
		});
	 });
}

var rowTtlCrnBal2Value;
function rowTtlCrnBal2(data) {
	//如果融资余额>0
	if(data.invLoanBal > 0.00) {
		var x  = SCFUtils.Math(data.invLoanBal, data.loanPerc, 'div'); 
		var xx = SCFUtils.Math(x, 100, 'mul'); 
		rowTtlCrnBal2Value = SCFUtils.Math(data.invBal2, xx, 'sub'); 
	} else {
	//如果融资余额 = 0
		rowTtlCrnBal2Value = data.invBal2;
	}
	return rowTtlCrnBal2Value;
}

/**
 * 提交时给还款子表的eventTimes字段赋值
 * 还款子表的eventTimes值为发票E表中最大sysEventTImes+1
 */

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
}

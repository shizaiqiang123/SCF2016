function showSysRefNoWindow(){
	var options = {
		title : '流水号查询',
		reqid : 'I_P_000127',
		onSuccess : cntrctNoSuccess
	};
	SCFUtils.getData(options);
}

function cntrctNoSuccess(data){
	$('#sysRefNo').val(data.sysRefNo);
	$('#cntrctNo').val(data.cntrctNo);
	//$('#busiTp').val(data.busiTp);
	$('#selId').val(data.selId);
	$('#selNm').val(data.selNm);
	//$('#buyerId').val(data.buyerId);
	$('#buyerNm').val(data.buyerNm);
	
	//var busiTp = [{"id":'0',"text":"国内有追索权保理"},{"id":'1',"text":"国内无追索权保理"}];
	$("#busiTp").combobox('setValue',data.busiTp);
	
	$('#cntrctNo').val(data.sysRefNo);
	var options = {};
	    options.data = {
			refName : 'CreditNo',
			refField : 'sysRefNo'
	    };
	    
	SCFUtils.getRefNo(options);
	queryBuyer(data);
	queryBuyerNm();
	queryInvc();
	
}

function pageOnInt(data) {	
	//alert("pageOnInt");
	//alert("pageOnInt.data," + data);
	ajaxBox();
	ajaxTable();
}

function makeReadOnly() {
	SCFUtils.setDateboxReadonly('trxDt', true)
	SCFUtils.setComboReadonly('busiTp', true);
	
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setTextReadonly('selId', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('buyerId', true);
	SCFUtils.setTextReadonly('buyerNm', true);
}

function pageOnLoad(data) {
	
	makeReadOnly();
	
	SCFUtils.loadForm('creditNoteForm',data);
	
	$('#cntrctNo').val(data.obj.cntrctNo);
	$('#trxDt').datebox('setValue',getDate(new Date()));
	
	$('#sysRefNo').val(data.obj.cntSysRefNo);
	//$('#cntrctNo').val(data.cntrctNo);
	
	alert($('#selId').val());
	
	//$('#selId').val(data.selId);
	//$('#selNm').val(data.selNm);
	//$('#buyerNm').val(data.buyerNm);
	//$("#busiTp").combobox('setValue',data.busiTp);
	//$('#cntrctNo').val(data.sysRefNo);
	
	var options = {};
	options.data = {
		refName : 'CreditNo',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	queryBuyer(data);
	queryBuyerNm();
	
}

function pageOnResultLoad(data) {
	alert("pageOnResultLoad");
	alert("pageOnResultLoad.data," + data);
	
	SCFUtils.loadForm('creditNoteForm',data);
	SCFUtils.loadGridData('invcMTable',
	SCFUtils.parseGridData(data.obj.doname), true);// 加载数据并保护表格。
	
}

function pageOnPreLoad(data) {
	alert("pageOnPreLoad");
	alert("pageOnPreLoad.data," + data);
	
	SCFUtils.loadForm('creditNoteForm',data);
	SCFUtils.loadGridData('invcMTable',
	SCFUtils.parseGridData(data.obj.doname), false);
}
function pageOnReleasePageLoad(data) {
	alert("pageOnReleasePageLoad");
	alert("pageOnReleasePageLoad.data," + data);
	
	SCFUtils.loadForm('creditNoteForm',data);
	loadTable();
}

function pageOnReleaseResultLoad(data) {
	alert("pageOnReleaseResultLoad");
	alert("pageOnReleaseResultLoad.data," + data);
	
	pageOnResultLoad(data);
}

function pageOnReleasePreLoad(data) {
	alert("pageOnReleasePreLoad");
	alert("pageOnReleasePreLoad.data," + data);
	
	pageOnResultLoad(data);
}

function onNextBtnClick() {
	
	alert("onNextBtnClick");
	alert("onNextBtnClick.data," + data);
	
	if (checkDataGrid()) {
		return;
	}
	var data = SCFUtils.convertArray('creditNoteForm');
	var grid = {};
	var griddata = $('#invcMTable').datagrid('getRows');
	$.each(griddata, function(i, n) {
		$('#invcMTable').datagrid('updateRow', {
			index : i,
			row : {
				invSts : 'CRN',
				arType : 6
			}
		});
	});
	griddata = SCFUtils.getGridData('invcMTable', false);
	grid.doname = SCFUtils.json2str(griddata);
	$.extend(data, grid);
	return data;
}

function ajaxTable() {
	
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "sysRefNo",
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		},{
			field : 'cntrctNo',
			title : '协议编号',
		}, {
			field : 'sysRefNo',
			title : '流水号'//,width : 100
		}/*,{
			field : 'arType',
			title : '类型',
			formatter:arTypeFormater,hidden : true
		}*//*,{
			field : 'busiTp',
			title : '业务类别',hidden : true
		}*/,{
			field : 'invCcy',
			title : '币别'//,width : 100
		},{
			field : 'invNo',
			title : '凭证编号'//,width : 100
		},
		{
			field : 'acctPeriod',
			title : '账期'//,width : 100
			
		},
		
		{
			field : 'invDt',
			title : '应收账款日期',//,width : 100
			formatter:dateFormater
		},
		{
			field : 'invValDt',
			title : '起算日'//,width : 100
			,formatter:dateFormater
		},
		{
			field : 'invDueDt',
			title : '到期日'//,width : 100
			,formatter:dateFormater
		},
		{
			field : 'dueDt',
			title : '逾期日'//,width : 100
			,formatter:dateFormater
		},
		
		{
			field : 'invAmt',
			title : '应收账款金额'//,
			//width : 100,
			//formatter:ccyFormater,
			/*editor : {
				type : 'numberbox',
				options:{
					precision: 2,
					required : true,
					disabled : false
				}
			}*/
			
		},
		{
			field : 'acctAmt',
			title : '预付款',
			//width : 100,
			formatter:ccyFormater
		},
		{
			field : 'invBal',
			title : '应收账款余额',
			//width : 100,
			formatter:ccyFormater
		},
		
		{
			field : 'loanPerc',
			title : '融资比例',
			//width : 100,
			formatter:ccyFormater
		},
		
		
		 {
			field : 'invLoanAval',
			title : '应收账款可融资金额'//,hidden : true
		}, {
			field : 'invLoanBal',
			title : '融资余额'//,hidden : true,width : 100,
		},
		 {
			field : 'crnAmt',
			title : '贷项清单金额'//,hidden : true,width : 100
			,formatter:ccyFormater
		} 
		,
	    {
			field : 'batchNo',
			title : '批次号'
		}, {
			field : 'linkInvRef',
			title : '原始发票流水号',hidden : true,width : 100
		}
		] ]
	};
	$('#invcMTable').datagrid(options);
	//$('#invcMTable')
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

function cntrctReQueryAjax(cntrctNo) {
	
	alert("cntrctReQueryAjax");
	alert("cntrctReQueryAjax.cntrctNo," + cntrctNo);
	
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

function cntrctReCust(sysRefNo) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000106',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#custLmtBal').numberbox('setValue',data.rows[0].lmtBal);
				$('#lmtValidDt').datebox('setValue',data.rows[0].validDt);
				$('#lmtDueDt').datebox('setValue',data.rows[0].dueDt);
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
	alert("cntrctQueryAjax");
	alert("cntrctQueryAjax.cntrctNo," + cntrctNo);
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

function showLookUpWindow(){
	alert("showLookUpWindow");
	var buyerId = $("#buyerId").val();
	var options = {
		title:'间接客户查询',
		reqid:'I_P_000021',
		data:{'buyerId':buyerId},
		onSuccess:buyerSuccess
	};
	SCFUtils.getData(options);
	
}

function buyerSuccess(data){
	alert("buyerSuccess");
	alert("buyerSuccess.data," + data);
	$('#buyerId').val(data.sysRefNo);
	$('#buyerNm').val(data.custNm);
	queryCust(data.sysRefNo);
	
	//added by zhangyilei
	queryInvc();
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
					$('#lmtBalHD').val(data.rows[0].lmtBal);
					$('#custLmtBal').numberbox('setValue',data.rows[0].lmtBal);
					$('#lmtValidDt').datebox('setValue',data.rows[0].validDt);
					$('#lmtDueDt').datebox('setValue',data.rows[0].dueDt);
				}
			}
		};
		SCFUtils.ajax(opt);
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
						$('#lmtBalHD').val(data.rows[0].lmtBal);
						queryInvc();
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}

function queryInvc(){
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
						SCFUtils.loadGridData('invcMTable', data.rows);
					}
				}
			};
			SCFUtils.ajax(opt);
	}
}

function  changePayFlg(){
	var costPayFlg=$('#costPayFlg').combobox('getValue');
	if(costPayFlg=='Y'){
		var currTransCost=$('#currTransCost').numberbox('getValue');
		$('#currTransPayCost').numberbox('setValue',currTransCost);
	}else{
		$('#currTransPayCost').numberbox('setValue','');
	}
}

function getDate(date){
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}
function loadTable() {
	alert("loadTable");
	var batchNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000007',
			batchNo : batchNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('invcMTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function checkDataGrid() {
	var flag = false;
	var data = $('#invcMTable').datagrid('getData');
	if (data.total == 0) {
		SCFUtils.alert('请添加应收账款！');
		flag = true;
	}
	return flag;
}


function getregAmt() {
	var griddata = SCFUtils.getGridData('invcMTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	var lmtBalHD=$('#lmtBalHD').val();
	if (griddata._total_rows == 0) {
		$('#lmtBal').val(lmtBalHD);
		$('#ttlCrnAmt').numberbox('setValue',0);
	} else {
		//归还买方额度
		var invAmt = 0;
		$.each(datas, function(i, n) {
			invAmt = SCFUtils.Math(invAmt, n.invAmt, 'add');
		});
		var sumAmt=SCFUtils.Math(lmtBalHD, invAmt, 'add');
		$('#lmtBal').val(sumAmt);
		$('#ttlCrnAmt').numberbox('setValue',invAmt);
	}
}

function getInvNo(){
	var invNoList =[];	
	var griddata = SCFUtils.getGridData('invcMTable',false);
	var datas=SCFUtils.parseGridData(griddata,false);
	if(datas.length>0){
		$.each(datas,function(i,m){
			invNoList.push(m.invNo);
		});
	}	
	
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000032'
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				$.each(data.rows,function(i,m){
					invNoList.push(m.invNo);
				});
			}
		}
	};
	SCFUtils.ajax(options);
	return invNoList;
}

function getLinkInvRef(){
	var linkInvRefList =[];	
	var griddata = SCFUtils.getGridData('invcMTable',false);
	var datas=SCFUtils.parseGridData(griddata,false);
	if(datas.length>0){
		$.each(datas,function(i,m){
			linkInvRefList.push(m.linkInvRef);
		});
	}	
	
	return linkInvRefList;
}

function contains(a, obj){
  for(var i = 0; i < a.length; i++) {
    if(a[i] === obj){
      return true;
    }
  }
  return false;
}

function addSuccess(data) {
	alert("addSuccess");
	alert("data," + data);
	var invNoList=getInvNo();
	if(contains(invNoList,data.invNo)){
		SCFUtils.error('应收账款编号为：'+data.invNo+'的应收账款在表格或数据库中已存在!');
		return;
	}
	var linkInvRefList=getLinkInvRef();
	if(contains(linkInvRefList,data.linkInvRef)){
		SCFUtils.error('应收账款编号为：'+data.invNo+'的应收账款在表格中已存在!请选择其他发票！');
		return;
	}
	var invLA = SCFUtils.Math(data.invAmt, $('#loanPct').val(), 'mul');
	data.invLoanAval = SCFUtils.Math(invLA, 100, 'div');
	var busiTp=$('#busiTp').combobox('getValue');
	data.busiTp=busiTp;
	$('#invcMTable').datagrid('appendRow', data);
	getregAmt();
	//在小页弹出融资余额大于0的提示
	var invLoanBalLS=data.invLoanBalLS;
	invLoanBalLS=parseInt(invLoanBalLS);
	if(invLoanBalLS>0){
//		var invNo=invLoanBalList[i].invNo;
//		SCFUtils.alert("您编号为“"+invNo+"”的发票，融资余额超出！建议您重新选择。");
		SCFUtils.alert("本次应收账款的融资余额超出,建议您重新选择应收账款进行反转让！");
//		return;
	}
	//end

}

function editSuccess(data) {
	
	alert("editSuccess");
	alert("data," + data);
	
	var invLA = SCFUtils.Math(data.invAmt, $('#loanPct').val(), 'mul');
	data.invLoanAval = SCFUtils.Math(invLA, 100, 'div');
	var row = $('#invcMTable').datagrid('getSelected');
	var rowIndex = $('#invcMTable').datagrid('getRowIndex', row);
	data.busiTp=$('#busiTp').combobox('getValue');
	$('#invcMTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	getregAmt();
	//在小页弹出融资余额大于0的提示
	var invLoanBalLS=data.invLoanBalLS;
	invLoanBalLS=parseInt(invLoanBalLS);
	if(invLoanBalLS>0){
//		var invNo=invLoanBalList[i].invNo;
//		SCFUtils.alert("您编号为“"+invNo+"”的发票，融资余额超出！建议您重新选择。");
		SCFUtils.alert("本次应收账款的融资余额超出,建议您重新选择应收账款进行反转让！");
//		return;
	}
	//end

}
// 新增一条数据
function addRow() {
	var data=SCFUtils.convertArray('creditNoteForm');
	if(data){
		var row = {};
		row.cntrctNo = $('#cntrctNo').val();
		row.batchNo = $('#sysRefNo').val();
		row.selId = $('#selId').val();
		row.buyerId = $('#buyerId').combobox('getValue');
		row.invCcy=$('#ccy').combobox('getValue');
		row.op = 'add';
		var options = {
				title : '新增贷项清单',
				height : '370',
				reqid : 'I_P_000023',
				data : {
					'row' : row
				},
				onSuccess : addSuccess
		};
		SCFUtils.getData(options);
	}

}
// 修改一条数据
function editRow() {
	var row = $('#invcMTable').datagrid('getSelections');
	row.busiTp = $('#busiTp').combobox('getValue');
	if (row.length == 1) {
		row = row[0];
		row.cntrctNo = $('#cntrctNo').val();
		row.batchNo = $('#sysRefNo').val();
		row.selId = $('#selId').val();
		row.buyerId = $('#buyerId').combobox('getValue');
		row.invCcy=$('#ccy').combobox('getValue');
		row.op = 'edit';
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title : '修改贷项清单',
			height : '370',
			reqid : 'I_P_000023',
			data : {
				'row' : row
			},
			onSuccess : editSuccess
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

// 删除一条数据
function deleteRow() {
	var rows = $('#invcMTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#invcMTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
			            $('#invcMTable').datagrid('deleteRow',index); 
			        }
				getregAmt();
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
	
}

/**
 * 导入
 */
function upload() {
	var data = SCFUtils.convertArray("invcMForm");
	if(data){
		var invNoList=getInvNo()
		var param ={
			data:$.extend({"templateId":"T0000002",'invNoList':invNoList},data),
			callBackFun:function(data){	
				$.each(data.rows, function(i, n){
					var invLA = SCFUtils.Math(n.invAmt, $('#loanPct').val(), 'mul');
					var invLoanAval = SCFUtils.Math(invLA, 100, 'div');
					$.extend(n,{
						selId:$('#selId').val(),
						buyerId:$('#buyerId').val(),
						busiTp:$('#busiTp').val(),
						invSts:'CRN',
						invLoanAval:invLoanAval
					});
				});
				SCFUtils.loadGridData('invcMTable', data.rows);
				getregAmt();
			}
		};
		SCFUtils.upload(param);
	}
}




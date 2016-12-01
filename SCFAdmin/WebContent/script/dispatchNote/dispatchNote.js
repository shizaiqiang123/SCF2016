function pageOnInt() {
	ajaxBox();
	ajaxTable();
	SCFUtils.setFormReadonly("#dispatchDiv", true);
	$('#poButton').linkbutton("enable");
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('dispatchForm', data);
	$('#inoutAmt').numberspinner('setValue',0);
	queryCollat();
	countTtlDlvAmt();
}

function pageOnLoad(data){
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("cntrctNo", true);
	SCFUtils.setTextReadonly("loanId", true);
	SCFUtils.setDateboxReadonly("trxDt", true);
	SCFUtils.setComboReadonly("busiTp", true);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setTextReadonly("patnerId", true);
	SCFUtils.setTextReadonly("patnerNm", true);
	SCFUtils.setTextReadonly("storageId", true);
	SCFUtils.setTextReadonly("storageNm", true);
	SCFUtils.setNumberspinnerReadonly("poAmt", true);
	SCFUtils.setDateboxReadonly("poDueDt", true);
	SCFUtils.setNumberspinnerReadonly("ttlLoanBal", true);
	SCFUtils.setDateboxReadonly("loanValDt", true);
	SCFUtils.setDateboxReadonly("loanDueDt", true);
	SCFUtils.setNumberspinnerReadonly("marginBal", true);
	SCFUtils.setNumberspinnerReadonly("inoutAmt", true);
	SCFUtils.setNumberspinnerReadonly("ttlDlvAmt", true);
	SCFUtils.setTextReadonly("poId", true);
	SCFUtils.loadForm('dispatchForm', data);
	$('#loanId').val(data.obj.sysRefNo);
	$('#trxDt').datebox('setValue',getDate(new Date()));
//	queryCntrct();
//	var refRequest={};
//	refRequest.data = {
//		refName: 'delNote',
//		refField:'sysRefNo'
//	};
//	SCFUtils.getRefNo(refRequest);
//	queryCollat();
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('dispatchForm', data);
	SCFUtils.loadGridData('collatTable', SCFUtils.parseGridData(data.obj.COLLAT), true);// 加载数据并保护表格。
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('dispatchForm', data);
	queryReLoan();
	queryReCntrct();
	queryRePo();
	queryReInoutDetails();
	queryReCollat();
	updateReOutAmt();
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnFPLoad(data){
	
}

function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('dispatchForm');
	var grid = {};
	var griddata ;
	if('RE'===SCFUtils.FUNCTYPE){
		griddata =SCFUtils.getGridData('collatTable');	
	}else{
		griddata=SCFUtils.getSelectedGridData('collatTable',false);	
	}
	grid.COLLAT = SCFUtils.json2str(griddata);
	$.extend(mainData, grid);
	return mainData;
}

function ajaxBox(){
	var data = [{"id":'0',"text":"国内保理","selected":true},{"id":'1',"text":"预付款融资"},{"id":'2',"text":"动产质押融资"}];
	$("#busiTp").combobox('loadData',data);
}

function getDate(date){
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
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
			onClickRow : onClickRow,
			columns : [ [ {
				field : 'ck',
				checkbox : true
			},{
				field : 'sysRefNo',
				title : '交易流水号',
//				hidden:true,
				width : 100
			},{
				field : 'sysId',
				title : '交易流水号(隐藏)',
//				hidden:true,
				width : 100
			},{
				field : 'inoutRef',
				title : 'inout流水号(隐藏)',
//				hidden:true,
				width : 100
			},{
				field : 'cntrctNo',
				title : '协议编号',
				width : 100
			},{
				field : 'collatId',
				title : '商品编号',
				width : 100
			},{
				field : 'collatNm',
				title : '商品名称',
				width : 110
			},{
				field : 'collatCcy',
				title : '币别',
				width : 100
			},{
				field : 'price',
				title : '单价',
				width : 100,
				formatter:ccyFormater
			},{
				field : 'collatUnit',
				title : '单位',
				width : 100
			},{
				field : 'ttlLoanQty',
				title : '本次申请数量',
				width : 100
			},{
				field : 'ttlLoanAmt',
				title : '本次申请金额',
				width : 100,
				formatter:ccyFormater
			}, {
				field : 'arrivalDt',
				title : '通知发货日期',
				width : 100,
				formatter: dateFormater
			}, {
				field : 'delvVal',
				title : '通知发货金额',
				width : 100,
				formatter:ccyFormater
			}, {
				field : 'delvQty',
				title : '本次通知发货数量',
				width : 100,
				editor : {
					type : 'numberbox'
				}
			}, {
				field : 'ttlOutQty',
				title : '累计已通知发货数量',
				width : 150
			},{
				field : 'ttlOutQtyHD',
				title : '累计已通知发货数量(隐藏栏位)',
				hidden : true,
				width : 100
			},{
				field : 'ttlOutAmt',
				title : '累计已通知发货金额',
				width : 150,
				formatter:ccyFormater
			},{
				field : 'ttlOutAmtHD',
				title : '累计已通知发货金额(隐藏栏位)',
				width : 100,
				hidden : true,
				formatter:ccyFormater
			}
			] ]
		};
		$('#collatTable').datagrid(options);
}

function queryCntrct(){
	var sysRefNo=$('#cntrctNo').val();
	if(!SCFUtils.isEmpty(cntrctNo)){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000029',
					sysRefNo : sysRefNo
				},
				callBackFun : function(data) {
					if(!SCFUtils.isEmpty(data.rows[0])){
						SCFUtils.loadForm('dispatchForm', data.rows[0]);
						$('#cntrctNo').val(data.rows[0].sysRefNo);
					}
				}
			};
			SCFUtils.ajax(options);
	}
}

function onSearchPoClick(){
	var poNo = $('#poNo').val();	
	poLookup(poNo);	
}

function poLookup(poNo){
	var options = {
			title:'订单查询',
			reqid:'I_P_000015',
			data:{'poNo':poNo,cacheType:'non'},
			onSuccess:setPoData,
			cacheType:'non'
	};
	SCFUtils.getData(options);
}

function setPoData(data){
	if(SCFUtils.isEmpty(data)){
		SCFUtils.error("该订单不存在！");
		return;
	}
//	if('RE'!=SCFUtils.FUNCTYPE){//复核时
//		if(data.poLoanBal==0){
//			SCFUtils.error("该订单未申请融资余额为零！");
//			return;
//		}
//	}
	$('#poNo').focus().val(data.poNo);	
	$('#poCcy').val(data.poCcy);
	$('#poAmt').numberspinner('setValue', data.poAmt);
	$('#poDueDt').datebox('setValue', data.poDueDt);
	$('#poId').val(data.sysRefNo);
//	$('#poLoanBal').numberspinner('setValue', data.poLoanBal);	
}

function queryCollat(){
	var regNo=$('#poId').val();
	if(SCFUtils.isEmpty(regNo)){
		SCFUtils.alert("找不到订单编号，请检查！");
		return false;
	}
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000083',
			regNo : regNo
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				SCFUtils.loadGridData('collatTable', data.rows,false,true);
				updateTable(data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function updateTable(data){
	$.each(data,function(i,n){
		var sysRefNo=$('#sysRefNo').val(); 
		var sysRefNoNew=sysRefNo+n.sysRefNo;
		$('#collatTable').datagrid('updateRow',{	
			index: i,
			row: {
				inoutRef    : sysRefNo,
				sysId       : n.sysRefNo,
				sysRefNo    : sysRefNoNew,
				ttlOutQtyHD : n.ttlOutQty,
				ttlOutAmtHD : n.ttlOutAmt,
				arrivalDt : getDate(new Date())
			}
		});
	});
}

var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#collatTable').datagrid('validateRow', editIndex)) {
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function onClickRow(index) {
	if (editIndex != index) {
		if (endEditing()) {
			$('#collatTable').datagrid('selectRow', index).datagrid('beginEdit', index);
			var delvQty = $('#collatTable').datagrid('getEditor', {index:index,field:'delvQty'});
			$(delvQty.target).numberbox({
				required : true,
			});
//			editIndex = index;
		} else {
			$('#collatTable').datagrid('selectRow', editIndex);
		}
	}
}
function accept() {
	$('#collatTable').datagrid('acceptChanges');
	var data =$('#collatTable').datagrid('getRows');
	var inoutAmt=0;
	var ttlDlvAmt=0;
	$.each(data,function(i,n){
		var price=n.price//单价
		var ttlLoanQty=n.ttlLoanQty//融资时申请发货数量
		var ttlOutQtyHD=n.ttlOutQtyHD;//累计已发货数量
		var delvQty=n.delvQty//本次申请发货数量
		var sumQty=SCFUtils.Math(delvQty, ttlOutQtyHD, 'add');
		if(SCFUtils.Math(ttlLoanQty, sumQty, 'sub')>=0){
			var delvVal= SCFUtils.Math(delvQty, price, 'mul')//本次通知发货金额=单价*本次发货数量
			var ttlOutAmt=SCFUtils.Math(sumQty, price, 'mul')//累计通知发货金额=单价*累计发货数量
			$('#collatTable').datagrid('updateRow', {
				index : i,
				row : {
					ttlOutQty : sumQty,
					delvVal   : delvVal,
					ttlOutQty : sumQty,
					ttlOutAmt : ttlOutAmt
				}
			});
			inoutAmt=SCFUtils.Math(inoutAmt, n.delvVal, 'add');
			ttlDlvAmt=SCFUtils.Math(ttlDlvAmt, n.ttlOutAmt, 'add');
		}else{
			SCFUtils.alert("累计发货数量不能产哦过本次申请数量！！")
			$('#collatTable').datagrid('updateRow', {
				index : i,
				row : {
					delvQty : ''
				}
			});
		}
	});
	$('#inoutAmt').numberspinner('setValue',inoutAmt);
	$('#ttlDlvAmt').numberspinner('setValue',ttlDlvAmt);
}

function reject() {
	$('#collatTable').datagrid('rejectChanges');
	editIndex = undefined;
}

function queryReLoan(){
	var sysRefNo=$('#loanId').val();
	if(!SCFUtils.isEmpty(sysRefNo)){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000084',
					sysRefNo : sysRefNo
				},
				callBackFun : function(data) {
					if(!SCFUtils.isEmpty(data.rows[0])){
						$('#ccy').val(data.rows[0].ccy);
						$('#ttlLoanBal').numberspinner('setValue',data.rows[0].ttlLoanBal);
						$('#loanValDt').datebox('setValue',data.rows[0].loanValDt);
						$('#loanDueDt').datebox('setValue',data.rows[0].loanDueDt);
						$('#marginBal').numberspinner('setValue',data.rows[0].marginBal);
						$('#ttlDlvAmt').numberspinner('setValue',data.rows[0].ttlDlvAmt);
					}
				}
			};
			SCFUtils.ajax(options);
	}
}

function queryReCntrct(){
	var sysRefNo=$('#cntrctNo').val();
	if(!SCFUtils.isEmpty(sysRefNo)){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000029',
					sysRefNo : sysRefNo
				},
				callBackFun : function(data) {
					if(!SCFUtils.isEmpty(data.rows[0])){
						$('#selId').val(data.rows[0].selId);
						$('#selNm').val(data.rows[0].selNm);
						$('#buyerId').val(data.rows[0].buyerId);
						$('#buyerNm').val(data.rows[0].buyerNm);
						$('#patnerId').val(data.rows[0].patnerId);
						$('#patnerNm').val(data.rows[0].patnerNm);
						$('#storageId').val(data.rows[0].storageId);
						$('#storageNm').val(data.rows[0].storageNm);
						$('#storageAdr').val(data.rows[0].storageAdr);
						$('#contactNm').val(data.rows[0].contactNm);
					}
				}
			};
			SCFUtils.ajax(options);
	}
}

function queryRePo(){
	var sysRefNo=$('#poId').val();
	if(!SCFUtils.isEmpty(sysRefNo)){
		var options = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000085',
					sysRefNo : sysRefNo
				},
				callBackFun : function(data) {
					if(!SCFUtils.isEmpty(data.rows[0])){
						$('#poCcy').val(data.rows[0].poCcy);
						$('#poAmt').numberspinner('setValue',data.rows[0].poAmt);
						$('#poDueDt').datebox('setValue',data.rows[0].poDueDt);
					}
				}
			};
			SCFUtils.ajax(options);
	}
}

function queryReInoutDetails(){
	var inoutRef=$('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000086',
			inoutRef : inoutRef
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				SCFUtils.loadGridData('collatTable', data.rows,true,true);
//				updateReTable(data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryReCollat(){
	var regNo=$('#poId').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000089',
			regNo : regNo
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				updateReTable(data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function updateReTable(data){
	$.each(data,function(i,n){
//		var outQty=SCFUtils.Math(n.ttlLoanQty, n.ttlOutQty, 'add');
//		var outAmt=SCFUtils.Math(n.price, outQty, 'mul');
		$('#collatTable').datagrid('updateRow', {
			index : i,
			row : {
				sysId    : n.sysRefNo,
				cntrctNo : n.cntrctNo,
				price   :  n.price,
				ttlLoanQty : n.ttlLoanQty,
				ttlLoanAmt : n.ttlLoanQty,
//				ttlOutQty  : n.ttlOutQty,
//				ttlOutQty  : outQty,
//				ttlOutAmt  : n.ttlOutAmt
//				ttlOutAmt  : outAmt
			}
		});
	});
}

function updateReOutAmt(){
	var data= $('#collatTable').datagrid('getRows');
	$.each(data,function(i,n){
		var outQty=SCFUtils.Math(n.delvQty, n.ttlOutQty, 'add');
		var outAmt=SCFUtils.Math(n.price, outQty, 'mul');
		$('#collatTable').datagrid('updateRow', {
			index : i,
			row : {
//				ttlOutQty  : n.ttlOutQty,
				ttlOutQty  : outQty,
//				ttlOutAmt  : n.ttlOutAmt
				ttlOutAmt  : outAmt
			}
		});
	});
}
 function countTtlDlvAmt(){
	 var data =$('#collatTable').datagrid('getRows');
		var ttlDlvAmt=0;
		$.each(data,function(i,n){
			ttlDlvAmt=SCFUtils.Math(ttlDlvAmt, n.ttlOutAmt, 'add');
		});
		$('#ttlDlvAmt').numberspinner('setValue',ttlDlvAmt);
 }

/**
 * ============================
 * @desc 国内保理-授信客户还款
 * @date 2015-01-29
 * @author hyy
 * ============================
 */

/**
 * 复合功能时，进入结果汇总页面
 * @param data
 */
function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('rePaymentForm', data);
	loadRefTable();
	loadForm(data.obj.loanId);
	queryRelCntrct();
	queryCust();
	//$('#invTable').datagrid('checkAll');
}
/**
 * 复合功能时，Next进入交易页面
 * @param data
 */
function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('rePaymentForm', data);
	loadRefTable();
	loadForm(data.obj.loanId);
	queryRelCntrct();
	queryCust();
	//$('#invTable').datagrid('checkAll');
}
/**
 * 复合功能时，Pre进入交易页面
 * @param data
 */
function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('rePaymentForm', data);
	loadRefTable();
	loadForm(data.obj.loanId);
	queryRelCntrct();
	queryCust();
	//$('#invTable').datagrid('checkAll');
}

/**
 * 申请功能时，进入结果页面
 * @param data
 */
function pageOnResultLoad(data) {
	SCFUtils.loadForm('rePaymentForm', data);
	loadTable(true);
	loadForm(data.obj.loanId);
	//$('#invTable').datagrid('checkAll');
	//SCFUtils.setDatagridReadonly('invTable', true);	
}

/**
 * 申请功能时，Pre进入交易页面
 * @param data
 */
function pageOnPreLoad(data) {
	SCFUtils.loadForm('rePaymentForm', data);	
	var options =$('#invTable').datagrid('options');	
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	searchPmt();	
	loadForm(data.obj.loanId);
}


/**
 * 申请功能时，Next进入交易页面
 * @param data
 */
function pageOnLoad(data){	
	SCFUtils.loadForm('rePaymentForm', data);
	$('#loanId').val(data.obj.sysRefNo);	
	$('#trxDt').datebox('setValue',SCFUtils.getcurrentdate());
	$('#pmtDt').datebox('setValue',SCFUtils.getcurrentdate());	
	getRefNo();
	queryRelCntrct();
	queryCust();
	var options =$('#invTable').datagrid('options');	
	options.onCheck = onCheck;
	options.onUncheck = onUnCheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUnCheckAll;
	
	loadTable();	
}

/**
 * 所有进入交易页面 公共的方法
 * @param data
 */
function pageOnInt() {	
	ajaxBox();
	ajaxTable();
	SCFUtils.setFormReadonly('#rePaymentDiv',true);	
}

/**
 * 生成流水号
 */
function getRefNo(){
	var refRequest={};
	refRequest.data = {
		refName: 'PmtRef',
		refField:'sysRefNo'
	};
	SCFUtils.getRefNo(refRequest);
}


function ajaxBox(){
	var data = [{"id":'0',"text":"国内保理","selected":true},{"id":'1',"text":"预付款融资"},{"id":'2',"text":"动产质押融资"}];
	$("#busiTp").combobox('loadData',data);
	var serviceReq = [{"id":'1',"text":"有追索转让","selected":true},{"id":'2',"text":"无追索转让"}];
	$("#serviceReq").combobox('loadData',serviceReq);
	ajaxCcy();
}

/**
 * 加载币别
 */
function ajaxCcy(){
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
}


function ajaxTable() {	
	//var invcLoanId = $('#loanId').val();
	var options = {
			/*url : SCFUtils.AJAXURL,
			queryParams:{
				queryId:'Q_P_000053',
				invcLoanId:invcLoanId,
				cacheType:'non'
			},*/
			toolbar : '#toolbar',
			idField :  'sysRefNo',
			rownumbers : true,			
			pagination : true,// 是否分页
			fitColumns : true,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : getColumns()
		};
		$('#invTable').datagrid(options);
}

function getColumns(){
	return [ [ {
		field : 'ck',
		checkbox : true
	},{
		field : 'sysRefNo',
		title : '交易流水号',		
		width : 150
	}, {
		field : 'invNo',
		title : '应收账款编号',
		width : 100
	},
	 {
		field : 'loanValDt',
		title : '起算日',
		width : 100,
		formatter:dateFormater
	},
	 {
		field : 'loanDueDt',
		title : '到期日',
		width : 100,
		formatter: dateFormater
	},
	 {
		field : 'invCcy',
		title : '应收账款币别',
		width : 80
	},
	{
		field : 'invAmt',
		title : '应收账款金额',
		width : 100,
		formatter:ccyFormater
	},{
		field : 'invBal',
		title : '应收账款余额',
		width : 100,
		hidden :true,
		formatter:ccyFormater
	}, {
		field : 'invLoanEbal',
		title : '融资余额',
		width : 100,
		formatter:ccyFormater
	}, {
		field : 'payPrinAmt',
		title : '本次还本金',
		width : 100,
		formatter:ccyFormater
	},{
		field : 'pmtAmt',
		title : '本次还款金额',
		width : 100,
		formatter:ccyFormater
	}, 
	{
		field : 'pmtDt',
		title : '还款日期',
		width : 100,
		formatter: function(){
			return SCFUtils.getcurrentdate();
		}
	},{
		field : 'invSts',
		title : '应收账款状态',
		width : 100		
		//hidden :true
	},
	{
		field : 'invLoanBal',
		title : '应收账款总融资余额',
		width : 120,
		formatter:ccyFormater
		//hidden :true
	},
	{
		field : 'intAmt',
		title : '利息',
		width : 100,
		formatter:ccyFormater
		//hidden :true
	}
	] ];
}
/**
 * 查询协议额度
 * @param data
 */
function queryRelCntrct(){
	var sysRefNo=$('#cntrctNo').val();
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000029',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				
				if(!SCFUtils.isEmpty(data.rows[0])){
					$('#lmtBal').val(data.rows[0].lmtBal);
				}
			}
		};
		SCFUtils.ajax(opt);
}
/**
 * 查询客户额度
 * @param data
 */
function queryCust(){
	var selId=$('#selId').val();
	var ops = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000021',
				sysRefNo : selId
			},
			callBackFun : function(data) {				
				if(!SCFUtils.isEmpty(data.rows[0])){
					$('#selLmtBal').val(data.rows[0].lmtBal);					
				}
			}
		};
		SCFUtils.ajax(ops);
}

function loadForm (loanId){
	var opts ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000054',
				loanId:loanId,
				cacheType:'non'
			},
			callBackFun:function(data){
				if(data.success){
					$('#ttlLoanBal').numberbox('setValue',data.rows[0].ttlLoanBal);
					$('#ccy').combobox('setValue',data.rows[0].ccy);
					$('#loanDueDt').datebox('setValue',data.rows[0].loanDueDt);
					$('#cntrctNo').val(data.rows[0].cntrctNo);
    			}
			}	
	};
	SCFUtils.ajax(opts);
}

function loadTable(flag){
	var invcLoanId = $('#loanId').val();
	var opts ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000053',
				invcLoanId:invcLoanId,
				cacheType:'append'
			},
			callBackFun:function(data){
				if(data.success){
					loadGridData(data,flag);						
    			}
			}	
	};
	SCFUtils.ajax(opts);
}

function loadRefTable(){
	var invPmtRef = $('#sysRefNo').val();
	var opts ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000055',
				invPmtRef:invPmtRef
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					ajaxPmt(data.rows);
					//SCFUtils.loadGridData('invTable', data.rows,true);				
    			}
			}	
	};
	SCFUtils.ajax(opts);
}

function ajaxPmt(rows){
	var loanId = $('#loanId').val();
	$.each(rows,function(i,n){
		var opts ={
				url:SCFUtils.AJAXURL,
				data: {
					queryId:'Q_P_000056',
					invRef:n.invRef,
					invcLoanId:loanId
				},
				callBackFun:function(data){
					if(data.success&&!SCFUtils.isEmpty(data.rows)){
						rows[i].loanValDt = data.rows[0].loanValDt;
						rows[i].loanDueDt = data.rows[0].loanDueDt;
						rows[i].invBal = data.rows[0].invBal;
						rows[i].invLoanEbal = data.rows[0].invLoanEbal;						
						rows[i].invSts = 'SELPMT';
						rows[i].invLoanBal = data.rows[0].invLoanBal;
						rows[i].intAmt = data.rows[0].intAmt;
						rows[i].invcLoanRef = data.rows[0].sysRefNo;
						rows[i].ck=true;
	    			}
				}	
		};
		SCFUtils.ajax(opts);
		updateInvLoanEbal(n,'sub');
		updateInvLoanBal(n,'sub');
	});
	SCFUtils.loadGridData('invTable',rows,true,true);
}


function searchPmt(){
	var invcLoanId = $('#loanId').val();
	var opts ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000053',
				invcLoanId:invcLoanId,
				cacheType:'non'
			},
			callBackFun:function(data){
				if(data.success){
					$('#invTable').datagrid('clearChecked');
					loadGridData(data,false,true);
					$('#payIntAmt').numberbox('setValue', 0);
					$('#ttlPmtAmt').numberbox('setValue', 0);	
					$('#payPrinAmt').numberbox('setValue', 0);	
					queryRelCntrct();
					queryCust();
    			}
			}	
	};
	SCFUtils.ajax(opts);
}

function loadGridData(data,flag1,flag2){
	var sysRefNo = $('#sysRefNo').val();
	$.each(data.rows,function(i,n){
		n.invcLoanRef = n.sysRefNo;
		n.sysRefNo = sysRefNo+n.invRef;
		n.invSts='SELPMT';
		n.invPmtRef = sysRefNo;
		n.invId = n.invRef;
	});
	SCFUtils.loadGridData('invTable', data.rows,flag1,flag2);
}

/**
 * grid 中，选中后：</br><b>
 * 总融资余额=原总融资余额-表格中的融资余额。
 * 发票总融资余额 = 原总融资余额-本次还本金.</b>
 * 本次还本金 = 融资余额;</br>
 * 本次还款金额 = 本次还本金+利息;</br>
 * 融资余额 = 原融资余额-本次还本金; </br>
 * @param rowIndex 行索引
 * @param rowData  行数据
 */
function onCheck(rowIndex,rowData){
	rowData.ck=true;
	rowData.payPrinAmt = rowData.invLoanEbal;
	rowData.pmtAmt = SCFUtils.Math(rowData.payPrinAmt, rowData.intAmt, 'add');
	updateInvLoanEbal(rowData,'sub');
	updateInvLoanBal(rowData,'sub');
	sumPmtAmt(rowData,'add');//汇总还款金额
	sumIntAmt(rowData,'add');//汇总利息
	sumPayPrinAmt(rowData,'add');//汇总本次还本金
	updateGridRow(rowIndex,rowData);
}

function onUnCheck(rowIndex, rowData){	
	rowData.ck=false;
	sumPmtAmt(rowData,'sub');//汇总还款金额
	sumIntAmt(rowData,'sub');//汇总利息
	sumPayPrinAmt(rowData,'sub');//汇总本次还本金
	updateInvLoanEbal(rowData,'add');
	updateInvLoanBal(rowData,'add');
	rowData.pmtAmt = rowData.payPrinAmt = 0;
	updateGridRow(rowIndex,rowData);
}

function onCheckAll(rows) {
	$.each(rows, function(i, n) {
		onUnCheck(i, n);
		updateInvLoanEbal(n, 'add');
		updateInvLoanBal(n, 'add');
		onCheck(i, n);
	});
}

function onUnCheckAll(rows) {
	$.each(rows, function(i, n) {
		onUnCheck(i, n);
	});
}

/**
 * 更新融资余额
 * @param rowData
 * @param flag  add||sub
 */
function updateInvLoanEbal(rowData,flag){
	rowData.invLoanEbal = SCFUtils.Math(rowData.invLoanEbal,
			rowData.payPrinAmt, flag); 
}

/**
 * 更新发票总融资余额
 * @param rowData
 * @param flag  add||sub
 */
function updateInvLoanBal(rowData,flag){
	rowData.invLoanBal = SCFUtils.Math(rowData.invLoanBal,
			rowData.payPrinAmt, flag); 
}


function updateGridRow(rowIndex,rowData){
	$('#invTable').datagrid('updateRow',{
		index:rowIndex,
		row:rowData
	});
}

/**
 * sum grid int_amt  汇总表格利息
 * @param rowData
 * @param flag
 */
function sumIntAmt(rowData,flag){
	var payIntAmt = $('#payIntAmt').numberbox('getValue');//利息总额
	rowData.intAmt = rowData.intAmt||0;
	payIntAmt=	SCFUtils.Math(payIntAmt, rowData.intAmt, flag);
	$('#payIntAmt').numberbox('setValue', payIntAmt);
}

/**
 * sum grid pmt_amt 汇总表格还款金额。
 * @param rowData
 * @param flag
 */
function sumPmtAmt(rowData,flag){
	var ttlPmtAmt = $('#ttlPmtAmt').numberbox('getValue');//本次还款金额
	ttlPmtAmt=	SCFUtils.Math(ttlPmtAmt, rowData.pmtAmt, flag);	
	$('#ttlPmtAmt').numberbox('setValue', ttlPmtAmt);	
}

/**
 * sum grid int_amt  汇总表格本次还本金
 * @param rowData
 * @param flag
 */
function sumPayPrinAmt(rowData,flag){
	var payPrinAmt = $('#payPrinAmt').numberbox('getValue');//利息总额
	var selLmtBal = $('#selLmtBal').val();//客户额度
	var lmtBal = $('#lmtBal').val();//协议额度
	selLmtBal = SCFUtils.Math(parseFloat(selLmtBal).toFixed(2),rowData.payPrinAmt, flag);
	lmtBal = SCFUtils.Math(parseFloat(lmtBal).toFixed(2),rowData.payPrinAmt, flag);
	payPrinAmt=	SCFUtils.Math(payPrinAmt, rowData.payPrinAmt, flag);
	$('#selLmtBal').val(selLmtBal);
	$('#lmtBal').val(lmtBal);
	$('#payPrinAmt').numberbox('setValue', payPrinAmt);
}

function onNextBtnClick() {
	var ttlPmtAmt =$('#ttlPmtAmt').numberbox('getValue');
	if(ttlPmtAmt==0){
		SCFUtils.alert('本次还本金金额为零,请勾选应收账款！');
		return;
	}
	//var selLmtBal = $('#selLmtBal').val();
	//var lmtBal = $('#lmtBal').val();	
	var ttlLoanBal= $('#ttlLoanBal').numberbox('getValue');//融资余额
	var payPrinAmt = $('#payPrinAmt').numberbox('getValue');//本次还本金
	if(SCFUtils.Math(ttlLoanBal,payPrinAmt,'sub')<0){
		SCFUtils.alert('本次应收账款还本金金额超出融资余额,请重新勾选！');
		return;
	}
	var mainData = SCFUtils.convertArray('rePaymentForm');
	//selLmtBal = SCFUtils.Math(parseFloat(selLmtBal).toFixed(2),payPrinAmt, 'add');
	//lmtBal = SCFUtils.Math(parseFloat(lmtBal).toFixed(2),payPrinAmt, 'add');
	if(mainData!=null){		
		//mainData.selLmtBal = selLmtBal;
		//mainData.lmtBal = lmtBal;
		mainData.ttlLoanBal = SCFUtils.Math(ttlLoanBal, payPrinAmt, 'sub');
	}
	var grid = {};
	var griddata ; //=SCFUtils.getSelectedGridData('invcLoanTable',false);		
	if('RE'===SCFUtils.FUNCTYPE){
		griddata =SCFUtils.getGridData('invTable');	
	}else{
		griddata=SCFUtils.getSelectedGridData('invTable',false);	
	}	
	grid.invc = SCFUtils.json2str(griddata);
	$.extend($.extend(mainData,grid));
	return mainData;
}
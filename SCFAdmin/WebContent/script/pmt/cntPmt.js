function ajaxBox(){
	var data = [{"id":'0',"text":"国内保理","selected":true},{"id":'1',"text":"预付款融资"},{"id":'2',"text":"动产质押融资"}];
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

function pageOnLoad(data) {
	SCFUtils.loadForm('pmtForm', data);
	$('#trxDt').datebox('setValue', getDate(new Date()));
	$('#pmtDt').datebox('setValue', getDate(new Date()));
	var options={};
	options.data = {
			refName: 'PmtRef',
			refField:'sysRefNo'
					};
	SCFUtils.getRefNo(options);

	var options =$('#invcMTable').datagrid('options');
	options.onLoadSuccess=function(gridData){
		forEach(gridData.rows);
	};
	defineDataGridEvent();
	loadInvc();
	$('#ttlPmtAmt').numberspinner('setValue',0);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('pmtForm',data);
	loadInvc(true);
//	SCFUtils.loadGridData('invcMTable',SCFUtils.parseGridData(data.obj.doname), true);// 加载数据并保护表格。
	$('#invcMTable').datagrid('hideColumn','ck');
	$('#querybutton').linkbutton('disable');
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('pmtForm',data);
	SCFUtils.loadGridData('invcMTable',SCFUtils.parseGridData(data.obj.doname), false);
	$('#ttlPmtAmt').numberspinner('setValue',0);
	var options =$('#invcMTable').datagrid('options');
	options.onLoadSuccess=function(gridData){
		forEach(gridData.rows);
	};
	defineDataGridEvent();
	loadTable();
	$('#ttlPmtAmt').numberspinner('setValue',0);
}

function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('pmtForm', data);
	$('#trxDt').datebox('setValue', getDate(new Date()));
	$('#pmtDt').datebox('setValue', getDate(new Date()));
	$('#querybutton').linkbutton('disable');
	reLoadTable();
	$('#invcMTable').datagrid('hideColumn','ck');
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('pmtForm',data);
	SCFUtils.loadGridData('invcMTable',SCFUtils.parseGridData(data.obj.doname), false);
}

//复核的时候由于余额是从发票M表抓的，故重新计算发票余额
function calcInvBal(rows){
	$.each(rows,function(i,n){
		$('#invcMTable').datagrid('updateRow',{
			index : i,
			row:{
				invBal : SCFUtils.Math(n.invBal, n.pmtAmt, 'sub')
			}
		});
	});
}

function pageOnInt(data) {
	SCFUtils.setFormReadonly('#pmtForm',true);
	SCFUtils.setDateboxReadonly ('pmtDt',false);
	ajaxBox();
	ajaxTable();
	
}

function checkDataGrid(){
	var flag=false;
	var data = SCFUtils.getSelectedGridData('invcMTable',false);
	if(data._total_rows==0){
		SCFUtils.alert('当前没有应收账款还款！');
		flag=true;
	}
	return flag;
}

function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('pmtForm');
	var grid = {};
	var griddata;
	if('RE'===SCFUtils.FUNCTYPE){
		griddata =SCFUtils.getGridData('invcMTable');	
	}else{
		if(checkDataGrid()){
			return;
		}
		griddata=SCFUtils.getSelectedGridData('invcMTable',false);	
		var returnAmt=0;
		$.each(griddata,function(i,n){
			if(i!='_total_rows'){
				returnAmt=SCFUtils.Math(returnAmt, n.invLoanBal, 'add');
			}
		});
		$('#returnAmt').val(returnAmt);
		if(returnAmt>0){
			alert("应收账款尚有融资余额！需进行融资返还！");
		}
	}
	grid.doname = SCFUtils.json2str(griddata);
	$.extend(mainData,grid);
	return mainData;
}

function defineDataGridEvent(){
	var options =$('#invcMTable').datagrid('options');	
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
}

function reLoadTable(){
	var invPmtRef=$('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000019',
			invPmtRef : invPmtRef
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				appendRow(data.rows);
				calcInvBal(data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function appendRow(data){
	$.each(data,function(i,n){
		n[0].invDt=n[1];
		n[0].pmtDt=n[2];
		n[0].invDueDt=n[3];
		n[0].invBal=n[4];
		n[0].invLoanBal=n[5];
		n[0].invSts=n[6];
		$('#invcMTable').datagrid('appendRow', n[0]);
	});
}

function loadTable() {
	var buyerId=$('#buyerId').val();
	var selId=$('#selId').val();
	var busiTp=$('#busiTp').combobox('getValue');
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000011',
			buyerId : buyerId,
			selId : selId,
			busiTp : busiTp,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				$('#ttlPmtAmt').numberspinner('setValue',0);
				SCFUtils.loadGridData('invcMTable',data.rows,false,true);
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadInvc(flag) {
	var buyerId=$('#buyerId').val();
	var selId=$('#selId').val();
	var busiTp=$('#busiTp').combobox('getValue');
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000011',
			buyerId : buyerId,
			selId : selId,
			busiTp : busiTp,
			cacheType : 'append'
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				loadGridData(data.rows,flag);
//				SCFUtils.loadGridData('invcMTable',data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadGridData(data,flag1,flag2){
	SCFUtils.loadGridData('invcMTable',data,flag1,flag2);
}

function forEach(data){
	var invPmtRef=$('#sysRefNo').val();
	var date=getDate(new Date());
	$.each(data,function(i,n){
		//numPmt numBal numLoanBal 是临时栏位，为了计算方便，过度
		var numPmt=SCFUtils.Math(n.invBal||0, n.pmtAmt||0, 'add');
		$('#invcMTable').datagrid('updateRow',{
			index : i,
			row:{
				invRef : n.sysRefNo,
				invPmtRef : invPmtRef,
				numPmt :numPmt,
				numBal :numPmt,
				invSts : 'PMT',
				pmtDt : date,
				sysRefNo : n.sysRefNo+invPmtRef
			}
		});
	});
}
function onCheck(rowIndex, rowData){
	var num = rowData.numPmt;
	var ttlPmtAmt=$('#ttlPmtAmt').numberspinner('getValue');
	ttlPmtAmt=SCFUtils.Math(ttlPmtAmt, num, 'add');
	$('#ttlPmtAmt').numberspinner('setValue', ttlPmtAmt);
	$('#invcMTable').datagrid('updateRow',{
		index : rowIndex,
		row:{
			pmtAmt : num,
			invBal : SCFUtils.Math(rowData.numBal, num, 'sub')
		}
	});
}

function onUncheck(rowIndex, rowData){
	var ttlPmtAmt=$('#ttlPmtAmt').numberspinner('getValue');
	ttlPmtAmt=SCFUtils.Math(ttlPmtAmt, rowData.numPmt, 'sub');
	$('#ttlPmtAmt').numberspinner('setValue', ttlPmtAmt);
	$('#invcMTable').datagrid('updateRow',{
		index : rowIndex,
		row:{
			invBal :  rowData.numBal,
			pmtAmt : 0 
		}
	});
}

function onCheckAll(rows){
		onUncheckAll(rows);
		var ttlPAT=$('#ttlPmtAmt').numberspinner('getValue');
		$.each(rows,function(i,n){
			ttlPAT=SCFUtils.Math(ttlPAT, n.numPmt, 'add');
			$('#invcMTable').datagrid('updateRow',{
				index : i,
				row:{
					pmtAmt : n.numPmt,
					invBal : SCFUtils.Math(n.numBal, n.numPmt, 'sub')
				}
			});
		});
		$('#ttlPmtAmt').numberspinner('setValue', ttlPAT);
}

function  onUncheckAll(rows){
	var ttlPAT=$('#ttlPmtAmt').numberspinner('getValue');
	var amt=0;
	$.each(rows,function(i,n){
		amt=SCFUtils.Math(amt, n.pmtAmt, 'add');
	});
	$('#ttlPmtAmt').numberspinner('setValue', SCFUtils.Math(ttlPAT,amt,'sub'));
	
	$.each(rows,function(i,n){
		$('#invcMTable').datagrid('updateRow',{
			index : i,
			row:{
				invBal :n.numBal,
				pmtAmt : 0
			}
		});
	});
}
function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹ffv 
		idField:'sysRefNo',
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			hidden:true
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			hidden:true
		}, {
			field : 'orderNo',
			title : '买卖合同编号',
			hidden:true
		},
		 {
			field : 'invNo',
			title : '应收账款编号',
			width : 60
		},
		 {
			field : 'invDt',
			title : '应收账款日期',
			hidden:true
		},
		 {
			field : 'invValDt',
			title : '应收账款起算日',
			hidden:true
		},
		 {
			field : 'invDueDt',
			title : '应收账款到期日',
			width : 60,
			formatter:dateFormater
		},
		{
			field : 'invCcy',
			title : '应收账款币别',
			width : 60
		},
		{
			field : 'invAmt',
			title : '应收账款金额',
			width : 60,
			formatter:ccyFormater
		},{
			field : 'invBal',
			title : '应收账款余额',
			width : 60,
			formatter:ccyFormater
		}
		, {
			field : 'buyerId',
			title : '间接客户编号',
			hidden:true
		}, {
			field : 'selId',
			title : '授信客户编号',
			hidden:true
		}
		, {
			field : 'pmtAmt',
			title : '本次还款金额',
			width : 60,
			formatter:ccyFormater
		},{
			field : 'numBal',
			title : '应收账款余额(临时栏位)',
			hidden:true
		}, {
			field : 'numPmt',
			title : '还款金额(临时栏位)',
			hidden:true
		}, {
			field : 'pmtDt',
			title : '还款日期',
			width : 60,
			formatter:dateFormater
		}, {
			field : 'invLoanBal',
			title : '融资余额',
			width : 60,
			formatter:ccyFormater
		},{
			field : 'intAmt',
			title : '利息',
			width : 60
		}, {
			field : 'invRef',
			title : '应收账款流水号',
			hidden:true
		}
		, {
			field : 'invSts',
			title : '应收账款状态',
			hidden:true
		}, {
			field : 'invPmtRef',
			title : '批次号',
			hidden:true
		}
		] ]
	};
	$('#invcMTable').datagrid(options);
}
//删除一条数据
function deleteRow() {
	var row = $('#invcMTable').datagrid('getSelected');
	var rowIndex = $('#invcMTable').datagrid('getRowIndex',row);
	if (row) {
		$.messager.confirm('Confirm', '确定删除该行数据吗？', function(r) {
			if (r) {
				$('#invcMTable').datagrid('deleteRow', rowIndex);
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}




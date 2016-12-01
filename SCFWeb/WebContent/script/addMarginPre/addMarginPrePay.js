function pageOnInt() {
	SCFUtils.setFormReadonly('#addMarginDiv',true);
	SCFUtils.setComboReadonly('marginTp',false);   
	SCFUtils.setComboReadonly('marginForm',false);  
	$('#marginTp').combo({    
		editable:false   
	}); 
	$('#marginForm').combo({    
		editable:false   
	});  
	ajaxBox();
	ajaxTable();
}

var releamt=0;
var compenamt=0;
function pageOnLoad(data){
	//造假begin
	data.obj.patnerId="bu223001023";
	data.obj.patnerNm="南京市监管局";
	data.obj.storageId="nj233456";
	data.obj.storageNm="南京河西1仓";
	data.obj.storageAdr="南京河西";
	data.obj.contactNm="张三";
	//end
	SCFUtils.loadForm('addMargin', data);
	queryPartner();
//	marginBal=$('#marginBal').numberbox('getValue');
//	marginBalHD=$('#marginBal').numberbox('getValue');
	$('#marginBalHD').val($('#marginBal').numberbox('getValue'));
	loadLoan(true);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('addMargin', data);
	loadLoan(false);
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('addMargin', data);
	loadLoan(false);
}

function pageOnReleasePageLoad(data) {
	//造假begin
	data.obj.patnerId="bu223001023";
	data.obj.patnerNm="南京市监管局";
	data.obj.storageId="nj233456";
	data.obj.storageNm="南京河西1仓";
	data.obj.storageAdr="南京河西";
	data.obj.contactNm="张三";
	SCFUtils.loadForm('addMargin', data);
//	queryReCntrct();
//	queryReParty();
//	loadReLoan();
	//end
}

function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('addMargin', data);
	loadReLoan();
}


function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('addMargin', data);
	loadReLoan();
}

function onNextBtnClick() {
	var mainData = SCFUtils.convertArray('addMargin');
	var grid = {};
	var griddata =SCFUtils.getGridData('loanTable',false);	
	grid.doname = SCFUtils.json2str(griddata);
	$.extend(mainData,grid);
	return mainData;
}

function ajaxBox(){
	SCFUtils.setTextReadonly('busiTp',true);
	SCFUtils.setTextReadonly('lmtCcy',true);
	SCFUtils.setNumberboxReadonly('marginCompen',true);
	SCFUtils.setNumberboxReadonly('marginRele',true);
	var busiTp = [{"id":'0',"text":"国内保理","selected":true},{"id":'1',"text":"预付款融资"},{"id":'2',"text":"动产质押融资"}];
	$("#busiTp").combobox('loadData',busiTp);
	var marginForm = [{"id":'1',"text":"补充","selected":true},{"id":'2',"text":"释放"}];
	$("#marginForm").combobox('loadData',marginForm);
	var marginTp = [{"id":'1',"text":"提货保证金","selected":true},{"id":'2',"text":"价值补偿保证金"},{"id":'3',"text":"其他保证金"}];
	$("#marginTp").combobox('loadData',marginTp);
}

function queryCntrct(){
	var sysRefNo = $('#sysRefNo').val();
	if(!SCFUtils.isEmpty(sysRefNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000029',
					sysRefNo : sysRefNo
				},
				callBackFun : function(data) {
					if(!SCFUtils.isEmpty(data.rows[0])){
						SCFUtils.loadForm('addMargin', data.rows[0]);
					}
				}
		};
		SCFUtils.ajax(opt);
	}
}

function queryReCntrct(){
	var sysRefNo = $('#sysRefNo').val();
	var sysEventTimes = $('#sysEventTimes').val();
	if(!SCFUtils.isEmpty(sysRefNo)){
		var opt = {
				url : SCFUtils.AJAXURL,
				data : {
					queryId : 'Q_P_000071',
					sysRefNo : sysRefNo,
					sysEventTimes : sysEventTimes
				},
				callBackFun : function(data) {
					if(!SCFUtils.isEmpty(data.rows[0])){
						SCFUtils.loadForm('addMargin', data.rows[0]);
					}
				}
		};
		SCFUtils.ajax(opt);
	}
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
//			onClickRow: onClickRow,
			onAfterEdit :onAfterEdit,
			columns : [ [ {
				field : 'ck',
				checkbox : true
			},{
				field : 'sysRefNo',
				title : '放款申请号',
				//hidden:true,
				width : 150
			}, {
				field : 'cntrctNo',
				title : '协议编号',
				width : 150
			}, {
				field : 'ccy',
				title : '融资币别',
				width : 150
			},
			 {
				field : 'ttlLoanBal',
				title : '融资余额',
				hidden:true,
				width : 150,
				formatter:ccyFormater
			},
			 {
				field : 'loanDueDt',
				title : '融资到期日',
				width : 150,
				formatter: dateFormater
			},
			 {
				field : 'marginAcNo',
				title : '保证金账号',
				width : 150
			},
			{
				field : 'marginCompen',
				title : '本次补充金额',
				width : 150,
//				styler:compenStyler,
				editor : {
					type : 'numberbox'
				},
//				onAfterEdit : changeMarginCompen,
				formatter:ccyFormater
			},{
				field : 'marginRele',
				title : '本次释放金额',
				width : 150,
				editor : {
					type : 'numberbox'
				},
				formatter:ccyFormater
			},{
				field : 'marginBal',
				title : '保证金余额',
				width : 150,
				formatter:ccyFormater
			},{
				field : 'marginBalHD',
				title : '保证金余额(隐藏)',
				width : 150,
//				hidden : true,
				formatter:ccyFormater
			},{
				field : 'lmtAdd',
				title : '额度归还金额',
				width : 150,
//				hidden : true,
				formatter:ccyFormater
			},{
				field : 'lmtMul',
				title : '额度扣减金额',
				width : 150,
//				hidden : true,
				formatter:ccyFormater
			}
			] ]
		};
		$('#loanTable').datagrid(options);
	
}

function queryPartner(){
	var sysRefNo=$('#patnerId').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000087',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {	
					$('#partyBal').numberbox('setValue',data.rows[0].lmtBal);
				}
			}
		};
		SCFUtils.ajax(options);
}

function queryReParty(){
	var sysRefNo=$('#patnerId').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000088',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {	
					$('#partyBal').numberbox('setValue',data.rows[0].lmtBal);
				}
			}
		};
		SCFUtils.ajax(options);
}

function loadLoan(flag){
	var sysRefNo = $('#sysRefNo').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000070',
				cntrctNo : sysRefNo,
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

function loadReLoan(){
	var sysRefNo = $('#sysRefNo').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000072',
				cntrctNo : sysRefNo,
				cacheType:'append'
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {	
					fullRelGrid(data.rows);
					countAmt(data.rows);
				}
			}
		};
		SCFUtils.ajax(options);
}

function fullGrid(data,flag){
	SCFUtils.loadGridData('loanTable',data);
	if(flag){
		$.each(data,function(i,n){
			$('#loanTable').datagrid('updateRow',{	
				index: i,
				row: {
					marginCompen : 0,
					marginRele  : 0,
					marginBalHD : n.marginBal
				}
			});
		});
	}
}

function fullRelGrid(data){
	SCFUtils.loadGridData('loanTable',data);
}
function countAmt(data){
	var marginCompen=0;
	var marginRele=0;
	$.each(data,function(i,n){
		marginCompen+=n.marginCompen;
		marginRele+=n.marginRele;
	});
	$('#marginCompen').numberbox('setValue',marginCompen);
	$('#marginRele').numberbox('setValue',marginRele);
}

function accept() {
	$('#loanTable').datagrid('acceptChanges');
//	var data =$('#loanTable').datagrid('getRows');
//	$.each(data,function(i,n){
//		debugger;
//		var marginBal=data[i].marginBal;
//		var marginCompen=data[i].marginCompen;
//		var marginRele=data[i].marginRele;
//		var submarginBal=SCFUtils.Math(marginBal, marginRele,'sub');
//		if(submarginBal>=0){
//			submarginBal=SCFUtils.Math(submarginBal, marginCompen,'add');
//			$('#loanTable').datagrid('updateRow', {
//				index : i,
//				row : {
//					marginBal : submarginBal
//				}
//			});
//		}else{
//			SCFUtils.alert("111");
//		}
//	});
}
function reject() {
	$('#loanTable').datagrid('rejectChanges');
	editIndex = undefined;
}

function changeMarginForm(){
	var marginForm=$('#marginForm').combobox('getValue');
	if(marginForm=='1'){
		editMarginCompenNoMarginRele();
	}else if(marginForm=='2'){
		editMarginReleNoMarginCompen();
	}
}

function editMarginCompenNoMarginRele(){
	var rows=$('#loanTable').datagrid('getRows');
	$.each(rows,function(i,n){
		$('#loanTable').datagrid('beginEdit',i);
		var ed = $('#loanTable').datagrid('getEditor', {index:i,field:'marginCompen'});
		$(ed.target).numberbox({
			required : true,
			disabled : false
		});
		var rele = $('#loanTable').datagrid('getEditor', {index:i,field:'marginRele'});
		$(rele.target).numberbox({
			required : false,
			disabled : true
		});
		$(rele.target).numberbox('setValue','');
	});
	var marginBalHD=$('#marginBalHD').val();
	$('#marginBal').numberbox('setValue',marginBalHD);
	compenamt=0;
}

function editMarginReleNoMarginCompen(){
	var rows=$('#loanTable').datagrid('getRows');
	$.each(rows,function(i,n){
		$('#loanTable').datagrid('beginEdit',i);
		var ed = $('#loanTable').datagrid('getEditor', {index:i,field:'marginCompen'});
		$(ed.target).numberbox({
			required : false,
			disabled : true
		});
		$(ed.target).numberbox('setValue','');
		var rele = $('#loanTable').datagrid('getEditor', {index:i,field:'marginRele'});
		$(rele.target).numberbox({
			required : true,
			disabled : false
		});
	});
	var marginBalHD=$('#marginBalHD').val();
	$('#marginBal').numberbox('setValue',marginBalHD);
	releamt=0;
}

function onAfterEdit(rowIndex, rowData, changes) {
	var lmtBal=$('#lmtBal').numberbox('getValue');
	var marginTp=$('#marginTp').combobox('getValue');
	if(SCFUtils.isEmpty(marginTp)){
		SCFUtils.alert("请先选择保证金类别！！");
		$('#loanTable').datagrid('unselectRow',rowIndex);
		$('#marginForm').combobox('setValue','');
		$('#loanTable').datagrid('updateRow', {
			index : rowIndex,
			row : {
				marginCompen : '',
				marginRele   : ''
			}
		});
	}/*else if(marginTp=='1'||marginTp=='3'){
		//额度余额=原额度余额+额度归还金额
		
	}else{
		//额度余额=原额度余额-额度扣减金额
	}*/
	else{
		if (!SCFUtils.isEmpty(changes.marginCompen)) {
			$('#marginRele').numberbox('setValue', 0);
			//datagrid中保证金余额=原保证金余额-释放+补充
			var marginBalDG=rowData.marginBalHD;
			var countMarginBal=SCFUtils.Math(marginBalDG, changes.marginCompen, 'add');
//			rowData.marginBal=countMarginBal;
			$('#loanTable').datagrid('updateRow', {
				index : rowIndex,
				row : {
					marginBal : countMarginBal
				}
			});
			//监管方额度=原监管方额度+本次补充金额
			var partyBal=$('#partyBal').numberbox('getValue');//监管方额度
			var marginBal=$('#marginBal').numberbox('getValue');
			//保证金余额=原保证金余额+本次补充金额
			marginBal = SCFUtils.Math(changes.marginCompen, marginBal, 'add');
			partyBal = SCFUtils.Math(changes.marginCompen, partyBal, 'add');
			$('#marginBal').numberbox('setValue',marginBal);
			$('#partyBal').numberbox('setValue',partyBal);
			$('#marginCompen').numberbox('setValue',changes.marginCompen);
			if(marginTp=='1'||marginTp=='3'){
				$('#loanTable').datagrid('updateRow', {
					index : rowIndex,
					row : {
						lmtAdd : changes.marginCompen,
						lmtMul : 0
					}
				});
				lmtBal=SCFUtils.Math(lmtBal, changes.marginCompen, 'add');
				$('#lmtBal').numberbox('setValue',lmtBal);
			}
		}
		if (!SCFUtils.isEmpty(changes.marginRele)) {
			$('#marginCompen').numberbox('setValue', 0);
			//datagrid中保证金余额=原保证金余额-释放+补充
			var marginBalDG=rowData.marginBalHD;
			var countMarginBal=SCFUtils.Math(marginBalDG, changes.marginRele, 'sub');
			if(countMarginBal>=0){
//				rowData.marginBal=countMarginBal;
				$('#loanTable').datagrid('updateRow', {
					index : rowIndex,
					row : {
						marginBal : countMarginBal
					}
				});
				if(marginTp=='2'){
					$('#loanTable').datagrid('updateRow', {
						index : rowIndex,
						row : {
							lmtMul    : changes.marginRele,
							lmtAdd    : 0
						}
					});
				}
			}else{
				rowData.marginBal=marginBalDG;
				changes.marginRele=0;
				$('#loanTable').datagrid('updateRow', {
					index : rowIndex,
					row : {
						marginRele : 0
					}
				});
				SCFUtils.alert("本次释放金额不能大于保证金余额，请核实！");
			}
			//保证金余额=原保证金余额-本次释放金额
			var marginBal=$('#marginBal').numberbox('getValue');
			marginBal = SCFUtils.Math(marginBal, changes.marginRele, 'sub');
			//监管方额度余额=原监管方额度余额-本次释放金额
			var partyBal=$('#partyBal').numberbox('getValue');
			partyBal = SCFUtils.Math(partyBal, changes.marginRele, 'sub');
			$('#marginRele').numberbox('setValue',changes.marginRele);
			if (partyBal >= 0) {
				$('#partyBal').numberbox('setValue',partyBal);
			}
			if (marginBal >= 0) {
				$('#marginBal').numberbox('setValue',marginBal);
			} else {
				SCFUtils.alert("本次释放金额不能大于保证金余额！");
				var rows = $('#loanTable').datagrid('getRows');
				$.each(rows, function(i, n) {
					$('#loanTable').datagrid('updateRow', {
						index : i,
						row : {
							marginCompen : 0,
							marginRele : 0
						}
					});
				});
			}
		}
	}
	
}
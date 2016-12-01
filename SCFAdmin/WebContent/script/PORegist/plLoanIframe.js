function pageOnInt(){
	ajaxBillTable();
}

function ajaxBillTable() {
	var options = {
			toolbar : '#toolbar1',
			idField :  'sysRefNo',
			rownumbers : true,
			checkOnSelect : true,
			singleSelect : false,// 只选一行
			pagination : true,// 是否分页
			fitColumns : true,// 列自适应表格宽度
			striped : true, // 当true时，单元格显示条纹
			columns : [ [ {
				field : 'kck',
				checkbox : true
			},{
				field : 'billNo',
				title : '票号',
				width : 150
			},{
				field : 'billAmt',
				title : '出票金额',
				width : 100
			},{
				field : 'billValDt',
				title : '起始日',
				width : 100,
			},{
				field  : 'billDueDt',
				title  : '到期日',
				width  : 100
			},{
				field : 'billRecp',
				title : '收票人',
				width : 110
			},{
				field : 'billRecpAcno',
				title : '售票人账号',
				width : 130,
			},{
				field : 'billBal',
				title : '票据余额',
				width : 110
			}
			,{
				field : 'sysRefNo',
				title : '交易流水号',
				width : 110
			},{
				field : 'loanId',
				title : '融资编号',
				width : 110
			},{
				field : 'cntrctNo',
				title : '授信额度编号',
				width : 110
			}]]
		};
		$('#billTable').datagrid(options);
}

function addBillRow() {
	var row={};
	row.trxId = $('#sysRefNo').val();
	row.sellerInstCd = $('#sellerInstCd').val();
	row.selId = $('#selId').val();
	row.selNm = $('#selNm').val();
	row.op='add';
	var options = {
		title:'新增关联关系信息',
		reqid : 'I_P_000134',
		height : '370',
		data : {'row' : row},
		onSuccess : addBillSuccess
	};
	SCFUtils.getData(options);
}

function addBillSuccess(data) {
	//限定关联关系只能选择一次
	var arr = getBillNo();
	if(contains(arr,data.billNo)){
		SCFUtils.alert('关联关系已存在!');
		return ;
	}
	$('#billTable').datagrid('appendRow', data);
	forEach(data);
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function forEach(data){
	var sysRefNo = $('#sysRefNo').val();
	var cntrctRefNo = $('#cntrctRefNo').val();
	var date = getDate(new Date());
	$.each(data, function(i, n) {
		$('#billTable').datagrid('updateRow', {
			index : i,
			row : {
				loanId : sysRefNo,
				cntrctNo :cntrctRefNo,
			}
		});
	});
}

function contains(arrays, obj,rowIndex){
	  for(var i = 0; i < arrays.length; i++) {
	    if(arrays[i] == obj && rowIndex !=i){
	      return true;
	    }
	  }
	  return false;
}
//获取已经选择过的BuyerId
function  getBillNo(){
	var array=[];
	var gridData=SCFUtils.getGridData('billTable',false);
	var  datas=SCFUtils.parseGridData(gridData,false);
	if(datas.length>0){
	$.each(datas,function(i,m){
		array[i]=m.billNo;
	});	
	}
	return array;
}
function editBillRow() {
	var row = $('#billTable').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title:'修改关联关系信息',
			reqid : 'I_P_000134',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : editBillSuccess
		};
		SCFUtils.getData(options);
	} else if (row.length > 1) {
		SCFUtils.alert("只能选择一条数据！");
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editBillSuccess(data) {
	var row = $('#billTable').datagrid('getSelected');
	var rowIndex = $('#billTable').datagrid('getRowIndex', row);
	//限定关联关系修改时不能修改为已经存在的关系
	var arr = getBillNo();
	if(contains(arr,data.billNo,rowIndex)){
		SCFUtils.alert('关联关系已存在!');
		return ;
	}
	$('#billTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
}

// 删除一条数据
function deleteBillRow() {
	alert("删除");
	var rows = $('#billTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#billTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
			            $('#billTable').datagrid('deleteRow',index); 
			        }
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

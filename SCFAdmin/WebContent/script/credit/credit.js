function ajaxBox() {
	var data =  [ {
		"id" : '0',
		"text" : "国内保理",
		"selected" : true
	}, {
		"id" : '1',
		"text" : "预付款融资"
	}, {
		"id" : '2',
		"text" : "动产质押融资"
	} ];
	$("#busiTp").combobox('loadData', data);

	var serviceReq = [ {
		"id" : '1',
		"text" : "有追索转让",
		"selected" : true
	}, {
		"id" : '2',
		"text" : "无追索转让"
	} ];
	$("#serviceReq").combobox('loadData', serviceReq);

	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006',
			cacheType : 'comm'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#lmtCcy').combobox('loadData', data.rows);
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
				SCFUtils.loadForm('creditForm', data.rows[0]);
				$('#ccy').val($('#lmtCcy').combobox('getValue'));
				if ('RE' === SCFUtils.FUNCTYPE) {
					$('#cttNo').val(data.rows[0].cntrctNo);
				}
			}
		}
	};
	SCFUtils.ajax(opt);

}

function pageOnInt(data) {
	SCFUtils.setFormReadonly('#creditFormDiv', true);
	ajaxBox();
	ajaxTable();
}

function pageOnLoad(data) {
	$('#cttNo').val(data.obj.cntrctNo);
	cntrctQueryAjax(data.obj.sysRefNo);
	$('#cntrctNo').val(data.obj.sysRefNo);
	var options = {};
	options.data = {
		refName : 'TrfRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('creditForm',data);
	SCFUtils.loadGridData('creditTable',
	SCFUtils.parseGridData(data.obj.doname), true);// 加载数据并保护表格。
	
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('creditForm',data);
	SCFUtils.loadGridData('creditTable',
	SCFUtils.parseGridData(data.obj.doname), false);
}
function pageOnReleasePageLoad(data) {
	cntrctQueryAjax(data.obj.cntrctNo);
	$('#sysRefNo').val(data.obj.sysRefNo);
	$('#cntrctNo').val(data.obj.cntrctNo);
	$('#regAmt').numberspinner('setValue',data.obj.regAmt);

	$('#creditTable').datagrid('options');
	$('#toolbar').html('');
	$('#creditTable').datagrid({
		toolbar : [ {
			text : '查询',
			iconCls : 'icon-search',
			handler : function() {
				editRow();
			}
		} ]
	});
	loadTable();

}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}
// //主表不提交，只提交datagrid的时候
// function onSaveBtnClick() {
// var griddata =SCFUtils.serializeGridData('creditTable');
// return griddata;
// }

// 主表和datagrid均需要提交
// function onSaveBtnClick() {
// var data = SCFUtils.convertArray('creditForm');
// var grid = {};
// var griddata =SCFUtils.getGridData('creditTable');
// grid.doname = SCFUtils.json2str(griddata);
//
// $.extend(data,grid);
// return data;
// }

function loadTable() {
	var batchNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000007',
			batchNo : batchNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('creditTable', data.rows);
			}
		}
	};
	SCFUtils.ajax(options);
}

function onNextBtnClick() {
	if (checkDataGrid()) {
		return;
	}
	var data = SCFUtils.convertArray('creditForm');
	var grid = {};
	var griddata = SCFUtils.getGridData('creditTable', false);
	grid.doname = SCFUtils.json2str(griddata);
	$.extend(data, grid);
	return data;
}

function checkDataGrid() {
	var flag = false;
	var data = $('#creditTable').datagrid('getData');
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
		// singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			width : 100
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			hidden : true
		}, {
			field : 'orderNo',
			title : '买卖合同编号',
			hidden : true
		}, {
			field : 'invNo',
			title : '应收账款编号',
			width : 100
		}, {
			field : 'invDt',
			title : '应收账款日期',
			hidden : true
		}, {
			field : 'invValDt',
			title : '应收账款起算日',
			width : 100,
			formatter : function(value, row, index) {
				return SCFUtils.dateFormat(value, "yyyy-MM-dd");
			}
		}, {
			field : 'invDueDt',
			title : '应收账款到期日',
			width : 100,
			formatter : function(value, row, index) {
				return SCFUtils.dateFormat(value, "yyyy-MM-dd");
			}
		}, {
			field : 'invCcy',
			title : '应收账款币别',
			width : 100
		}, {
			field : 'invAmt',
			title : '应收账款金额',
			width : 100,
			formatter : function(value, row, index) {
				if (SCFUtils.isEmpty(value)) {
					value = 0;
				}
				return SCFUtils.ccyFormatNoPre(value, 2);
			}
		}, {
			field : 'invBal',
			title : '应收账款余额',
			hidden : true
		}, {
			field : 'buyerId',
			title : '间接客户编号',
			hidden : true
		}, {
			field : 'selId',
			title : '授信客户编号',
			hidden : true
		}, {
			field : 'invSts',
			title : '应收账款状态',
			hidden : true
		}, {
			field : 'busiTp',
			title : '业务类别',
			hidden : true
		}, {
			field : 'batchNo',
			title : '批次号',
			hidden : true
		}, {
			field : 'invLoanAval',
			title : '应收账款可融资金额',
			hidden : true
		} ] ]
	};
	$('#creditTable').datagrid(options);
}

function getregAmt() {
	var griddata = SCFUtils.getGridData('creditTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (griddata._total_rows == 0) {
		$('#regAmt').numberspinner('setValue', 0);
	} else {
		var regAmt = 0;
		$.each(datas, function(i, n) {
			regAmt = SCFUtils.Math(regAmt, n.invAmt, 'add');
		});
		$('#regAmt').numberspinner('setValue', regAmt);
	}
}

function getInvNo(){
	var invNoList =[];	
	var griddata = SCFUtils.getGridData('creditTable',false);
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

function contains(a, obj){
  for(var i = 0; i < a.length; i++) {
    if(a[i] === obj){
      return true;
    }
  }
  return false;
}

function addSuccess(data) {
	/*var invNoList=getInvNo();
	if(contains(invNoList,data.invNo)){
		SCFUtils.error('应收账款编号为：'+data.invNo+'的应收账款在表格或数据库中已存在!');
		return;
	}*/
	var invLA = SCFUtils.Math(data.invAmt, $('#loanPct').val(), 'mul');
	data.invLoanAval = SCFUtils.Math(invLA, 100, 'div');
	$('#creditTable').datagrid('appendRow', data);
	getregAmt();

}

function editSuccess(data) {
	var invLA = SCFUtils.Math(data.invAmt, $('#loanPct').val(), 'mul');
	data.invLoanAval = SCFUtils.Math(invLA, 100, 'div');
	var row = $('#creditTable').datagrid('getSelected');
	var rowIndex = $('#creditTable').datagrid('getRowIndex', row);
	$('#creditTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	getregAmt();
}
// 新增一条数据
function addRow() {
	var row = {};
	row.invNoList=getInvNo();	
	row.cntrctNo = $('#cntrctNo').val();
	row.batchNo = $('#sysRefNo').val();
	row.buyerId = $('#buyerId').val();
	row.selId = $('#selId').val();
	row.busiTp = $('#busiTp').combobox('getValue');
	row.ccy = $('#lmtCcy').combobox('getValue');
	row.op = 'add';
	var options = {
		title : '新增应收账款',
		width : '930',
		height : '330',
		reqid : 'I_P_000013',
		data : {
			'row' : row
		},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);

}
// 修改一条数据
function editRow() {
	var row = $('#creditTable').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title : '修改应收账款',	
			width : '930',
			height : '330',
			reqid : 'I_P_000013',
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
	var rows = $('#creditTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#creditTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
			            $('#creditTable').datagrid('deleteRow',index); 
			        }
				getregAmt();
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
	
}

function ajaxBox() {
	var data = [ {
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

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function pageOnInt(data) {
	SCFUtils.setFormReadonly('#collatOutDiv', true);
	ajaxBox();
	ajaxTable();
}
function pageOnLoad(data) {
	cntrctQueryAjax(data.obj.sysRefNo);
	$('#cntrctNo').val(data.obj.sysRefNo);
	$('#trxDt').datebox('setValue', getDate(new Date()));
	loadTable();
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('collatOutForm', data);
	SCFUtils.loadGridData('collatOutTable', SCFUtils
			.parseGridData(data.obj.COLLATOUT), false);
	queryTable();
	$('#ttlOutVal').numberbox('setValue',0);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('collatOutForm', data);
	SCFUtils.loadGridData('collatOutTable', SCFUtils.parseGridData(data.obj.COLLATOUT), true);// 加载数据并保护表格。
}


function pageOnReleasePageLoad(data) {
	cntrctReQueryAjax(data.obj.cntrctNo);
	SCFUtils.loadForm('collatOutForm', data);
	reLoadTable();
	countOutVal();
//	$('#collatOutTable').datagrid('hideColumn', 'ck');
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
//	$('#collatOutTable').datagrid('hideColumn', 'ck');
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
//	$('#collatOutTable').datagrid('hideColumn', 'ck');
}

function onNextBtnClick() {
	var ttlOutVal =$('#ttlOutVal').numberbox('getValue');
	if(ttlOutVal==0){
		SCFUtils.alert('本次还本金金额为零,请勾选应收账款！');
		return;
	}
	if (check()) {
		return;
	}
	var mainData = SCFUtils.convertArray('collatOutForm');
	var grid = {};
	var griddata ;
	if('RE'===SCFUtils.FUNCTYPE){
		griddata =SCFUtils.getGridData('collatOutTable');	
	}else{
		griddata=SCFUtils.getSelectedGridData('collatOutTable',false);	
	}
	grid.COLLATOUT = SCFUtils.json2str(griddata);
	$.extend(mainData, grid);
	return mainData;
}

// 申请时协议表查询
function cntrctQueryAjax(cntrctNo) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000008',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				// $('#lmtCcy').combobox('setValue', data.rows[0].lmtCcy);
				// $('#lmtBal').numberspinner('setValue', data.rows[0].lmtBal);
				SCFUtils.loadForm('collatOutForm', data.rows[0]);
			}
		}
	};
	SCFUtils.ajax(opt);

}

//复核时协议表查询
function cntrctReQueryAjax(cntrctNo) {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000075',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				// $('#lmtCcy').combobox('setValue', data.rows[0].lmtCcy);
				// $('#lmtBal').numberspinner('setValue', data.rows[0].lmtBal);
				SCFUtils.loadForm('collatOutForm', data.rows[0]);
			}
		}
	};
	SCFUtils.ajax(opt);

}

function defineDataGridEvent() {
	var options = $('#collatOutTable').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;
}

function check() {
	var flag = false;
	var ttlRegAmt = $('#ttlRegAmt').numberspinner('getValue');
	var regLowestVal = $('#regLowestVal').numberspinner('getValue');
	if (SCFUtils.Math(ttlRegAmt, regLowestVal, 'sub') < 0) {
		SCFUtils.alert('出库后的库存价值已不能覆盖融资敞口!');
		flag = true;
	}
	var data = SCFUtils.getSelectedGridData('collatOutTable', false);
	if ('RE' != SCFUtils.FUNCTYPE) {
		if (data._total_rows == 0) {
			SCFUtils.alert('当前没有商品出库！');
			flag = true;
		}
	}
	return flag;

}

function loadTable() {
	var cntrctNo = $('#cntrctNo').val();
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000067',
			cntrctNo : cntrctNo,
			cacheType : 'append'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('collatOutTable', data.rows, false, true);
				$.each(data.rows,function(i,n){
					$('#collatOutTable').datagrid('updateRow',{	
						index: i,
						row: {
							collatQtyHD : data.rows[i].collatQty,
							inoutFlg : '置出',
							inoutRef : sysRefNo
						}
					});
				});
			} else {
				SCFUtils.alert("没有找到符合要求的质押品!！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function queryTable() {
	var cntrctNo = $('#cntrctNo').val();
	var sysRefNo = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000067',
			cntrctNo : cntrctNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('collatOutTable', data.rows, false, true);
				$.each(data.rows,function(i,n){
					$('#collatOutTable').datagrid('updateRow',{	
						index: i,
						row: {
							collatQtyHD : data.rows[i].collatQty,
							inoutFlg : '置出',
							inoutRef : sysRefNo
						}
					});
				});
			} else {
				SCFUtils.alert("没有找到符合要求的质押品!！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function reLoadTable() {
	var inoutRef = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000028',
			inoutRef : inoutRef,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('collatOutTable', data.rows, true, true);

			} else {
				SCFUtils.alert("没有找到符合要求的质押品!！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'sysRefNo',// 分页勾选
		onClickRow : onClickRow,
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
//			hidden : true
		}, {
			field : 'collatNm',
			title : '质物品种',
		}, {
			field : 'arrivalDt',
			title : '质物入库日期',
			width : 90,
			formatter : function(value, row, index) {
				return SCFUtils.dateFormat(value, "yyyy-MM-dd");
			}
		}, {
			field : 'collatRdPrice',
			title : '质物认定价格',
			width : 90,
			formatter : ccyFormater
		}, {
			field : 'collatUnit',
			title : '质物计价单位',
		}, {
			field : 'collatQty',
			title : '质物计价量',
			width : 90,
			formatter : numberFormater
		}, {
			field : 'collatQtyHD',
			title : '质物计价量(临时栏位)',
			hidden : true
		}, {
			field : 'collatOutQty',
			title : '质物出库计价量',
			width : 120,
			editor : {
				type : 'numberbox'
			}
//			formatter : numberFormater
		},{
			field : 'outQty',
			title : '质物出库数量',
			width : 90,
			editor : {
				type : 'numberbox'
			}
//			formatter : numberFormater
		},{
			field : 'collatVal',
			title : '质物当日价值',
			width : 90,
			formatter : ccyFormater 
		},{
			field : 'outVal',
			title : '换出价值',
			width : 90,
			formatter : ccyFormater
		},{
			field : 'inoutFlg',
			title : '置入置出标示',
			width : 90,
			hidden : true
		},{
			field : 'inoutRef',
			title : '质物置换编号',
			width : 90,
			hidden : true
		} ] ],
	};
	$('#collatOutTable').datagrid(options);
}

var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#collatOutTable').datagrid('validateRow', editIndex)) {
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function onClickRow(index) {
	if (editIndex != index) {
		if (endEditing()) {
			$('#collatOutTable').datagrid('selectRow', index).datagrid('beginEdit', index);
			var collatOutQty = $('#collatOutTable').datagrid('getEditor', {index:index,field:'collatOutQty'});
			$(collatOutQty.target).numberbox({
				required : true,
			});
			var outQty = $('#collatOutTable').datagrid('getEditor', {index:index,field:'outQty'});
			$(outQty.target).numberbox({
				required : true,
			});
//			editIndex = index;
		} else {
			$('#collatOutTable').datagrid('selectRow', editIndex);
		}
	}
}

function countOutVal(){
	var data =$('#collatOutTable').datagrid('getRows');
	var ttlOutVal=0;
	$.each(data,function(i,n){
		var collatOutQty=data[i].collatOutQty;//质物出库计价量	
		var collatRdPrice=data[i].collatRdPrice;//认定单价
		var outVal=SCFUtils.Math(collatOutQty, collatRdPrice, 'mul');
		$('#collatOutTable').datagrid('updateRow', {
			index : i,
			row : {
				outVal : outVal
			}
		});
		ttlOutVal=SCFUtils.Math(outVal, ttlOutVal, 'add');//累计出库总价值
	});
	$('#ttlOutVal').numberbox('setValue',ttlOutVal);
}

function accept() {
	var flag=true;
	$('#collatOutTable').datagrid('acceptChanges');
	var data =$('#collatOutTable').datagrid('getRows');
	$.each(data,function(i,n){
		var collatQty=data[i].collatQtyHD;//质物计价量
		var collatOutQty=data[i].collatOutQty;//质物出库计价量	
		var outQty=data[i].outQty;//质物出库数量
		//满足条件：  质物计价量>=之误出库数量>=质物出库计价量  
		var countCollatOutQty=SCFUtils.Math(collatQty, collatOutQty, 'sub');
		var countOutQty=SCFUtils.Math(collatQty, outQty, 'sub');
		var countSum=SCFUtils.Math(outQty, collatOutQty, 'sub');
		if(countCollatOutQty<0){
			flag=false;
			$('#collatOutTable').datagrid('updateRow', {
				index : i,
				row : {
					collatOutQty : '',
					outQty : ''
				}
			});
		}else if(countOutQty<0){
			flag=false;
			$('#collatOutTable').datagrid('updateRow', {
				index : i,
				row : {
					collatOutQty : '',
					outQty : ''
				}
			});
		}else if(countSum<0){
			flag=false;
			$('#collatOutTable').datagrid('updateRow', {
				index : i,
				row : {
					collatOutQty : '',
					outQty : ''
				}
			});
		}else{
			//质物当日价值=指定价格*质物计价量
			var collatRdPrice=data[i].collatRdPrice//认定单价
			var collatVal=SCFUtils.Math(collatRdPrice, countCollatOutQty, 'mul');
			var outVal=SCFUtils.Math(collatRdPrice, collatOutQty, 'mul');
			$('#collatOutTable').datagrid('updateRow', {
				index : i,
				row : {
					collatQty : countCollatOutQty,
					outVal : outVal,
					collatVal : collatVal
				}
			});
		}
	});
	if(!flag){
		SCFUtils.alert("请输入正确的质物出库计价量和之误出库数量!")
	}
	//汇总换出总价值
	var rows =$('#collatOutTable').datagrid('getRows');
	var ttlOutVal=0;
	$.each(rows,function(i,n){
		if(SCFUtils.isEmpty(rows[i].outVal)){
			rows[i].outVal=0;
		}
		ttlOutVal+=rows[i].outVal;
	});
	$('#ttlOutVal').numberbox('setValue',ttlOutVal);

}
function reject() {
	$('#collatOutTable').datagrid('rejectChanges');
	editIndex = undefined;
}


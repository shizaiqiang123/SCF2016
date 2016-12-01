function pageOnInt() {
	ajaxBox();
	ajaxTable();
	SCFUtils.setTextReadonly('loanId', true);
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setComboReadonly('busiTp', true);
	SCFUtils.setComboReadonly('ccy', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('buyerNm', true);
	SCFUtils.setDateboxReadonly("loanValDt", true);
	SCFUtils.setDateboxReadonly("loanDueDt", true);
	SCFUtils.setNumberboxReadonly('loanAmt', true);
	SCFUtils.setNumberboxReadonly('loanBal', true);
	SCFUtils.setNumberboxReadonly('maxDroPerc', true);
	SCFUtils.setTextReadonly('supervisorId', true);
	SCFUtils.setTextReadonly('supervisorNm', true);
	SCFUtils.setTextReadonly('warehouseId', true);
	SCFUtils.setTextReadonly('warehouseNm', true);
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

function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	// data.obj.supervisorId=data.obj.patnerId;
	// data.obj.supervisorNm=data.obj.patnerNm;
	querySupervisor(data.obj.cntrctNo);
	$('#maxDroPerc').numberspinner('setValue',data.obj.maxDroPerc);
	
	SCFUtils.loadForm('qualiForm', data);
	$('#ccy').combobox("setValue",data.obj.lmtCcy);
	/*if ("FP" === SCFUtils.FUNCTYPE) {
		loadTable(data.obj.sysRefNo);
	} else {*/
		var options = {};
		options.data = {
			refName : 'lquaRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);
	//}
		lookSysRelReason();
}

function querySupervisor(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000438',
			cntrctNo : data
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$("#supervisorId").val(data.rows[0].patnerId);
				$("#supervisorNm").val(data.rows[0].patnerNm);
			}
		}
	};
	SCFUtils.ajax(options);
}

function ajaxBox() {
	var data = [ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '2',
		"text" : "先票款后货"
	} ];
	$("#busiTp").combobox('loadData', data);
	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);
}

function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		// checkOnSelect : true,
		idField : "collateralRefNo",
		singleSelect : false,// 只选一行
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'loanId',
			title : '融资编号',
			hidden : true,
			width : 80
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			hidden : true,
			width : 80
		}, {
			field : 'goodsCata',
			title : '商品大类',
			hidden : true,
			width : 80
		}, {
			field : 'goodsCataId',
			title : '商品大类ID',
			hidden : true,
			width : 80
		}, {
			field : 'goodsCataNm',
			title : '商品大类名称',
			hidden : true,
			width : 80
		}, {
			field : 'subCata',
			title : '商品子类',
			hidden : true,
			width : 80
		}, {
			field : 'subCataId',
			title : '商品子类ID',
			hidden : true,
			width : 80
		}, {
			field : 'subCataNm',
			title : '商品子类名称',
			hidden : true,
			width : 90
		}, {
			field : 'poRef',
			title : '订单号',
			hidden : false,
			width : 90
		}, {
			field : 'collateralRefNo',
			title : '订单子表流水号',
			hidden : true,
			width : 90
		},{
			field : 'goodsNm',
			title : '商品名称',
			width : '12.5%'
		}, {
			field : 'goodsId',
			title : '商品ID',
			width : '12.5%'
		}, {
			field : 'price',
			title : '单价',
			width : '12.5%',
			formatter : ccyFormater
		}, {
			field : 'unit',
			title : '计价单位',
			width : '12.5%'
		}, {
			field : 'ccy',
			title : '币别',
			width : '12.5%'
		}, {
			field : 'poInNum',
			title : '入库数量',
			width : '12.5%'
		}, {
			field : 'poInAmt',
			title : '入库金额',
			width : '12.5%',
			formatter : ccyFormater
		}, {
			field : 'producer',
			title : '生产厂家',
			width : '12.5%'
		}, {
			field : 'poNum',
			title : '订单数量',
			width : '12.5%',
			hidden : true
		}, {
			field : 'sumPoInNum',
			title : '可入库数量',
			width : '12.5%',
			hidden : true
		}, {
			field : 'goodsCharacter',
			title : '规格型号',
			width : '12.5%',
			hidden : true
		} , {
			field : 'sysRefNo',
			title : '流水号',
			width : '12.5%',
			hidden : true
		}] ]
	};
	$('#goodsTable').datagrid(options);
}
function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('qualiForm', data);
	SCFUtils.loadGridData('goodsTable', SCFUtils
			.parseGridData(data.obj.goodsList), true);
	lookSysRelReason();
}

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('qualiForm', data);
	if ("PM" === SCFUtils.FUNCTYPE || "FP" === SCFUtils.FUNCTYPE) {
		deletedRowsCache = data.obj.deletedRowsCache;
		SCFUtils.loadGridData('goodsTable', SCFUtils
				.parseGridData(data.obj.goodsList), false);
	} else {
		SCFUtils.loadGridData('goodsTable', SCFUtils
				.parseGridData(data.obj.goodsList), true);
	}
	$('#goodsTable').datagrid('selectAll');
	lookSysRelReason();
}

function pageOnFPLoad(data) {
	pageOnReleasePageLoad(data);
	lookSysRelReason();

}

function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('qualiForm', row);
	queryCrtf(data.obj.sysRefNo);
	$('#goodsTable').datagrid('selectAll',true);
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

function onNextBtnClick() {
	var data = SCFUtils.convertArray('qualiForm');
	var goodsList = SCFUtils.getGridData('goodsTable');
	
	var ttlRegAmt = 0;
	
	if(SCFUtils.FUNCTYPE == 'FP'){
		var rowsNum = $('#goodsTable').datagrid('getSelections');
		if(rowsNum.length<=0){
			SCFUtils.alert("请至少勾选一条货物信息！");
			return;
		}
		goodsList = SCFUtils.getSelectedGridData("goodsTable", false);
		$.each(SCFUtils.parseGridData(goodsList), function(i, n){
			ttlRegAmt = SCFUtils.Math(ttlRegAmt, n.poInAmt, 'add');
		});
		//更新删除缓存的数据
		updateDelectedRowCache(goodsList);
	}else{
		$.each(SCFUtils.parseGridData(goodsList), function(i, n){
			ttlRegAmt = SCFUtils.Math(ttlRegAmt, n.poInAmt, 'add');
		});
	}
	var grid = {};
	grid.goodsList = SCFUtils.json2str(goodsList);
	grid.deletedRowsCache = SCFUtils.json2str(deletedRowsCache);
	$.extend(data, grid);
	return data;
}

function updateDelectedRowCache(selectedRows){
	
	var allRows = SCFUtils.getGridData('goodsTable');//所有表格记录
	var allRowsArray = SCFUtils.parseGridData(allRows);
	$.each(SCFUtils.parseGridData(selectedRows), function(i, n){
		$.each(allRowsArray,function(i,m){
			if(n.collateralRefNo === m.collateralRefNo){
				allRowsArray.splice(i,1);
				return false;
			}
		});
	});
	$.each(allRowsArray,function(i,n){
		if(!containsRow(n.collateralRefNo)){
			deletedRowsCache.push(n);
		}
	});
}


function checkQual(data) {
	if (data.length < 1) {
		SCFUtils.alert("请添加合格证信息!");
		return false;
	} else {
		return true;
	}
}
function addRow() {
	var loanId = $('#loanId').val();
	if (SCFUtils.isEmpty(loanId)) {
		SCFUtils.alert("请选择融资编号！");
		return;
	}

	var row = {};
	var goodsData = $("#goodsTable").datagrid('getAllData');
	row.cntrctNo = $('#cntrctNo').val();
	row.buyerId = $('#buyerId').val();
	row.loanId = $('#loanId').val();
	row.refNo = $('#sysRefNo').val();
	row.op = 'add';
	row.goodsData = goodsData;
	row.deletedRowsCache = deletedRowsCache;
	var options = {
		title : '添加商品',
		height : '600',
		reqid : 'I_P_000115',
		data : {
			'row' : row
		},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);
	$('#goodsTable').datagrid('clearChecked');
}

function addSuccess(data) {
	var invNoList=getCollatId();//得到goodsId
	if(contains(invNoList,data.goodsId)){
		SCFUtils.error('商品编号为：'+data.collateralRefNo+'的商品在表格中已存在!');
		return;
	}
	$('#goodsTable').datagrid('appendRow', data);
	$('#sysRefNo').focus();
}

function getCollatId(){
	var goodsList =[];	
	var griddata = SCFUtils.getGridData('goodsTable',false);
	var datas=SCFUtils.parseGridData(griddata,false);
	if(datas.length>0){
		$.each(datas,function(i,m){
			//goodsList.push(m.goodsId);
			goodsList.push(m.collateralRefNo)
		});
	}	
	
	return goodsList;
}

function editRow() {
	var rows = $('#goodsTable').datagrid('getSelections');
	//SCFUtils.getSelectedGridData('goodsTable', false);
	// var collateralData = $("#collateralTable").datagrid('getAllData');
	if (rows.length == 1) {
		var row = rows[0];
		row.op = 'edit';
		var options = {
			title : '修改货物信息',
			reqid : 'I_P_000115',
			height : '370',
			data : {
				'row' : row
			},
			onSuccess : editSuccess
		};
		SCFUtils.getData(options);
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function editSuccess(data){
	var row = $('#goodsTable').datagrid('getSelected');
	var rowIndex = $('#goodsTable').datagrid('getRowIndex', row);
	$('#goodsTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	$('#sysRefNo').focus();
}
//删除记录的缓存
var deletedRowsCache = [];
function deleteRow() {
	var rows = $('#goodsTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				for (var i = 0; i < copyRows.length; i++) {
					var index = $('#goodsTable').datagrid('getAllRowIndex',
							copyRows[i].collateralRefNo);
					if(!containsRow(copyRows[i].collateralRefNo)){
						deletedRowsCache.push(copyRows[i]);
					}
					$('#goodsTable').datagrid('deleteRow', index);
				}
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
//deletedRowsCache中是否包含有collatrralRefNo的数据
function containsRow(collatrralRefNo){
	for(var i=0;i<deletedRowsCache.length;i++){
		if(deletedRowsCache[i].collateralRefNo===collatrralRefNo){
			return true;
		}
	}
	return false;
}

// function editRow() {
// var row = $('#qualiTable').datagrid('getSelections');
// if (row.length == 1) {
// row = row[0];
// row.op = 'edit';
// if ('RE' === SCFUtils.FUNCTYPE) {
// row.state = 'query';
// }
// var options = {
// title : '修改合格证',
// height : '370',
// reqid : 'I_P_000115',
// data : {
// 'row' : row
// },
// onSuccess : editSuccess
// };
// SCFUtils.getData(options);
// } else if (row.length > 1) {
// SCFUtils.alert("只能选择一条数据！");
// } else {
// SCFUtils.alert("请选择一条数据！");
// }
// }

//function editSuccess(data) {
//	var row = $('#qualiTable').datagrid('getSelected');
//	var rowIndex = $('#qualiTable').datagrid('getRowIndex', row);
//	if (checkQualiNo(data) == 1 && data.oldCrtfNo != data.crtfNo) {
//		SCFUtils.error('合格证编号为：' + data.crtfNo + '的合格证在表格或数据库中已存在!');
//		return;
//	} else if (checkQualiNo(data) == 2) {
//		$.messager.confirm('Confirm', '合格证存在重复数据是否更新？', function(r) {
//			if (r) {
//				var nowData = updateRefNo(data);
//				$('#qualiTable').datagrid('updateRow', {
//					index : rowIndex,
//					row : nowData
//				});
//			} else {
//				return;
//			}
//		});
//	} else {
//		$('#qualiTable').datagrid('updateRow', {
//			index : rowIndex,
//			row : data
//		});
//	}
//}

//function deleteRow() {
//	var rows = $('#qualiTable').datagrid('getSelections');
//	var copyRows = [];
//	for (var j = 0; j < rows.length; j++) {
//		copyRows.push(rows[j]);
//	}
//	if (rows.length > 0) {
//		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
//			if (r) {
//				for (var i = 0; i < copyRows.length; i++) {
//					var index = $('#qualiTable').datagrid('getAllRowIndex',
//							copyRows[i].sysRefNo);
//					$('#qualiTable').datagrid('deleteRow', index);
//				}
//				SCFUtils.refreshAllRows("qualiTable");// 删除后刷新行记录
//			}
//		});
//	} else {
//		SCFUtils.alert("请选择一条数据！");
//	}
//}

// // 导入合格证信息
// function upload() {
// var loanId = $('#loanId').val();
// if (SCFUtils.isEmpty(loanId)) {
// SCFUtils.alert("请选择融资编号！");
// return;
// }
// var data = SCFUtils.convertArray("qualiForm");
// if (data) {
// var qualiNoList = getQualiNo();
// var param = {
// data : $.extend({
// "templateId" : "T0000012",
// 'qualiNoList' : qualiNoList
// }, data),
// callBackFun : function(data) {
// var flag = false;
// var info = "";
// var quliTable = [];
// var crtfNo = "";
// var griddata = SCFUtils.getGridData('qualiTable', false);
// var listData = SCFUtils.parseGridData(griddata, false);
// var loadData = data.rows;
// /*
// * if(checkCrtfNum(loadData)){
// * SCFUtils.alert("合格证数量不能超过融资订单下合格证数量！"); return; }
// */
// if (!SCFUtils.isEmpty(listData)) { // 检查导入数据是否在列表中存在
// for (var i = loadData.length - 1; i >= 0; i--) {
// var odlData = loadData[i];
// for (var j = 0; j < listData.length; j++) {
// if (odlData.crtfNo == listData[j].crtfNo
// && odlData.billNo == listData[j].billNo) {
// crtfNo += "【" + loadData[i].crtfNo + "】";
// loadData.splice(i, 1);
// }
// }
// }
// }
// var crtfInfo = "";
// if (!SCFUtils.isEmpty(crtfNo)) {
// crtfInfo = "合格证编号为：" + crtfNo + "存在列表中"
// }
// if (!SCFUtils.isEmpty(loadData)) {
// $.each(loadData, function(i, n) {
// if (n.info != "" && n.info != undefined) {
// info = n.info;
// flag = true;
// } else {
// quliTable.push(n);
// }
// });
// if (flag || !SCFUtils.isEmpty(crtfNo)) {// 在途记录提示
// data.message = crtfInfo + " " + info + " ";
// SCFUtils.loadGridData('qualiTable', quliTable);
// } else {
// SCFUtils.loadGridData('qualiTable', quliTable);
// }
// SCFUtils.refreshAllRows("qualiTable");// 删除后刷新行记录
// } else {
// data.message = crtfInfo + "";
// }
// }
// };
// SCFUtils.upload(param);
// }
// }

function getQualiNo() {
	var crtfList = [];
	var griddata = SCFUtils.getGridData('qualiTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (!SCFUtils.isEmpty(datas)) {
		$.each(datas, function(i, m) {
			crtfList.push(m.crtfNo);
		});
	}

	/*
	 * var options = { url : SCFUtils.AJAXURL, data : { queryId : 'Q_P_000348' },
	 * callBackFun : function(data) { if(!SCFUtils.isEmpty(data.rows)){
	 * $.each(data.rows,function(i,m){ crtfList.push(m.crtfNo); }); } } };
	 */
	// SCFUtils.ajax(options);
	return crtfList;
}

function checkQualiNo(addData) {
	var flag;
	var crtfList = [];
	var crtfRList = [];
	var griddata = SCFUtils.getGridData('qualiTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (!SCFUtils.isEmpty(datas)) {
		$.each(datas, function(i, m) {
			crtfList.push(m.crtfNo);
		});
	}

	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000348',
			crtfNo : addData.crtfNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, m) {
					if (addData.billNo != m.billNo) {
						crtfList.push(m.crtfNo);
					} else {
						crtfRList.push(m.crtfNo);
					}
				});
			}
		}
	};
	SCFUtils.ajax(options);
	if (contains(crtfList, addData.crtfNo)) {
		flag = 1;// 代表合格证不唯一,存在相同合格证
	} else if (!SCFUtils.isEmpty(crtfRList)) {
		flag = 2;// 同订单合格证是否更新
	}
	return flag;
}

// 处理加入的数据与数据库相同的数据，则把加入的数据流水号修改成数据库的数据的流水号
function updateRefNo(nowData) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000348',
			crtfNo : nowData.crtfNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, m) {
					if (nowData.billNo == m.billNo) {
						nowData.sysRefNo = m.sysRefNo;
					}
				});
			}
		}
	};
	SCFUtils.ajax(options);
	return nowData;
}

function showLookUpWindow() {
	var cntrctNo = $('#cntrctNo').val();
	var selId = $('#selId').val();
	var buyerId = $('#buyerId').val();
	var options = {
		title : '融资查询',
		reqid : 'I_P_000117',
		data : {
			'selId' : selId,
			'cntrctNo' : cntrctNo,
			'buyerId' : buyerId,
			//cacheType : 'non'
		},
		onSuccess : setLoanData
		//cacheType : 'non'
	};
	SCFUtils.getData(options);
}
// 查询仓库信息
function showPatner() {
	var options = {
		title : '查询仓库信息',
		reqid : 'I_P_000120',
		onSuccess : getPatnerSuccess
	};
	SCFUtils.getData(options);
}
function getPatnerSuccess(data) {
	$('#warehouseId').val(data.sysRefNo);
	$('#warehouseNm').val(data.patnerNm);
	if($('#warehouseId').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#warehouseId').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#warehouseId').removeClass('validatebox-invalid');
	}
	$('#sysRefNo').focus();
}
function setLoanData(data) {
	// 清除列表信息
	var loanId = $('#loanId').val();
	/*if (!SCFUtils.isEmpty(loanId) && loanId != data.sysRefNo) {
		var griddata = SCFUtils.getGridData("qualiTable", false);
		var qualData = SCFUtils.parseGridData(griddata, false);
		if (!SCFUtils.isEmpty(qualData)) {
			for (var i = 0; i < qualData.length; i++) {
				var index = $('#qualiTable').datagrid('getAllRowIndex',
						qualData[i].sysRefNo);
				$('#qualiTable').datagrid('deleteRow', index);
			}
		}
	}*/
	$('#loanId').val(data.sysRefNo);
	$('#loanValDt').datebox('setValue', data.loanValDt);
	$('#loanDueDt').datebox('setValue', data.loanDueDt);
	$('#loanAmt').numberbox('setValue', data.ttlLoanAmt);
	$('#loanBal').numberbox('setValue', data.ttlLoanBal);
	$('#buyerNm').val(data.buyerNm);
	$('#buyerId').val(data.buyerId);
	/*
	 * 查询按钮加载数据成功，去判断cntrctNo的div有无值,无值不做处理
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160728 by XuX
	 */
	if($('#loanId').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#loanId').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#loanId').removeClass('validatebox-invalid');
	}
}

// 查询重复合格证信息
function queryCrtfM(sysRefNo, sysLockFlag) {
	var crtfList = [];
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000348',
			sysRefNo : sysRefNo,
			sysLockFlag : sysLockFlag
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, m) {
					crtfList.push(m);
				});
			}
		}
	};
	SCFUtils.ajax(options);
	return crtfList;
}

function queryCrtf(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000488',
			sysRefNo : data
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows,function(i,n){
					$.extend(n,{
						collateralRefNo : n.crtfNo//订单关联货物流水号（数据库字段为crtfNo）
					});
				});
				SCFUtils.loadGridData('goodsTable', data.rows, false, true);
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadTable(sysRefNo) {
	var obj = [];
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000350',
			refNo : sysRefNo
		},
		callBackFun : function(data) { // 查询crtf_R重复数据
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					obj.push(n);
				});
			}
		}
	};
	var options1 = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000386',
			refNo : sysRefNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) { // 查询crtf_e
				$.each(data.rows, function(i, n) {
					obj.push(n);
				});
			}
		}
	};
	SCFUtils.ajax(options);
	SCFUtils.ajax(options1);
	SCFUtils.loadGridData('qualiTable', obj, false, true);
}

// 判断a数组是否包含obj元素
function contains(a, obj) {
	if (!SCFUtils.isEmpty(a)) {
		for (var i = 0; i < a.length; i++) {
			if (a[i] === obj) {
				return true;
			}
		}
	}
	return false;
}

// 验证合格数量
function checkCrtfNum(addData) {
	var loanId = $('#loanId').val();
	var loanCrtfNum = 0;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000411',
			loanId : loanId
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, m) {
					loanCrtfNum = SCFUtils.Math(loanCrtfNum, m.poNum, 'add');
				});
			}
		}
	};
	SCFUtils.ajax(options);

	var crtfNum = 0;
	var griddata = SCFUtils.getGridData('qualiTable', false);// 表单已存在合格证数量
	var datas = SCFUtils.parseGridData(griddata, false);
	if (!SCFUtils.isEmpty(datas)) {
		crtfNum = datas.length;
	}
	var count = 0;
	var options1 = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000412',
			loanId : loanId
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, obj) {
					if (addData.crtfNo == obj.crtfNo
							&& addData.billNo == obj.billNo) {
						count++;
					}
					if (!SCFUtils.isEmpty(datas)) {
						$.each(datas, function(k, obj1) {
							if (obj1.crtfNo == obj.crtfNo
									&& obj1.billNo == obj.billNo) {
								crtfNum--;
							}
						});
					}
				});
			}
			crtfNum = SCFUtils.Math(crtfNum, data.rows.length, 'add'); // 加上总数
			crtfNum = SCFUtils.Math(crtfNum, count, 'sub'); // 减去重复数据
		}
	};
	SCFUtils.ajax(options1);
	if (SCFUtils.Math(loanCrtfNum, crtfNum, 'sub') > 0) {
		return false;
	} else {
		return true;
	}

}

// 添加记录合格证在途验证
function checkTransit(nowData) {
	var flag = false;
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000348',
			crtfNo : nowData.crtfNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				if (data.rows[0].sysTrxSts != 'M') {
					flag = true;
				}
			}
		}
	};
	SCFUtils.ajax(options);
	return flag;
}

function clearReapt(data) {
	var flag = false;
	for (var i = 0; i < data.length; i++) {
		var index = $('#qualiTable').datagrid('getAllRowIndex',
				data[i].sysRefNo);
		$('#qualiTable').datagrid('deleteRow', index);
	}
	SCFUtils.refreshAllRows("qualiTable");// 删除后刷新行记录

	var griddata = SCFUtils.getGridData('qualiTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (SCFUtils.isEmpty(datas)) {
		flag = true;
	}
	return flag;
}

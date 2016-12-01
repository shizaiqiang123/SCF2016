function pageOnInt(data) {
	ajaxBox();
	ajaxTable();
	SCFUtils.setComboReadonly('busiTp', true);
	SCFUtils.setComboReadonly('ccy', true);
	SCFUtils.setNumberspinnerReadonly('fundRt', true);
	SCFUtils.setNumberspinnerReadonly('lmtBal', true);
	SCFUtils.setNumberspinnerReadonly('ttlRegAmt', true);
	SCFUtils.setNumberspinnerReadonly('ttlLowPayNum', true);
	SCFUtils.setNumberspinnerReadonly('marginApplied', true);
	SCFUtils.setNumberspinnerReadonly('initBailBal', true);
	SCFUtils.setNumberspinnerReadonly('openLoanAmt', true);
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('selId', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('cntrctNo', true);
}

function ajaxBox() {
	var data =[ {
		"id" : '0',
		"text" : "国内有追索权保理"
	}, {
		"id" : '1',
		"text" : "国内无追索权保理"
	}, {
		"id" : '2',
		"text" : "先票款后货"
	}, {
		"id" : '3',
		"text" : "信用保险项下"
	}, {
		"id" : '4',
		"text" : "现货动态"
	}, {
		"id" : '5',
		"text" : "现货静态"
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
				$('#ccy').combobox('loadData', data.rows);
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


function pageOnLoad(data) {
	SCFUtils.loadForm('POForm', data);
	$('#fundRt').numberspinner('setValue',data.obj.pldPerc);
	getMarginBal();
	$('#ttlLowPayNum').numberspinner('setValue',data.obj.regLowestVal);
	if (SCFUtils.isEmpty($('#ttlRegAmt').numberspinner('getValue'))) {
		$('#ttlRegAmt').numberspinner('setValue', 0);
	}
	if(SCFUtils.OPTSTATUS == 'ADD'){
		var options = {};
			options.data = {
			refName : 'PriceAdj',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);
	}
	coutMargin();
	loadTable();
	loadCrtfRegM();
	$('#CollateralTable').datagrid('checkAll');
}
function pageOnResultLoad(data) {
	SCFUtils.loadForm('POForm', data);
	$('#fundRt').numberspinner('setValue',data.obj.pldPerc);
	SCFUtils.loadGridData('CollateralTable', SCFUtils.parseGridData(data.obj.priceGoods), true);// 加载数据并保护表格。
	$("#marginApplied").numberbox('setValue',data.obj.marginApplied);
}
var flagPre;
function pageOnPreLoad(data) {
	flagPre = true;
	SCFUtils.loadForm('POForm', data);
	$('#fundRt').numberspinner('setValue',data.obj.pldPerc);
	SCFUtils.loadGridData('CollateralTable', SCFUtils.parseGridData(data.obj.priceGoods), false);
	$('#CollateralTable').datagrid('checkAll');
	flagPre = false;
	$("#marginApplied").numberbox('setValue',data.obj.marginApplied);
}
function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('POForm', data);
	// 库存价值
	if (SCFUtils.isEmpty($('#ttlRegAmt').numberspinner('getValue'))) {
		$('#ttlRegAmt').numberspinner('setValue',0);
	}
	reLoadTable();
	loadCrtfRegM();
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}

function onNextBtnClick() {
	if(!isAccept&&SCFUtils.FUNCTYPE != 'RE'){
		SCFUtils.alert('请接受改变！！！！！');
		return;
	}
	if(SCFUtils.FUNCTYPE !='RE'){
		if(checkDataGrid()){
			return;
		}
	}
	var mainData = SCFUtils.convertArray('POForm');
	var grid = {};
	var griddata;
	if('RE' == SCFUtils.FUNCTYPE || 'DP' == SCFUtils.FUNCTYPE){
		griddata = SCFUtils.getGridData('CollateralTable');	
		
		$.each(griddata, function(i, n) {
			$.extend(n, {
				sysTrxSts : 'M'
			});
		});
	}else{
		/*var rows = $('#CollateralTable').datagrid('getSelections');
		if (rows.length == 0) {
			SCFUtils.alert("请选择需要调整价格的商品信息！");
			return;
		}*/ 
		griddata = SCFUtils.getGridData('CollateralTable',false,false);
	}
	grid.priceGoods = SCFUtils.json2str(griddata);
	$.extend(mainData,grid);
	return mainData;
}

function loadCrtfRegM() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000496',
			cntrctNo : cntrctNo,
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$('#ccy').combobox('setValue',data.rows[0].ccy);
			} else {
				SCFUtils.alert("无质押品！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function loadTable() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000620',
			cntrctNo : cntrctNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
//				$('#ccy').combobox('setValue',data.rows[0].collatCcy);
				$.each(data.rows, function(i, n) {
					var priceAdjId = $('#sysRefNo').val();
					$.extend(n, {
						CGoodsNm: n.collatNm,
						goodsId:n.collatId,
						collatSpec:n.collatSpec,
						producer:n.collatFact,
						unit:n.collatUnit,
						ccy:n.collatCcy,
						price:n.collatRdPrice,
						updateDt:SCFUtils.dateFormat(getDate(new Date()), 'yyyy-MM-dd'),
//						poInNumY:SCFUtils.Math(n.collatQty, n.ttlOutQty, 'sub'),
						poInNumY:n.collatOutQty,//edit 20160829 由于ttl_out_qty（出库数量）没有存值，直接取值COLLAT_OUT_QTY
//						poInAmt:n.collatVal,
						poInAmt:SCFUtils.Math(n.collatRdPrice, n.collatOutQty, 'mul'),//edit 20160829 由于质物已出库，那么质物价值相应减少
						refNo:n.sysRefNo,
						crtfNo:n.regNo,
						priceGoodsId:priceAdjId+n.sysRefNo
					});
				});
				SCFUtils.loadGridData('CollateralTable', data.rows, false, true);
				var totalPoInAmt = 0.00;
				$.each(data.rows,function(i,v){
					totalPoInAmt = SCFUtils.Math(v.poInAmt, totalPoInAmt, 'add');
				});
				var fundRt = $('#fundRt').numberspinner('getValue')/100;
				var marginApplied = SCFUtils.Math(SCFUtils.Math($('#ttlLowPayNum').numberbox('getValue'), totalPoInAmt, 'sub'),
						fundRt, 'mul');
				$('#marginApplied').numberbox('setValue',marginApplied);
			} else {
				SCFUtils.alert("无质押品！");
			}
		}
	};
	SCFUtils.ajax(options);
}



/*function loadTable() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000073',
			cntrctNo : cntrctNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
//				$('#ccy').combobox('setValue',data.rows[0].collatCcy);
				$.each(data.rows, function(i, n) {
					var priceAdjId = $('#sysRefNo').val();
					$.extend(n, {
						CGoodsNm: n.collatNm,
						goodsId:n.collatId,
						collatSpec:n.collatSpec,
						producer:n.collatFact,
						unit:n.collatUnit,
						ccy:n.collatCcy,
						price:n.collatRdPrice,
//						poInNumY:SCFUtils.Math(n.collatQty, n.ttlOutQty, 'sub'),
						poInNumY:n.collatOutQty,//edit 20160829 由于ttl_out_qty（出库数量）没有存值，直接取值COLLAT_OUT_QTY
//						poInAmt:n.collatVal,
						poInAmt:SCFUtils.Math(n.collatRdPrice, n.collatOutQty, 'mul'),//edit 20160829 由于质物已出库，那么质物价值相应减少
						refNo:n.sysRefNo,
						crtfNo:n.regNo,
						priceGoodsId:priceAdjId+n.sysRefNo
					});
				});
				SCFUtils.loadGridData('CollateralTable', data.rows, false, true);
				var totalPoInAmt = 0.00;
				$.each(data.rows,function(i,v){
					totalPoInAmt = SCFUtils.Math(v.poInAmt, totalPoInAmt, 'add');
				});
				var fundRt = $('#fundRt').numberspinner('getValue')/100;
				var marginApplied = SCFUtils.Math(SCFUtils.Math($('#ttlLowPayNum').numberbox('getValue'), totalPoInAmt, 'sub'),
						fundRt, 'mul');
				$('#marginApplied').numberbox('setValue',marginApplied);
			} else {
				SCFUtils.alert("无质押品！");
			}
		}
	};
	SCFUtils.ajax(options);
}*/

function reLoadTable() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000074',
			cntrctNo : cntrctNo,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					$.extend(n, {
						sysRefNo : n.refNo,
						priceGoodsId:n.sysRefNo
					});
				});
				SCFUtils.loadGridData('CollateralTable', data.rows, true, true);
			} else {
				SCFUtils.alert("无质押品！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function checkDataGrid() {
	var flag = false;
	var data = $('#CollateralTable').datagrid('getData');
	if (data.total == 0) {
		SCFUtils.alert('无质押品！');
		flag = true;
	}
	return flag;
}
function ajaxTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbar',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'sysRefNo',// 分页勾选,
		onCheck:function(rowIndex,rowData){
			onCheck(rowIndex,rowData);
		},
		onUncheck:function(rowIndex,rowData){
			onUnCheck(rowIndex,rowData);
		},
		onCheckAll:function(rows){
			onCheckAll(rows);
		},
		onUncheckAll:function(rows){
			onUnCheckAll(rows);
		},
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			hidden : true
		}, {
			field : 'CGoodsNm',
			title : '商品名称',
			width : '9.09%'
		}, {
			field : 'goodsId',
			title : '商品ID',
			width : '9.09%'
		}, {
			field : 'collatSpec',
			title : '规格型号',
			width : '9.09%'
		}, {
			field : 'producer',
			title : '生产厂家',
			width : '9.09%'
		}, {
			field : 'unit',
			title : '计价单位',
			width : '9.09%'
		}, {
			field : 'ccy',
			title : '计价币别',
			width : '9.09%'
		}, {
			field : 'price',
			title : '质物认定价格',
			width : '9.09%',
			formatter:ccyFormater
		}, {
			field : 'priceNew',
			title : '最新认定价格',
			width : '9.09%',
			editor : {
				type : 'numberbox'
			},
			formatter:ccyFormater
		}, {
			field : 'updateDt',
			title : '质物最新调价日期',
			width : '9.09%',
			formatter : function(value) {
				value=getDate(new Date());
				return SCFUtils.dateFormat(value, 'yyyy-MM-dd');
			}
		}, {
			field : 'poInNumY',
			title : '质物库存数量',
			width : '9.09%'
		},{
			field : 'poInAmt',
			title : '质物当日价值',
			width : '9.09%',
			formatter:ccyFormater
		}, {
			field : 'cntrctNo',
			title : '协议编号',
			hidden : true
		}, {
			field : 'refNo',
			title : '质物入库子表流水号',
			hidden : true
		}, {
			field : 'crtfNo',
			title : '质物入库主表流水号',
			hidden : true
		},{
			field : 'priceGoodsId',
			title : '价格调整子表流水号',
			width : 100,
			hidden:true
		}] ]
	};
	$('#CollateralTable').datagrid(options);
	$('#CollateralTable').datagrid({ 
		rowStyler : function (index,row) {
			return 'background-color:#ffe48d';
		}
	});
}

/**
 * 计算协议下的保证金余额
 */
function getMarginBal(){
	var cntrctNo = $('#cntrctNo').val();
	// 汇总 协议下的保证金余额
	var marginBal = 0.00;
	var option = {
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000070',
				cntrctNo:cntrctNo,
				cacheType:'non'
			},
			callBackFun:function(data){
				if(data.success){
					$.each(data.rows,function(i, n) {
						marginBal = SCFUtils.Math(marginBal,n.marginBal,'add');
					});
					$('#initBailBal').numberspinner('setValue',marginBal);
    			}
			}
	}
	SCFUtils.ajax(option);
}

function getregAmt() {
	var griddata = SCFUtils.getGridData('CollateralTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (griddata._total_rows == 0) {
		$('#ttlRegAmt').numberspinner('setValue', 0);
	} else {
		var ttlRegAmt = 0;
		$.each(datas, function(i, n) {
			ttlRegAmt = SCFUtils.Math(ttlRegAmt, n.collatVal, 'add');
		});
		$('#ttlRegAmt').numberspinner('setValue', ttlRegAmt);
	}
}
var isAccept = false;
/**
 * 接受改变
 */
function accept() {
	isAccept = true;
	var totalTtlRegAmt = 0.00;
	var data = $('#CollateralTable').datagrid('getRows');
	endEditing();// 结束编辑
	//var indexArry = [];//选中的下标
	$.each(data, function(i, n) {
		var priceNew = n.priceNew;// 获得单价
		// 如果符合条件
		var rowIndex = $('#CollateralTable').datagrid('getRowIndex', n);// 获得选中的行数
		//indexArry.push(rowIndex);
		$('#CollateralTable').datagrid('updateRow', {
			index : rowIndex,
			row : {
				poInAmt : SCFUtils.Math(priceNew, n.poInNumY, 'mul'),// 更改选中行的质物当日价值
			}
		});
		//totalTtlRegAmt = SCFUtils.Math(totalTtlRegAmt, SCFUtils.Math(priceNew, n.poInNumY, 'mul'), 'add');
	});
	
	var griddata = $('#CollateralTable').datagrid('getRows');	
	for(var i = 0;i<griddata.length;i++){
		var n = griddata[i];
		var flag = false;
		totalTtlRegAmt = SCFUtils.Math(totalTtlRegAmt, n.poInAmt, 'add');
	}
	$("#ttlRegAmt").numberspinner("setValue",totalTtlRegAmt);
}

var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#CollateralTable').datagrid('validateRow', editIndex)) {
		$('#CollateralTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}


function coutMargin(){
	//需补充保证金金额=（最低价值-当日库存价值）*质押率与零取大
	var ttlLowPayNum=$('#ttlLowPayNum').numberbox('getValue');
	var ttlRegAmt=$('#ttlRegAmt').numberbox('getValue');
	var fundRt=$('#fundRt').numberspinner('getValue')/100;
	var subamt=SCFUtils.Math(ttlLowPayNum, ttlRegAmt, 'sub');
	if(subamt>=0){
		subamt=SCFUtils.Math(subamt, fundRt, 'mul');
		$('#marginApplied').numberbox('setValue',subamt);
	}else{
		$('#marginApplied').numberbox('setValue',0);
	}
} 
var checkArray = new Array();
function onCheck(rowIndex, rowData){
	isAccept = false;
	if(flagPre==true){
		return;
	}
	rowData.ck = true;
	var price = rowData.price;// 获得最新单价
	$('#CollateralTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			// 当选中一行数据时，给字段重新改值
			priceNew : price
		}
	});
	
	onClickRow(rowIndex);
	checkArray.push(rowData.sysRefNo); 
}

function onUnCheck(rowIndex, rowData){
	isAccept = false;
	rowData.ck=false;
	$('#CollateralTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			// 当选中一行数据时，给字段重新改值
			priceNew : 0,//还原价格
			poInAmt : SCFUtils.Math(rowData.price,rowData.poInNumY,'mul')
		}
	});
	endEditing();
//	//取消一行时，最低库存价值=原值-本行质物当日价值
//	var ttlLowPayNum = $("#ttlLowPayNum").numberspinner("getValue");
//	ttlLowPayNum = SCFUtils.Math(ttlLowPayNum, rowData.poInAmt, 'sub');
//	$("#ttlLowPayNum").numberspinner("setValue",ttlLowPayNum);

	checkArray = delCheck(checkArray,rowData.sysRefNo);
	$('#CollateralTable').datagrid('checkRow',rowIndex);
}

//判断是否包含在数组中
function contains(a, obj){
	for(var i in a) {
	    if(a[i] === obj){
	      return true;
	    }
	}
	return false;
}

//删除数组中的值
function delCheck(a, obj){
	var arr = a;
	for(var i in a) {
	    if(a[i] === obj){
	    	delete arr[i]; 
	    }
	}
	return arr;
}



function onCheckAll(rows){
	$.each(rows,function(i,n){
		if(!contains(checkArray,n.sysRefNo)){
			onCheck(i,n);
		}
	});	
}



function onUnCheckAll(rows){
	$.each(rows,function(i,n){
		if(contains(checkArray,n.sysRefNo)){
			onUnCheck(i,n);
		}
	});
}

function onClickRow(index) {
	if (editIndex != index) {
		if (endEditing()) {
			$('#CollateralTable').datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#CollateralTable').datagrid('selectRow', editIndex);
		}
	}
}
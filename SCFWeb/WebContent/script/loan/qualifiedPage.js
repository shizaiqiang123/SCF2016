function pageOnInt() {
	SCFUtils.setFormReadonly("#mainForm", true);
	SCFUtils.setNumberboxReadonly("poInNum", false);
}

var goodsData = {};

function ajaxTable() {
	// 加载表格
	$('#dg').datagrid({
		toolbar : '#toolbar',
		// queryParams : data,
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		/*
		 * loadMsg : '数据加载中,请稍后...', onLoadError : function() {
		 * alert('数据加载失败!'); }, onLoadSuccess : function(data) { },
		 */
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'poNo',
			title : '订单编号',
			width : 200,
			hidden : false
		},{
			field : 'goodsId',
			title : '商品ID',
			width : 200
		}, {
			field : 'goodsNm',
			title : '商品名称',
			width : 200
		}, {
			field : 'goodsCata',
			title : '商品大类',
			width : 300,
			hidden : true
		}, {
			field : 'subCata',
			title : '商品子类',
			width : 300,
			hidden : true
		}, {
			field : 'producer',
			title : '生产商',
			width : 300
		}, {
			field : 'unit',
			title : '单位',
			width : 300
		}, {
			field : 'ccy',
			title : '币别',
			width : 300
		}, {
			field : 'poNum',
			title : '数量',
			width : 300
		}, {
			field : 'sumPoInNum',
			title : '可入库数量',
			width : 300,
			hidden : true
		}, {
			field : 'poPrice',
			title : '单价',
			width : 200,
			formatter : ccyFormater
		},{
			field : 'crtfNo',
			title : '订单关联货物流水号',
			width : 200,
			hidden : true
		} ] ]
	});
}

function SearchPageInfo() {
	var cntrctNo = $('#cntrctNo').val();
	var buyerId = $('#buyerId').val();
	var goodsId = $('#queryGoodsId').val();
	var goodsNm = $('#queryGoodsNm').val();
	var loanId = $('#loanId').val();
	// var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000518',
			cntrctNo : cntrctNo,
			buyerId : buyerId,
			goodsId : goodsId,
			goodsNm : goodsNm,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					var options = {
						url : SCFUtils.AJAXURL,
						data : {
							queryId : 'Q_P_000486',
							crtfNo : n.sysRefNo,
							goodsId : n.goodsId
						},
						callBackFun : function(data) {
							// 如果该押品已经入过库，则可入库数量=登记数量-已入库数量之和。反之可入库数量等于登记时的数量
							if (!SCFUtils.isEmpty(data.rows)) {
								$.extend(n, {
									sumPoInNum : SCFUtils.Math(n.poNum,
											data.rows[0].sumPoInNum, 'sub')
								});
							} else {
								// sumPoInNum : n.poNum
								$.extend(n, {
									sumPoInNum : n.poNum
								});
							}
						}
					};
					SCFUtils.ajax(options);
				});

				SCFUtils.loadGridData('dg', data.rows, false, true);
				if (goodsData.total != 0) {
					$.each(data.rows,function(i, n) {
							for (var j = 0; j < goodsData.total; j++) {
								if (goodsData.rows[j].collateralRefNo == n.sysRefNo) {
									SCFUtils.setDatagridRowReadonly("dg",i,true,function() {
										SCFUtils.alert("您已添加过改货物信息！");
						               });
									   break;
									}
							}
					});
				}
			}
		}
	};
	SCFUtils.ajax(opts);
}

function SearchPageTableInfo() {

	var cntrctNo = $('#cntrctNo').val();
	var buyerId = $('#buyerId').val();
	var goodsId = $('#queryGoodsId').val();
	var goodsNm = $('#queryGoodsNm').val();
	var loanId = $('#loanId').val();
	// var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000484',
			cntrctNo : cntrctNo,
			buyerId : buyerId,
			/*
			 * goodsId : goodsId, goodsNm : goodsNm,
			 */
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					var options = {
						url : SCFUtils.AJAXURL,
						data : {
							queryId : 'Q_P_000486',
							crtfNo : n.sysRefNo,
							cntrctNo : cntrctNo,
							cacheType : 'non'
							//goodsId : n.goodsId
						},
						callBackFun : function(data) {
							// 如果该押品已经入过库，则可入库数量=登记数量-已入库数量之和。反之可入库数量等于登记时的数量
							if (!SCFUtils.isEmpty(data.rows)) {
									$.extend(n, {
										sumPoInNum : SCFUtils.Math(n.poNum,
												data.rows[0].sumPoInNum, 'sub')
									});
							} else {
								// $('#sumPoInNum').numerbox('setValue',n.poNum);
								// sumPoInNum : n.poNum
								// 如果该押品还没有入过库，就让可入库数量等于登记数量
								$.extend(n, {
									sumPoInNum : n.poNum
								});
							}
						}
					};
					
					var sysRefNo = '';//货物的流水号
					if(!SCFUtils.isEmpty(deletedRowsCache)){
						$.each(deletedRowsCache,function(i,m){
							if(m.collateralRefNo === n.sysRefNo){
								sysRefNo = m.sysRefNo;
							}
						})
					}
					if(!SCFUtils.isEmpty(sysRefNo)){
						$.extend(options.data,{
							sysRefNo : sysRefNo
						})
					}
					SCFUtils.ajax(options);
				});

				SCFUtils.loadGridData('dg', data.rows, false, true);
				if (goodsData.total != 0) {
					$.each(data.rows,function(i, n) {
						for (var j = 0; j < goodsData.total; j++) {
							if (goodsData.rows[j].collateralRefNo == n.sysRefNo) {
								SCFUtils.setDatagridRowReadonly("dg",i,true,function() {
									SCFUtils.alert("您已添加过该货物信息！");
								});
								break;
						    }
					    }
				    });
			   }
		   }
	   }
};
	SCFUtils.ajax(opts);
}

function doSave(win) {
	if ($('#poInAmt').numberbox('getValue') == 0) {
		SCFUtils.alert('请输入入库数量');
		return;
	}
	var data = SCFUtils.convertArray('mainForm');
	$.extend(data, {
		collateralRefNo : $('#collateralRefNo').val()
	});
	var target = win.getData('callback');
	target(data);
	win.close();
}
var deletedRowsCache = [];
//var isEditRow = false;

function ignoreToolBar(){
	
}

function pageLoad(win) {
	var row = win.getData("row");
	deletedRowsCache  = row.deletedRowsCache;
	// 修改
	// $('#cntrctNo').val(row.cntrctNo);
	// $('#buyerId').val(row.buyerId);
	// if ('edit' == row.op) {
	// SCFUtils.loadForm('mainForm', row);
	// } else if ('del' == row.op) {
	// SCFUtils.loadForm('mainForm', row);
	// } else {
	//
	// }
	
	if (!SCFUtils.isEmpty(row.goodsData)) {
		goodsData = row.goodsData;
	} else {
		goodsData.total = 0;
	}
	
	if (row.op == 'add') {
		var options={};
		options.data = {
				refName : 'qualRef',
				refField : 'sysRefNo',
				cacheType:'non' 
		};
		SCFUtils.getRefNo(options);
		
		//isEditRow = false;
		SCFUtils.loadForm('mainForm', row);
	} else if (row.op == 'edit') {
		//isEditRow = true;
		if ('FP' == SCFUtils.FUNCTYPE) {
			$('#poAUsedNum').val(
					SCFUtils.Math(row.sumPoInNum, row.poInNum, 'add'));
		}
		$('#poNum').numberbox('setValue', row.poNum);
		SCFUtils.loadForm('mainForm', row);
	}
	ajaxTable();
	SearchPageTableInfo();
	loadClick();
	//最后在设置表格只读
	if(row.op == 'edit'){
		SCFUtils.setDatagridReadonly('dg', true);
	}
	
	SCFUtils.repalcePH("");
}

function loadClick() {
	var options = $('#dg').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck() {
	// debugger;
	var data = $('#dg').datagrid('getChecked');// 获取所有当前加载的数据行
	$('#goodsCata').val(data[0].goodsCata);
	$('#subCata').val(data[0].subCata);
	$('#producer').val(data[0].producer);
	$('#goodsId').val(data[0].goodsId);
	$('#goodsNm').val(data[0].goodsNm);
	$('#price').numberbox('setValue', data[0].poPrice);
	$('#poNum').numberbox('setValue', data[0].poNum);
	$('#sumPoInNum').numberbox('setValue', data[0].sumPoInNum);
	$('#unit').val(data[0].unit);
	$('#ccy').val(data[0].ccy);
	$('#collateralRefNo').val(data[0].sysRefNo);
	$('#poRef').val(data[0].poNo);
	$('#poAUsedNum').val(data[0].sumPoInNum);
	$('#poInNum').numberbox('setValue', '0');
	$('#goodsCharacter').val(data[0].goodsCharacter);
	// poInNum
}

function checkPoNum() {
	var poInNum = $('#poInNum').numberbox('getValue');
	$('#sumPoInNum').numberbox('setValue',
			SCFUtils.Math($('#poAUsedNum').val(), poInNum, 'sub'));
//	var goodsId = $('#goodsId').val();
//	var loanId = $('#loanId').val();
	var cntrctNo = $('#cntrctNo').val();//协议编号
	var collateralRefNo = $('#collateralRefNo').val();//订单关联货物流水号
	var poNum = $('#poNum').numberbox('getValue');
	var price = $('#price').numberbox('getValue');
	//退回处理 修改数据
	//if("FP"===SCFUtils.FUNCTYPE){
		if(SCFUtils.Math($('#poAUsedNum').val(), poInNum, 'sub')<0){
//			$('#poInNum').numberbox('setValue',0);
			$('#poInAmt').numberbox('setValue', 0);
			SCFUtils.alert('入库数量不能大于可入库数量！');
		}else{
			var poInAmt = SCFUtils.Math(price, poInNum, 'mul');
			$('#poInAmt').numberbox('setValue', poInAmt);
		}
	//}else{
//		var options = {
//				url : SCFUtils.AJAXURL,
//				data : {
//					queryId : 'Q_P_000486',
////					loanId : loanId,
////					goodsId : goodsId
//					cntrctNo : cntrctNo,
//					crtfNo : collateralRefNo
//				},
//				callBackFun : function(data) {
//					if (!SCFUtils.isEmpty(data.rows)) {
//						// alert(data.rows[0].sumPoInNum);
//
//						if ((SCFUtils.Math(poNum, SCFUtils.Math(
//								data.rows[0].sumPoInNum, poInNum, 'add'), 'sub')) >= 0) {
//							// alert('yes');
//							var poInAmt = SCFUtils.Math(price, poInNum, 'mul');
//							$('#poInAmt').numberbox('setValue', poInAmt);
//						} else {
//							// $('#poInNum').numberbox('setValue',0);
//							$('#poInAmt').numberbox('setValue', 0);
//							SCFUtils.alert('入库数量不能大于可入库数量！');
//						}
//
//					} else {
//						if ((SCFUtils.Math(poNum, poInNum, 'sub') >= 0)) {
//							var poInAmt = SCFUtils.Math(price, poInNum, 'mul');
//							$('#poInAmt').numberbox('setValue', poInAmt);
//						} else {
//							// $('#poInNum').numberbox('setValue',0);
//							$('#poInAmt').numberbox('setValue', 0);
//							SCFUtils.alert('入库数量不能大于可入库数量！');
//						}
//
//					}
//				}
//			};
//			SCFUtils.ajax(options);
//	}
}

function onResetBtnClick() {
	$('#queryGoodsId').val("");
	$('#queryGoodsNm').val("");
}
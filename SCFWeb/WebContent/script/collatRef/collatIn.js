function pageOnInt(data) {
	SCFUtils.setFormReadonly('#collatInDiv', true);
	ajaxTable();
}

function beforeLoad() {	
	var data = {};
	data.data = {cacheType:'non'};
	return data;
}

function pageOnLoad(data) {
	SCFUtils.loadForm('collatInForm', data);
	$('#ttlInVal').numberbox('setValue',0);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('collatInForm', data);
	SCFUtils.loadGridData('collatIn', SCFUtils.parseGridData(data.obj.COLLATIN), true);// 加载数据并保护表格。
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('collatInForm', data);
	SCFUtils.loadGridData('collatIn', SCFUtils.parseGridData(data.obj.COLLATIN), false);
}

function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('collatInForm', data);
	queryCntrct();
	reLoadTable();
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
	$('#collatOutTable').datagrid('hideColumn', 'ck');
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
	$('#collatOutTable').datagrid('hideColumn', 'ck');
}

function onNextBtnClick() {
	var ttlInVal =$('#ttlInVal').numberbox('getValue');
	if(ttlInVal==0){
		SCFUtils.alert('本次还本金金额为零,请勾选应收账款！');
		return;
	}
    if(!checkAmt()){
    	SCFUtils.confirm("质物的价值不能覆盖敞口,请检查！",function(r){
		});
    }else{
    	var mainData = SCFUtils.convertArray('collatInForm');
    	eachadd();
    	var grid = {};
    	var griddata=SCFUtils.getGridData('collatIn',false); 
    	grid.COLLATIN = SCFUtils.json2str(griddata);
    	$.extend($.extend(mainData,grid));
    	return mainData;
    }
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
//		onLoadSuccess  : eachadd,
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
			width : 90
		}, {
			field : 'collatQty',
			title : '质物计价量',
			width : 90,
			formatter : numberFormater
		}, {
			field : 'collatVal',
			title : '质物当日价值',
			width : 90,
			formatter : ccyFormater
		}, {
			field : 'collatAdjDt',
			title : '质物最新调整价格日期',
			width : 90,
			formatter : function(value, row, index) {
				return SCFUtils.dateFormat(value, "yyyy-MM-dd");
			}
		}, {
			field : 'collatSpec',
			title : '质物规格',
			width : 90
		}, {
			field : 'collatFact',
			title : '生产厂家',
			width : 90
		}, {
			field : 'qty',
			title : '质物数量',
			width : 90,
			formatter : numberFormater
		}, {
			field : 'weight',
			title : '质物重量',
			width : 90,
			formatter : numberFormater
		},{
			field : 'cntrctNo',
			title : '协议编号',
			hidden:true
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
		} 
		] ],
	};
	$('#collatIn').datagrid(options);
}
//新增一条数据
function addRow() {
	var row={};
	row.cntrctNo = $('#sysRefNo').val();
	row.op='add';
	var options = {
		title:'新增商品信息',
		reqid : 'I_P_000011',
		data : {'row' : row},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);

}
function addSuccess(data) {
	var invNoList=getCollatId();
	if(contains(invNoList,data.collatId)){
		SCFUtils.error('商品编号为：'+data.collatId+'的商品在表格中已存在!');
		return;
	}
	
	$('#collatIn').datagrid('appendRow', data);
	getInAmt();
}
function getCollatId(){
	var invNoList =[];	
	var griddata = SCFUtils.getGridData('collatIn',false);
	var datas=SCFUtils.parseGridData(griddata,false);
	if(datas.length>0){
		$.each(datas,function(i,m){
			invNoList.push(m.collatId);
		});
	}	
	
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
//修改一条数据
function editRow() {
	var row = $('#collatIn').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title:'修改商品信息',
			reqid : 'I_P_000011',
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

function editSuccess(data) {
	var row = $('#collatIn').datagrid('getSelected');
	var rowIndex = $('#collatIn').datagrid('getRowIndex', row);
	$('#collatIn').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	getInAmt();
}

// 删除一条数据
function deleteRow() {
	var rows = $('#collatIn').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#collatIn').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
			            $('#collatIn').datagrid('deleteRow',index); 
			        }
				 getInAmt();
			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}
/**
 * 导入
 */
function upload(){
	var data = SCFUtils.convertArray("collatInForm");
	var  invNoList=getCollatId();
	var param ={
			data:$.extend({"templateId":"T0000004",'invNoList':invNoList},data),
			callBackFun:function(data){
				$.each(data.rows, function(i, n){
					var collatId = n.collatId;		//商品编号
					var collatQty = n.collatQty;    //质物计价量
					var collatRdPrice = goodsCataQueryAjax(collatId);	//质物认定价格
					var collatVal = SCFUtils.Math(collatQty,collatRdPrice,'mul');   //质物当日价值
					 $.extend(n,{
						 collatRdPrice:collatRdPrice,
						 collatVal:collatVal,
						 cntrctNo:$('#cntrctNo').val()
					 });
				});
				SCFUtils.loadGridData('collatIn',data.rows);
				getInAmt();
			}
	};
	SCFUtils.upload(param);		
}
//根据商品ID查询商品价格
function goodsCataQueryAjax(goodsId) {
	var price = 0;
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000061',
			goodsId : goodsId
		},
		callBackFun : function(data) {
			if (data.success) {
				price = data.rows[0].price;
			}
		}
	};
	SCFUtils.ajax(opt);
	return price;
}

function getInAmt() {
	var griddata = SCFUtils.getGridData('collatIn', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (griddata._total_rows == 0) {
		$('#ttlInVal').numberbox('setValue', 0);
	}else{
		//汇总入库价值
		var ttlinAmt = 0;
		$.each(datas, function(i, n) {
			ttlinAmt = SCFUtils.Math(ttlinAmt, n.collatVal, 'add');
		});
		$('#ttlInVal').numberbox('setValue', ttlinAmt);
	}
}

function checkAmt(){
	var openLoanAmt=$('#openLoanAmt').numberbox('getValue');//已放款敞口
	var ttlRegAmt=$('#ttlRegAmt').numberspinner('getValue');//库存价值
	var ttlOutVal=$('#ttlOutVal').numberbox('getValue');//出库总价值
	var ttlInVal=$('#ttlInVal').numberbox('getValue');//入库价值
	ttlRegAmt=SCFUtils.Math(ttlRegAmt, ttlInVal, 'add');//库存价值=原库存价值+入库价值-出库价值
	ttlRegAmt=SCFUtils.Math(ttlRegAmt, ttlOutVal, 'sub');
	//库存总价值必须大于已放款敞口否则弹错
	if(SCFUtils.Math(ttlRegAmt, openLoanAmt, 'sub')<0){
//		SCFUtils.alert("质物的价值不能覆盖敞口,请检查！");
		return false;
	}else{
		$('#ttlRegAmt').numberspinner('setValue',ttlRegAmt);
		return true;
	}
}

function queryCntrct(){
	var sysRefNo = $('#cntrctNo').val();
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000077',
				sysRefNo : sysRefNo,
				cacheType : 'non'
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#ttlRegAmt').numberspinner('setValue',data.rows[0].ttlRegAmt);
					$('#openLoanAmt').numberbox('setValue',data.rows[0].openLoanAmt);
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
			queryId : 'Q_P_000076',
			inoutRef : inoutRef,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('collatIn', data.rows, false, true);

			} else {
				SCFUtils.alert("没有找到符合要求的质押品!！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function eachadd(){
	if('RE'!=SCFUtils.FUNCTYPE){
		var sysRefNo = $('#sysRefNo').val();
		var data =$('#collatIn').datagrid('getRows');
		$.each(data,function(i,n){
			$('#collatIn').datagrid('updateRow',{	
				index: i,
				row: {
					inoutFlg : '置入',
					inoutRef : sysRefNo
				}
			});
		});
	}
}
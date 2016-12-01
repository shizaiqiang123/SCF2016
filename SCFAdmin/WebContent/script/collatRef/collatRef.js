function ajaxBox(){
	var busiTp = [ {
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
$("#busiTp").combobox('loadData',busiTp);
var opt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006',
				cacheType:'comm'
			},
			callBackFun:function(data){
				if(data.success){
					$('#ccy').combobox('loadData', data.rows);	
					//给币种设置默认值
					$('#ccy').combobox('setValue', 'CNY');	
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


function partySuccess(data){
	$('#regId').val(data.sysRefNo);
	$('#regNm').val(data.patnerNm);
}

function storSuccess(data){
	$('#wareId').val(data.sysRefNo);
	$('#wareNm').val(data.patnerNm);
	$('#storageAdr').val(data.patnerAdr);
	$('#contactNm').val(data.contactNm);
}

function patnerLookUpWindow(){
	var patnerId = $("#regId").val();
	var options = {
		title:'监管机构查询',
		reqid:'I_P_000009',
		data:{'patnerId':patnerId},
		onSuccess:partySuccess
	};
	SCFUtils.getData(options);
	
}

function storLookUpWindow(){
	var storageId = $("#storageId").val();
	var options = {
		title:'仓库查询',
		reqid:'I_P_000010',
		data:{'storageId':storageId},
		onSuccess:storSuccess
	};
	SCFUtils.getData(options);
	
}

/**
 * @param data
 */
function pageOnInt(data) {
//	SCFUtils.setFormReadonly('#POForm',true);
//	SCFUtils.setComboReadonly('ccy', false);
	SCFUtils.setComboReadonly('busiTp', true);
	SCFUtils.setComboReadonly('lmtCcy', true);
	SCFUtils.setNumberspinnerReadonly('fundRt', true);
	SCFUtils.setNumberspinnerReadonly('lmtBal', true);
	SCFUtils.setNumberspinnerReadonly('regAmt', true);
	SCFUtils.setNumberspinnerReadonly('ttlRegAmt', true);
	SCFUtils.setDateboxReadonly('trxDt', true);
	SCFUtils.setTextReadonly('regId', true);
//	SCFUtils.setTextReadonly('warehouseId', true);
	SCFUtils.setTextReadonly('regNm', true);
//	SCFUtils.setTextReadonly('warehouseNm', true);
	SCFUtils.setTextReadonly('storageAdr', true);
	SCFUtils.setTextReadonly('contactNm', true);
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('selId', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setTextReadonly('wareId', true);
	SCFUtils.setTextReadonly('wareNm', true);
	ajaxBox();
	ajaxTable();
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

function pageOnFPLoad(data) {
	
	pageOnReleasePageLoad(data);
	$('#CollateralTable').datagrid('selectAll',true);
	lookSysRelReason();
}

function pageOnLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('POForm', data);
	$('#fundRt').numberspinner('setValue',data.obj.pldPerc);
	var trxDate=getDate(new Date());
	$('#trxDt').datebox('setValue', trxDate);
		var options={};
		options.data = {
				refName: 'COLREG',
				refField:'sysRefNo'
					};
		SCFUtils.getRefNo(options);		
		$('#cntrctNo').val(data.obj.sysRefNo);
//		var sysRe=$('#sysId').val()||data.obj.sysRefNo;
		$('#sysRefNo').val(data.obj.sysRefNo+$('#sysRefNo').val());		
//		$('#sysId').val($('#cntrctNo').val());
	if(SCFUtils.isEmpty($('#ttlRegAmt').numberspinner('getValue'))){
		$('#ttlRegAmt').numberspinner('setValue',0);
	}
	$('#numTtlRegAmt').val($('#ttlRegAmt').numberspinner('getValue'));
	lookSysRelReason();
}

//选择关联监管方
function showCntrctPatWindow(){
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		title:'监管方查询',
		reqid:'I_P_000186',
		data:{'cntrctNo' : cntrctNo},
		onSuccess:patnerSuccess
	};
	SCFUtils.getData(options);
}

function patnerSuccess(data){
	$('#regId').val(data.patnerId);
	$('#regNm').val(data.patnerNm);
	if($('#regId').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#regId').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#regId').removeClass('validatebox-invalid');
	}
	$('#sysRefNo').focus();
}

//查询监管方信息
function showPatner(){
	var options = {
		title:'查询仓库信息',
		reqid:'I_P_000120',
		onSuccess:getPatnerSuccess
	};
	SCFUtils.getData(options);
}
function getPatnerSuccess(data){
	$('#wareId').val(data.sysRefNo);
	$('#wareNm').val(data.patnerNm);
	$('#storageAdr').val(data.patnerAdr);
	$('#contactNm').val(data.contactNm);
	/*
	 * 查询按钮加载数据成功，去判断cntrctNo的div有无值,无值不做处理
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160728 by XuX
	 */

	if($('#wareId').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#wareId').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#wareId').removeClass('validatebox-invalid');
	}

}

function pageOnResultLoad(data){	
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('POForm', data);
	SCFUtils.loadGridData('CollateralTable',SCFUtils.parseGridData(data.obj.COLLAT),true);//加载数据并保护表格。
	lookSysRelReason();
}
function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('POForm', data);
	SCFUtils.loadGridData('CollateralTable',SCFUtils.parseGridData(data.obj.COLLAT),false);
	$('#CollateralTable').datagrid('selectAll',true);
	lookSysRelReason();

}
function pageOnReleasePageLoad(data){
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('POForm', row);
	var trxDate=getDate(new Date());
	$('#trxDt').datebox('setValue', trxDate);
	var cntrctNo=data.obj.cntrctNo;
	var opts={
			url:SCFUtils.AJAXURL,
			data: {
				//queryId:'Q_P_000008',
				queryId:'Q_P_000516',
				cntrctNo : cntrctNo
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					$('#fundRt').numberspinner('setValue',data.rows[0].pldPerc);
					$('#ttlRegAmt').numberspinner('setValue',data.rows[0].ttlRegAmt);
					$('#lmtBal').numberbox('setValue',data.rows[0].lmtBal);
					$('#lmtCcy').combobox('setValue',data.rows[0].lmtCcy);
//					$('#warehouseAdr').val(data.rows[0].warehouseAdr);
//					$('#warehouseId').val(data.rows[0].warehouseId);
//					$('#warehouseNm').val(data.rows[0].warehouseNm);
    			}else{
    				SCFUtils.alert("未查询到相关协议信息或者协议被锁住了！");
    			}
			}
	};	
	SCFUtils.ajax(opts);
	
	var ttlRegAmt=$('#ttlRegAmt').numberspinner('getValue');
	$('#numTtlRegAmt').val(ttlRegAmt);
	var regAmt=$('#regAmt').numberspinner('getValue');
	numTtlRegAmt=SCFUtils.Math(ttlRegAmt, regAmt, 'add');
	//库存价值
		$('#ttlRegAmt').numberspinner('setValue',numTtlRegAmt);
	
	
	$('#CollateralTable').datagrid('options');
	if("FP"==SCFUtils.FUNCTYPE || "RE"==SCFUtils.FUNCTYPE || "DP" == SCFUtils.FUNCTYPE){
		//如果是退回处理则允许增删改导。
	}else{
		$('#toolbar').html('');
		$('#CollateralTable').datagrid({
			toolbar: [{
				text:'查询',
				iconCls: 'icon-search',
				handler: function(){editRow(); }
			}]
		});
	}
	/*
	 * 用来控制上面datagrid生成复核时候的查询按钮toolbar的样式，靠右浮动；
	 * new at 2016.07.27 by JinJH
	 */
	$('#CollateralDiv').children('div').children('div').children('div').attr('style','overflow:hidden');
	$('#CollateralDiv').children('div').children('div').children('div').children('table').attr('style','float:right;margin-right:14px;');
	loadTable();
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
	if(checkDataGrid()){
		return;
	}
	var mainData = SCFUtils.convertArray('POForm');
	//mainData.sysId=('#cntrctNo').val();
	var grid = {};
	var griddata=SCFUtils.getGridData('CollateralTable',false); 
	grid.COLLAT = SCFUtils.json2str(griddata);
    $.extend($.extend(mainData,grid));
	return mainData;
}

function loadTable(){
	var regNo=$('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000027',
			regNo:regNo
		},
		callBackFun : function(data) {
			if(!SCFUtils.isEmpty(data.rows)){
				if("FP"==SCFUtils.FUNCTYPE){
					SCFUtils.loadGridData('CollateralTable',data.rows,false);
				}else{
					SCFUtils.loadGridData('CollateralTable',data.rows,true);
				}
				
			}
		}
	};
	SCFUtils.ajax(options);
}

function checkDataGrid(){
	var flag=false;
	var data = $('#CollateralTable').datagrid('getData');
	if(data.total==0){
		SCFUtils.alert('请添加商品！');
		flag=true;
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
		idField:'sysRefNo',//分页勾选
		/*onCheck: function(rowIndex, rowData){
			
			var num = rowData.collatVal;
			var regAmt=$('#regAmt').numberspinner('getValue');
			ttlPmtAmt=SCFUtils.Math(regAmt, num, 'add');
			$('#regAmt').numberspinner('setValue', ttlPmtAmt);
		},
		onUncheck: function(rowIndex, rowData){
			
			var regAmt=$('#regAmt').numberspinner('getValue');
			ttlPmtAmt=SCFUtils.Math(regAmt, rowData.collatVal, 'sub');
			$('#regAmt').numberspinner('setValue', ttlPmtAmt);
		},
		onCheckAll:function(rows){
			
			var ttlPAT=0;
			$.each(rows,function(i,n){
				ttlPAT=SCFUtils.Math(ttlPAT, n.collatVal, 'add');
			});
			$('#regAmt').numberspinner('setValue', ttlPAT);
		},
		onUncheckAll:function(rows){
			
			$('#regAmt').numberspinner('setValue', 0);
		},*/
		columns : [ [  {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
			hidden:true
		},
		{
			field : 'collatId',
			title : '商品编号',
			width : '10.00%'
		},{
			field : 'regNo',
			title : '批次号',
			hidden:true
		}, {
			field : 'collatNm',
			title : '质物品种',
			width : '10.00%'
		}, {
			field : 'arrivalDt',
			title : '质物入库日期',
			width : '10.00%',
			formatter: function(value){
				 return SCFUtils.dateFormat(value,'yyyy-MM-dd');
			}
		},
		 {
			field : 'collatUnit',
			title : '质物计价单位',
			width : '10.00%'
		},
		 {
			field : 'collatQty',
			title : '质物计价量',
			width : '10.00%'
		},
		 {
			field : 'collatVal',
			title : '质物当日价值',
			width : '10.00%',
			formatter:function(value){
				return SCFUtils.ccyFormat(value,'￥','2');
			}
		},
		 {
			field : 'collatRdPrice',
			title : '质物认定价格',
			width : '10.00%',
			formatter:function(value){
				return SCFUtils.ccyFormat(value,'￥','2');
			}
		},
		 {
			field : 'collatAdjDt',
			title : '质物最新调价日期',
			width : '10.00%',
			formatter: function(value){
				 return SCFUtils.dateFormat(value,'yyyy-MM-dd');
			}
		},
		{
			field : 'collatSpec',
			title : '质物规格',
			width : '10.00%'
		},
		{
			field : 'collatFact',
			title : '生产厂家',
			width : '10.00%'
		},{
			field : 'qty',
			title : '质物数量',
			width : '8.33%',
			hidden:true
		},{
			field : 'weight',
			title : '质物重量',
			width : '8.33%',
			hidden:true
		},{
			field : 'cntrctNo',
			title : '协议编号',
			hidden:true
		},{
			field : 'froFlag',
			title : '质物状态',
			hidden:true
		},{
			field : 'collatQtyBal',
			title : '质物可融资数量',
			hidden:true
		},{
			field : 'collatOutQty',
			title : '质物可出库数量',
			hidden:true
		},{
			field : 'collatCcy',
			title : '质物币种',
			hidden:true
		}
		] ]
	};
	
	$('#CollateralTable').datagrid(options);
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

function getregAmt() {
	var griddata = SCFUtils.getGridData('CollateralTable', false);
	var datas = SCFUtils.parseGridData(griddata, false);
	if (griddata._total_rows == 0) {
		$('#regAmt').numberspinner('setValue', 0);
		$('#ttlRegAmt').numberspinner('setValue',$('#numTtlRegAmt').val());
	} else {
		var regAmt = 0;
		$.each(datas, function(i, n) {
			regAmt = SCFUtils.Math(regAmt, n.collatVal, 'add');
		});
		//本批次库存价值
		$('#regAmt').numberspinner('setValue', regAmt);
		//库存价值
		var ttlRegAmt = SCFUtils.Math($('#numTtlRegAmt').val(), regAmt,'add');
		$('#ttlRegAmt').numberspinner('setValue',ttlRegAmt);
	}
}

function getCollatId(){
	var invNoList =[];	
	var griddata = SCFUtils.getGridData('CollateralTable',false);
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

function addSuccess(data) {
	
	var invNoList=getCollatId();
	if(contains(invNoList,data.goodsId)){
		SCFUtils.error('商品编号为：'+data.goodsId+'的商品在表格中已存在!');
		return;
	}
	$.extend(data,{'collatId':data.goodsId,'arrivalDt':SCFUtils.getcurrentdate(),'collatSpec':data.goodsCharacter,'froFlag':'0','collatQtyBal':data.collatQty,'collatOutQty':data.collatQty,'collatCcy':$('#ccy').combobox('getValue')});
	$('#CollateralTable').datagrid('appendRow', data);

	getregAmt();
	$('#sysRefNo').focus();
}

function editSuccess(data) {
	var row = $('#CollateralTable').datagrid('getSelected');
	var rowIndex = $('#CollateralTable').datagrid('getRowIndex', row);
	$('#CollateralTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	getregAmt();
	$('#sysRefNo').focus();
}
// 新增一条数据
function addRow() {
	var row={};
	row.regNo = $('#sysRefNo').val();
	row.cntrctNo = $('#cntrctNo').val();
	row.op='add';
	var options = {
		title:'新增商品信息',
		reqid : 'I_P_000011',
		data : {'row' : row},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);

}
// 修改一条数据
function editRow() {
	var row = $('#CollateralTable').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		if ('RE' === SCFUtils.FUNCTYPE ||'DP' === SCFUtils.FUNCTYPE) {
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

// 删除一条数据
function deleteRow() {
	var rows = $('#CollateralTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('Confirm', '确定删除选中的数据吗？', function(r) {
			if (r) {
				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#CollateralTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
			            $('#CollateralTable').datagrid('deleteRow',index); 
			        }
				getregAmt();
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
	var data = SCFUtils.convertArray("POForm");
	var  invNoList=getCollatId();
	if(data){
		var param ={
				data:$.extend({"templateId":"T0000004",'invNoList':invNoList},data),
				callBackFun:function(data){
					$.each(data.rows, function(i, n){
						var collatId = n.collatId;		//商品编号
						var collatQty = n.collatQty;    //质物计价量
						var collatRdPrice = goodsCataQueryAjax(collatId);	//质物认定价格
						var collatVal = SCFUtils.Math(collatQty,collatRdPrice,'mul');   //质物当日价值
						 $.extend(n,{
							 regNo:$('#sysRefNo').val(),
							 collatRdPrice:collatRdPrice,
							 collatVal:collatVal,
							 'collatOutQty':collatQty,
							 'collatQtyBal':collatQty,
							 cntrctNo:$('#cntrctNo').val()
						 });
					});
					SCFUtils.loadGridData('CollateralTable',data.rows);
					getregAmt();
				}
		};
		SCFUtils.upload(param);		
	}
}
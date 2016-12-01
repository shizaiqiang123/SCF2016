function ajaxBox() {
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
	} ];
	$("#busiTp").combobox('loadData', busiTp);

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

function pageOnInt(data) {
	SCFUtils.setTextReadonly('sysRefNo', true);
	SCFUtils.setTextReadonly('cntrctNo', true);
	SCFUtils.setComboReadonly('busiTp', true);
	SCFUtils.setNumberspinnerReadonly('fundRt', true);
	SCFUtils.setNumberspinnerReadonly('lmtBal', true);
	SCFUtils.setComboReadonly('ccy', true);
	SCFUtils.setTextReadonly('selId', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('regId', true);
	SCFUtils.setTextReadonly('regNm', true);
	SCFUtils.setTextReadonly('wareId', true);
	SCFUtils.setTextReadonly('wareNm', true);
	SCFUtils.setTextReadonly('wareAdd', true);
	SCFUtils.setTextReadonly('wareContact', true);
	SCFUtils.setNumberspinnerReadonly('ttlRegAmt', true);
	SCFUtils.setNumberspinnerReadonly('ttlLowPayNum', true);
	SCFUtils.setNumberspinnerReadonly('ttlInVal', true);
	SCFUtils.setNumberspinnerReadonly('ttlOutVal', true);
	ajaxBox();
	ajaxCollatOutTable();
	ajaxCollatInTable();
    SCFUtils.setComboReadonly('OldSysRelReason', true);
    $('tr[id=Tr1]').hide();
	$('tr[id=Tr2]').hide();
	
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
	SCFUtils.loadForm('collatOutForm', data);
	$('#fundRt').numberspinner('setValue',data.obj.pldPerc);
	$('#ccy').combobox('setValue',data.obj.lmtCcy);
	$('#cntrctNo').val(data.obj.sysRefNo);
	$('#ttlLowPayNum').numberspinner('setValue',data.obj.regLowestVal);
	var refRequest={};
	refRequest.data = {
		refName: 'ChangeRef',
		refField:'sysRefNo'
	};
	SCFUtils.getRefNo(refRequest);
	loadTable();
	$('#ttlOutVal').numberbox('setValue',0);
	$('#ttlInVal').numberbox('setValue',0);
	$("#ttlRegAmtHidden").val($('#ttlRegAmt').numberspinner('getValue'));
//	var ttlRegAmtHidden = $("#ttlRegAmtHidden").val();
	lookSysRelReason();

}

function pageOnFPLoad(data) {
	$("#ttlRegAmtHidden").val(data.obj.ttlRegAmt);
	pageOnReleasePageLoad(data);
	$('#collatOutTable').datagrid('selectAll', true);
	$('#collatInTable').datagrid('selectAll', true);
	//$('#bailBillDg').datagrid('selectAll', true);
	/*var options = $('#bailBillDg').datagrid('options');
	options.onCheck = onCheck;
	options.onUncheck = onUncheck;
	options.onCheckAll = onCheckAll;
	options.onUncheckAll = onUncheckAll;*/
}

function pageOnPreLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('collatOutForm', data);
	SCFUtils.loadGridData('collatOutTable', SCFUtils
			.parseGridData(data.obj.crtf), false);
	SCFUtils.loadGridData('collatInTable', SCFUtils
			.parseGridData(data.obj.chDetails), false);
	/**
	 * 20160902解决点击下一步，上一步，再下一步，押品信息丢失----开始
	 */
	
		$("#collatOutTable").datagrid("selectAll");
		accept(true);
	/**
	 * 20160902解决点击下一步，上一步，再下一步，押品信息丢失----结束
	 */
		lookSysRelReason();
}

function pageOnResultLoad(data) {
	if(SCFUtils.FUNCTYPE == 'PM'){
		$("#reasonDiv").parent("div").attr("style","display:none");
	}
	SCFUtils.loadForm('collatOutForm', data);
	SCFUtils.loadGridData('collatOutTable', SCFUtils.parseGridData(data.obj.crtf), true);// 加载数据并保护表格。
	SCFUtils.loadGridData('collatInTable', SCFUtils.parseGridData(data.obj.chDetails), true);// 加载数据并保护表格。
	lookSysRelReason();
}


function pageOnReleasePageLoad(data) {
	data.obj.sysTrxStsLook = data.obj.sysTrxSts;
	var row = exchangeSysRelReason(data.obj);
	SCFUtils.loadForm('collatOutForm', row);
	outLoadTable();
	inLoadTable();
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
	
	var ttlOutVal = $('#ttlOutVal').numberbox('getValue');//换出质物总价值
	var ttlInVal = $('#ttlInVal').numberbox('getValue');//换入质物总价值
	var ttlLowPayNum = $('#ttlLowPayNum').numberbox('getValue');//最低库存价值
	var ttlRegAmt = $('#ttlRegAmt').numberbox('getValue');//库存价值总额
	if(ttlOutVal == 0){
		SCFUtils.alert('本次换出质物总价值为零,请勾选换出质物信息或未点击【接受改变】按钮！');
		return;
	}
	if(ttlInVal == 0){
		SCFUtils.alert('本次换入质物总价值为零,请添加换入质物信息！');
		return;
	}
	if(SCFUtils.Math(ttlInVal, ttlOutVal, 'sub') < 0){
		SCFUtils.alert('换入质物总价值不能低于换出质物总价值，请调整！');
		return;
	}
	if(SCFUtils.Math(ttlRegAmt, ttlLowPayNum, 'sub') < 0){
		SCFUtils.alert('当前库存价值总额低于最低库存价值，请调整！');
		return;
	}
	//库存价值总额=原库存价值总额+换入质物总价值-换出质物总价值 （更新至协议表）
	//$('#ttlRegAmt').numberbox('setValue',SCFUtils.Math(SCFUtils.Math(ttlRegAmt, ttlInVal, 'add'), ttlOutVal, 'sub'));
	
	var mainData = SCFUtils.convertArray('collatOutForm');
	var grid = {};
	var outGriddata;
	var inGriddata;
	var rkGriddata;
	var ckGriddata;
	if('RE'==SCFUtils.FUNCTYPE || 'DP' == SCFUtils.FUNCTYPE){
		outGriddata =SCFUtils.getGridData('collatOutTable');
		inGriddata =SCFUtils.getGridData('collatInTable');
		rkGriddata =SCFUtils.getGridData('collatInTable');
		ckGriddata =SCFUtils.getGridData('collatOutTable');
	}else{
		outGriddata=SCFUtils.getSelectedGridData('collatOutTable',false);
		inGriddata =SCFUtils.getGridData('collatInTable',false);
		rkGriddata =SCFUtils.getGridData('collatInTable');
		ckGriddata=SCFUtils.getSelectedGridData('collatOutTable',false);
		$.each(SCFUtils.parseGridData(outGriddata), function(i, n){
			//库存量=原储存-换出数量
			$.extend(n,{"collatOutQty":SCFUtils.Math(n.collatOutQty, n.outQty, 'sub')});
		});
		$.each(SCFUtils.parseGridData(inGriddata), function(i, n){
			//质物置换主表流水号
			var changeRefNo = $('#sysRefNo').val();
//			$.extend(n,{"sysRefNo":SCFUtils.uuid(16)});
		});
		$.each(SCFUtils.parseGridData(rkGriddata), function(i, n){
			//质物置换主表流水号
			var changeRefNo = $('#sysRefNo').val();
			var cntrctNo = $('#cntrctNo').val();
			$.extend(n,{
//				"sysRefNo":SCFUtils.uuid(16),//sysRefNo已有，不需要随机获取
				"sysRefNo":n.sysRefNo,
				'collatId':n.goodsId,
				'regNo':n.changeRefNo,
				'collatNm':n.collatNm,
				'arrivalDt':n.arrivalDt,
				'collatUnit':n.collatUnit,
				'collatQty':n.qty,
				'collatVal':n.collatVal,
				'collatRdPrice':n.collatRdPrice,
				'collatAdjDt':n.collatAdjDt,
				'collatSpec':n.collatSpec,
				'collatFact':n.prcollatFact,
				'qty':n.qty,
				'weight':n.weight,
				'cntrctNo':cntrctNo,
				'froFlag':0,
				'collatOutQty':n.qty,
				'collatCcy':n.ccy,
			});
		});
		$.each(SCFUtils.parseGridData(ckGriddata), function(i, n){
			//质物置换主表流水号
			var changeRefNo = $('#sysRefNo').val();
			var cntrctNo = $('#cntrctNo').val();
			$.extend(n,{
//				"sysRefNo":SCFUtils.uuid(16),
				'collatQty':n.collatOutQty,
				'changeFlag':0
			});
		});
	}
	grid.chDetails = SCFUtils.json2str(inGriddata);
	grid.crtf = SCFUtils.json2str(outGriddata);
	grid.rkDetails = SCFUtils.json2str(rkGriddata);
	grid.ckDetails = SCFUtils.json2str(ckGriddata);
	$.extend(mainData, grid);
	return mainData;
}


function loadTable() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000073',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					$.extend(n, {
						collatNm: n.collatNm,
						goodsId:n.collatId,
						collatSpec:n.collatSpec,
						prcollatFact:n.collatFact,
						collatUnit:n.collatUnit,
						ccy:n.collatCcy,
						collatOutQty:n.collatOutQty,
						poInAmt:n.collatVal,
						inoutRef:$("#sysRefNo").val(),
						refNo:n.sysRefNo
					});
				});
				SCFUtils.loadGridData('collatOutTable', data.rows, false, true);
			} else {
				SCFUtils.alert("没有找到符合要求的质押品!！");
			}
		}
	};
	SCFUtils.ajax(options);
}


function loadTableRe() {
	var cntrctNo = $('#cntrctNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000652',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					$.extend(n, {
						collatNm: n.collatNm,
						goodsId:n.collatId,
						collatSpec:n.collatSpec,
						prcollatFact:n.collatFact,
						collatUnit:n.collatUnit,
						ccy:n.collatCcy,
						collatOutQty:n.collatOutQty,
						poInAmt:n.collatVal,
						inoutRef:$("#sysRefNo").val(),
						refNo:n.sysRefNo
					});
				});
				SCFUtils.loadGridData('collatOutTable', data.rows, false, true);
			} else {
				SCFUtils.alert("没有找到符合要求的质押品!！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function outLoadTable() {
	
	var inoutRef = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000507',
			inoutRef : inoutRef,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				$.each(data.rows, function(i, n) {
					$.extend(n, {
						collatOutQty:n.collatQty
					});
				});
				if(SCFUtils.FUNCTYPE === 'FP'){
					SCFUtils.loadGridData('collatOutTable', data.rows, false, true);
				}else{
					SCFUtils.loadGridData('collatOutTable', data.rows, true, true);
				}

			} else {
				SCFUtils.alert("没有找到符合要求的质押品!！");
			}
		}
	};
	SCFUtils.ajax(options);
}

function inLoadTable() {
	var inoutRef = $('#sysRefNo').val();
	var options = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000508',
			inoutRef : inoutRef,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				if(SCFUtils.FUNCTYPE === 'FP'){
					SCFUtils.loadGridData('collatInTable', data.rows, false, true);
				}else{
					SCFUtils.loadGridData('collatInTable', data.rows, true, true);
				}

			} else {
				SCFUtils.alert("没有找到符合要求的质押品!！");
			}
		}
	};
	SCFUtils.ajax(options);
}
function ajaxCollatOutTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbarOut',
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
			field : 'collatNm',
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
			field : 'prcollatFact',
			title : '生产厂家',
			width : '9.09%'
		}, {
			field : 'collatUnit',
			title : '计价单位',
			width : '9.09%'
		}, {
			field : 'ccy',
			title : '计价币别',
			width : '9.09%'
		}, {
			field : 'collatRdPrice',
			title : '质物认定价格',
			width : '9.09%',
			formatter:ccyFormater
		}, {
			field : 'collatAdjDt',
			title : '质物最新调价日期',
			width : '9.09%'
		}, {
			field : 'collatOutQty',
			title : '质物库存数量',
			width : '9.09%'
		}, {
			field : 'outQty',
			title : '换出数量',
			editor : {
				type : 'numberbox'
			},
			width : '9.09%'
		},{
			field : 'poOutAmt',
			title : '换出质物价值',
			width : '9.09%',
			formatter:ccyFormater
		}, {
			field : 'refNo',
			title : '质物置换主表流水号',
			hidden : true
		}, {
			field : 'inoutRef',
			title : '质物入库子表流水号',
			hidden : true
		}] ]
	};

	$('#collatOutTable').datagrid(options);
}

function ajaxCollatInTable() {
	// 加载表格
	var options = {
		toolbar : '#toolbarIn',
		rownumbers : true,
		checkOnSelect : true,
		pagination : true,// 是否分页
		fitColumns : false,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		idField : 'sysRefNo',// 分页勾选,
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : '交易流水号',
//			hidden : true
		}, {
			field : 'collatNm',
			title : '商品名称',
			width : '10%'
		}, {
			field : 'goodsId',
			title : '商品ID',
			width : '10%'
		}, {
			field : 'collatSpec',
			title : '规格型号',
			width : '10%',
			hidden:true
		}, {
			field : 'prcollatFact',
			title : '生产厂家',
			width : '10%'
		}, {
			field : 'collatUnit',
			title : '计价单位',
			width : '10%'
		}, {
			field : 'ccy',
			title : '计价币别',
			width : '10%'
		}, {
			field : 'collatRdPrice',
			title : '质物认定价格',
			width : '10%',
			formatter:ccyFormater
		}, {
			field : 'collatAdjDt',
			title : '质物最新调价日期',
			width : '10%',
			formatter:dateFormater
		}, {
			field : 'qty',
			title : '换入数量',
			editor : {
				type : 'numberbox'
			},
			width : '10%'
		},{
			field : 'collatVal',
			title : '换入质物价值',
			width : '10%',
			formatter:ccyFormater
		}, {
			field : 'refNo',
			title : '质物置换主表流水号',
			hidden : true
		}, {
			field : 'inoutRef',
			title : '质物入库子表流水号',
			hidden : true
		}, {
			field : 'changeFlag',
			title : '标识',
			hidden : true
		}, {
			field : 'collatQty',
			title : '质物数量',
			hidden : true
		}, {
			field : 'weight',
			title : '质物重量',
			hidden : true
		}, {
			field : 'arrivalDt',
			title : '质物入库日期',
			width : '10%',
			formatter:dateFormater,
			hidden : true
		}] ]
	};

	$('#collatInTable').datagrid(options);
}

/*function countOutVal(){
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
}*/

/**
 * 接受改变
 */
var bigThan = false;//如果换出数量大于库存数量则true，并且取消选中时，不参与计算。
function accept(bool) {
	var ttlOutVal = 0.00;//换出质物总价值
	var ttlRegAmt = 0.00;//库存价值总额
	var nowdata = "";
	
	nowdata= $('#collatOutTable').datagrid('getSelections');
	
	endEditing();// 结束编辑
	$.each(nowdata,function(i, n) {
		
		var collatOutQty = n.collatOutQty;// 获得库存数量
		var collatRdPrice = n.collatRdPrice;// 获得单价
		var outval = $("#ttlOutVal").numberspinner("getValue");
		var outQty = n.outQty;// 获得本次换出数量
		if(true==bool){
			collatOutQty  = SCFUtils.Math(collatOutQty, outQty,'add');
		}
		if (SCFUtils.Math(outQty, collatOutQty,'sub') > 0){
			bigThan = true;
			onUnCheck(i,n);
			SCFUtils.alert('本次换出数量不能大于质物库数存数量！');
			var ttlRegAmtHidden = $("#ttlRegAmtHidden").val();
			$("#ttlRegAmt").numberspinner("setValue",ttlRegAmtHidden);
			$("#ttlOutVal").numberspinner("setValue","0.00");
			return false;
		}else{
			bigThan = false;
			// 如果符合条件

			var rowIndex = $('#collatOutTable').datagrid('getRowIndex', n);// 获得选中的行数
			$('#collatOutTable').datagrid('updateRow',
					{
						index : rowIndex,
						row : {
							outQty:outQty,
							collatOutQty:collatOutQty,
							poOutAmt : SCFUtils.Math(outQty,collatRdPrice, 'mul'),// 更改选中行的本次出库价值
						}
					});
			ttlOutVal = SCFUtils.Math(ttlOutVal, SCFUtils.Math(outQty,collatRdPrice, 'mul'), 'add');
		
		}
	});
	if(!bigThan){
		var ttlInVal = $("#ttlInVal").numberspinner("getValue");
		
		$("#ttlOutVal").numberspinner("setValue",ttlOutVal);
		var ttlRegAmtHidden = $("#ttlRegAmtHidden").val();
		
//		ttlRegAmtHidden = SCFUtils.Math(ttlRegAmtHidden,ttlOutVal, 'sub');
		
		if(true==bool){//点击上一步时，库存价值总额不变
			ttlRegAmtHidden = $("#ttlRegAmt").numberspinner('getValue');
//			ttlRegAmtHidden = SCFUtils.Math(ttlRegAmtHidden,ttlInVal, 'add');
			bool = false;
		}else{
			ttlRegAmtHidden = SCFUtils.Math(ttlRegAmtHidden,ttlOutVal, 'sub');
			ttlRegAmtHidden = SCFUtils.Math(ttlRegAmtHidden,ttlInVal, 'add');

		}
		
		$("#ttlRegAmt").numberspinner("setValue",ttlRegAmtHidden);
	}
//	$("#ttlRegAmtHidden").val(ttlRegAmtHidden);

//	if(true==bool){//点击上一步时，库存价值总额不变
//		ttlRegAmtHidden = $("#ttlRegAmtHidden").val();
//	}else{
//	//计算库存价值总额 = 原值-本次换出质物总价值
//		ttlRegAmtHidden = SCFUtils.Math($("#ttlRegAmt").numberspinner("getValue"),ttlOutVal, 'sub');
//	}
}

//新增一条数据
function addRow() {
	var row={};
	row.regNo = $('#sysRefNo').val();
	row.cntrctNo = $('#cntrctNo').val();
	row.op='add';
	var options = {
		title:'新增商品信息',
		reqid : 'I_P_000198',
		data : {'row' : row},
		onSuccess : addSuccess
	};
	SCFUtils.getData(options);

}
// 修改一条数据
function editRow() {
	var row = $('#collatInTable').datagrid('getSelections');
	if (row.length == 1) {
		row = row[0];
		row.op = 'edit';
		if ('RE' === SCFUtils.FUNCTYPE) {
			row.state = 'query';
		}
		var options = {
			title:'修改商品信息',
			reqid : 'I_P_000198',
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
	var rows = $('#collatInTable').datagrid('getSelections');
	var copyRows = [];
	for (var j = 0; j < rows.length; j++) {
		copyRows.push(rows[j]);
	}
	if (rows.length > 0) {
		$.messager.confirm('友情提示', '确定删除选中的数据吗？', function(r) {
			if (r) {
				var ttlInValOld = $("#ttlInVal").numberspinner("getValue");
//				var ttlRegAmt = $("#ttlRegAmt").numberspinner("getValue");//库存价值总额
				var ttlRegAmtOld =  $("#ttlRegAmtHidden").val();//隐藏值

				 for(var i =0;i<copyRows.length;i++){    
			            var index = $('#collatInTable').datagrid('getAllRowIndex',copyRows[i].sysRefNo);
			            var row = $('#collatInTable').datagrid('getRows')[index];
			            ttlInValOld = SCFUtils.Math(ttlInValOld,row.collatVal, 'sub');
			           
			            //库存价值总额=原值-本次删除行的换入质物价值
//			            ttlRegAmt = SCFUtils.Math(ttlRegAmt,row.collatVal, 'sub');
			            $('#collatInTable').datagrid('deleteRow',index); 
			        }
				var ttlOutVal = $("#ttlOutVal").numberspinner("getValue");//
				var ttlRegAmt = SCFUtils.Math(ttlRegAmtOld,ttlInValOld, 'add');
				ttlRegAmt = SCFUtils.Math(ttlRegAmt,ttlOutVal, 'sub');

				 $("#ttlInVal").numberspinner("setValue", ttlInValOld);
				 $("#ttlRegAmt").numberspinner("setValue", ttlRegAmt);

			}
		});
	} else {
		SCFUtils.alert("请选择一条数据！");
	}
}

function addSuccess(data) {
	
	var invNoList=getCollatId();
	if(contains(invNoList,data.collatId)){
		SCFUtils.error('商品编号为：'+data.collatId+'的商品在表格中已存在!');
		return;
	}
	var ttlRegAmtOld =  $("#ttlRegAmtHidden").val();
	var ttlInValOld =  $("#ttlInVal").numberspinner("getValue");
	var ttlOutVal =  $("#ttlOutVal").numberspinner("getValue");

	$.extend(data,{'goodsId':data.collatId,'prcollatFact':data.collatFact,'qty':data.collatQty,'weight':data.weight,'arrivalDt':data.arrivalDt,'ccy':$('#ccy').combobox('getValue'),'changeFlag':'1','collatQty':data.qty,'refNo':data.sysRefNo,'inoutRef':$('#sysRefNo').val()});
	$('#collatInTable').datagrid('appendRow', data);
	//换入质物总价值=原值+本次添加的质物价值
	var ttlInVal = $("#ttlInVal").numberspinner("getValue");
	var ttlInValCount = SCFUtils.Math(ttlInVal,data.collatVal, 'add');
	$("#ttlInVal").numberspinner("setValue", ttlInValCount);
	
//	 ttlRegAmt = SCFUtils.Math(ttlRegAmtOld,ttlInValOld, 'sub');

	 var ttlRegAmt = SCFUtils.Math(ttlRegAmtOld,ttlInValCount, 'add');
	
	ttlRegAmt = SCFUtils.Math(ttlRegAmt,ttlOutVal, 'sub');
	
	$("#ttlRegAmt").numberspinner("setValue",ttlRegAmt);
	$('#sysRefNo').focus();
}

function getCollatId(){
	var invNoList =[];	
	var griddata = SCFUtils.getGridData('collatInTable',false);
	var datas=SCFUtils.parseGridData(griddata,false);
	if(datas.length>0){
		$.each(datas,function(i,m){
			invNoList.push(m.collatId);
		});
	}	
	
	return invNoList;
}
function editSuccess(data) {
	
	var row = $('#collatInTable').datagrid('getSelected');
	var rowIndex = $('#collatInTable').datagrid('getRowIndex', row);
	var beginCollatVal = row.collatVal;
	$.extend(data,{'qty':data.collatQty,'collatQty':data.qty});
	$('#collatInTable').datagrid('updateRow', {
		index : rowIndex,
		row : data
	});
	//换入质物总价值=原值-修改前的换入质物总价值+本次添加的质物价值
	var ttlInValOld = $("#ttlInVal").numberspinner("getValue");
	var ttlOutVal = $("#ttlOutVal").numberspinner("getValue");
	
	var ttlRegAmtOld =  $("#ttlRegAmtHidden").val();//隐藏值

	
	$("#ttlInVal").numberspinner("setValue", SCFUtils.Math(ttlInValOld,beginCollatVal, 'sub'));
	var ttlInVal = $("#ttlInVal").numberspinner("getValue");
	var ttlInValCount = SCFUtils.Math(ttlInVal,data.collatVal, 'add');
	$("#ttlInVal").numberspinner("setValue", ttlInValCount);
//	//计算库存价值总额 = 原值-修改前的换入质物总价值+本次换入质物总价值
//	var ttlRegAmtOld = $("#ttlRegAmt").numberspinner("getValue");
//	$("#ttlRegAmt").numberspinner("setValue", SCFUtils.Math(ttlRegAmtOld,beginCollatVal, 'sub'));
	var ttlRegAmt = SCFUtils.Math(ttlRegAmtOld,ttlInValCount, 'add');
	
	ttlRegAmt = SCFUtils.Math(ttlRegAmt,ttlOutVal, 'sub');

	
	$("#ttlRegAmt").numberspinner("setValue",ttlRegAmt);
	$('#sysRefNo').focus();
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
	$('#wareAdd').val(data.patnerAdr);
	$('#wareContact').val(data.contactNm);
	/*
	 * 查询按钮加载数据成功，去判断cntrctNo的div有无值,无值不做处理
	 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
	 * new on 20160728 by XuX
	 */

	if($('#wareId').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#wareId').parent('td').removeClass('requried-item-ifo');//去除*号
		$('#wareId').removeClass('validatebox-invalid');
	}
	$('#sysRefNo').focus();
}
var checkArray = new Array();
function onCheck(rowIndex, rowData){
	rowData.ck = true;
	var collatOutQty = rowData.collatOutQty;// 获得库存数量
	var outQty = rowData.outQty;// 获得库存数量
	var regAmt = SCFUtils.Math(outQty, rowData.collatRdPrice, 'mul');
	$('#collatOutTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			// 当选中一行数据时，换出数量等于库存数量
//			outQty : collatOutQty,
			poOutAmt : SCFUtils.Math(collatOutQty, rowData.collatRdPrice, 'mul')
		}
	});
	onClickRow(rowIndex);
	checkArray.push(rowData.sysRefNo); 
}

function onUnCheck(rowIndex, rowData){
	rowData.ck=false;
	if(bigThan){
		$('#collatOutTable').datagrid('updateRow', {
			index : rowIndex,
			row : {
				// 当选中一行数据时，给字段重新改值
				outQty : '',
				poOutAmt :0
			}
		});
		endEditing();
	}else{
	var ttlRegAmt = $("#ttlRegAmt").numberspinner("getValue");
	var outQty = rowData.outQty;
	//如果库存数量为0，则操作了下一步，此时取消选中是，还原库存数量
	if(rowData.collatOutQty == 0){
		$('#collatOutTable').datagrid('updateRow', {
			index : rowIndex,
			row : {
				// 当选中一行数据时，给字段重新改值
				collatOutQty : rowData.outQty,
				outQty : '',
				poOutAmt :0
			}
		});
	}
	
	$('#collatOutTable').datagrid('updateRow', {
		index : rowIndex,
		row : {
			// 当选中一行数据时，给字段重新改值
			outQty : '',
			poOutAmt :0
		}
	});
	endEditing();
	//取消一行时，换出质物总价值=原值-本行质物当日价值
	var ttlOutVal = $("#ttlOutVal").numberspinner("getValue");
	var ttlRegAmtHidden = $("#ttlRegAmtHidden").val();
	//取消一行时，库存价值总额=原值+本行换出质物总价值
	ttlRegAmt = SCFUtils.Math(ttlRegAmt, SCFUtils.Math(outQty, rowData.collatRdPrice, 'mul'), 'add');
	
	ttlOutVal = SCFUtils.Math(ttlOutVal, SCFUtils.Math(outQty, rowData.collatRdPrice, 'mul'), 'sub');
	$("#ttlOutVal").numberspinner("setValue",ttlOutVal);

	$("#ttlRegAmt").numberspinner("setValue", ttlRegAmt);
//	$("#ttlRegAmtHidden").val(ttlRegAmtHidden);
	checkArray = delCheck(checkArray,rowData.sysRefNo);
	}
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

var editIndex = undefined;
function endEditing() {
	if (editIndex == undefined) {
		return true;
	}
	if ($('#collatOutTable').datagrid('validateRow', editIndex)) {
		$('#collatOutTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}

function onClickRow(index) {
	if (editIndex != index) {
		if (endEditing()) {
			$('#collatOutTable').datagrid('beginEdit', index);
			editIndex = index;
		} else {
			$('#collatOutTable').datagrid('selectRow', editIndex);
		}
	}
}
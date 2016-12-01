var collateralData = {};

function ignoreToolBar(){
	
}

function pageLoad(win) {
	var row = win.getData("row");
	ajaxTable();
	SCFUtils.setFormReadonly('#collateralForm', true);
	SCFUtils.setNumberboxReadonly('poLoanNum', false);
	if(!SCFUtils.isEmpty(row.collateralData)){
		collateralData = row.collateralData;
	}else{
		collateralData.total = 0;
	}
	if(row.op == 'add'){
		$('#loanId').val(row.trxId);
		$('#cntrctNo').val(row.cntrctNo);
		$('#selId').val(row.selId);
		$('#buyerId').val(row.buyerId);
	}else if(row.op == 'edit'){
		$('#producer').val(row.producer);
		//$('#poNumUseable').numberbox('setValue', row.poNumUseable);
		var poLoanAmt = SCFUtils.Math(row.price, row.poLoanNum, 'mul');
		//$('#poAUsedNum').val(row.poNumUseable);
		if('FP' == SCFUtils.FUNCTYPE){
			$('#poAUsedNum').val(SCFUtils.Math(row.poNumUseable, row.poLoanNum, 'add'));
			$('#poUsedNum').val(SCFUtils.Math(row.poNumUsed, row.poLoanNum, 'sub'));
		}else{
			$('#poAUsedNum').val(SCFUtils.Math(row.poNumUseable, row.poLoanNum, 'add'));
			$('#poUsedNum').val(SCFUtils.Math(row.poNumUsed, row.poLoanNum, 'sub'));
		}
		SCFUtils.loadForm('collateralForm', row);
		if('FP' == SCFUtils.FUNCTYPE){
			//$('#poNumUseable').numberbox('setValue', SCFUtils.Math(row.poNumUseable, row.poLoanNum, 'sub'));
			//$('#poNumUsed').numberbox('setValue', SCFUtils.Math(row.poNumUsed, row.poLoanNum, 'add'));
		}else{
			$('#poNumUseable').numberbox('setValue', SCFUtils.Math($('#poAUsedNum').val(), row.poLoanNum, 'sub'));
			$('#poNumUsed').numberbox('setValue', SCFUtils.Math($('#poUsedNum').val(), row.poLoanNum, 'add'));
		}
		$('#poLoanAmt').numberbox('setValue', poLoanAmt);
		//SCFUtils.setDatagridReadonly('dg',true);
	}
	SearchPageInfo();
	loadClick();
	
	//最后在设置表格只读
	if(row.op == 'edit'){
		SCFUtils.setDatagridReadonly('dg', true);
	}
	/*
	 * if (row.op === 'add') { } else if (row.op === 'edit') { }
	 */
	
	SCFUtils.repalcePH("");
}

function onResetBtnClick() {
	$('#copyOfGoodsId').val("");
	$('#copyOfGoodsNm').val("");
}

function loadClick() {
	var options = $('#dg').datagrid('options');
	options.onCheck = onCheck;
}

function onCheck() {
	var data = $('#dg').datagrid('getChecked');// 获取所有当前加载的数据行
//	$('#ttLAmt').numberbox('setValue', data[0].ttlAmt);
	$('#poAUsedNum').val(data[0].poNumUseable);
	$('#poUsedNum').val(data[0].poNumUsed);
	$('#poLoanNum').numberbox('setValue','0');
	SCFUtils.loadForm('collateralForm', data[0]);
	$('#price').numberbox('setValue', data[0].poPrice);
}

function checkPoLoanNum() {
	var price = $('#price').numberbox('getValue');
	//var poNumUseable = $('#poNumUseable').numberbox('getValue');
	//var poNumUsed = $('#poNumUsed').numberbox('getValue');
	var poAUsedNum = $('#poAUsedNum').val();
	var poUsedNum = $('#poUsedNum').val();
	
	var poLoanNum = $('#poLoanNum').numberbox('getValue');
	if(SCFUtils.Math(poLoanNum, poAUsedNum, 'sub')>0){
		$('#poLoanAmt').numberbox('setValue', 0);
		SCFUtils.alert('融资数量不能大于可融资数量！');
	}else{
		var poLoanAmt = SCFUtils.Math(price, poLoanNum, 'mul');
		$('#poLoanAmt').numberbox('setValue', poLoanAmt);
		$('#poNumUseable').numberbox('setValue', SCFUtils.Math(poAUsedNum, poLoanNum, 'sub'));
		$('#poNumUsed').numberbox('setValue', SCFUtils.Math(poUsedNum, poLoanNum, 'add'));
	}
	var reg = /^\d*$/;//匹配一个马上的0-9和小数点
	if(reg.test(poLoanNum) == false){
		SCFUtils.alert('融资数量不能为负数！');
//		$("#poLoanNum").numberbox('setValue',0);
	}
}

function ajaxTable() {
	// 加载表格
	$('#dg').datagrid({
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true,// 列自适应表格宽度
		striped : true,// 当true时，单元格显示条纹
		columns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			field : 'sysRefNo',
			title : 'sysRefNo',
			width : 300,
			hidden : true
		}, {
			field : 'refNo',
			title : 'refNo',
			width : 300,
			hidden : true
		}, {
			field : 'goodsCata',
			title : '商品大类',
			width : 300
		}, {
			field : 'subCata',
			title : '商品子类',
			width : 300
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
			field : 'poNumUseable',
			title : '可融资数量',
			width : 300
		}, {
			field : 'poNumUsed',
			title : '已融资数量',
			width : 300
		}, {
			field : 'goodsId',
			title : '商品ID',
			width : 200
		}, {
			field : 'goodsNm',
			title : '商品名称',
			width : 200
		}, {
			field : 'poPrice',
			title : '单价',
			width : 200,
			formatter : ccyFormater
		} ] ]
	});
}

function SearchPageInfo() {
	var cntrctNo = $('#cntrctNo').val();
	var loanId = $('#loanId').val();
	var buyerId = $('#buyerId').val();
	var goodsId = $('#copyOfGoodsId').val();
	var goodsNm = $('#copyOfGoodsNm').val();
	// var ttlLoanAmt = $('#ttlLoanAmt').numberspinner('getValue');
	var opts = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000489',
			sysRefNo : cntrctNo,
			buyerId : buyerId,
			goodsId : goodsId,
			goodsNm : goodsNm,
			loanId : loanId,
			cacheType : 'non'
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadGridData('dg', data.rows, false, true);
				if(collateralData.total != 0){
					$.each(data.rows,function(i,n){
						for(var j = 0;j<collateralData.total;j++){
							if(collateralData.rows[j].sysRefNo==n.sysRefNo){
								SCFUtils.setDatagridRowReadonly("dg",i,true,function(){
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
	var data = SCFUtils.convertArray('collateralForm');
	if (data) {
		
		//校验融资数量不能为0
		if($('#poLoanNum').val()==0){
			SCFUtils.alert('融资数量不能为0');
			return;
		}
		
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

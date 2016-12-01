function ignoreToolBar(){
	
}

function pageLoad(win) {
	// ccyQueryAjax();
//	SCFUtils.setNumberspinnerReadonly('collatVal', true);
//	SCFUtils.setNumberspinnerReadonly('collatRdPrice', true);
//	SCFUtils.setDateboxReadonly('collatAdjDt', true);
//	SCFUtils.setTextReadonly('sysRefNo', true);
//	SCFUtils.setTextReadonly('collatNm', true);
//	SCFUtils.setTextReadonly('collatUnit', true);
	SCFUtils.setFormReadonly('#CollateralForm',true);
	SCFUtils.setDateboxReadonly('arrivalDt', false);
	SCFUtils.setDateboxReadonly('collatQty', false);
	SCFUtils.setLinkbuttonReadonly('goodsIdLookUp', false);
	debugger;


	var row = win.getData("row");
	var options = {};
	options.data = {
		refName : 'Collat',
		refField : 'sysRefNo',
		cacheType : 'non'
	};
	options.force = true;
	if (row.op === 'add') {
		SCFUtils.getRefNo(options);
		$('#regNo').val(row.regNo);
		$('#cntrctNo').val(row.cntrctNo);
		$('#arrivalDt').datebox('setValue', getDate(new Date()));
	} else if (row.op === 'edit') {
		if (row.state === 'query') {
			SCFUtils.setFormReadonly('#CollateralForm', true);
		}
		$('#sysRefNo').val(row.sysRefNo);
		$('#collatId').val(row.collatId);
		$('#regNo').val(row.regNo);
		$('#cntrctNo').val(row.cntrctNo);
		$('#collatNm').val(row.collatNm);
		$('#collatUnit').val(row.collatUnit);
		$('#collatQty').numberspinner('setValue', row.qty);
		$('#collatVal').numberbox('setValue', row.collatVal);
		$('#collatRdPrice').numberbox('setValue', row.collatRdPrice);
		$('#collatAdjDt').datebox('setValue', row.collatAdjDt);
		$('#collatSpec').val(row.collatSpec);
		$('#collatFact').val(row.collatFact);
		$('#qty').val(row.collatQty);
		$('#weight').val(row.weight);
		$('#arrivalDt').datebox('setValue', row.arrivalDt);

	}
}

function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function doSave(win) {
	var data = SCFUtils.convertArray('CollateralForm');
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

function collatVal() {
	var ttlOutQty = $('#collatQty').numberspinner('getValue');
	var collatRdPrice = $('#collatRdPrice').numberbox('getValue');
	if (!SCFUtils.isEmpty(ttlOutQty) && !SCFUtils.isEmpty(collatRdPrice)) {
		$('#collatVal').numberbox('setValue', ttlOutQty * collatRdPrice);
	}
}

function goodsSuccess(data){
	$('#collatId').val(data.goodsId);
	$('#collatNm').val(data.goodsNm);
	$('#collatFact').val(data.producer);
	$('#collatUnit').val(data.unit);
	$('#collatAdjDt').datebox('setValue',data.updateDt);
	$('#collatRdPrice').numberspinner('setValue',data.price);
	$('#sysRefNo').focus();
}


function goodsIdLookUp() {
	var collatId = $("#collatId").val();
	var cntrctNo = $("#cntrctNo").val();
	var options = {
			title : '商品查询',
			reqid : 'I_P_000199',
			data : {
				'collatId' : collatId,
				'cntrctNo' : cntrctNo
			},
			onSuccess : goodsSuccess
		};
		SCFUtils.getData(options);
}

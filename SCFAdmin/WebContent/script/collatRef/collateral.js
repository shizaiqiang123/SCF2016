function ignoreToolBar(){
	
}

function pageLoad(win) {
	ajaxBox();
	SCFUtils.setFormReadonly("#CollateralForm",true);
	SCFUtils.setNumberspinnerReadonly('collatQty', false);
	SCFUtils.setLinkbuttonReadonly('goodsIdLookUp', false);
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
		$('#collatNm').val(row.goodsNm);
		$('#goodsCata').combobox('setValue',row.goodsCata);
		changeSubCata();
		$('#subCata').combobox('setValue',row.subCata);
		$('#collatCcy').combobox('setValue',row.collatCcy);
		$('#sysRefNo').val(row.sysRefNo);
		$('#collatId').val(row.collatId);
		$('#regNo').val(row.regNo);
		$('#cntrctNo').val(row.cntrctNo);
		$('#collatNm').val(row.collatNm);
		$('#collatUnit').val(row.collatUnit);
		$('#collatQty').numberspinner('setValue', row.collatQty);
		$('#collatVal').numberbox('setValue', row.collatVal);
		$('#collatRdPrice').numberbox('setValue', row.collatRdPrice);
		$('#collatAdjDt').datebox('setValue', row.collatAdjDt);
		$('#collatSpec').val(row.collatSpec);
		$('#collatFact').val(row.collatFact);
		$('#qty').numberspinner('setValue', row.qty);
		$('#weight').numberspinner('setValue', row.weight);
		$('#arrivalDt').datebox('setValue', row.arrivalDt);
		SCFUtils.eachElement("CollateralForm");
	}
}

function ajaxBox(){
	// 商品大类查询
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000060',
		},
		callBackFun : function(data) {
			if (data.success&&!SCFUtils.isEmpty(data.rows)) {
				$('#goodsCata').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
	
	var optt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000006',
				cacheType : 'non'
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#ccy').combobox('loadData', data.rows);
					//给币种设置默认值
					$('#ccy').combobox('setValue', 'CNY');
					// $('#collatCcy').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(optt);
}

function changeSubCata(){
	var goodsCata = $('#goodsCata').combobox('getValue');
	// 商品子类查询
	var opt1 = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000058',
			goodsCata : goodsCata
		},
		callBackFun : function(data) {
			if (data.success&&!SCFUtils.isEmpty(data.rows)) {
				$('#subCata').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt1);
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
//	$('#collatId').val(data.goodsId);
	$('#collatNm').val(data.goodsNm);
	$('#goodsCata').combobox('setValue',data.goodsCata);
	changeSubCata();
	$('#subCata').combobox('setValue',data.subCata);
	$('#goodsNm').val(data.goodsNm);
	$('#collatCcy').combobox('setValue',data.ccy);
	$('#collatFact').val(data.producer);
	$('#collatUnit').val(data.unit);
	$('#collatAdjDt').datebox('setValue',data.collatAdjDt);
	$('#collatRdPrice').numberspinner('setValue',data.price);
	$('#collatId').parent('td').removeClass('requried-item-ifo');// 去除*号
	$('#collatId').removeClass('validatebox-invalid');
	$('#goodsId').val(data.goodsId);
	$('#goodsCharacter').val(data.goodsCharacter);
	$('#sysRefNo').focus();
	
}


function goodsIdLookUp() {
	var collatId = $("#collatId").val();
	var cntrctNo = $("#cntrctNo").val();
	var options = {
			title : '商品查询',
			reqid : 'I_P_000012',
			data : {
				'collatId' : collatId,
				'cntrctNo' :cntrctNo
			},
			onSuccess : goodsSuccess
		};
		SCFUtils.getData(options);
}

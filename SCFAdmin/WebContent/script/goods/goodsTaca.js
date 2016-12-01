function ajaxBox() {
	goodsCataQueryAjax();
	ccyQueryAjax();
}

function pageOnInt() {
	ajaxBox();
}

// 商品大类查询
function goodsCataQueryAjax() {
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
}

// 商品子类查询
function subCataQueryAjax(goodsCata) {
	var opt = {
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
	SCFUtils.ajax(opt);
}

function ccyQueryAjax() {
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success&&!SCFUtils.isEmpty(data.rows)) {
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
}

// 大类改变时改变子类和对应lable值
function changeSubCata() {
//	$('#cataLab').text('55');
	$('#subCata').combobox('setValue', '');
	var goodsCata = $('#goodsCata').combobox('getValue');
	$('#cataLab').text(goodsCata);
	$('#cataLabHD').val(goodsCata);
	subCataQueryAjax(goodsCata);

}

//子类改变时改变对应lable值
function changeSubLab() {
	var subCata = $('#subCata').combobox('getValue');
	$('#subLab').text(subCata);
	$('#subLabHD').val(subCata);

}

// 计算商品ID
function calcGoodsId() {
	var goodsCata = $('#goodsCata').combobox('getValue');
	var subCata = $('#subCata').combobox('getValue');
	var goodsNo = $('#goodsNo').val();
	var goodsId = goodsCata + '-' + subCata + '-' + goodsNo;
	$('#goodsId').val(goodsId);

}
function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
			+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}
function pageOnPreLoad(data) {
	SCFUtils.loadForm('goodsTacaForm',data);
	$('#cataLab').text($('#cataLabHD').val());
	$('#subLab').text($('#subLabHD').val());
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('goodsTacaForm',data);
	$('#cataLab').text($('#cataLabHD').val());
	$('#subLab').text($('#subLabHD').val());
}

function pageOnLoad(data) {
	if ('ADD' != SCFUtils.OPTSTATUS || 'RE'===SCFUtils.FUNCTYPE) {
		var goodsId = data.obj.goodsId;
		var goodsNo = goodsId.substring(6,goodsId.length);
		$("#goodsNo").val(goodsNo);
	}
	$('#updateDt').datebox('setValue', getDate(new Date()));
	var options = {};
	options.data = {
		refName : 'GoodsRef',
		refField : 'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	SCFUtils.loadForm('goodsTacaForm', data);
}

// 检查数据库中是否有相同的商品ID
function checkGoodsId() {
	var flag = false;
	var goodsId = $('#goodsId').val();
	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000059',
			goodsId : goodsId
		},
		callBackFun : function(data) {
			if (!SCFUtils.isEmpty(data.rows)) {
				SCFUtils.alert('计算出的商品ID ' + goodsId + ' 已存在！');
				flag = true;
			}
		}
	};
	SCFUtils.ajax(opt);
	return flag;
}

function onNextBtnClick() {
	var goodsTacaForm = SCFUtils.convertArray('goodsTacaForm');
	calcGoodsId();// 计算商品ID(检查表单完整性之后才能计算)
	if ('ADD' === SCFUtils.OPTSTATUS && SCFUtils.FUNCTYPE != 'RE') {
		if (checkGoodsId()) {
			return;
		}
	}
	goodsTacaForm.goodsId = $('#goodsId').val();
	return goodsTacaForm;
}

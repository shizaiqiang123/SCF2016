function pageOnInt() {
	// SCFUtils.setFormReadonly('mainForm', true);
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("productNm", true);
	SCFUtils.setTextReadonly("editionNo", true);
	SCFUtils.setTextReadonly("cntrctNm", true);
	ajaxbox();
}

function ajaxbox(){
	var payChgTp = [ {
		"id" : '0',
		"text" : "先收费"
	}, {
		"id" : '1',
		"text" : "后收费"
	} ];
	$('#payChgTp').combobox('loadData', payChgTp);
	
	var payIntTp = [ {
		"id" : '0',
		"text" : "利随本清"
	} ];
	$('#payIntTp').combobox('loadData', payIntTp);
}

//function pageOnPreLoad(data) {
//	SCFUtils.loadForm('mainForm', data);
//}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	ajaxSysRefNo();
	addEditionNo(data);
	ignoreBtn();
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
	$("#addProduct").remove();
	$("#submit").remove();
}

//function pageOnFPLoad(data) {
//	SCFUtils.loadForm('mainForm', data);
//}

function onNextBtnClick() {
	if(checkDate()){
		var data = SCFUtils.convertArray('mainForm');
		return data;
	}
	return;
}

function ajaxSysRefNo() {
	if ('ADD' == SCFUtils.OPTSTATUS) {
		var options = {};
		options.data = {
			refName : 'CntrctModelRef',
			refField : 'sysRefNo'
		};
		SCFUtils.getRefNo(options);
	}
}

function ignoreBtn() {
	if ('ADD' == SCFUtils.OPTSTATUS) {
		$("#addProduct").unbind().bind('click', addProduct);
	}
	if ('EDIT' == SCFUtils.OPTSTATUS) {
		$("#addProduct").remove();
	}
	if ('DELETE' == SCFUtils.OPTSTATUS){
		$("#addProduct").remove();
		$("#submit").remove();
	}
	if ('VIEW' == SCFUtils.OPTSTATUS){
		$("#addProduct").remove();
		$("#submit").remove();
	}
}

function addEditionNo(data) {
	if ('ADD' == SCFUtils.OPTSTATUS) {
		$('#editionNoCopy').val('v1.0');
	} else if ('EDIT' == SCFUtils.OPTSTATUS) {
		var num = data.obj.sysEventTimes + 1;
		var cntrctNo = "v" + num + ".0";
		$('#editionNoCopy').val(cntrctNo);
	}
}

function queryCntrctTemp() {
	var result = true;
	var productId = $('#productId').val();
	if (!SCFUtils.isEmpty(productId)) {
		var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000266',
				productId : productId
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					result = false;
				}
			}
		};
		SCFUtils.ajax(option);
	}
	return result;
}

function addProduct() {
	var row = {};
	row.op = 'add';
	var options = {
		title : '查询产品信息',
		reqid : 'I_P_000088',
		data : {
			'row' : row,
			cacheType : 'non'
		},
		onSuccess : addProductSuccess
	};
	SCFUtils.getData(options);
}

var productId;

function addProductSuccess(data) {
	$('#productId').val(data.productId);
	if(queryCntrctTemp()){
		$('#productId').val(data.productId);
		$('#productNm').val(data.productNm);
		$('#productNm').removeClass('validatebox-invalid');
	}else{
		$('#productId').val("");
		$('#productNm').val("");
		SCFUtils.alert('该产品已添加协议文本模板！');
		return;
	}
}


function checkDate(){
	var result = true;
	var Bdate = $('#dueDt').datebox('getValue');
	var Fdate = SCFUtils.getcurrentdate();
	var num = SCFUtils.DateDiff(Bdate, Fdate);
	if (num <= 0) {
		SCFUtils.alert('协议生效期必须大于当前日期！');
		$('#dueDt').datebox('setValue', '');
		result = false;
		return result;
	}
	return result;
}

/**
 * 导入
 */
function upload() {
	var fileList = {};
	var param = {
		data : {
			'reqType' : 'fileImportManager',
			'fileList' : fileList
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data)) {
				$('#cntrctNm').val(data.obj.fileName);
				$('#cntrctURL').val(data.obj.filePath);
				$('#editionNo').val($('#editionNoCopy').val());
				$('#cntrctNm').removeClass('validatebox-invalid');
				$('#editionNo').removeClass('validatebox-invalid');
			}
		}
	};
	SCFUtils.upload(param);
}

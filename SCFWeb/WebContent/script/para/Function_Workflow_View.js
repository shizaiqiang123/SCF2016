function doSave(win) {
	removeAccounting(win);
	win.close();
}

function pageOnInt() {
	ajaxBox();
	SCFUtils.setTextReadonly('workid', true);
}

function ajaxBox() {
	var isenable = [ {
		"id" : 'Y',
		"text" : "是",
		selected : true
	}, {
		"id" : 'N',
		"text" : "否"
	} ];
	$("#isenable").combobox('loadData', isenable);
}

function ignoreToolBar() {

}

function pageLoad(win) {
	var row = win.getData("row");
	var paraId = row.paraId;

	// 修改
	var data = {
		'paraId' : paraId,
		cacheType : 'non',
		'ServiceType' : 'workflow',
		strBu : SCFUtils.SYSBUSIUNIT
	};
	$.extend(data, {
		'queryId' : win.getData("queryId")
	});
	findAccounting(data);
}

function findAccounting(data) {
	var options = {
		url : SCFUtils.AJAXURL,
		data : data,
		async : false,
		callBackFun : function(data) {
			if (data.success) {
				if (null == (data.obj)) {
					SCFUtils.setComboReadonly('isenable', true);
					$('#isenable').combobox('setValue', 'N');
				} else {
					$('#isenable').combobox('setValue', 'Y');
					$('#workid').val(data.obj.workflow);
				}
			}
		}
	};
	SCFUtils.ajax(options);
}

function removeAccounting(win) {
	var rows = win.getData("row");
	var row = {};
	var options = {
		async : false,
		reqid : 'I_P_000058',
		data : {
			'row' : row,
			cacheType : 'non',
			requestType : 'save',
			resultType : $('#isenable').combobox('getValue'),
			functionId : rows.paraId,
			resetType : 'workflow',
			ServiceType : 'workflow'
		},
		onSuccess : function() {
		}
	};
	SCFUtils.getData(options);
}

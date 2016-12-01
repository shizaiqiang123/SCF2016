function doSave(win) {
	removeAccounting(win);
	win.close();
}

function pageOnInt() {
	ajaxBox();
	SCFUtils.setTextReadonly('id', true);
	SCFUtils.setTextReadonly('name', true);
	SCFUtils.setTextReadonly('maincomp', true);
	SCFUtils.setTextReadonly('accountingjs', true);
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
		'ServiceType' : 'accounting',
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
				// SCFUtils.loadGridData('searchTable',data.rows,false,true)
				if (null == (data.obj)) {
					SCFUtils.setComboReadonly('isenable', true);
					$('#isenable').combobox('setValue', 'N');
					// $('#mainForm').append("<input type='hidden'
					// id=\"initisable\" name=\"initisable\" value=\"N\" >");
				} else {
					$('#isenable').combobox('setValue', 'Y');
					$('#id').val(data.obj.id);
					$('#name').val(data.obj.name);
					$('#maincomp').val("TrxAccountingManager");// 后台可优化传值
					// $('#maincomp').val(data.obj.maincomp);
					$('#accountingjs').val(data.obj.accountingjs);
					// $('#mainForm').append("<input type='hidden'
					// id=\"initisable\" name=\"initisable\" value=\"Y\" >");
				}
				// $('#mainForm').append("<input type='hidden' id=\"ddata\"
				// name=\"ddata\" value=\""+data.obj+"\" >");
			}
		}
	};
	SCFUtils.ajax(options);
}

function removeAccounting(win) {
	var rows = win.getData("row");
	var row = {};
	var options = {
		// url:SCFUtils.AJAXURL,
		async : false,
		reqid : 'I_P_000054',
		data : {
			'row' : row,
			cacheType : 'non',
			requestType : 'save',
			resultType : $('#isenable').combobox('getValue'),
			functionId : rows.paraId,
			resetType : 'accounting',
			ServiceType : 'accounting'
		},
		onSuccess : function() {
		}
	};
	SCFUtils.getData(options);
}

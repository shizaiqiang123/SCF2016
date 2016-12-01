function ignoreToolBar(){
	
}
function pageLoad(win) {
	SCFUtils.setTextReadonly("sysRefNo", true);
	SCFUtils.setTextReadonly("acOwnerName", true);
	SCFUtils.setComboReadonly("acTp", true);
	ajaxBox();
	var row = win.getData("row");
	var options = {};
	options.data = {
		refName : 'AcNo',
		refField : 'sysRefNo',
		cacheType : 'non'
	};
	options.force = true;
	if (row.op === 'add') {
		SCFUtils.getRefNo(options);
		$('#acOwnerid').val(row.acOwnerid);
		$('#acOwnerName').val(row.acOwnerName);
		$('#acOwnerType').val(row.acOwnerType);
		$('#sysBusiUnit').val(row.sysBusiUnit);
	} else if (row.op === 'edit') {
		if (row.state === 'query') {
			SCFUtils.setFormReadonly('#factorAcnoForm', true);
		}
		$('#acOwnerid').val(row.acOwnerid);
		$('#acOwnerName').val(row.acOwnerName);
		$('#acOwnerType').val(row.acOwnerType);
		$('#sysBusiUnit').val(row.sysBusiUnit);
		$('#sysRefNo').val(row.sysRefNo);
		$('#acTp').combobox('setValue', row.acTp);
		$('#ccy').combobox('setValue', row.ccy);
		acNo = parseInt(row.acNo);
		$('#acBkNm').val(row.acBkNm);
		$('#acBkNo').val(row.acBkNo);
		$('#acNo').val(acNo);
	}
}

function doSave(win) {
	var data = SCFUtils.convertArray('factorAcnoForm');
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

function ajaxBox() {
	var acTp = [ {
		"id" : '2',
		"text" : "一般账户",
		selected : true
	}, {
		"id" : '4',
		"text" : "保理商业务账号"
	}, {
		"id" : '5',
		"text" : "再保理保理专户"
	} ];
	$("#acTp").combobox('loadData', acTp);

	var optt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006'
		},
		callBackFun : function(data) {
			if (data.success) {

				$.each(data.rows, function(i, n) {
					var textField = n.sysRefNo + '-' + n.ccyNm;
					$.extend(n, {
						textField : textField
					});
				});
				$('#ccy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(optt);
}

function goodsSuccess(data) {
	$('#collatId').val(data.goodsId);
	$('#collatNm').val(data.CGoodsNm);
	$('#collatFact').val(data.producer);
	$('#collatUnit').val(data.unit);
	$('#collatAdjDt').datebox('setValue', data.updateDt);
	$('#collatRdPrice').numberspinner('setValue', data.price);
}

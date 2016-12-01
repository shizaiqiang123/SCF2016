function pageOnInt() {
	ajaxBox();
}

function ajaxBox() {
	var pagetype = [ {
		"id" : 'ADD',
		"text" : "ADD"
	}, {
		"id" : 'EDIT',
		"text" : "EDIT"
	}, {
		"id" : 'DELETE',
		"text" : "DELETE"
	}, {
		"id" : 'ROLLBACK',
		"text" : "ROLLBACK"
	}, {
		"id" : 'VIEW',
		"text" : "VIEW"
	}, {
		"id" : 'UNLOCK',
		"text" : "UNLOCK"
	}, {
		"id" : 'PARAADD',
		"text" : "PARAADD"
	}, {
		"id" : 'PARAEDIT',
		"text" : "PARAEDIT"
	}, {
		"id" : 'PARADELETE',
		"text" : "PARADELETE"
	}, {
		"id" : 'PARALOCK',
		"text" : "PARALOCK"
	}, {
		"id" : 'ACCOUNTING',
		"text" : "ACCOUNTING"
	}, {
		"id" : 'LIMITS',
		"text" : "LIMITS"
	} ];
	$('#pagetype').combobox('loadData', pagetype);

	var cascadeevent = [ {
		"id" : 'Y',
		"text" : "Y"
	}, {
		"id" : 'N',
		"text" : "N"
	} ];
	$('#cascadeevent').combobox('loadData', cascadeevent);

	var lockcheck = [ {
		"id" : 'Y',
		"text" : "Y"
	}, {
		"id" : 'N',
		"text" : "N"
	} ];
	$('#lockcheck').combobox('loadData', lockcheck);

	var istransaction = [ {
		"id" : 'Y',
		"text" : "Y"
	}, {
		"id" : 'N',
		"text" : "N"
	} ];
	$('#istransaction').combobox('loadData', istransaction);

	var holdmaster = [ {
		"id" : 'T',
		"text" : "T"
	}, {
		"id" : 'F',
		"text" : "F"
	} ];
	$('#holdmaster').combobox('loadData', holdmaster);

	var maincomp = [ {
		"id" : 'TrxAddRecord',
		"text" : "TrxAddRecord"
	}, {
		"id" : 'TrxEditRecord',
		"text" : "TrxEditRecord"
	}, {
		"id" : 'TrxDeleteRecord',
		"text" : "TrxDeleteRecord"
	}, {
		"id" : 'TrxViewRecord',
		"text" : "TrxViewRecord"
	}, {
		"id" : 'trxLockRecord',
		"text" : "trxLockRecord"
	}, {
		"id" : 'trxPendingManager',
		"text" : "trxPendingManager"
	}, {
		"id" : 'trxReleaseManager',
		"text" : "trxReleaseManager"
	}, {
		"id" : 'trxViewManager',
		"text" : "trxViewManager"
	}, {
		"id" : 'trxMasterManager',
		"text" : "trxMasterManager"
	}, {
		"id" : 'trxFixPendingManager',
		"text" : "trxFixPendingManager"
	}, {
		"id" : 'paremeterManager',
		"text" : "paremeterManager"
	}, {
		"id" : 'trxLockManager',
		"text" : "trxLockManager"
	}, {
		"id" : 'accountDaoImpl',
		"text" : "accountDaoImpl"
	}, {
		"id" : 'paraAdd',
		"text" : "paraAdd"
	} , {
		"id" : 'paraDelete',
		"text" : "paraDelete"
	}, {
		"id" : 'paraEdit',
		"text" : "paraEdit"
	}, {
		"id" : 'paraLock',
		"text" : "paraLock"
	}];
	$('#maincomp').combobox('loadData', maincomp);

}

function pageOnFPLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('mainForm', data);
}

function pageOnPreLoad(data) {
	pageOnResultLoad(data);
}

function newId() {
	var options = {};
	options.data = {
		refName : 'PageRef',
		refField : 'id'
	};
	options.force = true;
	SCFUtils.getRefNo(options);
	/*
	 * 获取新编号后，去判断#id的div有无值,无值不做处理
	 * 有去除这个id的validatebox-invalid方法，不去除*号了
	 * new on 20160829 by JinJH
	 */
	if($('#id').val()!=null){//$('#cntrctNo')为查询左边的div的id
		$('#id').removeClass('validatebox-invalid');
	}
}

function ajaxSysRefNo() {
	if ('PARAADD' == SCFUtils.OPTSTATUS) {
		var newsysRefNo = SCFUtils.uuid(32);
		$('#sysRefNo').val(newsysRefNo);
	}
}

function onSaveBtnClick() {
	var data = SCFUtils.convertArray('mainForm');
	return data;
}

function onNextBtnClick() {
	return onSaveBtnClick();
}

function pageOnLoad(data) {
	SCFUtils.loadForm('mainForm', data.obj);
	ajaxSysRefNo();
}

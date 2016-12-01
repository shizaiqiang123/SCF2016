var temp = 0.0000;
var sumAmt = 0.0000;
function ajaxBox() {
	SCFUtils.setTextReadonly('sellerInstCd', true);
	SCFUtils.setTextReadonly('selNm', true);
	SCFUtils.setTextReadonly('buyerNm', true);
	SCFUtils.setTextReadonly('buyerLmtBat', true);
	SCFUtils.setTextReadonly('buyerInstCd', true);

}

function ignoreToolBar(){
	
}

function pageLoad(win) {
	ajaxBox();
	var row = win.getData("row");
	$('#lmtAmtHd').val(row.lmtAmt);
	var options = {};
	options.data = {
		refName : 'CntrctSbr',
		refField : 'sysRefNo',
		cacheType : 'non'
	};
	options.force = true;
	// 业务类别为“先票款后货”时，融资比例、账期、赊销宽限期、融资宽限期隐藏不显示
	if (row.busiTp == '2') {
		$('tr[id=Tr3]').hide();
		$('tr[id=Tr4]').hide();
	}
	if (row.busiTp == '3') {
		$('tr[id=Tr1]').show();
		$('tr[id=Tr2]').show();
		$('#buyerImposeAmt').numberspinner({
			required : true
		});
		$('#payRt').numberspinner({
			required : true
		});
	}
	if (row.busiTp == '7') {
		$('tr[id=Tr5]').hide();
		$('tr[id=Tr4]').hide();
		$('tr[id=Tr1]').hide();
		$('tr[id=Tr2]').hide();
		$('#buyerImposeAmt').numberspinner({
			required : false
		});
		$('#payRt').numberspinner({
			required : false
		});
	} else {
		$('tr[id=Tr1]').hide();
		$('tr[id=Tr2]').hide();
		$('#buyerImposeAmt').numberspinner({
			required : false
		});
		$('#payRt').numberspinner({
			required : false
		});
	}
	if (row.op === 'add') {
		if (row.isSendSelLmt === "N") {
			SCFUtils.setNumberspinnerReadonly('buyerLmtAmt', true);
			$('tr[id=Tr5]').hide();
			$('#buyerLmtAmt').numberspinner('setValue', 0);
			$('#buyerLmtBat').val(0);
		} else {
			$('tr[id=Tr5]').show();
			$('#buyerLmtAmt').numberspinner('setValue', row.lmtAmt);

		}
		SCFUtils.getRefNo(options);
		$('#trxId').val(row.trxId);
		$('#cntrctNo').val(row.trxId);
		$('#buyerInstCd').val(row.sellerInstCd);
		$('#buyerId').val(row.buyerId);
		$('#buyerNm').val(row.buyerNm);
	} else if (row.op === 'edit') {
		if (row.isSendSelLmt === "N") {
			SCFUtils.setNumberspinnerReadonly('buyerLmtAmt', true);
		}
		if (row.state === 'query') {
			SCFUtils.setFormReadonly('#addCntrctSbrForm', true);
		}
		
		SCFUtils.loadForm('addCntrctSbrForm', row);
		
		sumAmt = SCFUtils.Math(row.lmtAmt, row.buyerLmtAmt, 'add');
		
		temp = SCFUtils.Math(row.buyerLmtAmt, row.buyerLmtBat, 'sub');
		// SCFUtils.setNumberspinnerReadonly("buyerLmtAmt", true);
		querySelNm(row.selId);

	}
	/*
	 * 弹窗里的小页有必输项的 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法 new on
	 * 20160801 by JinJH
	 */
	if ($('#sellerInstCd').val() != null) {// $('#cntrctNo')为查询左边的div的id
		$('#sellerInstCd').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#sellerInstCd').removeClass('validatebox-invalid');
	}
	if ($('#buyerInstCd').val() != null) {// $('#cntrctNo')为查询左边的div的id
		$('#buyerInstCd').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#buyerInstCd').removeClass('validatebox-invalid');
	}
	if ($('#buyerLmtBat').val() != null) {// $('#cntrctNo')为查询左边的div的id
		$('#buyerLmtBat').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#buyerLmtBat').removeClass('validatebox-invalid');
	}
}

function querySelNm(sysRefNo) {
	if (!SCFUtils.isEmpty(sysRefNo)) {
		var optt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000632',
				sysRefNo : sysRefNo
			},
			callBackFun : function(data) {
				if (!SCFUtils.isEmpty(data.rows)) {
					$('#selNm').val(data.rows[0].custNm);
					$('#sellerInstCd').val(data.rows[0].custInstCd);
				}
			}
		};
		SCFUtils.ajax(optt);
	}
}

function doSave(win) {
	var row = win.getData("row");
	if(row.op === 'edit'){
		if (SCFUtils.Math($('#buyerLmtAmt').numberspinner('getValue'), sumAmt, 'sub') > 0) {
			SCFUtils.alert("卖方额度总和不能大于买方授信额度！");
			$('#buyerLmtAmt').numberspinner('setValue', sumAmt);
			return;
		}
		
	}else{
		if (SCFUtils.Math($('#buyerLmtAmt').numberspinner('getValue'), $('#lmtAmtHd').val(), 'sub') > 0) {
			SCFUtils.alert("卖方额度总和不能大于买方授信额度！");
			$('#buyerLmtAmt').numberspinner('setValue', $('#lmtAmtHd').val());
			return;
		}
	}
	
	var data = SCFUtils.convertArray('addCntrctSbrForm');
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

function showLookUpWindow() {
	var selId = $("#selId").val();
	var selNm = $("#selNm").val();
	var sellerInstCd = $('#sellerInstCd').val();
	var options = {
		title : '卖方客户查询',
		reqid : 'I_P_000213',
		data : {
			'sysRefNo' : selId,
			'selNm' : selNm,
			'custInstCd' : sellerInstCd
		},
		cacheType : 'non',
		onSuccess : selSuccess
	};
	SCFUtils.getData(options);

}

function changelmtAmt() {
	var lmtAmt = $('#lmtAmt').numberbox('getValue');
	if (SCFUtils.OPTSTATUS == 'ADD') {
		$('#lmtBal').numberbox('setValue', lmtAmt);
	} else if (SCFUtils.OPTSTATUS == 'EDIT') {
		var lmtBalHD = $('#lmtBalHD').val();
		var lmtAmtHD = $('#lmtAmtHD').val();
		var subAmt = SCFUtils.Math(lmtAmt, lmtAmtHD, 'sub');
		var sumAmt = SCFUtils.Math(lmtBalHD, subAmt, 'add');
		$('#lmtBal').numberbox('setValue', sumAmt);
	}
}

function selSuccess(data) {
	$('#selId').val(data.sysRefNo);
	$('#sellerInstCd').val(data.custInstCd);
	$('#selNm').val(data.custNm);
	// $('#buyerLmtAmt').numberspinner('setValue', data.lmtAmt);
	// $('#buyerLmtBat').val(data.lmtBal);
	$('#ctctNm').val(data.ctctNm);
	$('#ctctTel').val(data.ctctTel);
	$('#ctctFax').val(data.ctctFax);
	$('#remark').val(data.remark);
	$('#lmtAllocate').val(data.lmtAllocate);
	$('#lmtRecover').val(data.lmtRecover);
	$('#lmtCcy').val(data.lmtCcy);

	$('#lmtBalTemp').val(data.lmtBal);
	$('#buyerSysRefNo').val(data.sysRefNo);

	/*
	 * 弹窗里的小页有必输项的 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法 new on
	 * 20160801 by JinJH
	 */
	if ($('#buyerInstCd').val() != null) {// $('#cntrctNo')为查询左边的div的id
		$('#buyerInstCd').parent('td').removeClass('requried-item-ifo');// 去除*号
		$('#buyerInstCd').removeClass('validatebox-invalid');
	}
	if ($("#buyerLmtBat").val() != null) {
		$("#buyerLmtBat").parent('td').removeClass();
		$('#buyerLmtBat').removeClass('validatebox-invalid');
	}
	$('#buyerNm').focus();
}

function setBuyerLmtBat() {

	$('#buyerLmtBat').val(SCFUtils.Math($('#buyerLmtAmt').val(), temp, 'sub'));
	var lmtBalTemp = $('#lmtBalTemp').val();
	var lmtBalHd = SCFUtils.Math(lmtBalTemp, $('#buyerLmtAmt').val(), 'sub');
	$('#lmtBalHd').val(lmtBalHd);
}

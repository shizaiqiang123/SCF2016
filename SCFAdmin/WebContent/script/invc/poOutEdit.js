function ignoreToolBar() {

}

function pageLoad(win) {
	ajaxBox();
	var row = win.getData("row");
	$('#ttlPoOutNumHD').val(row.ttlPoOutNumHD);
	$('#ttlPoOutNum').val(row.ttlPoOutNum);
	$('#poNumUseableHD').val(
			SCFUtils.Math(row.poNumUseable, row.poOutNum, 'add'));
	if (row.op === 'add') {

	} else if (row.op === 'edit') {
		SCFUtils.loadForm('poForm', row);
	}
	if (SCFUtils.FUNCTYPE === 'FP') {
		$("#poOutNum").numberbox(
				{
					max : parseFloat(SCFUtils.Math($("#poNumUseable")
							.numberbox("getValue"), $("#poOutNum").numberbox(
							"getValue"), 'add'))
				});
	} else {
		$("#poOutNum").numberbox(
				{
					max : parseFloat(SCFUtils.Math($("#poNumUseable")
							.numberbox("getValue"), $("#poOutNum").numberbox(
							"getValue"), 'add'))
				});
	}

}

/**
 * 本次发货数量发生变化
 */
function changePoAmt() {
	var poOutNum = $("#poOutNum").numberbox("getValue");// 本次发货数量
	var poPrice = $("#poPrice").numberbox("getValue");// 最新单价
	$('#ttlPoOutNum').val(
			SCFUtils.Math(poOutNum, $('#ttlPoOutNumHD').val(), 'add'));
	$("#poNumUseable").numberbox("setValue",
			SCFUtils.Math($('#poNumUseableHD').val(), poOutNum, 'sub'));// 计算未发货数量
	$("#poOutAmt").numberbox("setValue",
			SCFUtils.Math(poOutNum, poPrice, 'mul'));// 本次发货价值
}

/**
 * 未发货数量发生变化
 */
function changeNoAmt() {
	var poNumUseable = $("#poNumUseable").numberbox("getValue");
	var poPrice = $("#poPrice").numberbox("getValue");// 最新单价
	$("#poNumUseableAmt").numberbox("setValue",
			SCFUtils.Math(poNumUseable, poPrice, 'mul'));// 未发货价值
}

function doSave(win) {
	var data = SCFUtils.convertArray('poForm');
	if (data) {
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

function ajaxBox() {
	SCFUtils.setTextReadonly("goodsCata", true);
	SCFUtils.setTextReadonly("subCata", true);
	SCFUtils.setTextReadonly("goodsNm", true);
	SCFUtils.setNumberboxReadonly("poPrice", true);
	SCFUtils.setNumberboxReadonly("poNum", true);
	SCFUtils.setNumberboxReadonly("ttlAmt", true);
	SCFUtils.setNumberboxReadonly("poNumUseable", true);
	SCFUtils.setNumberboxReadonly("poNumUseableAmt", true);
	SCFUtils.setNumberboxReadonly("poOutAmt", true);
	SCFUtils.setDateboxReadonly("poDueDt", true);

}

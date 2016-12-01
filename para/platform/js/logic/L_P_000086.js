$.print("--------L_P_000086.js begin-----------");

var funcType = $.getFuncType();
$.print("------funcType--------" + funcType);
if ("RE" != funcType) {
	var trxData = $.trxData;
	$.print("------trxData--------" + trxData);

	//var sysRefNo = $.getSysRefNo("qualRef", "sysRefNo");
	var sysRefNo = $.getStringValue(trxData, "sysRefNo");
	$.print("------sysRefNo--------" + sysRefNo);

	var loanId = $.getStringValue(trxData, "loanId");
	$.print("------loanId--------" + loanId);

	var refNo = $.getStringValue(trxData, "refNo");
	$.print("------refNo--------" + refNo);

	var buyerId = $.getStringValue(trxData, "buyerId");
	$.print("------buyerId--------" + buyerId);

	var cntrctNo = $.getStringValue(trxData, "cntrctNo");
	$.print("------cntrctNo--------" + cntrctNo);

	var goodsCata = $.getStringValue(trxData, "goodsCata");
	$.print("------goodsCata--------" + goodsCata);

	var subCata = $.getStringValue(trxData, "subCata");
	$.print("------subCata--------" + subCata);

	var unit = $.getStringValue(trxData, "unit");
	$.print("------unit--------" + unit);

	var goodsId = $.getStringValue(trxData, "goodsId");
	$.print("------goodsId--------" + goodsId);

	var goodsNm = $.getStringValue(trxData, "goodsNm");
	$.print("------goodsNm--------" + goodsNm);

	var producer = $.getStringValue(trxData, "producer");
	$.print("------producer--------" + producer);

	var poInAmt = $.getAmtValue(trxData, 'poInAmt');
	$.print("------poInAmt--------" + poInAmt);

	var poInNum = $.getAmtValue(trxData, 'poInNum');
	$.print("------poInNum--------" + poInNum);

	var poInAmt = $.getAmtValue(trxData, 'poInAmt');
	$.print("------poInAmt--------" + poInAmt);

	var price = $.getAmtValue(trxData, 'price');
	$.print("------price--------" + price);

	var crtfNo = $.getStringValue(trxData, 'collateralRefNo');//订单关联货物流水号
	$.print("------crtf--------" + crtfNo);
	
	$.updateProperty(trxData, "sysRefNo", sysRefNo);
	$.updateProperty(trxData, "loanId", loanId);
	$.updateProperty(trxData, "refNo", refNo);
	$.updateProperty(trxData, "buyerId", buyerId);
	$.updateProperty(trxData, "cntrctNo", cntrctNo);
	$.updateProperty(trxData, "goodsCata", goodsCata);
	$.updateProperty(trxData, "subCata", subCata);
	$.updateProperty(trxData, "unit", unit);
	$.updateProperty(trxData, "goodsId", goodsId);
	$.updateProperty(trxData, "goodsNm", goodsNm);
	$.updateProperty(trxData, "producer", producer);
	$.updateProperty(trxData, "poInAmt", poInAmt);
	$.updateProperty(trxData, "poInNum", poInNum);
	$.updateProperty(trxData, "poInAmt", poInAmt);
	$.updateProperty(trxData, "price", price);
	$.updateProperty(trxData, "crtfNo", crtfNo);
	
	var trxJsonData = $.orgnAllData;//四层数据结构所有记录
	var trxDomData = $.getTrxDomData();//所有交易数据
	var sysRefNo = $.getStringValue(trxDomData,"sysRefNo");
	$.updateProperty(trxData,"sysLockBy",sysRefNo);//一般来说，都是用该功能的主表流水号作为FP时删除的条件
	$.updateProperty(trxData,"sysLockFlag","T");
	
} else {
	var trxData = $.trxData;
	$.print("------trxData--------" + trxData);
	var sysRefNo = $.getStringValue(trxData, "sysRefNo");
	$.print("------sysRefNo--------" + sysRefNo);
	$.updateProperty(trxData, "sysRefNo", sysRefNo);
}

$.print("--------L_P_000086.js end-----------");
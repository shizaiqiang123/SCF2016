$.print("------L_P_000093.js begin-------");

var trxData = $.trxData;
$.print("------trxData--------" + trxData);

var funcType = $.getFuncType();
$.print("------funcType--------" + funcType);
if ("RE" != funcType) {
	
		var sysRefNo = $.getStringValue(trxData, "sysRefNo");
		$.print("------sysRefNo-------" + sysRefNo);
		var poLoanNum = $.getAmtValue(trxData, "poLoanNum");
		$.print("------poLoanNum-------" + poLoanNum);

		var collateralM = $.queryTable("CollateralM", "sysRefNo", [ sysRefNo ]);

		var exPoNumUsed = $.getAmtValue(collateralM.get("data").get(0),
				"poNumUsed");
		$.print("------exPoNumUsed-------" + exPoNumUsed);

		var exPoNumUseable = $.getAmtValue(collateralM.get("data").get(0),
				"poNumUseable");
		$.print("------exPoNumUseable-------" + exPoNumUseable);

		var poNumUseable = $.subAmt(exPoNumUseable, poLoanNum);
		$.print("------poNumUseable-------" + poNumUseable);
		$.updateProperty(trxData, "poNumUseable", poNumUseable);

		var poNumUsed = $.addAmt(exPoNumUsed, poLoanNum);
		$.print("------poNumUsed-------" + poNumUsed);
		$.updateProperty(trxData, "poNumUsed", poNumUsed);

		var trxJsonData = $.orgnAllData;// 四层数据结构所有记录
		var trxDomData = $.getTrxDomData();// 所有交易数据
		var sysRefNo = $.getStringValue(trxDomData, "sysRefNo");
		$.updateProperty(trxData, "sysLockBy", sysRefNo);// 一般来说，都是用该功能的主表流水号作为FP时删除的条件
		$.updateProperty(trxData, "sysLockFlag", "T");
	


} else {
	var sysRefNo = $.getStringValue(trxData, "refNo");
	$.updateProperty(trxData, "sysRefNo", sysRefNo);
	$.print("------sysRefNo-------" + sysRefNo);
}

$.print("------L_P_000093.js end-------");
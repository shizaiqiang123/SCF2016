$.print("------L_P_000095.js begin-------");

var trxData = $.trxData;
$.print("------trxData--------" + trxData);

var funcType = $.getFuncType();
$.print("------funcType--------" + funcType);
if ("RE" != funcType) {
	var sysRefNo = $.getStringValue(trxData, "sysRefNo");
	$.print("------sysRefNo-------" + sysRefNo);

	var marginCompen = $.getAmtValue(trxData, "marginCompen");
	$.print("------marginCompen-------" + marginCompen);

	var billM = $.queryTable("BillM", "sysRefNo", [ sysRefNo ]);
	$.print("------billM-------" + billM);

	/*var exMarginBal = $
			.getAmtValue(billM.get("data").get(0), "marginBal");
	$.print("------exMarginBal-------" + exMarginBal);

	var marginBal = $.addAmt(exMarginBal, marginCompen);
	$.print("------marginBal-------" + marginBal);*/
	
	var marginBal = $.getAmtValue(trxData, "marginBal");
	$.print("------marginBal-------" + marginBal);
	
	$.updateProperty(trxData, "sysRefNo", sysRefNo);
	$.updateProperty(trxData, "marginCompen", marginCompen);
	$.updateProperty(trxData, "marginBal", marginBal);
	
	var trxJsonData = $.orgnAllData;//四层数据结构所有记录
	var trxDomData = $.getTrxDomData();//所有交易数据
	var sysRefNo = $.getStringValue(trxDomData,"sysRefNo");
	$.updateProperty(trxData,"sysLockBy",sysRefNo);//一般来说，都是用该功能的主表流水号作为FP时删除的条件
	$.updateProperty(trxData,"sysLockFlag","T");
	
} else {
	var billNo = $.getStringValue(trxData, "billNo");
	$.print("------billNo-------" + billNo);

	var billM = $.queryTable("BillM", "billNo", [ billNo ]);
	$.print("------billM-------" + billM);

	var sysRefNo = $
			.getStringValue(billM.get("data").get(0), "sysRefNo");
	$.print("------sysRefNo-------" + sysRefNo);
	
	$.updateProperty(trxData, "sysRefNo", sysRefNo);
}

$.print("------L_P_000095.js end-------");
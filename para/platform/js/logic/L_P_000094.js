$.print("------L_P_000094.js begin-------");

var trxData = $.trxData;
$.print("------trxData--------" + trxData);

var funcType = $.getFuncType();
$.print("------funcType--------" + funcType);
if ("RE" != funcType) {
	var sysRefNo = $.getStringValue(trxData, "sysRefNo");
	$.print("------sysRefNo-------" + sysRefNo);
	
	var billRefNo = $.getStringValue(trxData, "sysRefNo");
	$.print("------billRefNo-------" + billRefNo);
	
	var loanId = $.getStringValue(trxData, "loanId");
	$.print("------loanId-------" + loanId);
	
	var cntrctNo = $.getStringValue(trxData, "cntrctNo");
	$.print("------cntrctNo-------" + cntrctNo);
	
	var billNo = $.getStringValue(trxData, "billNo");
	$.print("------billNo-------" + billNo);
	
	var refNo = $.getStringValue(trxData, "refNo");
	$.print("------refNo-------" + refNo);
	
	var billValDt = $.getStringValue(trxData, "billValDt");
	$.print("------billValDt-------" + billValDt);
	
	var billDueDt = $.getStringValue(trxData, "billDueDt");
	$.print("------billDueDt-------" + billDueDt);
	
	var marginCompen = $.getAmtValue(trxData, "marginCompen");
	$.print("------marginCompen-------" + marginCompen);

	var billM = $.queryTable("BillM", "sysRefNo", [ billRefNo ]);
	$.print("------billM-------" + billM);

	/*var exMarginBal = $
			.getAmtValue(billM.get("data").get(0), "marginBal");
	$.print("------exMarginBal-------" + exMarginBal);

	var marginBal = $.addAmt(exMarginBal, marginCompen);
	$.print("------marginBal-------" + marginBal);
	*/
	var marginBal = $.getAmtValue(trxData, "marginBal");
	$.print("------marginBal-------" + marginBal);
	
	$.updateProperty(trxData, "sysRefNo", sysRefNo);
	$.updateProperty(trxData, "marginBal", marginBal);
	$.updateProperty(trxData, "marginCompen", marginCompen);
	$.updateProperty(trxData, "loanId", loanId);
	$.updateProperty(trxData, "cntrctNo", cntrctNo);
	$.updateProperty(trxData, "billNo", billNo);
	$.updateProperty(trxData, "refNo", refNo);
	$.updateProperty(trxData, "billValDt", billValDt);
	$.updateProperty(trxData, "billDueDt", billDueDt);
	
	var trxJsonData = $.orgnAllData;//四层数据结构所有记录
	var trxDomData = $.getTrxDomData();//所有交易数据
	var sysRefNo = $.getStringValue(trxDomData,"sysRefNo");
	$.updateProperty(trxData,"sysLockBy",sysRefNo);//一般来说，都是用该功能的主表流水号作为FP时删除的条件
	$.updateProperty(trxData,"sysLockFlag","T");
	
} else {
	var sysRefNo = $.getStringValue(trxData, "sysRefNo");
	$.print("------sysRefNo-------" + sysRefNo);
	$.updateProperty(trxData, "sysRefNo", sysRefNo);
}

$.print("------L_P_000094.js end-------");
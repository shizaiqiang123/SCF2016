$.print("------L_P_000092.js begin-------");
var trxData = $.trxData;

var funcType = $.getFuncType();
$.print("------funcType--------" + funcType);
if ("RE" != funcType) {
	var sysRefNo = $.getStringValue(trxData, "sysRefNo");
	$.print("------sysRefNo-------" + sysRefNo);

	var goodsCata = $.getStringValue(trxData, "goodsCata");
	$.print("------goodsCata-------" + goodsCata);

	var subCata = $.getStringValue(trxData, "subCata");
	$.print("------subCata-------" + subCata);

	var goodsId = $.getStringValue(trxData, "goodsId");
	$.print("------goodsId-------" + goodsId);

	var goodsNm = $.getStringValue(trxData, "goodsNm");
	$.print("------goodsNm-------" + goodsNm);

	var ccy = $.getStringValue(trxData, "ccy");
	$.print("------ccy-------" + ccy);

	var selId = $.getStringValue(trxData, "selId");
	$.print("------selId-------" + selId);

	var buyerId = $.getStringValue(trxData, "buyerId");
	$.print("------buyerId-------" + buyerId);

	var loanId = $.getStringValue(trxData, "loanId");
	$.print("------loanId-------" + loanId);

	var cntrctNo = $.getStringValue(trxData, "cntrctNo");
	$.print("------cntrctNo-------" + cntrctNo);

	var producer = $.getStringValue(trxData, "producer");
	$.print("------producer-------" + producer);

	var refNo = $.getStringValue(trxData, "sysRefNo");
	$.print("------refNo-------" + refNo);

	var poLoanNum = $.getAmtValue(trxData, "poLoanNum");
	$.print("------poLoanNum-------" + poLoanNum);

	var poLoanAmt = $.getAmtValue(trxData, "poLoanAmt");
	$.print("------poLoanAmt-------" + poLoanAmt);

	$.updateProperty(trxData, "sysRefNo", sysRefNo);
	$.updateProperty(trxData, "refNo", refNo);
	$.updateProperty(trxData, "goodsCata", goodsCata);
	$.updateProperty(trxData, "subCata", subCata);
	$.updateProperty(trxData, "goodsId", goodsId);
	$.updateProperty(trxData, "goodsNm", goodsNm);
	$.updateProperty(trxData, "ccy", ccy);
	$.updateProperty(trxData, "selId", selId);
	$.updateProperty(trxData, "buyerId", buyerId);
	$.updateProperty(trxData, "loanId", loanId);
	$.updateProperty(trxData, "cntrctNo", cntrctNo);
	$.updateProperty(trxData, "producer", producer);
	$.updateProperty(trxData, "poLoanNum", poLoanNum);
	$.updateProperty(trxData, "poLoanAmt", poLoanAmt);
	
	var trxJsonData = $.orgnAllData;//四层数据结构所有记录
	var trxDomData = $.getTrxDomData();//所有交易数据
	var sysRefNo = $.getStringValue(trxDomData,"sysRefNo");
	$.updateProperty(trxData,"sysLockBy",sysRefNo);//一般来说，都是用该功能的主表流水号作为FP时删除的条件
	$.updateProperty(trxData,"sysLockFlag","T");

	
}else{
	var sysRefNo = $.getStringValue(trxData, "sysRefNo");
	$.print("------sysRefNo-------" + sysRefNo);
	$.updateProperty(trxData, "sysRefNo", sysRefNo);
}


$.print("------L_P_000092.js end-------");
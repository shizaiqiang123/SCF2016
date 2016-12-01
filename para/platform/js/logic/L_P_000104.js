$.print("********account mapping begin*************************");

$.print("------L_P_000104.js begin-------");
var trxData = $.trxData;
$.print("------trxData--------" + trxData);
var funcType = $.getFuncType();
$.print("------funcType--------" + funcType);
if ("RE" != funcType) {
//	var sysRefNo = $.getUUID();
	var sysRefNo = $.getStringValue(trxData, "sysRefNo");
	$.print("------sysRefNo-------" + sysRefNo);
	$.updateProperty(trxData, "sysRefNo", sysRefNo);
	//new 
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

$.print("------L_P_000104.js end-------");

$.print("********account mapping end*************************");
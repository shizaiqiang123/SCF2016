$.print("------L_P_000091.js begin-------");

var trxData = $.trxData;
var sysRefNo = $.getSysRefNo("operatingIncome","settleAccountRefNo");
$.print("------sysRefNo-------" + sysRefNo);
var cntrctNo = $.getStringValue(trxData, "cntrctNo");
$.print("------cntrctNo-------" + cntrctNo);
var goodsId = $.getStringValue(trxData, "goodsId");
$.print("------goodsId-------" + goodsId);
var goodsNm = $.getStringValue(trxData, "goodsNm");
$.print("------goodsNm-------" + goodsNm);
var isMortgage = $.getStringValue(trxData, "isMortgage");
$.print("------isMortgage-------" + isMortgage);
var note = $.getStringValue(trxData, "note");
$.print("------note-------" + note);
$.updateProperty(trxData, "sysRefNo", sysRefNo);
$.updateProperty(trxData, "cntrctNo", cntrctNo);
$.updateProperty(trxData, "goodsId", goodsId);
$.updateProperty(trxData, "goodsNm", goodsNm);
$.updateProperty(trxData, "isMortgage", isMortgage);
$.updateProperty(trxData, "note", note);

$.print("------L_P_000091.js end-------");
$.print("********test begin*************************");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"cntrctNo");
$.updateTrxProperty("sysRefNo",sysRefNo);

$.print("********test end*************************");
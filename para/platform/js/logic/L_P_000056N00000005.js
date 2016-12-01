$.print("********test begin*************************");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"selId");
$.updateTrxProperty("sysRefNo",sysRefNo);

$.print("********test end*************************");
$.print("********test begin*************************");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"invRef");
$.updateProperty(trxData,"sysRefNo",sysRefNo);

$.print("********test end*************************");
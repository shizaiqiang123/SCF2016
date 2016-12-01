$.print("********account mapping begin*************************");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"sysRefNo",sysRefNo);

$.print("********account mapping end*************************");
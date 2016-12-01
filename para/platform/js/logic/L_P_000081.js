$.print("********account mapping begin*************************");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"sbrNo");
$.updateProperty(trxData,"sysRefNo",sysRefNo);
$.print("********account mapping end*************************");
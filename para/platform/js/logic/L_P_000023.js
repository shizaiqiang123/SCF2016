$.print("********account mapping begin*************************");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"userId","test");

$.print("********account mapping end*************************");
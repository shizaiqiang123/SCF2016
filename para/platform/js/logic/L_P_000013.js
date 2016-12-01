$.print("********account mapping begin*************************");

var trxData = $.trxData;
var invNo = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"sysRefNo",invNo);

$.print("********account mapping end*************************");
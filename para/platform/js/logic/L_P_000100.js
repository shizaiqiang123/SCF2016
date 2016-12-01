$.print("********account mapping begin*************************");

var trxData = $.trxData;
var patnerId = $.getStringValue(trxData,"patnerId");
$.updateProperty(trxData,"sysRefNo",patnerId);



$.print("********account mapping end*************************");
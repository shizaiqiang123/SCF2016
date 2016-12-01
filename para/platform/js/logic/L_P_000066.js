$.print("********account mapping begin*************************");

var trxData = $.trxData;
var no = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"sysRefNo",no);



$.print("********account mapping end*************************");
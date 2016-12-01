$.print("********account mapping begin*************************");

var trxData = $.trxData;
var buyerId = $.getStringValue(trxData,"buyerId");
$.updateProperty(trxData,"sysRefNo",buyerId);

$.print("********account mapping end*************************");
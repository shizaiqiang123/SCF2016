$.print("********account mapping begin*************************");

var trxData = $.trxData;
var buyerId = $.getStringValue(trxData,"buyerId");
var sysRefNo = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"sysRefNoHD",sysRefNo);
$.updateProperty(trxData,"sysRefNo",buyerId);

$.print("********account mapping end*************************");
$.print("********account mapping begin*************************");

var trxData = $.trxData;
$.print(trxData);
var buyerId = $.getStringValue(trxData,"buyerId");
var sysRefNo = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"sysRefNoHD",sysRefNo);
$.updateProperty(trxData,"sysRefNo",buyerId);
$.print(trxData);


$.print("********account mapping end*************************");
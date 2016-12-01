$.print("********account mapping begin*************************");

var trxData = $.trxData;
var pmtId = $.getStringValue(trxData,"pmtId");
$.updateProperty(trxData,"sysRefNo",pmtId);



$.print("********account mapping end*************************");
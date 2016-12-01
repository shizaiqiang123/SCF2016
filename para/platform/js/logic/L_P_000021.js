$.print("********account mapping begin*************************");

var trxData = $.trxData;
var linkInvRef = $.getStringValue(trxData,"linkInvRef");
$.updateProperty(trxData,"sysRefNo",linkInvRef);

$.print("********account mapping end*************************");
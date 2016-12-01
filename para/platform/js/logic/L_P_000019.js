$.print("********mapping begin*************************");

var trxData = $.trxData;
var id = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"acOwnerid",id);

$.print("********mapping end*************************");
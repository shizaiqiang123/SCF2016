$.print("********reg user log mapping begin*************************");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"userLogRef");

$.updateProperty(trxData,"sysRefNo",sysRefNo);

$.print("********reg user log mapping end*************************");
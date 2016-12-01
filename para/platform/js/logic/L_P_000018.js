$.print("********mapping begin*************************");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"sysRefNo",sysRefNo);

var id = $.getStringValue(trxData,"id");
$.updateProperty(trxData,"paraId",id);

var paraName = $.getStringValue(trxData,"name");
$.updateProperty(trxData,"paraName",paraName);

var paraDesc = $.getStringValue(trxData,"desc");
$.updateProperty(trxData,"paraDesc",paraDesc);

var paraBu = $.getStringValue(trxData,"bu");
$.updateProperty(trxData,"paraBu",paraBu);

$.print("********mapping end*************************");
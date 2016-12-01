$.print("********account mapping begin*************************");

var trxData = $.trxData;
var cntrctNo = $.getStringValue(trxData,"cntrctNo");
$.updateProperty(trxData,"sysRefNo",cntrctNo);



$.print("********account mapping end*************************");
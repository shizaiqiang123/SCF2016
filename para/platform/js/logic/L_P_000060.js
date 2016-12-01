$.print("********reg user role mapping begin*************************");

var trxData = $.trxData;

var acRefNo = $.getStringValue(trxData,"acRefNo");

$.updateProperty(trxData,"sysRefNo",acRefNo);

$.print("********reg user role mapping end*************************");
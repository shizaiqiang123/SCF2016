$.print("********test begin*************************");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"invcLoanRef");
$.updateTrxProperty("sysRefNo",sysRefNo);

$.print("********test end*************************");
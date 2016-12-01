$.print("********test begin*************************");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"loanId");
$.updateTrxProperty("sysRefNo",sysRefNo);

$.print("********test end*************************");
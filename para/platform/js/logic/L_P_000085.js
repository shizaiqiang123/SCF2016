$.print("********account mapping begin*************************");

var trxData = $.trxData;
var invRef = $.getStringValue(trxData,"invcLoanRefNo");
$.updateProperty(trxData,"sysRefNo",invRef);

$.print("********account mapping end*************************");
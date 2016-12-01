$.print("********account mapping begin*************************");

var trxData = $.trxData;
//var invc = $.getObject(trxData,'invc');
var invRef = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"sysRefNo",invRef);

$.print("********account mapping end*************************");
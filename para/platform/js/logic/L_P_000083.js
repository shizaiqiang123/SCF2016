$.print("********account mapping begin*************************");

var trxData = $.trxData;
var invRef = $.getStringValue(trxData,"sysRefNo");
if(invRef ==""){
	$.setLogicNodeEnable("false");
}else{
	$.updateProperty(trxData,"sysRefNo",invRef);
}

$.print("********account mapping end*************************");
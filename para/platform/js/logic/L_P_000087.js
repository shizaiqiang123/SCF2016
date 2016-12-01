$.print("********account mapping begin*************************");

var trxData = $.trxData;
var busiTp = $.getStringValue(trxData,"busiTp");
if(busiTp != ""){
	$.setLogicNodeEnable("false");
}else{
	var invRef = $.getStringValue(trxData,"sysRefNo");
	$.updateProperty(trxData,"sysRefNo",invRef);
}

$.print("********account mapping end*************************");
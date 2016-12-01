$.print("********account mapping begin*************************");
var trxData = $.trxData;

////添加busiUnit 如果不是审核通过意见，则不执行逻辑流
var signSts=$.getStringValue(trxObj,'signSts');
if(signSts!="1"){
	$.setLogicNodeEnable("false");
}
else {
//	var sysBusiUnit=$.getStringValue(trxObj,'sysBusiUnit');
//	$.updateProperty(trxObj,'busiUnit',sysBusiUnit);
}
$.print("********account mapping end*************************");
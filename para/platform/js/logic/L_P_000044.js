$.print("********account mapping begin*************************");
var trxObj = $.trxData;
var signSts=$.getStringValue(trxObj,'signSts');
//如果不是审核通过意见，则不执行逻辑流
if(signSts!="1"){
	$.setLogicNodeEnable("false");
}
else {
//	var licenceNo=$.getStringValue(trxObj,'licenceNo');
//	var sysRefNo = $.queryCustImpRefNo(licenceNo);
//	$.updateProperty(trxObj,'sysRefNo',sysRefNo);
}
$.print("********account mapping end*************************");
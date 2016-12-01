$.print("********account mapping begin*************************");
var trxObj = $.trxData;
var signSts=$.getStringValue(trxObj,'signSts');
//如果不是审核通过意见，则不执行逻辑流
if(signSts!="1"){
	$.setLogicNodeEnable("false");
}
else {
	var userId=$.getStringValue(trxObj,'sysRefNo');
	var sysRefNo = $.queryUserRoleInfo(userId);
	$.updateProperty(trxObj,'sysRefNo',sysRefNo);
}
$.print("********account mapping end*************************");
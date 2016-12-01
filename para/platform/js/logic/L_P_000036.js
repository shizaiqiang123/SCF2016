$.print("********account mapping begin*************************");
var trxObj=$.trxData;
var signSts=$.getStringValue(trxObj,"signSts");
if(signSts == '2'){
	$.setLogicNodeEnable("false");
}
$.print("********account mapping end*************************");
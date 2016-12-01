$.print("********account mapping begin*************************");

var trxData = $.trxData;

var controlSts = $.getStringValue(trxData,"controlSts"); 
//如果不是点销，不操作该逻辑流
if(controlSts!="1"){
	$.setLogicNodeEnable("false");
}else{
	var loanId = $.getStringValue(trxData,"loanId");
	$.updateProperty(trxData,"sysRefNo",loanId);
}




$.print("********account mapping end*************************");
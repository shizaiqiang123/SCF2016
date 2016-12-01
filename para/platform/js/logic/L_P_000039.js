$.print("---------begin round 1------------");

var trxData = $.trxData;
var controlSts=$.getStringValue(trxObj,'controlSts');
if(controlSts=="1"){
	$.updateProperty(trxData,"compSts",'1');
}else{
	$.updateProperty(trxData,"compSts",'2');
}

$.print("---------end------------");
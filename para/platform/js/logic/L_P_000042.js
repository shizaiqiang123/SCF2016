$.print("********account mapping begin*************************");
var trxData = $.trxData;
var controlSts = $.getStringValue(trxData,"controlSts"); 
//如果不是点销，不对pmt表数据操作
if(controlSts!="1"){
	$.setLogicNodeEnable("false");
}

$.print("********account mapping end*************************");
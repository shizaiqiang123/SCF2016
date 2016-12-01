$.print("---------begin round 2------------");
var funcType = $.getFuncType();
$.print("funcType is:"+funcType);

if("RE"!=funcType){
	var sysEventTimes=$.getMaxEventTimes();
	sysEventTimes++;
	$.print(sysEventTimes);

	var trxData = $.trxData;
	$.print(trxData);
	$.updateProperty(trxData,"sysEventTimes",sysEventTimes);
	$.print(trxData);
//	$.updateTrxProperty("sysEventTimes",sysEventTimes);
}
$.print("---------end------------");
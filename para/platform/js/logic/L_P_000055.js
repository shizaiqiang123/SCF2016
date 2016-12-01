$.print("********account mapping begin*************************");
var trxData=$.trxData;
var sysRelReason=$.getStringValue(trxData,"sysRelReason");
var OldSysRelReason=$.getStringValue(trxData,"OldSysRelReason");
var userName=$.getStringValue(trxData,"userName");
if (sysRelReason!=null&&sysRelReason!=""){
	sysRelReason=OldSysRelReason+userName+" :"+sysRelReason+" 。"+"\n";
}else{
	sysRelReason=OldSysRelReason;
}
$.updateProperty(trxData,"sysRelReason",sysRelReason);
$.print("********account mapping end*************************");
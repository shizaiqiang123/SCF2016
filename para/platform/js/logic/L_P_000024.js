$.print("********account mapping begin*************************");

var trxData = $.trxData;
var sysRefNo=$.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"theirRefhd",sysRefNo);
var buyerId = $.getStringValue(trxData,"buyerId");
$.updateProperty(trxData,"sysRefNo",buyerId);
var lmtHD=$.getAmtValue(trxData,"lmtHD");
var lmtAllocate=0;
var lmtRecover=0;
var lmtFlg='';
if(lmtHD>=0){
	//lmtHD=$.subAmt(0,lmtHD);
	lmtRecover=lmtHD;
	$.updateProperty(trxData,"lmtFlg",'1');
	$.updateProperty(trxData,"lmtRecover",lmtHD);
}else{	
	lmtAllocate=0-lmtHD;
	$.updateProperty(trxData,"lmtAllocate",lmtAllocate);
	$.updateProperty(trxData,"lmtFlg",'0');
}

$.print("********account mapping end*************************");
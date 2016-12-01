$.print("********account mapping begin*************************");
var trxData = $.trxData;

var controlSts = $.getStringValue(trxData,"controlSts"); 
//如果不是点销，不操作该逻辑流
if(controlSts!="1"){
	$.setLogicNodeEnable("false");
}else{
	var cntrctNo = $.getStringValue(trxData,"cntrctNo");
	$.updateProperty(trxData,"sysRefNo",cntrctNo);
	
	var IncomeM = $.queryTable("IncomeM","sysRefNo",[cntrctNo]);
	var incomeAmt = $.amtFormatByObj(0);//营业外收益总金额
	var currIncomeAmt = $.getAmtValue(trxData,"subAmt");//本次营业外收益金额
	var incomeFlag =$.getStringValue(trxData,"incomeFlag");
	if(!$.isNull(IncomeM.get("data"))){
		incomeAmt = $.getAmtValue(IncomeM.get("data").get(0),"incomeAmt");
	}
	if(incomeFlag!="1"){//收益类型0.营业外收入 1.营业外支出
		incomeAmt = $.addAmt(incomeAmt,currIncomeAmt);
	}else{
		incomeAmt = $.subAmt(incomeAmt,currIncomeAmt);
	}
	
	var pmtId = $.getStringValue(trxData,"pmtId");
	$.updateProperty(trxData,"theirRef",pmtId);
	
	$.updateProperty(trxData,"incomeAmt",incomeAmt);
	
	$.updateProperty(trxData,"currIncomeAmt",currIncomeAmt);
	
	$.updateProperty(trxData,"remark","");
	
	$.updateProperty(trxData,"selAcNo","");
	
	$.updateProperty(trxData,"selAcNm","");
	
	$.updateProperty(trxData,"selAcBkNm","");

}

$.print("********account mapping end*************************");
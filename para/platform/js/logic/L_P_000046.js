$.print("********account mapping begin*************************");
var trxData = $.trxData;
var pmtId = $.getStringValue(trxData,"pmtId");
var selAcNoHD = $.getStringValue(trxData,"selAcNoHD");
$.updateProperty(trxData,"sysRefNo",pmtId);
$.updateProperty(trxData,"currFinPayCost",0);
$.updateProperty(trxData,"selAcNo",selAcNoHD);
$.updateProperty(trxData,"remark","");


//计算费用
var finChgrt = $.getAmtValue(trxData,"finChgrt");//费率
	finChgrt =$.multAmt(finChgrt,0.01);
var ttlLoanAmt = $.getAmtValue(trxData,"ttlLoanAmt");//借款金额
var pmtTimes = $.getIntegerValue(trxData,"pmtTimes");//还款次数
if(pmtTimes==0){// 只有第一次还款的时候才算费用
	pmtTimes = 1;
	var currFinCost = $.multAmt(ttlLoanAmt,finChgrt);// 应收费用=借款金额*费率
	currFinCost = $.round(currFinCost,2);//保留两位小数
	$.updateProperty(trxData,"currFinCost",currFinCost);
}else{
	pmtTimes = $.addInteger(pmtTimes,"1");
	$.updateProperty(trxData,"currFinCost",0);
}
$.updateOrgnData("pmtTimes",pmtTimes);

$.print("********account mapping end*************************");
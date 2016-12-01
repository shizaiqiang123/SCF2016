$.print("********account mapping begin*************************");


var trxData = $.trxData;
var cntrctNo = $.getStringValue(trxData,"cntrctNo");// 协议编号
var ttlLoanAmt = $.getAmtValue(trxData,"ttlLoanAmt");// 借款金额
var CntrctM = $.queryTable("CntrctM","sysRefNo",[cntrctNo]);// 根据协议编号查询协议信息
var arAvalLoan = $.getAmtValue(CntrctM.get("data").get(0),"arAvalLoan");// 融资额度
var openLoanAmt = $.getAmtValue(trxData,"openLoanAmt");// 原融资余额
var canAmt = $.subAmt(arAvalLoan,openLoanAmt);//可融资额度=融资额度-原融资余额
var subAmt = $.subAmt(canAmt,ttlLoanAmt);
if(subAmt>=0){
//	$.updateProperty(trxData,"arAvalLoan",subAmt);// 应收账款可融资余额=原应收账款可融资余额-借款金额
	openLoanAmt = $.addAmt(openLoanAmt,ttlLoanAmt);// 融资余额=原融资余额+借款金额
	$.updateProperty(trxData,"openLoanAmt",openLoanAmt);
	$.updateProperty(trxData,"finaSts","1");
	$.updateOrgnData("finaSts","1");//因为是需要带到主表计算的，故调用此方法
	$.updateOrgnData("advaPaytype","2");//放款资金来源(暂时给一个默认值)
	$.updateProperty(trxData,"sysRefNo",cntrctNo);
}else{
	$.throwException("借款金额不能大于可融资额度！");
}



$.print("********account mapping end*************************");
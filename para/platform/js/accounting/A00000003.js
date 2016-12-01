$.print("********account mapping begin*************************");

var trxData = $.getData();
var trxAmt = $.getAmtValue(trxData,"ttlLoanAmt");//融资总金额
var ccy = $.getStringValue(trxData,"ccy");//币别
var selAcNo = $.getStringValue(trxData,"selAcNo");//扣款账号
//var intAmt = $.getStringValue(trxData,"intAmt");//利息金额
//var subAmt=trxAmt-currFinPayCost-intAmt;
//var subAmt=$.subAmt(trxAmt,currFinPayCost);
//subAmt=$.subAmt(subAmt,intAmt);

var debit = $.createDebitSubject();
$.setAccountNo(debit,'Factoring_Advance');
$.setAmt(debit,trxAmt);
$.setCcy(debit,ccy);
$.setExchRate(debit,1);
$.addSubject(debit)
$.print("********debit 1 end*************************");

/*var credit = $.createCreditSubject();
$.setAccountNo(credit,'Factoring_Deposit');
$.setAmt(credit,subAmt);//金额
$.setCcy(credit,ccy);//币别
$.setExchRate(credit,1);//汇率
$.addSubject(credit)
$.print("********credit 1 end*************************");*/

var creditIntAmt = $.createCreditSubject();//利息
$.setAccountNo(creditIntAmt,'Factoring_Interest');
$.setAmt(creditIntAmt,trxAmt);//金额
$.setCcy(creditIntAmt,ccy);//币别
$.setExchRate(creditIntAmt,1);//汇率
$.addSubject(creditIntAmt)
$.print("********creditIntAmt end*************************");

/*var creditCost = $.createCreditSubject();
$.setAccountNo(creditCost,"Factoring_Fee");
//$.setAccountNoFormForm(creditCost,selAcNo,Factoring_Fee);
$.setAmt(creditCost,currFinPayCost);//金额
$.setCcy(creditCost,ccy);//币别
$.setExchRate(creditCost,1);//汇率
$.addSubject(creditCost)
$.print("********creditCost end*************************");*/

$.print("********account mapping end*************************");
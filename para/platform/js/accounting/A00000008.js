$.print("********account mapping begin*************************");

var trxData = $.getData();
var trxAmt = $.getAmtValue(trxData,"ttlLoanAmt");
var ccy = $.getStringValue(trxData,"ccy");

var debit = $.createDebitSubject();
$.setAccountNo(debit,'Factoring_Deposit');
$.setAmt(debit,trxAmt);
$.setCcy(debit,ccy);
$.setExchRate(debit,'1.0');
$.addSubject(debit);
$.print("********debit 1 end*************************");

var credit = $.createCreditSubject();
$.setAccountNo(credit,'Factoring_Advance');
$.setAmt(credit,trxAmt);//金额
$.setCcy(credit,ccy);//币别
$.setExchRate(credit,'1.0');//汇率
$.addSubject(credit);
$.print("********credit 1 end*************************");

$.print("********account mapping end*************************");
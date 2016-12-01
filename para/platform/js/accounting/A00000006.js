$.print("********account mapping begin*************************");

var trxData = $.getData();
var trxAmt = $.getAmtValue(trxData,"ttlLoanAmt");

var debit = $.createDebitSubject();
$.setAccountNo(debit,'Short_term');
$.setAmt(debit,trxAmt);
$.setCcy(debit,'CNY');
$.setExchRate(debit,'1.0');
$.addSubject(debit)
$.print("********debit 1 end*************************");

var credit = $.createCreditSubject();
$.setAccountNo(credit,'Linkage_deposit');
$.setAmt(credit,trxAmt);//金额
$.setCcy(credit,'CNY');//币别
$.setExchRate(credit,'1.0');//汇率
$.addSubject(credit)
$.print("********credit 1 end*************************");

$.print("********account mapping end*************************");
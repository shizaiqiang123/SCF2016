 $.print("********account mapping begin*************************");

var trxData = $.getData();
//var verPmtAmt = $.getAmtValue(trxData,"verPmtAmt");
var ttlPmtAmt = $.getAmtValue(trxData,"ttlPmtAmt");
//var payBillAmt = $.getAmtValue(trxData,"payBillAmt");
//var payTranAmt = $.getAmtValue(trxData,"payTranAmt");

var debit = $.createDebitSubject();
$.setAccountNo(debit,'Factoring_Receivable');
$.setAmt(debit,ttlPmtAmt);
$.setCcy(debit,'CNY');
$.setExchRate(debit,'1.0');
$.addSubject(debit);
$.print("********debit 1 end*************************");

var credit = $.createCreditSubject();
$.setAccountNo(credit,'Factoring_Payable');
$.setAmt(credit,ttlPmtAmt);//金额
$.setCcy(credit,'CNY');//币别
$.setExchRate(credit,'1.0');//汇率
$.addSubject(credit);
$.print("********credit 2 end*************************"); 
//
//var credit = $.createCreditSubject();
//$.setAccountNo(credit,'Factoring_Advance');
//$.setAmt(credit,payTranAmt);//金额
//$.setCcy(credit,'CNY');//币别
//$.setExchRate(credit,'1.0');//汇率
//$.addSubject(credit);
//$.print("********credit 3 end*************************"); 


$.print("********account mapping end*************************");
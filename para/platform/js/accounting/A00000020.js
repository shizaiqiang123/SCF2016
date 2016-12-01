$.print("********account mapping begin*************************");

var trxData = $.getData();
var payPrinAmt = $.getAmtValue(trxData,"marginAmt");//本次入池金额
var ccy = $.getStringValue(trxData,"ccy");//币别
var sysRefNo = $.getStringValue(trxData,"sysRefNo");

var debit = $.createDebitSubject();
$.setAccountNo(debit,'Factoring_Receivable');
$.setAmt(debit,payPrinAmt);
$.setCcy(debit,ccy);
$.setRelRefNo(debit,sysRefNo);
$.addSubject(debit);
$.print("********debit 1 end*************************");

var credit = $.createCreditSubject();
$.setAccountNo(credit,'Factoring_Payable');
$.setAmt(credit,payPrinAmt);//金额
$.setCcy(credit,ccy);//币别
$.setRelRefNo(debit,sysRefNo);
$.addSubject(credit);
$.print("********credit 1 end*************************");

$.print("********account mapping end*************************");
$.print("********account mapping begin*************************");

var trxData = $.getData();
var ttlCbkAmt = $.getAmtValue(trxData,"ttlCbkAmt");//待转让金额
var ccy = $.getStringValue(trxData,"ccy");//币别
var sysRefNo = $.getStringValue(trxData,"sysRefNo");

var debit = $.createDebitSubject();
$.setAccountNo(debit,'Factoring_Receivable');
$.setAmt(debit,ttlCbkAmt);
$.setCcy(debit,ccy);
$.setRelRefNo(debit,sysRefNo);
$.addSubject(debit);
$.print("********debit 1 end*************************");

var credit = $.createCreditSubject();
$.setAccountNo(credit,'Factoring_Payable');
$.setAmt(credit,ttlCbkAmt);//金额
$.setCcy(credit,ccy);//币别
$.setRelRefNo(debit,sysRefNo);
$.addSubject(credit);
$.print("********credit 1 end*************************");

$.print("********account mapping end*************************");
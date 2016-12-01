$.print("********account mapping begin*************************");

var trxData = $.getData();
var regAmt = $.getAmtValue(trxData,"outAmt");//待转让金额
var ccy = $.getStringValue(trxData,"outCcy");//币别
var sysRefNo = $.getStringValue(trxData,"sysRefNo");//申请编号

var debit = $.createDebitSubject();
$.setAccountNo(debit,'Account_Balance_D');//借
$.setAmt(debit,regAmt);
$.setCcy(debit,ccy);
$.setRelRefNo(debit,sysRefNo);
$.addSubject(debit)
$.print("********debit 1 end*************************");

var credit = $.createCreditSubject();
$.setAccountNo(credit,'Account_Balance_C');//贷
$.setAmt(credit,regAmt);//金额
$.setCcy(credit,ccy);//币别
$.setRelRefNo(credit,sysRefNo);
$.addSubject(credit)
$.print("********credit 1 end*************************");

$.print("********account mapping end*************************");
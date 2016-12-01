$.print("********account mapping begin*************************");

var debit = $.createDebitSubject();
$.setAccountNo(debit,$.getSysAccountNo('Factoring_Deposit'));
$.setAmt(debit,'10000.00');
$.setCcy(debit,'CNY');
$.setExchRate(debit,'1.0');
$.addSubject(debit)
$.print("********debit end*************************");

var credit = $.createCreditSubject();
$.setAccountNo(credit,$.getSysAccountNo('Factoring_Payable'));
$.setAmt(credit,'8000.00');
$.setCcy(credit,'CNY');
$.setExchRate(credit,'1.0');
$.addSubject(credit)
$.print("********credit 1 end*************************");

var credit = $.createCreditSubject();
$.setAccountNo(credit,$.getSysAccountNo('Factoring_Receivable'));
$.setAmt(credit,'2000.00');
$.setCcy(credit,'CNY');
$.setExchRate(credit,'1.0');
$.addSubject(credit)
$.print("********credit 2 end*************************");

$.print("********account mapping end*************************");
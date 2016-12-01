$.print("********account mapping begin*************************");

var trxData = $.getData();
var regAmt = $.getAmtValue(trxData,"regAmt");//待转让金额
var ccy = $.getStringValue(trxData,"ccy");//币别
var pdgAmt = $.getAmtValue(trxData,"pdgAmt");//手续费
var docketAmt = $.getAmtValue(trxData,"docketAmt");//单据处理费
var sumAmt = $.addAmt(pdgAmt,docketAmt);
var isCollect = $.getStringValue(trxData,"isCollect");
var sysRefNo = $.getStringValue(trxData,"sysRefNo");
var busiTp = $.getStringValue(trxData,"busiTp");

if(isCollect == "Y"){
	var debit = $.createDebitSubject();
	$.setAccountNo(debit,'Factoring_RecFee');
	$.setAmt(debit,sumAmt);
	$.setCcy(debit,ccy);
	$.setRelRefNo(debit,sysRefNo);
	$.addSubject(debit)
	$.print("********debit 1 end*************************");
	
	var credit = $.createCreditSubject();
	$.setAccountNo(credit,'Factoring_PayFee');
	$.setAmt(credit,sumAmt);//金额
	$.setCcy(credit,ccy);//币别
	$.setRelRefNo(debit,sysRefNo);
	$.addSubject(credit)
	$.print("********credit 1 end*************************");
	
}

//if(busiTp == '0'){ //国内有追索权
	var debit = $.createDebitSubject();
	$.setAccountNo(debit,'Factoring_Payable');
	$.setAmt(debit,regAmt);
	$.setCcy(debit,ccy);
	$.setRelRefNo(debit,sysRefNo);
	$.addSubject(debit)
	$.print("********debit 2 end*************************");

	var credit = $.createCreditSubject();
	$.setAccountNo(credit,'Factoring_Receivable');
	$.setAmt(credit,regAmt);//金额
	$.setCcy(credit,ccy);//币别
	$.setRelRefNo(debit,sysRefNo);
	$.addSubject(credit)

/*}else{
	var debit = $.createDebitSubject();
	$.setAccountNo(debit,'Factoring_Receivable');
	$.setAmt(debit,regAmt);
	$.setCcy(debit,ccy);
	$.setRelRefNo(debit,sysRefNo);
	$.addSubject(debit)
	$.print("********debit 2 end*************************");

	var credit = $.createCreditSubject();
	$.setAccountNo(credit,'Factoring_Payable');
	$.setAmt(credit,regAmt);//金额
	$.setCcy(credit,ccy);//币别
	$.setRelRefNo(debit,sysRefNo);
	$.addSubject(credit)

}*/
$.print("********credit 2 end*************************");

$.print("********account mapping end*************************");
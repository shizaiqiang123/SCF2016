$.print("********account mapping begin*************************");

var trxData = $.trxData;
var controlSts = $.getStringValue(trxData,"controlSts"); 
//如果不是点销，不操作该逻辑流
if(controlSts!="1"){
	$.setLogicNodeEnable("false");
}else{
	//添加账号表需要的数据
	var sysRefNo = $.getStringValue(trxData,"sysRefNo");
	var PmtM = $.queryTable("PmtM","sysRefNo",[sysRefNo]);
	var selAcNo = $.getStringValue(PmtM.get("data").get(0),"selAcNo");// 还款账号
	var selId = $.getStringValue(PmtM.get("data").get(0),"selId");
	var CustM = $.queryTable("CustM","sysRefNo",[selId]);
	var licenceNo = $.getStringValue(CustM.get("data").get(0),"licenceNo");//营业执照号

	var CustAc = $.queryTable("CustAc","acNo",[selAcNo]);
	if(!$.isNull(CustAc.get("data"))){
		$.setLogicNodeEnable("false");
	}else{
		var buyerId = $.getStringValue(PmtM.get("data").get(0),"buyerId");
		var selAcNm = $.getStringValue(PmtM.get("data").get(0),"selAcNm");
		var selAcBkNm = $.getStringValue(PmtM.get("data").get(0),"selAcBkNm");
		$.updateProperty(trxData,"acNo",selAcNo);
		$.updateProperty(trxData,"acNm",selAcNm);
		$.updateProperty(trxData,"acBkNm",selAcBkNm);
		$.updateProperty(trxData,"licenceNo",licenceNo);
		$.updateProperty(trxData,"buyerId",buyerId);
		var refNo = $.getTrxRef("");
		$.updateProperty(trxData,"sysRefNo",refNo);
	}

	//添加到费用表需要的数据
	var loanId = $.getStringValue(PmtM.get("data").get(0),"loanId");
	var LoanM = $.queryTable("LoanM","sysRefNo",[loanId]);// 查询融资信息
	var finChgrt = $.getAmtValue(LoanM.get("data").get(0),"finChgrt");//费率
	var pmtTimes = $.getIntegerValue(LoanM.get("data").get(0),"pmtTimes");
	var ttlLoanAmt = $.getAmtValue(LoanM.get("data").get(0),"ttlLoanBal");//借款金额
	$.updateOrgnData("pmtId",sysRefNo);//因为是需要带到其他逻辑流计算的，故调用此方法
	$.updateOrgnData("selId",selId);
	$.updateOrgnData("finChgrt",finChgrt);
	$.updateOrgnData("pmtTimes",pmtTimes);
	$.updateOrgnData("ttlLoanAmt",ttlLoanAmt);

	//更新协议表需要的数据
	var cntrctNo = $.getStringValue(LoanM.get("data").get(0),"cntrctNo");// 协议编号
	var CntrctM = $.queryTable("CntrctM","sysRefNo",[cntrctNo]);
	var payPrinAmt = $.getAmtValue(PmtM.get("data").get(0),"payPrinAmt");// 本次还本金金额
	var openLoanAmt = $.getAmtValue(CntrctM.get("data").get(0),"openLoanAmt");//融资余额
		openLoanAmt = $.subAmt(openLoanAmt,payPrinAmt);
	$.updateOrgnData("cntrctNo",cntrctNo);
	$.updateOrgnData("openLoanAmt",openLoanAmt);

	//更新融资表需要的数据
	var ttlLoanBal = $.getAmtValue(LoanM.get("data").get(0),"ttlLoanBal");//借款余额
	ttlLoanBal = $.subAmt(ttlLoanBal,payPrinAmt);
	var finaSts =1;
	if(ttlLoanBal>0){
		finaSts =2;
	}else{
		finaSts =3;
	}

	var ttlIntAmt = $.getStringValue(LoanM.get("data").get(0),"intAmt");//  利息总金额
	if(!$.isNull(ttlIntAmt)){
		ttlIntAmt = $.getAmtValue(LoanM.get("data").get(0),"intAmt");
	}else{
		ttlIntAmt = 0;
	}
	var payIntAmt = $.getAmtValue(PmtM.get("data").get(0),"payIntAmt");// 本次还利息金额
	ttlIntAmt=$.addAmt(payIntAmt,ttlIntAmt);// 还款总利息金额=原+本次还利息金额 更新回融资表


	$.updateOrgnData("finaSts",finaSts);
	$.updateOrgnData("loanId",loanId);
	$.updateOrgnData("ttlLoanBal",ttlLoanBal);
	$.updateOrgnData("ttlIntAmt",ttlIntAmt);

	//更新还款表需要的数据
	$.updateOrgnData("pmtSts","1");
//	$.updateOrgnData("theirRef",sysRefNo);

}

$.print("********account mapping end*************************");
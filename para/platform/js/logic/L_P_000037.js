$.print("---------begin round 1------------");

var trxData = $.trxData;
var selAcNo = $.getStringValue(trxData,"selAcNo");// 账号(资金流)
var pmtDt = $.getStringValue(trxData,"pmtDt");// 到账日(资金流)
var ttlPmtAmt = $.getAmtValue(trxData,"ttlPmtAmt");// 还款金额(资金流)
var PmtM = $.queryTable("PmtM","selAcNo,pmtDt,ttlPmtAmt,pmtSts,sysTrxSts,sysLockFlag",[selAcNo,pmtDt+":typejava.util.Date",ttlPmtAmt+":typejava.math.BigDecimal",0,"M","F"]);// 查询匹配的资金流
if(!$.isNull(PmtM.get("data"))){
	if(PmtM.get("data").size()>1){
		$.throwException("查到多笔信息流，请转场下！");
	}else{
		var sendUserId = $.getStringValue(PmtM.get("data").get(0),"sysOpId");//为了核销成功发送通知定义的发送人
		$.updateOrgnData("sendUserId",sendUserId);
		
		var loanId = $.getStringValue(PmtM.get("data").get(0),"loanId");
		var LoanM = $.queryTable("LoanM","sysRefNo",[loanId]);// 查询融资信息
		
		var ttlIntAmt = $.getStringValue(LoanM.get("data").get(0),"intAmt");//  利息总金额
		if(!$.isNull(ttlIntAmt)){
			ttlIntAmt = $.getAmtValue(LoanM.get("data").get(0),"intAmt");
		}else{
			ttlIntAmt = 0;
		}
		var payIntAmt = $.getAmtValue(PmtM.get("data").get(0),"payIntAmt");// 本次还利息金额
		ttlIntAmt=$.addAmt(payIntAmt,ttlIntAmt);// 还款总利息金额=原+本次还利息金额 更新回融资表
//		$.updateProperty(trxData,"ttlIntAmt",ttlIntAmt);
		

		var ttlLoanBal = $.getAmtValue(LoanM.get("data").get(0),"ttlLoanBal");//借款余额
		var payPrinAmt = $.getAmtValue(PmtM.get("data").get(0),"payPrinAmt");// 本次还本金金额
		ttlLoanBal = $.subAmt(ttlLoanBal,payPrinAmt);
		var finaSts =1;
		if(ttlLoanBal>0){
			finaSts =2;
		}else{
			finaSts =3;
		}
//		$.updateProperty(trxData,"finaSts",finaSts);//融资状态
//		$.updateProperty(trxData,"pmtSts","1");//还款状态
		
				
		var cntrctNo = $.getStringValue(LoanM.get("data").get(0),"cntrctNo");// 协议编号
		var CntrctM = $.queryTable("CntrctM","sysRefNo",[cntrctNo]);
//		var lmtAmt =  $.getAmtValue(CntrctM.get("data").get(0),"lmtAmt");//信用额度金额
//		var lmtBal =  $.getAmtValue(CntrctM.get("data").get(0),"lmtBal");//信用额度余额
//		var subAmt = $.subAmt(lmtAmt,lmtBal);
//		if(subAmt>0){
//			lmtBal = subAmt;
//		}else{
//			lmtBal = $.addAmt(payPrinAmt,lmtBal);
//		}
		
		var openLoanAmt = $.getAmtValue(CntrctM.get("data").get(0),"openLoanAmt");//融资余额
		openLoanAmt = $.subAmt(openLoanAmt,payPrinAmt);
		
//		var arAvalLoan = $.getAmtValue(CntrctM.get("data").get(0),"arAvalLoan");//应收账款可融资余额
//		arAvalLoan = $.addAmt(arAvalLoan,payPrinAmt);
		
		$.updateOrgnData("compSts",'1');
		
		//更新还款表需要的数据
		$.updateOrgnData("pmtSts","1");
		var theirRef = $.getStringValue(trxData,"sysRefNo");
		$.updateOrgnData("theirRef",theirRef);
		
		//添加账号表需要的数据
		var selId = $.getStringValue(PmtM.get("data").get(0),"selId");
		var CustM = $.queryTable("CustM","sysRefNo",[selId]);
		var licenceNo = $.getStringValue(CustM.get("data").get(0),"licenceNo");//营业执照号
		
		var selAcNoHD = $.getStringValue(PmtM.get("data").get(0),"selAcNo");//信息流账号
		var CustAc = $.queryTable("CustAc","acNo",[selAcNoHD]);
		if(!$.isNull(CustAc.get("data"))){
			$.setLogicNodeEnable("false");
		}else{
			var buyerId = $.getStringValue(PmtM.get("data").get(0),"buyerId");
			var selAcNm = $.getStringValue(PmtM.get("data").get(0),"selAcNm");
			var selAcBkNm = $.getStringValue(PmtM.get("data").get(0),"selAcBkNm");
			$.updateProperty(trxData,"acNo",selAcNoHD);
			$.updateProperty(trxData,"acNm",selAcNm);
			$.updateProperty(trxData,"acBkNm",selAcBkNm);
			$.updateProperty(trxData,"licenceNo",licenceNo);
			$.updateProperty(trxData,"buyerId",buyerId);
			var sysRefNo = $.getTrxRef("");
			$.updateProperty(trxData,"sysRefNo",sysRefNo);
		}
		
		//添加到费用表需要的数据
		var pmtId = $.getStringValue(PmtM.get("data").get(0),"sysRefNo");
		var finChgrt = $.getAmtValue(LoanM.get("data").get(0),"finChgrt");//费率
		var pmtTimes = $.getIntegerValue(LoanM.get("data").get(0),"pmtTimes");
		var ttlLoanAmt = $.getAmtValue(LoanM.get("data").get(0),"ttlLoanBal");//借款金额
		$.updateOrgnData("pmtId",pmtId);//因为是需要带到其他逻辑流计算的，故调用此方法
		$.updateOrgnData("selAcNoHD",selAcNoHD);
		$.updateOrgnData("selId",selId);
		$.updateOrgnData("finChgrt",finChgrt);
		$.updateOrgnData("pmtTimes",pmtTimes);
		$.updateOrgnData("ttlLoanAmt",ttlLoanAmt);
		
		//更新协议表需要的数据
		$.updateOrgnData("cntrctNo",cntrctNo);
		$.updateOrgnData("openLoanAmt",openLoanAmt);
//		$.updateOrgnData("arAvalLoan",arAvalLoan);
//		$.updateOrgnData("lmtBal",lmtBal);
		
		//更新融资表需要的数据
		$.updateOrgnData("finaSts",finaSts);
		$.updateOrgnData("loanId",loanId);
		$.updateOrgnData("ttlLoanBal",ttlLoanBal);
		$.updateOrgnData("ttlIntAmt",ttlIntAmt);
		
	}
	
}else{
	var CustAc = $.queryTable("CustAc","acNo",[selAcNo]);
	if($.isNull(CustAc.get("data"))){
		$.print("---------------------service:S_P_000060");
		$.callService("S_P_000060");
	}else
		{
		$.print("---------------------service:S_P_000057");
		$.callService("S_P_000057");
		}
	$.throwException("该资金流没有匹配的信息流！");	
	
}

$.print("---------end------------");
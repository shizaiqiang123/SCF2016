$.print("------L_P_000090.js begin-------");

var trxData = $.trxData;
if(!$.isNull($.getStringValue(trxData,"sysRefNo"))){
	var sysRefNo = $.getStringValue(trxData,"sysRefNo");
	$.print("------sysRefNo-------"+sysRefNo);
	var cntrctNo = $.getStringValue(trxData,"cntrctNo");
	$.print("------cntrctNo-------"+cntrctNo);
	var goodsId = $.getStringValue(trxData,"goodsId");
	$.print("------goodsId-------"+goodsId);
	var goodsNm = $.getStringValue(trxData,"goodsNm");
	$.print("------goodsNm-------"+goodsNm);
	var isMortgage = $.getStringValue(trxData,"isMortgage");
	$.print("------isMortgage-------"+isMortgage);
	var note = $.getStringValue(trxData,"note");
	$.print("------note-------"+note);
	$.updateProperty(trxData,"sysRefNo",sysRefNo);
	$.updateProperty(trxData,"cntrctNo",cntrctNo);
	$.updateProperty(trxData,"goodsId",goodsId);
	$.updateProperty(trxData,"goodsNm",goodsNm);
	$.updateProperty(trxData,"isMortgage",isMortgage);
	$.updateProperty(trxData,"note",note);
}else{
	$.print("------不执行逻辑流-------");
	$.setLogicNodeEnable("false");
}

$.print("------L_P_000090.js end-------");
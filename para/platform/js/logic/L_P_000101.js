$.print("********account mapping begin*************************");

var trxData = $.trxData;
var priceGoodsId = $.getStringValue(trxData,"priceGoodsId");
$.updateProperty(trxData,"sysRefNo",priceGoodsId);

$.print("********account mapping end*************************");
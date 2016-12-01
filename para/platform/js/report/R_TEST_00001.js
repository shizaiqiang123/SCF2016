$.print("---------begin------------");
var trxData = $.trxData;
var refNo = $.getStringValue(trxData,'sysRefNo');
$.print(refNo);

var buyId = $.getStringValue(trxData,'buyerId');
$.print(buyId);
$.print("---------------------");

$.updateTrxProperty('buyerId','test00001');

var selId = $.getStringValue(trxData,'selId');
$.print(selId);
$.print("---------------------");

$.updateTrxProperty('selId','test00002');

var records = $.createList('records');

for(var i = 1;i<10;i++){
	var record = $.createObject('record');
	$.updateProperty(record,'buyerId','buyer000'+i);
	$.updateProperty(record,'selId','seller000'+i);
	$.updateProperty(record,'sysRefNo','ref000'+i);

	$.appendList(records,record);
	$.print("add record success:"+i);
}
$.updateTrxProperty('records',records);


$.print("---------end------------");
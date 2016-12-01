$.print("---------begin round 1------------");

$.addUpdateField('userId');
$.addUpdateField('sysRefNo');
$.addUpdateField('sysBusiUnit');
$.addUpdateField('sysEventTimes');
var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"userId",sysRefNo);

$.print("---------end------------");
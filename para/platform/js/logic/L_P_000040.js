$.print("---------begin round 1------------");

var trxData = $.trxData;
var sysRefNo = $.getStringValue(trxData,"sysRefNo");
$.updateProperty(trxData,"sysLockFlag","T");
$.updateProperty(trxData,"sysLockBy",sysRefNo);

$.addUpdateField('sysLockFlag');
$.addUpdateField('sysLockBy');

$.print("---------end------------");
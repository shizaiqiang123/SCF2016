$.print("********reg user mapping begin*************************");

var trxData = $.trxData;

var contactPerson= $.getStringValue(trxData,"contactPerson");

$.updateProperty(trxData,"userNm",contactPerson);

$.print("********reg user mapping end*************************");
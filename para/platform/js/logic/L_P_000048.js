$.print("--------测试serverSideJs专用------------");
var CustAc = $.queryTable("CustAc","sysRefNo",["custAc0187"]);

var sysRelId = $.getIntegerValue(CustAc.get("data").get(0),"sysRelId");
$.print("---------sysRelId王磊====================================------------");
$.print("---------sysRelId王磊====================================------------");
$.print("---------sysRelId王磊====================================------------");
$.print("---------sysRelId王磊====================================------------");
$.print(sysRelId);
if($.isNull(sysRelId)){
	$.throwException("O(∩_∩)O哈哈哈~！");	
}
//var shuzu=["wl"];
//var UserInfoM = $.queryTable("UserInfoM","userId",shuzu);
//var sysRefNo = $.getStringValue(UserInfoM.get("data").get(0),"sysRefNo");

$.print("---------end------------");
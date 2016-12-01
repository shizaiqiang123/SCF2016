function beforeLoad() {
	var data = {
		cacheType : 'non',
		reqLoginType : "noLogin"
	};
	return {
		data : data
	};
}


function ignoreToolBar() {

}

function pageOnLoad(data) {
	SCFUtils.loadForm('productDecForm', data);
}

function prevBtnClick(){
	var data={};
	var options = {
		url : SCFUtils.CANCEL,
		data :$.extend({reqPageType:'pre',reqLoginType:"noLogin"},data),
		async : true,
		callBackFun : function(data){
			SCFUtils.requestUrl(data,'noLogin');
			}
	};
	SCFUtils.ajax(options);
}

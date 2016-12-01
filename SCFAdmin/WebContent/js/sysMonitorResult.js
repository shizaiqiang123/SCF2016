function beforeLoad(){
	var data = {};
	data.data = {
		cacheType : 'non'
	};
//	data.sysRefNo=SCFUtils.uuid(8);
	return data;
}

//function pageOnResultLoad(data) {
//	pageOnLoad(data);
//}

//function pageOnReleaseResultLoad(data) {
//	pageOnLoad(data);
//}

//function pageOnLoad(data){
//	var MonitorBox=data.obj.MonitorBox;
//	var MonitorTimeBox=data.obj.MonitorTimeBox;
//	var systemPath=window.document.location.href;
//	var host=window.location.host;
//	var protocol=window.location.protocol;
//	var url=protocol+"//"+host+"/monitoring?graph="+MonitorBox+"&width=900&height=400&period="+MonitorTimeBox;
	
//	$('<c:import url="'+url+'">').appendTo($('#sysResult'));
//	var sysResult = $('#sysResult').load(url);
	
//	$("<jsp:include page='"+url+"'").appendTo(sysResult);
//	location.href="monitoring?graph="+MonitorBox+"&width=900&height=400&period="+MonitorTimeBox;
	//SCFUtils.loadForm('sysMonitorForm', data);
//}
//function  onPrevBtnClick(){
//	debugger;
//}
//function pageOnPreLoad(data){
//	var data = {};
//	data.data = {
//		cacheType : 'non'
//	};
//	return data;
//}
//
//function getContent(page){
//	return '<iframe name="work" src="'+page.url+'?_dc='+$.now()+
//	'" width="100%" height = "100%" frameborder="0" scrolling="none" ></iframe>';	
//}
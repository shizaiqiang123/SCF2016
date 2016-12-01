/*$(function(){
	ajaxBox();	
	var options={};
	options.data = {
			refName: 'UserRef',
			refField:'sysRefNo'
				};
	SCFUtils.getRefNo(options);
});
*/
function beforeLoad(){
	var data = {
		cacheType : 'non'
	};
	return {data:data};
}


function pageOnInt(){
	
	var data=[{"id":'login',"text":"在线","selected":true},{"id":'logoff',"text":"离线"}];
	$('#logType').combobox('loadData',data);
	data=[{"id":'0',"text":"系统级"},
	      {"id":'5',"text":"供应商级"},{"id":'7',"text":"游客级"},{"id":'9',"text":"默认级"}];
	$('#userTp').combobox('loadData',data);
}

function pageOnLoad(data){
	
	SCFUtils.loadForm('userLogForm', data);
	var userIp=$('#userIp').val();
	if(userIp=='0:0:0:0:0:0:0:1'){
		$('#userIp').val('127.0.0.1');
	}
	$('#logType').combobox("select",data.obj.logType);
	$('#userTp').combobox("select",data.obj.userTp);
	$('#userLoginTime').val(SCFUtils.dateFormat(data.obj.userLoginTime,"yyyy-MM-dd HH:mm:ss"));
	$('#userLogoutTime').val(SCFUtils.dateFormat(data.obj.userLogoutTime,"yyyy-MM-dd HH:mm:ss"));
}

function onNextBtnClick(){	
	return SCFUtils.convertArray('userLogForm');		
}

function onDelBtnClick(){
	return SCFUtils.convertArray('userLogForm');	
}
function selLookUpWindow(){
	var selId = $("#selId").val();
	var options ={
			url:SCFUtils.AJAXURL,
			data: {
				selId : selId,
				queryId:'Q_P_000063'	
			},
			callBackFun:function(data){
				if(data.success){
					alert(typeof(data));
    			}
			}			
	};	
	SCFUtils.ajax(options);	
}


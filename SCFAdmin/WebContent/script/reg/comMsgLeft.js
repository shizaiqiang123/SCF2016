function pageOnInt(){
	var userId=$('#userId').val();
	var option ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000301',
				userId:userId
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){		
					if(data.total>=1){
						createTable(data.rows[0]);
					}
				}
			}
	};
	SCFUtils.ajax(option);
}
function initToolBar(){
	return [];
}
function createTable(options){
	var client=$('.client');
	var client_left=$('<div class="client_left"></div>');
	var title_head=$('<div class="title_head"></div>');
	var ul=$('<ul>');
	var left_title_client=$('<li class="left_title_client">'+options.funTitle+'</li>');
	ul.append(left_title_client);
	if(options.btnNm!=""){
		var right_new_client=$('<li class="right_new_client"></li>');
		var href=$('<a href="javascript:void(0)">'+'>'+'</a>').attr("style","font-family:'宋体'");
		href.unbind().bind('click',function(){
			SCFUtils.entry(options.funUrl,options.funPath);
			return false;
		});
		href.appendTo(right_new_client);
		ul.append(right_new_client);
	}
	ul.appendTo(title_head);
	client_left.append(title_head).appendTo(client);
	createDate(options.userQueryId);
}
function createDate(userQueryId){
	var userId=$('#userId').val();
	var option ={
			url:SCFUtils.AJAXURL,
			cacheType:'non',
			data: {
				queryId:userQueryId,
				userId:userId
			},
			callBackFun:function(data){
				if(data.success&&!SCFUtils.isEmpty(data.rows)){
					if(data.total==1){
						createMessage(data.rows[0]);
					}	
			}
		}	
	};
	SCFUtils.ajax(option);
}
function createMessage(options){
	var client_left=$('.client_left');
	var sice=Object.keys(options).length;
	var total=1/(sice+1)*100;
	total=total+'%';
	var sice2=(12/sice)*10;
	sice=(12/sice)*100;
	sice=sice+"%";
	sice2=sice2+"%";
	for(var i in options){
		var j=i;
		var ul=$('<ul>');
		var formatI=formatData(i);
		if(formatI=='CCY'){
			formatMoney(options[i]);
			options[i]=options[i]+"元";
			i=i.substring(0,i.indexOf("$"));
		}
		
		var con_list_client=$('<div class="con_list_client" style="height:'+total+'"></div>');
		var left_tit_client=$('<li class="left_tit_client">'+i+'：</li>');
		var right_con_client=$('<li class="right_con_client" style="width: '+sice2+';line-height:'+sice+'">'+options[j]+'</li>');
		ul.append(left_tit_client).append(right_con_client).appendTo(con_list_client);
		con_list_client.appendTo(client_left);
	}
}
function formatData(options){
	if(options.indexOf("$")>0){
		var optionsend=options.substring(options.indexOf("$")+1);
		var endIndex=optionsend.substring(0,optionsend.indexOf("$"));
		return endIndex;
	}
	return null;
}
function formatMoney(options){
	
}
/**
 * @desc 
 * @date 2014-03-03
 * @author zheng.wei
 */
(function ($)
{
	
	 window['Certcore'] = {};
	 
	 
	 /**
     * 方法名：Certcore.validateSource
     * 方法说明：发签证验证
     * config:   
	    {
	     jsondata : string;需要加签元素，按照规则组装成字符串，必填。
	     submittype : String ,form||ajax ; 提交类型,可分为form表单提交和ajax提交，必填。 
	     div_id : string , form表单下，最外层div的id，当submittype为form时必填。
	     params :json ,当提交方式为ajax时，需传递baseparams ，当submittype为ajax时必填。
	     form_id :string ,提交表单name ,当submittype为form时必填。
	     url :string ,下一步指向页面。
	    } 
	    
	    事例 1 (form表单提交)：
	    Certcore.validateSource( {
			jsondata : jsondata,
			submittype : "form",
			div_id : "#mydiv",
			form_id :"myform",
			url :"XXXXXX.html",
			isClearCache:true ||false  是否清缓存
		});
		
		事例 2 (ajax提交)
		var params = {};  //需在页面js定义此为全局变量
		
		$.extend(params,{ syslogicid : "LGCMS11111111",·····)});
		
		Certcore.validateSource( {
				jsondata : jsondata,
				submittype : "ajax",
				params:params,
				url :"XXXXXXX.html",
				isClearCache:true ,false  是否清缓存
		});
	    
     */
	Certcore.validateSource = function (config){
		try{
			//COMMENT :验证开关。 1,为开启，非1 为关闭
			var btn = config.btn;
			var isvalidation = 0;	
			if(!config){
				SCFUtils.error("参数有误！");
				 if(!SCFUtils.isEmpty(btn)){
			    	 btn.stylebutton('enable');
			      }
				return ;
			}
		    
			var params = config.params||{};
			
			var submittype = config.submittype||"";
			   
			if(1 == isvalidation){
				
				var sourceData = config.jsondata||"";
				 
			    var retObj = SignPKCS7(sourceData);
			     
			    if(retObj.retCode != 0){
			    	SCFUtils.alert('签名失败, 错误代码:' + retObj.retCode);
			    	if(!SCFUtils.isEmpty(btn)){
				    	 btn.stylebutton('enable');
				      }
			    	return; 
				}
			 
			    
			    if(submittype=="form"){
//			    	var form_id = config.form_id||"";
////			    	var tmp = $("form[name='"+form_id+"']").find("input[name=isvalidation]");
//			    	var form = 'form[name='+form_id+']';
			    	var tmp = $('input[name="isvalidation"]');
			    	if(SCFUtils.isEmpty(tmp)){
			    		$(config.div_id).append("<input type='hidden'  name=\"isvalidation\"  value=\""+isvalidation+"\" >");
			    		$(config.div_id).append("<input type='hidden'  name='sourceData'  value='"+sourceData+"' >");
				    	$(config.div_id).append("<input type='hidden'  name='signedData'  value='"+retObj.signedData+"' >");
				    	$(config.div_id).append("<input type='hidden'  name='certDn'  value='"+retObj.certDn+"' >");
			    	}
			    	else{
			    		tmp.val(isvalidation);
			    		$('input[name="sourceData"]').val(sourceData);
			    		$('input[name="signedData"]').val(retObj.signedData);
			    		$('input[name="certDn"]').val(retObj.certDn);
			    	}
			    }
			    else if(submittype =="ajax"){

			    	$.extend(params,{isvalidation:isvalidation, sourceData: sourceData, signedData: retObj.signedData, certDn:retObj.certDn });
			    	
			    }
			}
		    if(submittype=="form"){
		    	var form_id = config.form_id||"";
		    	var fn = config.success || function(data){
		    		if(!SCFUtils.isEmpty(btn)){
		    			btn.stylebutton('enable');
		    			if(config.isClearCache){
		    				SCFUtils.clearCacheFormValue();
		    			}
		    		}
		    		SCFUtils.go(config.url);
		    	};
		    	SCFUtils.submitForm('form[name='+form_id+']', {
		            url: SCFUtils.ROOTURL + SCFUtils.LOGICURL_NOPARAM,  
//		            skipMsg:true,
		            btn:btn,
		        	success:fn
		        });	
		    }else{
		    	var fn = config.success || function(data){
		    		if(!SCFUtils.isEmpty(btn)){
		    			btn.stylebutton('enable');
		    			if(config.isClearCache){
		    				SCFUtils.clearCacheFormValue();
		    			}
		    		}
		    		SCFUtils.go(config.url);
		    	};
		    	SCFUtils.ajax({
					data : params, 
					showMask:true,
					showMsg:config.showMsg,
					url:config.ajaxUrl,
					btn:btn,
			    	successCallback : fn
		    });
		   }
		}catch(e){
			SCFUtils.error(e.message);
    		if(!SCFUtils.isEmpty(btn)){
    			btn.stylebutton('enable');
		    }
			return ;
		}
			
		
	};

	//验签核心方法
	function SignPKCS7(sourceData) {
		try {
			var retObj = new Object();
			var des = document.signx.Kii_P7_Sign(sourceData,0);		
			if(0 == des ){
				retObj.signedData = document.signx.Kii_GetSignData();
				retObj.signedCert = document.signx.Kii_GetSignCert();
				retObj.certDn	  = document.signx.Kii_GetCertSubject(retObj.signedCert);
				retObj.retCode = 0;
			} else {
				retObj.retCode =  document.signx.Kii_GetLastError();
			}	

			return retObj;

		}catch(e){
			SCFUtils.alert(e);
			return -1;
		}
		
	}



})(jQuery);


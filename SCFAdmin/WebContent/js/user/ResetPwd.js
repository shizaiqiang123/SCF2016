
function ajaxBox(){
	var options ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_S_ROLE_0002'	
			},
			callBackFun:function(data){
				if(data.success){
					$('#roleIdBox').combobox('loadData', data.rows);					
    			}
			}			
	};	
	SCFUtils.ajax(options);	
	var option = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000182'
			},
			callBackFun : function(data) {
				if (data.success) {
					var select = document.getElementById('myselect');
					$(data.rows).each(function(i, obj) {
						var newItem = new Option(obj.roleName, obj.roleId);
						select.options.add(newItem);
					});
				}
			}
		};
		SCFUtils.ajax(option);
}

function pageOnLoad(data){
	ajaxBox();	
	var options={};
	options.data = {
			refName: 'UserRef',
			refField:'sysRefNo'
				};
	SCFUtils.getRefNo(options);
	SCFUtils.loadForm('ResetPwdForm', data);
	SCFUtils.setFormReadonly('#ResetPwdForm',true);
	queryReUserRoles(data);
}
function parseString(data,isSerialize){
	
	 var p = {};	 
	 var total = 0;
		$.each(data,function(i,obj){
			
			p['rows'+i+''] = isSerialize===true?SCFUtils.json2str(obj):obj;
			total++;
		});
		p._total_rows = total;
		$('#roleHD').val(SCFUtils.json2str(p));
}
function queryReUserRoles(data){
	var userId=$('#sysRefNo').val();
	if(!SCFUtils.isEmpty(userId)){
		 var opt={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:'Q_P_000158',
						userId: userId
					},
					callBackFun:function(data){
						if(data.success&&!SCFUtils.isEmpty(data.rows)){
//							$('#productHD').val(SCFUtils.json2str(data.rows));
							parseString(data.rows);
							var obj = document.getElementById("myselect");
							var length=obj.options.length;
							var content;
							$.each(data.rows,function(i,n){
								for(var m=0;m<length;m++){
									if(obj.options[m].value==n.roleId){
										content = "<option  value='" + obj.options[m].value + "'>" + obj.options[m].text 
										+ "</option>"; // 填充右侧的值
										$("#roleId").append(content);
									}
								}
							});
						}
					}
			};	
			SCFUtils.ajax(opt);
	}
	
}

function onNextBtnClick(){	
	
	return SCFUtils.convertArray('ResetPwdForm');		
}

function onDelBtnClick(){
	return SCFUtils.convertArray('ResetPwdForm');	
}
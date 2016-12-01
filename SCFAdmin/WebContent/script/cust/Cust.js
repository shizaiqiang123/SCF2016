
function ajaxBox(){
	var data = [{"id":'0',"text":"间接客户"},{"id":'1',"text":"授信客户"},{"id":'2',"text":"双方","selected":true}];
	$("#custTp").combobox('loadData',data);
	data = [{"id":'1',"text":"是"},{"id":'0',"text":"否","selected":true}];
	$("#isKeycust").combobox('loadData',data);
	data = [{"id":'1',"text":"是"},{"id":'0',"text":"否","selected":true}];
	$("#custFlg").combobox('loadData',data);
	var options ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000001'	
			},
			callBackFun:function(data){
				if(data.success){
					$('#deptId').combobox('loadData', data.rows);	
    			}
			}			
	};	
	SCFUtils.ajax(options);	
	//所属网点
	var option ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000012'	
			},
			callBackFun:function(data){
				if(data.success){
					$('#custBrId').combobox('loadData', data.rows);	
    			}
			}			
	};	
	SCFUtils.ajax(option);	
	
	//客户经理
	var opt ={
			url:SCFUtils.AJAXURL,
			data: {
				queryId : 'Q_P_000013',
				isMgr   : "1"
			},
			callBackFun:function(data){
				if(data.success){
					$('#custMgrId').combobox('loadData', data.rows);	
    			}
			}			
	};	
	SCFUtils.ajax(opt);	
	
	//币别
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006'
			},
			callBackFun:function(data){
				if(data.success){
					
					$('#ccy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(optt);
}

function doCust(){
	var custFlg=$('#custFlg').combobox('getValue');
	if(custFlg==='1'){
		$('#ccy').validatebox({    
		    required: true
		});  
		$('#ccy').val('人民币');
		$('#lmtAmt').numberbox({    
		    required: true
		});   
		$('#lmtBal').numberbox({    
		    required: true
		});  
		$('#validDt').datebox({    
		    required:true   
		}); 
		$('#dueDt').datebox({    
		    required:true   
		}); 
	}else{
		$('#ccy').validatebox({    
		    required: false
		});  
		$('#ccy').val('');
		$('#lmtAmt').numberbox({    
		    required: false
		});   
		$('#lmtAmt').numberbox('setValue','');
		$('#lmtBal').numberbox({    
		    required: false
		});   
		$('#lmtBal').numberbox('setValue','');
		$('#validDt').datebox({    
		    required:false   
		}); 
		$('#dueDt').datebox({    
		    required:false   
		}); 
	}
	
}

function queryCust(){
	var custNm=$('#custNm').val();
	if(!SCFUtils.isEmpty(custNm)){
		var oos ={
				url:SCFUtils.AJAXURL,
				data: {
					queryId : 'Q_P_000030',
					custNm   : custNm
				},
				callBackFun:function(data){
					if(!SCFUtils.isEmpty(data.rows)){
						SCFUtils.alert('授信客户名称已存在，请重新输入！！');
					}
				}			
		};	
		SCFUtils.ajax(oos);	
	}
}

/*function changeM(){
	debugger;
	var lmtAmt=$('#lmtAmt').numberbox('getValue');
	var lmtBal=$('#lmtBal').numberbox('getValue');
	if(SCFUtils.OPTSTATUS=='ADD'){
		$('#lmtBal').numberbox('setValue',$('#lmtAmt').numberbox('getValue'));
	}else{
		if(lmtAmt!=lmtBal){
			
		}
	}
//	if(SCFUtils.OPTSTATUS=='ADD'){
//	}
}
*/
function pageOnLoad(data){
	SCFUtils.setNumberboxReadonly("lmtBal", true);
	ajaxBox();
	if('RE' !=SCFUtils.FUNCTYPE){
		var options={};
		options.data = {
				refName: 'CUSTREF',
				refField:'sysRefNo'
					};
		SCFUtils.getRefNo(options);
		}
	SCFUtils.loadForm('custForm', data);
	
	changeMoney();
}

function changeMoney(){
	var lmtAmt=parseFloat($('#lmtAmt').numberbox('getValue')); //原先a的值
	var lmtBal=parseFloat($('#lmtBal').numberbox('getValue'));//原先b的值
	$('#lmtAmt').numberbox({
		min : lmtAmt,
		onChange: function(newValue,oldValue){
			if(newValue>=lmtAmt){//如果后来输入的a比原先的大  b+差值
				var subAmt=SCFUtils.Math(newValue, lmtAmt, 'sub');
				var newBal=SCFUtils.Math(lmtBal, subAmt, 'add');
				$('#lmtBal').numberbox('setValue',newBal);
			}else{//如果后来输入的a比原先的小 a 和 b 不变
				SCFUtils.alert("请输入大于原先的额度金额。");
			}
		},
	});	
}

function onNextBtnClick(){
	return SCFUtils.convertArray('custForm');		
}

function onDelBtnClick(){
	return SCFUtils.convertArray('custForm');	
}
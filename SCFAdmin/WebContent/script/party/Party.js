
function ajaxBox(){
	var data = [{"id":'1',"text":"进口保理商"},{"id":'2',"text":"出口保理商"},{"id":'3',"text":"保险公司"},{"id":'4',"text":"监管机构"},{"id":'5',"text":"仓库","selected":true}];
	$("#patnerTp").combobox('loadData',data);	
	data = [{"id":'1',"text":"是"},{"id":'0',"text":"否","selected":true}];
	$("#isFci").combobox('loadData',data);
	$("#agmSignFlg").combobox('loadData',data);
	
	//币别
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006'
			},
			callBackFun:function(data){
				if(data.success){
					
					$('#lmtCcy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(optt);
}

//function changeMoney(){
//	var lmtAmt=parseFloat($('#lmtAmt').numberbox('getValue')); //原先a的值
//	var lmtBal=parseFloat($('#lmtBal').numberbox('getValue'));//原先b的值
//	if(isNaN(lmtAmt)){
//		lmtAmt=0;
//	}
//	if(isNaN(lmtBal)){
//		lmtBal=0;
//	}
//	if(!SCFUtils.isEmpty(lmtAmt)&&!SCFUtils.isEmpty(lmtBal)){
//	if(!SCFUtils.isEmpty(lmtAmt)){
//		$('#lmtAmt').numberbox({
//			min : lmtAmt,
//			onChange: function(newValue,oldValue){
//				if(!SCFUtils.isEmpty(newValue)&&!SCFUtils.isEmpty(oldValue)){
//					if(newValue>=lmtAmt){//如果后来输入的a比原先的大  b+差值
//						var subAmt=SCFUtils.Math(newValue, lmtAmt, 'sub');
//						var newBal=SCFUtils.Math(lmtBal, subAmt, 'add');
//						$('#lmtBal').numberbox('setValue',newBal);
//					}else{//如果后来输入的a比原先的小 a 和 b 不变
//						var patnerTp=$("#patnerTp").combobox('getValue');
//						if(patnerTp=='4'){
//							SCFUtils.alert("请输入大于原先的额度金额。");
//						}
//					}
//				}
//			},
//		});	
//	}
//}

function doCust(data){
	var patnerTp=$('#patnerTp').combobox('getValue');
	if(patnerTp==='1'||patnerTp==='2'){
		closepatnerTpOn3();
		closepatnerTpOn4();
		openpatnerTpOn1(data);
	}else if(patnerTp==='3'){
		closepatnerTpOn1();
		closepatnerTpOn4();
		openpatnerTpOn3(data);
	}else if(patnerTp==='4'){
		closepatnerTpOn1();
		openpatnerTpOn4(data);
	}
	else{	
		closepatnerTpOn1();
		closepatnerTpOn3();
		closepatnerTpOn4();
	}
}

function openpatnerTpOn1(data){
	//打开 是否FCI 下拉框
	$('#isFci').combobox('enable');
	$('#isFci').combobox({    
	    readonly : false,
	    required : true
	}); 
	var data1 = [{"id":'1',"text":"是"},{"id":'0',"text":"否"}];
	$("#isFci").combobox('loadData',data1);
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var isFci=data.obj.isFci;
			if(!SCFUtils.isEmpty(isFci)){
				$("#isFci").combobox('setValue',isFci);
			}
		}
	}
	//打开FCI编号 输入框
	$('#fciNo').removeAttr("readonly");
	//$('#fciNo').removeAttr("disabled");
	$('#fciNo').validatebox({
		 required : true
	});
}

function closepatnerTpOn1(){
	//关闭 是否FCI 下拉框
	$('#isFci').combobox('disable');
	$('#isFci').combobox({    
			readonly : true,
			required : false
	}); 
	//关闭FCI编号 输入框
	$('#fciNo').attr({ readonly: "true"});
	$('#fciNo').validatebox({
		 required : false
	});
	$('#fciNo').val('');
}
function openpatnerTpOn3(data){
	
	//打开 合作起始日 日期控件
	$('#agmValueDt').datebox({    
	    required:true,
	    disabled:false
	});
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var agmValueDt=data.obj.agmValueDt;
			if(!SCFUtils.isEmpty(agmValueDt)){
				$("#agmValueDt").datebox('setValue',agmValueDt);
			}
		}
	}
	//打开 合作终止日 日期控件
	$('#agmDueDt').datebox({    
		required:true,
	    disabled:false  
	}); 
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var agmDueDt=data.obj.agmDueDt;
			if(!SCFUtils.isEmpty(agmDueDt)){
				$("#agmDueDt").datebox('setValue',agmDueDt);
			}
		}
	}
}
function closepatnerTpOn3(){

	//关闭 合作起始日 日期控件
	$('#agmValueDt').datebox({    
	    required:false,
	    //readonly : true,
	    disabled : true
	}); 
	//关闭 合作终止日 日期控件
	$('#agmDueDt').datebox({    
		 required:false,
		 //readonly : true,
		 disabled : true  
	}); 
}
function openpatnerTpOn4(data){

	//打开币别下拉框
	$('#lmtCcy').combobox('enable');
	$('#lmtCcy').combobox({    
	    readonly : false,
	    required : true
	});
	//load币别
	var optt={
			url:SCFUtils.AJAXURL,
			data: {
				queryId:'Q_P_000006'
			},
			callBackFun:function(data){
				if(data.success){
					$('#lmtCcy').combobox('loadData', data.rows);					
    			}
			}
	};	
	SCFUtils.ajax(optt);
	
	
	//打开 额度金额 数值输入框
	$('#lmtAmt').numberbox({
		 required : true,
		 disabled : false 
	});
	
	//打开 合作起始日 日期控件
	$('#agmValueDt').datebox({    
	    required:true,
	    disabled:false
	});
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var agmValueDt=data.obj.agmValueDt;
			if(!SCFUtils.isEmpty(agmValueDt)){
				$("#agmValueDt").datebox('setValue',agmValueDt);
			}
		}
	}
	//打开合作终止日 日期控件
	$('#agmDueDt').datebox({    
		required:true,
	    disabled:false  
	}); 
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var agmDueDt=data.obj.agmDueDt;
			if(!SCFUtils.isEmpty(agmDueDt)){
				$("#agmDueDt").datebox('setValue',agmDueDt);
			}
		}
	}
	
	
}
function closepatnerTpOn4(){
	
	$('#lmtCcy').combobox('disable');
	$('#lmtCcy').combobox({    
	    //enable : false,
	    readonly : true,
	    required : false
	});
	
	//关闭 合作起始日 日期控件
	$('#agmValueDt').datebox({    
	    required:false,
	    //readonly : true,
	    disabled : true
	}); 
	//关闭 合作终止日 日期控件
	$('#agmDueDt').datebox({    
		 required:false,
		 //readonly : true,
		 disabled : true  
	}); //打开 额度金额 数值输入框
	$('#lmtAmt').numberbox({
		 required : false,
		 disabled : true 
	});
	$('#lmtAmt').numberbox('setValue','');
	
}

function onNextBtnClick(){	
	return SCFUtils.convertArray('partyForm');		
}

function onDelBtnClick(){
	return SCFUtils.convertArray('partyForm');	
}

function pageOnLoad(data){
	SCFUtils.setNumberboxReadonly("lmtAmt", true);
	var options={};
	options.data = {
			refName: 'UserRef',
			refField:'sysRefNo'
	};
	SCFUtils.getRefNo(options);
	SCFUtils.loadForm('partyForm', data);
	if('RE'!=SCFUtils.FUNCTYPE && 'ADD'===SCFUtils.OPTSTATUS){
		doCust();
	}else if('EDIT'===SCFUtils.OPTSTATUS){
		/*debugger;
		doCust(data);*/
	}
	
//	changeMoney();
}

function pageOnInt() {
	ajaxBox();
}

/**
 * 复合功能时，进入结果汇总页面
 * @param data
 */
function pageOnReleaseResultLoad(data) {
	SCFUtils.loadForm('partyForm', data);
}
/**
 * 复合功能时，Next进入交易页面
 * @param data
 */
function pageOnReleasePageLoad(data) {
	SCFUtils.loadForm('partyForm', data);
}
/**
 * 复合功能时，Pre进入交易页面
 * @param data
 */
function pageOnReleasePreLoad(data) {
	SCFUtils.loadForm('partyForm', data);
}

/**
 * 申请功能时，进入结果页面
 * @param data
 */
function pageOnResultLoad(data) {
	SCFUtils.loadForm('partyForm', data);
}

/**
 * 申请功能时，Pre进入交易页面
 * @param data
 */
function pageOnPreLoad(data) {
	SCFUtils.loadForm('partyForm', data);
	//changeMoney();
}

function pageOnFPLoad(data) {
	SCFUtils.loadForm('partyForm', data);
	//changeMoney();
}


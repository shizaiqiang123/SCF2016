
function ajaxBox(){
	var data = [{"id":'1',"text":"进口保理商"},{"id":'2',"text":"出口保理商"},{"id":'3',"text":"保险公司"},{"id":'4',"text":"监管机构"},{"id":'5',"text":"仓库","selected":true}];
	$("#patnerTp").combobox('loadData',data);
	data = [{"id":'1',"text":"总公司"},{"id":'2',"text":"分公司","selected":true}];
	$("#patnerLevl").combobox('loadData',data);
	data = [{"id":'1',"text":"是"},{"id":'0',"text":"否","selected":true}];
	$("#isFci").combobox('loadData',data);
	$("#agmSignFlg").combobox('loadData',data);
	data = [{"id":'1',"text":"按月巡仓"},{"id":'0',"text":"按周巡仓","selected":true}];
	$("#inspTp").combobox('loadData',data);
	
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

function changeMoney(){
	var lmtAmt=parseFloat($('#lmtAmt').numberbox('getValue')); //原先a的值
	var lmtBal=parseFloat($('#lmtBal').numberbox('getValue'));//原先b的值
	if(isNaN(lmtAmt)){
		lmtAmt=0;
	}
	if(isNaN(lmtBal)){
		lmtBal=0;
	}
	if(!SCFUtils.isEmpty(lmtAmt)&&!SCFUtils.isEmpty(lmtBal)){
		$('#lmtAmt').numberbox({
			min : lmtAmt,
			onChange: function(newValue,oldValue){
//				if(!SCFUtils.isEmpty(newValue)&&!SCFUtils.isEmpty(oldValue)){
					if(newValue>=lmtAmt){//如果后来输入的a比原先的大  b+差值
						var subAmt=SCFUtils.Math(newValue, lmtAmt, 'sub');
						var newBal=SCFUtils.Math(lmtBal, subAmt, 'add');
						$('#lmtBal').numberbox('setValue',newBal);
					}else{//如果后来输入的a比原先的小 a 和 b 不变
						var patnerTp=$("#patnerTp").combobox('getValue');
						if(patnerTp=='4'){
							SCFUtils.alert("请输入大于原先的额度金额。");
						}
					}
//				}
			},
		});	
	}
}

function doCust(data){
	var patnerTp=$('#patnerTp').combobox('getValue');
	if(patnerTp==='1'||patnerTp==='2'){
		closepatnerTpOn3();
		closepatnerTpOn4();
		closepatnerTpOn5();
		openpatnerTpOn1(data);

	}else if(patnerTp==='3'){
		closepatnerTpOn1();
		closepatnerTpOn4();
		closepatnerTpOn5();
		openpatnerTpOn3(data);
	}else if(patnerTp==='4'){
		closepatnerTpOn1();
		closepatnerTpOn5();
		openpatnerTpOn4(data);
	}
	else{	
		closepatnerTpOn1();
		closepatnerTpOn3();
		closepatnerTpOn4();
		openpatnerTpOn5(data);
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
	//打开 是否已经签署协议 下拉框
	$('#agmSignFlg').combobox('enable');
	$('#agmSignFlg').combobox({    
	    readonly : false,
	    required : true
	});
	var data1 = [{"id":'1',"text":"是"},{"id":'0',"text":"否"}];
	$("#agmSignFlg").combobox('loadData',data1);
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var agmSignFlg=data.obj.agmSignFlg;
			if(!SCFUtils.isEmpty(agmSignFlg)){
				$("#agmSignFlg").combobox('setValue',agmSignFlg);
			}
		}
	}
	//打开 协议编号 输入框
	$('#agmNo').removeAttr("readonly");
	//$('#agmNo').removeAttr("disabled");
	$('#agmNo').validatebox({
		 required : true
	});
	//打开 协议开始日期 日期控件
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
	//打开 协议终止日期 日期控件
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
	//关闭 是否已经签署协议 下拉框
	$('#agmSignFlg').combobox('disable');
	$('#agmSignFlg').combobox({    
	    //enable : false,
	    readonly : true,
	    required : false
	});
	//关闭  协议编号 输入框
	$('#agmNo').attr({ readonly: "true"});
	$('#agmNo').validatebox({
		 required : false
	});
	$('#agmNo').val('');
	//关闭 协议开始日期 日期控件
	$('#agmValueDt').datebox({    
	    required:false,
	    //readonly : true,
	    disabled : true
	}); 
	//关闭 协议终止日期 日期控件
	$('#agmDueDt').datebox({    
		 required:false,
		 //readonly : true,
		 disabled : true  
	}); 
}
function openpatnerTpOn4(data){
	//打开 是否已经签署协议 下拉框
	$('#agmSignFlg').combobox('enable');
	$('#agmSignFlg').combobox({    
	    readonly : false,
	    required : true
	});
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
	
	var data1 = [{"id":'1',"text":"是"},{"id":'0',"text":"否"}];
	$("#agmSignFlg").combobox('loadData',data1);
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var agmSignFlg=data.obj.agmSignFlg;
			if(!SCFUtils.isEmpty(agmSignFlg)){
				$("#agmSignFlg").combobox('setValue',agmSignFlg);
			}
		}
	}
	//打开 额度金额 数值输入框
	$('#lmtAmt').numberbox({
		 required : true,
		 disabled : false 
	});
	//打开 额度月=余额 数值输入框
	$('#lmtBal').numberbox({
		 required : true,
		 disabled : false 
	});
	//打开 协议编号 输入框
	$('#agmNo').removeAttr("readonly");
	//$('#agmNo').removeAttr("disabled");
	$('#agmNo').validatebox({
		 required : true
	});
	//打开 协议开始日期 日期控件
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
	//打开 协议终止日期 日期控件
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
	//打开 额度起始日  日期控件
	$('#lmtValidDt').datebox({    
	    required:true,
	    disabled:false
	});
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var lmtValidDt=data.obj.lmtValidDt;
			if(!SCFUtils.isEmpty(agmValueDt)){
				$("#lmtValidDt").datebox('setValue',lmtValidDt);
			}
		}
	}
	//打开 额度到期日  日期控件
	$('#lmtDueDt').datebox({    
	    required:true,
	    disabled:false
	});
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var lmtDueDt=data.obj.lmtDueDt;
			if(!SCFUtils.isEmpty(agmValueDt)){
				$("#lmtDueDt").datebox('setValue',lmtDueDt);
			}
		}
	}
	//打开 监管质物品种 输入框
	$('#patnerGoods').removeAttr("readonly");
	//$('#patnerGoods').removeAttr("disabled");
	$('#patnerGoods').validatebox({
		 required : true
	});
}
function closepatnerTpOn4(){
	//关闭 是否已经签署协议 下拉框
	$('#agmSignFlg').combobox('disable');
	$('#agmSignFlg').combobox({    
	    //enable : false,
	    readonly : true,
	    required : false
	});
	$('#lmtCcy').combobox('disable');
	$('#lmtCcy').combobox({    
	    //enable : false,
	    readonly : true,
	    required : false
	});
	//关闭  协议编号 输入框
	$('#agmNo').attr({ readonly: "true"});
	$('#agmNo').validatebox({
		 required : false
	});
	$('#agmNo').val('');
	//关闭 协议开始日期 日期控件
	$('#agmValueDt').datebox({    
	    required:false,
	    //readonly : true,
	    disabled : true
	}); 
	//关闭 协议终止日期 日期控件
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
	//打开 额度余额 数值输入框
	$('#lmtBal').numberbox({
		 required : false,
		 disabled : true 
	});
	$('#lmtBal').numberbox('setValue','');
	//关闭 额度起始日 日期控件
	$('#lmtValidDt').datebox({
		required:false,
		//readonly : true,
		disabled : true 
	});
	//关闭 额度到期日 日期控件
	$('#lmtDueDt').datebox({
		required:false,
		//readonly : true,
		disabled : true 
	});
	//关闭 监管之物品种 输入框
	$('#patnerGoods').attr({ readonly: "true"});
	$('#patnerGoods').validatebox({
		 required : false
	});
	$('#patnerGoods').val('');
}
function openpatnerTpOn5(data){
	
	//打开 巡仓类型 下拉框
	$('#inspTp').combobox('enable');
	$('#inspTp').combobox({    
	   // enable : true,
	    readonly : false,
	    required : true
	});  
	var data1 = [{"id":'1',"text":"按月巡仓"},{"id":'0',"text":"按周巡仓","selected":true}];
	$("#inspTp").combobox('loadData',data1);
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var inspTp=data.obj.inspTp;
			if(!SCFUtils.isEmpty(inspTp)){
				$("#inspTp").combobox('setValue',inspTp);
			}
		}
	}
	//打开 下一个巡仓日期 日期控件
	$('#inspDt').datebox({
		required:true,
	    disabled:false
	});
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var inspDt=data.obj.inspDt;
			if(!SCFUtils.isEmpty(inspDt)){
				$("#inspDt").datebox('setValue',inspDt);
			}
		}
	}
	//打开 巡仓人 输入框
	$('#inspector').removeAttr("readonly");
	//$('#inspector').removeAttr("disabled");
	$('#inspector').validatebox({
		 required : true
	});
	//打开 合作地区 输入框
	$('#patnerArea').removeAttr("readonly");
	//$('#patnerArea').removeAttr("disabled");
	$('#patnerArea').validatebox({
		 required : true
	});
	
	//打开 巡仓日 数值输入框
	$('#inspDay').numberbox({
		 required : true,
		 disabled : false 
	});
	//打开 合作方级别 下拉框
	$('#patnerLevl').combobox('enable');
	$('#patnerLevl').combobox({    
	   // enable : true,
	    readonly : false,
	    required : true
	});  
	var data = [{"id":'1',"text":"总公司"},{"id":'2',"text":"分公司","selected":true}];
	$("#patnerLevl").combobox('loadData',data);
	if('ADD'!=SCFUtils.OPTSTATUS){
		if(!SCFUtils.isEmpty(data.obj)){
			var inspTp=data.obj.inspTp;
			if(!SCFUtils.isEmpty(inspTp)){
				$("#inspTp").combobox('setValue',inspTp);
			}
		}
	}
}
function closepatnerTpOn5(){
	//关闭 巡仓类型 下拉框
	$('#inspTp').combobox('disable');
	$('#inspTp').combobox({    
	    //enable : false,
	    readonly : true,
	    required : false
	});  
	//关闭 巡仓人 输入框
	$('#inspector').attr({ readonly: "true"});
	$('#inspector').validatebox({
		 required : false
	});
	$('#inspector').val('');
	//关闭 合作地区 输入框
	$('#patnerArea').attr({ readonly: "true"});
	$('#patnerArea').validatebox({
		 required : false
	});
	$('#patnerArea').val('');
	
	
	//关闭 下一个巡仓日期 日期控件
	$('#inspDt').datebox({
		required:false,
		//readonly : true,
		disabled : true 
	});
	//关闭 巡仓日 数值输入框
	$('#inspDay').numberbox({
		 required : false,
		 disabled : true 
	});
	$('#inspDay').numberbox('setValue','');
	//关闭 合作方级别 下拉框
	$('#patnerLevl').combobox('disable');
	$('#patnerLevl').combobox({    
	    //enable : false,
	    readonly : true,
	    required : false
	});
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
	
	changeMoney();
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
	changeMoney();
}

function pageOnFPLoad(data) {
	SCFUtils.loadForm('partyForm', data);
	//changeMoney();
}


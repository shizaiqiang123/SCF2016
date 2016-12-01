function ignoreToolBar(){
	
}

function pageLoad(win) {
	ajaxBox();
	var row = win.getData("row");
	if (row.op === 'add') {
		$('#acctPeriod').val(row.acctPeriod);
		$('#invCcy').combobox('setValue',row.invCcy);
		$('#buyerId').val(row.buyerId);
	}else if(row.op === 'edit'){
		if(row.state === 'query'){
			SCFUtils.setFormReadonly('#invcMChgForm',true);
		}
		SCFUtils.loadForm('invcMChgForm', row);
		$('#oldInvNo').val(row.invNo);
	}
}

function doSave(win) {
	var data = SCFUtils.convertArray('invcMChgForm');
	if(data){
		var target = win.getData('callback');
		target(data);
		win.close();
	}
}

function ajaxBox(){
	var options={};
	options.data = {
			refName: 'invcRef',
			refField:'sysRefNo',
			cacheType : 'non'
				};
	SCFUtils.getRefNo(options);
	SCFUtils.setTextReadonly("selId", true);
	SCFUtils.setTextReadonly("selNm", true);
	SCFUtils.setComboReadonly('invCcy',true);
	SCFUtils.setNumberboxReadonly("invBal",true);
	SCFUtils.setNumberboxReadonly("acctPeriod", true);
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000006'
			},
			callBackFun : function(data) {
				if (data.success) {
					$('#invCcy').combobox('loadData', data.rows);
				}
			}
		};
		SCFUtils.ajax(opt);
}

function changeinvDueDt(){
	var invValDt = $('#invValDt').datebox('getValue');
	var acctPeriod=$('#acctPeriod').val();
	var invDueDt=SCFUtils.FormatDate(invValDt, acctPeriod);
	$('#invDueDt').datebox('setValue',invDueDt);
	
}
 
function changeAcctAmt(){
	var invAmt = $('#invAmt').numberspinner('getValue');
	$('#invBal').numberspinner('setValue', invAmt);
}

//应付账款修改
function changeInvAmt(){
	changeAcctAmt();
}

//应付账款起算日
function changeinvValDt(){
	var cntrctNo = $("#cntrctNo").val();
	var newData = $('#sysData').datebox('getValue');
	var invDt = $('#invDt').datebox('getValue');
	var invValDt = $('#invValDt').datebox('getValue'); //起算日期
	var invDueDt = $('#invDueDt').datebox('getValue'); //到期日期
	var acctPeriod= SCFUtils.DateDiff(invDueDt,invValDt); //账期
	var acctPeriod = $('#acctPeriod').val();
	var busiTp = $('#busiTp').val();
	if(SCFUtils.DateDiff(newData,invValDt)>0){
		SCFUtils.alert('起算日期不能小于当前日期！');
	   $('#invValDt').datebox('setValue','');
	   return;
	}
	if(SCFUtils.DateDiff(invValDt,invDueDt)>0){
		SCFUtils.alert('起算日期不能大于到期日期！');
		$('#invValDt').datebox('setValue','');
		$('#acctPeriod').numberbox('setValue','');
		return;
	}
	//改变起算日期，改变账期
	var invDueDt = $('#invDueDt').datebox('getValue');
	var invValDt = $('#invValDt').datebox('getValue'); //起算日期
	if(!invDueDt){
		return;
	}
	if(SCFUtils.DateDiff(invDueDt,invValDt)<0 ){
		SCFUtils.alert("到期日不能小于起算日期！");
		$('#invDueDt').datebox('setValue','');
		return;
	}
	var acctPeriod= SCFUtils.DateDiff(invDueDt,invValDt); //账期
	$('#acctPeriod').numberspinner('setValue',SCFUtils.DateDiff(invDueDt,invValDt));
//	var openactGraceDay ; //逾期
//	if(SCFUtils.isEmpty($('#openactGraceDay').val())){
//		openactGraceDay  = 0;
//	}else{
//		openactGraceDay = $('#openactGraceDay').val();
//	}
//	var dueDay = SCFUtils.Math(acctPeriod, openactGraceDay, 'add');
//	 $('#acctPeriod').numberspinner('setValue',SCFUtils.DateDiff(invDueDt,invValDt));
//	 $('#dueDt').datebox('setValue',SCFUtils.FormatDate(invValDt,dueDay)); //逾期日期
	
}
//应付账款开立日期
function changeinvDt(){
	var invDt = $('#invDt').datebox('getValue');
	var newData = $('#sysData').datebox('getValue'); //当前日期
	if(SCFUtils.DateDiff( newData,invDt )<0){
		SCFUtils.alert('开立日期不能大于当前日期！');
		$('#invDt').datebox('setValue','');
	}
}

function showLookUpWindow(){
	    var buyerId = $('#buyerId').val();
		var options = {
			title:'供应商查询',
			//reqid:'I_P_000111',
			reqid:'I_P_000216',
			data:{'buyerId' : buyerId},
			onSuccess:sellerSuccess
		};
		SCFUtils.getData(options);
	}

	function sellerSuccess(data){
		$('#selId').val(data.selId);
		$('#selNm').val(data.selNm);
		/*
		 * 查询按钮加载数据成功，去判断cntrctNo的div有无值,无值不做处理
		 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
		 * new on 20160728 by XuX
		 */
		if($('#selId').val()!=null){//$('#cntrctNo')为查询左边的div的id
			$('#selId').parent('td').removeClass('requried-item-ifo');//去除*号
			$('#selId').removeClass('validatebox-invalid');
		}
		$('#selNm').focus();
	}

//到期日
function  changeInvDueDt(){
	var invDueDt = $('#invDueDt').datebox('getValue');
	var invValDt = $('#invValDt').datebox('getValue'); //起算日期
	var acctPeriod= SCFUtils.DateDiff(invDueDt,invValDt); //账期
	var busiTp = $('#busiTp').val();
	if(SCFUtils.DateDiff(invDueDt,invValDt)<0 ){
		SCFUtils.alert("到期日不能小于起算日期！");
		$('#invDueDt').datebox('setValue','');
		return;
	}
	$('#acctPeriod').numberspinner('setValue',SCFUtils.DateDiff(invDueDt,invValDt));
}
	

/*
 * 应付账款编号失去焦点就判断
 * new on 2016-10-21 by JJH
 */
function checkLegal(){
	var invNo = $("#invNo").val();
	if(/^[a-zA-Z0-9]*$/.test(invNo)){
		
	}else{
		$("#invNo").val("");
	}
}

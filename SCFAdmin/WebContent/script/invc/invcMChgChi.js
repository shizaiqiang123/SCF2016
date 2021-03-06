function ignoreToolBar(){
	
}

function pageLoad(win) {
	ajaxBox();
	var row = win.getData("row");
	$('#cutrctNo').val(row.cntrctNo);
	$('#cntrctNo').val(row.cntrctNo);//额度编号
	$('#trxCcy').val(row.invCcy);
	$('#selId').val(row.selId);
	$('#batchNo').val(row.batchNo);
	$('#busiTp').val(row.busiTp);
	if (row.op === 'add') {
		$('#acctPeriod').val(row.acctPeriod);
		$('#invCcy').combobox('setValue',row.invCcy);
	}else if(row.op === 'edit'){
		if(row.state === 'query'){
			SCFUtils.setFormReadonly('#invcMChgForm',true);
		}
		SCFUtils.loadForm('invcMChgForm', row);
		$('#oldInvNo').val(row.invNo);
	}
}

function doSave(win) {
	//更新额度表信息
	$('#trxAmt').val($('#invBal').numberspinner('getValue'));
	$('#trxDate').datebox('setValue',$('#sysData').datebox('getValue'));
	//计算融资余额
	var invBal = $('#invBal').numberspinner('getValue');
	var loanPerc =SCFUtils.Math($('#loanPerc').val(),0.01,'mul');
	var invLoanAval = SCFUtils.Math(invBal,loanPerc,'mul');
	$('#invLoanAval').val(invLoanAval);
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
	SCFUtils.setTextReadonly("buyerId", true);
	SCFUtils.setTextReadonly("buyerNm", true);
	SCFUtils.setComboReadonly('invCcy',true);
	SCFUtils.setNumberboxReadonly("invBal",true);
	SCFUtils.setNumberboxReadonly("acctPeriod", true);
	//SCFUtils.setDateboxReadonly("invDueDt", true);
	var opt = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000543'
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
 
//预支价金修改
function changeAcctAmt(){
	var invAmt = $('#invAmt').numberspinner('getValue');
//	var acctAmt = $('#acctAmt').numberspinner('getValue');
	$('#invBal').numberspinner('setValue', invAmt);
}

//应收账款修改
function changeInvAmt(){
	changeAcctAmt();
}

//应收账款起算日
function changeinvValDt(){
	var cntrctNo = $("#cntrctNo").val();
	var buyerId = $("#buyerId").val();
	var newData = $('#sysData').datebox('getValue');
	var invDt = $('#invDt').datebox('getValue');
	var invValDt = $('#invValDt').datebox('getValue'); //起算日期
	var invDueDt = $('#invDueDt').datebox('getValue'); //到期日期
	var acctPeriod= SCFUtils.DateDiff(invDueDt,invValDt); //账期
	var acctPeriod = $('#acctPeriod').val();
	//信保项下起算日验证（发票起算日在保单的保单起算日与到期日之间）
	var busiTp = $('#busiTp').val();
	var obj=queryInsure(cntrctNo);//保单表中的起算日期与到期日期
	if(obj.collatVailDt!=null)
		var collatVailDt = obj.collatVailDt.substr(0,10);  
	if(obj.collatDueDt!=null)
		var collatDueDt = obj.collatDueDt.substr(0,10);
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
	if(busiTp == '3' ){
		if( SCFUtils.DateDiff(invValDt,collatVailDt)<0 || SCFUtils.DateDiff(invValDt,collatDueDt)>0){
			SCFUtils.alert("起算日期不在保单起算日与到期日期之间！");
			$('#invValDt').datebox('setValue','');
			return;
		}
		if(SCFUtils.isEmpty(buyerId)){
			SCFUtils.alert("请先选间接客户！");
			$('#invValDt').datebox('setValue','');
			return;
		}
		var sbrPeriod = queryCntectSbrM(cntrctNo,buyerId).acctPeriod;
		if(!SCFUtils.isEmpty(acctPeriod)){
			if(SCFUtils.Math(sbrPeriod,acctPeriod,'sub')<0){
				SCFUtils.alert("账期大于保单账期！");
				$('#invValDt').datebox('setValue','');
				return;
			}
		}
	}
	var openactGraceDay ; //逾期
	if(SCFUtils.isEmpty($('#openactGraceDay').val())){
		openactGraceDay  = 0;
	}else{
		openactGraceDay = $('#openactGraceDay').val();
	}
	var dueDay = SCFUtils.Math(acctPeriod, openactGraceDay, 'add');
	 $('#acctPeriod').numberspinner('setValue',SCFUtils.DateDiff(invDueDt,invValDt));
	 $('#dueDt').datebox('setValue',SCFUtils.FormatDate(invValDt,dueDay)); //逾期日期
	
}
//应收账款开立日期
function changeinvDt(){
	var invDt = $('#invDt').datebox('getValue');
	var newData = $('#sysData').datebox('getValue'); //当前日期
	if(SCFUtils.DateDiff( newData,invDt )<0){
		SCFUtils.alert('开立日期不能大于当前日期！');
		$('#invDt').datebox('setValue','');
	}
}

/*//账期触发
function changeAccTPer(){
	var invValDt = $('#invValDt').datebox('getValue'); //起算日期
	var acctPeriod = $('#acctPeriod').val();
	$('#invDueDt').datebox('setValue',SCFUtils.FormatDate(invValDt,acctPeriod));
}*/

function showLookUpWindow(){
		var cntrctNo = $('#cntrctNo').val();
		var options = {
			title:'间接客户查询',
			//reqid:'I_P_000111',
			reqid:'I_P_000203',
			data:{'cntrctNo' : cntrctNo},
			onSuccess:buyerSuccess
		};
		SCFUtils.getData(options);
	}

	function buyerSuccess(data){
		$('#buyerId').val(data.sysRefNo);
		$('#buyerNm').val(data.custNm);
		//$('#loanPerc').val(data.loanPct);
		//$('#openactGraceDay').val(data.openactGraceDay);
		//$('#buyerLmtAmt').val(data.buyerLmtAmt) //买方关联额度
		//变更额度表
		//$('#custNo').val(data.buyerId);
		//$('#custNm').val(data.buyerName);
		//$('#tdType').val("T");
		/*
		 * 查询按钮加载数据成功，去判断cntrctNo的div有无值,无值不做处理
		 * 有值去除父层requried-item-ifo方法，去除这个id的validatebox-invalid方法
		 * new on 20160728 by XuX
		 */
		if($('#buyerId').val()!=null){//$('#cntrctNo')为查询左边的div的id
			$('#buyerId').parent('td').removeClass('requried-item-ifo');//去除*号
			$('#buyerId').removeClass('validatebox-invalid');
		}
		$('#buyerNm').focus();
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
		$('#acctPeriod').numberbox('setValue','');
		return;
	}
	if(busiTp == '3' ){
		var buyerId = $('#buyerId').val();
		var cntrctNo = $('#cntrctNo').val();
		if(SCFUtils.isEmpty(buyerId)){
			SCFUtils.alert("请先选间接客户！");
			$('#invDueDt').datebox('setValue','');
			return;
		}
		var sbrPeriod = queryCntectSbrM(cntrctNo,buyerId).acctPeriod;
		/*var newInvDueDt = SCFUtils.FormatDate(invValDt,sbrPeriod);
		if(SCFUtils.DateDiff(newInvDueDt,invDueDt)<0){
			SCFUtils.alert("到期日不能大于信保项下的到期日！");
			$('#invDueDt').datebox('setValue','');
			return;
		}*/
		if(!SCFUtils.isEmpty(acctPeriod)){
			if(SCFUtils.Math(sbrPeriod,acctPeriod,'sub')<0){
				SCFUtils.alert("发票账期不能大于保单账期！");
				$('#invDueDt').datebox('setValue','');
				return;
			}
		}
	}
	$('#acctPeriod').numberspinner('setValue',SCFUtils.DateDiff(invDueDt,invValDt));
}
	
//查询额度关联关系表
function queryCntectSbrM(cntrctNo,buyerId){
	var obj ={}
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000545',
				cntrctNo : cntrctNo,
				buyerId : buyerId
			},
			callBackFun : function(data) {
				if(!SCFUtils.isEmpty(data.rows)){
					obj = data.rows[0];
				}
			}
		};
		SCFUtils.ajax(options);
		return obj;
}

//查询保单信息
function queryInsure(cntrctNo){
	var obj = {};
	var options = {
			url : SCFUtils.AJAXURL,
			data : {
				queryId : 'Q_P_000546',
				cntrctNo : cntrctNo
			},
			callBackFun : function(data) {
				if (data.success && !SCFUtils.isEmpty(data.rows)) {
					obj = data.rows[0];
				}
			}
		};
		SCFUtils.ajax(options);
		return obj;
}

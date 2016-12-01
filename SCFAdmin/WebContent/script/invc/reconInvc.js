function ajaxBox() {
	var data =  [ {
		"id" : '0',
		"text" : "国内保理",
		"selected" : true
	}, {
		"id" : '1',
		"text" : "预付款融资"
	}, {
		"id" : '2',
		"text" : "动产质押融资"
	} ];
	$("#busiTp").combobox('loadData', data);

	var serviceReq = [ {
		"id" : '1',
		"text" : "有追索转让",
		"selected" : true
	}, {
		"id" : '2',
		"text" : "无追索转让"
	} ];
	$("#serviceReq").combobox('loadData', serviceReq);

	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000006',
			cacheType : 'comm'
		},
		callBackFun : function(data) {
			if (data.success) {
				$('#invCcy').combobox('loadData', data.rows);
			}
		}
	};
	SCFUtils.ajax(opt);
}

function cntrctQueryAjax(cntrctNo) {

	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000008',
			cntrctNo : cntrctNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				$('#selId').val(data.rows[0].selId);
				$('#selNm').val(data.rows[0].selNm);
				$('#buyerId').val(data.rows[0].buyerId);
				$('#buyerNm').val(data.rows[0].buyerNm);
				$('#busiTp').combobox('setValue',data.rows[0].busiTp);
				$('#serviceReq').combobox('setValue',data.rows[0].serviceReq);
			}
		}
	};
	SCFUtils.ajax(opt);
}
//查询发票主表
function invcMQueryAjax(sysRefNo) {

	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000064',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadForm('invcMForm', data.rows[0]);
			}
		}
	};
	SCFUtils.ajax(opt);
}

//查询发票E表
function invcEQueryAjax(sysRefNo) {

	var opt = {
		url : SCFUtils.AJAXURL,
		data : {
			queryId : 'Q_P_000065',
			sysRefNo : sysRefNo
		},
		callBackFun : function(data) {
			if (data.success && !SCFUtils.isEmpty(data.rows)) {
				SCFUtils.loadForm('invcMForm', data.rows[0]);
			}
		}
	};
	SCFUtils.ajax(opt);
}

function getDate(date){
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
	+ (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

function pageOnInt(data) {
	ajaxBox();
}

function pageOnLoad(data) {
	invcMQueryAjax(data.obj.sysRefNo);
	cntrctQueryAjax(data.obj.cntrctNo);
	$('#invSts').val('CLOSED');
	$('#invBal').numberspinner('setValue',0);
	$('#trxDt').datebox('setValue', getDate(new Date()));
	
}

function pageOnResultLoad(data) {
	SCFUtils.loadForm('invcMForm',data);
	
}

function pageOnPreLoad(data) {
	SCFUtils.loadForm('invcMForm',data);
}

function pageOnReleasePageLoad(data) {
	invcEQueryAjax(data.obj.sysRefNo);
	cntrctQueryAjax(data.obj.cntrctNo);
	$('#trxDt').datebox('setValue', getDate(new Date()));
}

function pageOnReleaseResultLoad(data) {
	pageOnResultLoad(data);
}

function pageOnReleasePreLoad(data) {
	pageOnResultLoad(data);
}


function comTime(a, b) {
   var arr = a.split("-");
   var starttime = new Date(arr[0], arr[1], arr[2]);
   var starttimes = starttime.getTime();

   var arrs = b.split("-");
   var lktime = new Date(arrs[0], arrs[1], arrs[2]);
   var lktimes = lktime.getTime();

   if (starttimes < lktimes) {
       return true;
   }
   else {
	   return false;
   }

}

function check(){
	var flag = false;
	var invLoanBal = $('#invLoanBal').numberspinner('getValue');
	if(invLoanBal>0){
		SCFUtils.alert("应收账款有未冲销的融资，不允许提交！");
		flag = true;
		}
	var invDueDt = $('#invDueDt').datebox('getValue');
	var date = getDate(new Date());
	if(comTime(invDueDt,date)){
		SCFUtils.alert("应收账款已到期， 不允许提交！");
		flag = true;
	}
	return flag;
}

function onNextBtnClick() {
	if(check()){
		return ;
	}
	return  SCFUtils.convertArray('invcMForm');
}





/**
 * @desc 公共工具类.
 * @comment: 大家自行添加，自行维护。
 * @date 2015-01-28
 * @author hyy
 */
function userLoginType(value, row, index) {
	if (value === "login") {
		return "在线";
	}
	if (value === "logoff") {
		return "离线";
	}
	return "";
}
function userType(value, row, index) {
	if (value === "0") {
		return "系统级";
	}

	if (value === "5") {
		return "供应商级";
	}
	if (value === "7") {
		return "游客级";
	}
	if (value === "9") {
		return "默认级";
	}
	return "";
}
function ipFormat(value, row, index) {
	if (value === "0:0:0:0:0:0:0:1") {
		return "127.0.0.1";
	}
	return value;
}
function isBooleanFormater(value, row, index) {
	if (value === "Y") {
		return "是";
	}
	if (value === "N") {
		return "否";
	}
	return "";
}

function ccyFormater(value, row, index) {
	if (SCFUtils.isEmpty(value)) {
		var field = $(this)[0].field;
		row[field] = 0;
		value = 0;
	}
	return SCFUtils.ccyFormatNoPre(value, 2);
}

function numberFormater(value, row, index) {
	if (SCFUtils.isEmpty(value)) {
		var field = $(this)[0].field;
		row[field] = 0;
		value = 0;
	}
	return value;
}

function dateFormater(value, row, index) {
	if (SCFUtils.isEmpty(value)) {
		row[$(this)[0].field] = "";
		value = "";
		return value;
	}
	var newValue = SCFUtils.dateFormat(value, 'yyyy-MM-dd');
	row[$(this)[0].field] = newValue; // 将row的值也改为格式化后的日期
	return newValue;
}

function dateTimeFormater(value, row, index) {
	if (SCFUtils.isEmpty(value)) {
		row[$(this)[0].field] = "";
		value = "";
		return value;
	}
	var newValue = SCFUtils.dateFormat(value, 'yyyy-MM-dd HH:mm:ss');
	row[$(this)[0].field] = newValue; // 将row的值也改为格式化后的日期
	return newValue;
}

function brTpFormater(value, row, index) {
	if (value === "0") {
		return "总行";
	}
	if (value === "1") {
		return "分行";
	}
	if (value === "2") {
		return "支行";
	}
	return "办事处";
}

function acTpFormater(value, row, index) {
	if (value === "1") {
		return "保理专户";
	}
	return "一般账户";
}

function custacTpFormater(value, row, index) {
	if (value === "1") {
		return "保理专户";
	}
	if (value === "2") {
		return "一般账户";
	}
	if (value === "3") {
		return "付款账户";
	}
	if (value === "4") {
		return "保理商业务账号";
	}
	if (value === "5") {
		return "再保理保理专户";
	}
	return "";
}

function acFlagFormater(value, row, index) {
	if (value === "R") {
		return "实体账号";
	}
	return "虚拟账号";
}

function busiTpFormater(value, row, index) {
	if (value === "0") {
		return "应付款融资";
	}
	if (value === "1") {
		return "";
	}
}

function busiTypeFormater(value, row, index) {
	if (value === "0") {
		return "国内有追索权保理";
	}
	if (value === "1") {
		return "国内无追索权保理";
	}
	if (value === "2") {
		return "先票款后货";
	}
	if (value === "3") {
		return "信用保险项下";
	}
	if (value === "4") {
		return "现货动态";
	}
	if (value === "5") {
		return "现货静态";
	}
	if (value === "6") {
		return "应收账款池融资";
	}
	if (value === "7") {
		return "应收账款质押";
	}
	if (value === "8") {
		return "国内买方单笔保理";
	}
	if (value === "9") {
		return "国内买方单笔保理池";
	}
	if (value === "10") {
		return "仓单质押";
	}
	if (value === "11") {
		return "三方保兑仓";
	}
}

function finaStsFormater(value, row, index) {
	if (value === "0") {
		return "待放款";
	} else if (value === "1") {
		return "已放款";
	} else if (value === "2") {
		return "已部分还款";
	} else {
		return "已全额还款";
	}
}

function pmtStsFormater(value, row, index) {
	if (value === "0") {
		return "待核销";
	} else if (value === "1") {
		return "已核销";
	} else {
		return "异常核销";
	}
}

function trxStsFormater(value, row, index) {
	if (value === "M") {
		return "已提交";
	} else {
		return "处理中";
	}
}

function incomeStatusFormater(value, row, index) {
	if (value === "0") {
		return "支出";
	} else {
		return "收入";
	}
}

function verifSeqFormater(value, row, index) {
	if (value === "1") {
		return "按应收账款到期日期顺序";
	}
	return "按融资到期日顺序";
}

function patnerTpFormater(value, row, index) {
	if (value === "1") {
		return "进口保理商";
	}
	if (value === "2") {
		return "出口保理商";
	}
	if (value === "3") {
		return "保险公司";
	}
	if (value === "4") {
		return "监管机构";
	}
	return "仓库";
}

function collatTpFormater(value, row, index) {
	if (value === "0") {
		return "其他";
	}
	if (value === "1") {
		return "质押";
	}
	if (value === "2") {
		return "抵押";
	}
	if (value === "3") {
		return "保证";
	}
	return "信用";
}

function arTypeFormater(value, row, index) {
	if (value === "0") {
		return "订单";
	}
	if (value === "1") {
		return "发票";
	}
	if (value === "2") {
		return "货运单";
	}
	if (value === "3") {
		return "合同";
	}
	if (value === "4") {
		return "其他";
	}
	if (value === "5") {
		return "账单";
	}
	if (value === "6") {
		return "贷项清单";
	}
	return "";
}

function invStsFormater(value, row, index) {
	if (value === "TRF") {
		return "应收账款转让";
	}
	if (value === "LOAN") {
		return "融资";
	}
	if (value === "BUYERPMT") {
		return "买方还款";
	}
	if (value === "SELPMT") {
		return "卖方还款";
	}
	if (value === "INDPMT") {
		return "间接还款";
	}
	if (value === "CBK") {
		return "反转让";
	}
	if (value === "CRN") {
		return "贷项清单";
	}
	return "";
}

function adviceFormter(value, row, index) {
	if (value === "1") {
		return "未读";
	}
	if (value === "2") {
		return "已读";
	}
	if (value === "3") {
		return "重要";
	}
	if (value === "4") {
		return "再提醒";
	} else {
		return "删除";
	}
}

function adPayTpFormter(value, row, index) {
	if (value === "0") {
		return "成员企业";
	}
	if (value === "1") {
		return "自有资金";
	} else {
		return "其它";
	}
}

function getRed(value, row, index) {
	if (value === "Y") {
		return 'background-color:#ffee00;color:red;';
	}
}

function accNoFormatter(value, row, index) {
	switch (value) {
	case "6330101":
		return "(6330101)应收国内保理款项（有索赔权）";
	case "6340101":
		return "(6340101)应付国内保理款项（有索赔权）";
	case "2010000":
		return "(2010000)存款相关科目";
	case "5110033":
		return "(5110033)手续费收入--保理业务";
	case "1470301":
		return "(1470301)国内保理预支价金保理系统专用--有索赔权";
	}
}

function approvalStsFormater(value, row, index) {
	if (value === "0") {
		return "未审核";
	}
	if (value === "1") {
		return "审核通过";
	}
	if (value === "2") {
		return "审核不通过";
	}
	return "";
}

function contractStatusFormater(value, row, index) {
	if (value === "0") {
		return "未签约";
	}
	if (value === "1") {
		return "已签约";
	}
	if (value === "2") {
		return "签约中";
	}
	return "";
}

function incomeFlagFormater(value, row, index) {
	if (value == "0") {
		return "应付";
	}
	if (value === "1") {
		return "应收";
	}
	return "";
}

function currIncomeFlagFormater(value, row, index) {
	if (value == "0") {
		return "营业外收入";
	}
	if (value === "1") {
		return "营业外支出";
	}
	return "";
}

function productStsFormater(value, row, index) {
	if (value == "0") {
		return "即将上线";
	}
	if (value === "1") {
		return "已上线";
	}
	return "";
}

// 判断供应商的注册状态
function registFormter(value, row, index) {
	if (value === "0") {
		return "未注册";
	}
	if (value === "1") {
		return "已注册";
	}
}

function catalogRegistFormter(value, row, index) {
	if (row.sysRefNo == null)
		value = 0;
	else
		value = 1;

	if (value === "0") {
		return "未注册";
	}
	if (value === "1") {
		return "已注册";
	}
}

function catalogCustNmFormter(value, row, index) {

	if (value === "0") {
		return "未注册";
	}
	if (value === "1") {
		return "已注册";
	}
}

function custTpFormater(value, row, index) {
	if (value == "1") {
		return "卖方";
	}
	if (value == "2") {
		return "买方";
	}
	if (value == "3") {
		return "资方";
	}
}

function bussTypeFormater(value, row, index) {
	if (value == "1") {
		return "个人";
	}
	if (value == "2") {
		return "对公";
	}
}

function cretTypeFormater(value, row, index) {
	if (value == "0") {
		return "身份证";
	}
	if (value == "1") {
		return "组织机构代码";
	}
}

function feeTpFormater(value, row, index) {
	if (value == "0") {
		return "应收账款转让手续费";
	}
	if (value == "1") {
		return "融资手续费";
	}
	if (value == "2") {
		return "单据处理费";
	}
}

function workItemState(value, row, index) {
	if (value === "0") {
		return "未激活";
	}
	if (value === "1") {
		return "初始化";
	}
	if (value === "2") {
		return "等待申请";
	}
	if (value === "3") {
		return "申请中";
	}
	if (value === "4") {
		return "运行中";
	}
	if (value === "5") {
		return "挂起";
	}
	if (value === "6") {
		return "完成";
	}
	if (value === "7") {
		return "终止";
	}
	if (value === "9") {
		return "被撤销";
	}
	return "";
}
function payIntTp(value, row, index) {
	if (value == '1') {
		return "预收息";
	}
	if (value == '2') {
		return "利随本清";
	}
	if (value == '3') {
		return "按月扣息";
	}
	if (value == '4') {
		return "按季扣息";
	}
	if (value == '5') {
		return "按年扣息";
	}
	return "";
}

function invStsNewFormater(value, row, index) {
	if (value === "0") {
		return "登记";
	} else if (value === "1") {
		return "转让";
	} else if (value === "2") {
		return "融资";
	}else if (value === "3") {
		return "反转让";
	}else if (value === "4") {
		return "贷项清单";
	}else if (value === "5") {
		return "买方还款";
	}else if (value === "6") {
		return "间接还款";
	}else if (value === "7") {
		return "争议登记";
	}else if (value === "8") {
		return "争议解决";
	}else if (value === "9") {
		return "发票调整";
	}else if (value === "10") {
		return "卖方还款";
	}
}

function loanTpFormter(value, row, index) {
	if (value === "1") {
		return "保理预付款";
	} else if (value === "2") {
		return "保理授信";
	} else if (value === "3") {
		return "银承";
	} else if (value === "4") {
		return "流贷";
	}
}

function dspFormater(value, row, index) {
	if (value === "0") {
		return "买方收到发票重复";
	} else if (value === "1") {
		return "买方没有收到发票";
	} else if (value === "2") {
		return "其他";
	}
}

function intTpFormater(value, row, index) {
	if (value === "0") {
		return "正常利息";
	} else if (value === "1") {
		return "逾期利息";
	} else if (value === "2") {
		return "展期利息";
	} else if (value === "3") {
		return "呆账利息";
	}
}

function pectType(value, row, index) {
	return value + '%';
}

function costTypeFormater(value,row,index){
	if(value === '0'){
		return "融资手续费";
	}else if(value === '1'){
		return "应收账款处理费";
	}
}

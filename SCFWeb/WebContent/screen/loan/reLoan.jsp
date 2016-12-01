<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>融资申请页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/reLoan.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
	<form id="loanSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="融资信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">融资编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="sysRefNo" id="sysRefNo"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div class="item">
				<span class="label">交易日期：</span>
				<div class="fl item-ifo">
					<input type="text" name="trxDt" id="trxDt" class="easyui-datebox"
						editable="false"
						data-options="width:'253px',height:'32px',panelWidth:'253px'" />
				</div>
			</div>
			<div class="item">
				<span class="label">协议编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="cntrctNo" id="cntrctNo"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div class="item">
				<span class="label">业务类别：</span>
				<div class="fl item-ifo">
					<input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">授信客户编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="selId" id="selId"
						class="easyui-validatebox combo" required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">授信客户名称：</span>
				<div class="fl item-ifo">
					<input type="text" name="selNm" id="selNm"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div class="item">
				<span class="label">币种：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id=ccy name="ccy"
						data-options="width:'253px',height:'32px',valueField: 'sysRefNo',
					textField: 'textField',panelHeight: 'auto' "
						editable="false" required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">融资余额：</span>
				<div class="fl item-ifo">
					<input editable="false" name="openLoanAmt" id="openLoanAmt"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','" />
				</div>
			</div>
			<div class="item">
				<span class="label">借款金额：</span>
				<div class="fl item-ifo">
					<input name="ttlLoanAmt" id="ttlLoanAmt" class="easyui-numberbox"
						required="true"
						data-options="width:'253px',height:'32px',min:0,precision:2,
					groupSeparator:',',validType:'maxLength[18]'" />
				</div>
			</div>
			<div class="item">
				<span class="label">应收账款可融资额度：</span>
				<div class="fl item-ifo">
					<input editable="false" name="arAvalLoan" id="arAvalLoan"
						class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','" />
				</div>
			</div>
			<div class="item">
				<span class="label">利率：</span>
				<div class="fl item-ifo">
					<input name="loanRt" id="loanRt" class="easyui-numberspinner"
						data-options="width:'253px',height:'32px',min:0,precision:4,max:100,suffix:'%'"
						required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">费率：</span>
				<div class="fl item-ifo">
					<input type="text" name="finChgrt" id="finChgrt"
						class="easyui-numberspinner"
						data-options="width:'253px',height:'32px',min:0,precision:4,max:100,suffix:'%'" />
				</div>
			</div>
			<div class="item">
				<span class="label">扣息方式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="payIntTp" name="payIntTp"
						data-options="width:'253px',height:'32px',valueField: 'id',textField: 'text',panelHeight: 'auto' "
						editable="false" required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">扣费方式：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="payChgTp" name="payChgTp"
						data-options="onChange:changeCost,width:'253px',height:'32px',valueField: 'id',textField: 'text',panelHeight: 'auto' "
						editable="false" required="true" />
				</div>
			</div>
<!-- 			<div class="item"> -->
<!-- 				<span class="label">应收费用：</span> -->
<!-- 				<div class="fl item-ifo"> -->
<!-- 					<input id="currFinCost" name="currFinCost" editable="false" -->
<!-- 						class="easyui-validatebox combo" /> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div class="item"> -->
<!-- 				<span class="label">本次已收费用：</span> -->
<!-- 				<div class="fl item-ifo"> -->
<!-- 					<input id="currFinPayCost" name="currFinPayCost" editable="false" -->
<!-- 						class="easyui-validatebox combo" /> -->
<!-- 				</div> -->
<!-- 			</div> -->
			<div class="item">
				<span class="label">借款人收款账号：</span>
				<div class="fl item-ifo">
					<input id="selAcNo" name="selAcNo" editable="false" required="true"
						class="easyui-validatebox combo" />
				</div>
			</div>
			<div class="item">
				<span class="label">户名：</span>
				<div class="fl item-ifo">
					<input id="selAcNm" name="selAcNm" class="easyui-validatebox combo"
						editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">开户行名：</span>
				<div class="fl item-ifo">
					<input id="selAcBkNm" name="selAcBkNm"
						class="easyui-validatebox combo" editable="false" />
				</div>
			</div>
			<div class="item">
				<span class="label">放款资金来源：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="advaPaytype" name="advaPaytype"
						data-options="width:'253px',height:'32px',valueField: 'id',textField: 'text',panelHeight: '68px' "
						editable="false" required="true" />
				</div>
			</div>

			<input type="hidden" id="arAvalLoanHD" name="arAvalLoanHD" /> <input
				type="hidden" id="openLoanAmtHD" name="openLoanAmtHD" />
			<!-- 					借款余额 -->
			<input type="hidden" name="ttlLoanBal" id="ttlLoanBal" />
			<!-- 					融资比例 -->
			<input type="hidden" name="loanPerc" id="loanPerc" />
			<!-- 					融资状态 -->
			<input type="hidden" name="finaSts" id="finaSts" />
			<!-- 					客户等级 -->
			<input type="hidden" name="custLevel" id="custLevel" />
			<!-- 					融资类型 -->
			<input type="hidden" name="finaTp" id="finaTp" />
			<!-- 					融资起始日-->
			<input type="hidden" name="loanValDt" id="loanValDt" />
			<!-- 					融资到期日 -->
			<input type="hidden" name="loanDueDt" id="loanDueDt" />
			<!-- 					开户行 -->
			<input type="hidden" name="selAcBkNo" id="selAcBkNo" />
			<!-- 					成员编号-->
			<input type="hidden" name="buyerId" id="buyerId"></input>
		</div>
	</form>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>融资进度查询页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/loanDetail.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
	<form id="loanSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="融资信息" data-options="collapsible:true">			
			<div class="item">
				<span class="label">融资编号：</span>
				<div class="fl item-ifo"><input type="text" name="sysRefNo" id="sysRefNo"
					class="easyui-validatebox combo"/></div>
			</div>
			<div class="item">
				<span class="label">交易日期：</span>
				<div class="fl item-ifo"><input type="text" name="trxDt" id="trxDt"
					class="easyui-datebox" editable="false"
					data-options="width:'253px',height:'32px',panelWidth:'253px'"/></div>
			</div>
			<div class="item">
				<span class="label">协议编号：</span>
				<div class="fl item-ifo"><input type="text" name="cntrctNo" id="cntrctNo"
					class="easyui-validatebox combo"/></div>
			</div>
			<div class="item">
				<span class="label">业务类别：</span>
				<div class="fl item-ifo"><input id="busiTp" name="busiTp" class="easyui-combobox"
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
					editable="false"/></div>
			</div>
			<div class="item">
				<span class="label">币种：</span>
				<div class="fl item-ifo"><input class="easyui-combobox" id=ccy name="ccy"
					data-options="width:'253px',height:'32px',valueField: 'sysRefNo',textField: 'textField',panelHeight: 'auto' "
					editable="false" required="true" /></div>
			</div>
			<div class="item">
				<span class="label">融资比例：</span>
				<div class="fl item-ifo"><input name="loanPerc" id="loanPerc"
					class="easyui-numberspinner"
					data-options="width:'253px',height:'32px', min:0,precision:2,max:100,suffix:'%'"/></div>
			</div>
			<div class="item">
				<span class="label">借款金额：</span>
				<div class="fl item-ifo"><input name="ttlLoanAmt" id="ttlLoanAmt"
					class="easyui-numberbox" required="true"
					data-options="width:'253px',height:'32px',min:0,
					precision:2,groupSeparator:',',validType:'maxLength[18]'"/></div>
			</div>
			<div class="item">
				<span class="label">借款余额：</span>
				<div class="fl item-ifo"><input name="ttlLoanBal" id="ttlLoanBal"
					class="easyui-numberbox" required="true"
					data-options="width:'253px',height:'32px',min:0,
					precision:2,groupSeparator:',',validType:'maxLength[18]'"/></div>
			</div>
			<div class="item">
				<span class="label">借款账号：</span>
				<div class="fl item-ifo"><input id="selAcNo" name="selAcNo" class="easyui-combobox"
					data-options="width:'253px',height:'32px',valueField:'acNo',textField:'acNo',panelHeight: 'auto'"
					editable="false" required="true" /></div>
			</div>
			<div class="item">
				<span class="label">融资起始日：</span>
				<div class="fl item-ifo"><input type="text" name="loanValDt" id="loanValDt"
					class="easyui-datebox" editable="false"
					data-options="width:'253px',height:'32px',panelWidth:'253px'"/></div>
			</div>
			<div class="item">
				<span class="label">融资到期日：</span>
				<div class="fl item-ifo"><input type="text" name="loanDueDt" id="loanDueDt"
					class="easyui-datebox" editable="false" required="true"
					data-options="width:'253px',height:'32px',panelWidth:'253px'"/></div>
			</div>			
			<div class="item">
				<span class="label">利率：</span>
				<div class="fl item-ifo"><input name="loanRt" id="loanRt"
					class="easyui-numberspinner"
					data-options="width:'253px',height:'32px',min:0,precision:4,max:100,suffix:'%'"
					required="true"/></div>
			</div>
			<div class="item">
				<span class="label">费率：</span>
				<div class="fl item-ifo"><input type="text" name="finChgrt" id="finChgrt"
					class="easyui-numberspinner"
					data-options="width:'253px',height:'32px',min:0,precision:4,max:100,suffix:'%'"/></div>
			</div>
			<div class="item">
				<span class="label">扣息方式：</span>
				<div class="fl item-ifo"><input class="easyui-combobox" id="payIntTp"
					name="payIntTp"
					data-options="width:'253px',height:'32px',valueField: 'id',textField: 'text',panelHeight: 'auto' "
					editable="false" required="true" /></div>
			</div>
			<div class="item">
				<span class="label">扣费方式：</span>
				<div class="fl item-ifo"><input class="easyui-combobox" id="payChgTp"
					name="payChgTp"
					data-options="width:'253px',height:'32px',valueField: 'id',textField: 'text',panelHeight: 'auto' "
					editable="false" required="true" /></div>
			</div>
			<div class="item">
				<span class="label">融资状态：</span>
				<div class="fl item-ifo"><input class="easyui-combobox" id="finaSts" name="finaSts"
					data-options="width:'253px',height:'32px',valueField: 'id',textField: 'text',panelHeight: 'auto' "
					editable="false" required="true" />
					
					</div>
			</div>
			<div class="item">
					<input type="hidden" name="selId" id="selId"/>
					<input type="hidden" name="selNm" id="selNm"/>
					<input type="hidden" name="openLoanAmt" id="openLoanAmt"/>
					<input type="hidden" name="arAvalLoan" id="arAvalLoan"/>
<!-- 					当前系统交易日：用于打印回执单 -->
					<input type="hidden" name="sysData" id="sysData" value="${sysUserInfo.sysDate }"/>
<!-- 					当前打印次数，回执单功能 -->
					<input type="hidden" name="buyerId" id="buyerId"/>
					<input type="hidden" name="buyerNm" id="buyerNm"/>
					<input type="hidden" name="buyerAc" id="buyerAc"/>
					<input type="hidden" name="buyerBkNm" id="buyerBkNm"/>
<!-- 					<input type="hidden" name="selId" id="selId"/> -->
					<input type="hidden" name="printNumber" id="printNumber"/>
					<input type="hidden" name="selAc" id="selAc"/>
					<input type="hidden" name="selBkNm" id="selBkNm"/>
			</div>
		</div>
	</form>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>还款手动核销页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/fundRef.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF">
	<form id="loanSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="添加资金流页面" data-options="collapsible:true">
			<div class="item">				
					<span class="label">资金编号：</span>
					<div class="fl item-ifo">
						<input  type="text" name="sysRefNo" id="sysRefNo" class="easyui-validatebox combo" />
					</div>					
			</div>
			<div class="item">				
					<span class="label">入账账号：</span>
					<div class="fl item-ifo">
						<input  type="text" name="payAcNo" id="payAcNo" class="easyui-validatebox combo" required="true"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">付款人账号：</span>
					<div class="fl item-ifo">
						<input  type="text" name="selAcNo" id="selAcNo" class="easyui-validatebox combo" required="true" />
					</div>					
			</div>
			<div class="item">				
					<span class="label">还款金额：</span>
					<div class="fl item-ifo">
						<input  name="ttlPmtAmt" id="ttlPmtAmt" class="easyui-numberbox"
						data-options="width:'253px',height:'32px',min:0,precision:2,groupSeparator:','" required="true"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">到账日期：</span>
					<div class="fl item-ifo">
						<input type="text" name="pmtDt" id="pmtDt"
					 data-options="width:'253px',height:'32px',panelWidth:'253px'"	class="easyui-datebox" editable="false" required="true"></input>
					</div>					
			</div>
			<div class="item">				
					<span class="label">付款人名称：</span>
					<div class="fl item-ifo">
						<input  type="text" name="payerNm" id="payerNm" class="easyui-validatebox combo" required="true"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">付款银行代码：</span>
					<div class="fl item-ifo">
						<input  type="text" name="bkCd" id="bkCd" class="easyui-validatebox combo"/>
					</div>					
			</div>
			<div class="item">				
					<span class="label">附言：</span>
					<div class="fl item-ifo">
						<input  type="text" name="remark" id="remark" class="easyui-validatebox combo"/>
					</div>					
			</div>
			<div class="fl item-ifo">
						<input  type="hidden" name="compSts" id="compSts" />
						<input type="hidden" name="trxDt" id="trxDt" value="${sysUserInfo.sysDate }"/>
			</div>	
		</div>
	</form>
</body>
</html>
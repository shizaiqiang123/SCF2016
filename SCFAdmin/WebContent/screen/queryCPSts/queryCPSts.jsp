<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>动产质押池状态查询页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/queryCPSts/queryCPSts.js"></script>
</head>
<body class="UTSCF">
	<form id="queryCPSts">
		<div id="collatSum" style="width: 100%" class="easyui-panel"
			title="质物汇总信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>监管方名称：</td>
					<td><input type="text" name="patnerNm" id="patnerNm"></td>
					<td>监管方额度：</td>
					<td><input name="patnerBal" id="patnerBal"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input>
				</tr>
				<tr>
					<td>有效质物价值总计：</td>
					<td><input name="sumAmt" id="sumAmt"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input>
				</tr>
				<tr>
					<td><input type="hidden" name="sysRefNo" id="sysRefNo" /></td>
					<td><input type="hidden" name="fundRt" id="fundRt" /></td>
				</tr>
			</table>
			<table class="easyui-datagrid" id="collatTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
		<div id="cntrctInfo" style="width: 100%" class="easyui-panel"
			title="融资敞口信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>额度金额：</td>
					<td><input name="lmtAmt" id="lmtAmt"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input>
					<td>额度余额：</td>
					<td><input name="lmtBal" id="lmtBal"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input>
				</tr>
				<tr>
					<td>最大可用敞口：</td>
					<td><input name="maxlmtAmt" id="maxlmtAmt"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input>
					<td>已占用敞口：</td>
					<td><input name="openLoanAmt" id="openLoanAmt"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input>
				</tr>
				<tr>
					<td>质物价值*质押率：</td>
					<td><input name="sumAmtRt" id="sumAmtRt"
						class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2"></input>
				</tr>
			</table>
		</div>
		<div id="loanInfo" style="width: 100%" class="easyui-panel"
			title="未结清授信信息" data-options="collapsible:true">
			<table class="easyui-datagrid" id="loanTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
	</form>
</body>
</html>
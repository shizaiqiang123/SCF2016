<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增担保页面</title>
<!-- <script type="text/javascript" src="srcipt/cntrct/custColla.js"></script> -->
<script type="text/javascript" src="srcipt/cntrct/custColla1.js"></script>
</head>
<body class="UTSCF">
<div id="userAdd" class="div_ul">
	<form id="custCollaForm">
	<div id="custCollaDiv" style="width: 100%" class="easyui-panel"
			title="担保信息" data-options="collapsible:true">
       <table align="center" border=0 width=85% height=60%>
			<tr>
				<td>担保人名称：</td>
				<td>
				<input type="text" class="easyui-validatebox combo" name="collatCorpNm" id="collatCorpNm" required="true" data-options="validType:'maxLength[50]'"></input>
				</td>
				<td>担保品名称：</td>
				<td><input type="text" class="easyui-validatebox combo" name="collatNm" id="collatNm" required="true" data-options="validType:'maxLength[50]'"></input></td>
			</tr>
			<tr>
				<td>担保方式：</td>
				<td><input class="easyui-combobox"  id="collatTp" name="collatTp" required="true"
				 	data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'" 
				 	editable="false"/></td>
				<td>币种：</td>
				<td><input class="easyui-combobox"  id="collatCcy" name="collatCcy" required="true"
				 	data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" 
				 	editable="false"/></td>
			</tr>
			<tr>
				<td>担保价值：</td>
				<td><input  name="collatVal" id="collatVal" class="easyui-numberbox"
					data-options="min:0,precision:2,groupSeparator:','"></input></td>
				<td><input type="text" name="sysRefNo" id="sysRefNo"></td>
				<td><input type="text" name="trxId" id="trxId"></td>
			</tr>
		</table>
	  </div>
	</form>
</div>
</body>
</html>
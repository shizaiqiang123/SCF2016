<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增应收账款、费用页面</title>
<script type="text/javascript" src="script/invc/invcCbkEdit.js"></script>
</head>
<body>
<form id="invcCbkEditForm">
<div id="invcCbkEditDiv" style="margin:auto; margin-top:50px">
	<table class="utTab" align="center" height="50%">
    		<tr>
    			<td>应收账款凭证编号：</td>
    			<td><input type="text"  name="invNo"  id="invNo" class="easyui-validatebox combo"  required="true"  ></td>
    			<td>币别：</td>
    			<td><input class="easyui-combobox"  id="invCcy" name="invCcy"
				 	data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" 
				 	 editable="false" ></td>
    		</tr>
    		<tr>	
    			<td>应收账款金额：</td>
    			<td><input type="text"  name="invAmt" id="invAmt"   data-options="min:0,precision:2,groupSeparator:','" class ="easyui-numberbox"></td>
    			<td>应收账款净额：</td>
    			<td><input id="invBal" name ="invBal" data-options="min:0,precision:2,groupSeparator:','"  class ="easyui-numberbox" ></td>
    		</tr>
    		<tr>	
    			<td>反转让金额：</td>
    			<td><input name="chgBcAmt" id="chgBcAmt" data-options="min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'" class ="easyui-numberbox" required="true"></td>
    		</tr>
    		<tr>
    			<td><input  type="hidden" name="invSts" id="invSts" value="CBK"></td>
    			<td><input type="hidden"  name="sysRefNo"  id="sysRefNo"></td>
    			<td><input type="hidden"  name="cntrctNo"  id="cntrctNo" ></td>
    			<td><input type="hidden"  name="invcId"  id="invcId" ></td>
    			<td><input type="hidden"  name="trxId"  id="trxId" ></td>
    			<td><input type="hidden"  name="invBalHD"  id="invBalHD" ></td>
    		</tr>
	</table>
</div>
</form>
</body>
</html>
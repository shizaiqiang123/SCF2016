<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="script/bankM/bankM.js"></script>
<title>往来银行信息</title>
</head>
<body>
<form id="bankMForm">
<div id="bankMDiv">
	<table class="utTab">
			<tr>
    			<td>银行编号：</td>
    			<td><input type="text"  name="sysRefNo"  id="sysRefNo" class="easyui-validatebox combo" data-options="validType:'maxLength[10]'"></td>
    			<td>银行名称：</td>
    			<td><input type="text"  name="bkNm"  id="bkNm" class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[10]'"></td>
    		</tr>
    		<tr>
    			<td>银行网点名称(英文)：</td>
    			<td><input type="text"  name="bkEnNm" id="bkEnNm" class="easyui-validatebox combo" data-options="validType:['noChinese','maxLength[70]']"></td>
    			<td>银行地址：</td>
    			<td><input type="text"  name="bkAddr" id="bkAddr" class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[140]'"></td>
    		</tr>
    		<tr>
    			<td>所属国家：</td>
    			<td><input type="text"  name="bkOwnerCtry" id="bkOwnerCtry" class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[3]'"></td>
    			<td>电话：</td>
    			<td><input type="text"  name="bkTel" id="bkTel" class="easyui-validatebox combo" data-options="validType:'telphone'"></td>
    		</tr>	
    		<tr>
    			<td>传真：</td>
    			<td><input type="text"  name="bkFax" id="bkFax" class="easyui-validatebox combo" data-options="validType:'maxLength[15]'"></td>
    			<td>电邮：</td>
    			<td><input type="text"  name="bkEmail" id="bkEmail" class="easyui-validatebox combo" data-options="validType:'email'"></td>
    		</tr>
	</table>
</div>
</form>
</body>
</html>
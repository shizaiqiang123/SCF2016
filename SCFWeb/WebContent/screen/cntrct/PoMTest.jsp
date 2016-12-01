<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增关联信息页面</title>
<script type="text/javascript" src="script/cntrct/PoMTest.js"></script>
</head>
<body>
<form id="addPoMForm">
<div id="addPoMDiv">
	<table class="utTab">
			<tr>
    			<td>订单编号：</td>
    			<td><input type="text"  name="poNo"  id="poNo" class="easyui-validatebox combo"  data-options="validType:'maxLength[35]'" required="true"></td>
    			<td>协议名称：</td>
    			<td><input type="text"  name="cntrctNo"  id="cntrctNo" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></td>
    		</tr>
    		<tr>
    			<td>间接客户编号：</td>
    			<td><input type="text"  name="buyerId"  id="buyerId" class="easyui-validatebox combo"  data-options="validType:'maxLength[35]'" required="true"></td>
    			<td>授信客户名称：</td>
    			<td><input type="text"  name="selId"  id="selId" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></td>
    		</tr>
    		<tr>
    			<td><input  type="hidden" name="sysRefNo" id="sysRefNo"></td>
				<td><input type="hidden"  name="sysEventTimes" id="sysEventTimes" value="${sysUserInfo.sysDate}"/></td>
    		</tr>
	</table>
</div>
</form>
</body>
</html>
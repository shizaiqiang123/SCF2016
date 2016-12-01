<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>UnLock 页面</title>
<script type="text/javascript" src="js/sys/SYS_UnLock.js"></script>
</head>
<body>
<form id='mainForm'>
	<div id="mainDiv" style="width: 100%; height: 200px" class="easyui-panel" title="基本信息" data-options="collapsible:true">
		<table class="utTab">
			<tr>
				<td>sysRefNo：</td>
				<td><input type="text" class="easyui-validatebox combo" name = "sysRefNo" value = "" id ="sysRefNo" requried="true" data-options="validType:'maxLength[35]'">
				</td>
				<td>sysOpId：</td>
				<td><input type="text" class="easyui-validatebox combo" name="sysOpId" value="" id= "sysOpId" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>sysOpTm：</td>
				<td><input type="text" class="easyui-validatebox combo" name = "sysOpTm" value = "" id =  "sysOpTm" requried="true"></td>
				<td>sysRelId：</td>
				<td><input type="text" class="easyui-validatebox combo" name="sysRelId" value="" id  = "sysRelId" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>sysRelTm：</td>
				<td><input type="text" class="easyui-validatebox combo" name="sysRelTm" value="" id  = "sysRelTm"/></td>
				<td>sysNextOp：</td>
				<td><input type="text" class="easyui-validatebox combo" name="sysNextOp" value="" id  = "sysNextOp" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>sysLockFlag：</td>
				<td><input type="text" class="easyui-validatebox combo" name="sysLockFlag" value="" id  = "sysLockFlag"  data-options="validType:'maxLength[1]'"/></td>
				<td>sysLockBy：</td>
				<td><input type="text" class="easyui-validatebox combo" name="sysLockBy" value="" id  = "sysLockBy" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>sysFuncId：</td>
				<td><input type="text" class="easyui-validatebox combo" name="sysFuncId" value="" id  = "sysFuncId" data-options="validType:'maxLength[35]'"/></td>
				<td>sysTrxSts：</td>
				<td><input type="text" class="easyui-validatebox combo" name="sysTrxSts" value="" id  = "sysTrxSts" data-options="validType:'maxLength[1]'"/></td>
			</tr>
			<tr>
				<td>sysEventTimes：</td>
				<td><input type="text" class="easyui-validatebox combo" name="sysEventTimes" value="" id  = "sysEventTimes" data-options="validType:['number','maxLength[35]']"/></td>
			</tr>
		</table>

		</div>
	</form>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Parameter delete 页面</title>
<script type="text/javascript" src="js/para/Para_Delete.js"></script>
</head>
<body>
<form id='mainForm'>
	<div id="mainDiv" style="width: 100%; height: 280px" class="easyui-panel" title="基本信息" data-options="collapsible:true">
		<table class="utTab">
			<tr>
				<td>sysRefNo：</td>
				<td><input class="easyui-validatebox combo" name = "sysRefNo" value = "" id = "sysRefNo">
				</td>
				<td>sysOpId：</td>
				<td><input class="easyui-validatebox combo" name="sysOpId" value="" id= "sysOpId"/></td>
			</tr>
			<tr>
				<td>Para Id：</td>
				<td><input class="easyui-validatebox combo"
					 name = "paraId" value = "" id = "paraId" data-options="validType:'maxLength[35]'">
				</td>
				<td>Para Name：</td>
				<td><input class="easyui-validatebox combo"
					 name="paraName" value="" id= "paraName" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>Para Type：</td>
				<td><input class="easyui-validatebox combo"
					 name = "paraTp" value = "" id = "paraTp" data-options="validType:'maxLength[10]'">
				</td>
				<td>Para Path：</td>
				<td><input class="easyui-validatebox combo"
					 name="paraPath" value="" id= "paraPath" data-options="validType:'maxLength[10]'"/></td>
			</tr>
			
			<tr>
				<td>sysOpTm：</td>
				<td><input class="easyui-validatebox combo" name = "sysOpTm" value = "" id = "sysOpTm"></td>
				<td>sysRelId：</td>
				<td><input class="easyui-validatebox combo" name="sysRelId" value="" id = "sysRelId"/></td>
			</tr>
			<tr>
				<td>sysRelTm：</td>
				<td><input class="easyui-validatebox combo" name="sysRelTm" value="" id = "sysRelTm"/></td>
				<td>sysNextOp：</td>
				<td><input class="easyui-validatebox combo" name="sysNextOp" value="" id = "sysNextOp"/></td>
			</tr>
			<tr>
				<td>sysLockFlag：</td>
				<td><input class="easyui-validatebox combo" name="sysLockFlag" value="" id = "sysLockFlag"/></td>
				<td>sysLockBy：</td>
				<td><input class="easyui-validatebox combo" name="sysLockBy" value="" id = "sysLockBy"/></td>
			</tr>
			<tr>
				<td>sysFuncId：</td>
				<td><input class="easyui-validatebox combo" name="sysFuncId" value="" id = "sysFuncId"/></td>
				<td>sysTrxSts：</td>
				<td><input class="easyui-validatebox combo" name="sysTrxSts" value="" id  = "sysTrxSts"/></td>
			</tr>
			<tr>
				<td>sysEventTimes：</td>
				<td><input class="easyui-validatebox combo" name="sysEventTimes" value="" id = "sysEventTimes"/></td>
			</tr>
		</table>

		</div>
	</form>
</body>
</html>
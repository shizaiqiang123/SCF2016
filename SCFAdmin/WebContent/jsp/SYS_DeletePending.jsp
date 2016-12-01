<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>复核</title>
<script type="text/javascript" src="js/SYS_DeletePending.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id='mainForm' action='submit'>
		<div id="dd" class="easyui-panel" title="删除在途提交页面" data-options="collapsible:true">
			<div class="item">
				<span class="label">系统流水号:</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="sysRefNo" id="sysRefNo" />
				</div>
			</div>
			<div class="item">
				<span class="label">序列号:</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="sysEventTimes" id="sysEventTimes" />
				</div>
			</div>
			<div class="item">
				<span class="label">上一操作员编号:</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="preSysUserId" id="preSysUserId" />
				</div>
			</div>
			<div class="item">
				<span class="label">上一操作员姓名:</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="preSysUserNm" id="preSysUserNm" />
				</div>
			</div>
			<div class="item">
				<span class="label">上次操作时间:</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo" name="preSysUserTm" id="preSysUserTm" />
					<input type="hidden" name="sysOpIdCopy" id="sysOpIdCopy" value="${sysUserInfo.userRefNo}">
				</div>
			</div>
		</div>
		<input type="hidden" name="sysRelId" id="sysRelId" />
		<input type="hidden" name="sysRelTm" id="sysRelTm" />
		<input type="hidden" name="sysOpId" id="sysOpId" />
		<input type="hidden" name="sysOpTm" id="sysOpTm" />
	</form>
	<!-- <input type="radio" name="isAgree" value="Y" checked="checked" width = 200  onclick="closeDiv('div1')"/>同意
		<input type="radio" name="isAgree" value="N"  onclick="openDiv('div1')"/>拒绝  
		<div id="div1" style="display: none;">
			复核意见:<input type="text" name="sysRelReason"  id="sysRelReason">-->
</body>
</html>
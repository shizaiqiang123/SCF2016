<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="js_cs.jsp"%>
<!DOCTYPE html>
<html>
<head>
<title>复核</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/SYS_Release_HaveDeletePeding.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id='mainForm' action='submit'>
		<div id="dd" class="easyui-panel" title="复核页面" style="width: 100%" 
			data-options="collapsible:true">
			<div class="item">
				<span class="label">系统流水号：</span>
				<div class="fl item-ifo">
					<input type="text" name="sysRefNo" id="sysRefNo" class="easyui-validatebox combo"/>
				</div>
			</div>
			<div class="item">	
				<span class="label">序列号：</span>
				<div class="fl item-ifo">
					<input type="text" name="sysEventTimes" id="sysEventTimes" class="easyui-validatebox combo"/>
				</div>
			</div>
			<div class="item">
				<span class="label">操作员编号：</span>
				<div class="fl item-ifo">
					<input type="text" name="sysOpId" id="sysOpId" class="easyui-validatebox combo"/>
				</div>
			</div>
			<div class="item">
				<span class="label">操作时间：</span>
				<div class="fl item-ifo">
					<input type="text" name="sysOpTm" id="sysOpTm" class="easyui-validatebox combo"/>
				</div>
			</div>
			<div class="item" style="padding: 0px 5px;">
				<span class="label">&nbsp;</span>
				<div class="fl item-ifo" style="margin-top: 10px;padding-left:60px;">
					同意：<input type="radio" checked="checked" name="isAgree" id="checkedY" value="Y" onclick="closeArea()" />
					拒绝：<input type="radio" name="isAgree" id="checkedN" value="N" onclick="openArea()" />
				</div>
			</div>			
			<div class="item">
				<span class="label">复核意见：</span>
				<div class="fl item-ifo">
					<input class="easyui-textbox"
					data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[500]'"
					style="width: 253PX; height: 50px" name="sysRelReason"
					id="sysRelReason" />
				</div>
			</div>
			<input type="hidden" id="submitMessage" name ="submitMessage">
		</div>
	</form>
</body>
</html>
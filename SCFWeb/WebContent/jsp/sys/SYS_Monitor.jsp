<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<%-- <%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>  --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>数据监控详情</title>
<script type="text/javascript" src="js/sys/SYS_Monitor.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<!-- <script src="js/plugin/ckeditor/ckeditor.js"></script> -->
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
<!-- 	<div id="notice" > -->
		<form id="noticeForm">
	<div id="noticeDiv" class="easyui-panel" title="监控信息" data-options="collapsible:true" style="width: 100%;height:200px">	
				<div class="item">
				<span class="label">监控项目：</span>
				<div class="fl item-ifo">
<!-- 					<input class="easyui-validatebox combo" name="roleId" id="roleId" -->
<!-- 						required="true" /> -->
						<input class="easyui-combobox"  id="MonitorBox" name="MonitorBox"
				 	data-options="valueField: 'id',textField: 'text',panelHeight: '100px',width:'253px',height:'32px'"  
				 	 editable="false" required="true"/>
				</div>
			</div>
			<div class="item">
				<span class="label">时间选择：</span>
				<div class="fl item-ifo">
<!-- 					<input class="easyui-validatebox combo" name="roleId" id="roleId" -->
<!-- 						required="true" /> -->
						<input class="easyui-combobox"  id="MonitorTimeBox" name="MonitorTimeBox"
				 	data-options="valueField: 'id',textField: 'text',panelHeight: '80px',width:'253px',height:'32px'"  
				 	 editable="false" required="true"/>
				</div>
			</div>
<!-- 				<table class="utTab"> -->
<!-- 				<tr> -->
<!-- 					<td></td> -->
<!-- 				<td></td> -->
<!-- 				<td><input class="easyui-combobox"  id="MonitorBox" name="MonitorBox" -->
<!-- 				 	data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"   -->
<!-- 				 	style="width:150px;" editable="false" required="true"> -->
<!-- 				</input></td> -->
<!-- 					<td></td> -->
<!-- 				</tr> -->
<!-- 				<tr> -->
<!-- 				<td></td> -->
<!-- 				<td>时间选择</td> -->
<!-- 				<td><input class="easyui-combobox"  id="MonitorTimeBox" name="MonitorTimeBox" -->
<!-- 				 	data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"   -->
<!-- 				 	style="width:150px;" editable="false" required="true"></td> -->
<!-- 				<td></td> -->
<!-- 				</tr> -->
<!-- 				<tr> -->
<%-- 				<td><input type="hidden" name="sysRefNo" id="sysRefNo" value="${sysUserInfo.userRefNo}"></input></td> --%>
<!-- 				</tr> -->
<!-- 			</table> -->
			</div>
		</form>
<!-- 	</div> -->
</body>
</html>
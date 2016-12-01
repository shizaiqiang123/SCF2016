<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>菜单页面</title>
<script type="text/javascript" src="js/sys/MenuManage.js"></script>
</head>
<body>
	<div id="lookupDiv"></div>
	<div id="module">
		<form id="moduleForm">
			<input type="reset" id="addReset">
			<div id="mainDiv" style="width: 100%; height: 250px"
				class="easyui-panel" title="基本信息" data-options="collapsible:true">
				<table class="utTab">
				
					<tr>

						<td>菜单编号</td>
						<td><input id="sysRefNo" name="sysRefNo" type="text" class="easyui-validatebox combo" data-options="validType:'maxLength[32]'" required="true"/></td>
						<td>是否为父模块：</td>
						<td><input id="IsparentBox" class="easyui-combobox"
							dataType="Require"
							data-options="onChange:isMenuChange, valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"  required="true" name="isparent"></input></td>
					</tr>
					<tr>
						<td>功能编号：</td>
						<td><input type="text" class="easyui-validatebox"
							name="menuId" id="menuId" dataType="Require" required="true"></input>
							<a href="javascript:void(0)" class="easyui-linkbutton" id="newId"
							iconcls="icon-add" onclick="newId()" plain="true">取新编号</a></td>
						<td>菜单名称：</td>
						<td><input type="text" class="easyui-validatebox"
							name="menuName" id="menuName" dataType="Require" required="true"></input></td>
					</tr>
					<tr>
						<td>父模块：</td>
						<td><input type="text" class="easyui-combotree"
							name="menuParentid" id="menuParentid"
							data-options="valueField: 'id',textField: 'text',state:'closed', panelHeight: 'auto',panelMaxHeight :'150PX'"
							editable="false"  required="true" /></td>
						</td>
						<td>序号：</td>
						<td><input class="combo" name="menuNum" id="menuNum"
							class="easyui-validatebox combo"  data-options="validType:['number','maxLength[22]']" required="true"></td>
					</tr>
					<tr>
						<td>菜单级别：</td>
						<td><input type="text" class="easyui-combobox" name="menuTp"
							id="menuTp"
							data-options="valueField: 'typeNo',textField: 'typeName', panelHeight: 'auto'"
							editable="false"  required="true" /> <input
							type="hidden" id="sysUserType" name="sysUserType"
							value="${sysUserInfo.userRole }" /></td>
					</tr>
				</table>
			</div>
		</form>
	</div>
</body>
</html>
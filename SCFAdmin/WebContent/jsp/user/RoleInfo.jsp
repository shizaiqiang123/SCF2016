<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/user/RoleInfo.js"></script>
<title>角色管理</title>
<style type="text/css">
.tree {
  margin: 0;
  padding-left: 300;
  list-style-type: none;
}
</style>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="roleForm">
		<div id="roleDiv" class="easyui-panel" title="角色信息" data-options="collapsible:true" style="width: 100%">
			<div class="item">
				<span class="label">角色编号：</span>
				<div class="fl item-ifo">
					<input class="easyui-validatebox combo" name="roleId" id="roleId"
						required="true" />
				</div>
			</div>
			<div class="item">
				<span class="label">角色描述：</span>
				<div class="fl item-ifo">
					<input class="easyui-validatebox combo" name="roleName"
						id="roleName" required="true"
						data-options="validType:'maxLength[35]'" />
				</div>
			</div>
			<div class="item">
				<span class="label">角色类型：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="roleType" name="roleType"
						data-options="onChange:changeRoleType,valueField:'typeNo',textField:'typeName',panelHeight: 'auto',width:'253px',height:'32px'"
					 editable="false"></input>
				</div>
			</div>
			<div class="item">
				<span class="label">角色级别：</span>
				<div class="fl item-ifo">
					<input class="easyui-combobox" id="roleLevel" name="roleLevel"
						data-options="onChange:changeRoleType,valueField:'id',textField:'text',panelHeight: 'auto',width:'253px',height:'32px'"
						 editable="false"></input>
				</div>
			</div>
			<div class="item">
				<span class="label">产品名称：</span>
				<div class="fl item-ifo">
					<input class="easyui-validatebox combo" name="productNm"
						id="productNm"></input> <a id="selectProduct"
						class="easyui-linkbutton" icon="icon-search"
						onclick="showLookUpWindow()">产品查询</a>
				</div>
			</div>
			<div class="easyui-panel" title="角色菜单树"
				data-options="collapsible:true" style="width: 100%">
				<div class="item">
					<ul id="perInfoDiv" class="easyui-tree"></ul>
					<input id="menuTree" name="menuTree" type="hidden" /> <input
						id="menuSysRefNo" name="menuSysRefNo" type="hidden" /> <input
						id="sysRefNo" name="sysRefNo" type="hidden" /> <input id="role"
						name="role" type="hidden" value="${sysUserInfo.userRole }" /> <input
						type="hidden" name="productId" id="productId"
						class="easyui-validatebox combo" />
				</div>
			</div>
		</div>
	</form>
</body>
</html>
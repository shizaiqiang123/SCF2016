<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>Accounting Add</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="js/para/Accounting_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
		<div id="mainDiv" style="width: 100%; height: 200px"
			class="easyui-panel" title="基本信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>Id：</td>
					<td><input class="easyui-validatebox combo" name="id" id="id"
						required="true" data-options="validType:'maxLength[35]'" /> <a
						href="javascript:void(0)" class="easyui-linkbutton" id="newId"
						iconcls="icon-add" onclick="newId()" plain="true">生成会计科目文件</a></td>
				</tr>
			</table>
		</div>

		<div id="logicNodeDiv" style="width: 100%;"
			class="easyui-panel" title="会计科目信息"
			data-options="collapsible:true">
			<div id="pageToolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="addLogicNode" iconcls="icon-add" onclick="addLogicNode()"
					plain="true" style="float:right;margin-right:14px;">添加科目</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="editLogicNode" iconcls="icon-edit"
					onclick="editLogicNode()" plain="true" style="float:right;">修改科目</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					id="delLogicNode" iconcls="icon-remove" onclick="delLogicNode()"
					plain="true" style="float:right;">删除科目</a>
			</div>
			<table class="easyui-datagrid" id="logicNodeDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
		</div>
		<!--  <input type="hidden" name="sysRefNo" value="" id="sysRefNo"> 
		<input type="hidden" name="paraTp" value="accounting" id="paraTp">-->
	</form>


</body>
</html>
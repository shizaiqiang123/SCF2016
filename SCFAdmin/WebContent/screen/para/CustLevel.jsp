<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<style type="text/css">
#mainDiv td {
	text-align: center
}
input, button {
	border-width: 0;
	outline: 0;
	font-family: 'Microsoft Yahei';
}

html, body, div, ul {
	margin: 0 auto;
	padding: 0;
}
</style>
<head>
<title>客户等级维护</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script\para\CustLevel.js"></script>
</head>
<body class="SYS_Catalog">
	<div class="divGrid">
		<form id="screenForm">
			<div class="easyui-panel blockArea panel-body" title="查询条件"
				data-options="collapsible:true" style="width: 100%">
				<ul class="condList clearfix" id="screenDiv">
					<li class="condLists fL clearfix">
						<label class="dsB fL tR">等级描述：</label>
						<span class="dsB fL"><input type="text"
							id="levelDesc" class="easyui-validatebox combo" name=levelDesc>
						</span>
					</li>
					<li class="condLists fL clearfix">
						<label class="dsB fL tR">等级编号：</label>
						<span class="dsB fL">
							<input type="text"
							id="levelCd" class="easyui-validatebox combo" name="levelCd">
						</span>
					</li>
					<li class="condLists fR catlogBtn tR"><button
							class="dsIB mR10 blockAreaBtn white disabled" type="button"
							onclick="onResetBtnClick();">重 置</button>
						<button class="f14 schBtn white" type="button"
							onclick="onSearchBtnClick();">查 询</button></li>
				</ul>
			</div>

			<div id="mainDiv" class="easyui-panel" title="查询结果"
				 style="display: block; width: 100%">
				<div id="pageToolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="addButton" iconcls="icon-add" onclick="addButton()"
					plain="true" style="float:right;margin-right:14px;">添加</a> 
					<a href="javascript:void(0)"
					class="easyui-linkbutton" id="editButton" iconcls="icon-edit"
					onclick="editButton()" plain="true" style="float:right;">修改</a> 
					<a href="javascript:void(0)" class="easyui-linkbutton"
					id="delTransforNode" iconcls="icon-remove" onclick="delButton()"
					plain="true" style="float:right;">删除</a>
			</div>
				<table id="searchTable" cellspacing="0" cellpadding="0" width="100%"
					align="center">
				</table>
			</div>
		</form>
	</div>
</body>
</html>
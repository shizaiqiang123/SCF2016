<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<style type="text/css">
#mainDiv td {
	text-align: center
}

input,button {
	border-width: 0;
	outline: 0;
	font-family: 'Microsoft Yahei';
}

html,body,div,ul {
	margin: 0 auto;
	padding: 0;
}
</style>
<head>
<title>授信额度查询</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script\invc\queryLimit.js"></script>
</head>
<body class="SYS_Catalog">
	<div class="divGrid">
		<form id="screenForm">
			<div class="easyui-panel blockArea panel-body" title="查询条件"
				data-options="collapsible:true" style="width: 100%">
				<ul class="condList clearfix" id="screenDiv">
					<li class="condLists fL clearfix"><label class="dsB fL tR">业务类型：</label>
						<span class="dsB fL"> <input type="text" id="busiTp"
							class="easyui-combobox" name="busiTp"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'176px',height:'32px'" />
					</span></li>
					<li class="condLists fR catlogBtn tR">
						<button class="dsIB mR10 blockAreaBtn white disabled"
							type="button" onclick="onResetBtnClick();">重 置</button>
						<button class="f14 schBtn white" type="button"
							onclick="onSearchBtnClick();">查 询</button>
					</li>
				</ul>
			</div>

			<div id="mainDiv" class="easyui-panel" title="查询结果"
				style="display: block; width: 100%">
				<div id="pageToolbar"></div>
				<table id="searchTable" cellspacing="0" cellpadding="0" width="100%"
					align="center">
				</table>
			</div>
		</form>
	</div>
</body>
</html>
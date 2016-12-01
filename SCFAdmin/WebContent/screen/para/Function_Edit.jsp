<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>筛选页面</title>
<!-- <script type="text/javascript" src="js/scfjs/Formater.js"></script> -->
<script type="text/javascript" src="script/para/Function_Edit.js"></script>
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
</head>
<body class="SYS_Catalog">
	<div class="divGrid">
		<form id=ScreenMenuForm>
			<div class="easyui-panel blockArea panel-body" title="查询条件"
				data-options="collapsible:true" style="width: 100%">
				<!-- <table id="screenDiv" class="table_screen" style="width: 100%">
					<tr>
						<td align="center">参数编号：<input type="text" id="menuId"
							name="menuId"></td>
						<td align="left">参数名称：<input type="text" id="menuName"
							name="menuName"></td>
					</tr>
					<tr>
						<td></td>
						<td style="align: right">
							<button type="button"
								class="dsIB mR10 blockAreaBtn white disabled"
								onclick="onResetBtnClick();">重置</button>
							<button type="button" class="f14 schBtn white"
								onclick="onSearchBtnClick();">查询</button>
						</td>
					</tr>
				</table> -->

				<ul class="condList clearfix" id="screenDiv">
					<li class="condLists fL clearfix"><label class="dsB fL tR">参数编号：</label><span
						class="dsB fL inputWrap w150"><input type="text"
							id="menuId" class="w150 inputM1" name="menuId"></span></li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">参数名称：</label><span
						class="dsB fL inputWrap w150"><input type="text"
							id="menuName" class="w150 inputM1" name="menuName"></span></li>
					<li class="condLists fR catlogBtn tR"><button
							class="dsIB mR10 blockAreaBtn white disabled" type="button"
							onclick="onResetBtnClick();">重 置</button>
						<button class="f14 schBtn white" type="button"
							onclick="onSearchBtnClick();">查 询</button></li>
				</ul>

			</div>

			<div id="mainDiv" class="panel easyui-fluid" title="查询结果"
				data-options="collapsible:true" style="display: block; width: 100%">
				<table id="searchTable" cellspacing="0" cellpadding="0" width="100%"
					align="center">
				</table>
			</div>
		</form>
	</div>
</body>
</html>
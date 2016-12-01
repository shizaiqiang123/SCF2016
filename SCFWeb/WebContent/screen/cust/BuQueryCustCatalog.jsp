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
<title>供应商信息查询报表</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script\cust\BuQueryCustCatalog.js"></script>
</head>
<body class="SYS_Catalog">
	<div class="divGrid">
		<form id="screenForm">
			<div class="easyui-panel blockArea panel-body" title="查询条件"
				data-options="collapsible:true" style="width: 100%">
				<ul class="condList clearfix" id="screenDiv">
					<li class="condLists fL clearfix"><label class="dsB fL tR">授信客户名称：</label>
						<span class="dsB fL"> <input type="text" id="custNm"
							class="inputM1 combo" name="custNm" />
					</span></li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">成员企业编号：</label>
						<span class="dsB fL"> <input type="text" id="cyRefNo"
							class="inputM1 combo" name="cyRefNo" />
					</span></li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">成员企业名称：</label>
						<span class="dsB fL"> <input type="text" id="cyNm"
							class="inputM1 combo" name="cyNm" />
					</span></li>
					<li class="condLists fL clearfix"><label class="dsB fL tR">营业执照号码：</label>
						<span class="dsB fL"> <input type="text" id="licenceNo"
							class="inputM1 combo" name="licenceNo" />
					</span></li>
					<li class="condLists fR catlogBtn tR">
						<button class="dsIB mR10 blockAreaBtn white" style="background:#999999;"
							type="button" onclick="onResetBtnClick();">重 置</button>
						<button class="f14 schBtn white" type="button"
							onclick="onSearchBtnClick();">查 询</button>
					</li>
				</ul>
			</div>
			<input type="hidden" id="sysRefNo" name="sysRefNo" /> <input
				type="hidden" name="userOwnerId" id="userOwnerId"
				value="${sysUserInfo.userOwnerId}"> <input type="hidden"
				id="custTp" name="custTp" />

			<div id="mainDiv" class="easyui-panel" title="查询结果"
				style="display: block; width: 100%">
				<table id="searchTable" cellspacing="0" cellpadding="0" width="100%"
					align="center">
				</table>
			</div>
		</form>
	</div>
</body>
</html>
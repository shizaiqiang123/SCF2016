<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<style type="text/css">
#mainDiv {
	text-align: center;
	align:center;
}
#mainDiv div,td {
	text-align: center;
	align:center;
}

input,button {
	border-width: 0;
	outline: 0;
	font-family: 'Microsoft Yahei';
}
div {
	margin: 0 0 0 0;
	padding: 0;
}
html,body,ul {
	margin: 0 auto;
	padding: 0;
}
</style>
<head>
<title>授信额度查询</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script\cntrct\CustQueryLimit.js"></script>
<script type="text/javascript" src="js/plugin/highchart/highcharts.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 0 0 0">
	<form id="screenForm">
		<div id="regist">
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

			<div id="mainDiv" class="easyui-panel form" " title="查询结果"
				style="display: block; width: 100%">
				<div id="pageToolbar"></div>
				<table id="searchTable" cellspacing="0" cellpadding="0" width="100%"
					align="center">
				</table>
			</div>


			<div id="mainDiv" class="easyui-panel form" title="额度占用报表"
				data-options="collapsible:true"
				style="width: 100%; height: 600px; min-height: 150px;">
				<div id="container" style="width: 98%; height: 99%; min-height: 20%; min-width: 20%; max-width: 120%; min-height: 20%; max-height: 120%; "></div>
			</div>

			<div class="blockAreaFooter clearfix mB20">
				<div class="fL blockAreaNotice red">
					<p class="blockAreaNoticeTitle fWb">温馨提示：</p>
					<p class="blockAreaNoticeTxt">您可以点击饼图中数据块进入详细分析页面！</p>
				</div>
			</div>

			<input type="hidden" value="${sysUserInfo.userRefNo }" id="sysRefNo"
				name="sysRefNo" /> <input type="hidden" id="userOwnerid"
				name="userOwnerid" /> <input type="hidden" id="rowSysRefNo"
				name="rowSysRefNo" />
		</div>
	</form>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>成员企业信息</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/cntrct/verify_addCompany.js"></script>
</head>
<body>
	<div>
		<div id="searchDiv" class="easyui-panel" title="查询条件"
			data-options="collapsible:true" style="width: 100%" align="center">
			<form id="searchForm">
				<div class="item">
					<span class="label" style="width: 300px; height: 36px;">成员企业名称：</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" name="custNm" id="custNm" />
						<button class="f14 schBtn white" type="button"
							onclick="searchCompanyInfo()">查 询</button>
					</div>
				</div>
			</form>
			<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
				cellpadding="0" width="100%" iconCls="icon-edit">
			</table>
		</div>
		<div id="searchDiv" class="easyui-panel" title="成员企业信息"
			data-options="collapsible:true" style="width: 100%" align="center">
			<form id='mainForm'>
				<div class="item">
					<span class="label">成员企业编号：</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" name="buyerid"
							id="buyerid" data-options="width:'253px',height:'32px'" />
					</div>
				</div>
				<div class="item">
					<span class="label">成员企业名称：</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" name="buyernm" id="buyernm"
							data-options="width:'253px',height:'32px'" />
					</div>
				</div>

			</form>
		</div>
	</div>


</body>
</html>
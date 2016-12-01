<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>产品信息</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/cntrct/cntrctModel_addProduct.js"></script>
</head>
<body>
	<div>
		<div id="searchDiv" class="easyui-panel" data-options="collapsible:true" style="width: 100%" align="center">
			<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
				cellpadding="0" width="100%" iconCls="icon-edit">
			</table>
		</div>
		<div id="searchDiv" class="easyui-panel" title="成员企业信息"
			data-options="collapsible:true" style="width: 100%" align="center">
			<form id='mainForm'>
				<div class="item">
					<span class="label">产品编号：</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" name="productId"
							id="productId" data-options="width:'253px',height:'32px'" />
					</div>
				</div>
				<div class="item">
					<span class="label">产品名称：</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" name="productNm" id="productNm"
							data-options="width:'253px',height:'32px'" />
					</div>
				</div>
			</form>
		</div>
	</div>


</body>
</html>
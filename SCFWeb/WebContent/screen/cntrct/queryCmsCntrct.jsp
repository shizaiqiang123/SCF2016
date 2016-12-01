<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>信贷额度查询</title>
<script type="text/javascript" src="script/cntrct/queryCmsCntrct.js"></script>
</head>
<body>
	<div class="easyui-panel" title="查询条件"
			data-options="collapsible:true" style="width: 100%" align="center">
	<form id="searchForm">
		<!-- <label>间接客户编号：</label>
		<input type="text"  name ="sysRefNo" id="sysRefNo" title="间接客户编号" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/>
		<label>组织机构代码：</label>
		<input type="text"  name ="custInstCd" id="custInstCd" title="间接客户编号" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/>
		
		<a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchCimCust()">查询</a> -->
					<input type="hidden" id="cmsCustNo" name = "cmsCustNo"/>
	</form>

	<table id="dg" title="查询信息列表" class="easyui-datagrid"
				cellspacing="0" cellpadding="0" width="100%" iconCls="icon-edit">
	</table>
		
	</div>
</body>
</html>
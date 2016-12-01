<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>间接客户查询</title>
<script type="text/javascript" src="script/specialReport/queryInvAmtReport.js"></script>
</head>
<body>
	<div class="easyui-panel" title="查询条件"
			data-options="collapsible:true" style="width: 100%" align="center">
		<form id="searchForm">
			<label>查询起始日：</label>
			<td><input type="text"  name="invValDt" id="invValDt" class="easyui-datebox"></input></td>
			<label>查询到期日：</label>
			<td><input type="text"  name="invDueDt" id="invDueDt" class="easyui-datebox"></input></td>		
			<a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchCimCust()">查询</a>
		</form>
	</div>
	<input type="file" id="file_input" name="file_input" /> 
	<div class="easyui-panel" title="报表显示" id="result"
			data-options="collapsible:true" style="width: 100%" align="center">
			<img  height="1000" alt="Image preview..." id="asd">
	</div>
</body>
</html>
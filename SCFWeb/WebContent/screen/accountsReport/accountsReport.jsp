<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应收账款明细报表页面</title>
<script type="text/javascript" src="script/accountsReport/accountsReport.js"></script>
</head>
<body>
<div id="userAdd" class="div_ul">
	<form id="custForm">
	<input type="reset" id ="addReset">
       <table class="utTab">
			<tr>
				<td>授信客户id ：</td>
				<td>
				<input  class="easyui-validatebox combo" name="selId" id="selId" required="true" data-options="validType:'maxLength[35]'" onChange="queryCust()"></input>
				<a class="easyui-linkbutton" icon="icon-search" onclick="selLookUpWindow()">查询</a>
				</td>
				<td>授信客户名称   ： </td>
				<td><input  class="easyui-validatebox combo" name="selNm" id="selNm"  data-options="validType:'maxLength[35]'"></input></td>
			</tr>
		</table>
	</form>
</div>
</body>
</html>
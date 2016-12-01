<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>通知</title>
<%
	String title = new String(request.getParameter("title").getBytes("ISO-8859-1"), "utf-8");
%>
</head>
<body>
<table id="toDoList" class="easyui-datagrid" data-options="fitColumns:false,singleSelect:true,height:'250px'">
		<thead>
			<tr>
				<th data-options="field:'title',width:240,align:'center' "><%=title %></th>
				<th data-options="field:'name',width:170,align:'center' ">操作员</th>
				<th data-options="field:'time',width:170,align:'center' ">操作时间</th>
			</tr>
		</thead>
	</table>
</body>
</html>
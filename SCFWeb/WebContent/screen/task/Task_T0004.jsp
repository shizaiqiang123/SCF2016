<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>Task Add</title>
     <script type="text/javascript" src="script/task/Task_T0004.js"></script>
</head>
<body>
	<form id='mainForm'>
		<table class="utTab">
			<tr>
				<td>paraId：</td>
				<td><input type="text" name = "paraId" value = "" id =  "paraId">
				</td>
				<td>paraName：</td>
				<td><input type="text" name="paraName" value="" id= "paraName"/></td>
			</tr>
			<tr>
				<td>paraTp：</td>
				<td><input type="text" name="paraTp" value="" id  = "paraTp"/></td>
				<td>paraPath：</td>
				<td><input type="text" name="paraPath" value="" id  = "paraPath"/></td>
			</tr>
		</table>
	</form>
</body>
</html>
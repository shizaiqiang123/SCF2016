<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>待办事项</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="js/sys/SYS_TodoList.js"></script>
</head>
<body class="UTSCF">
	<div id="pmtDiv" style="width: 100%" class="easyui-panel" title="待办任务"
		data-options="collapsible:true">
		<div class="divGrid">
			<form id="todoForm">
				<table id="todoTable" cellspacing="0" cellpadding="0" width="100%">
				</table>
				<input type="hidden" name="funPath" id="funPath"></input>
			</form>
		</div>
	</div>
</body>
</html>
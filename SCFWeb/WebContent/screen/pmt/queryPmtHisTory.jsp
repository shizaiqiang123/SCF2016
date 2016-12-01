<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>融资时计算利息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/pmt/queryPmtHisTory.js"></script>
</head>
<body>
	<div >
	<form >
			<input type="hidden" name ="loanId" id="loanId" title="融资Id"/>
	</form>
	<table id="dg" title="查询利息费用列表" class="easyui-datagrid"
				cellspacing="0" cellpadding="0" width="100%" iconCls="icon-edit">
	</table>
		
	</div>
</body>
</html>
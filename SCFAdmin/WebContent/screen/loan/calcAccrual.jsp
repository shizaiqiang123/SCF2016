<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>融资时计算利息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/calcAccrual.js"></script>
</head>
<body>
	<div >
	<form >
			<input type="hidden" name ="ttlLoanAmt" id="ttlLoanAmt" title="借款金额"/>
			<input type="hidden" name ="custLevel" id="custLevel" title="借款金额"/>
			<input type="hidden" name ="finaTp" id="finaTp" title="借款金额"/>
			<input type="hidden" name ="busiTp" id="busiTp" title="借款金额"/>
	</form>
	<table id="dg" title="查询利息/费用列表" class="easyui-datagrid"
				cellspacing="0" cellpadding="0" width="100%" iconCls="icon-edit">
	</table>
		
	</div>
</body>
</html>
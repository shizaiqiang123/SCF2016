<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
     <title>添加科目信息</title>
     <script type="text/javascript" src="js/para/Accounting_Account_Add.js"></script>
</head>
<body>
	<form id='mainForm'>
		<table class="utTab">
			<tr>
				<td>会计科目类型：</td>
				<td><input class="easyui-validatebox combo"
					 name = "accType" value = "" id = "accType" data-options="validType:'maxLength[35]'"></td>
				<td>会计科目名称：</td>
				<td><input class="easyui-validatebox combo"
					 name="accNm" value="" id= "accNm" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
				<td>会计科目编号：</td>
				<td><input class="easyui-validatebox combo"
 					 name = "accNo" id = "accNo"  data-options="validType:'maxLength[35]'"/>
				</td>
			</tr>
			
			<tr>
				<td><input type="hidden" name="sysRefNo" value="" id="sysRefNo"></td>
				<td><input type="hidden" name="oprateTm" value="" id="oprateTm"></td>
				<td><input type="hidden" name="accId" value="" id="accId"></td>
			</tr>
			
		</table>
		
	</form>
</body>
</html>
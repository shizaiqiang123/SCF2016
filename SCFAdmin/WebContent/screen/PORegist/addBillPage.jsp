<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加票据信息页面</title>
<script type="text/javascript" src="script/PORegist/addBillPage.js"></script>
</head>
<body>
<form id="addBillForm" style="margin:auto; margin-top:50px">
<div id="addBillDiv">
	<table class="utTab" align="center" height="50%">
			<tr>
    			<td>票号：</td>
    			<td><input type="text"  name="billNo"  id="billNo" class="easyui-validatebox combo"  data-options="validType:'maxLength[35]'" required="true"></td>
    			<td>出票金额：</td>
    			<td><input type="text"  name="billAmt"  id="billAmt" class="easyui-numberspinner" required="true" data-options="min:0,precision:2,groupSeparator:',',validType:'maxLength[18]',onChange:changeBillAmt"></td>
    		</tr>
    		<tr>
    			<td>起始日：</td>
    			<td><input type="text"  name="billValDt"  id="billValDt" class="easyui-datebox" editable="false" required="true"></td>
    			<td>到期日：</td>
    			<td><input type="text"  name="billDueDt"  id="billDueDt" class="easyui-datebox" editable="false" required="true"></td>
    		</tr>
    		<tr>
    			<td>收票人：</td>
    			<td><input type="text" name="billRecp" id="billRecp"class="easyui-validatebox combo"  data-options="validType:'maxLength[35]'" required="true"></input></td>
    			<td>收票人账号：</td>
    			<td><input type="text" name="billRecpAcno" id="billRecpAcno"class="easyui-validatebox combo"  data-options="validType:['number','maxLength[35]']" required="true"></input></td>
    		</tr>
    		<tr>
    			<td><input type="hidden" id="sysRefNo" name="sysRefNo"/></td>
    			
    			<td><input type="hidden"  name="billBal"  id="billBal"/></td>
    			<td><input id="loanId" name="loanId" type="hidden" ></td>
    			<td><input id="cntrctNo" name="cntrctNo" type="hidden" ></td>
    			<td><input id="loanValDt" name="loanValDt" type="hidden" ></td>
    			<td><input id="loanDueDt" name="loanDueDt" type="hidden" ></td>
    			<td><input id="billNoOld" name="billNoOld" type="hidden" ></td>
    		</tr>
	</table>
</div>
</form>
</body>
</html>
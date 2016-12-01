<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>调整贷项清单金额</title>
<script type="text/javascript" src="script/invc/invcCdnPoolEdit.js"></script>
</head>
<body>
<form id="CollateralForm">
<div id="CollateralDiv" style="margin:auto; margin-top:50px">
	<table class="utTab" align="center" height="50%">
			<tr>
    			<td>授信额度编号:</td>
    			<td><input type="text"  name="cntrctNo"  id="cntrctNo"></td>
    			<td>币别:</td>
    			<td><input type="text"  name="invCcy"  id="invCcy"></td>
    		</tr>
    		<tr>
    			<td>授信客户编号:</td>
    			<td><input type="text"  name="selId"  id="selId"></td>
    			<td>间接客户编号:</td>
    			<td><input type="text"  name="buyerId" id="buyerId"></td>
    		</tr>
    		<tr>
    			<td>应收账款凭证号:</td>
    			<td><input type="text"  name="invNo"  id="invNo"></td>
    			<td>应收账款余额:</td>
    			<td><input type="text"  name="invBal" id="invBal" 
    			           class="easyui-numberbox"
						   data-options="min:0,precision:2,groupSeparator:','"></td>
    		</tr>
    		<tr>
    			<td>可融资金额:</td>
    			<td><input type="text"  name="invLoanAval"  id="invLoanAval"
    				       class="easyui-numberbox"
						   data-options="min:0,precision:2,groupSeparator:','"></td>
    			<td>融资余额:</td>
    			<td><input type="text"  name="invLoanBal" id="invLoanBal" 
    			           class="easyui-numberbox"
						   data-options="min:0,precision:2,groupSeparator:','"></td>
    		</tr>
			<tr>
			   	<td>融资比例：</td>
    			<td><input type="text"  name="loanPerc" id="loanPerc"
							class="easyui-numberspinner" required="true"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
				<td>冲销金额:</td>
    			<td><input type="text"  name="crnAmt" id="crnAmt" 
    			           class="easyui-numberbox"
						   data-options="onChange:changeAmt,min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"></td>
    			<!-- invCrnBal<td>最大可贷项清单金额:</td>
    			<td><input type="text"  name="rowTtlCrnBal"  id="rowTtlCrnBal" 
    			           class="easyui-numberbox"
						   data-options="mmin:0,precision:2,groupSeparator:','"></td> -->
				<td><input type="hidden" id = 'rowTtlCrnBal' name = 'rowTtlCrnBal'></input></td>
				<td><input type="hidden" id = 'invBalOld' name = 'invBalOld'></input></td>
				<td><input type="hidden" id = 'invLoanAvalOld' name = 'invLoanAvalOld'></input></td>
    		</tr>
	</table>
</div>
</form>
</body>
</html>
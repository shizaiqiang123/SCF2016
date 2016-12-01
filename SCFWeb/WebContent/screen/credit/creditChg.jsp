<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增应收账款、费用页面</title>
<script type="text/javascript" src="script/credit/creditChg.js"></script>
</head>
<body style="height: 80%">
<form id="creditChgForm">
<div id="creditChgDiv" style="margin:auto; margin-top:50px">
	<table class="utTab" align="center" height="40%">
			<tr>
    			<td>交易流水号：</td>
    			<td><input type="text"  name="sysRefNo"  id="sysRefNo"  ></td>
    			<td>买卖合同编号：</td>
    			<td><input type="text"  name="orderNo"  id="orderNo"></td>
    		</tr>
    		<tr>
    			<td>应收账款编号：</td>
    			<td><input type="text"  name="invNo"  id="invNo" class="easyui-validatebox combo"  required="true">
    			<a class="easyui-linkbutton" style="width:80px;height:22px" id="poButton"
						onclick="onSearchClick();"><label class="words">查询</label></a>  			
    			</td>
    			<td>应收账款日期：</td>
    			<td><input type="text"  name="invDt"  id="invDt" class="easyui-datebox" required="required"></td>
    		</tr>
    		<tr>
    			<td>起算日：</td>
    			<td><input type="text"  name="invValDt"  id="invValDt" class="easyui-datebox" required="required" data-options="onSelect:changeinvDueDt"></td>
    			<td>到期日：</td>
    			<td><input type="text"  name="invDueDt" id="invDueDt" class="easyui-datebox" required="required" ></td>
    		</tr>
    		<tr>
    		<td>应收账款币别：</td>
    			<td><input class="easyui-combobox"  id=invCcy name="invCcy"
				 	data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" 
				 	 editable="false" required="required"></td>
    			<td>应收账款金额：</td>
    			<td><input type="text"  name="invAmt" id="invAmt"   data-options="onChange:changeInvAmt,min:0,precision:2,groupSeparator:','" class ="easyui-numberspinner" required="required"></td>
    		</tr>
    		<tr>
    			<td>应收账款余额：</td>
    			<td><input id="invBal" name ="invBal" data-options="min:0,precision:2,groupSeparator:','"  class ="easyui-numberspinner" ></td>
    			<td>批次号：</td>
    			<td><input type="text"  name="batchNo" id="batchNo"/></td>
    		</tr>
    		<tr>
    			<td><input type="hidden"  name="cntrctNo"  id="cntrctNo" ></td>
    			<td><input type="hidden"  name="selId" id="selId" ></input></td>
    			<td><input type="hidden"  name="buyerId" id="buyerId" ></input>    		
    			<td><input type="hidden"  name="invSts" id="invSts" value="TRF"/></td>
    			<td><input type="hidden"  name="busiTp" id="busiTp" value="0"/></td>
    			<td><input type="hidden"  name="invLoanAval" id="invLoanAval" value="0"/></td>
    		</tr>
    		
	</table>
</div>
</form>
</body>
</html>
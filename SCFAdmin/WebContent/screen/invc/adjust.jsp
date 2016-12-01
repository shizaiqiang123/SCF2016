<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应收账款调整取消页面</title>
<script type="text/javascript" src="script/invc/adjust.js"></script>
</head>
<body>
<form id="invcMForm">
<div class="easyui-panel" title="应收账款信息" data-options="collapsible:true" style="width:98%">
<div id="cntrctDiv">
	<table class="utTab">
			<tr>
				<td>交易流水号：</td>
    			<td><input type="text"  name="sysRefNo"  id="sysRefNo"   ></td>
    			<td>交易日期：</td>
    			<td><input type="text"  name="trxDt" id="trxDt" class="easyui-datebox" required="required"  ></input></td>
    		</tr>
    		<tr>
    			<td>业务类别：</td>
    			<td><input id="busiTp"  name="busiTp" class="easyui-combobox" 
					data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"   ></input></td>
    			<td>授信模式：</td>
    			<td><input id="serviceReq"  name="serviceReq" class="easyui-combobox" 
					data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"   ></input></td>
    		</tr>
    		<tr>
    			<td>授信客户编号：</td>
    			<td><input type="text"  name="selId" id="selId" class="easyui-validatebox combo"  required="true"  ></input>
    			<td>授信客户名称：</td>
    			<td><input type="text"  name="selNm" id="selNm"  ></input></td>
    		</tr>
    		<tr>
    			<td>间接客户编号：</td>
    			<td><input type="text"  name="buyerId" id="buyerId" class="easyui-validatebox combo"  required="true"  ></input>
    			<td>间接客户名称：</td>
    			<td><input type="text"  name="buyerNm" id="buyerNm"  ></input></td>
    		</tr>
    		<tr>
    			<td>本次调整功能：</td>
    			<td><input id="adjTp"  name="adjTp" class="easyui-combobox" 
					data-options="onChange:changeOthers,valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"   ></input></td>
    			<td>应收账款编号：</td>
    			<td><input type="text"  name="invNo"  id="invNo" class="easyui-validatebox combo"  required="true"></td>
    		</tr>
    		<tr>
    			<td>应收账款日期：</td>
    			<td><input type="text"  name="invDt"  id="invDt" class="easyui-datebox" required="required"></td>
    			<td>起算日：</td>
    			<td><input type="text"  name="invValDt"  id="invValDt" class="easyui-datebox" required="required" ></td>
    		</tr>
    		<tr>
    			<td>到期日：</td>
    			<td><input type="text"  name="invDueDt" id="invDueDt" class="easyui-datebox" required="required" ></td>
    			<td>应收账款币别：</td>
    			<td><input class="easyui-combobox"  id=invCcy name="invCcy"
				 	data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" 
				 	 editable="false" ></td>
    		</tr>
    		<tr>
    			<td>应收账款金额：</td>
    			<td><input type="text"  name="invAmt" id="invAmt"   data-options="min:0,precision:2,groupSeparator:','" class ="easyui-numberspinner" ></td>
    			<td>应收账款余额：</td>
    			<td><input id="invBal" name ="invBal" data-options="min:0,precision:2,groupSeparator:','"  class ="easyui-numberspinner"  ></td>
    		</tr>
    		<tr>
    			<td>融资余额：</td>
    			<td><input id="invLoanBal" name ="invLoanBal" data-options="min:0,precision:2,groupSeparator:','"  class ="easyui-numberspinner" readonly="readonly" ></td>
    			<td>应收账款状态：</td>
    			<td><input id="invSts" name ="invSts" readonly="readonly"></td>
    		</tr>
    		<tr>
    		<td><input id="sysNo" name ="sysNo" type="hidden"></td>
    		<td><input id="numBal" name ="numBal" type="hidden"></td>
    		</tr>
	</table>
</div>
</div>
</form>
</body>
</html>
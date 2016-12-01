<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>资金划出页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/balanceout/balanceoutM.js"></script>
</head>
<body>
<form id="invcMForm">	
<div id="cntrctDiv" class="easyui-panel" title="基本信息" data-options="collapsible:true" style="width:100%">
	<table class="utTab">
			<tr>
				<td>交易流水号：</td>
    			<td><input type="text"  name="sysRefNo"  id="sysRefNo"  ></td>
    			<td>授信额度编号：</td>
    			<td><input type="text"  name="cntrctNo"  id="cntrctNo" ></td>
    		</tr>
    		<tr>
    			<td>授信客户名称：</td>
    			<td><input type="text"  name="custNm"  id="custNm" ></td>
				<td>币种：</td>
				<td><input class="easyui-combobox" id="outCcy" name="outCcy" 
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							editable="false" /></td>
    		</tr>
    		<tr>
				<td>转出账号：</td>
				<td><input class="easyui-combobox" id="outAccNo" name="outAccNo"  required="true"
							data-options="valueField: 'acNo',textField: 'acNo',panelHeight: 'auto'"
							editable="false" />
							<a class="easyui-linkbutton" icon="icon-search" onclick="showLookUpWindow()">查询账户余额</a>
				</td>
				<td>账号余额：</td>
				<td><input type="text"  name="outAccNoAmt" id="outAccNoAmt" class="easyui-numberbox" data-options="min:0,precision:2,groupSeparator:','" ></input></td>
			</tr>
			<tr>
				<td>转入账号：</td>
				<td><input class="easyui-combobox" id="inAccNo" name="inAccNo"  required="true"
							data-options="valueField: 'acNo',textField: 'acNo',panelHeight: 'auto'"
							editable="false" /></td>
				<td>转出金额：</td>
				<td><input type="text"  name="outAmt" id="outAmt" required="true" class="easyui-numberbox" data-options="min:0,precision:2,groupSeparator:','" ></input></td>
			</tr>
  			<tr>
				<td>备注：</td>
				<td colspan="5"><input name="remark" id="remark" class="easyui-textbox" data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[200]'" style="width: 50%; height: 80px"></td>
			</tr>
    		<tr>
    		    <td><input  type="hidden" name="custNo" id="custNo"></td>
    		</tr>
	</table>
</div>
</form>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增应付账款页面</title>
<script type="text/javascript" src="script/invc/buyerInvcMChg.js"></script>
</head>
<body>
<form id="invcMChgForm">
<div id="invcMChgDiv" style="margin:auto; margin-top:50px">
	<table class="utTab" align="center" height="60%">
			<tr>
    			<td>供应商编号：</td>
    			<td><input type="text"  name="selId" class="easyui-validatebox" id="selId"  required="true" data-options="validType:'maxLength[35]'"></input><a class="easyui-linkbutton" icon="icon-search" onclick="showLookUpWindow()">查询</a></td>
    			<td>供应商名称：</td>
    			<td><input type="text"  name="selNm"  id="selNm"  data-options="validType:'maxLength[35]'"></td>
    		</tr>
    		<tr>
    			<td>应付账款凭证编号：</td>
    			<td><input class="easyui-validatebox combo"  name="invNo"  id="invNo" onblur="checkLegal()" required="true" data-options="validType:'maxLength[35]',missingMessage:'请输入字母或数字。'"/></td>
    			<td>币别：</td>
    			<td><input class="easyui-combobox"  id="invCcy" name="invCcy" 
				 	data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" 
				 	 editable="false" required="required"></td>
    		</tr>
    		<tr>	
    			<td>应付账款金额：</td>
    			<td><input type="text"  name="invAmt"  id="invAmt"   required="true" data-options="onChange:changeInvAmt,min:0,precision:2,groupSeparator:'',validType:'maxLength[18]'" class ="easyui-numberbox" ></td>
    		    <td>应付账款净额：</td>
    			<td><input id="invBal" name ="invBal" data-options="min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"  class ="easyui-numberbox"  ></td>
    		</tr>
    		<tr>
    		    <td>单据起算日：</td>
    			<td><input name="invValDt"  id="invValDt"  required="true" class="easyui-datebox"   data-options="onSelect:changeinvValDt" editable="false" ></td>
    		    <td>单据开立日期：</td>
    			<td><input  name="invDt"  id="invDt"  required="true" class="easyui-datebox"  editable="false" data-options="onSelect:changeinvDt"></td>
    		</tr>
    		<tr>
    		    <td>到期日：</td>
    		    <td><input  name="invDueDt" id="invDueDt" class="easyui-datebox"  required="true" data-options="onSelect:changeInvDueDt" ></td>
    		    <td>账期：</td>
    			<td><input type="text"   name="acctPeriod" id="acctPeriod"    data-options="validType:['number','maxLength[18]']" class ="easyui-numberbox"></input></td>
    		</tr>
    		<tr>
    		    <td><input type="hidden"  name="sysRefNo" id="sysRefNo"/></td>
    		    <td><input type="hidden"  name="oldInvNo" id="oldInvNo"/></td>
    		    <td><input type="hidden"  name="buyerId" id="buyerId"/></td>
    			<td style="display: none"><input type="hidden"  name="sysData" class="easyui-datebox" id="sysData" value=${sysUserInfo.sysDate }/></td>
    			<td style="display: none"><input type="hidden"  name="dueDt" class="easyui-datebox" id="dueDt" /></td>
    		    <td style="display: none"><input type="hidden" class="easyui-datebox" name="trxDate" id="trxDate"/></td>
    		</tr>
	</table>
</div>
</form>
</body>
</html>
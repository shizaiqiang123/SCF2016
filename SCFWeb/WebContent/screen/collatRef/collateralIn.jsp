<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>存货类-质物置换-换入押品页面</title>
<script type="text/javascript" src="script/collatRef/collateralIn.js"></script>
</head>
<body>
<form id="CollateralForm">
<div id="CollateralDiv" style="margin:auto; margin-top:50px">
	<table class="utTab" align="center" height="50%">
			<tr>
    			<td>交易流水号：</td>
    			<td><input type="text"  name="sysRefNo"  id="sysRefNo" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></td>
    			<td>商品编号：</td>
    			<td><input class="easyui-validatebox combo" name="collatId"  id="collatId" data-options="validType:'maxLength[35]'">
    			<a class="easyui-linkbutton" id="goodsIdLookUp" icon="icon-search" onclick="goodsIdLookUp()">查询</a></td>
    		</tr>
    		<tr>
    			<td>质物品种：</td>
    			<td><input type="text"  name="collatNm"  id="collatNm" class="easyui-validatebox combo" data-options="validType:'maxLength[70]'"></td>
    			<td>质物计价单位：</td>
    			<td><input  type="text" name="collatUnit"  id="collatUnit" class="easyui-validatebox combo" data-options="validType:'maxLength[10]'"></td>
    		</tr>
    		<tr>
    			<td>换入数量：</td>
    			<td><input class="easyui-numberspinner"  id="collatQty" name="collatQty" required='true'
				 data-options="onChange:collatVal,min:0,validType:'maxLength[18]'" /></td>
				<td>换入质物价值：</td>
    			<td><input  name="collatVal" id="collatVal"  class="easyui-numberbox"  data-options="groupSeparator:',',validType:'maxLength[18]', min:0,precision:2" ></td>
    		</tr>
    		<tr>
    			<td>质物认定价格：</td>
    			<td><input class ="easyui-numberbox"  name="collatRdPrice" id="collatRdPrice" data-options="onChange:collatVal,groupSeparator:',', min:0,precision:2"></td>
    			<td>最新调价日期：</td>
    			<td><input  name="collatAdjDt" id="collatAdjDt"  editable="false" class="easyui-datebox" data-options="validType:'date'"></td>
    		</tr>
    		<tr>
    			
    			<td>生产厂家：</td>
    			<td><input type="text"  id="collatFact"  name="collatFact" class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"></input></td>
    		</tr>
    			
    		<tr>
    			<td>质物入库日期：</td>
    			<td><input class="easyui-datebox"  required="true" name="arrivalDt"  id="arrivalDt"  editable="false" ></td>
    			<td><input type="hidden"  id="regNo"  name="regNo" ></input></td>
    			<td><input type="hidden"  id="cntrctNo"  name="cntrctNo" ></input></td>
    		</tr>
    		<tr>
    			<td><input  id="qty" name="qty" type="hidden"
				 /></td>
    			<td><input type="hidden"  name="weight" id="weight"  ></td>
    			<td><input type="hidden"  name="collatSpec" id="collatSpec" ></td>
    		</tr>
	</table>
</div>
</form>
</body>
</html>
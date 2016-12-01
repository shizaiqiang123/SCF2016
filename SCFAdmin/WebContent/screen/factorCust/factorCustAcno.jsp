<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增客户账号页面</title>
<script type="text/javascript" src="script/factorCust/factorCustAcno.js"></script>
</head>
<body>
<form id="factorAcnoForm">
<div id="factorAcnoDiv" style="margin:auto; margin-top:50px">
	<table class="utTab" align="center" height="50%">
			<tr>
    			<!-- <td>交易流水号：</td>
    			<td><input type="text"  name="sysRefNo"  id="sysRefNo"  ></td> -->
    			<td>账号类型：</td>
    			<td><input class="easyui-combobox" id="acTp"
						name="acTp" required="true"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						style="width: 180px;" editable="false" ></input>
				</td>
				<td>账号：</td>
    			<td><input  type="text" name="acNo"  id="acNo"
    			class="easyui-numberbox" required="true" data-options="onChange:changeAcNo,validType:['number','maxLength[40]']"/>
<!--     			<a class="easyui-linkbutton" icon="icon-add" onclick="showLookUpWindowAc()">同步账号</a> -->
    			</td>
    		</tr>
    		<!-- <tr>	
    			<td>账号标志：</td>
    			<td><input class="easyui-combobox" id="acFlag"
						name="acFlag" required="true"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						style="width: 150px;" editable="false"></input>
				<td>相关保理商账号：</td>
    			<td><input type="text"  name="relavOwnerid" id="relavOwnerid"  class="easyui-validatebox combo" ></td>
			</tr> -->
			<tr>
    			<td>币种：</td>
    			<td><input class="easyui-combobox" id="ccy" name="ccy"
						required="true"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelMaxHeight: '100px'"
						editable="false" /></td>
				<td>户名：</td>
    			<td><input type="text"  name="acNm" id="acNm" class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[50]'"></td>
    		
    		</tr>
    		<tr>
    		  <td>开户银行：</td>
    			<td><input type="text"  name="acBkNm" id="acBkNm" class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[50]'"></td>
    			<td>开户网点：</td>
				<td><input type="text" class="easyui-validatebox combo"
				   name="acBkNo" id="acBkNo" required="true" editable="false"
				   data-options="validType:'maxLength[40]'"></input>
				   <!-- <a class="easyui-linkbutton" icon="icon-add" onclick="showLookUpWindow()">查询</a> -->
				</td>
    		<!-- <tr>
    		<td>开户银行：</td>
    			<td><input type="text"  name="acBkNm" id="acBkNm" class="easyui-validatebox combo" required="true" data-options="validType:'maxLength[50]'"></td>
    		</tr>
    				<td>是否自动冲销：</td>
    			<td><input class="easyui-combobox" id="isAutoVerif"
						name="isAutoVerif" 
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						style="width: 150px;" editable="false"></input>
    		</tr> -->
    		<!-- <tr>
    			<td>冲销优先顺序：</td>
    			<td><input class="easyui-combobox" id="verifSeq"
						name="verifSeq" 
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						style="width: 150px;" editable="false"></input>
    			<td><input type="hidden"  name="custId" id="custId" ></td>
    		</tr> -->
    		<tr>
    		    <td><input type="hidden"  name="sysRefNo" id="sysRefNo"></td>
    		    <td><input type="hidden"  name="oldAcNo" id="oldAcNo"></td>
    		    <!-- <td><input type="hidden"  name="acBkNo" id="acBkNo"></td> -->
    			<td><input type="hidden"  name="acOwnerName" id="acOwnerName"></td>
    			<td><input type="hidden" name="acOwnerid" id="acOwnerid"></td>
				<td><input type="hidden" name="acOwnerType" id="acOwnerType"></td>
    			<td><input type="hidden" name="sysBusiUnit" id="sysBusiUnit" value="${sysUserInfo.sysBusiUnit}"></td>
    			<td><input type="hidden"  name="acFlag" id="acFlag" value="R"></td>
    		</tr>
	</table>
</div>
</form>
</body>
</html>
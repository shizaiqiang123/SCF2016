<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>贷项清单页面</title>
<script type="text/javascript" src="script/credit/credit.js"></script>
</head>
<body>
<form id="creditForm">
<div class="easyui-panel" title="协议信息" data-options="collapsible:true" style="width:98%">
<div id="creditFormDiv">
	<table class="utTab">
			<tr>
				<td>批次号：</td>
    			<td><input type="text"  name="sysRefNo"  id="sysRefNo"   ></td>
    			<td>客户合同号：</td>
    			<td><input type="text"  name="cttNo"  id="cttNo"   ></td>
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
    			<td>授信客户ID：</td>
    			<td><input type="text"  name="selId" id="selId" class="easyui-validatebox combo"  required="true"  ></input>
    			<td>授信客户名称：</td>
    			<td><input type="text"  name="selNm" id="selNm"  ></input></td>
    		</tr>
    		<tr>
    			<td>间接客户ID：</td>
    			<td><input type="text"  name="buyerId" id="buyerId" class="easyui-validatebox combo"  required="true"  ></input>
    			<td>间接客户名称：</td>
    			<td><input type="text"  name="buyerNm" id="buyerNm"  ></input></td>
    		</tr>
    		<tr>
    			<td>账期：</td>
    			<td><input type="text"  name="acctPeriod" id="acctPeriod" class="easyui-numberspinner"  required="true"  ></input></td>
    			<td>宽限期：</td>
    			<td><input type="text"  name="graceDay" id="graceDay" class="easyui-numberspinner"  required="true"  ></input></td>
    		</tr>
    		<tr>
    			<td>授信额度币种：</td>
				<td><input class="easyui-combobox"  id=lmtCcy name="lmtCcy"
				 	data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'" 
				 	style=" editable="false" />
				</td>
				<td>授信额度金额：</td>
				<td><input type="text"  name="lmtAmt" id="lmtAmt" class="easyui-numberspinner"  required="true" data-options="min:0,precision:2,groupSeparator:','"  ></input></td>
    		</tr>
    		<tr>
    			<td>管理费费率：</td>
    			<td><input type="text"  name="manChgRt" id="manChgRt" class="easyui-numberspinner"  required="true" data-options="min:0,max:100,suffix:'%'"  ></input></td>
    			<td>交易日期：</td>
    			<td><input type="text"  name="trxDt" id="trxDt" class="easyui-datebox" required="required"  ></input></td>
    		</tr>
    		<tr>
    			<td>应收账款金额：</td>
    			<td><input type="text"  value='0' name="regAmt" id="regAmt" class="easyui-numberspinner"  required="true" data-options="mmin:0,precision:2,groupSeparator:','"  ></input></td>
    		</tr>
    		<tr>
    			<td><input type="hidden" value="0" name="loanPct" id="loanPct"></td>
    			<td><input type="hidden" name="ccy" id="ccy"></td>
    			<td><input  type="hidden" name="cntrctNo" id="cntrctNo"></td>
    		</tr>
	</table>
</div>
</div>
<div class="easyui-panel" title="应收账款信息" data-options="collapsible:true" style="width:98%">
<div id="creditDiv">
	<table id="creditTable" cellspacing="0" cellpadding="0"
				width="100%" iconCls="icon-edit">
	</table>
	<div id="toolbar" style="overflow:hidden;">
		<a href="javascript:void(0)" class="easyui-linkbutton"
			iconcls="icon-add" onclick="addRow()" plain="true" style="float:right;margin-right:14px;">添加</a> <a
			href="javascript:void(0)" class="easyui-linkbutton"
			iconcls="icon-edit" onclick="editRow()" plain="true" style="float:right;">修改</a> <a
			href="javascript:void(0)" class="easyui-linkbutton"
			iconcls="icon-remove" onclick="deleteRow()" plain="true" style="float:right;">删除</a>
		</div>
   </div>
</div>
</form>
</body>
</html>
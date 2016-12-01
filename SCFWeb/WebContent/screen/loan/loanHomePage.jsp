<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>额度融资页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/loanHomePage.js"></script>
</head>
<body>
<form id="loanMForm">	
<div id="cntrctDiv" class="easyui-panel" title="授信额度信息" data-options="collapsible:true" style="width:100%">
	<table class="utTab">
			<tr>
				<td>流水号：</td>
    			<td><input type="text"  name="cntSysRefNo"  id="cntSysRefNo"  ></td>
    			<td>授信额度编号：</td>
    			<td><input type="text"  name="cntrctNo"  id="cntrctNo" ></td>
    		</tr>
    		<tr>
				<td>组织机构代码：</td>
    			<td><input type="text"  name="sellerInstCd"  id="sellerInstCd"  ></td>
    			<td>经销商名称：</td>
    			<td><input type="text"  name="selNm"  id="selNm" ></td>
    		</tr>
    		<tr>
    			<td>业务类别：</td>
    			<td><input id="busiTp"  name="busiTp" class="easyui-combobox" 
					data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  ></input></td>
				<td>币种:</td>
				<td><input class="easyui-combobox"  id="ccy" name="ccy"
				 	 data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto' " 
				 	 editable="false" required="true" />
				</td>
    		</tr>
    		<tr>
    		    <td>核心企业名称：</td>
    			<td><input type="text"  name="buyerNm"  id="buyerNm" ></td>
    			<td>融资总额：</td>
    			<td><input type="text"  name="ttlLoanAmt" id="ttlLoanAmt" class="easyui-numberbox" data-options="min:0,precision:2,groupSeparator:','" value=0></input></td>
    		</tr>
    		<tr>
    		     <!-- 隐藏列 -->
    		</tr>
	</table>
</div>
<div id="invcMDiv" class="easyui-panel" title="融资列表" data-options="collapsible:true" style="width:100%">
	<table id="loanMTable" cellspacing="0" cellpadding="0" 
				width="100%" iconCls="icon-edit">
	</table>
	<div id="toolbar">
		</div>
</div>
</form>
</body>
</html>
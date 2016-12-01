<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>融资申请页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/margin/marginVer.js"></script>
</head>
<body class="UTSCF">
	<form id="loanSubmit">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="融资信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" required="true"></td>
					<td>组织机构代码：</td>
					<td><input type="text" name="sellerInstCd" id="sellerInstCd" required="true"></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" type="text" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto',onChange:changeLoanTp"
						editable="false"></td>
					<td>授信客户名称：</td>
					<td><input type="text" name="selNm" id="selNm" required="true"></input></td>
				</tr>
				<tr id="collat">
					<td>保险公司：</td>
					<td><input id="collatCompNm" name="collatCompNm" class="easyui-textbox"></td>
					<td>保单编号：</td>
					<td><input id="collatNo" name="collatNo" class="easyui-textbox"></td>
				</tr>
				<tr>
					<td>融资支付方式：</td>
					<td><input id="loanTp" name="loanTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto',onChange:changeLoanTp"
						editable="false" required="true"></td>
					<td>扣款账号：</td>
					<td><input class="easyui-combobox"  id="selAcNo" name="selAcNo"
				 			data-options="valueField: 'acNo',textField: 'acNo',panelHeight: 'auto',onChange:changeSelAcNo" 
				 			editable="false" required="true"/></td>
				</tr>
				<tr>
				 	<td>账号名称：</td>
					<td><input id="selAcNm" name="selAcNm" required="true"/></td>
					<td>开户行：</td>
					<td><input type="text"  id="selAcBkNm" name="selAcBkNm" required="true" /></td>
				</tr>
				<tr>
					<td>币别：</td>
					<td><input type="text" name="ccy" id="ccy"/></td>
					<td>融资金额：</td>
					<td><input  name="ttlLoanAmt"
						id="ttlLoanAmt" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td>可融资金额：</td>
					<td><input  value="0" name="loanAble" required="true"
						id="loanAble" class="easyui-numberspinner"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>融资日期：</td>
					<td><input type="text" name="loanValDt" id="loanValDt" required="true"
						class="easyui-datebox" editable="false"></input></td>
				</tr>
				<tr>
					<td>融资到期日：</td>
					<td><input type="text" name="loanDueDt" id="loanDueDt" required="true"
						class="easyui-datebox" editable="false"></input></td>
					<td>扣息方式：</td>
					<td><input class="easyui-combobox"  id="payIntTp" name="payIntTp" required="true"
				 		data-options="valueField: 'id',textField: 'text',panelHeight: 'auto' " 
				 		editable="false" required="true" /></td>
				</tr>
				<tr id="balTr">
					<td>保证金账号：</td>
					<td><input class="easyui-textbox" data-options="onChange:checkSelAcNm" id="marginAcNo" name="marginAcNo"/></td>
					<td>初始保证金比例：</td>
					<td><input  name="initMarginPct" id="initMarginPct"
						class="easyui-numberbox"
						data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
				</tr>
				<tr id="amtTr">
					<td>授信保证金比例：</td>
					<td><input name="authMarginPct" id="authMarginPct"
						class="easyui-numberbox"
						data-options="min:0,precision:2,max:100,suffix:'%'"></td>
					<td>总保证金金额：</td>
					<td><input  name="marginAmt"
						id="marginAmt" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input>
					<a class="easyui-linkbutton" icon="icon-search"
							onclick="selLookUpWindowMargin()">余额同步</a>
					</td>
				</tr>
				<tr>
					<td>正常利率值：</td>
					<td><input name="loanRt" id="loanRt"
						class="easyui-numberspinner" required="true"
						data-options="min:0,precision:2,max:100,suffix:'%'" required="true" ></td>
					<td>贷款资金用途：</td>
					<td><input class="easyui-textbox" 
					data-options="missingMessage:'输入项为必输项',multiline:true,validType:'maxLength[50]'"
					style="width: 50%; height: 80px" name="loanApplicat"
							id="loanApplicat"></td>
				</tr>
				<tr>
					<td><input type="hidden" id="marginBal" name="marginBal"></td>
					<td><input type="hidden" name="selId" id="selId"></td>
					<td><input type="hidden" name="cntrctNo" id="cntrctNo"></td>
				</tr>
			</table>
		</div>
		<div id="hide">
			<div id="invcMDiv" style="width: 100%; height: auto"
			class="easyui-panel" title="应收账款信息" data-options="collapsible:true">
			<table class="easyui-datagrid" id="invcTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbar1" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" iconcls="icon-search" onclick="loadInvcTable()"
					plain="true" style="float:right;margin-right:14px;">应收账款查询</a>
			</div>
		</div>
		<div id="invcLoanMDiv" style="width: 100%; height: auto"
			class="easyui-panel" title="融资子表信息" data-options="collapsible:true">
			<table class="easyui-datagrid" id="invcLoanTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbar2" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" iconcls="icon-search" onclick="loadInvcLoanTable()"
					plain="true" style="float:right;margin-right:14px;">融资子表查询</a>
			</div>
		</div>
		</div>
	</form>
</body>
</html>
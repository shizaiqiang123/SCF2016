<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>融资申请页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/dispatchNote/dispatchNote.js"></script>
</head>
<body class="UTSCF">
	<form id="dispatchForm">
		<div id="dispatchDiv" style="width: 100%" class="easyui-panel"
			title="放款信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo"
						></td>
					<td>协议编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo"></td>
				</tr>
				<tr>
					<td>放款编号：</td>
					<td><input type="text" name="loanId" id="loanId"></td>
					<td>订单流水号：</td>
					<td><input type="text" name="poId" id="poId"></td>
				</tr>
				<tr>
					<td>交易日期：</td>
					<td><input type="text" name="trxDt" id="trxDt"
						class="easyui-datebox" editable="false" ></input></td>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" ></input></td>
				</tr>
				<tr>
					<td>授信客户编号：</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo" required="true"></input>
					<td>授信客户名称：</td>
					<td><input type="text" name="selNm" id="selNm"
						></input></td>
				</tr>
				<tr>
					<td>间接客户ID：</td>
					<td><input type="text" name="buyerId" id="buyerId"
						class="easyui-validatebox combo" required="true"></input>
					<td>间接客户名称：</td>
					<td><input type="text" name="buyerNm" id="buyerNm"></input></td>
				</tr>
				<tr>
					<td>监管机构代码：</td>
					<td><input type="text" name="patnerId" id="patnerId"
						class="easyui-validatebox combo" required="true"></input>
					<td>监管机构名称：</td>
					<td><input type="text" name="patnerNm" id="patnerNm"></input></td>
				</tr>
				<tr>
					<td>仓库编号：</td>
					<td><input type="text" name="storageId" id="storageId"
						class="easyui-validatebox combo" required="true"></input>
					<td>仓库名称：</td>
					<td><input type="text" name="storageNm" id="storageNm"></input></td>
				</tr>
				<tr>
       				<td >仓库地址：</td>
					<td><input  name="storageAdr" id="storageAdr" ></input></td>
					<td >仓库联系人：</td>
					<td><input  name="contactNm" id="contactNm" ></input></td>
				</tr>
				<tr>
       				<td >订单编号：</td>
					<td><input  name="poNo" id="poNo" ></input>
					<a class="easyui-linkbutton" style="width:80px;height:22px" id="poButton"
						onclick="onSearchPoClick();"><label class="words">查询</label></a></td>
					<td >订单币别：</td>
					<td><input  name="poCcy" id="poCcy" ></input></td>
				</tr>
				<tr>
					<td>订单金额：</td>
					<td><input type="text" name="poAmt" id="poAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input>
					<td>订单到期日：</td>
					<td><input name="poDueDt" id="poDueDt"
						class="easyui-datebox" "></input></td>
				</tr>
				<tr>
       				<td >放款币种：</td>
					<td><input  name="ccy" id="ccy" ></input></td>
					<td>放款余额：</td>
					<td><input type="text" name="ttlLoanBal" id="ttlLoanBal"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input>
				</tr>
				<tr>
					<td>放款日期：</td>
					<td><input name="loanValDt" id="loanValDt"
						class="easyui-datebox" ></input></td>
					<td>放款到期日：</td>
					<td><input name="loanDueDt" id="loanDueDt"
						class="easyui-datebox" ></input></td>
				</tr>
				<tr>
       				<td>保证金余额：</td>
					<td><input type="text" name="marginBal" id="marginBal"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input>
					<td>本次通知发货价值：</td>
					<td><input type="text" name="inoutAmt" id="inoutAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input>
				</tr>
				<tr>
       				<td>已通知发货总价值：</td>
					<td><input type="text" name="ttlDlvAmt" id="ttlDlvAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2"></input>
				</tr>
			</table>
		</div>
		<div id="collatDiv" style="width: 100%; height: 400px"
			class="easyui-panel" title="货物明细" data-options="collapsible:true">
			<table class="easyui-datagrid" id="collatTable" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow:hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="querybutton" iconcls="icon-search" onclick="queryCollat()"
					plain="true" style="float:right;margin-right:14px;">货物查询</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					data-options="iconCls:'icon-save',plain:true" onclick="accept()" style="float:right;">接受改变</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					data-options="iconCls:'icon-undo',plain:true" onclick="reject()" style="float:right;">撤销改变</a>
			</div>
		</div>
	</form>
</body>
</html>
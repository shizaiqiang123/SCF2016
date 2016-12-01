<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增订单信息页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/cntrct/InvcMTest.js"></script>
</head>
<body>
	<div class="div_ul">
		<form id="invcMForm">
			<div id="cntrctDiv" style="width: 100%" class="easyui-panel"
				title="协议信息" data-options="collapsible:true">
				<table class="utTab">
					<tr>
				<td>流水号：</td>
    			<td><input type="text"  name="sysRefNo"  id="sysRefNo"  ></td>
    			<td>协议编号：</td>
    			<td><input type="text"  name="cntrctNo"  id="cntrctNo" ></td>
    		</tr>
    		<tr>
    			<td>业务类别：</td>
    			<td><input id="busiTp"  name="busiTp" class="easyui-combobox" 
					data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  ></input></td>
				<td>交易日期：</td>
				<td><input type="text"  name="trxDt" id="trxDt" class="easyui-datebox" required="required" ></input></td>
    		</tr>
    		<tr>
    			<td>授信客户编号：</td>
    			<td><input type="text"  name="selId" id="selId" ></input></td>
    			<td>授信客户名称：</td>
    			<td><input type="text"  name="selNm" id="selNm" ></input></td>
    		</tr>
    		<tr>
    			<td><input  type="hidden" name="lmtBalHD" id="lmtBalHD"></td>
    			<td><input  type="hidden" name="acctPeriod" id="acctPeriod"></td>
    			<td><input  type="hidden" name="trxid" id="trxId"></td>
    			<td><input 	type="hidden"  name="loanPct" id="loanPct"></td>
    			<td><input  type="hidden" name="lmtBal" id="lmtBal"></td>
    			<td><input  type="hidden" name="cntrctlmtBal" id="cntrctlmtBal"></td>
    			<td><input  type="hidden" name="arBalHD" id="arBalHD"></td>
    			<td><input  type="hidden" name="arAvalLoanHD" id="arAvalLoanHD"></td>
    		</tr>
					</table>
				</div>
				<div class="easyui-panel" title="关联关系信息"
					data-options="collapsible:true" style="width: 100%">
					<div id="acnoDiv1">
						<table id="sbrTable" cellspacing="0" cellpadding="0" width="100%"
							iconCls="icon-edit">
						</table>
						<div id="toolbar1" style="overflow:hidden;">
							<a href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-add" onclick="addSbrRow()" plain="true" style="float:right;margin-right:14px;">添加</a> <a
								href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-edit" onclick="editSbrRow()" plain="true" style="float:right;">修改</a> <a
								href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-remove" onclick="deleteSbrRow()" plain="true" style="float:right;">删除</a>
						</div>
					</div>
				</div>
		</form>
	</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>合格证登记页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/qualifiedReg.js"></script>
</head>
<body>
	<form id="qualiForm">
		<div id="cntrctDiv" class="easyui-panel" title="基本信息"
			data-options="collapsible:true" style="width: 100%">
			<table class="utTab">
				<tr>
					<td>流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo"></td>
					<td>融资编号：</td>
					<td><input type="text" name="loanId" id="loanId"
						class="easyui-validatebox combo" required="true"><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="showLookUpWindow()">查询</a></td>
				</tr>
				<tr>
					<td>组织机构代码：</td>
					<td><input type="text" name="sellerInstCd" id="sellerInstCd"></td>
					<td>协议编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo"></td>
				</tr>
				<tr>
					<td>核心企业名称：</td>
					<td><input type="text" name="buyerNm" id="buyerNm"></td>
					<td>授信客户名称：</td>
					<td><input type="text" name="selNm" id="selNm"></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input></td>
					<td>币种：</td>
					<td><input class="easyui-combobox" id="ccy" name="ccy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto' "
						editable="false" required="true" /></td>
				</tr>
				<tr>
					<td>融资日期：</td>
					<td><input name="loanValDt" id="loanValDt"
						class="easyui-datebox" editable="false"></td>
					<td>融资到期日期：</td>
					<td><input name="loanDueDt" id="loanDueDt"
						class="easyui-datebox" editable="false"></td>
				</tr>
				<tr>
					<td>融资金额：</td>
					<td><input type="text" name="loanAmt" id="loanAmt"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
					<td>融资余额：</td>
					<td><input type="text" name="loanBal" id="loanBal"
						class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:','"></input></td>
				</tr>
				<tr>
					<td>监管机构编号：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="supervisorId" id="supervisorId"></input></td>
					<td>监管机构名称：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="supervisorNm" id="supervisorNm" required="true"></input></td>
				</tr>
				<!-- <tr>
					<td>仓库编号：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="warehouseId" id="warehouseId" required="true"></input><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="showPatner()">查询</a></td>
					<td>仓库名称：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="warehouseNm" id="warehouseNm"></input></td>
				</tr> -->
				<tr>
					<td>最大跌幅率：</td>
					<td><input name="maxDroPerc" id="maxDroPerc"
						class="easyui-numberspinner" required="true"
						data-options="min:0,precision:2,suffix:'%'"></input></td>
				</tr>
				<tr>
					<!-- 隐藏字段 -->
					<td><input type="hidden" name="selId" id="selId"></td>
					<td><input type="hidden" name="buyerId" id="buyerId"></td>
				</tr>
			</table>
		</div>
		<!-- <div id="qualiDiv" class="easyui-panel" title="合格证信息" data-options="collapsible:true" style="width:100%">
	<table id="qualiTable" cellspacing="0" cellpadding="0"
				width="100%" iconCls="icon-edit">
	</table>
	<div id="toolbar">
		<a href="javascript:void(0)" class="easyui-linkbutton"
			iconcls="icon-add" onclick="addRow()" plain="true">添加</a> <a
			href="javascript:void(0)" class="easyui-linkbutton"
			iconcls="icon-edit" onclick="editRow()" plain="true">修改</a> <a
			href="javascript:void(0)" class="easyui-linkbutton"
			iconcls="icon-remove" onclick="deleteRow()" plain="true">删除</a> <a
			href="javascript:void(0)" class="easyui-linkbutton"
			iconcls="icon-impt" onclick="upload()" plain="true">导入</a>
	</div>
</div> -->
		<div id="goodsDiv" class="easyui-panel" title="货物信息"
			data-options="collapsible:true" style="width: 100%">
			<table id="goodsTable" cellspacing="0" cellpadding="0" width="100%"
				iconCls="icon-edit">
			</table>
			<div id="toolbar" style="overflow: hidden;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-add" onclick="addRow()" plain="true"
					style="float: right; margin-right: 14px;">添加</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-edit" onclick="editRow()" plain="true"
					style="float: right;">修改</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" iconcls="icon-remove"
					onclick="deleteRow()" plain="true" style="float: right;">删除</a>
			</div>
		</div>
		<div id="reasonDiv" style="width: 100%" class="easyui-panel form"
			title="处理意见" data-options="collapsible:true">
			<div id="messageListDiv" style="display: block;">
				<div class="item" id="OldMessageDiv" style="display: block;">
					<span id="OldMessageSpan" style="display: block;" class="label">意见说明：</span>
					<div class="fl item-ifo">
						<input class="easyui-textbox" editable="false"
							data-options="multiline:true,validType:'maxLength[1000]'"
							style="width: 500PX; height: 100px" name="OldSysRelReason"
							id="OldSysRelReason" />
					</div>
				</div>
				<div class="item" id="messageDivFa">
					<span id="messageSpanY" style="display: none;" class="label">意见说明：</span>
					<span id="messageSpanN" style="display: block;" class="label"></span>
					<div id="messageDiv" style="display: block;" class="fl item-ifo">
						<input class="easyui-textbox"
							data-options="multiline:true,validType:'maxLength[1000]'"
							style="width: 500px; height: 100px" name="sysRelReason"
							id="sysRelReason" />
					</div>
				</div>
			</div>
		</div>
	</form>
</body>
</html>
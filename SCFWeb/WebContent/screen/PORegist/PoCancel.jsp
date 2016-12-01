<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>手工注销申请页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/PORegist/PoCancel.js"></script>
<style type="text/css">
.textbox .textbox-prompt {
	font-size: 14px;
	color: black;
}
</style>
</head>
<body class="UTSCF">
	<form id="POForm">
		<div id="PODiv" class="easyui-panel" title="订单信息"
			data-options="collapsible:true" style="width: 100%">
			<table class="utTab">
				<tr>
					<td><input type="hidden" name="sysRefNo" id="sysRefNo" /></td>
				</tr>

				<tr>
					<td>协议编号:</td>
					<td><input type="text" id="cntrctNo" name="cntrctNo" /></td>
					<td>交易日期:</td>
					<td><input type="text" name="sysOpTm" id="sysOpTm"
						editable="false" class="easyui-datebox"
						data-options="validType:'date'"></td>

				</tr>
				<tr>

					<td>业务类别:</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false"></input></td>
					<td>币种:</td>
					<td><input style="" class="easyui-combobox" id="ccy"
						name="ccy"
						data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto' "
						editable="false" required="true" /></td>
				</tr>
				<tr>

					<td>商户组织机构代码:</td>
					<td><input type="text" name="sellerInstCd" id="sellerInstCd"
						class="easyui-validatebox combo" />
					<td>商户名称:</td>
					<td><input type="text" name="selNm" id="selNm"
						class="easyui-validatebox combo" /></td>
				</tr>
				<tr>

					<td>供货商编号:</td>
					<td><input type="text" name="buyerId" id="buyerId"
						class="easyui-validatebox combo" /><a class="easyui-linkbutton"
						icon="icon-search" onclick="showLookUpWindow()">查询</a></td>
					<td>供货商名称:</td>
					<td><input type="text" name="buyerNm" id="buyerNm"
						class="easyui-validatebox combo" /></td>
				</tr>
				<tr id="Tr1">
					<td>监管机构编号:</td>
					<td><input type="text" name="patnerId" id="patnerId" /><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="showCntrctPatWindow()">查询</a></td>
					<td>监管机构名称:</td>
					<td><input type="text" name="patnerNm" id="patnerNm" /></td>
				</tr>
				<tr>

					<td>融资编号:</td>
					<td><input type="text" name="loanId" id="loanId"
						required="true" /></input><a class="easyui-linkbutton" icon="icon-search"
						onclick="onSearchPoClick()">查询</a></td>
					<td>订单编号:</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="poNo" id="poNo" required="true"
						data-options="validType:'maxLength[35]'"></td>
				</tr>
				<tr>

					<td>订单金额:</td>
					<td><input class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:2" name="poAmt"
						id="poAmt" /></td>
					<td>融资金额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanAmt"
						id="ttlLoanAmt" /></td>
				</tr>
				<tr>


					<td>融资余额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanBal"
						id="ttlLoanBal" /></td>
					<td>融资到期日：</td>
					<td><input type="text" name="loanDueDt" id="loanDueDt"
						editable="false" class="easyui-datebox"
						data-options="validType:'date'"></td>
				</tr>
				<tr>

					<td>注销价值：</td>
					<td><input class="easyui-numberbox" name="cancelAmt"
						id="cancelAmt" data-options="min:0,precision:2,groupSeparator:','" /></td>
				</tr>
				<tr id="Tr2">
					<td>商品数量:</td>
					<td><input class="easyui-numberbox"
						data-options="groupSeparator:',', min:0,precision:0" name="poNum"
						id="poNum" /></td>
				</tr>
				<tr>
					<td><input type="hidden" name="selId" id="selId" value="0" /></td>
					<td><input type="hidden" name="trxSts" id="trxSts" value="0" /></td>
				</tr>
			</table>
		</div>
		<div class="easyui-panel" title="商品列表" data-options="collapsible:true"
			style="width: 100%">
			<div id="CollateralDiv">
				<table id="CollateralTable" cellspacing="0" cellpadding="0"
					width="100%" iconCls="icon-edit">
				</table>
				<!-- <div id="toolbar" style="overflow: hidden">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-add" onclick="addRow()" plain="true"
						style="float: right; margin-right: 14px;">添加</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-edit" onclick="editRow()" plain="true"
						style="float: right">修改</a> <a href="javascript:void(0)"
						class="easyui-linkbutton" iconcls="icon-remove"
						onclick="deleteRow()" plain="true" style="float: right">删除</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-impt" onclick="upload()" plain="true"
						style="float: right">导入</a>
				</div> -->
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
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>追加保证金信息页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/addMarginPre/addBailPay.js"></script>
</head>
<body class="UTSCF">
	<form id="dispatchForm">
		<div id="dispatchDiv" style="width: 100%" class="easyui-panel"
			title="追加保证金信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input type="text" name="sysRefNo" id="sysRefNo" /></td>
					<td>授信额度编号：</td>
					<td><input type="text" name="cntrctNo" id="cntrctNo" /></td>
				</tr>
				<tr>
					<td>核心企业编号：</td>
					<td><input type="text" name="buyerId" id="buyerId" />
					<td>核心企业名称：</td>
					<td><input type="text" name="buyerNm" id="buyerNm" /></td>
				</tr>
				<tr>
					<td>经销商编号：</td>
					<td><input type="text" name="selId" id="selId"
						class="easyui-validatebox combo" required="true" />
					<td>经销商名称：</td>
					<td><input type="text" name="selNm" id="selNm" /></td>
				</tr>
				<tr>
					<td>币种：</td>
					<td><input id="ccy" name="ccy" class="easyui-combobox"
						data-options="valueField:'sysRefNo',textField:'sysRefNo',panelHeight: 'auto'"
						editable="false" /></td>
					<td>业务类别：</td>
					<td><input id="busiTp" name="busiTp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" /></td>
				</tr>
				<tr>
					<td>融资编号：</td>
					<td><input name="loanId" id="loanId"
						class="easyui-validatebox combo" required="true" /> <!-- <a
						class="easyui-linkbutton" style="width: 80px; height: 22px"
						id="poButton" onclick="onSearchPoClick();"><label
							class="words">查询</label></a> --> <!-- 替换查询按钮的样式 --> </input><a
						id="poButton" class="easyui-linkbutton" icon="icon-search"
						onclick="onSearchPoClick()">查询</a></td>
					<td>融资金额：</td>
					<td><input type="text" name="loanAmt" id="loanAmt"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2" />
				</tr>
				<tr>
					<td>融资开始日期：</td>
					<td><input type="text" name="loanValDt" id="loanValDt"
						class="easyui-datebox" required="required"
						data-options="validType:'date'" /></td>
					<td>融资到期日：</td>
					<td><input type="text" name="loanDueDt" id="loanDueDt"
						class="easyui-datebox" required="required"
						data-options="validType:'date'" /></td>
				</tr>
				<tr>
					<td>初始保证金比例：</td>
					<td><input type="text" name="initMarginPct" id="initMarginPct"
						class="easyui-numberspinner"
						data-options="groupSeparator:',', min:0,precision:2,suffix:'%'" />
					<td>保证金余额：</td>
					<td><input type="text" name="ttlMarginBal" id="ttlMarginBal"
						class="easyui-numberspinner" value=0
						data-options="groupSeparator:',', min:0,precision:2" />
				</tr>
				<tr>
					<td>追加保证金账号：</td>
					<td><input type="text" name="payBailAcno" id="payBailAcno"
						class="easyui-validatebox combo" />
					<td>本次追加保证金金额：</td>
					<td><input type="text" name="bailPayAmt" id="bailPayAmt"
						class="easyui-numberspinner" required="true" value=0
						data-options="groupSeparator:',', min:0,precision:2" />
				</tr>

				<tr>
					<td><input type="hidden" name="trxDt" id="trxDt" value="" /></td>
				</tr>
				<tr>
					<td><input type="hidden" id="buyerLmtBal" name="buyerLmtBal" /></td>
					<td><input type="hidden" id="ttlMarginBalOld"
						name="ttlMarginBalOld" /></td>
					<td><input type="hidden" id="bailPayAmtOld"
						name="bailPayAmtOld" /></td>
					<td><input type="hidden" id="lmtAllocate" name="lmtAllocate" /></td>
					<td><input type="hidden" id="selLmtBal" name="selLmtBal" /></td>
					<td><input id="trxId" name="trxId" type="hidden"></td>
					<td><input id="sbrId" name="sbrId" type="hidden"></td>
					<td><input type="hidden" id="selLmtAllocate" name="selLmtAllocate" /></td>
					
					<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>
					 <!-- 买方额度余额 -->
					<td><input type="hidden" name="buyerLmtBal" id="buyerLmtBal"></input></td>
					<td><input type="hidden" name="buyerLmtBalHd" id="buyerLmtBalHd"></input></td>
				    <!-- 买方已占用额度 -->
				    <td><input type="hidden" name="buyerTtlAllocate" id="buyerTtlAllocate" ></td>
					<td><input type="hidden" name="buyerTtlAllocateHd" id="buyerTtlAllocateHd" ></td>
					<!-- 供应商额度余额 -->
					<td><input type="hidden" name="sellerLmtBal" id="sellerLmtBal"></input></td>
					<td><input type="hidden" name="sellerLmtBalHd" id="sellerLmtBalHd"></input></td>
					<!-- 供应商已占用额度 -->
					<td><input type="hidden" name="sellerTtlAllocate" id="sellerTtlAllocate" ></td>
					<td><input type="hidden" name="sellerTtlAllocateHd" id="sellerTtlAllocateHd" ></td>

				</tr>
			</table>
		</div>
		<div id="bailBillDiv" style="width: 100%; height: auto"
			class="easyui-panel" title="票据信息" data-options="collapsible:true">
			<div id="collateralToolbar" style="overflow: hidden">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-add" onclick="addRow()" plain="true"
					style="float: right; margin-right: 14px;">添加</a> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-edit" onclick="editRow()" plain="true"
					style="float: right">修改</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" iconcls="icon-remove"
					onclick="deleteRow()" plain="true" style="float: right">删除</a>
			</div>
			<table class="easyui-datagrid" id="bailBillDg" cellspacing="0"
				cellpadding="0" style="width: 100%; height: auto"
				iconCls="icon-edit">
			</table>
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
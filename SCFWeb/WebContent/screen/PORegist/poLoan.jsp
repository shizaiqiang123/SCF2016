<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>预付类-融资申请页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/PORegist/poLoan.js"></script>
</head>
<body class="UTSCF">
	<form id="loanForm">
		<div id="loanDiv" style="width: 100%" class="easyui-panel"
			title="融资信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>交易流水号：</td>
					<td><input class="combo" name="sysRefNo" id="sysRefNo"
						required="required" /></td>
					<td>协议编号：</td>
					<td><input class="combo" name="cntrctNo" id="cntrctNo"
						required="required" /></td>
				</tr>
				<tr>
					<td>业务类别：</td>
					<td><input class="easyui-combobox" id="busiTp" name="busiTp"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto' "
						editable="false" required="true" /></td>
					<td>币别：</td>
					<td><input id="ccy" name="ccy" class="easyui-combobox"
						data-options="valueField:'sysRefNo',textField:'sysRefNo',panelHeight: 'auto'"
						editable="false"></input></td>
				</tr>
				<tr>
					<td>经销商组织机构代码：</td>
					<td><input class="combo" name="sellerInstCd" id="sellerInstCd"
						required="required" /></td>
					<td>经销商名称：</td>
					<td><input class="combo" name="selNm" id="selNm"
						required="required" /></td>
				</tr>
				<tr>
					<td>核心企业编号：</td>
					<td><input type="text" class="easyui-validatebox combo"
						name="buyerId" id="buyerId"
						data-options="validType:'maxLength[35]'"></input><a
						class="easyui-linkbutton" icon="icon-search"
						onclick="showLookUpWindow()">查询</a></td>
					<td>核心企业名称：</td>
					<td><input class="combo" name="buyerNm" id="buyerNm"
						required="required" /></td>
				</tr>
				<tr>
					<td>融资支付方式：</td>
					<td><input class="easyui-combobox" id="loanTp" name="loanTp"
						required="required"
						data-options="onChange:changeLoanTp,valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" /></td>
					<td>融资金额：</td>
					<td><input class="easyui-numberbox" name="ttlLoanAmt"
						id="ttlLoanAmt" required="required"
						data-options="min:0,precision:2,groupSeparator:',',onChange:changeTtlLoanAmt"
						value=0 /></td>
				</tr>
				<tr>
					<td>初始保证金比例：</td>
					<td><input class="easyui-numberspinner" name="initMarginPct"
						id="initMarginPct"
						data-options="min:0,precision:2,max:100,suffix:'%'" value=0 /></td>
					<td>初始保证金账号：</td>
					<td><input class="easyui-validatebox combo" id="marginAcNo"
						name="marginAcNo" required="true"
						data-options="validType:'maxLength[35]'" /> <!-- 					<a class="easyui-linkbutton" style="width:80px;height:22px" id="poButton" -->
						<!-- 						onclick="onSearchBailClick();"><label class="words">查询余额</label></a> -->
					</td>
				</tr>
				<tr>
					<td>融资日期：</td>
					<td><input type="text" name="loanValDt" id="loanValDt"
						editable="false" class="easyui-datebox" required="required"
						data-options="validType:'date'"></td>
					<td>融资到期日：</td>
					<td><input type="text" name="loanDueDt" id="loanDueDt"
						editable="false" class="easyui-datebox" required="required"
						data-options="validType:'date'"></td>
				</tr>
				<tr>
					<td>保证金金额：</td>
					<td><input class="easyui-numberbox" name="marginAmt"
						id="marginAmt"
						data-options="min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"
						value="0" /></td>
					<!-- <td>还款保证金账号：</td>
					<td><input class="easyui-validatebox combo" id="payBailAcno"
						name="payBailAcno" required="true"
						data-options="validType:'maxLength[35]'" />
					</td> -->
				</tr>

				<tr id="Tr1">
				    <td><input id="payBailAcno" name="payBailAcno" type="hidden"></td>
					<td><input id="selId" name="selId" type="hidden"></td>
					<td><input id="trxId" name="trxId" type="hidden"></td>
					<td><input id="sbrId" name="sbrId" type="hidden"></td>
					<td><input id="selLmtBal" name="selLmtBal" type="hidden"></td>
					<td><input id="selLmtAVl" name="selLmtAVl" type="hidden"></td>
					<td><input id="selLmtBalHD" name="selLmtBalHD" type="hidden"></td>
					<td><input id="selLmtAVlHD" name="selLmtAVlHD" type="hidden"></td>
					<td><input id="selLmtDueDt" name="selLmtDueDt" type="hidden"></td>
					<td><input id="regLowestVal" name="regLowestVal" type="hidden"></td>
					<td><input id="pldPerc" name="pldPerc" type="hidden"></td>
					
					<!-- 买方额度表流水号 -->
					<td><input type="hidden" name="buyerLmtSysRefNo" id="buyerLmtSysRefNo"></td>
					<!-- 卖方额度表流水号 -->
					<td><input type="hidden" name="sellerLmtSysRefNo" id="sellerLmtSysRefNo"></td>
					
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
				<tr id="Tr2">
					<td><input id="buyerlmtBal" name="buyerlmtBal" type="hidden"></td>
					<td><input id="buyerlmtAvl" name="buyerlmtAvl" type="hidden"></td>
					<td><input id="buyerlmtBalHD" name="buyerlmtBalHD"
						type="hidden"></td>
					<td><input id="buyerlmtAvlHD" name="buyerlmtAvlHD"
						type="hidden"></td>
				</tr>
				<tr id="Tr3">
					<td><input id="cntrctRefNo" name="cntrctRefNo" type="hidden"></td>
					<td><input id="ttlLoanBal" name="ttlLoanBal" type="hidden"></td>
					<td><input id="payBailAcnoCheck" name="payBailAcnoCheck"
						type="hidden" value="0"></td>
				</tr>
				<tr id="Tr4">

				</tr>
			</table>
		</div>

		<div id="collateralDiv">
			<div style="width: 100%; height: auto" class="easyui-panel"
				title="商品信息" data-options="collapsible:true">
				<div id="collateralToolbar" style="overflow: hidden">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-add" onclick="addPoRow()" plain="true"
						style="float: right; margin-right: 14px;">添加</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-edit" onclick="editPoRow()" plain="true"
						style="float: right">修改</a> <a href="javascript:void(0)"
						class="easyui-linkbutton" iconcls="icon-remove"
						onclick="deletePoRow()" plain="true" style="float: right">删除</a>
				</div>
				<table class="easyui-datagrid" id="collateralTable" cellspacing="0"
					cellpadding="0" style="width: 100%; height: auto"
					iconCls="icon-edit">
				</table>
			</div>

		</div>

		<div id="BillInfoDiv">
			<div class="easyui-panel" title="票据信息"
				data-options="collapsible:true" style="width: 100%">
				<div id="billToolbar" style="overflow: hidden">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-add" onclick="addBillRow()" plain="true"
						style="float: right; margin-right: 14px;">添加</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						iconcls="icon-edit" onclick="editBillRow()" plain="true"
						style="float: right">修改</a> <a href="javascript:void(0)"
						class="easyui-linkbutton" iconcls="icon-remove"
						onclick="deleteBillRow()" plain="true" style="float: right">删除</a>
				</div>
				<table id="billTable" cellspacing="0" cellpadding="0" width="100%"
					class="easyui-datagrid" iconCls="icon-edit">
				</table>

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
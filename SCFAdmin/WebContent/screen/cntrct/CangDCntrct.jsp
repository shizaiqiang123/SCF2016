
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增授信额度信息页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/cntrct/CangDCntrct.js"></script>
</head>
<body>
	<div class="div_ul">
		<form id="cntrctForm">
			<div id="cntrctDiv"	style="width: 100%; height: auto; min-height: 380px"
				class="easyui-panel" title="协议信息" data-options="collapsible:true">
				<table class="utTab">
					<tr>
						<td>协议编号：</td>
						<td><input type="text" name="cntrctNo" id="cntrctNo"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input></td>
						<td>交易日期</td>
						<td><input type="text" name="trxDt" id="trxDt"
							class="easyui-datebox" required="required"
							data-options="validType:'date'" value="${sysUserInfo.sysDate}"></input></td>
					</tr>
						<td>授信网点：</td>
						<td><input type="text" class="easyui-validatebox combo"
							required="true" name="bchNm" id="bchNm"></input><a
							class="easyui-linkbutton" icon="icon-search"
							onclick="showLookUpWindow()">查询</a></td>
						<td>业务类别：</td>
						<td><input id="busiTp" name="busiTp" class="easyui-combobox"
							data-options="onSelect:changeBusiTp,valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false" required="true"></input></td>
					<tr>
						<td>授信客户编号：</td>
						<td><input type="text" name="selId" id="selId"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input><a
							class="easyui-linkbutton" icon="icon-search"
							onclick="selLookUpWindow()">客户</a></td>
						<td>授信客户名称：</td>
						<td><input type="text" name="selNm" id="selNm"
							class="easyui-validatebox combo"
							data-options="validType:'maxLength[35]'"></input></td>
					</tr>
					<tr>
						<td>客户组织机构号：</td>
						<td><input type="text" name="sellerInstCd" id="sellerInstCd"
							class="easyui-validatebox combo" required="true"
							data-options="validType:'maxLength[35]'"></input></td>
						<td>授信额度币种：</td>
						<td><input class="easyui-combobox" id="lmtCcy" name="lmtCcy"
							required="true"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							editable="false" /></td>
					</tr>
					<tr>
						<td>授信额度金额：</td>
						<td><input type="text" name="lmtAmt" id="lmtAmt"
							class="easyui-numberbox" required="true"
							data-options="onChange:changelmtAmt,min:0,precision:2,groupSeparator:',',validType:'maxLength[18]'"></input></td>
						<td>可用额度：</td>
						<td><input type="text" name="lmtBal" id="lmtBal"
							class="easyui-numberbox" required="true"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
					</tr>
					<tr>
						<td>授信额度余额：</td>
						<td><input type="text" name="lmtAllocate" id="lmtAllocate"
							class="easyui-numberbox" required="true"
							data-options="min:0,precision:2,groupSeparator:','"></input></td>
						<td>质押率：</td>
						<td><input name="pldPerc" id="pldPerc" class="easyui-numberspinner"
							data-options="min:0,precision:2,max:100,suffix:'%'" required="true"></input></td>
					</tr>
					<tr>
						<td>初始化保证金比例：</td>
						<td><input type="text" name="initGartPct"
							id="initGartPct" class="easyui-numberspinner" required="true"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
						<td>最大跌幅率：</td>
						<td><input name="maxDroPerc" id="maxDroPerc" value="10"
							class="easyui-numberspinner" required="true"
							data-options="min:0,precision:2,suffix:'%'"></input></td>
					</tr>
					<tr>
						<td>手续费率：<!-- (原转让费率) --></td>
						<td><input type="text" name="transChgrt" id="transChgrt"
							class="easyui-numberspinner" required="true"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
						<td>费用收取方式：</td>
						<td><input id="payChgTp" name="payChgTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
					</tr>
					<tr>
						<td>利率：</td>
						<td><input type="text" name="loanRt" id="loanRt"
							class="easyui-numberspinner" required="true"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
						<td>利息收取方式：</td>
						<td><input id="intColTp" name="intColTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>	
					</tr>
					<tr>
						<td>罚息利率：</td>
						<td><input type="text" name="penaRt" id="penaRt"
							class="easyui-numberspinner"
							data-options="min:0,precision:2,max:100,suffix:'%'"></input></td>
						<td>生效日：</td>
						<td><input type="text" name="lmtValidDt" id="lmtValidDt"
							class="easyui-datebox" required="required"
							data-options="validType:'date'"></input></td>
					</tr>
					<tr>
						<td>到期日：</td>
						<td><input type="text" name="lmtDueDt" id="lmtDueDt"
							class="easyui-datebox" required="required"
							data-options="onChange:getDueDt,validType:'date'"></input></td>
					</tr>
					<tr>
						<td><input type="hidden" name="sysRefNo" id="sysRefNo"></td>
					</tr>
				</table>
			</div>
			<div id="collatInfoDiv">
				<div class="easyui-panel" title="货物信息"
					data-options="collapsible:true" style="width: 100%">
					<div id="collatDiv">
						<table id="collatTable" cellspacing="0" cellpadding="0"
							width="100%" iconCls="icon-edit">
						</table>
						<div id="collatToolbar" style="overflow: hidden">
							<a href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-add" onclick="queryCollat()" plain="true"
								style="float: right; margin-right: 14px;">添加</a> <a
								id="collatRemoveId" href="javascript:void(0)"
								class="easyui-linkbutton" iconcls="icon-remove"
								onclick="deleteCollat()" plain="true" style="float: right">删除</a>
						</div>
					</div>
				</div>
			</div>
			<div id="partyInfoDiv">
				<div class="easyui-panel" title="仓储信息"
					data-options="collapsible:true" style="width: 100%">
					<div id="partyDiv">
						<table id="partyTable" cellspacing="0" cellpadding="0"
							width="100%" iconCls="icon-edit">
						</table>
						<div id="partyToolbar" style="overflow: hidden">
							<a href="javascript:void(0)" class="easyui-linkbutton"
								iconcls="icon-add" onclick="showPatnerToPat()" plain="true"
								style="float: right; margin-right: 14px;">添加</a> <a
								id="patnerRemoveId" href="javascript:void(0)"
								class="easyui-linkbutton" iconcls="icon-remove"
								onclick="deleteParty()" plain="true" style="float: right">删除</a>
						</div>
					</div>
				</div>
			</div>
			
		</form>
	</div>
</body>
</html>
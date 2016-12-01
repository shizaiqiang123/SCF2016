<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加应收账款页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/addInvcPoolPage.js"></script>
</head>
<body>
	<div style="margin-bottom: 20px;">
		<form id="searchForm">
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleOne" type="text"
							name="invcBuyerId" id="invcBuyerId" placeholder="间接客户编号" />
					</span></li>
				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="queryIndustryQuery"
						onclick="onSearchBtnClick()">
						<img class="sysCatalogImg" src="images/style/catalogQuery.png">
					</div>
					<div class="sysCatalogReset sysCatalogBtn" id="queryIndustryReset"
						onclick="onResetBtnClick()">
						<img class="sysCatalogImg" src="images/style/catalogReset.png">
					</div> <a href="javascript:void(0)" onclick="javascript:aBtnEvent();">
						<div class="moreQuery">更多筛选条件</div>
				</a>
				</li>

				<div
					style="display: none; float: left; width: 1000px; margin-left: -32px; margin-bottom: 10px;"
					id="moreSearchDiv">
					<ul class="condList clearfix" id="moreSearchUl">
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">间接客户名称:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="invcBuyerNm" id="invcBuyerNm" />
						</span></li>
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">应收账款凭证编号:</label> <span
							class="dsB fL"> <input
								class="inputM1 combo queryInputStyleTwo" type="text"
								name="queryInvNo" id="queryInvNo" />
						</span></li>
					</ul>
				</div>
			</ul>
		</form>
		<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
			cellpadding="0" width="100%" iconCls="icon-edit">
		</table>
	</div>
	<div id="addCollateralDiv">
		<form id="collateralForm">
			<table class="utTab" align="center" height="50%">
				<tr>
					<td>间接客户编号：</td>
					<td><input class="easyui-validatebox combo" name="buyerId"
						id="buyerId" editable="false" />
					<td>间接客户名称：</td>
					<td><input class="easyui-validatebox combo" name="buyerNm"
						id="buyerNm" editable="false" />
				</tr>
				<tr>
					<td>应收账款凭证编号：</td>
					<td><input class="easyui-validatebox combo" name="invNo"
						id="invNo" editable="false" />
					<td>币种：</td>
					<td><input class="easyui-validatebox combo" name="invCcy"
						id="invCcy" editable="false" /></td>
				</tr>
				<tr>
					<td>应收账款金额：</td>
					<td><input name="invAmt" id="invAmt" class="easyui-numberbox"
						data-options="mmin:0,precision:2,groupSeparator:','"
						editable="false" />
					<td>预付款金额：</td>
					<td><input name="acctAmt" id="acctAmt"
						class="easyui-numberbox"
						data-options="mmin:0,precision:2,groupSeparator:','"
						editable="false" /></td>
				</tr>
				<tr>
					<td>应收账款净额：</td>
					<td><input name="invBal" id="invBal" class="easyui-numberbox"
						data-options="mmin:0,precision:2,groupSeparator:','"
						editable="false" /></td>
					<td>可融资金额</td>
					<td><input name="invLoanAval" id="invLoanAval"
						class="easyui-numberbox"
						data-options="mmin:0,precision:2,groupSeparator:','"
						editable="false" /></td>
				</tr>
				<tr>
					<td>单据开立日期</td>
					<td><input name="invDt" id="invDt" editable="false"
						required="true" class="easyui-datebox"
						data-options="validType:'date'" editable="false" /></td>
					<td>单据起算日</td>
					<td><input name="invValDt" id="invValDt" editable="false"
						class="easyui-datebox" data-options="validType:'date'"
						editable="false" /></td>
				</tr>
				<tr>
					<td>账期</td>
					<td><input name="acctPeriod" id="acctPeriod"
						class="easyui-validatebox combo" editable="false" /></td>
					<td>到期日</td>
					<td><input name="invDueDt" id="invDueDt"
						class="easyui-datebox" data-options="validType:'date'"
						editable="false" /></td>
				</tr>
				<tr style="dsplay: none;">
					<td>融资比例</td>
					<td><input name="loanPerc" id="loanPerc"
						class="easyui-validatebox combo" editable="false"
						data-options="validType:'maxLength[8]'" /></td>
				</tr>
				<tr>
					<td>已融资金额</td>
					<td><input name="invLoanBal" id="invLoanBal"
						class="easyui-numberbox"
						data-options="mmin:0,precision:2,groupSeparator:','"
						editable="false" /></td>
					<td>争议金额</td>
					<td><input name="dspAmt" id="dspAmt" class="easyui-numberbox"
						data-options="min:0,precision:2,groupSeparator:',',validType:'maxLength[18]',onChange:changeDspAmt"
						required="true" /></td>
				</tr>
				<tr>
					<td>争议日期</td>
					<td><input name="dspDt" id="dspDt" editable="false" /></td>
					<td>争议标识:</td>
					<td><input name="dspFlag" id="dspFlag" class="easyui-combobox"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'" /></td>
				</tr>
				<tr>
					<td>发票争议原因</td>
					<td><input name="dspRsn" id="dspRsn" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'" /></td>
					<td>其他原因</td>
					<td><input name="otherRsn" id="otherRsn" type="text"
						data-options="validType:'maxLength[200]'" /></td>
				</tr>
				<tr>
					<td><input name="dspRef" id="dspRef" type="hidden" /></td>
				</tr>
				<tr>
					<td><input id="loanId" name="loanId" type="hidden"></td>
					<td><input id="cntrctNo" name="cntrctNo" type="hidden"></td>
					<td><input id="selId" name="selId" type="hidden"></td>
					<td><input id="sysRefNo" name="sysRefNo" type="hidden"></td>
					<td><input type="hidden" name="arAvalLoan" id="arAvalLoan"></td>
					<td><input type="hidden" name="arBal" id="arBal"></td>
					<td><input type="hidden" name="poolLine" id="poolLine"></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>
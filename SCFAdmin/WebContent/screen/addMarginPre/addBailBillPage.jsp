<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加货物页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript"
	src="script/addMarginPre/addBailBillPage.js"></script>
</head>
<body>
	<div>
		<form id="searchForm">
			<!-- <label>票号：</label><input type="text" name="copyOfBillNO"
				id="copyOfBillNO" /> <a class="easyui-linkbutton"
				icon="icon-search" onclick="SearchPageInfo()">查询</a> -->
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span class="dsB fL height34">
							<input class="inputM1 combo queryInputStyleOne" type="text" name="copyOfBillNO"
							id="copyOfBillNO" placeholder="票号" />
					</span></li>
				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="queryIndustryQuery"
						onclick="SearchPageInfo()">
						<img class="sysCatalogImg" src="images/style/catalogQuery.png">
					</div>
					<div class="sysCatalogReset sysCatalogBtn" id="queryIndustryReset"
						onclick="onResetBtnClick()">
						<img class="sysCatalogImg" src="images/style/catalogReset.png">
					</div>
				</li>
			</ul>
		</form>
		<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
			cellpadding="0" width="100%" iconCls="icon-edit">
		</table>
	</div>
	<div id="billMDiv">
		<form id="bailMForm">
			<table class="utTab" align="center" height="50%">
				<tr>
					<td>票号：</td>
					<td><input class="easyui-validatebox combo" name="billNo"
						id="billNo" />
					<td>开票日：</td>
					<td><input class="easyui-validatebox combo" name="billValDt"
						id="billValDt" />
				</tr>
				<tr>
					<td>到期日：</td>
					<td><input class="easyui-validatebox combo" name="billDueDt"
						id="billDueDt" /></td>
					<td>票据金额：</td>
					<td><input class="easyui-numberbox" name="billAmt"
						id="billAmt"
						data-options="min:0,
						precision:2,groupSeparator:','" />
				</tr>
				<tr>
					<td>保证金余额：</td>
					<td><input class="easyui-numberbox" name="marginBal"
						id="marginBal"
						data-options="min:0,
						precision:2,groupSeparator:','" /></td>
					<td>本次追加保证金金额：</td>
					<td><input class="easyui-numberbox" name="marginCompen"
						id="marginCompen" required="true"
						data-options="min:0,
						precision:2,groupSeparator:',',onChange:checkMarginCompen,validType:'maxLength[18]'" />
					</td>
				</tr>
				<tr>
					<td><input type="hidden" id="cntrctNo" name="cntrctNo" /></td>
					<td><input type="hidden" id="loanId" name="loanId" /></td>
					<td><input type="hidden" id="sysRefNo" name="sysRefNo" /></td>
					<td><input type="hidden" id="marginBalOld" name="marginBalOld" /></td>
					<td><input type="hidden" id="refNo" name="refNo" /></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>
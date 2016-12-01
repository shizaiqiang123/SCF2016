
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>查询监管方信息</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/cntrct/queryStorage.js"></script>
</head>
<body class="UTSCF">
	<div>
		<form id="searchForm">
			<div>
				<ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span
							class="dsB fL height34"> <input
								class="inputM1 combo queryInputStyleThree" type="text"
								name="sysRefNo" id="sysRefNo" placeholder="监管方编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div class="inputOfCenterLine"></div>
						</li>
						<li class="condLists fL clearfix"><span
							class="dsB fL height34"> <input
								class="inputM1 combo queryInputStyleThree" type="text"
								name="patnerName" id="patnerName" placeholder="监管方名称" />
						</span></li>
					</div>
					<li>
						<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
							onclick="SearchCimCust()">
							<img class="sysCatalogImg" src="images/style/catalogQuery.png">
						</div>
						<div class="sysCatalogReset sysCatalogBtn" id="querySellerReset"
							onclick="onResetBtnClick()">
							<img class="sysCatalogImg" src="images/style/catalogReset.png">
						</div>
					</li>
				</ul>
				<table id="patnerTable" title="查询信息列表" class="easyui-datagrid"
					cellspacing="0" cellpadding="0" width="100%" iconCls="icon-edit">
				</table>
			</div>
		</form>
	</div>
	<!-- -----------	新增一个获取上面table选中结果的可输入信息区域------------ -->
	<div id="searchDiv" class="easyui-panel" title="货物信息"
		data-options="collapsible:true" style="width: 100%" align="center">
		<form id='mainForm'>
			<table class="utTab">
				<tr>
					<td>仓储编号：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="sysRefId" id="sysRefId" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
					<td>仓储名称：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="patnerNm" id="patnerNm" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
				</tr>
				<tr>
					<td>城市：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="patnerCity" id="patnerCity" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
					<td>仓库地址：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="patnerAdr" id="patnerAdr" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
				</tr>
				<tr>
					<td>电话：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="patnerTel" id="patnerTel" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
					<td>传真：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="patnerFax" id="patnerFax" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
				</tr>
				<tr>
					<td>电子邮箱：</td>
					<td><input type="text"
						class="easyui-validatebox combo l-textbox-readonly"
						name="patnerEmail" id="patnerEmail" readonly="readonly"
						data-options="validType:'maxLength[35]'" /></td>
					<td>备注：</td>
					<td><input class="easyui-validatebox combo" name="note"
						id="note" data-options="validType:'maxLength[500]'" /></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>池协议信息查询</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/queryCntrctInfoPool.js"></script>
</head>
<body>
	<div>
		<form id="searchForm">
			<!-- <div>
			<table>
			<tr>
			<td><label>授信额度编号：</label></td>
			<td><input type="text"  name ="cntrctNo" id="cntrctNo"  class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/></td>
			<td><label>组织机构代码：</label></td>
			<td><input type="text"  name ="sellerInstCd" id="sellerInstCd"  class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/></td>
			<td><label>授信客户名称：</label></td>
			<td><input type="text"  name ="selNm" id="selNm"  class="easyui-validatebox combo" data-options="validType:'maxLength[35]'"/></td>
			</tr>
			<tr>
			<td><label>业务类别：</label></td>
			<td><input id="busiTp" name="busiTp" class="easyui-combobox"
							data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
							editable="false"></input></td>
							
			<td><label>币种：</label></td>
			<td><input class="easyui-combobox" id="lmtCcy" name="lmtCcy"
							data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
							editable="false" />
			<a class="easyui-linkbutton" icon="icon-search"
					onclick="SearchCimCust()">查询</a></td>
			</tr>
			</table>
		</div> -->
			<ul class="condList clearfix" id="screenDiv">
				<div class="selectDiv" id="selectDiv">
					<div class="remindDiv"></div>
					<li class="condLists fL clearfix"><span
						class="dsB fL height34"> <input
							class="inputM1 combo queryInputStyleOne" type="text"
							name="cntrctNo" id="cntrctNo" placeholder="授信额度编号"
							data-options="validType:'maxLength[35]'" />
					</span></li>
				</div>
				<li>
					<div class="sysCatalogQuery sysCatalogBtn" id="queryIndustryQuery"
						onclick="SearchCimCust()">
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
					style="display: none; float: left; width: 1025px; margin-left: -32px; margin-bottom: 10px;"
					id="moreSearchDiv">
					<ul class="condList clearfix" id="moreSearchUl">
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">组织机构代码:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="sellerInstCd" id="sellerInstCd"
								data-options="validType:'maxLength[35]'" />
						</span></li>
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">授信客户名称:</label> <span class="dsB fL">
								<input class="inputM1 combo queryInputStyleTwo" type="text"
								name="selNm" id="selNm" data-options="validType:'maxLength[35]'" />
						</span></li>
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">业务类别:</label> <span class="dsB fL">
								<input class="combo easyui-combobox queryInputStyleTwo"
								name="busiTp" id="busiTp"
								data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
								editable="false" />
						</span></li>
						<li class="condLists fL clearfix"><label
							class="dsB fL tR labelStyle">额度:</label> <span class="dsB fL">
								<input class="combo easyui-combobox queryInputStyleTwo"
								name="lmtCcy" id="lmtCcy"
								data-options="valueField: 'sysRefNo',textField: 'sysRefNo',panelHeight: 'auto'"
								editable="false" />
						</span></li>
					</ul>
				</div>
			</ul>
		</form>
		<table id="dg" title="查询信息列表" class="easyui-datagrid" cellspacing="0"
			cellpadding="0" width="100%" iconCls="icon-edit">
		</table>

	</div>
</body>
</html>
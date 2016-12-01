<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>Function Add Page</title>
<script type="text/javascript" src="js/para/Function_Page_Add.js"></script>
</head>
<body>
	<div>
		<div style="margin-bottom:20px;">
			<form id="searchForm">
				<!-- <label>Page编号：</label> <input type="text" name="pageId" id="pageId"
					title="用户编号" /> <label>Page名称：</label> <input type="text"
					name="c" id="pageNm" title="用户名称" /> <a
					class="easyui-linkbutton" icon="icon-search"
					onclick="SearchPageInfo()">查询</a> -->
					<ul class="condList clearfix" id="screenDiv">
					<div class="selectDiv" id="selectDiv">
						<div class="remindDiv"></div>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="pageId" id="pageId"
								placeholder="Page编号" />
						</span></li>
						<li class="condLists fL clearfix">
							<div
								style="float: left; height: 32px; width: 1px; border-right: 1px solid #bcbcbc; margin-right: 6px; margin-left: 6px;"></div>
						</li>
						<li class="condLists fL clearfix"><span class="dsB fL">
								<input class="inputM1 combo" type="text"
								style="border: 1px solid #fff;width:100px" name="pageNm"
								id="pageNm" placeholder="Page名称" />
						</span></li>
					</div>
					<li>
						<div class="sysCatalogQuery sysCatalogBtn" id="querySellerQuery"
						onclick="SearchComfInfo()">
							<img class="sysCatalogImg" src="images/style/catalogQuery.png">
						</div>
						<div class="sysCatalogReset sysCatalogBtn" id="querySellerReset"
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
		<div id="searchDiv" class="easyui-panel" title="Page信息"
			data-options="collapsible:true" style="width: 100%" align="center">
			<form id='mainForm'>
				<table class="utTab">
					<tr>
						<td>Id：</td>
						<td><input class="easyui-validatebox combo" name="id" id="id"
							required="true" data-options="validType:'maxLength[35]'" /> <a
							href="javascript:void(0)" class="easyui-linkbutton" id="newId"
							iconcls="icon-add" onclick="newId()" plain="true">取新编号</a></td>
						<td>Name：</td>
						<td><input class="easyui-validatebox combo" name="name"
							id="name" data-options="validType:'maxLength[35]'" /></td>
					</tr>
					<tr>
						<td>Description：</td>
						<td><input class="easyui-validatebox combo" name="desc"
							id="desc" data-options="validType:'maxLength[35]'" /></td>
						<td>Business Unit：</td>
						<td><input class="easyui-validatebox combo" name="bu"
							value="" id="bu" data-options="validType:'maxLength[35]'" /></td>
					</tr>
					<tr>
						<td>Page Type：</td>
						<td><input class="easyui-combobox" id="pagetype"
							name="pagetype"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" /></td>
						<td>Query Id：</td>
						<td><input class="easyui-validatebox combo" name="queryid"
							id="queryid" /></td>
					</tr>
					<tr>
						<td>Logic Id：</td>
						<td><input class="easyui-validatebox combo" name="logicid"
							id="logicid" /></td>
						<td>Doname：</td>
						<td><input class="easyui-validatebox combo" name="doname"
							id="doname" /></td>
					</tr>

					<tr>
						<td>Cascade Event：</td>
						<td><input class="easyui-combobox" id="cascadeevent"
							name="cascadeevent"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" /></td>
						<td>Lock Check：</td>
						<td><input class="easyui-combobox" id="lockcheck"
							name="lockcheck"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" /></td>
					</tr>
					<tr>
						<td>Holdmaster：</td>
						<td><input class="easyui-combobox" id="holdmaster"
							name="holdmaster"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" /></td>
						<td>Is Transaction：</td>
						<td><input class="easyui-combobox" id="istransaction"
							name="istransaction"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" /></td>
					</tr>
					<tr>
						<td>Main Comp：</td>
						<td><input class="easyui-combobox" id="maincomp"
							name="maincomp"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto'"
							editable="false" /></td>
						<td>Main Table：</td>
						<td><input class="easyui-validatebox combo" name="maintable"
							id="maintable" /></td>
					</tr>
					<tr>
						<td>Gapi：</td>
						<td><input class="easyui-validatebox combo" name="gapi"
							id="gapi" /></td>
						<td>Catalog：</td>
						<td><input class="easyui-validatebox combo" name="catalog"
							id="catalog" /></td>
					</tr>
					<tr>
						<td>JSP File：</td>
						<td><input class="easyui-validatebox combo" name="jspfile"
							id="jspfile" /></td>
						<td>Page JS：</td>
						<td><input class="easyui-validatebox combo" name="pagejs"
							id="pagejs" /></td>
					</tr>
					<tr>
						<td>JS File：</td>
						<td><input class="easyui-validatebox combo" name="jsfile"
							id="jsfile" /></td>
						<td>Accounting JS：</td>
						<td><input class="easyui-validatebox combo"
							name="accountingjs" id="accountingjs" /></td>
					</tr>
				</table>
			</form>
		</div>
	</div>


</body>
</html>
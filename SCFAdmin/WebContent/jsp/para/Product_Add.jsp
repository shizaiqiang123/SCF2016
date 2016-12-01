<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>Product Add</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/para/Product_Add.js"></script>
</head>
<body class="UTSCF">
	<form id='mainForm'>
		<div id="regist">
			<div id="mainDiv" style="width: 100%" class="easyui-panel form"
				title="基本信息" data-options="collapsible:true">
				<div class="item">
					<span class="label">编号：</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" name="id" id="id"
							required="true" data-options="validType:'maxLength[35]'" />
					</div>
					<a href="javascript:void(0)" class="easyui-linkbutton" id="newId"
						iconcls="icon-add" onclick="newId()" plain="true">取新编号</a>
				</div>
				<div class="item">
					<span class="label">名称：</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" name="name" id="name"
							data-options="validType:'maxLength[35]'" />
					</div>
				</div>

				<div class="item">
					<span class="label">描述：</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" name="desc" id="desc"
							data-options="validType:'maxLength[35]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">资金来源类型：</span>
					<div class="fl item-ifo">
						<input class="easyui-combobox" id="finTp" name="finTp"
							required="true" editable="false"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:253" />
					</div>
				</div>
				<div class="item">
					<span class="label">资金规则频率：</span>
					<div class="fl item-ifo">
						<input class="easyui-combobox" id="finFrec" name="finFrec"
							required="true"
							data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',height:32,width:253,panelWidth:253"
							editable="false" />
					</div>
				</div>
			</div>

			<div>
				<input type="hidden" name="sysRefNo" value="" id="sysRefNo">
				<input type="hidden" name="paraTp" value="pdp" id="paraTp">
			</div>

			<div id="mainDiv" class="easyui-panel" title="资金来源"
				style="display: block; width: 100%">
				<div id="pageToolbar" style="overflow:hidden;">
					<a href="javascript:void(0)" class="easyui-linkbutton"
						id="addButton" iconcls="icon-add" onclick="addButton()"
						plain="true" style="float:right;margin-right:14px;">添加</a> <a href="javascript:void(0)"
						class="easyui-linkbutton" id="editButton" iconcls="icon-edit"
						onclick="editButton()" plain="true" style="float:right;">修改</a> <a
						href="javascript:void(0)" class="easyui-linkbutton" id="delButton"
						iconcls="icon-remove" onclick="delButton()" plain="true" style="float:right;">删除</a>
				</div>
				<table id="finSourceTable" cellspacing="0" cellpadding="0"
					width="100%" align="center">
				</table>
			</div>

		</div>
	</form>

</body>
</html>
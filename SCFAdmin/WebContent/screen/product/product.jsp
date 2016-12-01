<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>产品页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="script/product/product.js"></script>
</head>
<body>
	<form id="productAddForm">
		<div id="productForm">
			<div class="easyui-panel" title="产品信息"
				data-options="collapsible:true" style="width: 100%">
				<div class="item">
					<span class="label">产品ID：</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" name="productId"
							id="productId" required="true"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">产品名称：</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" name="productNm"
							id="productNm" required="true"
							data-options="validType:'maxLength[200]'">
					</div>
				</div>
				<div class="item">
					<span class="label">产品类别：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" 
							name="busiTp" id="busiTp" 
						 	data-options="validType:['maxLength[2]','number']" />
					</div>
				</div>
				<div class="item">
					<span class="label">产品状态：</span>
					<div class="fl item-ifo">
					<input class="easyui-combobox" id="productSts" name="productSts"
						required="true"
						data-options="valueField: 'id',textField: 'text',panelHeight: 'auto',width:'253px',height:'32px'"
						editable="false" />
				</div>
				</div>
			</div>
			<div class="easyui-panel" title="产品菜单树"
				data-options="collapsible:true" style="width: 100%">
				<table>
					<tr>
						<td>
							<ul id="perInfoDiv" class="easyui-tree"></ul> <input
							id="menuTree" name="menuTree" type="hidden" /> <input
							id="menuSysRefNo" name="menuSysRefNo" type="hidden" /> <input
							id="sysRefNo" name="sysRefNo" type="hidden" />
						</td>
					</tr>
				</table>
			</div>
		</div>
	</form>
</body>
</html>
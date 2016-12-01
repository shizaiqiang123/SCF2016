<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>产品介绍维护页面</title>
<script type="text/javascript" src="script/product/productMaintain.js"></script>
<script src="js/plugin/ckeditor/ckeditor.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script>
	CKEDITOR.on('instanceReady',
			function(evt) {
				var editor = evt.editor;
				//editor.setData( 'This editor has it\'s tabIndex set to <strong>' + editor.tabIndex + '</strong>' );

				// Apply focus class name.
				editor.on('focus', function() {
					editor.container.addClass('cke_focused');
				});
				editor.on('blur', function() {
					editor.container.removeClass('cke_focused');
				});
				if (!SCFUtils.isEmpty(SCFUtils.OPTSTATUS)
						&& SCFUtils.OPTSTATUS != 'ADD'
						&& SCFUtils.OPTSTATUS != 'EDIT') {

					editor.setReadOnly(true);
				}
				// Put startup focus on the first editor in tab order.
				if (editor.tabIndex == 1)
					editor.focus();
			});
</script>
</head>
<body>
	<div id="productDiv" style="width: 100%; height: 500">
		<form id="productDecForm">
			<div class="item">
				<span class="label">产品名称：</span>
				<div class="fl item-ifo">
					<div class="fl item-ifo">
						<input id="sysRefNo" name="sysRefNo" required="true" class="easyui-combobox"
							data-options="width:'253px',height:'32px',valueField:'sysRefNo',
					textField:'productNm',panelHeight: 'auto'"
							editable="false" />
					</div>
				</div>
			</div>
			<div class="item">
				<span class="label">上传图片：</span>
				<div class="fl item-ifo">
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="pictureUrlHD" id="pictureUrlHD" required="true"
							data-options="validType:'maxLength[100]'" />
					</div>
				</div>
				<input type="button" id="submit"
					style="margin-left: 10px; width: 100px; height: 32px"
					onclick="upload()" class="dsIB mR10 hover white btnRed" value="上传" />
			</div>
			<div class="item">
				<span class="label">添加图片文字：</span>
				<div class="fl item-ifo">
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="pictureText" id="pictureText" 
							data-options="validType:'maxLength[100]'" />
					</div>
				</div>
			</div>
			<input type="hidden" name="pictureUrl" id="pictureUrl" />
			<!-- 			<div id="abc" -->
			<!-- 				style="width: 100%; height: 800; background-image: url(images/zybl/lamp.png);"> -->
			<!-- 			</div> -->
			<div id="decDiv" style="width: 100%" class="easyui-panel"
				title="产品介绍" data-options="collapsible:true">
				<textarea class="ckeditor" id="description" name="description" cols="80"
					rows="10" tabindex="1"></textarea>
			</div>
		</form>
	</div>
</body>
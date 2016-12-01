<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>产品介绍维护页面</title>
<script type="text/javascript" src="script/product/productDetails.js"></script>
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
	
// 	CKEDITOR.replace('description',{
// 		toolbarCanCollapse : true
		
// 		toolbarStartupExpanded:false,
// 		toolbar:'full',
// 		toolbar_full:[]
// 		height:150
// 	});	
</script>
</head>
<body>
	<div id="productDiv" style="width: 90%; height: 550px">
		<form id="productDecForm">
			<div id="decDiv" style="width: 100%" class="easyui-panel"
				title="产品介绍" data-options="collapsible:true">
				<textarea class="ckeditor" id="description" name="description" cols="80"
					rows="10" tabindex="1"></textarea>
			</div>
		</form>
		<div id="toolBar" align="right">
		<span id="Prev_btn" onclick="prevBtnClick()" 
			class="dsIB mR10 blockAreaBtn white btnRed">上一步</span>
	</div>
	</div>
	
</body>
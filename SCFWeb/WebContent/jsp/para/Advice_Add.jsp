<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>Function Add</title>
<script type="text/javascript" src="js/para/Advice_Add.js"></script>
<script src="js/plugin/ckeditor/ckeditor.js"></script>
<script>
	CKEDITOR.on('instanceReady', function(evt) {
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
				&& SCFUtils.OPTSTATUS != 'PARAADD'
				&& SCFUtils.OPTSTATUS != 'PARAEDIT') {

			editor.setReadOnly(true);
		}
		// Put startup focus on the first editor in tab order.
		if (editor.tabIndex == 1)
			editor.focus();
	});
</script>
</head>
<body>
	<form id='mainForm'>
		<div id="mainDiv" style="width: 100%; height: 200px"
			class="easyui-panel" title="基本信息" data-options="collapsible:true">
			<table class="utTab">
				<tr>
					<td>Id：</td>
					<td><input class="easyui-validatebox combo"
					 	 name="id" id="id" required="true" data-options="validType:'maxLength[35]'"> 
					<a
						href="javascript:void(0)" class="easyui-linkbutton" id="newId"
						iconcls="icon-add" onclick="newId()" plain="true">取新编号</a></td>
					<td>Name：</td>
					<td><input class="easyui-validatebox combo" 
						 name="name" value="" id="name" data-options="validType:'maxLength[35]'"/></td>
				</tr>
				<tr>
					<td>Description：</td>
					<td><input class="easyui-validatebox combo"
						 name="desc" value="" id="desc" data-options="validType:'maxLength[35]'"/></td>
					<td>Type：</td>
					<td><input id="type" name="type" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" required="true"></input></td>
				</tr>
<!-- 				<tr> -->
<!-- 					<td>ReceiveId：</td> -->
<!-- 					<td><input type="text" name="receiveid" id="receiveid" /></td> -->
<!-- 					<td>SendId：</td> -->
<!-- 					<td><input type="text" name="sendid" id="sendid" /></td> -->
<!-- 				</tr> -->
				<tr>
					<td>SendDt：</td>
					<td><input type="text" class="easyui-datebox" name="senddt"
						id="senddt" editable="false" required="true"
						value="${sysUserInfo.sysDate}"></input></td>
					<td>Expdt：</td>
					<td><input type="text" class="easyui-numberbox" name="expdt"
						id="expdt"  required="true" data-options="min:0" ></input></td>
				</tr>
				<tr>
					<td>js：</td>
					<td><input class="easyui-validatebox combo" name="js" id="js" /></td>
					<td>SendTp：</td>
					<td><input id="sendtp" name="sendtp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" required="true"></input></td>
				</tr>
				<tr>
					<td>GroupTp：</td>
					<td><input id="grouptp" name="grouptp" class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" required="true"></input></td>
					<td>RemindTp：</td>
					<td><input id="remindtp" name="remindtp"
						class="easyui-combobox"
						data-options="valueField:'id',textField:'text',panelHeight: 'auto'"
						editable="false" required="true"></input></td>
				</tr>
				<tr>
					<td>Title：</td>
					<td><input class="easyui-validatebox combo" name="title" id="title" /></td>
				</tr>
			</table>
		</div>
		<div id="noticeTextDiv" style="width: 100%" class="easyui-panel"
			title="通知内容" data-options="collapsible:true">
			<textarea class="ckeditor" id="content" name="content" cols="80"
				rows="10" tabindex="1"></textarea>
		</div>
		<input type="hidden" name="sysRefNo" value="" id="sysRefNo"> <input
			type="hidden" name="paraTp" value="ad" id="paraTp">
	</form>


</body>
</html>
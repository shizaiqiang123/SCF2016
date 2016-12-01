<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<%-- <%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>  --%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增用户页面</title>
<script type="text/javascript" src="js/notice/notice.js"></script>
<script src="js/plugin/ckeditor/ckeditor.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script>
		CKEDITOR.on( 'instanceReady', function( evt ) {
			var editor = evt.editor;
			//editor.setData( 'This editor has it\'s tabIndex set to <strong>' + editor.tabIndex + '</strong>' );

			// Apply focus class name.
			editor.on( 'focus', function() {
				editor.container.addClass( 'cke_focused' );
			});
			editor.on( 'blur', function() {
				editor.container.removeClass( 'cke_focused' );
			});
			if(!SCFUtils.isEmpty(SCFUtils.OPTSTATUS)&&SCFUtils.OPTSTATUS!='ADD'&&SCFUtils.OPTSTATUS!='EDIT'){
				
			 editor.setReadOnly(true);
			}
			// Put startup focus on the first editor in tab order.
			if ( editor.tabIndex == 1 )
				editor.focus();
		});
	</script>
</head>
<body class="UTSCF">
<div id="notice" class="div_ul">
	<form id="noticeForm">
	<div id="noticeDiv" style="width: 100%" class="easyui-panel"
			title="通知信息" data-options="collapsible:true">
			<div class="item">
				<span class="label">发送者名称：</span>
				<div class="fl item-ifo"><input type="text" class="easyui-validatebox combo" name="sendNm" id="sendNm" required="true" value = "${sysUserInfo.userName }" ></input></div>
			</div>
			<div class="item">	
				<span class="label">消息内容编号：</span>
				<div class="fl item-ifo"><input type="text" class="easyui-validatebox combo" name="msgTextId" id="msgTextId"  data-options="validType:'maxLength[35]'"></input></div>
			</div>
			<div class="item">	
				 <span class="label">消息提醒类别：</span>
				<div class="fl item-ifo"><input id="msgRemindTp"   name="msgRemindTp" class="easyui-combobox" 
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  required="true"></input></div>
			</div>
			<div class="item">
				<span class="label">消息推送方式：</span>
				<div class="fl item-ifo"><input id="msgSendTp" name="msgSendTp"  class="easyui-combobox" 
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  required="true"></input></div>
			</div>
			<div class="item">	
				<span class="label">消息分组类别：</span>
				<div class="fl item-ifo"><input id="msgGroupTp"  name="msgGroupTp" class="easyui-combobox" 
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  required="true"></input></div>
			</div>
			<div class="item">
				<span class="label">发送时间：</span>
				<div class="fl item-ifo"><input type="text" class="easyui-datebox"  name="msgSendDate" id="msgSendDate" editable="false" required="true" value ="${sysUserInfo.sysDate}" data-options="width:'253px',height:'32px',validType:'date',panelWidth:'253px'"></input></div>
			</div>
			<div class="item">	
				<span class="label">失效时间：</span>
				<div class="fl item-ifo"><input type="text" class="easyui-datebox"  name="msgInvalidDate" id="msgInvalidDate" editable="false" required="true" data-options="width:'253px',height:'32px',validType:'date',panelWidth:'253px'"></input></div>
			</div>
			<div class="item">
				<span class="label">消息状态：</span>
				<div class="fl item-ifo"><input id="msgStatue" name="msgStatue"   class="easyui-combobox" 
					data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"
				 	editable="false"  required="true"></input></div>
			</div>
			<div class="item">
				<span class="label">消息标题：</span>
				<div class="fl item-ifo"><input type="text"  class="easyui-validatebox combo"  name="msgTitle" id="msgTitle" required="true" data-options="validType:'maxLength[150]'" ></input></div>
			</div>
			<div class="item">
				<div class="fl item-ifo">
					<input type="hidden" name="sendId" id="sendId" value = "${sysUserInfo.userRefNo }" ></input>
					<input type="hidden" name="msgGroupNm" id="msgGroupNm" required="true" ></input>
					<input type="hidden" name="msgGroup" id="msgGroup" required="true" ></input>
					<input type="hidden"  name="sysRefNo" id="sysRefNo" ></input>
				</div>
			</div>
	</div>
	<div class="easyui-panel" title="接收者信息" data-options="collapsible:true" style="width:100%">
	<table id="dg" title="" class="table_screen"></table>
	<div id="toolbar" style="overflow:hidden;">
		<a href="javascript:void(0)" class="easyui-linkbutton"
			iconcls="icon-add" onclick="lookUpUser()" plain="true" style="float:right;margin-right:14px;">添加</a>
		</div>
	</div>
	<div id="noticeTextDiv" style="width: 100%" class="easyui-panel"
			title="通知内容" data-options="collapsible:true">
			<textarea class="ckeditor" id="msgText" name="msgText" cols="80"  rows="10" tabindex="1"></textarea>
	</div>
	</form>
</div>
</body>
</html>
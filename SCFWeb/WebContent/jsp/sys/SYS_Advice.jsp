<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp"%>
<%-- <%@ taglib uri="http://ckeditor.com" prefix="ckeditor" %>  --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>我的通知信息详情</title>
<script type="text/javascript" src="js/sys/SYS_Advice.js"></script>
<script src="js/plugin/ckeditor/ckeditor.js"></script>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
</head>
<script>
	CKEDITOR.on('instanceReady', function(evt) {
		var editor = evt.editor;
		editor.setReadOnly(true);
	});
</script>
<body class="UTSCF">
	<div id="notice" class="div_ul">
		<form id="noticeForm">
			<div id="noticeDiv" style="width: 100%" class="easyui-panel"
				title="通知信息" data-options="collapsible:true">
				<div class="item">
					<span class="label">发件人：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="sendNm"
							id="sendNm"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">发送时间：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-datebox" name="msgSendDate"
							id="msgSendDate" data-options="width:'253px',height:'32px'"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">接收时间：</span>
					<div class="fl item-ifo">
						<input id="msgRecDate" name="msgRecDate" data-options="width:'253px',height:'32px'" class="easyui-datebox"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">消息状态：</span>
					<div class="fl item-ifo">
						<input id="msgStatus" name="msgStatus" class="easyui-combobox"
							data-options="width:'253px',height:'32px',valueField:'id',textField:'text',panelHeight: 'auto'"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">消息标题：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="msgTitle" id="msgTitle"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">标记状态：</span>
					<div class="fl item-ifo">
						<input id="msgS" name="msgS" class="easyui-combobox"
							data-options="width:'253px',height:'32px',onChange:updateAdvice,valueField:'id',textField:'text',panelHeight: 'auto'"></input>
						<a class="btn"
						href="javascript:void(0)" id="markBtn" onclick="sbumitMark();">确认标记</a>	 
					</div>
				</div>
				<div class="item">
					<span class="label" id="mrdT">再提醒日期：</span>
					<div class="fl item-ifo" id="mrdD">
						<input type="text" class="easyui-datebox" name="msgRemaindDate"
							id="msgRemaindDate" data-options="width:'253px',height:'32px',panelWidth:'253px'"></input>
					</div>
				</div>
			</div>
			<div id="noticeTextDiv" style="width: 100%" class="easyui-panel"
				title="通知内容" data-options="collapsible:true">
				<textarea class="ckeditor" id="msgText" name="msgText" cols="80"
					rows="100" tabindex="1"></textarea>
			</div>
			<input type="hidden" name="sysRefNo" id="sysRefNo"></input>
			<input type="hidden" name="sysEventTimes" id="sysEventTimes"></input>
		</form>
	</div>
</body>
</html>
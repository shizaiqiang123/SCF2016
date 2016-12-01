<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="js_cs_nologin.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>注册新用户</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/reg_validate.js"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="regForm">
		<div id="regist">
			<div style="height: 50px;"></div>
			<div style="width: 100%" class="easyui-panel form" title="校验信息"
				data-options="collapsible:true">
				<div class="item">
					<span class="label">营业执照号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="licenceNo" id="licenceNo" required="true"
							onfocus="licenceNoFocus()" onblur="licenceNoBlur()"
							data-options="validType:['noChinese','maxLength[32]']" />
					</div>
				</div>
				<div class="item">
					<span class="label">账号：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="acNo"
							id="acNo" required="true"
							data-options="validType:['maxLength[19]','number','minLength[11]']" />
					</div>
				</div>
				<div class="item">
					<span class="label">账号户名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="acNm"
							id="acNm" required="true"
							data-options="validType:'maxLength[70]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">开户行行名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="acBkNm"
							id="acBkNm" required="true"
							data-options="validType:'maxLength[70]'" />
					</div>
				</div>
			</div>
			<!-- <div id="inputtrAcNo">
				<div style="width: 100%" class="easyui-panel form" title="账号信息"
					data-options="collapsible:true"></div>
			</div> -->
		</div>
	</form>
	<div class="blockAreaFooter clearfix mB20">
		<div class="fL blockAreaNotice red">
			<p class="blockAreaNoticeTitle fWb">温馨提示：</p>
			<p class="blockAreaNoticeTxt">
				1、请根据相应要求填写真实信息进行身份校验,校验信息必须保持其完整性，不可使用简称。<br/>
				2、若无法进行注册请联系管理员进行信息初始化。<br/>
			</p>
		</div>
	</div>
	<div id="toolBar" class="tC clearfix">
		<span id="nextBtn" style="margin-left: 10px" onclick="nextBtnClick"
			class="dsIB mR10 blockAreaBtn white btnRed cursorD disabled">下一步</span>
		<span id="cancelBtn" style="margin-left: 40px"
			onclick="cancelBtnClick()"
			class="dsIB mR10 blockAreaBtn white disabled">取消</span>
	</div>
</body>
</html>
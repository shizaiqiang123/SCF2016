<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>短信验证码</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/mobPhoneCode.js"></script>
</head>
<body>	
	<form id="codeForm">
<!-- 		 <div class="item"> -->
<!-- 			<span class="label">手机号码：</span> -->
<!-- 			<div class="fl item-ifo"> -->
<!-- 				<input type="text" class="easyui-validatebox combo"  -->
<!-- 					required="true" data-options="validType:'mobile'" name="mobPhone" -->
<!-- 					id="mobPhone" />								 -->
<!-- 			</div> -->
<!-- 		</div>		 -->
			<div class="item" id='infoDiv'>
					<span class="label">&nbsp;</span>
					<div class="fl item-ifo">
						<input class="easyui-validatebox combo" id="info"
						name="info" editable="false" />
					</div>
			</div>
            <div class="item" style="padding-top:15px;">
			<span class="label">短信验证码：</span>
			<div class="fl item-ifo">
				<input type="hidden" name="mobPhone" id="mobPhone" />
				<input type="text" class="easyui-validatebox combo easyui-mobPhonecode"
					required="true" id="identifyingcode" name="identifyingcode"
					data-options="validType:'maxLength[6]',mobPhoneId:'mobPhone',sysRefNo:'sysRefNo'" style="width:132px"/>
			</div>
		</div>
	</form>
</body>
</html>
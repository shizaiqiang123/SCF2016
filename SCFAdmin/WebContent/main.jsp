<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<!--STATUS OK-->
<html>
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<base href="<%=basePath%>" />
<title>供应链金融服务平台</title>
<link href="js/plugin/easyUI/themes/default/easyui.css" rel="stylesheet"
	type="text/css" />
<link href="js/plugin/easyUI/themes/icon.css" rel="stylesheet"
	type="text/css" />
<link rel="stylesheet" href="css/zybl/boccop.css" />
<link rel="stylesheet" href="css/zybl/color.css" />
<link rel="stylesheet" href="css/zybl/blCss.css" /><!-- 新增 -->
<script src="js/scfjs/json2.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.min.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.easyui.min.js"	type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.easyui.window.extend.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.go.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/locale/easyui-lang-zh_CN.js"	type="text/javascript"></script>
<script src="javascript/layer/layer.js" type="text/javascript"></script>
<script src="js/scfjs/SCFUtils.js" type="text/javascript"></script>
<script type="text/javascript" src="js/scfjs/main.js"></script>
<script src="js/plugin/easyUI/jquery.base64.js" type="text/javascript"></script>
<script type="text/javascript" src="js/plugin/terminator/koala.min.1.5.js"></script>
</head>
<body>
<div id="wrap">
	<div class='header' id='bodyHeader'>
	<div class='headerDiv'  >  
	</div>
	</div>
	 <hr class='bodyHr'></hr>
	 
	<div id="centerDiv" ></div>
</div>
<div class='footer'>
	 <div class="footerBody">
		<div class="footerDiv">
		<p class="footerP">版权所有 ©2016南京信雅达友田信息技术有限公司</p>
		</div>
	 </div>
	 </div>
</body>
</html>
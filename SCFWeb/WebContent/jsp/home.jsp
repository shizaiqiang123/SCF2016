<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="js_cs.jsp"%>
<html>
<head>
<title>首页</title>
<link rel="stylesheet" href="css/zybl/boccop.css" />
<link rel="stylesheet" href="css/zybl/color.css" />
<link rel="stylesheet" href="css/zybl/style.css" />
<link rel="stylesheet" href="css/zybl/blCss.css" />
<script type="text/javascript" src="js/home.js"></script>
</head>
<body  class="homeBody" style="min-height: 348px;">
<!-- 	<div id="advert" class="easyui-panel" style="width:100%;margin-top:1" title="&nbsp;" -->
<!-- 			 data-options="collapsible:true,onExpand:editAdvert" ></div> -->
<!-- 	<div id="info_sub"> -->
<!-- 		<div class="mid_con_sub"> -->
<!-- 			<div class="left_img_info"> -->
<!-- 				<div class="portrait_left"> -->
<!-- 					<img  id="imgUrl" src="images/image/subin-_12.png" width="77" height="77" alt="" onclick=""/> -->
<!-- 				</div> -->
<!-- 				<div class="name_time_right"> -->
<!-- 					<ul> -->
<%-- 						<li><a class="blue" href="javascript:void(0)" onclick="blueOnclick()">${sysUserInfo.userName }</a></li> --%>
<%-- 						<li class="dark">${sysUserInfo.sysDate }</li> --%>
<!-- 					</ul> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 			<div class="right_text_info"></div> -->
<!-- 		</div> -->
<!-- 	</div> -->
	<div id="submain">
<!-- 	<div class="siteCrum mB20" style='border-bottom-color:#b50029;'></div> -->
		<div class='SystemDate' style="display:none">${sysUserInfo.sysDate }</div>
		<div class="left_news_img">
			<div id="content" class="home">
				<div>
					<input type="hidden" id="userId" name="userId"
						value="${sysUserInfo.userId }" /> <input type="hidden"
						name="userOwnerId" id="userOwnerId"
						value="${sysUserInfo.userOwnerId}" />
				</div>
				
			</div>
<!-- 				<div style="display: flex; float: left;width:100%"> -->
<!-- 					<div id="client_financing1"></div> -->
<!-- 					<div id="client_financing2"></div> -->
<!-- 				</div> -->
		</div>
<!-- 		<div class="link_right"> -->
<!-- 			<div class="title_bg">快捷导航</div> -->
<!-- 		</div> -->
		
	</div>
<!-- 	<div class="siteNav noprint"> -->
<%-- 			<jsp:include flush="true" page="nav.jsp"></jsp:include> --%>
<!-- 		</div> -->
</body>
</html>
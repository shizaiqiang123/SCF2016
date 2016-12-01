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

<link href="js/plugin/easyUI/themes/default/easyui.css" rel="stylesheet"
	type="text/css" />
<link href="js/plugin/easyUI/themes/icon.css" rel="stylesheet"
	type="text/css" />
<link rel="stylesheet" href="css/zybl/style.css" />
<!-- <link rel="stylesheet" href="css/zhcss/boccop.css" /> -->
<!-- <link rel="stylesheet" href="css/zhcss/color.css" /> -->
<link rel="stylesheet" href="css/zybl/boccop.css" />
<link rel="stylesheet" href="css/zybl/color.css" />
<link rel="stylesheet" href="css/zybl/blCss.css" />
<link href="assets/css/bootstrap.css" rel="stylesheet" />
<link href="assets/css/font-awesome.css" rel="stylesheet" />
<link href="assets/css/custom-styles.css" rel="stylesheet" />

<script src="js/scfjs/json2.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.min.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.easyui.min.js"
	type="text/javascript"></script>
<script src="js/plugin/easyUI/locale/easyui-lang-zh_CN.js"
	type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.easyui.window.extend.js"
	type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.go.js" type="text/javascript"></script>
<script src="javascript/layer/layer.js" type="text/javascript"></script>
<script src="js/scfjs/broswer.js" type="text/javascript"></script>
<script src="js/scfjs/SCFUtils.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.base64.js" type="text/javascript"></script>
<script src="js/scfjs/index.js" type="text/javascript"></script>
<script type="text/javascript">
	window.onload = function() {
		leftMenuShow();
	}
	function leftBox() {
		var oBox = document.getElementById('box');
		oBox.style.transition = 'all 0.5s ease-in-out';
		var oShow = document.getElementById('kjcdImg');
		var S1 = oShow.offsetWidth;
		//获取元素自身的宽度
		var L1 = oBox.offsetWidth;
		//获取元素自身的高度
		var H1 = oBox.offsetHeight;

		var onscrollTop = document.body.scrollTop;//滚动条距顶部高度
		//获取实际页面的left值。（页面宽度减去元素自身宽度/2）
		var Left = (document.documentElement.clientWidth - L1);
		//获取实际页面的top值。（页面宽度减去元素自身高度/2）
		var top = (document.documentElement.clientHeight) / 2;
		oBox.style.left = Left + 'px';
		oBox.style.top = top + onscrollTop + 'px';
	}

	function rightBox() {
		var oBox = document.getElementById('box');
		var oShow = document.getElementById('kjcdImg');
		var S1 = oShow.offsetWidth;
		oBox.style.transition = 'all 0.5s ease-in-out';
		//获取元素自身的宽度
		var L1 = oBox.offsetWidth;
		//获取元素自身的高度
		var H1 = oBox.offsetHeight;
		//获取实际页面的left值。（页面宽度减去元素自身宽度/2）

		var onscrollTop = document.body.scrollTop;//滚动条距顶部高度

		var Left = (document.documentElement.clientWidth - S1);
		//获取实际页面的top值。（页面宽度减去元素自身高度/2）
		var top = (document.documentElement.clientHeight) / 2;
		oBox.style.left = Left + 'px';
		oBox.style.top = top + onscrollTop + 'px';
	}

	//让导航栏右对齐居中并随滚动条滚动
	function remove() {
		deifndDiv('box');
		deifndDiv('show');
		// 		deifndDiv('rightMenu');
	}
	function deifndDiv(div) {
		var box = document.getElementById(div + '');
		// 		var boxW = box.offsetWidth;
		// 		var boxH = box.offsetHeight;
		// 		var Left = (document.documentElement.clientWidth);
		var onscrollTop = document.body.scrollTop;//滚动条距顶部高度
		var boxTop = (document.documentElement.clientHeight) / 2 + onscrollTop;
		// 		box.style.left = Left + 'px';
		box.style.top = boxTop + 'px';
	}

	function getScrollHeight() {
		return Math.max(document.body.scrollHeight,
				document.documentElement.scrollHeight);
	}

	$('div[id=Tr5]')
	//当浏览器页面发生改变时
	// 	window.onresize = function() {
	// 		remove();
	// 	}
	//div随着滚动条的变动而变动
	window.onscroll = function() {
		/* 		var box = document.getElementById('box');
		 box.style.transition = 'all 0.1s ease-in-out';
		 remove();
		 var rightMenu = document.getElementById('rightMenu');
		 //var navigation = document.getElementById('navigation');
		 var rightHeight = getScrollHeight();
		 var onscrollTop = document.body.scrollTop;//滚动条距顶部高度
		 var clientHeight = document.documentElement.scrollHeight+onscrollTop;
		 rightMenu.style.height = clientHeight+'px';
		 navigation.style.height = clientHeight+'px';
		 */
	}
	//左侧导航的隐藏显示按钮点击事件
	//$("#box").animate({height:"300px"},3500,"linear",ShowMsg());
	function leftMenuShow() {
		$("#sideNav").click(function() {
			var animatewidth = (1920 - 1000) / 2 + 200;
			if ($(this).hasClass('closed')) {//隐藏回来
				$(this).removeClass('closed');
				//$("#leftMenu").animate({'margin-left': '0px'});//animate为动画效果。左侧导航逐渐变为距离左边0px
				//$("#firstLevelMenu").animate({'margin-left': '0px'});
				$("#bigLeftMenu").animate({
					'margin-left' : '0px'
				});
				//$("#leftMenuDiv").animate({'margin-left': '4%'});
				//$("#rightBody").animate({"width":"82%"});//$("#rightBody").attr("style","width:830px");
				//$("#centerDiv").animate({'paddingLeft': '20px'});//$("#centerDiv").attr("style","width:830px;margin-left:19px;margin-top:20px;");
				//$("#blockAreaFooter").attr("style","width:830px");
			} else {//隐藏
				$('#sideNav').addClass('closed');
				//$("#leftMenu").animate({'margin-left': '-'+animatewidth+'px'},"500");//animate为动画效果。左侧导航逐渐变为距离左边-200px
				//$("#firstLevelMenu").animate({'margin-left': '-'+animatewidth+'px'},"500");
				//$("#leftMenuDiv").animate({'margin-left': '-'+animatewidth+'px'},"500");
				$("#bigLeftMenu").animate({
					'margin-left' : '-' + animatewidth + 'px'
				}, "500");
				//$("#rightBody").animate({"marginLeft":"0px","width":"100%" });//$("#rightBody").delay(5000).attr("width","1000px"); 
				//$("#centerDiv").animate({"width":"100%"});
			}
		});
	}
</script>
<style>
* {
	margin: 0;
	padding: 0
}

#box {
	width: 300px;
	height: 400px;
	position: absolute;
	top: 50%;
	left: 100%;
	border: 1px solid red;
	float: left;
	display: inline;
	transition: all 0.5s ease-in-out;
	border-radius: 2px;
	box-shadow: 3px 3px 3px 3px rgba(255, 255, 255, .08);
	margin-top: -200px;
	/*  	margin-left: -300px; */
	z-index: 111;
	background: #F9F9F9;
}

#show {
	width: 35px;
	height: 450px;
	position: absolute;
	top: 50%;
	left: 100%;
	/* 	border: 1px solid red; */
	float: right;
	display: inline;
	margin-left: -25px;
	margin-top: -50px;
	z-index: 999;
}

#rightMenu {
	width: 35px;
	/*  	height: 100%; */
	position: absolute;
	top: 0;
	left: 100%;
	/* 	border: 1px solid red; */
	float: right;
	display: inline;
	margin-left: -25px;
	/* 	margin-top: -150px; */
	z-index: 222;
}

#kjcdImg {
	width: 35px;
	height: 450px;
}
.demo {   
    width:100%;
    /*height:1000px;*/   
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#2886fe), to(#002f6b));   
    background: -webkit-linear-gradient(top, #2886fe, #002f6b);   
    background: -moz-linear-gradient(top, #2886fe, #002f6b);   
    background: -o-linear-gradient(top, #2886fe, #002f6b);   
    background: -ms-linear-gradient(top, #2886fe, #002f6b);   
    background: linear-gradient(top, #2886fe, #002f6b);   
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType = 0, startColorstr = #2886fe, endColorstr = #002f6b);   
}
</style>
<title>供应链金融服务平台</title>
</head>
<body>
	<div id="wrap">
		<div class='header' id='bodyHeader'>
			<div class='headerDiv'>
				<ul class='menuUl' style='margin-right: 0px'>
					<li class='menuLi'><a class='menuA' onclick="logout()">退出</a>
					<p class='menuP2'>|</p></li>
					<li class='menuHead' style="display:none"><a class='menuA'
						style='margin-left: 80px;' href='javascript:void(0)' id='userInfo'>${sysUserInfo.userName }</a>
					<div class='userLogo'></div></li>
					<li class='menuHead'><a class='menuA'
						style='margin-left: 80px;' href='javascript:void(0)'
						onclick="SCFUtils.onCancelBtnClick();">首页</a>
					<div class='home2' onclick="SCFUtils.onCancelBtnClick();"></div></li>
				</ul>
			</div>
		</div>
		<!-- 	<hr class='bodyHr' id='bodyHr'></hr> -->
		<!-- <div class='position' id='position'></div> -->
		<div id="bigLeftMenu" style="width: 15%; float: left;">
			<div class='leftMenu' id='leftMenu' style="display: none"></div>
			<div class='firstLevelMenu' id='firstLevelMenu' style="display: none"></div>
			<div class='leftMenuDiv' id="leftMenuDiv"></div>
			<div class='firstLevelMenuDiv' id="firstLevelMenuDiv"></div>
		</div>
		<div class='bodyBox' id='bodyBox'>
			<div class='rightBody' id='rightBody'>
				<div class='coordinate' id="coordinate">
					<!-- 		<div class='coordinate1'></div> -->
					<!-- 		<div class='coordinate2'></div> -->
				</div>
				<!-- 	<div class='menuBody' id='menuBody'> -->
				<!-- 		<div class='menuBtn'><</div> -->
				<!-- 		<div class='menuParent'>产品管理</div> -->
				<!-- 		<div class='menuChildren'>配置管理</div> -->
				<!-- 		<div class='menuChildren' style='color:#e70012'>查询管理</div> -->
				<!-- 		<div class='menuChildren'>产品设置</div> -->
				<!-- 		<div class='menuChildren'>协议设置</div> -->
				<!-- 		<div class='menuChildren'>利/费报价</div> -->
				<!-- 		<div class='menuBtn2'>></div> -->
				<!-- 	</div> -->
				<div class="positionDiv" id="positionDiv">
					<div class="positionBody" id="pageNavigation"></div>
				</div>
				<div class='blockAreaFooterDiv' id='blockAreaFooterDiv'
					style="margin-top: 22px"></div>
				<div id="sideNav" href="">
					<i class="fa fa-caret-right"></i>
				</div>
				<div id="centerDiv" class="mainPageCenterDivHight"></div>
				<div class="siteNav noprint" id="menuPage" style="margin-bottom:90px">
					<jsp:include flush="true" page="jsp/nav.jsp"></jsp:include>
				</div>
				<!-- 		<div id="show" > -->
				<!-- 			<!-- <img id="kjcdImg" src="images/kjcd.png" style = "width:25px;height:25px;" /> -->
				<!-- 		</div> -->
			</div>
		</div>
	</div>
	<%-- <div class="siteNav noprint" id="menuPage" style="margin-top:-207px">
		<jsp:include flush="true" page="jsp/nav.jsp"></jsp:include>
	</div> --%>

	<%-- 	<div class='comMsg' id='comMsg'>
		<div class='client_financing1' id='client_financing1'></div>
		<div class='client_financing2' id='client_financing2'></div>
		<input type="hidden" id="userId" name="userId"
			value="${sysUserInfo.userId }" />
	</div> --%>

	<div class='footer' id='footer'>
		<div class="footerBody" id='footerBody'>
			<div class="footerDiv">
				<p class="footerP marginTop4">版权所有 ©2016南京信雅达友田信息技术有限公司</p>

			</div>
		</div>
	</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>供应链金融服务平台系统登录</title>
<link href="js/plugin/easyUI/themes/default/easyui.css" rel="stylesheet"
	type="text/css" />
<link href="js/plugin/easyUI/themes/icon.css" rel="stylesheet"
	type="text/css" />
<link rel="stylesheet" href="css/zybl/boccop.css" />
<link rel="stylesheet" href="css/zybl/color.css" />
  <link rel="stylesheet" href="css/zybl/blCss.css" />
<!-- <link rel="stylesheet" type="text/css" href="js/plugin/fullPage.js-master/jquery.fullPage.css" /> -->

<script src="js/scfjs/json2.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.min.js" type="text/javascript"></script>
<script src="js/plugin/jquery/jquery.ui.js" type="text/javascript"></script>
<!-- <script type="text/javascript" src="js/plugin/fullPage.js-master/jquery.fullPage.js"></script> -->
<script src="js/plugin/easyUI/jquery.easyui.min.js"
	type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.easyui.window.extend.js"
	type="text/javascript"></script>
<script src="js/plugin/easyUI/locale/easyui-lang-zh_CN.js"
	type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.base64.js" type="text/javascript"></script>
<script src="javascript/layer/layer.js" type="text/javascript"></script>
<script src="js/scfjs/broswer.js" type="text/javascript"></script>
<script src="js/scfjs/SCFUtils.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/src/jquery.cookie.js"
	type="text/javascript"></script>
<script type="text/javascript" src="js/scfjs/password.js"></script>
<script type="text/javascript" src="js/scfjs/login.js"></script>
<script type="text/javascript" src="js/plugin/terminator/koala.min.1.5.js"></script>
</head>
<body>
<div class='body'>
	 <div id="MyID" style="width: 100%; height: 100%;">
		<div class='bannerDemo' id='bannerDemo'>
			<div class='bannerDemoDiv'>
				 <div class='bannerDemo1'>
					<div class='bannerDemo1Div'></div>
				 </div>
			</div>
		</div>
	</div>
	 <div class='title'>
	 <form method="post" action="login" name="form2" id="loginForm">
		<div class='bannerBox'>
			<div class='bannerLoginBox'>
				<div class='bannerLgoinLogo'>
					<div class='bannerLgoinLogoTitle'>登录</div>
					<!-- <a class='bannerLgoinLogoA' onclick="parent.window.loginReg();">立即注册>></a>
					<p class='bannerLgoinLogoP'>还没有账号？</p> -->
				</div>
				
			</div>
			<hr class='bannerLgoinLogoHr'></hr>
			
			<div class='bannerLoginDiv'>
				<div class='bannerLoginInputDiv'>
					<input type="text" class="bannerLoginInput user" id="userId" name="userId"
						placeholder="请输入用户名" onKeyPress="enterKey(event)"/>
				</div>
			</div>
			<div class='bannerLoginDiv'>
				<div class='bannerLoginInputDiv' style='margin-top: 17px;'>
					<input type="password" class="bannerLoginInput password"  id="password" name="password"
						placeholder="请输入密码" onKeyPress="enterKey(event)" value="000000"/>
				</div>
			</div>
			<div class='bannerLoginDiv loginIden'>
				<div class='bannerLoginInputDiv' style='margin-top: 17px; '>
					<input type="text" class="bannerLoginInput code"  id="code" name="code"
						placeholder="请输入验证码" onKeyPress="enterKey(event)" style='width:170px'/>
						<img src="code.jpg" align="absmiddle" title="看不清，点击换一张" 
						style="cursor: pointer" onclick="this.src='code.jpg?'+$.now()"
						id="imgCode" />
				</div>
			</div>
					<div class='remUser'>
						<input type="checkbox" name="remember" id="remember" /> 记住我的用户名
					</div>
					<div class='bannerLoginButtonDiv'>
						<input type="button" value="立即登录" class="bannerLoginButton"
							onClick="login()" />
					</div>

					<!-- <div class='askPass'>
						<a class='askPassA' onclick="parent.window.findPass();">忘记密码！</a>
					</div> -->
				</div>
				<input type="hidden"  id="userGrade" name="userGrade"  value = "1"/>
		</form>
	 </div>
	<input type="hidden" class="easyui-validatebox combo" id="firstLanding"
		name="firstLanding" />
	<input type="hidden" class="easyui-validatebox combo" id="sysRefNo"
		name="sysRefNo" />
	</div>
</body>
</html>
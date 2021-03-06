<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="../../jsp/js_cs.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>业务功能流程总览</title>
<style type="text/css">
	.demo {   
    width:100%;
    height:1000px;  
    background: transparent;
}
</style>
<script type="text/javascript">
$(function(){
	parent.$('#wrap').addClass('demo');
});
SCFUtils.initBar = function(){
	 return [];
};
		function clickEvent(id){
			var animatewidth = (document.documentElement.clientWidth*0.3)/2+500;
			var data = initMenu();
			var index = 0;
			$.each(data,function(i,v){
				index++;
				var flag = true;
				if(i == id){
					$(document).scrollTop(0);//使滚动条回到顶部，即整个页面回到顶部
					parent.$('#sideNav').addClass('closed');
					parent.$("#bigLeftMenu").animate({'margin-left': '-'+animatewidth+'px'},"500");
					parent.$("#wrap").removeClass("demo");
					SCFUtils.entry(id, v);
					//leftMenuShow();
				}
				if(flag&&Object.getOwnPropertyNames(data).length==i){
					SCFUtils.alert('你没有权限去操作该功能！');
					return;
				}
			});
		}
		
		function initMenu() {//获取path
			
						var path = {};
			var options = {
				url : SCFUtils.AJAXURL,
				async : false,
				data : {
					queryId : 'Q_S_MENU_0001'
				},
				callBackFun : function(data) {
					if (data.success&&!SCFUtils.isEmpty(data.rows)) {
						$.each(data.rows[0].children,function(i,v){
							$.each(v.children,function(u,t){//功能
								path[t.children[0].id] = t.children[0].path;
							});
						});
					}
				}
			};
			SCFUtils.ajax(options);
			return path;
		}
</script>
<style type="text/css">
	img{
		position: absolute;
		display: block;
		border:0px;
	}
	a{
		text-decoration: none;
	}
	.sr{
		top:150px;
		left:50px
	}
	.world{
		display:block;
		margin: 80px 20px;
		color:white;
		font-family: Microsoft YaHei;
		font-size: 14px;
	    text-decoration: none;
	}
	.dengji{
		position: absolute;
		left:203px;
		top:50px;
	}
	.rongzhi{
		position: absolute;
		left:431px;
		top:200px;
	}
	.maifu{
		position: absolute;
		left:484px;
		top:50px;
	}
	.zhengyi{
		position: absolute;
		left:623px;
		top:50px;
	}
	.jeique{
		position: absolute;
		left:330px;
		top:417px;
	}
	.daixiang{
		position: absolute;
		left:431px;
		top:200px;
	}
	.fanzhuanr{
		position: absolute;
	    left: 414px;
   	 	top: 200px;
	}
	.maihuank{
		position: absolute;
		left:622px;
		top:200px;
	}
	.zhuangrang{
		position: absolute;
		left:345px;
		top:50px;
	}
</style>
</head>
<body class="demo">
	<div style="margin:50px 0px 0px 50px;padding-bottom:50px">
		<img  class="sr" src="images/flowChart/line7.png">
		<div class="dengji">
			<a href="javascript:void(0);" onclick="javascript:clickEvent('F_P_000954');">
				<img  src="images/flowChart/hetong.png">
				<span class="world">录入</span>
			</a>
		</div>
		<div class="zhuangrang">
			<a href="javascript:void(0);" onclick="javascript:clickEvent('F_P_000962');">
				<img  src="images/flowChart/rongzhi.png">
				<span class="world">融资</span>
			</a>
		</div>
		<!--  <div class="rongzhi">
			<a href="javascript:void(0);" onclick="javascript:clickEvent('F_P_000078');">
				<img  src="images/flowChart/zhihuan.png">
				<span class="world">置换</span>
			</a>
		</div>-->
		<div class="maifu">
			<a href="javascript:void(0);" onclick="javascript:clickEvent('F_P_000909');">
				<img  src="images/flowChart/maifu.png">
				<span class="world">还款</span>
			</a>
		</div>
		
		
		
		
		
		<div class="zhengyi">
			<a href="javascript:void(0);" onclick="javascript:clickEvent('F_P_000901');">
				<img  src="images/flowChart/tongzhi.png">
				<span class="world">通知</span>
			</a>
		</div>
	</div>
</body>
</html>
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
			var animatewidth = (document.documentElement.clientWidth-1000)/2+200;
			var data = initMenu();
			var index = 0;
			$.each(data,function(i,v){
				index++;
				var flag = true;
				if(i == id){
					$(document).scrollTop(0);//使滚动条回到顶部，即整个页面回到顶部
					parent.$('#sideNav').addClass('closed');
					parent.$("#bigLeftMenu").animate({'margin-left': '-'+animatewidth+'px'},"500");
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
</head>
<body class="demo">
	<div style="margin:50px 0px 0px 50px;padding-bottom:50px;height:700px">
		<!--  <img  src="images/flowChart/gndbl.png" usemap="areaImg">
		<map name="areaImg" id="areaImg">
			<area shape="rect" coords="0,139,73,242" onclick="javascript:clickEvent('F_P_000616')" id="dengji" name="dengji" />
			<area shape="rect" coords="0,267,73,370" onclick="javascript:clickEvent('F_P_000017')" id="zhuanrang" name="zhuanrang" />
			<area shape="rect" coords="0,397,73,500" onclick="javascript:clickEvent('F_P_000020')"  id="rongzhi" name="rongzhi" />
			<area shape="rect" coords="0,529,73,633" onclick="javascript:clickEvent('F_P_000132')" id="mhuang" name="mhuang" />
			<area shape="rect" coords="187,528,259,633" onclick="javascript:clickEvent('F_P_000134')" />
			<area shape="rect" coords="187,326,259,427" onclick="javascript:clickEvent('F_P_000125')" />
			<area shape="rect" coords="211,107,286,211" onclick="javascript:clickEvent('F_P_000618')" />
			<area shape="rect" coords="344,108,417,211" onclick="javascript:clickEvent('F_P_000127')" />
			<area shape="rect" coords="477,296,550,398" onclick="javascript:clickEvent('F_P_000619')" />
		</map>-->
	</div>
</body>
</html>
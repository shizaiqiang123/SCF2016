$(function() {
	initMenu();	
});
//var sdata;

//加载左侧导航菜单

var pageId = 'F_P_000616';
var pathValue = "业务管理 > 国内单笔保理 > 流程展示";
function initMenu() {
	
	var options = {
		url : SCFUtils.AJAXURL,
		async : true,
		data : {
			queryId : 'Q_S_MENU_0001'
		},
		callBackFun : function(data) {
			if (data.success&&!SCFUtils.isEmpty(data.rows)) {
//				addNav(data.rows);
				formatMenuDate(data.rows);
				InitLeftMenu();	
				parent.sdata=data;
			}
		}
	};
	SCFUtils.ajax(options);
}

/*------------------------importent-----------------
 * 
 * importent-------业务管理菜单一定要在第一个，序号一定要为0，menu_num=0！ 一定！
 * ------------------------------------------------*/
function formatMenuDate(data){
//	var menus = $('#menus');
	var num=data.length;
	$.each(data, function(i, o) {
		var idHead = "menuHead"+i;
		var idBody = "menuBodyDiv"+i;
		var menus=$('#menus');
		var menuDiv=$('<div class="menuDiv">');
		if(i==3||i==7||i==11){
		}else{
			menuDiv.attr("style","margin-right:37px");
		}
		var menuHead='';
			if(!SCFUtils.isEmpty(o.menuImage)){
			menuHead=$('<div id="'+idHead+'" class="menuHeadDiv">');
			menuHead.attr('style','background-image: url("'+o.menuImage+'");background-repeat: no-repeat;background-position:center;');
			}else{
				menuHead=$('<div style="width:80px;height:80px;margin-top:18px">');
			}
			menuDiv.append(menuHead).appendTo(menus);	
			/*--------判断是否为“业务管理”大模块-----*/
			if(o.text=="业务管理"){
				var operationDiv = $('<div id="MT_nav" class="clearfix">');
				operationDiv.appendTo(menuDiv);
				var ul=$('<ul></ul>');
				var li=$('<li class="MT-item MT-current"><a id="yWid" hidefocus="true" class="MT-bg">'+
						'业务管理'+'<i class="MT-more"></i></a></li>');
				ul.append(li).appendTo(operationDiv);
				var tanDiv = $('<div></div>');
				var tanDivSpan = $('<span class="MT-arrow"></span>');
				tanDiv.append(tanDivSpan).appendTo(li);
				$.each(o.children, function(i, k) {
					var menu=$('<li class="small" hidefocus="true">'+k.text+'</li>');
					menu.appendTo(tanDivSpan).unbind().bind('click', function() {
						var id="";
						var path="";
						if(k.children.length!=0){
							if(k.children[0].children.length!=0){
								id=k.children[0].children[0].id;
								path=k.children[0].children[0].path;
								formatLeftMenu(k);
							}
							else{
								id=k.children[0].id;
								path=k.children[0].path;
								formatLeftMenu(k);
							}
						}else{
							id=k.id;
							path=k.path;
							formatLeftMenu(o);
							
						}
						pageId = id;
						pathValue = path.substring(0, path.lastIndexOf('>',path.length-5))+'> 流程展示';
						formatFirstLevelMenu(o,o.id,data);
						getFlowChart(id,pathValue);
						//SCFUtils.entry("F_P_000726",firstPagePath(path));
						$("#bodyBox").attr("style","width:70%;");
						$(document).scrollTop(0);//使滚动条回到顶部，即整个页面回到顶部
					});
					$("#yWid").hover(function() {//移上去(一到“业务管理”字上面的时候图片和字一起变蓝)
						$("#yWid").css('color', '#014295');
					}, function() {//移出来
					    $("#yWid").css("color","#545454");
					});
					$("li[class='small']").hover(function(){//当弹出3级菜单时鼠标放上去，上面的字和图片依然为蓝色。
						$("#yWid").css('color', '#014295');
					},function() {//移出来
					    $("#yWid").css("color","#545454");
					});
				});
			}
			else{
			var menu=$('<div id="'+idBody+'" class="menuBodyDiv">'+o.text+'</div>').appendTo(menuDiv);
			//给整个div加上跳转事件
			menuDiv.unbind().bind('click', function() {
				var id="";
				var path="";
				formatLeftMenu(o);
				if(o.children.length!=0){
					if(o.children[0].children.length!=0){
						id=o.children[0].children[0].id;
						path=o.children[0].children[0].path;
					}
					else{
						id=o.children[0].id;
						path=o.children[0].path;
					}
				}
				else{
					id=o.id;
					path=o.ptah;
				}
				formatFirstLevelMenu(o,o.id,data);
				getFlowChart(o.id, o.text);
			}).hover(function() {//移上去
				$('#'+idBody).css('color', '#014295');
				$('#'+idBody).css('text-decoration', 'none');
			}, function() {//移出来
			    $('#'+idBody).css("color","#545454");
			    $('#'+idBody).css('text-decoration', 'none');
			});
			}
			
	});
}

function getFlowChart(id,path){
	var fp = "";
	var index = path.indexOf('申请');
	if(index != -1){
		path = path.substring(0,index)+' > 流程展示';
	}
	if(id === 'F_P_000616' || id === 'MENU000579'){//国内单笔
		if(path.indexOf('流程展示')<0){
			path = path+' > 流程展示';
		}
		fp = "F_P_000726";
	}else if (id === 'F_P_000778'){
		fp = 'F_P_000919';//买方保理池
	}else if(id === 'F_P_000729'){
		fp = 'F_P_000920';////买方保理
	}else if(id === 'F_P_000028'){
		fp = 'F_P_000921';//先票后货
	}else if(id === 'F_P_000677'){
		fp = 'F_P_000930';
	}else if(id === 'F_P_000031'){
		fp = 'F_P_000931';//动产
	}else if(id === 'F_P_000827'){
		fp = 'F_P_000932';//仓单
	}else if(id === 'F_P_000954'){
		fp = 'F_P_001008';
	}
	else{
		fp = 'F_P_000897';
		if(index != -1){
			path = path.substring(0, path.length-10);
		}
	}
	SCFUtils.entry(fp,firstPagePath(path));
}
//初始化左菜单
function formatLeftMenu(k){//k为2级菜单
	var animatewidth = (document.documentElement.clientWidth-1000)/2+200;
	var leftMenuDiv=parent.$('#leftMenuDiv');
	leftMenuDiv.empty();
	var div=$("<div class='sidebar-collapse'></div>").attr("style","z-index:99").attr("width","185px").appendTo(leftMenuDiv);
	var ul=$("<ul class='nav'></ul>").attr("id","main-menu").appendTo(div);
	$.each(k.children, function(i, u) {
		//判断u有没有孩子，有就加入收缩菜单，没有直接给a附上点击事件
		if(u.children.length!=0){
			var li=$("<li></li>").appendTo(ul);
			var a=$("<a><i class='fa fa-sitemap'></i>"+u.text+"<span class='fa arrow'></span></a>").attr("id","bigA"+u.id).appendTo(li);
			suitTextSpacing(u);
			var ulTwo=$("<ul class='nav nav-second-level'></ul>").appendTo(li);
			$.each(u.children, function(i, j) {
				var liTwo=$("<li style='background-color:#303030'></li>").attr("id",j.id).appendTo(ulTwo).unbind().bind('click', function() {
					SCFUtils.entry(j.id,j.path);//跳转页面，里面会将布局大小初始化一次，所以一定要在左侧隐藏动画之前调用
					$(document).scrollTop(0);//使滚动条回到顶部，即整个页面回到顶部
					$('#sideNav').addClass('closed');
					$("#bigLeftMenu").animate({'margin-left': '-'+animatewidth+'px'},"500");
//					$("#rightBody").animate({"marginLeft":"0px","width":"100%" });//$("#rightBody").delay(5000).attr("width","1000px"); 
//					$("#centerDiv").animate({"width":"100%"});
				}).hover(function(){
					$("#img"+j.id).attr("style","background:url('"+geticonUrl(j)+"') no-repeat 0 0");
				},function(){
					$("#img"+j.id).attr("style","background:url('"+geticonUrl(j)+"') no-repeat -40px 0");
				});
				var ImageDiv=$("<div class='ImageDiv'></div>");
				ImageDiv.empty();
				var jTextArry=new Array("退回处理","查询信息","查询用户","重置密码","监控信息","监控数据","删除在途");
				if(j.text.length==2){//有icon的给加上imagediv，没有不加。2个字暂时都有
					ImageDiv.attr("style","background:url('"+geticonUrl(j)+"') no-repeat -40px 0").attr("id","img"+j.id).appendTo(liTwo);
					$("<a class='colorgray'>"+j.text+"</a>").attr("id","smallA"+j.id).attr("style","letter-spacing:28px").appendTo(liTwo);
				}else if(jTextArry.indexOf(j.text)!=-1){//4个字在数组中的
					ImageDiv.attr("style","background:url('"+geticonUrl(j)+"') no-repeat -40px 0").attr("id","img"+j.id).appendTo(liTwo);
					$("<a class='colorgray'>"+j.text+"</a>").attr("id","smallA"+j.id).appendTo(liTwo);
				}else if(j.text.length==4){//4 个字，主要针对“系统设置”底下的1级菜单
					$("<a class='colorgray'>"+j.text+"</a>").attr("id","smallA"+j.id).attr("style","letter-spacing: 10px;padding-left:35px;").appendTo(liTwo);
				}else if(j.text.length>4){
					$("<a class='colorgray'>"+j.text+"</a>").attr("id","smallA"+j.id).appendTo(liTwo);
				}
//				suitSecondText(j);//下拉下统一都是两个字不需要统一间距
			});
		}
		else{
			var li=$("<li></li>").appendTo(ul).unbind().bind('click',function(){
				$(document).scrollTop(0);//使滚动条回到顶部，即整个页面回到顶部
				SCFUtils.entry(u.id,u.path);
				$('#sideNav').addClass('closed');
				$("#bigLeftMenu").animate({'margin-left': '-'+animatewidth+'px'},"500");
//				$("#rightBody").animate({"marginLeft":"0px","width":"100%" });//$("#rightBody").delay(5000).attr("width","1000px"); 
//				$("#centerDiv").animate({"width":"100%"});
			});
			var a=$("<a>"+u.text+"</a>").attr("id","bigA"+u.id).appendTo(li);
//			var a=$("<a><i class='fa fa-sitemap'></i>"+u.text+"<span class='fa arrow'></span></a>").attr("id","bigA"+u.id).appendTo(li);
			suitTextSpacing(u);
		}
		
	});
	var mainApp = {

	        initFunction: function () {
	            /*MENU 
	            ------------------------------------*/
	            $('#main-menu').metisMenu();
				
	            $(window).bind("load resize", function () {
	                if ($(this).width() < 768) {
	                    $('div.sidebar-collapse').addClass('collapse')
	                } else {
	                    $('div.sidebar-collapse').removeClass('collapse')
	                }
	            });
	        },
	    }
	mainApp.initFunction();
}

//统一做菜单不同字数的菜单字体间距
//统一有下拉菜单的文字间距
function suitTextSpacing(k){//k为一个菜单。去利用k.text.length做判断
	if(k.text.length>=8){
		$("#bigA"+k.id).attr("style","letter-spacing:0px");
		$("#bigA"+k.id).children("span").attr("style","margin-left: 16px;");
	}
	if(k.text.length==7){
		$("#bigA"+k.id).attr("style","letter-spacing:0px");
		$("#bigA"+k.id).children("span").attr("style","margin-left: 16px;");
	}
	if(k.text.length==6){
		$("#bigA"+k.id).attr("style","letter-spacing:0px");
		$("#bigA"+k.id).children("span").attr("style","margin-left: 16px;");
	}
	if(k.text.length==5){
		$("#bigA"+k.id).attr("style","letter-spacing:3px");
		$("#bigA"+k.id).children("span").attr("style","margin-left: 13px;");
	}
	if(k.text.length==3){
		$("#bigA"+k.id).attr("style","letter-spacing:12px");
		$("#bigA"+k.id).children("span").attr("style","margin-left: 17px;");
	}
	if(k.text.length==4){
		$("#bigA"+k.id).attr("style","letter-spacing:9px");
		$("#bigA"+k.id).children("span").attr("style","margin-left: 6px;");
	}
}

//统一做菜单不同字数的菜单字体间距
//统一下拉菜单底下的li中的文字间距
function suitSecondText(k){//k为一个菜单。去利用k.text.length做判断
	if(k.text.length==6){
		$("#smallA"+k.id).attr("style","letter-spacing:1px");
	}
	if(k.text.length==3){
		$("#smallA"+k.id).attr("style","letter-spacing:24px");
	}
}

//更改树形菜单的3级和4级图标
function geticonUrl(j){
	var url="";
	if(j.text=="新增"){
		url="images/menu/add_icon.png";
	}
	if(j.text=="新增用户"){
		url="images/menu/add_icon.png";
	}
	if(j.text=="增加"){
		url="images/menu/add_icon.png";
	}
	if(j.text=="修改"){
		url="images/menu/alter_icon.png";
	}
	if(j.text=="删除"){
		url="images/menu/delete_icon.png";
	}
	if(j.text=="查询"){
		url="images/menu/query_icon.png";
	}
	if(j.text=="复核"){
		url="images/menu/release_icon.png";
	}
	if(j.text=="退回处理"){
		url="images/menu/retreat_icon.png";
	}
	if(j.text=="删除在途"){
		url="images/menu/DP_icon.png";
	}
	if(j.text=="退回"){
		url="images/menu/retreat_icon.png";
	}
	if(j.text=="申请"){
		url="images/menu/pendding_icon.png";
	}
	if(j.text=="审核"){
		url="images/menu/heshen_icon.png";
	}
	if(j.text=="销账"){
		url="images/menu/cancelAccount_icon.png";
	}
	if(j.text=="取消"){
		url="images/menu/cancel_icon.png";
	}
	if(j.text=="介绍"){
		url="images/menu/alter_icon.png";
	}
	if(j.text=="查询信息"){
		url="images/menu/query_icon.png";
	}
	if(j.text=="查询用户"){
		url="images/menu/query_icon.png";
	}
	if(j.text=="处理"){
		url="images/menu/alter_icon.png";
	}
	if(j.text=="重置密码"){
		url="images/menu/alter_icon.png";
	}
	if(j.text=="监控信息"){
		url="images/menu/query_icon.png";
	}
	if(j.text=="监控数据"){
		url="images/menu/query_icon.png";
	}
	if(j.text=="测试"){
		url="images/menu/query_icon.png";
	}
	if(j.text=="解锁"){
		url="images/menu/unlocked_icon.png";
	}
	return url;
}



/**
 *非业务管理3级菜单头导航的icon 
 */
function getBlIconUrl(u){
	var url="";
	if(u.text=="业务管理"){
		url = "images/menu/businessBl.png";
	}
	if(u.text=="客户管理"){
		url = "images/menu/factorcustBl.png";
	}
	if(u.text=="协议管理"){
		url = "images/menu/cntrctBl.png";
	}
	if(u.text=="基础管理"){
		url = "images/menu/collocationBl.png";
	}
	if(u.text=="我的信息"){
		url = "images/menu/mysetBl.png";
	}
	if(u.text=="系统设置"){
		url = "images/menu/systemBl.png";
	}
	if(u.text=="参数管理"){
		url = "images/menu/paraBl.png";
	}
	if(u.text=="查询统计"){
		url = "images/menu/selectBl.png";
	}
	if(u.text=="预警提醒"){
		url = "images/menu/warningBl.png";
	}
	if(u.text=="综合查询"){
		url = "images/menu/queryBl.png";
	}
	if(u.text=="国内单笔保理" || u.text=="先票款后货" ||u.text=="动产质押融资"){
		url = "images/menu/businessBl.png";
	}
	if(u.text=="公共管理"){
		url = "images/menu/publicBl.png";
	}
	return url;
}


function displaySubMenu(li) {
	var subMenu = li.getElementsByTagName("ul")[0];
	if(subMenu!=null){
		$(subMenu).show();		
	}
}
/**
 * 增加
 */
function addNav(data) {
	var menu = $('#menu');	
	var curPage = $('<li class="curPage"></li>').appendTo(menu);
	$('<a onclick="SCFUtils.onCancelBtnClick();"'+ 
			'class="dsB">首页</a>').appendTo(curPage);	
	$.each(data, function(i, sm) {
		var navlist = $('<li class="hover">').appendTo(menu);		
		$('<a class="dsB">' + sm.text + '</a>').appendTo(navlist);
		if (sm.children && sm.children.length > 0) {
			var one = $('<ul>');
			$.each(sm.children, function(i, o) {
				one.appendTo(navlist);
				var links =$('<li>').appendTo(one);				
				$('<a class="dsB" ref="' + o.id + '" rel="'
						+ o.path + '" state="'+o.isparent+'">'+o.text+'</a>').appendTo(links);
				if(o.children&&o.children.length>0){
					var ul =$('<ul>').appendTo(links);
					
					$.each(o.children, function(i,c){
					$('<li><a class="dsB" ref="' + c.id + '" rel="'
							+ c.path + '" state="'+c.isparent+'">'+c.text+'</a></li>').appendTo(ul);
					});				
				}
				links.mouseenter(function(){
					displaySubMenu(this);
				});
			});
		}	
		navlist.mouseenter(function(){
			displaySubMenu(this);
		});	
	});		
}

/**
 * 初始化左侧,绑定点击事件。
 */
function InitLeftMenu() {
}

/**
 * new 分解path
 * 要>分解后的前两个路径
 */
function firstPagePath(businessPath,text){
	if(text == "业务管理"){
		var arr = businessPath.split(">");//arr直接为一个数组
		var path = "";
		path=arr[0] + ">" + arr[1] + ">" + "流程展示";
		return path;
	}else{
		var path = "";
		path=businessPath;
		return path;
	}
}

/**
 * 菜单左移成功之后的回调函数
 */
function ShowMsg(){
	$('#cneterDiv').delay(5000).animate({'left' : '0px'});	//控制页面的，移动，外部距离左边260px
	$("#rightBody").delay(5000).attr("style","width:1000px");
	$("#centerDiv").delay(5000).attr("style","width:1000px;margin-top:20px;");
	$("#blockAreaFooter").delay(5000).attr("style","width:1000px");
}


//初始化左菜单
function formatFirstLevelMenu(o,id,data){//k为1级菜单,id为k的id,data为所有的menu,k=“国单”
	var animatewidth = (document.documentElement.clientWidth-1000)/2+200;
	var firstLevelMenuDiv=parent.$('#firstLevelMenuDiv');
	firstLevelMenuDiv.empty();
	var div=$("<div class='sidebar-collapse'></div>").attr("style","z-index:99").attr("width","52px").appendTo(firstLevelMenuDiv);
	var ul=$("<ul class='nav'></ul>").attr("id","firstLevelMenu").appendTo(div);
	//循环写死7大类业务图标
	$.each(data,function(i,n){
		var li=$("<li class='firstLevelMenuDivLi'></li>").appendTo(ul).unbind().bind('click', function() {
//			SCFUtils.entry(j.id,j.path);//跳转页面，里面会将布局大小初始化一次，所以一定要在左侧隐藏动画之前调用
			//刷新左侧一级菜单
			formatFirstLevelMenu(n,n.id,data);
			/*
			 * 刷新左侧业务菜单；1 业务管理类---->直接进国内单笔保理的流程图  2 非业务管理类
			 */
			if(n.text=="业务管理"){
				getFlowChart(n.id==='MENU000607'?pageId:n.id, n.id==='MENU000607'?pathValue:n.children[0].path);
				//SCFUtils.entry("F_P_000726",firstPagePath(n.children[0].path,n.text));
				var index = 0;
				if(n.id === 'MENU000607'){
					$.each(n.children,function(i,v){
						if(v.path == pathValue.substring(0,pathValue.lastIndexOf('>')-1)){
							index = i;
						}
					});
				}
				formatLeftMenu(n.children[index]);
				
				
			}else{
				getFlowChart(n.children[0].children[0]==undefined?"":n.children[0].children[0].id, n.children[0].path);
				//SCFUtils.entry("F_P_000726",firstPagePath(n.path),n.text);
				formatLeftMenu(n);
			}
			
		}).hover(function(){
			$("#firImg"+n.id).attr("src",getFirstLevelIconWhite(n));
		},function(){
			if($("#firLev"+n.id).parent().attr("style")=="background-color:#014295"){
				return;
			}
			$("#firImg"+n.id).attr("src",getFirstLevelIconGray(n));
		});
		var a=$("<a><img src='"+getFirstLevelIconGray(n)+"' id='firImg"+n.id+"' style='margin:40% 22% 30% 24%;'/></a>").attr("id","firLev"+n.id).attr("style","padding:0").appendTo(li);
		//根据id定位
		if(n.id==id){
			//li变蓝色，img变白色
			$("#firLev"+n.id).parent().attr("style","background-color:#014295");
			$("#firImg"+n.id).attr("src",getFirstLevelIconWhite(n));
		}
	});
}

/**
 *1级菜单头导航的icon Gray
 */
function getFirstLevelIconGray(u){
	var url="";
	if(u.text=="业务管理"){
		url = "images/menu/businessBl_gray.png";
	}
	if(u.text=="客户管理"){
		url = "images/menu/factorcustBl_gray.png";
	}
	if(u.text=="协议管理"){
		url = "images/menu/cntrctBl_gray.png";
	}
	if(u.text=="基础管理"){
		url = "images/menu/collocationBl_gray.png";
	}
	if(u.text=="我的信息"){
		url = "images/menu/mysetBl_gray.png";
	}
	if(u.text=="系统设置"){
		url = "images/menu/systemBl_gray.png";
	}
	if(u.text=="参数管理"){
		url = "images/menu/paraBl_gray.png";
	}
	if(u.text=="综合查询"){
		url = "images/menu/queryBl_gray.png";
	}
	if(u.text=="国内单笔保理" || u.text=="先票款后货" ||u.text=="动产质押融资"){
		url = "images/menu/businessBl_gray.png";
	}
	if(u.text=="公共管理"){
		url = "images/menu/publicBl_gray.png";
	}
	if(u.text=="产品维护"){
		url = "images/menu/promaint_gray.png";
	}
	return url;
}

/**
 *1级菜单头导航的icon White
 */
function getFirstLevelIconWhite(u){
	var url="";
	if(u.text=="业务管理"){
		url = "images/menu/businessBl_white.png";
	}
	if(u.text=="客户管理"){
		url = "images/menu/factorcustBl_white.png";
	}
	if(u.text=="协议管理"){
		url = "images/menu/cntrctBl_white.png";
	}
	if(u.text=="基础管理"){
		url = "images/menu/collocationBl_white.png";
	}
	if(u.text=="我的信息"){
		url = "images/menu/mysetBl_white.png";
	}
	if(u.text=="系统设置"){
		url = "images/menu/systemBl_white.png";
	}
	if(u.text=="参数管理"){
		url = "images/menu/paraBl_white.png";
	}
	if(u.text=="综合查询"){
		url = "images/menu/queryBl_white.png";
	}
	if(u.text=="国内单笔保理" || u.text=="先票款后货" ||u.text=="动产质押融资"){
		url = "images/menu/businessBl_white.png";
	}
	if(u.text=="公共管理"){
		url = "images/menu/publicBl_white.png";
	}
	if(u.text=="产品维护"){
		url = "images/menu/promaint_white.png";
	}
	return url;
}


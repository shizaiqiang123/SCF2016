$(function() {
	initMenu();	
});

function initMenu() {
	var options = {
		url : SCFUtils.AJAXURL,
		async : true,
		data : {
			queryId : 'Q_S_MENU_0001',
			reqLoginType:'noLogin'
		},
		callBackFun : function(data) {
			if (data.success&&!SCFUtils.isEmpty(data.rows)) {
				addNav(data.rows);
				InitLeftMenu();				
			}
		}
	};
	SCFUtils.ajax(options);
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
	if (/MSIE ([678])/.test( navigator.userAgent)){
		$('li').has('ul').mouseover(function(){
			$(this).children('ul').css('visibility','visible');
			}).mouseout(function(){
			$(this).children('ul').css('visibility','hidden');
		});
	}

	/* Mobile */
	$('#menu-wrap').prepend('<div id="menu-trigger">菜单</div>');
	$("#menu-trigger").on('click', function(){
		$("#menu").slideToggle();
	});
	
	// iPad
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
	if (isiPad) $('#menu ul').addClass('no-transition');

	
	$('a.dsB').unbind().bind('click', function() {
		var path = $(this).attr("rel");
		var menuid = $(this).attr("ref");
		var isParent = $(this).attr("state");
		var reqLoginType = "noLogin";		
		if (isParent === "N") {	
			$('#menu li ul').hide();
			SCFUtils.entry(menuid, path,reqLoginType);
		}
	}).hover(function() {
		$(this).addClass("hover");		
	}, function() {
		$(this).removeClass("hover");
	});;
}
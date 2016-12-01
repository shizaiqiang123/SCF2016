$(function() {
	initMenu();	
});

function initMenu() {
	var options = {
		url : SCFUtils.AJAXURL,
		//async : true,
		data : {
			queryId : 'Q_S_MENU_0001'
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
		subMenu.style.display = "block";
		if($(li).offset().left<($(this).outerWidth()-400)){//如果在最右边，则子菜单在左边。
			$('#navigation li ul li ul').addClass('ulL');
			$('#navigation li ul li ul').removeClass('ulR');
			
		}else{
			$('#navigation li ul li ul').addClass('ulR');
			$('#navigation li ul li ul').removeClass('ulL');
		}
	}
}
function hideSubMenu(li) {
	var subMenu = li.getElementsByTagName("ul")[0];
	if(subMenu!=null){
		subMenu.style.display = "none";
	}
}

/**
 * 增加
 */
function addNav(data) {
	var wrapMain = $('#navigation');
	
	var curPage = $('<li class="fL navList curPage"></li>').appendTo(wrapMain);
	$('<a onclick="SCFUtils.onCancelBtnClick();"'+ 
			'class="navigationAnchor dsB white">首页</a>').appendTo(curPage);
	
	$.each(data, function(i, sm) {
		var navlist = $('<li class="fL navList hover">').appendTo(wrapMain);
		//attrMouse(navlist);
		$('<a >' + sm.text + '</a>').appendTo(navlist);
		if (sm.children && sm.children.length > 0) {
			var one = $('<ul>');
			$.each(sm.children, function(i, o) {
				one.appendTo(navlist);
				var links =$('<li class="fL navList">').appendTo(one);
				//attrMouse(links);
				$('<a class="dsB" ref="' + o.id + '" rel="'
						+ o.path + '" state="'+o.isparent+'">'+o.text+'</a>').appendTo(links);
				if(o.children&&o.children.length>0){
					var ul =$('<ul>').appendTo(links);
					
					$.each(o.children, function(i,c){
					$('<li class="fL navList"><a class="dsB" ref="' + c.id + '" rel="'
							+ c.path + '" state="'+c.isparent+'">'+c.text+'</a></li>').appendTo(ul);
					});				
				}
				links.mouseenter(function(){
					displaySubMenu(this);
				}).mouseleave(function(){
					hideSubMenu(this);
				});
			});
		}
		navlist.mouseenter(function(){
			displaySubMenu(this);
		}).mouseleave(function(){
			hideSubMenu(this);
		});		
	});		
}

/*function attrMouse(li){
	li.attr('onmouseover','displaySubMenu(this)');
	li.attr('onmouseout','hideSubMenu(this)');
}*/


/**
 * 初始化左侧,绑定点击事件。
 */
function InitLeftMenu() {
	$('a.dsB').unbind().bind('click', function() {
		var path = $(this).attr("rel");
		var menuid = $(this).attr("ref");
		var isParent = $(this).attr("state");
		if (isParent === "N") {
			$('#navigation li ul').css({
				'display' : 'none'
			});
			SCFUtils.entry(menuid, path);
		}
	}).hover(function() {
		$(this).addClass("hover");		
	}, function() {
		$(this).removeClass("hover");
	});
}
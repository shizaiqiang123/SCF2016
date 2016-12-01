$(function(){	
	//products切换
	$(".J_item").hover(function(){
		$(this).siblings().stop(false,true);
		$(this).stop(false,true);
		$(this).siblings().removeClass("on", 300 );
        $(this).addClass("on", 300 );
    });	
    
    //初始化二级菜单位置
    var l=$(".nav li").length;
    $(".nav li").each(function(){
        var w=$(this).width()-50;
        var i=$(this).index();
        var l=$(this).position().left+120;;
        $(".subnav_con ul").eq(i).css("width",w+"px");
        $(".subnav_con ul").eq(i).css("left",l+"px");
    });
    //二级菜单显示/隐藏
    $(".nav li").each(function(){
        var a=$(this);//一级导航
        var i=a.index();//获取一级导航的位置
        var ul=$(".subnav_con ul");
        var con=$(".subnav_con");
        a.find("a").hover(function(){
            //判断相对的二级导航的display：none？block
            var d=ul.eq(i).css("display");
            if(d=="none"){//二级导航隐藏的时候
                q=setTimeout(function(){//延迟事件
                    var t=ul.eq(i).find("li").text();//判断二级导航的内容
                    if(t!=''){//如果二级导航不为空
                        ul.eq(i).stop(true).show();//二级导航内容显示
                        var ch=ul.eq(i).height()+30;//获取二级导航内容高度
                        con.stop(true).animate({height: ch+'px'},300);//给二级导航容器赋值高度
                    }
                }, 100); 
            }else{
                clearTimeout(w);//二级导航显示状态，清除延迟执行事件w
            }
        },function(){
            clearTimeout(q);//鼠标离开一级导航时，清除延迟事件q
            e=setTimeout(function(){
                ul.stop(true).hide();
                con.stop(true).animate({height: '0'});
            }, 10); 
        });
        ul.eq(i).hover(function(){
            clearTimeout(e);
        },function(){
            w=setTimeout(function(){
                con.stop(true).animate({height: '0'},300);
                ul.stop(true).hide();
            }, 10); 
        });
    });

    //.span标签增加点击事件
    $("span").unbind().bind('click', function() {
    	window.location.href='/SCFWeb/main.jsp?reqLoginType=noLogin';
    });

});

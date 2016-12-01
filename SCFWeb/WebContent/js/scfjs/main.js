$(function() {
	layer.config({
		extend: 'extend/layer.ext.js' //注意，目录是相对layer.js根目录。如果加载多个，则 [a.js, b.js, …]
		//shift: 1, //默认动画风格
		//skin: 'layui-layer-molv' //默认皮肤
	});
	
	/*if(/MSIE ([678])/.test( navigator.userAgent)){//IE 6789
		SCFUtils.loadJs('js/plugin/jquery/IE9.js',function(){
		});		
	}*/
	
	//加载上一步下一步按钮
	$.showGo();
	
	// 禁止退格键 作用于Firefox、Opera
	document.onkeypress = banBackSpace;
	// 禁止退格键 作用于IE、Chrome
	document.onkeydown = banBackSpace;
	SCFUtils.goLogin();	
});


function loginReg(){	
	SCFUtils.entry("F_P_000346","","noLogin");	
}

function findPass(){	
	SCFUtils.entry("F_P_000312","","noLogin");	
}
/**
* 加载iframe时自适应内容。
*/
function iFrameHeight() {	
	var ifm= document.getElementById("iframepage");   
	if(document.frames){
		resizable(ifm,document.frames["iframepage"].document);
	}else{
		resizable(ifm,ifm.contentDocument);
	}	
	setTimeout("iFrameHeight()", 10);	
}

function resizable(ifm,subWeb){
	if(ifm != null && subWeb != null && subWeb.body != null ) {		
		if(/MSIE ([678])/.test( navigator.userAgent)){ //IE 678
			ifm.height = subWeb.body.scrollHeight;
		}else{
			ifm.height =subWeb.body.offsetHeight;				
		}	
	}
}

// 处理键盘事件禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e) {

	var ev = e || window.event;// 获取event对象
	var obj = ev.target || ev.srcElement;// 获取事件源
	var t = obj.type || obj.getAttribute('type');// 获取事件源类型

	// 获取作为判断条件的事件类型
	var vReadOnly = obj.readOnly;
	var vDisabled = obj.disabled;

	// 处理undefined值情况
	vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	vDisabled = (vDisabled == undefined) ? true : vDisabled;

	// 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	// 并且readOnly属性为true或disabled属性为true的，则退格键失效
	var flag1 = ev.keyCode == 8
			&& (t == "password" || t == "text" || t == "textarea")
			&& (vReadOnly == true || vDisabled == true);

	// 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2 = ev.keyCode == 8 && t != "password" && t != "text"
			&& t != "textarea";

	// 判断
	if (flag2 || flag1) {
		return false;
	}
}
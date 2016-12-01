//$(function() {
//	layer.config({
//		extend: 'extend/layer.ext.js' //注意，目录是相对layer.js根目录。如果加载多个，则 [a.js, b.js, …]
//		//shift: 1, //默认动画风格
//		//skin: 'layui-layer-molv' //默认皮肤
//	});
//	
//	/*if(/MSIE ([678])/.test( navigator.userAgent)){//IE 678
//		SCFUtils.loadJs('js/plugin/jquery/IE9.js',function(){			
//		});		
//	}*/
//	resize();//调整页面高度	
////	createDom();//创建DOM
////	initFullPage();//初始化fullpage
//	parent.document.getElementById('blockAreaFooter').style.display = "none";
//});

$(function() {
	layer.config({
		extend: 'extend/layer.ext.js' //注意，目录是相对layer.js根目录。如果加载多个，则 [a.js, b.js, …]
	});
	resize();//调整页面高度	
	parent.document.getElementById('blockAreaFooter').style.display = "none";
	var broswer = SCFUtils.getBrowserType();
	
	if('IE'=== broswer&&parseInt(SCFUtils.getBrowserVersion())<11){
		//具体措施由客户决定。
		alert('系统检测到您使用的浏览器版本较低，为了达到更好的使用体验，建议您更换高版本浏览器。');
	}
});


function resize(){
	if(/MSIE ([678])/.test( navigator.userAgent)){		
		$('#iframepage',parent.document).height(540);
	}else{
		$('#iframepage',parent.document).height($(window,parent.document)[0].outerHeight-210);
	}
	$('#centerDiv',parent.document).css({
		'width':'100%',
		'padding-bottom':'0px'
	});
}

function enterKey(e) {
	var uid = $('#userId');
	var pwd = $('#password');
	if (e.keyCode === 13) {
		if (uid.val() === '') {
			uid.focus();
			return;
		}
		if (pwd.val() === '') {
			pwd.focus();
			return;
		}

		login();
	}
}

function login() {	
	var userId = $('#userId').val();
	if (SCFUtils.isEmpty(userId)) {
		SCFUtils.error('必须输入用户名');
	} else if($(".loginIden").css('display') == 'block' &&SCFUtils.isEmpty($('#code').val())){
		SCFUtils.error('请输入验证码');
	} else {
		if (document.getElementById("remember").checked == true) {
			var date = new Date();  
	        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); //七天后的这个时候过期  
	        $.cookie("vp_userId", userId, { path: '/SCFWeb/', expires: date});		
		}else{
			$.cookie("vp_userId", null,{ expires: -1 });//删除cookie
		}
		var data = SCFUtils.convertArray('loginForm');	
		data.password = hex_md5(data.password);
		var options = {
			url : 'login',
			data : $.extend({
				sysFuncId : 'F_S_login',
				reqPageType : 'login'
			}, data),
			callBackFun : function(data) {				
				if (data.success) {
					var firstLanding = data.obj.firstLanding;
					if (firstLanding=='true') {
//						SCFUtils.loadForm('loginForm', data);
						UpdatePassword(data);
					} else {
						parent.window.location = SCFUtils.ROOTURL + "/"
								+ data.pageInfo.url;
					}
				}
			},
			errorCallback:function(data){
				$(".loginIden").css({
					'display' : 'block'
				});
				$('#imgCode').attr('src','code.jpg?'+$.now());
			}
		};
		SCFUtils.ajax(options);
	}
}
function UpdatePassword(data){
	var row = {};
	row.op ='edit';
//	row.data = data;
	var options = {
		reqid : 'I_P_000062',
		title:'重置密码',
		showMask:false,
		width:'85%',
		height:'90%',
		data : {
			'row' : row,
			cacheType :'non' 
		},
		onSuccess : editPwdSuccess
	};
	SCFUtils.getData(options);
}

function editPwdSuccess(data){
	$('#password').val(null);
}
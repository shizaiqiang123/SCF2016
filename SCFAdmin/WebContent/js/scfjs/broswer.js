(function(jQuery){  

if(jQuery.browser) return;  

jQuery.browser = {};  
jQuery.browser.info;
jQuery.browser.type;
jQuery.browser.mozilla = false;  
jQuery.browser.safari = false;  
jQuery.browser.opera = false;  
jQuery.browser.msie = false;  
jQuery.browser.chrome = false;  

jQuery.browser = {};
//var ua = navigator.userAgent.toLowerCase();
//
//(jQuery.browser.version = ua.match(/msie ([\d.]+)/)) ? jQuery.browser.msie = jQuery.browser.version[1] :
//(jQuery.browser.version = ua.match(/firefox\/([\d.]+)/)) ? jQuery.browser.mozilla = jQuery.browser.version[1] :
//(jQuery.browser.version = ua.match(/chrome\/([\d.]+)/)) ? jQuery.browser.chrome = jQuery.browser.version[1] :
//(jQuery.browser.version = ua.match(/opera. ([\d.]+)/)) ? jQuery.browser.opera = jQuery.browser.version[1] :
//(jQuery.browser.version = ua.match(/version ([\d.]+).*safari/)) ? jQuery.browser.safari = jQuery.browser.version[1] : 0;

//var ua = navigator.userAgent.toLowerCase();
//if (window.ActiveXObject&&(jQuery.browser.info = ua.match(/msie ([\d.]+)/))){
//	jQuery.browser.type = jQuery.browser.info[0];
//	jQuery.browser.version = jQuery.browser.info[1];
//}else if (document.getBoxObjectFor||(jQuery.browser.info = ua.match(/firefox\/([\d.]+)/))){
//	jQuery.browser.type = jQuery.browser.info[0];
//	jQuery.browser.version = jQuery.browser.info[1];
//}else if (window.MessageEvent && !document.getBoxObjectFor&&(jQuery.browser.info = ua.match(/chrome\/([\d.]+)/))){
//	jQuery.browser.type = jQuery.browser.info[0];
//	jQuery.browser.version = jQuery.browser.info[1];
//}else if (window.opera&&(jQuery.browser.info = ua.match(/opera.([\d.]+)/))){
//	jQuery.browser.type = jQuery.browser.info[0];
//	jQuery.browser.version = jQuery.browser.info[1];
//}   
//else if (window.openDatabase&&(jQuery.browser.info = ua.match(/version\/([\d.]+)/))){
//	jQuery.browser.type = jQuery.browser.info[0];
//	jQuery.browser.version = jQuery.browser.info[1];
//}else{
//	jQuery.browser.type = 'unknowed';
//	jQuery.browser.version = '0.0';
//}

var userAgent = navigator.userAgent;
var rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
var rFirefox = /(firefox)\/([\w.]+)/;
var rOpera = /(opera).+version\/([\w.]+)/;
var rChrome = /(chrome)\/([\w.]+)/;
var rAndroid = /(android)\/([\w.]+)/;
var rSafari = /version\/([\w.]+).*(safari)/;
var browser;
var version;
function uaMatch(ua) {
	var match = rMsie.exec(ua);
	if (match != null) {
		return { browser : "IE", version : match[2] || "0" };
	}
	var match = rFirefox.exec(ua);
	if (match != null) {
		return { browser : match[1] || "", version : match[2] || "0" };
	}
	var match = rOpera.exec(ua);
	if (match != null) {
		return { browser : match[1] || "", version : match[2] || "0" };
	}
	var match = rChrome.exec(ua);
	if (match != null) {
		return { browser : match[1] || "", version : match[2] || "0" };
	}
	var match = rSafari.exec(ua);
	if (match != null) {
		return { browser : match[2] || "", version : match[1] || "0" };
	}
	var match = rAndroid.exec(ua);
	if (match != null) {
		return { browser : match[2] || "", version : match[1] || "0" };
	}
	return { browser : "", version : "0" };
}
var browserMatch = uaMatch(userAgent.toLowerCase());
if (browserMatch.browser) {
	jQuery.browser.type = browserMatch.browser;
	jQuery.browser.version = browserMatch.version;
}

})(jQuery);
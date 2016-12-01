(function() {

    var scripts = document.getElementsByTagName('script'),
        test, path, i, ln, scriptSrc, match;
    path = "";
    for (i = 0, ln = scripts.length; i < ln; i++) {
        scriptSrc = scripts[i].src;

        match = scriptSrc.match(/bootstrap\.js$/);

        if (match) {
            path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
            break;
        }
    }
    //加载mxGraph对象
  	var expname = "";
    var check = function(regex){
      	return regex.test(navigator.userAgent.toLowerCase());
    };
    if(check(/\bchrome\b/))
    {
    	expname = "chrome";
    }
    else if(check(/firefox/))
    {
    	expname = "firefox";
    }
    else
    {
    	expname = "ie";
    }
   	document.write('<script type="text/javascript" src="' + path + 'mxClient-1.7.1.5_' + expname + '.gzjs"></script>');

})();


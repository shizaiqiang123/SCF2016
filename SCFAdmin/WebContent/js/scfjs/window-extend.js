(function(){
    xe = window.xe || {};
    xe.load = {
        includePath:'',
    	filesAdded : {},        
        loadScript : function(file){        				
			var files = typeof file == "string" ? [file] : file;
			for (var i = 0; i < files.length; i++) {
				var name = files[i].replace(/^\s|\s$/g, "");
				if(this.filesAdded[name]){
					return 0;
				}
				var att = name.split('.');
				var ext = att[att.length - 1].toLowerCase();
				var isCSS = ext == "css";
				if(isCSS){
					var link = document.createElement('link');
		            link.type = 'text/css';
		            link.rel = 'stylesheet';
		            link.href = $.includePath + name;
		            this.filesAdded[name] = true;
		            document.getElementsByTagName('head')[0].appendChild(link);
				}else{
					var script = document.createElement('script');
		            script.type = 'text/javascript';
		            script.src = $.includePath + name;
		            this.filesAdded[name] = true;
		            document.getElementsByTagName('head')[0].appendChild(script);
				}				
			}        		
        }
      };
})();
 function SearchCimCust(){
	 debugger;
	 var FormData = SCFUtils.convertArray('searchForm');
	 var options = {
//				async:true,
				title:'报表查询',
				reqid:'I_S_000007',
				data:{cacheType:'non',queryType:'PREVIEW',id:'R_TEST_00011',FormData:FormData},
				onSuccess:loadReport
			};
		SCFUtils.getData(options);
 }
 
 function loadReport(data){
	 alert("111");
	 var result = document.getElementById("result"); 
	 if(typeof FileReader==='undefined'){ 
	     result.innerHTML = "抱歉，你的浏览器不支持 FileReader"; 
	     input.setAttribute('disabled','disabled'); 
	 }else{ 
		 readFile(data); 
//		 previewFile(data);
	 } 
 }
 
 

 function previewFile(data) {
	var preview = document.querySelector('img');
//	var file = document.querySelector('input[type=file]').files[0];
	var file = data;
	var reader = new FileReader();
	reader.onloadend = function() {
		preview.src = reader.result;
	}
	if (file) {
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
}
 
 function readFile(data){ 
	    var file = data
//	    if(!/image\/\w+/.test(file.type)){ 
//	        alert("文件必须为图片！"); 
//	        return false; 
//	    } 
	    $('#asd').attr('src',file);
//	    var reader = new FileReader(); 
//	    reader.readAsDataURL(file); 
//	    reader.onload = function(e){ 
//	        result.innerHTML = '<img src="'+this.result+'" alt=""/>' 
//	    } 
	} 
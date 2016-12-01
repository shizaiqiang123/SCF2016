<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
</head>
<body>
<div id="centerTab" fit="true" border="false">
	 <div style="padding:20px;overflow:hidden;" id="firstTab">
	 	<div id="lookupDiv" class="easyui-lookup"></div>	                
	 </div>
	 <table style="width:100%;border:0" id="toolBarTable">	            	
</table>							        	 
</div> 
<table>
	<label>系统交易日</label>
	<input type="text" class="easyui-validatebox combo" value="${sysDate}" disabled="disabled"/>
	<label>用户名</label>
	<input type="text" class="easyui-validatebox combo"  value="${userName}" disabled="disabled"/>
	<label>网点</label>
	<input type="text" class="easyui-validatebox combo" value="${bid}" disabled="disabled"/>
	<label>sysFuncId</label>
	<input type="text" class="easyui-validatebox combo" value="${sysFuncId}" disabled="disabled"/>
	
</table>
</body>
</html>
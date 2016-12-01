<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>筛选页面</title>
<script type="text/javascript" src="js/scfjs/Formater.js"></script>
<script type="text/javascript" src="script/loan/loanHistory.js"></script>
</head>
<body>
	<div class="divGrid">
		<form id="ScreenUserForm">
<!-- 		<div id="screenDiv"  style="height:50px;border:0px solid;text-align:left;padding-top:20px;"> -->
<!-- 			<label>系统编号：</label>  -->
<%-- 			<input type="text" class="combo" name="sysRefNo" id="sysRefNo" value="${sysFuncInfo.sysRefNo}"></input> --%>
<!-- 		</div> -->
				
		<table id="ScreenHistory" title="融资历程列表" 
				cellspacing="0" cellpadding="0" width="100%" iconCls="icon-edit">
		</table>							
		</form>	
	</div>
</body>
</html>
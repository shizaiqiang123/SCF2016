<%@ page language="java" contentType="text/html; charset=UTF-8" import="java.util.*" 
    pageEncoding="UTF-8"%>
<%@ include file="../jsp/js_cs.jsp"%> 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%-- <script type="text/javascript" src="<%=basePath%>script/sys/*.js"></script> --%>
<script   language="javascript">  
function pageOnLoad(data){
	debugger;
	SCFUtils.loadForm('mainForm',data.obj.doname2);
}
function onPrevBtnClick(){
	debugger;
	return SCFUtils.convertArray('mainForm');
}
</script>  

  <body >  
  <form id = 'mainForm'>
  <font   color=#000000>
  <b>来自：</b>
  <br>请输入您所在国家的具体地方。此项可选<br>
  <br>  
  省份   <select   id="province"   onChange = "select()"></select>　城市   <select   id="city"   onChange   =   "select()"></select><br>  
  我在   <input   type=text   name="newlocation"   maxlength=12   size=12   style="font-weight:   bold">　不能超过12个字符（6个汉字）  
  </form> 
  </html>
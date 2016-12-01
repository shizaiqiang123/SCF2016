<%-- <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="GBK"%>
<%@ page import="javax.servlet.ServletContext"%>
<%@ page import="org.mule.api.MuleContext"%>
<%@ page import="org.mule.api.config.MuleProperties"%>
<%@ page import="java.util.Collection"%>
<%@ page import="org.mule.api.construct.FlowConstruct"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Mule Manager Console</title>
<script type="text/javascript">
function onSubmit(source){
	var subForm = document.getElementById("services");
	var _trx_type = document.getElementsByName("_trx_type")[0];
	_trx_type.value = source.name;
	subForm.submit();
}
</script>
</head>
<h1>Mule Manager</h1>
<%
/* ServletContext context = request.getServletContext();
MuleContext muleContext = (MuleContext) context.getAttribute(MuleProperties.MULE_CONTEXT_PROPERTY);
String retMsg = "";
if (muleContext == null) {
	retMsg = "Mule framework doesn't start.";
}

retMsg += muleContext.isStarted() ? "Running" : "Stoped";
Collection<FlowConstruct> flowList = muleContext.getRegistry().lookupFlowConstructs();
String process = (String)request.getAttribute("process"); */
%>
<body>
<div > 
<p >Current Mule Manager running status is :</p>
<p style="color:#FF0000"><%= retMsg%></p>
</div>

<div >
<p >Current Mule Manager services are :</p>
<form id="services" target="_self" action="console">
<input name="_trx_type" type="hidden" value="">
<table width="527" border="1">
  <tr>
    <td width="30">Number</td>
    <td width="300">Service Name</td>
    <td width="81">Status</td>
	<td width="88">Operator</td>
  </tr>
  <%
int i=0;
for (FlowConstruct flow :flowList){
i++;
	%>
	<tr>
		<td><p><%= i%>.</p></td>
		<td><p style="color:#FF0000"> <%= flow.getName() %></p></td>
		<td><p style="color:#FF0000"> <%= flow.getLifecycleState().isStarted()?"Running":"Stoped" %></p></td>
		<td><input name="pause" type="button" value="ÔÝÍ£" onClick="onSubmit(this)"><input name="start" type="button" value="Æô¶¯" onClick="onSubmit(this)"></td>
	</tr>
	<%
}
if(process!=null){
	%>
	<tr>
    <td colspan="4" align="center"><p>Process result:</p><p style="color:#FF0000"> <%=process%></p></td>
 	 </tr>
	<%
}
%>

<tr>
    <td colspan="2" align="center"><input name="op_pause" type="button" value="ÔÝÍ£Mule" onClick="onSubmit(this)"></td>
    <td colspan="2" align="center"><input name="op_start" type="button" value="Æô¶¯Mule" onClick="onSubmit(this)"></td>
  </tr>
</table>

</form>
</div>
</body>
</html> --%>
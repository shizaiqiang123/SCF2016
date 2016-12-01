<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript" src="script/cntrct/CntrctSbr.js"></script>
<title>关联信息</title>
</head>
<body>
<form id="CntrctSbrForm">
<div id="CntrctSbrDiv">
	<table id="CntrctSbrTable" cellspacing="0" cellpadding="0"
				width="100%" iconCls="icon-edit">
	</table>
	<div id="toolbar" style="overflow:hidden;">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="icon-add" onclick="addRow()"
            plain="true" style="float:right;margin-right:14px;">添加</a> 
            <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="icon-edit"
                onclick="editRow()" plain="true" style="float:right;">修改</a> 
                <a href="javascript:void(0)" class="easyui-linkbutton"
                    iconcls="icon-remove"   onclick="deleteRow()" plain="true" style="float:right;">删除</a>
    </div>
</div>
<div>
<input type="hidden" id="cntrctSbrNo"  name="cntrctSbrNo"/>
</div>
</form>
</body>
</html>
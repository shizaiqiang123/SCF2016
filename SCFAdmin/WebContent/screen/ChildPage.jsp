<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增用户页面</title>
<script type="text/javascript" src="script/test/lookUp1.js"></script>
<script type="text/javascript">
function pageLoad(win) {
	debugger;
	var row = win.getData("row");
	if (row) {
		$('#sysRefNo').val(row.sysRefNo);
		$('#selId').val(row.selId);
		$('#buyerId').val(row.buyerId);
		$('#loanId').val(row.loanId);
	}

	var options = {};
	options.data = {
			refName : 'SubRef',
			refField :'sysRefNo',
			cacheType:'non'
	};
	options.force = true;
	if(row.sysNextOp==='add'){
		SCFUtils.getRefNo(options);
	}
}

function doSave(win) {
	var data = SCFUtils.convertArray('testForm');
	var target = win.getData('callback');
	target(data);
	win.close();
}

</script>
</head>
<body>
<form id="testForm">
<div id="testDiv">
	<table class="utTab">
			<tr>
    			<td>sysRefNo:</td>
    			<td><input type="text"  name="sysRefNo"  id="sysRefNo"></td>
    			<td>selId:</td>
    			<td><input type="text"  name="selId"  id="selId" ></td>
    		</tr>
    		<tr>
    			<td>buyerId:</td>
    			<td><input type="text"  name="buyerId"  id="buyerId"></td>
    			<td>loanId:</td>
    			<td><input type="text"  name="loanId"  id="loanId" ></td>
    		</tr>
	</table>
</div>
</form>
</body>
</html>
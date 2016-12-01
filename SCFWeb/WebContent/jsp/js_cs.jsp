<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/HtmlFldTag" prefix="SCFFIELD"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
%>
<base href="<%=basePath%>" />

<script src="js/scfjs/json2.js" type="text/javascript"></script>

<link href="js/plugin/easyUI/themes/default/easyui.css" rel="stylesheet"
	type="text/css" />
<link href="js/plugin/easyUI/themes/icon.css" rel="stylesheet"
	type="text/css" />
<link href="css/ut.css" rel="stylesheet" type="text/css" />
<script src="js/scfjs/json2.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.min.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.easyui.min.js"	type="text/javascript"></script>
<script src="js/plugin/easyUI/locale/easyui-lang-zh_CN.js"
	type="text/javascript"></script>	
<script src="js/plugin/easyUI/jquery.easyui.window.extend.js"
    type="text/javascript"></script>
    
<script src="javascript/layer/layer.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/jquery.easyui.extend.scf.js"
	type="text/javascript"></script>
	
<script src="js/plugin/My97DatePicker/WdatePicker.js"
	type="text/javascript"></script>
<script src="js/plugin/jquery/jquery.json.js" type="text/javascript"></script>
<script src="js/scfjs/broswer.js" type="text/javascript"></script>
<script src="js/scfjs/SCFUtils.js" type="text/javascript"></script>
<script src="js/plugin/easyUI/src/ajaxfileupload.js" type="text/javascript"></script>
<link rel="stylesheet" href="css/zybl/blCss.css" />
	
<input type="hidden" value="${sysPageInfo.pageType}" id="OPTSTATUS" />
<input type="hidden" value="${sysFuncInfo.sysFuncId}" id="FUNCTIONID">
<input type="hidden" value="${sysFuncInfo.funcType}" id="FUNCTYPE" />
<input type="hidden" value="${sysPageInfo.index}" id="CURRENTPAGE" />
<input type="hidden" value="${sysPageInfo.total}" id="TOTALPAGE" />
<input type="hidden" value="${reqPageType}" id="REQPAGETYPE" />
<input type="hidden" value="${entryType}" id="ENTRYTYPE" />
<input type="hidden" value="${sysUserInfo.sysBusiUnit}" id="SYSBUSIUNIT" />
<input type="hidden" value="${sysUserInfo.userRefNo}" id="SYSUSERREF" />
<input type="hidden" value="${sysUserInfo.sysDate}" id="SYSBUSIDATA" />
<input type="hidden" value="${sysUserInfo.custId}" id="custId" />
<input type="hidden" value="${sysUserInfo.userGrade}" id="userGrade" />
<script type="text/javascript" src="js/js_cs.js"></script>
<SCFFIELD:SCRIPT></SCFFIELD:SCRIPT>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="js_cs_nologin.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>注册新用户汇总页面</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script src="js/regResult.js" type="text/javascript"></script>
</head>
<body class="UTSCF" style="width: 100%; margin: 0 auto">
	<form id="regForm">		
		<div id="regist">
			<div style="text-align: right;font-size: 16px;font-weight: 700;">				
				<span>注册编号：</span><label id="lsysRefNo" name="lsysRefNo"></label> 
				<input type="hidden" name="sysRefNo" id="sysRefNo" />
				<input type="text" name="acRefNo" id="acRefNo" />
			</div>
			<div style="width: 100%" class="easyui-panel form" title="注册信息"
				data-options="collapsible:true">
				<div class="item">
					<span class="label">注册用户名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="userId"
							id="userId" required="true" data-options="validType:['idno','minLength[4]','maxLength[20]'],missingMessage:'4-20位字符,请输入英文或数字。'"></input>
							<input type="hidden" name="sysEventTimes" id="sysEventTimes" />
							<input type="hidden" id="userTp" name="userTp" value="5" />
							<input type="hidden" id="pwdTp" name="pwdTp" value="0" />
					</div>
				</div>
				<div class="item">
					<span class="label">营业执照：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="licenceNo" id="licenceNo" required="true"
							data-options="validType:['noChinese','maxLength[32]']" />
					</div>
				</div>
				<!-- <div class="item">
					<span class="label">组织机构代码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="custInstCd" id="custInstCd" required="true"							
							data-options="validType:['noChinese','maxLength[10]']" />
					</div>
				</div> -->
				<div class="item">
					<span class="label">法定代表人：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							required="true" data-options="validType:'maxLength[35]'"
							name="legalRepNm" id="legalRepNm" />
					</div>
				</div>
				<div class="item">
					<span class="label">法人手机号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							required="true" data-options="validType:'mobile'"
							name="legalMobPhone" id="legalMobPhone" />
					</div>
				</div>
				<div class="item">
					<span class="label">公司名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="custNm"
							id="custNm" required="true"
							data-options="validType:'maxLength[200]'" />
					</div>
				</div>
				<div class="item">
					<span class="label">地址：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="regAddr"
							id="regAddr" required="true"
							data-options="validType:'maxLength[200]',multiline:true" />
					</div>
				</div>
				<div class="item">
					<span class="label">备注：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							data-options="validType:'maxLength[300]',multiline:true"
							name="remark" id="remark" />
					</div>
				</div>
			</div>
			<div id="managerDiv" style="width: 100%" class="easyui-panel form"
				title="系统管理员联系方式" data-options="collapsible:true">
				<div class="item">
					<span class="label">联系人姓名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							required="true" data-options="validType:'maxLength[100]'"
							name="contactPerson" id="contactPerson" />
					</div>
				</div>
				<div class="item">
					<span class="label">手机号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							required="true" data-options="validType:'mobile'" name="mobPhone"
							id="mobPhone" />
					</div>
				</div>
				<div class="item">
					<span class="label">邮箱：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							required="true"
							data-options="validType:['email','maxLength[40]']" name="email"
							id="email" />
					</div>
				</div>
			</div>
			<div id="acNoDiv" style="width: 100%" class="easyui-panel form"
				title="供应链金融账号信息" data-options="collapsible:true">
				<div class="item">
				<span class="label">户名：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						name="acNm" id="acNm" required="true"
						data-options="validType:'maxLength[70]'"/>
				</div>
			</div>
			<div class="item">
				<span class="label">账号：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						name="acNo" id="acNo" required="true"
						data-options="validType:['maxLength[19]','number','minLength[11]']" />
					<input type="hidden" id="acTp" name="acTp" />
				</div>
			</div>
			<div class="item">
				<span class="label">开户银行：</span>
				<div class="fl item-ifo">
					<input type="text" class="easyui-validatebox combo"
						name="acBkNm" id="acBkNm" required="true"
						data-options="validType:'maxLength[70]'"/>
				</div>
			</div>
			<div style="width: 100%" class="easyui-panel form"
				data-options="collapsible:true">
				<div class="item item-new">
					<span class="label">&nbsp;</span>
					<div class="fl item-ifo">
						<input type="checkbox" class="checkbox" id="readme" checked="checked" disabled="disabled"
							/> <label for="protocal">
							我已阅读并同意<span class="blue hover" id="protocol"
							onclick="showProtocol();">《供应链金融服务协议》</span>
						</label> <span class="clr"></span> <label id="protocol_error"
							class="error hide">请接受服务条款</label>
					</div>
				</div>
				<div class="item">
					<span class="label">材料寄送日：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-datebox" required="required"
							editable="false" name="arrivalDt" id="arrivalDt"
							data-options="height:32,width:253,panelWidth:253" />
					</div>
				</div>
			</div>
		</div>
	</form>
	<div class="blockAreaFooter clearfix mB20">
		<div class="fL blockAreaNotice red">
			<p class="blockAreaNoticeTitle fWb">温馨提示：</p>
			<p>请再次确认用户注册信息，正式提交后将不能修改<br></p>
			<p class="blockAreaNoticeTxt">
				1、请务必在您选择的纸质材料送达日前将完整的纸质材料按要求寄送至指定地点（地址：xxx联系电话：xxxxxxxxx）。<br/>
				2、您可随时登录供应链金融服务平台查询用户注册审批进度。 <br>
				下载：<a id="downNotice" href="javascript:void(0)" onclick="onDownNotice()">《单位授权书样本》</a><br>
			</p>
		</div>
	</div>
	<div id="toolBar" class="tC clearfix noprint">
		<span id="prevBtn" style="margin-left: 20px" onclick="prevBtnClick()"
			class="dsIB mR10 blockAreaBtn white btnRed">上一步</span>
		<span id="printBtn" style="margin-left: 20px" onclick="printBtnClick()"
			class="dsIB mR10 blockAreaBtn white btnBlue">打印</span>
		<span id="submitBtn" style="margin-left: 20px" onclick="submitBtnClick()"
			class="dsIB mR10 blockAreaBtn white btnRed">确认</span>
		<span id="cancelBtn" style="margin-left: 20px"
			onclick="cancelBtnClick()"
			class="dsIB mR10 blockAreaBtn white disabled">取消</span>
	</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="../../jsp/js_cs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>带补充材料具体</title>
<link href="css/zybl/common.css" rel="stylesheet" type="text/css" />
<script src="script/supplier/addMaterial.js" type="text/javascript"></script>
</head>
<body class="UTSCF">
	<form id="supplierForm">
		<div id="regist">
			<div style="text-align: right;font-size: 16px;font-weight: 700;">
				<span>注册编号：</span><label id="lsysRefNo" name="lsysRefNo"></label>
						<input type="hidden" name="sysRefNo" id="sysRefNo"
					value="${sysUserInfo.userRefNo }" />
			</div>
			<div id="userDiv" style="width: 100%" class="easyui-panel form"
				title="注册信息" data-options="collapsible:true">
				<div class="item">
					<span class="label">注册用户名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="userId"
							id="userId" value="${sysUserInfo.userId }"
							data-options="validType:['noChinese','maxLength[35]']"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">注册日期：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-datebox" name="regDt" id="regDt"
							data-options="height:32,width:250,panelWidth:250"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">营业执照：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="licenceNo" id="licenceNo" required="true"
							data-options="validType:['noChinese','maxLength[32]']"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">法定代表人：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="legalRepNm" id="legalRepNm"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">法人手机号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="legalMobPhone" id="legalMobPhone"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">公司名称：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="custNm"
							id="custNm"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">地址：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="regAddr"
							id="regAddr"></input>
					</div>
				</div>
				<div class="item">
					<span class="label">备注：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="remark"
							id="remark"></input>
					</div>
				</div>
			</div>

			<div id="managerDiv" style="width: 100%" class="easyui-panel form"
				title="管理员联系方式" data-options="collapsible:true">
				<div class="item">
					<span class="label">联系人姓名：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="contactPerson" id="contactPerson" />
					</div>
				</div>
				<div class="item">
					<span class="label">手机号码：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo"
							name="mobPhone" id="mobPhone" />
					</div>
				</div>
				<div class="item">
					<span class="label">邮箱：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-validatebox combo" name="email"
							id="email" />
					</div>
				</div>
			</div>

			<div id="otherDiv" style="width: 100%" class="easyui-panel form"
				title="其他" data-options="collapsible:true">
				<div class="item">
					<span class="label">纸质材料寄送日：</span>
					<div class="fl item-ifo">
						<input type="text" class="easyui-datebox" name="arrivalDt" editable="false"
							id="arrivalDt" data-options="height:32,width:250,panelWidth:250" 
							required="required"/>
					</div>
				</div>
				<!-- 				当前交易时间 -->
				<input type="hidden" name="trxDt" id="trxDt" value="${sysUserInfo.sysDate }" /> 
					
				<input type="hidden" value="${sysUserInfo.userRefNo }" id="userSysRefNo" name="userSysRefNo" /> 
					
				<input type="hidden" id="signSts" name="signSts" /> 
				
				<input type="hidden" id="sysTrxSts" name="sysTrxSts" />
				
				<input type="hidden" id="sysRelReason" name="sysRelReason" />
			</div>
		</div>
	</form>
</body>
</html>
/**
 * 供应链前端公共js
 * 
 * @author hyy
 * @date: 2014-09-25
 */
(function($) {
	// 全局系统对象
	// var visit_history = [];
	window['SCFUtils'] = {};
	SCFUtils.SESSION_ID = "";
	// Web工程根目录
//	SCFUtils.ROOTURL = "/SCFWeb";
	// Web工程根目录
	SCFUtils.getRootPath = function (){
	    var curWwwPath = window.document.location.href;  
	    var pathName = window.document.location.pathname;  
	    var pos = curWwwPath.indexOf(pathName);  
	    var localhostPath = curWwwPath.substring(0, pos);  
	    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/')+1);  
	    return projectName;  
	};
	SCFUtils.ROOTURL = SCFUtils.getRootPath();
	
	// 查询数据路径
	SCFUtils.QUERYURL = "query";
	// 查询表格数据路径
	SCFUtils.AJAXURL = "ajax";
	// 提交数据路径
	SCFUtils.SUBMITURL = "submit";
	// 提交数据路径
	SCFUtils.PAGEURL = "gotoPage";
	// 取消当前数据
	SCFUtils.CANCEL = "cancel";
	// 下载文件
	SCFUtils.DOWNLOAD = "download";
	// 报表请求
	SCFUtils.REPORT = "report";

	// 列表页面的默认每页显示的数据数量
	SCFUtils.DEFAULTPAGESIZE = 20;
	// 空方法
	SCFUtils.emptyFn = function() {
	};
	// 操作类型的描述对于关系
	SCFUtils.OPTSTATUS = "";
	// 功能类型描述
	SCFUtils.FUNCTYPE = "";
	// 功能ID
	SCFUtils.FUNCTIONID = "";
	// 功能类型描述
	SCFUtils.CURRENTPAGE = "";
	// 功能类型描述
	SCFUtils.TOTALPAGE = "";
	// 页面请求类型 next 或者 pre continue
	SCFUtils.REQPAGETYPE = "";
	// 页面请求类型 normal 或者 workflow 或者customer
	SCFUtils.ENTRYTYPE = '';

	SCFUtils.SYSBUSIUNIT = '';

	SCFUtils.SYSBUSIDATA = '';

	// 标示是否已经登录
	SCFUtils.LOGIN = true;

	// 标示是否为debug模式
	SCFUtils.DEBUG = true;

	/**
	 * toolBarTable 中的 button 定义
	 */
	SCFUtils.tlbarDefine = [ {
		name : 'prev',
		text : '上一步',
//		cls : 'btnBlue',
//应要求将上一步的底色与取消按钮底色相同，故初始化时调用btnGrey（update in 2016.07.27 by JinJH）
		cls :'btnGrey',
		click : 'onPrevBtnClick'
	}, {
		name : 'next',
		text : '下一步',
		cls : 'btnRed',
		click : 'onNextBtnClick'
	},
	// {name : 'search',text : '查询',cls:'btnRed', click : 'onSearchBtnClick'},
	{
		name : 'save',
		text : '保存',
		cls : 'btnRed',
		click : 'onSaveBtnClick'
	}, {
		name : 'appr',
		text : '审核',
		cls : 'btnRed',
		click : 'onApprBtnClick'
	}, {
		name : 'reject',
		text : '退回',
		cls : 'btnGrey',
		click : 'onRejectBtnClick'
	}, {
		name : 'print',
		text : '打印',
		cls : 'btnBlue',
		click : 'onPrintBtnClick'
	}, {
		name : 'receipt',
		text : '打印回执',
		cls : 'btnBlue',
		click : 'onReceiptBtnClick'
	}, {
		name : 'impt',
		text : '导入',
		cls : 'toolImport',
		click : 'onImptBtnClick'
	}, {
		name : 'expt',
		text : '导出',
		cls : 'btnOrange',
		click : 'onExptBtnClick'
	}, {
		name : 'del',
		text : '删除',
		cls : 'toolDel',
		click : 'onDelBtnClick'
	}, {
		name : 'continue',
		text : '继续',
		cls : 'btnBlue',
		click : 'onContinueBtnClick'
	}, {
		name : 'detail',
		text : '详情',
		cls : 'btnBlue',
		click : 'onDetailBtnClick'
	}, {
		name : 'adv',
		text : '通知',
		cls : 'btnBlue',
		click : 'onAdviceBtnClick'
	}, {
		name : 'page',
		text : '页面信息',
		cls : 'btnBlue',
		click : 'onPageBtnClick'
	}, {
		name : 'back',
		text : '返回',
		cls : 'btnGrey',
		click : 'onBackBtnClick'
	}, {
		name : 'submit',
		text : '提交',
		cls : 'btnRed',
		click : 'onSubmitBtnClick'
	}, {
		name : 'entry',
		text : '进入',
		cls : 'btnRed',
		click : 'onEntryBtnClick'
	}, {
		name : 'cancel',
		text : '取消',
		cls : 'btnGrey',
		click : 'onCancelBtnClick'
	}, {
		name : 'send',
		text : '发送',
		cls : 'btnBlue',
		click : 'onSendBtnClick'
	}  ];

	/**
	 * jquery 调用iframe 页面中js的方法 兼容ie,FF,chrome.
	 */
	SCFUtils.getIframeWidow = function(iframeId) {
		iframeId = /^#/.test(iframeId) ? iframeId : '#' + iframeId;
		return $(window.parent.document).contents().find(iframeId)[0].contentWindow;
	};

	/**
	 * 上一步
	 * 
	 * @returns
	 */
	SCFUtils.onPrevBtnClick = function() {
		var data = {};
		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onPrevBtnClick)) {
			data = SCFUtils.getIframeWidow('iframepage').onPrevBtnClick();
		}

		var options = {
			url : SCFUtils.CANCEL,
			data : $.extend({
				reqPageType : 'pre'
			}, data),
			async : true,
			callBackFun : SCFUtils.requestUrl
		};
		SCFUtils.ajax(options);
	};
	/**
	 * 发送
	 * 
	 * @returns
	 */
	SCFUtils.onSendBtnClick = function() {
		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onSendBtnClick)) {
			SCFUtils.getIframeWidow('iframepage').onSendBtnClick();
		}
	};

	/**
	 * 下一步
	 * 
	 * @returns
	 */
	SCFUtils.onNextBtnClick = function() {
		var data = {};
		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onNextBtnClick)) {
			data = SCFUtils.getIframeWidow('iframepage').onNextBtnClick();
			if (!data) {
				return;
			}
			if (SCFUtils.isEmpty(data)) {
				return;
			}
			$(document).scrollTop(0);//使滚动条回到顶部，即整个页面回到顶部
		}
		$('#centerDiv').css("margin-top","30px");
		SCFUtils.SubmitAjax(data);
	};

	/**
	 * 保存
	 * 
	 * @returns
	 */
	SCFUtils.onSaveBtnClick = function() {
		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onSaveBtnClick)) {
			var data = SCFUtils.getIframeWidow('iframepage').onSaveBtnClick();
			if (!SCFUtils.isEmpty(data)) {
				var options = {
					url : SCFUtils.SUBMITURL,
					data : $.extend({
						reqPageType : 'next'
					}, data),
					async : true,
					callBackFun : SCFUtils.requestUrl
				};
				SCFUtils.ajax(options);
			}
		}
	};

	/**
	 * 审核
	 * 
	 * @returns
	 */
	SCFUtils.onApprBtnClick = function() {
		var data = {};
		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onApprBtnClick)) {
			data = SCFUtils.getIframeWidow('iframepage').onApprBtnClick();
		} else {
			if ($.isFunction(SCFUtils.getIframeWidow('iframepage').setFormId)) {
				data = SCFUtils.convertArray(SCFUtils.getIframeWidow(
						'iframepage').setFormId());
			}
		}

		var options = {
			url : SCFUtils.SUBMITURL,
			data : $.extend({
				reqPageType : 'next'
			}, data),
			async : true,
			callBackFun : SCFUtils.requestUrl
		};
		SCFUtils.ajax(options);
	};
	/**
	 * 退回
	 * 
	 * @returns
	 */
	SCFUtils.onRejectBtnClick = function() {
		if ($
				.isFunction(SCFUtils.getIframeWidow('iframepage').onRejectBtnClick)) {
			return SCFUtils.getIframeWidow('iframepage').onRejectBtnClick();
		}
		SCFUtils.alert("SCFUtils.onRejectBtnClick");
	};
	/**
	 * 打印
	 * 
	 * @returns
	 */
	SCFUtils.onPrintBtnClick = function() {
		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onPrintBtnClick)) {
			SCFUtils.getIframeWidow('iframepage').onPrintBtnClick();
		} else {
			window.print();
		}
		// SCFUtils.alert("SCFUtils.onPrintBtnClick");
	};
	/**
	 * 导入
	 * 
	 * @returns
	 */
	SCFUtils.onImptBtnClick = function() {
		var param = {};
		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onImptBtnClick)) {
			param = SCFUtils.getIframeWidow('iframepage').onImptBtnClick();
		}
		SCFUtils.upload(param);
	};
	/**
	 * 导出
	 * 
	 * @returns
	 */
	SCFUtils.onExptBtnClick = function() {
		 var row = [];
		 if($.isFunction(SCFUtils.getIframeWidow('iframepage').onExptBtnClick)){
			 row = SCFUtils.getIframeWidow('iframepage').onExptBtnClick();
		 }
//		 SCFUtils.preView(data);
		 var options = {
					title:'报表预览',
					reqid:'I_P_000014',
					data : {
						'row' : row,
						cacheType : 'non'
//						,operateType : 'saveAndShow'
					},
					buttons : [{
						text :'关闭',
						handler:function(win){
							win.close();
						}
					}]
				};
			SCFUtils.getData(options);
	};
	/**
	 * 删除
	 * 
	 * @returns
	 */
	SCFUtils.onDelBtnClick = function() {
		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onDelBtnClick)) {
			var data = SCFUtils.getIframeWidow('iframepage').onDelBtnClick();
			if (!SCFUtils.isEmpty(data)) {
				var options = {
					url : SCFUtils.SUBMITURL,
					data : data,
					async : true,
					callBackFun : SCFUtils.requestUrl
				};
				SCFUtils.ajax(options);
			}
		}
	};
	/**
	 * 取消
	 * 
	 * @returns
	 */
	SCFUtils.onCancelBtnClick = function() {
		var clientData = {};
		if (SCFUtils.getIframeWidow('iframepage')
				&& SCFUtils.getIframeWidow('iframepage').onCancelBtnClick
				&& $
						.isFunction(SCFUtils.getIframeWidow('iframepage').onCancelBtnClick)) {
			clientData = SCFUtils.getIframeWidow('iframepage')
					.onCancelBtnClick();
		}
		var options = {
			url : SCFUtils.CANCEL,
			data : clientData,
			callBackFun : SCFUtils.goHome()
		};
		SCFUtils.ajax(options);
	};
	/**
	 * 详情
	 * 
	 * @returns
	 */
	SCFUtils.onDetailBtnClick = function() {
		if ($
				.isFunction(SCFUtils.getIframeWidow('iframepage').onDetailBtnClick)) {
			var data = SCFUtils.getIframeWidow('iframepage').onDetailBtnClick();
			var options = {
				url : SCFUtils.SUBMITURL,
				data : data,
				async : true,
				callBackFun : SCFUtils.requestUrl
			};
			SCFUtils.ajax(options);
		} else {
			SCFUtils.alert("[onDetailBtnClick] undefined.");

		}
	};

	/**
	 * 继续
	 * 
	 * @returns
	 */
	SCFUtils.onContinueBtnClick = function() {
		var data = {};
		if ($
				.isFunction(SCFUtils.getIframeWidow('iframepage').onContinueBtnClick)) {
			data = SCFUtils.getIframeWidow('iframepage').onContinueBtnClick();
		}

		var options = {
			url : SCFUtils.PAGEURL,
			data : $.extend({
				reqPageType : 'continue'
			}, data),
			async : true,
			callBackFun : SCFUtils.requestUrl
		};
		SCFUtils.ajax(options);
	};

	/**
	 * 返回
	 * 
	 * @returns
	 */
	SCFUtils.onBackBtnClick = function() {
		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onBackBtnClick)) {
			return SCFUtils.getIframeWidow('iframepage').onBackBtnClick();
		}
		alert("SCFUtils.onBackBtnClick");
	};

	/**
	 * 当前页面信息
	 * 
	 * @returns
	 */
	SCFUtils.onPageBtnClick = function() {
		// if($.isFunction(SCFUtils.getIframeWidow('iframepage').onBackBtnClick)){
		// return SCFUtils.getIframeWidow('iframepage').onBackBtnClick();
		// }
		// alert("SCFUtils.onBackBtnClick");

	};
	
	/**
	 * 打印回执单
	 * 
	 * @returns
	 */
	SCFUtils.onReceiptBtnClick = function() {
//		var data = {};
//		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onReceiptBtnClick)) {
//			data = SCFUtils.getIframeWidow('iframepage').onReceiptBtnClick();
//			if (!data) {
//				return;
//			}
//			if (SCFUtils.isEmpty(data)) {
//				return;
//			}
//		}
//		SCFUtils.SubmitAjax(data);
	};

	/**
	 * 提交
	 * 
	 * @returns
	 */
	SCFUtils.onSubmitBtnClick = function() {
		if ($
				.isFunction(SCFUtils.getIframeWidow('iframepage').onSubmitBtnClick)) {
			var data = SCFUtils.getIframeWidow('iframepage').onSubmitBtnClick();
			if (!data) {
				return;
			}
			SCFUtils.ContinueAjax(data);
		}
	};

	SCFUtils.ContinueAjax = function(data) {
		var options = {
			url : SCFUtils.SUBMITURL,
			data : $.extend({
				reqPageType : 'continue'
			}, data),
			async : true,
			callBackFun : function(datas) {
				if (datas.success) {
					var submitMessage;
					if (!data.submitMessage) {
						submitMessage = '数据提交成功！';
					}else{
						submitMessage = data.submitMessage;
					}
					SCFUtils.result(submitMessage, function() {
						SCFUtils.goHome();
					});
				}else{
					SCFUtils.alert("数据提交失败！");
				}
			}
		};
		SCFUtils.ajax(options);
	};

	SCFUtils.SubmitAjax = function(data) {
		var options = {
			url : SCFUtils.SUBMITURL,
			data : $.extend({
				reqPageType : 'next'
			}, data),
			async : true,
			callBackFun : SCFUtils.requestUrl
		};
		SCFUtils.ajax(options);
	};

	SCFUtils.AjaxSubmit = function(data, callback) {
		var options = {
			url : SCFUtils.SUBMITURL,
			data : data,
			async : false,
			callBackFun : callback
		};
		SCFUtils.ajax(options);
	};

/*	SCFUtils.onSubmitSuccess = function(data) {
		if (!data.submitMessage) {
			submitMessage = '数据提交成功！';
		}
		SCFUtils.result(data.submitMessage, function() {
			SCFUtils.goHome();
		});
		// alert('交易成功！')
		// 这里定义成message.conform()
		// 显示‘继续’‘确定’两个按钮
		// 继续即直接进入continue的逻辑，跳转到第一次查询页面
		// 确定即进入home页面
	};*/

	/**
	 * 通知信息
	 * 
	 * @returns
	 */
	SCFUtils.onAdviceBtnClick = function() {
		if ($
				.isFunction(SCFUtils.getIframeWidow('iframepage').onAdviceBtnClick)) {
			SCFUtils.getIframeWidow('iframepage').onAdviceBtnClick();
		}
	};

	/**
	 * 返回主页
	 */
	SCFUtils.goHome = function() {
		$('#menuPage').show();
		$('#leftMenu').hide();
//		$('#menuBody').hide();
		$('#firstLevelMenu').hide();
		$('#bigLeftMenu').hide();
		$('#position').hide();
		$('#leftMenuDiv').hide();
		$('#coordinate').hide();
		$('#comMsg').show();
		$('#sideNav').hide();
		$('#blockAreaFooter').attr("style","display: none");//返回主界面隐藏按钮
		$('#blockAreaFooterDiv').show();
//		$('#blockAreaFooter').hide();
		$('#centerDiv').attr("style","margin-left:0px;width:1000px");
		$('#bodyHr').attr("style","box-shadow: 0px");
		$("#rightBody").attr("style","width:100%;margin-left:0;");
		$("#bodyBox").attr("style","width:1000px;");
		$("#centerDiv").removeClass("centerDivPadding");
		$("#centerDiv").addClass("mainPageCenterDivHight");
		var options = {
			pageInfo : {
				functionId : "F0000000",
				name : "主页",
				url : "jsp/home.jsp"
			}
		};
		$("#wrap").removeClass("demo");
		SCFUtils.addFunToBar("");
		SCFUtils.requestUrl(options);
		
	};

	SCFUtils.goLogin = function() {
		var options = {
			pageInfo : {
				functionId : "F0000000",
				name : "主页",
				url : "login.jsp"
			}
		};
		SCFUtils.requestUrl(options, "noLogin");
	};

	/**
	 * 登出系统
	 */
	SCFUtils.onLogoutClick = function() {

		SCFUtils.confirm("是否需要登出系统？", function() {
			var options = {
				url : SCFUtils.CANCEL,
				async : false,
				callBackFun : SCFUtils.doLogout
			};
			SCFUtils.ajax(options);
		});
	};

SCFUtils.doLogout = function() {
		
		var jsonData = {sid : SCFUtils.SESSION_ID};
		var needEncodeStr = JSON.stringify(jsonData);
//		var strReq = $.base64({data:needEncodeStr,type:0});
		var data={"_d":needEncodeStr};
		
		$.ajax({
			type : "post",
			dataType : "text",
			data :data,
			timeout : 300000,
			url : SCFUtils.ROOTURL + "/scflogout",
			success : function(data) {
				var needDecodeStr = data.replace(/[\r\n]/g,"");
//				var strData = $.base64({data:needDecodeStr,type:1,unicode:true});  
				data = JSON.parse(needDecodeStr);
				
				if (data.success) {
					window.location = SCFUtils.ROOTURL + "/main.jsp";
				} else {
					SCFUtils.error(data.msg);
				}
			},
			error : function(response) {
				SCFUtils.error("网络连接错误");
			}
		});
	};
	/**
	 * 进入交易
	 * 
	 * @returns
	 */
	SCFUtils.onEntryBtnClick = function() {
		var data = {};
		if ($.isFunction(SCFUtils.getIframeWidow('iframepage').onEntryBtnClick)) {
			data = SCFUtils.getIframeWidow('iframepage').onEntryBtnClick();
			if (SCFUtils.isEmpty(data)) {
				return false;
			}
		}

		var options = {
			url : SCFUtils.PAGEURL,
			data : $.extend({
				reqPageType : 'next'
			}, data),
			async : true,
			callBackFun : SCFUtils.requestUrl
		};
		SCFUtils.ajax(options);
	};

	/**
	 * 创建公用按钮
	 * 
	 * @param tlbarConfigs：
	 *            按钮配置</br> <code>{
	 * 			showButton : ['cancel', 'home', 'back'], </br>  
	 * 		    isShowText : true</br>
	 * 		  }
	 *  </code>
	 * @param tlbarDefine
	 *            重写按钮定义,参见：SCFUtils.tlbarDefine
	 */
	SCFUtils.getToolBar = function(tlbarConfigs, tlbarDefine) {
		tlbarDefine = tlbarDefine || SCFUtils.tlbarDefine;
		var blockAreaFooter = $('#blockAreaFooter', parent.document);
		if ($('div.blockAreaBtns', blockAreaFooter).length == 0) {
			$('<div class="fR blockAreaBtns tR"></div>').appendTo(
					blockAreaFooter);
		}
		var blockAreaBtns = $('div.blockAreaBtns', blockAreaFooter);
		blockAreaBtns.empty();
		for (var i = 0, max = tlbarDefine.length; i < max; i++) {
			if (tlbarDefine[i] != null
					&& $.inArray(tlbarDefine[i].name, tlbarConfigs.showButton) >= 0) {
				$(
//						'<button id="'
//								+ tlbarDefine[i].name
//								+ '_btn" style="margin-left:10px" onclick="SCFUtils.'
//								+ tlbarDefine[i].click + '()">'
//								+ tlbarDefine[i].text + '</button>').addClass(
//						"dsIB mR10 blockAreaBtn white").addClass(
//						tlbarDefine[i].cls).appendTo(blockAreaBtns);
						'<button id="'
						+ tlbarDefine[i].name
						+ '_btn" style="margin-left:10px" onclick="SCFUtils.'
						+ tlbarDefine[i].click + '()">'
						+ tlbarDefine[i].text + '</button>').addClass(
				"dsIB mR10 blockAreaBtn btnGradients").appendTo(blockAreaBtns);
			}
		}
	};

	/**
	 * 在文本输入域按回车后执行 fn : 回车后调用的方法
	 */
	SCFUtils.enterKey = function(e, fn) {
		if (e.keyCode == 13 && fn && fn != null) {
			fn();
		}
	};

	/**
	 * 判断是否为空 isEmpty( Object value, [Boolean allowEmptyString] ) : Boolean
	 * Returns true if the passed value is empty, false otherwise. The value is
	 * deemed to be empty if it is either: null undefined a zero-length array a
	 * zero-length string (Unless the allowEmptyString parameter is set to true)
	 */
	SCFUtils.isEmpty = function(value, allowEmptyString) {
		return (value === null) || (value === undefined)
				|| (!allowEmptyString ? value === '' : false)
				|| ($.isArray(value) && value.length === 0);
	};

	/**
	 * 获取不重复的编号
	 * 
	 * @param len
	 *            长度
	 * @param radix
	 *            基数
	 * @returns len长度的不重复的编号
	 */
	SCFUtils.uuid = function(len, radix) {
		var i, uuid = [], chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
				.split('');
		radix = radix || chars.length;
		if (len) {
			for (i = 0; i < len; i += 1)
				uuid[i] = chars[0 | Math.random() * radix];
		} else {
			var r;
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';
			for (i = 0; i < 36; i += 1) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		return uuid.join('');
	};

	/**
	 * 判断对象是否为数组
	 * 
	 * @param value
	 * @returns {Boolean}
	 */
	SCFUtils.isArray = function(value) {
		return value && typeof value === 'object'
				&& typeof value.length === 'number'
				&& typeof value.splice === 'function'
				&& !(value.propertyIsEnumerable('length'));
	};

	/**
	 * 将json对象转换为字符串
	 * 
	 * @param o
	 * @returns
	 */
	SCFUtils.json2str = function(o) {
		var arr = [];
		var fmt = function(s) {
			if(s === null){
				return "\'\'";
			}
			if(SCFUtils.isEmpty(s)){
				return "\'\'";
			}
			if (typeof s == 'object') {

				return SCFUtils.json2str(s);
			}

			return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
		};
		if (SCFUtils.isArray(o)) {
			return SCFUtils.JsonArrayToStringCfz(o);
		} else {
			for ( var i in o) {
				if (!(SCFUtils.isEmpty(o[i]) && (SCFUtils.isEmpty(i)))) {
					arr.push("'" + i + "':" + fmt(o[i]));
				}
			}
			return '{' + arr.join(',') + '}';
		}

	};


	/**
	 * json数组转换成字符串
	 * 
	 * @param jsonArray
	 * @returns {String}
	 */
	SCFUtils.JsonArrayToStringCfz = function(jsonArray) {
		var JsonArrayString = "[";
		for (var i = 0, max = jsonArray.length; i < max; i++) {
			if (i == (max - 1)) {
				JsonArrayString = JsonArrayString
						+ SCFUtils.json2str(jsonArray[i]);
			} else {
				JsonArrayString = JsonArrayString
						+ SCFUtils.json2str(jsonArray[i]) + ",";
			}
		}
		JsonArrayString = JsonArrayString + "]";
		return JsonArrayString;
	};

	/**
	 * 将jquery(selector).serializeArray()序列化后的值转为name:value的形式的json对象。</br>
	 * 将格式为： <code> 
	 * [
	 * 	  {name: 'firstname', value: 'Hello'},
	 *    {name: 'lastname', value: 'World'}
	 * ] 
	 * </code>
	 * 转成 <code>
	 * 	{"firstname":"Hello","lastname":"World"}
	 * </code>
	 * 
	 * @param form
	 *            要转换成json的form对象id
	 * @returns json对象
	 */
	SCFUtils.convertArray = function(form) {
		var v = null;
		if ($("#" + form).form('validate')) {
			v = {};
			var o = $("#" + form).serializeArray();
			for ( var i in o) {
				//当使用IE又有placeholder属性且placeholder的值等于value时
				if($.browser.type=='IE'&&typeof($("input[name='"+o[i].name+"']").attr('placeholder'))!=undefined
						&&$("input[name='"+o[i].name+"']").attr('placeholder')==o[i].value){
					o[i].value = '';
				}
				if (!o[i].name) {
					// 忽略length属性
					continue;
				}
				if (typeof (v[o[i].name]) == 'undefined')
					// v[o[i].name] = o[i].value;
					// 对password加密
					// if ("password" == o[i].name || "newPwd" == o[i].name ||
					// "enterPwd" == o[i].name) {
					// v[o[i].name] = hex_md5(o[i].value);
					// }
					// else {
					v[o[i].name] = o[i].value;

				// }
				else
					v[o[i].name] += "," + o[i].value;
			}
		} else {
			SCFUtils.alert('请检查表单是否输入完整。');
		}
		return v;
	};

	SCFUtils.checkForm = function(form) {
		var v = null;
		if ($("#" + form).form('validate')) {
			v = {};
			var o = $("#" + form).serializeArray();
			for ( var i in o) {
				if (!o[i].name) {
					// 忽略length属性
					continue;
				}
			}
		} else {
			return false;
		}
		return true;
	};
	/**
	 * 将jquery($datagrid).serializeArray()序列化后的值转为name:value的形式的json对象。</br>
	 * 将格式为： <code> 
	 * [
	 * 	  {name: 'firstname', value: 'Hello'},
	 *    {name: 'lastname', value: 'World'}
	 * ] 
	 * </code>
	 * 转成 <code>
	 * 	{"firstname":"Hello","lastname":"World"}
	 * </code>
	 * 
	 * @param form
	 *            要转换成json的form对象id
	 * @returns json对象
	 */
	SCFUtils.serializeGridData = function(grid) {
		return SCFUtils.packageGridData(grid, true, true);
	};

	SCFUtils.serializeGridData = function(grid, containsDelete) {
		return SCFUtils.packageGridData(grid, true, containsDelete);
	};

	/**
	 * 
	 * @param grid
	 *            要转换成json的grid对象id
	 * @param flag
	 *            true||false 是否把数据转成string打包
	 * @param containsDelete
	 *            true||false 是否处理删除的数据。
	 * @returns json对象 没有系列化成String，client需要手动调用SCFUtils.json2str序列化对象
	 */
	SCFUtils.getGridData = function(grid, flag, containsDelete) {
		return SCFUtils.packageGridData(grid, flag, containsDelete);
	};

	SCFUtils.getSelectedGridData = function(grid, isSerialize) {
		var p = {};
		var total = 0;
		var gridSelection = $('#' + grid).datagrid("getSelections");
		$.each(gridSelection, function(i, obj) {
			p['rows' + i + ''] = isSerialize === true ? SCFUtils.json2str(obj)
					: obj;
			total++;
		});
		p._total_rows = total;
		return p;
		// return SCFUtils.packageGridData(grid,false);
	};

	SCFUtils.packageGridData = function(grid, isSerialize, containsDelete) {
		var p = {};
		if ($("#" + grid)) {
			var data = $("#" + grid).datagrid('getAllData');
			if (SCFUtils.isEmpty(data) || data.total < 1) {
				data = $("#" + grid).datagrid('getData');
			}
			// var data = $("#"+grid).datagrid('getData');
			var total = 0;
			$.each(data.rows, function(i, obj) {
				if (obj.sysNextOp) {
					obj.sysNextOp = '';
				}
				p['rows' + i + ''] = isSerialize === true ? SCFUtils
						.json2str(obj) : obj;
				total++;
			});
			if (containsDelete === true) {
				var deletes = $('#' + grid).datagrid('getChanges', 'deleted');
				if (!SCFUtils.isEmpty(deletes)) {
					$
							.each(
									deletes,
									function(i, obj) {
										$.extend(obj, {
											sysNextOp : 'delete'
										});
										p['rows' + total + ''] = isSerialize === true ? SCFUtils
												.json2str(obj)
												: obj;
										total++;
									});
				}
			}

			p._total_rows = total;
		} else {
			SCFUtils.alert('请检查需要提交的表格数据。');
		}
		return p;
	};

	SCFUtils.packageListData = function(rows, isSerialize) {
		var p = {};
		var total = 0;
		$.each(rows, function(i, obj) {
			p['rows' + i + ''] = isSerialize === true ? SCFUtils
					.json2str(obj) : obj;
			total++;
		});
		
		p._total_rows = total;
		
		return p;
	};
	/**
	 * 按照参数格式化金额 <code>
	 * 	var a = -40000.2356;
	 *  var b = SCFUtils.ccyFormat(a,'￥',2);
	 *  b:￥-40,000.24;
	 * </code>
	 * 
	 * @param vstr
	 *            数值
	 * @param prefix
	 *            前缀
	 * @param sacle
	 *            小数点位数
	 * @returns 格式化后的金额
	 */
	SCFUtils.ccyFormat = function(vstr, prefix, sacle) {
		var value = vstr;
		value = value + "";
		if (value === null || value === '') {
			return '';
		}

		if (value.length > 1) {
			if ('-' != value.substring(0, 1)
					&& isNaN(parseInt(value.substring(0, 1)))) {
				return value;
			}
		}
		prefix = prefix || '￥';
		sacle = isNaN(sacle) ? 2 : parseInt(sacle);

		var point = sacle == 0 ? "" : ".";
		for (var i = 0; i < sacle; i += 1) {
			point = point + "0";
		}
		value = (Math.round((value - 0) * 100)) / 100;
		value = (value == Math.floor(value)) ? value + point
				: ((value * 10 == Math.floor(value * 10)) ? value + "0" : value);
		value = String(value);
		var ps = value.split('.');
		var whole = ps[0];
		var sub = ps[1] ? '.' + ps[1] : point;
		var r = /(\d+)(\d{3})/;
		while (r.test(whole)) {
			whole = whole.replace(r, '$1' + ',' + '$2');
		}
		value = whole + sub;
		if (value.charAt(0) == '-') {
			return prefix + '-' + value.substr(1); // 正常
		}

		return prefix + value;
	};

	/**
	 * 格式化金额 <code>
	 * 	var a = -40000.2356;
	 *  var b = SCFUtils.ccyFormat(a,2);
	 *  b:-40,000.24;
	 * </code>
	 * 
	 * @param vstr
	 *            数值
	 * @param sacle
	 *            小数点位数
	 * @returns 格式化后的金额
	 */
	SCFUtils.ccyFormatNoPre = function(vstr, sacle) {
		var value = vstr;
		value = value + "";
		if (value === null || value === '') {
			return '';
		}

		if (value.length > 1) {
			if ('-' != value.substring(0, 1)
					&& isNaN(parseInt(value.substring(0, 1)))) {
				return value;
			}
		}
		sacle = isNaN(sacle) ? 2 : parseInt(sacle);

		var point = sacle == 0 ? "" : ".";
		for (var i = 0; i < sacle; i += 1) {
			point = point + "0";
		}
		value = (Math.round((value - 0) * 100)) / 100;
		value = (value == Math.floor(value)) ? value + point
				: ((value * 10 == Math.floor(value * 10)) ? value + "0" : value);
		value = String(value);
		var ps = value.split('.');
		var whole = ps[0];
		var sub = ps[1] ? '.' + ps[1] : point;
		var r = /(\d+)(\d{3})/;
		while (r.test(whole)) {
			whole = whole.replace(r, '$1' + ',' + '$2');
		}
		value = whole + sub;
		if (value.charAt(0) == '-') {
			return value.substr(1); // 正常
		}

		return value;
	};

	/**
	 * 将按币种格式化化的金额反格式化为数值 <code>
	 * 	var b = '￥-40,000.24';
	 * 	var c = SCFUtils.deformatCcy(b);
	 *  c:-40000.24
	 * </code>
	 * 
	 * @param s
	 *            按币种格式化化的金额
	 * @returns 数值
	 */
	SCFUtils.deformatCcy = function(s) {
		var str = SCFUtils.isEmpty(s) ? "" : s.toString().replace(/[^-.0-9]/g,
				'');
		if (str == "" || isNaN(str)) {
			return "";
		}
		// 负号移动到最左边
		if (str.indexOf("-") > 0) {
			str = "-" + str.replace("-", "");
		}
		return Number(str);
	};
	
	/**
	 * 将金额转换为大写 <code>
	 * 	var money = '40,000.24';
	 * 	var c = SCFUtils.deformatCcy(money);
	 *  c:
	 * </code>
	 * 
	 * @param s
	 *           
	 * @returns 数值
	 */
	SCFUtils.ccyGreatFormat= function(s)  {
		money = SCFUtils.ccyFormatNoPre(money, 2);
		money = SCFUtils.deformatCcy(money);
		money += "";
		var Great = [ "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾" ];
		var GreatLong = [ "", "万", "亿" ];
		var GreatInt = [ "", "拾", "佰", "仟" ];
		var GreatFloat = [ "角", "分" ];
		var IntStr;// 整数部分
		var intGreat = "";
		var FloatStr;// 小数部分
		var floatGreat = "";
		IntStr = ("0" + money.substring(0, money.indexOf("."))).split("");
		FloatStr = money.substring(money.indexOf(".") + 1).split("");
		for ( var i = IntStr.length - 1, j = 1; i >= 0; i--, j++) {
			if (IntStr[i] == "0")
				continue;
			intGreat = Great[parseInt(IntStr[i]) - 1]
					+ ((j - 1) % 4 == 0 ? "" : GreatInt[((j - 1) % 4)])
					+ ((j - 1) % 4 != 0 ? "" : GreatLong[parseInt(j / 4)])
					+ intGreat;
		}
		for ( var i = 0; i < FloatStr.length; i++) {
			if (FloatStr[i] == "0")
				continue;
			floatGreat = floatGreat + Great[parseInt(FloatStr[i]) - 1]
					+ GreatFloat[i];
		}

		return intGreat + "元" + floatGreat;
	};
	/**
	 * 刷新选项卡
	 * 
	 * @param menuid
	 *            Function id 用来进入交易
	 * @param path
	 *            功能路径，用在导航栏上
	 * @param reqType
	 *            非登陆状态时传入
	 */
	/*SCFUtils.entry = function(menuid, path, reqType,reqData) {
		----  交易提交后（隐藏左导航之后）返回首页会保持原样在屏幕左外部 
		 * ---  以下4行代码在再次进入时将左侧导航放回  -----
		$("#sideNav").removeClass('closed');
		$("#leftMenu").animate({'margin-left': '0px'});//animate为动画效果。左侧导航逐渐变为距离左边0px
		$("#leftMenuDiv").animate({'margin-left': '0px'});
		$("#rightBody").attr("style","width:760px");
		-----------------------------------------------
		$("#menuPage").hide();
		$('#leftMenu').show();
		$('#menuBody').show();
		$('#position').show();
		$('#leftMenuDiv').show();
		$('#comMsg').hide();
		$('#coordinate').show();
		$('#blockAreaFooterDiv').hide();
		$('#sideNav').show();
		$('#bodyHr').attr("style","box-shadow: 1px 1px 5px #909090;");
		$('#centerDiv').attr("style","margin-left:19px;width:760px;margin-top:20px;min-height: 900px;");
		$('#footer').attr("style","background-color:#e5e5e5");
		$('#footerBody').attr("style","background-color:#e5e5e5");
		$('.footerP').attr("style","color:#323030");
		$('.footer .footerP a').attr("style","color:#323030");
		$('#blockAreaFooter').attr("display","block");//进入交易页面显示按钮
		var options = {
			url : SCFUtils.PAGEURL,
			data : {
				reqPageType : 'preCancel',
				reqLoginType : reqType
			},
			showMask:'entry'===reqType?false:true,
			callBackFun : function(data) {
				if (data.message && !SCFUtils.isEmpty(data.message) && !reqType) {
					// 需要提醒，如果确认离开，则取消当前页面功能， 然后跳转页面
					SCFUtils.confirm(data.message, function() {
						var options = {
							url : SCFUtils.CANCEL
						};
						SCFUtils.ajax(options);
						SCFUtils.addFunToBar(path);
						if('entry'===reqType){
//							var p = SCFUtils.parseUrl(reqData);
//							p = '_entry=1&'+p;
							SCFUtils.entryPage(menuid,reqData);
						}else{
							SCFUtils.initlizePage(menuid);
						}
					});
				} else {
					// 不需要提醒，直接跳转页面
					SCFUtils.addFunToBar(path);
					if('entry'===reqType){
//						var p = SCFUtils.parseUrl(reqData);
//						p = '_entry=1&'+p;
						SCFUtils.entryPage(menuid,reqData);
					}else{
						SCFUtils.initlizePage(menuid, reqType);
					}
				}
			}
		};
		SCFUtils.ajax(options);
	};*/
	
	SCFUtils.entry = function(menuid, path, reqType,reqData) {
		/*-------------如下页面初始化用于工作流待办区4个功能进来和快捷菜单进来--------------*/
		var url = window.parent.document.URL;
		if(url.indexOf("index.jsp") > 0 ){
			$("#menuPage",window.parent.document).hide();
			$('#menuBody',window.parent.document).show();
			$('#position',window.parent.document).show();
			$('#comMsg',window.parent.document).hide();
			$('#coordinate',window.parent.document).show();
			$('#blockAreaFooterDiv',window.parent.document).hide();
			$('#rightBody',window.parent.document).attr("style","width:1000px;");
			$('#centerDiv',window.parent.document).attr("style","min-height: 1478px;");
			$('#blockAreaFooter',window.parent.document).attr("display","block");//进入交易页面显示按钮
			$("#centerDiv").addClass("centerDivPadding");
			$("#centerDiv",window.parent.document).removeClass("mainPageCenterDivHight");
		}
		var options = {
				url : SCFUtils.PAGEURL,
				data : {
					reqPageType : 'preCancel',
					reqLoginType : reqType
				},
				showMask:'entry'===reqType?false:true,
				callBackFun : function(data) {
					if (data.message && !SCFUtils.isEmpty(data.message) && !reqType) {
						// 需要提醒，如果确认离开，则取消当前页面功能， 然后跳转页面
						SCFUtils.confirm(data.message, function() {
//							var options = {
//								url : SCFUtils.CANCEL
//							};
//							SCFUtils.ajax(options);
							SCFUtils.onCancelBtnClick();
							SCFUtils.addFunToBar(path);
							if('entry'===reqType){
//								var p = SCFUtils.parseUrl(reqData);
//								p = '_entry=1&'+p;
								SCFUtils.entryPage(menuid,reqData);
							}else{
								SCFUtils.initlizePage(menuid);
							}
						});
					} else {
						// 不需要提醒，直接跳转页面
						SCFUtils.addFunToBar(path);
						if('entry'===reqType){
//							var p = SCFUtils.parseUrl(reqData);
//							p = '_entry=1&'+p;
							SCFUtils.entryPage(menuid,reqData);
						}else{
							SCFUtils.initlizePage(menuid, reqType,reqData);
						}
					}
				}
			};
			SCFUtils.ajax(options);
		/*----  交易提交后（隐藏左导航之后）返回首页会保持原样在屏幕左外部 
		 * 业务模块交易进来，执行完ajax请求之后会执行如下页面初始化，工作流的进来执行ajax之后就跳出了。不执行如下。
		 * ---  以下4行代码在再次进入时将左侧导航放回  -----*/
		$("#sideNav").removeClass('closed');
//		$("#leftMenu").animate({'margin-left': '0px'});//animate为动画效果。左侧导航逐渐变为距离左边0px
		$('#bigLeftMenu').animate({'margin-left': '0px'});
//		$("#leftMenuDiv").animate({'margin-left': '0px'});
		$("#rightBody").attr("style","float:right;");
		/*-----------------------------------------------*/
		$("#menuPage").hide();
		$('#leftMenu').show();
		$('#firstLevelMenu').show();
		$('#bigLeftMenu').show();
//		$('#menuBody').show();
		$('#position').show();
		$('#leftMenuDiv').show();
		$('#comMsg').hide();
		$('#coordinate').show();
		$('#blockAreaFooterDiv').hide();
		$('#sideNav').show();
		$('#bodyHr').attr("style","box-shadow: 1px 1px 5px #909090;");
		$('#centerDiv').attr("style","margin-left:19px;width:100%;margin-top:30px;min-height: 1200px;float:right;");
		$('#blockAreaFooter').attr("display","block");//进入交易页面显示按钮
		$("#bodyBox").attr("style","width:70%");
		$("#centerDiv").addClass("centerDivPadding");
		$("#centerDiv").removeClass("mainPageCenterDivHight");
		$("#wrap").removeClass("demo");
		$("#wrap").removeClass("demo");
	};

	SCFUtils.entryPage = function(tabId,req_data) {
		var options = {
			url : SCFUtils.PAGEURL,
			data : $.extend(req_data,{
				sysFuncId : tabId,
				reqPageType : 'entry'
			}),
			callBackFun : function(data) {
				var p = SCFUtils.parseUrl(req_data);
				p = '_entry=1&'+p;
				SCFUtils.requestUrl(data, '',p);
			},
			showMask:false
		};
		SCFUtils.ajax(options);
	};
	
	SCFUtils.initlizePage = function(tabId, reqType,reqData) {
		var options = {
			url : SCFUtils.PAGEURL,
			data : {
				sysFuncId : tabId,
				reqPageType : 'initlize',
				reqLoginType : reqType
			},
			callBackFun : function(data) {
				if(SCFUtils.isEmpty(reqData)){
					SCFUtils.requestUrl(data, reqType);
				}else{
					var p = SCFUtils.parseUrl(reqData);
					p = '_entry=1&'+p;
					SCFUtils.requestUrl(data, reqType,p);
				}
			}
		};
		SCFUtils.ajax(options);
		/*----  交易提交后（隐藏左导航之后）返回首页会保持原样在屏幕左外部 
		 * 业务模块交易进来，执行完ajax请求之后会执行如下页面初始化，工作流的进来执行ajax之后就跳出了。不执行如下。
		 * ---  以下4行代码在再次进入时将左侧导航放回  -----*/
		$("#sideNav").removeClass('closed');
//		$("#leftMenu").animate({'margin-left': '0px'});//animate为动画效果。左侧导航逐渐变为距离左边0px
		$('#bigLeftMenu').animate({'margin-left': '0px'});
//		$("#leftMenuDiv").animate({'margin-left': '0px'});
		$("#rightBody").attr("style","float:right;");
		/*-----------------------------------------------*/
		$("#menuPage").hide();
		$('#leftMenu').show();
		$('#firstLevelMenu').show();
		$('#bigLeftMenu').show();
//		$('#menuBody').show();
		$('#position').show();
		$('#leftMenuDiv').show();
		$('#comMsg').hide();
		$('#coordinate').show();
		$('#blockAreaFooterDiv').hide();
		$('#sideNav').show();
		$('#bodyHr').attr("style","box-shadow: 1px 1px 5px #909090;");
		$('#centerDiv').attr("style","margin-left:19px;width:100%;margin-top:20px;min-height: 900px;float:right;");
		$('#blockAreaFooter').attr("display","block");//进入交易页面显示按钮
		$("#bodyBox").attr("style","width:70%");
		$("#centerDiv").addClass("centerDivPadding");
		$("#centerDiv").removeClass("mainPageCenterDivHight");
		$("#wrap").removeClass("demo");
	};
	/**
	 * 选项卡回调函数
	 * 
	 * @param data
	 *            success: true||false (必须)</br> message: 信息提示的内容。 (必须)
	 *            data.pageInfo: 后台返回的查询对象：</br> <span> functionId: 功能ID
	 *            (唯一，必须)</br> name: 功能名称 (必须)</br> </span>
	 */
	SCFUtils.requestUrl = function(data, reqType,reqData) {
		if (!SCFUtils.isEmpty(data) && !SCFUtils.isEmpty(data.pageInfo)) {
			if (SCFUtils.isEmpty(data.pageInfo.functionId)) {
				SCFUtils.error("系统未返回的页面ID");
				return;
			}
			if (!SCFUtils.isEmpty(reqType)) {
				data.pageInfo.url = data.pageInfo.url + '?reqLoginType='
						+ reqType + '&&_dc=' + $.now();
			} else {
				data.pageInfo.url = data.pageInfo.url + '?_dc=' + $.now();
			}
			if(!SCFUtils.isEmpty(reqData)){
				data.pageInfo.url = data.pageInfo.url + '&&' + reqData;
			}
			// var iframePage = '<iframe name="work" id="iframepage"
			// src="'+data.pageInfo.url+
			// '" frameborder="0" width="100%" scrolling="no" marginheight="0"
			// marginwidth="0" '+
			// ' onLoad="iFrameHeight()"></iframe>';
			var iframePage = $('<iframe>').attr('name', 'work').attr('id',
					'iframepage').attr('width', '100%').attr('height', '100%')
					.attr('marginheight', '0').attr('marginwidth', '0').attr(
							'scrolling', 'no').attr('frameborder', '0').attr(
							'onLoad', 'iFrameHeight()').attr('src',
							data.pageInfo.url);
			// var content =
			// parent.parent.$('#centerDiv')||parent.$('#centerDiv');
			var _top = getTop(window, {
				locate : 'top'
			});
			var content = _top.$('#centerDiv');
			content.empty();
			try{
				content.append(iframePage);
				var boarddiv = "<div class='blockAreaFooter clearfix mB20' id='blockAreaFooter'></div>"; 
				content.append(boarddiv);
			}catch(e){
				//IE9此处会报错，暂时强制刷新整个页面
				SCFUtils.error(e);
				_top.location.reload();
			}

		} else {
			SCFUtils.error("后台返回数据格式不正确！");
		}
	};
	
//	SCFUtils.requestUrl = function(data, reqType,reqData) {
//		if (!SCFUtils.isEmpty(data) && !SCFUtils.isEmpty(data.pageInfo)) {
//			if (SCFUtils.isEmpty(data.pageInfo.functionId)) {
//				SCFUtils.error("系统未返回的页面ID");
//				return;
//			}
//			if (!SCFUtils.isEmpty(reqType)) {
//				data.pageInfo.url = data.pageInfo.url + '?reqLoginType='
//						+ reqType + '&&_dc=' + $.now();
//			} else {
//				data.pageInfo.url = data.pageInfo.url + '?_dc=' + $.now();
//			}
//			if(!SCFUtils.isEmpty(reqData)){
//				data.pageInfo.url = data.pageInfo.url + '&&' + reqData;
//			}
//			// var iframePage = '<iframe name="work" id="iframepage"
//			// src="'+data.pageInfo.url+
//			// '" frameborder="0" width="100%" scrolling="no" marginheight="0"
//			// marginwidth="0" '+
//			// ' onLoad="iFrameHeight()"></iframe>';
//			var iframePage = $('<iframe>').attr('name', 'work').attr('id',
//					'iframepage').attr('width', '100%').attr('height', '100%')
//					.attr('marginheight', '0').attr('marginwidth', '0').attr(
//							'scrolling', 'no').attr('frameborder', '0').attr(
//							'onLoad', 'iFrameHeight()').attr('src',
//							data.pageInfo.url);
//			// var content =
//			// parent.parent.$('#centerDiv')||parent.$('#centerDiv');
//			var _top = getTop(window, {
//				locate : 'top'
//			});
//			var content = _top.$('#centerDiv');
//			content.empty();
//			try{
//				iframePage.appendTo(content);
//				$('<div class="blockAreaFooter clearfix mB20" id="blockAreaFooter"></div>').appendTo(content);
//			}catch(e){
//				//IE9此处会报错，暂时强制刷新整个页面
//				_top.location.reload();
//			}
//		} else {
//			SCFUtils.error("后台返回数据格式不正确！");
//		}
//	};
	
	SCFUtils.parseUrl =  function (data) {
		var url = "";
		for ( var key in data) {
			url += key + "=" + data[key] + "&";
		}
		if (url.charAt(url.length - 1) == '&') {
			url = url.substring(0, url.length - 1);
		}
		url = encodeURI(url);
		url = encodeURI(url);// 防止中文乱码，特意编码两次
		return url;
	};
	
	function getTop(w, options) {
		var _doc;
		try {
			_doc = w['top'].document;
			_doc.getElementsByTagName;
		} catch (e) {
			return w;
		}

		if (options.locate == 'document'
				|| _doc.getElementsByTagName('frameset').length > 0) {
			return w;
		}

		if (options.locate == 'document.parent'
				|| _doc.getElementsByTagName('frameset').length > 0) {
			return w.parent;
		}

		return w['top'];
	}

	/**
	 * 初始化窗口
	 * 
	 * @param options
	 *            是一个自定义对象属性有:</br> id:窗口ID (必须)</br> title:窗口title (必须)</br>
	 *            closeFun:关闭窗口事件 (可选)
	 */
	SCFUtils.initDialog = function(options) {
		$("#" + options.id).dialog({
			title : options.title,
			modal : true, // 模式窗口：窗口背景不可操作
			resizable : true, // 可拖动边框大小
			center : true,
			onClose : function() { // 继承自panel的关闭事件
				if (options.closeFun != "undefined") {
					options.closeFun;
				}
			}
		});
	};

	/**
	 * 方法名：openDialog 方法说明：打开一个弹出窗口
	 */
	SCFUtils.openDialog = function(winid, opts) {
		$("#" + winid).dialog({
			title : opts.title,
			width : (opts.width) ? opts.width : 400,
			height : (opts.height) ? opts.height : 300,
			closed : false,
			cache : false,
			closable : false,
			href : opts.url,
			onLoad : opts.onLoad,
			modal : true,
			buttons : (opts.buttons) ? opts.buttons : []
		});
	};

	/**
	 * easyui datagrid表格重载数据
	 * 
	 * @param tableId
	 *            表格id
	 */
	SCFUtils.reloadTable = function(tableId) {
		$('#' + tableId).datagrid('reload');
	};

	/**
	 * 普通消息提示框
	 * 
	 * @param msg
	 * @param fn
	 */
	SCFUtils.alert = function(msg, fn) {
		window.top.layer.alert(msg, {
			title : LOCALE.TTL.TTL_ALERT
		}, function(index) {
			window.top.layer.close(index);
			if ($.isFunction(fn)) {
				fn();
			}
		});
		// $.messager.alert(LOCALE.TTL.TTL_ALERT, msg,"info", fn);
	};

	/**
	 * 操作结果提示框(一般用于提交交易成功后弹出)
	 * 
	 * @param msg
	 * @param fn
	 */
	// var countDown = 3;
	SCFUtils.result = function(msg, fn) {
		// window.top.layer.alert(msg,{title:'操作结果',btn:['完成('+countDown+')'],icon:
		// 1},function(index){
		window.top.layer.alert(msg, {
			title : '操作结果',
			btn : [ '完成' ],
			icon : 1
		}, function(index) {
			window.top.layer.close(index);
			if ($.isFunction(fn)) {
				fn();
			}
		});
		/*
		 * var timeId = setTimeout(function() { SCFUtils.result(msg,fn); },
		 * 1000); if (countDown == 0) { // if($.isFunction(fn)){ // fn(); // }
		 * clearTimeout(timeId); } else { countDown--; }
		 */
	};

	/**
	 * 显示操作成功确认窗口
	 * 
	 * @param msg
	 * @param cb
	 * @param data
	 */
	SCFUtils.success = function(msg, fn) {
		window.top.layer.alert(msg, {
			title : LOCALE.TTL.TTL_ALERT,
			icon : 1
		}, function(index) {
			window.top.layer.close(index);
			if ($.isFunction(fn)) {
				fn();
			}
		});
		// $.messager.alert(LOCALE.TTL.TTL_ALERT,msg,"success",fn);
	};

	/**
	 * 显示错误提示消息窗口
	 * 
	 * @param message
	 */
	SCFUtils.error = function(message, fn) {
		var parter = /(\r\n)/g;
		message = message.replace(parter, "</br>");
		window.top.layer.alert(message, {
			title : LOCALE.TTL.TTL_ERROR,
			icon : 2
		}, function(index) {
			window.top.layer.close(index);
			if ($.isFunction(fn)) {
				fn();
			}
		});
		// $.messager.alert(LOCALE.TTL.TTL_ERROR,message,'error',fn);
	};

	/**
	 * Ajax 调用失败时的处理
	 * 
	 * @param r
	 * @param m
	 * @param d
	 */
	SCFUtils.ajaxError = function(r, m, d) {
		SCFUtils.hideLoading();
		if (r.readyState == 4 && r.status == 200) {
			SCFUtils.error("向服务器发送请求失败，失败的原因是:<br>" + d.message);
		} else {
			SCFUtils.error("向服务器发送请求无响应！");
		}
	};

	/**
	 * 在页面上显示载入的等待页面
	 * 
	 * @param msg
	 */
	SCFUtils.showLoading = function(msg) {
		// $.messager.loading($.extend({loadingMsg:LOCALE.MSG.MSG_SUBMITINGMSGTITL},msg));
		window.top.layer.load(1);
	};

	/**
	 * 隐藏载入的等待页面
	 */
	SCFUtils.hideLoading = function() {
		window.top.layer.closeAll('loading');
		// $.messager.loading('close');
	};

	/**
	 * 显示确认消息窗口
	 * 
	 * @param msg
	 * @param cb
	 */
	SCFUtils.confirm = function(msg, cb) {
		/*
		 * $.messager.confirm(LOCALE.TTL.TTL_CONFIRM, msg, function(r){ if(r){
		 * cb(); } });
		 */
		window.top.layer.confirm(msg, {
			icon : 3,
			title : LOCALE.TTL.TTL_CONFIRM
		}, function(index) {
			window.top.layer.close(index);
			if ($.isFunction(cb)) {
				cb();
			}
		});
	};

	/**
	 * 显示一个用户可以输入文本的并且带“确定”和“取消”按钮的消息窗体。<br>
	 * 参数： <br>
	 * msg：显示的消息文本。<br>
	 * formType:0：明文单行文本；<br>
	 * 1:密文单行文体；<br>
	 * 2:明文多行文本。 <br>
	 * fn(val): 在用户输入一个值参数的时候执行的回调函数。
	 */
	SCFUtils.prompt = function(msg, formType, fn) {
		/*
		 * $.messager.prompt('提示信息', msg, function(r){ if (r){ fn(r); } });
		 */
		window.top.layer.prompt({
			title : msg || "请输入：",
			formType : $.isFunction(formType) ? 0 : formType
		// prompt风格，支持0-2
		}, function(pass, index) {
			window.top.layer.close(index);
			if ($.isFunction(formType)) {
				formType(pass);
			} else if ($.isFunction(fn)) {
				fn(pass);
			}
		});
	};

	/**
	 * 共同ajax调用
	 * 
	 * @param config
	 *            是一个自定义对象属性有 config.data:提交参数信息 config.url:请交路径
	 *            config.reloadTable:要刷新的表格名称 config.showMask true|false
	 *            默认为true, 是否显示加载遮罩 config.callBackFun:回调函数 config.async :
	 *            true|false 默认为false，是同步模式，true 表示异步加载
	 */
	SCFUtils.ajax = function(config) {
		config.showMask = !SCFUtils.isEmpty(config.showMask) ? config.showMask : true;
		if (config.showMask == true || config.showMark == true) {
			SCFUtils.showLoading(config);
		}
		var btn = config.btn;
		if (config.url) {
			config.url += (config.url.indexOf("?") != -1 ? "&" : "?") + "_dc="
					+ $.now();
		} else {
			SCFUtils.error(LOCALE.MSG.MSG_CONFIG_ERROR_FOR_URL);
			if (!SCFUtils.isEmpty(btn)) {
				btn.stylebutton('enable');
			}
			if (config.showMask == true || config.showMark == true) {
				SCFUtils.hideLoading(config);
			}
			return;
		}
		
		var needEncodeStr = JSON.stringify(config.data||{});
//		var strReq = $.base64({data:needEncodeStr,type:0});

		var data={"_d":needEncodeStr};
		config.data = data;
		
		// $.extend(config.data,{sid:SCFUtils.SESSION_ID});
		$.ajax($.extend({
			async : config.async || false,
			cache : false,
			type : "POST",
			dataType : "text",
			timeout : 300000,
			url : "",
			data : {},
			success : function(data) {
				var needDecodeStr = data.replace(/[\r\n]/g,"");
//				var strData = $.base64({data:needDecodeStr,type:1,unicode:true});
				//console.log(strData);
				data = JSON.parse(needDecodeStr);
				
				// 如果失败显示失败信息
				if (!SCFUtils.isEmpty(data) && !SCFUtils.isEmpty(data.success)
						&& data.success == false) {

					if (!SCFUtils.isEmpty(data.message)) {
						SCFUtils.error(data.message, function() {
							if (!SCFUtils.isEmpty(btn)) {
								btn.stylebutton('enable');
							}
							if (data.level === -1) {
								$(window).unbind('beforeunload');
								$(window).unbind('unload');
//								window.location = SCFUtils.ROOTURL
//										+ "/main.jsp";
								if(window.top)
									window.top.location = SCFUtils.ROOTURL	+ "/main.jsp";
								else
									window.location = SCFUtils.ROOTURL	+ "/main.jsp";
							}
						});
					} else {
						SCFUtils.error("系统向后台发送请求失败！", function() {
							if (!SCFUtils.isEmpty(btn)) {
								btn.stylebutton('enable');
							}
						});
					}

					if (config.errorCallback && config.errorCallback !== null) {
						config.errorCallback(data);
					}

					if (config.showMask == true || config.showMark == true) {
						SCFUtils.hideLoading();
					}
					return;
				}
				var fn = function(data) {
					if (!SCFUtils.isEmpty(btn)) {
						btn.stylebutton('enable');
					}
				};
				if (config.callBackFun) {// 如果有回调函数
					fn = function(rs) {
						if (!SCFUtils.isEmpty(btn)) {
							btn.stylebutton('enable');
						}
						config.callBackFun(rs);
					};
				}
				// 如果包含信息
				if (!SCFUtils.isEmpty(data) && !SCFUtils.isEmpty(data.success)
						&& data.success == true) {
					if (config.showMsg && !SCFUtils.isEmpty(data.message)) {
						SCFUtils.success(data.message || '操作成功！', fn, data);
					} else {
						fn(data);
					}
				} else {
					fn(data);
				}
//				if (config.showMask == true || config.showMark == true) {
//					SCFUtils.hideLoading();
//				}
				if(typeof(SCFUtils) == "undefined"||$.isEmptyObject(SCFUtils)||(null === SCFUtils) || (SCFUtils === undefined)){
					
				}else{
					if(config.showMask == true || config.showMark == true){
						SCFUtils.hideLoading();
					}
				}
			},
			error : function(r, m, d) {// 请求失败处理函数
				if (config.errorCallback && config.errorCallback !== null) {
					config.errorCallback(r, m, d);
				} else {
					SCFUtils.ajaxError(r, m, d);
				}
				if (!SCFUtils.isEmpty(btn)) {
					btn.stylebutton('enable');
				}
			}
		}, config));
	};

	/**
	 * 日期格式化。
	 * 
	 * @param date
	 *            要格式化的日期
	 * @param format
	 *            格式 如：'yyyy-MM-dd'、'yyyy-MM-dd HH:mm:ss'
	 * @returns
	 */
	SCFUtils.dateFormat = function(olddate, format) {
		if (!olddate)
			return;
		if (olddate === "object")
			return;
		if (!format)
			format = "yyyy-MM-dd";
		var date = olddate;
		switch (typeof olddate) {
		case "string":
			date = new Date(Date.parse(olddate.replace(/T/g, " ").replace(/-/g,
					'/')));
			break;
		case "number":
			date = new Date(olddate);
			break;
		}
		if (!date instanceof Date)
			return;
		var dict = {
			"yyyy" : date.getFullYear(),
			"M" : date.getMonth() + 1,
			"d" : date.getDate(),
			"H" : date.getHours(),
			"m" : date.getMinutes(),
			"s" : date.getSeconds(),
			"MM" : ("" + (date.getMonth() + 101)).substr(1),
			"dd" : ("" + (date.getDate() + 100)).substr(1),
			"HH" : ("" + (date.getHours() + 100)).substr(1),
			"mm" : ("" + (date.getMinutes() + 100)).substr(1),
			"ss" : ("" + (date.getSeconds() + 100)).substr(1)
		};
		return format.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function() {
			return dict[arguments[0]];
		});
	};

	/**
	 * 计算指定天数后日期
	 * 
	 * @param date
	 *            当前日期
	 * @param days
	 *            指定的天数
	 * @returns {String} 指定天数后的日期
	 */
	SCFUtils.FormatDate = function(date, days) {

		date = date.replace(/-/g, "/");
		var nd = new Date(date);
		nd = nd.valueOf();
		nd = nd + days * 24 * 60 * 60 * 1000;
		nd = new Date(nd);

		var y = nd.getFullYear();
		var m = nd.getMonth() + 1;
		var d = nd.getDate();

		if (m <= 9)
			m = "0" + m;
		if (d <= 9)
			d = "0" + d;

		var cdate = y + "-" + m + "-" + d;

		return cdate;
	};

	/**
	 * 计算指两个日期差值
	 * 
	 * @param Bdate
	 *            前一日期，格式为“yyyy-MM-dd”
	 * @param Fdate
	 *            后一日期，格式为“yyyy-MM-dd”
	 * @returns
	 */
	SCFUtils.DateDiff = function(Bdate, Fdate) {
		var day = 24 * 60 * 60 * 1000;
		try {
			var dataArray = Bdate.split("-");
			var checkDate = new Date();
			checkDate.setFullYear(dataArray[0], dataArray[1] - 1, dataArray[2]);
			var checkTime = checkDate.getTime();

			var dateArray2 = Fdate.split("-");
			var checkDate2 = new Date();
			checkDate2.setFullYear(dateArray2[0], dateArray2[1] - 1,
					dateArray2[2]);
			var checkTime2 = checkDate2.getTime();

			var cha = (checkTime - checkTime2) / day;
			return Math.ceil(cha);
		} catch (e) {
			return false;
		}
	};

	/**
	 * 获取当前日期,格式为YYYY-MM-DD
	 */
	SCFUtils.getcurrentdate = function() {
		var curr_date = new Date();
		var month = (curr_date.getMonth() + 1);
		if (eval(month) < 10) {
			month = 0 + "" + month;
		}
		var day = curr_date.getDate();
		if (eval(day) < 10) {
			day = 0 + "" + day;
		}
		return curr_date.getFullYear() + "-" + month + "-" + day;
	};

	/**
	 * 浮点数的四则运算 var a = -40.051;var b = 2; SCFUtils.Math(a,b,'add') = -38.051;
	 * a+b SCFUtils.Math(a,b,'sub') = -42.051; a-b SCFUtils.Math(a,b,'mul') =
	 * -80.102; a*b SCFUtils.Math(a,b,'div') = -20.0255; a/b
	 * 
	 * @param arg1
	 *            数值1
	 * @param arg2
	 *            数值2
	 * @param operator
	 *            运算符 'add'|'sub'|'mul'|'div' 对应‘加减乘除’
	 * @returns 运算结果
	 */
	SCFUtils.Math = function(arg1, arg2, operator) {
		arg1 = SCFUtils.isEmpty(arg1) ? 0 : arg1;
		arg2 = SCFUtils.isEmpty(arg2) ? 0 : arg2;
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch (e) {
			r2 = 0;
		}
		if (SCFUtils.isEmpty(operator)) {
			return;
		}
		if ("add" === operator) {// 浮点数加法运算
			m = Math.pow(10, Math.max(r1, r2));
			return (arg1 * m + arg2 * m) / m;
		}
		if ("sub" === operator) {// 浮点数减法运算
			m = Math.pow(10, Math.max(r1, r2));
			// 动态控制精度长度
			n = (r1 >= r2) ? r1 : r2;
			return ((arg1 * m - arg2 * m) / m).toFixed(n);
		}
		if ("mul" === operator) {// 浮点数乘法运算
			m = 0, r1 = arg1.toString(), r2 = arg2.toString();
			try {
				m += r1.split(".")[1].length;
			} catch (e) {
			}
			try {
				m += r2.split(".")[1].length;
			} catch (e) {
			}
			return Number(r1.replace(".", "")) * Number(r2.replace(".", ""))
					/ Math.pow(10, m);
		}
		if ("div" === operator) {// 浮点数除法运算
			with (Math) {
				m = Number(arg1.toString().replace(".", ""));
				n = Number(arg2.toString().replace(".", ""));
				return (m / n) * pow(10, r2 - r1);
			}
		}
	};

	/**
	 * 设置表单保护
	 * 
	 * @param target
	 * @param readonly
	 */
	SCFUtils.setFormReadonly = function(target, readonly) {
		$(".input,.textarea,.combo,:text", target).each(function() {
			SCFUtils.setTextReadonly(this, readonly);
		});
		$(".easyui-textbox", target).each(function() {
			SCFUtils.setTextboxReadonly(this, readonly);
		});
		$(".easyui-datebox", target).each(function() {
			SCFUtils.setDateboxReadonly(this, readonly);
		});
		$(".easyui-linkbutton", target).each(function() {
			SCFUtils.setLinkbuttonReadonly(this, readonly);
		});
		$(".easyui-combobox", target).each(function() {
			SCFUtils.setComboReadonly(this, readonly);
		});
		/* @author YHY @date 2015-7-4 @ref SCF-NO-00003 add_S */
		$(".easyui-combotree", target).each(function() {
			SCFUtils.setComboTreeReadonly(this, readonly);
		});
		/* @author YHY @date 2015-7-4 @ref SCF-NO-00003 add_E */
		$(".easyui-numberspinner", target).each(function() {
			SCFUtils.setNumberspinnerReadonly(this, readonly);
		});
		$(".easyui-numberbox", target).each(function() {
			SCFUtils.setNumberboxReadonly(this, readonly);
		});
		$(".easyui-tree", target).each(function() {
			SCFUtils.setTreeReadonly(this, readonly);
		});
	};

	/**
	 * 设置linkbutton控件只读
	 * 
	 * @param jq
	 * @param readonly
	 *            true||false
	 */
	SCFUtils.setLinkbuttonReadonly = function(jq, readonly) {
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		if (readonly) {
			target.linkbutton('disable');
		} else {
			target.linkbutton('enable');
		}
	};

	/**
	 * 设置tree控件只读
	 * 
	 * @param jq
	 * @param readonly
	 *            true||false
	 */
	SCFUtils.setTreeReadonly = function(jq, readonly) {
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		target.tree({
			onLoadSuccess : function() {
				$(this).find('span.tree-checkbox').unbind().click(function() {
					return !readonly;
				});
			}
		});
	};

	/**
	 * 设置文本控件只读
	 * 
	 * @param jq
	 * @param readonly
	 *            true||false
	 */
	SCFUtils.setTextReadonly = function(jq, readonly) {
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		var sId = target.attr('id') + "_succeed";
		if ($('#' + sId).length > 0) {
			$('#' + sId).removeClass('succeed');
		}
		if (readonly) {
			target.attr("readonly", true).addClass("l-textbox-readonly");
		} else {
			target.removeAttr("readonly").removeClass("l-textbox-readonly");
		}
	};

	/**
	 * 设置combobox 只读
	 * 
	 * @param jq
	 * @param readonly
	 *            true||false
	 */
	SCFUtils.setComboReadonly = function(jq, readonly) {
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		if (readonly) {
			target.combo('readonly', true);
			var textbox = target.combobox('textbox');// 此对象必须在设置是否只读后获取
			textbox.attr("readonly", true).addClass("l-textbox-readonly");
			textbox.parent().attr("readonly", true).addClass(
					"l-textbox-readonly");
		} else {
			target.combo('readonly', false);
			var textbox = target.combobox('textbox');
			textbox.removeAttr("readonly").removeClass("l-textbox-readonly");
			textbox.parent().removeAttr("readonly").removeClass(
					"l-textbox-readonly");
			textbox.parent().removeClass("textbox-combo-readonly");
		}
	};
	/* @author YHY @date 2015-7-4 @ref SCF-NO-00003 add_S */
	/**
	 * 设置combotree 只读
	 * 
	 * @param jq
	 * @param readonly
	 *            true||false
	 */
	SCFUtils.setComboTreeReadonly = function(jq, readonly) {
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		if (readonly) {
			target.combo('readonly', true);
			var textbox = target.combotree('textbox');// 此对象必须在设置是否只读后获取
			textbox.attr("readonly", true).addClass("l-textbox-readonly");
			textbox.parent().attr("readonly", true).addClass(
					"l-textbox-readonly");
		} else {
			target.combo('readonly', false);
			var textbox = target.combotree('textbox');
			textbox.removeAttr("readonly").removeClass("l-textbox-readonly");
			textbox.parent().removeAttr("readonly").removeClass(
					"l-textbox-readonly");
			textbox.parent().removeClass("textbox-combo-readonly");
		}
	};
	/* @author YHY @date 2015-7-4 @ref SCF-NO-00003 add_E */
	/**
	 * 设置textbox 只读
	 * 
	 * @param jq
	 * @param readonly
	 *            true||false
	 */
	SCFUtils.setTextboxReadonly = function(jq, readonly) {
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		if (readonly) {
			target.textbox("readonly", true);
			var textbox = target.textbox('textbox');// 此对象必须在设置是否只读后获取
			textbox.attr("readonly", true).addClass("l-textbox-readonly");
			textbox.parent().attr("readonly", true).addClass(
					"l-textbox-readonly");
		} else {
			target.textbox("readonly", false);
			var textbox = target.textbox('textbox');
			textbox.removeAttr("readonly").removeClass("l-textbox-readonly");
			textbox.parent().removeAttr("readonly").removeClass(
					"l-textbox-readonly");
			textbox.parent().removeClass("textbox-combo-readonly");
		}
	};

	/**
	 * 设置datebox 只读
	 * 
	 * @param jq
	 * @param readonly
	 *            true||false
	 */
	SCFUtils.setDateboxReadonly = function(jq, readonly) {
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		if (readonly) {
			target.combo('readonly', true);
			var textbox = target.datebox('textbox');// 此对象必须在设置是否只读后获取
			textbox.attr("readonly", true).addClass("l-textbox-readonly");
			textbox.parent().attr("readonly", true).addClass(
					"l-textbox-readonly");
		} else {
			target.combo('readonly', false);
			var textbox = target.combobox('textbox');
			textbox.removeAttr("readonly").removeClass("l-textbox-readonly");
			textbox.parent().removeAttr("readonly").removeClass(
					"l-textbox-readonly");
			textbox.parent().removeClass("textbox-combo-readonly");
		}
	};

	/**
	 * 设置numberspinner 只读
	 * 
	 * @param jq
	 * @param readonly
	 *            true||false
	 */
	SCFUtils.setNumberspinnerReadonly = function(jq, readonly) {
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		if (readonly) {
			target.spinner('readonly', true);
			var textbox = target.numberbox('textbox');// 此对象必须在设置是否只读后获取
			textbox.attr("readonly", true).addClass("l-textbox-readonly");
			textbox.parent().attr("readonly", true).addClass(
					"l-textbox-readonly");
		} else {
			target.spinner('readonly', false);
			var textbox = target.numberbox('textbox');
			textbox.removeAttr("readonly").removeClass("l-textbox-readonly");
			textbox.parent().removeAttr("readonly").removeClass(
					"l-textbox-readonly");
			textbox.parent().removeClass("textbox-combo-readonly");
		}
	};

	/**
	 * 设置numberbox 只读
	 * 
	 * @param jq
	 * @param readonly
	 *            true||false
	 */
	SCFUtils.setNumberboxReadonly = function(jq, readonly) {
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		if (readonly) {
			target.attr("readonly", true);
			var textbox = target.numberbox('textbox');// 此对象必须在设置是否只读后获取
			textbox.attr("readonly", true).addClass("l-textbox-readonly");
			textbox.parent().attr("readonly", true).addClass(
					"l-textbox-readonly");
		} else {
			target.removeAttr("readonly");
			var textbox = target.numberbox('textbox');
			textbox.removeAttr("readonly").removeClass("l-textbox-readonly");
			textbox.parent().removeAttr("readonly").removeClass(
					"l-textbox-readonly");
		}
	};

	/**
	 * 表格只读，必须在数据加载后调用。
	 * 
	 * @param jq
	 * @param readonly
	 *            true||false
	 */
	SCFUtils.setDatagridReadonly = function(jq, readonly) {
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		var panel = target.datagrid('getPanel');
		var trRows = panel.find('tr[datagrid-row-index]');
		var rows = panel.find('div.datagrid-cell-check input[type!=checkbox]');
		if (readonly) {
			$('.datagrid-header-check>input', panel).attr('disabled',
					'disabled');
			$("input[type='checkbox']", panel).attr('disabled', 'disabled');
			trRows.unbind('click').bind('click', function(e) {
				return false;
			});
			rows.find('div.datagrid-cell-check input[type=checkbox]').unbind()
					.bind(
							'click',
							function(e) {
								var index = $(this).parent().parent().parent()
										.attr('datagrid-row-index');
								if ($(this).attr('checked')) {
									target.datagrid('selectRow', index);
								} else {
									target.datagrid('unselectRow', index);
								}
								e.stopPropagation();
							});
		} else {
			$('.datagrid-header-check>input', panel).removeAttr('disabled',
					'disabled');
			$("input[type='checkbox']", panel).removeAttr('disabled',
					'disabled');
			trRows.unbind('click');
			rows.find('div.datagrid-cell-check input[type=checkbox]').unbind(
					'click',
					function(e) {
						var index = $(this).parent().parent().parent().attr(
								'datagrid-row-index');
						if ($(this).attr('checked')) {
							target.datagrid('unselectRow', index);
						} else {
							target.datagrid('selectRow', index);
						}
						e.stopPropagation();
					});
		}
	};

	/**
	 * 表格指定行只读，必须在数据加载后调用。
	 * 
	 * @param jq
	 *            表格id
	 * @param i
	 *            指定行索引
	 * @param readonly
	 *            true||false
	 * @param fn
	 *            只读时点击行触发的回调函数
	 */
	SCFUtils.setDatagridRowReadonly = function(jq, i, readonly, fn) {
		var dg = typeof jq == 'string' ? $('#' + jq) : $(jq);
		var opts = dg.datagrid('options');
		var tr = opts.finder.getTr(dg[0], i);
		if (readonly) {
			tr.removeClass("datagrid-row-selected").removeClass(
					"datagrid-row-checked").find(
					"div.datagrid-cell-check input[type=checkbox]")._propAttr(
					"checked", false).attr('disabled', 'disabled').end()
					.unbind('click').bind('click', function(e) {
						if ($.isFunction(fn)) {
							fn();
						}
						;
						return false;
					});
		} else {
			tr.find("div.datagrid-cell-check input[type=checkbox]").removeAttr(
					'disabled', 'disabled').end().unbind('click').bind('click',
					function(e) {
						if ($(this).attr('checked')) {
							dg.datagrid('unselectRow', i);
						} else {
							dg.datagrid('selectRow', i);
						}
						e.stopPropagation();
					});
		}
	};

	/**
	 * form表单数据加载
	 * 
	 * @param formId
	 *            要加载的表单ID
	 * @param data
	 *            加载的json数据
	 */
	SCFUtils.loadForm = function(formId, data) {
		var f = '#' + formId;
		if ('DELETE' === SCFUtils.OPTSTATUS
				|| 'PARADELETE' === SCFUtils.OPTSTATUS
				|| 'VIEW' === SCFUtils.OPTSTATUS || "RS" === SCFUtils.OPTSTATUS) {
			SCFUtils.setFormReadonly(f, true);
		}
		if ('RE' === SCFUtils.FUNCTYPE) {
			SCFUtils.setFormReadonly(f, true);
		}
		if ('DP' === SCFUtils.FUNCTYPE) {
			SCFUtils.setFormReadonly(f, true);
		}
		$(f).form('load', data.obj || data);
	};

	SCFUtils.showWindow = function(options) {
		$.showWindow({
			title : options.title,
			useiframe : true,
			modal : options.modal || true,
			width : options.width || '70%',
			height : options.height || '80%',
			minimizable : false,
			maximizable : false,
			collapsible : false,
			content : options.url,
			data : $.extend(options.data, {
				'callback' : options.onSuccess
			}),
			buttons : options.buttons || [ {
				text : '保存',
				handler : 'doSave' // 此方法在page/trxtest.html中
			}, {
				text : '取消',
				handler : function(win) {
					win.close();
				}
			} ],
			onLoad : function(win, content) {
				if (content && content.pageLoad) {
					if(content.window.$('input.combo').length>0){
						content.window.$('input.combo')[0].focus();
					}
					content.pageLoad(win);
				}
			}
		});
	};

	SCFUtils.getData = function(options) {
		var config = {};
		config.url = SCFUtils.AJAXURL;
		config.data = $.extend(options.data, {
			'getdataId' : options.reqid
		});
		config.async = options.async || false;
		config.callBackFun = function(data) {
			if (data.success === true) {
				if (!SCFUtils.isEmpty(data.obj)
						&& $.isFunction(options.onSuccess)) {
					options.onSuccess(data.obj);
				} else if (data.rows && !SCFUtils.isEmpty(data.rows)
						&& $.isFunction(options.onSuccess)) {
					options.onSuccess(data.rows);
				} else if (data.pageInfo) {
					var configs = {
						title : options.title,
						modal : true,
						width : options.width || '70%',
						height : options.height || '80%',
						url : 'url:' + data.pageInfo.url,
						data : $.extend(options.data, {
							'queryId' : data.pageInfo.queryId
						}),
						onSuccess : options.onSuccess,
						buttons : options.buttons
					};
					SCFUtils.showWindow(configs);
				} else if ($.isFunction(options.onSuccess)) {
					options.onSuccess();
				}
			} else {
				SCFUtils.error("Get Data 返回错误！" + data.message);
			}
		};
		SCFUtils.ajax(config);
	};

	SCFUtils.getRefNo = function(options) {
		if (options.force
				|| 'ADD' === SCFUtils.OPTSTATUS
				&& ('PM' === SCFUtils.FUNCTYPE || 'MA' === SCFUtils.FUNCTYPE
						|| 'MM' === SCFUtils.FUNCTYPE || 'PA' === SCFUtils.FUNCTYPE|| 'FP' === SCFUtils.FUNCTYPE)) {
			var config = {};
			config.reqid = 'I_S_000001';
			config.data = options.data;
			config.onSuccess = function(data) {
				if (options.onSuccess && $.isFunction(options.onSuccess)) {
					options.onSuccess(data);
				} else {
					$.each(data, function(i, obj) {
						for ( var item in obj) {
							$('#' + item).val(obj[item]);
							SCFUtils.setTextReadonly(item, true);
						}
					});
				}
			};

			SCFUtils.getData(config);
		}
	};

	/**
	 * 方法名：SCFUtils.closeWin 方法说明：关闭指定编号的窗口，包括弹出窗口
	 */
	SCFUtils.closeWin = function(winid) {
		$(winid).dialog('close');
		$(winid).dialog('destroy');
	};

	/**
	 * 文件上传导入
	 * 
	 * @param param
	 */
	SCFUtils.upload = function(param) {
		var options = {};
		options.url = SCFUtils.AJAXURL;
		options.data = {
			'getdataId' : 'I_P_000005',
			'cacheType' : 'non'
		};
		options.async = false;
		options.callBackFun = function(data) {
			if (data.success === true && data.pageInfo) {
				var configs = {
					title : '导入',
					modal : true,
					width : '440',
					height : '180',
					url : data.pageInfo.url,
					data : options.data,
					buttons : [
							{
								text : '确定',
								weight : 'thin',
								handler : function() {
									var fileName = $("#dialogupload_file")
											.val();
									if (SCFUtils.isEmpty(fileName)) {
										SCFUtils.alert("请选择模板");
										return false;
									}

									SCFUtils.showLoading();
									var validateResult = "";
									if ($.isFunction(param.validate)) {
										validateResult = param.validate(
												param.data, fileName);
									}
									if (!SCFUtils.isEmpty(validateResult)) {
										SCFUtils.hideLoading();
										SCFUtils
												.closeWin('#uploadformDialogdd');
										SCFUtils.error("Validate error:"
												+ validateResult);
										return;
									}
									$
											.ajaxFileUpload({
												url : SCFUtils.ROOTURL+'/upload',
												secureuri : false,
												fileElementId : 'dialogupload_file',
												dataType : 'json',
												data : param.data,
												success : function(data) {
													SCFUtils.hideLoading();
													if (!data.success) {
														SCFUtils
																.error(data.message);
														return;
													}
													if (param.callBackFun) {
														try {
															param
																	.callBackFun(data);
														} catch (e) {
															SCFUtils
																	.error("上传数据前端回调时出错");
															return;
														}
													}
													SCFUtils
															.success(
																	data.message,
																	function() {
																		SCFUtils
																				.closeWin('#uploadformDialogdd');
																	});
												},
												error : function() {
													SCFUtils.hideLoading();
													SCFUtils.error("上传服务器时出错。");
												}
											});
								}
							}, {
								text : '取消',
								weight : 'thin',
								style : 'gry',
								handler : function() {
									SCFUtils.closeWin('#uploadformDialogdd');
								}
							} ]
				};
				$("body").append('<div id="uploadformDialogdd"></div>');
				SCFUtils.openDialog("uploadformDialogdd", configs);
			} else {
				SCFUtils.error("Get Data 返回错误！" + data.message);
			}
		};
		SCFUtils.ajax(options);
	};

	SCFUtils.preView = function(param) {
		var data = '';
		$.extend(param, {
			operateType : 'show'
		});
//		 data =
//		 'toolbar=no,menubar=no,resizable=no,location=no,status=no,alwaysRaised=no';
//		 var p = SCFUtils.json2str(param);
//		 p = encodeURI(encodeURI(p));
		window.open("report?operateType=show", '报文预览', data);
	};

	/**
	 * datagrid 加载本地数据分页显示。
	 * 
	 * @param grid
	 *            datagrid的ID
	 * @param data
	 *            要加载的数据，格式为：[{id:"1",name:"lilei"},{},{}]
	 * @param flag1
	 *            true||false 是否保护表格数据
	 * @param flag2
	 *            true||false 是否移除旧数据
	 */
	SCFUtils.loadGridData = function(grid, data, flag1, flag2) {
		var dg = $('#' + grid);
		if (!SCFUtils.isEmpty(data) && !SCFUtils.isEmpty(data[0])
				&& data[0] != '0') {
			var localData = data.concat();
			if (!flag2) {
				var oldData = dg.datagrid('getAllData');
				if (oldData.total != 0) {
					localData = localData.concat(oldData.rows);
				}
			}
			// dg.datagrid("loadData", data);
			dg.datagrid("loadAllData", localData);
			var opts = dg.datagrid('options');
			var pager = dg.datagrid("getPager");
			if (!SCFUtils.isEmpty(localData)) {
				if (opts.pagination) {// 如果分页
					var newData = localData.slice(opts.pageNumber - 1,
							opts.pageSize);
					loadData(dg, newData, flag1);
					pager
							.pagination({
								total : localData.length,
								onSelectPage : function(pageNumber, pageSize) {
									var data = dg.datagrid('getAllData').rows;
									var opts = dg.datagrid('options');
									// 选中的行 ck =true;
									opts.finder
											.getTr(dg[0], "", "selected", 2)
											.each(
													function() {
														var rowIndex = (typeof $(this) == "object") ? $(
																this)
																.attr(
																		"datagrid-row-index")
																: $(this);
														var row = $.data(dg[0],
																"datagrid").data.rows[parseInt(rowIndex)];
														var index = dg
																.datagrid(
																		'getAllRowIndex',
																		row);
														data[index].ck = true;
													});

									var start = (pageNumber - 1) * pageSize;
									var end = start + pageSize;
									var newData = data.slice(start, end);
									loadData(dg, newData, flag1);
									pager.pagination('refresh', {
										total : data.length,
										pageNumber : pageNumber
									});
								}
							});
				} else {// 不分页
					loadData(dg, localData, flag1);
				}
			}
		} else {
			dg.datagrid("loadData", data);
		}
	};

	function loadData(dg, data, flag) {
		dg.datagrid("loadData", data);
		$.each(data, function(i, n) {
			if (n.ck) {
				SCFUtils.addCheckClassToGrid(dg, i);
			} else {
				SCFUtils.removeCheckClassToGrid(dg, i);
			}
		});
		if (flag === true) {
			SCFUtils.setDatagridReadonly(dg, flag);
		}
	}

	/**
	 * 此方法为给datagrid手动增加选中样式，不触发选中事件。
	 * 
	 * @param dg
	 *            :$('#id');
	 * @param i
	 *            :增加样式的索引;
	 */
	SCFUtils.addCheckClassToGrid = function(dg, i) {
		var opts = dg.datagrid('options');
		var tr = opts.finder.getTr(dg[0], i).addClass("datagrid-row-selected")
				.addClass("datagrid-row-checked").find(
						"div.datagrid-cell-check input[type=checkbox]")
				._propAttr("checked", true);
		tr = opts.finder.getTr(dg[0], "", "checked", 2);
		if (tr.length == opts.finder.getRows(dg[0]).length) {
			var dc = $.data(dg[0], "datagrid").dc;
			dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr(
					"checked", true);
		}
	};

	SCFUtils.removeCheckClassToGrid = function(dg, i) {
		var opts = dg.datagrid('options');
		// var tr =
		opts.finder.getTr(dg[0], i).removeClass("datagrid-row-selected")
				.removeClass("datagrid-row-checked").find(
						"div.datagrid-cell-check input[type=checkbox]")
				._propAttr("checked", false);
		// tr=opts.finder.getTr(dg[0],"","checked",2);
		// if(tr.length==opts.finder.getRows(dg[0]).length){
		var dc = $.data(dg[0], "datagrid").dc;
		dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr(
				"checked", false);
		// }
	};

	SCFUtils.addFunToBar = function(menuText) {
		var toolBar = parent.$('#pageNavigation');
		toolBar.empty();
		if (menuText && !SCFUtils.isEmpty(menuText)) {
			var prePath="";//代表具体某个底层菜单之前的树形菜单
			var menuPath="";//代表某个具体的底层菜单
			var arr = menuText.split(">");//arr直接为一个数组
			$.each(arr,function(i,u){//循环每个arr
				if(i!=arr.length-1){//不是最后一个，即是prePath的
					prePath = prePath+u+">";
				}
				else{//最后一个
					menuPath=u;
				}
			});
//			toolBar.html("<b class='pageNav'>您当前的位置：" + menuText + "</b>");
			toolBar.html("<div class='pageNav'>您当前的位置：" + prePath +"<div class='pageMenu'>"+menuPath+"</div></div>");
		}
		if (SCFUtils.isEmpty(menuText)) {
			toolBar.parent().hide();
		} else {
			toolBar.parent().show();
		}
		// $("<b class='words'>"+menuText+"</b>").appendTo(toolBar);
	};

	SCFUtils.parseGridData = function(data) {
		var total = data._total_rows;
		if (parseInt(total) === 0) {
			return [];
		}
		var retList = new Array(total);
		for (var i = 0; i < total; i++) {
			var key = "rows" + i;
			retList[i] = data[key];
		}
		return retList;
	};

	SCFUtils.loadJs = function(url, callback) {
		var done = false;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.language = 'javascript';
		script.src = url;
		script.onload = script.onreadystatechange = function() {
			if (!done
					&& (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {
				done = true;
				script.onload = script.onreadystatechange = null;
				if (callback) {
					callback.call(script);
				}
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	};

	SCFUtils.isHoliday = function(holiday) {
		var flag = false;
		var options = {
				url : SCFUtils.AJAXURL,
				data :{
					queryId : 'Q_P_000298',
					funcName :'isHoliday',
					holiday:holiday
				},
				callBackFun : function(data) {
					flag = data.obj;
				}
			};
			SCFUtils.ajax(options);
			return flag;
	};
	
	SCFUtils.isWorkingday = function(workingDate) {
		var flag = false;
		var options = {
				url : SCFUtils.AJAXURL,
				data :{
					queryId : 'Q_P_000298',
					funcName :'isWorkingday',
					workingDate:workingDate
				},
				callBackFun : function(data) {
					flag = data.obj;
				}
			};
			SCFUtils.ajax(options);
			return flag;
	};
	
	SCFUtils.getAfterWorkingDate = function(currentDate,days) {
		var date = null;
		var options = {
				url : SCFUtils.AJAXURL,
				data :{
					queryId : 'Q_P_000298',
					funcName :'getAfterWorkingDate',
					currentDate:currentDate,
					days:days
					
				},
				callBackFun : function(data) {
					date = data.obj;
				}
			};
			SCFUtils.ajax(options);
			return date;
	};
	
	SCFUtils.getBeforeWorkingDate = function(currentDate,days) {
		var date = null;
		var options = {
				url : SCFUtils.AJAXURL,
				data :{
					queryId : 'Q_P_000298',
					funcName :'getBeforeWorkingDate',
					currentDate:currentDate,
					days:days
				},
				callBackFun : function(data) {
					date = data.obj;
				}
			};
			SCFUtils.ajax(options);
			return date;
	};
	
	SCFUtils.getWorkingDays = function(fromDate,toDate) {
		var days = 0;
		var options = {
				url : SCFUtils.AJAXURL,
				data :{
					queryId : 'Q_P_000298',
					funcName :'getWorkingDays',
					fromDate :fromDate,
					toDate :toDate
				},
				callBackFun : function(data) {
					days = data.obj;
				}
			};
			SCFUtils.ajax(options);
			return days;
	};
/**
 * 日历控件，将今天之前的日期全部置灰
 * @param dateId 需要控制的日期字段名
 */
	SCFUtils.controlDate = function(dateId) {
		var now = SCFUtils.getcurrentdate();
		$('#'+dateId).datebox().datebox('calendar').calendar(
				{
					validator : function(date) {
						date=SCFUtils.dateFormat(date, 'yyyy-MM-dd');
						var re=SCFUtils.DateDiff(date,now);
						return re>= 0 ;
					}
				});
	};
	
	/**
	 * 列表刷新，在删除列表数据时重新加载列表数据
	 * @param tableName 控制的列表名
	 */
	SCFUtils.refreshAllRows = function(tableName){
		var griddata = SCFUtils.getGridData(tableName,false);
		var gdata = griddata;
		$.each(griddata,function(i,obj){
			if(i!='_total_rows'){
				var index = $('#'+tableName).datagrid('getAllRowIndex',obj.sysRefNo);
				 $('#'+tableName).datagrid('deleteRow',index);
			}
		});
		SCFUtils.loadGridData(tableName,SCFUtils.parseGridData(gdata), false);
	}
	
	
	/**
	 * 给catalog中的时间框和下拉框增加placeholder属性
	 * new on 2016.08.16 by JinJH
	 * @param target  整个form控件id
	 */
	SCFUtils.setFormPlaceholder = function(target) {
//		$(".input,.textarea,.combo,:text", target).each(function() {
//			SCFUtils.setTextPlaceholder(this);
//		});
//		$(".easyui-textbox", target).each(function() {
//			SCFUtils.setTextboxPlaceholder(this);
//		});
		$(".easyui-datebox", target).each(function() {//找到target中的所有包括easyui-datebox类的元素，each每个执行function
			SCFUtils.setDateboxPlaceholder(this);
		});
//		$(".easyui-linkbutton", target).each(function() {
//			SCFUtils.setLinkbuttonPlaceholder(this);
//		});
		$(".easyui-combobox", target).each(function() {
			SCFUtils.setComboPlaceholder(this);
		});
//		/* @author YHY @date 2015-7-4 @ref SCF-NO-00003 add_S */
//		$(".easyui-combotree", target).each(function() {
//			SCFUtils.setComboTreePlaceholder(this);
//		});
//		/* @author YHY @date 2015-7-4 @ref SCF-NO-00003 add_E */
//		$(".easyui-numberspinner", target).each(function() {
//			SCFUtils.setNumberspinnerPlaceholder(this);
//		});
//		$(".easyui-numberbox", target).each(function() {
//			SCFUtils.setNumberboxPlaceholder(this);
//		});
//		$(".easyui-tree", target).each(function() {
//			SCFUtils.setTreePlaceholder(this);
//		});
	};
	SCFUtils.setDateboxPlaceholder=function(jq){
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		var placeholder=target.attr("placeholder");
			var textbox = target.datebox('textbox');
			textbox.attr("placeholder", placeholder);
	}
	SCFUtils.setComboPlaceholder=function(jq){
		var target = typeof jq == 'string' ? $('#' + jq) : $(jq);
		var placeholder=target.attr("placeholder");
			var textbox = target.combobox('textbox');//获取combobox底下真正输入显示的textbox控件
			textbox.attr("placeholder",placeholder);
    };

    
    /*
     * 循环整个form表单里的element元素
     */
    SCFUtils.eachElement = function(form) {
		var requiredElement = new Array($("input[required='true']","#"+form));
		$.each(requiredElement,function(i,n){
			if(n.val()!=null || n.val()!=""){//非空，去掉后红色字体
				n.removeClass('validatebox-invalid');
				n.parent().removeClass('requried-item-ifo');
			}
		});
    }
    
    // 获取当前客户端浏览器类型
	// ie mo sa op cr unknown
	SCFUtils.getBrowserType = function() {
		var bro = $.browser;
		return bro.type;
	};
	
	// 获取当前客户端浏览器类型
	//
	SCFUtils.getBrowserVersion = function() {
		var bro = $.browser;
		var version = bro.version;
		version = version.replace(/\s+/g,"");
		return version.split(".")[0];
	};
	
	/**
	 * 替换IE9时的placeholder属性
	 */
	SCFUtils.repalcePH = function() {
		  // 如果不支持placeholder，用jQuery来完成
		  if(!isSupportPlaceholder()) {
		    // 遍历所有input对象, 除了密码框
		    $('input').not("input[type='hidden']").each(
		      function() {
		        var self = $(this);
		        var val = self.attr("placeholder");
		        self.css('color','#c1b1a9');
		        input(self, val);
		      }
		    );
		    
		    /**//* 对password框的特殊处理
		     * 1.创建一个text框 
		     * 2.获取焦点和失去焦点的时候切换
		     */
		    $('input[type="password"]').each(
		      function() {
		        var pwdField    = $(this);  
		        var pwdVal      = pwdField.attr('placeholder');  
		        var pwdId       = pwdField.attr('id');  
		        // 重命名该input的id为原id后跟1
		        pwdField.after('<input id="' + pwdId +'1" type="text" value='+pwdVal+' autocomplete="off" />');  
		        var pwdPlaceholder = $('#' + pwdId + '1');  
		        pwdPlaceholder.show();  
		        pwdField.hide();  
		          
		        pwdPlaceholder.focus(function(){  
		          pwdPlaceholder.hide();  
		          pwdField.show();  
		          pwdField.focus();  
		        });  
		          
		        pwdField.blur(function(){  
		          if(pwdField.val() == '') {  
		            pwdPlaceholder.show();  
		            pwdField.hide();  
		          }  
		        });  
		      }
		    );
		  }
		}

		// 判断浏览器是否支持placeholder属性
		function isSupportPlaceholder() {
		  var input = document.createElement('input');
		  return 'placeholder' in input;
		}
		function changeGray($input,$this,val){
			$($this).css('color','black');
			if ($input.val() == val) {
		    	//$($this).css('color','#c1b1a9')
		      $($this).attr({value:""});
		      $($this).val('');
		    }else{
		    	$($this).css('color','black');
		    }
		}
		// jQuery替换placeholder的处理
		function input(obj, val) {
		  var $input = obj;
		  var val = val;
		  $input.attr({value:val});
		  $input.val(val);
		  $input.css('color','#c1b1a9')
		  $input.focus(function() {
			  changeGray($input,this,val)
		  }).blur(function() {
		    if ($input.val() == "") {
		    		$(this).css('color','#c1b1a9')
		            $(this).attr({value:val});
		            $(this).val(val);
		    }else{
		    	$(this).css('color','black');
		    }
		  });
		}



})(jQuery);

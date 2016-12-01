/*******************************************************************************
 * @requires jquery, EasyUI 1.2.6+
 * 
 * 此方法是对 EasyUI 的扩展 可以实现如下功能： Array.prototype.del:增加数组的通过下标删除功能。</br>
 * datagrid的方法：</br> getAllData: loadAllData: appendRow: deleteRow:
 * @author hyy
 * @date 2014.12.18
 * 
 ******************************************************************************/
(function($) {
	/**
	 * 增加数组的通过下标删除功能
	 * @param n
	 * @returns
	 */
	Array.prototype.del = function(n) {
		if (n < 0)
			return this;
		else
			return this.slice(0, n).concat(this.slice(n + 1, this.length));
	};
	
	/**
	 * 重写toFixed方法，解决尾数为5时“四舍五入”不准确的问题。 
	 *//*
	Number.prototype.toFixed = function(len){
		var tempNum=0,s,temp,num,index,m = 0;
		var r1 = this.toString();
		//截取小数点后，判断尾数是否大于等于5，如大于等于5则入1
		if(r1.substr(r1.indexOf(".")+len+1,1)>=5){
			tempNum=1;
		}
		//计算10的len次方，把原来的数据字扩大到它要保留的小数位数的倍数
		temp = Math.pow(10,len);
		//求最接近this*temp的最小数字
		//floor()方法为向下取整计算，返回的是小于或等于参数，并与之最接近的整数
		if(r1.indexOf(".")>0){
			m += r1.split(".")[1].length;
		}
		//浮点数乘除都会有bug，故先转成整数进行乘除
		s= Math.floor(Number(r1.replace(".", ""))*temp/Math.pow(10, m))+tempNum;
		num = (s/temp).toString();
		//处理末尾为0时自动舍弃的问题
		if(num.indexOf(".")<0){
			num = num+".";
		}
		index = num.length-num.indexOf(".");
		for(var i=0;i<(len-index)+1;i++){
			num = num+"0";
		}		
		return num;
	};
*/
	
	/**
	 * toFixed 方法的改进 
	 * @param {int} n
	 * @returns {Number.prototype.toFixed}
	 */
	Number.prototype.toFixed = function(n) {
	    if (n > 20 || n < 0) {
	        throw new RangeError('toFixed() digits argument must be between 0 and 20');
	    }
	 
	    var number = this;
	     
	    if (isNaN(number) || number >= Math.pow(10, 21)) {
	        return number.toString();
	    }
	    if (typeof(n) == 'undefined' || n == 0) {
	        return (Math.round(number)).toString();
	    }
	 
	    var result = number.toString();
	    var pre = '+';
	    if (result.charAt(0) == '-') {
	    	result = result.substr(1); 
	    	pre = '-';
		}
	    var arr = result.split('.');
	 
	    // 整数的情况
	    if (arr.length < 2) {
	        result += '.';
	        for (var i = 0; i < n; i++) {
	            result += '0';
	        }
	        if(pre=='-'){
		    	result = pre+result;
		    }
	        return result;
	    }
	 
	    var integer = arr[0];
	    var decimal = arr[1];
	    if (decimal.length == n) {
	    	 if(pre=='-'){
	 	    	result = pre+result;
	 	    }
	        return result;
	    }
	    if (decimal.length < n) {
	        for (var i = 0; i < n - decimal.length; i++) {
	            result += '0';
	        }
	        if(pre=='-'){
		    	result = pre+result;
		    }
	        return result;
	    }
	    result = integer + '.' + decimal.substr(0, n);
	 
	    var last = decimal.substr(n, 1);
	 
	    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
	    if (parseInt(last) >= 5) {
	        var x = Math.pow(10, n);
	        result = Math.round((parseFloat(result) * x + 1)) / x;
	        result = result.toFixed(n);
	    }
	    
	    if(pre=='-'){
	    	result = pre+result;
	    }
	    return result;
	 
	};
	
	/**
	 * 短信验证码
	 */
	$.fn.validatebox.countDown = 59;
	$.fn.validatebox.TIMESPAN = 59;
	
	$.extend($.fn.validatebox.defaults,{
		onBeforeValidate:function(){
			var me = this;
			var div = $('<div class="fl item-ifo"></div>');
			if($(me).hasClass('easyui-mobPhonecode')&& $('#bsendMobileCode').length==0){
				var a=$('<a class="btn" id="bsendMobileCode"></a>');
				var span =$('<span id="bdyMobileButton">获取短信验证码</span>');
				var a_error = $('<label id="bsendMobileCode_error" class="null"></label>');
				var div2 = $('<div class="verify"></div>');
				var div3 = $('<div class="verifyDiv"></div>');
				$(me).parent().after(div.append(a.append(span)));
//				a.after(a_error);
				var options = $.data(me,'validatebox').options;
				var mobPhoneId = options.mobPhoneId;//必须有手机号ID
				var sysRefId = options.sysRefNo;
				mobPhoneId = /^#/.test(mobPhoneId)? mobPhoneId:'#'+mobPhoneId;			
				a.unbind().bind('click',function(){
					if(!$(mobPhoneId).validatebox({
						required:true
					}).validatebox('isValid')){															
						$(mobPhoneId+'_error').addClass('error').removeClass('null').text('请输入正确的手机号');						
					}else{
						var mobPhone = $(mobPhoneId).val();	//必须有手机值				
						var sysRefNo =$('#'+sysRefId).val(); 
						var opt={
								mobPhone:mobPhone,
								sysRefNo:sysRefNo
							};
						getMobileCode(me,a,span,a_error,opt,div2,div3);
					}
				}).hover(function(){
					$(this).addClass('hover');
				},function(){
					$(this).removeClass('hover');
				});
			}else if($(me).hasClass('easyui-emailcode')&& $('#bsendEmailCode').length==0){
				var b=$('<a class="btn" id="bsendEmailCode"></a>');
				var span =$('<span id="bdyEmailButton">获取邮箱验证码</span>');
				var b_error = $('<label id="bsendEmailCode_error" class="null"></label>');
				var div2 = $('<div class="verify"></div>');
				var div3 = $('<div class="verifyDiv"></div>');
				$(me).parent().after(div.append(b.append(span)));
//				a.after(a_error);
				var options = $.data(me,'validatebox').options;
				var emailId = options.emailId;//必须有邮箱ID
				var sysRefId = options.sysRefNo;
				emailId = /^#/.test(emailId)? emailId:'#'+emailId;			
				b.unbind().bind('click',function(){
					if(!$(emailId).validatebox({
						required:true
					}).validatebox('isValid')){															
						$(emailId+'_error').addClass('error').removeClass('null').text('请输入正确的邮箱地址');						
					}else{
						var email = $(emailId).val();	//必须邮箱			
						var sysRefNo =$('#'+sysRefId).val(); 
						var opt={
								email:email,
								sysRefNo:sysRefNo
							};
						getEmailCode(me,b,span,b_error,opt,div2,div3);
					}
				}).hover(function(){
					$(this).addClass('hover');
				},function(){
					$(this).removeClass('hover');
				});
			}
			_441Re(me);	
		}
	});
	
	/**
	 * opt={mobPhone:'',sysRefNo:''}
	 */
	function getMobileCode(target,a,span,a_error,opt,div2,div3){		
		if ($.fn.validatebox.countDown == $.fn.validatebox.TIMESPAN) {
			a_error.addClass('null').removeClass('error').text("");
			$.ajax({
				url : 'ajax',					
				async :false,
				cache:false,
				type: "POST",
				dataType:"json",
				timeout:300000,
				data :$.extend({
					reqLoginType : "noLogin",
					cacheType : 'non',
					byFunc : 'N',
					getdataId : 'I_P_000078'						
				},opt),
				success:function(data){
					changeSpan(target,a,span,data);	
					var hear = opt.mobPhone.substr(0,3);
					var footer = opt.mobPhone.substr(7,4);
					var mobPhone="";
					if(opt.mobPhone.length==11){
						mobPhone = hear+"****"+footer;
					}else{
					    mobPhone = opt.mobPhone;
					}
					a_error.addClass('verifyLabel').removeClass('null').text("验证码已发送到："+mobPhone+",请注意查收！");
//					a_error.addClass('normal').removeClass('null').text("验证码已发送到："+mobPhone);
//					var div2 = $('<div class="verify"></div>');
//					var div3 = $('<div class="verifyDiv"></div>');
					$('#info').parent().after(div2.append(div3.append(a_error)));
					$('#infoDiv').show();
					$('#info').hide();
				},error : function(r, m, d) {// 请求失败处理函数	
					a.after(a_error);
					a_error.addClass('error').removeClass('null').text('网络超时，请重试。');					
				}						
			});				
		}
	}
	
	function changeSpan(target,a,span,data){		
		span.html("重新发送");
		var timeId = setTimeout(function() {
			changeSpan(target,a,span,data);
		}, 1000);
		if ($.fn.validatebox.countDown == 0) {
			a.attr('disabled',false).hover(function(){
				$(this).css({
					'text-decoration':'underline',
					'color':'#f00'
				}).removeClass('cursorD');
			},function(){
				$(this).css({
					'text-decoration':'none',
					'color':'#333'
				});
			});
			span.html("重新发送");
			$.fn.validatebox.countDown = $.fn.validatebox.TIMESPAN;
			clearTimeout(timeId);
		} else {
			a.attr('disabled',true).hover(function(){
				$(this).css({
					'text-decoration':'none',
					'color':'#333'
				}).addClass('cursorD');
			}).css({
				'text-decoration':'none',
				'color':'#333'
			}).addClass('cursorD');
			span.html("重新发送(" + $.fn.validatebox.countDown + ")");
			$.fn.validatebox.countDown--;
		}		
	}
	
	function getEmailCode(target,a,span,a_error,opt,div2,div3){		
		if ($.fn.validatebox.countDown == $.fn.validatebox.TIMESPAN) {
			a_error.addClass('null').removeClass('error').text("");
			$.ajax({
				url : 'ajax',					
				async :false,
				cache:false,
				type: "POST",
				dataType:"json",
				timeout:300000,
				data :$.extend({
					reqLoginType : "noLogin",
					cacheType : 'non',
					byFunc : 'N',
					getdataId : 'I_P_000128'						
				},opt),
				success:function(data){
					changeSpan(target,a,span,data);	
//					var hear = opt.mobPhone.substr(0,3);
//					var footer = opt.mobPhone.substr(7,4);
//					var mobPhone="";
//					if(opt.mobPhone.length==11){
//						mobPhone = hear+"****"+footer;
//					}else{
//					    mobPhone = opt.mobPhone;
//					}
					a_error.addClass('verifyLabel').removeClass('null').text("验证码已发送到："+opt.email+",请注意查收！");
//					a_error.addClass('normal').removeClass('null').text("验证码已发送到："+mobPhone);
//					var div2 = $('<div class="verify"></div>');
//					var div3 = $('<div class="verifyDiv"></div>');
					$('#info').parent().after(div2.append(div3.append(a_error)));
					$('#infoDiv').show();
					$('#info').hide();
				},error : function(r, m, d) {// 请求失败处理函数	
					a.after(a_error);
					a_error.addClass('error').removeClass('null').text('网络超时，请重试。');					
				}						
			});				
		}
	}
	
	
	/**
	 * 验证框增加成功和错误label，增加tooltip提示。
	 */
	$.extend($.fn.validatebox.defaults,{		
		onValidate:function(_25){
			var me = this;
			var label = $(me).attr('label');//如果不想显示，则在标签中设为false
			var type = $(me).attr('type');
			var v = $(me).val();
			var sId = $(me).attr('id')+"_succeed";
			var eId = $(me).attr('id')+"_error";			
			if(_25 && v!=''&& !$(me).attr('readonly')){
				$('#'+sId).addClass('succeed');
				$('#'+eId).addClass('null').removeClass('error').text('');
			}else{
				$('#'+sId).removeClass('succeed');
			}
			if($('#'+sId).length==0 && !label && type!=="hidden"){//如果是隐藏栏位
				var succeed = $('<label>');
				var error = $('<label>');
				error.attr('id',eId).addClass('null');
				succeed.attr('id',sId).addClass('blank');
				$(me).after(succeed);	
				succeed.after(error);
			}
			var flag = $(me).attr('tooltip'); //如果不想显示，则在标签中设为false
			if(flag==''&&flag==null){
				flag =true;
			}
			if(_25){
				$(this).tooltip({
					position:'top',	
					showDelay:0,
					hideDelay:0,
					onShow:function(){
						var value = $(me).val();						
						if(flag!='false'&&value!=''){
							$(this).tooltip('show');
							var content = '<span >'+value+'</span>';			
							$(this).tooltip('update',content);
							$(this).tooltip('tip').css({
								backgroundColor:'#fff7cd',
								borderColor:'#f4e5b3'
							});	
						}else{							
							$(this).tooltip('hide');
							return;
						}
									
					}
				});	
			}				
		}
	});
	
	// 自定义验证规则
	$
			.extend(
					$.fn.validatebox.defaults.rules,
					{
						mobile : {
							validator : function(value) {
								return /^1[0-9]{10}$/i.test($.trim(value));
							},
							message : '您输入的手机号码格式不正确,如13011231321'
						},
						date : {
							validator : function(value) {
								return /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/i
										.test($.trim(value));
							},
							message : '请输入正确的时间格式,如2012-12-12'
						},
						dateBox : {
							validator : function(value) {
//								return /^[0-9]{4}[-][0-1]{1}[0-31]{1}[-][0-3]{1}[0-9]{1}$/i
								return /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/i
										.test($.trim(value));
							},
							message : '请输入正确的时间格式,如2012-12-12'
						},
						telphone : {
							validator : function(value) {
								return /^[0-9]{3,4}[-][0-9]{1,35}$/i.test($
										.trim(value));
							},
							message : '您输入的电话号码格式不正确,如025-12345678'
						},
						fax : {
							validator : function(value) {
								return /^[0-9]{3,4}[-][0-9]{1,35}$/i.test($
										.trim(value));
							},
							message : '您输入的传真格式不正确,如025-12345678'
						},
						corpid : {
							validator : function(value) {
								return /^[A-Za-z0-9-]{0,32}$/i.test($
										.trim(value));
							},
							message : 'The field is error'
						},
						exttel : {
							validator : function(value) {
								return /^[0-9]{4,10}$/i.test($.trim(value));
							},
							message : 'The field is error'
						},
						email : {
							validator : function(value) {
//								return /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+\.(?:com|cn)$/i
//										.test($.trim(value));
								return  /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]$/i.test($.trim(value));
							},
							message : '您输入的邮箱格式不正确,如xx@xx.com'
						},
						idcard : {
							validator : function(value) {
								return /^\d{15}(\d{2}[A-Za-z0-9])?$$/i.test($
										.trim(value));
							},
							message : 'The field is error'
						},
						idno : {
							validator : function(value) {
								return /^[A-Za-z0-9_]{0,40}$/i.test($
										.trim(value));
							},
							message : '请输入英文、数字或下划线的组合。'
						},
						license : {
							validator : function(value) {
								return /^[A-Za-z0-9-]{0,32}$/i.test($
										.trim(value));
							},
							message : 'The field is error'
						},
						cardno : {
							validator : function(value) {
								return /^[0-9]{0,40}$/i.test($.trim(value));
							},
							message : '您输入的账号格式不正确。'
						},
						normal : {
							validator : function(value) {
								return /^[A-Za-z0-9_]+$/i.test($.trim(value));
							},
							message : 'The field is error'
						},
						number : {
							validator : function(value) {
								return /^[0-9]+$/i.test($.trim(value));
							},
							message : '请您输入数字。'
						},
						minLength : {
							validator : function(value, param) {
								return value.length >= param[0];
							},
							message : '请您输入最小长度为{0}的字符。'
						},
						maxLength : {
							validator : function(value, param) {
								return value.length <= param[0];
							},
							message : '请您输入最大长度为{0}的字符。'
						},
						mastLength : {
							validator : function(value, param) {
								return value.length == param[0];
							},
							message : '请输入长度为{0}的字符。'
						},
						noChinese : {
							validator : function(value) {
								return !/^[\u4e00-\u9fa5]+$/i.test($
										.trim(value));
							},
							message : '请您不要输入中文。'
						},
						noStartNum : {
							validator : function(value) {
								return !/^\d/i.test($
										.trim(value));
							},
							message : '请不要以数字开头。'
						},
						noHaveChinese : {
							validator : function(value) {
								return !/^.*?[\u4e00-\u9fa5]+.*?$/i.test($
										.trim(value));
							},
							message : '请您不要输入中文。'
						},
						postcode : {
							validator : function(value) {
								return /^[0-9]{6}$/i.test($.trim(value));
							},
							message : '您输入的邮政编码不正确,如200000。'
						},
						equalsTo : {
							validator : function(value,param) {
								return param[0].value == value;
//								return $(param[0]).val() == value;
							},
							message : '您两次输入的值不一致，请验证！'
						}			
					});

	/**
	 * 重写 datebox 的默认验证方法
	 */
	$.extend($.fn.datebox.defaults, {
		validType : 'dateBox',
		panelWidth : "253px"
	});
	
	/**
	 * 扩展datagrid 方法
	 */
	$.extend($.fn.datagrid.methods, {
		/**
		 * 获取表格所有数据。
		 * 
		 * @param jq :
		 *            表格
		 * @author huyy
		 */
		getAllData : function(jq) {
			if ($.data(jq[0], "datagrid").allData === null
					|| $.data(jq[0], "datagrid").allData === undefined) {
				$.data(jq[0], "datagrid").allData = {
					total : 0,
					rows : []
				};
			}
			var data = $.data(jq[0], "datagrid").allData;
			var rows = data.rows;
			var opts = $.data(jq[0], "datagrid").options;
			// 选中的行 ck =true;			
			opts.finder.getTr(jq[0], "", "selected", 2).each(
					function() {
						var rowIndex = (typeof $(this) == "object") ? $(this).attr("datagrid-row-index") : $(this);
						var row = $.data(jq[0],"datagrid").data.rows[parseInt(rowIndex)];
						var index = _63c(jq[0],row);
						rows[index].ck = true;
				    });
			return data;
		},
		loadAllData : function(jq, data) {
			return jq.each(function() {
				var allData = {
					total : data.length,
					rows : data.concat()
				};
				$.data(this, "datagrid").allData = allData;
			});
		},
		appendRow : function(jq, row) {
			return jq.each(function() {
				_6ac(this, row);
			});
		},
		deleteRow : function(jq, index) {
			return jq.each(function() {
				_6a2(this, index);
			});
		},
		getAllRowIndex : function(jq,row) {
			return _63c(jq[0],row);
		},
		getRowIndex : function(jq,row){
			return _63c(jq[0],row);
		},
		insertRow:function(jq,_1e2){
			return jq.each(function(){
			_16e(this,_1e2);
			});
		},
		updateRow:function(jq,_1e1){
			return jq.each(function(){
				_17e(this,_1e1);
			});
		},
		getAllDataSelected:function(jq){
			var rows=getSelections(jq[0]);
			return rows.length>0?rows[0]:null;
		},
		getAllDataSelections:function(jq){
			return getSelections(jq[0]);
		}
	});
	
	function getSelections(dg){
		var selectionRows = [];
		var data = $.data(dg, "datagrid").allData;
		var rows = data.rows;
		$.each(rows,function(i,n){
			if(n.ck){
				selectionRows.push(n);
			}
		});
		return selectionRows;
	}
	
	function _17e(_17f,_1e1){
		var opts=$.data(_17f,"datagrid").options;
		if($.data(_17f,"datagrid").allData){
			$.extend($.data(_17f, "datagrid").allData.rows[_1e1.index],_1e1.row);
			var pager = $.data(_17f,"datagrid").panel.children("div.datagrid-pager");
			var pageNumber = pager.pagination("options").pageNumber;
			var pageSize = pager.pagination("options").pageSize;	
			
			var b = Math.ceil((_1e1.index+1)/pageSize)||1;
			
			var index = _1e1.index-pageSize*(b-1);
			
			if(pageNumber===b){
				opts.view.updateRow.call(opts.view,_17f,index,_1e1.row);
			}					
			
			//debugger;
			//_refresh(_17f);
			//$.data(_17f,"datagrid").data.rows= $.data(_17f, "datagrid").allData.rows.concat();			
			//opts.view.updateRow.call(opts.view,_17f,index,_1e1.row);
		}else{			
			opts.view.updateRow.call(opts.view,_17f,_1e1.index,_1e1.row);
		}
	};	
	
	function _16e(_16f,_170){		
		var data=$.data(_16f,"datagrid").data;
		var view=$.data(_16f,"datagrid").options.view;
		var _171=$.data(_16f,"datagrid").insertedRows;
		if ( $.data(_16f, "datagrid").allData=== null || $.data(_16f, "datagrid").allData === undefined) {
			$.data(_16f, "datagrid").allData = {
				total : 0,
				rows : []
			};
		}		
		$.data(_16f, "datagrid").allData.total+=1;		
		$.data(_16f, "datagrid").allData.rows.splice($.data(_16f, "datagrid").allData.total,_170.index,_170.row);
		view.insertRow.call(view,_16f,_170.index,_170.row);
		_171.push(_170.row);		
		_refresh(_16f);
		//$(_16f).datagrid("getPager").pagination("refresh",{total:$.data(_16f, "datagrid").allData.total});
	};
	function _63c(_63d, row) {		
		var _63e = $.data(_63d, "datagrid");
		var opts = _63e.options;
		var rows = _63e.data.rows;
		if(_63e.allData){
			rows = _63e.allData.rows.concat();
		}
		if (typeof row == "object") {
			return _56a(rows, row);
		} else {
			for (var i = 0; i < rows.length; i++) {
				if (rows[i][opts.idField] == row) {
					return i;
				}
			}
			return -1;
		}
	};	
	function _56a(a, o) {
		for (var i = 0, len = a.length; i < len; i++) {
			if (a[i] == o) {
				return i;
			}
		}
		return -1;
	};
	function getRow(_773,p){
		var _774=(typeof p=="object")?p.attr("datagrid-row-index"):p;
		var jq = $.data(_773,"datagrid");
		var data = jq.data;	
		if(jq.allData){			
			data.rows=jq.allData.rows.concat();
			data.total= data.rows.length;
		}
		return data.rows[parseInt(_774)];
	}
	function _6a2(_6a3, _6a4) {		
		var _6a5 = $.data(_6a3, "datagrid");
		var opts = _6a5.options;
		var data = _6a5.data;		
		var _6a6 = _6a5.insertedRows;
		var _6a7 = _6a5.deletedRows;		
		$(_6a3).datagrid("cancelEdit", _6a4);		
		var row = getRow(_6a3, _6a4);
		if (_56a(_6a6, row) >= 0) {
			_56b(_6a6, row);
		} else {
			_6a7.push(row);
		}
		//data.rows = data.rows.del(_6a4);
		//data.total = data.rows.length;
		_56b(_6a5.selectedRows, opts.idField, row[opts.idField]);
		_56b(_6a5.checkedRows, opts.idField, row[opts.idField]);
		opts.view.deleteRow.call(opts.view, _6a3, _6a4);		
		if (opts.height == "auto") {
			_593(_6a3);
		}		
		if(_6a5.allData){
			var allRowIndex = _63c(_6a3,row);
			if(allRowIndex>=0){
				_6a5.allData.rows.splice(allRowIndex,1);				
			}
			_6a5.allData.total-=1;
		}		
		/*$(_6a3).datagrid("getPager").pagination("refresh", {
			total : data.total
		});*/
		_refresh(_6a3);
	};
	function _593(_594, _595, _596) {
		// var rows = $.data(_594, "datagrid").data.rows;
		var opts = $.data(_594, "datagrid").options;
		var dc = $.data(_594, "datagrid").dc;
		if (!dc.body1.is(":empty")
				&& (!opts.nowrap || opts.autoRowHeight || _596)) {
			if (_595 != undefined) {
				var tr1 = opts.finder.getTr(_594, _595, "body", 1);
				var tr2 = opts.finder.getTr(_594, _595, "body", 2);
				_597(tr1, tr2);
			} else {
				var tr1 = opts.finder.getTr(_594, 0, "allbody", 1);
				var tr2 = opts.finder.getTr(_594, 0, "allbody", 2);
				_597(tr1, tr2);
				if (opts.showFooter) {
					var tr1 = opts.finder.getTr(_594, 0, "allfooter", 1);
					var tr2 = opts.finder.getTr(_594, 0, "allfooter", 2);
					_597(tr1, tr2);
				}
			}
		}
		_582(_594);
		if (opts.height == "auto") {
			var _598 = dc.body1.parent();
			var _599 = dc.body2;
			var _59a = _59b(_599);
			var _59c = _59a.height;
			if (_59a.width > _599.width()) {
				_59c += 18;
			}
			_59c -= parseInt(_599.css("marginTop")) || 0;
			_598.height(_59c);
			_599.height(_59c);
			dc.view.height(dc.view2.height());
		}
		dc.body2.triggerHandler("scroll");
		function _597(trs1, trs2) {
			for (var i = 0; i < trs2.length; i++) {
				var tr1 = $(trs1[i]);
				var tr2 = $(trs2[i]);
				tr1.css("height", "");
				tr2.css("height", "");
				var _59d = Math.max(tr1.height(), tr2.height());
				tr1.css("height", _59d);
				tr2.css("height", _59d);
			}
		};
		function _59b(cc) {
			var _59e = 0;
			var _59f = 0;
			$(cc).children().each(function() {
				var c = $(this);
				if (c.is(":visible")) {
					_59f += c._outerHeight();
					if (_59e < c._outerWidth()) {
						_59e = c._outerWidth();
					}
				}
			});
			return {
				width : _59e,
				height : _59f
			};
		};
	};
	function _56a(a, o) {
		for (var i = 0, len = a.length; i < len; i++) {
			if (a[i] == o) {
				return i;
			}
		}
		return -1;
	};
	function _56b(a, o, id) {
		if (typeof o == "string") {
			for (var i = 0, len = a.length; i < len; i++) {
				if (a[i][o] == id) {
					a.splice(i, 1);
					return;
				}
			}
		} else {
			var _56c = _56a(a, o);
			if (_56c != -1) {
				a.splice(_56c, 1);
			}
		}
	};
	function _582(_583) {
		var _584 = $.data(_583, "datagrid");
		var opts = _584.options;
		var dc = _584.dc;
		var wrap = _584.panel;
		var _585 = wrap.width();
		var _586 = wrap.height();
		var view = dc.view;
		var _587 = dc.view1;
		var _588 = dc.view2;
		var _589 = _587.children("div.datagrid-header");
		var _58a = _588.children("div.datagrid-header");
		var _58b = _589.find("table");
		var _58c = _58a.find("table");
		view.width(_585);
		var _58d = _589.children("div.datagrid-header-inner").show();
		_587.width(_58d.find("table").width());
		if (!opts.showHeader) {
			_58d.hide();
		}
		_588.width(_585 - _587._outerWidth());
		_587.children(
				"div.datagrid-header,div.datagrid-body,div.datagrid-footer")
				.width(_587.width());
		_588.children(
				"div.datagrid-header,div.datagrid-body,div.datagrid-footer")
				.width(_588.width());
		var hh;
		_589.add(_58a).css("height", "");
		_58b.add(_58c).css("height", "");
		hh = Math.max(_58b.height(), _58c.height());
		_58b.add(_58c).height(hh);
		_589.add(_58a)._outerHeight(hh);
		dc.body1.add(dc.body2).children("table.datagrid-btable-frozen").css({
			position : "absolute",
			top : dc.header2._outerHeight()
		});
		var _58e = dc.body2.children("table.datagrid-btable-frozen")
				._outerHeight();
		var _58f = _58e + _588.children("div.datagrid-header")._outerHeight()
				+ _588.children("div.datagrid-footer")._outerHeight()
				+ wrap.children("div.datagrid-toolbar")._outerHeight();
		wrap.children("div.datagrid-pager").each(function() {
			_58f += $(this)._outerHeight();
		});
		var _590 = wrap.outerHeight() - wrap.height();
		var _591 = wrap._size("minHeight") || "";
		var _592 = wrap._size("maxHeight") || "";
		_587.add(_588).children("div.datagrid-body").css({
			marginTop : _58e,
			height : (isNaN(parseInt(opts.height)) ? "" : (_586 - _58f)),
			minHeight : (_591 ? _591 - _590 - _58f : ""),
			maxHeight : (_592 ? _592 - _590 - _58f : "")
		});
		view.height(_588.height());
	};
	function _6ac(_6ad, row) {		
		var data = $.data(_6ad, "datagrid").data;
		var opts = $.data(_6ad, "datagrid").options;
		var view = $.data(_6ad, "datagrid").options.view;
		var _6ae = $.data(_6ad, "datagrid").insertedRows;		
		view.insertRow.call(view, _6ad, null, row);
		_6ae.push(row);
		//data.rows.unshift(row);
		//data.total = data.rows.length;			
		if (  $.data(_6ad, "datagrid").allData=== null ||  $.data(_6ad, "datagrid").allData === undefined) {
			 $.data(_6ad, "datagrid").allData = {
				total : 0,
				rows : []
			};
		}	
		
		 $.data(_6ad, "datagrid").allData.total+=1;		
		 $.data(_6ad, "datagrid").allData.rows.splice( $.data(_6ad, "datagrid").allData.total,0,row);			
		 if (opts.height == "auto") {
				_593(_6ad);
			}
		 //$(_6ad).datagrid("getPager").pagination("refresh",{total:$.data(_6ad, "datagrid").allData.total});
		_refresh(_6ad);		
	};
	
	function _refresh(grid) {	
		var allRows = $.data(grid, "datagrid").allData.rows.concat();
		if($.data(grid, "datagrid").options.pagination){			
			var pager = $(grid).datagrid("getPager");
			//var pageNumber = $.data(grid, "datagrid").options.pageNumber;			
			//var pageSize = $.data(grid, "datagrid").options.pageSize;
			
			var pageIndex = pager.pagination("options").pageNumber;
			
			var _18 = $.data(grid, "datagrid").options;
			var _19=Math.ceil(allRows.length/_18.pageSize)||1;	
		
			if(pageIndex<_19){
				pageIndex=_19;
			}
			
			var start = (pageIndex - 1) * _18.pageSize;
			var end = start + _18.pageSize;			
			var newData = allRows.slice(start, end);
			_af(grid, newData);
			_175(grid);
			//$(grid).datagrid("loadData", newData);
			pager.pagination('refresh', {  
				total:allRows.length,
				pageNumber:pageIndex
			});
			pager.pagination({
				total:allRows.length,
				onSelectPage:function(pageNumber,pageSize){
					var start = (pageNumber - 1) * pageSize;  
					var end = start + pageSize;
					var allRows = $(grid).datagrid('getAllData').rows;
					var newData = allRows.slice(start, end);
					_af(grid, newData);
					_175(grid);
					//$(grid).datagrid("loadData", newData);			
					pager.pagination('refresh', {  
						total:allRows.length,
						pageNumber:pageNumber
					}); 
				}			
			});	
		}else{
			_af(grid, allRows);
			_175(grid);
			//$(grid).datagrid("loadData", allRows);	
			$(grid).datagrid("getPager").pagination("refresh", {
				total : allRows.length
			});
		}
	};
	
	

	function _af(_f0, _f1) {
		var _f2 = $.data(_f0, "datagrid");
		var _f3 = _f2.options;
		var dc = _f2.dc;
		_f1 = _f3.loadFilter.call(_f0, _f1);
		_f1.total = parseInt(_f1.total);
		_f2.data = _f1;
		if (_f1.footer) {
			_f2.footer = _f1.footer;
		}
		if (!_f3.remoteSort && _f3.sortName) {
			var _f4 = _f3.sortName.split(",");
			var _f5 = _f3.sortOrder.split(",");
			_f1.rows.sort(function(r1, r2) {
				var r = 0;
				for (var i = 0; i < _f4.length; i++) {
					var sn = _f4[i];
					var so = _f5[i];
					var col = _74(_f0, sn);
					var _f6 = col.sorter || function(a, b) {
						return a == b ? 0 : (a > b ? 1 : -1);
					};
					r = _f6(r1[sn], r2[sn]) * (so == "asc" ? 1 : -1);
					if (r != 0) {
						return r;
					}
				}
				return r;
			});
		}		
		if (_f3.view.onBeforeRender) {
			_f3.view.onBeforeRender.call(_f3.view, _f0, _f1.rows);
		}
		_f3.view.render.call(_f3.view, _f0, dc.body2, false);
		_f3.view.render.call(_f3.view, _f0, dc.body1, true);
		if (_f3.showFooter) {
			_f3.view.renderFooter.call(_f3.view, _f0, dc.footer2, false);
			_f3.view.renderFooter.call(_f3.view, _f0, dc.footer1, true);
		}
		if (_f3.view.onAfterRender) {
			_f3.view.onAfterRender.call(_f3.view, _f0);
		}
		_f2.ss.clean();
		var _f7 = $(_f0).datagrid("getPager");
		if (_f7.length) {
			var _f8 = _f7.pagination("options");
			if (_f8.total != _f1.total) {
				_f7.pagination("refresh", {
					total : _f1.total
				});
				if (_f3.pageNumber != _f8.pageNumber && _f8.pageNumber > 0) {
					_f3.pageNumber = _f8.pageNumber;
					_ae(_f0);
				}
			}
		}
		_36(_f0);
		dc.body2.triggerHandler("scroll");
		$(_f0).datagrid("setSelectionState");
		$(_f0).datagrid("autoSizeColumn");
		//_f3.onLoadSuccess.call(_f0, _f1);
	};
	

	function _ae(_189, _18a) {
		var opts = $.data(_189, "datagrid").options;
		if (_18a) {
			opts.queryParams = _18a;
		}
		var _18b = $.extend({}, opts.queryParams);
		if (opts.pagination) {
			$.extend(_18b, {
				page : opts.pageNumber || 1,
				rows : opts.pageSize
			});
		}
		if (opts.sortName) {
			$.extend(_18b, {
				sort : opts.sortName,
				order : opts.sortOrder
			});
		}
		if (opts.onBeforeLoad.call(_189, _18b) == false) {
			return;
		}
		$(_189).datagrid("loading");
		setTimeout(function() {
			_18c();
		}, 0);
		function _18c() {
			var _18d = opts.loader.call(_189, _18b, function(data) {
				setTimeout(function() {
					$(_189).datagrid("loaded");
				}, 0);
				_af(_189, data);
				setTimeout(function() {
					_175(_189);
				}, 0);
			}, function() {
				setTimeout(function() {
					$(_189).datagrid("loaded");
				}, 0);
				opts.onLoadError.apply(_189, arguments);
			});
			if (_18d == false) {
				$(_189).datagrid("loaded");
			}
		};
	};	

	function _36(_37, _38, _39) {
		//var _3a = $.data(_37, "datagrid").data.rows;
		var _3b = $.data(_37, "datagrid").options;
		var dc = $.data(_37, "datagrid").dc;
		if (!dc.body1.is(":empty") && (!_3b.nowrap || _3b.autoRowHeight || _39)) {
			if (_38 != undefined) {
				var tr1 = _3b.finder.getTr(_37, _38, "body", 1);
				var tr2 = _3b.finder.getTr(_37, _38, "body", 2);
				_3c(tr1, tr2);
			} else {
				var tr1 = _3b.finder.getTr(_37, 0, "allbody", 1);
				var tr2 = _3b.finder.getTr(_37, 0, "allbody", 2);
				_3c(tr1, tr2);
				if (_3b.showFooter) {
					var tr1 = _3b.finder.getTr(_37, 0, "allfooter", 1);
					var tr2 = _3b.finder.getTr(_37, 0, "allfooter", 2);
					_3c(tr1, tr2);
				}
			}
		}
		_22(_37);
		if (_3b.height == "auto") {
			var _3d = dc.body1.parent();
			var _3e = dc.body2;
			var _3f = _40(_3e);
			var _41 = _3f.height;
			if (_3f.width > _3e.width()) {
				_41 += 18;
			}
			_41 -= parseInt(_3e.css("marginTop")) || 0;
			_3d.height(_41);
			_3e.height(_41);
			dc.view.height(dc.view2.height());
		}
		dc.body2.triggerHandler("scroll");
		function _3c(_42, _43) {
			for (var i = 0; i < _43.length; i++) {
				var tr1 = $(_42[i]);
				var tr2 = $(_43[i]);
				tr1.css("height", "");
				tr2.css("height", "");
				var _44 = Math.max(tr1.height(), tr2.height());
				tr1.css("height", _44);
				tr2.css("height", _44);
			}
		};
		function _40(cc) {
			var _45 = 0;
			var _46 = 0;
			$(cc).children().each(function() {
				var c = $(this);
				if (c.is(":visible")) {
					_46 += c._outerHeight();
					if (_45 < c._outerWidth()) {
						_45 = c._outerWidth();
					}
				}
			});
			return {
				width : _45,
				height : _46
			};
		};
	};	

	function _22(_23) {
		var _24 = $.data(_23, "datagrid");
		var _25 = _24.options;
		var dc = _24.dc;
		var _26 = _24.panel;
		var _27 = _26.width();
		var _28 = _26.height();
		var _29 = dc.view;
		var _2a = dc.view1;
		var _2b = dc.view2;
		var _2c = _2a.children("div.datagrid-header");
		var _2d = _2b.children("div.datagrid-header");
		var _2e = _2c.find("table");
		var _2f = _2d.find("table");
		_29.width(_27);
		var _30 = _2c.children("div.datagrid-header-inner").show();
		_2a.width(_30.find("table").width());
		if (!_25.showHeader) {
			_30.hide();
		}
		_2b.width(_27 - _2a._outerWidth());
		_2a.children(
				"div.datagrid-header,div.datagrid-body,div.datagrid-footer")
				.width(_2a.width());
		_2b.children(
				"div.datagrid-header,div.datagrid-body,div.datagrid-footer")
				.width(_2b.width());
		var hh;
		_2c.add(_2d).css("height", "");
		_2e.add(_2f).css("height", "");
		hh = Math.max(_2e.height(), _2f.height());
		_2e.add(_2f).height(hh);
		_2c.add(_2d)._outerHeight(hh);
		dc.body1.add(dc.body2).children("table.datagrid-btable-frozen").css({
			position : "absolute",
			top : dc.header2._outerHeight()
		});
		var _31 = dc.body2.children("table.datagrid-btable-frozen")
				._outerHeight();
		var _32 = _31 + _2b.children("div.datagrid-header")._outerHeight()
				+ _2b.children("div.datagrid-footer")._outerHeight()
				+ _26.children("div.datagrid-toolbar")._outerHeight();
		_26.children("div.datagrid-pager").each(function() {
			_32 += $(this)._outerHeight();
		});
		var _33 = _26.outerHeight() - _26.height();
		var _34 = _26._size("minHeight") || "";
		var _35 = _26._size("maxHeight") || "";
		_2a.add(_2b).children("div.datagrid-body").css({
			marginTop : _31,
			height : (isNaN(parseInt(_25.height)) ? "" : (_28 - _32)),
			minHeight : (_34 ? _34 - _33 - _32 : ""),
			maxHeight : (_35 ? _35 - _33 - _32 : "")
		});
		_29.height(_2b.height());
	};	
	
	function _175(_176) {
		var _177 = $.data(_176, "datagrid");
		var data = _177.data;
		var rows = data.rows;
		var _178 = [];
		for (var i = 0; i < rows.length; i++) {
			_178.push($.extend({}, rows[i]));
		}
		_177.originalRows = _178;
		_177.updatedRows = [];
		_177.insertedRows = [];
		_177.deletedRows = [];
	};	
	
	/**
	 * new 将原来的required=‘true’调用的方法重写如下
	 * 调用新的增加‘*’号的方法
	 * _46e为修改时间选择控件和下拉combox的，除了普通text之外的。
	 */
	function _441Re(me) {//me代表页面的text元素，不包括下拉框和时间框
		// $(me).removeClass("validatebox-invalid");
		$(me).parent().removeClass("requried-item-ifo");// 每个box加载的时候都移除必输‘*’号。空的必输项在底下的判断加上。
		if($(me).prop('required')){//加入me这个元素具有必输属性，那么加上class
			if ($(me).val() == "") {
				$(me).parent().addClass("requried-item-ifo");
			}
			else if($(me).val().rules){
				$(me).parent().removeClass("requried-item-ifo");
			}
			//=============增加“新增客户”功能对一些字段的必输属性的控制==================
			var factorCustFromArray = new Array('legalRepNm','legalRepIdtype','legalRepIdno','ctctNm','ctctTel','mobPhone','ctctPersonTitle','ctctEmail');
			if(document.getElementById("custTp")){
				if($("#custTp",window.document).combobox('getValue')=='2'){
					if(factorCustFromArray.indexOf($(me)[0].id)>=0){
						$(me).parent().removeClass("requried-item-ifo");
					}
				}
			}
		}
	};
	
	
	var RD_STYLE = {
			radio : {
				cursor : "pointer",
				background : "transparent url('data:image/gif;base64,R0lGODlhDwAmANUAAP////z8/Pj4+Ovr6/v7++7u7uPj493d3ff39/Ly8vT09ICAgPX19a+vr+Li4urq6vn5+fr6+v39/dXV1efn5+bm5uTk5ODg4N7e3v7+/vHx8fDw8O3t7e/v74eHh+Hh4c3NzdfX1+np6eXl5cDAwNra2t/f38/Pz/Pz8/b29sbGxsHBwc7OzsLCwujo6NHR0by8vL29vcXFxb+/v7m5udPT09jY2MPDw7u7u7i4uNLS0uzs7AAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPACYAAAb/QIBwSCwaj0VGSIbLzUAXQfFDap1KjktJVysMHTHQ4WKgPAqaymQDYJBYh4/FNSgkGIjBgRC6YRwjIjsddwIRAQ4cKi8GFSIcGygphgEBBRYwB2ZoCggQBJUBCBg0FHV3nqChBAcrFYQMlKGVAgYnJpKyswEJDwYTqbuhAwoQEw+qwgoDEgAbNhzCAQoiUkIaGAYdCAQCCQMD1kMEBSMmBxbEzUjs7e7v8EJKTE5Q4kJUVlhaXF5CYGLIbEqzps2bOHNO4dHDxw+gAgIyREBAKdGiRgUMNPDQwICqS5nMQGiwoGSDDJVGlaqTwUPJBR4AVGLlihABkiZRBqh1S1IELY0cDUio1OtXKgkZAGQYWomYMWTSpjFzBk0aNXHYtHHzBu4eAHLm0KmLR5ZIEAA7') no-repeat center top",
				verticalAlign : "middle",
				height : "19px",
				width : "18px",
				display : "block"
			},
			span : {
				"float" : "left",
				display : "block",
				margin : "0px 4px",
				marginTop : "5px"
			},
			label : {
				marginTop : "4px",
				marginRight : "8px",
				display : "block",
				"float" : "left",
				fontSize : "16px",
				cursor : "pointer"
			}
		};
		
		function rd_rander(target) {
			var jqObj = $(target);
			jqObj.css('display', 'inline-block');
			var radios = jqObj.children('input[type=radio]');
			var checked;
			
			radios.each(function () {
				var jqRadio = $(this);
				var jqWrap = $('<span/>').css(RD_STYLE.span);
				var jqLabel = $('<label/>').css(RD_STYLE.label);
				var jqRadioA = $('<a/>').data('lable', jqLabel).addClass("RadioA").css(RD_STYLE.radio).text(' ');
				var labelText = jqRadio.data('lable', jqLabel).attr('label');
				jqRadio.hide();
				jqRadio.after(jqLabel.text(labelText));
				jqRadio.wrap(jqWrap);
				jqRadio.before(jqRadioA);
				if (jqRadio.prop('checked')) {
					checked = jqRadioA;
				}
				
				jqLabel.click(function () {
					(function (rdo) {
						rdo.prop('checked', true);
						radios.each(function () {
							var rd = $(this);
							var y = 'top';
							if (rd.prop('checked')) {
								y = 'bottom';
							}
							rd.prev().css('background-position', 'center ' + y);
						});
					})(jqRadio);
				});
				
				jqRadioA.click(function () {
					$(this).data('lable').click();
				});
			});
			checked.css('background-position', 'center bottom');
		}
		
		$.fn.radio = function (options, param) {
			if (typeof options == 'string') {
				return $.fn.radio.methods[options](this, param);
			}
			
			options = options || {};
			return this.each(function () {
				if (!$.data(this, 'radio')) {
					$.data(this, 'radio', {
						options : $.extend({}, $.fn.radio.defaults, options)
					});
					rd_rander(this);
				} else {
					var opt = $.data(this, 'radio').options;
					$.data(this, 'radio', {
						options : $.extend({}, opt, options)
					});
				}
			});
		};
		
		$.fn.radio.methods = {
			getValue : function (jq) {
				var checked = jq.find('input:checked');
				var val = {};
				if (checked.length)
					val[checked[0].name] = checked[0].value;
				
				return val;
			},
			check : function (jq, val) {
				if (val && typeof val != 'object') {
					var ipt = jq.find('input[value=' + val + ']');
					ipt.prop('checked', false).data('lable').click();
				}
			}
		};
		
		$.fn.radio.defaults = {
			style : RD_STYLE
		};
		
		if ($.parser && $.parser.plugins) {
			$.parser.plugins.push('radio');
		}
		
		var CK_STYLE = {
				checkbox : {
					cursor : "pointer",
					background : "transparent url('data:image/gif;base64,R0lGODlhDwAmAKIAAPr6+v///+vr68rKyvT09Pj4+ICAgAAAACH5BAAAAAAALAAAAAAPACYAAANuGLrc/mvISWcYJOutBS5gKIIeUQBoqgLlua7tC3+yGtfojes1L/sv4MyEywUEyKQyCWk6n1BoZSq5cK6Z1mgrtNFkhtx3ZQizxqkyIHAmqtTsdkENgKdiZfv9w9bviXFxXm4KP2g/R0uKAlGNDAkAOw==') no-repeat center top",
					verticalAlign : "middle",
					height : "19px",
					width : "18px",
					display : "block"
				},
				span : {
					"float" : "left",
					display : "block",
					margin : "0px 4px",
					marginTop : "5px"
				},
				label : {
					marginTop : "4px",
					marginRight : "8px",
					display : "block",
					"float" : "left",
					fontSize : "16px",
					cursor : "pointer"
				}
			};
			
			function ck_rander(target) {
				var jqObj = $(target);
				jqObj.css('display', 'inline-block');
				var Checkboxs = jqObj.children('input[type=checkbox]');
				Checkboxs.each(function () {
					var jqCheckbox = $(this);
					var jqWrap = $('<span/>').css(CK_STYLE.span);
					var jqLabel = $('<label/>').css(CK_STYLE.label);
					var jqCheckboxA = $('<a/>').data('lable', jqLabel).css(CK_STYLE.checkbox).text(' ');
					var labelText = jqCheckbox.data('lable', jqLabel).attr('label');
					jqCheckbox.hide();
					jqCheckbox.after(jqLabel.text(labelText));
					jqCheckbox.wrap(jqWrap);
					jqCheckbox.before(jqCheckboxA);
					if (jqCheckbox.prop('checked')) {
						jqCheckboxA.css('background-position', 'center bottom');
					}
					
					jqLabel.click(function () {
						(function (ck, cka) {
							ck.prop('checked', !ck.prop('checked'));
							var y = 'top';
							if (ck.prop('checked')) {
								y = 'bottom';
							}
							cka.css('background-position', 'center ' + y);
						})(jqCheckbox, jqCheckboxA);
					});
					
					jqCheckboxA.click(function () {
						$(this).data('lable').click();
					});
				});
			}
			
			$.fn.checkbox = function (options, param) {
				if (typeof options == 'string') {
					return $.fn.checkbox.methods[options](this, param);
				}
				
				options = options || {};
				return this.each(function () {
					if (!$.data(this, 'checkbox')) {
						$.data(this, 'checkbox', {
							options : $.extend({}, $.fn.checkbox.defaults, options)
						});
						ck_rander(this);
					} else {
						var opt = $.data(this, 'checkbox').options;
						$.data(this, 'checkbox', {
							options : $.extend({}, opt, options)
						});
					}
				});
			};
			
			function check(jq, val, check) {
				var ipt = jq.find('input[value=' + val + ']');
				if (ipt.length) {
					ipt.prop('checked', check).each(function () {
						$(this).data('lable').click();
					});
				}
			}
			
			$.fn.checkbox.methods = {
				getValue : function (jq) {
					var checked = jq.find('input:checked');
					var val = {};
					checked.each(function () {
						var kv = val[this.name];
						if (!kv) {
							val[this.name] = this.value;
							return;
						}
						
						if (!kv.sort) {
							val[this.name] = [kv];
						}
						val[this.name].push(this.value);
					});
					return val;
				},
				check : function (jq, vals) {
					if (vals && typeof vals != 'object') {
						check(jq, vals);
					} else if (vals.sort) {
						$.each(vals, function () {
							check(jq, this);
						});
					}
				},
				unCheck : function (jq, vals) {
					if (vals && typeof vals != 'object') {
						check(jq, vals, true);
					} else if (vals.sort) {
						$.each(vals, function () {
							check(jq, this, true);
						});
					}
				},
				checkAll : function (jq) {
					jq.find('input').prop('checked', false).each(function () {
						$(this).data('lable').click();
					});
				},
				unCheckAll : function (jq) {
					jq.find('input').prop('checked', true).each(function () {
						$(this).data('lable').click();
					});
				}
			};
			
			$.fn.checkbox.defaults = {
				style:CK_STYLE
			};
			
			if ($.parser && $.parser.plugins) {
				$.parser.plugins.push('checkbox');
			}
	
})(jQuery);

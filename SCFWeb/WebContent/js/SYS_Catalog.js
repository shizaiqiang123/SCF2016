function initNotice(){
	var notice = "选择查询结果，点击下一步，您将进入相应信息的交易页面。<br>"+
	"在该页面中您可以进行后续的交易操作。";
	return notice;
}

function beforeLoad() {
	var data = {
		data : {
			cataType : 'loadPara',
			cacheType : 'non'
		}
	};
	return data;
}

function pageOnReleasePageLoad(data) {
	pageOnLoad(data);
}

function busiTpFormater(val) {
	if(val=='0'){
		return "国内有追索权保理";
	}
	if(val=='1'){
		return "国内无追索权保理";
	}
	if(val=='2'){
		return "先票款后货";
	}
	if(val=='3'){
		return "信用保险项下";
	}
	if(val=='4'){
		return "现货动态";
	}
	if(val=='5'){
		return "现货静态";
	}
	if(val=='6'){
		return "应收账款池融资";
	}
	if(val=='7'){
		return "应收账款质押";
	}
	if(val=='8'){
		return "国内买方单笔保理";
	}
	if(val=='9'){
		return "国内买方单笔保理池";
	}
	if(val=='10'){
		return "仓单质押";
	}
}

/**
 * 初始化页面数据
 */
function pageOnLoadRe(data) {
	var screenDiv = $('#screenDiv');
	var selectDiv = $('<div class="selectDiv" id="selectDiv"></div>').appendTo(screenDiv);
	var remindDiv=$('<div class="remindDiv"></div>').appendTo(selectDiv);
	$.each(data.obj.search, function(i, n) {
		var li = $('<li class="condLists fL clearfix">').appendTo(selectDiv);
		var length="";
		var length2="";
//		if(data.obj.search.length>4){// 查询输入框超过4个，让他按数量分两排
//			length=(document.getElementById("selectDiv").offsetWidth-100)/4+2;
//		}else{
//			length=(document.getElementById("selectDiv").offsetWidth-100)/data.obj.search.length+2;
//		}
		if(data.obj.search.length>4){// 查询输入框 (x>4)
			length=108;
			var lastLineNum = data.obj.search.length%4;//最后一行的个数
			if(lastLineNum==1){length2=550;}//length2只是search大于4时最后一排的search框的长度
			if(lastLineNum==2){length2=250;}
			if(lastLineNum==3){length2=158;}				
			if(lastLineNum==4){length2=108;}
		}else if(data.obj.search.length==2){//2个查询条件
			length=250;
		}else if(data.obj.search.length==1){
			length=550;
		}else if(data.obj.search.length==3){
			length=158;
		}else if(data.obj.search.length==4){
			length=108;
		}
		if((i!=data.obj.search.length-1)&&((i+1)%4!=0)){//每逢一行上的第4个和最后一个，不跟“|”
			$('<li class="condLists fL clearfix">').appendTo(selectDiv).append($('<div style="float:left;height:32px;width:1px;border-right: 1px solid #bcbcbc;margin-right: 6px;margin-left: 6px;"></div>'));
		}
//		$('<label class="dsB fL tR">' + n.title + '：</label>').appendTo(li);
		var span = $('<span class="dsB fL"></span>').appendTo(li);
		var lineNum = Math.floor(data.obj.search.length/4)+1;
		if(lineNum==1){loadSearchBox(n,length,span);}//查询个数少于4个。在一行上用length
		else{//大于一行
			if(i<(lineNum-1)*4){loadSearchBox(n,length,span);}
			if(i>=(lineNum-1)*4){loadSearchBox(n,length2,span);}
		}
	});
	loadBtn(screenDiv);
	ajaxTable(data);
	SCFUtils.setFormPlaceholder("#screenDiv");
//	$("#selectDiv").fadeOut(100);
}
/**
 * 替换IE9时的placeholder属性
 */
function repalcePH() {
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

/**
 * 初始化页面数据
 */
function pageOnLoad(data) {
	var screenDiv = $('#screenDiv');
	loadBtn(screenDiv,data);
	ajaxTable(data);
	SCFUtils.setFormPlaceholder("#screenDiv");
	/*$("#screenDiv").hover(function(){
		
	},function(){
		var dropflag = true;
		$.each(data.obj.search, function(i, n) {
			if($("#"+n.field).val()!="" || document.activeElement.id==n.field){
				dropflag = false;
			}
		});
		if(dropflag){
			//dropElement(data);
		}
	});*/
}


function loadSearchBox(n,length,span){
	var height = "height:32px;"
	if (n.datatype == 1) {// 文本框(修改百联)
		$('<input class="inputM1 combo" type="text" style="border:1px solid #fff;width:0px;'+height+'"/>')
		.attr('name', n.field).attr('id', n.field).val(n.defaultvalue).attr('placeholder',n.title).appendTo(span);

//		$('<input class="inputM1 combo" type="text"/>')
//				.attr('name', n.field).val(n.defaultvalue).appendTo(span);
	} else if (n.datatype == 2) {// 下拉框(修改百联)
		var select = $('<input class="combo easyui-combobox" style="border:1px solid #fff;width: '+length+'px;'+height+'">').attr('name', n.field).attr('id', n.field).attr('id',n.field).attr('placeholder',n.title).val(n.defaultvalue)
		.appendTo(span);
		
//		var select = $('<input class="combo">').attr('name', n.field).val(n.defaultvalue)
//				.appendTo(span);
		select.combobox({
			data : [ {
				label : 'login',
				value : '在线'
			}, {
				label : 'logoff',
				value : '离线'

			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable:false,
			height:'32px'
		});
	} else if (n.datatype == 3) {// 日期格式
		var dateNm = n.field;
		$('<input class="combo easyui-datebox" style="border:1px solid #fff;width: '+length+'px;'+height+'"> ').attr('id', dateNm).attr('name', dateNm).attr('placeholder',n.title).val(
				n.defaultvalue).appendTo(span);
//		$('<input class="combo">').attr('id', dateNm).attr('name', dateNm).val(
//				n.defaultvalue).appendTo(span);
		$('#' + dateNm).datebox({
			editable:false,
			height:'32px'
		});
	} else if (n.datatype == 4) {// 下拉框
		var select = $('<input class="combo easyui-combobox" style="border:1px solid #fff;width: '+length+'px;'+height+'">').attr('name', n.field).attr('placeholder',n.title).val(n.defaultvalue)
		.appendTo(span);
//		var select = $('<input class="combo">').attr('name', n.field).val(n.defaultvalue)
//				.appendTo(span);
		 var datas = [ {
			label : '贷项清单',
			value : '贷项清单'
		}, {
			label : '应收账款转让',
			value : '应收账款转让'
		}, {
			label : '应收账款反转让',
			value : '应收账款反转让'

		} ];
		if(n.formatter&&n.formatter=='busiTpFmt'){
			 datas = [ {
				label : '0',
				value : '应收款融资'
			}];
		}else if(n.formatter=='finaTpFmt'){
			 datas = [ {
					label : '0',
					value : '普通融资'
				}];
		}else if(n.formatter=='finaStsFmt'){
			 datas = [ {
					label : '0',
					value : '待放款'
				}, {
					label : '1',
					value : '已放款'
				}];
		}else if(n.formatter=='adviceStsFmt'){
			 datas = [ {
					label : '1',
					value : '未读'
				}, {
					label : '2',
					value : '已读'
				}, {
					label : '3',
					value : '重要'
				}, {
					label : '4',
					value : '再提醒'
				}, {
					label : '5',
					value : '删除'
				}];
		}else if(n.formatter=='pmtStsFmt'){
			 datas = [ {
					label : '0',
					value : '待核销'
				}, {
					label : '1',
					value : '已核销'
				}, {
					label : '2',
					value : '异常核销'
				}];
		}else if(n.formatter=='busiTp'){
			 datas = [ {
					label : '0',
					value : '国内有追索权保理'
				}, {
					label : '1',
					value : '国内无追索权保理'
				}, {
					label : '2',
					value : '先票款后货'
				}, {
					label : '3',
					value : '信用保险项下'
				}, {
					label : '4',
					value : '现货动态'
				}, {
					label : '5',
					value : '现货静态'
				}, {
					label : '6',
					value : '应收账款池融资'
				}, {
					label : '7',
					value : '应收账款质押'
				}];
		}else if(n.formatter=='ccy'){
			datas=[];
			var optt={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:'Q_P_000006'
					},
					callBackFun:function(data){
						if(data.success){
							for(var i=0,j= data.rows.length;i<j;i++){
								var temp = {
										label : data.rows[i].sysRefNo,
										value :data.rows[i].sysRefNo
								 }
								 datas.push(temp);
							 }
						}
					}
			};	
			SCFUtils.ajax(optt);
		}else if(n.formatter=='buyerNm'){
			datas=[];
			var opt={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:'Q_P_000351'
					},
					callBackFun:function(data){
//						alert(JSON.stringify(data));
						if(data.success){
							for(var i=0,j= data.rows.length;i<j;i++){
								var temp = {
									label : data.rows[i].buyerNm,
									value :data.rows[i].buyerNm
								 }
								 datas.push(temp);
							 }
						}
					}
			};	
			SCFUtils.ajax(opt);
		}else if(n.formatter=='userType'){
			datas=[{
				label : '0',
				value : '系统级'
			},{
				label : '5',
				value : '供应商级'
			},{
				label : '7',
				value : '游客级'
			},{
				label : '9',
				value : '默认级'
			}];
		}else if(n.formatter=='busiTp'){
			datas = [ {
				label : '0',
				value : '应收款融资'
			}];
		}
		select.combobox({
			data : datas,
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable:false,
			height:'32px'
		});
	} else if(n.datatype==7){
		$('<input class="easyui-numberbox">').attr('id',  n.field).attr('name',  n.field).appendTo(span);
		$('#'+n.field).numberbox({
		    min:0,
		    precision:2,
		    
		});
	}else if (n.datatype == 8) {// 下拉框(修改百联)
		var select = $(
				'<input class="combo easyui-combobox" style="border:1px solid #fff;width: '
						+ length + 'px;'+height+'">').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).attr('placeholder', n.title).val(
				n.defaultvalue).appendTo(span);

		// var select = $('<input class="combo">').attr('name',
		// n.field).val(n.defaultvalue)
		// .appendTo(span);
		select.combobox({
			data : [ {
				label : '0',
				value : '国内有追索权保理'
			}, {
				label : '1',
				value : '国内无追索权保理'

			}, {
				label : '3',
				value : '信保项下'

			}],
			/*
			 * 应收账款明细查询：'先票款后货'与先票款后货'不涉及应收账款，故下拉框不予显示
			 * YeQing modify on 2016-8-9
			 * , {
				label : '2',
				value : '先票款后货'

			}, {
				label : '4',
				value : 先票款后货'

			}*/ 
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	} else if (n.datatype == 9) {// 下拉框(修改百联)
		var select = $(
				'<input class="combo easyui-combobox" style="border:1px solid #fff;width: '
						+ length + 'px;'+height+'">').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).attr('placeholder', n.title).val(
				n.defaultvalue).appendTo(span);

		// var select = $('<input class="combo">').attr('name',
		// n.field).val(n.defaultvalue)
		// .appendTo(span);
		select.combobox({
			data : [ {
				label : '0',
				value : '登记'
			}, {
				label : '1',
				value : '转让'
			}, {
				label : '2',
				value : '融资'
			}, {
				label : '3',
				value : '反转让'
			}, {
				label : '4',
				value : '贷项清单'
			}, {
				label : '5',
				value : '买方还款'
			}, {
				label : '6',
				value : '间接还款'
			}, {
				label : '7',
				value : '争议登记'
			}, {
				label : '8',
				value : '争议解决'
			}, {
				label : '9',
				value : '发票调整'
			}, {
				label : '10',
				value : '卖方还款'
			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	} else if (n.datatype == 10) {// 下拉框(修改百联)
		var select = $(
				'<input class="combo easyui-combobox" style="border:1px solid #fff;width: '
						+ length + 'px;'+height+'">').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).attr('placeholder', n.title).val(
				n.defaultvalue).appendTo(span);

		// var select = $('<input class="combo">').attr('name',
		// n.field).val(n.defaultvalue)
		// .appendTo(span);
		select.combobox({
			data : [ {
				label : '1',
				value : '保理预付款'
			}, {
				label : '2',
				value : '保理授信'
			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	} else if (n.datatype == 11) {// 下拉框(修改百联)
		var select = $(
				'<input class="combo easyui-combobox" style="border:1px solid #fff;width:'+length+'px;'+height+'">').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).attr('placeholder', n.title).val(
				n.defaultvalue).appendTo(span);

		// var select = $('<input class="combo">').attr('name',
		// n.field).val(n.defaultvalue)
		// .appendTo(span);
		select.combobox({
			data : [ {
				label : '3',
				value : '银承'
			}, {
				label : '4',
				value : '流贷'
			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	}else if(n.datatype == 12){
		var select = $(
				'<input class="combo easyui-combobox" style="border:1px solid #fff;width:'+length+'px;'+height+'">').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).attr('placeholder', n.title).val(
				n.defaultvalue).appendTo(span);
		select.combobox({
			data : [ {
				label : '0',
				value : '国内有追索权保理'
			}, {
				label : '1',
				value : '国内无追索权保理'
			},{
				label : '6',
				value : '应收账款池融资'
			},{
				label : '7',
				value : '应收账款质押'
			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	}else if(n.datatype == 13){
		var select = $(
				'<input class="combo easyui-combobox" style="border:1px solid #fff;width:'+length+'px;'+height+'">').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).attr('placeholder', n.title).val(
				n.defaultvalue).appendTo(span);
		select.combobox({
			data : [ {
				label : '0',
				value : '融资手续费'
			}, {
				label : '1',
				value : '应收账款处理费'
			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	}
	$("#"+n.field).animate({"width":length+"px"});
	SCFUtils.setFormPlaceholder("#screenDiv");
}
function createMoreQuery(){
	$(".moreQuery",this).css("background-image",url);
}
function loadBtn(screenDiv,data) {
/*	var li = $('<li class="condLists fR catlogBtn tR">').appendTo(screenDiv);
	$(
			'<button class="dsIB mR10 blockAreaBtn white btnGrey" type="button">重 置</button>')
			.on('click', function() {
				onResetBtnClick();
			}).appendTo(li);

	$('<button class="f14 schBtn white" type="button">查 询</button>').on(
			'click', function() {
				onSearchBtnClick();
			}).appendTo(li);*/
	var li = $('<li class="">').appendTo(screenDiv);
	var a = $('<a href="javascript:void(0)" id="aBtnEvent"></a>');
	var div = $('<div class="moreQuery"></div>').html('更多筛选条件').appendTo(a);
	
	a.click(function(){
		if($('.moreQuery').hasClass('queryDown')){
			$('.moreQuery').removeClass('queryDown');
			$('#moreSearchDiv').hide(10);
			div.html("更多筛选条件");
		}else{
			$('.moreQuery').addClass('queryDown');
			$('#moreSearchDiv').show(10);
			div.html("精选筛选条件");
		}
	}).hover(function(){
		div.css("color","red");
	},function(){
		div.css("color","blue");
	});
	var sysCatalogQuery = $('<div class="sysCatalogBtn sysCatalogQuery" style="height:32px"></div>').on(
			'click', function() {
				onSearchBtnClick();
			}).hover(function(){
				$(this).addClass("sysCatalogBtnHover");
			},function(){
				$(this).removeClass("sysCatalogBtnHover");
			}).appendTo(li);
	$('<img class="sysCatalogImg" src="images/style/catalogQuery.png">').appendTo(sysCatalogQuery);
	var sysCatalogReset = $('<div class="sysCatalogBtn sysCatalogReset" style="height:32px"></div>').on(
			'click', function() {
				onResetBtnClick();
			}).hover(function(){
				$(this).addClass("sysCatalogBtnHover");
			},function(){
				$(this).removeClass("sysCatalogBtnHover");
			}).appendTo(li);
	$('<img class="sysCatalogImg" src="images/style/catalogReset.png">').appendTo(sysCatalogReset);
	if(data.obj.search.length>2){
		a.appendTo(li);
		loadSearchLi(data);
		createDivForSearch(data);
	}else{
		loadSearchLi(data);
	}
}

function createDivForSearch(data){
	var div = $('<div style="display:none;float:left;width:975px;margin-left:-32px;" id="moreSearchDiv"></div>').appendTo($('#screenDiv'));
	var ul = $('<ul class="condList clearfix" id="moreSearchUl"></ul>').appendTo(div);
	var length = data.obj.search.length;
	var index = 0;
	if(length>2||length==1){
		index = 1;
	}
	if(length === 2){
		index = 2;
	}
	var rowLength = (data.obj.search.length-index)%4;
	for(var i = index;i<data.obj.search.length;i++){
		var marginBottom = 30;
		if(data.obj.search.length-rowLength == i){
			marginBottom = 10;
			rowLength--;
		}
		var n = data.obj.search[i];
		var li = $('<li class="condLists fL clearfix" style="height:68px"></li>').appendTo(ul);
		$('<label class="dsB fL tR labelStyleCatalog"></label>').html(n.title+':').appendTo(li);
		var span = $('<span class="dsB fL" ></span>').appendTo(li);
		loadSearch(n,span,marginBottom);
	}
}

function loadSearch(n,span,marginBottom){
	var length = 120;
	var heitgh = "heigth:32px;"
	var style = 'style="border:1px solid c3c3c3;width:0px;margin-bottom:'+marginBottom+'px;'+heitgh+'width:'+length+'px;"';
		
	if (n.datatype == 1) {// 文本框(修改百联)
		$('<input class="inputM1 combo" type="text"'+style+'/>')
		.attr('name', n.field).attr('id', n.field).val(n.defaultvalue).appendTo(span);

//		$('<input class="inputM1 combo" type="text"/>')
//				.attr('name', n.field).val(n.defaultvalue).appendTo(span);
	} else if (n.datatype == 2) {// 下拉框(修改百联)
		var select = $('<input class="combo easyui-combobox" '+style+'>').attr('name', n.field).attr('id', n.field).attr('id',n.field).val(n.defaultvalue)
		.appendTo(span);
		
//		var select = $('<input class="combo">').attr('name', n.field).val(n.defaultvalue)
//				.appendTo(span);
		select.combobox({
			data : [ {
				label : 'login',
				value : '在线'
			}, {
				label : 'logoff',
				value : '离线'

			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable:false,
			height:'32px'
		});
	} else if (n.datatype == 3) {// 日期格式
		var dateNm = n.field;
		$('<input class="combo easyui-datebox" '+style+'> ').attr('id', dateNm).attr('name', dateNm).val(
				n.defaultvalue).appendTo(span);
//		$('<input class="combo">').attr('id', dateNm).attr('name', dateNm).val(
//				n.defaultvalue).appendTo(span);
		$('#' + dateNm).datebox({
			editable:false,
			height:'32px'
		});
	} else if (n.datatype == 4) {// 下拉框
		var select = $('<input class="combo easyui-combobox" '+style+'>').attr('name', n.field).val(n.defaultvalue)
		.appendTo(span);
//		var select = $('<input class="combo">').attr('name', n.field).val(n.defaultvalue)
//				.appendTo(span);
		 var datas = [ {
			label : '贷项清单',
			value : '贷项清单'
		}, {
			label : '应收账款转让',
			value : '应收账款转让'
		}, {
			label : '应收账款反转让',
			value : '应收账款反转让'

		} ];
		if(n.formatter&&n.formatter=='busiTpFmt'){
			 datas = [ {
				label : '0',
				value : '应收款融资'
			}];
		}else if(n.formatter=='finaTpFmt'){
			 datas = [ {
					label : '0',
					value : '普通融资'
				}];
		}else if(n.formatter=='finaStsFmt'){
			 datas = [ {
					label : '0',
					value : '待放款'
				}, {
					label : '1',
					value : '已放款'
				}];
		}else if(n.formatter=='adviceStsFmt'){
			 datas = [ {
					label : '1',
					value : '未读'
				}, {
					label : '2',
					value : '已读'
				}, {
					label : '3',
					value : '重要'
				}, {
					label : '4',
					value : '再提醒'
				}, {
					label : '5',
					value : '删除'
				}];
		}else if(n.formatter=='pmtStsFmt'){
			 datas = [ {
					label : '0',
					value : '待核销'
				}, {
					label : '1',
					value : '已核销'
				}, {
					label : '2',
					value : '异常核销'
				}];
		}else if(n.formatter=='busiTp'){
			 datas = [ {
					label : '0',
					value : '国内有追索权保理'
				}, {
					label : '1',
					value : '国内无追索权保理'
				}, {
					label : '2',
					value : '先票款后货'
				}, {
					label : '3',
					value : '信用保险项下'
				}, {
					label : '4',
					value : '现货动态'
				}, {
					label : '5',
					value : '现货静态'
				}, {
					label : '6',
					value : '应收账款池融资'
				}, {
					label : '7',
					value : '应收账款质押'
				}];
		}else if(n.formatter=='ccy'){
			datas=[];
			var optt={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:'Q_P_000006'
					},
					callBackFun:function(data){
						if(data.success){
							for(var i=0,j= data.rows.length;i<j;i++){
								var temp = {
										label : data.rows[i].sysRefNo,
										value :data.rows[i].sysRefNo
								 }
								 datas.push(temp);
							 }
						}
					}
			};	
			SCFUtils.ajax(optt);
		}else if(n.formatter=='buyerNm'){
			datas=[];
			var opt={
					url:SCFUtils.AJAXURL,
					data: {
						queryId:'Q_P_000351'
					},
					callBackFun:function(data){
//						alert(JSON.stringify(data));
						if(data.success){
							for(var i=0,j= data.rows.length;i<j;i++){
								var temp = {
									label : data.rows[i].buyerNm,
									value :data.rows[i].buyerNm
								 }
								 datas.push(temp);
							 }
						}
					}
			};	
			SCFUtils.ajax(opt);
		}else if(n.formatter=='userType'){
			datas=[{
				label : '0',
				value : '系统级'
			},{
				label : '5',
				value : '供应商级'
			},{
				label : '7',
				value : '游客级'
			},{
				label : '9',
				value : '默认级'
			}];
		}else if(n.formatter=='busiTp'){
			datas = [ {
				label : '0',
				value : '应收款融资'
			}];
		}
		select.combobox({
			data : datas,
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable:false,
			height:'32px'
		});
	} else if(n.datatype==7){
		$('<input class="easyui-numberbox">').attr('id',  n.field).attr('name',  n.field).appendTo(span);
		$('#'+n.field).numberbox({
		    min:0,
		    precision:2,
		    
		});
	}else if (n.datatype == 8) {// 下拉框(修改百联)
		var select = $(
				'<input class="combo easyui-combobox" '+style+'>').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).val(
				n.defaultvalue).appendTo(span);

		// var select = $('<input class="combo">').attr('name',
		// n.field).val(n.defaultvalue)
		// .appendTo(span);
		select.combobox({
			data : [ {
				label : '0',
				value : '国内有追索权保理'
			}, {
				label : '1',
				value : '国内无追索权保理'

			}, {
				label : '3',
				value : '信保项下'

			}],
			/*
			 * 应收账款明细查询：'先票款后货'与先票款后货'不涉及应收账款，故下拉框不予显示
			 * YeQing modify on 2016-8-9
			 * , {
				label : '2',
				value : '先票款后货'

			}, {
				label : '4',
				value : 先票款后货'

			}*/ 
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	} else if (n.datatype == 9) {// 下拉框(修改百联)
		var select = $(
				'<input class="combo easyui-combobox" '+style+'>').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).val(
				n.defaultvalue).appendTo(span);

		// var select = $('<input class="combo">').attr('name',
		// n.field).val(n.defaultvalue)
		// .appendTo(span);
		select.combobox({
			data : [ {
				label : '0',
				value : '登记'
			}, {
				label : '1',
				value : '转让'
			}, {
				label : '2',
				value : '融资'
			}, {
				label : '3',
				value : '反转让'
			}, {
				label : '4',
				value : '贷项清单'
			}, {
				label : '5',
				value : '买方还款'
			}, {
				label : '6',
				value : '间接还款'
			}, {
				label : '7',
				value : '争议登记'
			}, {
				label : '8',
				value : '争议解决'
			}, {
				label : '9',
				value : '发票调整'
			}, {
				label : '10',
				value : '卖方还款'
			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	} else if (n.datatype == 10) {// 下拉框(修改百联)
		var select = $(
				'<input class="combo easyui-combobox" '+style+'>').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).val(
				n.defaultvalue).appendTo(span);

		// var select = $('<input class="combo">').attr('name',
		// n.field).val(n.defaultvalue)
		// .appendTo(span);
		select.combobox({
			data : [ {
				label : '1',
				value : '保理预付款'
			}, {
				label : '2',
				value : '保理授信'
			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	} else if (n.datatype == 11) {// 下拉框(修改百联)
		var select = $(
				'<input class="combo easyui-combobox" '+style+'>').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).val(
				n.defaultvalue).appendTo(span);

		// var select = $('<input class="combo">').attr('name',
		// n.field).val(n.defaultvalue)
		// .appendTo(span);
		select.combobox({
			data : [ {
				label : '3',
				value : '银承'
			}, {
				label : '4',
				value : '流贷'
			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	}else if(n.datatype == 12){
		var select = $(
				'<input class="combo easyui-combobox" '+style+'>').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).val(
				n.defaultvalue).appendTo(span);
		select.combobox({
			data : [ {
				label : '0',
				value : '国内有追索权保理'
			}, {
				label : '1',
				value : '国内无追索权保理'
			},{
				label : '6',
				value : '应收账款池融资'
			},{
				label : '7',
				value : '应收账款质押'
			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	}else if(n.datatype == 13){
		var select = $(
				'<input class="combo easyui-combobox" '+style+'>').attr('name', n.field).attr('id',
				n.field).attr('id', n.field).val(
				n.defaultvalue).appendTo(span);
		select.combobox({
			data : [ {
				label : '0',
				value : '融资手续费'
			}, {
				label : '1',
				value : '应收账款处理费'
			} ],
			valueField : 'label',
			textField : 'value',
			panelHeight : 'auto',
			editable : false,
			height : '32px'
		});
	}
		$("#"+n.field).height(30);
	SCFUtils.setFormPlaceholder("#screenDiv");

}
/**
 * 查询
 */
function onSearchBtnClick() {
	var data = SCFUtils.convertArray('ScreenMenuForm');
	$("#ScreenMenuTable").datagrid('load', $.extend({
		queryId : 'Q_S_10000001',
		cacheType : 'non'
	}, data));
}

/**
 * 重置
 */
function onResetBtnClick() {
	$('#screenDiv').form('clear');
//	$('#ScreenMenuForm')[0].reset();
//	$(':input','#ScreenMenuForm')  
//	 .not(':button, :submit, :reset, :hidden')  
//	 .val('')  
//	 .removeAttr('checked')  
//	 .removeAttr('selected'); 
}

/**
 * 下一步
 */
function onNextBtnClick() {
	var data = $("#ScreenMenuTable").datagrid('getSelected');
	// var data = SCFUtils.getSelectedGridData('ScreenMenuTable',true);
	// var p = {};
	// p.catalog = SCFUtils.json2str(data);
	return data;
}

/**
 * 获取动态列
 */
function getColumns(data) {
	var columns = '[' + json2str(data) + ']';
	return eval(columns);
}

function getRed(value, row, index) {
	if (value === "Y") {
		return 'background-color:#ffee00;color:red;';
	}
}

function json2str(o) {
	var arr = [];
	var fmt = function(s) {
		if (typeof s == 'object' && s != null) {

			return json2str(s);
		}
		return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
	};
	if (SCFUtils.isArray(o)) {
		return JsonArrayToStringCfz(o);
	} else {
		for ( var i in o) {
			if ((i === 'formatter' || i === 'styler' || i === 'sorter')
					&& !SCFUtils.isEmpty(fmt(o[i]))) {
				arr.push("'" + i + "':eval(" + fmt(o[i]) + ")");
			} else {
				arr.push("'" + i + "':" + fmt(o[i]));
			}
		}
		return '{' + arr.join(',') + '}';
	}
};

function JsonArrayToStringCfz(jsonArray) {
	var JsonArrayString = "[";
	for (var i = 0, max = jsonArray.length; i < max; i++) {
		if (i == (max - 1)) {
			JsonArrayString = JsonArrayString + json2str(jsonArray[i]);
		} else {
			JsonArrayString = JsonArrayString + json2str(jsonArray[i]) + ",";
		}
	}
	JsonArrayString = JsonArrayString + "]";
	return JsonArrayString;
};

/**
 * 加载表格
 */
function ajaxTable(data) {
	var columns = getColumns(data.obj.select);
	var dataParams = SCFUtils.convertArray('ScreenMenuForm');
	// 加载表格
	var options = {
		url : SCFUtils.QUERYURL,
		queryParams : $.extend({
			cataType : 'loadData',
			cacheType : 'non'
		}, dataParams),
		toolbar : '#toolbar',
		checkOnSelect : true,
		singleSelect : true,// 只选一行
		pagination : true,// 是否分页
		fitColumns : true	,// 列自适应表格宽度
		striped : true, // 当true时，单元格显示条纹
		onLoadSuccess : function() {
			var data = SCFUtils.getGridData('ScreenMenuTable', false);
			if (data._total_rows == 0) {
				 SCFUtils.alert('未查询到符合条件的记录！');
			}
		},
		columns : columns
	// 动态列
	};

	$('#ScreenMenuTable').datagrid(options);
}


function loadSearchLi(data){
	var dataLength = data.obj.search.length;
	var dt = [];
	var width = "width:260px;";
	if(dataLength>2||dataLength == 1){
		dt = [data.obj.search[0]];
		width = "width:232px;";
	}
	if(dataLength == 2){
		dt = data.obj.search;
	}
	var screenDiv = $('#screenDiv');
	var selectDiv = $('<div class="selectDiv" id="selectDiv"></div>').attr("style",width+"float:left").prependTo(screenDiv);
	//$("#selectDiv").animate({"width":"320px"});
	$.each(dt, function(i, n) {
		var li = $('<li class="condLists fL clearfix">').appendTo(selectDiv);
		var length="";
		if(dt.length==2){//2个查询条件
			length=108;
		}
		if(dt.length==1){
			length=220;
		}
		var seachLength = dt.length>2?2:dt.length;
		if((i!=seachLength-1)&&((i+1)%4!=0)){//每逢一行上的第4个和最后一个，不跟“|”
			$('<li class="condLists fL clearfix">').appendTo(selectDiv).append($('<div style="float:left;height:12px;width:1px;border-right: 1px solid #bcbcbc;margin: 12px 6px 0px 6px;"></div>'));
		}
		var span = $('<span class="dsB fL"></span>').appendTo(li);
		loadSearchBox(n,length,span);//查询个数少于4个。在一行上用length
	
	});
	SCFUtils.repalcePH("");
}


function dropElement(data){
	var screenDiv = document.getElementById("screenDiv");
	var selectDiv = document.getElementById("selectDiv");
	screenDiv.removeChild(selectDiv);
}



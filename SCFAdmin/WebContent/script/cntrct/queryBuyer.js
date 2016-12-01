
	function ignoreToolBar(){
	
	}
	
	function pageLoad(win) {
		var sysRefNo = win.getData("sysRefNo");
		if(SCFUtils.isEmpty(sysRefNo)){
			sysRefNo = "";
		}
		$('#sysRefNo').val(sysRefNo);
		
		var custInstCd = win.getData("custInstCd");
		if(SCFUtils.isEmpty(custInstCd)){
			custInstCd = "";
		}
		$('#custInstCd').val(custInstCd);
		var buyerNm = win.getData("buyerNm");
		$('#buyerNm').val(buyerNm);
		
		var data = {'sysRefNo':sysRefNo,"custInstCd":custInstCd};
		$.extend(data,{'queryId':win.getData("queryId")});
		ajaxTable(data);
		SCFUtils.repalcePH("");
		
		var div =$(".moreQuery");
		$('#aBtnEvent').hover(function(){
				div.css("color","red");
			},function(){
				div.css("color","blue");
			});
	}

	function SearchCimCust() {
		var data = SCFUtils.convertArray('searchForm');
		var queryParams = $('#dg').datagrid('options').queryParams;
		$('#dg').datagrid('load',$.extend(queryParams,data));
	}

	function onResetBtnClick() {
		$('#sysRefNo').val("");
		$('#custInstCd').val("");
		$('#buyerNm').val("");
	}
	
	//能否直接传target
	function doSave(win) {
		var row = $('#dg').datagrid('getSelected');
		var target = win.getData('callback');
		target(row);
		win.close();
	}

	function ajaxTable(data) {
		//加载表格
		$('#dg').datagrid({
			url: SCFUtils.AJAXURL,
			queryParams :data,
			toolbar : '#toolbar',
			checkOnSelect : true,
			singleSelect : true,//只选一行
			pagination : true,//是否分页
			fitColumns : true,//列自适应表格宽度
			striped : true,//当true时，单元格显示条纹
			loadMsg : '数据加载中,请稍后...',
			onLoadError : function() {
				alert('数据加载失败!');
			},
			onLoadSuccess : function(data) {
			},
			columns : [ [ {
				field : 'id',
				checkbox : 'true',
				width : 20
			}, {
				field : 'sysRefNo',
				title : '间接客户编号',
				width : '33.33%'
			}, {
				field : 'custInstCd',
				title : '间接客户组织机构代码',
				width : '33.33%'
			}, {
				field : 'custNm',
				title : '间接客户名称',
				width : '33.33%'
			},{
				field : 'lmtAmt',
				title : '间接客户额度',
				width : 20,
				hidden : true
			},{
				field : 'lmtAllocate',
				title : '间接客户额度',
				width : 20,
				hidden : true
			},{
				field : 'lmtRecover',
				title : '间接客户额度',
				width : 20,
				hidden : true
			},{
				field : 'lmtCcy',
				title : '间接客户额度',
				width : 20,
				hidden : true
			}, {
				field : 'lmtBal',
				title : '间接客户额度余额',
				width : 20,
				hidden : true
			}] ]
		});
	}
	function aBtnEvent(){
		var div =$(".moreQuery");
			if($('.moreQuery').hasClass('queryDown')){
				$('.moreQuery').removeClass('queryDown');
				$('#moreSearchDiv').hide(50);
				div.html("更多筛选条件");
			}else{
				$('.moreQuery').addClass('queryDown');
				$('#moreSearchDiv').show(50);
				div.html("精选筛选条件");
			}
		
	}
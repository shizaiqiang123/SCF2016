// JavaScript Document
$(function(){
	/*导航二级菜单下拉*/
	$(".navList").hover(function(){
				$(this).children(".subNav").slideDown();
				},function(){
				$(this).children(".subNav").slideUp();
				}
	);
	
	/*增加发票弹窗内容*/
	var contentAdd = '<ul class="condList clearfix"><li class="condLists fL clearfix"><label class="dsB fL w95 tR">交易流水号：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="" /></span></li><li class="condLists fL clearfix"><label class="dsB fL w95 tR">发票编号：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="" /></span></li><li class="condLists fL clearfix"><label class="dsB fL w95 tR">发票起算日：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="" /></span></li><li class="condLists fL clearfix"><label class="dsB fL w95 tR">发票到期日：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="" /></span></li><li class="condLists fL clearfix"><label class="dsB fL w95 tR">发票币种：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="" /></span></li><li class="condLists fL clearfix"><label class="dsB fL w95 tR">发票金额(元)：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="" /></span></li></ul><div class="popFooter"><span class="popBtn popOk">增加</span><span class="popBtn popNo">取消</span></div>';
	/*改变发票弹窗内容*/
	var contentChange='<ul class="condList clearfix"><li class="condLists fL clearfix"><label class="dsB fL w95 tR">交易流水号：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="TRF000160" /></span></li><li class="condLists fL clearfix"><label class="dsB fL w95 tR">发票编号：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="TRF000160" /></span></li><li class="condLists fL clearfix"><label class="dsB fL w95 tR">发票起算日：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="TRF000160" /></span></li><li class="condLists fL clearfix"><label class="dsB fL w95 tR">发票到期日：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="TRF000160" /></span></li><li class="condLists fL clearfix"><label class="dsB fL w95 tR">发票币种：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="TRF000160" /></span></li><li class="condLists fL clearfix"><label class="dsB fL w95 tR">发票金额(元)：</label><span class="dsB fL inputWrap w150"><input class="w150 inputM1" type="text" value="TRF000160" /></span></li></ul><div class="popFooter"><span class="popBtn popOk">修改</span><span class="popBtn popNo">取消</span></div>';
	/*导入发票信息弹窗内容*/
	var contentImport='<div class="popFileUpload clearfix"><label class="dsB fL w150 tR">交易流水号：</label><span class="dsB fL inputWrap w250 pR"><input id="fileUploadValue" class="w200 inputM1" type="text" value="" /><span class="fileBtnBg pA">上传</span><input class="fileM1 pA" type="file" id="fileUpload" value="" /></span></div><div class="popFooter"><span class="popBtn popOk">上传</span><span class="popBtn popNo">取消</span></div>';
	
	/*增加发票弹窗*/
	$("#addInvoice").on('click',function(){             
		var index = layer.open({
			type: 1 ,
			title: '新增发票',  //弹窗title
			skin: 'my-class',
			area:'560px',
			content: contentAdd,
			success:function(){
				$(".popOk").on('click',function(){
					layer.msg('发票添加成功！');
					layer.close(index);
				});
				$(".popNo").on('click',function(){
					layer.close(index);
				});
			}
		});
	});
	
	/*改变发票弹窗*/
	$("#changeInvoice").on('click',function(){
			var index = layer.open({
			type: 1 ,
			title: '修改发票',  //弹窗title
			skin: 'my-class',
			area:'560px',
			content: contentChange,
			success:function(){
				$(".popOk").on('click',function(){
					layer.msg('发票修改成功！');
					layer.close(index);
				});
				$(".popNo").on('click',function(){
					layer.close(index);
				});
			}	
		});
	});
	
	/*导入发票信息弹窗*/
	$("#importInvoice").on('click',function(){
			var index = layer.open({
			type: 1 ,
			title: '导入发票信息',  //弹窗title
			skin: 'my-class',
			area:'520px',
			content: contentImport,
			success:function(){
				$("#fileUpload").on('change',function(){
					var value = $(this).val();
					$("#fileUploadValue").val(value);
				});
				$(".popOk").on('click',function(){
					layer.msg('发票信息导入成功！');
					layer.close(index);
				});
				$(".popNo").on('click',function(){
					layer.close(index);
				});
			}	
		});
	});
	
	/*删除发票信息*/
	$("#delInvoice").on('click',function(){
		layer.confirm('你确定要删除该条信息吗？',{
			btn:['确定','取消'],
			skin:'my-class'},
			function(){
				layer.msg('删除成功！');	
			},
			function(){
				return;
			}
		);	
	});
	
	/*表格全选操作*/
	$("input[name='CheckAll']").click(function(){
		if($(this).is(':checked')){
			$("input[name='Check']").each(function(){
				$(this).prop("checked",true);	
			});
		}else{
			$("input[name='Check']").each(function(){
				$(this).prop("checked",false);	
			});
		}
	});
	
	/*行选操作*/
	$("tr").click(function(){
		if($(this).find("input[name='Check']").is(':checked')){
			$(this).find("input[name='Check']").prop('checked',false);
		}else{
			$(this).find("input[name='Check']").prop('checked',true);
		}	
	});
	
	
});
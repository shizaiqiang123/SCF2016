/**
 * edatagrid - jQuery EasyUI
 *  
 * 
 * Dependencies:
 *   datagrid
 *   messager
 * 
 */
(function($){
	function buildGrid(target){
		var opts = $.data(target, 'edatagrid').options;
		if(!opts.pageTips){
			opts.pageTips="双击记录可编辑数据！";
		}
		$(target).datagrid($.extend({}, opts, {
			onDblClickCell:function(index,field){ 
				if(typeof(opts.onDblClick) == 'function'){
							opts.onDblClick(index,field);
							return ;
						}	
				if (opts.editing){
					$(this).edatagrid('editRow', index);
					focusEditor(field);
				}
			},
			onClickCell:function(index,field,value){
				if(typeof(opts.onClickCell) == 'function'){
						opts.onClickCell(index,field,value); 
					}	
				if (opts.editing && opts.editIndex >= 0){
					$(this).edatagrid('editRow', index);
					focusEditor(field);
				}
			},
			onAfterEdit: function(index, row){
				var url = row.isNewRecord ? opts.saveUrl : opts.updateUrl;
				var isnew=row.isNewRecord
				//alert(url);
				var dg = $(this);
				if (url){
					$.post(url, row, function(data){  
						 if(data.s=="2") {
							alert("保存失败！");
							return;
							}
						
					if( isnew){
					//	alert("新增成功！");
						if(typeof(opts.postCreate) == 'function'){
							opts.postCreate(data, row[opts.treeParentField]);
						}	
						//dg.datagrid('reload');
						//return;
					}

						data.isNewRecord = null;
						$(target).datagrid('updateRow', {
							index: index,
							row: data
						}); 
						
						if (opts.treeid){
							var t = $(opts.treeid);
						//	alert(row.id);
							var node = t.tree('find', row.id);
							if (node){
								node.text = row[opts.treeTextField];
						//	alert(node.text);
								t.tree('update', node);
							} else {
								var pnode = t.tree('find', row[opts.treeParentField]);
								t.tree('append', {
									parent: (pnode ? pnode.target : null),
									data: [{id:row.id,text:row[opts.treeTextField]}]
								});
							}
						}
						opts.onSave.call(target, index, row);
						if(index==opts.editIndex){
								alert("保存成功！");
								opts.editIndex = undefined;
									dg.datagrid('reload');
							}
					
					},'json');
				}
				if (opts.onAfterEdit) opts.onAfterEdit.call(target, index, row);
			},
			onCancelEdit: function(index, row){
				opts.editIndex = undefined;
				if (row.isNewRecord) {
					$(this).datagrid('deleteRow', index);
				}
				if (opts.onCancelEdit) opts.onCancelEdit.call(target, index, row);
			},
			onBeforeLoad: function(param){
				$(this).datagrid('rejectChanges');
				if (opts.tree){
					var node = $(opts.tree).tree('getSelected');
					param[opts.treeParentField] = node ? node.id : undefined;
				}
				if (opts.onBeforeLoad) opts.onBeforeLoad.call(target, param);
			}
		}));
		
		function focusEditor(field){
			var editor = $(target).datagrid('getEditor', {index:opts.editIndex,field:field});
			if (editor){
				editor.target.focus();
			} else {
				var editors = $(target).datagrid('getEditors', opts.editIndex);
				if (editors.length){
					editors[0].target.focus();
				}
			}
		}
		
		if (opts.tree){
			$(opts.tree).tree({
				url: opts.treeUrl,
				onClick: function(node){
					$(target).datagrid('load');
				},
				onDrop: function(dest,source,point){
					var targetId = $(this).tree('getNode', dest).id;
					$.ajax({
						url: opts.treeDndUrl,
						type:'post',
						data:{
							id:source.id,
							targetId:targetId,
							point:point
						},
						dataType:'json',
						success:function(){
							$(target).datagrid('load');
						}
					});
				}
			});
		}
	}
	
	$.fn.edatagrid = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.edatagrid.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.datagrid(options, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'edatagrid');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'edatagrid', {
					options: $.extend({}, $.fn.edatagrid.defaults, $.fn.edatagrid.parseOptions(this), options)
				});
			}
			buildGrid(this);
		});
	};
	
	$.fn.edatagrid.parseOptions = function(target){
		return $.extend({}, $.fn.datagrid.parseOptions(target), {
		});
	};
	
	$.fn.edatagrid.methods = {
		options: function(jq){
			var opts = $.data(jq[0], 'edatagrid').options;
			return opts;
		},
		enableEditing: function(jq){
			return jq.each(function(){
				var opts = $.data(this, 'edatagrid').options;
				opts.editing = true;
			});
		},
		disableEditing: function(jq){
			return jq.each(function(){
				var opts = $.data(this, 'edatagrid').options;
				opts.editing = false;
			});
		},
		editRow: function(jq, index){
			return jq.each(function(){
				var dg = $(this);
				var opts = $.data(this, 'edatagrid').options;
				var editIndex = opts.editIndex;
				if (editIndex != index){
					if (dg.datagrid('validateRow', editIndex)){
					//	dg.datagrid('endEdit', editIndex);
						dg.datagrid('beginEdit', index);
						opts.editArray[opts.editArray.length]=editIndex;
						opts.editIndex = index;
						if (typeof(opts.preEdit) == 'function') {
									var row=$('#maingrid').edatagrid('selectRow',index);
									var row=$('#maingrid').edatagrid('getSelected');
									 opts.preEdit(index,row); 
							 }
					} else { 
						setTimeout(function(){
							dg.datagrid('selectRow', editIndex);
						}, 0);
					}
				}
			});
		},
		addRow: function(jq){
			return jq.each(function(){
				var dg = $(this);
				var opts = $.data(this, 'edatagrid').options;
				if (typeof(opts.preCreate) == 'function') {
							var returnobj=opts.preCreate();
							if(!returnobj.success) return;  
							if(returnobj.saveUrl) {
								$.data(this, 'edatagrid').options.saveUrl=returnobj.saveUrl;
								opts.saveUrl=returnobj.saveUrl;
							}
					 }
				if (opts.editIndex >= 0){
					if (!dg.datagrid('validateRow', opts.editIndex)){
						dg.datagrid('selectRow', opts.editIndex);
						return;
					}
					dg.datagrid('endEdit', opts.editIndex);
				}
				dg.datagrid('appendRow', {isNewRecord:true});
				var rows = dg.datagrid('getRows');
				opts.editIndex = rows.length - 1;
				 if(typeof(opts.newDefaults)=="function"){
					eval(" var newDefaults="+opts.newDefaults+"();");  
					rows[opts.editIndex]  = extend(rows[opts.editIndex],newDefaults); 
					//alert(Obj2str(rows[opts.editIndex]));
				 }
				dg.datagrid('beginEdit', opts.editIndex);
				dg.datagrid('selectRow', opts.editIndex);
				opts.onAdd.call(this, opts.editIndex, rows[opts.editIndex]);
			});
		},
		saveRow: function(jq){
			return jq.each(function(){
				var index = $(this).edatagrid('options').editIndex;
				var editArray=$(this).edatagrid('options').editArray;
				for(var i=0;i<editArray.length;i++){ 
					$(this).datagrid('endEdit', editArray[i]);
				}				 
				$(this).datagrid('endEdit', index);
				$(this).edatagrid('options').editArray=new Array();
			});
		},
		cancelRow: function(jq){
			return jq.each(function(){
				var index = $(this).edatagrid('options').editIndex;
				$(this).datagrid('cancelEdit', index);
			});
		},
		destroyRow: function(jq){
			return jq.each(function(){
				var dg = $(this);
				var opts = $.data(this, 'edatagrid').options;
				var rows = dg.datagrid('getSelections');
							// 	alert(rows.length);
				if (!rows){
					$.messager.show({
						title: opts.destroyMsg.norecord.title,
						msg: opts.destroyMsg.norecord.msg
					});
					return;
				}
				$.messager.confirm(opts.destroyMsg.confirm.title,opts.destroyMsg.confirm.msg,function(r){
					if (r){
						var idArray="";
						for(var n=0;n<rows.length;n++){
							var row=rows[n];
							var index = dg.datagrid('getRowIndex', row);
							if (!row.isNewRecord){	 
						//  alert(Obj2str(row)); 	  
								idArray=idArray+row[opts.idField]+",";
							} 
						} 
						if(idArray=="") {
							dg.datagrid('reload');
							return;
						}else idArray=idArray.substring(0,idArray.length-1);

						var str='var requestparames={ids:"'+idArray+'"}; var ids="'+idArray+'";';
						eval(str);

						 // alert(ids); 
							if (opts.destroyUrl){
							 
								$.post(opts.destroyUrl, requestparames, function(data){ 
									if(data.s=="1"){
										alert("删除成功！");	
										if (opts.treeid){
											dg.datagrid('reload');
											var t = $(opts.treeid);
											for(var i=0;i<ids.split(",").length;i++){
												var id=ids.split(",")[i];
												var node = t.tree('find', id);
												if (node){
													t.tree('remove', node.target);
												}
									     	}
										} else {
											dg.datagrid('reload');
										}
										//opts.onDestroy.call(dg[0], index, row);
										//dg.datagrid('cancelEdit', index);
									}else {
										alert("删除失败！");
										dg.datagrid('reload');
									} 
							  },'json'); 
						}else{
							dg.datagrid('reload');
						}
					 
					}//end if (r)
				});
			});
		}
	};
	
	$.fn.edatagrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
		editing: true, 
		editIndex: -1,
		editArray:new Array(),
		destroyMsg:{
			norecord:{
				title:'Warning',
				msg:'No record is selected.'
			},
			confirm:{
				title:'Confirm',
				msg:'Are you sure you want to delete?'
			}
		},
		destroyConfirmTitle: 'Confirm',
		destroyConfirmMsg: 'Are you sure you want to delete?',
		
		url: null,	// return the datagrid data
		saveUrl: null,	// return the added row
		updateUrl: null,	// return the updated row
		destroyUrl: null,	// return {success:true}
		
		tree: null,		// the tree selector
		treeUrl: null,	// return tree data
		treeDndUrl: null,	// to process the drag and drop operation, return {success:true}
		treeTextField: 'name',
		treeParentField: 'parentId',
		
		onAdd: function(index, row){},
		onSave: function(index, row){},
		onDestroy: function(index, row){}
	});
})(jQuery);
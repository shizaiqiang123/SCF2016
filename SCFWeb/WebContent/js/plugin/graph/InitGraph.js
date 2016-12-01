
// Table icon dimensions and position
mxSwimlane.prototype.imageSize = 20;
mxSwimlane.prototype.imageDx = 16;
mxSwimlane.prototype.imageDy = 4;

// Implements white content area for swimlane in SVG
mxSwimlaneCreateSvg = mxSwimlane.prototype.createSvg;
mxSwimlane.prototype.createSvg = function() {
	var node = mxSwimlaneCreateSvg.apply(this, arguments);

//	this.content.setAttribute('fill', '#ffffff');

	return node;
};

// Implements full-height shadow for SVG
mxSwimlaneReconfigure = mxSwimlane.prototype.reconfigure;
mxSwimlane.prototype.reconfigure = function(node) {
	mxSwimlaneReconfigure.apply(this, arguments);

	if (this.dialect == mxConstants.DIALECT_SVG && this.shadowNode != null) {
		this.shadowNode.setAttribute('height', this.bounds.height);
	}
};

// Implements table icon position and full-height shadow for SVG repaints
mxSwimlaneRedrawSvg = mxSwimlane.prototype.redrawSvg;
mxSwimlane.prototype.redrawSvg = function() {
	mxSwimlaneRedrawSvg.apply(this, arguments);

	// Full-height shadow
	if (this.dialect == mxConstants.DIALECT_SVG && this.shadowNode != null) {
		this.shadowNode.setAttribute('height', this.bounds.height);
	}

	// Positions table icon
	if (this.imageNode != null) {
		this.imageNode.setAttribute('x', this.bounds.x + this.imageDx
				* this.scale);
		this.imageNode.setAttribute('y', this.bounds.y + this.imageDy
				* this.scale);
	}
};

// Implements table icon position for swimlane in VML
mxSwimlaneRedrawVml = mxSwimlane.prototype.redrawVml;
mxSwimlane.prototype.redrawVml = function() {
	mxSwimlaneRedrawVml.apply(this, arguments);

	// Positions table icon
	if (this.imageNode != null) {
		this.imageNode.style.left = Math.floor(this.imageDx * this.scale)
				+ 'px';
		this.imageNode.style.top = Math.floor(this.imageDy * this.scale) + 'px';
	}
};


function Duration() {
	this.value = 0;
	this.unit = "";
	this.isbiztime = '1';
	this.clone = function() {
		var obj = new Duration();
		obj.value = this.value;
		obj.unit = this.unit;

		obj.isbiztime = this.isbiztime;
		return obj;
	};
}
function ExtAttribut() {
	this.name = "";
	this.value = "-1";
	this.clone = function() {
		var obj = new ExtAttribut();
		obj.name = this.name;
		obj.value = this.value;
		return obj;
	};
}
function ProcProperty() {
	this.name = "";
	this.datatype = "";
	this.initvalue = "";
	this.clone = function() {
		var obj = new ProcProperty();
		obj.name = this.name;
		obj.initvalue = this.initvalue;
		obj.datatype = this.datatype;
		return obj;
	};
}

function Router() {
	this.sname = "ROUTER";
	this.sid = "";
	this.type = -3;
	this.displayname = "路由";
	this.description = "";
	this.extattrs = new Array();
	this.clone = function() {
		var obj = new Router();
		obj.sname = this.sname;
		obj.displayname = this.displayname;
		obj.description = this.description;
		obj.sid = this.sid;
		$(this.extattrs).each(function() {
			obj.extattrs.push(this.clone());
		});
		return obj;
	};
}

function ServicePro() {
	this.sname = '';
	this.value = '';
	this.displayname = '';
	this.clone = function() {
		var obj = new ServicePro();
		obj.sname = this.sname;
		obj.displayname = this.displayname;
		obj.value = this.value;
		return obj;
	};
}

function HumanService() {
	this.sid = "";
	this.sname = "";
	this.type = 1;
	this.description = "";
	this.displayname = "";
	this.optname = "";
	this.optid = "";
	this.optpath="";
	this.extattrs = [];
	this.properties = [];
	this.clone = function() {
		var obj = new HumanService();
		obj.sid = this.sid;
		obj.sname = this.sname;
		obj.description = this.description;
		obj.displayname = this.displayname;
		obj.optname = this.optname;
		$(this.extattrs).each(function() {
			obj.extattrs.push(this.clone());
		});
		$(this.properties).each(function() {
			obj.properties.push(this.clone());
		});
		return obj;
	};
}
function AutoArgs() {
	this.datatype = "";
	this.name = "";
	this.dirct = "";
	this.clone = function() {
		var obj = new AutoArgs();
		obj.datatype = this.datatype;
		obj.name = this.name;
		obj.dirct = this.dirct;
		return obj;
	};
}
function AutoService() {
	this.sid = "";
	this.sname = "";
	this.type = 2;
	this.description = "";
	this.displayname = "";
	this.beantype = "1";
	this.beanname = "";
	this.optname = "";
	this.extattrs = [];
	this.properties = [];
	this.inputargs = [];
	this.outputargs = [];
	this.clone = function() {
		var obj = new AutoService();
		obj.sid = this.sid;
		obj.sname = this.sname;
		obj.description = this.description;
		obj.displayname = this.displayname;
		obj.beantype = this.beantype;
		obj.beanname = this.beanname;
		obj.optname = this.optname;
		$(this.extattrs).each(function() {
			obj.extattrs.push(this.clone());
		});
		$(this.properties).each(function() {
			obj.properties.push(this.clone());
		});
		$(this.inputargs).each(function() {
			obj.inputargs.push(this.clone());
		});
		$(this.outputargs).each(function() {
			obj.outputargs.push(this.clone());
		});
		return obj;
	};
}

function WebService() {
	this.sid = "";
	this.sname = "";
	this.type = 3;
	this.description = "";
	this.displayname = "";
	this.interfacename = "";
	this.extattrs = [];
	this.properties = [];
	this.clone = function() {
		var obj = new WebService();
		obj.sid = this.sid;
		obj.sname = this.sname;
		obj.description = this.description;
		obj.displayname = this.displayname;
		obj.interfacename = this.interfacename;
		$(this.extattrs).each(function() {
			obj.extattrs.push(this.clone());
		});
		$(this.properties).each(function() {
			obj.properties.push(this.clone());
		});
		return obj;
	};
}

function ResourceBind() {
	this.assgStor = 'ANY';
	this.adminRec = '';
	this.adminExt = [];
	this.ownerRec = '';
	this.ownerExt = [];
	this.readRec = '';
	this.readExt = [];
	this.clone = function() {
		var obj = new ResourceBind();
		obj.assgStor = this.assgStor;
		obj.adminRec = this.adminRec;
		obj.ownerRec = this.ownerRec;
		obj.readRec = this.readRec;
		$(this.adminExt).each(function() {
			obj.adminExt.push(this.clone());
		});
		$(this.ownerExt).each(function() {
			obj.ownerExt.push(this.clone());
		});
		$(this.readExt).each(function() {
			obj.readExt.push(this.clone());
		});
		$(this.readExt).each(function() {
			obj.readExt.push(this.clone());
		});
		return obj;
	};
}

function Activity() {
	this.sid = "";
	this.sname = "";
	this.type = 10;
	this.description = "";
	this.displayname = "部门主管";
	this.priority = 1;
	this.loops = 'REDO';
	this.duration = new Duration();
	this.resource = new ResourceBind();
	this.extattrs = new Array();
	this.clone = function() {
		var obj = new Activity();
		obj.sid = this.sid;
		obj.sname = this.sname;
		obj.displayname = this.displayname;
		obj.description = this.description;
		obj.priority = this.priority;
		obj.loops = this.loops;
		obj.duration = this.duration.clone();
		obj.resource = this.resource.clone();
		$(this.extattrs).each(function() {
			obj.extattrs.push(this.clone());
		});
		return obj;
	};
}

function Transfer() {
	this.sid = SCFUtils.uuid();
	this.sname = this.sid;
	this.type = 0;
	this.description = "";
	this.displayname = "";
	this.condition = "";
	this.isdefault = '1';
	this.extattrs = new Array();
	this.clone = function() {
		var obj = new Transfer();
		obj.sid = this.sid;
		obj.sname = this.sname;
		obj.displayname = this.displayname;
		obj.description = this.description;
		obj.condition = this.condition;
		obj.isdefault = this.isdefault;
		$(this.extattrs).each(function() {
			obj.extattrs.push(this.clone());
		});
		return obj;
	};
}

function StartNode() {
	this.sid = "";
	this.sname = "START_NODE";
	this.type = -1;
	this.description = "";
	this.displayname = "开始";
	this.clone = function() {
		var obj = new StartNode();
		obj.sid = this.sid;
		obj.sname = this.sname;
		obj.displayname = this.displayname;
		obj.description = this.description;
		return obj;
	};
}

function EndNode() {
	this.sid = "";
	this.sname = "END_NODE";
	this.type = -2;
	this.stype = "0";
	this.description = "";
	this.displayname = "结束";
	this.clone = function() {
		var obj = new EndNode();
		obj.sid = this.sid;
		obj.sname = this.sname;
		obj.stype = this.stype;
		obj.displayname = this.displayname;
		obj.description = this.description;
		return obj;
	};
}

function Proccess() {
	this.sid = "";
	this.sname = "TestFlow";
	this.type = 100;
	this.description = "";
	this.displayname = "默认流程描述";
	this.entry = "";
	this.duration = new Duration();
	this.extattrs = [];
	this.properties = [];
}

function LogicProc() {
	this.sid = "";
	this.sname = "";
	this.type = 200;
	this.displayname = "默认描述";
	this.description = "";
	this.properties = [];
}

function LogicStep() {
	this.sid = "";
	this.sname = "";
	this.classname = "";
	this.type = 201;
	this.vtype = "0";
	this.displayname = "步骤描述";
	this.description = "";
	this.properties = [];
	this.clone = function() {
		var obj = new LogicStep();
		obj.sid = this.sid;
		obj.classname = this.classname;
		obj.sname = this.sname;
		obj.type = this.type;
		obj.vtype = this.vtype;
		obj.displayname = this.displayname;
		obj.description = this.description;

		$(this.properties).each(function() {
			obj.properties.push(this.clone());
		});
		return obj;
	};
}


function init_Flow_GraphPublic(graph,editor,editable){
	graph.setConnectable(editable);
	graph.setCellsDisconnectable(false);
	graph.setCellsCloneable(false);
	graph.swimlaneNesting = false;
	graph.dropEnabled = true;
	//获取配置
	//var config = mxUtils.load('config/keyhandler-commons.xml').getDocumentElement();
	//editor.configure(config);
	//设定不允许划线
	graph.setAllowDanglingEdges(false);
	graph.connectionHandler.factoryMethod = null;
	graph.isCellResizable = function(cell)
	{
		return this.isSwimlane(cell) && editable;
	};
	graph.isCellMovable = function(cell)
	{
		return (this.isSwimlane(cell) ||
			cell.value.type < 0) && editable;
	};
	//设定单元格不允许直接编辑
	graph.isCellEditable = function(cell){return false;};
			
	//设置单元格的显示文字策略
	graph.convertValueToString = function(cell)
	{
		if (cell.value && cell.value.displayname){return cell.value.displayname;}
		else{if (this.model.isEdge(cell)){return '';}else{return '<未设置描述>';}}
	};
	//设置如何创建连线
	graph.createEdge = function(parent, id, value, source, target, style) {
		var sourcev = source.value;
		var targev = target.value;
		if (sourcev !== null  && targev !== null){
			if ((sourcev.type =='-1' && targev.type=='-2') ||(sourcev.type =='-2' && targev.type=='-1') ){
					SCFUtils.alert("提示消息","不能直接连接开始和结束");
					return null;
			}
			if (value == null) {
				value = new Transfer();
			}
			var edge = new mxCell(value, new mxGeometry(), style);
			edge.setId(id);
			edge.setEdge(true);
			edge.geometry.relative = true;
			return edge;
		}
		else{return null;}
	};
}

function config_Flow_Style(graph){
	var style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
	style[mxConstants.STYLE_FONTCOLOR] = '#000000';
	style[mxConstants.STYLE_FILLCOLOR] = '#ffffff';
	style[mxConstants.STYLE_FONTSIZE] = '10';
	style[mxConstants.STYLE_FONTSTYLE] = 0;
	style[mxConstants.STYLE_STROKEWIDTH] = '1';
	style[mxConstants.STYLE_STROKECOLOR] = '#000000';
	style[mxConstants.STYLE_SPACING_LEFT] = '4';
	style[mxConstants.STYLE_IMAGE_WIDTH] = '24';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '24';
	graph.getStylesheet().putDefaultVertexStyle(style);

	style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
	style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
//	style[mxConstants.STYLE_GRADIENTCOLOR] = '#FFFFFF';
	style[mxConstants.STYLE_FILLCOLOR] = '#a2f58c';
	style[mxConstants.STYLE_STROKEWIDTH] = '1';
	style[mxConstants.STYLE_STROKECOLOR] = '#000000';
	style[mxConstants.STYLE_FONTCOLOR] = '#000000';
	style[mxConstants.STYLE_STARTSIZE] = '28';
	style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
	style[mxConstants.STYLE_FONTSIZE] = '10';
	style[mxConstants.STYLE_FONTSTYLE] = 1;
	style[mxConstants.STYLE_SHADOW] = 0;
	graph.getStylesheet().putCellStyle('activity', style);
	
	style = new Object();
	style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
	style[mxConstants.STYLE_STROKECOLOR] = '#FFFFFF';
	style[mxConstants.STYLE_FILLCOLOR] = '#FFFFFF';
	style[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_BOTTOM;
	style[mxConstants.STYLE_IMAGE_ALIGN] = mxConstants.ALIGN_CENTER;
	style[mxConstants.STYLE_IMAGE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
	style[mxConstants.STYLE_IMAGE] = 'images/workflow/4141/start41x41.png';
	style[mxConstants.STYLE_IMAGE_WIDTH] = '30';
	style[mxConstants.STYLE_IMAGE_HEIGHT] = '30';
	style[mxConstants.STYLE_SPACING_TOP] = '1';
	style[mxConstants.STYLE_FONTSIZE] = '10';
	//style[mxConstants.STYLE_SPACING] = '4';
	graph.getStylesheet().putCellStyle("startNode", style);		
	
	//结束样式
	style = mxUtils.clone(style);
	style[mxConstants.STYLE_IMAGE] = 'images/workflow/4141/end41x41.png';
	graph.getStylesheet().putCellStyle("endNode", style);
	
	
	return graph;
}
function init_Flow_ActivityStyle(graph,editor){
//	mxConstants.SHADOW_OPACITY = 0.5;
//	mxConstants.SHADOWCOLOR = '#C0C0C0';
//	mxConstants.SHADOW_OFFSET_X = 5;
//	mxConstants.SHADOW_OFFSET_Y = 6;
//	mxConstants.SVG_SHADOWTRANSFORM = 'translate(' +
//			mxConstants.SHADOW_OFFSET_X + ' ' +
//			mxConstants.SHADOW_OFFSET_Y + ')';
	
	// Table icon dimensions and position
	mxSwimlane.prototype.imageSize = 20;
	mxSwimlane.prototype.imageDx = 16;
	mxSwimlane.prototype.imageDy = 4;	
	editor.layoutSwimlanes = true;
	editor.createSwimlaneLayout = function ()
	{
		var layout = new mxStackLayout(this.graph, false);
		layout.fill = true;
		layout.resizeParent = true;
		layout.isVertexMovable = function(cell)
		{
			return true;
		};
		
		return layout;
	};
}
function init_Flow_ServiceStyle(graph,editor){
	graph.isHtmlLabel = function(cell)
	{
		return !this.isSwimlane(cell) &&
			!this.model.isEdge(cell) && 
			cell.value.type > 0 && cell.value.type < 10;
	};
	graph.isCellEditable = function(cell)
	{
		return false;
	};
	graph.convertValueToString = function(cell)
	{
		if ((cell.value) && (cell.value.displayname))
		{
			return cell.value.displayname;
		}
		else{
			
			if (this.model.isEdge(cell)){
				return '';
			}
			else{
				return '<未设置描述>';
			}
		}
	};
	graph.getLabel = function(cell)
	{
		if (this.isHtmlLabel(cell))
		{
			var label = '';
			if (cell.value.type == 1)
			{
				label += '<img title="人工任务" src="images/workflow/1616/formtask16x16.png" width="16" height="16" align="top">&nbsp;';
			}
			else if (cell.value.type == 2)
			{
				label += '<img title="自动任务" src="images/workflow/1616/interf16x16.png" width="16" height="16" align="top">&nbsp;';
			}											
			else if (cell.value.type == 5)
			{
				label += '<img title="路由" src="images/workflow/1616/synch16x16.png" width="16" height="16" align="top">&nbsp;';
			}
			return label + mxUtils.htmlEntities((cell.value.displayname === null) ? '<未设置描述>' : cell.value.displayname, false);
		}
		return mxGraph.prototype.getLabel.apply(this, arguments); 
	};			
	graph.isValidDropTarget = function(cell, cells, evt)
	{
		return this.isSwimlane(cell);
	};
}
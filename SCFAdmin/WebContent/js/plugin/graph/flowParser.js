(function ($) {
    $.flowParser = function () {
        this.value = {flowid:"",flowdesc:""};
    };
    $.extend($.flowParser.prototype, {
    	createDurationXml:function(v,intend){
        	var result = [];
    		result.push(intend + '<f20:duration ');
    		result.push('value="' + v.value + '" ');
    		result.push('unit="' + v.unit + '" ');
    		result.push('is-business-time="' + (v.isbiztime == '1') + '" ');
    		result.push('/>\n');
    		return result.join('');
    	},

    	createRootXml:function(cell){
        	var result = [];
        	var obj = this.parseNode(cell);
        	var v = cell.value;
        	result.push('<?xml version="1.0" encoding="utf-8"?>\n');
        	result.push('<f20:workflow-process xmlns:f20="http://www.fireflow.org/schema/workflowprocess" ');
    		result.push('xmlns:s="http://www.fireflow.org/schema/service" xmlns:r="http://www.fireflow.org/schema/resource" ');
    		result.push('xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ');
    		result.push('xsi:schemaLocation="http://www.fireflow.org/schema/workflowprocess http://www.fireflow.org/schema/workflowprocess/WorkflowProcessSchema-2.0.xsd http://www.fireflow.org/schema/service http://www.fireflow.org/schema/service/ServiceSchema-2.0.xsd http://www.fireflow.org/schema/resource http://www.fireflow.org/schema/resource/ResourceSchema-2.0.xsd" ');
    		result.push(' id="' + this.value.flowid + '"');
    		result.push(' name="' + this.value.flowid + '"');
    		result.push(' entry="' + obj.entry + '"');		
    		if (!SCFUtils.isEmpty(v.displayname)){
    			result.push(' display-name="' + v.displayname + '" ');
    		}		
    		result.push(' >\n');
    		var tab = '\t';
    		var intend = '\t';
    		var sintend = intend + tab;	
    		if (!SCFUtils.isEmpty(v.description)){
    			result.push(intend + '<f20:description>' + v.description + '</f20:description>\n');
    		}	
    		if (v.duration.value > 0){
    			result.push(this.createDurationXml(v.duration,intend));
        	}
    		if (v.properties.length > 0){
    			result.push(intend + '<f20:properties>\n');
    			for(var i=0;i<v.properties.length;i++){
    				result.push(sintend + '<f20:property ');
    				result.push('id="' + this.value.flowid + '.' + v.properties[i].name + '" ');
    				result.push('name="' + v.properties[i].name + '" ');
    				result.push('data-type="' + v.properties[i].datatype + '" ');
    				result.push('init-value="' + v.properties[i].initvalue + '" ');
    				result.push('/>\n');
    			}			
    			result.push(intend + '</f20:properties>\n');
        	}
        	result.push(this.createResourcesXml(tab,intend));
    		if (obj.starts.length > 0){
    			result.push(intend + '<f20:start-nodes>\n');
    			for(var i=0;i<obj.starts.length;i++){
    				result.push(obj.starts[i]);
    			}			
    			result.push(intend + '</f20:start-nodes>\n');
        	}
    		if (obj.ends.length > 0){
    			result.push(intend + '<f20:end-nodes>\n');
    			for(var i=0;i<obj.ends.length;i++){
    				result.push(obj.ends[i]);
    			}			
    			result.push(intend + '</f20:end-nodes>\n');
        	}
    		if (obj.routers.length > 0){
    			result.push(intend + '<f20:routers>\n');
    			for(var i=0;i<obj.routers.length;i++){
    				result.push(obj.routers[i]);
    			}			
    			result.push(intend + '</f20:routers>\n');
        	}
    		if (obj.services.length > 0){
    			result.push(intend + '<s:services>\n');
    			for(var i=0;i<obj.services.length;i++){
    				result.push(obj.services[i]);
    			}			
    			result.push(intend + '</s:services>\n');
        	}
    		if (obj.activities.length > 0){
    			result.push(intend + '<f20:activities>\n');
    			for(var i=0;i<obj.activities.length;i++){
    				result.push(obj.activities[i]);
    			}			
    			result.push(intend + '</f20:activities>\n');
        	}
        	
    		result.push(intend + '<f20:transitions>\n');
        	for(var i=0;i<obj.egdes.length;i++){
        		result.push(this.createTransfXml(obj.egdes[i],obj,tab,sintend));
        	}
    		result.push(intend + '</f20:transitions>\n');
        	result.push(this.getExtandAttXml(cell,tab,intend,false));
    		result.push('</f20:workflow-process>\n');
    		return result.join('');
        },
        
        createTransfXml:function(cell,obj,tab,intend){    	
        	var result = [];
        	var v = cell.value;
    		var name = SCFUtils.isEmpty(v.sid)? ('Transition' + '_' + cell.id) : v.sid;
    		var id = this.value.flowid + "." + name;
    		result.push(intend + '<f20:transition ');
    		result.push(' id="' + id + '"');
    		result.push(' name="' + name + '"');
    		result.push(' is-default="' + (v.isdefault == '1') + '"');
    		
    		result.push(' is-loop="' + (cell.source.id == cell.target.id) + '"');
    		result.push(' from="' + obj.idmap[cell.source.id].id + '"');
    		result.push(' to="' + obj.idmap[cell.target.id].id + '"');
    		if (!SCFUtils.isEmpty(v.displayname)){
    			result.push(' display-name="' + v.displayname + '" ');
    		}		
    		result.push(' >\n');
    		if (!SCFUtils.isEmpty(v.condition)){
    			result.push(intend + tab + '<f20:condition>\n');
    			result.push(intend + tab + tab + '<f20:expression language="JEXL">\n');
    			result.push(intend + tab + tab + tab + '<f20:body>' + v.condition + '</f20:body>\n');
    			result.push(intend + tab + tab + ' </f20:expression>\n');
    			result.push(intend + tab + '</f20:condition>\n');
    		}		
    		if (!SCFUtils.isEmpty(v.description)){
    			result.push(intend + '<f20:description>' + v.description + '</f20:description>\n');
    		}	
    		result.push(intend + '</f20:transition>\n');
    		return result.join('');
        },
        
        getFireFlowXml:function(cell){
        	return this.createRootXml(cell);
        },
        
        createResourcesXml:function(tab,intend){    	
        	var result = [];
    		result.push(intend + '<r:resources>\n');
    		result.push(intend + tab + '<r:resource id="org.fireflow.constants.ProcessInstanceCreator"');
    		result.push(' display-name="流程创建者" name="ProcessInstanceCreator" resource-type="org.fireflow.constants.ProcessInstanceCreator">\n');
    		result.push(intend + tab + tab + '<r:resolver bean-name="org.fireflow.engine.resource.impl.ProcessInstanceCreatorResolver">\n');
    		result.push(intend + tab + tab + '</r:resolver>\n');
    		result.push(intend + tab + '</r:resource>\n');
    		
    		result.push(intend + tab + '<r:resource id="org.fireflow.constants.ActivityInstancePerformer"');
    		result.push(' display-name="活动实例执行者" name="ActivityInstancePerformer" resource-type="org.fireflow.constants.ActivityInstancePerformer">\n');
    		result.push(intend + tab + tab + '<r:resolver bean-name="org.fireflow.engine.resource.impl.ActivityInstancePerformerResolver">\n');
    		result.push(intend + tab + tab + tab + '<r:parameters>\n');
    		result.push(intend + tab + tab + tab + tab + '<r:parameter data-type="java.lang.String" display-name="活动Id" name="referencedActivityId" />\n');
    		result.push(intend + tab + tab + tab + '</r:parameters>\n');
    		result.push(intend + tab + tab + '</r:resolver>\n');
    		result.push(intend + tab + '</r:resource>\n');		
    		
    		result.push(intend + tab + '<r:resource id="org.fireflow.constants.VariableImplication"');
    		result.push(' display-name="流程变量所指的用户" name="VariableImplication" resource-type="org.fireflow.constants.VariableImplication">\n');
    		result.push(intend + tab + tab + '<r:resolver bean-name="org.fireflow.engine.resource.impl.VariableImplicationResolver">\n');
    		result.push(intend + tab + tab + tab + '<r:parameters>\n');
    		result.push(intend + tab + tab + tab + tab + '<r:parameter data-type="java.lang.String" display-name="流程变量名" name="variableName" />\n');
    		result.push(intend + tab + tab + tab + '</r:parameters>\n');
    		result.push(intend + tab + tab + '</r:resolver>\n');
    		result.push(intend + tab + '</r:resource>\n');	
    		
    		result.push(intend + tab + '<r:resource id="com.flow.fscpuserloader"');
    		result.push(' display-name="客户自定义用户查找策略" name="fscpuserloader" resource-type="org.fireflow.constants.Custom">\n');
    		result.push(intend + tab + tab + '<r:resolver bean-name="com.scf.logic.users.CustomerResourceResolver">\n');
    		result.push(intend + tab + tab + tab + '<r:parameters>\n');
    		result.push(intend + tab + tab + tab + tab + '<r:parameter data-type="java.lang.Integer" display-name="标志" name="flag" />\n');
    		result.push(intend + tab + tab + tab + '</r:parameters>\n');
    		result.push(intend + tab + tab + '</r:resolver>\n');
    		result.push(intend + tab + '</r:resource>\n');		
    		
    		result.push(intend + '</r:resources>\n');
    		return result.join('');
        },
        
        
        getExtandAttXml:function(cell, tab, indent,bounds){
        	var result = [];
    		var sindent = indent + tab;
    		if (bounds || (!SCFUtils.isEmpty(cell.value.extattrs) && cell.value.extattrs.length > 0)){
    			result.push(indent + '<f20:extended-attributes>\n');
    			if (bounds){
    				result.push(sindent + '<f20:extended-attribute name="FIRE_FLOW.bounds.x" value="' + cell.geometry.x + '" />\n');
    				result.push(sindent + '<f20:extended-attribute name="FIRE_FLOW.bounds.y" value="' + cell.geometry.y + '" />\n');
    				result.push(sindent + '<f20:extended-attribute name="FIRE_FLOW.bounds.width" value="' + cell.geometry.width + '" />\n');
    				result.push(sindent + '<f20:extended-attribute name="FIRE_FLOW.bounds.height" value="' + cell.geometry.height + '" />\n');
    			}
    			if (!SCFUtils.isEmpty(cell.value.extattrs) && cell.value.extattrs.length > 0){
    				for(var i=0;i<cell.value.extattrs.length;i++){
    					var attr = cell.value.extattrs[i];
    					result.push(sindent + '<f20:extended-attribute name="' + attr.name  +'" value="' + attr.value + '" />\n');

    				}
    			}
    			result.push(indent + '</f20:extended-attributes>\n');
    		}		
    		return result.join('');
        },        
        
        parseNodeAttibute :function(node){
        	var atts = new Object();
        	var attrs = node.attributes;
    		if (attrs != null) {
    			for (var i = 0; i < attrs.length; i++){
    				atts[attrs[i].nodeName] = mxUtils.htmlEntities(attrs[i].nodeValue);
    			}
    		}
    		return atts;
        },        
       
        parseNode:function(cell){
        	this.rootCell = cell;
        	var obj = {entry:'',property:[],services:[],resources:[],
        	activities:[],starts:[],ends:[],transfers:[],routers:[],idmap:new Object(),egdes:[]};
        	for(var i=0;i<cell.children.length;i++){
        		var ccell = cell.children[i];
        		if (ccell.value.type == 0){
        			obj.egdes.push(ccell);
        		}
        		this.parseNodeInner(ccell,obj);
        	}
    		return obj;
        },
        
        createStartNode:function(cell,obj,tab,indent){
        	var result = [];
        	tab = tab || '\t';
    		indent = indent || '';
    		var v = cell.value;
    		var name = SCFUtils.isEmpty(v.sname)? ('START_NODE' + '_' + cell.id) : v.sname;
    		var id = this.value.flowid + "." + name;
    		obj.entry = id;
    		obj.idmap[cell.id] = {id:id,obj:v};
    		result.push(indent + '<f20:start-node id="' + id + '" ');
    		result.push(' name="' + name + '" ');
    		if (!SCFUtils.isEmpty(v.displayname)){
    			result.push(' display-name="' + v.displayname + '" ');
    		}		
    		var sindent = indent + tab;
    		result.push('>\n');		
    		if (!SCFUtils.isEmpty(v.description)){
    			result.push(sindent + '<f20:description>' + v.description + '</f20:description>\n');
    		}
        	result.push(sindent + '<f20:decorator>\n');
        	var findent = sindent + tab;
        	result.push(findent + '<f20:normal-start-decorator/>\n');
        	result.push(sindent + '</f20:decorator>\n');
        	result.push(this.getExtandAttXml(cell,tab,sindent,true));
        	result.push(indent + '</f20:start-node>\n');
        	obj.starts.push(result.join(''));
        },
        
        createEndNode:function(cell,obj,tab,indent){
        	var result = [];
        	tab = tab || '\t';
    		indent = indent || '';
    		var v = cell.value;
    		var name = SCFUtils.isEmpty(v.sname)? ('END_NODE' + '_' + cell.id) : v.sname;
    		var id = this.value.flowid + "." + name;
    		obj.idmap[cell.id] = {id:id,obj:v};
    		result.push(indent + '<f20:end-node id="' + id + '" ');
    		result.push(' name="' + name  + '" ');
    		if (!SCFUtils.isEmpty(v.displayname)){
    			result.push(' display-name="' + v.displayname + '" ');
    		}		
    		var sindent = indent + tab;
    		result.push('>\n');		
    		if (!SCFUtils.isEmpty(v.description)){
    			result.push(sindent + '<f20:description>' + v.description + '</f20:description>\n');
    		}
        	result.push(sindent + '<f20:decorator>\n');
        	var findent = sindent + tab;
        	if (v.stype == '1'){
        		result.push(findent + '<f20:throw-compensation-decorator ');
        		result.push('compensation-codes="' + v.codes + '"/>\n');
        	}
        	else if (v.stype == '2'){
        		result.push(findent + '<f20:throw-fault-decorator ');
        		if (SCFUtils.isEmpty(v.codes)){
        			result.push('error-code="' + v.codes + '"');
        		}
        		result.push(' />\n');
        	}
        	else if (v.stype == '3'){
        		result.push(findent + '<f20:throw-termination-decorator/>\n');
        	}
        	else{
        		result.push(findent + '<f20:normal-end-decorator/>\n');
        	}
        	result.push(sindent + '</f20:decorator>\n');
        	result.push(this.getExtandAttXml(cell,tab,sindent,true));
        	result.push(indent + '</f20:end-node>\n');
        	obj.ends.push(result.join(''));
        },
        
        createRouterNode:function(cell,obj,tab,indent){
        	var result = [];
        	tab = tab || '\t';
    		indent = indent || '';
    		var v = cell.value;
    		var name = SCFUtils.isEmpty(v.sname)? ('Router' + '_' + cell.id) : v.sname;
    		var id = this.value.flowid + "." + name;
    		obj.idmap[cell.id] = {id:id,obj:v};
    		result.push(indent + '<f20:router id="' + id  + '" ');
    		result.push(' name="' + name + '" ');
    		if (!SCFUtils.isEmpty(v.displayname)){
    			result.push(' display-name="' + v.displayname + '" ');
    		}		
    		var sindent = indent + tab;
    		result.push('>\n');		
    		if (!SCFUtils.isEmpty(v.description)){
    			result.push(sindent + '<f20:description>' + v.description + '</f20:description>\n');
    		}
        	
        	result.push(this.getExtandAttXml(cell,tab,sindent,true));
        	result.push(indent + '</f20:router>\n');
        	obj.routers.push(result.join(''));
        },
        
        createActivityNode:function(cell,obj,tab,indent){
        	var result = [];
        	tab = tab || '\t';
    		indent = indent || '';
    		var v = cell.value;
    		var name = SCFUtils.isEmpty(v.sid)? ('Activity' + '_' + cell.id) : v.sid;
    		var id = this.value.flowid + "." + name;
    		obj.idmap[cell.id] = {id:id,obj:v};
    		result.push(indent + '<f20:activity id="' + id  + '" ');
    		result.push(' name="' + name  + '" ');
    		if (!SCFUtils.isEmpty(v.displayname)){
    			result.push(' display-name="' + v.displayname + '" ');
    		}
    		result.push(' loop-strategy="org.fireflow.constants.' + v.loops  + '" ');
    		var sindent = indent + tab;
    		result.push('>\n');		
    		if (!SCFUtils.isEmpty(v.description)){
    			result.push(sindent + '<f20:description>' + v.description + '</f20:description>\n');
    		}
    		if (v.duration.value > 0){
    			result.push(this.createDurationXml(v.duration,sindent));
        	}
        	for(var i=0;i<cell.children.length;i++){
        		var ccell = cell.children[i];
        		if (ccell.value.type == 1){
        			result.push(this.createHumanServiceXml(ccell,obj,tab,sindent));
        		}
        		else if (ccell.value.type == 2){
        			result.push(this.createAutoServiceXml(ccell,obj,tab,sindent));
        		}
        	}
        	if (!SCFUtils.isEmpty(v.resource.ownerRec) || !SCFUtils.isEmpty(v.resource.adminRec) || !SCFUtils.isEmpty(v.resource.readRec)){
        		result.push(this.createResourceBindXml(cell,obj,tab,sindent));
        	}
        	result.push(this.getExtandAttXml(cell,tab,sindent,true));
        	result.push(indent + '</f20:activity>\n');
        	obj.activities.push(result.join(''));
        },
        
        createResourceBindXml:function(cell,obj,tab,indent){
        	var result = [];
        	var v = cell.value;
        	var r = v.resource;
        	result.push(indent + '<f20:resource-binding ');
    		if (!SCFUtils.isEmpty(v.displayname)){
    			result.push(' display-name="' + v.displayname + '" ');
    		}
    		result.push(' assignment-strategy="org.fireflow.constants.ASSIGN_TO_' + r.assgStor + '" >\n');
    		var sindent = indent + tab;
        	var rindent = sindent + tab + tab + tab;
        	if (!SCFUtils.isEmpty(r.ownerRec)){    		
        		result.push(sindent + '<f20:potential-owners>\n');
        		result.push(sindent + tab + '<f20:resource-ref resource-id="' + r.ownerRec + '" ');
    			if (r.ownerExt.length > 0){
    				result.push('>\n');
        			result.push(sindent + tab + tab + '<f20:parameter-assignments>\n');
    				for(var i=0;i<r.ownerExt.length;i++){
    					var attr = r.ownerExt[i];
        				result.push(rindent + '<f20:parameter-assignment>\n');
        				result.push(rindent + tab + '<f20:from>\n');
        				result.push(rindent + tab + tab + '<f20:expression language="JEXL">\n');
        				result.push(rindent + tab + tab + tab + '<f20:body>processVars.' + attr.name + '</f20:body>\n');
        				result.push(rindent + tab + tab + '</f20:expression>\n');
        				result.push(rindent + tab + '</f20:from>\n');
        				result.push(rindent + tab + '<f20:to>' + attr.value + '</f20:to>\n');
        				result.push(rindent + '</f20:parameter-assignment>\n');
    				}
        			result.push(sindent + tab + tab + '</f20:parameter-assignments>\n');
        			result.push(sindent + tab + '</f20:resource-ref>\n');
    			}
    			else{
    				result.push(' />\n');
    			}
        		result.push(sindent + '</f20:potential-owners>\n');
        	}    	
        	if (!SCFUtils.isEmpty(r.adminRec)){    		
        		result.push(sindent + '<f20:administrators>\n');
        		result.push(sindent + tab + '<f20:resource-ref resource-id="' + r.adminRec + '" ');
    			if (r.adminExt.length > 0){
    				result.push('>\n');
        			result.push(sindent + tab + tab + '<f20:parameter-assignments>\n');
    				for(var i=0;i<r.adminExt.length;i++){
    					var attr = r.adminExt[i];
        				result.push(rindent + '<f20:parameter-assignment>\n');
        				result.push(rindent + tab + '<f20:from>\n');
        				result.push(rindent + tab + tab + '<f20:expression language="JEXL">\n');
        				result.push(rindent + tab + tab + tab + '<f20:body>processVars.' + attr.name + '</f20:body>\n');
        				result.push(rindent + tab + tab + '</f20:expression>\n');
        				result.push(rindent + tab + '</f20:from>\n');
        				result.push(rindent + tab + '<f20:to>' + attr.value + '</f20:to>\n');
        				result.push(rindent + '</f20:parameter-assignment>\n');
    				}
        			result.push(sindent + tab + tab + '</f20:parameter-assignments>\n');
        			result.push(sindent + tab + '</f20:resource-ref>\n');
    			}
    			else{
    				result.push(' />\n');
    			}
        		result.push(sindent + '</f20:administrators>\n');
        	}    	
        	if (!SCFUtils.isEmpty(r.readRec)){    		
        		result.push(sindent + '<f20:readers>\n');
        		result.push(sindent + tab + '<f20:resource-ref resource-id="' + r.readRec + '" ');
    			if (r.readExt.length > 0){
    				result.push('>\n');
        			result.push(sindent + tab + tab + '<f20:parameter-assignments>\n');
    				for(var i=0;i<r.readExt.length;i++){
    					var attr = r.readExt[i];
        				result.push(rindent + '<f20:parameter-assignment>\n');
        				result.push(rindent + tab + '<f20:from>\n');
        				result.push(rindent + tab + tab + '<f20:expression language="JEXL">\n');
        				result.push(rindent + tab + tab + tab + '<f20:body>processVars.' + attr.name + '</f20:body>\n');
        				result.push(rindent + tab + tab + '</f20:expression>\n');
        				result.push(rindent + tab + '</f20:from>\n');
        				result.push(rindent + tab + '<f20:to>' + attr.value + '</f20:to>\n');
        				result.push(rindent + '</f20:parameter-assignment>\n');
    				}
        			result.push(sindent + tab + tab + '</f20:parameter-assignments>\n');
        			result.push(sindent + tab + '</f20:resource-ref>\n');
    			}
    			else{
    				result.push(' />\n');
    			}
        		result.push(sindent + '</f20:readers>\n');
        	}
        	result.push(indent + '</f20:resource-binding>\n');
        	return result.join('');
        },
        
        getProcProperty:function(name){
        	var ps=this.rootCell.value.properties;
        	for(var i=0;i<ps.length;i++){
        		if (ps[i].name == name){
        			return ps[i];
        		}
        	}
        	return null;
        },
        
        createAutoServiceXml:function(cell,obj,tab,indent){
        	var result = [];
        	tab = tab || '\t';
    		aindent = '\t\t';
    		var v = cell.value;
    		var name = SCFUtils.isEmpty(v.sid)? ('Service' + '_' + cell.id) : v.sid;
    		//var id = this.value.flowid + "." + name;
    		var id = name;
    		obj.idmap[cell.id] = {id:id,obj:v};
    		result.push(aindent + '<s:service id="' + id  + '" ');
    		result.push(' name="' + name + '" ');
    		result.push(' service-type="Java"');
    		if (!SCFUtils.isEmpty(v.displayname)){
    			result.push(' display-name="' + v.displayname + '" ');
    		}
    		var sindent = aindent + tab;
    		result.push('>\n');		
    		if (!SCFUtils.isEmpty(v.description)){
    			result.push(sindent + '<f20:description>' + v.description + '</f20:description>\n');
    		}		
        	result.push(sindent + '<s:operations>\n');
        	result.push(sindent + tab + '<s:operation>\n');
        	result.push(sindent + tab + tab + '<s:operation-name>' + v.optpath + '</s:operation-name>\n');
        	if (v.inputargs.length>0 || v.outputargs > 0){
        		result.push(sindent + tab + tab + '<s:io-specification>\n');
        		if (v.inputargs.length>0){    			
        			result.push(sindent + tab + tab + tab + '<s:inputs>\n');
        			for(var i=0;i<v.inputargs.length;i++){  
        				var arg = v.inputargs[i];
        				result.push(sindent + tab + tab + tab + tab + '<s:input ');
        				result.push('name="' + arg.name + '" ');
        				var p = this.getProcProperty(arg.dirct);
        				result.push('data-type="' + p.datatype + '" />\n');
        			}
        			result.push(sindent + tab + tab + tab + '</s:inputs>\n');
        		}
        		if (v.outputargs.length>0){    			
        			result.push(sindent + tab + tab + tab + '<s:outputs>\n');
        			for(var i=0;i<v.outputargs.length;i++){  
        				var arg = v.outputargs[i];
        				result.push(sindent + tab + tab + tab + tab + '<s:output ');
        				result.push('name="' + arg.name + '" ');
        				var p = this.getProcProperty(arg.dirct);
        				result.push('data-type="' + p.datatype + '" />\n');
        			}
        			result.push(sindent + tab + tab + tab + '</s:outputs>\n');
        		}
        		result.push(sindent + tab + tab + '</s:io-specification>\n');
        	}
        	result.push(sindent + tab + '</s:operation>\n');
        	result.push(sindent + '</s:operations>\n');
        	result.push(this.getExtandAttXml(cell,tab,sindent,false));
        	result.push(this.createServicePro(cell,obj,tab,sindent));
        	result.push(aindent + '</s:service>\n');
        	obj.services.push(result.join(''));
        	result = [];
    		result.push(indent + '<f20:service-binding service-id="' + id  + '" ');
        	result.push(' operation-name="' + v.optpath + '"');
        	if (v.inputargs.length>0 || v.outputargs > 0){
        		result.push('>\n');
        		if (v.inputargs.length>0){    			
        			result.push(indent + tab + tab  + '<f20:input-assignments>\n');
        			sindent = indent + tab + tab + tab;
        			for(var i=0;i<v.inputargs.length;i++){  
        				var arg = v.inputargs[i];
        				result.push(sindent  + '<f20:input-assignment>\n');
        				result.push(sindent + tab  + '<f20:from>\n');
        				result.push(sindent + tab + tab  + '<f20:expression language="JEXL">\n');
        				result.push(sindent + tab + tab + tab + '<f20:body>processVars.' + arg.dirct + '</f20:body>\n');
        				result.push(sindent + tab + tab  + '</f20:expression>\n');
        				result.push(sindent + tab  + '</f20:from>\n');
        				result.push(sindent + tab + '<f20:to>inputs.' + arg.name + '</f20:to>\n');
        				result.push(sindent  + '</f20:input-assignment>\n');
        			}
        			result.push(indent + tab + tab  + '</f20:input-assignments>\n');
        		}
        		if (v.outputargs.length>0){    			
        			result.push(indent + tab + tab  + '<f20:output-assignments>\n');
        			sindent = indent + tab + tab + tab;
        			for(var i=0;i<v.outputargs.length;i++){  
        				var arg = v.outputargs[i];
        				result.push(sindent  + '<f20:output-assignment>\n');
        				result.push(sindent + tab  + '<f20:from>\n');
        				result.push(sindent + tab + tab  + '<f20:expression language="JEXL">\n');
        				result.push(sindent + tab + tab + tab + '<f20:body>outputs.' + arg.name + '</f20:body>\n');
        				result.push(sindent + tab + tab  + '</f20:expression>\n');
        				result.push(sindent + tab  + '</f20:from>\n');
        				result.push(sindent + tab + '<f20:to>processVars.' + arg.dirct + '</f20:to>\n');
        				result.push(sindent  + '</f20:output-assignment>\n');
        			}
        			result.push(indent + tab + tab  + '</f20:output-assignments>\n');
        		}    		
    			result.push(indent + '</f20:service-binding>\n');
        	}
        	else{
        		result.push(' />\n');
        	}
    		return result.join('');
        },
        
        createHumanServiceXml:function(cell,obj,tab,indent){
        	var result = [];
        	tab = tab || '\t';
    		aindent = '\t\t';
    		var v = cell.value;
    		var name = SCFUtils.isEmpty(v.sid)? ('Service' + '_' + cell.id) : v.sid;
    		//var id = this.value.flowid + "." + name;
    		var id = name;
    		obj.idmap[cell.id] = {id:id,obj:v};
    		result.push(aindent + '<s:service id="' + id  + '" ');
    		result.push(' name="' + name + '" ');
    		result.push(' service-type="Human"');
    		if (!SCFUtils.isEmpty(v.displayname)){
    			result.push(' display-name="' + v.displayname + '" ');
    		}
    		var sindent = aindent + tab;
    		result.push('>\n');		
    		if (!SCFUtils.isEmpty(v.description)){
    			result.push(sindent + '<f20:description>' + v.description + '</f20:description>\n');
    		}		
        	result.push(sindent + '<s:operations>\n');
        	result.push(sindent + tab + '<s:operation>\n');
        	result.push(sindent + tab + tab + '<s:operation-name>' + v.optpath + '</s:operation-name>\n');
        	result.push(sindent + tab + '</s:operation>\n');
        	result.push(sindent + '</s:operations>\n');
        	result.push(this.getExtandAttXml(cell,tab,sindent,false));
        	result.push(this.createServicePro(cell,obj,tab,sindent,2));
        	result.push(aindent + '</s:service>\n');
        	obj.services.push(result.join(''));
        	result = [];
    		result.push(indent + '<f20:service-binding service-id="' + id  + '" ');
        	result.push(' operation-name="' + v.optpath + '" />\n');
    		return result.join('');
        },
        
        createServicePro:function(cell,obj,tab,indent){
        	var result = [];
    		var sindent = indent + tab;
    		var v =cell.value;
        	result.push(indent + '<s:prop-groups>\n');
        	result.push(sindent + '<s:prop-group name="Common Properties" display-name="公共属性组">\n');
        	if (v.type == 2){
        		result.push(sindent + tab + '<s:prop ');  			
        		result.push('name="' + (v.beantype == '1'?'JavaClassName':'JavaBeanName' )+ '" ');		
        		result.push('display-name="' + (v.beantype == '1'?'Java类名':'Java Bean 名' ) + '" ');
        		result.push('value="' + v.beanname + '" />\n ');
        	}
        	if(v.properties.length>0){
        		for(var i=0;i<v.properties.length;i++){
        			var part = v.properties[i];
        			result.push(sindent + tab + '<s:prop ');  			
        			result.push('name="' + part.sid + '" ');		
        			result.push('display-name="' + part.displayname + '" ');
        			result.push('value="' + part.value + '" />\n ');
        		}
        	}
        	result.push(sindent + '</s:prop-group>\n');
        	result.push(indent + '</s:prop-groups>\n');
        	return result.join('');
        },
        
        parseNodeInner:function(cell,obj){
        	var tab = "\t";
        	var indent = "\t\t";
        	if (cell.value.type == -1){
        		 this.createStartNode(cell,obj,tab,indent);
        		 return;
        	}
        	else if (cell.value.type == -2){
        		this.createEndNode(cell,obj,tab,indent);
        	}
        	else if (cell.value.type == -3){
        		this.createRouterNode(cell,obj,tab,indent);
        	}
        	else if (cell.value.type == 10){
        		this.createActivityNode(cell,obj,tab,indent);
        	}
    		return obj;
        },
        
        getPrettyXml: function(node) {
        	var result = [];
    		if (node != null) {
    			var nodexmls = new Object();
    			nodexmls = this.parseNode(node,nodexmls);
    			if (!SCFUtils.isEmpty(nodexmls['START_NODE'])) {
    				result.push(nodexmls['START_NODE']);
    			} 
    			if (!SCFUtils.isEmpty(nodexmls['ACTIVITYS'])) {
    				result.push(' <fpdl:Activities>\n');
    				var cols = nodexmls['ACTIVITYS'];
    				for(var i=0;i<cols.length;i++){
    					result.push(cols[i]);
    				}
    				result.push(' </fpdl:Activities>\n');
    			} 
    			if (!SCFUtils.isEmpty(nodexmls['Synchronizers'])) {
    				result.push(' <fpdl:Synchronizers>\n');
    				var cols = nodexmls['Synchronizers'];
    				for(var i=0;i<cols.length;i++){
    					result.push(cols[i]);
    				}
    				result.push(' </fpdl:Synchronizers>\n');
    			} 
    			if (!SCFUtils.isEmpty(nodexmls['END_NODE'])) {
    				result.push(' <fpdl:EndNodes>\n');
    				result.push(nodexmls['END_NODE']);
    				result.push(' </fpdl:EndNodes>\n');
    			} 
    			if (!SCFUtils.isEmpty(nodexmls['TRANTS'])) {
    				result.push(' <fpdl:Transitions>\n');
    				var cols = nodexmls['TRANTS'];
    				for(var i=0;i<cols.length;i++){
    					result.push(cols[i]);
    				}
    				result.push(' </fpdl:Transitions>\n');
    			} 
    		}
    		return result.join('');
    	}
	});
})(jQuery);
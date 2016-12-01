package com.ut.scf.core.component.logic;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;

import com.ut.comm.xml.logicflow.LogicNode;
import com.ut.scf.core.utils.ClassLoadHelper;

@Component("logicFactory")
public class LogicFactoryImpl implements ILogicFactory{

	@Resource(name = "entityLogic")
	protected  ILogicFlowComponent entityLogic;
	
	@Resource(name = "hqlLogic")
	protected  ILogicFlowComponent hqlLogic;
		
	
	public  ILogicFlowComponent getProcessor(LogicNode logicFlow) throws Exception {
		String strQueryType = logicFlow.getType();
		if("E".equalsIgnoreCase(strQueryType)){
			return entityLogic;
		}else if("S".equalsIgnoreCase(strQueryType)){
			return hqlLogic;
		}else if("C".equalsIgnoreCase(strQueryType)){
			return ClassLoadHelper.getLogicProcessor(logicFlow.getComponent());
		}
		throw new Exception("Can not instance Logic processor.");
	}
	
}

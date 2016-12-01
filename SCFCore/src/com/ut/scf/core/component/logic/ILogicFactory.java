package com.ut.scf.core.component.logic;

import com.ut.comm.xml.logicflow.LogicNode;

public interface ILogicFactory {
	public ILogicFlowComponent getProcessor(LogicNode node) throws Exception;
}

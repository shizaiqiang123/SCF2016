package com.ut.scf.mule.config;

import java.util.Set;

public class MuleFlowLogicEntity implements IFlowLogic{
	//准确来说，这个对象应该是个树型结构，不是简单的队列
	private Set<ILogicEntity> componentSet;
	
	public void addFlowLogic(ILogicEntity iComp) {
		componentSet.add(iComp);
	}
	
	public void addFlowLogic(Set<ILogicEntity> iCompSet) {
		componentSet.addAll(iCompSet);
	}


	@Override
	public Set<ILogicEntity> getFlowLogic() {
		return componentSet;
	}

}

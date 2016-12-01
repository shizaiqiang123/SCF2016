package com.ut.scf.mule.config;

import java.util.Set;

public class MuleFlowLogicEntity implements IFlowLogic{
	//׼ȷ��˵���������Ӧ���Ǹ����ͽṹ�����Ǽ򵥵Ķ���
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

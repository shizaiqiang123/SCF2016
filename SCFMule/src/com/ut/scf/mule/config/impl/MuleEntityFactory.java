package com.ut.scf.mule.config.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.util.Assert;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.ut.scf.mule.config.ILogicEntity;
import com.ut.scf.mule.config.MuleFlowLogicEntity;

public class MuleEntityFactory {
	public final String LOGIC_COMPONENT_ROOT= "logic_flow";
	
	public final String LOGIC_COMPONENT_NAME_JAVA = "component";

	public final String LOGIC_COMPONENT_TYPE = "module";
	
	/***
	 * 	<logic_flow>
	 *	<component type="singleton-object">com.ut.test.webservices.impl.MLoanService</component>
	 *	</logic_flow>
	 */
	private Node componentNode;
	
	private static MuleEntityFactory muleEntityFactory;
	
	private MuleEntityFactory (){
	}
	
	public static MuleEntityFactory newInstence(){
		if(muleEntityFactory==null)
			muleEntityFactory = new MuleEntityFactory();
		return muleEntityFactory;
	}
	
	public MuleFlowLogicEntity createFlowLogics(Node componentNode){
		MuleFlowLogicEntity entitySet = new MuleFlowLogicEntity();
		
		this.componentNode = componentNode;
		NodeList childEntityNodes =componentNode.getChildNodes();
		if(childEntityNodes!=null&&childEntityNodes.getLength()>0){
			for(int i = 0;i<childEntityNodes.getLength();i++){
				Node entityNode = childEntityNodes.item(i);
				if(entityNode.getNodeType()!=Node.DOCUMENT_NODE)
					continue;
				entitySet.addFlowLogic(createSingleFlowLogicEntity(entityNode));
			}
		}
		return entitySet;
	}
	
	private ILogicEntity createSingleFlowLogicEntity(Node entityNode){
		Assert.notNull(entityNode);
		String entityName = entityNode.getNodeName();
		
		
		return null;
	}
	
}

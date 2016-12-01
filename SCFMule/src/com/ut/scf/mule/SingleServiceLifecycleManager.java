package com.ut.scf.mule;

import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.mule.api.MuleContext;
import org.mule.api.MuleException;
import org.mule.api.construct.FlowConstruct;
import org.mule.api.endpoint.EndpointException;
import org.mule.api.lifecycle.InitialisationException;
import org.mule.api.lifecycle.LifecyclePhase;
import org.mule.api.registry.Registry;
import org.mule.lifecycle.LifecycleObject;
import org.mule.lifecycle.RegistryLifecycleManager;
import org.mule.lifecycle.phases.ContainerManagedLifecyclePhase;
import org.mule.transport.AbstractConnector;

@Deprecated
public class SingleServiceLifecycleManager extends RegistryLifecycleManager{

	public SingleServiceLifecycleManager(String id, Registry object,MuleContext muleContext) {
		super(id, object, muleContext);
	}
	
	
	public void fireLifecycle(String phaseName, Object serviceObj) throws MuleException
    {
        LifecyclePhase phase = phases.get(phaseName);

//        if (logger.isDebugEnabled())
//        {
//            logger.debug("Applying lifecycle phase: " + phase + " for registry: " + object.getClass().getSimpleName());
//        }
//
//        if (phase instanceof ContainerManagedLifecyclePhase)
//        {
//            phase.applyLifecycle(object);
//            return;
//        }

        // overlapping interfaces can cause duplicates
        Set<Object> duplicates = new HashSet<Object>();

        for (LifecycleObject lo : phase.getOrderedLifecycleObjects())
        {
            // TODO Collection -> List API refactoring
            Collection<?> targetsObj = getLifecycleObject().lookupObjectsForLifecycle(lo.getType());
            List<Object> targets = new LinkedList<Object>(targetsObj);
            if (targets.size() == 0)
            {
                continue;
            }

            lo.firePreNotification(muleContext);

            for (Iterator<Object> target = targets.iterator(); target.hasNext();)
            {
                Object o = target.next();
                if(!matchService(o,serviceObj)){
                	continue;
                }
                if (duplicates.contains(o))
                {
                    target.remove();
                }
                else
                {
                    if (logger.isDebugEnabled())
                    {
                        logger.debug("lifecycle phase: " + phase.getName() + " for object: " + o);
                    }
                    phase.applyLifecycle(o);
                    target.remove();
                    duplicates.add(o);
                }
            }

            lo.firePostNotification(muleContext);
        }
    }


	private boolean matchService( Object o,Object serviceObj) {
		if(o.getClass().equals(serviceObj.getClass())){
			return o.equals(serviceObj);
		}else if (o instanceof AbstractConnector){
			FlowConstruct flow = (FlowConstruct)serviceObj;
//			try {
//				AbstractConnector connector = (AbstractConnector) flow.getMuleContext().getEndpointFactory()
//						.getEndpointBuilder(flow.getName()).buildInboundEndpoint().getConnector();
				String type = flow.getStatistics().getFlowConstructType();
				System.out.println(type);
//				return o.equals(connector);
//			} catch (InitialisationException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			} catch (EndpointException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			} catch (MuleException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
		}
		return false;
	}
	

}

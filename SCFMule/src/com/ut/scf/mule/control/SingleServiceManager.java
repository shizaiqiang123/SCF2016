package com.ut.scf.mule.control;

import org.mule.api.MuleException;
import org.mule.api.construct.FlowConstruct;
import org.mule.api.lifecycle.Startable;
import org.mule.api.lifecycle.Stoppable;
import org.mule.api.lifecycle.Lifecycle;

public class SingleServiceManager {
	
	public void startFlow(FlowConstruct flow)
    {
        if (flow instanceof Startable)
        {
//            logger.info("Stopping flow '" + flow.getName() + "' due to exception");

            try
            {
                ((Lifecycle) flow).start();
            }
            catch (MuleException e)
            {
//                logger.error("Unable to stop flow '" + flow.getName() + "'", e);
            }
        }
        else
        {
//            logger.warn("Flow is not stoppable");
        }
    }
	
	
	public void stopFlow(FlowConstruct flow)
    {
        if (flow instanceof Stoppable)
        {
//            logger.info("Stopping flow '" + flow.getName() + "' due to exception");

            try
            {
                ((Lifecycle) flow).stop();
            }
            catch (MuleException e)
            {
//                logger.error("Unable to stop flow '" + flow.getName() + "'", e);
            }
        }
        else
        {
//            logger.warn("Flow is not stoppable");
        }
    }
	
	//ÐèÒªÍêÉÆ
	public void pauseFlow(FlowConstruct flow)
    {
        if (flow instanceof Stoppable)
        {
//            logger.info("Stopping flow '" + flow.getName() + "' due to exception");

            try
            {
                ((Lifecycle) flow).stop();
            }
            catch (MuleException e)
            {
//                logger.error("Unable to stop flow '" + flow.getName() + "'", e);
            }
        }
        else
        {
//            logger.warn("Flow is not stoppable");
        }
    }
}

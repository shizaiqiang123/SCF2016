package com.ut.scf.core.batch.listener;

import org.quartz.listeners.TriggerListenerSupport;

public class DefaultTriggerlistener extends TriggerListenerSupport{

	@Override
	public String getName() {
		return "DefaultTriggerlistener";
	}

}

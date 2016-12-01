package com.ut.scf.core.batch.listener;

import org.quartz.listeners.JobListenerSupport;

public class DefaultJobListener extends JobListenerSupport{

	@Override
	public String getName() {
		return "Default Job Listener";
	}

}

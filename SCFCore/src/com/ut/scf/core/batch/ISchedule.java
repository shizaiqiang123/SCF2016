package com.ut.scf.core.batch;

import org.quartz.Scheduler;

public interface ISchedule {
	public Scheduler getSchedule();

	void shutdown();

	void startSchedule();

	void stopSchedule();
}

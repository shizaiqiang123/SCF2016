package com.ut.scf.core.batch;

import org.apache.log4j.Logger;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.springframework.stereotype.Component;

import com.ut.scf.core.log.APLogUtil;

@Component("scheduleManager")
public class ScheduleManager implements ISchedule{
	protected Logger getLogger(){
		return APLogUtil.getBatchLogger();
	}
	
	@Override
	public Scheduler getSchedule() {
		SchedulerFactory schedFact = new org.quartz.impl.StdSchedulerFactory();
		try {
			Scheduler sched = schedFact.getScheduler();
			getLogger().debug("Scheduler Instance Id is:"+sched.getSchedulerName());
			return sched;
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	@Override
	public void stopSchedule() {
		try {
			getSchedule().pauseAll();
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void startSchedule() {
		try {
			getSchedule().start();
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void shutdown() {
		try {
			getSchedule().shutdown();
			getLogger().info("Schedule shutdown success.");
		} catch (SchedulerException e) {
			getLogger().error("Schedule shutdown failed:"+e.toString());
			try {
				getSchedule().shutdown(false);
			} catch (SchedulerException e1) {
				getLogger().error("Schedule forbiden shutdown failed:"+e.toString());
			}
		}
	}
}

package com.ut.scf.core.holiday;

import java.util.Date;

public interface IHoliday {
	public boolean isHoliday(Date weekend);
	
	public boolean isWorkingday(Date workingDate);
	
	public Date getAfterWorkingDate(Date currentDate,int days);
	
	public Date getBeforeWorkingDate(Date currentDate,int days);
	
	public int getWorkingDays(Date fromDate,Date toDate);
	
	public Date getAfterDate(Date currentDate,int days);
	
	public Date getBeforeDate(Date currentDate,int days);
	
	public int getDays(Date fromDate,Date toDate);
}

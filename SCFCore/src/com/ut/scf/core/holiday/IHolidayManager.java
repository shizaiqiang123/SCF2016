package com.ut.scf.core.holiday;

import java.util.Date;

/**
 * 
 * @author PanHao
 * @see 用来定义节假日
 *
 */
public interface IHolidayManager {
	public void addHoliday(Date holiday);
	
	public void deleteHoliday(Date holiday);
	
	public void addWeekend(Date holiday);
	
	public void deleteWeekend(Date weekend);
	
	public boolean isHoliday(Date weekend);
	
	public void importHoliday(Object o);
}

package com.ut.scf.core.batch;

import java.util.List;
import java.util.Map;

public class BatchInfoImpl extends BatchStatus implements IBatchInfo{
//	private IBatchTask batchTask;
	
	private int total;
	private List<Object> rows;
	private List<Object> footer;
 
	@Override
	public void setBatchTask(IBatchTask task) {
//		this.batchTask = task;
		setTotal(task.getTotal());
		List<Object> retMap = task.getBatchTask();
		setRows(retMap);
	}

//	@Override
//	public IBatchTask getTask() {
//		return batchTask;
//	}

	public int getTotal() {
		return total;
	}

	private void setTotal(int total) {
		this.total = total;
	}

	public List<Object> getRows() {
		return rows;
	}

	private void setRows(List<Object> rows) {
		this.rows = rows;
	}

	public List<Object> getFooter() {
		return footer;
	}

	public void setFooter(List<Object> footer) {
		this.footer = footer;
	}


}

package com.ut.scf.core.services.report.impl;

import com.comm.pojo.report.BirtReportParameter;
import com.comm.pojo.report.IReportParameter;
import com.comm.pojo.report.IReportResponse;

public interface IReportService {
	/**
	 * 生成落地文件到指定目录下
	 * @param paraments： 请求报文信息
	 */
	public IReportResponse save(IReportParameter paraments);
	
	/**
	 * 生成临时文件，并返回文件内容
	 * @param paraments ：请求报文信息
	 * @return
	 */
	public IReportResponse show(IReportParameter paraments);
	
	/**
	 * 生成落地文件保存到指定目录，并返回文件内容
	 * @param paraments ： 请求报文信息
	 * @return
	 */
	public IReportResponse saveAndShow(IReportParameter paraments);
	
	/**
	 * 请求类型： save
	 */
	public final String REQ_TYPE_SAVE="save";
	
	/**
	 * 请求类型：展现
	 */
	public final String REQ_TYPE_SHOW="show";
	
	/**
	 * 请求类型：保存并展现
	 */
	public final String REQ_TYPE_SAVE_SHOW="saveAndShow";
}

package com.ut.report.listener;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class WebReporttFilter implements Filter
{

	public WebReporttFilter()
	{
		super();
	}

	public void init(FilterConfig fConfig) throws ServletException
	{

	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain fChain) throws IOException, ServletException
	{
		request.setCharacterEncoding("UTF-8");
		fChain.doFilter(request, response);
	}

	public void destroy()
	{

	}

}
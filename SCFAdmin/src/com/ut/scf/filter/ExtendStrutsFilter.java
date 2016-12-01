package com.ut.scf.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter;

public class ExtendStrutsFilter extends StrutsPrepareAndExecuteFilter {

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request2 = (HttpServletRequest) request;
		String uri = request2.getRequestURI();
		if (uri.contains("/WS_Server")) {
			chain.doFilter(request, response);
		} else if (uri.contains("/http_post/")) {
			String route = uri.split("/http_post/")[1];
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/xml");
			PrintWriter out = response.getWriter();
			out.write("<root><data>123</data></root>");
			out.flush();
		} else {
			super.doFilter(request, response, chain);
		}
	}
}

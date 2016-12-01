package com.ut.scf.web.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WSWebDispatcher {
	public static  void invokeServlet(HttpServletRequest req, HttpServletResponse res, String url) throws ServletException, IOException {
		RequestDispatcher dispatcher = req.getRequestDispatcher(url);
		dispatcher.forward(req, res);
	}
	
	public static  void forward(HttpServletRequest req, HttpServletResponse resp, String toServlet) throws ServletException, IOException {
		StringBuffer buf = new  StringBuffer();
		buf.append("/");
		buf.append("servlets/");
		buf.append(toServlet);
		RequestDispatcher dispatcher = req.getRequestDispatcher(buf.toString());
		dispatcher.forward(req, resp);
	}
}

package com.ut.scf.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.scf.web.session.SessionManager;
import com.ut.scf.web.session.UserSessionObj;

public class UserSessionFilter implements Filter {
	private Logger logger = LoggerFactory.getLogger("webLog");
	@Override
	public void destroy() {
		logger.debug("filter destroy.");
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException,
			ServletException {
		HttpServletRequest httpReq = (HttpServletRequest) req;
		String requestURI = httpReq.getRequestURI().toLowerCase();
		String reqType = httpReq.getParameter("reqLoginType");
		if(requestURI.endsWith(".jpg")||requestURI.endsWith(".js")||requestURI.endsWith(".css")||requestURI.endsWith(".png")||requestURI.endsWith(".gif")){
			chain.doFilter(req, res);
			return;
		}		
		if("noLogin".equals(reqType)){//非登陆请求
			chain.doFilter(req, res);
			return;
		}
		// 判断是否是首次登陆
		boolean isLogin = requestURI.endsWith("login");
		long times = System.currentTimeMillis();
		UserSessionObj userInfo = SessionManager.getUserInfoFromSession(httpReq);
		if(userInfo==null){
			//暂时多取一次，防止ZK实例化失败
			userInfo = SessionManager.getUserInfoFromSession(httpReq);
		}
		logger.error("查询user info 耗时："+(System.currentTimeMillis()-times));
		if (!isLogin && userInfo == null) {
			if(requestURI.endsWith(".jsp")){
				req.setAttribute("message", "登陆超时，请重新登陆！");
				RequestDispatcher requestDispatcher = req.getRequestDispatcher("/advertisement.jsp");
				requestDispatcher.forward(req, res);
			}else{
				req.setAttribute("message", "登陆超时，请重新登陆！");
				//在后面的action中判断此属性
				chain.doFilter(req, res);
			}
		} else if(requestURI.endsWith("login.jsp")){
			RequestDispatcher requestDispatcher = req.getRequestDispatcher("/advertisement.jsp");
			requestDispatcher.forward(req, res);
		}else{
			chain.doFilter(req, res);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		logger.debug("filter init.");
	}

}

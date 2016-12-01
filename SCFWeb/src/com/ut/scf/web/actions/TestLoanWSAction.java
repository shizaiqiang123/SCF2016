//package com.ut.scf.web.actions;
//
//import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;
//
//import com.ut.scf.web.servlet.AbsServletRequestAware;
//import com.ut.test.webservices.IMLoanInterface;
//import com.ut.test.webservices.entity.MLoanEntity;
//
//public class TestLoanWSAction extends AbsServletRequestAware {
//
//	/**
//	 * 
//	 */
//	private static final long serialVersionUID = 1L;
//	
//	public String execute() throws Exception {
//		String requestType = request.getServletPath();
//		String name = request.getParameter("name");
//		String op = request.getParameter("opt");
//		JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
//		factory.setServiceClass(IMLoanInterface.class);
//		factory.setAddress("http://localhost:65082/services/mLoan");
//		IMLoanInterface service = (IMLoanInterface) factory.create();
//		MLoanEntity entity = new MLoanEntity();
//		entity.setName(name);
//		String strOp = "";
//		if ("1".equalsIgnoreCase(op)) {
//			strOp = service.takeDown(entity);
//		} else if ("2".equalsIgnoreCase(op)) {
//			strOp = service.amend(entity);
//		} else if ("3".equalsIgnoreCase(op)) {
//			strOp = service.pay(entity);
//		} else if ("4".equalsIgnoreCase(op)) {
//			strOp = service.query(entity);
//		} else {
//			strOp = "invalid parameter value.";
//		}
//		// response.setCharacterEncoding("gb-2312");
//		response.getOutputStream().print(strOp);
//		return null;
//	}
//
//	@Override
//	protected String getReqType() {
//		// TODO Auto-generated method stub
//		return "loan Action";
//	}
//
//}

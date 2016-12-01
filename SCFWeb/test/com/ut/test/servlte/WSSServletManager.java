package com.ut.test.servlte;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ut.scf.web.servlet.WSRequestParser;
import com.ut.scf.web.servlet.WSWebDispatcher;

public class WSSServletManager extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void init() throws ServletException {
		super.init();
	}

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String comName = request.getParameter("_TRX_STATUS");
		Object url = WSRequestParser.getActionServlet(comName);
		if(url != null){
			try {
				invokeServlet(request,response,url.toString());
			} catch (Exception e) {
				e.printStackTrace();
			}
			return;
		}
		// response.sendError(HttpServletResponse.SC_BAD_REQUEST);
		
//		String requestType = request.getServletPath();
//		String name = request.getParameter("name");
//		String op = request.getParameter("opt");
//		JaxWsProxyFactoryBean factory = new JaxWsProxyFactoryBean();
//		factory.setServiceClass(IMLoanInterface.class);
//		factory.setAddress("http://localhost:65082/services/mLoan");
//
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
		
//		ServletContext context = request.getServletContext();
//		MuleContext muleContext = (MuleContext) context.getAttribute(MuleProperties.MULE_CONTEXT_PROPERTY);
//		String opType = request.getParameter("_trx_type");
//		String strOp = "process success";
//		Collection<FlowConstruct> flowList = muleContext.getRegistry().lookupFlowConstructs();
//		FlowConstruct currFlow = (FlowConstruct) flowList.toArray()[0];
//		try{
//			if("op_pause".equalsIgnoreCase(opType)){
//				muleContext.stop();
//			}else if("op_start".equalsIgnoreCase(opType)){
//				muleContext.start();
//			}else if("pause".equalsIgnoreCase(opType)){
////				MuleRegistry broker = muleContext.getRegistry();
////				SingleServiceLifecycleManager manager = new SingleServiceLifecycleManager("",broker,muleContext);
////				manager.fireLifecycle(Stoppable.PHASE_NAME,currFlow);
//				SingleServiceManager service = new SingleServiceManager();
//				service.stopFlow(currFlow);
//			}else if("start".equalsIgnoreCase(opType)){
////				SingleServiceLifecycleManager manager = new SingleServiceLifecycleManager("",null,muleContext);
////				manager.fireLifecycle(Startable.PHASE_NAME,currFlow);
//				SingleServiceManager service = new SingleServiceManager();
//				service.startFlow(currFlow);
//			}else{
//				strOp = "invalid parameter value.";
//			}
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//		request.setAttribute("process", strOp);
//		response.sendRedirect("../mule/MuleConsole.jsp");

		
//		 MuleClient client = muleContext.getClient();
//	     MuleMessage response = client.send("vm://greeter", "Ross", null);
//	     Object payload =  response.getPayload();
//	     String message = response.getPayloadAsString();
//		APControlManager mainManager = new APControlManager();
//		String responseMsg = mainManager.runApServices("test vm processor");
//		response.getOutputStream().print(responseMsg);
	}

	@Override
	public void destroy() {
		super.destroy();
	}
	
	protected void invokeServlet(HttpServletRequest req, HttpServletResponse res, String url) throws ServletException, IOException
	{
		WSWebDispatcher.invokeServlet(req, res, url);
	}
}

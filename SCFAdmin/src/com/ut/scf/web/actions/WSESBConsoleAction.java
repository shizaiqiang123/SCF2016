package com.ut.scf.web.actions;

import com.ut.scf.web.servlet.AbsServletRequestAware;

public class WSESBConsoleAction extends AbsServletRequestAware {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public String execute() throws Exception {
//		ServletContext context = request.getServletContext();
//		MuleContext muleContext = (MuleContext) context.getAttribute(MuleProperties.MULE_CONTEXT_PROPERTY);
		String opType = request.getParameter("_trx_type");
		String strOp = "process success";
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
		request.setAttribute("process", strOp);
		response.sendRedirect("../mule/MuleConsole.jsp");
		return null;
	}

	@Override
	protected String getReqType() {
		return "ESB Console";
	}
}

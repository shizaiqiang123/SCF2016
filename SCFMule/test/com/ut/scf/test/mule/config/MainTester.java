package com.ut.scf.test.mule.config;
import org.apache.cxf.jaxws.JaxWsProxyFactoryBean;

public class MainTester {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		cxfClient();

	}

	public static void cxfClient() {
//		JaxWsProxyFactoryBean factoryBean = new JaxWsProxyFactoryBean();
//		factoryBean.setServiceClass(IWebService.class); // 在客户端必须有web
//																				// service接口类的代码
//		factoryBean.setAddress("http://localhost:8080/SCFWeb/WS_Server/myWebService");
//
//		IWebService client = (IWebService) factoryBean.create();
//
//		String name= client.sayHello("1");
//		client.save("name", "pwd");
//		System.out.println("Response: " +name + "  ");
	}
	
	public void AxisClient(){
//		try {
//			String endpoint = "http://127.0.0.1:8989/WS_Server/Webservice?wsdl";
//			// 直接引用远程的wsdl文件
//			// 以下都是套路
//			Service service = new Service();
//			Call call = (Call) service.createCall();
//			call.setTargetEndpointAddress(endpoint);
//			call.setOperationName("sayHello");// WSDL里面描述的接口名称
//			call.addParameter("name", org.apache.axis.encoding.XMLType.XSD_STRING, javax.xml.rpc.ParameterMode.IN);// 接口的参数
//			call.setReturnType(org.apache.axis.encoding.XMLType.XSD_STRING);// 设置返回类型
//			String temp = "测试人员";
//			String result = (String) call.invoke(new Object[] { temp });
//			// 给方法传递参数，并且调用方法
//			System.out.println("result is " + result);
//		} catch (Exception e) {
//			System.err.println(e.toString());
//			e.printStackTrace();
//		}
	}
}

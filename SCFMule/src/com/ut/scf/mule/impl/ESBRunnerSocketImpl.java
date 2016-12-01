package com.ut.scf.mule.impl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

import org.slf4j.Logger;
import org.w3c.dom.Document;

import com.ut.comm.tool.ErrorUtil;
import com.ut.comm.tool.UUIdGenerator;
import com.ut.comm.tool.string.StringUtil;
import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.gapi.GapiMsgPara;
import com.ut.scf.core.data.ApResponse;
import com.ut.scf.core.data.IApResponse;
import com.ut.scf.core.esb.ESBServiceUtil;
import com.ut.scf.core.esb.IESBService;
import com.ut.scf.core.esb.IESBServiceRequest;
import com.ut.scf.core.esb.IESBServiceResponse;
import com.ut.scf.core.esb.ServiceRequestImpl;
import com.ut.scf.core.esb.ServiceResponseImpl;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.IGAPIProcessManager;
import com.ut.scf.core.log.APLogUtil;
import com.ut.scf.core.utils.ClassLoadHelper;
import com.ut.scf.mule.IESBProtocol;

public class ESBRunnerSocketImpl implements IESBProtocol{
	
	private String inorout;
	private String ip;
	private int port; 
	private int timeout;
	private String characterset;
	private String receiveMapping;
	private String bu;
	private String serviceTp;
	
	ServerSocket server = null;
	
	@Override
	public void initlizeService(IESBService request) throws Exception {
		this.inorout = request.getInorout();
		this.ip = request.getAddress();
		this.port = Integer.parseInt(request.getPort());
		this.timeout =Integer.parseInt( request.getTimeout());
		this.characterset = request.getCharacterset();
		this.receiveMapping = request.getReceiveMapping();
		this.bu = request.getBu();
		this.serviceTp = request.getServiceType();
		
		if("o".equalsIgnoreCase(this.inorout)){
		}else{
			//start thread to listening
			MainServer server = new MainServer();
			server.start();
		}
	}

	@Override
	public void destoryService(IESBService request) throws Exception {
		if("o".equalsIgnoreCase(this.inorout)){
		}else{
			if(server != null){
				server.close();
			}
		}
	}

	@Override
	public IESBServiceResponse runService(IESBServiceRequest request)
			throws Exception {
		IESBServiceResponse response = new ServiceResponseImpl();
		Object object= request.getRequestData();
		GapiMsgPara gapiObj = (GapiMsgPara) request.getRequestPara();
		String xmlSource= "";
		if(Document.class.isAssignableFrom(object.getClass())){
			xmlSource = XMLManager.convertToString((Document) object,gapiObj.getCharacterset());
		}else{
			xmlSource = object.toString();
		}
		
		int len = xmlSource.length();
		if (len > 9999) {
			throw new IOException("send msg too long .");
		}
		
//		Socket socket = null;
//		try {
//			
//			socket = testConnection(ip, port,response);
//			
//			sendRequestMsg(socket,xmlSource,gapiObj.getCharacterset(),response);
//			
//			if ("SYNC".equals(gapiObj.getModle())) {
////				receiveResponseMsg(socket,timeout,response);
//				ReceiveThread receive = new ReceiveThread(socket,timeout,response);
//				receive.run();
//			}
//			ESBServiceUtil.getLogger().debug("process end...");
//		} catch (UnknownHostException e1) {
//			ESBServiceUtil.getLogger().error("exception..." + e1.toString());
//			response.setError("Exception");
//			throw e1;
//		} catch (IOException e1) {
//			ESBServiceUtil.getLogger().error("exception..." + e1.toString());
//			response.setError("Exception");
////			response.setResponse(e1.toString());
//		} finally {
//			if(socket!=null&&!socket.isClosed()){
//				//
//			}
//		}
		String id = gapiObj.getId();
		String result = "";
		if("SignOn".equals(id)||"RESignOn1".equals(id)){
			result = b2e0080();
		}else if("GetCmsCntrct".equals(id)){
			result = b2e0081();
		}else if("GetBalance".equals(id)){
			result = b2e0080();
		}else if("AccBalanceOut".equals(id)){
			result = b2e0082();
		}else if("AccountSync".equals(id)){
			result = b2e0083();
		}else if("CustLimitOut".equals(id)){
			result = b2e0084();
		}else if("CustCD".equals(id)){
			result = b2e0085();
		}else if("CntrctCD".equals(id)){
			result = b2e0086();
		}else if("LoanCD".equals(id)){
			result = b2e0087();
		}else if("LoanReCD".equals(id)){
			result = b2e0088();
		}else if("MRPC579".equals(id)){
			result = b2e0089();
		}else if("CP0001".equals(id)){
			result = b2e0090();
		}
		response.setResponseData(result);
		response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_RECEIVED);
		
		return response;
		
	}
	private String b2e0090() {
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "		<channel>channel</channel>                                                                                 ";
		string += "		<fromNodeId>0123</fromNodeId>                                                                                 ";
		string += "		<toServiceCode>b2e0082</toServiceCode>                                                                                 ";
		string += "		<externalReferenceNo>referenceNo</externalReferenceNo>                                                                                 ";
		string += "		<transactionBranch>b2e0082</transactionBranch>                                                                                 ";
		string += "		<transactionDate>b2e0082</transactionDate>                                                                                 ";
		string += "		<msgPri>b2e0082</msgPri>                                                                                 ";
		string += "		<msgVer>b2e0082</msgVer>                                                                                 ";
		string += "		<replyCode>b2e0082</replyCode>                                                                                 ";
		string += "		<replyText>b2e0082</replyText>                                                                                 ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "			<coreReturnCode>0000</coreReturnCode>                                                            ";
		string += "			<coreReturnMsg>0000</coreReturnMsg>                                                            ";
		string += "			<coreSsn>0000</coreSsn>                                                            ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}

	private String b2e0089() {
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "		<channel>channel</channel>                                                                                 ";
		string += "		<fromNodeId>0123</fromNodeId>                                                                                 ";
		string += "		<toServiceCode>b2e0082</toServiceCode>                                                                                 ";
		string += "		<externalReferenceNo>referenceNo</externalReferenceNo>                                                                                 ";
		string += "		<transactionBranch>b2e0082</transactionBranch>                                                                                 ";
		string += "		<transactionDate>b2e0082</transactionDate>                                                                                 ";
		string += "		<msgPri>b2e0082</msgPri>                                                                                 ";
		string += "		<msgVer>b2e0082</msgVer>                                                                                 ";
		string += "		<replyCode>b2e0082</replyCode>                                                                                 ";
		string += "		<replyText>b2e0082</replyText>                                                                                 ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "			<coreReturnCode>0000</coreReturnCode>                                                            ";
		string += "			<coreReturnMsg>1000</coreReturnMsg>                                                ";
		string += "			<ZPKG>1000</ZPKG>                                                ";
		string += "			<ACN>1000</ACN>                                                ";
		string += "			<NAM>1000</NAM>                                                ";
		string += "			<TYPE>1000</TYPE>                                                ";
		string += "			<GRP>1000</GRP>                                                ";
		string += "			<OIT>1000</OIT>                                                ";
		string += "			<OIN>1000</OIN>                                                ";
		string += "			<ODT>1000</ODT>                                                ";
		string += "			<BOO>1000</BOO>                                                ";
		string += "			<CCODE>1000</CCODE>                                                ";
		string += "			<CONTADR>1000</CONTADR>                                                ";
		string += "			<BALAVL>1000</BALAVL>                                                ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}

	private static String b2e0080() {
		/*String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "			<coreReturnCode>0000</coreReturnCode>                                                            ";
		string += "			<token>1000</token>                                                ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;*/
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "		<channel>channel</channel>                                                                                 ";
		string += "		<fromNodeId>0123</fromNodeId>                                                                                 ";
		string += "		<toServiceCode>b2e0082</toServiceCode>                                                                                 ";
		string += "		<externalReferenceNo>referenceNo</externalReferenceNo>                                                                                 ";
		string += "		<transactionBranch>b2e0082</transactionBranch>                                                                                 ";
		string += "		<transactionDate>b2e0082</transactionDate>                                                                                 ";
		string += "		<msgPri>b2e0082</msgPri>                                                                                 ";
		string += "		<msgVer>b2e0082</msgVer>                                                                                 ";
		string += "		<replyCode>b2e0082</replyCode>                                                                                 ";
		string += "		<replyText>b2e0082</replyText>                                                                                 ";
		string += "	</Header>                                                                                                      ";
		string += "	<Body>                                                                                                      ";
		string += "			<coreReturnCode>0000</coreReturnCode>                                                            ";
		string += "			<coreReturnMsg>1000</coreReturnMsg>                                                ";
		string += "			<token>1000</token>                                                ";
		string += "			<proc_date>1000</proc_date>                                                ";
		string += "			<lang>1000</lang>                                                ";
		string += "	</Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}
	
	private static String b2e0081() {
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<termid></termid>                                                                                        ";
		string += "		<trnid></trnid>                                                                                          ";
		string += "		<custid>133773405</custid>                                                                               ";
		string += "		<cusopr></cusopr>                                                                                        ";
		string += "		<trncod>b2e0082</trncod>                                                                                 ";
		string += "		<token></token>                                                                                          ";
		string += "		<obssmsgid>2073751</obssmsgid>                                                                           ";
		string += "		<trntype>09</trntype>                                                                                    ";
		string += "		<pushnum>1</pushnum>                                                                                     ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "							<invoiceApprvData>                                                                   ";
		string += "								<circleNum>2</circleNum>                                                         ";
		string += "								<invoiceApprv>                                                                   ";
		string += "									<cmsNo>2394502852</cmsNo>                                        ";
		string += "									<cmsNm>综合授信额度</cmsNm>                  ";
		string += "								</invoiceApprv>                                                                  ";
		string += "								<invoiceApprv>                                                                   ";
		string += "									<cmsNo>2394502852</cmsNo>                                        ";
		string += "									<cmsNm>单笔授信额度</cmsNm>                                               ";
		string += "								</invoiceApprv>                                                                  ";
		string += "							</invoiceApprvData>                                                                  ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}
	private static String b2e0082() {
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "			<coreReturnCode>0</coreReturnCode>                                                            ";
		string += "			<message>操作成功</message>                                                ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}
	
	public static String b2e0083(){
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "			<CNY>CNY</CNY>                                                            ";
		string += "			<acNm>柳州银行保理专户</acNm>                                                ";
		string += "			<acBkNm>开户行-柳州银行</acBkNm>                                                ";
		string += "			<acBkNo>Inst000014</acBkNo>                                                ";
		string += "			<acBkName>柳州银行</acBkName>                                                ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}
	
	private static String b2e0084() {
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "			<coreReturnCode>0</coreReturnCode>                                                            ";
		string += "			<remark>应收备注添加成功</remark>                                                ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}
	
	private static String b2e0085() {
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "		<channel>b2e0082</channel>                                                                                 ";
		string += "		<fromNodeId>b2e0082</fromNodeId>                                                                                 ";
		string += "		<toServiceCode>b2e0082</toServiceCode>                                                                                 ";
		string += "		<externalReferenceNo>b2e0082</externalReferenceNo>                                                                                 ";
		string += "		<transactionBranch>b2e0082</transactionBranch>                                                                                 ";
		string += "		<transactionDate>b2e0082</transactionDate>                                                                                 ";
		string += "		<msgPri>b2e0082</msgPri>                                                                                 ";
		string += "		<msgVer>b2e0082</msgVer>                                                                                 ";
		string += "		<replyCode>b2e0082</replyCode>                                                                                 ";
		string += "		<replyText>b2e0082</replyText>                                                                                 ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "			<coreReturnCode>0000</coreReturnCode>                                                            ";
		string += "			<coreReturnMsg>0</coreReturnMsg>                                                            ";
		string += "			<ACN>123</ACN>                                                            ";
		string += "			<ZCHNM>授信客户名称</ZCHNM>                                                            ";
		string += "			<com_ins_code>组织机构代码</com_ins_code>                                                            ";
		string += "			<cus_type>110</cus_type>                                                            ";
		string += "			<com_cll_type>0111</com_cll_type>                                                            ";
		string += "			<nat_tax_reg_code>国税登记证</nat_tax_reg_code>                                                            ";
		string += "			<loc_tax_reg_code>地税登记证</loc_tax_reg_code>                                                            ";
		string += "			<com_country>中国</com_country>                                                            ";
		string += "			<reg_addr>南京</reg_addr>                                                            ";
		string += "			<reg_cur_type>CNY</reg_cur_type>                                                            ";
		string += "			<reg_cap_amt>100000000</reg_cap_amt>                                                            ";
		string += "			<com_str_date>060125123</com_str_date>                                                            ";
		string += "			<loan_card_id>2131321</loan_card_id>                                                            ";
		string += "			<reg_type>110</reg_type>                                                            ";
		string += "			<com_main_opt_scp>卖鱼的</com_main_opt_scp>                                                            ";
		string += "			<main_br_id>南京</main_br_id>                                                            ";
		string += "			<remark>备注</remark>                                                            ";
		string += "			<legal_name>法定代表人</legal_name>                                                            ";
		string += "			<legal_cert_type>10</legal_cert_type>                                                            ";
		string += "			<legal_cert_code>证件编号</legal_cert_code>                                                            ";
		string += "			<fna_mgr>联系人姓名</fna_mgr>                                                            ";
		string += "			<phone>022-12435643</phone>                                                            ";
		string += "			<legal_phone>13112345678</legal_phone>                                                            ";
		string += "			<duty>经理</duty>                                                            ";
		string += "			<fax_code>021-12381234</fax_code>                                                            ";
		string += "			<email>dfsj@dhfd.com</email>                                                ";
		string += "			<post_addr>南宁</post_addr>                                                ";
		string += "			<REMARKS1>备用1</REMARKS1>                                                ";
		string += "			<REMARKS2>备用2</REMARKS2>                                                ";
		string += "			<REMARKS3>备用3</REMARKS3>                                                ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}
	
	private static String b2e0086() {
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "		<channel>b2e0082</channel>                                                                                 ";
		string += "		<fromNodeId>b2e0082</fromNodeId>                                                                                 ";
		string += "		<toServiceCode>b2e0082</toServiceCode>                                                                                 ";
		string += "		<externalReferenceNo>b2e0082</externalReferenceNo>                                                                                 ";
		string += "		<transactionBranch>b2e0082</transactionBranch>                                                                                 ";
		string += "		<transactionDate>b2e0082</transactionDate>                                                                                 ";
		string += "		<msgPri>b2e0082</msgPri>                                                                                 ";
		string += "		<msgVer>b2e0082</msgVer>                                                                                 ";
		string += "		<replyCode>b2e0082</replyCode>                                                                                 ";
		string += "		<replyText>b2e0082</replyText>                                                                                 ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "			<coreReturnCode>0000</coreReturnCode>                                                            ";
		string += "			<coreReturnMsg>0</coreReturnMsg>                                                            ";
		string += "			<ACN>123</ACN>                                                            ";
		string += "			<ZCHNM>授信客户名称</ZCHNM>                                                            ";
		string += "			<item_id>101</item_id>                                                            ";
		string += "			<com_ins_code>组织机构代码</com_ins_code>                                                            ";
		string += "			<main_br_id>Inst000005</main_br_id>                                                            ";
		string += "			<cur_type>CNY</cur_type>                                                            ";
		string += "			<crd_lmt>43244334</crd_lmt>                                                            ";
		string += "			<residual_lmt>32432.434</residual_lmt>                                                            ";
		string += "			<outstnd_lmt>4243</outstnd_lmt>                                                            ";
		string += "			<start_date>2016-03-10</start_date>                                                ";
		string += "			<expi_date>2018-01-24</expi_date>                                                ";
		string += "			<margin_ratio>11.5</margin_ratio>                                                ";
		string += "			<REMARKS1>备用1</REMARKS1>                                                ";
		string += "			<REMARKS2>备用2</REMARKS2>                                                ";
		string += "			<REMARKS3>备用3</REMARKS3>                                                ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}
	
	private static String b2e0087() {
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "		<channel>b2e0082</channel>                                                                                 ";
		string += "		<fromNodeId>b2e0082</fromNodeId>                                                                                 ";
		string += "		<toServiceCode>b2e0082</toServiceCode>                                                                                 ";
		string += "		<externalReferenceNo>b2e0082</externalReferenceNo>                                                                                 ";
		string += "		<transactionBranch>b2e0082</transactionBranch>                                                                                 ";
		string += "		<transactionDate>b2e0082</transactionDate>                                                                                 ";
		string += "		<msgPri>b2e0082</msgPri>                                                                                 ";
		string += "		<msgVer>b2e0082</msgVer>                                                                                 ";
		string += "		<replyCode>b2e0082</replyCode>                                                                                 ";
		string += "		<replyText>b2e0082</replyText>                                                                                 ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "			<coreReturnCode>0000</coreReturnCode>                                                            ";
		string += "			<coreReturnMsg>0</coreReturnMsg>                                                            ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}
	
	private static String b2e0088() {
		String string = "";
		string += "<?xml version=\"1.0\" encoding=\"UTF-8\"?>                                                                          ";
		string += "<Message>                                                                                                        ";
		string += "	<Message_Header>                                                                                                       ";
		string += "		<msgId>133773405</msgId>                                                                               ";
		string += "		<msgRef>b2e0082</msgRef>                                                                                 ";
		string += "		<channel>b2e0082</channel>                                                                                 ";
		string += "		<fromNodeId>b2e0082</fromNodeId>                                                                                 ";
		string += "		<toServiceCode>b2e0082</toServiceCode>                                                                                 ";
		string += "		<externalReferenceNo>b2e0082</externalReferenceNo>                                                                                 ";
		string += "		<transactionBranch>b2e0082</transactionBranch>                                                                                 ";
		string += "		<transactionDate>b2e0082</transactionDate>                                                                                 ";
		string += "		<msgPri>b2e0082</msgPri>                                                                                 ";
		string += "		<msgVer>b2e0082</msgVer>                                                                                 ";
		string += "		<replyCode>b2e0082</replyCode>                                                                                 ";
		string += "		<replyText>b2e0082</replyText>                                                                                 ";
		string += "	</Message_Header>                                                                                                      ";
		string += "	<Message_Body>                                                                                                      ";
		string += "			<coreReturnCode>0000</coreReturnCode>                                                            ";
		string += "			<coreReturnMsg>0</coreReturnMsg>                                                            ";
		string += "			<cus_id>0000</cus_id>                                                            ";
		string += "			<cus_name>0</cus_name>                                                            ";
		string += "			<con_no>0000</con_no>                                                            ";
		string += "			<loan_account>0</loan_account>                                                            ";
		string += "			<bill_no>0000</bill_no>                                                            ";
		string += "			<apply_amount>0</apply_amount>                                                            ";
		string += "			<zutseq>0000</zutseq>                                                            ";
		string += "			<REMARKS1>备用1</REMARKS1>                                                ";
		string += "			<REMARKS2>备用2</REMARKS2>                                                ";
		string += "			<REMARKS3>备用3</REMARKS3>                                                ";
		string += "	</Message_Body>                                                                                                     ";
		string += "</Message>                                                                                                       ";
		return string;
	}
	class MainServer extends Thread {
		public void run() {
			Socket client = null;
			try {
				server = new ServerSocket(port);
				System.out.println("等待客户端接入...");
				
				try {
					while (true) {
						client = server.accept();
						Callable<IApResponse> process = new FunctionProcessor(client,characterset);
						FutureTask<IApResponse> task = new FutureTask<IApResponse>(process);
						Thread oneThread = new Thread(task);
						oneThread.start();
						
						while(!task.isDone()){
							Thread.sleep(1000);
						}
						IApResponse response = task.get();
						ESBServiceUtil.getLogger().debug("Server process end..." +response.getErrorCode());
					}
				} catch (Exception e) {
					System.out.println("服务端处理失败：" + e);
					ESBServiceUtil.getLogger().error("Server process exception..." + e.toString());
				}
			} catch (Exception e) {
				ESBServiceUtil.getLogger().error("Server exception..." + e.toString());
				System.out.println(e);
			}
		}

		public void destory() {
			// 断开客户端连接
		}
	}
	
	private void sendRequestMsg(Socket socket, String xmlSource,String character,IESBServiceResponse response) throws Exception{
		try {
			ByteArrayOutputStream arr = new ByteArrayOutputStream();
			byte[] msgBody = xmlSource.getBytes(character);
			arr.write(int2String(msgBody.length));
			arr.write(msgBody);
			BufferedOutputStream buff = new BufferedOutputStream(socket.getOutputStream());
			buff.write(arr.toByteArray());
			buff.flush();
			response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_SENDED);
		} catch (UnsupportedEncodingException e) {
			response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_FAILED_SEND);
			throw new Exception("Send Request Msg failed");
		} catch (IOException e) {
			response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_FAILED_SEND);
			throw new Exception("Send Request Msg failed");
		}
	}

	private Socket testConnection(String ip, int port,IESBServiceResponse response) throws Exception{
		try {
			return new Socket(ip, port);
		} catch (UnknownHostException e) {
			e.printStackTrace();
			response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_FAILED_CONNECT);
			throw new Exception("Test Connection failed");
		} catch (IOException e) {
			e.printStackTrace();
			response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_FAILED_CONNECT);
			throw new Exception("Test Connection failed");
		}
	}

	public byte[] int2bytes(int num) {
		byte[] b = new byte[4];
		for (int i = 0; i < 4; i++) {
			b[i] = (byte) (num >>> (24 - i * 8));
		}
		return b;
	}

	public byte[] int2String(int num) {
		String strLen = "" + num;
		while (strLen.length() < 4) {
			strLen = "0" + strLen;
		}
		return strLen.getBytes();
	}
	
	class ReceiveThread extends Thread {
		private Socket socket;
		private int timeout;
		private IESBServiceResponse response;

		public ReceiveThread(Socket _socket,int _timeout,IESBServiceResponse _response) {
			socket = _socket;
			timeout = _timeout;
			response = _response;
		}

		public void run() {
			ReceiveProcessThread th = new ReceiveProcessThread(socket,response);
			th.start();
			try {
				th.join(timeout*1000);
				if (th.isAlive()) {
					ESBServiceUtil.getLogger().error("receive msg timeout...");
					th.interrupt();
					if(socket!=null&&socket.isConnected()){
						try {
							socket.close();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
					response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_FAILED_RECEIVE);
					response.setError("Receive response timout");
//					response.setResponse("Receive response timout");
				}
			} catch (InterruptedException e) {
				response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_EXCEPTION);
				e.printStackTrace();
			}
			
			ESBServiceUtil.getLogger().debug("thread end...");
		}
	}
	
	class ReceiveProcessThread extends Thread {
		private Socket socket;
		private IESBServiceResponse response;

		public ReceiveProcessThread(Socket _socket,IESBServiceResponse _response) {
			socket = _socket;
			response = _response;
		}
		
		@Override
		public void run() {
			try {
				BufferedInputStream inputStrwam = new BufferedInputStream(socket.getInputStream());
				ByteArrayOutputStream bao = new ByteArrayOutputStream();
				
				byte[] b = new byte[4];
				int bytesRead = 0;
				bytesRead = inputStrwam.read(b, 0, b.length);
				String len = new String(b);
				int intLen = Integer.parseInt(len);

				b = new byte[intLen];

				bytesRead = inputStrwam.read(b, 0, b.length);
				if(bytesRead>0){
					bao.write(b, 0, bytesRead);
					bao.flush();
					String result = bao.toString();
					System.err.println(result);
					response.setResponseData(result);
					response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_RECEIVED);
					ESBServiceUtil.getLogger().debug("response..." + result);
				}else{
					String result = "";
					response.setResponseData(result);
					response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_FAILED_RECEIVE);
					ESBServiceUtil.getLogger().debug("response..." + result);
				}
				
			} catch (Exception e) {
				ESBServiceUtil.getLogger().error("exception..." + e.toString());
				response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_FAILED_RECEIVE);
				response.setError("Receive response error:"+ e.toString());
//				response.setResponse("Receive response error:"+ e.toString());
			}finally {
				try {
					this.socket.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	class FunctionProcessor implements Callable<IApResponse> {

		private Socket socket;
		private String charset;

		public FunctionProcessor(Socket _socket,String charset) {
			this.socket = _socket;
			this.charset = charset;
		}

		@Override
		public IApResponse call() throws Exception {
			IApResponse retObj = new ApResponse();
			try {
				
				String msgId = UUIdGenerator.getUUId();
				msgId="R_"+msgId;
				
				getLogger().debug(msgId+":perpare to reveive msg...");
				
				String request = receiveMsgFromSocket(this.socket,charset);
				System.err.println(request);
				
				getLogger().debug(msgId+":reveive msg..."+request);
				
				IESBServiceResponse esbResponse = new ServiceResponseImpl();
				
				if(StringUtil.isTrimNotEmpty(request)){
					
					IGAPIProcessManager manager = ClassLoadHelper.getComponentClass("gapiManager");
					
					getLogger().debug(msgId+":perpare to process msg...");
					
					IESBServiceRequest response = new ServiceRequestImpl();
					
					IGAPIMsgRequest gapiResponse = manager.processRecvMsg(receiveMapping, request,bu);
					
					response.setRequestData(gapiResponse.getMsgBody());
					
					response.setRequestPara(gapiResponse.getGapiMsgPara());
					
					response.setRequestId(msgId);
					
					getLogger().debug(msgId+":process msg end..."+response.getRequestData());
					
					if(response.getRequestData()!=null&&StringUtil.isNotNull(response.getRequestData().toString())){
						
						getLogger().debug(msgId+":perpare to send response msg...");
						
						sendMsgToSocket(this.socket,response,esbResponse);
						
						getLogger().debug(msgId+":send response msg end..."+response.getRequestData());
					}
				}
				
			} catch (Exception e) {
				getLogger().error(e.toString());
				getLogger().error(ErrorUtil.getErrorStackTrace(e));
			}finally{
				try {
					if(socket!=null&&socket.isConnected())
						socket.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			return retObj;
		}

		protected Logger getLogger() {
			return APLogUtil.getESBLogger();
		}
	}
	
	public String receiveMsgFromSocket(Socket socket,String charset){
		try {
			BufferedInputStream inputStrwam = new BufferedInputStream(socket.getInputStream());
			ByteArrayOutputStream bao = new ByteArrayOutputStream();
			byte[] b = new byte[4];
			int bytesRead = 0;
			bytesRead = inputStrwam.read(b, 0, b.length);
			String len = new String(b, charset);
			int intLen = Integer.parseInt(len);

			b = new byte[intLen];

			bytesRead = inputStrwam.read(b, 0, b.length);
			bao.write(b, 0, bytesRead);

			bao.flush();
			String result = bao.toString(charset);
			ESBServiceUtil.getLogger().debug("response..." + result);
			return result;
		} catch (Exception e) {
			ESBServiceUtil.getLogger().error("exception..." + e.toString());
			return "";
		}finally {
		}
	}
	
	public IESBServiceResponse sendMsgToSocket(Socket socket,IESBServiceRequest data,IESBServiceResponse esbResponse){
		try {
			GapiMsgPara gapiObj = (GapiMsgPara) data.getRequestPara();
			Object msgBody = data.getRequestData();
			if(msgBody==null){
				esbResponse.setRespCode(IESBServiceResponse.ESB_RESP_CODE_NO_DATA);
				return esbResponse;
			}
			String xmlSource = msgBody.toString();
			
			int len = xmlSource.length();
			if (len > 9999) {
				throw new IOException("send msg too long .");
			}
			
			try {
				sendRequestMsg(socket,xmlSource,gapiObj.getCharacterset(),esbResponse);
				
//				if ("SYNC".equals(gapiObj.getModle())) {
//					receiveResponseMsg(socket,timeout,esbResponse);
//				}
				ESBServiceUtil.getLogger().debug("process end...");
			} catch (UnknownHostException e1) {
				ESBServiceUtil.getLogger().error("exception..." + e1.toString());
				esbResponse.setError("Exception");
				throw e1;
			} catch (IOException e1) {
				ESBServiceUtil.getLogger().error("exception..." + e1.toString());
				esbResponse.setError("Exception");
//				response.setResponse(e1.toString());
			} finally {
				if(socket!=null&&!socket.isClosed()){
					//
				}
			}
			
			return esbResponse;
		} catch (Exception e) {
			ESBServiceUtil.getLogger().error("exception..." + e.toString());
			return esbResponse;
		}finally {
		}
	}

	@Override
	public String getServiceTp() {
		return this.serviceTp;
	}
}

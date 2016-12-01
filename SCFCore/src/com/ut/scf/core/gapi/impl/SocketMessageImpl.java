package com.ut.scf.core.gapi.impl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.w3c.dom.Document;

import com.ut.comm.tool.xml.XMLManager;
import com.ut.comm.xml.gapi.GapiPara;
import com.ut.scf.core.gapi.IGAPIMessage;
import com.ut.scf.core.gapi.IGAPIMsgRequest;
import com.ut.scf.core.gapi.IGAPIMsgResponse;
import com.ut.scf.core.gapi.MessageSendResponse;
import com.ut.scf.core.log.APLogUtil;

@Component("socketMessageImpl")
public class SocketMessageImpl implements IGAPIMessage {
	protected Logger getLogger(){
		return APLogUtil.getUserLogger();
	}
	
	@Override
	public IGAPIMsgResponse sendMessage(final GapiPara gapiObj,
			IGAPIMsgRequest message) throws Exception {
//		final IGAPIMsgResponse response = new MessageSendResponse();
//		if(gapiObj.getNaming()!=null){
//			message.setMsgHeader(gapiObj.getNaming());
//		}
//		Object object= message.getMsgBody();
////		String xmlSource=FormatVerifyFactory.getFormatVerify(object, message.getMsgHeader().toString(),gapiObj.getCharacterSet());
//		String xmlSource= "";
//		if(Document.class.isAssignableFrom(object.getClass())){
//			xmlSource = XMLManager.convertToString((Document) object,gapiObj.getCharacterSet());
//		}else{
//			xmlSource = object.toString();
//		}
//		
//		int len = xmlSource.length();
//		if (len > 9999) {
//			throw new IOException("send msg too long .");
//		}
//		
//		Socket socket = null;
//		try {
//			
//			socket = testConnection(gapiObj.getSend(), Integer.parseInt(gapiObj.getPort()),response);
//			
//			sendRequestMsg(socket,xmlSource,gapiObj.getCharacterSet(),response);
//			
//			if ("SYNC".equals(gapiObj.getModle())) {
//				receiveResponseMsg(socket,Integer.parseInt(gapiObj.getReceivetime()),response);
//			}
//			
//			getLogger().debug("process end...");
//		} catch (UnknownHostException e1) {
//			getLogger().error("exception..." + e1.toString());
//			response.setError("Exception");
//			response.setResponse(e1.toString());
//			throw e1;
//		} catch (IOException e1) {
//			getLogger().error("exception..." + e1.toString());
//			response.setError("Exception");
//			response.setResponse(e1.toString());
//		} finally {
//			if(socket!=null&&!socket.isClosed()){
//				//
//			}
//		}
//		
//		return response;
		return null;
	}

	private void receiveResponseMsg(Socket socket,int timeout,IGAPIMsgResponse response) {
		ReceiveThread receive = new ReceiveThread(socket,timeout,response);
		receive.run();
	}

	private void sendRequestMsg(Socket socket, String xmlSource,String character,IGAPIMsgResponse response) throws Exception{
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

	private Socket testConnection(String ip, int port,IGAPIMsgResponse response) throws Exception{
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

	@Override
	public IGAPIMsgResponse receiveMessage(GapiPara gapiObj, String mappingID)
			throws Exception {
		return null;
	}

	@Override
	public IGAPIMsgResponse rollback(GapiPara gapiObj, IGAPIMsgRequest message)
			throws Exception {
		return null;
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
		private IGAPIMsgResponse response;

		public ReceiveThread(Socket _socket,int _timeout,IGAPIMsgResponse _response) {
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
					getLogger().error("receive msg timeout...");
					th.interrupt();
					if(socket!=null&&socket.isConnected()){
						try {
							socket.close();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
					response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_FAILED_RECEIVE);
					response.setError("Exception");
					response.setResponse("Receive response timout");
				}
			} catch (InterruptedException e) {
				response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_EXCEPTION);
				e.printStackTrace();
			}
			
			getLogger().debug("thread end...");
		}
	}
	
	class ReceiveProcessThread extends Thread {
		private Socket socket;
		private IGAPIMsgResponse response;

		public ReceiveProcessThread(Socket _socket,IGAPIMsgResponse _response) {
			socket = _socket;
			response = _response;
		}
		
		@Override
		public void run() {
			try {
				BufferedInputStream inputStrwam = new BufferedInputStream(socket.getInputStream());
				ByteArrayOutputStream bao = new ByteArrayOutputStream();
				byte[] b = new byte[1024];

				int bytesRead = inputStrwam.read(b);
				bao.write(b, 0, bytesRead);
				bao.flush();
				String result = bao.toString();
				response.setResponse(result);
				response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_RECEIVED);
				getLogger().debug("response..." + result);
			} catch (Exception e) {
				getLogger().error("exception..." + e.toString());
				response.setRespCode(IGAPIMsgResponse.GAPI_RESP_CODE_FAILED_RECEIVE);
				response.setError("Exception");
				response.setResponse("Receive response error:"+ e.toString());
			}finally {
				try {
					this.socket.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

}

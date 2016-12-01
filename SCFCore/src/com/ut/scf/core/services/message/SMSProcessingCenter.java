package com.ut.scf.core.services.message;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;

public class SMSProcessingCenter implements Runnable{
	private Socket socket = null;

	public SMSProcessingCenter(Socket socket) {
		this.socket = socket;
	}
	@Override
	public void run() {
		String msg=this.readRequest(socket);
		String returnMsg="收到如下消息："+msg;
		this.writeReponse(socket, returnMsg);
	}

	
	/**
	 * 读取客户端请求发送信息的xml报文
	 * 
	 * @param socket
	 */
	public String readRequest(Socket socket) {
		StringBuffer buffer= new StringBuffer();;
		try {
			socket.setSoTimeout(60000);
			BufferedReader streamRender = new BufferedReader(new InputStreamReader(socket.getInputStream(), "UTF-8"));
			String line = null;
			 while ((line = streamRender.readLine()) != null) {
				buffer.append(line);
			 }
		 	} catch (Exception e) {
				e.printStackTrace();
			}
		return buffer.toString();
	}
	
	/**
	 * 返回给服务端的xml报文
	 * 
	 * @param socket
	 * @param message
	 */
	public void writeReponse(Socket socket, String message) {
		OutputStream socketOut = null;
		try {
			if (socket != null && !socket.isClosed()) {
				socket.setSoTimeout(60000);
				socketOut = socket.getOutputStream();
			}
			socketOut.write(message.getBytes("utf-8"));
			socketOut.flush();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				socket.shutdownOutput();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}

package com.ut.scf.core.services.message;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketAddress;
import java.util.Iterator;
import java.util.Map;

public class UCRABSendToServer implements Runnable {
	private Socket socket = null;

	public UCRABSendToServer(Socket socket) {
		this.socket = socket;
	}

	
	@Override
	public void run() {
	try{
		System.out.println(readRequest(socket));
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (this.socket != null) {
					socket.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 读取客户端请求发送信息的xml报文
	 * 
	 * @param socket
	 */
	public static String readRequest(Socket socket) {
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
	public static void writeReponse(Socket socket, String message) {
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
	
	public String getReturnClientXMLMessage(String isSuccessStr) {
		return "<MSG><returnMessage>" + isSuccessStr
				+ "</returnMessage></MSG>";
	}
}

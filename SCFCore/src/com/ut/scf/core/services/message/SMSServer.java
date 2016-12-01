package com.ut.scf.core.services.message;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class SMSServer {
	public void service(String msg) throws Exception{
		Socket socket =null;
		socket = new Socket("127.0.0.1", 9999);
		this.writeReponse(socket, msg);
		close(null, socket);
	}
	
	public static void close(ServerSocket serverSocket, Socket socket) {
		try {
			if (serverSocket != null) {
				serverSocket.close();
			}
			if (socket != null) {
				socket.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
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
